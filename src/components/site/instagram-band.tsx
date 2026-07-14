"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Heart, ArrowUpRight, Loader2 } from "lucide-react";
import { Reveal } from "@/components/site/motion-helpers";
import { siteConfig } from "@/lib/site-config";

type IgPost = {
  id: string;
  permalink: string;
  // For IMAGE posts, mediaUrl is the image; for VIDEO/REEL, thumbnailUrl is
  thumbnail: string;
  caption: string | null;
  mediaType: string;
};

export function InstagramFollowBand() {
  const [posts, setPosts] = React.useState<IgPost[]>([]);
  const [live, setLive] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [imgErrors, setImgErrors] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.posts && data.posts.length > 0) {
          // Map Graph API media to display shape
          const mapped: IgPost[] = data.posts.map((p: any) => ({
            id: p.id,
            permalink: p.permalink,
            thumbnail: p.thumbnailUrl || p.mediaUrl || "",
            caption: p.caption,
            mediaType: p.mediaType || "IMAGE",
          }));
          setPosts(mapped);
          setLive(data.live === true);
        }
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

  // Fallback images (royalty-free travel) if the live feed is unavailable
  const fallbackImages = [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
  ];

  const displayPosts =
    posts.length > 0
      ? posts.slice(0, 6)
      : fallbackImages.map((src, i) => ({
          id: `fallback-${i}`,
          permalink: siteConfig.instagram,
          thumbnail: src,
          caption: null,
          mediaType: "IMAGE",
        }));

  return (
    <section className="relative overflow-hidden bg-teal-wash py-12 sm:py-17">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Left: pitch + CTA */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {siteConfig.instagramHandle}
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Travel with us,{" "}
              <span className="text-brand">every day</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Follow our journeys for destination inspiration, behind-the-scenes
              moments, exclusive offers, and travel tips from our experts. Your
              next adventure starts on your feed.
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                "Destination inspiration & hidden gems",
                "Exclusive offers for our followers",
                "Real stories from real travellers",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm text-ink/80">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                    <Heart className="size-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
                className="shimmer-sweep group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.03]"
              >
                <Instagram className="size-4" />
                Follow {siteConfig.instagramHandle}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-brand/25 bg-white px-6 text-sm font-semibold text-brand transition-colors hover:bg-brand/5"
              >
                Plan my trip
              </Link>
            </div>
          </div>

          {/* Right: live Instagram feed grid */}
          <Reveal delay={0.1}>
            <div className="relative">
              {/* Feed frame */}
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-3 shadow-premium-lg">
                {/* Feed header */}
                <div className="flex items-center justify-between rounded-2xl bg-muted/50 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-full bg-brand p-0.5">
                      <span className="flex size-full items-center justify-center rounded-full bg-white">
                        <Instagram className="size-4 text-brand" />
                      </span>
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold text-ink">
                        {siteConfig.instagramHandle}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {loading
                          ? "Loading feed…"
                          : live
                          ? "Live · Latest posts"
                          : "Latest posts"}
                      </p>
                    </div>
                  </div>
                  <a
                    href={siteConfig.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white transition-transform hover:scale-105"
                  >
                    Follow
                  </a>
                </div>

                {/* Image grid */}
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  {displayPosts.map((post, i) => (
                    <motion.a
                      key={post.id || i}
                      href={post.permalink}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                      className="group relative aspect-square overflow-hidden rounded-lg"
                    >
                      {loading ? (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <Loader2 className="size-5 animate-spin text-muted-foreground" />
                        </div>
                      ) : imgErrors[post.id] ? (
                        <div className="flex h-full w-full items-center justify-center bg-brand/10">
                          <Instagram className="size-6 text-brand" />
                        </div>
                      ) : (
                        <img
                          src={post.thumbnail}
                          alt={post.caption ? post.caption.slice(0, 100) : "Instagram post"}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={() =>
                            setImgErrors((prev) => ({ ...prev, [post.id]: true }))
                          }
                          referrerPolicy="no-referrer"
                        />
                      )}
                      {/* Video/reel indicator */}
                      {post.mediaType && post.mediaType !== "IMAGE" && (
                        <span className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-ink/60 text-white">
                          <svg viewBox="0 0 24 24" className="size-3 fill-current"><path d="M8 5v14l11-7z"/></svg>
                        </span>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-ink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Instagram className="size-6 text-white" />
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Feed footer */}
                <div className="mt-3 flex items-center gap-3 rounded-2xl bg-muted/50 px-4 py-2.5">
                  <Heart className="size-4 text-brand" />
                  <Instagram className="size-4 text-muted-foreground" />
                  <span className="ml-auto text-[11px] font-medium text-muted-foreground">
                    {siteConfig.instagramHandle} · Live feed
                  </span>
                </div>
              </div>

              {/* Floating engagement chip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-4 -left-3 flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2.5 shadow-premium-lg"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                  <Heart className="size-4 fill-leaf" />
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-ink">Daily travel inspo</p>
                  <p className="text-[11px] text-muted-foreground">Tap to follow</p>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
