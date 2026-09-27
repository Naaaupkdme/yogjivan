import { describe, expect, it } from "vitest";
import { CAPTURE_SCRIPT } from "./pre-hydration-input";

type Listener = (e: { target: unknown }) => void;

function runCapture() {
  const listeners: Record<string, Listener[]> = {};
  const win: Record<string, unknown> = {};
  const doc = { addEventListener: (t: string, fn: Listener) => (listeners[t] ??= []).push(fn) };
  new Function("window", "document", CAPTURE_SCRIPT)(win, doc);
  const fire = (type: string, target: unknown) => listeners[type]?.forEach((fn) => fn({ target }));
  return { win, fire };
}

describe("pre-hydration input capture", () => {
  it("records typed/autofilled values for phone, email and name before hydration", () => {
    const { win, fire } = runCapture();
    const form = {};
    fire("input", { name: "name", value: "QA", form, type: "text" });
    fire("input", { name: "whatsapp", value: "912345678", form, type: "tel" });
    fire("change", { name: "email", value: "qa@example.com", form, type: "email" });
    expect(win.__yjPreInput).toEqual({ name: "QA", whatsapp: "912345678", email: "qa@example.com" });
  });

  it("ignores honeypot-style hidden fields, fields outside forms, and stops after hydration", () => {
    const { win, fire } = runCapture();
    fire("input", { name: "x", value: "1", form: {}, type: "hidden" });
    fire("input", { name: "search", value: "yoga", form: null, type: "text" });
    win.__yjPreDone = true;
    fire("input", { name: "email", value: "late@example.com", form: {}, type: "email" });
    expect(win.__yjPreInput).toEqual({});
  });
});
