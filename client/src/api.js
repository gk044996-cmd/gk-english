// ── API Base URL Configuration ─────────────────────────────────────────────
// 1. Explicit custom URL via environment variable (REACT_APP_API_URL)
// 2. Localhost development (browser running on localhost / 127.0.0.1) -> http://localhost:5000
// 3. Production deployed frontend (e.g. Netlify) -> https://smart-memory.onrender.com
// 4. Default fallback -> http://localhost:5000
const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
     window.location.hostname === "127.0.0.1" ||
     window.location.hostname === "[::1]");

const API_URL =
    process.env.REACT_APP_API_URL ||
    (isLocalhost
        ? "http://localhost:5000"
        : process.env.NODE_ENV === "production"
            ? "https://smart-memory.onrender.com"
            : "http://localhost:5000");

export default API_URL;