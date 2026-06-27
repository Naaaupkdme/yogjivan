import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { FounderJourney } from "@/components/site/FounderJourney";
import { TrustSection } from "@/components/site/TrustSection";
import { Services } from "@/components/site/Services";
import { Philosophy } from "@/components/site/Philosophy";
import { Transformation } from "@/components/site/Transformation";
import { Gallery } from "@/components/site/Gallery";
import { CommunitySection } from "@/components/site/CommunitySection";
import { Testimonials } from "@/components/site/Testimonials";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yog Jivan Sanctuary — Luxury Yoga, Therapeutic Healing & Online Programs" },
      { name: "description", content: "Ancient Indian wisdom. Modern therapeutic mastery. Quiet luxury. Private sessions, therapeutic healing, luxury studio classes and online transformation programs guided by Master Anil Choudhary — Hai Duong & Online." },
      { name: "keywords", content: "luxury yoga, therapeutic yoga, private yoga sessions, online yoga classes, yoga in Vietnam, Indian yoga teacher, healing yoga, yoga sanctuary, Master Anil Choudhary" },
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
      <div id="journey"><FounderJourney /></div>
      <TrustSection />
      <Services />
      <Transformation />
      <Gallery />
      <CommunitySection />
      <Testimonials />
      <ContactSection />
    </>
  );
}
