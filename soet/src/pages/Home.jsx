import { Link } from "react-router-dom";
import { useState } from "react";

const PILLS = [
  { label: "🤖 AI Chatbot",          to: "/ai-chat",      color: "rgba(79,70,229,0.35)",   border: "rgba(99,102,241,0.6)"  },
  { label: "📢 Smart Notices",        to: "/notice-board", color: "rgba(14,165,233,0.3)",   border: "rgba(56,189,248,0.6)"  },
  { label: "🔐 Role-Based Access",    to: "/login",        color: "rgba(16,185,129,0.3)",   border: "rgba(52,211,153,0.6)"  },
  { label: "📊 Analytics Dashboard",  to: "/login",        color: "rgba(245,158,11,0.3)",   border: "rgba(251,191,36,0.6)"  },
];

function FeaturePill({ label, to, color, border }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? color : "rgba(255,255,255,0.06)",
        border: `1px solid ${hovered ? border : "rgba(255,255,255,0.1)"}`,
        color: hovered ? "#fff" : "#94a3b8",
        padding: "8px 20px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.22s ease",
        boxShadow: hovered ? `0 0 14px ${color}` : "none",
        textDecoration: "none",
        display: "inline-block",
        letterSpacing: "0.01em",
      }}
    >
      {label}
    </Link>
  );
}

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs */}
      <div style={{
        position: "absolute", width: "600px", height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)",
        top: "-150px", left: "-100px", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", width: "500px", height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
        bottom: "-100px", right: "-50px", pointerEvents: "none"
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "680px" }}>
        <div style={{ fontSize: "72px", marginBottom: "16px" }}>🎓</div>

        <h1 style={{
          color: "white",
          fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
          fontWeight: "800",
          letterSpacing: "-1.5px",
          lineHeight: "1.15",
          marginBottom: "16px",
        }}>
          SOET{" "}
          <span style={{
            background: "linear-gradient(135deg, #818cf8, #38bdf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Connect
          </span>
        </h1>

        <p style={{
          color: "#94a3b8",
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          maxWidth: "520px",
          margin: "0 auto 40px",
          lineHeight: "1.7",
        }}>
          The AI-Powered College Notice &amp; Communication Platform for Students, Faculty, and Administrators.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/login"
            style={{
              background: "linear-gradient(135deg, #4f46e5, #6366f1)",
              color: "white",
              padding: "14px 36px",
              borderRadius: "12px",
              fontWeight: "700",
              fontSize: "16px",
              letterSpacing: "0.02em",
              boxShadow: "0 4px 20px rgba(79,70,229,0.5)",
              transition: "all 0.2s ease",
              display: "inline-block",
            }}
          >
            Sign In →
          </Link>
          <Link
            to="/notice-board"
            style={{
              background: "rgba(255,255,255,0.07)",
              color: "#cbd5e1",
              padding: "14px 36px",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "16px",
              border: "1px solid rgba(255,255,255,0.12)",
              transition: "all 0.2s ease",
              display: "inline-block",
            }}
          >
            View Notice Board
          </Link>
        </div>

        {/* Feature Pills */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginTop: "56px" }}>
          {PILLS.map((p) => (
            <FeaturePill key={p.label} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;