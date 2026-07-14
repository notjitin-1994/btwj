import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { ContactSection } from "@/components/site/contact-section";
import { Reveal } from "@/components/site/motion-helpers";
import { siteConfig } from "@/lib/site-config";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Buy The Way Journeys",
  description:
    "Book your next trip or event today! Call 8921595561 or email info@buythewayjourneys.com. B Block, First floor, Mather Square, Opp Ekm North Railway Station, Pincode- 682018.",
};

export default function ContactPage() {
  const quickFacts = [
    { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MapPin, label: "Office", value: siteConfig.address.full },
    { icon: Clock, label: "Hours", value: "Mon – Sun · 9:00 AM – 8:00 PM" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title={
          <>
            Book Your Next Trip or{" "}
            <span className="text-white">
              Event Today!
            </span>
          </>
        }
        description="Tell us about your dream journey. Our experienced travel experts will craft a stress-free, exciting plan designed just for you."
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80"
        crumbs={[{ label: "Contact" }]}
      />

      {/* Quick facts */}
      <section className="relative -mt-10 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-3xl border border-border bg-white p-6 shadow-premium-lg sm:grid-cols-2 lg:grid-cols-4">
            {quickFacts.map((f, i) => (
              <Reveal key={f.label} delay={0.06 * i}>
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-brand">
                    <f.icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {f.label}
                    </p>
                    {f.href ? (
                      <a
                        href={f.href}
                        className="break-words text-sm font-semibold text-ink transition-colors hover:text-brand"
                      >
                        {f.value}
                      </a>
                    ) : (
                      <p className="break-words text-sm font-semibold text-ink">
                        {f.value}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      {/* Map embed */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border shadow-premium-lg">
              <div className="grid gap-0 lg:grid-cols-[1fr_1.6fr]">
                <div className="bg-ink p-8 text-white sm:p-10">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]">
                    <MessageCircle className="size-3.5 text-leaf" />
                    Visit our office
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                    Come say hello
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Prefer to plan in person? Drop by our office — our travel
                    experts would love to hear about your next adventure.
                  </p>
                  <div className="mt-6 space-y-3 text-sm">
                    <p className="flex items-start gap-3 text-white/85">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-leaf" />
                      {siteConfig.address.full}
                    </p>
                    <p className="flex items-center gap-3 text-white/85">
                      <Phone className="size-4 shrink-0 text-leaf" />
                      {siteConfig.phone}
                    </p>
                    <p className="flex items-center gap-3 text-white/85">
                      <Mail className="size-4 shrink-0 text-leaf" />
                      {siteConfig.email}
                    </p>
                  </div>
                </div>
                <div className="relative min-h-[320px] bg-muted">
                  <iframe
                    title="Office location map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      siteConfig.address.full
                    )}&output=embed`}
                    className="absolute inset-0 h-full w-full grayscale-[0.2]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
