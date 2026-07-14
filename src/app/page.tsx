import { Hero } from "@/components/site/hero";
import { AboutSection } from "@/components/site/about-section";
import { WhyChooseUsSection } from "@/components/site/why-choose-us-section";
import { ServicesSection } from "@/components/site/services-section";
import { FeaturedDestinations } from "@/components/site/featured-destinations";
import { CtaParallax } from "@/components/site/cta-parallax";
import { ContactSection } from "@/components/site/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <FeaturedDestinations />
      <CtaParallax />
      <ContactSection />
    </>
  );
}
