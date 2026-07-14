"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { usePlanner } from "@/lib/planner-store";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   241 video frames at /public/journey-frames/f-001.webp … f-241.webp
   Hero displays hard cuts driven by scroll — optimized for zero lag
   on desktop and touch via double-buffered preloaded images.
   ============================================================ */
const TOTAL_FRAMES = 241;
const frameSrc = (i: number) =>
  `/journey-frames/f-${String(i + 1).padStart(3, "0")}.webp`;

/* ============================================================
   Scrollytelling text beats — varied animation styles.
   ============================================================ */
const beats = [
  {
    eyebrow: "Buy The Way Journeys",
    title: "Customized Travel Plans",
    sub: "— Designed just for you!",
    text: "Your journey begins at your doorstep. Exceptional travel experiences tailored to your needs — dream vacations, spiritual journeys, and seamless events, all in one place.",
    anim: { dir: "up", dur: 0.8, titleColor: "#ffffff" },
  },
  {
    eyebrow: "Step 01 — Departure",
    title: "Where every journey begins",
    text: "Pack your bags and leave the rest to us. From the moment you step out, your stress-free adventure is already underway.",
    anim: { dir: "left", dur: 0.6, titleColor: "#4caf50" },
  },
  {
    eyebrow: "Step 02 — Check-in",
    title: "Smooth sailing from the start",
    text: "We handle your bookings, itinerary and check-ins. Experienced travel experts making travel stress-free and exciting.",
    anim: { dir: "scale", dur: 0.7, titleColor: "#0088a9" },
  },
  {
    eyebrow: "Step 03 — In flight",
    title: "Up in the clouds",
    text: "Sit back, relax, and let the journey unfold. Flights, transfers and accommodation — every detail, arranged for you.",
    anim: { dir: "right", dur: 0.65, titleColor: "#ffffff" },
  },
  {
    eyebrow: "Step 04 — Arrival",
    title: "Arrive in style",
    text: "Top-rated hotels and luxury resorts at the best prices. Your perfect getaway, exactly as you imagined it.",
    anim: { dir: "down", dur: 0.75, titleColor: "#4caf50" },
  },
  {
    eyebrow: "Step 05 — Experiences",
    title: "Make memories that last",
    text: "Adventure, relaxation, culture — experiences designed just for you. Discover and book the perfect tour for you.",
    anim: { dir: "rotate", dur: 0.9, titleColor: "#005b96" },
  },
  {
    eyebrow: "Step 06 — Welcome home",
    title: "A journey well-travelled",
    text: "Back where it began. Let's plan your next unforgettable adventure — we've got you covered, every step of the way.",
    anim: { dir: "up", dur: 0.8, titleColor: "#ffffff" },
  },
];

const TOTAL_BEATS = beats.length;

