import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import API_URL from "../api";

const LISTENING_DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

const DIFFICULTY_CONFIG = {
    Beginner: {
        label: "Beginner",
        duration: "~32–40s",
        targetDesc: "Simple sentences, everyday vocabulary, linear plot (65–80 words)",
        badgeBg: "rgba(16, 185, 129, 0.15)",
        border: "#10b981",
        text: "#34d399",
        speechRate: 0.88
    },
    Intermediate: {
        label: "Intermediate",
        duration: "~38–48s",
        targetDesc: "Varied sentences, engaging plot twist, rich vocabulary (85–105 words)",
        badgeBg: "rgba(139, 92, 246, 0.18)",
        border: "#8b5cf6",
        text: "#c4b5fd",
        speechRate: 0.95
    },
    Advanced: {
        label: "Advanced",
        duration: "~48–58s",
        targetDesc: "Complex narrative, subtle clues, sophisticated vocabulary (110–135 words)",
        badgeBg: "rgba(244, 63, 94, 0.18)",
        border: "#f43f5e",
        text: "#fb7185",
        speechRate: 1.0
    }
};

const QUESTION_TYPE_LABELS = {
    main_idea: { label: "Main Idea", color: "#60a5fa" },
    character_detail: { label: "Character Detail", color: "#a78bfa" },
    event_sequence: { label: "Event Sequence", color: "#34d399" },
    cause_effect: { label: "Reason & Cause", color: "#f59e0b" },
    specific_fact: { label: "Specific Detail", color: "#ec4899" },
    comprehension: { label: "Comprehension", color: "#818cf8" }
};

const STORAGE_KEYS = {
    DIFFICULTY: "coach_listening_difficulty",
    HISTORY: "coach_listening_history_v2",
    STATS: "coach_listening_stats",
    STORY: "coach_listening_active_story",
    ANSWERS: "coach_listening_user_answers",
    EVAL: "coach_listening_evaluation"
};

const REQUEST_TIMEOUT_MS = 25000;

