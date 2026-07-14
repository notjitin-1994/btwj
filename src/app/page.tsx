import { Hero } from "@/components/site/hero";
import { MarqueeBand } from "@/components/site/brand-extras";
import { HomeServicesTeaser, HomeAboutTeaser, HomeHowItWorks, HomeWhyTeaser, HomeContactCta } from "@/components/site/home-teasers";
import { FeaturedDestinations } from "@/components/site/featured-destinations";
import { CtaParallax } from "@/components/site/cta-parallax";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <HomeServicesTeaser />
      <FeaturedDestinations />
      <HomeAboutTeaser />
      <HomeHowItWorks />
      <HomeWhyTeaser />
      <CtaParallax />
      <HomeContactCta />
    </>
  );
}
