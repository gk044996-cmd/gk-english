
import { useState, useCallback } from "react";
import axios from "axios";
import API_URL from "../api";

const TOPIC_ICONS = {
    "Present Simple": "🕐",
    "Past Simple": "⏮️",
    "Past Continuous": "🔄",
    "Present Perfect": "✅",
    "Past Perfect": "⏪",
    "Future Simple": "🔮",
    "Future Perfect": "🎯",
    "Conditionals": "🔀",
    "Passive Voice": "🔃",
    "Articles": "📖",
    "Prepositions": "📍",
    "Relative Clauses": "🔗",
    "Modal Verbs": "💬",
    "Gerund vs Infinitive": "🌀",
    "Subject-Verb Agreement": "⚖️",
    "Phrasal Verbs": "🚀",
    "Reported Speech": "💭",
    "Question Tags": "❓",
    "Comparison": "📊",
    "Conjunctions": "🔗",
    "Determiners": "🎯",
    "Countable vs Uncountable": "🔢",
};

const DIFFICULTY_COLORS = {
    Beginner: { bg: "rgba(16,185,129,0.15)", border: "#10b981", text: "#10b981" },
    Intermediate: { bg: "rgba(245,158,11,0.15)", border: "#f59e0b", text: "#f59e0b" },
    Advanced: { bg: "rgba(239,68,68,0.15)", border: "#ef4444", text: "#ef4444" },
};

const REQUEST_TIMEOUT_MS = 20000;

function formatApiError(err) {
    const status = err.response?.status;
    const code = err.response?.data?.code;
    const serverMsg = err.response?.data?.error;

    if (
        err.code === "ECONNABORTED" ||
        status === 504 ||
        code === "TIMEOUT" ||
        /timeout/i.test(err.message || "")
    ) {
        return {
            type: "timeout",
            title: "Request Timed Out",
            message: serverMsg || "The AI request timed out. Please try again.",
        };
    }

    if (!err.response) {
        return {
            type: "network",
            title: "Network Connection Error",
            message: "Unable to connect to the AI server. Make sure the backend is running.",
        };
    }

    if (
        status === 429 ||
        code === "QUOTA_EXHAUSTED" ||
        serverMsg?.includes("Daily") ||
        serverMsg?.includes("20/day") ||
        serverMsg?.includes("limit reached")
    ) {
        return {
            type: "quota",
            title: "Daily AI Limit Reached",
            message: serverMsg,
        };
    }

    if (status === 401 || status === 403 || code === "AUTH_ERROR") {
        return {
            type: "auth",
            title: "AI Authentication Error",
            message: serverMsg || "AI service authentication failed. Please check the server GEMINI_API_KEY configuration.",
        };
    }

    if (code === "MODEL_ERROR" || code === "BAD_REQUEST" || (status === 400 && code)) {
        return {
            type: "model",
            title: "AI Configuration Error",
            message: serverMsg || "The configured AI model or request is invalid. Please check server settings.",
        };
    }

    if (status === 404) {
        return {
            type: "endpoint",
            title: "API Endpoint Not Found",
            message: serverMsg || "The requested AI endpoint could not be found. Please check backend deployment.",
        };
    }

    return {
        type: "server",
        title: "AI Server Error",
        message: serverMsg || "The AI server encountered an error. Please try again.",
    };
}

