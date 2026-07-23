"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  X,
  Send,
  Loader2,
  User,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useContact } from "@/lib/contact-store";

export function ContactModal() {
  const { open, closeContact } = useContact();
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    message: "",
  });

  // Reset when dialog closes
  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setForm({
          name: "",
          phone: "",
          message: "",
        });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error("Please fill in your name, WhatsApp number and message.");
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
      closeContact();
    } catch {
      toast.error("Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  }

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
            onClick={() => closeContact()}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-white shadow-premium-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-brand-wash px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                  Reach Out
                </p>
                <p className="mt-0.5 font-display text-lg font-semibold text-ink">
                  Send us a message
                </p>
              </div>
              <button
                onClick={() => closeContact()}
                className="flex size-9 items-center justify-center rounded-full bg-white text-ink/60 shadow-premium transition-colors hover:bg-accent hover:text-ink"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[75vh] overflow-y-auto p-6 sm:p-8">
              <form onSubmit={onSubmit} className="relative">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="modal-name" className="text-sm font-medium text-ink">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="modal-name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="e.g. Aisha Mohammed"
                        className="h-12 rounded-xl border-border bg-muted/40 pl-10 text-sm transition-colors focus:border-brand/50 focus:bg-white focus:ring-brand/15"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="modal-phone" className="text-sm font-medium text-ink">
                      WhatsApp Number
                    </Label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="modal-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        placeholder="+91 98765 43210"
                        className="h-12 rounded-xl border-border bg-muted/40 pl-10 text-sm transition-colors focus:border-brand/50 focus:bg-white focus:ring-brand/15"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="modal-message"
                      className="text-sm font-medium text-ink"
                    >
                      Message
                    </Label>
                    <div className="relative">
                      <MessageSquare className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" />
                      <Textarea
                        id="modal-message"
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        placeholder="Tell us what you're looking for..."
                        className="min-h-[120px] rounded-xl border-border bg-muted/40 pl-10 pt-3 text-sm transition-colors focus:border-brand/50 focus:bg-white focus:ring-brand/15"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="shimmer-sweep group mt-4 h-12 w-full gap-2 rounded-xl bg-gradient-brand text-sm font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.01] disabled:opacity-70"
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
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
