# Meta Dataset Check and Help v1 — Plan (read-only until approved)

## Part A — Meta account and dataset check

### Known facts (from current source and prior reads)
- Website Pixel ID installed: 1752860699056785, loaded only on yogjivan.com/.in, only after marketing consent, never on sensitive health paths.
- Lead fires only after the server accepts a final enquiry; spam, duplicates and WhatsApp clicks do not fire Lead.
- A separate connector saw ad account 512151073241732 marked "needs re-authorisation" with no pixel listed. This is inconclusive: an expired login cannot show which datasets it owns.
- No server-side (CAPI) events exist today.

### Step 1 — Read-only enumeration (no changes)
1. List every Meta connection in the workspace and which ones are usable.
2. For each usable connection: list ad accounts, owning business names, and datasets/pixels each account can see.
3. Read dataset 1752860699056785 directly: owner business, name, last fired time, recent event counts (PageView, Lead), and any diagnostics Meta returns.
4. Output a table: business name | ad account | datasets visible | does it own or only share 1752860699056785 | last event seen.

Blockers reported exactly if hit: expired login (owner must re-authorise in connector settings), missing permission on the dataset, or dataset owned by a business no connection can see.

### Step 2 — Decide one authoritative dataset (owner decision)
- Default: keep 1752860699056785 if it is owned by the business the owner controls and is receiving events. No ID change.
- Only if it is owned by the wrong/unreachable business: owner shares it (or chooses an existing one) in Meta Business settings. No new pixels created by me.
- The ad account used for future ads must have access to that same dataset.

### Step 3 — CAPI only if justified
Add server events only if Step 1 shows browser Leads are lost (consent/ad blockers) or Meta flags low match quality. If added:
- Server sends Lead only from the accepted-lead path, using the same event_id the browser used (lead source UUID), so Meta deduplicates.
- Sent only when the visitor gave marketing consent (consent flag stored with the lead).
- Fields allowed: event name, time, event_id, page URL, service type, hashed email/phone only if owner approves. Never health notes, chat text, names, raw contact details.
- Sent from the existing outbox (separate step, fail-soft), so CRM, Sheets and Telegram are unaffected.
- Token stored as a server secret added by the owner.

### Measurable checks
- Meta Test Events shows browser Lead with consent and nothing without consent.
- With CAPI: same event_id appears as "browser + server, deduplicated"; duplicate rate visible in Events Manager.
- Automated tests: no health/contact fields in the event payload; no Lead for rejected/duplicate submissions.

## Part B — Help v1

No File24 implementation exists in current source; requirements below come from the owner's File24 brief. If the owner has the File24 document, attach it so the plan can be matched line by line.

### What visitors get
- A small "Help" button; the panel loads only when opened (nothing extra on page load).
- FAQ and search: reuses the existing site search and FAQ content, EN and VI.
- Ask the team: WhatsApp or Zalo buttons with a prefilled, non-sensitive message.
- Private feedback: short form saved to its own protected table, separate from sales leads; never fires Meta Lead; rate-limited like existing forms.
- Review chooser: "Which studio did you visit?" then that studio's Google review link (Bùi Thị Xuân or Ngô Quyền).

### Optional AI answers (phase 2, separate approval)
- Starts only when the visitor types a question and presses Ask.
- Answers in English, Vietnamese or Hindi, grounded only in verified site facts (prices, schedules, studios, services) supplied to the model each time; prompts alone do not guarantee accuracy, so:
  - Answers must cite which fact they used; if no fact matches, it says so and offers the team.
  - Health/medical questions get a safe refusal plus human handoff.
  - Prices are rendered from the price file, not written by the model.
- Usage budget: per-visitor and daily caps; when reached, panel shows FAQ and team buttons only.
- Questions stored without names/contacts; owner can review unanswered ones.
- Test set of ~40 real-style questions (EN/VI/Hindi) checked for correct price, no invented claims, correct handoff, before launch.

### Measurable checks
- Initial page weight unchanged (build comparison); panel chunk size reported.
- Keyboard and mobile use of the panel; correct review link per studio.
- Feedback row saved, no Lead event, no Telegram sales alert.
- AI: 100% of price answers match the price file in the test set; caps enforced.

## Technical details
- Meta reads use the Meta Ads connector (read-only GETs); none run without a working login.
- New tables: help_feedback (RLS, service-only insert via a public route with existing rate-limit pattern), help_ai_usage for caps.
- AI via Lovable AI from a server function; facts loaded from src/lib/facts.
- CAPI, if approved: new outbox step + secret META_CAPI_TOKEN supplied by owner.

## Out of scope
No new accounts or pixels, no ID/sharing/routing changes, no connector changes, no customer messages, no publish.
