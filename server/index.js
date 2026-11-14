import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// ── Gemini setup ───────────────────────────────────────────────────────────────
if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY missing in server/.env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });

console.log("✅ Gemini ready — model: gemini-3.5-flash-lite");

const GEMINI_TIMEOUT_MS = 15000;

// ── Error classification & secret redaction ────────────────────────────────────
function sanitizeErrorMessage(message = "") {
    return String(message)
        .replace(/([?&]key=)[^&\s]+/gi, "$1[REDACTED]")
        .replace(/\b(AIza[0-9A-Za-z_-]{20,}|AQ\.[0-9A-Za-z._-]{20,})\b/g, "[REDACTED]");
}

function classifyGeminiError(err) {
    const status = err?.status ?? err?.response?.status;
    const msg = sanitizeErrorMessage(err?.message || "");
    const code = err?.code;

    // Non-retryable: quota / rate limit
    if (status === 429 || /429|quota|resource_exhausted|rate.?limit/i.test(msg)) {
        return {
            status: 429,
            code: "QUOTA_EXHAUSTED",
            retryable: false,
            message: "Daily question limit reached (free tier: 20/day). Resets at midnight UTC. Consider enabling billing at https://aistudio.google.com to unlock unlimited access."
        };
    }

    // Non-retryable: authentication / invalid API key / permission denied
    if (
        status === 401 ||
        status === 403 ||
        /401|403|api[_\s]?key[_\s]?invalid|invalid[_\s]?api[_\s]?key|unauthenticated|permission[_\s]?denied|unauthorized|forbidden/i.test(msg)
    ) {
        return {
            status: status === 403 ? 403 : 401,
            code: "AUTH_ERROR",
            retryable: false,
            message: "AI service authentication failed. Please check the server GEMINI_API_KEY configuration."
        };
    }

    // Non-retryable: model not found / invalid model configuration
    if (status === 404 || /404|not[_\s]?found|model.*not.*found/i.test(msg)) {
        return {
            status: 404,
            code: "MODEL_ERROR",
            retryable: false,
            message: "Configured Gemini model was not found or is unavailable. Please check the server model configuration."
        };
    }

    // Non-retryable: bad request
    if (status === 400 || /400|bad[_\s]?request|invalid[_\s]?argument/i.test(msg)) {
        return {
            status: 400,
            code: "BAD_REQUEST",
            retryable: false,
            message: "Invalid request parameters sent to the AI service."
        };
    }

    // Non-retryable: request timeout (do not retry so we stay within the client's 20s timeout)
    if (
        err?.name === "GoogleGenerativeAIAbortError" ||
        err?.name === "AbortError" ||
        code === "ETIMEDOUT" ||
        /timeout|timed out|aborted/i.test(msg)
    ) {
        return {
            status: 504,
            code: "TIMEOUT",
            retryable: false,
            message: "AI request timed out. Please try again."
        };
    }

    // Retryable: 503 service unavailable or temporary network errors
    const transientNetCodes = ["ECONNRESET", "ENOTFOUND", "ECONNREFUSED", "EPIPE", "EAI_AGAIN", "UND_ERR_CONNECT_TIMEOUT", "UND_ERR_SOCKET"];
    if (
        status === 503 ||
        transientNetCodes.includes(code) ||
        /503|service unavailable|overloaded|econnreset|enotfound|econnrefused|epipe|fetch failed|network/i.test(msg)
    ) {
        return {
            status: 503,
            code: "SERVICE_UNAVAILABLE",
            retryable: true,
            message: "AI service is temporarily unavailable. Please wait a moment and try again."
        };
    }

    return {
        status: 500,
        code: "AI_ERROR",
        retryable: false,
        message: "Failed to generate question. Please try again."
    };
}

const BACKEND_TIMEOUT_BUDGET_MS = 18000;
const RETRY_DELAY_MS = 1500;

// ── Retry helper (max 1 retry for transient 503 / network errors within 18s budget) ──
async function callWithRetry(prompt, maxRetries = 1) {
    const content = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
    };
    const deadline = Date.now() + BACKEND_TIMEOUT_BUDGET_MS;
    let lastErr;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const remainingMs = deadline - Date.now();
        if (remainingMs <= 500) {
            throw lastErr || new Error("Request timeout budget exceeded");
        }
        const attemptTimeout = Math.min(GEMINI_TIMEOUT_MS, remainingMs);

        try {
            const result = await model.generateContent(content, { timeout: attemptTimeout });
            if (attempt > 0) console.log(`✅ Gemini responded on retry ${attempt}`);
            return result;
        } catch (err) {
            lastErr = err;
            const classified = classifyGeminiError(err);
            if (!classified.retryable || attempt === maxRetries) throw err;

            const timeAfterDelay = deadline - (Date.now() + RETRY_DELAY_MS);
            if (timeAfterDelay <= 1000) throw err;

            console.warn(`⚠ Retry ${attempt + 1}/${maxRetries} (${classified.code}) — retrying in ${RETRY_DELAY_MS / 1000}s...`);
            await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
        }
    }
    throw lastErr;
}

function parseGeminiJson(result) {
    const text = result.response.text().trim()
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
    return JSON.parse(text);
}

/**
 * Validates a generated grammar question for structure, option uniqueness,
 * answer-key match, topic alignment, and conservative tense/time consistency.
 */
function validateGeneratedQuestion(parsed, expectedTopic, expectedDifficulty) {
    if (!parsed || typeof parsed !== "object") {
        return { valid: false, reason: "Response is not a JSON object" };
    }

    const question = typeof parsed.question === "string" ? parsed.question.trim() : "";
    if (!question || !/_{2,}/.test(question)) {
        return { valid: false, reason: "Question must be a non-empty string containing a blank (___)" };
    }

    if (!Array.isArray(parsed.options) || parsed.options.length !== 4) {
        return { valid: false, reason: "Options must be an array of exactly 4 items" };
    }

    const cleanOptions = parsed.options.map(opt => (typeof opt === "string" ? opt.trim() : ""));
    if (cleanOptions.some(opt => !opt)) {
        return { valid: false, reason: "All 4 options must be non-empty strings" };
    }

    const uniqueLower = new Set(cleanOptions.map(opt => opt.toLowerCase()));
    if (uniqueLower.size !== 4) {
        return { valid: false, reason: "Options must be 4 distinct choices" };
    }

    const rawAnswer = typeof parsed.answer === "string" ? parsed.answer.trim() : "";
    const matchingOptions = cleanOptions.filter(opt => opt === rawAnswer);
    if (matchingOptions.length !== 1) {
        return { valid: false, reason: "Answer key must exactly match one of the 4 options" };
    }
    const answer = matchingOptions[0];

    const explanation = typeof parsed.explanation === "string" ? parsed.explanation.trim() : "";
    if (explanation.length < 10) {
        return { valid: false, reason: "Explanation is missing or too short" };
    }

    const returnedTopic = typeof parsed.topic === "string" ? parsed.topic.trim() : "";
    if (!returnedTopic || returnedTopic.toLowerCase() !== expectedTopic.toLowerCase()) {
        return { valid: false, reason: `Topic mismatch (expected "${expectedTopic}", got "${returnedTopic || "none"}")` };
    }

    // Conservative tense & time-expression checks for high-confidence mismatches
    const hasFuturePerfectAnswer = /\b(?:will|won't|'ll|shall)\s+(?:not\s+)?have\b/i.test(answer);
    const hasPresentPerfectAnswer = /\b(?:has|have|hasn't|haven't)\b/i.test(answer) && !hasFuturePerfectAnswer;
    const hasPastPerfectAnswer = /\b(?:had|hadn't)\b/i.test(answer) && !/\b(?:would|could|might|should)\s+(?:not\s+)?have\b/i.test(answer);

    if (expectedTopic === "Future Perfect" && !hasFuturePerfectAnswer) {
        return { valid: false, reason: `Future Perfect answer must use future perfect form (got "${answer}")` };
    }
    if (expectedTopic === "Present Perfect" && (hasFuturePerfectAnswer || hasPastPerfectAnswer || !hasPresentPerfectAnswer)) {
        return { valid: false, reason: `Present Perfect answer must use present perfect form (got "${answer}")` };
    }
    if (expectedTopic === "Past Perfect" && (!hasPastPerfectAnswer || hasFuturePerfectAnswer)) {
        return { valid: false, reason: `Past Perfect answer must use past perfect form (got "${answer}")` };
    }

    // Catch "By the time <present clause>..." / "by next <period>..." paired with Present Perfect instead of Future Perfect
    const hasFutureByClause = /\bby\s+(?:the\s+time\b|tomorrow\b|next\s+(?:week|month|year|semester|friday|monday|summer|winter)\b)/i.test(question);
    const hasPastContextCue = /\b(?:yesterday|last\s+(?:week|month|year|night)|ago|had)\b/i.test(question);
    const hasFuturePerfectOption = cleanOptions.some(opt => /\b(?:will|won't|'ll|shall)\s+(?:not\s+)?have\b/i.test(opt));

    if (hasFutureByClause && !hasPastContextCue && hasPresentPerfectAnswer && hasFuturePerfectOption) {
        return { valid: false, reason: "Future time expression ('by the time / by next ...') conflicts with Present Perfect answer" };
    }

    return {
        valid: true,
        data: {
            question,
            options: cleanOptions,
            answer,
            explanation,
            topic: expectedTopic,
            difficulty: typeof parsed.difficulty === "string" && parsed.difficulty.trim()
                ? parsed.difficulty.trim()
                : expectedDifficulty
        }
    };
}

// ── Health check ───────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
    res.json({ status: "ok", message: "English Coach AI Backend 🚀" });
});

