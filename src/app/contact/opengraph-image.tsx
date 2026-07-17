import { getOGImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "Contact — Buy The Way Journeys";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return getOGImage(
    "Contact Our Experts",
    "Book your next trip or event today! Drop us a message or call our India or UAE offices to start planning your customized journey."
  );
}
