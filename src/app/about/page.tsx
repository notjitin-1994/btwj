import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { AboutSection } from "@/components/site/about-section";
import { CtaParallax } from "@/components/site/cta-parallax";
import { Reveal } from "@/components/site/motion-helpers";
import { siteConfig, stats } from "@/lib/site-config";
import { siteImages } from "@/lib/images";
import { Compass, HeartHandshake, Smile, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Buy The Way Journeys",
  description:
    "Welcome to Buy The Way Journeys. Explore the untold experience with a decade of expertise in customized travel, Umrah, hotels and events.",
};

const values = [
  {
    icon: HeartHandshake,
    title: "Tailored To You",
    text: "Every itinerary is crafted around your dreams, pace and budget.",
  },
  {
    icon: Smile,
    title: "Stress-Free Planning",
    text: "We handle the details so you can focus on the experience.",
  },
  {
    icon: Globe2,
    title: "Local & Global",
    text: "From local gems to international wonders — one trusted partner.",
  },
  {
    icon: Compass,
    title: "Expert Guidance",
    text: "Experienced guides who turn trips into stories worth telling.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={
          <>
            Welcome to{" "}
            <span className="text-white">
              Buy The Way Journeys
            </span>
          </>
        }
        description="At Buy The Way Journeys, we specialize in providing exceptional travel experiences tailored to your needs. Whether you're looking for a dream vacation, a spiritual journey, or a seamless event, we've got you covered!"
        image={siteImages.pageHeroes.about}
        crumbs={[{ label: "About Us" }]}
      />

      <AboutSection />

      {/* Story / values */}
      <section className="relative overflow-hidden bg-sand py-12 sm:py-17">
        <div aria-hidden className="bg-dots absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                  <span className="size-1.5 rounded-full bg-gradient-brand" />
                  Our Story
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                  A decade of crafting{" "}
                  <span className="text-gradient-brand">unforgettable</span>{" "}
                  journeys
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  At Buy The Way Journeys, we specialize in providing exceptional
                  travel experiences tailored to your needs. Whether you're
                  looking for a dream vacation, a spiritual journey, or a
                  seamless event, we've got you covered!
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Our experienced travel experts believe travel should be
                  stress-free and exciting. From the first conversation to the
                  moment you return home, we're with you every step of the way —
                  designing plans that feel made just for you.
                </p>
              </Reveal>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {stats.map((s, i) => (
                  <Reveal key={s.label} delay={0.1 * i}>
                    <div className="rounded-2xl border border-border bg-white p-4 text-center shadow-premium">
                      <p className="font-display text-2xl font-bold text-gradient-brand sm:text-3xl">
                        {s.value}
                      </p>
                      <p className="mt-1 text-xs font-medium text-ink">
                        {s.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={0.08 * i}>
                  <div className="group h-full rounded-2xl border border-border bg-white p-6 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-lg">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
                      <v.icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {v.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaParallax />
    </>
  );
}
