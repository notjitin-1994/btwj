"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight, Send } from "lucide-react";
import { siteConfig, services, mainNav } from "@/lib/site-config";

const quickLinks = mainNav.filter((n) => n.label !== "Our Services");

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA banner */}
        <div className="grid gap-6 border-b border-white/10 py-12 md:grid-cols-[1.4fr_1fr] md:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80">
              <span className="size-1.5 rounded-full bg-leaf" />
              Ready when you are
            </span>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Let's plan your next <span className="text-white">unforgettable</span> journey
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Tell us where you want to go. Our experienced travel experts will
              craft a stress-free, exciting plan designed just for you.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link
              href="/contact"
              className="shimmer-sweep group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 text-sm font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.03]"
            >
              Start planning
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
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
              <div className="rounded-xl bg-white px-3 py-2 shadow-premium">
                <Image
                  src={siteConfig.logo}
                  alt="Buy The Way Journeys"
                  width={150}
                  height={44}
                  className="h-9 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Tour Packages", "Umrah", "Hotels", "Events"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/75"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-white"
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
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Our Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-white"
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
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Get In Touch
            </h4>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="group flex items-start gap-3 text-white/80 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Phone className="size-4" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-wider text-white/45">
                      Phone
                    </span>
                    {siteConfig.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-start gap-3 text-white/80 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Mail className="size-4" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-wider text-white/45">
                      Email
                    </span>
                    {siteConfig.email}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <MapPin className="size-4" />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-wider text-white/45">
                    Location
                  </span>
                  {siteConfig.address.line1} {siteConfig.address.line2}{" "}
                  {siteConfig.address.line3}, {siteConfig.address.pincode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-xs text-white/55">
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/55">
            <span className="inline-flex items-center gap-1.5">
              <Send className="size-3.5 text-leaf" />
              Crafted for travellers, by travellers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
