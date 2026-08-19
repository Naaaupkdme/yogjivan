// Shared types for the Yog Jivan journal.

export type BlogFaq = { q: string; a: string };

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

/** Internal organisation only — never rendered as a keyword blob. */
export type BlogCluster =
  | "local"
  | "online"
  | "private"
  | "beginner"
  | "deskwork"
  | "wellness"
  | "trust"
  | "comparison";

export type BlogCta = {
  title: string;
  sub: string;
  primary: { label: string; to: string; hash?: string };
  secondary?: { label: string; to: string; hash?: string };
};

export type BlogPost = {
  slug: string;
  cat: string;
  /** Internal cluster label used for related-article selection and search tuning. */
  cluster?: BlogCluster;
  /** Internal note on the page's main intent. Never rendered. */
  primaryKeyword?: string;
  title: string;
  /** Optional longer title used only in <title>. */
  seoTitle?: string;
  excerpt: string;
  /** Optional meta description when the excerpt is not ideal for search. */
  metaDescription?: string;
  read: string;
  date: string; // ISO — original publication date
  updated?: string; // ISO — last meaningful content revision
  keyTakeaways?: string[];
  body: BlogBlock[];
  related: Array<{ label: string; to: string; hash?: string }>;
  faqs?: BlogFaq[];
  cta?: BlogCta;
};
