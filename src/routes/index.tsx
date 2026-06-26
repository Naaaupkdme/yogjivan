import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { FounderJourney } from "@/components/site/FounderJourney";
import { TrustSection } from "@/components/site/TrustSection";
import { Services } from "@/components/site/Services";
import { Transformation } from "@/components/site/Transformation";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { CommunitySection } from "@/components/site/CommunitySection";
import { SmartWellnessJourney } from "@/components/site/SmartWellnessJourney";
import { Corporate } from "@/components/site/Corporate";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yog Jivan Sanctuary — Luxury Yoga, Therapeutic Healing & Online Programs" },
      { name: "description", content: "Authentic Indian yoga, therapeutic healing, private sessions, luxury studio classes, and online programs guided by Master Anil Choudhary — Hai Duong & Online." },
      { name: "keywords", content: "online yoga classes, therapeutic yoga, private yoga sessions, luxury yoga studio, yoga in Vietnam, Indian yoga teacher, healing yoga, yoga for back pain, authentic yoga online" },
      { property: "og:title", content: "Yog Jivan Sanctuary — Luxury Yoga & Therapeutic Healing" },
      { property: "og:description", content: "Ancient Indian wisdom. Modern therapeutic mastery. Quiet luxury." },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yog Jivan Sanctuary" },
      { name: "twitter:description", content: "Ancient Indian wisdom. Modern therapeutic mastery. Quiet luxury." },
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
      <CommunitySection />
      <SmartWellnessJourney />
      <Testimonials />
      <Corporate />
      <ContactSection />
    </>
  );
}
