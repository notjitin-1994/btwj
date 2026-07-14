import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Security middleware — applies production security headers to all responses.
 *
 * Headers:
 * - X-Content-Type-Options: nosniff (prevents MIME sniffing)
 * - X-Frame-Options: DENY (prevents clickjacking)
 * - Referrer-Policy: strict-origin-when-cross-origin
 * - Permissions-Policy: locks down browser APIs
 * - X-XSS-Protection: 1; mode=block (legacy XSS protection)
 * - Strict-Transport-Security: HSTS (forces HTTPS)
 * - Content-Security-Policy: restricts resource loading
 */

export function proxy(_req: NextRequest) {
  const res = NextResponse.next();

  // Prevent MIME type sniffing
  res.headers.set("X-Content-Type-Options", "nosniff");

  // Prevent clickjacking — don't allow framing
  res.headers.set("X-Frame-Options", "DENY");

  // Control referrer information
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Lock down browser features/APIs
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()"
  );

  // Legacy XSS protection (for older browsers)
  res.headers.set("X-XSS-Protection", "1; mode=block");

  // HSTS — force HTTPS for 1 year (only meaningful on HTTPS, but harmless)
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  // Content Security Policy — restricts where resources can load from.
  // Allows: self, Unsplash images, Instagram embeds, WhatsApp links, inline styles/scripts (Next.js needs these)
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.instagram.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "media-src 'self' https:",
      "connect-src 'self' https:",
      "frame-src 'self' https://www.instagram.com https://www.google.com https://maps.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; ")
  );

  return res;
}

export const config = {
  // Apply to all routes except static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico|buythewaylogo|journey|robots.txt).*)"],
};
