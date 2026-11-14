import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const modules = [
        { 
            id: 1, 
            title: "Grammar Rules", 
            desc: "Master 40 comprehensive grammar topics with interactive practice questions and instant feedback.",
            icon: "📘", 
            path: "/grammar",
            color: "var(--primary)"
        },
        { 
            id: 2, 
            title: "Daily Phrases", 
            desc: "Learn native-like idioms, slangs, and conversational expressions with pronunciation audio.",
            icon: "💬", 
            path: "/phrases",
            color: "var(--success)"
        },
        { 
            id: 3, 
            title: "Speaking Studio", 
            desc: "1-minute timed speaking test evaluated by Google Gemini AI with multi-dimensional fluency metrics.",
            icon: "🗣️", 
            path: "/speaking",
            color: "var(--accent)"
        },
        { 
            id: 4, 
            title: "Story Listening", 
            desc: "Ear-training practice: listen to original AI-generated stories and solve 5 comprehension questions.",
            icon: "🎧", 
            path: "/scenarios",
            color: "var(--secondary)"
        },
        { 
            id: 5, 
            title: "Read Aloud Studio", 
            desc: "Read AI passages aloud with microphone speech recognition, word-level alignment, and pronunciation tips.",
            icon: "📖", 
            path: "/reading",
            color: "var(--warning)"
        },
        { 
            id: 6, 
            title: "AI Practice Tests", 
            desc: "Take infinite AI-generated dynamic MCQ tests to prove and challenge your overall syntax knowledge.",
            icon: "📝", 
            path: "/test",
            color: "var(--primary)"
        },
        { 
            id: 7, 
            title: "Track Progress", 
            desc: "Monitor your overall learning growth with test scores, speaking accuracy, and historical statistics.",
            icon: "📈", 
            path: "/progress",
            color: "var(--secondary)"
        }
    ];

    return (
        <div className="app-container">
            <main className="main-content animate-fade-in">
                
                {/* Hero Section */}
                <div style={{ textAlign: "center", padding: "3.5rem 1rem 2.5rem", marginBottom: "2.5rem" }}>
                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.4rem 1rem",
                        borderRadius: "999px",
                        background: "rgba(99, 102, 241, 0.12)",
                        border: "1px solid rgba(99, 102, 241, 0.28)",
                        marginBottom: "1.5rem",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "#c7d2fe",
                        boxShadow: "0 2px 12px rgba(99, 102, 241, 0.15)"
                    }}>
                        <span style={{
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            background: "#10b981",
                            boxShadow: "0 0 8px #10b981"
                        }} />
                        Next-Gen Adaptive Learning • Powered by Gemini 3.5
                    </div>

                    <h1 style={{
                        fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.035em",
                        marginBottom: "1.25rem",
                        lineHeight: 1.15
                    }}>
                        Level up your English with <span className="text-gradient">AI Coaching</span>.
                    </h1>
                    <p style={{
                        fontSize: "1.12rem",
                        maxWidth: "640px",
                        margin: "0 auto 2.25rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.65
                    }}>
                        An all-in-one mastery platform to practice grammar, expand real-world vocabulary, and get instant feedback powered by artificial intelligence.
                    </p>
                    
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                        <button 
                            className="btn btn-primary" 
                            style={{ padding: "0.9rem 2.2rem", fontSize: "1.05rem", borderRadius: "12px" }}
                            onClick={() => navigate("/test")}
                        >
                            Start an AI Test 🚀
                        </button>
                        <button 
                            className="btn btn-secondary" 
                            style={{ padding: "0.9rem 1.8rem", fontSize: "1.05rem", borderRadius: "12px" }}
                            onClick={() => navigate("/grammar")}
                        >
                            Explore Grammar Rules 📘
                        </button>
                    </div>
                </div>

                {/* Grid Modules */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.25rem", padding: "0 0.25rem" }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700 }}>Learning Modules</h3>
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-subtle)" }}>7 comprehensive skill tracks from grammar to real-life dialogue</p>
                    </div>
                </div>

                <div className="grid-cards stagger-4 animate-fade-in">
                    {modules.map((mod) => (
                        <div 
                            key={mod.id} 
                            className="glass-panel"
                            onClick={() => navigate(mod.path)}
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            <div style={{ 
                                display: "flex", 
                                alignItems: "center", 
                                gap: "1rem", 
                                marginBottom: "1rem" 
                            }}>
                                <div style={{ 
                                    width: "48px", 
                                    height: "48px", 
                                    borderRadius: "14px", 
                                    background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)`, 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center",
                                    fontSize: "1.45rem",
                                    border: `1px solid ${mod.color}35`,
                                    boxShadow: `0 4px 16px -4px ${mod.color}25`
                                }}>
                                    {mod.icon}
                                </div>
                                <h3 style={{ margin: 0, fontSize: "1.18rem", fontWeight: 700, color: "white" }}>{mod.title}</h3>
                            </div>
                            <p style={{ flex: 1, margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-muted)" }}>
                                {mod.desc}
                            </p>
                            
                            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
                                <span style={{
                                    color: mod.color,
                                    fontWeight: "600",
                                    fontSize: "0.88rem",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.3rem"
                                }}>
                                    Explore track →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;