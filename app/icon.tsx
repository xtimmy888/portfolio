import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#34d399,#22d3ee)",
          color: "#07080c",
          fontSize: 34,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        TZ
      </div>
    ),
    { ...size },
  );
}