// ── Generate Question ──────────────────────────────────────────────────────────
app.post("/generate-question", async (_req, res) => {
    const topics = [
        "Present Simple", "Past Simple", "Past Continuous", "Present Perfect",
        "Past Perfect", "Future Simple", "Future Perfect",
        "First Conditional", "Second Conditional", "Third Conditional",
        "Passive Voice", "Articles (a/an/the)", "Prepositions of Time",
        "Prepositions of Place", "Relative Clauses",
        "Modal Verbs (can/could/may/might/should/must)",
        "Gerund vs Infinitive", "Subject-Verb Agreement", "Phrasal Verbs",
        "Reported Speech", "Question Tags",
        "Comparative and Superlative Adjectives",
        "Conjunctions", "Countable vs Uncountable Nouns"
    ];

    const difficulties = ["Beginner", "Intermediate", "Advanced"];
    const topic      = topics[Math.floor(Math.random() * topics.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const seed       = Math.floor(Math.random() * 999_999_999) + Date.now();

    const MAX_QUESTION_ATTEMPTS = 2;
    const basePrompt = `You are an expert English grammar teacher.
Generate ONE unique, original English grammar fill-in-the-blank multiple-choice question.

Topic: ${topic}
Difficulty: ${difficulty}
Seed (for uniqueness): ${seed}

STRICT RULES:
- The sentence MUST contain a single blank written as ___ and test ONLY the requested topic ("${topic}").
- The sentence must be 100% grammatically natural and unambiguous.
- The correct answer MUST strictly agree with the sentence's subject, tense, and all time expressions or subordinate clauses (for example, "By the time <present simple>..." requires Future Perfect "will have + past participle", never Present Perfect).
- All 4 options must be distinct and plausible, but EXACTLY ONE option may be grammatically and contextually valid in the sentence.
- The "answer" field must match the exact text of that single correct option.
- The "topic" field must be "${topic}".
- Explanation must clearly teach why the answer is right and why the tense/structure fits.

Return ONLY a valid JSON object with keys: "question", "options" (array of 4 strings), "answer", "explanation", "topic", "difficulty".`;

    try {
        let lastValidationReason = "Invalid question generated";

        for (let attempt = 1; attempt <= MAX_QUESTION_ATTEMPTS; attempt++) {
            const prompt = attempt === 1
                ? basePrompt
                : `${basePrompt}\n\nPrevious attempt was rejected because: ${lastValidationReason}. Fix this carefully.`;

            const result = await callWithRetry(prompt);
            let parsed;
            try {
                parsed = parseGeminiJson(result);
            } catch (parseErr) {
                lastValidationReason = "Response was not valid JSON";
                console.warn(`⚠ Question validation failed (attempt ${attempt}/${MAX_QUESTION_ATTEMPTS}): ${lastValidationReason}`);
                continue;
            }

            const validation = validateGeneratedQuestion(parsed, topic, difficulty);
            if (validation.valid) {
                return res.json(validation.data);
            }

            lastValidationReason = validation.reason;
            console.warn(`⚠ Question validation failed (attempt ${attempt}/${MAX_QUESTION_ATTEMPTS}): ${lastValidationReason}`);
        }

        return res.status(502).json({
            error: "Unable to generate a valid grammar question right now. Please try again.",
            code: "INVALID_QUESTION"
        });

    } catch (err) {
        const classified = classifyGeminiError(err);
        console.error(`❌ /generate-question [${classified.code}]:`, sanitizeErrorMessage(err?.message));
        res.status(classified.status).json({
            error: classified.message,
            code: classified.code
        });
    }
});

// ── Evaluate Answer ────────────────────────────────────────────────────────────
app.post("/evaluate-answer", async (req, res) => {
    const { question, options, correctAnswer, userAnswer, topic, difficulty } = req.body;

    if (!question || !correctAnswer || !userAnswer) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    const isCorrect = userAnswer.trim() === correctAnswer.trim();

    const prompt = `You are an encouraging English grammar teacher evaluating a student's answer.

Question: "${question}"
Options: ${JSON.stringify(options)}
Correct Answer: "${correctAnswer}"
Student's Answer: "${userAnswer}"
Result: ${isCorrect ? "CORRECT ✅" : "WRONG ❌"}
Topic: ${topic || "English Grammar"}
Difficulty: ${difficulty || "General"}

Write a short (3–5 sentences), encouraging, educational response that:
1. ${isCorrect ? "Confirms they are right and explains WHY with the grammar rule." : "Gently explains why their answer is wrong and why the correct answer is right."}
2. States the grammar rule being tested.
3. Gives a quick memory tip or example sentence.

Return ONLY valid JSON — no markdown:
{
  "isCorrect": ${isCorrect},
  "feedback": "Your feedback here.",
  "grammarRule": "The grammar rule in one clear sentence.",
  "tip": "A memory tip or example sentence."
}`;

    try {
        const result = await callWithRetry(prompt);
        const parsed = parseGeminiJson(result);
        res.json({ ...parsed, isCorrect });

    } catch (err) {
        const classified = classifyGeminiError(err);
        console.error(`❌ /evaluate-answer [${classified.code}]:`, sanitizeErrorMessage(err?.message));
        // Graceful degradation: correct/wrong result is still returned
        res.json({
            isCorrect,
            feedback: isCorrect
                ? `✅ Correct! "${correctAnswer}" is right.`
                : `❌ The correct answer is "${correctAnswer}".`,
            grammarRule: "",
            tip: ""
        });
    }
});

// ── Speaking Studio: Categories & Difficulties ──────────────────────────────
const SPEAKING_CATEGORIES = [
    "Daily life",
    "Personal experiences",
    "Education",
    "Technology",
    "Travel",
    "Hobbies",
    "Work and career",
    "Social situations",
    "Opinions and discussions",
    "General topics"
];

const SPEAKING_DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

function normalizeQuestionText(q = "") {
    return String(q).toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
}

function isDuplicateSpeakingQuestion(candidate = "", recentQuestions = []) {
    const candidateNorm = normalizeQuestionText(candidate);
    if (!candidateNorm || candidateNorm.length < 10) return true;

    for (const recent of recentQuestions) {
        const recentNorm = normalizeQuestionText(recent);
        if (!recentNorm) continue;
        if (candidateNorm === recentNorm) return true;

        const candWords = new Set(candidateNorm.split(" ").filter(w => w.length > 3));
        const recWords = new Set(recentNorm.split(" ").filter(w => w.length > 3));
        if (candWords.size === 0 || recWords.size === 0) continue;

        let common = 0;
        candWords.forEach(w => {
            if (recWords.has(w)) common++;
        });
        const similarity = common / Math.max(candWords.size, recWords.size);
        if (similarity >= 0.75) return true;
    }
    return false;
}

// ── Generate Speaking Question ────────────────────────────────────────────────
app.post("/generate-speaking-question", async (req, res) => {
    let { difficulty, category, recentQuestions = [] } = req.body || {};

    if (!SPEAKING_DIFFICULTIES.includes(difficulty)) {
        difficulty = "Intermediate";
    }

    if (!SPEAKING_CATEGORIES.includes(category)) {
        category = SPEAKING_CATEGORIES[Math.floor(Math.random() * SPEAKING_CATEGORIES.length)];
    }

    const recentHistoryList = Array.isArray(recentQuestions)
        ? recentQuestions.slice(-20).filter(q => typeof q === "string" && q.trim())
        : [];

    const seed = Math.floor(Math.random() * 999_999_999) + Date.now();

    const prompt = `You are an expert English speech coach and conversational language interviewer.
Generate ONE engaging, natural spoken English practice question/prompt for an English learner.

Target Category: ${category}
Target Difficulty Level: ${difficulty}
Session Seed (for uniqueness): ${seed}

LEVEL GUIDELINES:
- Beginner: Use clear, everyday vocabulary and familiar, concrete topics (e.g. daily habits, favorite food, hobbies, family, weather, weekend plans). The question must be straightforward to understand and answer in 2-3 simple sentences.
- Intermediate: Use descriptive or reflective questions that encourage a 3-5 sentence response with reasons, narratives, personal experiences, or comparisons.
- Advanced: Use analytical, hypothetical, or opinion-based prompts requiring structured arguments, pros/cons evaluation, nuanced viewpoints, or formal vocabulary.

STRICT CONSTRAINTS:
1. The question must be an open-ended conversational prompt that directly invites the student to speak aloud.
2. DO NOT repeat or closely rephrase any of these recently practiced questions:
${recentHistoryList.length > 0 ? recentHistoryList.map((q, i) => `   ${i + 1}. "${q}"`).join("\n") : "   (No previous questions yet)"}
3. The prompt must be concise (1-2 sentences).
4. Provide a practical coaching tip ("tips") advising the student what grammatical structure or speaking strategy to use when formulating their answer.

Return ONLY a valid JSON object (no markdown, no code fences):
{
  "question": "The spoken question text",
  "category": "${category}",
  "difficulty": "${difficulty}",
  "tips": "Short coaching advice for answering"
}`;

    const MAX_ATTEMPTS = 2;
    let duplicateDetected = false;

    try {
        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            const result = await callWithRetry(prompt);
            let parsed;
            try {
                parsed = parseGeminiJson(result);
            } catch (pErr) {
                console.warn(`⚠ Speaking question parse error (attempt ${attempt}/${MAX_ATTEMPTS}):`, pErr.message);
                continue;
            }

            const qText = typeof parsed.question === "string" ? parsed.question.trim() : "";
            if (!qText || qText.length < 15) {
                console.warn(`⚠ Speaking question too short (attempt ${attempt}/${MAX_ATTEMPTS})`);
                continue;
            }

            // Check duplicate against recent questions
            if (isDuplicateSpeakingQuestion(qText, recentHistoryList)) {
                duplicateDetected = true;
                console.warn(`⚠ Speaking question duplicate detected on attempt ${attempt}: "${qText}"`);
                continue;
            }

            return res.json({
                question: qText,
                category: typeof parsed.category === "string" && parsed.category.trim() ? parsed.category.trim() : category,
                difficulty: typeof parsed.difficulty === "string" && parsed.difficulty.trim() ? parsed.difficulty.trim() : difficulty,
                tips: typeof parsed.tips === "string" && parsed.tips.trim()
                    ? parsed.tips.trim()
                    : "Speak in complete sentences, breathe naturally, and illustrate your thoughts with an example."
            });
        }

        if (duplicateDetected) {
            return res.status(409).json({
                error: "This question was too similar to a previous one. Please generate another.",
                code: "DUPLICATE_QUESTION"
            });
        }

        return res.status(502).json({
            error: "Unable to generate a new question. Please try again.",
            code: "GENERATION_FAILED"
        });

    } catch (err) {
        const classified = classifyGeminiError(err);
        console.error(`❌ /generate-speaking-question [${classified.code}]:`, sanitizeErrorMessage(err?.message));

        let userFriendlyError = classified.message;
        if (classified.status === 429) {
            userFriendlyError = "Gemini API quota reached. Please try again after your quota resets.";
        } else if (classified.status === 504) {
            userFriendlyError = "Unable to generate a new question due to timeout. Please try again.";
        }

        return res.status(classified.status).json({
            error: userFriendlyError,
            code: classified.code
        });
    }
});

// ── Evaluate Spoken Answer ───────────────────────────────────────────────────
app.post("/evaluate-speaking", async (req, res) => {
    const { question, transcription, difficulty = "Intermediate", category = "General" } = req.body || {};

    if (!question || typeof question !== "string" || !question.trim()) {
        return res.status(400).json({ error: "Original question prompt is required.", code: "MISSING_QUESTION" });
    }

    const cleanTranscript = typeof transcription === "string" ? transcription.trim() : "";
    const wordCount = cleanTranscript ? cleanTranscript.split(/\s+/).length : 0;

    if (!cleanTranscript || wordCount < 3) {
        return res.status(400).json({
            error: "Your spoken response was too brief or could not be recognized. Please press the microphone and speak at least one complete sentence.",
            code: "EMPTY_TRANSCRIPTION"
        });
    }

    const prompt = `You are a supportive, expert English speaking examiner and communication coach evaluating a student's spoken English response.
The student SPOKE this response aloud into a microphone; it has been transcribed into text by speech recognition.

Spoken Question Prompt: "${question.trim()}"
Student Spoken Transcript: "${cleanTranscript}"
Difficulty Level: ${difficulty}
Category: ${category}

PRIMARY OBJECTIVE:
Evaluate whether the student can answer the displayed speaking question appropriately using English.
Do NOT reward unrelated answers with high overall scores simply because they are grammatically correct.
Evaluate the response across four distinct categories with strict adherence to these instructions:

1. Question Relevance (0-100) [Weight: 40% - MOST IMPORTANT]:
- Evaluate whether the student understood the question and addressed the prompt directly and meaningfully.
- Check whether the answer contains relevant information and addresses the important parts of the prompt (including multi-part prompts).
- If the response is completely unrelated (e.g. greeting the AI, talking about something completely different, or uttering random phrases like "Hey Gemini, what are you doing?"), assign a very low score (0 to 25).
- If the response is partially relevant or only touches upon the topic loosely, assign 30 to 65.
- If the response directly, meaningfully, and thoroughly addresses the question, assign 70 to 100.
- Accept natural alternative answers and personal viewpoints; do NOT require the student to use the exact wording of the question prompt.

2. Grammar Accuracy (0-100) [Weight: 25%]:
- Evaluate verb tenses, subject-verb agreement, articles, prepositions, verb forms, sentence grammar, and word order.
- CRITICAL: Identify ONLY genuine grammatical errors actually present in the transcript.
- A grammatically correct sentence that is completely off-topic must STILL receive an appropriate, high grammar score. DO NOT invent or fabricate grammatical errors just because an answer is off-topic!
- Natural spoken English conversational fillers ("well", "I think", "actually", "you know") are acceptable and should not be penalized.
- If there are no genuine grammar mistakes, return an empty array [] for "grammarMistakes".

3. Vocabulary Usage (0-100) [Weight: 20%]:
- Evaluate appropriate word selection, natural collocations, vocabulary range, and suitability for the ${difficulty} level.
- Simple, repetitive, or minimal vocabulary receives a lower/moderate score (40-65).
- Precise, varied, natural collocations and level-appropriate vocabulary receive high scores (75-100).

4. Sentence Construction (0-100) [Weight: 15%]:
- Evaluate sentence flow, coherence, variety of sentence structures (simple, compound, complex), and appropriate conversational transitions.
- A short, single simple sentence that is correctly structured receives a fair baseline score, while complex, fluent, well-connected sentences score highest.

ADDITIONAL GUIDELINES:
- DO NOT claim to assess phonetics, acoustic accent, or sound pronunciation from plain text transcription alone.
- Make all feedback encouraging, constructive, and beginner-friendly.
- "betterAnswer": Provide a natural, fluent model spoken response of 3-5 sentences showing how a native or proficient speaker would answer this question.
- "suggestions": Provide 2-3 concrete, actionable tips for elevating their speaking.
- "nextFocus": Provide a clear, specific grammar or communication skill to focus on next.

Return ONLY a valid JSON object matching this schema (no markdown, no code fences):
{
  "relevanceScore": 85,
  "grammarScore": 80,
  "vocabularyScore": 80,
  "sentenceConstructionScore": 85,
  "positiveFeedback": "Encouraging explanation of what the student communicated well.",
  "grammarMistakes": [
    {
      "originalPhrase": "phrase with error",
      "correctedPhrase": "corrected phrase",
      "explanation": "why this correction is better"
    }
  ],
  "betterAnswer": "Natural, fluent model answer to the question.",
  "suggestions": [
    "Practical suggestion 1",
    "Practical suggestion 2"
  ],
  "nextFocus": "Specific grammatical or speaking target for future practice"
}`;

    try {
        const result = await callWithRetry(prompt);
        const parsed = parseGeminiJson(result);

        // Sanitize and validate numeric category scores (0 to 100)
        const clampScore = (s, fallback = 70) => {
            const num = Number(s);
            if (Number.isFinite(num) && num >= 0 && num <= 100) return Math.round(num);
            return fallback;
        };

        const relevanceScore = clampScore(parsed.relevanceScore, 70);
        const grammarScore = clampScore(parsed.grammarScore, 70);
        const vocabularyScore = clampScore(parsed.vocabularyScore, 70);
        const sentenceConstructionScore = clampScore(parsed.sentenceConstructionScore, 70);

        // Calculate overall score mathematically in the backend using validated category scores:
        // Question Relevance: 40%, Grammar Accuracy: 25%, Vocabulary Usage: 20%, Sentence Construction: 15%
        const overallScore = Math.round(
            (relevanceScore * 0.40) +
            (grammarScore * 0.25) +
            (vocabularyScore * 0.20) +
            (sentenceConstructionScore * 0.15)
        );

        const positiveFeedback = typeof parsed.positiveFeedback === "string" && parsed.positiveFeedback.trim()
            ? parsed.positiveFeedback.trim()
            : "Good effort communicating your ideas clearly and answering the prompt.";

        const rawMistakes = Array.isArray(parsed.grammarMistakes) ? parsed.grammarMistakes : [];
        const grammarMistakes = rawMistakes
            .filter(m => m && typeof m === "object")
            .map(m => ({
                originalPhrase: String(m.originalPhrase || "").trim(),
                correctedPhrase: String(m.correctedPhrase || "").trim(),
                explanation: String(m.explanation || "").trim()
            }))
            .filter(m => m.originalPhrase && m.correctedPhrase);

        const betterAnswer = typeof parsed.betterAnswer === "string" && parsed.betterAnswer.trim()
            ? parsed.betterAnswer.trim()
            : "A well-structured answer clearly addresses the prompt with specific examples and supporting details.";

        const rawSuggestions = Array.isArray(parsed.suggestions) ? parsed.suggestions : [];
        const suggestions = rawSuggestions
            .map(s => String(s).trim())
            .filter(s => s.length > 0);

        const nextFocus = typeof parsed.nextFocus === "string" && parsed.nextFocus.trim()
            ? parsed.nextFocus.trim()
            : "Practicing complex sentence connectors and varied vocabulary.";

        return res.json({
            overallScore,
            grammarScore,
            vocabularyScore,
            sentenceConstructionScore,
            relevanceScore,
            weights: {
                relevance: 40,
                grammar: 25,
                vocabulary: 20,
                sentenceConstruction: 15
            },
            positiveFeedback,
            grammarMistakes,
            betterAnswer,
            suggestions: suggestions.length > 0 ? suggestions : ["Continue practicing spoken English daily to build fluid muscle memory."],
            nextFocus
        });

    } catch (err) {
        const classified = classifyGeminiError(err);
        console.error(`❌ /evaluate-speaking [${classified.code}]:`, sanitizeErrorMessage(err?.message));

        res.status(classified.status).json({
            error: classified.message,
            code: classified.code
        });
    }
});

// ── Word Alignment Helper Functions for Read Aloud ─────────────────────────────
function normalizeWordToken(w) {
    if (!w) return "";
    return String(w)
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, "")
        .trim();
}

