import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Corporate } from "@/components/site/Corporate";
import { ContactSection } from "@/components/site/ContactSection";
import { breadcrumbSchema } from "@/lib/schema";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate Yoga & Wellness Programs in Vietnam — Yog Jivan" },
      { name: "description", content: "On-site and virtual corporate yoga and wellness programs across Vietnam. Reduce stress, improve posture, boost productivity and retain talent." },
      { property: "og:title", content: "Corporate Yoga & Wellness — Yog Jivan Vietnam" },
      { property: "og:description", content: "Yoga and wellness programs designed for high-performing teams in Vietnam." },
      { property: "og:url", content: "https://yogjivan.com/corporate" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Corporate Yoga & Wellness — Yog Jivan Vietnam" },
      { name: "twitter:description", content: "Yoga and wellness programs designed for high-performing teams in Vietnam." },
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