const Test = () => {
    const [question, setQuestion] = useState(null);
    const [selected, setSelected] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [evaluation, setEvaluation] = useState(null);
    const [loadingQ, setLoadingQ] = useState(false);
    const [loadingEval, setLoadingEval] = useState(false);
    const [error, setError] = useState(null);
    const [evalError, setEvalError] = useState(null);
    const [streak, setStreak] = useState(0);

    const [stats, setStats] = useState(() => {
        try {
            const saved = localStorage.getItem("englishCoachStats");
            if (saved) return JSON.parse(saved);
        } catch (_) { }
        return { correct: 0, wrong: 0, totalAnswered: 0 };
    });

    // ── Generate Question ──────────────────────────────────────────────────────
    const generateQuestion = useCallback(async () => {
        setLoadingQ(true);
        setQuestion(null);
        setSelected("");
        setSubmitted(false);
        setEvaluation(null);
        setError(null);
        setEvalError(null);

        try {
            const res = await axios.post(`${API_URL}/generate-question`, {}, { timeout: REQUEST_TIMEOUT_MS });
            setQuestion(res.data);
        } catch (err) {
            setError(formatApiError(err));
        } finally {
            setLoadingQ(false);
        }
    }, []);

    // ── Submit + Evaluate ──────────────────────────────────────────────────────
    const submitAnswer = async () => {
        if (!question || !selected || submitted || loadingEval) return;

        setLoadingEval(true);
        setEvalError(null);

        try {
            const res = await axios.post(
                `${API_URL}/evaluate-answer`,
                {
                    question: question.question,
                    options: question.options,
                    correctAnswer: question.answer,
                    userAnswer: selected,
                    topic: question.topic,
                    difficulty: question.difficulty,
                },
                { timeout: REQUEST_TIMEOUT_MS }
            );

            const evalData = res.data;
            const isCorrect = Boolean(evalData?.isCorrect);

            // Single coordinated update after backend evaluation completes
            setStats(prev => {
                const newStats = {
                    ...prev,
                    totalAnswered: prev.totalAnswered + 1,
                    correct: prev.correct + (isCorrect ? 1 : 0),
                    wrong: prev.wrong + (isCorrect ? 0 : 1),
                };
                localStorage.setItem("englishCoachStats", JSON.stringify(newStats));
                return newStats;
            });
            setStreak(s => (isCorrect ? s + 1 : 0));
            setEvaluation(evalData);
            setSubmitted(true);
        } catch (err) {
            setEvalError(formatApiError(err));
        } finally {
            setLoadingEval(false);
        }
    };

    const accuracy = stats.totalAnswered > 0
        ? Math.round((stats.correct / stats.totalAnswered) * 100)
        : null;

    const diffStyle = question?.difficulty ? DIFFICULTY_COLORS[question.difficulty] || DIFFICULTY_COLORS.Intermediate : null;

    return (
        <div className="app-container">
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <main className="main-content animate-fade-in" style={{ maxWidth: "820px" }}>

                {/* ── Header ── */}
                <div className="flex justify-between items-center mb-8" style={{ flexWrap: "wrap", gap: "1.25rem" }}>
                    <div>
                        <div style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "#818cf8",
                            marginBottom: "0.35rem"
                        }}>
                            <span>✦</span> Dynamic Assessment Engine
                        </div>
                        <h1 className="text-gradient" style={{ margin: 0, fontSize: "2.1rem" }}>AI Practice Tests</h1>
                        <p style={{ margin: "0.25rem 0 0", fontSize: "0.95rem" }}>Adaptive grammar challenges crafted and evaluated by Gemini AI in real time.</p>
                    </div>

                    <div className="glass-panel" style={{
                        padding: "0.65rem 1.25rem",
                        display: "flex",
                        gap: "1.25rem",
                        alignItems: "center",
                        borderRadius: "14px",
                        background: "rgba(15, 20, 34, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.08)"
                    }}>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ color: "var(--success)", fontWeight: 800, fontSize: "1.3rem", fontVariantNumeric: "tabular-nums" }}>{stats.correct}</div>
                            <div style={{ fontSize: "0.68rem", color: "var(--text-subtle)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Correct</div>
                        </div>
                        <div style={{ width: "1px", background: "var(--border)", alignSelf: "stretch" }} />
                        <div style={{ textAlign: "center" }}>
                            <div style={{ color: "var(--error)", fontWeight: 800, fontSize: "1.3rem", fontVariantNumeric: "tabular-nums" }}>{stats.wrong}</div>
                            <div style={{ fontSize: "0.68rem", color: "var(--text-subtle)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Wrong</div>
                        </div>
                        {accuracy !== null && (
                            <>
                                <div style={{ width: "1px", background: "var(--border)", alignSelf: "stretch" }} />
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ color: "var(--primary)", fontWeight: 800, fontSize: "1.3rem", fontVariantNumeric: "tabular-nums" }}>{accuracy}%</div>
                                    <div style={{ fontSize: "0.68rem", color: "var(--text-subtle)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Accuracy</div>
                                </div>
                            </>
                        )}
                        {streak >= 3 && (
                            <>
                                <div style={{ width: "1px", background: "var(--border)", alignSelf: "stretch" }} />
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ color: "#f59e0b", fontWeight: 800, fontSize: "1.3rem", fontVariantNumeric: "tabular-nums" }}>🔥{streak}</div>
                                    <div style={{ fontSize: "0.68rem", color: "var(--text-subtle)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Streak</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* ── Main Panel ── */}
                <div className="glass-panel" style={{ padding: "2.5rem" }}>

                    {/* Welcome state */}
                    {!question && !loadingQ && !error && (
                        <div className="animate-fade-in text-center" style={{ padding: "2.5rem 1rem" }}>
                            <div style={{
                                width: "68px",
                                height: "68px",
                                borderRadius: "20px",
                                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(139, 92, 246, 0.18) 100%)",
                                border: "1px solid rgba(99, 102, 241, 0.45)",
                                boxShadow: "0 0 32px rgba(99, 102, 241, 0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.9rem",
                                margin: "0 auto 1.5rem"
                            }}>
                                ✦
                            </div>
                            <h2 style={{ marginBottom: "0.75rem", fontSize: "1.85rem" }}>Ready for a personalized challenge?</h2>
                            <p style={{ color: "var(--text-muted)", maxWidth: "520px", margin: "0 auto 2.25rem", lineHeight: 1.65 }}>
                                Gemini AI will craft an original multiple-choice question calibrated to your grammar progress — topics and sentence contexts are randomized dynamically.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={generateQuestion}
                                style={{ padding: "0.95rem 2.5rem", fontSize: "1.05rem", borderRadius: "12px" }}
                            >
                                ✨ Generate First Question
                            </button>
                        </div>
                    )}

                    {/* Loading question */}
                    {loadingQ && (
                        <div className="animate-fade-in text-center" style={{ padding: "3.5rem 1rem" }}>
                            <div style={{
                                position: "relative",
                                width: "54px",
                                height: "54px",
                                margin: "0 auto 1.75rem"
                            }}>
                                <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    border: "3px solid rgba(99, 102, 241, 0.15)",
                                    borderTopColor: "var(--primary)",
                                    animation: "spin 0.9s linear infinite"
                                }} />
                                <div style={{
                                    position: "absolute",
                                    inset: "6px",
                                    borderRadius: "50%",
                                    border: "2px solid rgba(139, 92, 246, 0.15)",
                                    borderBottomColor: "#8b5cf6",
                                    animation: "spin 1.4s linear infinite reverse"
                                }} />
                            </div>
                            <h3 style={{ color: "var(--text-main)", fontSize: "1.2rem", marginBottom: "0.4rem" }}>Crafting a unique question with Gemini AI...</h3>
                            <p style={{ color: "var(--text-subtle)", fontSize: "0.88rem", margin: 0 }}>Synthesizing grammar rules, context clauses, and plausible options</p>
                        </div>
                    )}


                    {/* Quota exhausted state */}
                    {error && !loadingQ && error.type === "quota" && (
                        <div className="animate-fade-in" style={{
                            padding: "2rem", borderRadius: "12px",
                            background: "rgba(245,158,11,0.08)", border: "1px solid #f59e0b", textAlign: "center"
                        }}>
                            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🕐</div>
                            <h3 style={{ color: "#f59e0b", marginBottom: "0.75rem" }}>Daily AI Limit Reached</h3>
                            <p style={{ color: "var(--text-main)", marginBottom: "0.5rem" }}>
                                The free tier allows <strong>20 AI questions per day</strong>. You've used them all — great practice session!
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                                ⏰ Resets at midnight UTC &nbsp;·&nbsp; Come back tomorrow for more questions
                            </p>
                            <a
                                href="https://aistudio.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                                style={{ padding: "0.6rem 1.5rem", fontSize: "0.875rem", textDecoration: "none" }}
                            >
                                Enable Billing for Unlimited Access →
                            </a>
                        </div>
                    )}

                    {/* Auth / model / timeout / server / network error state */}
                    {error && !loadingQ && error.type !== "quota" && (
                        <div className="animate-fade-in" style={{
                            padding: "2rem", borderRadius: "12px",
                            background: "rgba(239,68,68,0.08)", border: "1px solid var(--error)", textAlign: "center"
                        }}>
                            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                                {error.type === "timeout" ? "⏱️" : "⚠️"}
                            </div>
                            <h3 style={{ color: "var(--error)", marginBottom: "0.75rem" }}>{error.title}</h3>
                            <p style={{ color: "var(--text-main)", marginBottom: "1.5rem" }}>{error.message}</p>
                            <button className="btn btn-primary" onClick={generateQuestion} style={{ padding: "0.75rem 2rem" }}>
                                Try Again
                            </button>
                        </div>
                    )}



                    {/* Question */}
                    {question && !loadingQ && (
                        <div className="animate-slide-right">

                            {/* Topic + Difficulty badges */}
                            <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                                <span className="badge badge-primary">
                                    {TOPIC_ICONS[question.topic?.split(" (")[0]] || "📝"} {question.topic || "Grammar"}
                                </span>
                                {question.difficulty && (
                                    <span style={{
                                        display: "inline-block", padding: "0.25rem 0.75rem",
                                        borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600,
                                        background: diffStyle.bg, border: `1px solid ${diffStyle.border}`,
                                        color: diffStyle.text
                                    }}>
                                        {question.difficulty}
                                    </span>
                                )}
                                <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                                    Multiple Choice
                                </span>
                            </div>

                            {/* Question text */}
                            <h2 style={{ fontSize: "1.4rem", marginBottom: "2rem", lineHeight: 1.5, color: "var(--text-main)" }}>
                                {question.question}
                            </h2>

                            {/* Options */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                                {question.options.map((opt, i) => {
                                    const isSelected = selected === opt;
                                    const isCorrectOpt = opt === question.answer;
                                    const revealResult = submitted && Boolean(evaluation) && !loadingEval;
                                    const isWrongSelected = revealResult && isSelected && !isCorrectOpt;
                                    const showCorrect = revealResult && isCorrectOpt;
                                    const isLocked = submitted || loadingEval;

                                    let bg = isSelected ? "rgba(99,102,241,0.14)" : "rgba(15, 20, 34, 0.65)";
                                    let border = isSelected ? "var(--primary)" : "rgba(255, 255, 255, 0.08)";
                                    let labelBg = isSelected ? "var(--primary)" : "rgba(255, 255, 255, 0.04)";
                                    let labelBorder = isSelected ? "var(--primary)" : "rgba(255, 255, 255, 0.16)";
                                    let shadow = isSelected ? "0 4px 20px -4px rgba(99, 102, 241, 0.35)" : "none";

                                    if (showCorrect) {
                                        bg = "rgba(16,185,129,0.12)";
                                        border = "var(--success)";
                                        labelBg = "#10b981";
                                        labelBorder = "#10b981";
                                        shadow = "0 4px 20px -4px rgba(16, 185, 129, 0.35)";
                                    }
                                    if (isWrongSelected) {
                                        bg = "rgba(239,68,68,0.12)";
                                        border = "var(--error)";
                                        labelBg = "#ef4444";
                                        labelBorder = "#ef4444";
                                        shadow = "0 4px 20px -4px rgba(239, 68, 68, 0.35)";
                                    }

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => !isLocked && setSelected(opt)}
                                            disabled={isLocked}
                                            style={{
                                                padding: "1rem 1.25rem",
                                                background: bg,
                                                border: `1px solid ${border}`,
                                                boxShadow: shadow,
                                                color: "var(--text-main)",
                                                borderRadius: "14px",
                                                textAlign: "left",
                                                cursor: isLocked ? "default" : "pointer",
                                                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                                display: "flex", alignItems: "center", gap: "1rem",
                                            }}
                                        >
                                            <span style={{
                                                minWidth: "28px", height: "28px", borderRadius: "50%",
                                                border: `1.5px solid ${labelBorder}`,
                                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                                fontSize: "0.78rem", fontWeight: 700,
                                                fontFamily: "'JetBrains Mono', monospace",
                                                background: labelBg, flexShrink: 0,
                                                color: (isSelected || showCorrect || isWrongSelected) ? "#ffffff" : "var(--text-muted)",
                                                transition: "all 0.2s"
                                            }}>
                                                {showCorrect ? "✓" : isWrongSelected ? "✗" : String.fromCharCode(65 + i)}
                                            </span>
                                            <span style={{ fontSize: "1.02rem", fontWeight: 500, lineHeight: 1.4 }}>{opt}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Action buttons / Evaluation loading / Evaluation error / Complete Result */}
                            {!submitted && !loadingEval && !evalError && (
                                <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                                    <button className="btn btn-secondary" onClick={generateQuestion}>
                                        Skip
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={submitAnswer}
                                        disabled={!selected || loadingEval}
                                        style={{ padding: "0.85rem 2.2rem", borderRadius: "12px" }}
                                    >
                                        Submit Answer
                                    </button>
                                </div>
                            )}

                            {loadingEval && (
                                <div className="animate-fade-in" style={{
                                    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.09) 0%, rgba(139, 92, 246, 0.04) 100%)",
                                    border: "1px solid rgba(99, 102, 241, 0.28)",
                                    borderRadius: "14px", padding: "1.25rem 1.5rem",
                                    display: "flex", alignItems: "center", gap: "1.1rem",
                                    boxShadow: "0 8px 24px -8px rgba(99, 102, 241, 0.25)"
                                }}>
                                    <div style={{
                                        width: "24px", height: "24px", flexShrink: 0,
                                        border: "2.5px solid rgba(99, 102, 241, 0.25)",
                                        borderTopColor: "var(--primary)",
                                        borderRadius: "50%",
                                        animation: "spin 0.8s linear infinite"
                                    }} />
                                    <div>
                                        <div style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.98rem", marginBottom: "0.15rem" }}>
                                            Gemini is analysing your answer...
                                        </div>
                                        <div style={{ color: "var(--text-subtle)", fontSize: "0.82rem" }}>
                                            Evaluating grammar rules, syntactic context, and feedback
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!loadingEval && evalError && (
                                <div className="animate-fade-in" style={{
                                    padding: "1.5rem", borderRadius: "12px",
                                    background: "rgba(239,68,68,0.08)", border: "1px solid var(--error)",
                                    display: "flex", flexDirection: "column", gap: "1rem"
                                }}>
                                    <div>
                                        <h3 style={{ margin: "0 0 0.35rem 0", color: "var(--error)" }}>
                                            {evalError.type === "timeout" ? "⏱️ " : "⚠️ "}
                                            {evalError.title}
                                        </h3>
                                        <p style={{ margin: 0, color: "var(--text-main)" }}>
                                            {evalError.message}
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", flexWrap: "wrap" }}>
                                        <button className="btn btn-secondary" onClick={generateQuestion}>
                                            Next Question →
                                        </button>
                                        <button className="btn btn-primary" onClick={submitAnswer}>
                                            Retry Evaluation
                                        </button>
                                    </div>
                                </div>
                            )}

                            {submitted && evaluation && !loadingEval && (
                                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                                    {/* Result banner */}
                                    <div style={{
                                        padding: "1.35rem 1.75rem", borderRadius: "16px",
                                        background: evaluation.isCorrect ? "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.04) 100%)" : "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0.04) 100%)",
                                        border: `1px solid ${evaluation.isCorrect ? "rgba(16, 185, 129, 0.4)" : "rgba(239, 68, 68, 0.4)"}`,
                                        boxShadow: evaluation.isCorrect ? "0 8px 30px -8px rgba(16, 185, 129, 0.3)" : "0 8px 30px -8px rgba(239, 68, 68, 0.3)",
                                        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem"
                                    }}>
                                        <div>
                                            <div style={{
                                                fontSize: "0.75rem",
                                                fontWeight: 700,
                                                letterSpacing: "0.08em",
                                                textTransform: "uppercase",
                                                color: evaluation.isCorrect ? "#34d399" : "#f87171",
                                                marginBottom: "0.25rem"
                                            }}>
                                                {evaluation.isCorrect ? "Assessment: Correct" : "Assessment: Needs Review"}
                                            </div>
                                            <h3 style={{
                                                margin: "0 0 0.25rem 0",
                                                fontSize: "1.35rem",
                                                fontWeight: 700,
                                                color: evaluation.isCorrect ? "var(--success)" : "var(--error)"
                                            }}>
                                                {evaluation.isCorrect ? "🎉 Brilliant! That's correct." : `❌ Not quite — the answer is "${question.answer}"`}
                                            </h3>
                                            {streak >= 3 && evaluation.isCorrect && (
                                                <p style={{ margin: 0, color: "#f59e0b", fontSize: "0.88rem", fontWeight: 600 }}>🔥 {streak} correct answers in a row!</p>
                                            )}
                                        </div>
                                        <button className="btn btn-primary" onClick={generateQuestion} style={{ padding: "0.85rem 1.8rem", borderRadius: "12px" }}>
                                            Next Question →
                                        </button>
                                    </div>

                                    {/* AI Feedback panel */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>

                                        {/* Main feedback */}
                                        <div style={{
                                            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            borderLeft: "4px solid var(--primary)",
                                            borderRadius: "16px", padding: "1.6rem",
                                            boxShadow: "0 12px 36px -12px rgba(0, 0, 0, 0.6)"
                                        }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.85rem" }}>
                                                <span style={{
                                                    fontSize: "0.72rem",
                                                    fontWeight: 700,
                                                    letterSpacing: "0.08em",
                                                    textTransform: "uppercase",
                                                    color: "#818cf8",
                                                    padding: "0.2rem 0.6rem",
                                                    borderRadius: "6px",
                                                    background: "rgba(99, 102, 241, 0.12)",
                                                    border: "1px solid rgba(99, 102, 241, 0.25)"
                                                }}>
                                                    ✦ Gemini Analysis
                                                </span>
                                            </div>
                                            <p style={{ margin: 0, lineHeight: 1.75, color: "var(--text-main)", fontSize: "1.02rem" }}>
                                                {evaluation.feedback}
                                            </p>
                                        </div>

                                        {/* Grammar rule + tip */}
                                        {(evaluation.grammarRule || evaluation.tip) && (
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                                                {evaluation.grammarRule && (
                                                    <div style={{
                                                        background: "rgba(99,102,241,0.05)",
                                                        border: "1px solid rgba(99,102,241,0.22)",
                                                        borderRadius: "14px", padding: "1.35rem"
                                                    }}>
                                                        <h5 style={{ color: "#a5b4fc", margin: "0 0 0.5rem 0", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 700 }}>
                                                            📐 Grammar Rule
                                                        </h5>
                                                        <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.65, color: "var(--text-main)" }}>
                                                            {evaluation.grammarRule}
                                                        </p>
                                                    </div>
                                                )}
                                                {evaluation.tip && (
                                                    <div style={{
                                                        background: "rgba(245,158,11,0.05)",
                                                        border: "1px solid rgba(245,158,11,0.22)",
                                                        borderRadius: "14px", padding: "1.35rem"
                                                    }}>
                                                        <h5 style={{ color: "#fbbf24", margin: "0 0 0.5rem 0", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 700 }}>
                                                            💡 Memory Tip
                                                        </h5>
                                                        <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.65, color: "var(--text-main)" }}>
                                                            {evaluation.tip}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default Test;