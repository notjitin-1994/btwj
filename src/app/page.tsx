import { Hero } from "@/components/site/hero";
import { MarqueeBand } from "@/components/site/brand-extras";
import { HomeServicesTeaser, HomeAboutTeaser, HomeHowItWorks, HomeWhyTeaser, HomeContactCta } from "@/components/site/home-teasers";
import { FeaturedDestinations } from "@/components/site/featured-destinations";
import { CtaParallax } from "@/components/site/cta-parallax";
import { InstagramFollowBand } from "@/components/site/instagram-band";
import { InspirationBgSection, VideoBgSection } from "@/components/site/image-bg-sections";
import { EventSection } from "@/components/site/event-section";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <EventSection />
      <HomeServicesTeaser />
      <FeaturedDestinations />
      <InspirationBgSection />
      <HomeAboutTeaser />
      <HomeHowItWorks />
      <VideoBgSection />
      <HomeWhyTeaser />
      <InstagramFollowBand />
      <CtaParallax />
      <HomeContactCta />
    </>
  );
}
