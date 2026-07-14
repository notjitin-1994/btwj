"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ArrowUpRight, Plane } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function CtaParallax() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] shadow-premium-lg">
          {/* Parallax bg */}
          <motion.div
            style={{ y }}
            className="absolute inset-0 -z-10 scale-110"
          >
            { }
            <img
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80"
              alt="Scenic travel destination"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 -z-10 bg-brand/88" />
          <div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
          />

          <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white backdrop-blur"
            >
              <Plane className="size-3.5 text-leaf" />
              Your journey starts here
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mx-auto mt-5 max-w-3xl font-display text-3xl font-semibold leading-[1.1] text-white sm:text-4xl md:text-5xl"
            >
              Customized travel plans —{" "}
              <span className="text-white">
                designed just for you
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base"
            >
              Experienced travel experts making travel stress-free and exciting.
              Let's plan something unforgettable together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                href="/contact"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-ink shadow-lg transition-transform hover:scale-[1.03]"
              >
                Contact Us
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                <Phone className="size-4" />
                {siteConfig.phone}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
