import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ContactSection } from "@/components/site/ContactSection";
import { breadcrumbSchema } from "@/lib/schema";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book a Free Yoga Consultation — Yog Jivan Hai Duong" },
      { name: "description", content: "Book a free yoga consultation with Master Anil Choudhary. Two premium studios in Hai Duong, Vietnam. Reach us on WhatsApp, Zalo, phone or email." },
      { property: "og:title", content: "Contact Yog Jivan — Book a Free Consultation" },
      { property: "og:description", content: "Reach the studio in Hai Duong. Book a free yoga consultation." },
      { property: "og:url", content: "https://yogjivan.com/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Yog Jivan — Book a Free Consultation" },
      { name: "twitter:description", content: "Reach the studio in Hai Duong. Book a free yoga consultation." },
    ],
    links: [{ rel: "canonical", href: "https://yogjivan.com/contact" }],
    // No FAQPage schema here: this route renders no visible FAQ list, and
    // FAQ markup must have exact parity with visible content.
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Contact", "/contact")),
      },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Contact" title="Begin the" accent="conversation." sub="A short message is all we need to design your next step." />
      <ContactSection />
    </>
  ),
});
