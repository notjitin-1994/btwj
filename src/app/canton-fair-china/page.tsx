import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/motion-helpers";
import { EventContactCta } from "@/components/site/event-contact-cta";
import {
  CalendarDays,
  MapPin,
  Building2,
  Award,
  Plane,
  Train,
  Users,
  Sparkles,
  Check,
  ArrowRight,
} from "lucide-react";
import { CantonInteractiveFlyer } from "@/components/site/canton-interactive-flyer";
import { CantonStickyItinerary } from "@/components/site/canton-sticky-itinerary";

export const metadata: Metadata = {
  title: "Canton Fair China — Buy The Way Journeys",
  description:
    "Experience the Canton Fair China with exclusive business solutions training by Riyas Hakkim. 7 Days / 6 Nights all-inclusive package. Connect. Learn. Grow your business.",
  keywords: [
    "Canton Fair",
    "China trade show",
    "business travel",
    "Riyas Hakkim",
    "Guangzhou",
    "Guilin",
    "B2B trade fair",
  ],
  openGraph: {
    title: "Canton Fair China — Buy The Way Journeys",
    description:
      "Experience the Canton Fair China with exclusive business solutions training by Riyas Hakkim. 7 Days / 6 Nights all-inclusive package.",
    type: "website",
  },
};

const itinerary = [
  { day: "Day 1", title: "Arrival — Guangzhou", desc: "Arrive at Guangzhou International Airport. Meet & assist, hotel transfer, welcome dinner. Overnight in Guangzhou.", icon: Plane, meals: "D" },
  { day: "Day 2", title: "Canton Fair Phase 1", desc: "Full-day visit to the Canton Fair — the world's largest B2B trade show. Explore exhibitors, discover products, and network with global suppliers. Overnight in Guangzhou.", icon: Building2, meals: "B" },
  { day: "Day 3", title: "Business Visit & Sourcing", desc: "Supplier meetings, product sourcing, and networking at the Canton Fair. Connect with manufacturers and explore business opportunities. Overnight in Guangzhou.", icon: Users, meals: "B" },
  { day: "Day 4", title: "Training with Riyas Hakkim", desc: "Exclusive business solutions training session with Riyas Hakkim. Industry & market analysis, practical insights, and strategies. Visit Canton Fair Phase 1. Overnight in Guangzhou.", icon: Award, meals: "B" },
  { day: "Day 5", title: "Guilin Day Tour", desc: "Bullet train to Guilin. Sightseeing, river cruise, and overnight in a Guilin resort. Experience China's breathtaking landscapes.", icon: Train, meals: "B, L, D" },
  { day: "Day 6", title: "Business Solution Session", desc: "Half-day training with Riyas Hakkim. Bullet train back to Guangzhou. Overnight in Guangzhou.", icon: Sparkles, meals: "B" },
  { day: "Day 7", title: "Departure", desc: "Breakfast, shopping, Canton Tower visit, airport transfer for departure.", icon: Plane, meals: "B" },
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

const highlights = [
  { icon: CalendarDays, label: "Duration", value: "7 Days / 6 Nights" },
  { icon: MapPin, label: "Destination", value: "Guangzhou & Guilin, China" },
  { icon: Building2, label: "Event", value: "Canton Fair Phase 1" },
  { icon: Award, label: "Training", value: "With Riyas Hakkim" },
];

export default function CantonFairPage() {
  return (
    <>
      <PageHero
        eyebrow="Featured Event"
        title={
          <>
            Experience{" "}
            <span className="text-white">Canton Fair China</span>
          </>
        }
        description="Connect. Learn. Grow your business at the world's largest B2B trade show — with exclusive training by business influencer Riyas Hakkim."
        image="/event/china-hero.jpg"
        crumbs={[{ label: "Canton Fair China" }]}
      />

      {/* Highlights */}
      <section className="relative overflow-hidden bg-brand-wash py-12 sm:py-17">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, i) => (
              <Reveal key={item.label} delay={0.08 * i}>
                <div className="rounded-2xl border border-border bg-white p-5 shadow-premium">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand text-white">
                    <item.icon className="size-5" />
                  </span>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-ink">{item.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 sm:py-17">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
            <div>
              <Reveal>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  The World's Largest B2B Trade Show
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                  Explore. Learn.{" "}
                  <span className="text-brand">Connect. Succeed.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  The Canton Fair (China Import and Export Fair) is the world's
                  largest B2B trade show, bringing together thousands of
                  suppliers, manufacturers, and buyers from across the globe.
                  This exclusive 7-day package combines the fair experience with
                  business solutions training by{" "}
                  <span className="font-semibold text-ink">Riyas Hakkim</span> —
                  a business influencer and entrepreneur. Source products, learn
                  strategies, explore China's breathtaking landscapes, and build
                  lifetime business connections.
                </p>
              </Reveal>

              {/* Riyas Hakkim profile */}
              <Reveal delay={0.2}>
                <div className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-premium">
                  <img
                    src="/event/riyas.jpg"
                    alt="Riyas Hakkim — Business Influencer & Entrepreneur"
                    className="size-16 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">
                      Riyas Hakkim
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Business Influencer & Entrepreneur
                    </p>
                    <p className="mt-1 text-xs text-brand">
                      @riyasbinhakkim
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <CantonInteractiveFlyer />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Full Itinerary */}
      <section className="relative overflow-hidden bg-sand py-12 sm:py-17">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-15 mix-blend-luminosity"
          style={{ backgroundImage: 'url(/event/china-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sand/80 via-transparent to-sand/80" />
        <div aria-hidden className="bg-dots absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold text-ink sm:text-4xl">
              7-Day{" "}
              <span className="text-brand">Itinerary</span>
            </h2>
          </Reveal>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground sm:text-base">
            A day-by-day breakdown of your Canton Fair & Business Solution journey.
          </p>

          <div className="mt-10">
            <CantonStickyItinerary />
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <section className="py-12 sm:py-17">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold text-ink sm:text-4xl">
              What's{" "}
              <span className="text-brand">Included</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {inclusions.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl border border-border bg-white p-3.5 shadow-premium"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                    <Check className="size-3" />
                  </span>
                  <span className="text-sm text-ink/80">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <EventContactCta />
    </>
  );
}
