import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import API_URL from "../api";

const READING_DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

const DIFFICULTY_THEMES = {
    Beginner: { bg: "rgba(16, 185, 129, 0.15)", border: "#10b981", text: "#34d399", target: "5–10 words" },
    Intermediate: { bg: "rgba(139, 92, 246, 0.18)", border: "#8b5cf6", text: "#c4b5fd", target: "10–18 words" },
    Advanced: { bg: "rgba(244, 63, 94, 0.18)", border: "#f43f5e", text: "#fb7185", target: "15–25 words" }
};

const REQUEST_TIMEOUT_MS = 20000;
const HISTORY_STORAGE_KEY = "coach_reading_history";
const LEVEL_STORAGE_KEY = "coach_reading_level";
const STATS_STORAGE_KEY = "coach_reading_stats";
const CURRENT_SENTENCE_KEY = "coach_reading_current_sentence";

const Reading = () => {
    // ── Persistent Preferences & Sentence History ─────────────────────────────
    const [difficulty, setDifficulty] = useState(() => {
        return localStorage.getItem(LEVEL_STORAGE_KEY) || "Intermediate";
    });

    const [sentenceHistory, setSentenceHistory] = useState(() => {
        try {
            const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [sentenceNumber, setSentenceNumber] = useState(() => {
        return sentenceHistory.length > 0 ? sentenceHistory.length : 1;
    });

    // ── Session Statistics ────────────────────────────────────────────────────
    const [sessionStats, setSessionStats] = useState(() => {
        try {
            const saved = localStorage.getItem(STATS_STORAGE_KEY);
            return saved ? JSON.parse(saved) : {
                attempted: 0,
                totalAccuracy: 0,
                bestAccuracy: 0,
                totalCorrectWords: 0,
                totalMissedWords: 0
            };
        } catch {
            return {
                attempted: 0,
                totalAccuracy: 0,
                bestAccuracy: 0,
                totalCorrectWords: 0,
                totalMissedWords: 0
            };
        }
    });
    const [showSummaryModal, setShowSummaryModal] = useState(false);

    // ── Current Generated Sentence ────────────────────────────────────────────
    const [currentSentence, setCurrentSentence] = useState(() => {
        try {
            const saved = localStorage.getItem(CURRENT_SENTENCE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const [isLoadingSentence, setIsLoadingSentence] = useState(false);
    const [sentenceError, setSentenceError] = useState("");

    // ── Speech Synthesis (Listen to Text) ─────────────────────────────────────
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    // ── Speech Recognition & Recording ────────────────────────────────────────
    const [isRecording, setIsRecording] = useState(false);
    const [recordingSeconds, setRecordingSeconds] = useState(0);
    const [transcript, setTranscript] = useState("");
    const [speechError, setSpeechError] = useState("");

    const recognitionRef = useRef(null);
    const timerRef = useRef(null);
    const transcriptRef = useRef("");
    const isStoppingRef = useRef(false);
    const evaluatedRef = useRef(false);
    const safetyTimeoutRef = useRef(null);

    // ── Gemini Evaluation State ───────────────────────────────────────────────
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [evaluation, setEvaluation] = useState(null);
    const [evaluationError, setEvaluationError] = useState("");

    // Persist difficulty
    useEffect(() => {
        localStorage.setItem(LEVEL_STORAGE_KEY, difficulty);
    }, [difficulty]);

    // Persist sentence history (keep up to 50 recent items)
    useEffect(() => {
        try {
            localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(sentenceHistory.slice(-50)));
        } catch (e) {
            console.error("Failed to save reading history:", e);
        }
    }, [sentenceHistory]);

    // Persist session statistics
    useEffect(() => {
        try {
            localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(sessionStats));
        } catch (e) {
            console.error("Failed to save reading stats:", e);
        }
    }, [sessionStats]);

    // Persist active sentence
    useEffect(() => {
        if (currentSentence) {
            try {
                localStorage.setItem(CURRENT_SENTENCE_KEY, JSON.stringify(currentSentence));
            } catch {}
        }
    }, [currentSentence]);

    // Unmount cleanup
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

    // ── Gemini Content Generator ──────────────────────────────────────────────
    const fetchNewSentence = useCallback(async (forcedDifficulty = null) => {
        const diffToSend = forcedDifficulty !== null ? forcedDifficulty : difficulty;

        // Reset session state
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

        setIsRecording(false);
        setRecordingSeconds(0);
        isStoppingRef.current = false;
        evaluatedRef.current = false;
        setTranscript("");
        transcriptRef.current = "";
        setSpeechError("");
        setEvaluation(null);
        setEvaluationError("");
        setSentenceError("");
        setIsLoadingSentence(true);

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            setIsPlayingAudio(false);
        }

        try {
            const res = await axios.post(
                `${API_URL}/generate-reading-sentence`,
                {
                    difficulty: diffToSend,
                    recentSentences: sentenceHistory.slice(-20)
                },
                { timeout: REQUEST_TIMEOUT_MS }
            );

            if (res.data && res.data.sentence) {
                const newSentenceItem = {
                    sentence: res.data.sentence,
                    difficulty: res.data.difficulty || diffToSend,
                    wordCount: res.data.wordCount || res.data.sentence.split(/\s+/).filter(Boolean).length,
                    readingTip: res.data.readingTip || "Read steadily at a natural conversational pace, pausing slightly at punctuation."
                };
                setCurrentSentence(newSentenceItem);
                setSentenceNumber((prev) => prev + 1);

                // Add to history
                setSentenceHistory((prev) => [...prev, newSentenceItem.sentence]);
            }
        } catch (err) {
            console.error("Error generating reading sentence:", err);
            const status = err.response?.status;
            const code = err.response?.data?.code;
            const msg = err.response?.data?.error;

            if (status === 429 || code === "QUOTA_EXHAUSTED") {
                setSentenceError("Gemini API quota reached. Please try again after your quota resets.");
            } else if (err.code === "ECONNABORTED" || status === 504 || code === "TIMEOUT") {
                setSentenceError("Unable to generate reading sentence due to timeout. Please try again.");
            } else {
                setSentenceError(msg || "Unable to generate a new reading sentence. Please try again.");
            }
        } finally {
            setIsLoadingSentence(false);
        }
    }, [difficulty, sentenceHistory]);

    // Initial fetch if no sentence loaded
    useEffect(() => {
        if (!currentSentence) {
            fetchNewSentence();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Difficulty Change Handler ─────────────────────────────────────────────
    const handleDifficultyChange = (newDiff) => {
        if (newDiff === difficulty) return;
        setDifficulty(newDiff);
        fetchNewSentence(newDiff);
    };

    // ── Speech Synthesis: Listen to Text ──────────────────────────────────────
    const playTextAudio = () => {
        if (!currentSentence?.sentence) return;

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

        const utterance = new SpeechSynthesisUtterance(currentSentence.sentence);
        utterance.rate = difficulty === "Beginner" ? 0.85 : difficulty === "Advanced" ? 1.0 : 0.92;
        utterance.lang = "en-US";

        utterance.onstart = () => setIsPlayingAudio(true);
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);

        window.speechSynthesis.speak(utterance);
    };

    const stopTextAudio = () => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            setIsPlayingAudio(false);
        }
    };

    // ── Execute Gemini Reading Evaluation ─────────────────────────────────────
    const executeEvaluation = useCallback(async (transcriptionToEval) => {
        const textToEvaluate = (typeof transcriptionToEval === "string" ? transcriptionToEval : (transcriptRef.current || transcript)).trim();

        if (!currentSentence?.sentence) {
            setSpeechError("No active reading sentence to evaluate against. Please generate a sentence first.");
            return;
        }

        const words = textToEvaluate.split(/\s+/).filter(Boolean);
        if (words.length === 0) {
            setSpeechError("No spoken reading was detected. Please click 'Start Reading' and read the sentence aloud.");
            return;
        }

        setIsEvaluating(true);
        setEvaluationError("");
        setSpeechError("");

        try {
            const res = await axios.post(
                `${API_URL}/evaluate-reading`,
                {
                    originalText: currentSentence.sentence,
                    transcription: textToEvaluate,
                    difficulty: currentSentence.difficulty || difficulty
                },
                { timeout: REQUEST_TIMEOUT_MS }
            );

            if (res.data) {
                setEvaluation(res.data);

                // Update session stats
                setSessionStats((prev) => {
                    const newAttempted = prev.attempted + 1;
                    const newTotalAccuracy = prev.totalAccuracy + res.data.accuracyScore;
                    const newBestAccuracy = Math.max(prev.bestAccuracy, res.data.accuracyScore);
                    const newCorrect = prev.totalCorrectWords + (res.data.correctCount || 0);
                    const newMissed = prev.totalMissedWords + ((res.data.missingCount || 0) + (res.data.substitutedCount || 0));

                    return {
                        attempted: newAttempted,
                        totalAccuracy: newTotalAccuracy,
                        bestAccuracy: newBestAccuracy,
                        totalCorrectWords: newCorrect,
                        totalMissedWords: newMissed
                    };
                });
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
                setEvaluationError(msg || "Failed to analyze reading. Please verify backend service is running and click 'Retry Evaluation'.");
            }
        } finally {
            setIsEvaluating(false);
        }
    }, [currentSentence, difficulty, transcript]);

    // ── Finalize Transcription & Trigger Automatic Evaluation ─────────────────
    const finalizeAndEvaluate = useCallback(() => {
        if (safetyTimeoutRef.current) {
            clearTimeout(safetyTimeoutRef.current);
            safetyTimeoutRef.current = null;
        }

        if (evaluatedRef.current) return;

        const captured = (transcriptRef.current || transcript).trim();
        const words = captured ? captured.split(/\s+/).filter(Boolean) : [];

        if (words.length === 0) {
            isStoppingRef.current = false;
            setSpeechError("No speech detected. Please press 'Start Reading' and read the sentence aloud into your microphone.");
            return;
        }

        evaluatedRef.current = true;
        executeEvaluation(captured);
    }, [transcript, executeEvaluation]);

    // ── Safe Stop Recording ───────────────────────────────────────────────────
    const handleStopRecording = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        if (isStoppingRef.current) return;
        isStoppingRef.current = true;
        setIsRecording(false);

        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) {
                console.warn("Recognition stop error:", e);
            }
        }

        // Safety fallback: finalize after 700ms if onend does not fire
        if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
        safetyTimeoutRef.current = setTimeout(() => {
            finalizeAndEvaluate();
        }, 700);
    }, [finalizeAndEvaluate]);

    // ── Start Recording ───────────────────────────────────────────────────────
    const startReadingSession = () => {
        if (!currentSentence?.sentence) {
            setSpeechError("No active reading sentence loaded. Please generate a sentence first.");
            return;
        }

        if (isRecording || isEvaluating) return;

        setSpeechError("");
        setTranscript("");
        transcriptRef.current = "";
        setEvaluation(null);
        setEvaluationError("");
        isStoppingRef.current = false;
        evaluatedRef.current = false;

        stopTextAudio();

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
                setRecordingSeconds(0);
                if (timerRef.current) clearInterval(timerRef.current);
                timerRef.current = setInterval(() => {
                    setRecordingSeconds((prev) => prev + 1);
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
                    setSpeechError("Microphone permission was denied. Please allow microphone access in your browser settings to record your reading.");
                } else if (event.error === "no-speech") {
                    setSpeechError("No speech detected. Please speak clearly into your microphone.");
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

    // ── Practice Again (Same Sentence) ────────────────────────────────────────
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
        setIsRecording(false);
        setRecordingSeconds(0);
        setTranscript("");
        transcriptRef.current = "";
        setEvaluation(null);
        setSpeechError("");
        setEvaluationError("");
        isStoppingRef.current = false;
        evaluatedRef.current = false;
    };

    // Helper formatting
    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).filter(Boolean).length : 0;
    const diffTheme = DIFFICULTY_THEMES[currentSentence?.difficulty || difficulty] || DIFFICULTY_THEMES.Intermediate;
    const averageAccuracy = sessionStats.attempted > 0
        ? Math.round(sessionStats.totalAccuracy / sessionStats.attempted)
        : 0;

    return (
        <div className="app-container" style={{ paddingBottom: "4rem" }}>
            <main className="main-content text-center animate-fade-in" style={{ maxWidth: "880px" }}>
                
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
                        <span>✦</span> Gemini AI Read Aloud Studio
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: "2.6rem", margin: 0, fontWeight: 800 }}>
                        Read Aloud Studio
                    </h1>
                    <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
                        Improve your English reading fluency by reading AI-generated sentences aloud and receiving instant feedback.
                    </p>
                </div>

                {/* ── Difficulty Bar & Session Stats Overview ── */}
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
                        {READING_DIFFICULTIES.map((diff) => {
                            const isSelected = difficulty === diff;
                            const theme = DIFFICULTY_THEMES[diff];
                            return (
                                <button
                                    key={diff}
                                    onClick={() => handleDifficultyChange(diff)}
                                    disabled={isLoadingSentence || isRecording || isEvaluating}
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

                    {/* Session Stats Quick Badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{ textAlign: "right", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                            <span style={{ color: "#ffffff", fontWeight: 700 }}>{sessionStats.attempted}</span> read | Avg:{" "}
                            <span style={{ color: averageAccuracy >= 80 ? "#34d399" : averageAccuracy >= 65 ? "#fbbf24" : "#a5b4fc", fontWeight: 700 }}>
                                {averageAccuracy}%
                            </span>
                        </div>
                        {sessionStats.attempted > 0 && (
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowSummaryModal(true)}
                                style={{
                                    fontSize: "0.78rem",
                                    padding: "0.35rem 0.75rem",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(139, 92, 246, 0.3)",
                                    color: "#c084fc"
                                }}
                            >
                                📊 Summary
                            </button>
                        )}
                    </div>
                </div>

                {/* Generation Error Banner */}
                {sentenceError && (
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
                        <span>⚠️ {sentenceError}</span>
                        <button
                            className="btn btn-secondary"
                            onClick={() => fetchNewSentence()}
                            disabled={isLoadingSentence}
                            style={{ fontSize: "0.82rem", padding: "0.35rem 0.9rem", borderRadius: "8px" }}
                        >
                            ↻ Retry Generation
                        </button>
                    </div>
                )}

                {/* ── Active Reading Card ── */}
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
                    {/* Top Action Row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
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
                                {currentSentence?.difficulty || difficulty}
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
                                📖 Passage #{sentenceNumber}
                            </span>
                            <span
                                style={{
                                    fontSize: "0.75rem",
                                    padding: "0.25rem 0.65rem",
                                    borderRadius: "8px",
                                    background: "rgba(255, 255, 255, 0.03)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    color: "var(--text-subtle)",
                                    fontWeight: 600
                                }}
                            >
                                {currentSentence?.wordCount || 0} words
                            </span>
                        </div>

                        {/* Skip / New Sentence Button */}
                        <button
                            className="btn btn-secondary"
                            onClick={() => fetchNewSentence()}
                            disabled={isLoadingSentence || isRecording || isEvaluating}
                            style={{
                                fontSize: "0.82rem",
                                padding: "0.4rem 0.85rem",
                                borderRadius: "8px"
                            }}
                            title="Generate a fresh reading passage from Gemini"
                        >
                            {isLoadingSentence ? "Generating..." : "Skip / New Sentence ⏭"}
                        </button>
                    </div>

                    {/* Sentence Text Box */}
                    <div style={{ minHeight: "90px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.75rem" }}>
                        {isLoadingSentence ? (
                            <div style={{ color: "#c084fc", fontSize: "1.15rem", fontWeight: 600 }}>
                                ✦ Gemini is creating a fresh reading passage...
                            </div>
                        ) : currentSentence ? (
                            <h2
                                style={{
                                    fontSize: "clamp(1.4rem, 3.2vw, 2.1rem)",
                                    color: "#ffffff",
                                    lineHeight: 1.5,
                                    fontWeight: 800,
                                    letterSpacing: "-0.015em",
                                    margin: 0
                                }}
                            >
                                &ldquo;{currentSentence.sentence}&rdquo;
                            </h2>
                        ) : (
                            <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "1rem" }}>
                                <p style={{ margin: "0 0 0.85rem 0", fontSize: "1.05rem" }}>
                                    {sentenceError ? "No sentence loaded due to an error." : "No sentence loaded."}
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => fetchNewSentence()}
                                    disabled={isLoadingSentence}
                                    style={{ fontSize: "0.92rem", padding: "0.6rem 1.4rem", borderRadius: "10px" }}
                                >
                                    ✦ Generate Sentence with Gemini
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Reading Coach Tip */}
                    {currentSentence?.readingTip && !isLoadingSentence && (
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
                                💡 Coach Reading Tip
                            </span>
                            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--text-main)", opacity: 0.9 }}>
                                {currentSentence.readingTip}
                            </p>
                        </div>
                    )}

                    {/* ── Main Audio & Speaking Controls ── */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                        {/* Listen to Text (SpeechSynthesis) */}
                        <button
                            className="btn btn-secondary"
                            onClick={playTextAudio}
                            disabled={!currentSentence || isLoadingSentence || isRecording || isEvaluating}
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
                                opacity: (!currentSentence || isLoadingSentence || isRecording || isEvaluating) ? 0.5 : 1,
                                cursor: (!currentSentence || isLoadingSentence || isRecording || isEvaluating) ? "not-allowed" : "pointer"
                            }}
                        >
                            <span>{isPlayingAudio ? "⏹ Stop Listening" : "🔊 Listen to Text"}</span>
                        </button>

                        {/* Start Reading / Stop Reading Button */}
                        {!isRecording ? (
                            <button
                                className="btn btn-primary"
                                onClick={startReadingSession}
                                disabled={!currentSentence || isLoadingSentence || isEvaluating}
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
                                    opacity: (!currentSentence || isLoadingSentence || isEvaluating) ? 0.5 : 1,
                                    cursor: (!currentSentence || isLoadingSentence || isEvaluating) ? "not-allowed" : "pointer"
                                }}
                            >
                                <span>🎤 Start Reading</span>
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={handleStopRecording}
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
                                <span>⏹ Stop Reading ({formatTime(recordingSeconds)})</span>
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
                                    {isRecording ? "Live Voice Transcription (Reading...)" : "Captured Spoken Transcription"}
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
                            {transcript || "Listening to your reading..."}
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
                            Gemini is analysing your reading...
                        </h3>
                        <p style={{ fontSize: "0.98rem", color: "var(--text-muted)", margin: 0 }}>
                            Comparing spoken words against the target text, calculating word-level alignment, and evaluating fluency...
                        </p>
                    </div>
                )}

                {/* ── Evaluation Error Banner with Retry ── */}
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

                {/* ── Reading Performance Report Section ── */}
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
                                    Reading Evaluation Report
                                </span>
                                <h3 style={{ fontSize: "1.65rem", fontWeight: 800, margin: "0.25rem 0 0.35rem 0", color: "#ffffff" }}>
                                    Word Alignment & Accuracy
                                </h3>
                                <div style={{ fontSize: "0.78rem", color: "var(--text-subtle)" }}>
                                    Sequence-aligned against original text ({evaluation.totalWords} words)
                                </div>
                            </div>

                            {/* Accuracy Badge */}
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontSize: "0.78rem", color: "var(--text-subtle)", fontWeight: 700, textTransform: "uppercase" }}>
                                        Reading Accuracy
                                    </div>
                                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: evaluation.accuracyScore >= 85 ? "#34d399" : evaluation.accuracyScore >= 70 ? "#fbbf24" : "#f87171" }}>
                                        {evaluation.fluencyLevel ? `🌟 ${evaluation.fluencyLevel} Fluency` : (evaluation.accuracyScore >= 85 ? "🌟 Fluent" : evaluation.accuracyScore >= 70 ? "✨ Good Flow" : "📈 Needs Practice")}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: "68px",
                                        height: "68px",
                                        borderRadius: "50%",
                                        background: "rgba(15, 20, 34, 0.9)",
                                        border: `3px solid ${evaluation.accuracyScore >= 80 ? "#10b981" : evaluation.accuracyScore >= 65 ? "#f59e0b" : "#ef4444"}`,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)"
                                    }}
                                >
                                    <span style={{ fontSize: "1.45rem", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
                                        {evaluation.accuracyScore}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Summary Metrics Cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                            <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
                                <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                                    ✓ Correct Words
                                </div>
                                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#34d399" }}>
                                    {evaluation.correctCount}
                                </div>
                            </div>

                            <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
                                <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#f87171", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                                    ✗ Missing Words
                                </div>
                                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f87171" }}>
                                    {evaluation.missingCount}
                                </div>
                            </div>

                            <div style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
                                <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                                    🔄 Substituted
                                </div>
                                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fbbf24" }}>
                                    {evaluation.substitutedCount}
                                </div>
                            </div>

                            <div style={{ background: "rgba(139, 92, 246, 0.08)", border: "1px solid rgba(139, 92, 246, 0.2)", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
                                <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#c084fc", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                                    ➕ Extra Words
                                </div>
                                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#c084fc" }}>
                                    {evaluation.extraCount}
                                </div>
                            </div>
                        </div>

                        {/* Detailed Word-Level Comparison */}
                        <div style={{ marginBottom: "2rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                                    Detailed Word-by-Word Alignment
                                </h4>
                                <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.75rem" }}>
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "#34d399" }}>
                                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} /> Correct
                                    </span>
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "#f87171" }}>
                                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} /> Missing
                                    </span>
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "#fbbf24" }}>
                                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b" }} /> Substituted
                                    </span>
                                </div>
                            </div>

                            {/* Word Tokens Grid */}
                            <div
                                style={{
                                    background: "rgba(15, 20, 34, 0.8)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    borderRadius: "14px",
                                    padding: "1.5rem",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "0.6rem",
                                    lineHeight: 1.8
                                }}
                            >
                                {evaluation.alignment && evaluation.alignment.filter(item => item.original !== null).map((item, idx) => {
                                    if (item.status === "correct") {
                                        return (
                                            <span
                                                key={idx}
                                                style={{
                                                    background: "rgba(16, 185, 129, 0.15)",
                                                    border: "1px solid rgba(16, 185, 129, 0.4)",
                                                    color: "#34d399",
                                                    padding: "0.25rem 0.65rem",
                                                    borderRadius: "8px",
                                                    fontSize: "1.05rem",
                                                    fontWeight: 600
                                                }}
                                                title="Correctly read"
                                            >
                                                {item.original}
                                            </span>
                                        );
                                    } else if (item.status === "missing") {
                                        return (
                                            <span
                                                key={idx}
                                                style={{
                                                    background: "rgba(239, 68, 68, 0.18)",
                                                    border: "1px solid rgba(239, 68, 68, 0.45)",
                                                    color: "#f87171",
                                                    textDecoration: "line-through",
                                                    padding: "0.25rem 0.65rem",
                                                    borderRadius: "8px",
                                                    fontSize: "1.05rem",
                                                    fontWeight: 600
                                                }}
                                                title="Missing: word was skipped"
                                            >
                                                {item.original}
                                            </span>
                                        );
                                    } else if (item.status === "substituted") {
                                        return (
                                            <span
                                                key={idx}
                                                style={{
                                                    background: "rgba(245, 158, 11, 0.18)",
                                                    border: "1px solid rgba(245, 158, 11, 0.45)",
                                                    color: "#fbbf24",
                                                    padding: "0.25rem 0.65rem",
                                                    borderRadius: "8px",
                                                    fontSize: "1.05rem",
                                                    fontWeight: 600
                                                }}
                                                title={`Substituted: original "${item.original}", spoken "${item.spoken}"`}
                                            >
                                                <span style={{ textDecoration: "line-through", opacity: 0.85, marginRight: "0.3rem" }}>
                                                    {item.original}
                                                </span>
                                                <span style={{ color: "#ffffff", fontWeight: 700 }}>
                                                    ({item.spoken})
                                                </span>
                                            </span>
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                            {/* Extra words row */}
                            {evaluation.extraWords && evaluation.extraWords.length > 0 && (
                                <div style={{ marginTop: "0.75rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
                                    <strong style={{ color: "#c084fc" }}>Extra spoken words:</strong>{" "}
                                    {evaluation.extraWords.map((w, idx) => (
                                        <span
                                            key={idx}
                                            style={{
                                                background: "rgba(139, 92, 246, 0.15)",
                                                border: "1px solid rgba(139, 92, 246, 0.3)",
                                                color: "#c084fc",
                                                padding: "0.15rem 0.5rem",
                                                borderRadius: "6px",
                                                fontSize: "0.82rem",
                                                marginRight: "0.4rem",
                                                display: "inline-block"
                                            }}
                                        >
                                            +{w}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Gemini Reading Feedback */}
                        {evaluation.feedback && (
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
                                    ✓ Coach Fluency Feedback
                                </span>
                                <p style={{ margin: 0, fontSize: "0.98rem", color: "var(--text-main)", lineHeight: 1.6 }}>
                                    {evaluation.feedback}
                                </p>
                            </div>
                        )}

                        {/* Difficult Words Pronunciation Guidance */}
                        {evaluation.difficultWords && evaluation.difficultWords.length > 0 && (
                            <div style={{ marginBottom: "2rem" }}>
                                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.85rem" }}>
                                    🗣️ Tricky Words & Pronunciation Tips
                                </h4>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.75rem" }}>
                                    {evaluation.difficultWords.map((d, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                background: "rgba(15, 20, 34, 0.7)",
                                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                                borderRadius: "10px",
                                                padding: "0.85rem 1rem"
                                            }}
                                        >
                                            <span style={{ color: "#38bdf8", fontWeight: 700, fontSize: "0.98rem" }}>
                                                &ldquo;{d.word}&rdquo;
                                            </span>
                                            <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                                                {d.pronunciationTip}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Improvement Suggestions */}
                        {evaluation.suggestions && evaluation.suggestions.length > 0 && (
                            <div style={{ background: "rgba(15, 20, 34, 0.6)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "12px", padding: "1.25rem", marginBottom: "2rem" }}>
                                <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#c084fc", letterSpacing: "0.06em", display: "block", marginBottom: "0.5rem" }}>
                                    💡 Practical Fluency Suggestions
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

                        {/* Action Buttons: Practice Again or Next Sentence */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
                            <button
                                className="btn btn-secondary"
                                onClick={handlePracticeAgain}
                                style={{ fontSize: "0.95rem", padding: "0.75rem 1.6rem", borderRadius: "10px" }}
                            >
                                ↻ Practice This Sentence Again
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={() => fetchNewSentence()}
                                disabled={isLoadingSentence}
                                style={{ fontSize: "0.95rem", padding: "0.75rem 1.8rem", borderRadius: "10px" }}
                            >
                                ✦ Generate Next Sentence →
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Session Summary Modal ── */}
                {showSummaryModal && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "rgba(0, 0, 0, 0.75)",
                            backdropFilter: "blur(10px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1000,
                            padding: "1rem"
                        }}
                    >
                        <div
                            className="glass-panel animate-fade-in"
                            style={{
                                maxWidth: "520px",
                                width: "100%",
                                padding: "2.5rem 2rem",
                                borderRadius: "20px",
                                border: "1px solid rgba(139, 92, 246, 0.4)",
                                textAlign: "center"
                            }}
                        >
                            <span style={{ fontSize: "2.2rem", display: "block", marginBottom: "0.5rem" }}>🏆</span>
                            <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.5rem 0" }}>
                                Reading Session Summary
                            </h3>
                            <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", marginBottom: "1.75rem" }}>
                                Completed practice statistics across this session.
                            </p>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "2rem", textAlign: "left" }}>
                                <div style={{ background: "rgba(15, 20, 34, 0.8)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)", fontWeight: 700, textTransform: "uppercase" }}>
                                        Total Sentences
                                    </div>
                                    <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#ffffff" }}>
                                        {sessionStats.attempted}
                                    </div>
                                </div>

                                <div style={{ background: "rgba(15, 20, 34, 0.8)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)", fontWeight: 700, textTransform: "uppercase" }}>
                                        Average Accuracy
                                    </div>
                                    <div style={{ fontSize: "1.45rem", fontWeight: 800, color: averageAccuracy >= 80 ? "#34d399" : "#fbbf24" }}>
                                        {averageAccuracy}%
                                    </div>
                                </div>

                                <div style={{ background: "rgba(15, 20, 34, 0.8)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)", fontWeight: 700, textTransform: "uppercase" }}>
                                        Best Score
                                    </div>
                                    <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#34d399" }}>
                                        {sessionStats.bestAccuracy}%
                                    </div>
                                </div>

                                <div style={{ background: "rgba(15, 20, 34, 0.8)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)", fontWeight: 700, textTransform: "uppercase" }}>
                                        Words Read
                                    </div>
                                    <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#c084fc" }}>
                                        {sessionStats.totalCorrectWords}
                                    </div>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary"
                                onClick={() => setShowSummaryModal(false)}
                                style={{ width: "100%", padding: "0.75rem", borderRadius: "10px", fontSize: "0.95rem" }}
                            >
                                Continue Reading →
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Reading;
