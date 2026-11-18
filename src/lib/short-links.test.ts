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
