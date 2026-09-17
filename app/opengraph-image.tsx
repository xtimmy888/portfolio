import { ImageResponse } from "next/og";

export const alt =
  "Tahmid Zalal — CS + Physics | Quant, ML & Scientific Computing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080c",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg,#34d399,#22d3ee)",
              borderRadius: 14,
              color: "#07080c",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            TZ
          </div>
          <div style={{ display: "flex", color: "#98a2b3", fontSize: 26 }}>
            St. John&apos;s, NL · Canada
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              color: "#e8eaf0",
              letterSpacing: -2,
            }}
          >
            Tahmid&nbsp;<span style={{ color: "#34d399" }}>Zalal</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 36,
              color: "#98a2b3",
            }}
          >
            CS + Physics · Quant, ML &amp; Scientific Computing
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Python", "Machine Learning", "Quant", "HPC", "Next.js"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 999,
                padding: "10px 22px",
                color: "#cbd5e1",
                fontSize: 24,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
