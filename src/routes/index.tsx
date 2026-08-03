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

const HOME_TITLE = "Yoga Classes in Hai Duong | Two Studios & Live Online — Yog Jivan";
const HOME_DESC =
  "Authentic Indian yoga at two studios serving the Hai Duong urban area, taught personally by Master Anil Choudhary. Beginner, therapeutic and personal yoga — plus live online classes worldwide.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESC },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESC },
      { property: "og:url", content: "https://yogjivan.com/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESC },
    ],
    links: [
      { rel: "canonical", href: "https://yogjivan.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Yog Jivan",
          url: "https://yogjivan.com/",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Master Anil Choudhary",
          jobTitle: "Founder & Lead Yoga Teacher",
          url: "https://yogjivan.com/about",
          worksFor: { "@type": "Organization", name: "Yog Jivan", url: "https://yogjivan.com" },
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
          description: "Live online yoga classes led personally by Master Anil Choudhary, Founder & Lead Yoga Teacher. Small-batch, therapeutic, and personalized for students worldwide.",
          provider: { "@type": "Organization", name: "Yog Jivan", sameAs: "https://yogjivan.com" },
          url: "https://yogjivan.com/online-yoga-classes",
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Online",
            location: { "@type": "VirtualLocation", url: "https://yogjivan.com/online-yoga-classes" },
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
            { "@type": "ListItem", position: 1, name: "Home", item: "https://yogjivan.com/" },
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
