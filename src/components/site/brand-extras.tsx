"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Star, Sparkles, Plane, Globe2, ShieldCheck } from "lucide-react";

/* ===== Magic UI style marquee trust band ===== */
const marqueeItems = [
  { icon: ShieldCheck, label: "Best Price Guarantee" },
  { icon: Plane, label: "Inbound & Outbound Tours" },
  { icon: Sparkles, label: "Tailor-made Itineraries" },
  { icon: ShieldCheck, label: "10+ Years of Experience" },
  { icon: Globe2, label: "Tour Packages" },
  { icon: Star, label: "Hotel & Resort Bookings" },
  { icon: Sparkles, label: "Customized Umrah Packages" },
  { icon: Globe2, label: "Event Management" },
];

export function MarqueeBand() {
  // duplicate items for seamless loop
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-white/10 bg-brand-band py-4"
    >
      <div className="bg-dots-brand pointer-events-none absolute inset-0 opacity-30" />
      <div className="mask-fade-x relative flex">
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
          {items.map((item, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-white/90"
            >
              <item.icon className="size-4 text-leaf" />
              {item.label}
              <span className="ml-6 size-1.5 rounded-full bg-teal/70" />
            </span>
          ))}
        </div>
        <div
          className="animate-marquee flex shrink-0 items-center gap-8 pr-8"
          aria-hidden
        >
          {items.map((item, i) => (
            <span
              key={`dup-${i}`}
              className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-white/90"
            >
              <item.icon className="size-4 text-leaf" />
              {item.label}
              <span className="ml-6 size-1.5 rounded-full bg-teal/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Animated number counter ===== */
export function Counter({
  value,
  suffix = "",
  duration = 1.8,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, {
    duration: duration * 1000,
    bounce: 0,
  });
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  React.useEffect(() => {
    return spring.on("change", (v) => {
      setDisplay(Math.round(v).toLocaleString());
    });
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/* ===== Brand accent band — deep blue/teal/green showcase ===== */
export function BrandAccentBand() {
  const features = [
    {
      k: "10+",
      label: "Years of Experience",
      desc: "A decade of crafting journeys travellers cherish.",
    },
    {
      k: "Best",
      label: "Tour Selection",
      desc: "Discover and book the perfect tour for you!!",
    },
    {
      k: "Best",
      label: "Price Guarantee",
      desc: "We have got the best deals for you!!",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-brand-band py-20 sm:py-24">
      <div aria-hidden className="bg-grid-brand pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-leaf" />
            The Buy The Way advantage
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[2.75rem]"
          >
            Trusted by hundreds of travellers,{" "}
            <span className="text-white">
              designed for you
            </span>
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              className="border-gradient-animate group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-8 text-center backdrop-blur-md transition-colors hover:bg-white/10"
            >
              <p className="font-display text-5xl font-bold text-white sm:text-6xl">
                {f.k}
              </p>
              <p className="mt-3 text-base font-semibold text-white">
                {f.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
