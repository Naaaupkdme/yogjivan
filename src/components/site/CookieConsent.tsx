import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "yj_cookie_consent";
export const CONSENT_EVENT = "yj:consent-changed";
export const OPEN_SETTINGS_EVENT = "yj:open-cookie-settings";

export function getConsent(): "accepted" | "rejected" | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "rejected" ? v : null;
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show on first visit if no choice recorded
    if (getConsent() === null) setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen);
  }, []);

  const decide = (choice: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* storage disabled — silently continue */
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-[color:var(--gold)]/30 bg-background/95 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <div className="flex items-start gap-3 md:flex-1">
            <span className="mt-0.5 grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10">
              <Cookie className="h-4 w-4 text-[color:var(--gold)]" />
            </span>
            <p className="text-sm leading-relaxed text-foreground/90">
              We use cookies to improve your experience and understand site traffic. See our{" "}
              <Link to="/privacy" className="text-[color:var(--gold)] underline-offset-4 hover:underline">Privacy Policy</Link>{" "}
              for details.
            </p>
          </div>
          <div className="flex flex-shrink-0 gap-2">
            <button
              type="button"
              onClick={() => decide("rejected")}
              className="min-w-[110px] rounded-full border border-[color:var(--gold)]/40 bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)]/10"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="min-w-[110px] rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/15 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)]/25"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