function alignReadingWords(originalText, spokenText) {
    const rawOrig = (originalText || "").trim().split(/\s+/).filter(Boolean);
    const rawSpoken = (spokenText || "").trim().split(/\s+/).filter(Boolean);

    const origTokens = rawOrig.map(w => ({ text: w, clean: normalizeWordToken(w) }));
    const spokenTokens = rawSpoken.map(w => ({ text: w, clean: normalizeWordToken(w) }));

    const m = origTokens.length;
    const n = spokenTokens.length;

    // dp[i][j] stores minimum edit distance between origTokens[0..i-1] and spokenTokens[0..j-1]
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (origTokens[i - 1].clean === spokenTokens[j - 1].clean) {
                dp[i][j] = dp[i - 1][j - 1]; // Exact normalized match (cost 0)
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j - 1] + 1, // Substitution (cost 1)
                    dp[i - 1][j] + 1,     // Deletion / Missing from spoken (cost 1)
                    dp[i][j - 1] + 1      // Insertion / Extra word in spoken (cost 1)
                );
            }
        }
    }

    // Backtrack to build the exact sequence alignment
    let i = m;
    let j = n;
    const alignment = [];

    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && origTokens[i - 1].clean === spokenTokens[j - 1].clean) {
            alignment.unshift({
                original: origTokens[i - 1].text,
                spoken: spokenTokens[j - 1].text,
                cleanOriginal: origTokens[i - 1].clean,
                cleanSpoken: spokenTokens[j - 1].clean,
                status: "correct"
            });
            i--;
            j--;
        } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
            alignment.unshift({
                original: origTokens[i - 1].text,
                spoken: spokenTokens[j - 1].text,
                cleanOriginal: origTokens[i - 1].clean,
                cleanSpoken: spokenTokens[j - 1].clean,
                status: "substituted"
            });
            i--;
            j--;
        } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
            alignment.unshift({
                original: origTokens[i - 1].text,
                spoken: null,
                cleanOriginal: origTokens[i - 1].clean,
                cleanSpoken: null,
                status: "missing"
            });
            i--;
        } else {
            alignment.unshift({
                original: null,
                spoken: spokenTokens[j - 1].text,
                cleanOriginal: null,
                cleanSpoken: spokenTokens[j - 1].clean,
                status: "extra"
            });
            j--;
        }
    }

    const correctWords = alignment.filter(a => a.status === "correct");
    const missingWords = alignment.filter(a => a.status === "missing");
    const substitutedWords = alignment.filter(a => a.status === "substituted");
    const extraWords = alignment.filter(a => a.status === "extra");

    const totalOriginalWords = m;
    const accuracy = totalOriginalWords > 0
        ? Math.max(0, Math.min(100, Math.round((correctWords.length / totalOriginalWords) * 100)))
        : 0;

    return {
        accuracy,
        totalOriginalWords,
        correctCount: correctWords.length,
        missingCount: missingWords.length,
        substitutedCount: substitutedWords.length,
        extraCount: extraWords.length,
        alignment,
        missingWordsList: missingWords.map(w => w.original),
        substitutedWordsList: substitutedWords.map(w => ({ original: w.original, spoken: w.spoken })),
        extraWordsList: extraWords.map(w => w.spoken)
    };
}

