import { Link } from "@tanstack/react-router";
import { getPostBySlug } from "@/lib/blog-posts";

/**
 * Crawlable contextual links from a commercial page to supporting journal
 * articles. Titles come from the post data so links can never go stale.
 */
export function FurtherReading({
  slugs,
  heading = "Further reading",
  intro,
}: {
  slugs: string[];
  heading?: string;
  intro?: string;
}) {
  const posts = slugs.map((s) => getPostBySlug(s)).filter(Boolean);
  if (posts.length === 0) return null;

  return (
    <section className="section-tight">
      <div className="container-luxe">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/8 bg-white/[0.02] p-8 md:p-10">
          <p className="text-[0.6rem] uppercase tracking-[0.28em] text-[color:var(--gold)]/80">Guides</p>
          <h2 className="mt-3 font-display text-2xl leading-tight md:text-3xl">{heading}</h2>
          {intro && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{intro}</p>}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p!.slug}
                to="/blog/$slug"
                params={{ slug: p!.slug }}
                className="group rounded-xl border border-white/8 p-5 transition-colors hover:border-[color:var(--gold)]/40"
              >
                <div className="text-[0.55rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">{p!.cat}</div>
                <div className="mt-2 font-display text-base leading-snug group-hover:text-[color:var(--gold)]">{p!.title}</div>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{p!.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
