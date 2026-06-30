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
      { title: "Yog Jivan Sanctuary — Transform Your Body. Heal Your Mind. Elevate Your Soul." },
      { name: "description", content: "Authentic Indian yoga for modern life. Private, studio, online and therapeutic programs in Hai Duong & online, guided by Master Anil Choudhary. 12+ years, 1000+ students, 20+ countries." },
      { name: "keywords", content: "luxury yoga, therapeutic yoga, private yoga sessions, online yoga classes, yoga in Vietnam, Indian yoga teacher, healing yoga, yoga sanctuary, Master Anil Choudhary" },
      { property: "og:title", content: "Yog Jivan Sanctuary — Authentic Indian Yoga & Therapeutic Healing" },
      { property: "og:description", content: "Transform your body. Heal your mind. Elevate your soul. Private, studio, online and therapeutic programs." },
      { property: "og:url", content: "https://yog-jivan-zenith.lovable.app/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yog Jivan Sanctuary" },
      { name: "twitter:description", content: "Transform your body. Heal your mind. Elevate your soul." },
    ],
    links: [
      { rel: "canonical", href: "https://yog-jivan-zenith.lovable.app/" },
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
