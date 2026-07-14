"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Phone,
  Loader2,
  PartyPopper,
  Compass,
  Building2,
  Moon,
  CalendarDays,
  Users,
  Wallet,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { services, siteConfig } from "@/lib/site-config";
import { usePlanner } from "@/lib/planner-store";

/* 6-step progressive trip-planning questionnaire.
   Steps: 1) Service  2) Destination  3) Dates  4) Travellers
          5) Budget   6) Phone number  →  success
   Includes a "Custom planning" wildcard for new/special enquiries. */

const serviceOptions = [
  ...services.map((s) => ({
    slug: s.slug,
    title: s.title,
    short: s.short,
    icon: s.icon,
  })),
  {
    slug: "custom",
    title: "Custom Planning",
    short: "Something else entirely",
    icon: "Sparkles",
  },
];

const budgetOptions = [
  { value: "budget", label: "Budget-friendly", desc: "Great value, no frills" },
  { value: "mid", label: "Mid-range", desc: "Comfort & quality" },
  { value: "premium", label: "Premium", desc: "Luxury & exclusive" },
  { value: "flexible", label: "Flexible", desc: "Open to suggestions" },
];

const travellerOptions = [
  { value: "1", label: "1 traveller", desc: "Solo adventure" },
  { value: "2", label: "2 travellers", desc: "Couple / pair" },
  { value: "3-5", label: "3–5 travellers", desc: "Family / friends" },
  { value: "6+", label: "6+ travellers", desc: "Group / event" },
];

const TOTAL_STEPS = 6;

