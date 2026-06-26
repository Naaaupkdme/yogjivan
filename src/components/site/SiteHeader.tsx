import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Facebook, Globe2, Instagram, Menu, MessageCircle, Palette, X, Youtube } from "lucide-react";
import logo from "@/assets/yog_jivan_logo_gold.png.asset.json";
import { useLang, type ThemeName } from "@/lib/language";

const NAV = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/programs", key: "programs" },
  { to: "/online", key: "online" },
  { to: "/corporate", key: "corporate" },
  { to: "/gallery", key: "gallery" },
  { to: "/contact", key: "contact" },
] as const;

const THEMES: { id: ThemeName; label: string }[] = [
  { id: "midnight", label: "Midnight Luxury" },
  { id: "earth", label: "Wellness Earth" },
  { id: "ivory", label: "Ivory Sanctuary" },
];

const WHATSAPP = "https://wa.me/84782046066?text=Hello%20Yog%20Jivan%2C%20I%27d%20like%20to%20book%20a%20free%20trial.";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { location } = useRouterState();
  const { lang, setLang, theme, setTheme, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setThemeOpen(false); }, [location.pathname]);

  const labelMap = useMemo(() => ({
    home: t.nav.home, about: t.nav.about, programs: t.nav.programs,
    online: t.nav.online, corporate: t.nav.corporate, gallery: t.nav.gallery, contact: t.nav.contact,
  }), [t]);

  const shell = scrolled || open
    ? "bg-[color-mix(in_oklab,var(--onyx)_62%,transparent)] backdrop-blur-2xl backdrop-saturate-150 border border-[color-mix(in_oklab,var(--gold)_22%,transparent)] shadow-[0_18px_60px_-30px_color-mix(in_oklab,var(--gold)_45%,transparent)]"
    : "bg-transparent border border-transparent";

  return (
    <header className="fixed inset-x-0 top-0 z-50 safe-pt pointer-events-none" style={{ height: "var(--hdr-h,72px)" }}>
      <style>{`:root{--hdr-h:72px}@media(min-width:1024px){:root{--hdr-h:92px}}`}</style>
      <div className="container-luxe h-full pt-2 sm:pt-3 pointer-events-none">
        <div className={`pointer-events-auto grid h-[calc(var(--hdr-h,72px)-0.75rem)] grid-cols-[minmax(0,1fr)_auto] items-center rounded-full px-3 sm:px-4 transition-[background,border,box-shadow] duration-500 ${shell}`}>
          <Link to="/" className="flex min-w-0 items-center gap-3 group" aria-label="Yog Jivan home">
            <img src={logo.url} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover sm:h-13 sm:w-13 lg:h-14 lg:w-14 ring-1 ring-[color-mix(in_oklab,var(--gold)_30%,transparent)] transition-transform duration-500 group-hover:scale-105" style={{height:'3rem',width:'3rem'}} />
            <div className="min-w-0 hidden sm:block">
              <div className="truncate font-display text-[1.35rem] lg:text-[1.5rem] leading-tight tracking-tight">Yog Jivan</div>
              <div className="truncate text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">Sanctuary</div>
            </div>
          </Link>


          <div className="hidden xl:flex items-center justify-center gap-7 absolute left-1/2 -translate-x-1/2">
            <nav className="flex items-center gap-7">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative text-[0.66rem] uppercase tracking-[0.24em] text-muted-foreground transition-all duration-300 hover:text-foreground hover:-translate-y-0.5"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {labelMap[item.key]}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="hidden md:flex items-center overflow-hidden rounded-full border border-border/60">
              {(["EN", "VI"] as const).map((item) => (
                <button key={item} onClick={() => setLang(item)}
                  className={`px-2.5 py-1.5 text-[0.6rem] uppercase tracking-[0.22em] transition-colors ${lang === item ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                  {item}
                </button>
              ))}
            </div>

            <div className="relative hidden sm:block">
              <button onClick={() => setThemeOpen((v) => !v)}
                className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition-all hover:text-primary hover:border-primary/40"
                aria-label="Theme switcher">
                <Palette className="h-3.5 w-3.5" />
              </button>
              {themeOpen && (
                <div className="glass-luxe absolute right-0 top-12 w-56 rounded-2xl p-2 pointer-events-auto">
                  {THEMES.map((option) => (
                    <button key={option.id} onClick={() => { setTheme(option.id); setThemeOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm ${theme === option.id ? "bg-primary/12 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}>
                      <span>{option.label}</span>
                      {theme === option.id ? <span className="text-[0.58rem] uppercase tracking-[0.24em]">Live</span> : null}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition-all hover:text-primary hover:border-primary/40"
              aria-label="WhatsApp">
              <MessageCircle className="h-3.5 w-3.5" />
            </a>

            <Link to="/contact" className="btn-gold hidden md:inline-flex !min-h-[2.25rem] !py-2 !px-4 !text-[0.62rem]">
              {t.nav.book}
            </Link>

            <button onClick={() => setOpen((v) => !v)}
              className="relative grid h-9 w-9 place-items-center rounded-full border border-border/60 xl:hidden transition-colors hover:border-primary/40"
              aria-label="Open menu">
              <span className={`absolute h-px w-4 bg-foreground transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px w-4 bg-foreground transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute h-px w-4 bg-foreground transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </div>

        <div className={`pointer-events-auto overflow-hidden transition-[max-height,opacity] duration-500 xl:hidden ${open ? "max-h-[85svh] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="pt-3">
            <div className="glass-luxe rounded-[1.5rem] p-4 safe-pb">
              <nav className="grid gap-1">
                {NAV.map((item) => (
                  <Link key={item.to} to={item.to}
                    className="rounded-xl px-4 py-3 text-[0.74rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    activeProps={{ className: "bg-primary/12 text-primary" }}
                    activeOptions={{ exact: item.to === "/" }}>
                    {labelMap[item.key]}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 grid gap-3 border-t border-border/60 pt-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-card/30 p-3">
                  <div className="mb-3 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground"><Globe2 className="h-3.5 w-3.5" /> Language</div>
                  <div className="flex items-center overflow-hidden rounded-full border border-border bg-background/30">
                    {(["EN", "VI"] as const).map((item) => (
                      <button key={item} onClick={() => setLang(item)} className={`flex-1 px-3 py-2 text-[0.6rem] uppercase tracking-[0.18em] ${lang === item ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>{item}</button>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-card/30 p-3">
                  <div className="mb-3 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground"><Palette className="h-3.5 w-3.5" /> Theme</div>
                  <div className="grid gap-2">
                    {THEMES.map((option) => (
                      <button key={option.id} onClick={() => setTheme(option.id)}
                        className={`rounded-xl px-3 py-2 text-left text-xs ${theme === option.id ? "bg-primary/12 text-primary" : "bg-background/30 text-muted-foreground"}`}>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-ghost-gold w-full">WhatsApp</a>
                <Link to="/contact" className="btn-gold w-full">{t.nav.freeTrial}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
