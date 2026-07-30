import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Gallery } from "@/components/site/Gallery";
import { breadcrumbSchema } from "@/lib/schema";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Studio Gallery — Yog Jivan Yoga Studio Hai Duong" },
      { name: "description", content: "Photographs from inside the Yog Jivan yoga studio in Hai Duong, Vietnam — our sanctuary, Master Anil, outdoor classes and students in practice." },
      { property: "og:title", content: "Studio Gallery — Yog Jivan Hai Duong" },
      { property: "og:description", content: "A visual journey through the Yog Jivan yoga studio in Hai Duong." },
      { property: "og:url", content: "https://yogjivan.com/gallery" },
    ],
    links: [{ rel: "canonical", href: "https://yogjivan.com/gallery" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbSchema("Gallery", "/gallery")),
    }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="The Gallery" title="A visual" accent="journey." sub="Inside the sanctuary, on the mat, beneath the open sky." />
      <Gallery />
    </>
  ),
});
