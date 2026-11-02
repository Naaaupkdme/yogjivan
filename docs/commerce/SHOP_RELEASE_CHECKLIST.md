# Shop release checklist — not approved for sale

## Present boundary
Static Vietnamese review catalogue and information enquiries only. No prices, sellable stock, order, cart, checkout, reservation, payment, delivery promise or persisted enquiry. Zalo/WhatsApp open the existing team destinations; opening a link does not save an enquiry. No DB tables, migrations, auth, payment/courier integration, Make webhook or new pixels in this pack. Pages are noindex/follow and excluded from the sitemap and global navigation. No product imagery supplied: neutral placeholders only.

## Mandatory owner/legal gates
All boxes remain open until evidence and owner approval are recorded; this checklist is not legal advice.

- [ ] **Company:** verify legal entity, business licence, product-specific scope, seller identity/address/tax details, invoicing obligations and permitted B2B/B2C operations.
- [ ] **Import:** samples arrived in personal luggage; do not assume commercial resale is authorised. Obtain product/category-specific advice on customs declarations, import documentation, duties/taxes and lawful commercial supply before selling.
- [ ] **Labels:** Vietnamese labelling, importer/seller/manufacturer identities, required origin wording, ingredients/materials, pack quantities, cautions and any category-specific disclosures reviewed. Buying in India does not prove India-grown beads.
- [ ] **Products/variants:** inspect each actual SKU; confirm material identity, sizes, finish, closures, counts, pack configuration, batch and manufacturing origin only with adequate evidence.
- [ ] **Certificates:** original supplier cards, issuer identity/authenticity, specimen match, testing scope and permission to reproduce. “One pcs tested” must not become “all beads certified”; no inferred GIA affiliation or medical benefits.
- [ ] **Images/video:** owner-supplied exact sample photos, rights/permission, accessible descriptions, correct SKU mapping; fit, care and how-to clips. No borrowed competitor images or fictional likenesses.
- [ ] **Prices:** exact currency, taxes, unit/variant price, landed cost and margin, B2B quote terms approved; no invented discounts or wholesale minimums.
- [ ] **Stock:** physical counted sellable units, damaged/quarantined samples, locations and batches reconciled. Samples are not assumed sellable stock.
- [ ] **Safety:** incense ventilation, fire/heat precautions, sensitivities and actual pack instructions checked; beads include small-part/skin-contact and care guidance. No air-purifying, smoke-free, cure or clinical claims.
- [ ] **Policies:** seller terms, privacy, shipping areas/cost/time, returns/refunds/exchanges, damaged goods and complaint procedure; applicable local ecommerce registration/notification obligations reviewed.
- [ ] **Payments/fulfilment:** exact customer quote including delivery and tax, explicit COD eligibility/fees/collection/reconciliation and QR/bank transfer expiry/reference rules. Confirm against bank transactions or approved provider records, never a screenshot alone. No shipping before the agreed payment/COD checks.
- [ ] **Release:** review copy/assets/legal evidence; owner approves sale scope and separate publish action; then live-route, consent, payment, stock and lead-funnel verification.

## Future architecture — designed, NOT implemented
Keep application commerce tables in `public`; explicit grants and RLS for every table. No anonymous final-order writes. Public readers see only approved catalogue fields through narrow policies/views, never stock internals, costs, customer data, partner terms or payment records. Roles stay in protected separate roles table. Sensitive writes and outbox processing are service-only after caller verification; ordinary authenticated reads use user-scoped RLS. Credentials remain server-only.

| Module | Intended records and boundary |
| --- | --- |
| products | Stable SKU, reviewed bilingual content, category, publication/legal state; public projection contains approved fields only. |
| variants | Product ID, verified attributes, currency, server-held unit price, version; internal costs never public. |
| certificates | Product/batch/specimen association, issuer, scope, review state; private originals, approved redacted public documents only. |
| orders | Quote/order ID, lifecycle, minimal customer data, currency, immutable confirmed totals, expiry, request idempotency key. |
| order_items | Immutable SKU/variant description, quantity, server unit price, tax and discount snapshot. |
| inventory_movements | Immutable receipt/reserve/release/sell/return/adjust ledger, reason and operator; service-only, reconcile physical counts. |
| payments | Expected amount/currency/reference, provider/bank transaction ID, verified state, reconciliation audit; deduplicate bank/provider IDs. |
| shipments | Confirmed carrier/recipient/minimal address, fulfilment state and tracking after reviewed delivery integration. |
| partners | Verified business contacts and approval state, protected negotiated terms, lawful outreach basis. |
| outbox | Service-only versioned event payloads, lease, retry count and delivery identity; no duplicate customer messages or sensitive health data. |

### Transaction rules for the later pack
Use TanStack server functions for internal authenticated operations and verified public server handlers for external callbacks. No client-supplied price/tax/discount is trusted. Calculate quote totals on the server from approved price versions and exact variants; require acceptance of any changed quote. Enforce unique idempotency keys and immutable accepted financial snapshots.

Reservations must be transactional with row locks/atomic availability checks, expiry and release handling; concurrent buyers cannot oversell. Reserving stock is not proof of payment. Finalise only against a verified bank/provider transaction of the correct amount, currency and reference, or an explicitly approved COD flow. Replayed callbacks, retries and shipment events must be idempotent. Auditable refund/return movements reconcile money and physical stock. Minimise PII and prohibit raw personal details in analytics/outbox logs.

### Future QA gates
Server price tampering, cross-user access, grants/RLS, forged/replayed callbacks, payment mismatch, duplicate requests, reservation expiry and concurrent last-unit checkout; reconciliation/returns; keyboard/mobile/SSR; cookie consent and unchanged yoga lead guard/outbox/n8n bridge. No real orders or test customer messages without a separate approved test protocol.