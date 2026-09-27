/**
 * Helpers for the shared country-aware WhatsApp input.
 *
 * react-international-phone v4 clears the typed national digits whenever the
 * country is changed while `disableDialCodeAndPrefix` is on: setCountry resets
 * the visible input to "" and emits a phone of just "+<dialCode>". These pure
 * helpers let the component (and its tests) keep the digits the visitor
 * already entered and simply re-home them under the new dial code.
 */

/** Digits only, ignoring spaces, dashes, brackets and any stray prefix. */
export function nationalDigits(inputValue: string): string {
  return (inputValue ?? "").replace(/\D/g, "");
}

/**
 * The E.164 value to emit when the visitor picks a different country.
 * Typed digits are preserved; an empty input yields just the dial code.
 */
export function phoneAfterCountryChange(inputValue: string, dialCode: string): string {
  return `+${dialCode}${nationalDigits(inputValue)}`;
}
