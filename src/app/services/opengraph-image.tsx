import { getOGImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "Our Services — Buy The Way Journeys";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return getOGImage(
    "Our Premium Services",
    "Tailor-made tour packages, luxury hotel & resort bookings, customized Umrah journeys, and expert event management across the globe."
  );
}
