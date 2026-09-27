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

export const CAPTURE_SCRIPT = `(function(){var s=window.__yjPreInput={};function r(e){if(window.__yjPreDone)return;var t=e.target;if(!t||!t.name||!t.form)return;if(t.type==="hidden"||t.type==="checkbox"||t.type==="radio"||t.type==="file"||t.type==="password")return;s[t.name]=t.value;}document.addEventListener("input",r,true);document.addEventListener("change",r,true);})();`;

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
export function replayPreHydrationInputs(store: Store): number {
  let restored = 0;
  for (const [name, value] of Object.entries(store)) {
    if (!value) continue;
    const fields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      `form [name="${CSS.escape(name)}"]`,
    );
    fields.forEach((el) => {
      if (el.value === "") {
        setNativeValue(el, value);
        restored++;
      }
    });
  }
  return restored;
}

/**
 * Snapshot what was typed before hydration, stop capturing, then keep
 * restoring emptied fields while lazily-hydrated sections finish (up to 10s).
 * Any real keystroke (trusted input event; focus-loss "change" events are ignored) in a field after this point hands it back to the visitor.
 */
let installed = false;

export function installPreHydrationReplay(): () => void {
  // Runs once per page load and owns its own 10s lifetime, so effect
  // re-runs (StrictMode, root remounts) cannot cancel the rescue early.
  if (installed) return () => {};
  installed = true;
  const w = window as unknown as { __yjPreInput?: Store; __yjPreDone?: boolean };
  const snapshot: Store = { ...(w.__yjPreInput ?? {}) };
  w.__yjPreDone = true;
  w.__yjPreInput = {};
  if (Object.keys(snapshot).length === 0) return () => {};
  const release = (e: Event) => {
    const t = e.target as HTMLInputElement | null;
    if (e.isTrusted && t?.name) delete snapshot[t.name];
  };
  document.addEventListener("input", release, true);
  replayPreHydrationInputs(snapshot);
  const iv = window.setInterval(() => replayPreHydrationInputs(snapshot), 200);
  const stop = window.setTimeout(cleanup, 10000);
  function cleanup() {
    window.clearInterval(iv);
    window.clearTimeout(stop);
    document.removeEventListener("input", release, true);
  }
  return () => {};
}
