"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, Compass, BadgePercent, Quote } from "lucide-react";
import { Reveal, Float, SectionHeading } from "@/components/site/motion-helpers";
import { Counter } from "@/components/site/brand-extras";
import { stats, siteConfig } from "@/lib/site-config";

const statIcons = [Award, Compass, BadgePercent];

export function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-brand-wash py-20 sm:py-28">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-30" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual collage */}
          <div className="relative">
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Reveal>
                  <div className="overflow-hidden rounded-3xl shadow-premium-lg">
                    <img
                      src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80"
                      alt="Travellers exploring a scenic destination"
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="overflow-hidden rounded-3xl shadow-premium">
                    { }
                    <img
                      src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80"
                      alt="A couple on a dream vacation"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </Reveal>
              </div>
              <div className="space-y-4 pt-8">
                <Reveal delay={0.15}>
                  <div className="overflow-hidden rounded-3xl shadow-premium">
                    { }
                    <img
                      src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=900&q=80"
                      alt="Luxury resort stay"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="overflow-hidden rounded-3xl shadow-premium-lg">
                    <img
                      src="https://sfile.chatglm.cn/images-ppt/37bcde4a870c.jpg"
                      alt="Spiritual Umrah journey"
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Floating experience badge */}
            <Float className="absolute -left-3 top-1/2 hidden -translate-y-1/2 sm:block">
              <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-premium-lg">
                <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-brand text-white">
                  <Award className="size-5" />
                </span>
                <div className="leading-tight">
                  <p className="font-display text-xl font-bold text-ink">10+</p>
                  <p className="text-xs text-muted-foreground">Years of trust</p>
                </div>
              </div>
            </Float>

            {/* Quote chip */}
            <Reveal delay={0.3}>
              <div className="absolute -bottom-6 right-2 max-w-[16rem] rounded-2xl border border-brand/10 bg-white p-4 shadow-premium-lg">
                <Quote className="size-5 text-leaf" />
                <p className="mt-1 text-xs leading-relaxed text-ink/75">
                  “Travel stress-free and exciting — every journey, designed
                  just for you.”
                </p>
              </div>
            </Reveal>
          </div>

          {/* Text */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Welcome to Buy The Way Journeys"
              title={
                <>
                  Explore the <span className="text-gradient-brand">Untold</span>{" "}
                  Experience
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {siteConfig.description}
              </p>
            </Reveal>

            {/* Stats highlight */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((s, i) => {
                const Icon = statIcons[i] ?? Award;
                return (
                  <Reveal key={s.label} delay={0.1 * i}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="border-gradient-animate group relative h-full overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-premium transition-shadow hover:shadow-premium-lg"
                    >
                      <div className="absolute -right-6 -top-6 size-16 rounded-full bg-gradient-blue-teal opacity-15 transition-transform group-hover:scale-150" />
                      <span className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-blue-teal text-white shadow-glow-blue">
                        <Icon className="size-5" />
                      </span>
                      <p className="relative mt-3 font-display text-3xl font-bold">
                        <span className="text-gradient-blue-green">
                          {s.value === "10+" ? (
                            <Counter value={10} suffix="+" />
                          ) : (
                            s.value
                          )}
                        </span>
                      </p>
                      <p className="relative mt-0.5 text-sm font-semibold text-ink">
                        {s.label}
                      </p>
                      <p className="relative mt-1 text-xs leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/about"
                  className="shimmer-sweep group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 text-sm font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.03]"
                >
                  Discover our story
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
                    ].map((src) => (
                       
                      <img
                        key={src}
                        src={src}
                        alt="Happy traveller"
                        className="size-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Backed by <span className="font-semibold text-ink">10+ years</span>{" "}
                    of travel expertise
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
