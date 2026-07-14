import { NextResponse } from "next/server";
import { isTokenStale, refreshToken, isMediaStale, syncMedia } from "@/lib/instagram";

/**
 * POST /api/instagram/refresh
 * Cron endpoint — called periodically (e.g. daily) by a scheduled job.
 * Refreshes the long-lived token if stale and re-syncs media.
 *
 * Set up a cron job (e.g. via cron tool or Vercel Cron) to hit this endpoint
 * once per day to keep the token alive and media fresh.
 *
 * Secured via a CRON_SECRET env var if set.
 */
export async function POST(req: Request) {
  // Optional auth via shared secret
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const results: { tokenRefreshed?: boolean; mediaSynced?: boolean; error?: string } = {};

  // Refresh token if it's been >40 days
  if (await isTokenStale()) {
    const r = await refreshToken();
    results.tokenRefreshed = r.ok;
    if (!r.ok) results.error = r.error;
  }

  // Re-sync media if cache is stale (>1h)
  if (await isMediaStale()) {
    const r = await syncMedia();
    results.mediaSynced = r.ok;
    if (!r.ok && !results.error) results.error = r.error;
  }

  return NextResponse.json({ ok: true, ...results });
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "instagram-refresh" });
}
