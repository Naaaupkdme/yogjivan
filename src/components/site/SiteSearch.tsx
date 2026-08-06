import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { BodyPortal } from "@/components/site/BodyPortal";
import { FALLBACK_LINKS, POPULAR_SEARCHES, searchSite } from "@/lib/site-search";

const OPEN_EVENT = "yj:open-search";

/** Opens the single shared search dialog from anywhere in the app. */
export function openSiteSearch() {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function SiteSearchButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openSiteSearch}
      aria-label="Search Yog Jivan"
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border/60 text-muted-foreground/90 transition-colors hover:border-[color:var(--gold)]/40 hover:text-[color:var(--gold)] ${className}`}
    >
      <Search className="h-4 w-4" strokeWidth={1.5} />
    </button>
  );
}

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const results = useMemo(() => searchSite(query, 8), [query]);

  useEffect(() => {
    const onOpen = () => {
      restoreRef.current = (document.activeElement as HTMLElement) ?? null;
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // Global shortcuts: "/" and Ctrl/Cmd+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing =
        !!el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "SELECT" ||
          el.isContentEditable);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        openSiteSearch();
        return;
      }
      if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        openSiteSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const close = () => {
    setOpen(false);
    setQuery("");
    restoreRef.current?.focus?.();
  };

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      const link = listRef.current?.querySelectorAll<HTMLAnchorElement>("a[data-result]")[active];
      if (link) {
        e.preventDefault();
        link.click();
      }
    } else if (e.key === "Tab") {
      // simple focus trap
      const focusables = document.querySelectorAll<HTMLElement>("[data-search-dialog] [data-focusable]");
      if (focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }
  };

  return (
    <BodyPortal>
    <div className="fixed inset-0 z-[90] h-[100dvh] min-h-screen w-screen" onKeyDown={onKeyDown} data-search-dialog>
      <button aria-label="Close search" onClick={close} className="absolute inset-0 bg-black/75 backdrop-blur-md" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search Yog Jivan"
        className="absolute left-1/2 top-[8vh] w-[min(94vw,42rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-[color:var(--gold)]/25 bg-[color-mix(in_oklab,var(--onyx)_97%,transparent)] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-[color:var(--gold)]" strokeWidth={1.5} />
          <input
            ref={inputRef}
            data-focusable
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search classes, topics, pricing or locations…"
            aria-label="Search classes, topics, pricing or locations"
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            data-focusable
            onClick={close}
            aria-label="Close search"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border/60 hover:border-primary/40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={listRef} className="max-h-[62vh] overflow-y-auto p-3">
          {!query.trim() && (
            <div>
              <div className="px-2 pb-2 text-[0.6rem] uppercase tracking-[0.28em] text-[color:var(--gold)]/80">
                Popular searches
              </div>
              <div className="flex flex-wrap gap-2 px-2 pb-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    data-focusable
                    onClick={() => setQuery(term)}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-foreground/85 transition-colors hover:border-[color:var(--gold)]/40 hover:text-[color:var(--gold)]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && results.length > 0 && (
            <>
              <div className="px-2 pb-2 text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                {results.length} result{results.length === 1 ? "" : "s"}
              </div>
              <div className="grid gap-1">
                {results.map((r, i) => (
                  <a
                    key={r.id}
                    data-result
                    data-focusable
                    href={r.href}
                    onClick={close}
                    onMouseEnter={() => setActive(i)}
                    className={`block rounded-xl px-3 py-2.5 transition-colors ${
                      i === active ? "bg-white/8" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-foreground">{r.title}</span>
                      <span className="shrink-0 text-[0.58rem] uppercase tracking-[0.2em] text-[color:var(--gold)]/80">
                        {r.category}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{r.description}</p>
                  </a>
                ))}
              </div>
            </>
          )}

          {query.trim() && results.length === 0 && (
            <div className="px-3 py-6">
              <p className="text-sm text-foreground">No results found for “{query}”</p>
              <p className="mt-2 text-xs text-muted-foreground">Try one of these instead:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {FALLBACK_LINKS.map((l) => (
                  <a
                    key={l.href}
                    data-focusable
                    href={l.href}
                    onClick={close}
                    className="rounded-full border border-[color:var(--gold)]/30 px-3 py-1.5 text-xs text-[color:var(--gold)] hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </BodyPortal>
  );
}
