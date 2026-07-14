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

   Industry-standard frame-by-frame scroll video using HTML5 Canvas:
   - All frames are pre-decoded into ImageBitmap objects (GPU-accelerated)
   - Canvas drawImage is near-instant (no img.src decode lag)
   - Zero flicker: the canvas always shows the last drawn frame
   - Smooth 60fps: drawing to canvas is a single GPU operation
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
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const beatRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const { openPlanner } = usePlanner();

  // --- Preload all frames as ImageBitmap (GPU-decoded, instant draw) ---
  const bitmapsRef = React.useRef<(ImageBitmap | null)[]>([]);
  const [loadedCount, setLoadedCount] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;

    const preloadFrame = async (i: number) => {
      if (cancelled || bitmapsRef.current[i]) return;
      try {
        const res = await fetch(frameSrc(i));
        const blob = await res.blob();
        const bitmap = await createImageBitmap(blob);
        if (!cancelled) {
          bitmapsRef.current[i] = bitmap;
          setLoadedCount((c) => c + 1);
        }
      } catch {
        // Fallback: skip failed frames
      }
    };

    // Preload in batches of 4 to avoid overwhelming the network
    const BATCH = 4;
    let idx = 0;
    const preloadBatch = () => {
      if (cancelled) return;
      const end = Math.min(idx + BATCH, TOTAL_FRAMES);
      for (let i = idx; i < end; i++) {
        preloadFrame(i);
      }
      idx = end;
      if (idx < TOTAL_FRAMES) {
        if ("requestIdleCallback" in window) {
          (window as any).requestIdleCallback(preloadBatch, { timeout: 1500 });
        } else {
          setTimeout(preloadBatch, 60);
        }
      }
    };

    preloadBatch();
    return () => { cancelled = true; };
  }, []);

  // --- Canvas drawing + scroll-driven frame switching ---
  React.useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Consistent DPR — used for both sizing and drawing
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Size canvas to device pixels for crisp rendering
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      // Reset transform before scaling (ctx.scale is cumulative)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Redraw current frame after resize
      drawCurrent();
    };

    let currentFrame = 0;

    // Draw a frame to the canvas — object-fit: cover, fills entire canvas
    const drawFrame = (idx: number) => {
      const bitmap = bitmapsRef.current[idx];
      if (!bitmap) return; // not loaded yet — keep showing last frame (no flicker)

      // Use CSS pixel dimensions (canvas internal size / dpr)
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const iw = bitmap.width;
      const ih = bitmap.height;

      // object-fit: cover — scale to fill the entire area, crop overflow
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      // Fill background first (prevents any edge gaps)
      ctx.fillStyle = "#0a2540";
      ctx.fillRect(0, 0, cw, ch);
      // Draw the image to cover the entire canvas
      ctx.drawImage(bitmap, dx, dy, dw, dh);
    };

    const drawCurrent = () => drawFrame(currentFrame);

    resize();
    window.addEventListener("resize", resize);

    // --- Scroll-driven frame switching ---
    // Map scroll progress to frame index and draw immediately.
    // Canvas drawImage is near-instant (no decode lag) so every frame
    // shows smoothly with zero flicker.
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        const frameIdx = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(self.progress * TOTAL_FRAMES))
        );
        if (frameIdx !== currentFrame) {
          currentFrame = frameIdx;
          drawFrame(frameIdx);
        }
      },
    });

    // Redraw periodically as frames load (so we show the best available frame)
    const loadInterval = setInterval(() => {
      if (loadedCount >= TOTAL_FRAMES) {
        clearInterval(loadInterval);
        return;
      }
      drawCurrent();
    }, 200);

    // --- Text beat reveal animations ---
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
          enterFrom.y = 60; exitTo.y = -60; break;
        case "down":
          enterFrom.y = -60; exitTo.y = 60; break;
        case "left":
          enterFrom.x = 80; exitTo.x = -80; break;
        case "right":
          enterFrom.x = -80; exitTo.x = 80; break;
        case "scale":
          enterFrom.scale = 0.7; exitTo.scale = 1.3; break;
        case "rotate":
          enterFrom.rotation = -8; enterFrom.scale = 0.8;
          exitTo.rotation = 8; exitTo.scale = 1.2; break;
      }

      if (i === 0) {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 });
      } else {
        gsap.set(el, { ...initial, ...enterFrom });
      }

      if (i > 0) {
        beatAnims.push(gsap.to(el, {
          opacity: 1, x: 0, y: 0, scale: 1, rotation: 0,
          duration: dur, ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: `top+=${segStart * 100}% top`,
            end: `top+=${segStart * 100 + (segEnd - segStart) * 30}% top`,
            scrub: 0.3,
          },
        }));
      }

      if (i < TOTAL_BEATS - 1) {
        beatAnims.push(gsap.to(el, {
          ...exitTo, duration: dur * 0.8, ease: "power2.in",
          scrollTrigger: {
            trigger: section,
            start: `top+=${segStart * 100 + (segEnd - segStart) * 70}% top`,
            end: `top+=${segEnd * 100}% top`,
            scrub: 0.3,
          },
        }));
      }
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
      beatAnims.forEach((t) => t.kill());
      window.removeEventListener("resize", resize);
      clearInterval(loadInterval);
    };
  }, [loadedCount]);

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
        {/* ===== Canvas — frame-by-frame scroll video (zero flicker) ===== */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ display: "block" }}
        />

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
