export const HONEYPOT_NAME = "yj_hp_website";

let turnstileToken: string | null = null;
export function setTurnstileToken(t: string | null) {
  turnstileToken = t;
}
export function takeTurnstileToken(): string | null {
  const t = turnstileToken;
  turnstileToken = null;
  return t;
}

/** Any filled honeypot on the page means a bot autofilled the form. */
export function readHoneypot(): string {
  if (typeof document === "undefined") return "";
  let v = "";
  document.querySelectorAll<HTMLInputElement>(`input[name="${HONEYPOT_NAME}"]`).forEach((el) => {
    if (el.value) v = el.value.slice(0, 500);
  });
  return v;
}
