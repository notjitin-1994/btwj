"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { TripPlannerDialog } from "@/components/site/trip-planner";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   Photorealistic journey frames (AI-generated, saved to /public/journey)
   The full round-trip: home → airport → airplane → car → destination →
   fun → car back → airport back → home.
   ============================================================ */
const journeyFrames = [
  { src: "/journey/01-home.png", stage: "Departure" },
  { src: "/journey/02-airport.png", stage: "Check-in" },
  { src: "/journey/03-airplane.png", stage: "In flight" },
  { src: "/journey/04-car-drive.png", stage: "On the road" },
  { src: "/journey/05-destination.png", stage: "Arrival" },
  { src: "/journey/06-fun.png", stage: "Experiences" },
  { src: "/journey/07-car-back.png", stage: "Heading back" },
  { src: "/journey/08-airport-back.png", stage: "Homeward" },
  { src: "/journey/09-home-back.png", stage: "Welcome home" },
];

/* ============================================================
   Scrollytelling text beats — one per frame.
   Core content from the reference site, sequenced as a journey.
   Each beat fades IN at its segment start and OUT before the next.
   ============================================================ */
const beats = [
  {
    eyebrow: "Buy The Way Journeys",
    title: "Customized Travel Plans",
    sub: "— Designed just for you!",
    text: "Your journey begins at your doorstep. Exceptional travel experiences tailored to your needs — dream vacations, spiritual journeys, and seamless events, all in one place.",
    cta: true,
  },
  {
    eyebrow: "Step 01 — Departure",
    title: "Where every journey begins",
    text: "Pack your bags and leave the rest to us. From the moment you step out, your stress-free adventure is already underway.",
  },
  {
    eyebrow: "Step 02 — Check-in",
    title: "Smooth sailing from the start",
    text: "We handle your bookings, itinerary and check-ins. Experienced travel experts making travel stress-free and exciting.",
  },
  {
    eyebrow: "Step 03 — In flight",
    title: "Up in the clouds",
    text: "Sit back, relax, and let the journey unfold. Flights, transfers and accommodation — every detail, arranged for you.",
  },
  {
    eyebrow: "Step 04 — On the road",
    title: "The road ahead",
    text: "Scenic routes and comfortable transfers. Whether local gems or international wonders, the adventure is in the journey too.",
  },
  {
    eyebrow: "Step 05 — Arrival",
    title: "Arrive in style",
    text: "Top-rated hotels and luxury resorts at the best prices. Your perfect getaway, exactly as you imagined it.",
  },
  {
    eyebrow: "Step 06 — Experiences",
    title: "Make memories that last",
    text: "Adventure, relaxation, culture — experiences designed just for you. Discover and book the perfect tour for you.",
  },
  {
    eyebrow: "Step 07 — Heading back",
    title: "Until next time",
    text: "Cherished moments and new stories. The journey home begins, with memories to last a lifetime.",
  },
  {
    eyebrow: "Step 08 — Welcome home",
    title: "A journey well-travelled",
    text: "Back where it began. Let's plan your next unforgettable adventure — we've got you covered, every step of the way.",
    cta: true,
  },
];

const TOTAL = journeyFrames.length; // 9

