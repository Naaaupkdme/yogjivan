import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Gallery } from "@/components/site/Gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Yog Jivan Studio Hai Duong" },
      { name: "description", content: "Photographs from inside Yog Jivan — our studios, Master Anil, outdoor classes and students in practice." },
      { property: "og:title", content: "Gallery — Yog Jivan" },
      { property: "og:description", content: "A visual journey through Yog Jivan." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="The Gallery" title="A visual" accent="journey." sub="Inside the sanctuary, on the mat, beneath the open sky." />
      <Gallery />
    </>
  ),
});
