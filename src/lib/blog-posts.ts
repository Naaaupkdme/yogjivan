// Blog posts data. Add entries to the cluster files below and they appear
// automatically on /blog, /blog/$slug, sitewide search and sitemap.xml.

import { LEGACY_POSTS } from "@/lib/blog/legacy-posts";
import { GROWTH_POSTS } from "@/lib/blog/growth-posts";
import { PRIVATE_POSTS } from "@/lib/blog/private-posts";
import type { BlogPost } from "@/lib/blog/types";

export type { BlogPost, BlogFaq, BlogBlock, BlogCluster, BlogCta } from "@/lib/blog/types";

export const BLOG_POSTS: BlogPost[] = [...PRIVATE_POSTS, ...GROWTH_POSTS, ...LEGACY_POSTS];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Newest-first by last meaningful date. */
export function postsByDate(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => ((a.updated ?? a.date) < (b.updated ?? b.date) ? 1 : -1));
}

/** Related articles chosen by cluster first, then category, then recency. */
export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug);
  const score = (p: BlogPost) => (p.cluster && p.cluster === post.cluster ? 2 : 0) + (p.cat === post.cat ? 1 : 0);
  return others
    .sort((a, b) => score(b) - score(a) || ((a.updated ?? a.date) < (b.updated ?? b.date) ? 1 : -1))
    .slice(0, limit);
}
