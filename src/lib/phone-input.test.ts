import { describe, expect, it } from "vitest";
import { nationalDigits, phoneAfterCountryChange } from "./phone-input";

describe("nationalDigits", () => {
  it("keeps only digits from a formatted national number", () => {
    expect(nationalDigits("912 345 678")).toBe("912345678");
    expect(nationalDigits("(912) 345-678")).toBe("912345678");
  });

  it("returns an empty string for an empty input", () => {
    expect(nationalDigits("")).toBe("");
  });
});

describe("phoneAfterCountryChange", () => {
  // Regression: picking a different country used to wipe the number the
  // visitor had already typed, leaving only the dial code.
  it("preserves typed digits when the country changes", () => {
    expect(phoneAfterCountryChange("912 345 678", "91")).toBe("+91912345678");
    expect(phoneAfterCountryChange("912345678", "84")).toBe("+84912345678");
  });

  it("never drops digits when switching between several countries", () => {
    let phone = phoneAfterCountryChange("912345678", "91");
    expect(phone).toBe("+91912345678");
    // The visible input keeps showing the national part only.
    phone = phoneAfterCountryChange("912 345 678", "1");
    expect(phone).toBe("+1912345678");
    phone = phoneAfterCountryChange("912 345 678", "44");
    expect(phone).toBe("+44912345678");
  });

  it("falls back to the bare dial code when nothing was typed", () => {
    expect(phoneAfterCountryChange("", "84")).toBe("+84");
  });
});
