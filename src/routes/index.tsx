import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { FounderJourney } from "@/components/site/FounderJourney";
import { TrustSection } from "@/components/site/TrustSection";
import { Services } from "@/components/site/Services";
import { Transformation } from "@/components/site/Transformation";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { CommunitySection } from "@/components/site/CommunitySection";
import { Corporate } from "@/components/site/Corporate";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yog Jivan — Ultra Luxury Wellness Sanctuary" },
      { name: "description", content: "A cinematic luxury wellness website for Yog Jivan — immersive yoga, therapeutic healing, and transformational programs in Hai Duong, Vietnam." },
      { property: "og:title", content: "Yog Jivan — Ultra Luxury Wellness Sanctuary" },
      { property: "og:description", content: "Transform your body, elevate your mind, and experience true wellness in a premium sanctuary." },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <FounderJourney />
      <TrustSection />
      <Services />
      <Transformation />
      <Gallery />
      <Testimonials />
      <CommunitySection />
      <Corporate />
      <ContactSection />
    </>
  );
}
