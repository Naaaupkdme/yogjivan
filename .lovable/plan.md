# Read-only audit — private-yoga page and sitewide trust/anchor state

NO CHANGES MADE. Nothing edited, installed, migrated or published. Findings below are from the current working tree.

## 1. Trust consistency (total-student claim)

Single source: `src/lib/facts/trust.ts` — `PUBLIC_TRUST.studentsTaught = "10,000+"`, `PUBLIC_TRUST_METRICS` also hard-codes `"10,000+"` and `"12+"`/`"20+"` as literals inside the same file (acceptable, same file, but duplicated rather than derived).

Visitor-facing occurrences that correctly read from the fact file:
- `src/routes/personal-training.tsx:41`, `src/routes/online-yoga-classes.tsx:51`, `src/routes/yoga-for-beginners.tsx:35,44,290`, `src/routes/book-online-yoga.tsx:232`
- `src/components/site/SiteFooter.tsx:27`, `Testimonials.tsx:52`, `TherapeuticLanding.tsx:41`, `SmartConsultation.tsx:31`, `FounderStory.tsx:11`, `ContactSection.tsx:96`, `Corporate.tsx:11-13`

Hard-coded, not reading the fact file:
- `src/lib/language.tsx:84` — `"10,000+ Students Guided"` literal (value currently agrees; will silently drift).
- `public/llms.txt:6` — `Community: 10,000+ students guided, 20+ countries served` (static file, agrees today).
- `src/components/site/Testimonials.tsx:49,51,53` — `"12+" Years Teaching`, `"20+" Countries`, plus `"2" Premium Studios` and `"Global" Online Community` as literals.
- `src/components/site/ContactSection.tsx:96` — `12+ years` hard-coded in the string while the student count is tokenised.

Contradictions found: **none numeric**. No remaining `1,000+` / `1000+` anywhere in `src/` or `public/`.

Outcome-claim residue:
- `src/components/site/Testimonials.tsx:83` — heading "Voices from those who **transformed**."
- `src/routes/testimonials.tsx:11,18` — meta description "Real transformation stories…", "Real transformations from Yog Jivan students." These are outcome claims backed only by unverified testimonials.

## 2. Hash / anchor links into /personal-training

`src/routes/personal-training.tsx` contains exactly **one** section id: `id="private-enquiry"` (line 303, with `scroll-mt-28`). Repo-wide grep for `id="private-online-yoga"` returns **zero matches** — that section id does not exist.

Links that still point at the non-existent `#private-online-yoga` fragment:
- `src/components/site/SiteHeader.tsx:17` (desktop primary nav "Private Yoga") and `:36` (mega/mobile "Private 1-on-1 Online Yoga")
- `src/components/site/DiscoverTopics.tsx:23`
- `src/components/site/Programs.tsx:119`
- `src/routes/programs.tsx:90`
- `src/lib/site-search.ts:131` (a search result destination)
- `src/lib/blog/growth-posts.ts:114,127,376,388` (inline links + CTA blocks)

Links using the valid `#private-enquiry` fragment: in-page CTAs at `personal-training.tsx:277` (hero), `:510` (teacher/match block), `:612` (closing CTA) — plain `<a href="#private-enquiry">`.

Why the URL shows `https://yogjivan.com/personal-training#…`: the nav/CTA entries carry an explicit fragment (`hash="private-online-yoga"` on TanStack `<Link>`, or `href="/personal-training#private-online-yoga"`). The router pushes the fragment into `location.hash`, so it persists in the address bar and is copied/shared. Because no element has that id, the browser cannot scroll to a target — the page lands at the top while the URL still displays the fragment. Result: an ugly shared URL plus a broken jump. Google generally ignores the fragment for indexing (canonical is fragment-less), so this is a UX/CTR issue rather than an index-split issue.

## 3. URL / route current state

- Route file: `src/routes/personal-training.tsx`, `createFileRoute("/personal-training")`.
- Canonical: `https://yogjivan.com/personal-training` (line 227). `og:url` matches (line 220). `og:type: website`, `twitter:card: summary_large_image`, OG image from `masterImages.founderPortrait`.
- Sitemap: included in `src/routes/sitemap[.]xml.ts:10` STATIC_PATHS. Indexable (no noindex).
- Nav labels: header desktop "Private Yoga", mega-menu "Private & Personal Training" (`/personal-training`, clean) and "Private 1-on-1 Online Yoga" (`#private-online-yoga`). Many internal links label it "1-on-1 Personal Training" / "1-on-1 Therapeutic Sessions" (`yoga-for-back-pain`, `-pcod`, `-thyroid`, `period-safe-yoga`, `yoga-for-weight-loss`, `yoga-for-beginners`, `LocalIntro`, `Services`).
- Redirects: the only content redirect in the repo is `src/routes/online.tsx` → `/online-yoga-classes` (301). **No route or redirect exists** for `/private-online-yoga`, `/private-yoga`, `/online-private-yoga` or `/private-yoga-classes` — those paths currently 404. Schema `serviceSchema` blocks use `url: "/personal-training"`; `areaServed` is `Worldwide` (online) and `Hai Phong, Vietnam` (in-studio).

## 4. Trust / proof risks in shared components

