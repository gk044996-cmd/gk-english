
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

const Test = () => {
    const [question, setQuestion] = useState(null);
    const [selected, setSelected] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [evaluation, setEvaluation] = useState(null);
    const [loadingQ, setLoadingQ] = useState(false);
    const [loadingEval, setLoadingEval] = useState(false);
    const [error, setError] = useState(null);
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

        try {
            const res = await axios.post(`${API_URL}/generate-question`);
            setQuestion(res.data);
        } catch (err) {
            const msg = err.response?.data?.error || "Failed to connect to the AI server. Make sure the backend is running.";
            setError(msg);
        } finally {
            setLoadingQ(false);
        }
    }, []);

    // ── Submit + Evaluate ──────────────────────────────────────────────────────
    const submitAnswer = async () => {
        if (!question || !selected || submitted) return;

        setSubmitted(true);
        setLoadingEval(true);

        const isCorrectLocal = selected.trim() === question.answer.trim();

        // Update stats immediately (optimistically)
        const newStats = {
            ...stats,
            totalAnswered: stats.totalAnswered + 1,
            correct: stats.correct + (isCorrectLocal ? 1 : 0),
            wrong: stats.wrong + (isCorrectLocal ? 0 : 1),
        };
        setStats(newStats);
        localStorage.setItem("englishCoachStats", JSON.stringify(newStats));

        if (isCorrectLocal) {
            setStreak(s => s + 1);
        } else {
            setStreak(0);
        }

        try {
            const res = await axios.post(`${API_URL}/evaluate-answer`, {
                question: question.question,
                options: question.options,
                correctAnswer: question.answer,
                userAnswer: selected,
                topic: question.topic,
                difficulty: question.difficulty,
            });
            setEvaluation(res.data);
        } catch (_) {
            // Graceful: show basic result even if eval endpoint fails
            setEvaluation({
                isCorrect: isCorrectLocal,
                feedback: isCorrectLocal
                    ? `✅ Correct! "${question.answer}" is the right answer.`
                    : `❌ The correct answer is "${question.answer}".`,
                grammarRule: question.explanation || "",
                tip: "",
            });
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
            <main className="main-content animate-fade-in" style={{ maxWidth: "820px" }}>

                {/* ── Header ── */}
                <div className="flex justify-between items-center mb-8" style={{ flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                        <h1 className="text-gradient">AI Practice Tests</h1>
                        <p style={{ margin: 0 }}>Gemini AI generates unique questions and evaluates your answers.</p>
                    </div>

                    <div className="glass-panel" style={{ padding: "0.75rem 1.25rem", display: "flex", gap: "1.25rem", alignItems: "center" }}>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ color: "var(--success)", fontWeight: "bold", fontSize: "1.3rem" }}>{stats.correct}</div>
                            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Correct</div>
                        </div>
                        <div style={{ width: "1px", background: "var(--border)", alignSelf: "stretch" }} />
                        <div style={{ textAlign: "center" }}>
                            <div style={{ color: "var(--error)", fontWeight: "bold", fontSize: "1.3rem" }}>{stats.wrong}</div>
                            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Wrong</div>
                        </div>
                        {accuracy !== null && (
                            <>
                                <div style={{ width: "1px", background: "var(--border)", alignSelf: "stretch" }} />
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ color: "var(--primary)", fontWeight: "bold", fontSize: "1.3rem" }}>{accuracy}%</div>
                                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Accuracy</div>
                                </div>
                            </>
                        )}
                        {streak >= 3 && (
                            <>
                                <div style={{ width: "1px", background: "var(--border)", alignSelf: "stretch" }} />
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ color: "#f59e0b", fontWeight: "bold", fontSize: "1.3rem" }}>🔥{streak}</div>
                                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Streak</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* ── Main Panel ── */}
                <div className="glass-panel" style={{ padding: "2.5rem" }}>

                    {/* Welcome state */}
                    {!question && !loadingQ && !error && (
                        <div className="animate-fade-in text-center" style={{ padding: "2rem 0" }}>
                            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🤖</div>
                            <h2 style={{ marginBottom: "0.75rem" }}>Ready for a challenge?</h2>
                            <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
                                Gemini AI will craft a unique grammar question just for you — topic and difficulty are randomised every time.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={generateQuestion}
                                style={{ padding: "1rem 2.5rem", fontSize: "1.1rem" }}
                            >
                                ✨ Generate First Question
                            </button>
                        </div>
                    )}

                    {/* Loading question */}
                    {loadingQ && (
                        <div className="animate-fade-in text-center" style={{ padding: "3rem 0" }}>
                            <div style={{
                                width: "48px", height: "48px",
                                border: "3px solid rgba(99,102,241,0.2)",
                                borderTop: "3px solid var(--primary)",
                                borderRadius: "50%",
                                margin: "0 auto 1.5rem",
                                animation: "spin 0.9s linear infinite"
                            }} />
                            <h3 style={{ color: "var(--text-muted)" }}>Crafting a unique question with Gemini AI...</h3>
                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        </div>
                    )}

                    {/* Error state */}
                    {error && !loadingQ && (
                        <div className="animate-fade-in" style={{
                            padding: "2rem", borderRadius: "12px",
                            background: "rgba(239,68,68,0.08)", border: "1px solid var(--error)", textAlign: "center"
                        }}>
                            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚠️</div>
                            <h3 style={{ color: "var(--error)", marginBottom: "0.75rem" }}>Connection Error</h3>
                            <p style={{ color: "var(--text-main)", marginBottom: "1.5rem" }}>{error}</p>
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
                                    const isWrongSelected = submitted && isSelected && !isCorrectOpt;
                                    const showCorrect = submitted && isCorrectOpt;

                                    let bg = isSelected ? "rgba(99,102,241,0.12)" : "var(--surface)";
                                    let border = isSelected ? "var(--primary)" : "var(--border)";
                                    let labelBg = isSelected ? "var(--primary)" : "transparent";
                                    let labelBorder = isSelected ? "var(--primary)" : "var(--border)";

                                    if (showCorrect) { bg = "rgba(16,185,129,0.12)"; border = "var(--success)"; labelBg = "#10b981"; labelBorder = "#10b981"; }
                                    if (isWrongSelected) { bg = "rgba(239,68,68,0.12)"; border = "var(--error)"; labelBg = "#ef4444"; labelBorder = "#ef4444"; }

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => !submitted && setSelected(opt)}
                                            disabled={submitted}
                                            style={{
                                                padding: "1rem 1.25rem",
                                                background: bg,
                                                border: `1px solid ${border}`,
                                                color: "var(--text-main)",
                                                borderRadius: "12px",
                                                textAlign: "left",
                                                cursor: submitted ? "default" : "pointer",
                                                transition: "all 0.2s ease",
                                                display: "flex", alignItems: "center", gap: "0.9rem",
                                            }}
                                        >
                                            <span style={{
                                                minWidth: "26px", height: "26px", borderRadius: "50%",
                                                border: `1.5px solid ${labelBorder}`,
                                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                                fontSize: "0.72rem", fontWeight: 700,
                                                background: labelBg, flexShrink: 0,
                                                transition: "all 0.2s"
                                            }}>
                                                {showCorrect ? "✓" : isWrongSelected ? "✗" : String.fromCharCode(65 + i)}
                                            </span>
                                            <span style={{ fontSize: "1rem" }}>{opt}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Action buttons */}
                            {!submitted ? (
                                <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                                    <button className="btn btn-secondary" onClick={generateQuestion}>
                                        Skip
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={submitAnswer}
                                        disabled={!selected}
                                        style={{ padding: "0.75rem 2rem" }}
                                    >
                                        Submit Answer
                                    </button>
                                </div>
                            ) : (
                                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                                    {/* Result banner */}
                                    <div style={{
                                        padding: "1.25rem 1.5rem", borderRadius: "12px",
                                        background: evaluation?.isCorrect !== false ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                                        border: `1px solid ${evaluation?.isCorrect !== false ? "var(--success)" : "var(--error)"}`,
                                        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem"
                                    }}>
                                        <div>
                                            <h3 style={{
                                                margin: "0 0 0.25rem 0",
                                                color: evaluation?.isCorrect !== false ? "var(--success)" : "var(--error)"
                                            }}>
                                                {evaluation?.isCorrect !== false ? "🎉 Brilliant! That's correct." : `❌ Not quite — the answer is "${question.answer}"`}
                                            </h3>
                                            {streak >= 3 && evaluation?.isCorrect !== false && (
                                                <p style={{ margin: 0, color: "#f59e0b", fontSize: "0.875rem" }}>🔥 {streak} correct in a row!</p>
                                            )}
                                        </div>
                                        <button className="btn btn-primary" onClick={generateQuestion}>
                                            Next Question →
                                        </button>
                                    </div>

                                    {/* AI Evaluation loading */}
                                    {loadingEval && (
                                        <div style={{
                                            background: "rgba(99,102,241,0.06)",
                                            border: "1px solid rgba(99,102,241,0.2)",
                                            borderRadius: "12px", padding: "1.25rem",
                                            display: "flex", alignItems: "center", gap: "1rem"
                                        }}>
                                            <div style={{
                                                width: "20px", height: "20px", flexShrink: 0,
                                                border: "2px solid rgba(99,102,241,0.3)",
                                                borderTop: "2px solid var(--primary)",
                                                borderRadius: "50%",
                                                animation: "spin 0.9s linear infinite"
                                            }} />
                                            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                                                Gemini AI is analysing your answer...
                                            </span>
                                        </div>
                                    )}

                                    {/* AI Feedback panel */}
                                    {evaluation && !loadingEval && (
                                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>

                                            {/* Main feedback */}
                                            <div style={{
                                                background: "rgba(255,255,255,0.04)",
                                                border: "1px solid var(--border)",
                                                borderLeft: "4px solid var(--primary)",
                                                borderRadius: "12px", padding: "1.5rem"
                                            }}>
                                                <h4 style={{ color: "var(--primary)", marginTop: 0, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                    🤖 AI Feedback
                                                </h4>
                                                <p style={{ margin: 0, lineHeight: 1.7, color: "var(--text-main)" }}>
                                                    {evaluation.feedback}
                                                </p>
                                            </div>

                                            {/* Grammar rule + tip */}
                                            {(evaluation.grammarRule || evaluation.tip) && (
                                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                                                    {evaluation.grammarRule && (
                                                        <div style={{
                                                            background: "rgba(99,102,241,0.06)",
                                                            border: "1px solid rgba(99,102,241,0.2)",
                                                            borderRadius: "12px", padding: "1.25rem"
                                                        }}>
                                                            <h5 style={{ color: "var(--primary)", margin: "0 0 0.5rem 0", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                                                📐 Grammar Rule
                                                            </h5>
                                                            <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-main)" }}>
                                                                {evaluation.grammarRule}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {evaluation.tip && (
                                                        <div style={{
                                                            background: "rgba(245,158,11,0.06)",
                                                            border: "1px solid rgba(245,158,11,0.2)",
                                                            borderRadius: "12px", padding: "1.25rem"
                                                        }}>
                                                            <h5 style={{ color: "#f59e0b", margin: "0 0 0.5rem 0", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                                                💡 Memory Tip
                                                            </h5>
                                                            <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-main)" }}>
                                                                {evaluation.tip}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
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