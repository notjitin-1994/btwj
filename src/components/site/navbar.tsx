"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Phone, ChevronDown, ArrowUpRight, X, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { mainNav, siteConfig } from "@/lib/site-config";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => {
      // Navbar gets its background as soon as the user starts scrolling
      // (moves out of the fixed top position). Transparent only at scrollY=0.
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Transparent at the top of every page (over dark hero), solid white when scrolled past hero
  const transparent = !scrolled;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={false}
        animate={{
          paddingTop: scrolled ? 8 : 16,
          paddingBottom: scrolled ? 8 : 16,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="px-4 sm:px-6 lg:px-8"
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-3 transition-all duration-300 sm:px-5",
            scrolled
              ? "border border-border bg-white shadow-premium h-16"
              : "bg-transparent h-[4.75rem]"
          )}
        >
          {/* Logo — adapts to background: white over dark hero, colored over white */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label={siteConfig.name}
          >
            <div className="relative h-10 w-auto shrink-0 transition-transform duration-300 group-hover:scale-[1.04]">
              <Image
                src={siteConfig.logo}
                alt="Buy The Way Journeys logo"
                width={150}
                height={44}
                priority
                className={cn(
                  "h-10 w-auto object-contain transition-[filter] duration-300",
                  transparent && "brightness-0 invert"
                )}
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) =>
              item.spotlight ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative rounded-full px-4 py-2 text-sm font-semibold text-[var(--china-red)] transition-colors hover:text-[var(--china-red)]"
                >
                  {item.label}
                </Link>
              ) : item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? transparent
                          ? "text-leaf"
                          : "text-leaf"
                        : transparent
                        ? "text-white/85 hover:text-white"
                        : "text-ink/70 hover:text-brand"
                    )}
                    aria-expanded={servicesOpen}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-300",
                        servicesOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3"
                      >
                        <div className="glass overflow-hidden rounded-2xl p-2 shadow-premium-lg">
                          <div className="mb-1 flex items-center justify-between px-3 pt-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                              Our Services
                            </span>
                            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                              We're with you
                            </span>
                          </div>
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-brand/5"
                            >
                              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand text-white shadow-glow">
                                <ArrowUpRight className="size-4" />
                              </span>
                              <span className="flex-1">
                                <span className="block text-sm font-semibold text-ink group-hover:text-brand">
                                  {child.label}
                                </span>
                                <span className="block text-xs text-muted-foreground">
                                  {child.description}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? transparent
                        ? "text-leaf"
                        : "text-leaf"
                      : transparent
                      ? "text-white/85 hover:text-white"
                      : "text-ink/70 hover:text-brand"
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-leaf"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on Instagram"
              className={cn(
                "ig-icon-hover hidden h-10 w-10 items-center justify-center rounded-full sm:inline-flex",
                transparent ? "text-white" : "text-brand"
              )}
            >
              <Instagram className="size-5" />
            </a>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className={cn(
                "hidden h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors sm:inline-flex",
                transparent
                  ? "text-white hover:bg-white/10"
                  : "text-brand hover:bg-brand/10"
              )}
            >
              <Phone className="size-4" />
              {siteConfig.phone}
            </a>

            {/* Mobile menu */}
            <Sheet open={openMenu} onOpenChange={setOpenMenu}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "lg:hidden h-10 w-10 rounded-full transition-colors",
                    transparent
                      ? "text-white hover:bg-white/10"
                      : "text-ink hover:bg-accent"
                  )}
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                hideClose
                className="w-full max-w-none border-l-0 bg-white p-0"
              >
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <Image
                      src={siteConfig.logo}
                      alt="Buy The Way Journeys"
                      width={130}
                      height={38}
                      className="h-9 w-auto object-contain"
                    />
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-brand/10 text-brand hover:bg-brand hover:text-white"
                      >
                        <span className="sr-only">Close</span>
                        <X className="size-5" />
                      </Button>
                    </SheetClose>
                  </div>

                  <nav className="scroll-area-custom flex-1 overflow-y-auto px-3 py-4">
                    {mainNav.map((item) => (
                      <div key={item.label} className="mb-1">
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                              item.spotlight
                                ? "text-[var(--china-red)] font-semibold"
                                : isActive(item.href)
                                  ? "bg-leaf/8 text-leaf"
                                  : "text-ink/80 hover:bg-accent"
                            )}
                          >
                            {item.label}
                            {item.children && (
                              <ChevronDown className="size-4 text-muted-foreground" />
                            )}
                          </Link>
                        </SheetClose>
                        {item.children && (
                          <div className="ml-3 mt-1 space-y-1 border-l border-border pl-3">
                            {item.children.map((child) => (
                              <SheetClose asChild key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-brand"
                                >
                                  {child.label}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>

                  <div className="border-t border-border p-4">
                    <Button
                      asChild
                      className="h-12 w-full rounded-xl bg-brand text-sm font-semibold shadow-glow-blue"
                    >
                      <a href={`tel:${siteConfig.phoneTel}`} className="gap-2">
                        <Phone className="size-4" />
                        Call {siteConfig.phone}
                      </a>
                    </Button>
                    <a
                      href={siteConfig.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-brand/20 bg-brand/5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
                    >
                      <Instagram className="size-4" />
                      Follow {siteConfig.instagramHandle}
                    </a>
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                      {siteConfig.address.full}
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
