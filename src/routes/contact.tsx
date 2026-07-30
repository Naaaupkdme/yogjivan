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
    ],
    links: [{ rel: "canonical", href: "https://yogjivan.com/contact" }],
    scripts: [
      {
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
      },
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
