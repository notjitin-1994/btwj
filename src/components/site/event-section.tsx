"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Clock,
  Plane,
  Train,
  Building2,
  Users,
  Award,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import { Reveal, StaggerGroup, staggerItem } from "@/components/site/motion-helpers";
import { usePlanner } from "@/lib/planner-store";

/* Canton Fair China event section for the landing page.
   Brand-compliant, modern, premium, animated. */

const itinerary = [
  { day: "Day 1", title: "Arrival — Guangzhou", desc: "Arrive at Guangzhou International Airport. Meet & assist, hotel transfer, welcome dinner. Overnight in Guangzhou.", icon: Plane },
  { day: "Day 2", title: "Canton Fair Phase 1", desc: "Full-day visit to the Canton Fair — the world's largest B2B trade show. Overnight in Guangzhou.", icon: Building2 },
  { day: "Day 3", title: "Business Visit & Sourcing", desc: "Supplier meetings, sourcing, and networking at the Canton Fair. Overnight in Guangzhou.", icon: Users },
  { day: "Day 4", title: "Training with Riyas Hakkim", desc: "Exclusive business solutions training session. Industry & market analysis. Visit Canton Fair Phase 1. Overnight in Guangzhou.", icon: Award },
  { day: "Day 5", title: "Guilin Day Tour", desc: "Bullet train to Guilin. Sightseeing, river cruise, overnight in a Guilin resort.", icon: Train },
  { day: "Day 6", title: "Business Solution Session", desc: "Half-day training with Riyas Hakkim. Bullet train back to Guangzhou. Overnight in Guangzhou.", icon: Sparkles },
  { day: "Day 7", title: "Departure", desc: "Breakfast, shopping, Canton Tower visit, airport transfer for departure.", icon: Plane },
];

const inclusions = [
  "7 Days / 6 Nights package",
  "4-star accommodation",
  "Bullet train experience",
  "Sightseeing & city tours",
  "River cruise in Guilin",
  "Canton Fair access",
  "Business support & supplier meetings",
  "Training sessions with Riyas Hakkim",
  "Lifetime access to China logistics",
  "Airport pick-up & drop-off",
  "English-speaking guide",
  "All meals included (B/L/D)",
];

export function EventSection() {
  const { openPlanner } = usePlanner();

  return (
    <section className="relative overflow-hidden bg-ink py-12 sm:py-17">
      {/* Decorative background */}
      <div aria-hidden className="bg-grid-brand pointer-events-none absolute inset-0 opacity-20" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 20% 10%, rgba(0,91,150,0.25), transparent 60%), radial-gradient(50% 60% at 80% 90%, rgba(76,175,80,0.15), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-leaf"
          >
            <Sparkles className="size-3.5" />
            Featured Event
          </motion.span>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Experience{" "}
              <span className="text-leaf">Canton Fair China</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Connect. Learn. Grow your business at the world's largest B2B trade
              show — with exclusive training by business influencer{" "}
              <span className="font-semibold text-white">Riyas Hakkim</span>.
            </p>
          </Reveal>
        </div>

        {/* Event highlights grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarDays, label: "Duration", value: "7 Days / 6 Nights" },
            { icon: MapPin, label: "Destination", value: "Guangzhou & Guilin, China" },
            { icon: Building2, label: "Event", value: "Canton Fair Phase 1" },
            { icon: Award, label: "Training", value: "With Riyas Hakkim" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand text-white">
                <item.icon className="size-5" />
              </span>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-white">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Flyer + CTA */}
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-premium-lg">
              <img
                src="/event/flyer.jpg"
                alt="Canton Fair China event flyer"
                className="w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                7D / 6N Package
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                An all-inclusive business travel package combining the Canton Fair
                experience with exclusive business solutions training. Explore
                China, source products, and learn from a business expert — all in
                one premium trip.
              </p>

              {/* Inclusions grid */}
              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {inclusions.slice(0, 6).map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-white/80">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-leaf" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/canton-fair-china"
                  className="shimmer-sweep group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.03]"
                >
                  View full itinerary
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <button
                  onClick={openPlanner}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
                >
                  Enquire now
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Itinerary preview (3 days) */}
        <div className="mt-10">
          <Reveal>
            <h3 className="text-center font-display text-2xl font-semibold text-white sm:text-3xl">
              7-Day Itinerary
            </h3>
          </Reveal>
          <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {itinerary.slice(0, 3).map((item) => (
              <motion.div
                key={item.day}
                variants={staggerItem}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-leaf">
                      {item.day}
                    </p>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/65">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </StaggerGroup>
          <div className="mt-5 text-center">
            <Link
              href="/canton-fair-china"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-leaf transition-transform hover:translate-x-0.5"
            >
              See all 7 days
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
