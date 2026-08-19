# Private Yoga Growth Pack — /personal-training

Date: 2026-08-19
Scope: SEO + AEO + GEO + CRO + premium UX on `/personal-training` only, plus
targeted factual regression fixes. **NOT PUBLISHED.**

## 1. Base inspected

Current production HEAD of the Yog Jivan site (TanStack Start + Lovable Cloud).
Existing systems preserved untouched: routing, sitemap, robots architecture,
site search, analytics/consent (Consent Mode v2), lead pipeline + RLS, CRM
webhook, phone input, blog engine, paid funnel `/book-online-yoga`, global
navigation and header overlays.

## 2. Files changed

| File | Change |
| --- | --- |
| `src/lib/facts/trust.ts` | `studentsTaught` 1,000+ → **10,000+**; metric label "Students guided"; removed `studentsTenThousand` from `UNPUBLISHED_CLAIMS` (now approved public fact) |
| `src/lib/facts/teacher.ts` | Removed false global `teachesEvery` / `teachesEveryNote`; added group-class-scoped `groupClassNote`; documented multi-teacher model |
| `src/lib/facts/team.ts` | **New.** `TeacherProfile` type, `TEAM_MODEL` copy, and `TEACHING_TEAM` — the single verified teacher collection the page maps over |
| `src/components/site/PrivateYogaEnquiryForm.tsx` | **New.** Inline private enquiry form on the existing lead pipeline |
| `src/routes/personal-training.tsx` | Full commercial restructure (below) |
| `src/styles.css` | Added `liquid-veil`, `liquid-veil-alt`, `rule-glow` utilities + reduced-motion guard |
| `src/routes/online-yoga-classes.tsx` | Targeted factual copy only (`teachesEveryNote` → group-scoped `groupClassNote`; private card no longer says private is taught by Master Anil). Design and indexing architecture unchanged |
| `src/routes/book-online-yoga.tsx` | Targeted factual copy only (`teachesEveryNote` → `groupClassNote`). Design, noindex isolation and robots rules unchanged |
| `src/routes/yoga-for-expats-in-vietnam.tsx` | Removed "Certified", "no rotating substitute teachers", the bullet "Every class taught personally by Master Anil, in clear English." (now "Classes available in clear English with the Yog Jivan teaching team."), and broad general-class same-teacher continuity in the answer capsule, the travel Q&A answer and its bullet (continuity now scoped to private 1-on-1: "If teacher continuity matters while you travel, private online sessions can continue with the same dedicated teacher.") |

No new dependencies, no dependency version changes, no lockfile change. `package.json` `@lovable.dev/vite-tanstack-config` remains **2.9.1** (an unrelated bump to 2.13.1 was reverted in the correction pass). No migration. No schema/RLS change.

## 3. Verified fact changes

- **10,000+ students guided** — owner-confirmed 2026-08-19. Rendered as
  "Students guided" / "students taught". Never "transformed".
- **Multi-teacher model** — private sessions are taught by the Yog Jivan
  teaching team, not exclusively Master Anil.
- **Dedicated-teacher continuity** — matched teacher, then the same teacher
  session after session. No named teacher is promised before matching.
- Unchanged: 12+ years, 20+ countries, max group 8, 60-minute sessions,
  English/Vietnamese/Hindi, private pricing **by enquiry only**.

## 4. Page architecture — before / after

Before: hero → quick answer → why private → session flow → personalise → how it
works → online setup → private vs group → pricing note → related focus areas →
FAQ (5) → further reading. Enquiries were pushed off-page to `/contact`.

After (DOM order = mobile order):
1. Hero — H1, sub, continuity micro-proof, primary CTA, 4-metric trust strip, languages
2. **Inline private enquiry form** (early on mobile; two-column on desktop)
3. Direct-answer capsule (AEO/GEO) + safety line
4. Beginner / Intermediate / Advanced tab selector
5. Why the same dedicated teacher matters (5 cards)
6. What your private practice can focus on (9 cards)
7. Private vs live small group vs recorded/app comparison
8. How private 1-on-1 works (5 steps)
9. Yog Jivan teaching team (founder card + team/matching card)
10. Live-guidance demo media frame
11. Private session details (8 facts)
12. FAQ — 12 visible questions, **no FAQPage JSON-LD**
13. Closing CTA + contextual internal links + FurtherReading

