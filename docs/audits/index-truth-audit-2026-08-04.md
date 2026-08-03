# Yog Jivan — Phase 2: Index Truth, Crawlability, Blog Rendering & Redirect Audit

**Date:** 2026-08-04 · **Domain audited:** https://yogjivan.com (live production) · **Internal document — not linked, not in sitemap.xml**

> Note on source-of-truth files: `yogjivan_combined_master_pack_v1.md` and
> `yogjivan_master_competitor_research_prompt_v2.md` are **not present in the
> repository**. The inventory below was therefore built from TanStack route
> files, `src/lib/blog-posts.ts`, the live sitemap, robots.txt, llms.txt, and a
> full crawl of rendered header/footer/body links on all 26 public pages.

---

## A. Executive summary

The production index state is **substantially healthy**. All 26 public pages
return HTTP 200, are fully **server-rendered** (title, description, canonical,
og:url and JSON-LD are present in the first byte response — no client-only
shell), carry **self-referencing apex canonicals**, and are reachable in **one
click** from the homepage. There are **zero orphan pages**, **zero broken
internal links**, and **zero internal links to www / http / `/services` /
`pricing.md`**. The sitemap contains exactly the 26 canonical URLs — no
redirects, no noindex URLs, no duplicates, no markdown files. All major search
and AI crawlers receive HTTP 200.

Two genuine technical defects were found and fixed:

