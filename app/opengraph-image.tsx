import { ImageResponse } from "next/og";

export const alt = "CoreState — custom software and field operations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#111216",
          color: "#f4f1ea",
          padding: "72px 80px",
          fontFamily: "Georgia, Times New Roman, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#c4b8a5",
          }}
        >
          CoreState
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 920,
            }}
          >
            Custom software for the way businesses actually work.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#c4b8a5",
              maxWidth: 760,
            }}
          >
            Products and operational systems — including Prism for
            equipment-service teams.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
