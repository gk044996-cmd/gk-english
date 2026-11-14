// ── API Base URL Configuration ─────────────────────────────────────────────
// 1. Custom backend URL from environment (e.g. Vercel/Netlify pointing to Render/Railway)
// 2. Same-origin relative path in production ("" allows seamless single-dyno hosting)
// 3. http://localhost:5000 for local development
const API_URL = process.env.REACT_APP_API_URL || 
    (process.env.NODE_ENV === "production" ? "" : "http://localhost:5000");

export default API_URL;