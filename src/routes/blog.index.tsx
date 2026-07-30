import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { breadcrumbSchema } from "@/lib/schema";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Yoga, Wellness & Meditation Journal — Yog Jivan" },
      { name: "description", content: "Practical writing on yoga for beginners, therapeutic yoga, breathwork, meditation, weight loss and wellness from Master Anil Choudhary and the Yog Jivan team." },
      { property: "og:title", content: "Journal — Yog Jivan" },
      { property: "og:description", content: "Notes from the practice — yoga, wellness and meditation." },
      { property: "og:url", content: "https://yogjivan.com/blog" },
    ],
    links: [{ rel: "canonical", href: "https://yogjivan.com/blog" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbSchema("Blog", "/blog")),
    }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const categories = useMemo(() => {
    const set = new Set<string>();
    BLOG_POSTS.forEach((p) => set.add(p.cat));
    return ["All", ...Array.from(set)];
  }, []);

  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");

  // Newest first
  const sorted = useMemo(
    () => [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1)),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter((p) => {
      const catOk = active === "All" || p.cat === active;
      const qOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [sorted, active, query]);

  const featured = sorted[0];
  const rest = filtered.filter((p) => p.slug !== featured?.slug || active !== "All" || query.trim() !== "");

  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Notes from the"
        accent="practice."
        sub="Slow writing on yoga, health, wellness and the quiet art of transformation."
      />

      {/* Featured post — only on the unfiltered default view */}
      {active === "All" && !query.trim() && featured && (
        <section className="section-tight">
          <div className="container-luxe">
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group glass-luxe mx-auto flex max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-[color:var(--gold)]/25 p-8 md:p-12 transition-all hover:border-[color:var(--gold)]/50 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.28em]">
                <span className="rounded-full border border-[color:var(--gold)]/40 px-3 py-1 text-[color:var(--gold)]">Featured</span>
                <span className="text-[color:var(--gold)]/80">{featured.cat}</span>
                <span className="text-muted-foreground">· {featured.read}</span>
              </div>
              <h2 className="mt-5 font-display leading-[1.15]" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)" }}>
                {featured.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">
                Read the article →
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`rounded-full border px-4 py-2 text-[0.62rem] uppercase tracking-[0.22em] transition-all ${
                    active === c
                      ? "border-[color:var(--gold)]/60 bg-[color-mix(in_oklab,var(--gold)_12%,transparent)] text-[color:var(--gold)]"
                      : "border-white/10 text-muted-foreground hover:border-[color:var(--gold)]/40 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="relative w-full md:w-64">
              <span className="sr-only">Search the journal</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                className="w-full rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-[color:var(--gold)]/50"
              />
            </label>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad pt-0">
        <div className="container-luxe">
          {rest.length === 0 ? (
            <p className="mx-auto max-w-md py-16 text-center text-sm text-muted-foreground">
              No articles match that search yet. Try another topic — or{" "}
              <Link to="/contact" hash="consultation" className="text-[color:var(--gold)] hover:underline">
                message us
              </Link>{" "}
              with what you'd like us to write about.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <motion.article
                  key={p.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
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
          )}
        </div>
      </section>

      {/* Topic clusters — helps SEO by cross-linking to core support pages */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/8 bg-white/[0.02] p-8 md:p-10">
            <div className="text-[0.6rem] uppercase tracking-[0.28em] text-[color:var(--gold)]/80">Explore by topic</div>
            <h2 className="mt-3 font-display text-2xl leading-tight md:text-3xl">Support pages linked from the Journal</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[
                { to: "/online-yoga-classes", label: "Live Online Yoga Classes" },
                { to: "/yoga-for-beginners", label: "Yoga for Beginners" },
                { to: "/yoga-for-back-pain", label: "Yoga for Back Pain" },
                { to: "/yoga-for-stress", label: "Yoga for Stress" },
                { to: "/yoga-for-weight-loss", label: "Yoga for Weight Loss" },
                { to: "/yoga-for-pcod", label: "Yoga for PCOD & PCOS" },
                { to: "/yoga-for-thyroid", label: "Yoga for Thyroid Health" },
                { to: "/period-safe-yoga", label: "Period-Safe Yoga" },
                { to: "/yoga-for-expats-in-vietnam", label: "Yoga for Expats in Vietnam" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-xl border border-white/8 px-4 py-3 text-sm text-foreground/85 transition-colors hover:border-[color:var(--gold)]/40 hover:text-[color:var(--gold)]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
