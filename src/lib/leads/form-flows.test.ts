import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  createLeadSubmissionCoordinator,
  generateEventId,
  getTimezone,
} from "./form-submission";
import { submitLead, type SubmitPayload } from "@/lib/leads";

vi.mock("@/lib/leads", async () => {
  const actual = await vi.importActual<typeof import("@/lib/leads")>("@/lib/leads");
  return {
    ...actual,
    submitLead: vi.fn(),
  };
});

describe("Form flows — production submission coordinator, outcome gating, mutex & retry idempotency", () => {
  let mockGtag: any;
  let mockFbq: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGtag = vi.fn();
    mockFbq = vi.fn();
    (globalThis as any).window = {
      location: { pathname: "/test-form-path", search: "" },
      localStorage: {
        getItem: (k: string) =>
          k === "yj_cookie_consent_v2"
            ? JSON.stringify({ analytics: true, marketing: true })
            : null,
      },
      gtag: mockGtag,
      fbq: mockFbq,
    };
  });

  afterEach(() => {
    delete (globalThis as any).window;
  });

  describe("1. All four production form dispatches — accepted outcome triggers trackGenerateLead with exact category & Zero PII", () => {
    it("BookOnlineYogaForm: accepted outcome triggers category online_group and NO health goals/PII", async () => {
      const coordinator = createLeadSubmissionCoordinator();
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "accepted",
      });

      const formData = {
        name: "Alice Walker",
        whatsapp: "+84782046066",
        email: "alice@example.com",
        goal: "Back, neck or posture support",
        time: "Morning",
      };

      let successCalled = false;
      let capturedPayload: SubmitPayload | null = null;

      const success = await coordinator.submit({
        data: formData,
        formId: "book_online_yoga",
        category: "online_group",
        buildPayload: (data, leadEventId) => {
          capturedPayload = {
            name: data.name,
            whatsapp: data.whatsapp,
            email: data.email || undefined,
            preferred_experience: data.goal,
            preferred_time: data.time || undefined,
            goals: [data.goal],
            status: "submitted",
            source: "website_paid_online_yoga",
            meta: {
              funnel: "online_yoga_paid_landing",
              landing_page: "/book-online-yoga",
              lead_event_id: leadEventId,
            },
          };
          return capturedPayload;
        },
        onSuccess: () => {
          successCalled = true;
        },
      });

      expect(success).toBe(true);
      expect(successCalled).toBe(true);
      expect(submitLead).toHaveBeenCalledTimes(1);

      const leadEventId = (capturedPayload as any)?.meta?.lead_event_id;
      expect(leadEventId).toBeTruthy();

      // Check GA4 generate_lead dispatch
      expect(mockGtag).toHaveBeenCalledTimes(1);
      const gaCall = mockGtag.mock.calls[0];
      expect(gaCall[0]).toBe("event");
      expect(gaCall[1]).toBe("generate_lead");
      const gaPayload = gaCall[2];
      expect(gaPayload.service_category).toBe("online_group");
      expect(gaPayload.form_id).toBe("book_online_yoga");
      expect(gaPayload.lead_event_id).toBe(leadEventId);

      // Verify ZERO health goal or PII in GA payload
      const gaJson = JSON.stringify(gaPayload);
      expect(gaJson).not.toContain("Back");
      expect(gaJson).not.toContain("neck");
      expect(gaJson).not.toContain("posture");
      expect(gaJson).not.toContain("Alice");
      expect(gaJson).not.toContain("84782046066");
      expect(gaJson).not.toContain("alice@example.com");

      // Check Meta Lead dispatch
      expect(mockFbq).toHaveBeenCalledTimes(1);
      const fbCall = mockFbq.mock.calls[0];
      expect(fbCall[0]).toBe("track");
      expect(fbCall[1]).toBe("Lead");
      expect(fbCall[2].content_category).toBe("online_group");
      expect(fbCall[3]).toEqual({ eventID: leadEventId });
      expect(JSON.stringify(fbCall[2])).not.toContain("Back");
    });

    it("QuickEnquiryForm: accepted outcome triggers category online_group and NO PII", async () => {
      const coordinator = createLeadSubmissionCoordinator();
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "accepted",
      });

      const formData = { name: "Bob Martin", whatsapp: "+447911123456" };
      let successCalled = false;

      const success = await coordinator.submit({
        data: formData,
        formId: "quick-enquiry",
        category: "online_group",
        buildPayload: (data, leadEventId) => ({
          name: data.name,
          whatsapp: data.whatsapp,
          preferred_experience: "Live online group classes",
          status: "submitted",
          source: "website",
          meta: {
            funnel: "online_group_inline",
            landing_page: "/online-yoga-classes",
            lead_event_id: leadEventId,
          },
        }),
        onSuccess: () => {
          successCalled = true;
        },
      });

      expect(success).toBe(true);
      expect(successCalled).toBe(true);
      expect(mockGtag).toHaveBeenCalledTimes(1);
      const gaPayload = mockGtag.mock.calls[0][2];
      expect(gaPayload.service_category).toBe("online_group");
      expect(gaPayload.form_id).toBe("quick-enquiry");

      const gaJson = JSON.stringify(gaPayload);
      expect(gaJson).not.toContain("Bob");
      expect(gaJson).not.toContain("447911123456");
    });

    it("PrivateYogaEnquiryForm: accepted outcome triggers category private_online and NO PII", async () => {
      const coordinator = createLeadSubmissionCoordinator();
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "accepted",
      });

      const formData = {
        name: "Charlie Brown",
        whatsapp: "+12025550123",
        email: "charlie@example.com",
        level: "Some Yoga Experience",
        focus: "Strength & Balance",
        time: "Evening",
      };
      let successCalled = false;

      const success = await coordinator.submit({
        data: formData,
        formId: "private_yoga_enquiry",
        category: "private_online",
        buildPayload: (data, leadEventId) => ({
          name: data.name,
          whatsapp: data.whatsapp,
          email: data.email || undefined,
          experience_level: data.level,
          preferred_experience: "Private 1-on-1 online yoga",
          preferred_time: data.time || undefined,
          goals: data.focus ? [data.focus] : [],
          status: "submitted",
          source: "website",
          meta: {
            funnel: "private_yoga_organic",
            landing_page: "/private-online-yoga",
            lead_event_id: leadEventId,
          },
        }),
        onSuccess: () => {
          successCalled = true;
        },
      });

      expect(success).toBe(true);
      expect(successCalled).toBe(true);
      expect(mockGtag).toHaveBeenCalledTimes(1);
      const gaPayload = mockGtag.mock.calls[0][2];
      expect(gaPayload.service_category).toBe("private_online");
      expect(gaPayload.form_id).toBe("private_yoga_enquiry");

      const gaJson = JSON.stringify(gaPayload);
      expect(gaJson).not.toContain("Charlie");
      expect(gaJson).not.toContain("charlie@example.com");
      expect(gaJson).not.toContain("Strength");
    });

    it("SmartConsultation: accepted outcome sanitizes and maps service names to allowlisted categories", async () => {
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
        const coordinator = createLeadSubmissionCoordinator();
        (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
          outcome: "accepted",
        });

        const formData = {
          name: "David Kim",
          whatsapp: "+84782046066",
          email: "david@example.com",
          service,
          message: "Please help me with back pain relief",
        };

        const success = await coordinator.submit({
          data: formData,
          formId: "smart_consultation",
          category: formData.service,
          buildPayload: (data, leadEventId) => ({
            name: data.name,
            whatsapp: data.whatsapp,
            email: data.email || undefined,
            preferred_experience: data.service,
            health_notes: data.message || undefined,
            status: "submitted",
            meta: {
              lead_event_id: leadEventId,
            },
          }),
          onSuccess: () => {},
        });

        expect(success).toBe(true);
        expect(mockGtag).toHaveBeenCalledTimes(1);
        const gaPayload = mockGtag.mock.calls[0][2];
        expect(gaPayload.service_category).toBe(expectedCategory);
        expect(gaPayload.form_id).toBe("smart_consultation");

        const gaJson = JSON.stringify(gaPayload);
        expect(gaJson).not.toContain("David");
        expect(gaJson).not.toContain("pain");
        expect(gaJson).not.toContain("relief");
      }
    });
  });

  describe("2. Outcome gating — duplicate, received (honeypot) and network error produce NO conversion events", () => {
    it("does NOT call trackGenerateLead when outcome is duplicate", async () => {
      const coordinator = createLeadSubmissionCoordinator();
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "duplicate",
      });

      let successOutcome: string | null = null;
      const success = await coordinator.submit({
        data: { name: "Duplicate User", whatsapp: "+84782046066" },
        formId: "quick-enquiry",
        category: "online_group",
        buildPayload: (data, leadEventId) => ({
          name: data.name,
          whatsapp: data.whatsapp,
          status: "submitted",
          meta: { lead_event_id: leadEventId },
        }),
        onSuccess: (result) => {
          successOutcome = result.outcome;
        },
      });

      expect(success).toBe(true);
      expect(successOutcome).toBe("duplicate");
      expect(mockGtag).not.toHaveBeenCalled();
      expect(mockFbq).not.toHaveBeenCalled();
    });

    it("does NOT call trackGenerateLead when outcome is received (honeypot suppression)", async () => {
      const coordinator = createLeadSubmissionCoordinator();
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "received",
      });

      let successOutcome: string | null = null;
      const success = await coordinator.submit({
        data: { name: "Bot User", whatsapp: "+1234567890" },
        formId: "smart_consultation",
        category: "Online Classes",
        buildPayload: (data, leadEventId) => ({
          name: data.name,
          whatsapp: data.whatsapp,
          status: "submitted",
          meta: { lead_event_id: leadEventId },
        }),
        onSuccess: (result) => {
          successOutcome = result.outcome;
        },
      });

      expect(success).toBe(true);
      expect(successOutcome).toBe("received");
      expect(mockGtag).not.toHaveBeenCalled();
      expect(mockFbq).not.toHaveBeenCalled();
    });

    it("does NOT call trackGenerateLead when submitLead throws network/server error", async () => {
      const coordinator = createLeadSubmissionCoordinator();
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error("Network connection dropped")
      );

      let errorCaught: unknown = null;
      let failed = false;

      try {
        await coordinator.submit({
          data: { name: "Network Fail User", whatsapp: "+84782046066" },
          formId: "quick-enquiry",
          category: "online_group",
          buildPayload: (data, leadEventId) => ({
            name: data.name,
            whatsapp: data.whatsapp,
            status: "submitted",
            meta: { lead_event_id: leadEventId },
          }),
          onSuccess: () => {},
          onError: (err) => {
            errorCaught = err;
          },
        });
      } catch {
        failed = true;
      }

      expect(failed).toBe(true);
      expect((errorCaught as Error)?.message).toBe("Network connection dropped");
      expect(mockGtag).not.toHaveBeenCalled();
      expect(mockFbq).not.toHaveBeenCalled();
      expect(coordinator.isSubmitting()).toBe(false);
    });
  });

  describe("3. Synchronous mutex against rapid repeated clicks in flight", () => {
    it("blocks second submission while first submission is unresolved", async () => {
      const coordinator = createLeadSubmissionCoordinator();
      let resolveSubmit: (res: any) => void;
      const submitPromise = new Promise((resolve) => {
        resolveSubmit = resolve;
      });

      (submitLead as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(submitPromise);

      const formData = { name: "Rapid Clicker", whatsapp: "+84782046066" };

      // First submit starts
      const firstPromise = coordinator.submit({
        data: formData,
        formId: "quick-enquiry",
        category: "online_group",
        buildPayload: (data, leadEventId) => ({
          name: data.name,
          whatsapp: data.whatsapp,
          status: "submitted",
          meta: { lead_event_id: leadEventId },
        }),
        onSuccess: () => {},
      });

      expect(coordinator.isSubmitting()).toBe(true);

      // Second submit fired synchronously while first is in flight
      const secondResult = await coordinator.submit({
        data: formData,
        formId: "quick-enquiry",
        category: "online_group",
        buildPayload: (data, leadEventId) => ({
          name: data.name,
          whatsapp: data.whatsapp,
          status: "submitted",
          meta: { lead_event_id: leadEventId },
        }),
        onSuccess: () => {},
      });

      // Synchronous mutex immediately rejected the second dispatch
      expect(secondResult).toBe(false);
      expect(submitLead).toHaveBeenCalledTimes(1);

      // Now resolve the first submission
      resolveSubmit!({ outcome: "accepted" });
      const firstResult = await firstPromise;
      expect(firstResult).toBe(true);
      expect(coordinator.isSubmitting()).toBe(false);
      expect(mockGtag).toHaveBeenCalledTimes(1);
    });
  });

  describe("4. Retry idempotency & fingerprint distinction", () => {
    it("reuses leadEventId on unchanged retry after failure, but generates new ID if content changes", async () => {
      const coordinator = createLeadSubmissionCoordinator();

      // First attempt fails
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error("Network timeout")
      );

      const initialData = {
        name: "Elena Rostova",
        whatsapp: "+84782046066",
        service: "Private Session",
        message: "First attempt message",
      };

      let firstId: string | null = null;
      try {
        await coordinator.submit({
          data: initialData,
          formId: "smart_consultation",
          category: initialData.service,
          buildPayload: (data, leadEventId) => {
            firstId = leadEventId;
            return {
              name: data.name,
              whatsapp: data.whatsapp,
              status: "submitted",
              meta: { lead_event_id: leadEventId },
            };
          },
          onSuccess: () => {},
        });
      } catch {
        /* expected rejection */
      }

      expect(firstId).toBeTruthy();
      expect(coordinator.getCurrentId()).toBe(firstId);

      // Second attempt with UNCHANGED data succeeds
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "accepted",
      });

      let retryId: string | null = null;
      await coordinator.submit({
        data: initialData, // EXACT same content
        formId: "smart_consultation",
        category: initialData.service,
        buildPayload: (data, leadEventId) => {
          retryId = leadEventId;
          return {
            name: data.name,
            whatsapp: data.whatsapp,
            status: "submitted",
            meta: { lead_event_id: leadEventId },
          };
        },
        onSuccess: () => {},
      });

      // Idempotency: exact same ID reused across retry
      expect(retryId).toBe(firstId);
      expect(mockGtag).toHaveBeenCalledWith(
        "event",
        "generate_lead",
        expect.objectContaining({ lead_event_id: firstId })
      );

      // Now with completion reset, a subsequent submission gets a fresh ID
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "accepted",
      });

      let subsequentId: string | null = null;
      await coordinator.submit({
        data: initialData,
        formId: "smart_consultation",
        category: initialData.service,
        buildPayload: (data, leadEventId) => {
          subsequentId = leadEventId;
          return {
            name: data.name,
            whatsapp: data.whatsapp,
            status: "submitted",
            meta: { lead_event_id: leadEventId },
          };
        },
        onSuccess: () => {},
      });

      expect(subsequentId).not.toBe(firstId);
    });

    it("generates a new leadEventId if user modifies form content between retries", async () => {
      const coordinator = createLeadSubmissionCoordinator();

      (submitLead as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error("Temporary error")
      );

      const initialData = {
        name: "Elena Rostova",
        whatsapp: "+84782046066",
        message: "Initial note",
      };

      let initialId: string | null = null;
      try {
        await coordinator.submit({
          data: initialData,
          formId: "quick-enquiry",
          category: "online_group",
          buildPayload: (data, leadEventId) => {
            initialId = leadEventId;
            return {
              name: data.name,
              whatsapp: data.whatsapp,
              status: "submitted",
              meta: { lead_event_id: leadEventId },
            };
          },
          onSuccess: () => {},
        });
      } catch {
        /* expected failure */
      }

      // User edits message before clicking retry
      const modifiedData = {
        ...initialData,
        message: "Updated note with correction",
      };

      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "accepted",
      });

      let modifiedId: string | null = null;
      await coordinator.submit({
        data: modifiedData,
        formId: "quick-enquiry",
        category: "online_group",
        buildPayload: (data, leadEventId) => {
          modifiedId = leadEventId;
          return {
            name: data.name,
            whatsapp: data.whatsapp,
            status: "submitted",
            meta: { lead_event_id: leadEventId },
          };
        },
        onSuccess: () => {},
      });

      expect(modifiedId).not.toBe(initialId);
    });
  });

  describe("5. Production helper utilities (generateEventId & getTimezone)", () => {
    it("generateEventId generates valid UUID when crypto.randomUUID is present", () => {
      const id = generateEventId();
      expect(typeof id).toBe("string");
      expect(id.length).toBeGreaterThan(10);
    });

    it("generateEventId falls back to timestamped pattern when crypto.randomUUID is unavailable", () => {
      const originalRandomUUID = crypto.randomUUID;
      try {
        Object.defineProperty(crypto, "randomUUID", {
          value: undefined,
          configurable: true,
          writable: true,
        });
        const id = generateEventId();
        expect(id.startsWith("lead_")).toBe(true);
      } finally {
        Object.defineProperty(crypto, "randomUUID", {
          value: originalRandomUUID,
          configurable: true,
          writable: true,
        });
      }
    });

    it("getTimezone returns string or null without throwing", () => {
      const tz = getTimezone();
      expect(tz === null || typeof tz === "string").toBe(true);
    });
  });
});