const Scenarios = () => {
    // ── Difficulty Selection ──────────────────────────────────────────────────
    const [difficulty, setDifficulty] = useState(() => {
        return localStorage.getItem(STORAGE_KEYS.DIFFICULTY) || "Intermediate";
    });

    // ── Story History for Semantic Duplicate Prevention ──────────────────────
    const [storyHistory, setStoryHistory] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // ── Session Statistics ────────────────────────────────────────────────────
    const [sessionStats, setSessionStats] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.STATS);
            return saved ? JSON.parse(saved) : {
                storiesCompleted: 0,
                totalQuestions: 0,
                totalCorrect: 0
            };
        } catch {
            return {
                storiesCompleted: 0,
                totalQuestions: 0,
                totalCorrect: 0
            };
        }
    });

    // ── Current Active Story ──────────────────────────────────────────────────
    const [currentStory, setCurrentStory] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.STORY);
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const [isLoadingStory, setIsLoadingStory] = useState(false);
    const [generationError, setGenerationError] = useState("");

    // ── Audio Playback State (window.speechSynthesis) ─────────────────────────
    const [playbackStatus, setPlaybackStatus] = useState("idle"); // "idle" | "playing" | "paused" | "finished"
    const [playbackProgress, setPlaybackProgress] = useState(0); // 0 to 100
    const [completedStoryId, setCompletedStoryId] = useState(null);

    const isQuizUnlocked = Boolean(currentStory?.id && completedStoryId === currentStory.id);

    const utteranceRef = useRef(null);
    const progressTimerRef = useRef(null);
    const synthStartTimeRef = useRef(0);
    const estimatedDurationMsRef = useRef(45000);
    const isAbortedRef = useRef(false);

    // ── Quiz Answering State ──────────────────────────────────────────────────
    const [userAnswers, setUserAnswers] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.ANSWERS);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    // ── Gemini Evaluation State ───────────────────────────────────────────────
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.EVAL);
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });
    const [evaluationError, setEvaluationError] = useState("");

    // ── Persistence Effects ───────────────────────────────────────────────────
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.DIFFICULTY, difficulty);
    }, [difficulty]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(storyHistory.slice(-30)));
        } catch (e) {
            console.error("Failed to save story history:", e);
        }
    }, [storyHistory]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(sessionStats));
        } catch (e) {
            console.error("Failed to save listening stats:", e);
        }
    }, [sessionStats]);

    useEffect(() => {
        if (currentStory) {
            try {
                localStorage.setItem(STORAGE_KEYS.STORY, JSON.stringify(currentStory));
            } catch (e) {
                console.error("Failed to save current story:", e);
            }
        } else {
            localStorage.removeItem(STORAGE_KEYS.STORY);
        }
    }, [currentStory]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(userAnswers));
        } catch (e) {
            console.error("Failed to save answers:", e);
        }
    }, [userAnswers]);

    useEffect(() => {
        if (evaluationResult) {
            try {
                localStorage.setItem(STORAGE_KEYS.EVAL, JSON.stringify(evaluationResult));
            } catch (e) {
                console.error("Failed to save evaluation result:", e);
            }
        } else {
            localStorage.removeItem(STORAGE_KEYS.EVAL);
        }
    }, [evaluationResult]);

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            isAbortedRef.current = true;
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
            if (progressTimerRef.current) {
                clearInterval(progressTimerRef.current);
            }
        };
    }, []);

    // ── Audio Speech Synthesis Logic ──────────────────────────────────────────
    const stopAudio = useCallback(() => {
        isAbortedRef.current = true;
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        if (progressTimerRef.current) {
            clearInterval(progressTimerRef.current);
            progressTimerRef.current = null;
        }
        setPlaybackStatus("idle");
    }, []);

    const playAudio = useCallback(() => {
        if (!currentStory || !currentStory.story || !("speechSynthesis" in window)) {
            return;
        }

        isAbortedRef.current = true;
        window.speechSynthesis.cancel();
        isAbortedRef.current = false;

        if (progressTimerRef.current) {
            clearInterval(progressTimerRef.current);
        }

        const text = currentStory.story;
        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;

        const config = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.Intermediate;
        utterance.rate = config.speechRate;
        utterance.pitch = 1.0;

        // Pick preferred voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v =>
            (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("English")) &&
            (v.lang.startsWith("en-US") || v.lang.startsWith("en-GB") || v.lang.startsWith("en"))
        ) || voices.find(v => v.lang.startsWith("en"));

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        // Estimate duration based on word count & speech rate
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        const wordsPerSec = (140 / 60) * config.speechRate;
        const totalDurationMs = Math.max(10000, (wordCount / wordsPerSec) * 1000);
        estimatedDurationMsRef.current = totalDurationMs;
        synthStartTimeRef.current = Date.now();

        utterance.onstart = () => {
            setPlaybackStatus("playing");
            synthStartTimeRef.current = Date.now();

            progressTimerRef.current = setInterval(() => {
                const elapsed = Date.now() - synthStartTimeRef.current;
                const pct = Math.min(96, Math.round((elapsed / estimatedDurationMsRef.current) * 100));
                setPlaybackProgress(pct);
            }, 250);
        };

        utterance.onboundary = (e) => {
            if (e.charIndex && text.length > 0) {
                const charPct = Math.min(98, Math.round((e.charIndex / text.length) * 100));
                setPlaybackProgress(charPct);
            }
        };

        utterance.onpause = () => {
            setPlaybackStatus("paused");
            if (progressTimerRef.current) {
                clearInterval(progressTimerRef.current);
            }
        };

        utterance.onresume = () => {
            setPlaybackStatus("playing");
            synthStartTimeRef.current = Date.now() - (playbackProgress / 100) * estimatedDurationMsRef.current;
            progressTimerRef.current = setInterval(() => {
                const elapsed = Date.now() - synthStartTimeRef.current;
                const pct = Math.min(96, Math.round((elapsed / estimatedDurationMsRef.current) * 100));
                setPlaybackProgress(pct);
            }, 250);
        };

        utterance.onend = () => {
            if (progressTimerRef.current) {
                clearInterval(progressTimerRef.current);
                progressTimerRef.current = null;
            }

            // If cancelled, paused, or restarted, do NOT mark as genuinely completed
            if (isAbortedRef.current) {
                isAbortedRef.current = false;
                return;
            }

            const elapsed = Date.now() - synthStartTimeRef.current;
            const minExpectedMs = Math.min(18000, estimatedDurationMsRef.current * 0.65);

            // Only genuinely unlock when audio played through full duration
            if (elapsed >= minExpectedMs || playbackProgress >= 80) {
                setPlaybackStatus("finished");
                setPlaybackProgress(100);
                if (currentStory?.id) {
                    setCompletedStoryId(currentStory.id);
                }
            } else {
                setPlaybackStatus("idle");
            }
        };

        utterance.onerror = (e) => {
            isAbortedRef.current = true;
            if (progressTimerRef.current) {
                clearInterval(progressTimerRef.current);
                progressTimerRef.current = null;
            }
            if (e.error !== "canceled" && e.error !== "interrupted") {
                console.warn("Speech synthesis notice:", e.error);
                setPlaybackStatus("idle");
            }
        };

        window.speechSynthesis.speak(utterance);
    }, [currentStory, difficulty, playbackProgress]);

    const pauseAudio = () => {
        if (window.speechSynthesis && playbackStatus === "playing") {
            window.speechSynthesis.pause();
            setPlaybackStatus("paused");
            if (progressTimerRef.current) {
                clearInterval(progressTimerRef.current);
            }
        }
    };

    const resumeAudio = () => {
        if (window.speechSynthesis && playbackStatus === "paused") {
            window.speechSynthesis.resume();
            setPlaybackStatus("playing");
        }
    };

    const restartAudio = () => {
        isAbortedRef.current = true;
        stopAudio();
        setCompletedStoryId(null);
        setPlaybackProgress(0);
        setTimeout(() => {
            isAbortedRef.current = false;
            playAudio();
        }, 150);
    };

    // ── Generate Listening Story (Gemini-Only, Zero Fallbacks) ────────────────
    const generateStory = useCallback(async (selectedDifficulty = difficulty) => {
        stopAudio();
        setIsLoadingStory(true);
        setGenerationError("");
        setUserAnswers({});
        setEvaluationResult(null);
        setEvaluationError("");
        setCompletedStoryId(null);
        setPlaybackProgress(0);

        try {
            const recentPayload = storyHistory.slice(-15).map(item => {
                if (typeof item === "string") return { title: item, story: "" };
                return {
                    title: item?.title || "",
                    story: item?.storySnippet || item?.story || ""
                };
            });

            const response = await axios.post(`${API_URL}/generate-listening-story`, {
                difficulty: selectedDifficulty,
                recentStories: recentPayload
            }, {
                timeout: REQUEST_TIMEOUT_MS
            });

            if (response.data && response.data.story && Array.isArray(response.data.questions) && response.data.questions.length === 5) {
                setCurrentStory(response.data);
                if (response.data.title) {
                    setStoryHistory(prev => {
                        const filtered = prev.filter(item => {
                            const t = typeof item === "string" ? item : item?.title;
                            return t !== response.data.title;
                        });
                        return [
                            ...filtered,
                            {
                                id: response.data.id,
                                title: response.data.title,
                                storySnippet: (response.data.story || "").slice(0, 160),
                                story: response.data.story,
                                wordCount: response.data.wordCount,
                                timestamp: Date.now()
                            }
                        ].slice(-30);
                    });
                }
            } else {
                throw new Error("Invalid story format received from server.");
            }
        } catch (err) {
            console.error("Story generation failed:", err);
            const message = err.response?.data?.error
                || (err.code === "ECONNABORTED" ? "Request timed out while generating story. Please try again." : null)
                || (!navigator.onLine ? "You are currently offline. Please check your internet connection." : null)
                || "Unable to generate a new story. Please click Retry.";
            setGenerationError(message);
        } finally {
            setIsLoadingStory(false);
        }
    }, [difficulty, storyHistory, stopAudio]);

    // Initial load: generate story if none exists
    useEffect(() => {
        if (!currentStory && !isLoadingStory && !generationError) {
            generateStory();
        }
    }, [currentStory, isLoadingStory, generationError, generateStory]);

    // ── Handle Difficulty Change ──────────────────────────────────────────────
    const handleDifficultyChange = (newDiff) => {
        if (newDiff === difficulty || isLoadingStory) return;
        setDifficulty(newDiff);
        generateStory(newDiff);
    };

    // ── Handle Quiz Answer Selection ──────────────────────────────────────────
    const handleSelectOption = (questionId, option) => {
        if (evaluationResult || isEvaluating) return;
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: option
        }));
    };

    // ── Submit Quiz for Gemini Evaluation ─────────────────────────────────────
    const handleSubmitQuiz = async () => {
        if (!currentStory || !currentStory.questions) return;
        if (Object.keys(userAnswers).length < currentStory.questions.length) return;

        setIsEvaluating(true);
        setEvaluationError("");

        try {
            const response = await axios.post(`${API_URL}/evaluate-listening-quiz`, {
                story: currentStory.story,
                questions: currentStory.questions,
                userAnswers,
                difficulty: currentStory.difficulty || difficulty
            }, {
                timeout: REQUEST_TIMEOUT_MS
            });

            const result = response.data;
            setEvaluationResult(result);

            // Update session stats
            setSessionStats(prev => ({
                storiesCompleted: prev.storiesCompleted + 1,
                totalQuestions: prev.totalQuestions + (result.totalQuestions || 5),
                totalCorrect: prev.totalCorrect + (result.score || 0)
            }));

        } catch (err) {
            console.error("Quiz evaluation failed:", err);
            const message = err.response?.data?.error
                || (err.code === "ECONNABORTED" ? "Evaluation timed out. Please try submitting again." : null)
                || "Unable to evaluate quiz. Please try again.";
            setEvaluationError(message);
        } finally {
            setIsEvaluating(false);
        }
    };

    // ── Reset Session Statistics ──────────────────────────────────────────────
    const handleResetStats = () => {
        const fresh = { storiesCompleted: 0, totalQuestions: 0, totalCorrect: 0 };
        setSessionStats(fresh);
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(fresh));
    };

    // Derived states
    const answeredCount = Object.keys(userAnswers).length;
    const totalQuestionsCount = currentStory?.questions?.length || 5;
    const isAllAnswered = answeredCount === totalQuestionsCount;
    const currentTheme = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.Intermediate;

    const avgScorePercent = sessionStats.totalQuestions > 0
        ? Math.round((sessionStats.totalCorrect / sessionStats.totalQuestions) * 100)
        : 0;

    return (
        <div className="app-container" style={{ paddingBottom: "4rem" }}>
            <main className="main-content animate-fade-in" style={{ maxWidth: "1060px", margin: "0 auto", padding: "1.5rem 1rem" }}>

                {/* ── Page Header ── */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "1.25rem",
                    marginBottom: "1.75rem",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    paddingBottom: "1.5rem"
                }}>
                    <div>
                        <div style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "999px",
                            background: "rgba(99, 102, 241, 0.12)",
                            border: "1px solid rgba(99, 102, 241, 0.3)",
                            color: "#a5b4fc",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            marginBottom: "0.6rem"
                        }}>
                            <span>✦</span> Gemini AI Listening Studio
                        </div>
                        <h1 style={{
                            margin: 0,
                            fontSize: "2rem",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 40%, #818cf8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>
                            Story Listening & Comprehension
                        </h1>
                        <p style={{ margin: "0.4rem 0 0", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                            Listen carefully to original AI-generated stories, retain key details, and test your comprehension.
                        </p>
                    </div>

                    {/* Difficulty Selector */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        background: "rgba(15, 20, 34, 0.6)",
                        padding: "0.35rem",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.08)"
                    }}>
                        {LISTENING_DIFFICULTIES.map(lvl => {
                            const active = difficulty === lvl;
                            const theme = DIFFICULTY_CONFIG[lvl];
                            return (
                                <button
                                    key={lvl}
                                    onClick={() => handleDifficultyChange(lvl)}
                                    disabled={isLoadingStory}
                                    style={{
                                        padding: "0.45rem 0.95rem",
                                        borderRadius: "8px",
                                        border: active ? `1px solid ${theme.border}` : "1px solid transparent",
                                        background: active ? theme.badgeBg : "transparent",
                                        color: active ? theme.text : "var(--text-muted)",
                                        fontSize: "0.85rem",
                                        fontWeight: active ? 700 : 500,
                                        cursor: isLoadingStory ? "not-allowed" : "pointer",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    {lvl}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Session Stats Bar ── */}
                <div className="glass-panel" style={{
                    padding: "0.85rem 1.25rem",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginBottom: "1.75rem",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    background: "rgba(15, 20, 34, 0.55)"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ fontSize: "1.1rem" }}>🎧</span>
                            <div>
                                <div style={{ fontSize: "0.7rem", color: "var(--text-subtle)", textTransform: "uppercase", fontWeight: 700 }}>
                                    Stories Completed
                                </div>
                                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-main)" }}>
                                    {sessionStats.storiesCompleted}
                                </div>
                            </div>
                        </div>

                        <div style={{ width: "1px", height: "24px", background: "rgba(255, 255, 255, 0.08)" }} />

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ fontSize: "1.1rem" }}>🎯</span>
                            <div>
                                <div style={{ fontSize: "0.7rem", color: "var(--text-subtle)", textTransform: "uppercase", fontWeight: 700 }}>
                                    Questions Answered
                                </div>
                                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-main)" }}>
                                    {sessionStats.totalQuestions}
                                </div>
                            </div>
                        </div>

                        <div style={{ width: "1px", height: "24px", background: "rgba(255, 255, 255, 0.08)" }} />

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ fontSize: "1.1rem" }}>⭐</span>
                            <div>
                                <div style={{ fontSize: "0.7rem", color: "var(--text-subtle)", textTransform: "uppercase", fontWeight: 700 }}>
                                    Avg Comprehension
                                </div>
                                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: avgScorePercent >= 75 ? "#34d399" : avgScorePercent >= 50 ? "#a5b4fc" : "#fb7185" }}>
                                    {sessionStats.totalQuestions > 0 ? `${avgScorePercent}%` : "—"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {sessionStats.storiesCompleted > 0 && (
                        <button
                            onClick={handleResetStats}
                            style={{
                                background: "transparent",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                color: "var(--text-subtle)",
                                fontSize: "0.75rem",
                                padding: "0.3rem 0.65rem",
                                borderRadius: "6px",
                                cursor: "pointer",
                                transition: "all 0.15s ease"
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-main)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-subtle)"; }}
                        >
                            Reset Stats
                        </button>
                    )}
                </div>

                {/* ── Error Banner (Generation Failure with Zero Fallback Guarantee) ── */}
                {generationError && (
                    <div className="glass-panel" style={{
                        padding: "1.5rem",
                        borderRadius: "16px",
                        border: "1px solid rgba(239, 68, 68, 0.35)",
                        background: "rgba(239, 68, 68, 0.08)",
                        marginBottom: "1.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "1rem"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                            <span style={{ fontSize: "1.6rem" }}>⚠️</span>
                            <div>
                                <div style={{ fontWeight: 700, color: "#fca5a5", fontSize: "0.95rem" }}>
                                    Story Generation Failed
                                </div>
                                <div style={{ color: "var(--text-muted)", fontSize: "0.86rem", marginTop: "0.2rem" }}>
                                    {generationError}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => generateStory()}
                            style={{
                                padding: "0.6rem 1.25rem",
                                borderRadius: "10px",
                                border: "1px solid rgba(239, 68, 68, 0.4)",
                                background: "rgba(239, 68, 68, 0.2)",
                                color: "#ffffff",
                                fontWeight: 700,
                                fontSize: "0.88rem",
                                cursor: "pointer",
                                transition: "all 0.2s ease"
                            }}
                        >
                            ↺ Retry Generation
                        </button>
                    </div>
                )}

                {/* ── Loading Spinner State ── */}
                {isLoadingStory && (
                    <div className="glass-panel" style={{
                        padding: "4rem 2rem",
                        borderRadius: "20px",
                        textAlign: "center",
                        border: "1px solid rgba(99, 102, 241, 0.25)",
                        background: "rgba(15, 20, 34, 0.65)",
                        marginBottom: "2rem"
                    }}>
                        <div style={{
                            width: "54px",
                            height: "54px",
                            borderRadius: "50%",
                            border: "3px solid rgba(99, 102, 241, 0.2)",
                            borderTopColor: "#6366f1",
                            animation: "spin 0.8s linear infinite",
                            margin: "0 auto 1.5rem"
                        }} />
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 0.5rem" }} className="text-gradient">
                            Gemini is Crafting an Original Story...
                        </h3>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
                            Generating engaging characters, vivid events, and 5 tailored comprehension questions for {difficulty} level.
                        </p>
                    </div>
                )}

                {/* ── Active Story & Audio Player Card ── */}
                {!isLoadingStory && currentStory && (
                    <>
                        {/* Audio Listening Card (Story text is NEVER shown) */}
                        <div className="glass-panel" style={{
                            padding: "2rem",
                            borderRadius: "20px",
                            border: `1px solid ${playbackStatus === "playing" ? "rgba(99, 102, 241, 0.45)" : "rgba(255, 255, 255, 0.08)"}`,
                            background: "rgba(15, 20, 34, 0.75)",
                            boxShadow: playbackStatus === "playing" ? "0 12px 35px -8px rgba(99, 102, 241, 0.25)" : "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
                            marginBottom: "2rem",
                            position: "relative",
                            overflow: "hidden",
                            transition: "all 0.3s ease"
                        }}>
                            {/* Ambient background glow */}
                            <div style={{
                                position: "absolute",
                                top: "-80px",
                                right: "-80px",
                                width: "240px",
                                height: "240px",
                                borderRadius: "50%",
                                background: playbackStatus === "playing" ? "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)" : "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
                                pointerEvents: "none"
                            }} />

                            {/* Story Meta Badges */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: "0.75rem",
                                marginBottom: "1.25rem"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                                    <span style={{
                                        padding: "0.25rem 0.75rem",
                                        borderRadius: "8px",
                                        fontSize: "0.78rem",
                                        fontWeight: 700,
                                        background: currentTheme.badgeBg,
                                        border: `1px solid ${currentTheme.border}`,
                                        color: currentTheme.text
                                    }}>
                                        {currentStory.difficulty} • {currentStory.estimatedDuration || currentTheme.duration}
                                    </span>

                                    {currentStory.genre && (
                                        <span style={{
                                            padding: "0.25rem 0.75rem",
                                            borderRadius: "8px",
                                            fontSize: "0.78rem",
                                            fontWeight: 600,
                                            background: "rgba(255, 255, 255, 0.05)",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            color: "var(--text-muted)"
                                        }}>
                                            Genre: {currentStory.genre}
                                        </span>
                                    )}
                                </div>

                                {/* Next story button in header */}
                                <button
                                    onClick={() => generateStory()}
                                    disabled={isLoadingStory || isEvaluating}
                                    style={{
                                        background: "transparent",
                                        border: "1px solid rgba(255, 255, 255, 0.12)",
                                        color: "var(--text-muted)",
                                        padding: "0.35rem 0.85rem",
                                        borderRadius: "8px",
                                        fontSize: "0.82rem",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.4rem"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "#ffffff";
                                        e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.4)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "var(--text-muted)";
                                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                                    }}
                                >
                                    <span>↻</span> New Story
                                </button>
                            </div>

                            {/* Story Title */}
                            <h2 style={{
                                fontSize: "1.75rem",
                                fontWeight: 800,
                                margin: "0 0 0.5rem",
                                color: "#ffffff",
                                letterSpacing: "-0.01em"
                            }}>
                                🎧 {currentStory.title}
                            </h2>

                            {/* Listening Instruction Notice (Story text is NEVER revealed) */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.6rem",
                                padding: "0.75rem 1rem",
                                borderRadius: "10px",
                                background: "rgba(99, 102, 241, 0.08)",
                                border: "1px solid rgba(99, 102, 241, 0.2)",
                                color: "#c7d2fe",
                                fontSize: "0.85rem",
                                marginBottom: "1.75rem"
                            }}>
                                <span style={{ fontSize: "1.1rem" }}>💡</span>
                                <div>
                                    <strong>Ear Training Mode:</strong> Story text is intentionally hidden so you focus exclusively on listening comprehension. Listen once or replay as needed!
                                </div>
                            </div>

                            {/* Audio Progress Bar */}
                            <div style={{ marginBottom: "1.5rem" }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "0.78rem",
                                    color: "var(--text-subtle)",
                                    marginBottom: "0.45rem",
                                    fontWeight: 600
                                }}>
                                    <span>
                                        {playbackStatus === "playing" ? "Playing story..." :
                                         playbackStatus === "paused" ? "Paused" :
                                         playbackStatus === "finished" ? "Playback Completed" : "Ready to play"}
                                    </span>
                                    <span>{playbackProgress}%</span>
                                </div>
                                <div style={{
                                    width: "100%",
                                    height: "8px",
                                    borderRadius: "999px",
                                    background: "rgba(255, 255, 255, 0.08)",
                                    overflow: "hidden"
                                }}>
                                    <div style={{
                                        width: `${playbackProgress}%`,
                                        height: "100%",
                                        borderRadius: "999px",
                                        background: isQuizUnlocked
                                            ? "linear-gradient(90deg, #10b981 0%, #34d399 100%)"
                                            : "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)",
                                        transition: "width 0.25s linear",
                                        boxShadow: "0 0 12px rgba(99, 102, 241, 0.5)"
                                    }} />
                                </div>
                            </div>

                            {/* Audio Controls */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "1rem",
                                flexWrap: "wrap"
                            }}>
                                {playbackStatus === "idle" && (
                                    <button
                                        onClick={playAudio}
                                        style={{
                                            padding: "0.85rem 2rem",
                                            borderRadius: "14px",
                                            border: "none",
                                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                            color: "#ffffff",
                                            fontWeight: 700,
                                            fontSize: "1rem",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.6rem",
                                            boxShadow: "0 8px 24px -4px rgba(99, 102, 241, 0.4)",
                                            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                                    >
                                        <span style={{ fontSize: "1.2rem" }}>▶</span> Play Story Audio
                                    </button>
                                )}

                                {playbackStatus === "playing" && (
                                    <>
                                        <button
                                            onClick={pauseAudio}
                                            style={{
                                                padding: "0.85rem 1.75rem",
                                                borderRadius: "14px",
                                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                                background: "rgba(255, 255, 255, 0.1)",
                                                color: "#ffffff",
                                                fontWeight: 700,
                                                fontSize: "0.95rem",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.5rem"
                                            }}
                                        >
                                            <span>⏸</span> Pause
                                        </button>
                                        <button
                                            onClick={restartAudio}
                                            style={{
                                                padding: "0.85rem 1.5rem",
                                                borderRadius: "14px",
                                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                                background: "transparent",
                                                color: "var(--text-muted)",
                                                fontWeight: 600,
                                                fontSize: "0.95rem",
                                                cursor: "pointer"
                                            }}
                                        >
                                            ↺ Restart
                                        </button>
                                    </>
                                )}

                                {playbackStatus === "paused" && (
                                    <>
                                        <button
                                            onClick={resumeAudio}
                                            style={{
                                                padding: "0.85rem 2rem",
                                                borderRadius: "14px",
                                                border: "none",
                                                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                                color: "#ffffff",
                                                fontWeight: 700,
                                                fontSize: "1rem",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.6rem",
                                                boxShadow: "0 8px 24px -4px rgba(99, 102, 241, 0.4)"
                                            }}
                                        >
                                            <span>▶</span> Resume Listening
                                        </button>
                                        <button
                                            onClick={restartAudio}
                                            style={{
                                                padding: "0.85rem 1.5rem",
                                                borderRadius: "14px",
                                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                                background: "transparent",
                                                color: "var(--text-muted)",
                                                fontWeight: 600,
                                                fontSize: "0.95rem",
                                                cursor: "pointer"
                                            }}
                                        >
                                            ↺ Restart
                                        </button>
                                    </>
                                )}

                                {playbackStatus === "finished" && (
                                    <button
                                        onClick={restartAudio}
                                        style={{
                                            padding: "0.85rem 1.75rem",
                                            borderRadius: "14px",
                                            border: "1px solid rgba(16, 185, 129, 0.4)",
                                            background: "rgba(16, 185, 129, 0.15)",
                                            color: "#34d399",
                                            fontWeight: 700,
                                            fontSize: "0.95rem",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem"
                                        }}
                                    >
                                        <span>↺</span> Replay Story Audio
                                    </button>
                                )}
                            </div>

                            {/* Status Footer Banner */}
                            <div style={{
                                marginTop: "1.75rem",
                                textAlign: "center",
                                fontSize: "0.85rem",
                                color: isQuizUnlocked ? "#34d399" : "var(--text-subtle)",
                                fontWeight: 600
                            }}>
                                {isQuizUnlocked
                                    ? "✓ Audio finished! The 5 comprehension questions below are unlocked."
                                    : "🔒 Listen through the full story to unlock the 5 comprehension questions."}
                            </div>
                        </div>

                        {/* ── 5 Comprehension Questions Section ── */}
                        <div style={{ marginBottom: "2.5rem" }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: "0.75rem",
                                marginBottom: "1.25rem"
                            }}>
                                <div>
                                    <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "#ffffff" }}>
                                        Comprehension Questions
                                    </h3>
                                    <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)", fontSize: "0.86rem" }}>
                                        Answer all 5 questions based on the story you just heard.
                                    </p>
                                </div>

                                <div style={{
                                    padding: "0.35rem 0.85rem",
                                    borderRadius: "8px",
                                    background: isAllAnswered ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.05)",
                                    border: isAllAnswered ? "1px solid rgba(16, 185, 129, 0.35)" : "1px solid rgba(255, 255, 255, 0.1)",
                                    color: isAllAnswered ? "#34d399" : "var(--text-muted)",
                                    fontSize: "0.82rem",
                                    fontWeight: 700
                                }}>
                                    {answeredCount} of {totalQuestionsCount} Answered
                                </div>
                            </div>

                            {/* ── If Audio Not Completed: Locked Shield Overlay ── */}
                            {!isQuizUnlocked ? (
                                <div className="glass-panel" style={{
                                    padding: "3.5rem 2rem",
                                    borderRadius: "18px",
                                    border: "1px dashed rgba(255, 255, 255, 0.12)",
                                    background: "rgba(15, 20, 34, 0.4)",
                                    textAlign: "center"
                                }}>
                                    <div style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "50%",
                                        background: "rgba(255, 255, 255, 0.04)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1.6rem",
                                        margin: "0 auto 1.25rem"
                                    }}>
                                        🔒
                                    </div>
                                    <h4 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 0.5rem", color: "#ffffff" }}>
                                        Quiz Locked
                                    </h4>
                                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
                                        Please listen to the entire audio story above first. Once the playback finishes, all 5 comprehension questions will unlock automatically.
                                    </p>
                                    <button
                                        onClick={playAudio}
                                        style={{
                                            padding: "0.65rem 1.4rem",
                                            borderRadius: "10px",
                                            border: "1px solid rgba(99, 102, 241, 0.4)",
                                            background: "rgba(99, 102, 241, 0.18)",
                                            color: "#a5b4fc",
                                            fontWeight: 700,
                                            fontSize: "0.88rem",
                                            cursor: "pointer"
                                        }}
                                    >
                                        ▶ Start Audio Playback
                                    </button>
                                </div>
                            ) : (
                                /* ── Unlocked Questions List ── */
                                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                    {currentStory.questions.map((q, idx) => {
                                        const qNum = idx + 1;
                                        const selected = userAnswers[q.id];
                                        const typeInfo = QUESTION_TYPE_LABELS[q.type] || QUESTION_TYPE_LABELS.comprehension;

                                        return (
                                            <div
                                                key={q.id || idx}
                                                className="glass-panel"
                                                style={{
                                                    padding: "1.75rem",
                                                    borderRadius: "16px",
                                                    border: selected ? "1px solid rgba(99, 102, 241, 0.35)" : "1px solid rgba(255, 255, 255, 0.06)",
                                                    background: selected ? "rgba(15, 20, 34, 0.8)" : "rgba(15, 20, 34, 0.55)",
                                                    transition: "all 0.2s ease"
                                                }}
                                            >
                                                {/* Question Header */}
                                                <div style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    flexWrap: "wrap",
                                                    gap: "0.5rem",
                                                    marginBottom: "0.85rem"
                                                }}>
                                                    <span style={{
                                                        fontSize: "0.78rem",
                                                        fontWeight: 700,
                                                        color: "var(--text-subtle)",
                                                        letterSpacing: "0.05em",
                                                        textTransform: "uppercase"
                                                    }}>
                                                        Question {qNum} of {totalQuestionsCount}
                                                    </span>

                                                    <span style={{
                                                        padding: "0.2rem 0.6rem",
                                                        borderRadius: "6px",
                                                        fontSize: "0.72rem",
                                                        fontWeight: 700,
                                                        background: "rgba(255, 255, 255, 0.04)",
                                                        border: `1px solid ${typeInfo.color}40`,
                                                        color: typeInfo.color
                                                    }}>
                                                        {typeInfo.label}
                                                    </span>
                                                </div>

                                                {/* Question Prompt */}
                                                <h4 style={{
                                                    fontSize: "1.05rem",
                                                    fontWeight: 700,
                                                    color: "#ffffff",
                                                    margin: "0 0 1.25rem",
                                                    lineHeight: 1.5
                                                }}>
                                                    {q.question}
                                                </h4>

                                                {/* 4 Options Grid */}
                                                <div style={{
                                                    display: "grid",
                                                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                                                    gap: "0.75rem"
                                                }}>
                                                    {q.options.map((opt, optIdx) => {
                                                        const isSelected = selected === opt;
                                                        const optionLetter = String.fromCharCode(65 + optIdx);

                                                        return (
                                                            <button
                                                                key={optIdx}
                                                                onClick={() => handleSelectOption(q.id, opt)}
                                                                disabled={Boolean(evaluationResult) || isEvaluating}
                                                                style={{
                                                                    textAlign: "left",
                                                                    padding: "0.85rem 1rem",
                                                                    borderRadius: "10px",
                                                                    border: isSelected
                                                                        ? "1px solid #6366f1"
                                                                        : "1px solid rgba(255, 255, 255, 0.08)",
                                                                    background: isSelected
                                                                        ? "rgba(99, 102, 241, 0.18)"
                                                                        : "rgba(255, 255, 255, 0.02)",
                                                                    color: isSelected ? "#ffffff" : "var(--text-main)",
                                                                    fontSize: "0.9rem",
                                                                    fontWeight: isSelected ? 600 : 400,
                                                                    cursor: (evaluationResult || isEvaluating) ? "default" : "pointer",
                                                                    display: "flex",
                                                                    alignItems: "flex-start",
                                                                    gap: "0.75rem",
                                                                    transition: "all 0.15s ease",
                                                                    boxShadow: isSelected ? "0 4px 14px -4px rgba(99, 102, 241, 0.3)" : "none"
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    if (!isSelected && !evaluationResult && !isEvaluating) {
                                                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                                                                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                                                                    }
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    if (!isSelected && !evaluationResult && !isEvaluating) {
                                                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                                                                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                                                                    }
                                                                }}
                                                            >
                                                                <span style={{
                                                                    width: "24px",
                                                                    height: "24px",
                                                                    borderRadius: "6px",
                                                                    background: isSelected ? "#6366f1" : "rgba(255, 255, 255, 0.06)",
                                                                    color: isSelected ? "#ffffff" : "var(--text-muted)",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    fontSize: "0.75rem",
                                                                    fontWeight: 800,
                                                                    flexShrink: 0,
                                                                    marginTop: "1px"
                                                                }}>
                                                                    {optionLetter}
                                                                </span>
                                                                <span style={{ lineHeight: 1.4 }}>{opt}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Submit Button & Status */}
                                    {!evaluationResult && (
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: "0.85rem",
                                            marginTop: "1rem"
                                        }}>
                                            {evaluationError && (
                                                <div style={{
                                                    color: "#fca5a5",
                                                    fontSize: "0.88rem",
                                                    background: "rgba(239, 68, 68, 0.1)",
                                                    padding: "0.5rem 1rem",
                                                    borderRadius: "8px",
                                                    border: "1px solid rgba(239, 68, 68, 0.25)"
                                                }}>
                                                    ⚠️ {evaluationError}
                                                </div>
                                            )}

                                            <button
                                                onClick={handleSubmitQuiz}
                                                disabled={!isAllAnswered || isEvaluating}
                                                style={{
                                                    padding: "0.95rem 2.5rem",
                                                    borderRadius: "14px",
                                                    border: "none",
                                                    background: isAllAnswered
                                                        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                                                        : "rgba(255, 255, 255, 0.08)",
                                                    color: isAllAnswered ? "#ffffff" : "var(--text-subtle)",
                                                    fontWeight: 800,
                                                    fontSize: "1rem",
                                                    cursor: isAllAnswered && !isEvaluating ? "pointer" : "not-allowed",
                                                    boxShadow: isAllAnswered ? "0 8px 25px -4px rgba(16, 185, 129, 0.4)" : "none",
                                                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                                                }}
                                            >
                                                {isEvaluating ? "✦ Evaluating with Gemini AI..." :
                                                 !isAllAnswered ? `Answer all 5 questions (${answeredCount}/5)` :
                                                 "✦ Submit Answers for AI Evaluation"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* ── Gemini Evaluation Results Section ── */}
                        {evaluationResult && (
                            <div className="glass-panel" style={{
                                padding: "2.5rem",
                                borderRadius: "22px",
                                border: "1px solid rgba(99, 102, 241, 0.35)",
                                background: "rgba(15, 20, 34, 0.85)",
                                boxShadow: "0 15px 40px -10px rgba(0, 0, 0, 0.7)",
                                marginBottom: "2rem"
                            }}>
                                {/* Score Header */}
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    gap: "1.5rem",
                                    paddingBottom: "1.75rem",
                                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                                    marginBottom: "2rem"
                                }}>
                                    <div>
                                        <div style={{
                                            fontSize: "0.78rem",
                                            fontWeight: 700,
                                            color: "var(--text-subtle)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.08em",
                                            marginBottom: "0.35rem"
                                        }}>
                                            Comprehension Score
                                        </div>
                                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                                            <span style={{ fontSize: "2.75rem", fontWeight: 800, color: "#ffffff" }}>
                                                {evaluationResult.score} / {evaluationResult.totalQuestions}
                                            </span>
                                            <span style={{
                                                fontSize: "1.1rem",
                                                fontWeight: 800,
                                                padding: "0.25rem 0.75rem",
                                                borderRadius: "8px",
                                                background: evaluationResult.percentage >= 80 ? "rgba(16, 185, 129, 0.18)" : evaluationResult.percentage >= 60 ? "rgba(99, 102, 241, 0.18)" : "rgba(239, 68, 68, 0.18)",
                                                border: `1px solid ${evaluationResult.percentage >= 80 ? "#10b981" : evaluationResult.percentage >= 60 ? "#6366f1" : "#ef4444"}`,
                                                color: evaluationResult.percentage >= 80 ? "#34d399" : evaluationResult.percentage >= 60 ? "#a5b4fc" : "#fca5a5"
                                            }}>
                                                {evaluationResult.percentage}%
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Button: Next Story */}
                                    <button
                                        onClick={() => generateStory()}
                                        style={{
                                            padding: "0.95rem 2rem",
                                            borderRadius: "14px",
                                            border: "none",
                                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                            color: "#ffffff",
                                            fontWeight: 800,
                                            fontSize: "1rem",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.6rem",
                                            boxShadow: "0 8px 25px -4px rgba(99, 102, 241, 0.5)",
                                            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                                    >
                                        <span>✦</span> Generate Next Story →
                                    </button>
                                </div>

                                {/* Overall Assessment */}
                                {evaluationResult.overallAssessment && (
                                    <div style={{
                                        padding: "1.25rem 1.5rem",
                                        borderRadius: "14px",
                                        background: "rgba(99, 102, 241, 0.08)",
                                        border: "1px solid rgba(99, 102, 241, 0.25)",
                                        marginBottom: "2rem"
                                    }}>
                                        <div style={{
                                            fontSize: "0.78rem",
                                            fontWeight: 800,
                                            color: "#a5b4fc",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                            marginBottom: "0.4rem"
                                        }}>
                                            ✦ Gemini Listening Assessment
                                        </div>
                                        <p style={{ margin: 0, color: "var(--text-main)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                                            {evaluationResult.overallAssessment}
                                        </p>
                                    </div>
                                )}

                                {/* Actionable Improvement Areas */}
                                {Array.isArray(evaluationResult.improvementAreas) && evaluationResult.improvementAreas.length > 0 && (
                                    <div style={{
                                        padding: "1.25rem 1.5rem",
                                        borderRadius: "14px",
                                        background: "rgba(255, 255, 255, 0.02)",
                                        border: "1px solid rgba(255, 255, 255, 0.07)",
                                        marginBottom: "2.5rem"
                                    }}>
                                        <div style={{
                                            fontSize: "0.78rem",
                                            fontWeight: 800,
                                            color: "var(--text-subtle)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                            marginBottom: "0.6rem"
                                        }}>
                                            💡 Coach Tips for Better Listening
                                        </div>
                                        <ul style={{ margin: 0, paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                                            {evaluationResult.improvementAreas.map((tip, tipIdx) => (
                                                <li key={tipIdx} style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.5 }}>
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Question-by-Question Detailed Breakdown */}
                                <h4 style={{ fontSize: "1.15rem", fontWeight: 800, margin: "0 0 1rem", color: "#ffffff" }}>
                                    Detailed Question Review
                                </h4>

                                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                    {evaluationResult.questionResults.map((qr, qIdx) => {
                                        return (
                                            <div
                                                key={qr.id || qIdx}
                                                style={{
                                                    padding: "1.25rem",
                                                    borderRadius: "14px",
                                                    border: qr.isCorrect
                                                        ? "1px solid rgba(16, 185, 129, 0.25)"
                                                        : "1px solid rgba(239, 68, 68, 0.25)",
                                                    background: qr.isCorrect
                                                        ? "rgba(16, 185, 129, 0.05)"
                                                        : "rgba(239, 68, 68, 0.05)"
                                                }}
                                            >
                                                {/* Status indicator */}
                                                <div style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    marginBottom: "0.6rem"
                                                }}>
                                                    <span style={{
                                                        fontSize: "0.8rem",
                                                        fontWeight: 700,
                                                        color: qr.isCorrect ? "#34d399" : "#fca5a5"
                                                    }}>
                                                        {qr.isCorrect ? "✓ Question " + (qIdx + 1) + " Correct" : "✗ Question " + (qIdx + 1) + " Incorrect"}
                                                    </span>

                                                    {qr.type && (
                                                        <span style={{
                                                            fontSize: "0.7rem",
                                                            fontWeight: 600,
                                                            color: "var(--text-subtle)",
                                                            textTransform: "capitalize"
                                                        }}>
                                                            {qr.type.replace("_", " ")}
                                                        </span>
                                                    )}
                                                </div>

                                                <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "0.95rem", marginBottom: "0.75rem" }}>
                                                    {qr.question}
                                                </div>

                                                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.86rem", marginBottom: "0.75rem" }}>
                                                    <div>
                                                        <span style={{ color: "var(--text-subtle)" }}>Your Answer: </span>
                                                        <span style={{
                                                            fontWeight: 600,
                                                            color: qr.isCorrect ? "#34d399" : "#fca5a5"
                                                        }}>
                                                            {qr.selectedAnswer}
                                                        </span>
                                                    </div>

                                                    {!qr.isCorrect && (
                                                        <div>
                                                            <span style={{ color: "var(--text-subtle)" }}>Correct Answer: </span>
                                                            <span style={{ fontWeight: 600, color: "#34d399" }}>
                                                                {qr.correctAnswer}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Explanation */}
                                                {qr.explanation && (
                                                    <div style={{
                                                        fontSize: "0.84rem",
                                                        color: "var(--text-muted)",
                                                        lineHeight: 1.5,
                                                        background: "rgba(0, 0, 0, 0.2)",
                                                        padding: "0.65rem 0.85rem",
                                                        borderRadius: "8px",
                                                        borderLeft: `3px solid ${qr.isCorrect ? "#10b981" : "#ef4444"}`
                                                    }}>
                                                        <strong>Story Clue:</strong> {qr.explanation}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Bottom generate next story CTA */}
                                <div style={{ marginTop: "2rem", textAlign: "center" }}>
                                    <button
                                        onClick={() => generateStory()}
                                        style={{
                                            padding: "1rem 2.5rem",
                                            borderRadius: "14px",
                                            border: "none",
                                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                            color: "#ffffff",
                                            fontWeight: 800,
                                            fontSize: "1rem",
                                            cursor: "pointer",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "0.6rem",
                                            boxShadow: "0 8px 25px -4px rgba(99, 102, 241, 0.5)"
                                        }}
                                    >
                                        <span>✦</span> Generate Next Story →
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}

            </main>
        </div>
    );
};

export default Scenarios;
