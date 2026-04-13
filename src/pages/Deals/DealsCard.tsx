import React from "react";

interface DealItem {
  name: string;
  description: string;
  tag?: string;
}

export const DealsCard: React.FC<{ deal: DealItem }> = ({ deal }) => {
  const { name, description, tag } = deal;
  return (
    <div style={{
      width: "100%", minHeight: 200,
      background: "#2d1f14",
      display: "flex", alignItems: "center",
      padding: "48px 8%", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", right: "10%", top: "50%", transform: "translateY(-50%)", width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
      <div style={{ position: "absolute", right: "22%", bottom: "-50px", width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.025)" }} />
      <div style={{ maxWidth: 500, zIndex: 1 }}>
        {tag && (
          <span style={{
            display: "inline-block", background: "rgba(193,127,74,0.25)",
            color: "#c17f4a", fontSize: 11, fontWeight: 600,
            padding: "3px 12px", borderRadius: 20, marginBottom: 14,
            letterSpacing: 1, textTransform: "uppercase",
            border: "1px solid rgba(193,127,74,0.3)",
          }}>{tag}</span>
        )}
        <h1 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 700, color: "#fff", margin: "0 0 10px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
          {name}
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: "0 0 24px", lineHeight: 1.6, maxWidth: 360 }}>
          {description}
        </p>
        <button style={{ background: "#c17f4a", color: "#fff", border: "none", borderRadius: 6, padding: "9px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Shop Now
        </button>
      </div>
    </div>
  );
};
