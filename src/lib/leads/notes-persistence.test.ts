import { beforeEach, describe, expect, it, vi } from "vitest";
import { finalLeadSchema } from "./intake";
import { acceptLead } from "./intake.server";

const storage = vi.hoisted(() => ({ rows: [] as Record<string, unknown>[], rpc: vi.fn() }));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: {
  from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { fingerprint_key: "isolated-test-only" } }) }) }) }),
  rpc: storage.rpc,
} }));

beforeEach(() => {
  storage.rows.length = 0;
  storage.rpc.mockReset().mockImplementation(async (name, args) => {
    if (name !== "submit_lead_guarded") throw new Error("Unexpected RPC");
    // Isolated persistence substitute at the existing guarded database boundary.
    storage.rows.push(structuredClone(args.p_lead));
    return { data: { outcome: "accepted" }, error: null };
  });
});

describe("guarded notes persistence", () => {
  it.each(["shared_notes", "organizer_notes"])("passes complete %s to leads.meta without public echo", async (key) => {
    const note = `  ${"ế".repeat(key === "shared_notes" ? 296 : 396)}  `;
    const input = finalLeadSchema.parse({ name: "Test Adult", whatsapp: "+84782046066", source: "website", meta: { [key]: note } });
    const result = await acceptLead(input, { ip: null, source: "website" }, { requireTurnstile: false });
    expect(storage.rows).toHaveLength(1);
    expect(storage.rows[0].meta).toEqual({ [key]: note });
    expect(storage.rows[0].source).toBe("website");
    expect(storage.rows[0].health_notes).toBeNull();
    expect(result).toEqual({ status: 200, body: { ok: true, outcome: "accepted" } });
    expect(JSON.stringify(result)).not.toContain(note);
  });

  it.each([400, 401])("organizer notes server boundary %i", (size) => {
    expect(finalLeadSchema.safeParse({ name: "Adult", whatsapp: "+84782046066", source: "website", meta: { organizer_notes: "x".repeat(size) } }).success).toBe(size === 400);
  });

  it("counts decomposed Vietnamese and surrogate pairs as UTF-16, without normalizing or truncating", () => {
    const base = { name: "Adult", whatsapp: "+84782046066", source: "website" };
    const note = "ế".normalize("NFD").repeat(100);
    expect(note.length).toBe(300);
    expect(finalLeadSchema.parse({ ...base, meta: { shared_notes: note } }).meta?.shared_notes).toBe(note);
    expect(finalLeadSchema.safeParse({ ...base, meta: { shared_notes: note + "a" } }).success).toBe(false);
    expect(finalLeadSchema.safeParse({ ...base, meta: { shared_notes: "😀".repeat(150) } }).success).toBe(true);
    expect(finalLeadSchema.safeParse({ ...base, meta: { shared_notes: "😀".repeat(151) } }).success).toBe(false);
  });
});