import { describe, it, expect } from "vitest";
import { buildAiInput, parseAiResult, fitFor } from "./ai-score";
import { buildLeadPayload } from "./payload";

const lead = (o = {}) => ({ id: "u1", crm_lead_id: "YJ-WEB-0100", name: "Priya Shah", whatsapp: "+84782046066", email: "p@example.com",
  goals: ["Back pain", "Flexibility"], preferred_experience: "Private 1-on-1 online", preferred_time: "Mornings", experience_level: "Beginner",
  status: "submitted", source: "website", session_id: null, meta: {}, created_at: "2026-11-18T00:00:00Z", updated_at: "2026-11-18T00:00:00Z", health_present: true, ...o });

describe("AI lead scoring", () => {
  it("never sends name, phone, email or health-sensitive goals to AI", () => {
    const { payload } = buildLeadPayload({ ...lead(), health_notes: "SECRET" } as never);
    const s = JSON.stringify(buildAiInput(payload));
    for (const bad of ["Priya", "782046066", "p@example.com", "SECRET", "Back pain"]) expect(s).not.toContain(bad);
    expect(s).toContain("Flexibility");
  });
  it("clamps score and maps fit bands", () => {
    expect(parseAiResult({ score: 140, summary: "x", worth_call: true, reason: "r" }, "m", true)?.score).toBe(100);
    expect(fitFor(75)).toBe("High"); expect(fitFor(50)).toBe("Medium"); expect(fitFor(49)).toBe("Low");
  });
  it("never flags a call when the phone is invalid", () => {
    expect(parseAiResult({ score: 90, summary: "x", worth_call: true, reason: "r" }, "m", false)?.worth_call).toBe(false);
  });
  it("rejects malformed AI output", () => {
    expect(parseAiResult({ score: "high" }, "m", true)).toBeNull();
  });
});
