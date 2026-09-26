import { describe, expect, it } from "vitest";
import { normalizePhone, waMeLink } from "./phone";
import { generateReply, safeGoals } from "./reply";
import { buildLeadPayload, type LeadRow } from "./payload";
import { formatTelegramAlert } from "./telegram-format";
import { planSheetUpsert, MANUAL_HEADERS, colLetter } from "./sheet-plan";
import { telegramOutcome, sheetOutcome } from "./outcomes";

const HEADER = [
  "CRM Lead ID","Name","Age","WhatsApp","WhatsApp Link","Email","Goals","Preferred Experience","Preferred Time",
  "Health Notes","Health Tags","Experience Level","Status","Source","Market","Timezone","Funnel","Landing First Touch",
  "Landing Page","UTM Source","First Touch At","Created At (UTC)","Updated At (UTC)","Session ID","Meta JSON",
  "Country/Region (inferred)","Record Type","Priority","Funnel Stage","Contact Status","Last Contact","Next Follow-up",
  "Owner","Notes","Duplicate Key","Source UUID","Lead Status","Demo Status","Next Action","Response Status",
  "Contacted Via","Country Code","Mobile Number","WhatsApp Full Number","Phone Original Input","Phone Validation",
];

function lead(over: Partial<LeadRow> = {}): LeadRow {
  return {
    id: "11111111-1111-4111-8111-111111111111",
    crm_lead_id: "YJ-WEB-0007",
    name: "Test Synthetic",
    whatsapp: "+12025550123",
    email: null,
    goals: ["Private 1-on-1 online yoga"],
    preferred_experience: "Private 1-on-1 online yoga",
    preferred_time: null,
    experience_level: "Beginner",
    status: "submitted",
    source: "website",
    session_id: null,
    meta: { timezone: "America/New_York", landing_page: "/private-online-yoga" },
    created_at: "2026-09-26T00:00:00Z",
    updated_at: "2026-09-26T00:00:00Z",
    health_present: false,
    ...over,
  };
}

describe("phone normalization", () => {
  it.each([
    ["+1 202 555 0123", "+1", false],
    ["+32465118574", "+32", true],
    ["+84782555589", "+84", true],
    ["+971589929878", "+971", true],
  ])("parses %s", (input, cc, mustBeValid) => {
    const r = normalizePhone(input);
    expect(r.country_code).toBe(cc);
    if (mustBeValid) {
      expect(r.phone_validation).toBe("valid");
      expect(r.whatsapp_full_number).toMatch(/^\+\d+$/);
      expect(r.mobile_number).toMatch(/^\d+$/);
    }
    expect(r.phone_original).toBe(input);
  });
  it("keeps 00 prefix as international", () => {
    expect(normalizePhone("0084782555589").whatsapp_full_number).toBe("+84782555589");
  });
  it("rejects invalid input with no link", () => {
    const r = normalizePhone("hello123");
    expect(r.phone_validation).toBe("needs_review");
    expect(r.whatsapp_full_number).toBeNull();
    expect(waMeLink(r.whatsapp_full_number)).toBeNull();
  });
  it("never guesses a country for an ambiguous national number", () => {
    const r = normalizePhone("0912345678");
    expect(r.phone_validation).toBe("needs_review");
    expect(r.reason).toBe("no_country_code_ambiguous");
    expect(r.country_code).toBeNull();
  });
  it("does not silently fix a trunk zero after +84", () => {
    const r = normalizePhone("+840505477892");
    expect(r.phone_validation).toBe("needs_review");
    expect(r.reason).toBe("trunk_zero_after_country_code");
    expect(r.whatsapp_full_number).toBeNull();
  });
});

