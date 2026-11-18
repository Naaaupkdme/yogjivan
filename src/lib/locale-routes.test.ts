import { describe, expect, it } from "vitest";
import { enCounterpart, langForPath, languageSwitchTarget, preferredLocaleRedirect, viCounterpart } from "./locale-routes";

describe("counterpart routing", () => {
  it("maps true pairs both ways", () => {
    expect(viCounterpart("/online-yoga-classes")).toBe("/vi/lop-yoga-online");
    expect(viCounterpart("/private-online-yoga/")).toBe("/vi/yoga-1-kem-1-online");
    expect(viCounterpart("/corporate")).toBe("/vi/yoga-doanh-nghiep");
    expect(viCounterpart("/school-yoga")).toBe("/vi/yoga-hoc-duong");
    expect(enCounterpart("/vi/yoga-doanh-nghiep")).toBe("/corporate");
    expect(enCounterpart("/vi/yoga-hoc-duong")).toBe("/school-yoga");
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

describe("Private enquiry locale links", () => {
  it("keeps attribution and maps the enquiry anchor in both directions", () => {
    expect(languageSwitchTarget("/private-online-yoga", "?utm_source=x", "#private-enquiry").vi)
      .toBe("/vi/yoga-1-kem-1-online?utm_source=x#tu-van");
    expect(languageSwitchTarget("/vi/yoga-1-kem-1-online", "?utm_source=x", "tu-van").en)
      .toBe("/private-online-yoga?utm_source=x#private-enquiry");
    expect(preferredLocaleRedirect("/private-online-yoga", "VI", "?utm_source=x", "#private-enquiry"))
      .toBe("/vi/yoga-1-kem-1-online?utm_source=x#tu-van");
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
