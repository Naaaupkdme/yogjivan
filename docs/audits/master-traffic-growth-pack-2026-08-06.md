# Master Traffic Growth Pack 5+6 — Implementation Record

Date: 2026-08-06. Scope: SEO/AEO/GEO accuracy, keyword-cluster architecture,
blog data-model upgrade, cleaning of 7 existing articles, 6 new high-intent
articles, search relevance tuning, sitemap lastmod. No publish performed.

## 1. Keyword cluster → primary page → supporting content

| # | Cluster | Primary page(s) | Supporting articles | Intent |
|---|---------|-----------------|---------------------|--------|
| 1 | Local commercial | `/`, `/programs`, `/yoga-for-beginners`, `/personal-training`, `/contact` | `/blog/yoga-classes-hai-duong-beginners-guide` | Find and choose a class in the Hai Duong urban area |
| 2 | Online commercial | `/online-yoga-classes`, `/personal-training#private-online-yoga` | `first-live-online-yoga-class`, `online-yoga-camera-setup`, `private-online-yoga-vs-group-classes` | Join live small-group or private online classes |
| 3 | Beginner | `/yoga-for-beginners` | `why-traditional-hatha-still-matters`, `building-a-home-practice-you-will-keep`, `yoga-classes-hai-duong-beginners-guide` | Start safely without prior experience |
| 4 | Desk work / mobility | `/yoga-for-back-pain`, `/personal-training` | `desk-worker-yoga-back-neck-shoulders`, `yoga-for-spine-longevity-12-minutes` | Back, neck and shoulder mobility for sitting workers |
| 5 | Wellness | `/yoga-for-stress` | `the-breath-you-didnt-know-you-were-holding`, `beginners-guide-to-20-minutes-of-stillness`, `yoga-for-sustainable-fat-loss` | Stress, breathing, sleep habits, meditation |
| 6 | Trust / entity | `/about`, `/`, `/personal-training` | Every article carries a visible author line linking to `/about`; Article JSON-LD author URL = `https://yogjivan.com/about` | Yog Jivan and Master Anil Choudhary as entities |
| 7 | Comparison / decision | `/programs`, `/online-yoga-classes`, `/personal-training` | `private-online-yoga-vs-group-classes`, `live-online-yoga-vs-youtube`, `therapeutic-yoga-benefits` | Choosing between formats |

No new landing pages were created; each cluster maps to existing routes to
avoid cannibalisation. Studio-location pages were explicitly out of scope.

## 2. Internal links implemented

- `FurtherReading` component (`src/components/site/FurtherReading.tsx`) mounted on
  `/online-yoga-classes`, `/personal-training` and `/programs`.
- `/yoga-for-beginners` links to the local beginner guide and the first-online-class guide.
- `/yoga-for-back-pain` and `/yoga-for-stress` related-post lists updated (stale titles fixed,
  desk-worker article added).
- `/blog` index intro links to the three highest-intent new articles.
- Every article links to at least one commercial page plus `/about`.

## 3. Existing 7 articles — risk removed

| Slug | Removed / corrected | Now |
|------|--------------------|-----|
| why-traditional-hatha-still-matters | "back pain, stress, sleep and blood pressure all respond to it" | Descriptive Hatha explanation, beginner suitability, medical-clearance note |
| yoga-for-spine-longevity-12-minutes | "pain-free into your seventies", "students who reversed chronic back pain" | Cautious mobility routine with stop signs and red-flag guidance |
| the-breath-you-didnt-know-you-were-holding | "shifts the nervous system out of fight-or-flight", "calmer within the first session", "3–4 weeks" | Comfortable practice, safety limits, explicit "results vary" |
| beginners-guide-to-20-minutes-of-stillness | Certainty about a 20-minute threshold | 5 / 10 / 20 minute options |
| yoga-for-sustainable-fat-loss | "regulates the hormones", "cortisol regulation", nutrition rules | Consistency, strength, sleep habits; dietitian referral |
| building-a-home-practice-you-will-keep | Unverified ten-year student claims | Habit guidance without outcome claims |
| therapeutic-yoga-benefits | Clinical assessment, symptom measurement, vagal tone, fixed 6–12 week outcomes | Reframed as personalised supportive yoga with explicit medical limits |

Also softened on commercial routes: `/yoga-for-weight-loss` (cortisol, hormone,
fixed week-by-week timeline), `/yoga-for-pcod` (cortisol/androgen mechanism),
`/yoga-for-thyroid` (metabolism/symptom-stability claim), `/yoga-for-back-pain`
("pain-free hours" tracking).

## 4. Six new articles

| Slug | Cluster | Primary CTA |
|------|---------|-------------|
| yoga-classes-hai-duong-beginners-guide | local | /programs, /contact#consultation |
| private-online-yoga-vs-group-classes | comparison | /personal-training#private-online-yoga |
| first-live-online-yoga-class | online | /online-yoga-classes |
| live-online-yoga-vs-youtube | comparison | /online-yoga-classes |
| desk-worker-yoga-back-neck-shoulders | deskwork | /yoga-for-back-pain, /personal-training |
| online-yoga-camera-setup | online | /online-yoga-classes |

All dated 2026-08-06. Aerial yoga referenced only for Studio 1.

## 5. Data model and schema

- `src/lib/blog/types.ts` adds `seoTitle`, `metaDescription`, `updated`,
  `keyTakeaways`, `cluster`, `primaryKeyword`, `cta`.
- Article JSON-LD: headline, description, datePublished, dateModified,
  author Person (Master Anil Choudhary, `/about`), publisher Organization,
  mainEntityOfPage. No FAQPage, AggregateRating, Review, MedicalWebPage,
  Event or Offer schema anywhere.
- Sitemap emits `<lastmod>` for blog URLs only, from `updated ?? date`.

## 6. Search relevance rules

Intent weighting (`boost`) added to the existing index: studio/local 1.35,
programs 1.3, private-online 1.7, online 1.3, contact 1.25, beginners 1.25,
home 0.85. Blog entries index `cluster` and `primaryKeyword`.

## 7. Deferred / off-site work

- Real photography, class-demo video, testimonial video, certification documents.
- Google Business Profile posts, review responses and category tuning.
- Search Console / Bing Webmaster URL inspection and re-submission after publish.
- Backlinks and local citations (directories, partner sites).
- Vietnamese-language full page translations (currently EN pages with VI search synonyms).
- WebSite SearchAction schema — only after a real indexable search results URL exists.
