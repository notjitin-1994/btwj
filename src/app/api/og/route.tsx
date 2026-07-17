import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || siteConfig.name;
    const description = searchParams.get("desc") || siteConfig.tagline;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#001e2b", // site ink color
            backgroundImage: "linear-gradient(to bottom right, #001e2b, #00121a)",
            padding: "80px",
            color: "white",
            fontFamily: "sans-serif",
          }}
        >
          {/* Top: Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: "0.1em",
                color: "#ffffff",
                textTransform: "uppercase",
              }}
            >
              Buy The Way<span style={{ color: "#005b96" }}>.</span>
            </span>
          </div>

          {/* Center: Title & Description */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              marginTop: "auto",
              marginBottom: "auto",
              maxWidth: "80%",
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#ffffff",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 32,
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.4,
                maxWidth: "90%",
              }}
            >
              {description}
            </div>
          </div>

          {/* Bottom: URL */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <span>buythewayjourneys.com</span>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span
                style={{
                  height: "12px",
                  width: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#005b96",
                }}
              />
              <span
                style={{
                  height: "12px",
                  width: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#4caf50",
                }}
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
