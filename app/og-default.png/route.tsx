import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #0f1419 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            Used<span style={{ color: "#ef7a58" }}>Slot</span>Shop
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#9ca3af",
              maxWidth: "700px",
              textAlign: "center",
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Refurbished Casino Slot Machines — Shipped Nationwide
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "30px",
              fontSize: "18px",
              color: "#6ee7b7",
            }}
          >
            <span>1-Year Warranty</span>
            <span>33+ Years</span>
            <span>Free Tech Support</span>
          </div>
          <div
            style={{
              marginTop: "10px",
              fontSize: "16px",
              color: "#6b7280",
              display: "flex",
            }}
          >
            928-418-5549 | Kingman, AZ | www.usedslotshop.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
