"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

/**
 * WhatsApp-first CTA section for the landing page.
 * Replaces the old HomeContactCta (which linked to /contact with email).
 * Primary conversion: WhatsApp chat. Secondary: phone call.
 */
export function WhatsAppCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-14 sm:py-20">
      {/* Decorative gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 70% at 15% 20%, rgba(0,91,150,0.35), transparent 60%), radial-gradient(45% 60% at 85% 80%, rgba(0,136,169,0.25), transparent 60%)",
        }}
      />
      <div aria-hidden className="bg-grid-brand pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-leaf backdrop-blur"
        >
          <Sparkles className="size-3.5" />
          Ready when you are
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[2.75rem]"
        >
          Let's plan your next{" "}
          <span className="bg-gradient-to-r from-leaf to-teal bg-clip-text text-transparent">
            unforgettable
          </span>{" "}
          journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Tell us where you want to go. Our experienced travel experts will craft
          a stress-free, exciting plan designed just for you — no obligation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
              "Hi! I'd like to plan a trip. Can you help me?"
            )}`}
            target="_blank"
            rel="noreferrer"
            className="shimmer-sweep group inline-flex h-13 items-center gap-2 rounded-full bg-[#25D366] px-7 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
          >
            <MessageCircle className="size-5" />
            Chat on WhatsApp
          </a>
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="inline-flex h-13 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
          >
            <ArrowRight className="size-4 text-leaf" />
            Call {siteConfig.phone}
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-white/50"
        >
          <span>10+ years of experience</span>
          <span className="text-white/20">·</span>
          <span>500+ destinations</span>
          <span className="text-white/20">·</span>
          <span>Tailor-made itineraries</span>
          <span className="text-white/20">·</span>
          <span>24/7 support</span>
        </motion.div>
      </div>
    </section>
  );
}
