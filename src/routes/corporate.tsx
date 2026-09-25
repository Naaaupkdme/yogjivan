import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Corporate } from "@/components/site/Corporate";
import { ContactSection } from "@/components/site/ContactSection";
import { breadcrumbSchema } from "@/lib/schema";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate Yoga & Wellness Programs in Vietnam — Yog Jivan" },
      { name: "description", content: "Custom on-site, hybrid and virtual corporate yoga and wellness programs for organizations in Vietnam and online worldwide." },
      { property: "og:title", content: "Corporate Yoga & Wellness — Yog Jivan Vietnam" },
      { property: "og:description", content: "Custom yoga and wellness sessions for organizations in Vietnam and online worldwide." },
      { property: "og:url", content: "https://yogjivan.com/corporate" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Corporate Yoga & Wellness — Yog Jivan Vietnam" },
      { name: "twitter:description", content: "Custom yoga and wellness sessions for organizations in Vietnam and online worldwide." },
    ],
    links: [{ rel: "canonical", href: "https://yogjivan.com/corporate" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbSchema("Corporate", "/corporate")),
    }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="For Organizations" title="A wellness program your team will actually" accent="keep." sub="Custom on-site and virtual yoga programs for executives, knowledge workers and creative leaders." />
      <Corporate />
      <ContactSection />
    </>
  ),
});
