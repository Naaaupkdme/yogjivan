import { describe, it, expect } from "vitest";
import { shortLinkTarget } from "./short-links";
describe("short links", () => {
  it("yt goes to private online yoga tagged youtube", () => {
    expect(shortLinkTarget("yt")).toBe("/private-online-yoga?utm_source=youtube&utm_medium=social&utm_campaign=shortlink");
  });
  it("insta goes to homepage tagged instagram", () => {
    expect(shortLinkTarget("INSTA")).toBe("/?utm_source=instagram&utm_medium=social&utm_campaign=shortlink");
  });
  it("unknown slug falls back to homepage", () => {
    expect(shortLinkTarget("nope")).toBe("/");
  });
});

describe("approved short-link mapping", () => {
  const expected: Record<string, string> = {
    yt: "/private-online-yoga", private: "/private-online-yoga",
    insta: "/", fb: "/", tiktok: "/",
    zalo: "/vi/yoga-1-kem-1-online", qr: "/vi/yoga-hai-duong",
  };
  for (const [slug, path] of Object.entries(expected)) {
    it(`${slug} -> ${path}`, () => {
      expect(shortLinkTarget(slug).split("?")[0]).toBe(path);
    });
  }
  it("never redirects off-site", () => {
    for (const s of ["https://evil.com", "//evil.com", "..%2F..", "yt/../x"]) {
      expect(shortLinkTarget(s).startsWith("/")).toBe(true);
      expect(shortLinkTarget(s).startsWith("//")).toBe(false);
    }
  });
});
