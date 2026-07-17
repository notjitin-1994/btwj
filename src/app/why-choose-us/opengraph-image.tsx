import { getOGImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "Why Choose Us — Buy The Way Journeys";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return getOGImage(
    "Why Choose Us",
    "Discover why thousands of travellers trust Buy The Way Journeys for their dream vacations, Umrah packages, and event management."
  );
}
