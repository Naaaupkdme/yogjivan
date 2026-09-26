// Phone normalization for lead WhatsApp numbers.
//
// Rules (owner-approved):
// - The original input is always preserved separately.
// - Only numbers written in international form (+CC… or 00CC…) are parsed.
//   A bare national number is ambiguous: we never guess a country.
// - A trunk "0" typed straight after the country code (e.g. +84 0…) is NOT
//   silently corrected; it stays needs_review for a human.
// - Anything that is not a valid number stays needs_review with no WhatsApp link.

import { parsePhoneNumberFromString } from "libphonenumber-js/max";

export type PhoneValidation = "valid" | "needs_review";

export type NormalizedPhone = {
  phone_original: string;
  country_code: string | null; // "+84"
  mobile_number: string | null; // national significant number, digits only
  whatsapp_full_number: string | null; // E.164, only when valid
  country_iso: string | null; // "VN"
  phone_validation: PhoneValidation;
  reason: string;
};

function review(original: string, reason: string, cc: string | null = null): NormalizedPhone {
  return {
    phone_original: original,
    country_code: cc,
    mobile_number: null,
    whatsapp_full_number: null,
    country_iso: null,
    phone_validation: "needs_review",
    reason,
  };
}

export function normalizePhone(input: string | null | undefined): NormalizedPhone {
  const original = (input ?? "").slice(0, 60);
  const trimmed = original.trim();
  if (!trimmed) return review(original, "empty");

  // Keep only a leading + and digits for analysis.
  let compact = trimmed.replace(/[\s().\-/]/g, "");
  if (compact.startsWith("00")) compact = `+${compact.slice(2)}`;
  if (!compact.startsWith("+")) return review(original, "no_country_code_ambiguous");
  if (!/^\+\d{6,17}$/.test(compact)) return review(original, "invalid_characters_or_length");

  const parsed = parsePhoneNumberFromString(compact);
  if (!parsed) return review(original, "unparseable");

  const cc = `+${parsed.countryCallingCode}`;
  const afterCc = compact.slice(cc.length);
  // Italy legitimately keeps a leading 0 in international form.
  if (afterCc.startsWith("0") && parsed.countryCallingCode !== "39") {
    return review(original, "trunk_zero_after_country_code", cc);
  }
  if (!parsed.isValid()) return review(original, "invalid_number", cc);

  return {
    phone_original: original,
    country_code: cc,
    mobile_number: String(parsed.nationalNumber),
    whatsapp_full_number: parsed.number, // E.164
    country_iso: parsed.country ?? null,
    phone_validation: "valid",
    reason: parsed.getType() ?? "valid",
  };
}

/** wa.me link for a VALID E.164 number only; otherwise null (never unsafe links). */
export function waMeLink(e164: string | null, text?: string): string | null {
  if (!e164 || !/^\+\d{7,15}$/.test(e164)) return null;
  const base = `https://wa.me/${e164.slice(1)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
