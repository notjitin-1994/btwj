import { getOGImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "About Us — Buy The Way Journeys";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return getOGImage(
    "About Buy The Way Journeys",
    "More than a travel agency — we are your partners in exploration. Based in India & UAE, bringing dreams to life with 10+ years of expertise."
  );
}
