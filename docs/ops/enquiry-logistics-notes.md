# Enquiry logistics notes candidate — 2026-11-20

## Storage and access

- Shared Couples/Family form: `leads.meta.shared_notes`, maximum 300 UTF-16 code units. No longer uses `goals` (whose 80-character cap remains unchanged).
- Corporate/School EN and VI: `leads.meta.organizer_notes`, preserving their existing 400-character UI allowance. Empty input is stored as null; optional metadata is accepted. Valid nonempty text is preserved verbatim, including whitespace, accents and combining marks.
- No schema/RLS change: `acceptLead` already passes metadata to service-only `submit_lead_guarded`; its existing INSERT persists the complete JSON in `leads.meta`.
- Owner-authorized access: Lovable More → Database → `leads` → locate the CRM Lead ID or Source UUID → inspect `meta`. The public application has no lead-read endpoint or staff notes screen. Anonymous/authenticated website SELECT remains denied. Coordinators with only Sheet/Telegram access cannot read these private notes there; the owner must use the protected database view. No new staff access was granted.
- Existing dispatcher reads metadata under service authority but its allowlist excludes both notes keys. Notes are not mirrored to Sheets (including manual Notes column), Telegram, AI scoring, Meta or GA4. No new notification content or unredacted logs.

## Root causes and fix

Shared forms placed a 300-character textarea into `goals[]`, whose server validator capped each item at 80. Dedicated metadata fixes this without widening unrelated goal fields. Corporate/School built a top-level `notes` property that `submitLead` never serialized; the actual textarea now uses supported metadata. Organization, location, group size, timing, source, funnel and all existing fields remain intact.

School helper text explicitly restricts notes to room/scheduling/adult-coordinator logistics and asks EN/VI users to omit children's personal and health details. No automatic claim of preventing all sensitive free-text entry is made.

## QA

- Focused regressions exercise optional/blank/null, 80/81/300/301 shared notes; unrelated 80-character goals; 400/401 organizer notes; Vietnamese precomposed/decomposed text and surrogate pairs using existing HTML/Zod UTF-16 semantics.
- Actual rendered forms call the real `submitLead`; only fetch is intercepted. Tests validate the serialized request with the production server schema.
- `acceptLead` is tested with isolated mocked privileged storage at the guarded RPC boundary; complete metadata readback and minimal public response asserted. Real database writes deliberately not performed.
- Playwright local pages: Couples, Family, Corporate EN/VI, School EN/VI. Fresh contexts, real fills/clicks, one intercepted request each; exact notes preserved; source website; success state and no page errors. All external requests blocked, no live leads/destinations. Hosted preview not asserted.
- Latest available automatic build log before closeout: build OK 2026-11-20T06:00:18Z. This is preview evidence, not an independently run production build or TypeScript check; manual builds/typechecks prohibited by this environment.
- Shared form has no separate Vietnamese localized route/component in current source; Vietnamese notes and language selection use the same validator. No new locale page created.

Automatic sitemap candidate, routes, offers/prices, CRM status bridge and anti-spam/idempotency rules preserved. No publish, messages or migrations.