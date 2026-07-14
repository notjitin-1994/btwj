"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import {
  Reveal,
  SectionHeading,
  StaggerGroup,
  staggerItem,
} from "@/components/site/motion-helpers";
import { siteImages } from "@/lib/images";

const destinations = [
  { name: "Dubai", country: "United Arab Emirates", image: siteImages.destinations.dubai, tag: "City & Desert" },
  { name: "Maldives", country: "Indian Ocean", image: siteImages.destinations.maldives, tag: "Beach & Resorts" },
  { name: "Makkah", country: "Saudi Arabia", image: siteImages.destinations.makkah, tag: "Spiritual Umrah" },
  { name: "Kerala", country: "India", image: siteImages.destinations.kerala, tag: "Backwaters" },
  { name: "Swiss Alps", country: "Switzerland", image: siteImages.destinations.swissAlps, tag: "Mountains" },
  { name: "Santorini", country: "Greece", image: siteImages.destinations.santorini, tag: "Islands" },
  { name: "Bali", country: "Indonesia", image: siteImages.destinations.bali, tag: "Tropical" },
];

export function FeaturedDestinations() {
  return (
    <section className="relative overflow-hidden bg-teal-wash py-20 sm:py-28">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-25" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Featured Destinations"
            title={
              <>
                Where will you go{" "}
                <span className="text-gradient-brand">next?</span>
              </>
            }
            description="Hand-picked destinations our travellers love — from golden deserts to serene backwaters and sacred journeys."
            className="max-w-2xl"
          />
          <Reveal delay={0.1}>
            <div className="hidden items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-2 text-xs font-semibold text-brand shadow-premium sm:flex">
              <MapPin className="size-3.5 text-leaf" />
              500+ destinations worldwide
            </div>
          </Reveal>
        </div>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {destinations.map((d, i) => (
            <motion.div
              key={d.name}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-3xl shadow-premium transition-shadow hover:shadow-premium-lg ${
                i === 0 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={d.image}
                  alt={`${d.name}, ${d.country}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-ink/65" />
              {/* Brand accent ring on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-leaf/50" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-brand px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-glow">
                  <MapPin className="size-2.5" />
                  {d.tag}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">
                  {d.name}
                </h3>
                <p className="text-xs text-white/70">{d.country}</p>
              </div>
              <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-gradient-brand text-white opacity-0 shadow-glow-blue transition-opacity duration-300 group-hover:opacity-100">
                <ArrowUpRight className="size-4" />
              </span>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
