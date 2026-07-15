import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { ContactSection } from "@/components/site/contact-section";
import { Reveal } from "@/components/site/motion-helpers";
import { siteConfig } from "@/lib/site-config";
import { siteImages } from "@/lib/images";
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Buy The Way Journeys",
  description:
    "Book your next trip or event today! Call +91 8921595561 or email info@buythewayjourneys.com. B Block, First floor, Mather Square, Opp Ekm North Railway Station, Pincode- 682018.",
};

export default function ContactPage() {
  const quickFacts = [
    { icon: Phone, label: "India Phone", value: siteConfig.phone, href: `tel:${siteConfig.phoneTel}` },
    { icon: Phone, label: "UAE Phone", value: siteConfig.phoneUae, href: `tel:${siteConfig.phoneUaeTel}` },
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Instagram, label: "Instagram", value: siteConfig.instagramHandle, href: siteConfig.instagram },
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
        image={siteImages.pageHeroes.contact}
        crumbs={[{ label: "Contact" }]}
      />

      {/* Quick facts */}
      <section className="relative -mt-10 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-3xl border border-border bg-white p-6 shadow-premium-lg sm:grid-cols-2 lg:grid-cols-5">
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
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                    <MessageCircle className="size-3.5 text-leaf" />
                    Visit our offices
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                    Come say hello
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Prefer to plan in person? Drop by any of our offices — our
                    travel experts would love to hear about your next adventure.
                  </p>
                  <div className="mt-6 space-y-4 text-sm">
                    {siteConfig.offices.map((office) => (
                      <div key={office.city} className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-leaf">
                          {office.city}
                        </p>
                        <p className="flex items-start gap-3 text-white/85">
                          <MapPin className="mt-0.5 size-4 shrink-0 text-leaf" />
                          {office.lines.join(" ")}
                        </p>
                        <p className="flex items-center gap-3 text-white/85">
                          <Phone className="size-4 shrink-0 text-leaf" />
                          <a href={`tel:${office.phoneTel}`} className="hover:text-white">
                            {office.phone}
                          </a>
                        </p>
                      </div>
                    ))}
                    <p className="flex items-center gap-3 text-white/85">
                      <Mail className="size-4 shrink-0 text-leaf" />
                      {siteConfig.email}
                    </p>
                  </div>
                </div>
                <div className="relative min-h-[320px] bg-muted">
                  <iframe
                    title="Office location map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      siteConfig.address.full
                    )}&output=embed`}
                    className="absolute inset-0 h-full w-full grayscale-[0.2]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
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
