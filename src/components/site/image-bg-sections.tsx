"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { siteImages } from "@/lib/images";
import { usePlanner } from "@/lib/planner-store";

/**
 * Image-background section with contrast-adjusted text.
 * Uses a fixed travel image as the container background with a solid
 * dark overlay so all text stays readable.
 */
export function InspirationBgSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Fixed background image with parallax-like effect */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-fixed bg-center"
          style={{ backgroundImage: `url(${siteImages.bg.roadTrip})` }}
        />
        {/* Solid dark overlay for text contrast (no gradient) */}
        <div className="absolute inset-0 bg-ink/78" />
        <div aria-hidden className="bg-grid-brand absolute inset-0 opacity-30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur"
            >
              <MapPin className="size-3.5 text-leaf" />
              Travel inspiration
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl"
            >
              Every journey begins with a single{" "}
              <span className="text-leaf">step</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-4 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Whether you're exploring local gems or international wonders, we
              ensure a seamless and exciting journey. From golden deserts to
              serene backwaters and sacred pilgrimages — your story is waiting
              to be written.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-7"
            >
              <Link
                href="/services"
                className="shimmer-sweep group inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-brand transition-transform hover:scale-[1.03]"
              >
                Explore our services
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Right: stat tiles on glass */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "10+", l: "Years of Experience" },
              { k: "Best", l: "Tour Selection" },
              { k: "Best", l: "Price Guarantee" },
              { k: "24/7", l: "Travel Support" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 * i }}
                className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-md"
              >
                <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {s.k}
                </p>
                <p className="mt-1.5 text-sm font-medium text-white/75">
                  {s.l}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Video background section — uses a royalty-free travel video.
 * Falls back gracefully (poster image shows while loading / if blocked).
 */
export function VideoBgSection() {
  const { openPlanner } = usePlanner();
  return (
    <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={siteImages.bg.tropical}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-aerial-view-of-the-beach-2634/1080p.mp4"
          type="video/mp4"
        />
      </video>
      {/* Solid dark overlay for text contrast */}
      <div className="absolute inset-0 bg-ink/68" />
      <div aria-hidden className="bg-grid-brand absolute inset-0 opacity-25" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur"
        >
          <span className="size-1.5 rounded-full bg-leaf" />
          The world is calling
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.06 }}
          className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
        >
          Customized travel plans — designed just for you
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          Experienced travel experts making travel stress-free and exciting.
          Let's plan something unforgettable together.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-7"
        >
          <button
            onClick={openPlanner}
            className="shimmer-sweep group inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-brand transition-transform hover:scale-[1.03]"
          >
            Plan my trip
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
