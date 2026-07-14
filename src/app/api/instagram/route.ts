import { NextResponse } from "next/server";
import { getCachedMedia, isMediaStale, isTokenStale, refreshToken, syncMedia } from "@/lib/instagram";

/**
 * GET /api/instagram
 * Returns cached Instagram media (served fast from DB).
 * If the cache is stale (>1h), triggers a background refresh.
 * If the token is stale (>40d), triggers a token refresh first.
 *
 * This is called by the Instagram section on the landing page.
 */
export async function GET() {
  try {
    // Serve cached media immediately (fast path)
    const posts = await getCachedMedia(9);

    // Background maintenance (non-blocking): refresh token + media if stale
    // We don't await this so the response stays fast.
    if (await isTokenStale()) {
      refreshToken().catch(() => {});
    }
    if (await isMediaStale()) {
      syncMedia().catch(() => {});
    }

    return NextResponse.json({
      ok: true,
      posts,
      live: posts.length > 0,
    });
  } catch (err) {
    console.error("[instagram] GET error", err);
    return NextResponse.json(
      { ok: false, posts: [], live: false, error: "Unable to load feed" },
      { status: 200 }
    );
  }
}
