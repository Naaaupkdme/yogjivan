<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Lead automation: DB trigger -> lead_outbox (service-only) -> /api/public/leads/dispatch (token from automation_settings) -> Sheets/Telegram via connector gateway; delivery toggled in automation_settings. Why: idempotent retries, no client-side secrets.
- Public WhatsApp CTAs use waHref() -> /go/whatsapp (POST on real click records anonymous whatsapp_clicks row; GET only redirects). Why: first-party attribution without bots/prefetch inflating clicks.
- Final lead submissions (website + MCP) go only through /api/public/leads/submit or the MCP handler -> submit_lead_guarded() (service role; rate limits, duplicate suppression, HMAC fingerprints); anon RLS allows partial statuses only. Why: spam cannot bypass protection or trigger alerts. Ops: docs/ops/lead-anti-spam.md.
- n8n CRM bridge: POST /api/public/n8n-crm-control (Bearer N8N_CRM_BRIDGE_TOKEN, disabled if unset) -> crm_apply_action() updates only leads.crm_* + lead_crm_events (request_id idempotency). Why: n8n never writes the DB directly; outbox/Sheets/Telegram untouched.
- Commerce review uses a browser-safe static catalogue in src/lib/commerce, a path layout with distinct catalogue/detail leaves, and isolated noindex metadata; do not register these draft routes in sitemap, search or global navigation. Why: review must not launch selling or change yoga funnels.
- Commerce photos use inspected owner assets via src/lib/commerce/photos.ts and durable asset pointers, with full-frame object-contain and responsive renditions. Why: prevent temporary URL exposure, identity-altering crops and fabricated product imagery.
