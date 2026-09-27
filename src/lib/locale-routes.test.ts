import { describe, expect, it } from "vitest";
import { enCounterpart, langForPath, languageSwitchTarget, preferredLocaleRedirect, viCounterpart } from "./locale-routes";

describe("counterpart routing", () => {
  it("maps true pairs both ways", () => {
    expect(viCounterpart("/online-yoga-classes")).toBe("/vi/lop-yoga-online");
    expect(viCounterpart("/private-online-yoga/")).toBe("/vi/yoga-1-kem-1-online");
    expect(enCounterpart("/vi")).toBe("/");
    expect(viCounterpart("/about")).toBeNull();
    expect(languageSwitchTarget("/about").vi).toBe("/vi");
  });
});

describe("English-copy safety", () => {
  it("URL owns language", () => {
    expect(langForPath("/")).toBe("EN");
    expect(langForPath("/online-yoga-classes")).toBe("EN");
    expect(langForPath("/video")).toBe("EN");
    expect(langForPath("/vi")).toBe("VI");
    expect(langForPath("/vi/yoga-hai-duong")).toBe("VI");
  });
});

describe("saved preference redirect", () => {
  it("redirects VI preference on mapped EN route, preserving query/hash", () => {
    expect(preferredLocaleRedirect("/online-yoga-classes", "VI", "?utm_source=x", "#faq"))
      .toBe("/vi/lop-yoga-online?utm_source=x#faq");
    expect(preferredLocaleRedirect("/", "VI")).toBe("/vi");
  });
  it("never redirects otherwise (no loops)", () => {
    expect(preferredLocaleRedirect("/online-yoga-classes", "EN")).toBeNull();
    expect(preferredLocaleRedirect("/online-yoga-classes", null)).toBeNull();
    expect(preferredLocaleRedirect("/about", "VI")).toBeNull();
    expect(preferredLocaleRedirect("/vi/lop-yoga-online", "VI")).toBeNull();
    expect(preferredLocaleRedirect("/vi", "EN")).toBeNull();
  });
});
