import { getOGImage } from "@/components/og-image";
import { services } from "@/lib/site-config";

export const runtime = "edge";
export const alt = "Service Details — Buy The Way Journeys";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return getOGImage("Our Services", "Customized travel plans designed just for you.");
  }

  return getOGImage(
    service.title,
    service.description
  );
}
