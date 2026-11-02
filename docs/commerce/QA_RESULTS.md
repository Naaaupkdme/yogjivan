# Shop review QA — 2026-11-02

## Outcome
Review foundation verified and **UNPUBLISHED**. No domains changed. No customer messages or test leads sent. No migrations, database objects, new integrations, payment or purchase operations. Legal/commercial release remains blocked by the evidence gates in SHOP_RELEASE_CHECKLIST.md.

## Revision provenance
Requested baseline: `be60df1b24a493a41d9554bfadc0d5babf08fb4d`.
Inspected starting HEAD: `9fdbcf2f90f012181bde356f2dfc5947757c7364`.
Verified implementation checkpoint: `5d0e15a275ae567966031a51e2e1b79571066ccf` (before final documentation-only edits; platform manages subsequent commits).
Baseline-to-start already contained a managed template package update and generated preview-auth changes. These were preserved. Sandbox startup automatically reconciled bun.lock to the already-present template version; no dependency install/version change was requested or performed by the agent.

## Checks and evidence
- Full Vitest suite: **15 files / 136 tests passed**, including all existing lead/analytics/CRM/form regressions and 8 shop rules.
- Final focused rerun after the route-boundary correction: **4 files / 52 tests passed** (shop, homepage media, rendered enquiry forms, submission flows).
- Harness build/typecheck: newest verified entries **build OK**, at 05:38:27 and 05:39:26 UTC. Manual build/typecheck not run: project harness exclusively runs these checks; package.json has no separate typecheck script.
- Real browser catalogue → keyboard filters → Mangaldeep detail → B2B: passed. Arrow-right tab navigation produced 6 → 4 → 2 cards. Zalo and safe `/go/whatsapp?i=general` links inspected only, not clicked.
- SSR: all **8 content URLs return 200**, Vietnamese document language, unique title/description/OG description, noindex/follow, self-canonical. Unknown sample and unrelated Vietnamese route return **404**. Missing-sample SSR boundary corrected and rerun; zero browser page errors.
- Responsive checks: **1280×1800, 768×1024, 390×844**; catalogue/detail/B2B render with no horizontal overflow. Screenshots inspected. Mobile catalogue uses one column for legibility. Existing cookie consent and mobile yoga widgets inherited unchanged; consent dismissed in QA via Reject Non-Essential to inspect content.
- Placeholder image accessibility: labelled role=img; genuine asset explicitly pending. Product video placeholders are non-clickable and labelled unavailable, not fake players.
- No forms/inputs in commerce content, no purchase action, numeric price, sellable-stock quantity or unsupported brand/medical/certification claim introduced. Certificate specimen and gift-pack quantities are distinguished from live stock or product guarantees.
- Sitemap fetched: no catalogue, product or partner URLs. Primary navigation, site search catalogue and locale mappings not edited.
- Protected-path diff: root shell, sitemap, analytics, WhatsApp helpers, local contact, locale routing, CRM, intake, API routes and migrations unchanged. Existing lead helper change is **type export only**, not submission behaviour. No new tracking events/pixels.
- `git diff --check`: passed.
- Not performed: production/live QA, commercial payment/fulfilment, legal verification, real image/certificate examination or contact-message delivery (outside review scope).

## Existing check failures corrected minimally
The initial harness typecheck exposed pre-existing unused browser-API suppression comments, unreachable idle fallback narrowing and a missing exported SubmitPayload type. Removed obsolete suppressions, used function-presence checks, typed test callbacks, and exported the already-existing type. No copy/layout/submission logic changed. Tests and harness then passed.

## Exact source/documentation files
Added:
- `src/lib/commerce/catalogue.ts`
- `src/lib/commerce/catalogue.test.ts`
- `src/lib/commerce/head.ts`
- `src/components/commerce/ShopParts.tsx`
- `src/routes/vi.cua-hang.tsx` (Outlet layout)
- `src/routes/vi.cua-hang.index.tsx` (catalogue leaf)
- `src/routes/vi.cua-hang.$slug.tsx`
- `src/routes/vi.doi-tac-san-pham.tsx`
- `docs/commerce/IMPLEMENTATION_SCOPE.md`
- `docs/commerce/SHOP_RELEASE_CHECKLIST.md`
- `docs/commerce/MASTER_STATUS.md`
- `docs/commerce/DECISION_LOG.md`
- `docs/commerce/COMPLETED_REGISTER.md`
- `docs/commerce/QA_RESULTS.md`

Modified:
- `src/styles.css` (scoped green commerce tokens only)
- `AGENTS.md` (architecture boundary)
- `roadmap.md` (shop tasks and completed connector status)
- `src/components/site/Hero.tsx` (existing typecheck repairs)
- `src/components/site/Hero.test.tsx` (browser API callback typing)
- `src/lib/leads.ts` (export existing type only)

Automatically updated, not authored: `src/routeTree.gen.ts`, `bun.lock`.
Memory saved: shop truth/release constraints in project memory.

## Preview routes
Base: `https://id-preview--fb15e133-c4b9-4ec2-944e-9a89ea90823d.lovable.app`
- `/vi/cua-hang`
- `/vi/doi-tac-san-pham`
- `/vi/cua-hang/vong-tay-rudraksha-5-mukhi`
- `/vi/cua-hang/chuoi-mala-rudraksha-5-mat`
- `/vi/cua-hang/vong-tay-rudraksha-om-phoi-hat-den`
- `/vi/cua-hang/vong-tay-hat-den-bay-chakra`
- `/vi/cua-hang/mangaldeep-scent-luxe-gift-set`
- `/vi/cua-hang/sawariya-flora-agarbatti`

## Unresolved release items
Owner-supplied exact photos/video; physical counts/cost/prices; original certificate verification; business/product/import/label review; company disclosures and policies; explicit COD/QR and bank reconciliation rules; eventual secured commerce implementation and owner approval. None is implied complete by this review.