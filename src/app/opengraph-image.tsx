import { getOGImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "Buy The Way Journeys";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return getOGImage(
    "Buy The Way Journeys",
    "Customized travel plans designed just for you. Tour packages, hotel & resort bookings, Umrah, and event management."
  );
}