function reconcileReadingAnalysis(originalText, spokenText, geminiAnalysis) {
    const rawOrig = (originalText || "").trim().split(/\s+/).filter(Boolean);
    const totalOriginalWords = rawOrig.length;
    const deterministic = alignReadingWords(originalText, spokenText);

    if (!geminiAnalysis || typeof geminiAnalysis !== "object") {
        return deterministic;
    }

    const geminiAlignment = Array.isArray(geminiAnalysis.wordAlignment) ? geminiAnalysis.wordAlignment : null;
    let isGeminiAlignmentValid = false;
    let reconciledAlignment = [];

    if (geminiAlignment && geminiAlignment.length >= rawOrig.length) {
        // Collect all items in geminiAlignment that represent original words
        const origInGemini = geminiAlignment
            .filter(item => item && item.originalWord !== null && item.originalWord !== undefined && item.originalWord !== "")
            .map(item => normalizeWordToken(item.originalWord));
        const expectedOrig = rawOrig.map(w => normalizeWordToken(w));

        // If Gemini has the exact same sequence of original words
        if (origInGemini.length === expectedOrig.length && origInGemini.every((w, idx) => w === expectedOrig[idx])) {
            isGeminiAlignmentValid = true;
            reconciledAlignment = geminiAlignment.map(item => {
                const status = ["correct", "missing", "substituted", "extra"].includes(item.status)
                    ? item.status
                    : "correct";
                const orig = item.originalWord || item.original || null;
                const spoken = item.spokenWord || item.spoken || null;
                return {
                    original: orig,
                    spoken: spoken,
                    originalWord: orig,
                    spokenWord: spoken,
                    status
                };
            });
        }
    }

    const finalAlignment = isGeminiAlignmentValid ? reconciledAlignment : deterministic.alignment;
    const correctWords = finalAlignment.filter(a => a.status === "correct");
    const missingWords = finalAlignment.filter(a => a.status === "missing");
    const substitutedWords = finalAlignment.filter(a => a.status === "substituted");
    const extraWords = finalAlignment.filter(a => a.status === "extra");

    const correctCount = correctWords.length;
    const missingCount = missingWords.length;
    const substitutedCount = substitutedWords.length;
    const extraCount = extraWords.length;

    // Accuracy = Correctly aligned original words / Total original words * 100
    const accuracy = totalOriginalWords > 0
        ? Math.max(0, Math.min(100, Math.round((correctCount / totalOriginalWords) * 100)))
        : 0;

    return {
        accuracy,
        totalOriginalWords,
        correctCount,
        missingCount,
        substitutedCount,
        extraCount,
        alignment: finalAlignment,
        correctWordsList: correctWords.map(w => w.original || w.originalWord).filter(Boolean),
        missingWordsList: missingWords.map(w => w.original || w.originalWord).filter(Boolean),
        substitutedWordsList: substitutedWords.map(w => ({
            original: w.original || w.originalWord,
            spoken: w.spoken || w.spokenWord
        })),
        extraWordsList: extraWords.map(w => w.spoken || w.spokenWord).filter(Boolean)
    };
}

