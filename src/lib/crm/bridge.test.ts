import { readFileSync } from "fs";
import { describe, expect, it, vi } from "vitest";
import { handleCrmControl } from "./bridge";

const SECRET = "test-secret-not-real-000000000000";
const auth = `Bearer ${SECRET}`;
const body = (o: Record<string, unknown> = {}) => ({
  crm_lead_id: "YJ-WEB-0007", action: "Contacted", telegram_user_id: "12345",
  telegram_chat_id: "-5539834750", request_id: "req-00000001", ...o,
});

// Fake DB mirroring crm_apply_action semantics.
function fakeDb() {
  const leads = [{ id: "343ee5d0-3d98-4b63-a938-5968ccdaabb0", crm_lead_id: "YJ-WEB-0007", crm_status: null as string | null, updated_at: "t0", phone: "+84", health_notes: "secret" }];
  const events = new Map<string, any>();
  const rpc = vi.fn(async (a: any) => {
    const prev = events.get(a.p_request_id);
    const l = leads.find((x) => x.crm_lead_id === (prev?.crm ?? a.p_crm_lead_id));
    if (prev) return { data: { outcome: "duplicate", crm_lead_id: l!.crm_lead_id, source_uuid: l!.id, status: l!.crm_status, updated_at: l!.updated_at }, error: null };
    if (!l) return { data: { outcome: "not_found" }, error: null };
    if (a.p_action !== "Add Note") l.crm_status = a.p_action;
    l.updated_at = `t${events.size + 1}`;
    events.set(a.p_request_id, { crm: l.crm_lead_id, note: a.p_note });
    return { data: { outcome: "updated", crm_lead_id: l.crm_lead_id, source_uuid: l.id, status: l.crm_status, updated_at: l.updated_at }, error: null };
  });
  return { leads, events, rpc };
}

describe("n8n CRM bridge", () => {
  it("disabled when secret is not configured", async () => {
    const db = fakeDb();
    const r = await handleCrmControl({ authorization: auth, body: body() }, { secret: undefined, rpc: db.rpc });
    expect(r.status).toBe(503);
    expect(db.rpc).not.toHaveBeenCalled();
  });

  it("rejects unauthorized requests", async () => {
    const db = fakeDb();
    for (const a of [null, "Bearer wrong", SECRET]) {
      const r = await handleCrmControl({ authorization: a, body: body() }, { secret: SECRET, rpc: db.rpc });
      expect(r.status).toBe(401);
    }
    expect(db.rpc).not.toHaveBeenCalled();
  });

  it("rejects invalid action / fields", async () => {
    const db = fakeDb();
    for (const b of [body({ action: "Delete" }), body({ crm_lead_id: "x" }), body({ request_id: "" }), body({ action: "Add Note" })]) {
      const r = await handleCrmControl({ authorization: auth, body: b }, { secret: SECRET, rpc: db.rpc });
      expect(r.status).toBe(400);
    }
    expect(db.rpc).not.toHaveBeenCalled();
  });

  it("returns 404 for unknown crm_lead_id", async () => {
    const db = fakeDb();
    const r = await handleCrmControl({ authorization: auth, body: body({ crm_lead_id: "YJ-WEB-9999" }) }, { secret: SECRET, rpc: db.rpc });
    expect(r.status).toBe(404);
  });

  it("valid status update returns only safe fields", async () => {
    const db = fakeDb();
    const r = await handleCrmControl({ authorization: auth, body: body() }, { secret: SECRET, rpc: db.rpc });
    expect(r.status).toBe(200);
    expect(r.body).toMatchObject({ ok: true, duplicate: false, crm_lead_id: "YJ-WEB-0007", source_uuid: db.leads[0].id, status: "Contacted" });
    const s = JSON.stringify(r.body);
    for (const bad of ["health", "phone", "email", SECRET, "+84"]) expect(s).not.toContain(bad);
  });

  it("duplicate request_id is idempotent", async () => {
    const db = fakeDb();
    await handleCrmControl({ authorization: auth, body: body() }, { secret: SECRET, rpc: db.rpc });
    const r = await handleCrmControl({ authorization: auth, body: body({ action: "Lost" }) }, { secret: SECRET, rpc: db.rpc });
    expect(r.body).toMatchObject({ duplicate: true, status: "Contacted" });
    expect(db.events.size).toBe(1);
  });

  it("Add Note keeps status and records note", async () => {
    const db = fakeDb();
    await handleCrmControl({ authorization: auth, body: body() }, { secret: SECRET, rpc: db.rpc });
    const r = await handleCrmControl({ authorization: auth, body: body({ action: "Add Note", note: "Call back", request_id: "req-00000002" }) }, { secret: SECRET, rpc: db.rpc });
    expect(r.body).toMatchObject({ ok: true, status: "Contacted" });
    expect(db.events.get("req-00000002").note).toBe("Call back");
  });

  it("accepts Archive Lead / Restore Lead and keeps response shape", async () => {
    const db = fakeDb();
    for (const [action, rid] of [["Archive Lead", "req-a0000001"], ["Restore Lead", "req-a0000002"]]) {
      const r = await handleCrmControl({ authorization: auth, body: body({ action, note: "dup", request_id: rid }) }, { secret: SECRET, rpc: db.rpc });
      expect(r.status).toBe(200);
      expect(r.body).toMatchObject({ ok: true, duplicate: false, crm_lead_id: "YJ-WEB-0007", source_uuid: db.leads[0].id });
    }
    const sql = readFileSync("drizzle/migrations/" + require("fs").readdirSync("drizzle/migrations").find((f: string) => f.includes("crm_archive_restore")), "utf8");
    expect(sql).toMatch(/'Archived: '/);
    expect(sql).toMatch(/'Lead Restored'/);
    expect(sql).not.toMatch(/DELETE\s+FROM\s+leads|SET\s+status\s*=/i);
  });

  it("hides raw DB errors", async () => {
    const r = await handleCrmControl({ authorization: auth, body: body() }, { secret: SECRET, rpc: async () => ({ data: null, error: { message: "permission denied for leads" } }) });
    expect(r).toEqual({ status: 500, body: { ok: false, error: "Update failed" } });
  });

  it("does not touch lead ingestion or outbox code/SQL", () => {
    const sql = readFileSync("drizzle/migrations/0004_n8n_crm_bridge.sql", "utf8");
    expect(sql).not.toMatch(/lead_outbox|submit_lead_guarded|leads_enqueue_outbox|leads_before_insert_guard|DROP /i);
    // Only crm_* columns are updated, never leads.status (outbox trigger fires only on status -> 'submitted').
    expect(sql).not.toMatch(/SET\s+status\s*=/i);
    const src = readFileSync("src/lib/crm/bridge.ts", "utf8");
    expect(src).not.toMatch(/lead_outbox|dispatch|telegram\.org|sheets/i);
  });
});
