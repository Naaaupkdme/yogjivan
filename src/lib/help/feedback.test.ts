import { describe, expect, it } from "vitest";
import { feedbackSchema, redactContact } from "./feedback";

describe("help feedback", () => {
  it("rejects a filled honeypot", () => {
    expect(feedbackSchema.safeParse({ kind: "problem", message: "Menu broken", website: "x" }).success).toBe(false);
  });
  it("accepts a normal message", () => {
    expect(feedbackSchema.safeParse({ kind: "suggestion", message: "Add evening classes", page_path: "/" }).success).toBe(true);
  });
  it("removes emails and phone numbers", () => {
    expect(redactContact("call +84 782 046 066 or a@b.com")).toBe("call [number removed] or [email removed]");
  });
});
