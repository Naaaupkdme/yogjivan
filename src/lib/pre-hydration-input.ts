/**
 * Pre-hydration form input rescue.
 *
 * Forms are server-rendered, so visitors (and browser autofill) can type into
 * the fields before React hydrates. On hydration React re-applies each
 * controlled input's state value ("") and silently wipes whatever was typed.
 *
 * CAPTURE_SCRIPT runs inline in <head> and records the latest value of every
 * named form field. After hydration, replayPreHydrationInputs() re-dispatches
 * those values through native events so each form's own onChange handlers
 * (including the country-aware phone input) update React state normally.
 * Values stay in page memory only — never stored, logged or sent anywhere.
 */

export const CAPTURE_SCRIPT = `(function(){var s=window.__yjPreInput={};function r(e){var t=e.target;if(!t||!t.name||!t.form)return;if(t.type==="hidden"||t.type==="checkbox"||t.type==="radio"||t.type==="file"||t.type==="password")return;s[t.name]=t.value;}document.addEventListener("input",r,true);document.addEventListener("change",r,true);})();`;

type Store = Record<string, string>;

function setNativeValue(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, value: string) {
  const proto =
    el instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : el instanceof HTMLSelectElement
        ? HTMLSelectElement.prototype
        : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  setter?.call(el, value);
  el.dispatchEvent(new Event(el instanceof HTMLSelectElement ? "change" : "input", { bubbles: true }));
}

/** Restore captured values into fields React emptied. Returns how many were restored. */
export function replayPreHydrationInputs(): number {
  if (typeof window === "undefined") return 0;
  const store = (window as unknown as { __yjPreInput?: Store }).__yjPreInput;
  if (!store) return 0;
  let restored = 0;
  for (const [name, value] of Object.entries(store)) {
    if (!value) continue;
    const fields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      `form [name="${CSS.escape(name)}"]`,
    );
    fields.forEach((el) => {
      if (el.value === "" || el.value !== value && el.value.replace(/\D/g, "") === "") {
        setNativeValue(el, value);
        restored++;
      }
    });
  }
  return restored;
}

/** Replay now and shortly after (late hydration / deferred sections), then stop tracking. */
export function installPreHydrationReplay(): () => void {
  const timers = [0, 300, 1200].map((ms) => window.setTimeout(replayPreHydrationInputs, ms));
  const clear = window.setTimeout(() => {
    const w = window as unknown as { __yjPreInput?: Store };
    if (w.__yjPreInput) for (const k of Object.keys(w.__yjPreInput)) delete w.__yjPreInput[k];
  }, 1500);
  return () => [...timers, clear].forEach((t) => window.clearTimeout(t));
}