1. **Relative `og:image` / `twitter:image` on 9 landing routes** — social and AI
   crawlers cannot resolve relative image URLs, so link previews were broken on
   the highest-value commercial pages. Now absolute, with correct per-image
   dimensions (previously they silently inherited the root's `1200x630`).
2. **404 shell was not marked `noindex`** — status was correctly 404, but a soft
   copy of the shell could still be indexed if ever served at 200. Added
   `noindex, follow` plus useful recovery links (Home, Programs, Online
   Classes, Contact).

One infrastructure-level observation that **cannot be fixed from app code**:
`www` and `.in` variants redirect with **302 (temporary)** rather than 301, and
`http://www.yogjivan.com` takes **2 hops**. See section C.

---

## B. Complete URL inventory

Legend — Classification: **P**=public indexable HTML, **R**=redirect,
**N**=intentional noindex utility, **L**=legal, **M**=raw machine-readable,
**404**=correctly missing.

| URL | Class | Status | Final URL | Indexable | Canonical (self-ref) | Sitemap | Incoming links | Depth | Main content SSR | Schema | Action |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | P | 200 | same | Yes | ✅ | ✅ | 26 | 0 | ✅ 2,294 w | Organization, WebSite, LocalBusiness×2, Person, Course, FAQPage, BreadcrumbList | None |
| `/about` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 1,010 w | Organization, Person, LocalBusiness, BreadcrumbList | None |
| `/programs` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 1,537 w | Service, FAQPage, BreadcrumbList | None |
| `/online-yoga-classes` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 5,200 w | Course, Event, Offer, MedicalWebPage, FAQPage | **og:image absolutised** |
| `/personal-training` | P | 200 | same | Yes | ✅ | ✅ | 12 | 1 | ✅ 1,170 w | Service, FAQPage, BreadcrumbList | None |
| `/corporate` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 1,153 w | Organization, LocalBusiness, BreadcrumbList | None |
| `/gallery` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 861 w | LocalBusiness, BreadcrumbList | None |
| `/testimonials` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 922 w | AggregateRating, BreadcrumbList | None |
| `/contact` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 1,139 w | LocalBusiness, FAQPage, BreadcrumbList | None |
| `/privacy` | L | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 1,472 w | BreadcrumbList | None |
| `/yoga-for-beginners` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 2,238 w | FAQPage, BreadcrumbList | **og:image absolutised** |
| `/yoga-for-back-pain` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 2,209 w | FAQPage, BreadcrumbList | **og:image absolutised** |
| `/yoga-for-stress` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 2,170 w | FAQPage, BreadcrumbList | **og:image absolutised** |
| `/yoga-for-weight-loss` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 2,094 w | FAQPage, BreadcrumbList | **og:image absolutised** |
| `/yoga-for-pcod` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 2,191 w | FAQPage, BreadcrumbList | **og:image absolutised** |
| `/yoga-for-thyroid` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 2,218 w | FAQPage, BreadcrumbList | **og:image absolutised** |
| `/period-safe-yoga` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 2,250 w | FAQPage, BreadcrumbList | **og:image absolutised** |
| `/yoga-for-expats-in-vietnam` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 2,253 w | FAQPage, BreadcrumbList | **og:image absolutised** |
| `/blog` | P | 200 | same | Yes | ✅ | ✅ | 26 | 1 | ✅ 1,091 w | BreadcrumbList | None |
| `/blog/why-traditional-hatha-still-matters` | P | 200 | same | Yes | ✅ | ✅ | 13 | 2 | ✅ 1,455 w | Article, FAQPage, BreadcrumbList | None |
| `/blog/yoga-for-spine-longevity-12-minutes` | P | 200 | same | Yes | ✅ | ✅ | 8 | 2 | ✅ 1,337 w | Article, FAQPage, BreadcrumbList | None |
| `/blog/the-breath-you-didnt-know-you-were-holding` | P | 200 | same | Yes | ✅ | ✅ | 14 | 2 | ✅ 1,263 w | Article, FAQPage, BreadcrumbList | None |
| `/blog/beginners-guide-to-20-minutes-of-stillness` | P | 200 | same | Yes | ✅ | ✅ | 6 | 2 | ✅ 1,138 w | Article, BreadcrumbList | None |
| `/blog/yoga-for-sustainable-fat-loss` | P | 200 | same | Yes | ✅ | ✅ | 4 | 2 | ✅ 1,294 w | Article, FAQPage, BreadcrumbList | None |
| `/blog/building-a-home-practice-you-will-keep` | P | 200 | same | Yes | ✅ | ✅ | 6 | 2 | ✅ 1,148 w | Article, BreadcrumbList | None |
| `/blog/therapeutic-yoga-benefits` | P | 200 | same | Yes | ✅ | ✅ | 3 | 2 | ✅ 2,737 w | Article, FAQPage, BreadcrumbList | None |
| `/online` | R | 301 → 1 hop | `/online-yoga-classes` | n/a | n/a | ❌ correct | 0 | — | — | — | Correct as-is |
| `/services` | 404 | 404 | same | No (404) | n/a | ❌ correct | 0 | — | — | — | Correctly 404 — see C |
| `/pricing.md` | M | 200 `text/markdown` | same | n/a | n/a | ❌ correct | 0 (llms.txt only) | — | — | — | Correct as-is |
| `/auth` | N | 200 (→ `?next=%2F`) | `/auth?next=%2F` | **No** (`noindex`) | n/a | ❌ correct | 0 | — | — | — | Correct as-is |
| `/.lovable/oauth/consent` | N | utility | — | No | n/a | ❌ | 0 | — | — | — | Correct as-is |
| `/About` (capitalisation variant) | Dup | 200 | same | Yes | canonical → `/about` ✅ | ❌ | 0 | — | ✅ | — | Canonical resolves it — no action |
| `/about/` (trailing slash) | R | 301 → 1 hop | `/about` | n/a | n/a | ❌ | 0 | — | — | — | Correct as-is |
| `/nope-404-test` (random) | 404 | 404 | same | **No** (now `noindex`) | n/a | ❌ | 0 | — | — | — | **Fixed: noindex added** |
| `/blog/nonexistent-slug-xyz` | 404 | 404 | same | **No** (now `noindex`) | n/a | ❌ | 0 | — | — | — | **Fixed: noindex added** |

---

## C. Redirect map

| Source | Status | Destination | Hops | Correct? | Fix made |
|---|---|---|---|---|---|
| `http://yogjivan.com` | 301 | `https://yogjivan.com/` | 1 | ✅ | — |
| `https://www.yogjivan.com` | **302** | `https://yogjivan.com/` | 1 | ⚠️ should be 301 | Platform-level, not app code |
| `http://www.yogjivan.com` | 302 → 301 | `https://yogjivan.com/` | **2** | ⚠️ chain | Platform-level, not app code |
| `https://yogjivan.in` | **302** | `https://yogjivan.com/` | 1 | ⚠️ should be 301 | Platform-level, not app code |
| `https://www.yogjivan.in` | **302** | `https://yogjivan.com/` | 1 | ⚠️ should be 301 | Platform-level, not app code |
| `/online` | 301 | `/online-yoga-classes` | 1 | ✅ | — |
| `/about/` (any trailing slash) | 301 | `/about` | 1 | ✅ | — |
| `/services` | 404 | — | 0 | ✅ | Deliberately left 404 |

**No loops. No chains within the app.** `/services` was never a published route
on this domain (the old "Services" block was an on-page section of `/`, not a
URL). Per rule 5 and 6, no equivalent legacy URL existed, so a correct 404 is
retained rather than manufacturing a redirect to `/programs`.

**Domain 302s:** Lovable hosting issues the apex normalisation redirect; the
verb is set by the hosting layer, not by application code, so it cannot be
changed from this repository. Impact is low (Google follows 302s to the apex
and consolidates on the self-referencing apex canonicals, which are all
correct), but converting them to 301 at the hosting/DNS layer would be
cleaner. Flagged for platform follow-up.

---

## D. Blog audit

| Blog URL | Card works | Status | Indexable | Full body SSR | Unique title/desc | Author/date | Schema | Sitemap | Internal links | Technical fix | Content rewrite later? |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/blog/why-traditional-hatha-still-matters` | ✅ | 200 | ✅ | ✅ 1,455 w | ✅ | ✅ | Article + FAQPage | ✅ | 13 in / 21 out | none | No |
| `/blog/yoga-for-spine-longevity-12-minutes` | ✅ | 200 | ✅ | ✅ 1,337 w | ✅ | ✅ | Article + FAQPage | ✅ | 8 / 22 | none | No |
| `/blog/the-breath-you-didnt-know-you-were-holding` | ✅ | 200 | ✅ | ✅ 1,263 w | ✅ | ✅ | Article + FAQPage | ✅ | 14 / 21 | none | No |
| `/blog/beginners-guide-to-20-minutes-of-stillness` | ✅ | 200 | ✅ | ✅ 1,138 w | ✅ | ✅ | Article (no FAQ) | ✅ | 6 / 21 | none | Optional: add FAQ block (Phase 7) |
| `/blog/yoga-for-sustainable-fat-loss` | ✅ | 200 | ✅ | ✅ 1,294 w | ✅ | ✅ | Article + FAQPage | ✅ | 4 / 22 | none | No |
| `/blog/building-a-home-practice-you-will-keep` | ✅ | 200 | ✅ | ✅ 1,148 w | ✅ | ✅ | Article (no FAQ) | ✅ | 6 / 21 | none | Optional: add FAQ block (Phase 7) |
| `/blog/therapeutic-yoga-benefits` | ✅ | 200 | ✅ | ✅ 2,737 w | ✅ | ✅ | Article + FAQPage | ✅ | 3 / 22 | none | No |

- All 7 index cards resolve to HTTP 200. **No placeholder links, no
  JavaScript-only dead links, no duplicated slugs, no unpublished cards, no
  route mismatch.** The `/blog` index emits exactly 7 unique detail links.
- No duplicate article body is reused across slugs (all bodies differ; word
  counts and H1s are unique).
- Every post has exactly one descriptive H1 matching the `<title>`.
- Breadcrumb `BreadcrumbList` schema and crawlable breadcrumb links present on
  every detail page.
- Detail pages carry the site-wide branded `og:image`
  (`https://yogjivan.com/og-yog-jivan.jpg`, absolute, 1200×630) — valid, though
  per-post cover images would improve social CTR (Phase 7, content decision).
- **No thin/placeholder shells found.** Lowest word count is 1,138 — adequate.
  `/blog/therapeutic-yoga-benefits` (3 incoming links) is the least internally
  linked; it is still reachable at depth 2 and not an orphan.

---

## E. Sitemap comparison

- **Expected public indexable URLs:** 26
- **Actual `sitemap.xml` URLs:** 26
- **Missing:** none
- **Incorrect / non-canonical:** none
- **Duplicates:** none
- **Redirected URLs included:** none (`/online` correctly excluded)
- **Non-indexable URLs included:** none (`/auth`, OAuth consent, `pricing.md`
  all correctly excluded)
- **www URLs:** none · **query strings:** none · **hash fragments:** none
- **HTTP status:** 200 · **Content-Type:** `application/xml` · **Valid XML:** ✅
- **`<lastmod>`:** not used at all — correct. No fabricated freshness dates and
  no per-request timestamp generation.
- `robots.txt` returns 200 `text/plain`, allows all, and correctly declares
  `Sitemap: https://yogjivan.com/sitemap.xml`.

---

## F. 404, soft-404 and noindex findings

| Test | Result |
|---|---|
| Random nonexistent URL | **404** ✅ (not 200) |
| Malformed blog slug | **404** ✅ |
| Removed legacy `/services` | **404** ✅ |
| Trailing-slash variant `/about/` | 301 → `/about` ✅ |
| Capitalisation variant `/About` | 200, canonical → `/about` (no duplicate-index risk) |
| Redirect loops | none |
| Blanket redirect of 404s → homepage | not present ✅ |
| 404 page indexability | ❌ **was missing `noindex`** → **fixed** |
| 404 page recovery navigation | ❌ **had only "Go home"** → **fixed** (Home, Programs, Online Classes, Contact) |
| `/auth` | 200 with `robots: noindex` ✅ (intentional utility page) |
| Accidental `noindex` on any public page | none |
| `X-Robots-Tag` on any public page | none present ✅ |

### Crawler access (Stage 5)

`robots.txt` is `User-agent: * / Allow: /`. All of the following received
**HTTP 200** on `/online-yoga-classes` with no CDN/WAF challenge:

Googlebot ✅ · Bingbot ✅ · GPTBot ✅ · ChatGPT-User ✅ · PerplexityBot ✅ ·
ClaudeBot ✅ · anthropic-ai ✅ · facebookexternalhit ✅

No crawler access was changed. **Google Search visibility is unblocked.** AI
crawler access is currently fully open — this is a business decision (it allows
Yog Jivan content to be cited in AI answers, at the cost of allowing training
ingestion); no change made without instruction.

### Server rendering (Stage 7)

Every audited URL returns complete, route-specific HTML on the **first byte**
with JavaScript disabled: unique `<title>`, `<meta name="description">`,
self-referencing canonical, `og:url`, exactly one `<h1>`, full body copy and
all JSON-LD blocks. No route returns the homepage shell, no soft 404 returns
200, and no route returns blank content pre-hydration. Deep blog URLs and
nested-route refreshes resolve directly. Architecture left unchanged — no
blocking defect exists.

---

## G. Files changed

| File | Change |
|---|---|
| `src/lib/images.ts` | Added `SITE_ORIGIN`, `absoluteAssetUrl()`, `socialImageMeta()` — emits absolute `og:image`/`twitter:image` plus correct per-image `og:image:width`/`height`. |
| `src/routes/online-yoga-classes.tsx` | Use `socialImageMeta()` |
| `src/routes/yoga-for-beginners.tsx` | Use `socialImageMeta()` |
| `src/routes/yoga-for-back-pain.tsx` | Use `socialImageMeta()` |
| `src/routes/yoga-for-stress.tsx` | Use `socialImageMeta()` |
| `src/routes/yoga-for-weight-loss.tsx` | Use `socialImageMeta()` |
| `src/routes/yoga-for-pcod.tsx` | Use `socialImageMeta()` |
| `src/routes/yoga-for-thyroid.tsx` | Use `socialImageMeta()` |
| `src/routes/period-safe-yoga.tsx` | Use `socialImageMeta()` |
| `src/routes/yoga-for-expats-in-vietnam.tsx` | Use `socialImageMeta()` |
| `src/routes/__root.tsx` | `NotFoundComponent`: added `noindex, follow` and recovery links. **No analytics/consent code touched.** |
| `docs/audits/index-truth-audit-2026-08-04.md` | This report (internal, not in sitemap). |

No page design, copy, pricing, trial offer, analytics, Meta Pixel, GA4,
Supabase, Make.com, medical claims, addresses or testimonials were altered.

---

## H. Fixes completed

1. Absolute `og:image` / `twitter:image` on 9 commercial landing routes
   (previously relative `/__l5e/...` — unresolvable by social/AI crawlers).
2. Correct per-image `og:image:width` / `og:image:height` on those routes
   (previously inherited the root's `1200×630`, which did not match).
3. 404 shell is now `noindex, follow`.
4. 404 page now offers Home / Programs / Online Classes / Contact recovery
   links.

## I. Issues still pending (not app-fixable)

1. `www` and `.in` variants redirect **302** instead of **301**; `http://www`
   takes 2 hops. Set at the Lovable/Cloudflare hosting layer — requires
   platform-side change, not a code change. Low SEO risk given correct apex
   canonicals everywhere.
2. `/About` (capitalised) serves 200 rather than redirecting to `/about`. The
   canonical tag resolves the duplicate correctly, so no index split is
   expected; a case-insensitive 301 at the hosting layer would be tidier.

## J. Deliberately left for later phases

- Online pricing page — **not created** (explicitly out of scope this phase).
- Per-post blog cover `og:image` (currently branded site card) — Phase 7.
- FAQ blocks for `beginners-guide-to-20-minutes-of-stillness` and
  `building-a-home-practice-you-will-keep` — Phase 7 content work.
- Deeper internal linking to `/blog/therapeutic-yoga-benefits` (3 incoming
  links) and `/personal-training` (12) — Phase 7/8.
- No thin content rewrites performed, per instruction.

## K. Manual Google Search Console actions

*This audit does not claim Search Console access. No URL below is asserted to
be indexed — that must be confirmed by the account owner in GSC.*

**Inspect (URL Inspection tool):**
- `https://yogjivan.com/`
- `https://yogjivan.com/online-yoga-classes`
- `https://yogjivan.com/yoga-for-beginners`
- `https://yogjivan.com/programs`
- `https://yogjivan.com/blog`

**Request indexing (changed this phase — social/meta corrections):**
- `https://yogjivan.com/online-yoga-classes`
- `https://yogjivan.com/yoga-for-beginners`
- `https://yogjivan.com/yoga-for-back-pain`
- `https://yogjivan.com/yoga-for-stress`
- `https://yogjivan.com/yoga-for-weight-loss`
- `https://yogjivan.com/yoga-for-pcod`
- `https://yogjivan.com/yoga-for-thyroid`
- `https://yogjivan.com/period-safe-yoga`
- `https://yogjivan.com/yoga-for-expats-in-vietnam`

**Do NOT request indexing:**
- `https://yogjivan.com/auth` (intentional noindex)
- `https://yogjivan.com/pricing.md` (raw machine-readable file)
- Any `/.lovable/*` or `/.well-known/*` utility URL
- Any `www.` or `http://` variant

**Allow to recrawl naturally (redirect sources — no action):**
- `https://yogjivan.com/online`
- `https://www.yogjivan.com/*`, `https://yogjivan.in/*`, `https://www.yogjivan.in/*`
- Any trailing-slash variant

**404 URLs requiring no indexing request:**
- `https://yogjivan.com/services` and any other legacy/unknown path — these
  correctly return 404 and should be left to drop out of the index naturally.

**Also confirm in GSC:** the sitemap `https://yogjivan.com/sitemap.xml` is
submitted and reports **26 discovered URLs**.
