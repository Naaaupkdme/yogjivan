// Pure extractor: turns a TanStack route file's source into a search entry.
// Used at build/dev time by the search-index Vite plugin, so every public
// page is indexed automatically from its own head() metadata — no second list.

export type RouteSearchEntry = {
  /** Canonical public path, e.g. "/corporate". */
  p: string;
  /** Title (brand suffix removed). */
  t: string;
  /** Short description. */
  d: string;
  /** "en" | "vi". */
  l: "en" | "vi";
  /** Extra searchable text (FAQ questions, H1), already trimmed. */
  k: string;
};

const EXCLUDED_PREFIXES = ["/api", "/go", "/auth", "/mcp", "/lovable", "/.", "/sitemap", "/vi/cua-hang", "/vi/doi-tac-san-pham"];

/** Map a route ID from createFileRoute("...") to its URL path. */
export function routeIdToPath(id: string): string {
  const cleaned = id.replace(/\/_[^/]+/g, "").replace(/\/$/, "");
  return cleaned === "" ? "/" : cleaned;
}

function unquote(raw: string): string {
  return raw.replace(/\\(["'`\\])/g, "$1");
}

/** Resolve `{ title: X }` / `{ name: "description", content: X }` where X is a literal, const or simple template. */
function resolveValue(source: string, expr: string, depth = 0): string | null {
  const e = expr.trim();
  if (depth > 3) return null;
  const lit = e.match(/^(["'`])([\s\S]*?)\1$/);
  if (lit) {
    const body = unquote(lit[2]!);
    if (lit[1] !== "`") return body;
    return body.replace(/\$\{\s*([A-Za-z_][A-Za-z0-9_]*)\s*\}/g, (m, name: string) => resolveValue(source, name, depth + 1) ?? m);
  }
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)) {
    const def = source.match(new RegExp(`const\\s+${e}\\s*(?::[^=]+)?=\\s*\\n?\\s*((["'\`])[\\s\\S]*?\\2)\\s*;`));
    if (def) return resolveValue(source, def[1]!, depth + 1);
  }
  return null;
}

/** Drop phrases that still contain unresolved `${...}` expressions. */
function dropUnresolved(text: string, splitter: RegExp, joiner: string): string {
  if (!text.includes("${")) return text;
  return text.split(splitter).filter((part) => !part.includes("${")).join(joiner).trim();
}

const VALUE = String.raw`(\`[^\`]*\`|"[^"]*"|'[^']*'|[A-Za-z_][A-Za-z0-9_]*)`;

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

export function extractRouteEntry(source: string): RouteSearchEntry | null {
  const id = source.match(/createFileRoute\(\s*["']([^"']+)["']\s*\)/)?.[1];
  if (!id) return null;
  const path = routeIdToPath(id);
  if (path.includes("$")) return null;
  if (EXCLUDED_PREFIXES.some((pre) => path === pre || path.startsWith(`${pre}/`) || path.startsWith(pre + "."))) return null;
  // Redirect stubs, server-only routes, noindex pages and draft shop heads are never search results.
  if (/\bredirect\(/.test(source) || /\bserver\s*:\s*\{/.test(source)) return null;
  if (/noindex/i.test(source) || /shopHead\(/.test(source)) return null;

  const headSrc = source.slice(Math.max(0, source.indexOf("head:")));
  const titleExpr = headSrc.match(new RegExp(String.raw`\{\s*title:\s*` + VALUE))?.[1];
  const descExpr = headSrc.match(new RegExp(String.raw`name:\s*["']description["']\s*,\s*content:\s*` + VALUE))?.[1];
  const rawTitle = titleExpr ? resolveValue(source, titleExpr) : null;
  const title = rawTitle ? dropUnresolved(rawTitle, /\s+[—|–]\s+/, " — ") : "";
  if (!title) return null;
  const rawDesc = descExpr ? resolveValue(source, descExpr) ?? "" : "";
  const desc = dropUnresolved(rawDesc, /(?<=\.)\s+/, " ");

  // Canonical: if a page canonicalises elsewhere, index it under that path.
  const canonExpr = source.match(new RegExp(String.raw`rel:\s*["']canonical["']\s*,\s*href:\s*` + VALUE))?.[1]
    ?? source.match(/const\s+CANONICAL\s*=\s*["'`]([^"'`]+)["'`]/)?.[1];
  let canonicalPath = path;
  if (canonExpr) {
    const v = resolveValue(source, canonExpr) ?? canonExpr;
    const m = v.match(/^https?:\/\/[^/]+(\/[^"'`\s?#]*)?/);
    if (m) canonicalPath = routeIdToPath(m[1] ?? "/");
  }

  const faqs = [...source.matchAll(/\bq:\s*(["'`])([^"'`]{4,140})\1/g)].map((m) => m[2]!).slice(0, 8);
  const locale: "en" | "vi" = canonicalPath === "/vi" || canonicalPath.startsWith("/vi/") ? "vi" : "en";

  return {
    p: canonicalPath,
    t: title.replace(/\s*[|–—-]\s*Yog Jivan.*$/i, "").trim() || title,
    d: clip(desc, 180),
    l: locale,
    k: clip(faqs.join(" · "), 400),
  };
}

/** Build a deduplicated index (one entry per canonical path). */
export function buildRouteIndex(files: { source: string }[]): RouteSearchEntry[] {
  const seen = new Map<string, RouteSearchEntry>();
  for (const f of files) {
    const entry = extractRouteEntry(f.source);
    if (entry && !seen.has(entry.p)) seen.set(entry.p, entry);
  }
  return [...seen.values()].sort((a, b) => a.p.localeCompare(b.p));
}
