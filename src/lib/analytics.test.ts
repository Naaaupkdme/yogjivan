import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  sanitizeLeadCategory,
  trackGenerateLead,
  type LeadProductCategory,
} from "./analytics";

describe("analytics - privacy-safe lead categorization", () => {
  const ALLOWED: Set<LeadProductCategory> = new Set([
    "studio",
    "online_group",
    "private_online",
    "general",
  ]);

  it("normalizes known product inputs into the 4 allowlisted categories", () => {
    expect(sanitizeLeadCategory("studio")).toBe("studio");
    expect(sanitizeLeadCategory("Studio Classes")).toBe("studio");
    expect(sanitizeLeadCategory("Hai Duong Studios")).toBe("studio");

    expect(sanitizeLeadCategory("online_group")).toBe("online_group");
    expect(sanitizeLeadCategory("Live online group classes")).toBe("online_group");
    expect(sanitizeLeadCategory("Online Classes")).toBe("online_group");

    expect(sanitizeLeadCategory("private_online")).toBe("private_online");
    expect(sanitizeLeadCategory("Private 1-on-1 online yoga")).toBe("private_online");
    expect(sanitizeLeadCategory("Private Session")).toBe("private_online");
    expect(sanitizeLeadCategory("Personalized Wellness Yoga")).toBe("private_online");

    expect(sanitizeLeadCategory("general")).toBe("general");
    expect(sanitizeLeadCategory("Corporate Wellness")).toBe("general");
    expect(sanitizeLeadCategory("Not sure yet")).toBe("general");
    expect(sanitizeLeadCategory("")).toBe("general");
    expect(sanitizeLeadCategory(null)).toBe("general");
    expect(sanitizeLeadCategory(undefined)).toBe("general");
  });

  it("never echoes sensitive health-goal or medical text into analytics categories", () => {
    // Health goals from BookOnlineYogaForm or free text
    const healthInputs = [
      "Back, neck or posture support",
      "Stress and sleep",
      "Knee rehabilitation and joint pain",
      "Severe lower back stiffness",
      "Mental anxiety and breathlessness",
      "Thyroid and PCOD support",
    ];

    for (const input of healthInputs) {
      const sanitized = sanitizeLeadCategory(input);
      expect(ALLOWED.has(sanitized)).toBe(true);
      // None of the sensitive words should ever be emitted
      expect(sanitized).toBe("general");
    }
  });

  it("never echoes contact details or PII into analytics categories", () => {
    const piiInputs = [
      "+84 782046066",
      "user@example.com",
      "John Doe",
      "My name is Sarah, please call me on 0912345678",
    ];

    for (const input of piiInputs) {
      const sanitized = sanitizeLeadCategory(input);
      expect(ALLOWED.has(sanitized)).toBe(true);
      expect(sanitized).toBe("general");
    }
  });

  describe("trackGenerateLead dispatch", () => {
    let mockGtag: any;
    let mockFbq: any;

    beforeEach(() => {
      mockGtag = vi.fn();
      mockFbq = vi.fn();
      (globalThis as any).window = {
        location: { pathname: "/test-path", search: "" },
        localStorage: {
          getItem: (key: string) => {
            if (key === "yj_cookie_consent_v2") {
              return JSON.stringify({ analytics: true, marketing: true });
            }
            return null;
          },
        },
        gtag: mockGtag,
        fbq: mockFbq,
      };
    });

    afterEach(() => {
      delete (globalThis as any).window;
    });

    it("emits strictly sanitized categories and leadEventId to GA4 and Meta", () => {
      const testEventId = "test-uuid-1234";

      trackGenerateLead("Live online group classes", "quick_enquiry", testEventId);

      expect(mockGtag).toHaveBeenCalledWith(
        "event",
        "generate_lead",
        expect.objectContaining({
          form_id: "quick_enquiry",
          service_category: "online_group",
          lead_event_id: testEventId,
          page_path: "/test-path",
        })
      );

      expect(mockFbq).toHaveBeenCalledWith(
        "track",
        "Lead",
        expect.objectContaining({
          content_category: "online_group",
        }),
        { eventID: testEventId }
      );
    });

    it("suppresses raw health goal even if directly passed to trackGenerateLead", () => {
      trackGenerateLead("Back, neck or posture support", "book_online_yoga");

      expect(mockGtag).toHaveBeenCalledWith(
        "event",
        "generate_lead",
        expect.objectContaining({
          form_id: "book_online_yoga",
          service_category: "general",
        })
      );

      expect(mockFbq).toHaveBeenCalledWith(
        "track",
        "Lead",
        expect.objectContaining({
          content_category: "general",
        })
      );
    });
  });
});
