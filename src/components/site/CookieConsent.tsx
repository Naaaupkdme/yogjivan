import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import {
  readConsent,
  writeConsent,
  getConsent,
  CONSENT_EVENT,
  OPEN_SETTINGS_EVENT,
  type Consent,
} from "@/lib/analytics";

export { getConsent, CONSENT_EVENT, OPEN_SETTINGS_EVENT };

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [prefs, setPrefs] = useState<Consent>({ analytics: false, marketing: false });
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = readConsent();
    setPrefs({ analytics: stored.analytics, marketing: stored.marketing });
    if (!stored.decided) setOpen(true);
    const onOpen = () => {
      const current = readConsent();
      setPrefs({ analytics: current.analytics, marketing: current.marketing });
      setSettings(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && readConsent().decided) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, settings]);

  // Reserve real bottom space while the banner is visible so it can never cover
  // form fields or a submit button — the page simply scrolls a little further.
  useEffect(() => {
    const el = panelRef.current;
    if (!open || !el || typeof document === "undefined") return;
    const apply = () => {
      document.body.style.setProperty("--consent-h", `${Math.ceil(el.offsetHeight) + 24}px`);
      document.body.classList.add("consent-open");
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.body.classList.remove("consent-open");
      document.body.style.removeProperty("--consent-h");
    };
  }, [open, settings]);

  const decide = (next: Consent) => {
    writeConsent(next);
    setPrefs(next);
    setSettings(false);
    setOpen(false);
  };

  if (!open) return null;


  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-6 sm:pb-6"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 92px)" }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="mx-auto max-w-4xl rounded-2xl border border-[color:var(--gold)]/30 bg-background/95 p-3 shadow-2xl outline-none backdrop-blur-xl sm:p-5 md:mb-0"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <div className="flex items-start gap-3 md:flex-1">
            <span className="mt-0.5 hidden h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 sm:grid">
              <Cookie className="h-4 w-4 text-[color:var(--gold)]" />
            </span>
            <p className="text-[0.78rem] leading-snug text-foreground/90 sm:text-sm sm:leading-relaxed">
              <span className="hidden sm:inline">
                We use essential cookies to run this site, and — only with your permission — analytics and
                marketing cookies to understand traffic and measure our ads. See our{" "}
              </span>
              <span className="sm:hidden">
                We use essential cookies. Analytics and marketing cookies only with your permission. See our{" "}
              </span>
              <Link to="/privacy" className="text-[color:var(--gold)] underline-offset-4 hover:underline">Privacy Policy</Link>.
            </p>
          </div>
          <div className="grid flex-shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <button
              type="button"
              onClick={() => setSettings((s) => !s)}
              aria-expanded={settings}
              className="min-h-[40px] rounded-full border border-white/15 bg-transparent px-3 py-2 text-[0.76rem] font-medium text-foreground transition-colors hover:border-[color:var(--gold)]/60 sm:min-w-[110px] sm:px-4 sm:py-2.5 sm:text-sm"
            >
              Cookie Settings
            </button>
            <button
              type="button"
              onClick={() => decide({ analytics: false, marketing: false })}
              className="min-h-[40px] rounded-full border border-[color:var(--gold)]/40 bg-transparent px-3 py-2 text-[0.76rem] font-medium text-foreground transition-colors hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)]/10 sm:min-w-[110px] sm:px-4 sm:py-2.5 sm:text-sm"
            >
              Reject Non-Essential
            </button>
            <button
              type="button"
              onClick={() => decide({ analytics: true, marketing: true })}
              className="col-span-2 min-h-[40px] rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/15 px-3 py-2 text-[0.76rem] font-medium text-foreground transition-colors hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)]/25 sm:col-span-1 sm:min-w-[110px] sm:px-4 sm:py-2.5 sm:text-sm"
            >
              Accept All
            </button>
          </div>
        </div>


        {settings && (
          <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
            <Row
              title="Strictly necessary"
              desc="Required for the site, forms and your cookie choice to work. Always on."
              checked
              disabled
            />
            <Row
              title="Analytics"
              desc="Google Analytics 4 — anonymous page and CTA statistics. No names, numbers, emails or health notes are ever sent."
              checked={prefs.analytics}
              onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
            />
            <Row
              title="Marketing"
              desc="Meta Pixel — measures which ads bring students to us. Blocked entirely until you allow it."
              checked={prefs.marketing}
              onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
            />
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => decide(prefs)}
                className="rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-[color:var(--gold)]/20"
              >
                Save my choices
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  title, desc, checked, disabled, onChange,
}: {
  title: string; desc: string; checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 flex-shrink-0 accent-[color:var(--gold)] disabled:opacity-60"
      />
      <span>
        <span className="font-medium text-foreground">{title}</span>
        <span className="block text-xs leading-relaxed text-muted-foreground">{desc}</span>
      </span>
    </label>
  );
}