Removed from this route: nothing testimonial-based existed here; no unverified
proof was added.

## 5. Exact hero + AEO copy used

H1: "Private Online Yoga Classes — 1-on-1 live with the Yog Jivan team."
Sub: "One student. One dedicated teacher. A live 60-minute practice shaped
around your level, goals and schedule — from beginner foundations to advanced
yoga progression."
Continuity: "Matched with a Yog Jivan teacher. Continue with the same dedicated
teacher session after session."
Primary CTA: "Enquire About Private 1-on-1 Yoga". Secondary: WhatsApp.

H2 "What is private online yoga at Yog Jivan?" uses the approved capsule
verbatim, followed by "Yoga supports general wellbeing and does not replace
medical care."

## 6. Keyword / intent mapping

| Section | Intent covered |
| --- | --- |
| H1 / hero | private online yoga classes, 1-on-1 online yoga, online private yoga classes |
| Form section H2 | book private yoga online, flexible online yoga schedule |
| Direct answer | what is private online yoga, virtual private yoga |
| Level tabs | one-on-one yoga for beginners, private yoga for intermediate students, advanced private yoga classes online, advanced yoga coaching |
| Continuity cards | private yoga teacher online, personal yoga trainer online |
| Focus grid | personalized online yoga classes, yoga alignment private lesson, pranayama/breathwork |
| Live-guidance section | live yoga posture guidance, real-time yoga feedback |
| Comparison | private vs group vs recorded yoga |
| FAQ | cost, languages, camera, equipment, time zones, travel, injuries |

## 7. Teacher-profile architecture

`src/lib/facts/team.ts` exports the `TeacherProfile` type, `TEAM_MODEL` and
`TEACHING_TEAM` — one readonly, reusable collection carrying name, role,
yearsExperience, languages, specialties, suitableLevels, photo, photoAlt,
shortBio and optional profilePath. `/personal-training` maps over
`TEACHING_TEAM` to render its teacher cards; no teacher is hardcoded in the
route. Adding one further fully verified record renders another card with no
route redesign. Publicly rendered today: Master Anil only (verified facts +
real image), described with neutral founder copy — no group-class copy and no
claim that he personally teaches every private session.
To publish a further teacher the owner must supply, per teacher:
name, public role, verified years of experience, teaching languages, verified
specialties, suitable levels (Beginner/Intermediate/Advanced), real 4:5
1200×1500 WebP photo + alt text, 1–2 sentence factual bio, optional profile
link. Until every field exists, no card is rendered — no placeholders.

## 8. Media slots

| Slot | Current fallback | Required replacement |
| --- | --- | --- |
| Hero backdrop | `masterImages.studioAdjustment` (changed from the acro trio, which read as group/acro yoga rather than individual teacher attention; QA at 390/1280 shows clean crop and readable headline) | 16:9 / 16:10, 1920×1080–1200 WebP; teaching moment, left space for headline; optional muted 6–12 s loop |
| Live-guidance demo | `paid/live-guidance-floor.webp`, alt "A Yog Jivan teacher guiding a student through a floor posture in the studio" (authentic studio photo used as poster, never labelled a video call or online session) | Real private online session clip, 16:9 1920×1080, 30–60 s, MP4/WebM + 1600×900 WebP poster |
| Teacher portrait | `masterImages.founderPortrait` | 4:5, 1200×1500 WebP, head to mid-torso |
| Student proof | **not rendered** | 4:5 ~1000×1250 WebP (or 9:16 1080×1920 video) — only with written permission |

Slots are documented inline in `personal-training.tsx` comments.

## 9. Form / lead / analytics mapping

Required: Full Name, WhatsApp (SearchablePhoneInput, market-aware default),
Current Level. Optional: Email, Preferred Session Time, Main Focus.
No health, medication, injury-history or menstrual questions.

Storage — existing `leads` table via `submitLead`, `source: "website"` (no RLS
change): `experience_level` = level, `preferred_experience` = "Private 1-on-1
online yoga", `preferred_time`, `goals` = [focus].
`meta`: `funnel="private_yoga_organic"`, `landing_page="/personal-training"`,
`lead_event_id`, market, timezone, and the full first-touch attribution set
(utm_*, campaign/adset/ad ids, placement, keyword, matchtype, device, gclid,
gbraid, wbraid, fbclid, ttclid, msclkid, li_fat_id, referrer_host,
landing_first_touch, first_touch_at).

