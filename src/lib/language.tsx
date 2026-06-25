import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "EN" | "VI";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "EN",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("EN");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("yj_lang") as Lang | null;
      if (saved === "EN" || saved === "VI") setLangState(saved);
    } catch {}
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("yj_lang", l); } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = l === "VI" ? "vi" : "en";
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