// ── Generate Read Aloud Sentence ──────────────────────────────────────────────
app.post("/generate-reading-sentence", async (req, res) => {
    const { difficulty = "Intermediate", recentSentences = [] } = req.body || {};

    const validDifficulties = ["Beginner", "Intermediate", "Advanced"];
    const diff = validDifficulties.includes(difficulty) ? difficulty : "Intermediate";

    const promptGuidelines = {
        Beginner: "Length: 5 to 10 words. Short and simple sentence with everyday, common English vocabulary and basic subject-verb-object structure.",
        Intermediate: "Length: 10 to 18 words. Varied vocabulary, descriptive language, compound/complex connectors, and natural conversational or narrative flow.",
        Advanced: "Length: 15 to 25 words. Sophisticated academic or professional vocabulary, complex sentence structures, conditional clauses, or nuanced idioms."
    };

    const recentList = Array.isArray(recentSentences)
        ? recentSentences.slice(-15).map(s => String(s).trim()).filter(Boolean)
        : [];

    const prompt = `You are an expert English reading coach and curriculum designer creating content for a student's Read Aloud practice session.
Generate ONE clear, engaging, natural, grammatically correct English sentence or short passage for the student to read aloud.

TARGET DIFFICULTY LEVEL: ${diff}
SPECIFICATIONS:
${promptGuidelines[diff]}

RULES:
1. The text must be natural, educational, and meaningful.
2. Ensure the sentence length strictly adheres to the word count specified for ${diff}.
3. DO NOT repeat, rephrase, or closely mirror any of these recent sentences:
${recentList.length > 0 ? recentList.map(s => `- "${s}"`).join("\n") : "(No previous sentences yet)"}
4. Provide a brief, practical reading tip ("readingTip") advising the student on rhythm, phrasing, or pausing.
5. Return ONLY a valid JSON object matching this schema (no markdown, no code fences):
{
  "sentence": "The exact sentence to read aloud.",
  "difficulty": "${diff}",
  "wordCount": 12,
  "readingTip": "Pause briefly after the comma and emphasize the key action verbs."
}`;

    try {
        let attempts = 0;
        const maxAttempts = 2;

        while (attempts < maxAttempts) {
            attempts++;
            const result = await callWithRetry(prompt);
            const parsed = parseGeminiJson(result);

            const sentence = typeof parsed.sentence === "string" ? parsed.sentence.trim() : "";
            const wordCount = sentence ? sentence.split(/\s+/).filter(Boolean).length : 0;

            if (sentence && wordCount >= 3) {
                // Check duplicate against recent sentences
                const isDuplicate = recentList.some(r => {
                    const normR = r.toLowerCase().replace(/[^a-z0-9]/g, "");
                    const normS = sentence.toLowerCase().replace(/[^a-z0-9]/g, "");
                    return normR === normS;
                });

                if (!isDuplicate || attempts >= maxAttempts) {
                    const readingTip = typeof parsed.readingTip === "string" && parsed.readingTip.trim()
                        ? parsed.readingTip.trim()
                        : "Read clearly at a comfortable, natural pace and pause at punctuation.";

                    return res.json({
                        sentence,
                        difficulty: diff,
                        wordCount,
                        readingTip
                    });
                }
            }
        }

        return res.status(502).json({
            error: "Unable to generate a new reading sentence. Please try again.",
            code: "GENERATION_FAILED"
        });

    } catch (err) {
        const classified = classifyGeminiError(err);
        console.error(`❌ /generate-reading-sentence [${classified.code}]:`, sanitizeErrorMessage(err?.message));

        let userFriendlyError = classified.message;
        if (classified.status === 429) {
            userFriendlyError = "Gemini API quota reached. Please try again after your quota resets.";
        } else if (classified.status === 504) {
            userFriendlyError = "Unable to generate reading content due to timeout. Please try again.";
        }

        return res.status(classified.status).json({
            error: userFriendlyError,
            code: classified.code
        });
    }
});

