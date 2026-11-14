import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { path: "/", label: "Dashboard", icon: "📊", desc: "Learning Hub" },
        { path: "/grammar", label: "Grammar", icon: "📘", desc: "40 Complete Topics" },
        { path: "/speaking", label: "Speaking", icon: "🗣️", desc: "1-Min Speech Studio" },
        { path: "/scenarios", label: "Listening", icon: "🎧", desc: "AI Story Studio" },
        { path: "/reading", label: "Reading", icon: "📖", desc: "Read Aloud Studio" },
        { path: "/test", label: "Tests", icon: "📝", desc: "AI Dynamic Tests" },
        { path: "/phrases", label: "Phrases", icon: "💬", desc: "Conversational Vault" },
        { path: "/progress", label: "Progress", icon: "📈", desc: "Stats & Analytics" },
        { path: "/about", label: "About", icon: "ℹ️", desc: "System Info" }
    ];

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Prevent body scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    const activeLink = navLinks.find(link => link.path === location.pathname) || navLinks[0];

    return (
        <>
            <nav style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                background: "rgba(8, 10, 16, 0.88)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "0.75rem 1.25rem",
                boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)"
            }}>
                <div style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem"
                }}>
                    {/* Brand Logo & Name */}
                    <Link
                        to="/"
                        style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <div style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.1rem",
                            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            flexShrink: 0
                        }}>
                            ✦
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                            <h2 style={{
                                margin: 0,
                                fontSize: "1.25rem",
                                fontWeight: 800,
                                letterSpacing: "-0.02em"
                            }} className="text-gradient">
                                English Coach
                            </h2>
                            <span style={{
                                fontSize: "0.62rem",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                padding: "0.15rem 0.45rem",
                                borderRadius: "6px",
                                background: "rgba(99, 102, 241, 0.15)",
                                color: "#a5b4fc",
                                border: "1px solid rgba(99, 102, 241, 0.3)",
                                textTransform: "uppercase"
                            }}>
                                AI
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links (Visible on >= 1024px) */}
                    <div className="desktop-nav-links" style={{
                        display: "flex",
                        gap: "0.25rem",
                        alignItems: "center"
                    }}>
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    style={{
                                        textDecoration: "none",
                                        color: isActive ? "#ffffff" : "var(--text-muted)",
                                        fontWeight: isActive ? "600" : "500",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.4rem",
                                        padding: "0.45rem 0.75rem",
                                        borderRadius: "10px",
                                        fontSize: "0.86rem",
                                        letterSpacing: "-0.01em",
                                        background: isActive ? "rgba(99, 102, 241, 0.18)" : "transparent",
                                        border: isActive ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid transparent",
                                        boxShadow: isActive ? "0 2px 10px -2px rgba(99, 102, 241, 0.35)" : "none",
                                        transition: "all 0.18s ease",
                                        whiteSpace: "nowrap"
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.color = "#ffffff";
                                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.color = "var(--text-muted)";
                                            e.currentTarget.style.background = "transparent";
                                        }
                                    }}
                                >
                                    <span style={{ fontSize: "0.95rem" }}>{link.icon}</span>
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Right Section (Pill + Hamburger) */}
                    <div className="mobile-nav-toggle-container" style={{
                        display: "none",
                        alignItems: "center",
                        gap: "0.6rem"
                    }}>
                        {/* Current Page Indicator on Mobile */}
                        <div style={{
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            padding: "0.25rem 0.65rem",
                            borderRadius: "8px",
                            background: "rgba(99, 102, 241, 0.12)",
                            border: "1px solid rgba(99, 102, 241, 0.25)",
                            color: "#c7d2fe",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem"
                        }}>
                            <span>{activeLink.icon}</span>
                            <span style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {activeLink.label}
                            </span>
                        </div>

                        {/* Hamburger Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(prev => !prev)}
                            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "10px",
                                border: isMobileMenuOpen ? "1px solid rgba(99, 102, 241, 0.5)" : "1px solid rgba(255, 255, 255, 0.12)",
                                background: isMobileMenuOpen ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.04)",
                                color: "#ffffff",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "4px",
                                cursor: "pointer",
                                padding: "8px",
                                transition: "all 0.2s ease",
                                flexShrink: 0
                            }}
                        >
                            <span style={{
                                width: "18px",
                                height: "2px",
                                background: "#ffffff",
                                borderRadius: "2px",
                                transition: "transform 0.25s ease, opacity 0.2s ease",
                                transform: isMobileMenuOpen ? "translateY(6px) rotate(45deg)" : "none"
                            }} />
                            <span style={{
                                width: "18px",
                                height: "2px",
                                background: "#ffffff",
                                borderRadius: "2px",
                                transition: "opacity 0.2s ease",
                                opacity: isMobileMenuOpen ? 0 : 1
                            }} />
                            <span style={{
                                width: "18px",
                                height: "2px",
                                background: "#ffffff",
                                borderRadius: "2px",
                                transition: "transform 0.25s ease, opacity 0.2s ease",
                                transform: isMobileMenuOpen ? "translateY(-6px) rotate(-45deg)" : "none"
                            }} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Dropdown Menu Drawer Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="mobile-menu-overlay animate-fade-in"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                        position: "fixed",
                        top: "58px",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(4, 6, 12, 0.85)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        zIndex: 99,
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        padding: "1rem"
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="glass-panel"
                        style={{
                            width: "100%",
                            maxWidth: "460px",
                            margin: "0 auto",
                            borderRadius: "18px",
                            padding: "1.25rem",
                            border: "1px solid rgba(99, 102, 241, 0.3)",
                            background: "rgba(15, 20, 34, 0.95)",
                            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)"
                        }}
                    >
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingBottom: "0.85rem",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                            marginBottom: "1rem"
                        }}>
                            <div>
                                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                    All Learning Modules
                                </div>
                                <h3 style={{ margin: "0.2rem 0 0", fontSize: "1.1rem", fontWeight: 800, color: "#ffffff" }}>
                                    Navigation Menu
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    background: "rgba(255, 255, 255, 0.06)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    color: "var(--text-muted)",
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    fontSize: "1rem"
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* List of all pages */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        style={{
                                            textDecoration: "none",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "0.75rem 0.9rem",
                                            borderRadius: "12px",
                                            background: isActive ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                                            border: isActive ? "1px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.06)",
                                            transition: "all 0.15s ease",
                                            color: isActive ? "#ffffff" : "var(--text-main)"
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                            <span style={{ fontSize: "1.35rem", flexShrink: 0 }}>{link.icon}</span>
                                            <div>
                                                <div style={{ fontWeight: isActive ? 800 : 600, fontSize: "0.95rem" }}>
                                                    {link.label}
                                                </div>
                                                <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)", marginTop: "1px" }}>
                                                    {link.desc}
                                                </div>
                                            </div>
                                        </div>

                                        {isActive ? (
                                            <span style={{
                                                fontSize: "0.72rem",
                                                fontWeight: 800,
                                                padding: "0.2rem 0.5rem",
                                                borderRadius: "6px",
                                                background: "#6366f1",
                                                color: "#ffffff"
                                            }}>
                                                Current
                                            </span>
                                        ) : (
                                            <span style={{ color: "var(--text-subtle)", fontSize: "0.9rem" }}>→</span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Footer in Drawer */}
                        <div style={{
                            marginTop: "1.25rem",
                            paddingTop: "0.85rem",
                            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontSize: "0.75rem",
                            color: "var(--text-subtle)"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
                                <span>AI Assistant Online</span>
                            </div>
                            <span>Gemini 3.5</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
