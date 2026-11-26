# Sonu Ghanghas profile — editor-only QA, 2026-11-26

## Scope
Existing English `/about` retained. No Vietnamese About existed in the current source or production (live `/vi/gioi-thieu` returned 404), so the requested bilingual counterpart was added at `/vi/gioi-thieu`, not a separate profile route. Reciprocal language alternates and self-canonicals use the existing locale architecture. Homepage EN/VI and shared footer link via plain href to localized About anchors.

Shared leadership cards have the same widths, image aspect ratio and desktop height, and stack at 390px. Founder identity and teaching credits remain intact. The original owner-selected navy-blazer portraits were uploaded unchanged, not generated or re-encoded. Translated biography distinguishes personal yoga experience from teaching credentials. Selected work describes website/search and enquiry workflow design without performance metrics.

The only collaboration CTA is `mailto:hello@yogjivan.com`, drawn from the verified shared CONTACT source. No unverified external destination or personal profile was supplied or added.

## Files
- `src/assets/leadership/sonu-ghanghas-co-founder-480.webp.asset.json`: original 480×600, 22,116 bytes.
- `src/assets/leadership/sonu-ghanghas-co-founder-800.webp.asset.json`: original 800×1000, 51,062 bytes.
- `src/lib/leadership.ts`, `src/components/site/Leadership.tsx`: shared biography, portraits and scoped Person schema linked to existing Organization ID.
- `src/routes/about.tsx`, `src/routes/vi.gioi-thieu.tsx`: bilingual About content, self-canonical and reciprocal alternates; existing Master Anil Person remains sitewide, not duplicated.
- `src/routes/index.tsx`, `src/routes/vi.index.tsx`, `src/components/site/SiteFooter.tsx`: leadership and localized crawlable links.
- `src/lib/locale-routes.ts`, `src/lib/locale-routes.test.ts`: About counterpart and tests.
- `src/lib/leadership.test.ts`, `src/lib/sitemap-entries.test.ts`: identity/discovery/language/sitemap regressions.
- `public/llms.txt`: additive leadership entry only.
- `AGENTS.md`, `roadmap.md`: operating records.
- `src/routeTree.gen.ts`: automatic router output, not authored manually.

Pre-existing `bun.lock` modification is excluded from this request's commit. Existing SEO C/D and booking-guide changes are preserved. No booking, forms, intake, consent, tracking, prices, crawler policy or sitemap generation architecture changed.

## Verified outcomes
### Profile
Local running preview: EN and VI About HTTP 200, full biography and links present in initial server HTML; intended robots `index, follow` inherited unchanged; self-canonical on www and three reciprocal hreflang links. Exactly one Sonu Person per About document links to existing Organization. No added credentials, clients or testimonials.

Playwright rendered both languages at 1280×1800 and 390×1800. Portraits loaded, mobile selected the 480w source, desktop selected 800w; no horizontal overflow. Reviewed both desktop leadership and mobile profile screenshots. Home and footer each supply localized Sonu anchor links. Meta/Google requests intercepted in local QA; no submissions or messages.

Search has no manually maintained content manifest: existing automatic route metadata index discovers Sonu through EN/VI About titles/descriptions. Tested localized queries resolve to the correct About page. No second page registry or search architecture changes.

Live production `/about` remains HTTP 200 with current self-canonical/index-follow; new Vietnamese counterpart remains live 404, as expected before publication. Production was not modified.

### llms.txt
Local HTTP 200, `text/plain; charset=utf-8`, includes English/Vietnamese leadership links and role. Existing entries retained. Production remains its prior version.

### sitemap.xml
Local HTTP 200, valid XML with 57 unique canonical URLs: prior 56 candidate URLs plus Vietnamese About. `/about` and `/vi/gioi-thieu` each appear once. No profile hash URL. Existing sitemap architecture and blog dates retained. Initial stale development cache served 56 URLs; supervised preview refresh resolved it without application changes.

### Tests/build and limitations
Full suite: **283 tests passed in 30 files**, final run 20:18:31 UTC. Automatic preview compilation reported **build OK at 20:17:52 UTC**; no manually invoked production build or independent typecheck, per environment restrictions. Do not interpret this as separate production-build proof.

Hosted preview returned HTTP 401 to unauthenticated requests for both About pages, llms and sitemap. The measured UI/SSR checks above are local editor-preview checks, not hosted runtime proof. Editor review links:
- https://id-preview--fb15e133-c4b9-4ec2-944e-9a89ea90823d.lovable.app/about#sonu-ghanghas
- https://id-preview--fb15e133-c4b9-4ec2-944e-9a89ea90823d.lovable.app/vi/gioi-thieu#sonu-ghanghas

Temporary evidence: `/tmp/browser/sonu/results.json`, screenshot files and saved initial HTML. No publish/deploy, search-engine submission, production-record change, or crawl/indexing claim.