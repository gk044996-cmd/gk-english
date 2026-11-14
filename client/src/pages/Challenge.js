import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Challenge = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([
        { id: 1, title: "Master the Past Tense", desc: "Successfully answer 5 Past Simple questions in the AI Test.", isCompleted: false, xp: 50 },
        { id: 2, title: "Idiom Explorer", desc: "Read and learn 3 new idioms from the Phrases section.", isCompleted: false, xp: 30 },
        { id: 3, title: "Perfect Score", desc: "Achieve a 100% correct streak of 3 questions.", isCompleted: true, xp: 100 }
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
    };

    const completedCount = tasks.filter(t => t.isCompleted).length;
    const progressPercent = (completedCount / tasks.length) * 100;

    return (
        <div className="app-container">
            <main className="main-content animate-fade-in" style={{ maxWidth: "840px" }}>
                
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#fbbf24",
                        marginBottom: "0.35rem"
                    }}>
                        <span>✦</span> Daily Gamification
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: "2.8rem", margin: 0, fontWeight: 800 }}>
                        Daily Quests
                    </h1>
                    <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
                        Complete target quests to earn XP, maintain momentum, and elevate your English proficiency.
                    </p>
                </div>

                {/* Progress Bar Container */}
                <div className="glass-panel stagger-1 mb-8" style={{ padding: "2rem", borderRadius: "18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700 }}>Today's Quest Progress</h3>
                        <span style={{
                            color: "#fbbf24",
                            fontWeight: 700,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.95rem"
                        }}>
                            {completedCount} / {tasks.length} Completed
                        </span>
                    </div>
                    
                    <div style={{ width: "100%", height: "10px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ 
                            width: `${progressPercent}%`, 
                            height: "100%", 
                            background: "var(--gradient-primary)",
                            borderRadius: "999px",
                            boxShadow: "0 0 12px rgba(99, 102, 241, 0.5)",
                            transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)" 
                        }} />
                    </div>
                    
                    {progressPercent === 100 && (
                        <div className="animate-fade-in text-center mt-4" style={{
                            color: "#34d399",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            background: "rgba(16, 185, 129, 0.1)",
                            padding: "0.75rem",
                            borderRadius: "10px",
                            border: "1px solid rgba(16, 185, 129, 0.25)"
                        }}>
                            🎉 You've completed all daily quests! Come back tomorrow for more.
                        </div>
                    )}
                </div>

                {/* Task List */}
                <div className="flex flex-col gap-4 stagger-2">
                    {tasks.map((task) => (
                        <div 
                            key={task.id}
                            className="glass-panel"
                            style={{ 
                                display: "flex", 
                                gap: "1.25rem", 
                                alignItems: "center",
                                opacity: task.isCompleted ? 0.65 : 1,
                                border: task.isCompleted ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid var(--border)",
                                borderRadius: "16px",
                                padding: "1.35rem 1.6rem",
                                cursor: "pointer",
                                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                background: task.isCompleted ? "rgba(16, 185, 129, 0.04)" : "rgba(15, 20, 34, 0.7)"
                            }}
                            onClick={() => toggleTask(task.id)}
                        >
                            {/* Checkbox */}
                            <div style={{ 
                                width: "32px", 
                                height: "32px", 
                                borderRadius: "10px", 
                                border: `2px solid ${task.isCompleted ? "var(--success)" : "rgba(255, 255, 255, 0.2)"}`,
                                background: task.isCompleted ? "var(--success)" : "rgba(255, 255, 255, 0.03)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s ease",
                                flexShrink: 0
                            }}>
                                {task.isCompleted && <span style={{ color: "white", fontSize: "1.1rem", fontWeight: "bold" }}>✓</span>}
                            </div>
                            
                            {/* Content */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{ 
                                    margin: "0 0 0.25rem 0", 
                                    fontSize: "1.1rem",
                                    fontWeight: 700,
                                    color: task.isCompleted ? "#34d399" : "white",
                                    textDecoration: task.isCompleted ? "line-through" : "none" 
                                }}>
                                    {task.title}
                                </h3>
                                <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--text-muted)" }}>{task.desc}</p>
                            </div>

                            {/* Rewards */}
                            <div style={{ textAlign: "right" }}>
                                <div className="badge badge-warning" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                    +{task.xp} XP
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8 stagger-3">
                    <button className="btn btn-secondary" onClick={() => navigate("/test")} style={{ borderRadius: "12px", padding: "0.85rem 1.8rem" }}>
                        Jump into AI Practice Tests →
                    </button>
                </div>

            </main>
        </div>
    );
};

export default Challenge;