export function Hero() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<HTMLImageElement>(null);
  const beatRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const { openPlanner } = usePlanner();

  // --- Preload all frames progressively so they're cached & decoded ---
  React.useEffect(() => {
    let cancelled = false;
    const BATCH = 8;
    let idx = 0;

    const preloadBatch = () => {
      if (cancelled) return;
      const end = Math.min(idx + BATCH, TOTAL_FRAMES);
      for (let i = idx; i < end; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = frameSrc(i);
      }
      idx = end;
      if (idx < TOTAL_FRAMES) {
        if ("requestIdleCallback" in window) {
          (window as any).requestIdleCallback(preloadBatch, { timeout: 2000 });
        } else {
          setTimeout(preloadBatch, 80);
        }
      }
    };

    preloadBatch();
    return () => { cancelled = true; };
  }, []);

  // --- Scroll-driven animation ---
  React.useEffect(() => {
    const section = sectionRef.current;
    const frameImg = frameRef.current;
    if (!section || !frameImg) return;

    // --- Hard-cut frame switching — single img, direct src swap, NO transition ---
    // Every frame is displayed: no throttling, no skipping. Each of the 241
    // frames maps to a discrete scroll position and is shown immediately.
    let currentFrame = 0;

    const applyFrame = (frameIdx: number) => {
      if (frameIdx === currentFrame) return;
      currentFrame = frameIdx;
      // Direct src swap — no opacity, no transition, pure hard cut.
      frameImg.src = frameSrc(frameIdx);
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.2,
      onUpdate: (self) => {
        const frameIdx = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(self.progress * TOTAL_FRAMES))
        );
        applyFrame(frameIdx);
      },
    });

    // --- Text beat reveal animations ---
    // Consolidated: use a single onUpdate for all beats to reduce ScrollTrigger count
    const beatAnims: gsap.core.Tween[] = [];

    beats.forEach((beat, i) => {
      const el = beatRefs.current[i];
      if (!el) return;

      const segStart = i / TOTAL_BEATS;
      const segEnd = (i + 1) / TOTAL_BEATS;
      const dir = beat.anim.dir;
      const dur = beat.anim.dur;

      const initial: gsap.TweenVars = { opacity: 0 };
      const enterFrom: gsap.TweenVars = {};
      const exitTo: gsap.TweenVars = { opacity: 0 };

      switch (dir) {
        case "up":
          enterFrom.y = 60;
          exitTo.y = -60;
          break;
        case "down":
          enterFrom.y = -60;
          exitTo.y = 60;
          break;
        case "left":
          enterFrom.x = 80;
          exitTo.x = -80;
          break;
        case "right":
          enterFrom.x = -80;
          exitTo.x = 80;
          break;
        case "scale":
          enterFrom.scale = 0.7;
          exitTo.scale = 1.3;
          break;
        case "rotate":
          enterFrom.rotation = -8;
          enterFrom.scale = 0.8;
          exitTo.rotation = 8;
          exitTo.scale = 1.2;
          break;
      }

      // First beat starts visible
      if (i === 0) {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 });
      } else {
        gsap.set(el, { ...initial, ...enterFrom });
      }

      // Enter animation (skip first beat)
      if (i > 0) {
        const enterTween = gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: dur,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: `top+=${segStart * 100}% top`,
            end: `top+=${segStart * 100 + (segEnd - segStart) * 30}% top`,
            scrub: 0.3,
          },
        });
        beatAnims.push(enterTween);
      }

      // Exit animation
      if (i < TOTAL_BEATS - 1) {
        const exitTween = gsap.to(el, {
          ...exitTo,
          duration: dur * 0.8,
          ease: "power2.in",
          scrollTrigger: {
            trigger: section,
            start: `top+=${segStart * 100 + (segEnd - segStart) * 70}% top`,
            end: `top+=${segEnd * 100}% top`,
            scrub: 0.3,
          },
        });
        beatAnims.push(exitTween);
      }
    });

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    return () => {
      st.kill();
      beatAnims.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-ink"
      style={{ height: `${TOTAL_BEATS * 100}dvh` }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden bg-ink"
        style={{ height: "100dvh" }}
      >
        {/* ===== Video frames — single img, hard cuts, NO transition ===== */}
        <div className="absolute inset-0 bg-ink">
          <img
            ref={frameRef}
            src={frameSrc(0)}
            alt="Travel journey"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Solid dark overlay for guaranteed text contrast */}
        <div className="absolute inset-0 bg-ink/55" />

        {/* ===== Scrollytelling text beats with varied animations ===== */}
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 sm:px-8 lg:px-12">
          {beats.map((beat, i) => (
            <div
              key={i}
              ref={(el) => { beatRefs.current[i] = el; }}
              className="absolute max-w-3xl px-2 text-center sm:px-4"
              style={{ opacity: i === 0 ? 1 : 0, willChange: "transform, opacity" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
                {beat.eyebrow}
              </p>
              <h1
                className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
                style={{ color: beat.anim.titleColor }}
              >
                {beat.title}
                {beat.sub && (
                  <span className="mt-2 block text-2xl font-normal text-white/80 sm:text-3xl md:text-4xl">
                    {beat.sub}
                  </span>
                )}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                {beat.text}
              </p>
            </div>
          ))}
        </div>

        {/* ===== Persistent CTA buttons (always visible) ===== */}
        <div className="absolute bottom-10 left-1/2 z-20 flex w-[92%] max-w-md -translate-x-1/2 flex-col items-center gap-2.5 sm:w-auto sm:max-w-none sm:flex-row sm:gap-3">
          <button
            onClick={openPlanner}
            className="shimmer-sweep group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.03] sm:h-13 sm:w-auto sm:px-7"
          >
            Plan my trip
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white/5 px-4 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-white/15 sm:h-13 sm:w-auto sm:gap-2 sm:px-7 sm:text-sm"
          >
            <Phone className="size-4 shrink-0 text-leaf" />
            <span className="truncate">{siteConfig.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
