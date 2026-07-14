"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/motion-helpers";
import { siteConfig } from "@/lib/site-config";
import { siteImages } from "@/lib/images";

// Travel imagery used to evoke the Instagram feed aesthetic
const feedImages = siteImages.instagram;

export function InstagramFollowBand() {
  return (
    <section className="relative overflow-hidden bg-teal-wash py-20 sm:py-28">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: pitch + CTA */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand shadow-premium">
                <Instagram className="size-3.5" />
                {siteConfig.instagramHandle}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Travel with us,{" "}
                <span className="text-brand">every day</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Follow our journeys for destination inspiration, behind-the-scenes
                moments, exclusive offers, and travel tips from our experts. Your
                next adventure starts on your feed.
              </p>
            </Reveal>

            {/* Value bullets */}
            <Reveal delay={0.2}>
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
            </Reveal>

            <Reveal delay={0.26}>
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
            </Reveal>
          </div>

          {/* Right: mock Instagram feed grid */}
          <Reveal delay={0.1}>
            <div className="relative">
              {/* Phone-frame style card */}
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-3 shadow-premium-lg">
                {/* Feed header */}
                <div className="flex items-center justify-between rounded-2xl bg-muted/50 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-tr from-brand via-teal to-leaf p-0.5">
                      <span className="flex size-full items-center justify-center rounded-full bg-white">
                        <Instagram className="size-4 text-brand" />
                      </span>
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold text-ink">
                        {siteConfig.instagramHandle}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Buy The Way Journeys
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white">
                    Follow
                  </span>
                </div>

                {/* Image grid */}
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  {feedImages.map((src, i) => (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                      className="group relative aspect-square overflow-hidden rounded-lg"
                    >
                      <img
                        src={src}
                        alt="Travel moment"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-ink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-1 text-xs font-semibold text-white">
                          <Heart className="size-3.5 fill-white" />
                          {120 + i * 23}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-white">
                          <MessageCircle className="size-3.5" />
                          {8 + i * 2}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Feed footer */}
                <div className="mt-3 flex items-center gap-3 rounded-2xl bg-muted/50 px-4 py-2.5">
                  <Heart className="size-4 text-brand" />
                  <MessageCircle className="size-4 text-muted-foreground" />
                  <span className="ml-auto text-[11px] font-medium text-muted-foreground">
                    {siteConfig.instagramHandle} · Travel reels & stories
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
