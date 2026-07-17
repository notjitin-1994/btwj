"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Building2, Users, Award, Train, Sparkles, MapPin, CalendarDays, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteImages } from "@/lib/images";

const itinerary = [
  { day: "Day 1", title: "Arrival — Guangzhou", desc: "Arrive at Guangzhou International Airport. Meet & assist, hotel transfer, welcome dinner. Overnight in Guangzhou.", icon: Plane, meals: "D", img: siteImages.bg.airport },
  { day: "Day 2", title: "Canton Fair Phase 1", desc: "Full-day visit to the Canton Fair — the world's largest B2B trade show. Explore exhibitors, discover products, and network with global suppliers. Overnight in Guangzhou.", icon: Building2, meals: "B", img: siteImages.services.eventManagement },
  { day: "Day 3", title: "Business Visit & Sourcing", desc: "Supplier meetings, product sourcing, and networking at the Canton Fair. Connect with manufacturers and explore business opportunities. Overnight in Guangzhou.", icon: Users, meals: "B", img: siteImages.pageHeroes.services },
  { day: "Day 4", title: "Training with Riyas Hakkim", desc: "Exclusive business solutions training session with Riyas Hakkim. Industry & market analysis, practical insights, and strategies. Visit Canton Fair Phase 1. Overnight in Guangzhou.", icon: Award, meals: "B", img: siteImages.pageHeroes.eventManagement },
  { day: "Day 5", title: "Guilin Day Tour", desc: "Bullet train to Guilin. Sightseeing, river cruise, and overnight in a Guilin resort. Experience China's breathtaking landscapes.", icon: Train, meals: "B, L, D", img: siteImages.pageHeroes.tourPackages },
  { day: "Day 6", title: "Business Solution Session", desc: "Half-day training with Riyas Hakkim. Bullet train back to Guangzhou. Overnight in Guangzhou.", icon: Sparkles, meals: "B", img: siteImages.pageHeroes.about },
  { day: "Day 7", title: "Departure", desc: "Breakfast, shopping, Canton Tower visit, airport transfer for departure.", icon: Plane, meals: "B", img: siteImages.bg.dubai },
];

const inclusions = [
  "7 Days / 6 Nights package",
  "4-star accommodation in Guangzhou",
  "1 night resort stay in Guilin",
  "Bullet train experience",
  "Sightseeing & city tours",
  "River cruise in Guilin",
  "Canton Fair access",
  "Business support & supplier meetings",
  "Training sessions with Riyas Hakkim",
  "Lifetime access to China logistics",
  "Airport pick-up & drop-off",
  "Private AC coach transportation",
  "English-speaking guide",
  "All meals included (B/L/D)",
  "Welcome dinner",
  "Canton Tower visit",
];

const tabs = ["Itinerary", "Inclusions", "Overview"];

export function CantonInteractiveFlyer() {
  const [activeTab, setActiveTab] = useState("Itinerary");
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="group relative w-full overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-[#1A1A1A] shadow-premium-lg">
      
      {/* Dynamic Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab === "Itinerary" ? itinerary[activeDay].img : siteImages.pageHeroes.contact}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url(${activeTab === "Itinerary" ? itinerary[activeDay].img : siteImages.pageHeroes.contact})` }}
        />
      </AnimatePresence>
      
      {/* Gradient & Pattern Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#9B111E]/90 via-[#9B111E]/70 to-[#1A1A1A]/90" />
      <div 
        className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83v58.34l-.83.83H5.373l-.83-.83V.83l.83-.83h49.254zM53 2v56H7V2h46zm-2 2v52H9V4h42z' fill='%23FFD700' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
        
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-6">
          <div>
            <h4 className="font-display text-3xl font-bold tracking-tight text-[#FFD700]">
              Canton Fair China
            </h4>
            <p className="mt-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
              <MapPin className="size-4 text-[#D4AF37]" /> Guangzhou & Guilin
            </p>
          </div>
          <div className="flex w-full overflow-x-auto no-scrollbar sm:w-auto items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-black/40 p-1 backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors",
                  activeTab === tab ? "text-[#9B111E]" : "text-[#FFD700]/70 hover:text-[#FFD700]"
                )}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="flyer-tab"
                    className="absolute inset-0 rounded-full bg-[#FFD700]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">
            
            {/* ITINERARY TAB */}
            {activeTab === "Itinerary" && (
              <motion.div
                key="itinerary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col"
              >
                <div className="grid grid-cols-7 gap-1.5 rounded-xl bg-black/40 p-1.5">
                  {itinerary.map((item, idx) => (
                    <button
                      key={item.day}
                      onClick={() => setActiveDay(idx)}
                      className={cn(
                        "relative flex flex-col items-center justify-center rounded-lg py-2.5 transition-all duration-300",
                        activeDay === idx ? "text-[#9B111E]" : "text-[#FFD700]/60 hover:bg-white/5 hover:text-[#FFD700]"
                      )}
                    >
                      {activeDay === idx && (
                        <motion.div
                          layoutId="active-day-pill"
                          className="absolute inset-0 rounded-lg bg-[#FFD700]"
                          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                        />
                      )}
                      <span className="relative z-10 text-[11px] font-bold tracking-wider">{idx + 1}</span>
                    </button>
                  ))}
                </div>

                <div className="relative mt-6 flex-1 overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-black/30 p-6 backdrop-blur-md">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={activeDay}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="flex flex-col h-full"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#FFD700] ring-1 ring-[#FFD700]/30">
                          {React.createElement(itinerary[activeDay].icon, { className: "size-6" })}
                        </div>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700]/80">
                            {itinerary[activeDay].day}
                          </span>
                          <h5 className="mt-1 font-display text-2xl font-bold text-white">
                            {itinerary[activeDay].title}
                          </h5>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-[#FFD700]/90">
                        {itinerary[activeDay].desc}
                      </p>
                      
                      {itinerary[activeDay].meals && (
                        <div className="mt-4 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FFD700]">
                            Meals: {itinerary[activeDay].meals}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* INCLUSIONS TAB */}
            {activeTab === "Inclusions" && (
              <motion.div
                key="inclusions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid gap-3 sm:grid-cols-2"
              >
                {inclusions.map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-black/20 p-3 backdrop-blur-sm"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FFD700]" />
                    <span className="text-sm font-medium text-white/90">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* OVERVIEW TAB */}
            {activeTab === "Overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div className="rounded-2xl border border-[#D4AF37]/20 bg-black/30 p-6 backdrop-blur-md">
                  <h5 className="font-display text-2xl font-bold text-white">
                    Exclusive Training by <span className="text-[#FFD700]">Riyas Hakkim</span>
                  </h5>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    Gain practical insights and proven business strategies from Riyas Hakkim — a recognized business influencer who helps entrepreneurs source, scale, and succeed in international trade. 
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Duration", value: "7D / 6N" },
                    { label: "Event", value: "Phase 1" },
                    { label: "Meals", value: "All Inclusive" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-black/20 p-4 text-center backdrop-blur-sm ring-1 ring-[#D4AF37]/10">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#FFD700]/70">{stat.label}</p>
                      <p className="mt-1 font-display text-xl font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
