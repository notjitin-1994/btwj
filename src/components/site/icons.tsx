"use client";

import {
  Compass,
  Building2,
  Moon,
  PartyPopper,
  BadgePercent,
  CalendarCheck2,
  MapPin,
  Plane,
  Hotel,
  Users,
  ShieldCheck,
  Headset,
  Globe2,
  Wallet,
  Clock,
  Star,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Compass,
  Building2,
  Moon,
  PartyPopper,
  BadgePercent,
  CalendarCheck2,
  MapPin,
  Plane,
  Hotel,
  Users,
  ShieldCheck,
  Headset,
  Globe2,
  Wallet,
  Clock,
  Star,
};

export function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Compass;
  return <Icon className={className} />;
}
