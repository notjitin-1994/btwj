import { db } from "@/lib/db";
import { getSetting, setSetting } from "@/lib/settings";

/**
 * Instagram Graph API integration (the industry-standard, reliable approach).
 *
 * Flow:
 * 1. A long-lived access token (60 days) is stored in the Setting table
 *    under "instagram_token". Set it once via the /api/instagram/setup endpoint
 *    or the INSTAGRAM_LONG_LIVED_TOKEN env var.
 * 2. The token is auto-refreshed before it expires (every ~50 days) via the
 *    /api/instagram/refresh cron endpoint (called by a scheduled job).
 * 3. Media is fetched from the Graph API and cached in the InstagramMedia
 *    table. The /api/instagram endpoint serves cached media (fast, no
 *    rate-limit impact) and triggers a background refresh if stale (>1 hour).
 */

const GRAPH_API = "https://graph.instagram.com/v21.0";
const MEDIA_CACHE_TTL = 60 * 60 * 1000; // 1 hour
const TOKEN_REFRESH_INTERVAL = 40 * 24 * 60 * 60 * 1000; // 40 days (token lasts 60)

export type IgMedia = {
  id: string;
  caption: string | null;
  mediaUrl: string | null;
  permalink: string;
  mediaType: string;
  thumbnailUrl: string | null;
  timestamp: string;
};

/**
 * Get the stored long-lived token, falling back to the env var.
 */
async function getToken(): Promise<string | null> {
  const stored = await getSetting("instagram_token");
  if (stored) return stored;
  const env = process.env.INSTAGRAM_LONG_LIVED_TOKEN;
  if (env) {
    // Seed the DB from env so future refreshes persist
    await setSetting("instagram_token", env);
    await setSetting(
      "instagram_token_updated",
      Date.now().toString()
    );
    return env;
  }
  return null;
}

/**
 * Refresh the long-lived token (extends by 60 days). Safe to call anytime —
 * Meta allows refresh once per 24h. Called automatically by the cron endpoint.
 */
export async function refreshToken(): Promise<{ ok: boolean; error?: string }> {
  const token = await getToken();
  if (!token) return { ok: false, error: "No token stored" };

  try {
    const url = `${GRAPH_API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `Refresh failed (${res.status}): ${body.slice(0, 200)}` };
    }
    const data = await res.json();
    if (data.access_token) {
      await setSetting("instagram_token", data.access_token);
      await setSetting("instagram_token_updated", Date.now().toString());
      return { ok: true };
    }
    return { ok: false, error: "No access_token in response" };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

/**
 * Fetch recent media from the Instagram Graph API and cache it in the DB.
 */
export async function syncMedia(): Promise<{ ok: boolean; count?: number; error?: string }> {
  const token = await getToken();
  if (!token) return { ok: false, error: "No token stored" };

  try {
    // Get the IG user ID from /me
    const meRes = await fetch(`${GRAPH_API}/me?fields=id,username&access_token=${token}`);
    if (!meRes.ok) {
      const body = await meRes.text();
      return { ok: false, error: `Failed to get user (${meRes.status}): ${body.slice(0, 200)}` };
    }
    const me = await meRes.json();

    // Fetch recent media (9 posts)
    const mediaRes = await fetch(
      `${GRAPH_API}/${me.id}/media?fields=id,caption,media_url,permalink,media_type,thumbnail_url,timestamp&limit=9&access_token=${token}`
    );
    if (!mediaRes.ok) {
      const body = await mediaRes.text();
      return { ok: false, error: `Failed to fetch media (${mediaRes.status}): ${body.slice(0, 200)}` };
    }
    const mediaData = await mediaRes.json();
    const items: IgMedia[] = mediaData.data || [];

    if (items.length === 0) return { ok: true, count: 0 };

    // Upsert each media item
    for (const item of items) {
      await db.instagramMedia.upsert({
        where: { id: item.id },
        update: {
          caption: item.caption ?? null,
          mediaUrl: item.media_url ?? null,
          permalink: item.permalink,
          mediaType: item.media_type,
          thumbnailUrl: item.thumbnail_url ?? null,
          timestamp: new Date(item.timestamp),
        },
        create: {
          id: item.id,
          caption: item.caption ?? null,
          mediaUrl: item.media_url ?? null,
          permalink: item.permalink,
          mediaType: item.media_type,
          thumbnailUrl: item.thumbnail_url ?? null,
          timestamp: new Date(item.timestamp),
        },
      });
    }

    await setSetting("instagram_media_synced", Date.now().toString());
    return { ok: true, count: items.length };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

/**
 * Get cached media from the DB. Returns up to `limit` items, newest first.
 */
export async function getCachedMedia(limit = 9): Promise<IgMedia[]> {
  const rows = await db.instagramMedia.findMany({
    orderBy: { timestamp: "desc" },
    take: limit,
  });
  return rows.map((r) => ({
    id: r.id,
    caption: r.caption,
    mediaUrl: r.mediaUrl,
    permalink: r.permalink,
    mediaType: r.mediaType,
    thumbnailUrl: r.thumbnailUrl,
    timestamp: r.timestamp.toISOString(),
  }));
}

/**
 * Check if the cached media is stale (older than MEDIA_CACHE_TTL).
 */
export async function isMediaStale(): Promise<boolean> {
  const synced = await getSetting("instagram_media_synced");
  if (!synced) return true;
  return Date.now() - parseInt(synced) > MEDIA_CACHE_TTL;
}

/**
 * Check if the token needs refreshing (older than TOKEN_REFRESH_INTERVAL).
 */
export async function isTokenStale(): Promise<boolean> {
  const updated = await getSetting("instagram_token_updated");
  if (!updated) return true;
  return Date.now() - parseInt(updated) > TOKEN_REFRESH_INTERVAL;
}
