import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Programs } from "@/components/site/Programs";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { Transformation } from "@/components/site/Transformation";
import { Corporate } from "@/components/site/Corporate";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yog Jivan — Luxury Yoga, Wellness & Transformation | Hai Duong, Vietnam" },
      { name: "description", content: "Premium yoga studio in Hai Duong, Vietnam. Authentic yoga, therapeutic healing and holistic wellness with Master Anil Choudhary — 12+ years of experience." },
      { name: "keywords", content: "Yoga Studio Vietnam, Yoga Hai Duong, Online Yoga Classes, Personal Yoga Training, Therapeutic Yoga Vietnam, Corporate Yoga Vietnam, Yoga Teacher Vietnam, Holistic Wellness Vietnam" },
      { property: "og:title", content: "Yog Jivan — Luxury Yoga & Wellness" },
      { property: "og:description", content: "Authentic yoga, therapeutic healing and holistic wellness with Master Anil Choudhary in Hai Duong, Vietnam." },
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
      <About />
      <Services />
      <Programs />
      <Transformation />
      <Gallery />
      <Testimonials />
      <Corporate />
      <ContactSection />
    </>
  );
}
