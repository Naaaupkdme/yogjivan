import { masterImages, socialImageMeta } from "@/lib/images";
import { createFileRoute } from "@tanstack/react-router";
import { hreflangLinks, PAIR_HOME } from "@/lib/locale-routes";
import { lazy, Suspense } from "react";
import { Hero } from "@/components/site/Hero";
import { LocalIntro } from "@/components/site/LocalIntro";
import { DiscoverTopics } from "@/components/site/DiscoverTopics";
import { PrimaryPaths } from "@/components/site/PrimaryPaths";
import { Leadership } from "@/components/site/Leadership";

import { FAQS } from "@/lib/faqs";

const TrustSection = lazy(() => import("@/components/site/TrustSection").then(m => ({ default: m.TrustSection })));
const FounderStory = lazy(() => import("@/components/site/FounderStory").then(m => ({ default: m.FounderStory })));
const Gallery = lazy(() => import("@/components/site/Gallery").then(m => ({ default: m.Gallery })));
const VideoTestimonials = lazy(() => import("@/components/site/VideoTestimonials").then(m => ({ default: m.VideoTestimonials })));
const Testimonials = lazy(() => import("@/components/site/Testimonials").then(m => ({ default: m.Testimonials })));
const FAQ = lazy(() => import("@/components/site/FAQ").then(m => ({ default: m.FAQ })));
const ContactSection = lazy(() => import("@/components/site/ContactSection").then(m => ({ default: m.ContactSection })));

const Skeleton = () => (
  <div className="section-skeleton py-16 flex items-center justify-center" aria-hidden>
    <div className="h-px w-24 bg-gradient-to-r from-transparent via-[color:var(--gold)]/35 to-transparent animate-pulse" />
  </div>
);

const Lazy = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Skeleton />}>{children}</Suspense>
);

const HOME_TITLE = "Private Online Yoga 1-on-1, Family & Couples | Yog Jivan";
const HOME_DESC =
  "Live private 1-on-1 online yoga with certified Yog Jivan teachers, plus couples, family and kids yoga online, live group classes and 2 studios in Hai Duong. Book a free consultation.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESC },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESC },
      { property: "og:url", content: "https://www.yogjivan.com/" },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.warriorClass),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESC },
    ],
    links: [
      { rel: "canonical", href: "https://www.yogjivan.com/" },
      ...hreflangLinks(PAIR_HOME),
    ],
    scripts: [
      // WebSite, Organization, Person and LocalBusiness nodes are emitted once
      // sitewide from __root.tsx as a connected @id graph — no duplicates here.

      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yogjivan.com/" },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <PrimaryPaths />
      <LocalIntro />

      <Lazy><TrustSection /></Lazy>
      <Lazy><FounderStory /></Lazy>
      <Leadership />
      <DiscoverTopics />
      <Lazy><Gallery /></Lazy>
      <Lazy><VideoTestimonials /></Lazy>
      <Lazy><Testimonials /></Lazy>
      <Lazy><FAQ /></Lazy>
      <Lazy><ContactSection /></Lazy>
    </>
  );
}
