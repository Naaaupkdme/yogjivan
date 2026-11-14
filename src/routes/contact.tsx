import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ContactSection } from "@/components/site/ContactSection";
import { breadcrumbSchema } from "@/lib/schema";
import { HelpCircle } from "lucide-react";
import { openHelpSheet } from "@/components/support/HelpSheet";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book a Free Yoga Consultation — Yog Jivan Hai Duong" },
      { name: "description", content: "Book a free yoga consultation with the Yog Jivan team. Two premium studios in Hai Duong, Vietnam. Reach us on WhatsApp, Zalo, phone or email." },
      { property: "og:title", content: "Contact Yog Jivan — Book a Free Consultation" },
      { property: "og:description", content: "Reach the studio in Hai Duong. Book a free yoga consultation." },
      { property: "og:url", content: "https://www.yogjivan.com/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Yog Jivan — Book a Free Consultation" },
      { name: "twitter:description", content: "Reach the studio in Hai Duong. Book a free yoga consultation." },
    ],
    links: [{ rel: "canonical", href: "https://www.yogjivan.com/contact" }],
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
      <div className="container-luxe -mt-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[color:var(--gold)]/25 bg-black/40 p-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-[color:var(--gold)] shrink-0" />
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Need help with an existing booking?</strong> Reschedule, check timing, or send a support question to our team.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openHelpSheet("ask")}
            className="btn-ghost-gold text-xs py-1.5 px-3.5 whitespace-nowrap"
          >
            Open Help & Support &rarr;
          </button>
        </div>
      </div>
      <ContactSection />
    </>
  ),
});
