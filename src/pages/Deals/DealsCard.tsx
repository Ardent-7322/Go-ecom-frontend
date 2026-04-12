import React from "react";

interface DealItem {
  name: string;
  description: string;
  badge?: string;
  color1: string;
  color2: string;
}

interface DealsCardProps {
  deal: DealItem;
}

export const DealsCard: React.FC<DealsCardProps> = ({ deal }) => {
  const { name, description, badge, color1, color2 } = deal;

  return (
    <div
      style={{
        width: "100%",
        minHeight: 300,
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 10%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: "absolute", right: "8%", top: "-60px",
        width: 280, height: 280, borderRadius: "50%",
        background: "rgba(255,255,255,0.08)",
      }} />
      <div style={{
        position: "absolute", right: "20%", bottom: "-80px",
        width: 200, height: 200, borderRadius: "50%",
        background: "rgba(255,255,255,0.06)",
      }} />
      <div style={{
        position: "absolute", left: "40%", top: "-40px",
        width: 120, height: 120, borderRadius: "50%",
        background: "rgba(255,255,255,0.05)",
      }} />

      {/* Content */}
      <div style={{ maxWidth: 560, zIndex: 1 }}>
        {badge && (
          <span style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.22)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            padding: "5px 14px",
            borderRadius: 20,
            marginBottom: 16,
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.3)",
            letterSpacing: 0.5,
          }}>
            {badge}
          </span>
        )}
        <h1 style={{
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 800,
          color: "#fff",
          margin: "0 0 14px 0",
          lineHeight: 1.1,
          fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
          textShadow: "0 2px 20px rgba(0,0,0,0.2)",
        }}>
          {name}
        </h1>
        <p style={{
          fontSize: "1.05rem",
          color: "rgba(255,255,255,0.88)",
          margin: "0 0 28px 0",
          lineHeight: 1.6,
          maxWidth: 440,
        }}>
          {description}
        </p>
        <button
          style={{
            background: "#fff",
            color: color1,
            border: "none",
            borderRadius: 30,
            padding: "12px 32px",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.transform = "translateY(-2px)";
            (e.target as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.transform = "";
            (e.target as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.18)";
          }}
        >
          Shop Now →
        </button>
      </div>

      {/* Right side pattern */}
      <div style={{ zIndex: 1, display: "flex", flexDirection: "column", gap: 12, opacity: 0.7 }}>
        {["⚡", "🎁", "🏷️"].map((e, i) => (
          <div key={i} style={{
            width: 54, height: 54, borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}>{e}</div>
        ))}
      </div>
    </div>
  );
};
