import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { ServicesSection } from "@/components/site/services-section";
import { CtaParallax } from "@/components/site/cta-parallax";
import { Reveal, SectionHeading } from "@/components/site/motion-helpers";
import { services } from "@/lib/site-config";
import { DynamicIcon } from "@/components/site/icons";
import { ArrowUpRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services — Buy The Way Journeys",
  description:
    "Tour packages, hotel & resort bookings, customized Umrah packages, and event management. We're with you every step of the way.",
};

const accentTint: Record<string, string> = {
  brand: "bg-brand/10 text-brand",
  teal: "bg-teal/10 text-teal",
  leaf: "bg-leaf/10 text-leaf",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            We're with you{" "}
            <span className="bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
              every step
            </span>{" "}
            of the way!
          </>
        }
        description="From dream vacations and spiritual journeys to seamless events — one trusted partner for everything travel."
        image="https://images.unsplash.com/photo-1546412414-e1885e51ca18?auto=format&fit=crop&w=2000&q=80"
        crumbs={[{ label: "Our Services" }]}
      />

      <ServicesSection />

      {/* Detailed list */}
      <section className="relative overflow-hidden bg-sand py-20 sm:py-28">
        <div aria-hidden className="bg-dots absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Explore Each Service"
            title={
              <>
                Four ways we make{" "}
                <span className="text-gradient-brand">travel effortless</span>
              </>
            }
            description="Click into any service to see how we craft it just for you."
          />

          <div className="mt-14 space-y-8">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={0.06 * i}>
                <div
                  className={`grid items-center gap-8 overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-premium sm:p-8 lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    { }
                    <img
                      src={s.image}
                      alt={s.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                    <span className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-xl glass text-white">
                      <DynamicIcon name={s.icon} className="size-5" />
                    </span>
                  </div>
                  <div>
                    <span
                      className={`inline-flex size-12 items-center justify-center rounded-xl ${accentTint[s.accent]}`}
                    >
                      <DynamicIcon name={s.icon} className="size-6" />
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {s.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm text-ink/75"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-leaf" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-brand"
                    >
                      Explore {s.title}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
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
