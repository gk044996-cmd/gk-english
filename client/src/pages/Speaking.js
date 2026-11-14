import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import API_URL from "../api";

const SPEAKING_CATEGORIES = [
    "All Categories",
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

const TOTAL_SPEAKING_SECONDS = 60;
const REQUEST_TIMEOUT_MS = 20000;
const HISTORY_STORAGE_KEY = "coach_speaking_history";
const LEVEL_STORAGE_KEY = "coach_speaking_level";
const CAT_STORAGE_KEY = "coach_speaking_cat";
const CURRENT_Q_KEY = "coach_speaking_current_q";

const DIFFICULTY_THEMES = {
    Beginner: { bg: "rgba(16, 185, 129, 0.15)", border: "#10b981", text: "#34d399" },
    Intermediate: { bg: "rgba(139, 92, 246, 0.18)", border: "#8b5cf6", text: "#c4b5fd" },
    Advanced: { bg: "rgba(244, 63, 94, 0.18)", border: "#f43f5e", text: "#fb7185" }
};

const Speaking = () => {
    // ── Persistent preferences & question history ─────────────────────────────
    const [difficulty, setDifficulty] = useState(() => {
        return localStorage.getItem(LEVEL_STORAGE_KEY) || "Intermediate";
    });

    const [category, setCategory] = useState(() => {
        return localStorage.getItem(CAT_STORAGE_KEY) || "All Categories";
    });

    const [questionHistory, setQuestionHistory] = useState(() => {
        try {
            const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // ── Current question state (from session storage or fetched fresh from Gemini) ─
    const [currentQuestion, setCurrentQuestion] = useState(() => {
        try {
            const saved = localStorage.getItem(CURRENT_Q_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
    const [questionError, setQuestionError] = useState("");

    // ── Native Audio Playback state ───────────────────────────────────────────
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [isPlayingModelAnswer, setIsPlayingModelAnswer] = useState(false);

    // ── 60-Second Timed Speaking Test State ───────────────────────────────────
    const [remainingSeconds, setRemainingSeconds] = useState(TOTAL_SPEAKING_SECONDS);
    const remainingRef = useRef(TOTAL_SPEAKING_SECONDS);
    const timerRef = useRef(null);

    // ── Speech Recognition & Recording state ──────────────────────────────────
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [speechError, setSpeechError] = useState("");
    const recognitionRef = useRef(null);
    const transcriptRef = useRef("");
    const isStoppingRef = useRef(false);
    const evaluatedRef = useRef(false);
    const safetyTimeoutRef = useRef(null);

    // ── Evaluation state ──────────────────────────────────────────────────────
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [evaluation, setEvaluation] = useState(null);
    const [evaluationError, setEvaluationError] = useState("");

    // Persist difficulty & category
    useEffect(() => {
        localStorage.setItem(LEVEL_STORAGE_KEY, difficulty);
    }, [difficulty]);

    useEffect(() => {
        localStorage.setItem(CAT_STORAGE_KEY, category);
    }, [category]);

    // Persist question history (keep up to 40 recent items)
    useEffect(() => {
        try {
            localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(questionHistory.slice(-40)));
        } catch (e) {
            console.error("Failed to save speaking question history:", e);
        }
    }, [questionHistory]);

    // Persist current active question
    useEffect(() => {
        if (currentQuestion) {
            try {
                localStorage.setItem(CURRENT_Q_KEY, JSON.stringify(currentQuestion));
            } catch {}
        }
    }, [currentQuestion]);

    // Cleanup audio, timers, and speech recognition on unmount
    useEffect(() => {
        return () => {
            if ("speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.abort();
                } catch {}
            }
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            if (safetyTimeoutRef.current) {
                clearTimeout(safetyTimeoutRef.current);
            }
        };
    }, []);

    // ── Gemini Question Generator ─────────────────────────────────────────────
    const fetchNewQuestion = useCallback(async (forcedCategory = null, forcedDifficulty = null) => {
        const catToSend = forcedCategory !== null ? forcedCategory : category;
        const diffToSend = forcedDifficulty !== null ? forcedDifficulty : difficulty;

        // Reset timer and recording session
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (safetyTimeoutRef.current) {
            clearTimeout(safetyTimeoutRef.current);
            safetyTimeoutRef.current = null;
        }
        if (recognitionRef.current) {
            try {
                recognitionRef.current.abort();
            } catch {}
        }
        remainingRef.current = TOTAL_SPEAKING_SECONDS;
        setRemainingSeconds(TOTAL_SPEAKING_SECONDS);
        setIsRecording(false);
        isStoppingRef.current = false;
        evaluatedRef.current = false;

        setIsLoadingQuestion(true);
        setQuestionError("");
        setTranscript("");
        transcriptRef.current = "";
        setSpeechError("");
        setEvaluation(null);
        setEvaluationError("");

        // Stop any active audio
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            setIsPlayingAudio(false);
            setIsPlayingModelAnswer(false);
        }

        try {
            const chosenCategory = catToSend === "All Categories" ? undefined : catToSend;
            const res = await axios.post(
                `${API_URL}/generate-speaking-question`,
                {
                    difficulty: diffToSend,
                    category: chosenCategory,
                    recentQuestions: questionHistory.slice(-20)
                },
                { timeout: REQUEST_TIMEOUT_MS }
            );

            if (res.data && res.data.question) {
                const newQ = {
                    text: res.data.question,
                    category: res.data.category || catToSend,
                    difficulty: res.data.difficulty || diffToSend,
                    tips: res.data.tips || "Speak clearly in complete sentences and elaborate with reasons or examples."
                };
                setCurrentQuestion(newQ);

                // Add to persistent history
                setQuestionHistory((prev) => [...prev, newQ.text]);
            }
        } catch (err) {
            console.error("Error generating speaking question:", err);
            const status = err.response?.status;
            const code = err.response?.data?.code;
            const serverMsg = err.response?.data?.error;

            if (status === 429 || code === "QUOTA_EXHAUSTED") {
                setQuestionError("Gemini API quota reached. Please try again after your quota resets.");
            } else if (status === 409 || code === "DUPLICATE_QUESTION") {
                setQuestionError("This question was too similar to a previous one. Please generate another.");
            } else if (err.code === "ECONNABORTED" || status === 504 || code === "TIMEOUT") {
                setQuestionError("Unable to generate a new question due to timeout. Please try again.");
            } else {
                setQuestionError(serverMsg || "Unable to generate a new question. Please try again.");
            }
        } finally {
            setIsLoadingQuestion(false);
        }
    }, [category, difficulty, questionHistory]);

    // Auto-generate first question on initial visit if none exists in storage
    useEffect(() => {
        if (!currentQuestion) {
            fetchNewQuestion();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Difficulty Change Handler ─────────────────────────────────────────────
    const handleDifficultyChange = (newDiff) => {
        if (newDiff === difficulty) return;
        setDifficulty(newDiff);
        fetchNewQuestion(null, newDiff);
    };

    // ── Category Change Handler ───────────────────────────────────────────────
    const handleCategoryChange = (newCat) => {
        if (newCat === category) return;
        setCategory(newCat);
        fetchNewQuestion(newCat, null);
    };

    // ── Native Audio Playback ─────────────────────────────────────────────────
    const playQuestionAudio = () => {
        if (!currentQuestion?.text) return;

        if (!("speechSynthesis" in window)) {
            setSpeechError("Speech synthesis is not supported in this browser.");
            return;
        }

        if (isPlayingAudio) {
            window.speechSynthesis.cancel();
            setIsPlayingAudio(false);
            return;
        }

        window.speechSynthesis.cancel();
        setIsPlayingModelAnswer(false);

        const utterance = new SpeechSynthesisUtterance(currentQuestion.text);
        utterance.rate = difficulty === "Beginner" ? 0.85 : 0.95;
        utterance.lang = "en-US";

        utterance.onstart = () => setIsPlayingAudio(true);
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);

        window.speechSynthesis.speak(utterance);
    };

    const playModelAnswerAudio = (answerText) => {
        if (!("speechSynthesis" in window) || !answerText) return;

        if (isPlayingModelAnswer) {
            window.speechSynthesis.cancel();
            setIsPlayingModelAnswer(false);
            return;
        }

        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);

        const utterance = new SpeechSynthesisUtterance(answerText);
        utterance.rate = 0.92;
        utterance.lang = "en-US";

        utterance.onstart = () => setIsPlayingModelAnswer(true);
        utterance.onend = () => setIsPlayingModelAnswer(false);
        utterance.onerror = () => setIsPlayingModelAnswer(false);

        window.speechSynthesis.speak(utterance);
    };

    // ── Execute Gemini Answer Evaluation ──────────────────────────────────────
    const executeEvaluation = useCallback(async (transcriptionToEval) => {
        const textToEvaluate = (typeof transcriptionToEval === "string" ? transcriptionToEval : (transcriptRef.current || transcript)).trim();

        if (!currentQuestion?.text) {
            setSpeechError("No active question prompt to evaluate against. Please generate a question first.");
            return;
        }

        const words = textToEvaluate.split(/\s+/).filter(Boolean);
        if (words.length < 3) {
            setSpeechError("Your spoken response was too short (less than 3 words). Please click 'Start Speaking' and speak at least one complete sentence.");
            return;
        }

        setIsEvaluating(true);
        setEvaluationError("");
        setSpeechError("");

        try {
            const res = await axios.post(
                `${API_URL}/evaluate-speaking`,
                {
                    question: currentQuestion.text,
                    transcription: textToEvaluate,
                    difficulty: currentQuestion.difficulty || difficulty,
                    category: currentQuestion.category || category
                },
                { timeout: REQUEST_TIMEOUT_MS }
            );

            if (res.data) {
                setEvaluation(res.data);
            }
        } catch (err) {
            console.error("Evaluation error:", err);
            const status = err.response?.status;
            const code = err.response?.data?.code;
            const msg = err.response?.data?.error;

            if (code === "EMPTY_TRANSCRIPTION") {
                setSpeechError(msg);
            } else if (status === 429) {
                setEvaluationError("Gemini daily quota reached. Please try again tomorrow or upgrade your API tier.");
            } else if (err.code === "ECONNABORTED" || status === 504) {
                setEvaluationError("Gemini evaluation timed out. Please click 'Retry Evaluation'.");
            } else {
                setEvaluationError(msg || "Failed to analyze speech. Please verify the backend service is running and click 'Retry Evaluation'.");
            }
        } finally {
            setIsEvaluating(false);
        }
    }, [currentQuestion, difficulty, category, transcript]);

    // ── Finalize Transcription & Trigger Automatic Evaluation ─────────────────
    const finalizeAndEvaluate = useCallback(() => {
        if (safetyTimeoutRef.current) {
            clearTimeout(safetyTimeoutRef.current);
            safetyTimeoutRef.current = null;
        }

        // Prevent duplicate evaluations per recording session
        if (evaluatedRef.current) return;

        const captured = (transcriptRef.current || transcript).trim();
        const words = captured ? captured.split(/\s+/).filter(Boolean) : [];

        // Check if empty or insufficient speech (Requirement 6)
        if (words.length < 3) {
            isStoppingRef.current = false;
            setSpeechError(
                captured.length === 0
                    ? "No speech was detected. Please click 'Start Speaking' and speak clearly into your microphone."
                    : "Your spoken response was too short (less than 3 words). Please click 'Start Speaking' and provide at least one complete sentence."
            );
            return;
        }

        evaluatedRef.current = true;
        executeEvaluation(captured);
    }, [transcript, executeEvaluation]);

    // ── Safe Stop Recording (Manual click or 60-second timeout) ────────────────
    const handleStopRecording = useCallback((isAutoTimeout = false) => {
        // Clear countdown timer immediately
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        // Prevent multiple simultaneous stop operations
        if (isStoppingRef.current) return;
        isStoppingRef.current = true;
        setIsRecording(false);

        // Stop browser speech recognition
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) {
                console.warn("Recognition stop warning:", e);
            }
        }

        // Safety fallback: if onend does not fire within 700ms, finalize automatically
        if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
        safetyTimeoutRef.current = setTimeout(() => {
            finalizeAndEvaluate();
        }, 700);
    }, [finalizeAndEvaluate]);

    // ── Start 60-Second Timed Speaking Test ────────────────────────────────────
    const startSpeakingTest = () => {
        if (!currentQuestion?.text) {
            setSpeechError("No active question prompt to evaluate against. Please generate a question first.");
            return;
        }

        // Prevent starting if already recording or evaluating
        if (isRecording || isEvaluating) return;

        // Reset session state
        setSpeechError("");
        setTranscript("");
        transcriptRef.current = "";
        setEvaluation(null);
        setEvaluationError("");
        isStoppingRef.current = false;
        evaluatedRef.current = false;

        // Reset and clear any existing timers
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (safetyTimeoutRef.current) {
            clearTimeout(safetyTimeoutRef.current);
            safetyTimeoutRef.current = null;
        }
        remainingRef.current = TOTAL_SPEAKING_SECONDS;
        setRemainingSeconds(TOTAL_SPEAKING_SECONDS);

        // Stop any audio playing
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            setIsPlayingAudio(false);
            setIsPlayingModelAnswer(false);
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setSpeechError("Your browser doesn't support speech recognition. Please use Google Chrome, Microsoft Edge, or Safari.");
            return;
        }

        try {
            const recognition = new SpeechRecognition();
            recognitionRef.current = recognition;
            recognition.lang = "en-US";
            recognition.interimResults = true;
            recognition.continuous = true;
            recognition.maxAlternatives = 1;

            let finalTranscriptBuffer = "";

            recognition.onstart = () => {
                setIsRecording(true);
                // Start 60-second countdown immediately upon microphone activation
                if (timerRef.current) clearInterval(timerRef.current);
                remainingRef.current = TOTAL_SPEAKING_SECONDS;
                setRemainingSeconds(TOTAL_SPEAKING_SECONDS);

                timerRef.current = setInterval(() => {
                    remainingRef.current -= 1;
                    setRemainingSeconds(remainingRef.current);

                    if (remainingRef.current <= 0) {
                        if (timerRef.current) {
                            clearInterval(timerRef.current);
                            timerRef.current = null;
                        }
                        // Automatic 60-second timeout stop
                        handleStopRecording(true);
                    }
                }, 1000);
            };

            recognition.onresult = (event) => {
                let interimTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscriptBuffer += event.results[i][0].transcript + " ";
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                const combined = (finalTranscriptBuffer + interimTranscript).trim();
                transcriptRef.current = combined;
                setTranscript(combined);
            };

            recognition.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                if (event.error === "not-allowed" || event.error === "service-not-allowed") {
                    setSpeechError("Microphone permission was denied. Please allow microphone access in your browser settings to record your voice.");
                } else if (event.error === "no-speech") {
                    setSpeechError("No speech detected. Please click 'Start Speaking' and speak clearly into your microphone.");
                } else if (event.error === "audio-capture") {
                    setSpeechError("No microphone hardware found. Please verify your microphone is plugged in.");
                } else if (event.error !== "aborted") {
                    setSpeechError(`Speech recognition error: ${event.error}`);
                }

                if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                }
                setIsRecording(false);
                isStoppingRef.current = false;
            };

            recognition.onend = () => {
                setIsRecording(false);
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                }
                // When recording ends after stop request, finalize and evaluate
                if (isStoppingRef.current && !evaluatedRef.current) {
                    finalizeAndEvaluate();
                }
            };

            recognition.start();
        } catch (err) {
            console.error("Recognition start error:", err);
            setSpeechError("Failed to initiate microphone. Please grant permission and try again.");
            setIsRecording(false);
            isStoppingRef.current = false;
        }
    };

    const handlePracticeAgain = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (safetyTimeoutRef.current) {
            clearTimeout(safetyTimeoutRef.current);
            safetyTimeoutRef.current = null;
        }
        if (recognitionRef.current) {
            try {
                recognitionRef.current.abort();
            } catch {}
        }
        remainingRef.current = TOTAL_SPEAKING_SECONDS;
        setRemainingSeconds(TOTAL_SPEAKING_SECONDS);
        setIsRecording(false);
        setTranscript("");
        transcriptRef.current = "";
        setEvaluation(null);
        setSpeechError("");
        setEvaluationError("");
        isStoppingRef.current = false;
        evaluatedRef.current = false;
    };

    // Helper formatting for countdown
    const formatRemainingTime = (secs) => {
        const clamped = Math.max(0, secs);
        const m = Math.floor(clamped / 60);
        const s = clamped % 60;
        return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).filter(Boolean).length : 0;
    const diffTheme = DIFFICULTY_THEMES[currentQuestion?.difficulty || difficulty] || DIFFICULTY_THEMES.Intermediate;

    return (
        <div className="app-container" style={{ paddingBottom: "4rem" }}>
            <main className="main-content text-center animate-fade-in" style={{ maxWidth: "860px" }}>
                
                {/* ── Studio Header ── */}
                <div style={{ marginBottom: "2rem" }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.45rem",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "#c084fc",
                            marginBottom: "0.5rem"
                        }}
                    >
                        <span>✦</span> Gemini AI Voice Studio
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: "2.6rem", margin: 0, fontWeight: 800 }}>
                        Speaking Studio
                    </h1>
                    <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
                        Practice conversational English with dynamic Google Gemini AI prompts, native speech playback, and multi-dimensional speaking evaluation.
                    </p>
                </div>

                {/* ── Difficulty & Category Selector Bar ── */}
                <div
                    className="glass-panel"
                    style={{
                        padding: "1rem 1.25rem",
                        marginBottom: "1.75rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                        borderRadius: "16px"
                    }}
                >
                    {/* Difficulty Pills */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.06em", marginRight: "0.25rem" }}>
                            Difficulty:
                        </span>
                        {SPEAKING_DIFFICULTIES.map((diff) => {
                            const isSelected = difficulty === diff;
                            const theme = DIFFICULTY_THEMES[diff];
                            return (
                                <button
                                    key={diff}
                                    onClick={() => handleDifficultyChange(diff)}
                                    disabled={isLoadingQuestion}
                                    style={{
                                        background: isSelected ? theme.bg : "rgba(255, 255, 255, 0.04)",
                                        border: `1px solid ${isSelected ? theme.border : "rgba(255, 255, 255, 0.08)"}`,
                                        color: isSelected ? theme.text : "var(--text-muted)",
                                        padding: "0.35rem 0.85rem",
                                        borderRadius: "999px",
                                        fontSize: "0.82rem",
                                        fontWeight: isSelected ? 800 : 600,
                                        cursor: "pointer",
                                        transition: "all 0.15s ease"
                                    }}
                                >
                                    {diff}
                                </button>
                            );
                        })}
                    </div>

                    {/* Category Selector */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            Category:
                        </span>
                        <select
                            value={category}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            disabled={isLoadingQuestion}
                            style={{
                                background: "rgba(15, 20, 34, 0.85)",
                                border: "1px solid rgba(255, 255, 255, 0.12)",
                                borderRadius: "10px",
                                color: "#ffffff",
                                padding: "0.4rem 0.85rem",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                outline: "none",
                                cursor: "pointer"
                            }}
                        >
                            {SPEAKING_CATEGORIES.map((cat) => (
                                <option key={cat} value={cat} style={{ background: "#0f1422", color: "#ffffff" }}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Question Error Banner with Retry Button */}
                {questionError && (
                    <div
                        style={{
                            color: "#f87171",
                            background: "rgba(239, 68, 68, 0.12)",
                            border: "1px solid rgba(239, 68, 68, 0.35)",
                            padding: "0.95rem 1.25rem",
                            borderRadius: "12px",
                            fontSize: "0.95rem",
                            marginBottom: "1.5rem",
                            textAlign: "left",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "0.75rem"
                        }}
                    >
                        <span>⚠️ {questionError}</span>
                        <button
                            className="btn btn-secondary"
                            onClick={() => fetchNewQuestion()}
                            disabled={isLoadingQuestion}
                            style={{ fontSize: "0.82rem", padding: "0.35rem 0.9rem", borderRadius: "8px" }}
                        >
                            ↻ Retry
                        </button>
                    </div>
                )}

                {/* ── Active Speaking Prompt Card ── */}
                <div
                    className="glass-panel"
                    style={{
                        padding: "2.5rem 2rem",
                        marginBottom: "2rem",
                        position: "relative",
                        borderRadius: "20px",
                        boxShadow: "0 20px 50px -15px rgba(0, 0, 0, 0.7)",
                        border: "1px solid rgba(139, 92, 246, 0.25)"
                    }}
                >
                    {/* Top action row: Badges & Skip button */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span
                                style={{
                                    fontSize: "0.75rem",
                                    padding: "0.25rem 0.65rem",
                                    borderRadius: "8px",
                                    background: diffTheme.bg,
                                    border: `1px solid ${diffTheme.border}`,
                                    color: diffTheme.text,
                                    fontWeight: 700,
                                    textTransform: "uppercase"
                                }}
                            >
                                {currentQuestion?.difficulty || difficulty}
                            </span>
                            <span
                                style={{
                                    fontSize: "0.75rem",
                                    padding: "0.25rem 0.65rem",
                                    borderRadius: "8px",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    color: "var(--text-muted)",
                                    fontWeight: 600
                                }}
                            >
                                🏷️ {currentQuestion?.category || category}
                            </span>
                        </div>

                        {/* Skip / Next Question Button */}
                        <button
                            className="btn btn-secondary"
                            onClick={() => fetchNewQuestion()}
                            disabled={isLoadingQuestion || isRecording || isEvaluating}
                            style={{
                                fontSize: "0.82rem",
                                padding: "0.4rem 0.85rem",
                                borderRadius: "8px"
                            }}
                            title="Generate a different speaking question"
                        >
                            {isLoadingQuestion ? "Generating..." : "Try Another Question ⏭"}
                        </button>
                    </div>

                    {/* Question text */}
                    <div style={{ minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                        {isLoadingQuestion ? (
                            <div style={{ color: "#c084fc", fontSize: "1.1rem", fontWeight: 600 }}>
                                ✦ Gemini is creating a fresh question...
                            </div>
                        ) : currentQuestion ? (
                            <h2
                                style={{
                                    fontSize: "clamp(1.4rem, 3.2vw, 2.1rem)",
                                    color: "#ffffff",
                                    lineHeight: 1.45,
                                    fontWeight: 800,
                                    letterSpacing: "-0.02em",
                                    margin: 0
                                }}
                            >
                                &ldquo;{currentQuestion.text}&rdquo;
                            </h2>
                        ) : (
                            <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "1rem" }}>
                                <p style={{ margin: "0 0 0.85rem 0", fontSize: "1.05rem" }}>
                                    {questionError ? "No question loaded due to an error." : "No question loaded."}
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => fetchNewQuestion()}
                                    disabled={isLoadingQuestion}
                                    style={{ fontSize: "0.92rem", padding: "0.6rem 1.4rem", borderRadius: "10px" }}
                                >
                                    ✦ Generate Question with Gemini
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Coach tip box */}
                    {currentQuestion?.tips && !isLoadingQuestion && (
                        <div
                            style={{
                                background: "rgba(139, 92, 246, 0.08)",
                                border: "1px solid rgba(139, 92, 246, 0.2)",
                                borderRadius: "12px",
                                padding: "0.85rem 1.15rem",
                                marginBottom: "2rem",
                                textAlign: "left"
                            }}
                        >
                            <span style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", color: "#c084fc", letterSpacing: "0.06em", display: "block", marginBottom: "0.2rem" }}>
                                💡 Coach Answering Tip
                            </span>
                            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--text-main)", opacity: 0.9 }}>
                                {currentQuestion.tips}
                            </p>
                        </div>
                    )}

                    {/* ── 60-Second Timer & Progress Indicator ── */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "1.75rem",
                            gap: "0.65rem"
                        }}
                    >
                        {/* Prominent Countdown Badge */}
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "0.6rem 1.6rem",
                                borderRadius: "999px",
                                background: isRecording && remainingSeconds <= 10
                                    ? "rgba(239, 68, 68, 0.2)"
                                    : isRecording
                                    ? "rgba(139, 92, 246, 0.15)"
                                    : "rgba(255, 255, 255, 0.05)",
                                border: isRecording && remainingSeconds <= 10
                                    ? "2px solid #ef4444"
                                    : isRecording
                                    ? "1px solid rgba(139, 92, 246, 0.4)"
                                    : "1px solid rgba(255, 255, 255, 0.1)",
                                boxShadow: isRecording && remainingSeconds <= 10
                                    ? "0 0 25px rgba(239, 68, 68, 0.5)"
                                    : isRecording
                                    ? "0 0 20px rgba(139, 92, 246, 0.25)"
                                    : "none",
                                transition: "all 0.3s ease"
                            }}
                        >
                            <span
                                style={{
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    background: isRecording
                                        ? (remainingSeconds <= 10 ? "#ef4444" : "#ec4899")
                                        : "var(--text-subtle)",
                                    animation: isRecording ? "pulse-glow 1s infinite" : "none",
                                    display: "inline-block"
                                }}
                            />
                            <span
                                style={{
                                    fontSize: "0.82rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    color: isRecording && remainingSeconds <= 10
                                        ? "#f87171"
                                        : isRecording
                                        ? "#c084fc"
                                        : "var(--text-muted)"
                                }}
                            >
                                {isRecording
                                    ? (remainingSeconds <= 10 ? "⚠️ Final 10 Seconds!" : "Recording...")
                                    : "1-Minute Timed Test"}
                            </span>
                            <span
                                style={{
                                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                                    fontSize: "1.6rem",
                                    fontWeight: 800,
                                    color: isRecording && remainingSeconds <= 10
                                        ? "#ef4444"
                                        : isRecording
                                        ? "#ffffff"
                                        : "#a5b4fc",
                                    letterSpacing: "0.05em",
                                    minWidth: "75px",
                                    textAlign: "center"
                                }}
                            >
                                {formatRemainingTime(remainingSeconds)}
                            </span>
                        </div>

                        {/* Visual Timer Progress Bar */}
                        <div
                            style={{
                                width: "100%",
                                maxWidth: "360px",
                                height: "6px",
                                background: "rgba(255, 255, 255, 0.08)",
                                borderRadius: "999px",
                                overflow: "hidden"
                            }}
                        >
                            <div
                                style={{
                                    width: `${(remainingSeconds / 60) * 100}%`,
                                    height: "100%",
                                    background: remainingSeconds <= 10
                                        ? "#ef4444"
                                        : remainingSeconds <= 25
                                        ? "#f59e0b"
                                        : "linear-gradient(90deg, #8b5cf6, #ec4899)",
                                    borderRadius: "999px",
                                    transition: isRecording ? "width 1s linear, background 0.3s ease" : "width 0.3s ease"
                                }}
                            />
                        </div>
                    </div>

                    {/* ── Main Audio & Speaking Control Buttons ── */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                        {/* Play Native Audio Button */}
                        <button
                            className="btn btn-secondary"
                            onClick={playQuestionAudio}
                            disabled={!currentQuestion || isLoadingQuestion || isRecording || isEvaluating}
                            style={{
                                fontSize: "1rem",
                                padding: "0.85rem 1.8rem",
                                background: isPlayingAudio ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.08)",
                                borderColor: isPlayingAudio ? "var(--success)" : "rgba(16, 185, 129, 0.35)",
                                color: "#34d399",
                                borderRadius: "12px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                opacity: (!currentQuestion || isLoadingQuestion || isRecording || isEvaluating) ? 0.5 : 1,
                                cursor: (!currentQuestion || isLoadingQuestion || isRecording || isEvaluating) ? "not-allowed" : "pointer"
                            }}
                        >
                            <span>{isPlayingAudio ? "⏹ Stop Audio" : "🔊 Play Question Audio"}</span>
                        </button>

                        {/* Start Speaking / Stop Speaking Button */}
                        {!isRecording ? (
                            <button
                                className="btn btn-primary"
                                onClick={startSpeakingTest}
                                disabled={!currentQuestion || isLoadingQuestion || isEvaluating}
                                style={{
                                    fontSize: "1rem",
                                    padding: "0.85rem 2.2rem",
                                    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                                    borderColor: "rgba(255, 255, 255, 0.2)",
                                    boxShadow: "0 4px 20px -4px rgba(139, 92, 246, 0.5)",
                                    borderRadius: "12px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    fontWeight: 700,
                                    opacity: (!currentQuestion || isLoadingQuestion || isEvaluating) ? 0.5 : 1,
                                    cursor: (!currentQuestion || isLoadingQuestion || isEvaluating) ? "not-allowed" : "pointer"
                                }}
                            >
                                <span>🎤 Start Speaking</span>
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={() => handleStopRecording(false)}
                                style={{
                                    fontSize: "1rem",
                                    padding: "0.85rem 2.2rem",
                                    background: "#ef4444",
                                    borderColor: "rgba(255, 255, 255, 0.3)",
                                    color: "white",
                                    animation: "pulse-glow 1s infinite",
                                    borderRadius: "12px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    fontWeight: 700,
                                    cursor: "pointer"
                                }}
                            >
                                <span>⏹ Stop Speaking ({formatRemainingTime(remainingSeconds)})</span>
                            </button>
                        )}
                    </div>

                    {/* Speech Error Banner */}
                    {speechError && (
                        <div
                            style={{
                                color: "#f87171",
                                background: "rgba(239, 68, 68, 0.12)",
                                border: "1px solid rgba(239, 68, 68, 0.35)",
                                padding: "0.85rem 1.25rem",
                                borderRadius: "12px",
                                fontSize: "0.92rem",
                                marginTop: "1.25rem",
                                textAlign: "left"
                            }}
                        >
                            ⚠️ {speechError}
                        </div>
                    )}
                </div>

                {/* ── Spoken Transcription Display Box ── */}
                {(transcript || isRecording) && (
                    <div className="glass-panel animate-fade-in" style={{ padding: "1.75rem", marginBottom: "2rem", textAlign: "left", borderRadius: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: isRecording ? "#ef4444" : "#10b981", display: "inline-block" }} />
                                <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-subtle)" }}>
                                    {isRecording ? "Live Voice Transcription (Recording...)" : "Captured Spoken Transcription"}
                                </span>
                            </div>
                            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>
                                {wordCount} {wordCount === 1 ? "word" : "words"}
                            </span>
                        </div>

                        {/* Transcript text area */}
                        <div
                            style={{
                                fontSize: "1.18rem",
                                lineHeight: 1.7,
                                background: "rgba(15, 20, 34, 0.8)",
                                padding: "1.25rem 1.5rem",
                                borderRadius: "12px",
                                border: `1px solid ${isRecording ? "rgba(236, 72, 153, 0.5)" : "rgba(255, 255, 255, 0.08)"}`,
                                color: "#ffffff",
                                minHeight: "70px",
                                fontStyle: !transcript ? "italic" : "normal",
                                opacity: !transcript ? 0.6 : 1
                            }}
                        >
                            {transcript || "Listening to your voice..."}
                        </div>
                    </div>
                )}

                {/* ── Evaluation Loading State ── */}
                {isEvaluating && (
                    <div
                        className="glass-panel animate-fade-in"
                        style={{
                            padding: "3rem 2rem",
                            marginBottom: "2rem",
                            borderRadius: "16px",
                            border: "1px solid rgba(139, 92, 246, 0.4)",
                            boxShadow: "0 0 40px rgba(139, 92, 246, 0.2)"
                        }}
                    >
                        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem", animation: "pulse-glow 1.5s infinite" }}>
                            ✦
                        </div>
                        <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.5rem 0" }}>
                            Gemini is analysing your answer...
                        </h3>
                        <p style={{ fontSize: "0.98rem", color: "var(--text-muted)", margin: 0 }}>
                            Evaluating question relevance (40%), grammar accuracy (25%), vocabulary usage (20%), and sentence construction (15%)...
                        </p>
                    </div>
                )}

                {/* Evaluation Error Banner with Retry */}
                {evaluationError && (
                    <div
                        style={{
                            color: "#f87171",
                            background: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            padding: "1rem 1.25rem",
                            borderRadius: "12px",
                            fontSize: "0.92rem",
                            marginBottom: "2rem",
                            textAlign: "left"
                        }}
                    >
                        <div style={{ marginBottom: "0.6rem" }}>⚠️ {evaluationError}</div>
                        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => executeEvaluation(transcript)}
                                disabled={isEvaluating || !transcript}
                                style={{ fontSize: "0.82rem", padding: "0.4rem 0.95rem", borderRadius: "8px" }}
                            >
                                ↻ Retry Evaluation
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={handlePracticeAgain}
                                disabled={isEvaluating}
                                style={{ fontSize: "0.82rem", padding: "0.4rem 0.95rem", borderRadius: "8px", background: "rgba(255, 255, 255, 0.05)" }}
                            >
                                Record Again
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Gemini AI Speech Evaluation Results Section ── */}
                {evaluation && !isEvaluating && (
                    <div
                        className="glass-panel animate-fade-in"
                        style={{
                            padding: "2.5rem",
                            marginBottom: "2.5rem",
                            textAlign: "left",
                            borderRadius: "20px",
                            border: "1px solid rgba(139, 92, 246, 0.35)",
                            boxShadow: "0 20px 60px -15px rgba(0, 0, 0, 0.7)"
                        }}
                    >
                        {/* Overall Score Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "1.5rem" }}>
                            <div>
                                <span style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", color: "#c084fc", letterSpacing: "0.08em" }}>
                                    Speech Evaluation Report
                                </span>
                                <h3 style={{ fontSize: "1.65rem", fontWeight: 800, margin: "0.25rem 0 0.35rem 0", color: "#ffffff" }}>
                                    Performance Analysis
                                </h3>
                                <div style={{ fontSize: "0.78rem", color: "var(--text-subtle)" }}>
                                    Weighted Formula: 40% Relevance + 25% Grammar + 20% Vocabulary + 15% Sentence Structure
                                </div>
                            </div>

                            {/* Overall Score Badge */}
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontSize: "0.78rem", color: "var(--text-subtle)", fontWeight: 700, textTransform: "uppercase" }}>
                                        Overall Score
                                    </div>
                                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: evaluation.overallScore >= 80 ? "#34d399" : evaluation.overallScore >= 65 ? "#fbbf24" : "#f87171" }}>
                                        {evaluation.overallScore >= 85 ? "🌟 Advanced Fluency" : evaluation.overallScore >= 70 ? "✨ Good Expression" : "📈 Developing Speaker"}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: "68px",
                                        height: "68px",
                                        borderRadius: "50%",
                                        background: "rgba(15, 20, 34, 0.9)",
                                        border: `3px solid ${evaluation.overallScore >= 80 ? "#10b981" : evaluation.overallScore >= 65 ? "#f59e0b" : "#ef4444"}`,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)"
                                    }}
                                >
                                    <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
                                        {evaluation.overallScore}
                                    </span>
                                    <span style={{ fontSize: "0.65rem", color: "var(--text-subtle)", fontWeight: 600 }}>
                                        / 100
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Low Relevance Advisory Alert */}
                        {evaluation.relevanceScore < 50 && (
                            <div
                                style={{
                                    background: "rgba(239, 68, 68, 0.1)",
                                    border: "1px solid rgba(239, 68, 68, 0.3)",
                                    borderLeft: "4px solid #ef4444",
                                    borderRadius: "12px",
                                    padding: "1rem 1.25rem",
                                    marginBottom: "1.75rem",
                                    textAlign: "left"
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                                    <span style={{ fontSize: "1rem" }}>⚠️</span>
                                    <strong style={{ color: "#f87171", fontSize: "0.92rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                        Off-Topic or Incomplete Answer Detected ({evaluation.relevanceScore}%)
                                    </strong>
                                </div>
                                <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-main)", opacity: 0.9, lineHeight: 1.55 }}>
                                    Your response does not directly answer the displayed speaking prompt. Because answering the question is the primary goal, Question Relevance carries <strong>40%</strong> of the total grade. Your grammar and vocabulary are scored fairly without penalty, but answering the prompt is essential for a high overall score.
                                </p>
                            </div>
                        )}

                        {/* Weighted Category Scores Grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                            {[
                                { label: "Question Relevance", weight: "40%", score: evaluation.relevanceScore, icon: "🎯", desc: "Direct answer to prompt" },
                                { label: "Grammar Accuracy", weight: "25%", score: evaluation.grammarScore, icon: "📝", desc: "Tenses & structure" },
                                { label: "Vocabulary Usage", weight: "20%", score: evaluation.vocabularyScore, icon: "📚", desc: "Word range & precision" },
                                { label: "Sentence Construction", weight: "15%", score: evaluation.sentenceConstructionScore, icon: "🏗️", desc: "Flow & complexity" }
                            ].map((cat, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        background: "rgba(15, 20, 34, 0.65)",
                                        border: "1px solid rgba(255, 255, 255, 0.06)",
                                        borderRadius: "12px",
                                        padding: "1rem"
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                                        <span style={{ color: "var(--text-muted)", fontSize: "0.82rem", fontWeight: 700 }}>
                                            {cat.icon} {cat.label}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "0.72rem",
                                                fontWeight: 800,
                                                padding: "0.15rem 0.45rem",
                                                borderRadius: "6px",
                                                background: "rgba(139, 92, 246, 0.15)",
                                                color: "#c084fc",
                                                border: "1px solid rgba(139, 92, 246, 0.25)"
                                            }}
                                            title="Scoring Weight"
                                        >
                                            {cat.weight}
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.45rem" }}>
                                        <span style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>
                                            {cat.desc}
                                        </span>
                                        <span style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 800 }}>
                                            {cat.score}%
                                        </span>
                                    </div>
                                    <div style={{ width: "100%", height: "6px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "999px", overflow: "hidden" }}>
                                        <div
                                            style={{
                                                width: `${cat.score}%`,
                                                height: "100%",
                                                background: cat.score >= 80 ? "#10b981" : cat.score >= 65 ? "#f59e0b" : "#ef4444",
                                                borderRadius: "999px",
                                                transition: "width 0.5s ease"
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* What You Did Well (Positive Feedback) */}
                        {evaluation.positiveFeedback && (
                            <div
                                style={{
                                    background: "rgba(16, 185, 129, 0.08)",
                                    border: "1px solid rgba(16, 185, 129, 0.25)",
                                    borderLeft: "4px solid #10b981",
                                    borderRadius: "12px",
                                    padding: "1.25rem",
                                    marginBottom: "1.75rem"
                                }}
                            >
                                <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#34d399", letterSpacing: "0.06em", display: "block", marginBottom: "0.35rem" }}>
                                    ✓ What You Did Well
                                </span>
                                <p style={{ margin: 0, fontSize: "0.98rem", color: "var(--text-main)", lineHeight: 1.6 }}>
                                    {evaluation.positiveFeedback}
                                </p>
                            </div>
                        )}

                        {/* Identified Mistakes & Corrections */}
                        <div style={{ marginBottom: "2rem" }}>
                            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.85rem" }}>
                                ⚠️ Grammar & Phrasing Corrections
                            </h4>
                            {evaluation.grammarMistakes && evaluation.grammarMistakes.length > 0 ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                                    {evaluation.grammarMistakes.map((m, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                background: "rgba(15, 20, 34, 0.7)",
                                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                                borderRadius: "12px",
                                                padding: "1.15rem"
                                            }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
                                                <span style={{ color: "#f87171", fontSize: "0.95rem", textDecoration: "line-through" }}>
                                                    &ldquo;{m.originalPhrase}&rdquo;
                                                </span>
                                                <span style={{ color: "var(--text-subtle)", fontSize: "0.85rem" }}>➔</span>
                                                <span style={{ color: "#34d399", fontSize: "0.98rem", fontWeight: 700 }}>
                                                    &ldquo;{m.correctedPhrase}&rdquo;
                                                </span>
                                            </div>
                                            <p style={{ margin: "0.4rem 0 0 0", fontSize: "0.88rem", color: "var(--text-muted)", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "0.4rem" }}>
                                                <strong style={{ color: "#ffffff" }}>Grammar rule:</strong> {m.explanation}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "10px", padding: "1rem", color: "#34d399", fontSize: "0.92rem", fontWeight: 600 }}>
                                    🌟 Outstanding speech accuracy! No major grammatical errors detected in your spoken transcript.
                                </div>
                            )}
                        </div>

                        {/* Model Spoken Answer */}
                        {evaluation.betterAnswer && (
                            <div
                                style={{
                                    background: "rgba(99, 102, 241, 0.08)",
                                    border: "1px solid rgba(99, 102, 241, 0.25)",
                                    borderRadius: "14px",
                                    padding: "1.35rem",
                                    marginBottom: "1.75rem"
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem", flexWrap: "wrap", gap: "0.5rem" }}>
                                    <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#a5b4fc", letterSpacing: "0.06em" }}>
                                        ✨ Model Native Answer Example
                                    </span>
                                    <button
                                        onClick={() => playModelAnswerAudio(evaluation.betterAnswer)}
                                        style={{
                                            background: isPlayingModelAnswer ? "rgba(99, 102, 241, 0.3)" : "rgba(255, 255, 255, 0.06)",
                                            border: "1px solid rgba(99, 102, 241, 0.4)",
                                            borderRadius: "8px",
                                            color: "#c7d2fe",
                                            padding: "0.3rem 0.75rem",
                                            fontSize: "0.8rem",
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "0.4rem"
                                        }}
                                    >
                                        {isPlayingModelAnswer ? "⏹ Stop Model Audio" : "🔊 Listen to Model Answer"}
                                    </button>
                                </div>
                                <p style={{ margin: 0, fontSize: "1rem", color: "#ffffff", lineHeight: 1.65, fontStyle: "italic" }}>
                                    &ldquo;{evaluation.betterAnswer}&rdquo;
                                </p>
                            </div>
                        )}

                        {/* Suggestions & Next Focus */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
                            {evaluation.suggestions && evaluation.suggestions.length > 0 && (
                                <div style={{ background: "rgba(15, 20, 34, 0.6)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "12px", padding: "1.25rem" }}>
                                    <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#c084fc", letterSpacing: "0.06em", display: "block", marginBottom: "0.5rem" }}>
                                        💡 Improvement Suggestions
                                    </span>
                                    <ul style={{ margin: 0, paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                                        {evaluation.suggestions.map((s, idx) => (
                                            <li key={idx} style={{ fontSize: "0.9rem", color: "var(--text-main)", lineHeight: 1.5 }}>
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {evaluation.nextFocus && (
                                <div style={{ background: "rgba(15, 20, 34, 0.6)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "12px", padding: "1.25rem" }}>
                                    <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#38bdf8", letterSpacing: "0.06em", display: "block", marginBottom: "0.5rem" }}>
                                        🎯 Recommended Next Focus
                                    </span>
                                    <p style={{ margin: 0, fontSize: "0.95rem", color: "#ffffff", lineHeight: 1.5, fontWeight: 600 }}>
                                        {evaluation.nextFocus}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons: Practice Again, Try Another Question / Generate New Question */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
                            <button
                                className="btn btn-secondary"
                                onClick={handlePracticeAgain}
                                style={{ fontSize: "0.95rem", padding: "0.75rem 1.6rem", borderRadius: "10px" }}
                            >
                                ↻ Practice Again
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={() => fetchNewQuestion()}
                                disabled={isLoadingQuestion}
                                style={{ fontSize: "0.95rem", padding: "0.75rem 1.8rem", borderRadius: "10px" }}
                            >
                                ✦ Generate New Question →
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Speaking;
