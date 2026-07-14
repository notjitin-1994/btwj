"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, ArrowUpRight, Heart, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/site/motion-helpers";
import { siteConfig } from "@/lib/site-config";

/**
 * Instagram section.
 *
 * Rather than mock a live feed (which can't be reliably fetched without an
 * authenticated Graph API token), we show an elegant animated skeletal graphic
 * in Instagram's signature gradient palette (purple → pink → orange) that
 * links directly to the @buytheway_journeys profile.
 *
 * The skeleton uses shimmer animation to evoke a "loading feed" aesthetic
 * while remaining honest — it's a styled placeholder, not fake content.
 */

export function InstagramFollowBand() {
  // 6 skeleton tiles in a 3×2 grid
  const tiles = Array.from({ length: 6 }, (_, i) => i);

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

          {/* Right: animated skeletal Instagram feed in IG color palette */}
          <Reveal delay={0.1}>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-[2rem] border border-border bg-white p-3 shadow-premium-lg transition-shadow hover:shadow-premium-lg"
            >
              {/* Feed header */}
              <div className="flex items-center justify-between rounded-2xl bg-muted/50 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  {/* IG-gradient avatar ring */}
                  <span
                    className="flex size-9 items-center justify-center rounded-full p-0.5"
                    style={{
                      background:
                        "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                    }}
                  >
                    <span className="flex size-full items-center justify-center rounded-full bg-white">
                      <Instagram className="size-4 text-ink" />
                    </span>
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-ink">
                      {siteConfig.instagramHandle}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Tap to view live feed
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white transition-transform group-hover:scale-105">
                  Follow
                </span>
              </div>

              {/* Animated skeleton grid — IG gradient shimmer */}
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                {tiles.map((i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-lg bg-muted"
                  >
                    {/* IG-gradient shimmer sweep */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(110deg, rgba(244,204,77,0.15) 0%, rgba(221,42,123,0.20) 35%, rgba(188,24,136,0.25) 55%, rgba(240,148,51,0.15) 100%)",
                        backgroundSize: "200% 100%",
                        animation: `ig-shimmer ${2.5 + (i % 3) * 0.4}s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                    {/* Subtle IG icon watermark on each tile */}
                    <Instagram className="absolute inset-0 m-auto size-6 text-white/25" />
                  </div>
                ))}
              </div>

              {/* Feed footer */}
              <div className="mt-3 flex items-center gap-3 rounded-2xl bg-muted/50 px-4 py-2.5">
                <Heart className="size-4 text-ink/40" />
                <MessageCircle className="size-4 text-ink/40" />
                <span className="ml-auto text-[11px] font-medium text-muted-foreground">
                  Open @buytheway_journeys on Instagram →
                </span>
              </div>

              {/* Hover overlay — "Open Instagram" */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/40">
                <div className="flex translate-y-2 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink opacity-0 shadow-premium-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Instagram className="size-4 text-brand" />
                  Open live feed
                  <ArrowUpRight className="size-4" />
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </div>

      {/* Keyframe for the IG-gradient shimmer */}
      <style jsx>{`
        @keyframes ig-shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}
