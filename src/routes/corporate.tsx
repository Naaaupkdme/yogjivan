import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Corporate } from "@/components/site/Corporate";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate Wellness Programs — Yog Jivan Vietnam" },
      { name: "description", content: "On-site and virtual corporate yoga and wellness programs in Vietnam. Reduce stress, boost productivity, retain talent." },
      { property: "og:title", content: "Corporate Yoga & Wellness — Yog Jivan" },
      { property: "og:description", content: "Yoga and wellness programs for high-performing teams." },
      { property: "og:url", content: "/corporate" },
    ],
    links: [{ rel: "canonical", href: "/corporate" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="For Organizations" title="A wellness program your team will actually" accent="keep." sub="Custom on-site and virtual yoga programs for executives, knowledge workers and creative leaders." />
      <Corporate />
      <ContactSection />
    </>
  ),
});
