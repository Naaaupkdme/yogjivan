import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Hero } from "@/components/site/Hero";
import { FAQS } from "@/lib/faqs";

const Philosophy = lazy(() => import("@/components/site/Philosophy").then(m => ({ default: m.Philosophy })));
const TrustSection = lazy(() => import("@/components/site/TrustSection").then(m => ({ default: m.TrustSection })));
const WhyChoose = lazy(() => import("@/components/site/WhyChoose").then(m => ({ default: m.WhyChoose })));
const Services = lazy(() => import("@/components/site/Services").then(m => ({ default: m.Services })));
const FounderStory = lazy(() => import("@/components/site/FounderStory").then(m => ({ default: m.FounderStory })));
const Transformation = lazy(() => import("@/components/site/Transformation").then(m => ({ default: m.Transformation })));
const Gallery = lazy(() => import("@/components/site/Gallery").then(m => ({ default: m.Gallery })));
const VideoTestimonials = lazy(() => import("@/components/site/VideoTestimonials").then(m => ({ default: m.VideoTestimonials })));
const Testimonials = lazy(() => import("@/components/site/Testimonials").then(m => ({ default: m.Testimonials })));
const FAQ = lazy(() => import("@/components/site/FAQ").then(m => ({ default: m.FAQ })));
const ContactSection = lazy(() => import("@/components/site/ContactSection").then(m => ({ default: m.ContactSection })));

const Skeleton = () => <div className="section-skeleton section-y" aria-hidden />;

const Lazy = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Skeleton />}>{children}</Suspense>
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yoga Studio Near Me in Hai Duong — Yog Jivan Sanctuary" },
      { name: "description", content: "Authentic Indian yoga in Hai Duong, Vietnam and online worldwide. Private, studio, online, therapeutic and corporate programs with Master Anil Choudhary. 12+ years · 1000+ students · 20+ countries." },
      { name: "keywords", content: "yoga near me, yoga studio near me, yoga classes in Hai Duong, yoga studio Hai Duong Vietnam, online yoga classes, yoga for beginners, therapeutic yoga, yoga for back pain, yoga for anxiety, yoga for PCOD, private yoga sessions Hai Duong, Master Anil Choudhary" },
      { property: "og:title", content: "Yoga Studio Near Me in Hai Duong — Yog Jivan Sanctuary" },
      { property: "og:description", content: "Authentic Indian yoga studio in Hai Duong, Vietnam and online worldwide. Private, studio, online and therapeutic programs." },
      { property: "og:url", content: "https://www.yogjivan.com/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga Studio Near Me in Hai Duong — Yog Jivan" },
      { name: "twitter:description", content: "Authentic Indian yoga in Hai Duong, Vietnam. Studio, online, therapeutic and corporate programs." },
    ],
    links: [
      { rel: "canonical", href: "https://www.yogjivan.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://yog-jivan-zenith.lovable.app/" },
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
      <Lazy><Philosophy /></Lazy>
      <Lazy><TrustSection /></Lazy>
      <Lazy><WhyChoose /></Lazy>
      <Lazy><Services /></Lazy>
      <Lazy><FounderStory /></Lazy>
      <Lazy><Transformation /></Lazy>
      <Lazy><Gallery /></Lazy>
      <Lazy><VideoTestimonials /></Lazy>
      <Lazy><Testimonials /></Lazy>
      <Lazy><FAQ /></Lazy>
      <Lazy><ContactSection /></Lazy>
    </>
  );
}
