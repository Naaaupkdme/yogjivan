# Meta Pixel — implementation note

- Dataset: 1752860699056785 (portfolio 578760686515386). Category left unchanged (None).
- Loads only on yogjivan.com / yogjivan.in hosts, after marketing consent, never on sensitive health paths.
- Manual Only mode: `fbq("set", "autoConfig", false, ID)` runs once, before `init`
  (Meta Pixel docs, "Automatic configuration"). Stops automatic button/metadata collection.
  This is data minimisation, not a way around Meta category restrictions or eligibility review.
- Allowlisted events: PageView, ViewContent, Contact, Lead. Custom data always `{}`; Lead carries only an event ID.
- Like any Pixel, the browser still sends IP address, user agent, page URLs/referrer and Meta cookies.
  Personal contact fields and free-text messages are not added to events.
- Conversions API: not enabled. No server token exists.