export function Hero() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const imgRefs = React.useRef<(HTMLImageElement | null)[]>([]);
  const beatRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [plannerOpen, setPlannerOpen] = React.useState(false);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Preload all journey images so crossfades are instant
    journeyFrames.forEach((f) => {
      const img = new Image();
      img.src = f.src;
    });

    // smoothstep: 0 at edge, 1 at center, smooth S-curve between
    function smoothstep(edge0: number, edge1: number, x: number): number {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    }

    // Compute opacity for frame `i` at scroll progress `p` (0..1).
    // Each frame `i` is centered at c_i = (i + 0.5) / TOTAL.
    // Its opacity is 1 at c_i and falls off to 0 at the adjacent frame centers,
    // using smoothstep. This guarantees adjacent frames' opacities sum to ~1
    // at every boundary (direct image-to-image crossfade, no grey gap).
    // First frame holds at 1 until the first boundary; last frame holds at 1
    // after the last boundary (no fade-out at the very end).
    function opacityFor(i: number, p: number, total: number): number {
      const center = (i + 0.5) / total; // this frame's peak position
      const segSize = 1 / total;

      // Distance from this frame's center, in units of one segment
      const d = (p - center) / segSize; // 0 at center, ±0.5 at adjacent centers

      // Within half a segment of center → fully or partially visible
      if (Math.abs(d) >= 0.5) {
        // First frame: clamp to 1 before its segment (start of page)
        if (i === 0 && p < center) return 1;
        // Last frame: clamp to 1 after its segment (end of hero)
        if (i === total - 1 && p > center) return 1;
        return 0;
      }

      // At center → 1; at ±0.5 (adjacent boundary) → 0; smoothstep between
      // opacity = 1 - smoothstep(0, 0.5, |d|)  → 1 at d=0, 0 at d=0.5
      const op = 1 - smoothstep(0, 0.5, Math.abs(d));

      // First frame: hold at 1 until center (no fade-in at page start)
      if (i === 0 && p <= center) return 1;
      // Last frame: hold at 1 after center (no fade-out at end)
      if (i === total - 1 && p >= center) return 1;

      return op;
    }

    // Single ScrollTrigger that updates everything in one onUpdate
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;

        // Update image opacities + subtle Ken Burns scale
        journeyFrames.forEach((_, i) => {
          const img = imgRefs.current[i];
          if (!img) return;
          const op = opacityFor(i, p, TOTAL);
          img.style.opacity = String(op);
          // Ken Burns: scale 1.08 → 1.15 across its visible window
          const segStart = i / TOTAL;
          const segEnd = (i + 1) / TOTAL;
          const localP = Math.max(0, Math.min(1, (p - segStart) / (segEnd - segStart)));
          const scale = 1.08 + localP * 0.07;
          img.style.transform = `scale(${scale})`;
        });

        // Update text beat opacities (same crossfade logic, but text fades
        // out slightly earlier so there's no overlap of two text blocks)
        beats.forEach((_, i) => {
          const el = beatRefs.current[i];
          if (!el) return;
          const op = opacityFor(i, p, TOTAL);
          el.style.opacity = String(op);
          // Subtle vertical drift: rise as it fades out
          const center = (i + 0.5) / TOTAL;
          const segSize = 1 / TOTAL;
          const d = (p - center) / segSize;
          const y = Math.max(-0.5, Math.min(0.5, d)) * 24; // drift up to -12px
          el.style.transform = `translateY(${y}px)`;
        });
      },
    });

    return () => { st.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${TOTAL * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        {/* ===== Photorealistic journey images (direct crossfading) ===== */}
        {/* Solid bg-ink on container ensures the dark overlay never shows as a
            grey frame during crossfade — images blend directly into each other. */}
        <div className="absolute inset-0 bg-ink">
          {journeyFrames.map((frame, i) => (
            <img
              key={i}
              ref={(el) => { imgRefs.current[i] = el; }}
              src={frame.src}
              alt={frame.stage}
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
        </div>

        {/* Solid dark overlay for guaranteed text contrast */}
        <div className="absolute inset-0 bg-ink/55" />
        <div aria-hidden className="bg-grid-brand absolute inset-0 opacity-20" />

        {/* ===== Scrollytelling text beats (centered, crossfading, no CTA here) ===== */}
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 sm:px-8 lg:px-12">
          {beats.map((beat, i) => (
            <div
              key={i}
              ref={(el) => { beatRefs.current[i] = el; }}
              className="absolute max-w-3xl px-2 text-center sm:px-4"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
                {beat.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
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

        {/* ===== Persistent CTA buttons (always visible on all screens) ===== */}
        <div className="absolute bottom-10 left-1/2 z-20 flex w-[92%] max-w-md -translate-x-1/2 flex-col items-center gap-2.5 sm:w-auto sm:max-w-none sm:flex-row sm:gap-3">
          <button
            onClick={() => setPlannerOpen(true)}
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

      {/* ===== 6-step trip planning questionnaire ===== */}
      <TripPlannerDialog open={plannerOpen} onOpenChange={setPlannerOpen} />
    </section>
  );
}
