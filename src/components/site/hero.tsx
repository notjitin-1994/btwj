"use client";

import * as React from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

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

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Preload all journey images so crossfades are instant
    journeyFrames.forEach((f) => {
      const img = new Image();
      img.src = f.src;
    });

    // Crossfade window: each frame fades out over the last 25% of its segment
    // while the next fades in over the first 25% of its segment — they overlap,
    // so there's never a fully-grey frame. Transitions are smooth.
    const CROSSFADE = 0.25;

    // Compute opacity for frame `i` at scroll progress `p` (0..1).
    // Frames overlap during crossfade so there's never a grey gap: at any
    // transition point, the outgoing frame and incoming frame are both
    // partially visible and their opacities sum to ~1.
    function opacityFor(i: number, p: number, total: number): number {
      const segSize = 1 / total;
      const center = (i + 0.5) / total; // center of this frame's segment
      const halfFade = segSize * (1 + CROSSFADE) / 2; // half-width of visibility

      // Distance from this frame's center, normalized to 0..1 within fade range
      const dist = Math.abs(p - center) / halfFade;
      if (dist >= 1) return 0;
      // Smooth ease-in-out curve for natural crossfade
      return 1 - (dist * dist * (3 - 2 * dist)); // smoothstep
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

        // Update text beat opacities (same crossfade logic)
        beats.forEach((_, i) => {
          const el = beatRefs.current[i];
          if (!el) return;
          el.style.opacity = String(opacityFor(i, p, TOTAL));
          // Subtle vertical drift
          const segStart = i / TOTAL;
          const segEnd = (i + 1) / TOTAL;
          const localP = Math.max(0, Math.min(1, (p - segStart) / (segEnd - segStart)));
          const y = (localP - 0.5) * 20; // drift up as it fades out
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
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ===== Photorealistic journey images (crossfading) ===== */}
        <div className="absolute inset-0">
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
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          {beats.map((beat, i) => (
            <div
              key={i}
              ref={(el) => { beatRefs.current[i] = el; }}
              className="absolute max-w-3xl text-center"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
                {beat.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
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
        <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="shimmer-sweep group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.03]"
          >
            Plan my trip
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
          >
            <Phone className="size-4 text-leaf" />
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