// ── Evaluate Read Aloud Transcription ─────────────────────────────────────────
app.post("/evaluate-reading", async (req, res) => {
    const { originalText, transcription, difficulty = "Intermediate" } = req.body || {};

    if (!originalText || typeof originalText !== "string" || !originalText.trim()) {
        return res.status(400).json({ error: "Original reading text is required.", code: "MISSING_ORIGINAL_TEXT" });
    }

    const cleanTranscript = typeof transcription === "string" ? transcription.trim() : "";
    const spokenWordCount = cleanTranscript ? cleanTranscript.split(/\s+/).filter(Boolean).length : 0;

    if (!cleanTranscript || spokenWordCount === 0) {
        return res.status(400).json({
            error: "No spoken reading detected. Please press the microphone and read the sentence aloud.",
            code: "EMPTY_TRANSCRIPTION"
        });
    }

    // ── 1. Gemini performs the primary word-by-word analysis ──
    const prompt = `You are an expert English speech and reading examiner. Compare the ORIGINAL target text and the student's actual SPOKEN transcription word by word in sequential order.

Original Target Text: "${originalText.trim()}"
Student Spoken Transcript: "${cleanTranscript}"
Difficulty Level: ${difficulty}

EVALUATION INSTRUCTIONS:
1. Compare both texts carefully word-by-word in sequential order.
2. Ignore capitalization and punctuation differences (e.g. "morning." and "morning", or "Wait!" and "wait" are the exact same word).
3. Do NOT confuse a single word substitution with multiple missing words! If a word was replaced by another word (for example, "red" replaced by "yellow" in "The happy dog chased a red ball" vs "The happy dog chased a yellow ball"), recognize that "red" was SUBSTITUTED by "yellow", and that all subsequent words ("ball") are still correctly read!
4. Classify each event:
   - "correct": The spoken word matches the target word in this position.
   - "missing": A word from the original text was omitted/skipped by the student.
   - "substituted": A word from the original text was replaced by a different spoken word (e.g. "red" replaced by "yellow").
   - "extra": A spoken word that does NOT belong to the original text and was inserted.
5. Provide a complete alignment list ("wordAlignment") accounting for all original and spoken words.
   Each item must be:
   {
     "originalWord": "word from target text or null if extra",
     "spokenWord": "word from spoken transcript or null if missing",
     "status": "correct" | "missing" | "substituted" | "extra"
   }
6. "correctWords": array of target words correctly spoken.
7. "missingWords": array of target words that were omitted.
8. "substitutedWords": array of objects { "originalWord": "...", "spokenWord": "..." }.
9. "extraWords": array of spoken words that were extra insertions.
10. "explanation": Constructive, encouraging explanation of the student's reading accuracy, flow, and phrasing.
11. "difficultWords": array of tricky words from the sentence with simple pronunciation tips { "word": "...", "pronunciationTip": "..." }.
12. "improvementSuggestions": array of 2-3 practical tips for smoother reading aloud.

Return ONLY a valid JSON object matching this schema (no markdown, no code fences):
{
  "correctWords": ["The", "happy", "dog", "chased", "a", "ball"],
  "missingWords": [],
  "substitutedWords": [
    { "originalWord": "red", "spokenWord": "yellow" }
  ],
  "extraWords": [],
  "wordAlignment": [
    { "originalWord": "The", "spokenWord": "The", "status": "correct" },
    { "originalWord": "happy", "spokenWord": "happy", "status": "correct" },
    { "originalWord": "dog", "spokenWord": "dog", "status": "correct" },
    { "originalWord": "chased", "spokenWord": "chased", "status": "correct" },
    { "originalWord": "a", "spokenWord": "a", "status": "correct" },
    { "originalWord": "red", "spokenWord": "yellow", "status": "substituted" },
    { "originalWord": "ball", "spokenWord": "ball", "status": "correct" }
  ],
  "explanation": "Great reading! You read almost the entire sentence accurately, substituting only 'red' with 'yellow'.",
  "difficultWords": [],
  "improvementSuggestions": [
    "Focus on reading the exact words on the page without anticipating words."
  ]
}`;

    try {
        const result = await callWithRetry(prompt);
        const parsed = parseGeminiJson(result);

        // ── 2. Mandatory Backend Validation & Reconciliation ──
        // Validates Gemini's wordAlignment, checks substitution/missing/extra classifications,
        // reconciles inconsistencies with deterministic alignment, and computes accuracy mathematically.
        const reconciled = reconcileReadingAnalysis(originalText.trim(), cleanTranscript, parsed);

        const explanation = typeof parsed.explanation === "string" && parsed.explanation.trim()
            ? parsed.explanation.trim()
            : (typeof parsed.feedback === "string" && parsed.feedback.trim()
                ? parsed.feedback.trim()
                : (reconciled.accuracy >= 90
                    ? "Excellent reading! You pronounced almost every word accurately and kept a steady pace."
                    : reconciled.accuracy >= 70
                    ? "Good effort! You read most words accurately; focus on pacing and tricky word endings."
                    : "Good attempt! Take your time to read each word distinctly without rushing."));

        const rawDifficult = Array.isArray(parsed.difficultWords) ? parsed.difficultWords : [];
        const difficultWords = rawDifficult
            .filter(d => d && typeof d === "object")
            .map(d => ({
                word: String(d.word || "").trim(),
                pronunciationTip: String(d.pronunciationTip || "").trim()
            }))
            .filter(d => d.word);

        const rawSuggestions = Array.isArray(parsed.improvementSuggestions)
            ? parsed.improvementSuggestions
            : (Array.isArray(parsed.suggestions) ? parsed.suggestions : []);
        const suggestions = rawSuggestions
            .map(s => String(s).trim())
            .filter(s => s.length > 0);

        const fluencyLevel = typeof parsed.fluencyLevel === "string" && ["Fluent", "Good", "Developing"].includes(parsed.fluencyLevel)
            ? parsed.fluencyLevel
            : (reconciled.accuracy >= 85 ? "Fluent" : reconciled.accuracy >= 65 ? "Good" : "Developing");

        return res.json({
            accuracyScore: reconciled.accuracy,
            totalWords: reconciled.totalOriginalWords,
            correctCount: reconciled.correctCount,
            missingCount: reconciled.missingCount,
            substitutedCount: reconciled.substitutedCount,
            extraCount: reconciled.extraCount,
            alignment: reconciled.alignment,
            wordAlignment: reconciled.alignment,
            correctWords: reconciled.correctWordsList,
            missingWords: reconciled.missingWordsList,
            substitutedWords: reconciled.substitutedWordsList,
            extraWords: reconciled.extraWordsList,
            explanation,
            feedback: explanation,
            difficultWords,
            improvementSuggestions: suggestions.length > 0 ? suggestions : ["Read through the sentence once silently before speaking to identify challenging words."],
            suggestions: suggestions.length > 0 ? suggestions : ["Read through the sentence once silently before speaking to identify challenging words."],
            fluencyLevel
        });

    } catch (err) {
        const classified = classifyGeminiError(err);
        console.error(`❌ /evaluate-reading [${classified.code}]:`, sanitizeErrorMessage(err?.message));

        return res.status(classified.status).json({
            error: classified.message,
            code: classified.code
        });
    }
});

// ── Story Content & Plot Similarity Helper ──────────────────────────────────
const STORY_STOP_WORDS = new Set([
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
    "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both",
    "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't",
    "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't",
    "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here",
    "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll",
    "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's",
    "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once",
    "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't",
    "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that",
    "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these",
    "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too",
    "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were",
    "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's",
    "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're",
    "you've", "your", "yours", "yourself", "yourselves"
]);

function extractStoryKeywords(text = "") {
    return String(text || "")
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(w => w.length >= 3 && !STORY_STOP_WORDS.has(w));
}

function calculateJaccardOverlap(setA, setB) {
    if (setA.size === 0 && setB.size === 0) return 1.0;
    if (setA.size === 0 || setB.size === 0) return 0.0;
    let intersection = 0;
    for (const item of setA) {
        if (setB.has(item)) intersection++;
    }
    const union = setA.size + setB.size - intersection;
    return union > 0 ? intersection / union : 0;
}

