import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { WhyChooseUsSection } from "@/components/site/why-choose-us-section";
import { CtaParallax } from "@/components/site/cta-parallax";
import { Reveal, SectionHeading } from "@/components/site/motion-helpers";
import { benefitCards } from "@/lib/site-config";
import { siteImages } from "@/lib/images";
import { DynamicIcon } from "@/components/site/icons";
import { ShieldCheck, Clock, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Choose Us — Buy The Way Journeys",
  description:
    "Our benefits list — best price guarantee, easy & quick booking, and experienced guides. Whether local gems or international wonders, we ensure a seamless and exciting journey.",
};

const accentText = {
  brand: "text-brand",
  teal: "text-teal",
  leaf: "text-leaf",
} as const;

const promises = [
  {
    icon: ShieldCheck,
    title: "Trusted & Transparent",
    text: "No hidden fees, no surprises — just honest pricing and clear plans from day one.",
  },
  {
    icon: Clock,
    title: "Save Time, Travel More",
    text: "Quick, effortless booking so you spend less time planning and more time exploring.",
  },
  {
    icon: Heart,
    title: "Loved By Travellers",
    text: "A track record built over a decade of stress-free, exciting journeys.",
  },
];

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Choose Us"
        title={
          <>
            Our Benefits List —{" "}
            <span className="text-white">
              Why Choose Us?
            </span>
          </>
        }
        description="Whether you're exploring local gems or international wonders, we ensure a seamless and exciting journey."
        image={siteImages.pageHeroes.whyChooseUs}
        crumbs={[{ label: "Why Choose Us" }]}
      />

      <WhyChooseUsSection />

      {/* Detailed benefits */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="In Detail"
            title={
              <>
                Every benefit, <span className="text-gradient-brand">explained</span>
              </>
            }
            description="Three reasons travellers keep coming back to Buy The Way Journeys."
          />

          <div className="mt-14 space-y-6">
            {benefitCards.map((card, i) => (
              <Reveal key={card.title} delay={0.08 * i}>
                <div
                  className={`grid items-center gap-6 rounded-3xl border border-border bg-white p-6 shadow-premium sm:p-8 lg:grid-cols-[auto_1fr_auto] ${
                    i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-5xl font-bold text-ink/[0.08]">
                      0{i + 1}
                    </span>
                    <span
                      className={`flex size-14 items-center justify-center rounded-2xl bg-brand/10 ${accentText[card.accent]}`}
                    >
                      <DynamicIcon name={card.icon} className="size-6" />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-ink">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                    {["Guaranteed", "Verified", "Trusted"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Promises */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i}>
                <div className="h-full rounded-3xl bg-ink p-7 text-white">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/10">
                    <p.icon className="size-5 text-leaf" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaParallax />
    </>
  );
}
