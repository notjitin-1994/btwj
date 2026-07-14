"use client";

import * as React from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 40;

/* ============================================================
   Scrollytelling copy beats (core content from reference site,
   presented as a narrative that unfolds on scroll)
   ============================================================ */
const beats = [
  {
    eyebrow: "Buy The Way Journeys",
    title: "Every journey begins with a single step",
    text: "Customized travel plans — designed just for you. From golden deserts to serene backwaters and sacred pilgrimages, your story is waiting to be written.",
  },
  {
    eyebrow: "Step 01 — Dream",
    title: "Where will you go?",
    text: "Whether you're looking for a dream vacation, a spiritual journey, or a seamless event — tell us your destination and we'll take care of the rest.",
  },
  {
    eyebrow: "Step 02 — Design",
    title: "We craft the perfect plan",
    text: "Experienced travel experts design a tailor-made itinerary around your dreams, pace and budget. Every detail, handled.",
  },
  {
    eyebrow: "Step 03 — Travel",
    title: "You travel stress-free",
    text: "Flights, accommodation, transfers and guided tours — all arranged for a hassle-free journey. Making travel stress-free and exciting.",
  },
];

/* ============================================================
   Frame-by-frame canvas renderer.
   Draws frame `f` (0..39) of a travel-journey illustration:
   a plane tracing a dashed route across a landscape that
   transitions city → mountains → ocean → tropical destination.
   ============================================================ */
function drawFrame(ctx: CanvasRenderingContext2D, f: number, w: number, h: number) {
  const p = TOTAL_FRAMES > 1 ? f / (TOTAL_FRAMES - 1) : 0; // 0..1 progress
  ctx.clearRect(0, 0, w, h);

  // --- Sky (solid brand-tinted dark for contrast with text) ---
  ctx.fillStyle = "#0a2540";
  ctx.fillRect(0, 0, w, h);

  // Subtle star/dot field (static, decorative)
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < 60; i++) {
    const sx = ((i * 137.5) % w);
    const sy = ((i * 91.3) % (h * 0.6));
    ctx.fillRect(sx, sy, 1.5, 1.5);
  }

  // --- Sun / glow orb that arcs across the sky based on progress ---
  const sunX = w * (0.12 + p * 0.76);
  const sunY = h * 0.55 - Math.sin(p * Math.PI) * h * 0.32;
  const sunR = Math.max(8, h * 0.06);
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 3);
  sunGrad.addColorStop(0, "rgba(76,175,80,0.9)");
  sunGrad.addColorStop(0.4, "rgba(0,136,169,0.4)");
  sunGrad.addColorStop(1, "rgba(0,91,150,0)");
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR * 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#4caf50";
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
  ctx.fill();

  // --- Clouds (drift left as progress increases) ---
  ctx.fillStyle = "rgba(255,255,255,0.10)";
  const cloudOffset = p * w * 0.3;
  for (let i = 0; i < 5; i++) {
    const cx = ((i * 220 - cloudOffset) % (w + 200)) - 100;
    const cy = h * (0.12 + (i % 3) * 0.08);
    drawCloud(ctx, cx, cy, 30 + (i % 2) * 14);
  }

  // --- Landscape layers (parallax, revealed progressively) ---
  // Layer 1: distant city skyline (fades out by 35%)
  const cityAlpha = Math.max(0, 1 - p * 2.8);
  if (cityAlpha > 0.02) {
    ctx.globalAlpha = cityAlpha;
    drawCitySkyline(ctx, w, h, "#005b96");
    ctx.globalAlpha = 1;
  }

  // Layer 2: mountains (peak visibility 25%-70%)
  const mtnAlpha = p < 0.25 ? p / 0.25 : p > 0.7 ? Math.max(0, 1 - (p - 0.7) / 0.3) : 1;
  if (mtnAlpha > 0.02) {
    ctx.globalAlpha = mtnAlpha;
    drawMountains(ctx, w, h, "#003d66");
    ctx.globalAlpha = 1;
  }

  // Layer 3: ocean waves (visible 50%-100%)
  const oceanAlpha = p < 0.5 ? 0 : Math.min(1, (p - 0.5) / 0.2);
  if (oceanAlpha > 0.02) {
    ctx.globalAlpha = oceanAlpha;
    drawOcean(ctx, w, h, p, "#001f3f");
    ctx.globalAlpha = 1;
  }

  // Layer 4: tropical destination (palm trees, visible 75%-100%)
  const tropicalAlpha = p < 0.75 ? 0 : Math.min(1, (p - 0.75) / 0.15);
  if (tropicalAlpha > 0.02) {
    ctx.globalAlpha = tropicalAlpha;
    drawTropical(ctx, w, h, "#0a2540");
    ctx.globalAlpha = 1;
  }

  // --- The journey route (dashed curved path) ---
  const routeAlpha = Math.min(1, p * 3);
  ctx.globalAlpha = routeAlpha * 0.6;
  ctx.strokeStyle = "#4caf50";
  ctx.lineWidth = 2.5;
  ctx.setLineDash([10, 8]);
  ctx.lineCap = "round";
  ctx.beginPath();
  const pathPoints = routePath(w, h);
  ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
  for (let i = 1; i < pathPoints.length; i++) {
    ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
  }
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  // --- Destination marker pin (appears at end) ---
  if (p > 0.85) {
    const endP = pathPoints[pathPoints.length - 1];
    const pinAlpha = Math.min(1, (p - 0.85) / 0.1);
    ctx.globalAlpha = pinAlpha;
    drawPin(ctx, endP.x, endP.y - 6);
    ctx.globalAlpha = 1;
  }

  // --- The plane, travelling along the route ---
  const planePos = pointOnPath(pathPoints, p);
  const planeAngle = angleOnPath(pathPoints, p);
  drawPlane(ctx, planePos.x, planePos.y, planeAngle);

  // --- Progress frame counter (subtle, bottom-left) ---
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.font = "11px monospace";
  ctx.fillText(`frame ${String(f + 1).padStart(2, "0")} / ${TOTAL_FRAMES}`, 16, h - 16);
}

