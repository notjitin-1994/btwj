"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import {
  Reveal,
  SectionHeading,
  StaggerGroup,
  staggerItem,
} from "@/components/site/motion-helpers";
import { DynamicIcon } from "@/components/site/icons";
import { services } from "@/lib/site-config";

const accentSolid: Record<string, string> = {
  brand: "bg-brand",
  teal: "bg-teal",
  leaf: "bg-leaf",
};

export function ServicesSection() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden bg-brand-wash py-20 sm:py-28">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              We're with you <span className="text-gradient-brand">every step</span>{" "}
              of the way!
            </>
          }
          description="From dream vacations and spiritual journeys to seamless events — one trusted partner for everything travel."
        />

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="border-gradient-animate group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-premium transition-shadow hover:shadow-premium-lg"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Solid dark overlay for text contrast */}
                <div className="absolute inset-0 bg-ink/55" />
                <span className={`absolute left-4 top-4 flex size-11 items-center justify-center rounded-xl ${accentSolid[service.accent]} text-white shadow-glow-blue`}>
                  <DynamicIcon name={service.icon} className="size-5" />
                </span>
                <span className="absolute bottom-3 left-4 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                  0{i + 1} · {service.short}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {service.highlights.slice(0, 2).map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-xs text-ink/70"
                    >
                      <Check className="mt-0.5 size-3.5 shrink-0 text-leaf" />
                      {h}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-5 inline-flex items-center justify-between gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-all group-hover:border-brand/30 group-hover:bg-brand/5 group-hover:text-brand"
                >
                  Explore service
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-3xl bg-gradient-brand-soft p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-display text-2xl font-semibold text-ink">
                Not sure which service fits your journey?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Talk to our experienced travel experts — we'll craft the perfect
                plan for you.
              </p>
            </div>
            <Link
              href="/services"
              className="shimmer-sweep inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 text-sm font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.03]"
            >
              View all services
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
