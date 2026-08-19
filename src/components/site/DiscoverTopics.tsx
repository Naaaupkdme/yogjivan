import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { openSiteSearch } from "@/components/site/SiteSearch";

const TOPICS: { title: string; href: string; text: string }[] = [
  {
    title: "Yoga Classes in Hai Duong",
    href: "/programs",
    text: "In-person group classes at our two studios serving the Hai Duong urban area.",
  },
  {
    title: "Yoga for Beginners",
    href: "/yoga-for-beginners",
    text: "A structured starting path for people who have never practised before.",
  },
  {
    title: "Online Yoga Classes",
    href: "/online-yoga-classes",
    text: "Live 60-minute small-group classes with a maximum of 8 students.",
  },
  {
    title: "Private Yoga",
    href: "/private-online-yoga",
    text: "One-to-one sessions with Master Anil, in studio or live online by enquiry.",
  },
  {
    title: "Yoga for Back Pain",
    href: "/yoga-for-back-pain",
    text: "Alignment-led practice designed around the spine, neck and daily posture.",
  },
  {
    title: "Yoga for Stress",
    href: "/yoga-for-stress",
    text: "Slower, breath-led sessions focused on relaxation and calm.",
  },
  {
    title: "Programs & Pricing",
    href: "/programs",
    text: "Compare studio membership, online plans and private sessions by enquiry.",
  },
  {
    title: "Meet Master Anil",
    href: "/about",
    text: "The teacher, the Indian yoga background and the approach behind Yog Jivan.",
  },
];

export function DiscoverTopics() {
  return (
    <section className="relative py-16 md:py-20" aria-labelledby="discover-topics-heading">
      <div className="container-luxe">
        <div className="max-w-2xl">
          <p className="eyebrow">Find your practice</p>
          <h2 id="discover-topics-heading" className="mt-4 text-[clamp(1.7rem,3.2vw,2.6rem)] leading-[1.1]">
            What are you <span className="italic text-gold-gradient">looking for?</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Choose a starting point or search the full Yog Jivan website.
          </p>
        </div>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((t) => (
            <Link
              key={t.title}
              to={t.href}
              className="group rounded-2xl border border-white/8 bg-[color:var(--onyx)]/40 p-5 transition-colors hover:border-[color:var(--gold)]/35 hover:bg-[color:var(--onyx)]/60"
            >
              <div className="font-display text-base text-foreground group-hover:text-[color:var(--gold)]">{t.title}</div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.text}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <button type="button" onClick={openSiteSearch} className="btn-ghost-gold inline-flex items-center gap-2">
            <Search className="h-4 w-4" strokeWidth={1.5} />
            Search all topics
          </button>
        </div>
      </div>
    </section>
  );
}
