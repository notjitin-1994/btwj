"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { Plane, Building2, Users, Award, Train, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteImages } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const itinerary = [
  { day: "Day 1", title: "Arrival — Guangzhou", desc: "Arrive at Guangzhou International Airport. Meet & assist, hotel transfer, welcome dinner.", icon: Plane, meals: "D", img: siteImages.bg.airport },
  { day: "Day 2", title: "Canton Fair Phase 1", desc: "Full-day visit to the Canton Fair — the world's largest B2B trade show. Explore exhibitors, discover products, and network with global suppliers.", icon: Building2, meals: "B", img: siteImages.services.eventManagement },
  { day: "Day 3", title: "Business Visit & Sourcing", desc: "Supplier meetings, product sourcing, and networking at the Canton Fair. Connect with manufacturers and explore business opportunities.", icon: Users, meals: "B", img: siteImages.pageHeroes.services },
  { day: "Day 4", title: "Training with Riyas Hakkim", desc: "Exclusive business solutions training session with Riyas Hakkim. Industry & market analysis, practical insights, and strategies.", icon: Award, meals: "B", img: siteImages.pageHeroes.eventManagement },
  { day: "Day 5", title: "Guilin Day Tour", desc: "Bullet train to Guilin. Sightseeing, river cruise, and overnight in a Guilin resort. Experience China's breathtaking landscapes.", icon: Train, meals: "B, L, D", img: siteImages.pageHeroes.tourPackages },
  { day: "Day 6", title: "Business Solution Session", desc: "Half-day training with Riyas Hakkim. Bullet train back to Guangzhou. Overnight in Guangzhou.", icon: Sparkles, meals: "B", img: siteImages.pageHeroes.about },
  { day: "Day 7", title: "Departure", desc: "Breakfast, shopping, Canton Tower visit, airport transfer for departure.", icon: Plane, meals: "B", img: siteImages.bg.dubai },
];

export function CantonStickyItinerary() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
      cardEls.forEach((card, i) => {
        if (i === cardEls.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cardEls[cardEls.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: cardEls[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={ref} className="relative w-full max-w-4xl mx-auto">
      {itinerary.map((item, i) => (
        <div
          key={item.day}
          className="stack-card sticky top-0 flex min-h-dvh flex-col items-center justify-center pt-20"
        >
          <div className="relative w-full overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-[#1A1A1A] shadow-premium-lg">
            
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-1000 hover:scale-105"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#9B111E]/90 via-[#9B111E]/40 to-transparent" />
            {/* Pattern Overlay */}
            <div 
              className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83v58.34l-.83.83H5.373l-.83-.83V.83l.83-.83h49.254zM53 2v56H7V2h46zm-2 2v52H9V4h42z' fill='%23FFD700' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px'
              }}
            />
            
            {/* Glow effects */}
            <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[#D4AF37] opacity-20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-[#C8102E] opacity-40 blur-[100px]" />

            <div className="relative z-10 flex flex-col p-8 sm:p-12">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#FFD700]/80">
                    {item.day}
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                    {item.title}
                  </h3>
                </div>
                <div className="hidden size-16 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#FFD700] backdrop-blur-md sm:flex">
                  {React.createElement(item.icon, { className: "size-8" })}
                </div>
              </div>

              <div className="rounded-2xl border border-[#D4AF37]/15 bg-black/20 p-6 backdrop-blur-md sm:p-8">
                <p className="text-lg leading-relaxed text-[#FFD700]/90 sm:text-xl">
                  {item.desc}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[#D4AF37]/20 pt-6">
                  {item.meals && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#FFD700]">
                      Meals: {item.meals}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/70">
                    Overnight in {item.day === "Day 5" ? "Guilin" : "Guangzhou"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
