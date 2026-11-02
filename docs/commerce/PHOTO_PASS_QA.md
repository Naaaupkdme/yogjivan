# Real-photo review pass — 2026-11-02

Unpublished, noindex/follow, no checkout. Prior QA_RESULTS.md preserved unchanged.

## Source inspection and durable mapping
All eight authorised files downloaded successfully and individually visually inspected. No signed source links are stored in project code, documentation or asset pointers. Each public image retains its entire supplied frame, without label edits, colour changes or identity-hiding crops. EXIF orientation normalised; Om package rotated clockwise for reading. No image generation or dependencies used.

Every stem below has durable pointers under `src/assets/commerce/` named `<stem>-640.webp.asset.json` and `<stem>-1600.webp.asset.json`. Pointer files reference durable hosted image bytes; original downloads and conversion files stay temporary, not in source control.

| Source | Existing sample | Durable asset stem | Use |
| --- | --- | --- | --- |
| IMG_8164.jpg | 5-mukhi Rudraksha bracelet | rudraksha-5-mukhi-front | Primary front/photo includes part of supplier card; pending verification retained |
| IMG_8166.jpg | Brown 5-face mala | rudraksha-mala-front | Primary package, visible JA-65556 card; not independent or medical certification |
| IMG_8169.jpg | Mixed Rudraksha/black beads/Om bracelet | rudraksha-om-front | Primary package, rotated only |
| IMG_8161.jpg | Black-bead seven-chakra bracelet | seven-chakra-front | Primary front/card |
| IMG_8174.jpg | Mangaldeep Scent Luxe gift set | mangaldeep-gift-open | Primary actual open yellow gift box with four matching packs |
| IMG_8171.jpg | Same Mangaldeep gift set | mangaldeep-package-detail | Secondary complete package evidence only; printed MRP not Yog Jivan price; claims/marks not independently verified |
| IMG_8215.jpg | Sawariya Flora Agarbatti tube | sawariya-flora-front | Primary tube, actual yellow-green label |
| IMG_8165.jpg | Rudraksha supplier card back | NONE | Excluded from upload and public gallery: immunity/healing promotion |

640-pixel renditions: 69–172 KB; larger renditions: 297–655 KB. Portrait originals are 1536×2048 and not upscaled; landscape large renditions are 1600×1200. WebP quality 90–94 preserves bead/label detail. Responsive srcset, explicit dimensions and object-contain prevent crops and shifting. Real-photo captions distinguish printed claims from verified facts. Video placeholders unchanged.

## Verification
- Focused regressions: 4 files, **40 tests passed** (11 shop/catalogue/photo rules, 16 rendered enquiry-form tests, 13 submission-flow tests).
- Harness build/typecheck: **build OK**, verified after photo integration (05:45:10 UTC). Manual build/typecheck not run because harness owns them.
- Browser: six catalogue photos decoded successfully; keyboard filters remain 6 → 4 → 2. All six detail photos and secondary package image loaded.
- Desktop 1280×1800, mobile 390×844 and tablet 768×1024: image decode and no horizontal overflow across catalogue and all six product routes. Desktop catalogue, mobile card and detail screenshots inspected.
- noindex/follow retained on every product route; sitemap excludes catalogue; unknown sample returns 404. Zero page errors. No commerce form, input or purchasing added.
- `git diff --check` passed. Scan of commerce asset pointers, photo mapping and documentation found no temporary signed links.
- No contact links clicked; no messages, submissions, payments, DB changes, integrations or publication. Protected yoga flows, contact helpers and analytics were not modified in this pass.

## Exact changes
14 new asset pointers listed by stem above; new `src/lib/commerce/photos.ts` and `photos.test.ts`; modified `src/components/commerce/ShopParts.tsx`, `src/routes/vi.cua-hang.index.tsx`, `src/routes/vi.cua-hang.$slug.tsx`; architecture rule in AGENTS.md, roadmap tasks and operating-record updates. Original QA evidence kept.

Starting HEAD: `b966a467c05837753859b41b2ba90da46b046a7a`. Verified photo implementation checkpoint: `fc9645a626e94173714859c6e98bc4c206c78217` before documentation completion; final platform-managed HEAD reported in chat.

Still unresolved: legal/import/label review, certificate authenticity/scope, exact quantities/cost/prices, policies and commercial approval. Actual videos not supplied. Photos do not satisfy these gates.