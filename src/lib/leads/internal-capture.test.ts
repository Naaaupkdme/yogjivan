import { describe, expect, it, vi } from "vitest";
import { handleInternalCapture, internalCaptureSchema } from "./internal-capture";

describe("Direct-WhatsApp Lead Capture — authenticated internal intake", () => {
  const SECRET = "test-internal-token-secret-123456789";

  const validBody = {
    name: "Priya Sharma",
    whatsapp: "+84 782 046 066",
    email: "priya@example.com",
    service: "Private 1-on-1 online yoga",
    plan_sessions: "20-Session Plan",
    preferred_language: "English",
    preferred_time: "Morning (7:00 AM)",
    country: "VN",
    timezone: "Asia/Ho_Chi_Minh",
    stage: "New enquiry" as const,
    notes: "Direct WhatsApp enquiry about personal posture refinement",
    next_follow_up: "2026-11-04T09:00:00Z",
    original_ref: "YJ-WA-ABCD1234",
    idempotency_key: "idem-lead-capture-001",
  };

  it("rejects unauthorized calls when token is missing or incorrect", async () => {
    const mockAcceptLead = vi.fn();

    const noAuth = await handleInternalCapture(
      { authorization: null, body: validBody },
      { secret: SECRET, acceptLead: mockAcceptLead }
    );
    expect(noAuth.status).toBe(401);
    expect(noAuth.body.ok).toBe(false);

    const wrongAuth = await handleInternalCapture(
      { authorization: "Bearer invalid-token", body: validBody },
      { secret: SECRET, acceptLead: mockAcceptLead }
    );
    expect(wrongAuth.status).toBe(401);
    expect(mockAcceptLead).not.toHaveBeenCalled();
  });

  it("returns 503 when internal secret is unset", async () => {
    const mockAcceptLead = vi.fn();
    const res = await handleInternalCapture(
      { authorization: `Bearer ${SECRET}`, body: validBody },
      { secret: undefined, acceptLead: mockAcceptLead }
    );
    expect(res.status).toBe(503);
    expect(mockAcceptLead).not.toHaveBeenCalled();
  });

  it("validates and formats lead payload, preserving source: 'website' check constraint", async () => {
    let capturedPayload: any = null;
    const mockAcceptLead = vi.fn().mockImplementation(async (payload) => {
      capturedPayload = payload;
      return { status: 200, body: { ok: true, outcome: "accepted", lead_id: "test-uuid-999" } };
    });

    const res = await handleInternalCapture(
      { authorization: `Bearer ${SECRET}`, body: validBody },
      { secret: SECRET, acceptLead: mockAcceptLead }
    );

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.outcome).toBe("accepted");
    expect(res.body.lead_id).toBe("test-uuid-999");

    expect(capturedPayload).not.toBeNull();
    // Preserves DB constraint
    expect(capturedPayload.source).toBe("website");
    // Normalizes phone
    expect(capturedPayload.whatsapp).toBe("+84782046066");
    // Formats preferred experience
    expect(capturedPayload.preferred_experience).toBe(
      "Private 1-on-1 online yoga (20-Session Plan · Language: English)"
    );
    // Preserves metadata
    expect(capturedPayload.meta.channel).toBe("whatsapp_direct");
    expect(capturedPayload.meta.funnel).toBe("direct_whatsapp_capture");
    expect(capturedPayload.meta.plan_sessions).toBe("20-Session Plan");
    expect(capturedPayload.meta.preferred_language).toBe("English");
    expect(capturedPayload.meta.original_ref).toBe("YJ-WA-ABCD1234");
    expect(capturedPayload.meta.stage).toBe("New enquiry");
    expect(capturedPayload.health_notes).toBeNull();
  });

  it("handles duplicate retries gracefully via idempotency outcome", async () => {
    const mockAcceptLead = vi.fn().mockResolvedValue({
      status: 200,
      body: { ok: true, outcome: "duplicate", lead_id: "existing-uuid-111" },
    });

    const res = await handleInternalCapture(
      { authorization: `Bearer ${SECRET}`, body: validBody },
      { secret: SECRET, acceptLead: mockAcceptLead }
    );

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.duplicate).toBe(true);
    expect(res.body.lead_id).toBe("existing-uuid-111");
  });

  it("rejects invalid plan or language options", async () => {
    const mockAcceptLead = vi.fn();

    const badPlan = { ...validBody, plan_sessions: "99-Session Hacker Plan" };
    const resBadPlan = await handleInternalCapture(
      { authorization: `Bearer ${SECRET}`, body: badPlan },
      { secret: SECRET, acceptLead: mockAcceptLead }
    );
    expect(resBadPlan.status).toBe(400);

    const badLang = { ...validBody, preferred_language: "Latin" };
    const resBadLang = await handleInternalCapture(
      { authorization: `Bearer ${SECRET}`, body: badLang },
      { secret: SECRET, acceptLead: mockAcceptLead }
    );
    expect(resBadLang.status).toBe(400);
    expect(mockAcceptLead).not.toHaveBeenCalled();
  });
});
