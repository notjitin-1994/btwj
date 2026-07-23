import { Hero } from "@/components/site/hero";
import { EventSection } from "@/components/site/event-section";
import { FeaturedDestinations } from "@/components/site/featured-destinations";
import { HomeHowItWorks } from "@/components/site/home-teasers";
import { InstagramFollowBand } from "@/components/site/instagram-band";
import { WhatsAppCta } from "@/components/site/whatsapp-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <EventSection />
      <FeaturedDestinations />
      <HomeHowItWorks />
      <InstagramFollowBand />
      <WhatsAppCta />
    </>
  );
}
