import { NextResponse } from "next/server";
import { setSetting } from "@/lib/settings";
import { syncMedia } from "@/lib/instagram";

/**
 * POST /api/instagram/setup
 * One-time setup endpoint to store the initial long-lived access token.
 *
 * Usage:
 *   curl -X POST http://localhost:3000/api/instagram/setup \
 *     -H "Content-Type: application/json" \
 *     -d '{"token":"IGQVJ..."}'
 *
 * Get the token from:
 *   https://developers.facebook.com/apps/ → your app → Instagram Graph API
 *   → "API setup with Instagram login" → Generate token, then exchange for
 *   long-lived: GET https://graph.instagram.com/access_token?
 *     grant_type=ig_exchange_token&client_secret=<APP_SECRET>&access_token=<SHORT_TOKEN>
 *
 * After setup, the token auto-refreshes via the /api/instagram/refresh cron.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = typeof body.token === "string" ? body.token.trim() : "";

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Token is required" },
        { status: 400 }
      );
    }

    // Store the token
    await setSetting("instagram_token", token);
    await setSetting("instagram_token_updated", Date.now().toString());

    // Immediately sync media to populate the cache
    const sync = await syncMedia();

    return NextResponse.json({
      ok: true,
      message: "Instagram token stored and media synced.",
      mediaCount: sync.count ?? 0,
    });
  } catch (err) {
    console.error("[instagram/setup] error", err);
    return NextResponse.json(
      { ok: false, error: "Setup failed" },
      { status: 500 }
    );
  }
}
