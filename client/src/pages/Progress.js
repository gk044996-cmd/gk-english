import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Progress = () => {
    const navigate = useNavigate();
    
    const [stats, setStats] = useState({ correct: 0, wrong: 0, totalAnswered: 0 });
    const [spk, setSpk] = useState(0);
    const [lst, setLst] = useState(0);
    const [scn, setScn] = useState(0);

    useEffect(() => {
        const savedStats = localStorage.getItem("englishCoachStats");
        if (savedStats) setStats(JSON.parse(savedStats));

        setSpk(parseInt(localStorage.getItem("coach_speaking") || "0"));
        setLst(parseInt(localStorage.getItem("coach_listening") || "0"));
        setScn(parseInt(localStorage.getItem("coach_scenarios") || "0"));
    }, []);

    const accuracy = stats.totalAnswered > 0 
        ? Math.round((stats.correct / stats.totalAnswered) * 100) 
        : 0;

    const sections = [
        { title: "AI Practice Tests", val: stats.totalAnswered, max: 5000, color: "var(--primary)", path: "/test" },
        { title: "Speaking Challenges", val: spk, max: 5000, color: "var(--accent)", path: "/speaking" },
        { title: "Listening Cases", val: lst, max: 5000, color: "var(--warning)", path: "/reading" },
        { title: "Real-Life Scenarios", val: scn, max: 5000, color: "var(--success)", path: "/scenarios" }
    ];

    const currentStreak = (stats.totalAnswered > 0 || spk > 0 || lst > 0 || scn > 0) ? 1 : 0; 
    
    const uiStats = [
        { label: "Overall Activity", value: stats.totalAnswered + spk + lst + scn, color: "var(--primary)", trend: "Modules interactively completed" },
        { label: "AI Test Accuracy", value: `${accuracy}%`, color: "var(--accent)", trend: `${stats.correct} correct out of ${stats.totalAnswered}` },
        { label: "Active Day Streak", value: `${currentStreak} Days`, color: "var(--warning)", trend: "Keep practicing daily!" }
    ];

    return (
        <div className="app-container">
            <main className="main-content animate-fade-in" style={{ maxWidth: "1240px" }}>
                <div style={{ marginBottom: "2.5rem" }}>
                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#818cf8",
                        marginBottom: "0.35rem"
                    }}>
                        <span>✦</span> Analytics & Telemetry
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: "2.8rem", margin: 0, fontWeight: 800 }}>
                        Progress & Mastery Map
                    </h1>
                    <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
                        Continuous metric tracking across AI exam tests, speech lab sessions, and listening cases.
                    </p>
                </div>

                {/* Top Statistics Grid */}
                <div className="grid-cards stagger-1 mb-8" style={{ gap: "1.25rem" }}>
                    {uiStats.map((stat, idx) => (
                        <div key={idx} className="glass-panel" style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            borderRadius: "16px",
                            padding: "1.75rem",
                            position: "relative",
                            overflow: "hidden"
                        }}>
                            <div style={{
                                width: "40px",
                                height: "3px",
                                background: stat.color,
                                borderRadius: "2px",
                                marginBottom: "1rem",
                                boxShadow: `0 0 10px ${stat.color}`
                            }} />
                            <p style={{
                                color: "var(--text-subtle)",
                                margin: 0,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                fontSize: "0.75rem"
                            }}>
                                {stat.label}
                            </p>
                            <h2 style={{
                                fontSize: "2.8rem",
                                fontWeight: 800,
                                color: stat.color,
                                margin: "0.75rem 0",
                                fontVariantNumeric: "tabular-nums",
                                letterSpacing: "-0.03em"
                            }}>
                                {stat.value}
                            </h2>
                            <p style={{ fontSize: "0.88rem", margin: 0, color: "var(--text-muted)", opacity: 0.9 }}>
                                📈 {stat.trend}
                            </p>
                        </div>
                    ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "2rem" }}>
                    
                    {/* Perfect Page Trackers */}
                    <div className="glass-panel stagger-2" style={{ borderRadius: "18px", padding: "2rem" }}>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#818cf8", marginBottom: "0.25rem" }}>
                                Curriculum Velocity
                            </div>
                            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0 }}>Module Completion Tracker</h3>
                        </div>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            {sections.map((sec, idx) => {
                                const percentage = Math.min(100, Math.round((sec.val / sec.max) * 100));
                                return (
                                    <div key={idx} style={{
                                        background: "rgba(15, 20, 34, 0.7)",
                                        padding: "1.35rem 1.5rem",
                                        borderRadius: "14px",
                                        border: "1px solid var(--border)"
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                                            <strong style={{ fontSize: "1.05rem", color: "#ffffff", fontWeight: 700 }}>{sec.title}</strong>
                                            <span style={{ color: sec.color, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem" }}>
                                                {sec.val} / {sec.max}
                                            </span>
                                        </div>
                                        {/* Progress Bar Container */}
                                        <div style={{
                                            width: "100%",
                                            height: "8px",
                                            background: "rgba(255, 255, 255, 0.08)",
                                            borderRadius: "999px",
                                            overflow: "hidden",
                                            marginBottom: "1rem"
                                        }}>
                                            <div style={{
                                                width: `${percentage}%`,
                                                height: "100%",
                                                background: sec.color,
                                                borderRadius: "999px",
                                                boxShadow: `0 0 12px ${sec.color}`,
                                                transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)"
                                            }} />
                                        </div>
                                        <button className="btn btn-secondary" onClick={() => navigate(sec.path)} style={{ width: "100%", fontSize: "0.85rem", padding: "0.55rem" }}>
                                            Continue Learning →
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Master Badges */}
                    <div className="glass-panel stagger-3" style={{ borderRadius: "18px", padding: "2rem" }}>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#f43f5e", marginBottom: "0.25rem" }}>
                                Milestones
                            </div>
                            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0 }}>Mastery Badges</h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            
                            {(stats.totalAnswered > 0 || spk > 0) ? (
                                <div style={{
                                    display: "flex",
                                    gap: "1.25rem",
                                    alignItems: "center",
                                    padding: "1.25rem 1.5rem",
                                    background: "rgba(244, 63, 94, 0.06)",
                                    borderRadius: "14px",
                                    border: "1px solid rgba(244, 63, 94, 0.25)"
                                }}>
                                    <div style={{
                                        fontSize: "2rem",
                                        width: "52px",
                                        height: "52px",
                                        borderRadius: "14px",
                                        background: "rgba(244, 63, 94, 0.15)",
                                        border: "1px solid rgba(244, 63, 94, 0.3)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        🔥
                                    </div>
                                    <div>
                                        <h4 style={{ margin: "0 0 0.2rem 0", color: "#fb7185", fontSize: "1.05rem", fontWeight: 700 }}>Active Initiator</h4>
                                        <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>Consistently engaged across interactive simulators.</p>
                                    </div>
                                </div>
                            ) : (
                                <p style={{ color: "var(--text-subtle)", textAlign: "center", fontStyle: "italic", margin: "2rem 0" }}>Start tracking practice activity to unlock mastery badges.</p>
                            )}

                            {accuracy >= 80 && stats.totalAnswered >= 5 && (
                                <div style={{
                                    display: "flex",
                                    gap: "1.25rem",
                                    alignItems: "center",
                                    padding: "1.25rem 1.5rem",
                                    background: "rgba(16, 185, 129, 0.06)",
                                    borderRadius: "14px",
                                    border: "1px solid rgba(16, 185, 129, 0.25)"
                                }}>
                                    <div style={{
                                        fontSize: "2rem",
                                        width: "52px",
                                        height: "52px",
                                        borderRadius: "14px",
                                        background: "rgba(16, 185, 129, 0.15)",
                                        border: "1px solid rgba(16, 185, 129, 0.3)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        🧠
                                    </div>
                                    <div>
                                        <h4 style={{ margin: "0 0 0.2rem 0", color: "#34d399", fontSize: "1.05rem", fontWeight: 700 }}>Syntax Brainiac</h4>
                                        <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>Maintained over 80% accuracy on AI practice exams.</p>
                                    </div>
                                </div>
                            )}

                            {spk >= 10 && (
                                <div style={{
                                    display: "flex",
                                    gap: "1.25rem",
                                    alignItems: "center",
                                    padding: "1.25rem 1.5rem",
                                    background: "rgba(99, 102, 241, 0.06)",
                                    borderRadius: "14px",
                                    border: "1px solid rgba(99, 102, 241, 0.25)"
                                }}>
                                    <div style={{
                                        fontSize: "2rem",
                                        width: "52px",
                                        height: "52px",
                                        borderRadius: "14px",
                                        background: "rgba(99, 102, 241, 0.15)",
                                        border: "1px solid rgba(99, 102, 241, 0.3)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        🎙️
                                    </div>
                                    <div>
                                        <h4 style={{ margin: "0 0 0.2rem 0", color: "#a5b4fc", fontSize: "1.05rem", fontWeight: 700 }}>Vocal Virtuoso</h4>
                                        <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>Completed 10+ acoustic speech laboratory sessions.</p>
                                    </div>
                                </div>
                            )}

                            {(lst >= 5 && scn >= 5) && (
                                <div style={{
                                    display: "flex",
                                    gap: "1.25rem",
                                    alignItems: "center",
                                    padding: "1.25rem 1.5rem",
                                    background: "rgba(245, 158, 11, 0.06)",
                                    borderRadius: "14px",
                                    border: "1px solid rgba(245, 158, 11, 0.25)"
                                }}>
                                    <div style={{
                                        fontSize: "2rem",
                                        width: "52px",
                                        height: "52px",
                                        borderRadius: "14px",
                                        background: "rgba(245, 158, 11, 0.15)",
                                        border: "1px solid rgba(245, 158, 11, 0.3)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        🌐
                                    </div>
                                    <div>
                                        <h4 style={{ margin: "0 0 0.2rem 0", color: "#fbbf24", fontSize: "1.05rem", fontWeight: 700 }}>World Traveler</h4>
                                        <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>Mastered 5 real-life scenarios and audio cases.</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Progress;