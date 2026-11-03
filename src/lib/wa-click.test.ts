import { describe, expect, it } from "vitest";
import { clickRowFromForm, isNonHumanRequest, newWaRef, waDestination, WA_REF_RE } from "./wa-click";

describe("/go/whatsapp helpers", () => {
  it("refs are unique and well formed", () => {
    const set = new Set(Array.from({ length: 500 }, () => newWaRef()));
    expect(set.size).toBe(500);
    for (const r of set) expect(r).toMatch(WA_REF_RE);
  });
  it("destination is always the business number with clean prefill (no open redirect)", () => {
    const u = new URL(waDestination("private", null));
    expect(u.host).toBe("wa.me");
    expect(u.pathname).toBe("/84782046066");
    expect(u.searchParams.get("text")).toBe("Hi Yog Jivan team, I'd like to enquire about private 1-on-1 online yoga sessions.");
    expect(u.searchParams.get("text")).not.toMatch(/Ref:/);
  });
  it("never appends visible ref suffix to customer prefill even when ref is stored", () => {
    const ref = newWaRef();
    const u = new URL(waDestination("group", ref));
    expect(u.searchParams.get("text")).toBe(
      "Hi Yog Jivan team, I'd like to join your live online yoga classes and start with the introductory session."
    );
    expect(u.searchParams.get("text")).not.toContain("Ref:");
    expect(u.searchParams.get("text")).not.toContain(ref);

    const uEvil = new URL(waDestination("general", "evil-injection"));
    expect(uEvil.searchParams.get("text")).toBe("Hi Yog Jivan team, I have a question about your yoga classes.");
    expect(uEvil.searchParams.get("text")).not.toContain("evil");
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
