# Telegram lead keyboard update

## Scope
- Update the existing Telegram lead alert formatter only.
- Replace the current action row with the requested three two-button CRM status rows.
- Add the Google Sheet “Open CRM” URL button as the fourth row when the CRM URL is available.
- Keep lead text, privacy safeguards, delivery, forms, Sheets sync, analytics, and n8n behavior unchanged.

## Verification
- Update focused formatter tests to assert every label, callback value, row order, and CRM URL.
- Confirm invalid-phone alerts receive the same CRM controls without exposing health details.
- Run the lead tests and review preview build diagnostics.
- Do not send a Telegram message, submit a lead, publish, or write to Google Sheets.
