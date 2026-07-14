"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight, Compass, Instagram } from "lucide-react";
import { siteConfig, services, mainNav } from "@/lib/site-config";

const quickLinks = mainNav.filter((n) => n.label !== "Our Services");

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-white text-ink">
      {/* Subtle brand-tinted backdrop */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.5]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA banner */}
        <div className="grid gap-6 border-b border-border py-12 md:grid-cols-[1.4fr_1fr] md:py-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Ready when you are
            </span>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Let's plan your next{" "}
              <span className="text-brand">unforgettable</span> journey
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Tell us where you want to go. Our experienced travel experts will
              craft a stress-free, exciting plan designed just for you.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link
              href="/contact"
              className="shimmer-sweep group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.03]"
            >
              Start planning
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brand/25 bg-white px-6 text-sm font-semibold text-brand transition-colors hover:bg-brand/5"
            >
              <Phone className="size-4" />
              {siteConfig.phone}
            </a>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr] lg:py-16">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src={siteConfig.logo}
                alt="Buy The Way Journeys"
                width={150}
                height={44}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.03]"
            >
              <Instagram className="size-4" />
              Follow {siteConfig.instagramHandle}
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    <span className="size-1 rounded-full bg-leaf/60 transition-colors group-hover:bg-leaf" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand">
              Our Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    <span className="size-1 rounded-full bg-teal/60 transition-colors group-hover:bg-teal" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand">
              Get In Touch
            </h4>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  className="group flex items-start gap-3 text-muted-foreground transition-colors hover:text-brand"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Phone className="size-4" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-wider text-muted-foreground/70">
                      Phone
                    </span>
                    <span className="font-medium text-ink">{siteConfig.phone}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-start gap-3 text-muted-foreground transition-colors hover:text-teal"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                    <Mail className="size-4" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-wider text-muted-foreground/70">
                      Email
                    </span>
                    <span className="font-medium text-ink">{siteConfig.email}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-leaf/10 text-leaf">
                  <MapPin className="size-4" />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-wider text-muted-foreground/70">
                    Location
                  </span>
                  <span className="font-medium text-ink">
                    {siteConfig.address.line1} {siteConfig.address.line2}{" "}
                    {siteConfig.address.line3}, {siteConfig.address.pincode}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* End of max-w-7xl container — dark section below spans full viewport width */}

      {/* Combined bottom bar + GlitchZero attribution on dark background.
          Full viewport width. One line on all devices. "Glitch" white, "Zero" orange,
          Manrope heading font, all text/icons white on dark grey (#1c1c1e). */}
      <div className="w-full bg-[#1c1c1e] px-2 py-3 sm:px-8 sm:py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-1.5 whitespace-nowrap text-center sm:gap-3">
          <p className="text-[9px] text-white/70 sm:text-xs">
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span className="hidden items-center gap-1 text-[9px] text-white/60 sm:inline-flex sm:text-xs">
            <Compass className="size-2.5 text-white/60 sm:size-3" />
            Crafted for travellers, by travellers
          </span>
          <span className="text-white/20">·</span>
          <a
            href="https://www.glitchzerolabs.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-baseline gap-0.5 transition-opacity hover:opacity-90 sm:gap-1"
            style={{ fontFamily: "var(--font-manrope), Manrope, sans-serif" }}
          >
            <span className="text-[9px] font-medium text-white/70 sm:text-xs">
              Powered by
            </span>
            <span className="text-[10px] font-extrabold tracking-tight text-white sm:text-sm">
              Glitch
            </span>
            <span
              className="text-[10px] font-extrabold tracking-tight sm:text-sm"
              style={{ color: "#FF4F00" }}
            >
              Zero
            </span>
            <span className="text-[8px] font-medium uppercase tracking-wider text-white/50 sm:text-[10px]">
              Labs
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
