import { ImageResponse } from "next/og";

export const alt = "Prism — field operations for equipment-service teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function PrismOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0c10",
          color: "#f4f1ea",
          padding: "72px 80px",
          fontFamily: "Georgia, Times New Roman, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#9aa3b2",
            }}
          >
            CoreState · Prism
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#6ec8ff",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Field operations platform
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 940,
            }}
          >
            Run field service and field sales from one system.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#c5ccd8",
              maxWidth: 780,
            }}
          >
            A phone for the route. A console for HQ. Isolated per company.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
