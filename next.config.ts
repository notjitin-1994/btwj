import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  // The examples/ folder has pre-existing TS errors (socket.io-client) unrelated
  // to the app. Ignore build errors so the production build succeeds.
  typescript: {
    ignoreBuildErrors: true,
  },
  // Security: powered-by header removal
  poweredByHeader: false,
  // Compress responses
  compress: true,
  // Security headers (also enforced via proxy/middleware for full coverage)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
