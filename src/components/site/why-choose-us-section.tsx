"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  Reveal,
  SectionHeading,
  StaggerGroup,
  staggerItem,
} from "@/components/site/motion-helpers";
import { DynamicIcon } from "@/components/site/icons";
import { benefitCards } from "@/lib/site-config";

const accentMap = {
  brand: {
    ring: "ring-brand/20",
    gradient: "bg-brand",
    text: "text-brand",
    glow: "bg-brand/30",
    shadow: "shadow-glow-blue",
  },
  teal: {
    ring: "ring-teal/20",
    gradient: "bg-teal",
    text: "text-brand",
    glow: "bg-teal/30",
    shadow: "shadow-glow",
  },
  leaf: {
    ring: "ring-leaf/20",
    gradient: "bg-leaf",
    text: "text-brand",
    glow: "bg-leaf/30",
    shadow: "shadow-glow-green",
  },
} as const;

export function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="relative scroll-mt-24 overflow-hidden bg-teal-wash py-12 sm:py-17"
    >
      <div
        aria-hidden
        className="bg-dots pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 size-80 rounded-full bg-brand/10 opacity-60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 size-80 rounded-full bg-leaf/10 opacity-60 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={
            <>
              Our Benefits List —{" "}
              <span className="text-gradient-brand">Why Choose Us?</span>
            </>
          }
          description="Whether you're exploring local gems or international wonders, we ensure a seamless and exciting journey."
        />

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {benefitCards.map((card, i) => {
            const accent = accentMap[card.accent];
            return (
              <motion.div
                key={card.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className="border-gradient-animate group relative overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-premium transition-shadow hover:shadow-premium-lg"
              >
                {/* Number watermark */}
                <span className="pointer-events-none absolute -right-2 -top-4 font-display text-[7rem] font-bold leading-none text-ink/[0.04] transition-colors group-hover:text-brand/[0.08]">
                  0{i + 1}
                </span>
                {/* Brand accent top bar */}
                <span className={`absolute inset-x-0 top-0 h-1 ${accent.gradient}`} />

                <div className="relative">
                  <span
                    className={`relative flex size-14 items-center justify-center rounded-2xl ${accent.gradient} text-white ${accent.shadow} ring-1 ${accent.ring}`}
                  >
                    <DynamicIcon name={card.icon} className="size-6" />
                    <span
                      className={`absolute inset-0 -z-10 rounded-2xl ${accent.glow} blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    />
                  </span>

                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${accent.text}`}>
                      Benefit {String(i + 1).padStart(2, "0")}
                    </span>
                    <Link
                      href="/why-choose-us"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand transition-transform hover:translate-x-0.5"
                    >
                      Learn more
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </StaggerGroup>

        {/* Feature strip */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-4 rounded-3xl border border-brand/15 bg-gradient-brand-soft p-6 shadow-premium sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "24/7 Travel Support", value: "Always on" },
              { label: "Tailor-made Itineraries", value: "Just for you" },
              { label: "Trusted Local Guides", value: "Verified" },
              { label: "Seamless Booking", value: "Minutes" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 rounded-2xl bg-white/60 p-3 backdrop-blur">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow">
                  <span className="size-2 rounded-full bg-white" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{f.label}</p>
                  <p className="text-xs text-muted-foreground">{f.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
