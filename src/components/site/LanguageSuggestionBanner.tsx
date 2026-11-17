import { useEffect, useState } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { LANG_STORAGE_KEY, viCounterpart } from "@/lib/locale-routes";
import { Globe, X } from "lucide-react";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

export function LanguageSuggestionBanner() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [suggestionTarget, setSuggestionTarget] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      // 1. Saved manual choice always wins
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved) return;

      // 2. If dismissed in this session, do not prompt again
      if (sessionStorage.getItem("yj_lang_suggest_dismissed")) return;

      // 3. Check if current route has a valid Vietnamese counterpart
      const counterpart = viCounterpart(pathname);
      if (!counterpart) return;

      // 4. Read country hint from verified platform edge signal (via yj_edge_country cookie)
      const edgeCountry = getCookie("yj_edge_country");

      // 5. Check if visitor's device languages include Vietnamese
      const userLangs = navigator.languages || [navigator.language || ""];
      const prefersVi = userLangs.some((l) => l.toLowerCase().startsWith("vi"));

      // Suggest Vietnamese if visitor has vi browser language OR edge indicates Vietnam ("VN").
      // Other visitors (including India "IN") default to English when no Vietnamese preference exists.
      if (prefersVi || edgeCountry === "VN") {
        setSuggestionTarget(counterpart);
      }
    } catch {}
  }, [pathname]);

  if (!suggestionTarget || dismissed) return null;

  const handleSwitchToVi = () => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, "VI");
    } catch {}
    setDismissed(true);
    // Preserve query parameters and known anchor destinations
    const currentHash = window.location.hash;
    const targetWithQuery = `${suggestionTarget}${window.location.search}${currentHash}`;
    router.history.push(targetWithQuery);
  };

  const handleKeepEn = () => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, "EN");
    } catch {}
    setDismissed(true);
  };

  const handleClose = () => {
    try {
      sessionStorage.setItem("yj_lang_suggest_dismissed", "1");
    } catch {}
    setDismissed(true);
  };

  return (
    <aside
      aria-label="Language suggestion"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-2xl border border-[color:var(--gold)]/40 bg-[color:var(--onyx)]/95 p-4 shadow-2xl backdrop-blur-md md:bottom-6 md:left-6 md:right-auto"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full bg-[color:var(--gold)]/15 p-2 text-[color:var(--gold)]">
          <Globe className="h-4 w-4" />
        </div>
        <div className="flex-1 pr-6">
          <p className="text-sm font-medium text-foreground">
            Bạn muốn xem trang này bằng tiếng Việt?
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Yog Jivan cung cấp bản dịch tiếng Việt đầy đủ cho dịch vụ này.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSwitchToVi}
              className="rounded-lg bg-[color:var(--gold)] px-3 py-1.5 text-xs font-semibold text-background transition-opacity hover:opacity-90"
            >
              Xem tiếng Việt
            </button>
            <button
              type="button"
              onClick={handleKeepEn}
              className="rounded-lg border border-border/60 bg-muted/20 px-3 py-1.5 text-xs font-medium text-foreground/85 transition-colors hover:bg-muted/40"
            >
              Giữ tiếng Anh
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Đóng gợi ý ngôn ngữ"
          className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
