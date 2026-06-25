import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book a Free Consultation — Yog Jivan" },
      { name: "description", content: "Book a free consultation with Yog Jivan. Two premium studios in Hai Duong, Vietnam. WhatsApp, phone and email available." },
      { property: "og:title", content: "Contact Yog Jivan" },
      { property: "og:description", content: "Reach the studio. Book a free consultation." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Do you offer a free trial class?", acceptedAnswer: { "@type": "Answer", text: "Yes — every new student receives a complimentary consultation and trial session." } },
          { "@type": "Question", name: "Where are your studios located?", acceptedAnswer: { "@type": "Answer", text: "Two premium studios in Hai Duong City, Vietnam." } },
          { "@type": "Question", name: "Do you teach online?", acceptedAnswer: { "@type": "Answer", text: "Yes. Live cohort programs and on-demand series are available worldwide." } },
        ],
      }),
    }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Contact" title="Begin the" accent="conversation." sub="A short message is all we need to design your next step." />
      <ContactSection />
    </>
  ),
});
