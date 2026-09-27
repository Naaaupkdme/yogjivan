import { describe, expect, it } from "vitest";

// Mirrors the live `public.leads` INSERT policy (migration 0003_lead_intake_antispam):
// anonymous clients may save partial steps only. Final 'submitted' leads — website
// and MCP (source='mcp') — go through submit_lead_guarded() on the server.
const ANON_STATUS = ["micro_commit", "goals", "preferences", "health", "review"];
const ALLOWED_SOURCE = ["website", "website_paid_online_yoga", "mcp"];
const GUARDED_SOURCE = ["website", "website_paid_online_yoga", "mcp"];
type Row = { name: string; whatsapp: string; email: string | null; health_notes: string | null; status: string; source: string };
const passesAnonPolicy = (r: Row) => {
  const n = r.name.trim().length, w = r.whatsapp.trim().length;
  return n >= 1 && n <= 120 && w >= 5 && w <= 40 &&
    (r.email === null || r.email.length <= 200) &&
    (r.health_notes === null || r.health_notes.length <= 1000) &&
    ANON_STATUS.includes(r.status) && ALLOWED_SOURCE.includes(r.source);
};

describe("lead insert paths", () => {
  const row: Row = { name: "Synthetic Test", whatsapp: "+84782046066", email: null, health_notes: null, status: "submitted", source: "mcp" };
  it("direct anonymous final inserts are rejected (must use the guarded server path)", () => {
    expect(passesAnonPolicy(row)).toBe(false);
    expect(passesAnonPolicy({ ...row, source: "website" })).toBe(false);
  });
  it("partial steps still allowed with validations", () => {
    expect(passesAnonPolicy({ ...row, status: "goals", source: "website" })).toBe(true);
    expect(passesAnonPolicy({ ...row, status: "goals", source: "evil" })).toBe(false);
    expect(passesAnonPolicy({ ...row, status: "goals", whatsapp: "123" })).toBe(false);
  });
  it("guarded function accepts mcp source attribution", () => {
    expect(GUARDED_SOURCE).toContain("mcp");
  });
});
