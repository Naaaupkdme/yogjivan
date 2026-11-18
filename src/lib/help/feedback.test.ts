import { describe, expect, it } from "vitest";
import { feedbackSchema, formatFeedbackAlert, redactContact } from "./feedback";

describe("help feedback", () => {
  it("rejects a filled honeypot", () => {
    expect(feedbackSchema.safeParse({ kind: "problem", message: "Menu broken", website: "x" }).success).toBe(false);
  });
  it("accepts a normal message", () => {
    expect(feedbackSchema.safeParse({ kind: "suggestion", message: "Add evening classes", page_path: "/" }).success).toBe(true);
  });
  it("requires explicit consent when a reply contact is given", () => {
    expect(feedbackSchema.safeParse({ kind: "problem", message: "Form broke", reply_contact: "a@b.com" }).success).toBe(false);
    expect(feedbackSchema.safeParse({ kind: "problem", message: "Form broke", reply_contact: "a@b.com", contact_consent: true }).success).toBe(true);
  });
  it("removes emails and phone numbers from the message body", () => {
    expect(redactContact("call +84 782 046 066 or a@b.com")).toBe("call [number removed] or [email removed]");
  });
  it("staff alert never contains the reply contact and escapes html", () => {
    const t = formatFeedbackAlert({ ticket_id: "YJ-H-ABC123", kind: "problem", message: "<b>x</b>", page_path: "/", lang: "EN", has_contact: true });
    expect(t).toContain("YJ-H-ABC123");
    expect(t).toContain("&lt;b&gt;x&lt;/b&gt;");
    expect(t).not.toContain("@");
  });
});