/* --- Drawing helpers --- */
function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.arc(x + r * 0.8, y + r * 0.2, r * 0.7, 0, Math.PI * 2);
  ctx.arc(x - r * 0.8, y + r * 0.2, r * 0.6, 0, Math.PI * 2);
  ctx.arc(x + r * 0.3, y - r * 0.4, r * 0.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawCitySkyline(ctx: CanvasRenderingContext2D, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  const baseY = h * 0.82;
  const buildings = [
    [0.05, 0.12, 0.08],
    [0.13, 0.20, 0.06],
    [0.19, 0.10, 0.10],
    [0.29, 0.26, 0.07],
    [0.36, 0.16, 0.09],
    [0.45, 0.22, 0.05],
    [0.50, 0.14, 0.08],
    [0.58, 0.28, 0.06],
    [0.64, 0.18, 0.07],
    [0.71, 0.12, 0.09],
    [0.80, 0.24, 0.06],
    [0.86, 0.16, 0.08],
    [0.94, 0.20, 0.07],
  ];
  buildings.forEach(([bx, bh, bw]) => {
    const x = w * bx;
    const bldH = h * bh;
    const bldW = w * bw;
    ctx.fillRect(x, baseY - bldH, bldW, bldH);
    // windows
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    for (let wy = baseY - bldH + 6; wy < baseY - 6; wy += 10) {
      for (let wx = x + 4; wx < x + bldW - 4; wx += 8) {
        ctx.fillRect(wx, wy, 3, 4);
      }
    }
    ctx.fillStyle = color;
  });
  ctx.fillRect(0, baseY, w, h - baseY);
}

function drawMountains(ctx: CanvasRenderingContext2D, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  const baseY = h * 0.82;
  ctx.beginPath();
  ctx.moveTo(0, baseY);
  const peaks = [0.0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1.0];
  const heights = [0.05, 0.22, 0.12, 0.3, 0.18, 0.25, 0.1, 0.06];
  peaks.forEach((px, i) => {
    ctx.lineTo(w * px, baseY - h * heights[i]);
    if (i < peaks.length - 1) {
      ctx.lineTo(w * (px + peaks[i + 1]) / 2, baseY - h * heights[i] * 0.4);
    }
  });
  ctx.lineTo(w, baseY);
  ctx.closePath();
  ctx.fill();
  // snow caps
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  peaks.forEach((px, i) => {
    if (heights[i] > 0.15) {
      ctx.beginPath();
      ctx.moveTo(w * px, baseY - h * heights[i]);
      ctx.lineTo(w * px - 12, baseY - h * heights[i] + 14);
      ctx.lineTo(w * px + 12, baseY - h * heights[i] + 14);
      ctx.closePath();
      ctx.fill();
    }
  });
}

function drawOcean(ctx: CanvasRenderingContext2D, w: number, h: number, p: number, color: string) {
  ctx.fillStyle = color;
  const baseY = h * 0.72;
  ctx.fillRect(0, baseY, w, h - baseY);
  // wave lines
  ctx.strokeStyle = "rgba(0,136,169,0.4)";
  ctx.lineWidth = 1.5;
  for (let row = 0; row < 5; row++) {
    ctx.beginPath();
    const wy = baseY + row * 16 + 8;
    for (let x = 0; x <= w; x += 6) {
      const y = wy + Math.sin((x * 0.03) + p * 10 + row) * 3;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

function drawTropical(ctx: CanvasRenderingContext2D, w: number, h: number, color: string) {
  // sand base
  ctx.fillStyle = "rgba(255,220,150,0.15)";
  ctx.fillRect(0, h * 0.78, w, h * 0.22);
  // palm trees
  const palms = [0.15, 0.82];
  palms.forEach((px) => {
    const x = w * px;
    const y = h * 0.78;
    // trunk
    ctx.strokeStyle = "#3d2b1f";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + 8, y - 30, x + 14, y - 60);
    ctx.stroke();
    // leaves
    ctx.fillStyle = "#4caf50";
    for (let a = 0; a < 6; a++) {
      const angle = (a / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.ellipse(x + 14 + Math.cos(angle) * 18, y - 60 + Math.sin(angle) * 12, 18, 6, angle, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function routePath(w: number, h: number) {
  const pts: { x: number; y: number }[] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = w * (0.08 + t * 0.84);
    const y = h * (0.68 - Math.sin(t * Math.PI) * 0.38);
    pts.push({ x, y });
  }
  return pts;
}

function pointOnPath(pts: { x: number; y: number }[], t: number) {
  const idx = t * (pts.length - 1);
  const i = Math.floor(idx);
  const frac = idx - i;
  if (i >= pts.length - 1) return pts[pts.length - 1];
  return {
    x: pts[i].x + (pts[i + 1].x - pts[i].x) * frac,
    y: pts[i].y + (pts[i + 1].y - pts[i].y) * frac,
  };
}

function angleOnPath(pts: { x: number; y: number }[], t: number) {
  const idx = t * (pts.length - 1);
  const i = Math.max(0, Math.min(pts.length - 2, Math.floor(idx)));
  return Math.atan2(pts[i + 1].y - pts[i].y, pts[i + 1].x - pts[i].x);
}

function drawPlane(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  // glow
  ctx.shadowColor = "#0088a9";
  ctx.shadowBlur = 18;
  // body
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(0, 0, 14, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  // wings
  ctx.fillStyle = "#005b96";
  ctx.beginPath();
  ctx.moveTo(-2, 0);
  ctx.lineTo(-8, -8);
  ctx.lineTo(-4, 0);
  ctx.lineTo(-8, 8);
  ctx.closePath();
  ctx.fill();
  // tail
  ctx.beginPath();
  ctx.moveTo(-12, 0);
  ctx.lineTo(-16, -6);
  ctx.lineTo(-13, 0);
  ctx.lineTo(-16, 6);
  ctx.closePath();
  ctx.fill();
  // nose
  ctx.fillStyle = "#4caf50";
  ctx.beginPath();
  ctx.arc(12, 0, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPin(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.shadowColor = "#4caf50";
  ctx.shadowBlur = 12;
  ctx.fillStyle = "#4caf50";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - 8, y - 14, x - 8, y - 22, x, y - 22);
  ctx.bezierCurveTo(x + 8, y - 22, x + 8, y - 14, x, y);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(x, y - 16, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/* ============================================================
   The scrollytelling hero component
   ============================================================ */
export function Hero() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stickyRef = React.useRef<HTMLDivElement>(null);
  const beatRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const currentFrame = React.useRef(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Hi-DPI canvas sizing
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      drawFrame(ctx, currentFrame.current, rect.width, rect.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      onUpdate: (self) => {
        const frame = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(self.progress * TOTAL_FRAMES)
        );
        if (frame !== currentFrame.current) {
          currentFrame.current = frame;
          const rect = canvas.getBoundingClientRect();
          drawFrame(ctx, frame, rect.width, rect.height);
        }
      },
    });

    // Scrollytelling text beats: fade in/out at scroll progress thresholds
    const beatTriggers = beats.map((_, i) => {
      const segStart = i / beats.length;
      const segEnd = (i + 1) / beats.length;
      const el = beatRefs.current[i];
      if (!el) return null;
      return gsap.fromTo(
        el,
        { opacity: i === 0 ? 1 : 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: `top+=${segStart * 100}% top`,
            end: `top+=${segEnd * 100}% top`,
            scrub: 0.6,
          },
        }
      );
    });

    // Progress dots: fill the active dot with brand green
    const dotTriggers = beats.map((_, i) => {
      const dot = dotRefs.current[i];
      if (!dot) return null;
      const segStart = i / beats.length;
      return gsap.fromTo(
        dot,
        { backgroundColor: "rgba(255,255,255,0.2)" },
        {
          backgroundColor: "rgba(76,175,80,1)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: `top+=${segStart * 100}% top`,
            end: `top+=${(segStart + 1 / beats.length) * 100}% top`,
            scrub: 0.5,
          },
        }
      );
    });

    return () => {
      st.kill();
      beatTriggers.forEach((bt) => bt?.kill());
      dotTriggers.forEach((dt) => dt?.kill());
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: `${beats.length * 100}vh` }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Canvas background (the 40-frame animated graphic) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
        />
        {/* Solid dark overlay for text contrast */}
        <div className="absolute inset-0 bg-ink/35" />

        {/* Scrollytelling text beats (overlaid, centered) */}
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
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                {beat.text}
              </p>

              {/* CTA only on the first beat */}
              {i === 0 && (
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/contact"
                    className="shimmer-sweep group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.03]"
                  >
                    Plan my trip
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a
                    href={`tel:${siteConfig.phoneTel}`}
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
                  >
                    <Phone className="size-4 text-leaf" />
                    {siteConfig.phone}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Scroll progress indicator (right side) */}
        <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex">
          {beats.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotRefs.current[i] = el; }}
              className="h-8 w-1 rounded-full bg-white/20"
            />
          ))}
        </div>

        {/* Scroll hint (bottom) */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to journey</span>
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
