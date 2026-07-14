"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  ArrowRight,
  Play,
  Star,
  MapPin,
  Plane,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const headlines = [
  {
    accent: "Customized Travel Plans",
    rest: "— Designed just for you!",
  },
  {
    accent: "Experienced Travel Experts",
    rest: "— Making travel stress-free and exciting!",
  },
];

const heroImages = [
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=2000&q=80",
];

export function Hero() {
  const [idx, setIdx] = React.useState(0);
  const [imgIdx, setImgIdx] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % headlines.length), 4200);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    const t = setInterval(
      () => setImgIdx((i) => (i + 1) % heroImages.length),
      7000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <motion.div
            key={src}
            initial={false}
            animate={{ opacity: i === imgIdx ? 1 : 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={src}
              alt="Travel destination"
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
        {/* Uniform translucent dark overlay for guaranteed text contrast (no gradient) */}
        <div className="absolute inset-0 bg-ink/72" />
        {/* Subtle brand grid texture for premium depth */}
        <div aria-hidden className="bg-grid-brand absolute inset-0 opacity-40" />
      </div>

      {/* Floating decorative chips */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute left-6 top-[24%] hidden lg:block"
      >
        <div className="glass animate-float-slow flex items-center gap-3 rounded-2xl px-4 py-3 text-white shadow-premium-lg">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-brand">
            <Plane className="size-4" />
          </span>
          <div className="leading-tight">
            <p className="text-xs text-white/70">Now exploring</p>
            <p className="text-sm font-semibold">Dubai · Maldives · Makkah</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute right-6 top-[30%] hidden lg:block"
      >
        <div
          className="glass animate-float-slow flex items-center gap-3 rounded-2xl px-4 py-3 text-white shadow-premium-lg"
          style={{ animationDelay: "1.2s" }}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-leaf">
            <Star className="size-4 fill-white text-white" />
          </span>
          <div className="leading-tight">
            <p className="text-xs text-white/70">Rated by travellers</p>
            <p className="text-sm font-semibold">10+ years · 4.9★</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pt-28 pb-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md"
        >
          <Sparkles className="size-3.5 text-leaf" />
          Welcome to Buy The Way Journeys
        </motion.div>

        {/* Rotating headline */}
        <div className="mt-6 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={idx}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.2rem]"
            >
              <span className="text-white">
                {headlines[idx].accent}
              </span>
              <span className="mt-2 block text-2xl font-normal text-white/80 sm:text-3xl md:text-4xl">
                {headlines[idx].rest}
              </span>
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
                style={{ width: i === idx ? 44 : 18 }}
              >
                {i === idx && (
                  <motion.span
                    key={idx}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.2, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-gradient-brand"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          From dream vacations to spiritual journeys and seamless events — we've
          got you covered. Let experienced travel experts craft a plan designed
          just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link
            href="/contact"
            className="shimmer-sweep group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.03]"
          >
            Contact Us
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-leaf/40 bg-leaf/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-leaf/20"
          >
            <Phone className="size-4 text-leaf" />
            {siteConfig.phone}
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-6"
        >
          {[
            { value: "10+", label: "Years Experience" },
            { value: "4.9★", label: "Traveller Rating" },
            { value: "100%", label: "Best Price" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-0.5 text-xs text-white/70 sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-white"
          />
        </span>
      </motion.div>

      {/* Bottom location pill */}
      <div className="absolute bottom-6 right-6 hidden items-center gap-2 rounded-full glass px-4 py-2 text-xs text-white lg:flex">
        <MapPin className="size-3.5 text-leaf" />
        {siteConfig.address.line2} {siteConfig.address.line3}
      </div>
    </section>
  );
}