function detectStoryDuplicate(newTitle, newStory, recentStories = []) {
    const normNewTitle = (newTitle || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const newKeywords = new Set(extractStoryKeywords(`${newTitle} ${newStory}`));

    for (const recent of recentStories) {
        const recentTitle = typeof recent === "string" ? recent : (recent?.title || "");
        const recentText = typeof recent === "object" ? (recent?.story || recent?.plot || "") : "";

        // 1. Normalized Title comparison
        const normRecentTitle = recentTitle.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (normNewTitle && normRecentTitle) {
            if (normNewTitle === normRecentTitle) {
                return { isDuplicate: true, reason: `Exact matching title ("${recentTitle}")` };
            }
            if (normNewTitle.length >= 6 && normRecentTitle.length >= 6) {
                if (normNewTitle.includes(normRecentTitle) || normRecentTitle.includes(normNewTitle)) {
                    return { isDuplicate: true, reason: `Substring title match ("${recentTitle}")` };
                }
            }
        }

        // 2. Title token similarity
        const titleTokensA = new Set(extractStoryKeywords(newTitle));
        const titleTokensB = new Set(extractStoryKeywords(recentTitle));
        const titleSim = calculateJaccardOverlap(titleTokensA, titleTokensB);
        if (titleSim >= 0.45) {
            return { isDuplicate: true, reason: `High title similarity (${Math.round(titleSim * 100)}%) with "${recentTitle}"` };
        }

        // 3. Story content & semantic plot similarity
        if (recentText) {
            const recentKeywords = new Set(extractStoryKeywords(`${recentTitle} ${recentText}`));
            const contentSim = calculateJaccardOverlap(newKeywords, recentKeywords);

            let sharedKeywords = 0;
            for (const kw of newKeywords) {
                if (recentKeywords.has(kw)) sharedKeywords++;
            }

            if (contentSim >= 0.30 || sharedKeywords >= 4) {
                return { isDuplicate: true, reason: `Substantial plot/content overlap (${Math.round(contentSim * 100)}% sim, ${sharedKeywords} shared entities) with "${recentTitle}"` };
            }
        }
    }

    return { isDuplicate: false };
}

// ── Generate Listening Story & 5 Comprehension Questions ──────────────────────
app.post("/generate-listening-story", async (req, res) => {
    const { difficulty = "Intermediate", recentStories = [] } = req.body || {};

    const validDifficulties = ["Beginner", "Intermediate", "Advanced"];
    const diff = validDifficulties.includes(difficulty) ? difficulty : "Intermediate";

    // Strictly calibrated for 30–60 second duration across ALL difficulty levels
    const promptGuidelines = {
        Beginner: "Length: strictly 65 to 80 words. Spoken duration: ~32 to 40 seconds at comfortable beginner speech pace. Simple everyday vocabulary, linear plot, friendly relatable scenario.",
        Intermediate: "Length: strictly 85 to 105 words. Spoken duration: ~38 to 48 seconds at natural conversational pace. Varied sentence structures, engaging narrative with a clear turning point.",
        Advanced: "Length: strictly 110 to 135 words. Spoken duration: ~48 to 58 seconds (DO NOT EXCEED 60 SECONDS). Rich narrative with nuanced clues, sophisticated vocabulary, compelling resolution."
    };

    const recentList = Array.isArray(recentStories) ? recentStories.slice(-15) : [];
    const recentSummaries = recentList
        .map(item => {
            if (typeof item === "string") return item.trim();
            if (item && typeof item === "object") {
                const t = item.title || "";
                const s = (item.story || item.plot || "").slice(0, 80);
                return t ? (s ? `"${t}" (${s}...)` : `"${t}"`) : "";
            }
            return "";
        })
        .filter(Boolean);

    const prompt = `You are a master English curriculum designer and storyteller crafting an audio listening comprehension exercise for an English learning student.

TASK:
1. Generate ONE engaging, original, self-contained short story suitable for audio listening practice.
2. Generate EXACTLY 5 multiple-choice listening comprehension questions based ONLY on the story.

TARGET DIFFICULTY LEVEL: ${diff}
SPECIFICATIONS:
${promptGuidelines[diff]}

CRITICAL DURATION & WORD COUNT REQUIREMENT:
Every single story MUST take strictly between 30 and 60 seconds to listen to, including Advanced stories.
Under NO circumstances should any story exceed 60 seconds (more than 138 words) or be shorter than 30 seconds (fewer than 60 words):
- Beginner: 65 to 80 words (~32–40s)
- Intermediate: 85 to 105 words (~38–48s)
- Advanced: 110 to 135 words (~48–58s)

STORY REQUIREMENTS:
- Perfectly natural, grammatically flawless English.
- Compelling narrative with clear characters, a definite setting, an interesting situation, actions, and a satisfying resolution.
- Diverse genres: mystery, daily life, travel, adventure, science discovery, friendly teamwork, or personal achievement.
- Avoid clichés and strictly avoid repeating or closely resembling any of these recently generated story titles, characters, or plots:
${recentSummaries.length > 0 ? recentSummaries.map(t => `  - ${t}`).join("\n") : "  (No previous stories recorded)"}

COMPREHENSION QUESTIONS SPECIFICATIONS:
You MUST generate EXACTLY 5 multiple-choice questions adhering to these 5 distinct cognitive targets:
1. Question 1 (main_idea): The main purpose, central theme, or overarching takeaway of the story.
2. Question 2 (character_detail): A specific character emotion, motivation, role, or relationship.
3. Question 3 (event_sequence): A critical event, turning point, or what happened before/after an action.
4. Question 4 (cause_effect): The underlying reason why something occurred or why a character made a decision.
5. Question 5 (specific_fact): A concrete factual detail explicitly mentioned (a specific place, object, color, time, or name).

RULES FOR EACH QUESTION:
- Exactly 4 plausible, distinct options (strings).
- Exactly ONE unambiguously correct answer.
- The "answer" field MUST match the exact text of one of the 4 options.
- Distractors must be believable and contextually relevant, but clearly incorrect according to the story.

RESPOND ONLY WITH VALID JSON matching this exact structure:
{
  "title": "Creative Story Title",
  "difficulty": "${diff}",
  "genre": "Adventure",
  "estimatedDuration": "45 seconds",
  "story": "The complete narrative text here...",
  "questions": [
    {
      "id": 1,
      "type": "main_idea",
      "question": "What is the main topic of the story?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A"
    },
    {
      "id": 2,
      "type": "character_detail",
      "question": "How did the character feel at the start?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option B"
    },
    {
      "id": 3,
      "type": "event_sequence",
      "question": "What happened right after the bell rang?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option C"
    },
    {
      "id": 4,
      "type": "cause_effect",
      "question": "Why did they decide to turn left?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option D"
    },
    {
      "id": 5,
      "type": "specific_fact",
      "question": "What color was the vintage bicycle?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A"
    }
  ]
}`;

    try {
        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
            attempts++;
            const result = await callWithRetry(prompt);
            const parsed = parseGeminiJson(result);

            const title = typeof parsed.title === "string" ? parsed.title.trim() : "";
            const story = typeof parsed.story === "string" ? parsed.story.trim() : "";
            const wordCount = story ? story.split(/\s+/).filter(Boolean).length : 0;
            const genre = typeof parsed.genre === "string" && parsed.genre.trim() ? parsed.genre.trim() : "General";

            // Enforce strict 30–60 second duration window
            const minWords = diff === "Beginner" ? 60 : diff === "Intermediate" ? 75 : 95;
            const maxWords = diff === "Beginner" ? 85 : diff === "Intermediate" ? 112 : 138;
            const isLengthValid = wordCount >= minWords && wordCount <= maxWords;

            const wordsPerSec = diff === "Beginner" ? 2.05 : diff === "Intermediate" ? 2.25 : 2.42;
            const secondsEst = Math.max(30, Math.min(59, Math.round(wordCount / wordsPerSec)));
            const estimatedDuration = `${secondsEst} seconds`;

            const rawQuestions = Array.isArray(parsed.questions) ? parsed.questions : [];

            // Validate questions
            const validQuestions = rawQuestions
                .filter(q => q && typeof q === "object")
                .map((q, idx) => {
                    const qId = q.id ?? (idx + 1);
                    const qText = typeof q.question === "string" ? q.question.trim() : "";
                    const rawOptions = Array.isArray(q.options) ? q.options : [];
                    const options = rawOptions.map(opt => String(opt).trim()).filter(Boolean);
                    const answer = typeof q.answer === "string" ? q.answer.trim() : "";

                    const answerMatch = options.find(opt => opt.toLowerCase() === answer.toLowerCase());

                    return {
                        id: qId,
                        type: typeof q.type === "string" ? q.type : "comprehension",
                        question: qText,
                        options,
                        answer: answerMatch || answer
                    };
                })
                .filter(q => q.question && q.options.length === 4 && q.options.includes(q.answer));

            if (title && story && isLengthValid && validQuestions.length === 5) {
                // Semantic & content duplicate check
                const duplicateCheck = detectStoryDuplicate(title, story, recentList);
                if (duplicateCheck.isDuplicate) {
                    console.warn(`⚠ Duplicate rejected (attempt ${attempts}/${maxAttempts}): ${duplicateCheck.reason}`);
                    if (attempts < maxAttempts) {
                        continue;
                    }
                } else {
                    return res.json({
                        id: `story_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
                        title,
                        difficulty: diff,
                        genre,
                        estimatedDuration,
                        wordCount,
                        story,
                        questions: validQuestions
                    });
                }
            } else {
                console.warn(`⚠ Story validation failed (attempt ${attempts}/${maxAttempts}): words=${wordCount} (expected ${minWords}-${maxWords}), questions=${validQuestions.length}`);
            }
        }

        return res.status(502).json({
            error: "Unable to generate a unique listening story within the target 30–60s duration. Please click Retry.",
            code: "GENERATION_FAILED"
        });

    } catch (err) {
        const classified = classifyGeminiError(err);
        console.error(`❌ /generate-listening-story [${classified.code}]:`, sanitizeErrorMessage(err?.message));

        let userFriendlyError = classified.message;
        if (classified.status === 429) {
            userFriendlyError = "Gemini API quota reached. Please try again after your quota resets.";
        } else if (classified.status === 504) {
            userFriendlyError = "Unable to generate listening story due to timeout. Please try again.";
        }

        return res.status(classified.status).json({
            error: userFriendlyError,
            code: classified.code
        });
    }
});

// ── Evaluate Listening Comprehension Quiz ──────────────────────────────────────
app.post("/evaluate-listening-quiz", async (req, res) => {
    const { story = "", questions = [], userAnswers = {}, difficulty = "Intermediate" } = req.body || {};

    if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ error: "Questions are required for evaluation." });
    }

    // Mathematical scoring: 100% deterministic & accurate
    let correctCount = 0;
    const questionAnalysis = questions.map((q, idx) => {
        const qId = q.id ?? (idx + 1);
        const selected = userAnswers[qId] !== undefined ? String(userAnswers[qId]).trim() : "";
        const expected = String(q.answer || "").trim();
        const isCorrect = selected.length > 0 && selected.toLowerCase() === expected.toLowerCase();
        if (isCorrect) correctCount++;

        return {
            id: qId,
            type: q.type || "comprehension",
            question: q.question,
            options: Array.isArray(q.options) ? q.options : [],
            selectedAnswer: selected || "No answer selected",
            correctAnswer: expected,
            isCorrect
        };
    });

    const totalQuestions = questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    // Call Gemini to generate friendly, constructive explanations for each question based on story events
    let geminiExplanations = {};
    let overallAssessment = "";
    let improvementAreas = [];

    try {
        const prompt = `You are a supportive English coach reviewing a student's listening comprehension quiz.

STORY LISTENED TO:
"""
${story}
"""

DETERMINISTIC TEST RESULTS (CALCULATED VIA VALIDATED ANSWER KEY):
Total Questions: ${totalQuestions}
Correct: ${correctCount} (${percentage}%)
Difficulty Level: ${difficulty}

QUESTIONS & STUDENT CHOICES:
${questionAnalysis.map(q => `
Question ${q.id} (${q.type}): "${q.question}"
- Student chose: "${q.selectedAnswer}"
- Verified correct answer: "${q.correctAnswer}"
- Result: ${q.isCorrect ? "CORRECT" : "INCORRECT"}
`).join("\n")}

CRITICAL INSTRUCTIONS:
1. The mathematical score (${correctCount}/${totalQuestions}, ${percentage}%) and question correctness (CORRECT / INCORRECT) are FIXED and CANNOT be changed or reinterpreted.
2. Provide a clear, friendly 1-2 sentence explanation for EACH question referencing the specific detail, event, or sentence from the story that confirms why the verified correct answer is right. Do not invent details or explanations outside the provided story text.
3. Provide a warm, constructive 2-3 sentence overall assessment of the student's listening comprehension skills based on their actual score.
4. Provide 2 to 3 actionable listening tips/improvement areas tailored specifically to whether they missed main ideas, specific facts, sequence of events, or cause-effect reasoning.

RESPOND ONLY WITH VALID JSON:
{
  "questionExplanations": [
    {
      "id": 1,
      "explanation": "Clear explanation citing the story..."
    }
  ],
  "overallAssessment": "Your overall assessment paragraph here...",
  "improvementAreas": [
    "Tip 1...",
    "Tip 2..."
  ]
}`;

        const result = await callWithRetry(prompt, 1);
        const parsed = parseGeminiJson(result);

        if (Array.isArray(parsed.questionExplanations)) {
            parsed.questionExplanations.forEach(item => {
                if (item && item.id !== undefined && item.explanation) {
                    geminiExplanations[item.id] = String(item.explanation).trim();
                }
            });
        }
        if (typeof parsed.overallAssessment === "string" && parsed.overallAssessment.trim()) {
            overallAssessment = parsed.overallAssessment.trim();
        }
        if (Array.isArray(parsed.improvementAreas)) {
            improvementAreas = parsed.improvementAreas.map(t => String(t).trim()).filter(Boolean);
        }
    } catch (err) {
        console.warn("⚠ Gemini evaluation explanation call failed, using deterministic explanations:", err?.message);
    }

    // Merge explanations
    const questionResults = questionAnalysis.map(q => ({
        ...q,
        explanation: geminiExplanations[q.id] || (
            q.isCorrect
                ? `Excellent! "${q.correctAnswer}" matches the story details accurately.`
                : `The correct answer is "${q.correctAnswer}". Listen closely to key clues in the story.`
        )
    }));

    if (!overallAssessment) {
        overallAssessment = percentage >= 80
            ? `Outstanding listening comprehension! You captured ${correctCount} out of ${totalQuestions} key points accurately. Your focus and retention of details are commendable.`
            : percentage >= 60
            ? `Good effort! You understood the major ideas and answered ${correctCount} out of ${totalQuestions} questions correctly. Paying attention to specific character actions and sequences will help you score even higher.`
            : `Keep practicing! Listening to English stories takes active ear training. You correctly answered ${correctCount} out of ${totalQuestions} questions. Replay audio when needed to catch subtle details.`;
    }

    if (improvementAreas.length === 0) {
        improvementAreas = [
            "Listen for key transition words (like 'suddenly', 'because', 'however') that signal critical turning points.",
            "Visualize the characters and settings in your mind as you listen to strengthen memory recall.",
            "Focus on the main sequence of events before trying to memorize every minor fact."
        ];
    }

    return res.json({
        score: correctCount,
        totalQuestions,
        percentage,
        questionResults,
        overallAssessment,
        improvementAreas
    });
});

// ── Production Client Static Assets (Unified Deployment) ──────────────────────
const clientBuildPath = path.join(__dirname, "../client/build");
if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
    app.get("*", (req, res, next) => {
        if (
            req.path.startsWith("/generate") ||
            req.path.startsWith("/evaluate") ||
            req.path.startsWith("/validate")
        ) {
            return next();
        }
        res.sendFile(path.join(clientBuildPath, "index.html"));
    });
    console.log("📦 Serving production client build from:", clientBuildPath);
}

// ── Start ──────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));