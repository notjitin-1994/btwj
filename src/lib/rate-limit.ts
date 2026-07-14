import { NextResponse } from "next/server";

/**
 * Simple in-memory rate limiter (production-ready for single-instance deployments).
 * For multi-instance/multi-server deployments, swap with Redis-backed limiter.
 *
 * Uses a sliding-window counter per IP per route.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Periodically clean up expired buckets to prevent memory growth
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}

export type RateLimitConfig = {
  /** Max requests allowed in the window */
  limit: number;
  /** Window size in milliseconds */
  windowMs: number;
};

/** Default rate limits per route type */
export const RATE_LIMITS = {
  // Contact form: 5 requests per 10 minutes per IP
  contact: { limit: 5, windowMs: 10 * 60 * 1000 },
  // Trip planner: 10 requests per 10 minutes per IP
  tripPlan: { limit: 10, windowMs: 10 * 60 * 1000 },
  // General API: 60 requests per minute per IP
  general: { limit: 60, windowMs: 60 * 1000 },
} as const;

/**
 * Check rate limit for a given key (usually IP + route).
 * Returns null if allowed, or a NextResponse (429) if rate-limited.
 */
export function rateLimit(
  key: string,
  config: RateLimitConfig
): NextResponse | null {
  cleanup();

  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    // Create/reset the bucket
    buckets.set(key, { count: 1, resetAt: now + config.windowMs });
    return null;
  }

  bucket.count++;
  if (bucket.count > config.limit) {
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(config.limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(bucket.resetAt / 1000)),
        },
      }
    );
  }

  return null;
}

/**
 * Get the client IP from a request, accounting for proxies/load balancers.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

/**
 * Build a rate-limit key from IP and route identifier.
 */
export function rateLimitKey(ip: string, route: string): string {
  return `${ip}:${route}`;
}
