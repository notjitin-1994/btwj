"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Compass,
  Star,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const headlines = [
  "Customized Travel Plans — Designed just for you!",
  "Experienced Travel Experts — Making travel stress-free and exciting!",
];

const heroImages = [
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=2000&q=80",
];

const quickDestinations = [
  { name: "Dubai", tag: "City & Desert" },
  { name: "Maldives", tag: "Beaches" },
  { name: "Makkah", tag: "Umrah" },
  { name: "Kerala", tag: "Backwaters" },
];

const trustSignals = [
  { icon: Star, label: "10+ Years of Experience" },
  { icon: Compass, label: "Best Tour Selection" },
  { icon: ShieldCheck, label: "Best Price Guarantee" },
];

export function Hero() {
  const [idx, setIdx] = React.useState(0);
  const [imgIdx, setImgIdx] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % headlines.length), 5000);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    const t = setInterval(
      () => setImgIdx((i) => (i + 1) % heroImages.length),
      8000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <motion.div
            key={src}
            initial={false}
            animate={{
              opacity: i === imgIdx ? 1 : 0,
              scale: i === imgIdx ? 1.05 : 1,
            }}
            transition={{
              opacity: { duration: 1.6, ease: "easeInOut" },
              scale: { duration: 8, ease: "easeOut" },
            }}
            className="absolute inset-0"
          >
            <img
              src={src}
              alt="Travel destination"
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
        {/* Solid dark overlay for guaranteed text contrast (no gradient) */}
        <div className="absolute inset-0 bg-ink/72" />
        <div aria-hidden className="bg-grid-brand absolute inset-0 opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-32 pb-10 sm:px-6 lg:px-8 lg:pt-36">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md"
        >
          <Sparkles className="size-3.5 text-leaf" />
          Welcome to Buy The Way Journeys
        </motion.div>

        {/* Rotating headline */}
        <div className="mt-6 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={idx}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4rem]"
            >
              {headlines[idx]}
            </motion.h1>
          </AnimatePresence>

          {/* progress dots */}
          <div className="mt-6 flex items-center gap-2">
            {headlines.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Show headline ${i + 1}`}
                className="group relative h-1.5 overflow-hidden rounded-full bg-white/20 transition-all"
                style={{ width: i === idx ? 48 : 20 }}
              >
                {i === idx && (
                  <motion.span
                    key={idx}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-leaf"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Subtext — condensed from the reference about body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          Exceptional travel experiences tailored to your needs — dream
          vacations, spiritual journeys, and seamless events, all in one place.
        </motion.p>

        {/* Single primary CTA + risk-reversal microcopy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-8"
        >
          <Link
            href="/contact"
            className="shimmer-sweep group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.03]"
          >
            Plan my trip
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 text-xs text-white/65">
            Free, no-obligation quote within 24 hours · Call{" "}
            <a
              href={`tel:${siteConfig.phone}`}
              className="font-semibold text-white underline-offset-2 hover:underline"
            >
              {siteConfig.phone}
            </a>
          </p>
        </motion.div>

        {/* Destination quick-pick row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-12"
        >
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
            <MapPin className="size-3.5 text-leaf" />
            Popular destinations
          </p>
          <div className="flex flex-wrap gap-2.5">
            {quickDestinations.map((d) => (
              <Link
                key={d.name}
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-leaf/50 hover:bg-white/15"
              >
                <span className="size-1.5 rounded-full bg-leaf" />
                {d.name}
                <span className="text-white/50">· {d.tag}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom trust strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="relative z-10 border-t border-white/15 bg-ink/40 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-5 sm:px-6 lg:px-8">
          {trustSignals.map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-2 text-sm font-medium text-white/85"
            >
              <t.icon className="size-4 text-leaf" />
              {t.label}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() =>
          window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" })
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-white/60 transition-colors hover:text-white md:flex"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Explore</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-5" />
        </motion.span>
      </motion.button>
    </section>
  );
}
