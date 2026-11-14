import { useState, useMemo } from "react";
import { getPhraseCategories } from "../data/phrasesData";

const Phrases = () => {
    const categories = useMemo(() => getPhraseCategories(), []);
    const allItems = useMemo(() => categories.flatMap(cat => cat.items), [categories]);

    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [activePhrase, setActivePhrase] = useState(() => allItems[0]);
    const [practiceAnswer, setPracticeAnswer] = useState(null);
    const [isMobilePhrasesOpen, setIsMobilePhrasesOpen] = useState(false);

    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const matchesCat = activeCategory === "all" || item.level.toLowerCase() === activeCategory.toLowerCase();
            const matchesSearch = !searchQuery ||
                item.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.meaning.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [allItems, activeCategory, searchQuery]);

    const currentIndex = filteredItems.findIndex(i => i.id === activePhrase?.id);

    const handleSelect = (phrase) => {
        setActivePhrase(phrase);
        setPracticeAnswer(null);
        setIsMobilePhrasesOpen(false);
    };

    const handleNext = () => {
        if (currentIndex < filteredItems.length - 1) {
            handleSelect(filteredItems[currentIndex + 1]);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            handleSelect(filteredItems[currentIndex - 1]);
        }
    };

    const playAudio = (text) => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    const getFormalityStyle = (formality) => {
        if (formality === "Formal") return { bg: "rgba(99, 102, 241, 0.12)", color: "#818cf8", border: "rgba(99, 102, 241, 0.3)" };
        if (formality === "Casual") return { bg: "rgba(245, 158, 11, 0.12)", color: "#fbbf24", border: "rgba(245, 158, 11, 0.3)" };
        return { bg: "rgba(16, 185, 129, 0.12)", color: "#34d399", border: "rgba(16, 185, 129, 0.3)" };
    };

    const formStyle = getFormalityStyle(activePhrase?.formality);

    return (
        <div className="app-container" style={{ paddingBottom: "3rem" }}>
            {/* Mobile Phrase Quick-Selector Bar (Shown on < 1024px) */}
            <div className="phrases-mobile-nav glass-panel" style={{
                display: "none",
                width: "calc(100% - 2rem)",
                margin: "1rem auto 0.5rem",
                padding: "0.85rem 1rem",
                borderRadius: "14px",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
                border: "1px solid rgba(16, 185, 129, 0.35)",
                background: "rgba(15, 20, 34, 0.9)"
            }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: "0.68rem", color: "#34d399", fontWeight: 700, textTransform: "uppercase" }}>
                        Phrase {currentIndex + 1} of {filteredItems.length}
                    </div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {activePhrase?.phrase}
                    </div>
                </div>
                <button
                    onClick={() => setIsMobilePhrasesOpen(prev => !prev)}
                    style={{
                        padding: "0.5rem 0.85rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(16, 185, 129, 0.45)",
                        background: "rgba(16, 185, 129, 0.2)",
                        color: "#34d399",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        flexShrink: 0
                    }}
                >
                    {isMobilePhrasesOpen ? "Close ✕" : `All ${filteredItems.length} Phrases ▾`}
                </button>
            </div>

            {/* Mobile Phrases Modal Drawer */}
            {isMobilePhrasesOpen && (
                <div
                    className="mobile-phrases-modal animate-fade-in"
                    onClick={() => setIsMobilePhrasesOpen(false)}
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
                            border: "1px solid rgba(16, 185, 129, 0.35)",
                            background: "rgba(15, 20, 34, 0.98)",
                            maxHeight: "85vh",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                            <div>
                                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#34d399", textTransform: "uppercase" }}>
                                    Conversational Vault ({filteredItems.length} items)
                                </div>
                                <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "#ffffff" }}>
                                    Select a Phrase
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsMobilePhrasesOpen(false)}
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
                        <div style={{ marginBottom: "0.75rem" }}>
                            <input
                                type="text"
                                placeholder="Search phrases..."
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

                        {/* Scrollable list */}
                        <div style={{ flex: 1, overflowY: "auto", paddingRight: "0.25rem" }}>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                                {filteredItems.map(item => {
                                    const isActive = activePhrase?.id === item.id;
                                    return (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => handleSelect(item)}
                                                style={{
                                                    width: "100%",
                                                    textAlign: "left",
                                                    padding: "0.75rem 0.85rem",
                                                    background: isActive ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.02)",
                                                    border: isActive ? "1px solid #10b981" : "1px solid rgba(255, 255, 255, 0.06)",
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                    color: isActive ? "#ffffff" : "var(--text-main)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between"
                                                }}
                                            >
                                                <div>
                                                    <div style={{ fontWeight: isActive ? 800 : 600, fontSize: "0.92rem" }}>
                                                        {item.phrase}
                                                    </div>
                                                    <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)", marginTop: "2px" }}>
                                                        {item.meaning}
                                                    </div>
                                                </div>
                                                <span style={{ fontSize: "0.7rem", color: "#34d399", fontWeight: 700 }}>
                                                    {item.level}
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <main className="phrases-layout main-content flex gap-6 animate-fade-in" style={{ padding: "0 1.5rem", marginTop: "1.5rem", maxWidth: "1400px" }}>

                {/* Phrases Sidebar */}
                <aside className="phrases-sidebar glass-panel stagger-1" style={{
                    width: "340px",
                    flexShrink: 0,
                    padding: "1.5rem 1rem",
                    height: "calc(100vh - 120px)",
                    position: "sticky",
                    top: "95px",
                    overflowY: "auto",
                    borderRadius: "18px"
                }}>
                    <div style={{ padding: "0 0.5rem 1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", marginBottom: "1rem" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#34d399", marginBottom: "0.25rem" }}>
                            Conversational Vault
                        </div>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>Daily Phrases</h2>
                    </div>

                    {/* Filter categories */}
                    <div style={{ display: "flex", gap: "0.35rem", padding: "0 0.25rem 1rem", overflowX: "auto" }}>
                        {["all", "beginner", "intermediate", "advanced"].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: "0.3rem 0.7rem",
                                    borderRadius: "8px",
                                    border: "1px solid",
                                    borderColor: activeCategory === cat ? "rgba(99, 102, 241, 0.4)" : "rgba(255, 255, 255, 0.07)",
                                    background: activeCategory === cat ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.02)",
                                    color: activeCategory === cat ? "#ffffff" : "var(--text-muted)",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    textTransform: "capitalize",
                                    cursor: "pointer",
                                    transition: "all 0.2s"
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search input */}
                    <div style={{ padding: "0 0.25rem 1rem" }}>
                        <input
                            type="text"
                            placeholder="Search phrases..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.6rem 0.85rem",
                                borderRadius: "10px",
                                background: "rgba(15, 20, 34, 0.8)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                color: "#ffffff",
                                fontSize: "0.85rem",
                                outline: "none"
                            }}
                        />
                    </div>

                    {/* Phrase list */}
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                        {filteredItems.map(item => {
                            const isActive = activePhrase?.id === item.id;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleSelect(item)}
                                        style={{
                                            width: "100%",
                                            textAlign: "left",
                                            padding: "0.75rem 0.85rem",
                                            background: isActive ? "rgba(16, 185, 129, 0.15)" : "transparent",
                                            border: "1px solid",
                                            borderColor: isActive ? "rgba(16, 185, 129, 0.35)" : "transparent",
                                            borderRadius: "10px",
                                            color: isActive ? "#ffffff" : "var(--text-main)",
                                            cursor: "pointer",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "0.2rem",
                                            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                            boxShadow: isActive ? "0 4px 14px -4px rgba(16, 185, 129, 0.25)" : "none"
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.background = "transparent";
                                            }
                                        }}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                            <span style={{ fontWeight: isActive ? 700 : 600, fontSize: "0.92rem", color: isActive ? "#34d399" : "#ffffff" }}>
                                                {item.phrase}
                                            </span>
                                            <span style={{ fontSize: "0.68rem", color: "var(--text-subtle)", textTransform: "uppercase" }}>
                                                {item.level}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>
                                            {item.meaning}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                {/* Phrase Details Area */}
                {activePhrase && (
                    <section className="phrases-content glass-panel stagger-2 animate-slide-right" style={{
                        flex: 1,
                        position: "relative",
                        borderRadius: "18px"
                    }}>
                        {/* Header bar */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                <span className="badge badge-success">{activePhrase.level}</span>
                                <span style={{
                                    display: "inline-flex",
                                    padding: "0.25rem 0.75rem",
                                    borderRadius: "999px",
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                    background: formStyle.bg,
                                    color: formStyle.color,
                                    border: `1px solid ${formStyle.border}`
                                }}>
                                    {activePhrase.formality}
                                </span>
                            </div>

                            {/* Counter & Nav Buttons */}
                            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                                <span style={{ fontSize: "0.85rem", color: "var(--text-subtle)", fontFamily: "'JetBrains Mono', monospace" }}>
                                    {currentIndex + 1} / {filteredItems.length}
                                </span>
                                <button className="btn btn-secondary" onClick={handlePrev} disabled={currentIndex <= 0} style={{ padding: "0.45rem 0.9rem", fontSize: "0.85rem" }}>
                                    ← Prev
                                </button>
                                <button className="btn btn-secondary" onClick={handleNext} disabled={currentIndex >= filteredItems.length - 1} style={{ padding: "0.45rem 0.9rem", fontSize: "0.85rem" }}>
                                    Next →
                                </button>
                            </div>
                        </div>

                        {/* Large Phrase Title */}
                        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                            <h1 style={{ fontSize: "2.7rem", fontWeight: 800, margin: 0, letterSpacing: "-0.035em" }} className="text-gradient">
                                "{activePhrase.phrase}"
                            </h1>
                            <button
                                onClick={() => playAudio(activePhrase.phrase)}
                                className="btn btn-secondary"
                                style={{
                                    padding: "0.4rem 0.8rem",
                                    fontSize: "0.85rem",
                                    borderRadius: "8px",
                                    background: "rgba(99, 102, 241, 0.12)",
                                    borderColor: "rgba(99, 102, 241, 0.3)",
                                    color: "#a5b4fc"
                                }}
                            >
                                🔊 Listen
                            </button>
                        </div>

                        {/* Meaning callout */}
                        <div style={{
                            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderLeft: "4px solid var(--success)",
                            padding: "1.25rem 1.5rem",
                            borderRadius: "14px",
                            marginBottom: "2rem"
                        }}>
                            <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#34d399", marginBottom: "0.35rem" }}>
                                Core Meaning
                            </div>
                            <p style={{ margin: 0, fontSize: "1.2rem", fontWeight: 500, color: "#ffffff", lineHeight: 1.6 }}>
                                {activePhrase.meaning}
                            </p>
                        </div>

                        {/* Example in Context */}
                        <div style={{
                            background: "rgba(15, 20, 34, 0.7)",
                            padding: "1.5rem",
                            borderRadius: "14px",
                            border: "1px solid var(--border)",
                            marginBottom: "2rem"
                        }}>
                            <h3 style={{ fontSize: "0.82rem", color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "0.85rem" }}>
                                Example in Real Context
                            </h3>
                            <div style={{ fontSize: "1.15rem", lineHeight: 1.6, color: "#ffffff", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <span style={{ fontSize: "1.35rem" }}>💬</span>
                                <span>"{activePhrase.example}"</span>
                            </div>
                        </div>

                        {/* Literal Origin & Context Grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                            {activePhrase.literal && (
                                <div style={{
                                    background: "rgba(99, 102, 241, 0.05)",
                                    border: "1px solid rgba(99, 102, 241, 0.22)",
                                    borderRadius: "14px", padding: "1.25rem"
                                }}>
                                    <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a5b4fc", marginBottom: "0.4rem" }}>
                                        Literal Meaning
                                    </div>
                                    <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-main)", lineHeight: 1.6 }}>
                                        {activePhrase.literal}
                                    </p>
                                </div>
                            )}

                            {activePhrase.origin && (
                                <div style={{
                                    background: "rgba(139, 92, 246, 0.05)",
                                    border: "1px solid rgba(139, 92, 246, 0.22)",
                                    borderRadius: "14px", padding: "1.25rem"
                                }}>
                                    <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#c4b5fd", marginBottom: "0.4rem" }}>
                                        Cultural Origin
                                    </div>
                                    <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-main)", lineHeight: 1.6 }}>
                                        {activePhrase.origin}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Interactive Practice Question */}
                        {activePhrase.practice && (
                            <div style={{
                                background: "rgba(15, 20, 34, 0.8)",
                                border: "1px solid rgba(99, 102, 241, 0.3)",
                                borderRadius: "16px",
                                padding: "1.75rem",
                                marginBottom: "2rem",
                                boxShadow: "0 8px 30px -8px rgba(99, 102, 241, 0.2)"
                            }}>
                                <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#818cf8", marginBottom: "0.5rem" }}>
                                    Practice Challenge
                                </div>
                                <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#ffffff", marginBottom: "1.25rem" }}>
                                    {activePhrase.practice.text}
                                </h4>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                                    {activePhrase.practice.options.map((opt, i) => {
                                        const isSelected = practiceAnswer === opt;
                                        const isCorrect = opt === activePhrase.practice.answer;
                                        let optBg = "rgba(255, 255, 255, 0.03)";
                                        let optBorder = "rgba(255, 255, 255, 0.08)";
                                        let optColor = "#ffffff";

                                        if (practiceAnswer) {
                                            if (isCorrect) {
                                                optBg = "rgba(16, 185, 129, 0.15)";
                                                optBorder = "var(--success)";
                                                optColor = "#34d399";
                                            } else if (isSelected) {
                                                optBg = "rgba(239, 68, 68, 0.15)";
                                                optBorder = "var(--error)";
                                                optColor = "#f87171";
                                            }
                                        }

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => setPracticeAnswer(opt)}
                                                disabled={Boolean(practiceAnswer)}
                                                style={{
                                                    padding: "0.85rem 1.15rem",
                                                    borderRadius: "10px",
                                                    background: optBg,
                                                    border: `1px solid ${optBorder}`,
                                                    color: optColor,
                                                    textAlign: "left",
                                                    fontSize: "0.95rem",
                                                    fontWeight: 500,
                                                    cursor: practiceAnswer ? "default" : "pointer",
                                                    transition: "all 0.2s"
                                                }}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>

                                {practiceAnswer && (
                                    <div style={{
                                        marginTop: "1.25rem",
                                        padding: "1rem 1.25rem",
                                        borderRadius: "10px",
                                        background: practiceAnswer === activePhrase.practice.answer ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                                        border: `1px solid ${practiceAnswer === activePhrase.practice.answer ? "var(--success)" : "var(--error)"}`
                                    }}>
                                        <p style={{ margin: 0, fontWeight: 700, color: practiceAnswer === activePhrase.practice.answer ? "#34d399" : "#f87171" }}>
                                            {practiceAnswer === activePhrase.practice.answer
                                                ? "🎉 Correct! That's the ideal conversational context."
                                                : `Incorrect. The intended context is "${activePhrase.practice.answer}".`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
};

export default Phrases;
