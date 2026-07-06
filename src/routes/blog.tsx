import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { motion } from "framer-motion";

const POSTS = [
  { cat: "Yoga", title: "Why traditional Hatha still matters in 2026", excerpt: "Modern flow classes are everywhere — but the slow, anatomical precision of classical Hatha is the foundation everything stands on.", read: "6 min" },
  { cat: "Health", title: "Yoga for spine longevity: the daily 12 minutes", excerpt: "A short, evidence-informed sequence to keep the spine mobile, strong and pain-free into your seventies.", read: "5 min" },
  { cat: "Wellness", title: "The breath you didn't know you were holding", excerpt: "Most adults breathe through stress without noticing. Here's how to begin un-doing that pattern.", read: "4 min" },
  { cat: "Meditation", title: "A beginner's guide to 20 minutes of stillness", excerpt: "Why 20 minutes is the threshold — and a simple framework anyone can follow tomorrow morning.", read: "7 min" },
  { cat: "Weight Loss", title: "Yoga for sustainable fat loss (without burnout)", excerpt: "Hot vinyasa is not the only path. A calmer protocol that actually works for the long run.", read: "8 min" },
  { cat: "Lifestyle", title: "Building a home practice you'll keep for life", excerpt: "Five rituals from our long-term students — what made them stay on the mat through every season.", read: "5 min" },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Yoga, Wellness & Meditation Journal — Yog Jivan" },
      { name: "description", content: "Practical writing on yoga for beginners, therapeutic yoga, breathwork, meditation, weight loss and wellness from Master Anil Choudhary and the Yog Jivan team." },
      { property: "og:title", content: "Journal — Yog Jivan" },
      { property: "og:description", content: "Notes from the practice — yoga, wellness and meditation." },
      { property: "og:url", content: "https://www.yogjivan.com/blog" },
    ],
    links: [{ rel: "canonical", href: "https://www.yogjivan.com/blog" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="The Journal" title="Notes from the" accent="practice." sub="Slow writing on yoga, health, wellness and the quiet art of transformation." />
      <section className="section-pad">
        <div className="container-luxe">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="group overflow-hidden rounded-2xl border border-white/8 bg-[linear-gradient(180deg,oklch(0.18_0.005_60/0.6),oklch(0.13_0.005_60/0.7))] p-7 transition-all hover:-translate-y-1 hover:border-[color:var(--gold)]/40"
              >
                <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.22em]">
                  <span className="text-[color:var(--gold)]">{p.cat}</span>
                  <span className="text-muted-foreground">{p.read}</span>
                </div>
                <h3 className="mt-5 font-display text-xl leading-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">Read journal →</div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  ),
});
