import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    grammarSections,
    TOTAL_GRAMMAR_TOPICS,
    getTopicById,
    getNextTopic,
    getPrevTopic,
    getTopicIndexInfo
} from "../data/grammarData";

const STORAGE_KEY = "englishCoach_grammarCompleted";

const Grammar = () => {
    const navigate = useNavigate();

    // Active topic state
    const [activeTopicId, setActiveTopicId] = useState("nouns");
    const activeTopic = getTopicById(activeTopicId);

    // Completed topics state (persisted in localStorage)
    const [completedTopics, setCompletedTopics] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Practice Quiz Engine state for the current active topic
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: { chosen, isCorrect } }
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Filter/search state for sidebar
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    // Reset quiz state when active topic changes
    useEffect(() => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsSubmitted(false);
        setUserAnswers({});
        setQuizCompleted(false);
    }, [activeTopicId]);

    // Persist completed topics
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTopics));
        } catch (err) {
            console.error("Failed to save completed topics to localStorage:", err);
        }
    }, [completedTopics]);

    const isTopicCompleted = completedTopics.includes(activeTopic.id);

    const toggleTopicCompletion = () => {
        setCompletedTopics((prev) => {
            if (prev.includes(activeTopic.id)) {
                return prev.filter((id) => id !== activeTopic.id);
            } else {
                return [...prev, activeTopic.id];
            }
        });
    };

    const handleTopicChange = (topicId) => {
        setActiveTopicId(topicId);
        setIsMobileDrawerOpen(false);
        // Scroll content area back to top
        const contentEl = document.getElementById("grammar-content-container");
        if (contentEl) {
            contentEl.scrollTo({ top: 0, behavior: "smooth" });
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const nextTopic = getNextTopic(activeTopic.id);
    const prevTopic = getPrevTopic(activeTopic.id);
    const indexInfo = getTopicIndexInfo(activeTopic.id);

    const exercises = activeTopic.exercises || [];
    const currentQuestion = exercises[currentQuestionIndex];

    const handleSelectOption = (opt) => {
        if (isSubmitted) return;
        setSelectedOption(opt);
    };

    const handleSubmitAnswer = () => {
        if (!selectedOption || !currentQuestion) return;
        const isCorrect = selectedOption === currentQuestion.answer;
        setUserAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: {
                chosen: selectedOption,
                isCorrect
            }
        }));
        setIsSubmitted(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < exercises.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedOption(null);
            setIsSubmitted(false);
        } else {
            setQuizCompleted(true);
            // Auto mark topic as completed if score is passing (at least 75%)
            const totalScore = Object.values(userAnswers).filter((a) => a.isCorrect).length;
            if (totalScore >= Math.ceil(exercises.length * 0.75)) {
                if (!completedTopics.includes(activeTopic.id)) {
                    setCompletedTopics((prev) => [...prev, activeTopic.id]);
                }
            }
        }
    };

    const handleRetryQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsSubmitted(false);
        setUserAnswers({});
        setQuizCompleted(false);
    };

    const correctCount = Object.values(userAnswers).filter((a) => a.isCorrect).length;
    const progressPercent = Math.round((completedTopics.length / TOTAL_GRAMMAR_TOPICS) * 100);

    // Filtered sections for sidebar search
    const filteredSections = grammarSections.map((sec) => ({
        ...sec,
        topics: sec.topics.filter(
            (t) =>
                t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.definition?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter((sec) => sec.topics.length > 0);

    return (
        <div className="container" style={{ paddingTop: "1.5rem", paddingBottom: "3rem" }}>
            {/* Mobile Topic Quick-Selector Bar (Shown on < 1024px) */}
            <div className="grammar-mobile-nav glass-panel" style={{
                display: "none",
                width: "100%",
                marginBottom: "1rem",
                padding: "0.85rem 1rem",
                borderRadius: "14px",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
                border: "1px solid rgba(139, 92, 246, 0.35)",
                background: "rgba(15, 20, 34, 0.9)"
            }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: "0.68rem", color: "#a78bfa", fontWeight: 700, textTransform: "uppercase" }}>
                        Lesson {indexInfo.positionText} • {completedTopics.length}/40 Done
                    </div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {activeTopic.title}
                    </div>
                </div>
                <button
                    onClick={() => setIsMobileDrawerOpen(prev => !prev)}
                    style={{
                        padding: "0.5rem 0.85rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(139, 92, 246, 0.45)",
                        background: "rgba(139, 92, 246, 0.22)",
                        color: "#ffffff",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        flexShrink: 0
                    }}
                >
                    {isMobileDrawerOpen ? "Close ✕" : "All 40 Topics ▾"}
                </button>
            </div>

            {/* Mobile Curriculum Drawer Modal when open */}
            {isMobileDrawerOpen && (
                <div
                    className="mobile-grammar-modal animate-fade-in"
                    onClick={() => setIsMobileDrawerOpen(false)}
                    style={{
                        position: "fixed",
                        top: "58px",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(4, 6, 12, 0.85)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        zIndex: 95,
                        display: "flex",
                        flexDirection: "column",
                        padding: "1rem",
                        overflowY: "auto"
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="glass-panel"
                        style={{
                            width: "100%",
                            maxWidth: "480px",
                            margin: "0 auto",
                            borderRadius: "18px",
                            padding: "1.25rem",
                            border: "1px solid rgba(139, 92, 246, 0.35)",
                            background: "rgba(15, 20, 34, 0.98)",
                            maxHeight: "85vh",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                            <div>
                                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase" }}>
                                    Curriculum Overview ({completedTopics.length}/{TOTAL_GRAMMAR_TOPICS})
                                </div>
                                <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "#ffffff" }}>
                                    Select a Topic
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsMobileDrawerOpen(false)}
                                style={{
                                    background: "rgba(255, 255, 255, 0.08)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    color: "var(--text-muted)",
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Search Input */}
                        <div style={{ marginBottom: "1rem" }}>
                            <input
                                type="text"
                                placeholder="Search 40 topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "0.6rem 0.85rem",
                                    background: "rgba(15, 20, 34, 0.7)",
                                    border: "1px solid rgba(255, 255, 255, 0.12)",
                                    borderRadius: "10px",
                                    color: "#ffffff",
                                    fontSize: "0.88rem",
                                    outline: "none"
                                }}
                            />
                        </div>

                        {/* Scrollable Topic List */}
                        <div style={{ flex: 1, overflowY: "auto", paddingRight: "0.25rem" }}>
                            {filteredSections.map((sec, idx) => (
                                <div key={idx} style={{ marginBottom: "1.25rem" }}>
                                    <div style={{
                                        color: "#a78bfa",
                                        fontSize: "0.72rem",
                                        fontWeight: 800,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        marginBottom: "0.4rem"
                                    }}>
                                        {sec.category}
                                    </div>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                        {sec.topics.map((topic) => {
                                            const isActive = activeTopic.id === topic.id;
                                            const isDone = completedTopics.includes(topic.id);
                                            return (
                                                <li key={topic.id}>
                                                    <button
                                                        onClick={() => handleTopicChange(topic.id)}
                                                        style={{
                                                            width: "100%",
                                                            textAlign: "left",
                                                            padding: "0.65rem 0.85rem",
                                                            background: isActive ? "rgba(139, 92, 246, 0.22)" : "rgba(255, 255, 255, 0.02)",
                                                            border: isActive ? "1px solid #8b5cf6" : "1px solid rgba(255, 255, 255, 0.06)",
                                                            color: isActive ? "#ffffff" : isDone ? "#e2e8f0" : "var(--text-muted)",
                                                            borderRadius: "9px",
                                                            cursor: "pointer",
                                                            fontSize: "0.88rem",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between"
                                                        }}
                                                    >
                                                        <span style={{ fontWeight: isActive ? 800 : 500 }}>
                                                            {topic.title}
                                                        </span>
                                                        {isDone && <span style={{ color: "#34d399", fontWeight: 700 }}>✓</span>}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <main className="grammar-layout" style={{ position: "relative" }}>
                
                {/* ===================== SIDEBAR (Desktop) ===================== */}
                <aside
                    className="grammar-sidebar glass-panel animate-fade-in"
                    style={{
                        width: "320px",
                        flexShrink: 0,
                        maxHeight: "calc(100vh - 110px)",
                        display: "flex",
                        flexDirection: "column",
                        position: "sticky",
                        top: "95px",
                        padding: "1.25rem",
                        borderRadius: "18px",
                        border: "1px solid var(--border)"
                    }}
                >
                    {/* Curriculum Header & Progress */}
                    <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.4rem" }}>
                            <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a78bfa" }}>
                                Grammar Mastery
                            </span>
                            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-subtle)" }}>
                                {completedTopics.length} / {TOTAL_GRAMMAR_TOPICS} done
                            </span>
                        </div>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 0.75rem 0", color: "#ffffff" }}>
                            Curriculum
                        </h2>

                        {/* Progress Bar */}
                        <div style={{ width: "100%", height: "8px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "999px", overflow: "hidden" }}>
                            <div
                                style={{
                                    width: `${progressPercent}%`,
                                    height: "100%",
                                    background: "linear-gradient(90deg, #8b5cf6 0%, #a855f7 50%, #10b981 100%)",
                                    borderRadius: "999px",
                                    transition: "width 0.4s ease"
                                }}
                            />
                        </div>
                    </div>

                    {/* Search Input */}
                    <div style={{ marginBottom: "1rem" }}>
                        <input
                            type="text"
                            placeholder="Search 40 topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.55rem 0.85rem",
                                background: "rgba(15, 20, 34, 0.7)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "10px",
                                color: "#ffffff",
                                fontSize: "0.88rem",
                                outline: "none",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>

                    {/* Scrollable Topic List */}
                    <div style={{ flex: 1, overflowY: "auto", paddingRight: "0.25rem" }}>
                        {filteredSections.map((sec, idx) => (
                            <div key={idx} style={{ marginBottom: "1.35rem" }}>
                                <div
                                    style={{
                                        color: "#a78bfa",
                                        fontSize: "0.72rem",
                                        fontWeight: 800,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        marginBottom: "0.5rem",
                                        paddingLeft: "0.4rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <span>{sec.category}</span>
                                    <span style={{ color: "var(--text-subtle)", fontSize: "0.68rem" }}>
                                        {sec.topics.filter((t) => completedTopics.includes(t.id)).length} / {sec.topics.length}
                                    </span>
                                </div>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                    {sec.topics.map((topic) => {
                                        const isActive = activeTopic.id === topic.id;
                                        const isDone = completedTopics.includes(topic.id);
                                        return (
                                            <li key={topic.id}>
                                                <button
                                                    onClick={() => handleTopicChange(topic.id)}
                                                    style={{
                                                        width: "100%",
                                                        textAlign: "left",
                                                        padding: "0.6rem 0.75rem",
                                                        background: isActive ? "rgba(139, 92, 246, 0.18)" : "transparent",
                                                        border: "1px solid",
                                                        borderColor: isActive ? "rgba(139, 92, 246, 0.45)" : "transparent",
                                                        color: isActive ? "#ffffff" : isDone ? "#e2e8f0" : "var(--text-muted)",
                                                        cursor: "pointer",
                                                        fontWeight: isActive ? 700 : 500,
                                                        fontSize: "0.88rem",
                                                        letterSpacing: "-0.01em",
                                                        transition: "all 0.15s ease",
                                                        borderRadius: "9px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        gap: "0.5rem",
                                                        boxShadow: isActive ? "0 4px 14px -4px rgba(139, 92, 246, 0.35)" : "none"
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (!isActive) {
                                                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                                                            e.currentTarget.style.color = "#ffffff";
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (!isActive) {
                                                            e.currentTarget.style.background = "transparent";
                                                            e.currentTarget.style.color = isDone ? "#e2e8f0" : "var(--text-muted)";
                                                        }
                                                    }}
                                                >
                                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden" }}>
                                                        <span
                                                            style={{
                                                                width: "6px",
                                                                height: "6px",
                                                                borderRadius: "50%",
                                                                background: isActive ? "#a855f7" : isDone ? "#10b981" : "rgba(255, 255, 255, 0.2)",
                                                                flexShrink: 0
                                                            }}
                                                        />
                                                        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                            {topic.title}
                                                        </span>
                                                    </div>
                                                    {isDone && (
                                                        <span style={{ color: "#34d399", fontSize: "0.78rem", fontWeight: 700 }} title="Completed">
                                                            ✓
                                                        </span>
                                                    )}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* ===================== MAIN LESSON CONTENT ===================== */}
                <section
                    id="grammar-content-container"
                    className="grammar-content glass-panel animate-slide-right"
                    style={{
                        flex: 1,
                        position: "relative",
                        borderRadius: "18px",
                        border: "1px solid var(--border)"
                    }}
                >
                    {/* Header: Section badge, lesson position, completion button */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                            <span className="badge badge-primary" style={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                                {activeTopic.sectionCategory || "English Grammar"}
                            </span>
                            <span style={{ fontSize: "0.82rem", color: "var(--text-subtle)", fontWeight: 600 }}>
                                Lesson {indexInfo.positionText}
                            </span>
                        </div>

                        {/* Mark As Completed Toggle Button */}
                        <button
                            onClick={toggleTopicCompletion}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.55rem 1.1rem",
                                borderRadius: "10px",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                border: isTopicCompleted ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid rgba(255, 255, 255, 0.15)",
                                background: isTopicCompleted ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.05)",
                                color: isTopicCompleted ? "#34d399" : "var(--text-main)",
                                transition: "all 0.2s ease"
                            }}
                        >
                            <span>{isTopicCompleted ? "✓ Completed" : "Mark as Completed"}</span>
                        </button>
                    </div>

                    {/* Topic Title & Subtitle */}
                    <h1 style={{ fontSize: "2.35rem", fontWeight: 800, margin: "0 0 0.5rem 0", letterSpacing: "-0.03em", color: "#ffffff" }}>
                        {activeTopic.title}
                    </h1>
                    {activeTopic.subtitle && (
                        <p style={{ fontSize: "1.1rem", color: "#c4b5fd", margin: "0 0 1.75rem 0", fontWeight: 500, lineHeight: 1.5 }}>
                            {activeTopic.subtitle}
                        </p>
                    )}

                    {/* Definition Callout */}
                    <div
                        style={{
                            background: "rgba(139, 92, 246, 0.07)",
                            borderLeft: "4px solid #8b5cf6",
                            padding: "1.25rem 1.5rem",
                            borderRadius: "12px",
                            marginBottom: "1.75rem"
                        }}
                    >
                        <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#a78bfa", fontWeight: 700, marginBottom: "0.35rem" }}>
                            Definition
                        </div>
                        <p style={{ fontSize: "1.15rem", color: "#ffffff", margin: 0, fontWeight: 500, lineHeight: 1.6 }}>
                            {activeTopic.definition}
                        </p>
                    </div>

                    {/* In-depth Conceptual Explanation */}
                    {activeTopic.explanation && (
                        <div style={{ marginBottom: "2rem" }}>
                            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.6rem" }}>
                                Conceptual Deep Dive
                            </h3>
                            <p style={{ fontSize: "1.02rem", color: "var(--text-main)", opacity: 0.9, lineHeight: 1.7, margin: 0 }}>
                                {activeTopic.explanation}
                            </p>
                        </div>
                    )}

                    {/* Structure / Formula Badge */}
                    {activeTopic.formula && (
                        <div
                            style={{
                                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.05) 100%)",
                                border: "1px solid rgba(139, 92, 246, 0.35)",
                                padding: "1.25rem 1.5rem",
                                borderRadius: "14px",
                                marginBottom: "2rem",
                                display: "block",
                                boxShadow: "0 4px 20px -4px rgba(139, 92, 246, 0.2)"
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "0.75rem",
                                    textTransform: "uppercase",
                                    color: "#c4b5fd",
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    display: "block",
                                    marginBottom: "0.4rem"
                                }}
                            >
                                Canonical Sentence Formula
                            </span>
                            <span
                                style={{
                                    fontFamily: "'JetBrains Mono', Consolas, monospace",
                                    fontSize: "1.05rem",
                                    fontWeight: 600,
                                    color: "#ffffff",
                                    lineHeight: 1.5,
                                    display: "block"
                                }}
                            >
                                {activeTopic.formula}
                            </span>
                        </div>
                    )}

                    {/* Sentence Structures Breakdown (Positive, Negative, Questions) */}
                    {activeTopic.sentenceStructures && activeTopic.sentenceStructures.length > 0 && (
                        <div style={{ marginBottom: "2.5rem" }}>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem" }}>
                                Sentence Structures & Conjugation Forms
                            </h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.85rem" }}>
                                {activeTopic.sentenceStructures.map((struct, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            background: "rgba(15, 20, 34, 0.65)",
                                            border: "1px solid rgba(255, 255, 255, 0.08)",
                                            borderRadius: "12px",
                                            padding: "1rem 1.25rem"
                                        }}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem", flexWrap: "wrap", gap: "0.5rem" }}>
                                            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#818cf8" }}>
                                                {struct.type}
                                            </span>
                                            <code style={{ fontSize: "0.82rem", background: "rgba(0,0,0,0.4)", padding: "0.2rem 0.5rem", borderRadius: "6px", color: "#e2e8f0" }}>
                                                {struct.structure}
                                            </code>
                                        </div>
                                        <div style={{ fontSize: "0.95rem", color: "var(--text-main)", fontStyle: "italic" }}>
                                            &ldquo;{struct.example}&rdquo;
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Signal Words / Keywords Tags */}
                    {activeTopic.signalWords && activeTopic.signalWords.length > 0 && (
                        <div style={{ marginBottom: "2.5rem" }}>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.75rem" }}>
                                Signal Words & Common Time Anchors
                            </h3>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                {activeTopic.signalWords.map((word, idx) => (
                                    <span
                                        key={idx}
                                        style={{
                                            fontSize: "0.85rem",
                                            padding: "0.3rem 0.75rem",
                                            background: "rgba(99, 102, 241, 0.12)",
                                            border: "1px solid rgba(99, 102, 241, 0.25)",
                                            borderRadius: "8px",
                                            color: "#c7d2fe",
                                            fontWeight: 600
                                        }}
                                    >
                                        {word}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tense Comparison Card (e.g. Present Simple vs Continuous) */}
                    {activeTopic.tenseComparison && (
                        <div
                            style={{
                                background: "rgba(245, 158, 11, 0.08)",
                                border: "1px solid rgba(245, 158, 11, 0.3)",
                                borderLeft: "4px solid #f59e0b",
                                borderRadius: "12px",
                                padding: "1.25rem 1.5rem",
                                marginBottom: "2.5rem"
                            }}
                        >
                            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#fbbf24", fontWeight: 700, marginBottom: "0.35rem" }}>
                                Comparative Distinction: {activeTopic.tenseComparison.title}
                            </div>
                            <p style={{ margin: 0, fontSize: "0.98rem", color: "var(--text-main)", lineHeight: 1.65, whiteSpace: "pre-line" }}>
                                {activeTopic.tenseComparison.explanation}
                            </p>
                        </div>
                    )}

                    {/* Subtypes / Classifications */}
                    {activeTopic.types && activeTopic.types.length > 0 && (
                        <div style={{ marginBottom: "2.5rem" }}>
                            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem" }}>
                                Types & Categories
                            </h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
                                {activeTopic.types.map((type, idx) => (
                                    <div
                                        key={idx}
                                        className="glass-panel"
                                        style={{
                                            padding: "1.25rem 1.5rem",
                                            borderRadius: "12px",
                                            border: "1px solid rgba(255, 255, 255, 0.08)"
                                        }}
                                    >
                                        <div style={{ fontSize: "1.02rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.4rem" }}>
                                            {type.name}
                                        </div>
                                        <p style={{ margin: "0 0 0.6rem 0", fontSize: "0.95rem", color: "var(--text-main)", opacity: 0.9, lineHeight: 1.6 }}>
                                            {type.desc}
                                        </p>
                                        {type.examples && (
                                            <div style={{ fontSize: "0.88rem", color: "#a5b4fc", fontStyle: "italic", background: "rgba(0,0,0,0.3)", padding: "0.5rem 0.85rem", borderRadius: "8px" }}>
                                                <strong style={{ color: "#ffffff", fontStyle: "normal" }}>Examples:</strong> {type.examples}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Essential Rules and Nuances */}
                    {activeTopic.rules && activeTopic.rules.length > 0 && (
                        <div style={{ marginBottom: "2.5rem" }}>
                            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem" }}>
                                Essential Grammar Rules
                            </h3>
                            <ul style={{ paddingLeft: "1.25rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {activeTopic.rules.map((rule, idx) => (
                                    <li key={idx} style={{ fontSize: "0.98rem", color: "var(--text-main)", lineHeight: 1.65 }}>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Examples in Context */}
                    {activeTopic.examples && activeTopic.examples.length > 0 && (
                        <div
                            style={{
                                background: "rgba(255, 255, 255, 0.02)",
                                padding: "1.75rem",
                                borderRadius: "16px",
                                border: "1px solid var(--border)",
                                marginBottom: "2.5rem"
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "0.85rem",
                                    color: "var(--text-subtle)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    fontWeight: 700,
                                    marginBottom: "1.25rem"
                                }}
                            >
                                Contextual Examples
                            </h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {activeTopic.examples.map((ex, idx) => {
                                    if (typeof ex === "string") {
                                        return (
                                            <div key={idx} style={{ fontSize: "1rem", lineHeight: 1.6, color: "#ffffff" }}>
                                                • {ex}
                                            </div>
                                        );
                                    }
                                    return (
                                        <div
                                            key={idx}
                                            style={{
                                                background: "rgba(15, 20, 34, 0.6)",
                                                border: "1px solid rgba(255, 255, 255, 0.06)",
                                                borderRadius: "10px",
                                                padding: "1rem 1.25rem"
                                            }}
                                        >
                                            <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "#ffffff", marginBottom: "0.4rem" }}>
                                                &ldquo;{ex.text}&rdquo;
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                                                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                                                    {ex.breakdown}
                                                </span>
                                                {ex.highlight && (
                                                    <span style={{ fontSize: "0.75rem", background: "rgba(139, 92, 246, 0.2)", color: "#c4b5fd", padding: "0.2rem 0.55rem", borderRadius: "6px", fontWeight: 600 }}>
                                                        {ex.highlight}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Common Mistakes Visual Widget */}
                    {activeTopic.commonMistakes && activeTopic.commonMistakes.length > 0 && (
                        <div style={{ marginBottom: "2.5rem" }}>
                            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.25rem", color: "#ffffff" }}>
                                ⚠️ Common Mistakes to Avoid
                            </h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {activeTopic.commonMistakes.map((mistake, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            background: "rgba(15, 20, 34, 0.7)",
                                            padding: "1.35rem",
                                            borderRadius: "14px",
                                            border: "1px solid var(--border)",
                                            boxShadow: "0 8px 24px -8px rgba(0, 0, 0, 0.4)"
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#f87171", fontSize: "1rem", marginBottom: "0.6rem" }}>
                                            <span style={{ fontWeight: 800 }}>✕ Incorrect:</span>
                                            <span style={{ textDecoration: "line-through", opacity: 0.9 }}>{mistake.wrong}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#34d399", fontSize: "1rem", marginBottom: "0.75rem" }}>
                                            <span style={{ fontWeight: 800 }}>✓ Correct:</span>
                                            <span style={{ fontWeight: 600 }}>{mistake.right}</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)", borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "0.6rem" }}>
                                            <strong style={{ color: "#ffffff" }}>Grammar rule:</strong> {mistake.why}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Special Cases */}
                    {activeTopic.specialCases && activeTopic.specialCases.length > 0 && (
                        <div style={{ marginBottom: "2.5rem" }}>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem" }}>
                                Special Cases & Nuances
                            </h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.85rem" }}>
                                {activeTopic.specialCases.map((sc, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            background: "rgba(139, 92, 246, 0.05)",
                                            border: "1px solid rgba(139, 92, 246, 0.2)",
                                            borderRadius: "12px",
                                            padding: "1.15rem 1.35rem"
                                        }}
                                    >
                                        <h4 style={{ margin: "0 0 0.4rem 0", fontSize: "0.98rem", color: "#c4b5fd", fontWeight: 700 }}>
                                            {sc.title}
                                        </h4>
                                        <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.92rem", color: "var(--text-main)", opacity: 0.9 }}>
                                            {sc.desc}
                                        </p>
                                        {sc.example && (
                                            <div style={{ fontSize: "0.85rem", color: "#a5b4fc", fontStyle: "italic" }}>
                                                &ldquo;{sc.example}&rdquo;
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ===================== INTERACTIVE PRACTICE EXERCISES ENGINE ===================== */}
                    {exercises.length > 0 && (
                        <div style={{ marginBottom: "2.5rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "#ffffff" }}>
                                    Interactive Practice Exercises
                                </h3>
                                <span style={{ fontSize: "0.85rem", color: "var(--text-subtle)", fontWeight: 600 }}>
                                    Question {currentQuestionIndex + 1} of {exercises.length}
                                </span>
                            </div>

                            <div
                                className="glass-panel"
                                style={{
                                    padding: "2rem",
                                    border: "1px solid rgba(139, 92, 246, 0.35)",
                                    boxShadow: "0 8px 30px -8px rgba(139, 92, 246, 0.25)",
                                    borderRadius: "16px"
                                }}
                            >
                                {!quizCompleted ? (
                                    <div>
                                        {/* Question Text */}
                                        <p style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "1.5rem", color: "#ffffff", lineHeight: 1.5 }}>
                                            {currentQuestion?.question}
                                        </p>

                                        {/* Options Grid */}
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.85rem", marginBottom: "1.5rem" }}>
                                            {currentQuestion?.options.map((opt, i) => {
                                                const isSelected = selectedOption === opt;
                                                const isCorrectAnswer = opt === currentQuestion.answer;

                                                let btnBg = "rgba(15, 20, 34, 0.7)";
                                                let btnBorder = "rgba(255, 255, 255, 0.1)";
                                                let btnColor = "#ffffff";

                                                if (isSubmitted) {
                                                    if (isCorrectAnswer) {
                                                        btnBg = "rgba(16, 185, 129, 0.2)";
                                                        btnBorder = "var(--success)";
                                                        btnColor = "#34d399";
                                                    } else if (isSelected && !isCorrectAnswer) {
                                                        btnBg = "rgba(239, 68, 68, 0.2)";
                                                        btnBorder = "var(--error)";
                                                        btnColor = "#f87171";
                                                    }
                                                } else if (isSelected) {
                                                    btnBg = "rgba(139, 92, 246, 0.25)";
                                                    btnBorder = "#8b5cf6";
                                                }

                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleSelectOption(opt)}
                                                        disabled={isSubmitted}
                                                        style={{
                                                            padding: "0.95rem 1.25rem",
                                                            background: btnBg,
                                                            border: `1px solid ${btnBorder}`,
                                                            borderRadius: "12px",
                                                            color: btnColor,
                                                            cursor: isSubmitted ? "default" : "pointer",
                                                            transition: "all 0.15s ease",
                                                            fontSize: "0.98rem",
                                                            fontWeight: 600,
                                                            textAlign: "left"
                                                        }}
                                                    >
                                                        {opt}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Submit or Next Question Action */}
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                                            {!isSubmitted ? (
                                                <button
                                                    className="btn btn-primary"
                                                    disabled={!selectedOption}
                                                    onClick={handleSubmitAnswer}
                                                    style={{
                                                        padding: "0.75rem 1.75rem",
                                                        borderRadius: "10px",
                                                        fontSize: "0.95rem",
                                                        fontWeight: 700,
                                                        opacity: selectedOption ? 1 : 0.5,
                                                        cursor: selectedOption ? "pointer" : "not-allowed"
                                                    }}
                                                >
                                                    Submit Answer
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={handleNextQuestion}
                                                    style={{
                                                        padding: "0.75rem 1.75rem",
                                                        borderRadius: "10px",
                                                        fontSize: "0.95rem",
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    {currentQuestionIndex < exercises.length - 1 ? "Next Question →" : "View Results →"}
                                                </button>
                                            )}
                                        </div>

                                        {/* Feedback Explanation Callout */}
                                        {isSubmitted && (
                                            <div
                                                style={{
                                                    marginTop: "1.5rem",
                                                    padding: "1.25rem 1.5rem",
                                                    background:
                                                        selectedOption === currentQuestion.answer
                                                            ? "rgba(16, 185, 129, 0.12)"
                                                            : "rgba(239, 68, 68, 0.12)",
                                                    border: `1px solid ${selectedOption === currentQuestion.answer ? "var(--success)" : "var(--error)"}`,
                                                    borderRadius: "12px"
                                                }}
                                            >
                                                <div style={{ fontWeight: 800, color: selectedOption === currentQuestion.answer ? "#34d399" : "#f87171", marginBottom: "0.35rem" }}>
                                                    {selectedOption === currentQuestion.answer ? "🎉 Correct!" : "⚠️ Not quite right."}
                                                </div>
                                                <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-main)", lineHeight: 1.5 }}>
                                                    {currentQuestion.explanation}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* Quiz Results Summary */
                                    <div style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
                                        <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                                            {correctCount >= Math.ceil(exercises.length * 0.75) ? "🏆" : "📚"}
                                        </div>
                                        <h4 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 0.5rem 0", color: "#ffffff" }}>
                                            Practice Complete!
                                        </h4>
                                        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", margin: "0 0 1.5rem 0" }}>
                                            You scored <strong style={{ color: "#34d399" }}>{correctCount}</strong> out of{" "}
                                            <strong>{exercises.length}</strong> ({Math.round((correctCount / exercises.length) * 100)}%).
                                        </p>
                                        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                                            <button
                                                className="btn btn-secondary"
                                                onClick={handleRetryQuiz}
                                                style={{ padding: "0.7rem 1.5rem", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700 }}
                                            >
                                                ↻ Retry Practice
                                            </button>
                                            {nextTopic && (
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleTopicChange(nextTopic.id)}
                                                    style={{ padding: "0.7rem 1.5rem", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700 }}
                                                >
                                                    Next Lesson ({nextTopic.title}) →
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Quick Revision Summary */}
                    {activeTopic.quickRevision && activeTopic.quickRevision.length > 0 && (
                        <div
                            style={{
                                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%)",
                                border: "1px solid rgba(16, 185, 129, 0.25)",
                                borderLeft: "4px solid var(--success)",
                                padding: "1.35rem 1.5rem",
                                borderRadius: "14px",
                                marginBottom: "2.5rem"
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#34d399", fontWeight: 800, marginBottom: "0.6rem", fontSize: "0.92rem" }}>
                                <span>⚡</span> <span style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}>Quick Revision Summary</span>
                            </div>
                            <ul style={{ paddingLeft: "1.25rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                {activeTopic.quickRevision.map((point, idx) => (
                                    <li key={idx} style={{ fontSize: "0.95rem", color: "var(--text-main)", lineHeight: 1.5 }}>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Bottom Navigation: Previous / Next Lesson */}
                    <div
                        style={{
                            marginTop: "2.5rem",
                            paddingTop: "2rem",
                            borderTop: "1px solid var(--border)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "1rem"
                        }}
                    >
                        <div>
                            {prevTopic ? (
                                <button
                                    onClick={() => handleTopicChange(prevTopic.id)}
                                    style={{
                                        background: "rgba(255, 255, 255, 0.05)",
                                        border: "1px solid rgba(255, 255, 255, 0.12)",
                                        borderRadius: "10px",
                                        padding: "0.65rem 1.25rem",
                                        color: "#ffffff",
                                        cursor: "pointer",
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.5rem"
                                    }}
                                >
                                    ← {prevTopic.title}
                                </button>
                            ) : (
                                <div />
                            )}
                        </div>

                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            {nextTopic && (
                                <button
                                    onClick={() => handleTopicChange(nextTopic.id)}
                                    style={{
                                        background: "rgba(139, 92, 246, 0.18)",
                                        border: "1px solid rgba(139, 92, 246, 0.45)",
                                        borderRadius: "10px",
                                        padding: "0.65rem 1.35rem",
                                        color: "#ffffff",
                                        cursor: "pointer",
                                        fontSize: "0.9rem",
                                        fontWeight: 700,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.5rem"
                                    }}
                                >
                                    {nextTopic.title} →
                                </button>
                            )}

                            <button
                                className="btn btn-primary"
                                style={{ fontSize: "0.92rem", padding: "0.65rem 1.4rem", borderRadius: "10px" }}
                                onClick={() => navigate("/test")}
                            >
                                Launch AI Practice Exam →
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Grammar;