describe("reply generator + privacy", () => {
  it("private beginner gets Master Anil assessment and asks timing + restrictions", () => {
    const r = generateReply({ name: "Asha K", preferred_experience: "Private 1-on-1 online yoga", funnel: null, source: "website",
      goals: [], preferred_time: null, timezone: "Asia/Dubai", experience_level: "Beginner", health_present: false });
    expect(r).toMatch(/Master Anil/);
    expect(r).toMatch(/Asia\/Dubai/);
    expect(r).toMatch(/pain, injury or physical restriction/);
    expect(r).not.toMatch(/\$|USD|price/i);
  });
  it("health present => care-first, no questionnaire, no conditions", () => {
    const r = generateReply({ name: "B", preferred_experience: "Private", funnel: null, source: null,
      goals: ["Back, neck or posture support", "Thyroid"], preferred_time: "Evening", timezone: null,
      experience_level: null, health_present: true });
    expect(r).toMatch(/health information/);
    expect(r).not.toMatch(/pain, injury/);
    expect(r).not.toMatch(/thyroid|back|neck/i);
    expect(r).not.toMatch(/cure|heal|treat/i);
    expect(r).toMatch(/evening/);
  });
  it("group reply makes no availability promise", () => {
    const r = generateReply({ name: "C", preferred_experience: "Live online group classes", funnel: "online_group_inline",
      source: "website", goals: [], preferred_time: "Morning", timezone: null, experience_level: null, health_present: false });
    expect(r).toMatch(/check the current class times/);
    expect(r).not.toMatch(/guarantee|spot is reserved|available now/i);
  });
  it("studio reply asks studio", () => {
    const r = generateReply({ name: "D", preferred_experience: "Studio classes", funnel: null, source: null, goals: [],
      preferred_time: null, timezone: null, experience_level: null, health_present: false });
    expect(r).toMatch(/Which studio/);
  });
  it("safeGoals drops sensitive goals", () => {
    expect(safeGoals(["Stress and sleep", "Back pain", "Live group classes"])).toEqual(["Live group classes"]);
  });
  it("telegram alert has exact fields and no health text", () => {
    const { payload, reply } = buildLeadPayload(lead({ health_present: true, goals: ["Thyroid support"] }));
    const m = formatTelegramAlert(payload, reply, "https://docs.google.com/x");
    for (const f of ["NEW YOG JIVAN LEAD","ID:","Name:","Country/Market + Timezone:","Country Code:","Mobile Number:",
      "WhatsApp Full Number:","Service:","Goals:","Experience:","Preferred time:","Source + landing page:","Priority:",
      "WhatsApp link:","Open CRM link:","Health information provided: Yes","Suggested First Reply:"]) {
      expect(m.text).toContain(f);
    }
    expect(m.text).not.toMatch(/thyroid/i);
    expect(m.text.length).toBeLessThan(4096);
    expect(m.reply_markup?.inline_keyboard[0].length).toBe(2);
  });
  it("payload never contains health note fields", () => {
    const { payload } = buildLeadPayload({ ...lead(), health_notes: "SECRET", health_tags: ["x"] } as never);
    expect(JSON.stringify(payload)).not.toContain("SECRET");
    expect(payload).not.toHaveProperty("health_notes");
  });
  it("bad phone => low priority, no reply link", () => {
    const { payload } = buildLeadPayload(lead({ name: "Dd", whatsapp: "12345" }));
    expect(payload.priority).toBe("Low");
    expect(payload.reply_link).toBeNull();
  });
});

describe("sheet upsert plan", () => {
  const { payload } = buildLeadPayload(lead());
  it("appends after last non-empty row and preserves extra rows", () => {
    const values = [HEADER, ["YJ-WEB-0001"], ["YJ-WEB-0002"], [], ["MANUAL-EXTRA"]];
    const plan = planSheetUpsert(values, payload);
    expect(plan.isNew).toBe(true);
    expect(plan.row).toBe(6);
    expect(plan.missingHeaders).toEqual([]);
  });
  it("updates matched row by UUID and never touches manual columns", () => {
    const row = HEADER.map(() => "");
    row[HEADER.indexOf("Source UUID")] = payload.lead_id;
    row[HEADER.indexOf("Owner")] = "Anil";
    row[HEADER.indexOf("Priority")] = "Hot";
    row[HEADER.indexOf("Lead Status")] = "Demo booked";
    const plan = planSheetUpsert([HEADER, ["other"], row], payload);
    expect(plan.isNew).toBe(false);
    expect(plan.row).toBe(3);
    const written = plan.writes.map((w) => HEADER[w.col]);
    for (const m of MANUAL_HEADERS) expect(written).not.toContain(m);
    expect(written).not.toContain("Priority");
    expect(written).not.toContain("Lead Status");
    expect(written).toContain("Name");
  });
  it("falls back to CRM ID match", () => {
    const row = HEADER.map(() => "");
    row[0] = payload.crm_lead_id;
    expect(planSheetUpsert([HEADER, row], payload).row).toBe(2);
  });
  it("formula-looking values are written as plain strings (RAW)", () => {
    const { payload: p } = buildLeadPayload(lead({ name: "=HYPERLINK(\"x\")" }));
    const plan = planSheetUpsert([HEADER], p);
    const nameW = plan.writes.find((w) => HEADER[w.col] === "Name");
    expect(typeof nameW?.value).toBe("string");
  });
  it("column letters", () => {
    expect(colLetter(0)).toBe("A");
    expect(colLetter(35)).toBe("AJ");
    expect(colLetter(45)).toBe("AT");
  });
});

describe("delivery outcomes", () => {
  it("telegram timeout => uncertain, never retried", () => {
    expect(telegramOutcome(null, "timeout", 1).kind).toBe("uncertain");
  });
  it("telegram 5xx => uncertain", () => {
    expect(telegramOutcome({ status: 502, body: null }, null, 1).kind).toBe("uncertain");
  });
  it("telegram 429 respects retry_after", () => {
    const o = telegramOutcome({ status: 429, body: { parameters: { retry_after: 17 } } }, null, 1);
    expect(o).toMatchObject({ kind: "retry", afterSeconds: 17 });
  });
  it("telegram 400 => failed", () => {
    expect(telegramOutcome({ status: 400, body: { description: "chat not found" } }, null, 1).kind).toBe("failed");
  });
  it("sheets transient retries, definite 4xx fails, gives up at max", () => {
    expect(sheetOutcome(503, "x", 1).kind).toBe("retry");
    expect(sheetOutcome(null, "net", 1).kind).toBe("retry");
    expect(sheetOutcome(403, "x", 1).kind).toBe("failed");
    expect(sheetOutcome(503, "x", 5).kind).toBe("failed");
  });
});
