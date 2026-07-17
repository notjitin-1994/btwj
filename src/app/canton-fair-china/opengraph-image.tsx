import { getOGImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "Canton Fair China — Buy The Way Journeys";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return getOGImage(
    "Canton Fair China 7D/6N",
    "World's largest B2B trade show. Inclusive package with exclusive business training by Riyas Hakkim. Source products, scale your business."
  );
}
