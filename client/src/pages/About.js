const About = () => {
    return (
        <div className="app-container">
            <main className="main-content text-center animate-fade-in" style={{ maxWidth: "820px" }}>
                
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
                        <span>✦</span> Project Vision
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: "2.6rem", margin: 0, fontWeight: 800 }}>
                        About English Coach
                    </h1>
                    <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
                        Engineered to unify grammar mastery, conversational nuances, and AI evaluation into a single refined suite.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="glass-panel" style={{
                    padding: "3rem 2rem",
                    marginBottom: "3rem",
                    borderRadius: "20px",
                    position: "relative",
                    overflow: "hidden"
                }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                        <div style={{
                            width: "84px",
                            height: "84px",
                            borderRadius: "24px",
                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "2.2rem",
                            marginBottom: "0.5rem",
                            boxShadow: "0 10px 30px -5px rgba(99, 102, 241, 0.45)",
                            border: "1px solid rgba(255, 255, 255, 0.25)"
                        }}>
                            👨‍💻
                        </div>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "white", margin: 0, letterSpacing: "-0.02em" }}>
                            Ganesh Kumar P
                        </h2>
                        <a
                            href="mailto:gk044996@gmail.com"
                            style={{
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                color: "#c7d2fe",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                background: "rgba(99, 102, 241, 0.12)",
                                border: "1px solid rgba(99, 102, 241, 0.3)",
                                padding: "0.45rem 1rem",
                                borderRadius: "999px",
                                transition: "all 0.2s"
                            }}
                        >
                            <span>✉️</span> <span>gk044996@gmail.com</span>
                        </a>
                        <p style={{
                            marginTop: "0.75rem",
                            color: "var(--text-muted)",
                            lineHeight: 1.7,
                            maxWidth: "520px",
                            fontSize: "1rem"
                        }}>
                            Smart English Coach combines Gemini AI generation, speech recognition heuristics, and curated conversational frameworks into an accessible offline and cloud-powered learning journey.
                        </p>
                    </div>
                </div>

                {/* Feedback Form */}
                <div style={{ textAlign: "left" }}>
                    <div style={{ marginBottom: "1.25rem" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
                            Community Input
                        </span>
                        <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#ffffff", margin: "0.25rem 0 0" }}>
                            Platform Feedback & Feature Ideas
                        </h3>
                    </div>
                    
                    <div className="glass-panel" style={{
                        padding: "2.5rem",
                        borderRadius: "18px",
                        background: "rgba(15, 20, 34, 0.75)"
                    }}>
                        <p style={{ marginBottom: "2rem", color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.6 }}>
                            Have ideas for new learning tracks or suggestions to improve the AI coach? Send your thoughts directly below.
                        </p>
                        
                        <form action="https://submit-form.com/9gTpxjmNg" method="POST" style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
                            <input type="hidden" name="_redirect" value={window.location.href} />
                            
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                                <label htmlFor="name" style={{ color: "var(--text-subtle)", fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em" }}>Your Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    placeholder="E.g., John Doe" 
                                    required 
                                    className="form-input"
                                />
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                                <label htmlFor="email" style={{ color: "var(--text-subtle)", fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em" }}>Your Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="E.g., you@example.com" 
                                    required 
                                    className="form-input"
                                />
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                                <label htmlFor="message" style={{ color: "var(--text-subtle)", fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em" }}>Your Message / Feature Request</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="What features or exercises would you like to see next?"
                                    required
                                    rows="4"
                                    className="form-input"
                                    style={{ resize: "vertical" }}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                style={{ padding: "0.95rem", marginTop: "0.5rem", fontSize: "1.05rem", borderRadius: "12px" }}
                            >
                                🚀 Send Feedback
                            </button>
                        </form>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default About;
