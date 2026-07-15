"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  mobileImage,
  crumbs = [],
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  image: string;
  mobileImage?: string;
  crumbs?: Crumb[];
  align?: "left" | "center";
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  // Use mobile image on small screens, desktop image on larger screens
  const bgImage = mobileImage ?? image;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[62vh] items-end overflow-hidden pt-28"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
        {/* Mobile image (hidden on desktop) */}
        {mobileImage && (
          <img
            src={mobileImage}
            alt=""
            className="h-full w-full object-cover md:hidden"
          />
        )}
        {/* Desktop image (hidden on mobile if mobileImage is provided) */}
        <img
          src={bgImage}
          alt=""
          className={`h-full w-full object-cover ${mobileImage ? "hidden md:block" : ""}`}
        />
      </motion.div>
      {/* Uniform translucent dark overlay for guaranteed text contrast (no gradient) */}
      <div className="absolute inset-0 -z-10 bg-ink/72" />

      <motion.div
        style={{ opacity }}
        className={`mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className={`mb-5 flex items-center gap-1.5 text-xs text-white/70 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 transition-colors hover:text-white"
          >
            <Home className="size-3.5" />
            Home
          </Link>
          {crumbs.map((c) => (
            <React.Fragment key={c.label}>
              <ChevronRight className="size-3.5 text-white/40" />
              {c.href ? (
                <Link
                  href={c.href}
                  className="transition-colors hover:text-white"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="text-white">{c.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90"
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className={`mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
