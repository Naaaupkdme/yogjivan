import { beforeEach, describe, expect, it } from "vitest";
import { enCounterpart, viCounterpart } from "../locale-routes";
import {
  foldAccents,
  HELP_FAQS,
  searchHelpFAQs,
} from "./help-faq";
import {
  GOOGLE_STUDIO_REVIEWS,
  isOnlineOnlyRoute,
} from "./google-reviews";
import {
  clearPreviewSupportLedger,
  formatSupportTelegramAlert,
  getPreviewSupportLedger,
  processSupportSubmission,
} from "./support-intake.server";
import {
  generateTicketRef,
  sanitizePlainText,
  supportTicketSchema,
} from "./types";

describe("Support FAQs & Search Engine (File 24)", () => {
  it("folds Vietnamese accents and diacritics cleanly", () => {
    expect(foldAccents("Đổi lịch học")).toBe("doi lich hoc");
    expect(foldAccents("Yoga trên ghế")).toBe("yoga tren ghe");
    expect(foldAccents("Buổi trải nghiệm")).toBe("buoi trai nghiem");
    expect(foldAccents("   Hải Dương   ")).toBe("hai duong");
  });

  describe("Curated FAQ Journeys", () => {
    it("Journey 1: Finds Solo $25 flat rate and packages", () => {
      const results = searchHelpFAQs("private session price", "en");
      expect(results.length).toBeGreaterThan(0);
      const top = results[0];
      expect(top.id).toBe("faq-private-session-price");
      expect(top.aEn).toContain("US$25");
      expect(top.aEn).toContain("US$249"); // 12-pack
      expect(top.link?.to).toBe("/private-online-yoga");

      // Vietnamese query
      const viResults = searchHelpFAQs("học phí yoga 1 kèm 1", "vi");
      expect(viResults.length).toBeGreaterThan(0);
      expect(viResults[0].id).toBe("faq-private-session-price");
      expect(viResults[0].aVi).toContain("25 USD");
    });

    it("Journey 2: Finds Corporate 30-min chair demo requirements", () => {
      const results = searchHelpFAQs("corporate demo", "en");
      expect(results.length).toBeGreaterThan(0);
      const top = results[0];
      expect(top.id).toBe("faq-corporate-demo");
      expect(top.aEn).toContain("30 minutes");
      expect(top.aEn).toContain("workplace location");
      expect(top.aEn).toContain("chair-yoga");
      expect(top.link?.to).toBe("/corporate");

      // Vietnamese synonyms
      const viResults = searchHelpFAQs("yoga tren ghe van phong", "vi");
      expect(viResults.some((faq) => faq.id === "faq-corporate-demo")).toBe(true);
    });

    it("Journey 3: Finds School preparation with zero child PII", () => {
      const results = searchHelpFAQs("school yoga preparation", "en");
      expect(results.length).toBeGreaterThan(0);
      const top = results[0];
      expect(top.id).toBe("faq-school-preparation");
      expect(top.aEn).toContain("adult coordinator");
      expect(top.aEn).toContain("no child names, photos or health history");
      expect(top.link?.to).toBe("/school-yoga");

      // Vietnamese query
      const viResults = searchHelpFAQs("yoga hoc duong tre em", "vi");
      expect(viResults.some((faq) => faq.id === "faq-school-preparation")).toBe(true);
      const faq = viResults.find((f) => f.id === "faq-school-preparation")!;
      expect(faq.aVi).toContain("tuyệt đối không thu thập dữ liệu cá nhân hay hình ảnh của học sinh");
    });

    it("matches Couples and Family pricing queries", () => {
      const couplesResults = searchHelpFAQs("couples yoga 2 adults", "en");
      expect(couplesResults[0].id).toBe("faq-couples-yoga-pricing");
      expect(couplesResults[0].aEn).toContain("US$45");

      const familyResults = searchHelpFAQs("family yoga household", "en");
      expect(familyResults[0].id).toBe("faq-family-yoga-pricing");
      expect(familyResults[0].aEn).toContain("US$55");
      expect(familyResults[0].aEn).toContain("US$65");
    });

    it("matches camera setup and rescheduling via synonyms", () => {
      const camResults = searchHelpFAQs("laptop camera angle lighting", "en");
      expect(camResults[0].id).toBe("faq-camera-setup");

      const reschedResults = searchHelpFAQs("doi lich tap", "vi");
      expect(reschedResults[0].id).toBe("faq-rescheduling");
    });

    it("prioritizes FAQ list by current route when query is empty", () => {
      const privateList = searchHelpFAQs("", "en", "/private-online-yoga");
      expect(privateList[0].category).toBe("private");

      const corporateList = searchHelpFAQs("", "en", "/corporate");
      expect(corporateList[0].category).toBe("corporate");

      const schoolList = searchHelpFAQs("", "vi", "/vi/yoga-hoc-duong");
      expect(schoolList[0].category).toBe("school");
    });

    it("returns empty array for completely unmatched query without throwing", () => {
      const results = searchHelpFAQs("xyznonexistentword12345", "en");
      expect(results).toEqual([]);
    });
  });
});

