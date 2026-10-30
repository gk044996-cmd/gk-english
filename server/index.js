import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// ── Gemini setup ──────────────────────────────────────────────────────────────
if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY is missing in .env — server cannot serve AI questions.");
    process.exit(1); // crash intentionally so you notice immediately
}

console.log("✅ GEMINI KEY LOADED");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Try models in preference order — first one that works is used
const MODEL_CANDIDATES = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-exp",
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-pro",
];

let model = null;

async function initModel() {
    const testPrompt = { contents: [{ role: "user", parts: [{ text: "ping" }] }] };
    for (const name of MODEL_CANDIDATES) {
        try {
            const candidate = genAI.getGenerativeModel({ model: name });
            await candidate.generateContent(testPrompt);
            model = candidate;
            console.log(`✅ Gemini model ready: ${name}`);
            return;
        } catch (e) {
            const code = e.status || (e.message?.includes("404") ? 404 : e.message?.includes("403") ? 403 : "?");
            console.warn(`  ⚠ ${name} → ${code}`);
        }
    }
    console.error("❌ No working Gemini model found. Check your API key at https://aistudio.google.com/apikey");
}

initModel();

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "English Coach AI Backend is running 🚀" });
});

// ── Generate Question ─────────────────────────────────────────────────────────
app.post("/generate-question", async (req, res) => {
    if (!model) {
        return res.status(503).json({
            error: "Gemini AI is not available. Your API key may be expired or quota-exceeded. Please get a new key at https://aistudio.google.com/apikey and update server/.env"
        });
    }
    const topics = [
        "Present Simple", "Past Simple", "Past Continuous", "Present Perfect",
        "Past Perfect", "Future Simple", "Future Perfect", "Conditionals (First)",
        "Conditionals (Second)", "Conditionals (Third)", "Passive Voice",
        "Articles (a/an/the)", "Prepositions of Time", "Prepositions of Place",
        "Relative Clauses", "Modal Verbs (can/could/may/might/should/must)",
        "Gerund vs Infinitive", "Subject-Verb Agreement", "Phrasal Verbs",
        "Reported Speech", "Question Tags", "Comparison (comparative/superlative)",
        "Conjunctions", "Determiners", "Countable vs Uncountable Nouns"
    ];

    const difficulties = ["Beginner", "Intermediate", "Advanced"];

    const topic = topics[Math.floor(Math.random() * topics.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const seed = Math.floor(Math.random() * 999_999_999) + Date.now();

    const prompt = `You are an expert English grammar teacher. Generate ONE unique, original English grammar multiple-choice question.

Topic: ${topic}
Difficulty: ${difficulty}
Uniqueness seed: ${seed}

STRICT RULES:
- The question must test ONLY grammar, not vocabulary guessing.
- All 4 options must be plausible (no obviously wrong answers).
- The question must be a fill-in-the-blank or error-correction sentence.
- The explanation must be educational (explain the grammar rule, not just repeat the answer).

Return ONLY valid JSON (no markdown, no extra text):
{
  "question": "Fill in the blank: She ___ to Paris three times already.",
  "options": ["has been", "have been", "was", "went"],
  "answer": "has been",
  "explanation": "We use the Present Perfect (has/have + past participle) when talking about life experience without specifying a time. 'Already' further confirms Present Perfect is needed here.",
  "topic": "${topic}",
  "difficulty": "${difficulty}"
}`;

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });

        let text = result.response.text().trim();
        // strip any accidental markdown fences
        text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

        const parsed = JSON.parse(text);

        // Validate required fields
        if (!parsed.question || !Array.isArray(parsed.options) || parsed.options.length !== 4 || !parsed.answer || !parsed.explanation) {
            throw new Error("Gemini returned incomplete question JSON");
        }

        res.json(parsed);

    } catch (err) {
        console.error("❌ /generate-question error:", err.message);
        res.status(500).json({
            error: "AI failed to generate a question. Please try again.",
            detail: err.message
        });
    }
});

// ── Evaluate Answer ───────────────────────────────────────────────────────────
// Client sends: { question, options, correctAnswer, userAnswer, topic, difficulty }
// Server returns: { isCorrect, feedback, grammarRule, tip }
app.post("/evaluate-answer", async (req, res) => {
    if (!model) {
        return res.status(503).json({ error: "Gemini AI not available" });
    }
    const { question, options, correctAnswer, userAnswer, topic, difficulty } = req.body;

    if (!question || !correctAnswer || !userAnswer) {
        return res.status(400).json({ error: "Missing required fields: question, correctAnswer, userAnswer" });
    }

    const isCorrect = userAnswer.trim() === correctAnswer.trim();

    const prompt = `You are an expert English grammar teacher evaluating a student's answer.

Question: "${question}"
Options: ${JSON.stringify(options)}
Correct Answer: "${correctAnswer}"
Student's Answer: "${userAnswer}"
Result: ${isCorrect ? "CORRECT ✅" : "WRONG ❌"}
Topic: ${topic || "English Grammar"}
Difficulty: ${difficulty || "General"}

Write a SHORT, encouraging, educational response (3–5 sentences max) that:
1. ${isCorrect ? "Confirms they got it right and reinforces WHY it is correct." : "Kindly explains why their answer is wrong and why the correct answer is right."}
2. States the grammar rule being tested in simple, clear language.
3. Gives ONE quick memory tip or example sentence to help them remember.

Return ONLY valid JSON (no markdown):
{
  "isCorrect": ${isCorrect},
  "feedback": "Your encouraging + educational feedback here.",
  "grammarRule": "The specific rule tested in one sentence.",
  "tip": "A memory tip or example sentence."
}`;

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });

        let text = result.response.text().trim();
        text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

        const parsed = JSON.parse(text);
        res.json({ ...parsed, isCorrect });

    } catch (err) {
        console.error("❌ /evaluate-answer error:", err.message);
        // Graceful degradation: still tell the user if they're right/wrong
        res.json({
            isCorrect,
            feedback: isCorrect
                ? `✅ Correct! "${correctAnswer}" is the right answer.`
                : `❌ Not quite. The correct answer is "${correctAnswer}".`,
            grammarRule: "",
            tip: ""
        });
    }
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});