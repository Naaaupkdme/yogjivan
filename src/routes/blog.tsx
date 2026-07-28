import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { breadcrumbSchema } from "@/lib/schema";

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
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbSchema("Blog", "/blog")),
    }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <PageHero eyebrow="The Journal" title="Notes from the" accent="practice." sub="Slow writing on yoga, health, wellness and the quiet art of transformation." />
      <section className="section-pad">
        <div className="container-luxe">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group block h-full overflow-hidden rounded-2xl border border-white/8 bg-[linear-gradient(180deg,oklch(0.18_0.005_60/0.6),oklch(0.13_0.005_60/0.7))] p-7 transition-all hover:-translate-y-1 hover:border-[color:var(--gold)]/40"
                >
                  <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.22em]">
                    <span className="text-[color:var(--gold)]">{p.cat}</span>
                    <span className="text-muted-foreground">{p.read}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl leading-tight">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">
                    Read journal →
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