describe("Google Business Profile Reviews & Routing (File 24)", () => {
  it("provides authentic review links for physical studios", () => {
    expect(GOOGLE_STUDIO_REVIEWS.length).toBe(2);
    const [studio1, studio2] = GOOGLE_STUDIO_REVIEWS;
    expect(studio1.studioId).toBe("sanctuary");
    expect(studio1.reviewUrl).toMatch(/^https:\/\/(maps\.app\.goo\.gl|search\.google\.com|www\.google\.com\/maps)/);
    expect(studio2.studioId).toBe("wellness");
    expect(studio2.reviewUrl).toMatch(/^https:\/\/(maps\.app\.goo\.gl|search\.google\.com|www\.google\.com\/maps)/);
  });

  it("identifies online-only routes to avoid showing physical studio review cards inappropriately", () => {
    expect(isOnlineOnlyRoute("/private-online-yoga")).toBe(true);
    expect(isOnlineOnlyRoute("/online-couples-yoga")).toBe(true);
    expect(isOnlineOnlyRoute("/online-family-yoga")).toBe(true);
    expect(isOnlineOnlyRoute("/online-yoga-classes")).toBe(true);
    expect(isOnlineOnlyRoute("/vi/yoga-1-kem-1-online")).toBe(true);

    // In-person / studio / general routes
    expect(isOnlineOnlyRoute("/")).toBe(false);
    expect(isOnlineOnlyRoute("/contact")).toBe(false);
    expect(isOnlineOnlyRoute("/corporate")).toBe(false);
    expect(isOnlineOnlyRoute("/testimonials")).toBe(false);
  });
});

describe("Support Ticket Validation & Processing (File 24)", () => {
  beforeEach(() => {
    clearPreviewSupportLedger();
  });

  it("generates ticket references in YJ-SUP-XXXX format", () => {
    const ref = generateTicketRef();
    expect(ref).toMatch(/^YJ-SUP-[0-9A-F]{4}$/);
  });

  it("sanitizes plain text stripping tags and control characters", () => {
    expect(sanitizePlainText("<script>alert(1)</script>Hello<b>World</b>")).toBe("alert(1)HelloWorld");
    expect(sanitizePlainText("  Clean string with spaces   ")).toBe("Clean string with spaces");
  });

  it("validates anonymous ticket submission successfully", () => {
    const input = {
      category: "booking_lesson",
      message: "I need to check the schedule for next Tuesday morning session.",
      reply_preference: "none",
      locale: "en",
    };
    const parsed = supportTicketSchema.safeParse(input);
    expect(parsed.success).toBe(true);
  });

  it("rejects message with fewer than 10 characters", () => {
    const input = {
      category: "website_problem",
      message: "Too short",
      reply_preference: "none",
      locale: "en",
    };
    const parsed = supportTicketSchema.safeParse(input);
    expect(parsed.success).toBe(false);
  });

  it("requires contact info when reply_preference is not none", () => {
    const withoutContact = {
      category: "class_feedback",
      message: "The audio was slightly echoey during the breathing segment.",
      reply_preference: "whatsapp_zalo",
      contact: "",
      locale: "en",
    };
    const failParsed = supportTicketSchema.safeParse(withoutContact);
    expect(failParsed.success).toBe(false);

    const withContact = {
      ...withoutContact,
      contact: "+84 912 345 678",
    };
    const okParsed = supportTicketSchema.safeParse(withContact);
    expect(okParsed.success).toBe(true);
  });

  it("processes valid submission and generates valid ticket reference", async () => {
    const res = await processSupportSubmission(
      {
        category: "booking_lesson",
        service_or_studio: "Private 1-on-1 Online Yoga",
        message: "Can I reschedule my Friday morning session to Saturday 7 AM?",
        reply_preference: "whatsapp_zalo",
        contact: "+84 987 654 321",
        locale: "en",
        route: "/help",
      },
      { ip: "127.0.0.1" }
    );

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.ticket_ref).toMatch(/^YJ-SUP-[0-9A-F]{4}$/);
    expect(res.body.is_anonymous).toBe(false);

    const ledger = getPreviewSupportLedger();
    expect(ledger.length).toBe(1);
    expect(ledger[0].ticket_ref).toBe(res.body.ticket_ref);
    expect(ledger[0].category).toBe("booking_lesson");
    expect(ledger[0].contact).toBe("+84 987 654 321");
  });

  it("silently drops bot submissions via honeypot without recording to ledger", async () => {
    const res = await processSupportSubmission(
      {
        category: "website_problem",
        message: "Bot message with automated spam content here.",
        reply_preference: "none",
        hp: "https://spam-bot.example.com",
        locale: "en",
      },
      { ip: "127.0.0.1" }
    );

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    // Honeypot was triggered, should NOT be written to ledger
    const ledger = getPreviewSupportLedger();
    expect(ledger.length).toBe(0);
  });

  it("respects idempotency key and avoids duplicate ticket generation", async () => {
    const payload = {
      category: "other",
      message: "Testing duplicate prevention through idempotency key.",
      reply_preference: "none",
      idempotency_key: "idem-key-test-123456",
      locale: "en",
    };

    const first = await processSupportSubmission(payload, { ip: "127.0.0.1" });
    const second = await processSupportSubmission(payload, { ip: "127.0.0.1" });

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(first.body.ticket_ref).toBe(second.body.ticket_ref);

    const ledger = getPreviewSupportLedger();
    expect(ledger.length).toBe(1);
  });

  it("formats sanitized internal Telegram plain-text notification", () => {
    const alert = formatSupportTelegramAlert({
      ticket_ref: "YJ-SUP-0F42",
      category: "booking_lesson",
      service_or_studio: "Private Yoga",
      locale: "en",
    });

    expect(alert).toBe("New support ticket YJ-SUP-0F42 · Booking question · Private Yoga · EN · Open ticket");
  });
});

describe("Help Locale Navigation (File 24)", () => {
  it("maps /help <-> /vi/tro-giup bidirectionally", () => {
    expect(viCounterpart("/help")).toBe("/vi/tro-giup");
    expect(enCounterpart("/vi/tro-giup")).toBe("/help");
  });
});
