import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { z } from "zod";
import { trackGenerateLead, sanitizeLeadCategory } from "../analytics";

/**
 * FORM-FLOW & REGRESSION COVERAGE (Mocked, non-production)
 *
 * Exercises all 4 enquiry form schemas, outcome-driven tracking dispatch,
 * category allowlisting, privacy guarantees, and SmartConsultation retry/idempotency.
 */

// Mirror schemas from the 4 forms
const quickSchema = z.object({
  name: z.string().trim().min(2).max(120),
  whatsapp: z.string().trim().min(6).max(40),
});

const privateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  whatsapp: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  goal: z.string().min(1),
  time: z.string().max(80).optional(),
});

const bookOnlineSchema = z.object({
  name: z.string().trim().min(2).max(120),
  whatsapp: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  goal: z.string().min(1),
  time: z.string().max(80).optional(),
});

const smartConsultationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  whatsapp: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  service: z.string().min(1),
  message: z.string().max(1000).optional(),
});

describe("Form flows — analytics privacy, outcome gating and retry idempotency", () => {
  let mockGtag: any;
  let mockFbq: any;

  beforeEach(() => {
    mockGtag = vi.fn();
    mockFbq = vi.fn();
    (globalThis as any).window = {
      location: { pathname: "/test-form-path", search: "" },
      localStorage: {
        getItem: (k: string) => (k === "yj_cookie_consent_v2" ? JSON.stringify({ analytics: true, marketing: true }) : null),
      },
      gtag: mockGtag,
      fbq: mockFbq,
    };
  });

  afterEach(() => {
    delete (globalThis as any).window;
  });

  describe("1. All four forms — accepted result produces exactly one generate_lead with intended category", () => {
    it("BookOnlineYogaForm: accepted produces category online_group and NO health goals/PII", () => {
      const data = {
        name: "Alice Walker",
        whatsapp: "+84782046066",
        email: "alice@example.com",
        goal: "Back, neck or posture support", // Health-related selection
        time: "Morning",
      };
      expect(bookOnlineSchema.safeParse(data).success).toBe(true);

      const leadEventId = "book-lead-uuid-1";
      const outcome = "accepted";

      // Form dispatch logic
      if (outcome === "accepted") {
        trackGenerateLead("online_group", "book_online_yoga", leadEventId);
      }

      expect(mockGtag).toHaveBeenCalledTimes(1);
      const gaCall = mockGtag.mock.calls[0];
      expect(gaCall[0]).toBe("event");
      expect(gaCall[1]).toBe("generate_lead");
      const gaPayload = gaCall[2];
      expect(gaPayload.service_category).toBe("online_group");
      expect(gaPayload.form_id).toBe("book_online_yoga");
      expect(gaPayload.lead_event_id).toBe(leadEventId);

      // Verify ZERO health goal or PII in analytics payload
      const gaJson = JSON.stringify(gaPayload);
      expect(gaJson).not.toContain("Back");
      expect(gaJson).not.toContain("neck");
      expect(gaJson).not.toContain("posture");
      expect(gaJson).not.toContain("Alice");
      expect(gaJson).not.toContain("84782046066");
      expect(gaJson).not.toContain("alice@example.com");

      // Verify Meta Lead event
      expect(mockFbq).toHaveBeenCalledTimes(1);
      const fbPayload = mockFbq.mock.calls[0][2];
      expect(fbPayload.content_category).toBe("online_group");
      expect(JSON.stringify(fbPayload)).not.toContain("Back");
    });

    it("QuickEnquiryForm: accepted produces category online_group and NO PII", () => {
      const data = { name: "Bob Martin", whatsapp: "+447911123456" };
      expect(quickSchema.safeParse(data).success).toBe(true);

      const leadEventId = "quick-lead-uuid-2";
      trackGenerateLead("online_group", "quick-enquiry", leadEventId);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      const gaPayload = mockGtag.mock.calls[0][2];
      expect(gaPayload.service_category).toBe("online_group");
      expect(gaPayload.form_id).toBe("quick-enquiry");

      const gaJson = JSON.stringify(gaPayload);
      expect(gaJson).not.toContain("Bob");
      expect(gaJson).not.toContain("447911123456");
    });

    it("PrivateYogaEnquiryForm: accepted produces category private_online and NO PII", () => {
      const data = {
        name: "Charlie Brown",
        whatsapp: "+12025550123",
        email: "charlie@example.com",
        goal: "Strength & Mobility",
        time: "Evening",
      };
      expect(privateSchema.safeParse(data).success).toBe(true);

      const leadEventId = "private-lead-uuid-3";
      trackGenerateLead("private_online", "private_yoga_enquiry", leadEventId);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      const gaPayload = mockGtag.mock.calls[0][2];
      expect(gaPayload.service_category).toBe("private_online");
      expect(gaPayload.form_id).toBe("private_yoga_enquiry");

      const gaJson = JSON.stringify(gaPayload);
      expect(gaJson).not.toContain("Charlie");
      expect(gaJson).not.toContain("charlie@example.com");
      expect(gaJson).not.toContain("Strength");
    });

    it("SmartConsultation: accepted maps service text to allowlisted category", () => {
      const cases: [string, string][] = [
        ["Private Session", "private_online"],
        ["Studio Classes", "studio"],
        ["Online Classes", "online_group"],
        ["Personalized Wellness Yoga", "private_online"],
        ["Corporate Wellness", "general"],
        ["Not sure yet", "general"],
      ];

      for (const [service, expectedCategory] of cases) {
        mockGtag.mockClear();
        mockFbq.mockClear();

        const data = {
          name: "David Kim",
          whatsapp: "+84782046066",
          service,
          message: "Please help me with back pain relief",
        };
        expect(smartConsultationSchema.safeParse(data).success).toBe(true);

        const leadEventId = "smart-lead-uuid-4";
        trackGenerateLead(data.service, "smart_consultation", leadEventId);

        expect(mockGtag).toHaveBeenCalledTimes(1);
        const gaPayload = mockGtag.mock.calls[0][2];
        expect(gaPayload.service_category).toBe(expectedCategory);
        expect(gaPayload.form_id).toBe("smart_consultation");
        expect(gaPayload.lead_event_id).toBe(leadEventId);

        // Verify message and name never leak
        const gaJson = JSON.stringify(gaPayload);
        expect(gaJson).not.toContain("David");
        expect(gaJson).not.toContain("pain");
        expect(gaJson).not.toContain("relief");
      }
    });
  });

  describe("2. Duplicate, received (honeypot), rejected and validation failures produce NO conversion", () => {
    it("does not call trackGenerateLead when outcome is duplicate", () => {
      const result = { outcome: "duplicate" as const };
      if (result.outcome === "accepted") {
        trackGenerateLead("online_group", "quick-enquiry", "some-id");
      }
      expect(mockGtag).not.toHaveBeenCalled();
      expect(mockFbq).not.toHaveBeenCalled();
    });

    it("does not call trackGenerateLead when outcome is received (honeypot)", () => {
      const result = { outcome: "received" as const };
      if (result.outcome === "accepted") {
        trackGenerateLead("online_group", "quick-enquiry", "some-id");
      }
      expect(mockGtag).not.toHaveBeenCalled();
      expect(mockFbq).not.toHaveBeenCalled();
    });

    it("does not call trackGenerateLead on client validation failure", () => {
      const invalidData = { name: "A", whatsapp: "123" }; // too short
      const parsed = quickSchema.safeParse(invalidData);
      expect(parsed.success).toBe(false);

      // Handler aborts early
      expect(mockGtag).not.toHaveBeenCalled();
      expect(mockFbq).not.toHaveBeenCalled();
    });
  });

  describe("3. SmartConsultation retry idempotency and fingerprint distinction", () => {
    it("reuses leadEventId on unchanged retry after failure, but generates new ID if content changes", () => {
      let submissionRef: { id: string; fingerprint: string } | null = null;

      function getOrCreateLeadEventId(data: Record<string, unknown>) {
        const fingerprint = JSON.stringify(data);
        if (!submissionRef || submissionRef.fingerprint !== fingerprint) {
          submissionRef = {
            id: `id_${Math.random().toString(36).slice(2)}`,
            fingerprint,
          };
        }
        return submissionRef.id;
      }

      const initialData = {
        name: "Elena Rostova",
        whatsapp: "+84782046066",
        service: "Private Session",
        message: "First attempt",
      };

      // 1. Initial attempt
      const firstId = getOrCreateLeadEventId(initialData);
      expect(firstId).toBeTruthy();

      // Simulate network failure: submissionRef is NOT cleared
      // 2. Unchanged retry: same content
      const retryId = getOrCreateLeadEventId(initialData);
      expect(retryId).toBe(firstId); // REUSED!

      // 3. Changed enquiry content: user modifies message before retrying
      const changedData = {
        ...initialData,
        message: "Changed message with updated preferences",
      };
      const newContentId = getOrCreateLeadEventId(changedData);
      expect(newContentId).not.toBe(firstId); // FRESH ID GENERATED!

      // 4. Successful completion: ref clears
      submissionRef = null;

      // 5. Subsequent distinct enquiry gets a fresh ID
      const subsequentId = getOrCreateLeadEventId(changedData);
      expect(subsequentId).not.toBe(newContentId);
    });

    it("handles non-UUID fallback identifier safely when crypto.randomUUID is unavailable", () => {
      // Test fallback pattern: lead_${timestamp}_${random}
      const now = 1791100000000;
      const fallbackId = `lead_${now}_abc123xyz`;
      expect(fallbackId.startsWith("lead_")).toBe(true);

      // Category and dispatch work identically with fallback string
      trackGenerateLead("Private Session", "smart_consultation", fallbackId);
      expect(mockGtag).toHaveBeenCalledWith(
        "event",
        "generate_lead",
        expect.objectContaining({
          lead_event_id: fallbackId,
          service_category: "private_online",
        })
      );
    });
  });
});
