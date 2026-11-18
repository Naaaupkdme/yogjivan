# Compliant Meta Measurement Plan (Health & wellness dataset)

## Verified facts (owner, Meta UI, 2026-11-18)
- Dataset 1752860699056785 "Yog Jivan Website Pixel" is owned by business Anil Yogacharya (578760686515386). Same ID as the live site.
- Category: Health & wellness provider. Some standard events and some website data are blocked by Meta. Automatic advanced matching off. CAPI pending.
- Diagnostics list both www.yogjivan.com and the old preview domain.
- Event review is behind an acknowledgement only the owner can accept.

These restrictions stay. No reclassification, no new dataset, no CAPI to get around blocks.

## What the site sends to Meta today (from code)
- PageView (after marketing consent, allowed hosts only, never on sensitive health pages).
- ViewContent with page name/category on 4 service pages.
- Contact on WhatsApp/Zalo/phone/email clicks.
- Lead with a service category and event ID after an accepted enquiry.
- Preview domains never load the Pixel in current code, so the preview-domain entry in Diagnostics is historical.

## Two separate records
1. Operational record (source of truth): leads in the backend, CRM, Sheet, Telegram, WhatsApp click counts, Help feedback. Unchanged. Never sent to Meta beyond what is allowed below.
2. Meta signal: only events Meta confirms as allowed for this dataset, with minimal parameters.

## Step 1 — Owner confirmation (blocking)
Owner opens Events Manager, accepts the review acknowledgement, and reports for each event (PageView, ViewContent, Contact, Lead) whether it is Allowed or Blocked, plus which parameters are blocked. Until then: no code changes.

## Step 2 — Code changes, only after Step 1 (conditional)
One allowlist in the analytics module decides what can be sent; everything else is dropped in the browser.
- If an event is Blocked: stop sending it (no renaming to a custom event to sneak it through).
- If Lead is Allowed: keep as is, but send no parameters except the event ID (drop service category, which can reveal health-related intent).
- If ViewContent is Allowed: send only a neutral page group (e.g. "online", "private", "studio"), no content names; never on health-topic pages (already excluded).
- If Contact is Allowed: keep, no parameters.
- Help panel and feedback never send any Meta event (already true; add a test).
- Tests: each blocked event produces zero fbq calls; allowed events carry only approved fields; no event without marketing consent.

## Step 3 — First-party consented reporting
- Use what already exists in the backend: accepted leads by service and source tag (short links /go/...), WhatsApp click rows, help feedback counts.
- Add a small owner-only weekly summary (counts only, no names or contacts): visits by source tag, WhatsApp/Zalo clicks, accepted enquiries by service, conversion rate. Source tags recorded only when analytics consent is given; counts without consent stay anonymous totals.
- This becomes the main way to judge ads and social posts; Meta numbers are a secondary signal.

## Step 4 — CAPI
Stays off. Reconsider only if Meta lists Lead as allowed and the owner asks; it would reuse the same event ID and the same allowlist, consent-gated.

## Help panel notification prerequisites (current build)
- Staff Telegram alerts: on and working in preview (needs Telegram connection, alert chat setting enabled, Lovable key). All present.
- Works live only after publish. Retries happen only when new feedback arrives.
- Reply contacts readable by staff only through the backend; a small staff view is a possible later step.

## Out of scope
No Pixel/ID/business/category changes, no CAPI, no publish, no customer messages.
