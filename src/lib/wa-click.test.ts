import { describe, expect, it } from "vitest";
import { clickRowFromForm, isNonHumanRequest, newWaRef, waDestination, WA_REF_RE } from "./wa-click";

describe("/go/whatsapp helpers", () => {
  it("refs are unique and well formed", () => {
    const set = new Set(Array.from({ length: 500 }, () => newWaRef()));
    expect(set.size).toBe(500);
    for (const r of set) expect(r).toMatch(WA_REF_RE);
  });
  it("destination is always the business number (no open redirect)", () => {
    const u = new URL(waDestination("private", null));
    expect(u.host).toBe("wa.me");
    expect(u.pathname).toBe("/84782046066");
    expect(u.searchParams.get("text")).not.toMatch(/Ref:/);
  });
  it("appends ref only when stored", () => {
    const ref = newWaRef();
    expect(new URL(waDestination("group", ref)).searchParams.get("text")).toContain(`(Ref: ${ref})`);
    expect(new URL(waDestination("group", "evil")).searchParams.get("text")).not.toContain("evil");
  });
  it("drops session/attribution without consent", () => {
    const f = new FormData();
    f.set("i", "group"); f.set("consent", "denied"); f.set("sid", "11111111-1111-4111-8111-111111111111");
    f.set("utm_source", "google");
    const row = clickRowFromForm(f, "YJ-WA-AAAAAAAA") as Record<string, unknown>;
    expect(row.session_id).toBeUndefined();
    expect(row.utm_source).toBeUndefined();
    expect(row.consent).toBe("denied");
  });
  it("keeps attribution with consent; rejects non-uuid session and bad intent", () => {
    const f = new FormData();
    f.set("i", "../../evil"); f.set("consent", "accepted"); f.set("sid", "not-a-uuid"); f.set("utm_source", "google");
    const row = clickRowFromForm(f, "YJ-WA-AAAAAAAA") as Record<string, unknown>;
    expect(row.intent).toBe("general");
    expect(row.session_id).toBeNull();
    expect(row.utm_source).toBe("google");
  });
  it("prefetch and bots are not recorded", () => {
    expect(isNonHumanRequest(new Headers({ "sec-purpose": "prefetch" }))).toBe(true);
    expect(isNonHumanRequest(new Headers({ "user-agent": "Googlebot/2.1" }))).toBe(true);
    expect(isNonHumanRequest(new Headers({ "user-agent": "Mozilla/5.0 (iPhone) Safari" }))).toBe(false);
  });
});
