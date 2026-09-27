# Lead anti-spam — operations

All final enquiries (`status='submitted'`) from the website and the MCP assistant tool go through
`POST /api/public/leads/submit` (website) or the MCP handler, both of which call
`public.submit_lead_guarded()` (service role only). Anonymous clients can still save partial steps
(`micro_commit/goals/preferences/health/review`) but can no longer insert a final lead directly.

## Thresholds
| Rule | Limit | Result |
|---|---|---|
| Per IP fingerprint | 5 accepted / 15 min | 6th → HTTP 429 + 60-min temporary block |
| Per IP fingerprint | 20 accepted / 24 h | → HTTP 429 + 24-h temporary block |
| Per session | 3 accepted / 15 min | → HTTP 429 (no block) |
| Identical retry (idempotency key, or session + payload hash) | 24 h | returns original result, no new lead/alert |
| Same normalized phone or email | 24 h | "already received", no new lead/alert |
| Honeypot filled | — | fake success to the bot, no lead, logged `honeypot` |

Public errors never say which rule matched. Conversion events (GA4/Meta) fire only on `accepted`.
MCP calls have no end-user IP, so all MCP submissions share one "mcp-gateway" IP bucket.
Checks + insert run under one transaction-level advisory lock (race-safe).

## Privacy
Only HMAC-SHA256 fingerprints (key: `automation_settings.fingerprint_key`, service-only) of IP,
session, phone and email are stored. No raw IP is stored anywhere. IP source order:
`cf-connecting-ip` → `x-real-ip` → first `x-forwarded-for`; IPv6 grouped by /64.

## Review blocked attempts (SQL, run by an admin)
```sql
select outcome, reason, source, count(*) from lead_submission_attempts
where created_at > now() - interval '7 days' group by 1,2,3 order by 4 desc;
select * from lead_submission_blocks where blocked_until > now();
```

## Unblock / adjust
- Unblock now: `update lead_submission_blocks set blocked_until = now() where blocked_until > now();`
  (or filter by `ip_fp`).
- Change limits: edit the numbers in `submit_lead_guarded()` with a new migration.

## Retention
Daily cron `lead-submission-attempts-cleanup` (03:17 UTC) deletes attempts older than 30 days and
blocks expired for more than a day. Leads themselves are never deleted by this job.

## Optional Cloudflare Turnstile (off by default)
Turnstile turns on only when BOTH are set:
1. In Cloudflare dashboard → Turnstile → Add site: add yogjivan.com, www.yogjivan.com, yogjivan.in,
   www.yogjivan.in and the lovable.app domains; widget mode "Managed".
2. Add `VITE_TURNSTILE_SITE_KEY` (public site key) to the project environment.
3. Add `TURNSTILE_SECRET_KEY` as a server secret.
4. Rebuild/publish. Every final submission then requires a valid token with action `lead_submit`
   and an allowed hostname, verified server-side. Remove either key to switch it off.