- `src/components/site/Testimonials.tsx:15-47` — four **hard-coded named testimonials** with countries and flags: "Linh Pham" (Vietnam), "Sophie Laurent" (France), "Arjun Mehta" (India), "Emily Tran" (Canada). One is a medical-outcome claim: *"My chronic back pain eased within weeks."* Another: *"what changed my life was the emotional calm."* Rendered on `src/routes/index.tsx`, `src/routes/testimonials.tsx` and `src/routes/online-yoga-classes.tsx`.
- Same component line 113 — a **decorative 5-star row** rendered per testimonial with no verified source and no Google link, contrary to the "display ratings only with a Maps link" rule.
- `src/routes/testimonials.tsx:11,18` — "Real transformation stories" meta.
- `src/components/site/VideoTestimonials.tsx` — referenced by the testimonials surface; must be confirmed to contain no placeholder/dummy videos before any publish.
- Teacher claims on `/personal-training` are clean: only `TEACHING_TEAM` (one verified record) is rendered; no invented credentials found.

## 5. /personal-training code-level UX issues (702 lines)

- **13 top-level sections**, 11 of which are `<h2>` blocks with an identical eyebrow + clamp-heading pattern — visually repetitive scroll rhythm and a very long page.
- **CTA repetition**: three `#private-enquiry` anchors (hero, match block, closing) plus the sitewide `FloatingConsultationCTA`, `FloatingWhatsApp`, `MobileStickyCTA` and `ExitIntentModal` all mounted in `__root.tsx:451-454`. On this route the floating consultation pill (bottom-right, desktop) and mobile sticky bar can overlap the inline enquiry form's submit button and the closing CTA — a genuine overlap/competition risk.
- **Team section** (`:451-515`) uses a card grid that maps `TEACHING_TEAM`, which currently holds exactly **one** teacher — a one-card grid in a multi-column container reads as an empty/unfinished row.
- **FAQ block: 12 Q&A pairs** followed by a further-reading block and a closing CTA — a long tail before the page ends.
- **Anchor behaviour**: in-page CTAs use raw `<a href="#…">` rather than router-aware links; `scroll-mt-28` only exists on the enquiry section, so any future anchor target would slip under the fixed header.
- **Media**: `paid/live-guidance-floor.webp` used once at `:531`; `paid/teaching-adjustment.webp` imported at line 13 — verify it is actually rendered, otherwise it is a dead import. Hero uses `masterImages.studioAdjustment` (studio image) on a page about *online* private yoga — a relevance mismatch worth noting.
- Large empty space risk comes from `section-pad-sm` repeated 13× combined with several short two-column sections.

## 6. Blog inventory and gaps

Growth cluster (`src/lib/blog/growth-posts.ts`):
- `yoga-classes-hai-duong-beginners-guide` — Yoga classes in Hai Duong: a beginner's guide
- `private-online-yoga-vs-group-classes` — Private online yoga vs small-group classes *(only true private-intent post)*
- `first-live-online-yoga-class` — What happens in your first live online yoga class?
- `live-online-yoga-vs-youtube` — Live online yoga vs YouTube videos
- `desk-worker-yoga-back-neck-shoulders` — Yoga and mobility routine for desk workers
- `online-yoga-camera-setup` — How to set up your camera and space for live online yoga

Legacy cluster (`src/lib/blog/legacy-posts.ts`): `why-traditional-hatha-still-matters`, `yoga-for-spine-longevity-12-minutes`, `the-breath-you-didnt-know-you-were-holding`, `beginners-guide-to-20-minutes-of-stillness`, `yoga-for-sustainable-fat-loss`, `building-a-home-practice-you-will-keep`, `therapeutic-yoga-benefits`.

Total 13 posts. Private 1-on-1 online coverage gaps (topics absent from the current set, stated without volume estimates):
- How a private online yoga session actually runs, minute by minute
- How teacher matching works and what happens if the match is wrong
- Can a teacher correct your posture over video — and what they can/cannot see
- Private online yoga for complete beginners who feel "not flexible enough"
- Private sessions for a specific goal (back/neck, stress, mobility) vs joining a therapeutic group
- Scheduling private yoga across time zones
- What private online yoga costs and what drives the price (enquiry-based, no invented figures)
- Private online yoga in Vietnamese / for Vietnamese speakers

## 7. Priority list

**P0**
1. Dead `#private-online-yoga` fragment in 9 places (header nav ×2, DiscoverTopics, Programs component, /programs route, site-search, 4 blog CTA/link entries) — broken jump plus a fragment stuck in shared URLs.
2. Hard-coded named testimonials with a medical-outcome claim ("chronic back pain eased within weeks") and unverified 5-star rows in `Testimonials.tsx`, rendered on `/`, `/testimonials`, `/online-yoga-classes`.

**P1**
3. No redirect or route for `/private-online-yoga`, `/private-yoga`, `/private-yoga-classes`, `/online-private-yoga` — all 404.
4. Floating CTA stack (4 global widgets) overlapping the enquiry form and closing CTA on `/personal-training`.
5. Single-teacher card grid reading as an unfinished row.
6. "transformed"/"transformation stories" outcome wording in `Testimonials.tsx:83` and `/testimonials` meta.
7. Private 1-on-1 blog coverage limited to a single post.

**P2**
8. Literal trust values in `src/lib/language.tsx:84`, `public/llms.txt:6`, `Testimonials.tsx:49-53`, `ContactSection.tsx:96` bypassing `PUBLIC_TRUST` (agree today, will drift).
9. Page length/repetition on `/personal-training`: 13 same-shaped sections, 12-item FAQ, possible dead `teaching-adjustment.webp` import, studio hero image on an online-intent page.
10. Inconsistent internal link labels for the same route ("Personal Training" vs "Private 1-on-1 Yoga" vs "Therapeutic Sessions").

NO CHANGES MADE.
