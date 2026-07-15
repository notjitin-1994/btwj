import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { ContactSection } from "@/components/site/contact-section";
import { Reveal, SectionHeading } from "@/components/site/motion-helpers";
import { services, siteConfig, type ServiceInfo } from "@/lib/site-config";
import { siteImages } from "@/lib/images";
import { DynamicIcon } from "@/components/site/icons";
import {
  Check,
  ArrowUpRight,
  Phone,
  Search,
  CalendarCheck2,
  Plane,
  Smile,
} from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service — Buy The Way Journeys" };
  return {
    title: `${service.title} — Buy The Way Journeys`,
    description: service.description,
  };
}

const accentTint: Record<string, string> = {
  brand: "bg-brand/10 text-brand",
  teal: "bg-teal/10 text-teal",
  leaf: "bg-leaf/10 text-leaf",
};

const steps = [
  {
    icon: Search,
    title: "Share Your Dream",
    text: "Tell us your destination, dates and travel style — we listen first.",
  },
  {
    icon: CalendarCheck2,
    title: "We Craft The Plan",
    text: "Our experts design a tailor-made itinerary around you.",
  },
  {
    icon: Plane,
    title: "Travel Stress-Free",
    text: "We handle bookings, transfers and support — you just enjoy.",
  },
  {
    icon: Smile,
    title: "Return With Stories",
    text: "Come home with memories worth retelling for a lifetime.",
  },
];

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug) as ServiceInfo | undefined;
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={service.short}
        title={
          <>
            {service.title.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="text-white">
              {service.title.split(" ").slice(-2).join(" ")}
            </span>
          </>
        }
        description={service.description}
        image={service.image}
        mobileImage={
          siteImages.mobileHeroes[
            service.slug === "tour-packages" ? "tourPackages"
            : service.slug === "hotel-resort" ? "hotelResort"
            : service.slug === "umrah" ? "umrah"
            : "eventManagement"
          ]
        }
        crumbs={[{ label: "Our Services", href: "/services" }, { label: service.title }]}
      />

      {/* Intro + highlights */}
      <section className="relative overflow-hidden py-12 sm:py-17">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <span
                  className={`inline-flex size-14 items-center justify-center rounded-2xl ${accentTint[service.accent]}`}
                >
                  <DynamicIcon name={service.icon} className="size-7" />
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                  Designed just for{" "}
                  <span className="text-gradient-brand">you</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {service.description}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  At Buy The Way Journeys, we specialize in providing exceptional
                  travel experiences tailored to your needs. Our experienced
                  travel experts make every journey stress-free and exciting —
                  designed just for you.
                </p>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-brand px-6 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
                  >
                    Enquire now
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <a
                    href={`tel:${siteConfig.phoneTel}`}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-white px-6 text-sm font-semibold text-ink transition-colors hover:bg-accent"
                  >
                    <Phone className="size-4 text-brand" />
                    {siteConfig.phone}
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Highlights card */}
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-premium-lg">
                <div className="relative h-40 overflow-hidden">
                  { }
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/70" />
                  <div className="absolute bottom-4 left-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      What's included
                    </p>
                    <p className="font-display text-xl font-semibold text-white">
                      {service.title}
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 p-6">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                        <Check className="size-3.5" />
                      </span>
                      <span className="text-sm leading-relaxed text-ink/80">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-sand py-12 sm:py-17">
        <div aria-hidden className="bg-dots absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title={
              <>
                Four simple steps to your{" "}
                <span className="text-gradient-brand">next journey</span>
              </>
            }
            description="Booking made so easy with Buy The Way Journeys."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={0.08 * i}>
                <div className="group relative h-full rounded-3xl border border-border bg-white p-6 shadow-premium transition-all hover:-translate-y-1.5 hover:shadow-premium-lg">
                  <span className="absolute right-5 top-5 font-display text-4xl font-bold text-ink/[0.06]">
                    0{i + 1}
                  </span>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                    <step.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-12 sm:py-17">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Keep Exploring"
            title={
              <>
                Other <span className="text-gradient-brand">services</span> we
                offer
              </>
            }
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={0.08 * i}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-start gap-4 rounded-3xl border border-border bg-white p-6 shadow-premium transition-all hover:-translate-y-1.5 hover:shadow-premium-lg"
                >
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${accentTint[s.accent]}`}
                  >
                    <DynamicIcon name={s.icon} className="size-6" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-ink group-hover:text-brand">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {s.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                      Explore
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection compact />
    </>
  );
}