export function TripPlannerDialog() {
  const { open, closePlanner } = usePlanner();
  const [step, setStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [form, setForm] = React.useState({
    service: "",
    destination: "",
    dates: "",
    travellers: "",
    budget: "",
    phone: "",
    notes: "",
  });

  // Reset when dialog closes
  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep(0);
        setDone(false);
        setForm({
          service: "",
          destination: "",
          dates: "",
          travellers: "",
          budget: "",
          phone: "",
          notes: "",
        });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Auto-fade the dialog after the thank-you message shows (3.5s)
  React.useEffect(() => {
    if (done) {
      const t = setTimeout(() => {
        closePlanner();
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [done, closePlanner]);

  const canProceed = React.useMemo(() => {
    switch (step) {
      case 0:
        return !!form.service;
      case 1:
        return form.destination.trim().length > 0;
      case 2:
        return form.dates.trim().length > 0;
      case 3:
        return !!form.travellers;
      case 4:
        return !!form.budget;
      case 5:
        return form.phone.trim().length >= 10;
      default:
        return false;
    }
  }, [step, form]);

  async function submit() {
    if (!canProceed) return;
    setLoading(true);
    try {
      // Save to DB (non-blocking — don't block the WhatsApp redirect)
      fetch("/api/trip-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).catch(() => {});

      // Build a WhatsApp message with all collected details
      const serviceTitle =
        serviceOptions.find((o) => o.slug === form.service)?.title ??
        form.service;
      const budgetLabel =
        budgetOptions.find((b) => b.value === form.budget)?.label ?? form.budget;

      const msg = [
        "*New Trip Enquiry — Buy The Way Journeys*",
        "",
        `*Service:* ${serviceTitle}`,
        `*Destination:* ${form.destination}`,
        `*Travel dates:* ${form.dates}`,
        `*Travellers:* ${form.travellers}`,
        `*Budget:* ${budgetLabel}`,
        `*Phone:* ${form.phone}`,
      ];
      if (form.notes) msg.push(`*Notes:* ${form.notes}`);
      msg.push("", "— Sent via buythewayjourneys.com");

      const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(msg.join("\n"))}`;

      // Open WhatsApp in a new tab
      window.open(waUrl, "_blank");

      setDone(true);
    } catch {
      toast.error("Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  }

  const next = () => {
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
    else submit();
  };
  const back = () => step > 0 && setStep((s) => s - 1);

  const selectedService = serviceOptions.find((o) => o.slug === form.service);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={() => closePlanner()}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-white shadow-premium-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-brand-wash px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                  Plan my trip
                </p>
                <p className="mt-0.5 font-display text-lg font-semibold text-ink">
                  {done
                    ? "Request received!"
                    : `Step ${Math.min(step + 1, TOTAL_STEPS)} of ${TOTAL_STEPS}`}
                </p>
              </div>
              <button
                onClick={() => closePlanner()}
                className="flex size-9 items-center justify-center rounded-full bg-white text-ink/60 shadow-premium transition-colors hover:bg-accent hover:text-ink"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Progress bar */}
            {!done && (
              <div className="h-1 w-full bg-muted">
                <motion.div
                  className="h-full bg-brand"
                  animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            )}

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="px-2 text-center sm:px-4"
                  >
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                      <PartyPopper className="size-7" />
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold text-ink sm:text-2xl">
                      Thank you! Check WhatsApp.
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      We've opened WhatsApp with your trip details for{" "}
                      <span className="font-semibold text-ink">
                        {selectedService?.title}
                      </span>
                      . Just hit send and our team will take it from there!
                    </p>
                    <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-brand-wash px-4 py-2.5 text-sm">
                      <MessageCircle className="size-4 text-leaf" />
                      <span className="font-semibold text-ink">
                        {siteConfig.whatsappDisplay}
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Step 0: Service */}
                    {step === 0 && (
                      <StepShell
                        icon={Compass}
                        title="What can we plan for you?"
                        desc="Pick a service — or choose Custom Planning for anything else."
                      >
                        <div className="grid gap-3 sm:grid-cols-2">
                          {serviceOptions.map((opt) => (
                            <OptionCard
                              key={opt.slug}
                              selected={form.service === opt.slug}
                              onClick={() =>
                                setForm((f) => ({ ...f, service: opt.slug }))
                              }
                              title={opt.title}
                              desc={opt.short}
                              icon={opt.icon}
                            />
                          ))}
                        </div>
                      </StepShell>
                    )}

                    {/* Step 1: Destination */}
                    {step === 1 && (
                      <StepShell
                        icon={Compass}
                        title="Where would you like to go?"
                        desc={
                          form.service === "custom"
                            ? "Tell us your destination — or describe the kind of place you have in mind."
                            : "Tell us your dream destination(s). Be as specific or open as you like."
                        }
                      >
                        <Input
                          autoFocus
                          value={form.destination}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, destination: e.target.value }))
                          }
                          placeholder="e.g. Dubai, Maldives, Makkah, Kerala…"
                          className="h-12 rounded-xl border-border bg-muted/40 text-sm"
                        />
                        {form.service === "custom" && (
                          <div className="mt-4">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Anything else? (optional)
                            </label>
                            <textarea
                              value={form.notes}
                              onChange={(e) =>
                                setForm((f) => ({ ...f, notes: e.target.value }))
                              }
                              placeholder="Describe your enquiry — we handle wildcards and special requests too."
                              className="mt-1.5 min-h-[100px] w-full rounded-xl border border-border bg-muted/40 p-3 text-sm"
                            />
                          </div>
                        )}
                      </StepShell>
                    )}

                    {/* Step 2: Dates */}
                    {step === 2 && (
                      <StepShell
                        icon={CalendarDays}
                        title="When are you planning to travel?"
                        desc="Approximate dates or a timeframe works perfectly."
                      >
                        <Input
                          autoFocus
                          value={form.dates}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, dates: e.target.value }))
                          }
                          placeholder="e.g. 15–22 Dec 2026, or 'sometime in January'"
                          className="h-12 rounded-xl border-border bg-muted/40 text-sm"
                        />
                      </StepShell>
                    )}

                    {/* Step 3: Travellers */}
                    {step === 3 && (
                      <StepShell
                        icon={Users}
                        title="How many travellers?"
                        desc="This helps us pick the right accommodations and transport."
                      >
                        <div className="grid gap-3 sm:grid-cols-2">
                          {travellerOptions.map((opt) => (
                            <OptionCard
                              key={opt.value}
                              selected={form.travellers === opt.value}
                              onClick={() =>
                                setForm((f) => ({ ...f, travellers: opt.value }))
                              }
                              title={opt.label}
                              desc={opt.desc}
                            />
                          ))}
                        </div>
                      </StepShell>
                    )}

                    {/* Step 4: Budget */}
                    {step === 4 && (
                      <StepShell
                        icon={Wallet}
                        title="What's your budget per person?"
                        desc="We have the best deals for every range — Best Price Guarantee."
                      >
                        <div className="grid gap-3 sm:grid-cols-2">
                          {budgetOptions.map((opt) => (
                            <OptionCard
                              key={opt.value}
                              selected={form.budget === opt.value}
                              onClick={() =>
                                setForm((f) => ({ ...f, budget: opt.value }))
                              }
                              title={opt.label}
                              desc={opt.desc}
                            />
                          ))}
                        </div>
                      </StepShell>
                    )}

                    {/* Step 5: Phone */}
                    {step === 5 && (
                      <StepShell
                        icon={Phone}
                        title="Where can we reach you?"
                        desc="Our travel experts will call you within 24 hours to finalize your plan."
                      >
                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            autoFocus
                            type="tel"
                            value={form.phone}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, phone: e.target.value }))
                            }
                            placeholder="+91 89215 95561"
                            className="h-12 rounded-xl border-border bg-muted/40 pl-10 text-sm"
                          />
                        </div>
                        <p className="mt-3 text-xs text-muted-foreground">
                          By submitting, you agree to be contacted by Buy The Way
                          Journeys about your trip enquiry.
                        </p>
                      </StepShell>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer nav */}
            {!done && (
              <div className="flex items-center justify-between border-t border-border px-6 py-4">
                <button
                  onClick={back}
                  disabled={step === 0 || loading}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-ink disabled:opacity-40"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </button>
                <Button
                  onClick={next}
                  disabled={!canProceed || loading}
                  className="h-11 gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-glow-blue disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Submitting…
                    </>
                  ) : step === TOTAL_STEPS - 1 ? (
                    <>
                      Submit request
                      <Check className="size-4" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --- Helper sub-components --- */
function StepShell({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-glow-blue">
          <Icon className="size-6" />
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  title,
  desc,
  icon,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  desc: string;
  icon?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
        selected
          ? "border-brand bg-brand/5 shadow-glow-blue"
          : "border-border bg-white hover:border-brand/30 hover:bg-accent"
      }`}
    >
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
          selected ? "bg-brand text-white" : "bg-muted text-ink/60"
        }`}
      >
        {icon ? (
          <DynamicIcon name={icon} className="size-5" />
        ) : (
          <Check className={`size-5 ${selected ? "opacity-100" : "opacity-0"}`} />
        )}
      </span>
      <div className="flex-1">
        <p className={`text-sm font-semibold ${selected ? "text-brand" : "text-ink"}`}>
          {title}
        </p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      {selected && (
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
          <Check className="size-3" />
        </span>
      )}
    </button>
  );
}

/* Lightweight icon resolver (avoids importing the full icon map) */
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    Compass,
    Building2,
    Moon,
    PartyPopper,
    Sparkles,
    Users,
    Wallet,
    CalendarDays,
    Phone,
  };
  const Icon = map[name] ?? Sparkles;
  return <Icon className={className} />;
}
