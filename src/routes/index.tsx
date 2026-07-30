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
      { title: "Yog Jivan | Yoga Studio Hai Duong & Live Online" },
      { name: "description", content: "Authentic Indian yoga in Hai Duong, Vietnam and live online. Therapeutic, private and studio classes with Master Anil. Book a free trial." },
      { name: "keywords", content: "online yoga classes, authentic Indian yoga, live online yoga, therapeutic yoga, yoga for beginners, yoga for back pain, yoga for anxiety, yoga for PCOD, certified Indian yoga teacher, yoga near me, Master Anil Choudhary" },
      { property: "og:title", content: "Yog Jivan | Yoga Studio Hai Duong & Live Online" },
      { property: "og:description", content: "Authentic Indian yoga in Hai Duong, Vietnam and live online. Therapeutic, private and studio classes with Master Anil. Book a free trial." },
      { property: "og:url", content: "https://www.yogjivan.com/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yog Jivan | Yoga Studio Hai Duong & Live Online" },
      { name: "twitter:description", content: "Authentic Indian yoga in Hai Duong, Vietnam and live online. Therapeutic, private and studio classes with Master Anil. Book a free trial." },
    ],
    links: [
      { rel: "canonical", href: "https://www.yogjivan.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Yog Jivan",
          url: "https://www.yogjivan.com/",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.yogjivan.com/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Master Anil Choudhary",
          jobTitle: "Certified Indian Yoga Master & Therapeutic Yoga Teacher",
          url: "https://www.yogjivan.com/about",
          worksFor: { "@type": "Organization", name: "Yog Jivan", url: "https://www.yogjivan.com" },
          nationality: "Indian",
          knowsAbout: [
            "Authentic Indian Yoga",
            "Therapeutic Yoga",
            "Yoga for Back Pain",
            "Yoga for Anxiety",
            "Yoga for PCOD",
            "Hatha Yoga",
            "Ashtanga Yoga",
            "Pranayama",
            "Meditation",
          ],
          sameAs: [
            "https://www.instagram.com/anil_yog_jivan",
            "https://youtube.com/@yogjivanvietnam",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Authentic Indian Online Yoga Classes",
          description: "Live online yoga classes led by Certified Indian Yoga Master Anil Choudhary. Small-batch, therapeutic, and personalized for students worldwide.",
          provider: { "@type": "Organization", name: "Yog Jivan", sameAs: "https://www.yogjivan.com" },
          url: "https://www.yogjivan.com/online-yoga-classes",
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Online",
            location: { "@type": "VirtualLocation", url: "https://www.yogjivan.com/online-yoga-classes" },
          },
        }),
      },
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
