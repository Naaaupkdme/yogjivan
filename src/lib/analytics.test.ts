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

  describe("Meta Pixel compliance, host gating & consent lifecycle", () => {
    let mockGtag: any;
    let mockFbq: any;

    beforeEach(() => {
      mockGtag = vi.fn();
      mockFbq = vi.fn();
      (globalThis as any).document = {
        title: "Private Online Yoga",
        head: { appendChild: vi.fn() },
        querySelector: vi.fn(),
        createElement: vi.fn(() => ({ async: true, src: "" })),
        getElementsByTagName: vi.fn(() => [{ parentNode: { insertBefore: vi.fn() } }]),
      };
      (globalThis as any).window = {
        location: {
          pathname: "/private-online-yoga",
          search: "",
          href: "https://www.yogjivan.com/private-online-yoga",
          hostname: "www.yogjivan.com",
        },
        document: (globalThis as any).document,
        localStorage: {
          store: {} as Record<string, string>,
          getItem(k: string) { return this.store[k] ?? null; },
          setItem(k: string, v: string) { this.store[k] = v; },
        },
        dispatchEvent: vi.fn(),
        gtag: mockGtag,
        fbq: mockFbq,
      };
    });

    afterEach(() => {
      delete (globalThis as any).window;
      delete (globalThis as any).document;
    });

    it("verifies approved production hosts vs localhost/preview domains", async () => {
      const { isMetaAllowedHost } = await import("./analytics");
      expect(isMetaAllowedHost("yogjivan.com")).toBe(true);
      expect(isMetaAllowedHost("www.yogjivan.com")).toBe(true);
      expect(isMetaAllowedHost("yogjivan.in")).toBe(true);
      expect(isMetaAllowedHost("www.yogjivan.in")).toBe(true);

      // Dev and preview hosts strictly unapproved to stop real pixel beacons
      expect(isMetaAllowedHost("localhost")).toBe(false);
      expect(isMetaAllowedHost("127.0.0.1")).toBe(false);
      expect(isMetaAllowedHost("id-preview--fb15e133.lovable.app")).toBe(false);
      expect(isMetaAllowedHost("something.lovableproject.com")).toBe(false);
    });

    it("identifies sensitive health routes to protect against health-association flags", async () => {
      const { isSensitiveHealthPath } = await import("./analytics");
      expect(isSensitiveHealthPath("/yoga-for-back-pain")).toBe(true);
      expect(isSensitiveHealthPath("/yoga-for-pcod")).toBe(true);
      expect(isSensitiveHealthPath("/yoga-for-thyroid")).toBe(true);
      expect(isSensitiveHealthPath("/yoga-for-stress")).toBe(true);
      expect(isSensitiveHealthPath("/period-safe-yoga")).toBe(true);

      expect(isSensitiveHealthPath("/")).toBe(false);
      expect(isSensitiveHealthPath("/private-online-yoga")).toBe(false);
      expect(isSensitiveHealthPath("/online-yoga-classes")).toBe(false);
      expect(isSensitiveHealthPath("/contact")).toBe(false);
    });

    it("reproduces consent denied -> marketing granted: emits missed Meta PageView without duplicating GA", async () => {
      const { applyConsent, trackPageView, resetMetaPageViewTracking } = await import("./analytics");
      resetMetaPageViewTracking();

      // 1. Initial page load with consent denied
      window.localStorage.setItem("yj_cookie_consent_v2", JSON.stringify({ analytics: false, marketing: false }));
      trackPageView();

      // GA fired in restricted mode; Meta did NOT fire because marketing consent was false
      expect(mockGtag).toHaveBeenCalledWith("event", "page_view", expect.objectContaining({ page_path: "/private-online-yoga" }));
      expect(mockFbq).not.toHaveBeenCalled();

      mockGtag.mockClear();
      mockFbq.mockClear();

      // 2. User grants marketing consent on the same route
      window.localStorage.setItem("yj_cookie_consent_v2", JSON.stringify({ analytics: true, marketing: true }));
      applyConsent({ analytics: true, marketing: true });

      // Meta PageView is emitted for current route
      expect(mockFbq).toHaveBeenCalledWith("track", "PageView");
      // GA page_view is NOT duplicated
      expect(mockGtag).not.toHaveBeenCalledWith("event", "page_view", expect.anything());

      mockFbq.mockClear();

      // 3. Repeated consent saves on the same route do NOT emit duplicate Meta PageView
      applyConsent({ analytics: true, marketing: true });
      expect(mockFbq).not.toHaveBeenCalled();
    });

    it("suppresses Meta events on sensitive health routes even with marketing consent granted", async () => {
      const { metaEvent, resetMetaPageViewTracking } = await import("./analytics");
      resetMetaPageViewTracking();

      window.localStorage.setItem("yj_cookie_consent_v2", JSON.stringify({ analytics: true, marketing: true }));
      (window as any).location.pathname = "/yoga-for-back-pain";

      metaEvent("ViewContent", { content_name: "Back Pain" });
      expect(mockFbq).not.toHaveBeenCalled();
    });
  });
});