Analytics: `trackFormStart` fires once via `onFocusCapture` (guarded inside
`trackFormStart`). `trackGenerateLead` (GA4 `generate_lead` + Meta `Lead` with
`lead_event_id`) fires **only after the Supabase insert resolves**. No PII in
any event. Consent gating unchanged.

Success state: request received + 3-step explanation, no reply-time SLA,
WhatsApp primary secondary action, group-classes link.

## 10. Schema

- BreadcrumbList — "Private Online Yoga".
- Service ×2 (online worldwide + in-studio, `areaServed: "Hai Phong, Vietnam"` — formal current geography; visible copy may still say the Hai Duong urban area). Provider is the Yog
  Jivan Organization, **not** a single instructor. Descriptions match visible copy.
- No FAQPage, no Review/AggregateRating, no MedicalTherapy, no credentials.
- Self-canonical + og:url `https://yogjivan.com/personal-training`.
- Title: "Private Online Yoga Classes & 1-on-1 Yoga | Yog Jivan".

## 11. Internal links

Out: `/online-yoga-classes` (×4 contexts), `/yoga-for-beginners`, `/programs`,
`/about`, `/yoga-for-back-pain`, `/yoga-for-stress`, and blog posts
`private-online-yoga-vs-group-classes`, `online-yoga-camera-setup`,
`first-live-online-yoga-class`.
In: `/online-yoga-classes` private card and nav retain their links to
`/personal-training`; only the false Master-Anil-only wording was corrected.

## 12. UI/UX + depth approach

CSS-only depth: `liquid-veil` / `liquid-veil-alt` (slow 34 s / 46 s radial
gradient drift, blurred, decorative, `aria-hidden`, `pointer-events:none`,
z-index −1), `rule-glow` gradient separators, frosted glass cards with
restrained shadows, layered ring on the media frame. No WebGL, no canvas, no
new dependency, no background video, no cursor effects. Both veils are disabled
under `prefers-reduced-motion: reduce`.

## 13. QA matrix

| Check | Result |
| --- | --- |
| typecheck (`tsgo`) | pass, 0 errors |
| production build | pass |
| HTTP status /personal-training | 200 |
| H1 count | exactly 1 (all breakpoints) |
| Horizontal overflow @390/768/1280/1440 | 0 px |
| Console / runtime / hydration errors | none |
| Canonical | self, apex |
| Title / meta | correct, in-length |
| JSON-LD blocks | 6 total (root + route); FAQPage absent (verified in DOM) |
| "10,000+" visible as students guided | yes |
| Targeted grep: `Every class taught personally`, `no rotating substitute`, `Certified Master Anil`, `under Master Anil's direction` | 0 matches in `src/` and `public/` |
| Remaining "same teacher" occurrences | reviewed individually; kept only where scoped to live small-group online classes (owner-confirmed) or private 1-on-1. Pre-existing "Certified in classical …" credential lines on unrelated therapeutic routes are out of this pack's scope and unchanged |
| Fake testimonials / teacher details | none |
| Medical/treatment claims | none |
| Form validation keeps good input | verified (name retained after invalid submit) |
| Level & focus selects | functional |
| Phone picker | renders, searchable, market default applied |
| Reduced motion | veils disabled via media query |
| `/online-yoga-classes`, `/book-online-yoga` | design and indexing architecture unchanged (noindex isolation + robots rules intact); targeted factual copy updates only |
| Teacher cards render from `TEACHING_TEAM` | verified at 390/430/768/1024/1280/1440 |
| `package.json` version | verified back at 2.9.1 |

Lead end-to-end: verified by code path and UI validation only. **No test lead
was written to the production database** — end-to-end submission is marked as a
release-gate test.

## 14. Remaining manual items

- Real private online session video (media slot 2).
- Verified data + photos for additional teachers before any second card ships.
- Student proof photos/testimonials with written permission.
- Confirm whether private-session rescheduling/refund rules should be published.

## 15. Status

- Publish status: **NOT PUBLISHED**
- Search Console reindexing: **DEFERRED** until an approved production publish
