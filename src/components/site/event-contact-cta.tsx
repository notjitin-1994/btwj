"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, MessageCircle, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { usePlanner } from "@/lib/planner-store";

export function EventContactCta() {
  const { openPlanner } = usePlanner();

  return (
    <section className="relative overflow-hidden bg-brand py-12 sm:py-17">
      <div aria-hidden className="bg-grid-brand pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80"
        >
          <Sparkles className="size-3.5 text-leaf" />
          Ready when you are
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.06 }}
          className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[2.75rem]"
        >
          Book your Canton Fair China experience today
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base"
        >
          Limited spots available. Enquire now to secure your place at the
          world's largest B2B trade show with exclusive business training.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={openPlanner}
            className="shimmer-sweep group inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-brand shadow-lg transition-transform hover:scale-[1.03]"
          >
            Enquire now
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
              "I'm interested in the Canton Fair China 7D/6N package. Please share more details."
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
          >
            <MessageCircle className="size-4 text-leaf" />
            WhatsApp us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
