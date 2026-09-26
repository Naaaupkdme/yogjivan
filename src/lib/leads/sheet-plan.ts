// Pure planning for the Google Sheet upsert.
// Database owns form fields; the Sheet owns manual sales fields, which are never written.

import type { LeadPayload } from "./payload";
import { waMeLink } from "./phone";

/** Form-owned: always written (by header name). */
export function formOwnedValues(p: LeadPayload): Record<string, string> {
  return {
    "CRM Lead ID": p.crm_lead_id,
    Name: p.name,
    WhatsApp: p.phone.phone_original,
    "WhatsApp Link": waMeLink(p.phone.whatsapp_full_number) ?? "",
    Email: p.email ?? "",
    Goals: p.goals.join(", "),
    "Preferred Experience": p.preferred_experience ?? "",
    "Preferred Time": p.preferred_time ?? "",
    "Health Notes": p.health_present ? "Provided — view in secure database" : "",
    "Experience Level": p.experience_level ?? "",
    Status: p.status,
    Source: p.source ?? "",
    Market: p.market ?? "",
    Timezone: p.timezone ?? "",
    Funnel: p.funnel ?? "",
    "Landing First Touch": p.landing_first_touch ?? "",
    "Landing Page": p.landing_page ?? "",
    "UTM Source": p.utm_source ?? "",
    "First Touch At": p.first_touch_at ?? "",
    "Created At (UTC)": p.created_at,
    "Updated At (UTC)": p.updated_at,
    "Session ID": p.session_id ?? "",
    "Meta JSON": p.meta_json,
    "Country/Region (inferred)": p.phone.country_iso ?? "",
    "Record Type": "Website lead",
    "Source UUID": p.lead_id,
    "Country Code": p.phone.country_code ?? "",
    "Mobile Number": p.phone.mobile_number ?? "",
    "WhatsApp Full Number": p.phone.whatsapp_full_number ?? "",
    "Phone Original Input": p.phone.phone_original,
    "Phone Validation": p.phone.phone_validation === "valid" ? "valid" : `needs_review: ${p.phone.reason}`,
  };
}

/** Written only when the cell is currently empty (initial triage defaults). */
export function setIfEmptyValues(p: LeadPayload): Record<string, string> {
  return {
    Priority: p.priority,
    "Lead Status": "New",
    "Contact Status": "Not contacted",
    "Duplicate Key": p.phone.whatsapp_full_number ?? "",
  };
}

/** Never written by automation — listed for tests/documentation. */
export const MANUAL_HEADERS = [
  "Age", "Funnel Stage", "Last Contact", "Next Follow-up", "Owner", "Notes",
  "Demo Status", "Next Action", "Response Status", "Contacted Via", "Health Tags",
] as const;

export function colLetter(idx: number): string {
  let n = idx + 1;
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

export type CellWrite = { col: number; row: number; value: string };

export type SheetPlan = {
  row: number; // 1-based sheet row
  isNew: boolean;
  writes: CellWrite[];
  missingHeaders: string[];
};

/**
 * values[0] is the header row. Rows are matched by Source UUID first, then CRM Lead ID.
 * A new row goes after the last non-empty row (existing extra rows are preserved).
 */
export function planSheetUpsert(values: string[][], p: LeadPayload): SheetPlan {
  const header = (values[0] ?? []).map((h) => String(h ?? "").trim());
  const idx = (name: string) => header.indexOf(name);
  const uuidCol = idx("Source UUID");
  const crmCol = idx("CRM Lead ID");

  let rowIdx = -1;
  if (uuidCol >= 0) rowIdx = values.findIndex((r, i) => i > 0 && String(r[uuidCol] ?? "").trim() === p.lead_id);
  if (rowIdx < 0 && crmCol >= 0) {
    rowIdx = values.findIndex((r, i) => i > 0 && String(r[crmCol] ?? "").trim() === p.crm_lead_id);
  }
  const isNew = rowIdx < 0;
  if (isNew) {
    let last = 0;
    values.forEach((r, i) => {
      if (r.some((c) => String(c ?? "").trim() !== "")) last = i;
    });
    rowIdx = last + 1;
  }
  const existing = values[rowIdx] ?? [];
  const writes: CellWrite[] = [];
  const missingHeaders: string[] = [];
  const sheetRow = rowIdx + 1;

  for (const [h, v] of Object.entries(formOwnedValues(p))) {
    const c = idx(h);
    if (c < 0) { missingHeaders.push(h); continue; }
    writes.push({ col: c, row: sheetRow, value: String(v).slice(0, 5000) });
  }
  for (const [h, v] of Object.entries(setIfEmptyValues(p))) {
    const c = idx(h);
    if (c < 0) { missingHeaders.push(h); continue; }
    if (String(existing[c] ?? "").trim() === "" && v) writes.push({ col: c, row: sheetRow, value: v });
  }
  return { row: sheetRow, isNew, writes, missingHeaders };
}

/** A1 range for one cell, tab name safely quoted. */
export function cellRange(tab: string, w: CellWrite): string {
  return `'${tab.replace(/'/g, "''")}'!${colLetter(w.col)}${w.row}`;
}
