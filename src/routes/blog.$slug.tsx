import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS, getPostBySlug, type BlogPost } from "@/lib/blog-posts";
import { breadcrumbSchema } from "@/lib/schema";

const SITE = "https://www.yogjivan.com";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): { post: BlogPost } => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found — Yog Jivan" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    const url = `${SITE}/blog/${params.slug}`;
    const desc = post.excerpt.length > 158 ? post.excerpt.slice(0, 155) + "…" : post.excerpt;
    const scripts: Array<{ type: string; children: string }> = [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema(post.title, `/blog/${params.slug}`)) },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: desc,
          datePublished: post.date,
          author: { "@type": "Person", name: "Master Anil Choudhary" },
          publisher: { "@type": "Organization", name: "Yog Jivan", url: SITE },
          mainEntityOfPage: url,
          articleSection: post.cat,
        }),
      },
    ];
    if (post.faqs?.length) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      });
    }
    return {
      meta: [
        { title: `${post.title} — Yog Jivan Journal` },
        { name: "description", content: desc },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  component: BlogArticle,
  notFoundComponent: () => (
    <section className="section-pad">
      <div className="container-luxe text-center">
        <p className="eyebrow justify-center"><span className="h-px w-10 bg-primary" />Not found<span className="h-px w-10 bg-primary" /></p>
        <h1 className="mt-5 fluid-title">Article not found</h1>
        <p className="mt-4 text-muted-foreground">This journal entry may have moved.</p>
        <Link to="/blog" className="btn-ghost-gold mt-8 inline-flex">← Back to the Journal</Link>
      </div>
    </section>
  ),
});

function BlogArticle() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="pt-32 md:pt-40">
      <div className="container-luxe max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground hover:text-[color:var(--gold)]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to the Journal
        </Link>

        <div className="mt-8 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.24em]">
          <span className="text-[color:var(--gold)]">{post.cat}</span>
          <span className="text-muted-foreground">{post.read} read</span>
          <span className="text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>

        <h1 className="mt-5 font-display text-4xl md:text-5xl leading-tight">{post.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

        <div className="mt-12 space-y-6">
          {post.body.map((block, i) => {
            if (block.type === "h2") return <h2 key={i} className="font-display text-2xl md:text-3xl leading-tight mt-10">{block.text}</h2>;
            if (block.type === "p") return <p key={i} className="text-base leading-relaxed text-foreground/85">{block.text}</p>;
            if (block.type === "ul") return (
              <ul key={i} className="ml-5 list-disc space-y-2 text-foreground/85">
                {block.items.map((it, j) => <li key={j} className="leading-relaxed">{it}</li>)}
              </ul>
            );
            if (block.type === "quote") return (
              <blockquote key={i} className="my-8 border-l-2 border-[color:var(--gold)]/60 pl-6 italic text-foreground/90">
                “{block.text}”
                {block.cite && <div className="mt-3 not-italic text-xs uppercase tracking-[0.22em] text-[color:var(--gold)]">— {block.cite}</div>}
              </blockquote>
            );
            return null;
          })}
        </div>

        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl md:text-3xl">Frequently asked</h2>
            <div className="mt-6 space-y-5">
              {post.faqs.map((f) => (
                <div key={f.q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="font-display text-lg">{f.q}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 rounded-2xl border border-[color:var(--gold)]/30 bg-gradient-to-br from-[color:var(--gold)]/10 to-transparent p-8 text-center">
          <p className="text-[0.6rem] uppercase tracking-[0.28em] text-[color:var(--gold)]">Ready to begin?</p>
          <h3 className="mt-3 font-display text-2xl md:text-3xl">Book a free trial with Master Anil</h3>
          <p className="mt-3 text-sm text-muted-foreground">Live online classes and Hai Duong studio sessions. Small batches. Real correction.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" hash="consultation" className="btn-gold">Book Free Trial</Link>
            <Link to="/online-yoga-classes" className="btn-ghost-gold">Online Classes</Link>
          </div>
        </section>

        <section className="mt-16 border-t border-white/10 pt-10">
          <div className="text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)]/80 mb-4">Related</div>
          <ul className="grid gap-2">
            {post.related.map((r) => (
              <li key={r.to}>
                <Link to={r.to} className="text-sm text-foreground/90 hover:text-[color:var(--gold)]">→ {r.label}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 border-t border-white/10 pt-10 pb-24">
          <div className="text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)]/80 mb-4">More from the Journal</div>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} to="/blog/$slug" params={{ slug: r.slug }} className="group rounded-xl border border-white/10 p-5 hover:border-[color:var(--gold)]/40">
                <div className="text-[0.55rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">{r.cat}</div>
                <div className="mt-2 font-display text-base leading-snug group-hover:text-[color:var(--gold)]">{r.title}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
