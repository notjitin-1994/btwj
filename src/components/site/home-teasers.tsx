"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Compass,
  Building2,
  Moon,
  PartyPopper,
  BadgePercent,
  CalendarCheck2,
  Search,
  CalendarCheck2 as CalendarIcon,
  Plane,
  Smile,
} from "lucide-react";
import {
  Reveal,
  SectionHeading,
  StaggerGroup,
  staggerItem,
} from "@/components/site/motion-helpers";
import { services, benefitCards, siteConfig } from "@/lib/site-config";
import { siteImages } from "@/lib/images";

const accentSolid: Record<string, string> = {
  brand: "bg-brand",
  teal: "bg-teal",
  leaf: "bg-leaf",
};

const iconMap: Record<string, typeof Compass> = {
  Compass,
  Building2,
  Moon,
  PartyPopper,
};

/* ===== Home-only: Services teaser (compact tiles, NOT full descriptions) ===== */
export function HomeServicesTeaser() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-brand-wash py-12 sm:py-17">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="What We Do"
            title={
              <>
                One partner for{" "}
                <span className="text-brand">every journey</span>
              </>
            }
            description="Tour packages, hotel & resort bookings, customized Umrah, and event management — we're with you every step of the way."
            className="max-w-2xl"
          />
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-brand/20 bg-white px-5 text-sm font-semibold text-brand shadow-premium transition-colors hover:bg-brand hover:text-white"
            >
              View all services
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = iconMap[s.icon] ?? Compass;
            return (
              <motion.div
                key={s.slug}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-premium transition-shadow hover:shadow-premium-lg"
              >
                <span className={`absolute inset-x-0 top-0 h-1 ${accentSolid[s.accent]}`} />
                <span
                  className={`flex size-12 items-center justify-center rounded-xl ${accentSolid[s.accent]} text-white shadow-glow-blue`}
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.short} — {" "}
                  {s.accent === "brand"
                    ? "local & international adventures."
                    : s.accent === "teal"
                    ? "comfortable stays, best prices."
                    : s.accent === "leaf"
                    ? "hassle-free, devotion-first."
                    : "seamless, unforgettable."}
                </p>
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand transition-transform hover:translate-x-0.5"
                >
                  Explore
                  <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ===== Home-only: About teaser (short intro, NOT the full about) ===== */
export function HomeAboutTeaser() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-17">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image side */}
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-premium-lg">
                <img
                  src={siteImages.about.vacation}
                  alt="Travellers enjoying a scenic journey"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Floating stat chip */}
              <div className="absolute -bottom-5 -right-3 rounded-2xl border border-border bg-white p-5 shadow-premium-lg sm:-right-5">
                <p className="font-display text-4xl font-bold text-brand">10+</p>
                <p className="text-xs font-semibold text-ink">Years of Experience</p>
                <p className="text-[11px] text-muted-foreground">crafting journeys</p>
              </div>
            </div>
          </Reveal>

          {/* Text side */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title={
                <>
                  Explore the{" "}
                  <span className="text-brand">Untold Experience</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                At Buy The Way Journeys, we specialize in providing exceptional
                travel experiences tailored to your needs. Whether you're looking
                for a dream vacation, a spiritual journey, or a seamless event,
                we've got you covered!
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <Link
                href="/about"
                className="group mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-brand"
              >
                Discover our story
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Home-only: How it works (3 steps) ===== */
export function HomeHowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Share Your Dream",
      text: "Tell us your destination, dates and travel style — we listen first.",
    },
    {
      icon: CalendarIcon,
      title: "We Craft The Plan",
      text: "Our experts design a tailor-made itinerary around you.",
    },
    {
      icon: Plane,
      title: "Travel Stress-Free",
      text: "We handle bookings, transfers and support — you just enjoy.",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-teal-wash py-12 sm:py-17">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title={
            <>
              Three steps to your{" "}
              <span className="text-brand">next journey</span>
            </>
          }
          description="Booking made so easy with Buy The Way Journeys."
        />
        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={staggerItem}
              className="group relative h-full rounded-3xl border border-border bg-white p-7 shadow-premium transition-all hover:-translate-y-1.5 hover:shadow-premium-lg"
            >
              <span className="absolute right-6 top-6 font-display text-5xl font-bold text-ink/[0.06]">
                0{i + 1}
              </span>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand text-white shadow-glow-blue">
                <step.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.text}
              </p>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 text-brand/30 md:block" />
              )}
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ===== Home-only: Why choose us teaser (compact 3 benefits) ===== */
export function HomeWhyTeaser() {
  const iconMap2: Record<string, typeof BadgePercent> = {
    BadgePercent,
    CalendarCheck2,
    Compass: Compass,
  };
  return (
    <section className="relative overflow-hidden py-12 sm:py-17">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={
            <>
              Our benefits —{" "}
              <span className="text-brand">why travel with us</span>
            </>
          }
          description="Whether you're exploring local gems or international wonders, we ensure a seamless and exciting journey."
        />
        <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-3">
          {benefitCards.map((card) => {
            const Icon = iconMap2[card.icon] ?? BadgePercent;
            const accent = accentSolid[card.accent];
            return (
              <motion.div
                key={card.title}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="group flex items-start gap-4 rounded-3xl border border-border bg-white p-6 shadow-premium transition-shadow hover:shadow-premium-lg"
              >
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${accent} text-white shadow-glow-blue`}
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </StaggerGroup>
        <Reveal delay={0.1}>
          <div className="mt-8 text-center">
            <Link
              href="/why-choose-us"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-transform hover:translate-x-0.5"
            >
              See all benefits
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===== Home-only: Contact CTA (compact, links to /contact — NOT the full form) ===== */
export function HomeContactCta() {
  const items = [
    { icon: Phone, label: "Call", value: siteConfig.phone, href: `tel:${siteConfig.phoneTel}` },
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MapPin, label: "Visit", value: "Mather Square, 682018", href: "/contact" },
  ];
  return (
    <section className="relative overflow-hidden bg-brand py-12 sm:py-14">
      <div aria-hidden className="bg-grid-brand pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white"
            >
              <Smile className="size-3.5 text-leaf" />
              Ready when you are
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl"
            >
              Book your next trip or event today
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base"
            >
              Tell us about your dream journey. Our experienced travel experts
              will craft a stress-free, exciting plan designed just for you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-7"
            >
              <Link
                href="/contact"
                className="shimmer-sweep group inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-brand shadow-lg transition-transform hover:scale-[1.03]"
              >
                Contact Us
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Quick contact cards */}
          <div className="space-y-3">
            {items.map((it, i) => (
              <motion.a
                key={it.label}
                href={it.href}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                whileHover={{ x: -4 }}
                className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md transition-colors hover:bg-white/15"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                  <it.icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                    {it.label}
                  </p>
                  <p className="truncate text-sm font-semibold text-white">
                    {it.value}
                  </p>
                </div>
                <ArrowUpRight className="ml-auto size-4 text-white/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
