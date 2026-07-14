"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Loader2,
  User,
  MessageSquare,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal, SectionHeading } from "@/components/site/motion-helpers";
import { siteConfig } from "@/lib/site-config";

export function ContactSection({ compact = false }: { compact?: boolean }) {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Message sent! Our travel experts will reach out shortly.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  }

  const contactCards = [
    {
      icon: Phone,
      label: "Call Us",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone}`,
      tint: "bg-brand/10 text-brand",
      note: "Mon–Sun · 9am – 8pm",
    },
    {
      icon: Mail,
      label: "Email Us",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      tint: "bg-teal/10 text-teal",
      note: "We reply within 24 hours",
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: siteConfig.address.full,
      href: `https://maps.google.com/?q=${encodeURIComponent(
        siteConfig.address.full
      )}`,
      tint: "bg-leaf/10 text-leaf",
      note: "B Block, Mather Square",
    },
  ];

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 50% at 10% 10%, rgba(0,91,150,0.08), transparent 60%), radial-gradient(45% 50% at 90% 90%, rgba(76,175,80,0.08), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title={
            <>
              Book Your Next Trip or{" "}
              <span className="text-gradient-brand">Event Today!</span>
            </>
          }
          description="Tell us about your dream journey. Our experienced travel experts will craft a stress-free, exciting plan designed just for you."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: contact info */}
          <div className="space-y-4">
            {contactCards.map((c, i) => (
              <Reveal key={c.label} delay={0.06 * i}>
                <motion.a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  whileHover={{ y: -3 }}
                  className="group flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-premium transition-shadow hover:shadow-premium-lg"
                >
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${c.tint}`}
                  >
                    <c.icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {c.label}
                      </span>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </div>
                    <p className="mt-0.5 break-words text-base font-semibold text-ink">
                      {c.value}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {c.note}
                    </p>
                  </div>
                </motion.a>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl bg-ink p-6 text-white">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-80"
                  style={{
                    background:
                      "radial-gradient(60% 80% at 0% 0%, rgba(0,91,150,0.5), transparent 60%), radial-gradient(50% 70% at 100% 100%, rgba(76,175,80,0.4), transparent 60%)",
                  }}
                />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    Why travellers choose us
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold leading-snug">
                    “Travel stress-free and exciting — every journey, designed
                    just for you.”
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["10+ years", "Best price", "Tailor-made", "24/7 support"].map(
                      (t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium"
                        >
                          {t}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-premium-lg sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gradient-brand-soft blur-2xl"
              />
              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-brand text-white">
                    <Send className="size-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">
                      Send us a message
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      We'll get back to you within 24 hours
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm font-medium text-ink">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="e.g. Aisha Mohammed"
                        className="h-12 rounded-xl border-border bg-muted/40 pl-10 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium text-ink">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        placeholder="you@example.com"
                        className="h-12 rounded-xl border-border bg-muted/40 pl-10 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-ink"
                    >
                      Message
                    </Label>
                    <div className="relative">
                      <MessageSquare className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" />
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        placeholder="Tell us about your dream trip, dates, number of travellers…"
                        className="min-h-[140px] rounded-xl border-border bg-muted/40 pl-10 pt-3 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="group h-12 w-full gap-2 rounded-xl bg-gradient-brand text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </Button>

                  {!compact && (
                    <p className="text-center text-xs text-muted-foreground">
                      By sending, you agree to be contacted by Buy The Way
                      Journeys about your enquiry.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
