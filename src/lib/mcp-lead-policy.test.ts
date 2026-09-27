import { describe, expect, it } from "vitest";

// Mirrors the live `public.leads` INSERT policy "Anyone can insert a lead"
// (roles anon, authenticated) WITH CHECK clause, verified via pg_policies 2026-09-27.
const ALLOWED_STATUS = ["micro_commit", "goals", "preferences", "health", "review", "submitted"];
const ALLOWED_SOURCE = ["website", "website_paid_online_yoga", "mcp"];
type Row = { name: string; whatsapp: string; email: string | null; health_notes: string | null; status: string; source: string };
const passesPolicy = (r: Row) => {
  const n = r.name.trim().length, w = r.whatsapp.trim().length;
  return n >= 1 && n <= 120 && w >= 5 && w <= 40 &&
    (r.email === null || r.email.length <= 200) &&
    (r.health_notes === null || r.health_notes.length <= 1000) &&
    ALLOWED_STATUS.includes(r.status) && ALLOWED_SOURCE.includes(r.source);
};

describe("MCP consultation lead vs live anon insert policy", () => {
  const mcpRow: Row = { name: "Synthetic Test", whatsapp: "+84782046066", email: null, health_notes: null, status: "submitted", source: "mcp" };
  it("accepts a submitted mcp lead", () => expect(passesPolicy(mcpRow)).toBe(true));
  it("keeps validations", () => {
    expect(passesPolicy({ ...mcpRow, source: "evil" })).toBe(false);
    expect(passesPolicy({ ...mcpRow, whatsapp: "123" })).toBe(false);
    expect(passesPolicy({ ...mcpRow, health_notes: "x".repeat(1001) })).toBe(false);
  });
});
