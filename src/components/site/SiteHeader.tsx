import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Globe2, Menu, MessageCircle, Palette, X } from "lucide-react";
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

const WHATSAPP = "https://wa.me/84000000000?text=Hello%20Yog%20Jivan%2C%20I%27d%20like%20to%20book%20a%20free%20trial.";

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

  useEffect(() => {
    setOpen(false);
    setThemeOpen(false);
  }, [location.pathname]);

  const labelMap = useMemo(() => ({
    home: t.nav.home,
    about: t.nav.about,
    programs: t.nav.programs,
    online: t.nav.online,
    corporate: t.nav.corporate,
    gallery: t.nav.gallery,
    contact: t.nav.contact,
  }), [t]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 safe-pt" style={{ height: "var(--hdr-h,64px)" }}>
      <style>{`:root{--hdr-h:64px}@media(min-width:1024px){:root{--hdr-h:80px}}`}</style>
      <div className="container-luxe h-full pt-2 sm:pt-3">
        <div className={`glass-soft grid h-[calc(var(--hdr-h,64px)-0.75rem)] grid-cols-[minmax(0,1fr)_auto] items-center rounded-full px-3 sm:px-4 ${scrolled || open ? "shadow-[var(--shadow-luxe)]" : ""}`}>
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Yog Jivan home">
              <img src={logo.url} alt="Yog Jivan logo" className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10" />
              <div className="min-w-0">
                <div className="truncate font-display text-[1rem] sm:text-[1.15rem]">Yog Jivan</div>
                <div className="truncate text-[0.58rem] uppercase tracking-[0.24em] text-muted-foreground">Circle of Unity</div>
              </div>
            </Link>
          </div>

          <div className="hidden xl:flex items-center justify-center gap-7">
            <nav className="flex items-center gap-6">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {labelMap[item.key]}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="hidden md:flex items-center overflow-hidden rounded-full border border-border bg-card/30">
              {(["EN", "VI"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setLang(item)}
                  className={`px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] transition-colors ${lang === item ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label={`Switch to ${item}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="relative hidden sm:block">
              <button
                onClick={() => setThemeOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/30 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Theme switcher"
              >
                <Palette className="h-4 w-4" />
              </button>
              {themeOpen && (
                <div className="glass-luxe absolute right-0 top-12 w-56 rounded-2xl p-2">
                  {THEMES.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => { setTheme(option.id); setThemeOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm ${theme === option.id ? "bg-primary/12 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}
                    >
                      <span>{option.label}</span>
                      {theme === option.id ? <span className="text-[0.6rem] uppercase tracking-[0.24em]">Live</span> : null}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/30 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>

            <Link to="/contact" className="btn-gold hidden md:inline-flex">
              {t.nav.book}
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/30 xl:hidden"
              aria-label="Open menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className={`overflow-hidden transition-[max-height,opacity] duration-500 xl:hidden ${open ? "max-h-[85svh] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="pt-3">
            <div className="glass-luxe rounded-[1.5rem] p-4 safe-pb">
              <nav className="grid gap-1">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-xl px-4 py-3 text-[0.76rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    activeProps={{ className: "bg-primary/12 text-primary" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {labelMap[item.key]}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 grid gap-3 border-t border-border/60 pt-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-card/30 p-3">
                  <div className="mb-3 flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                    <Globe2 className="h-3.5 w-3.5" /> Language
                  </div>
                  <div className="flex items-center overflow-hidden rounded-full border border-border bg-background/30">
                    {(["EN", "VI"] as const).map((item) => (
                      <button key={item} onClick={() => setLang(item)} className={`flex-1 px-3 py-2 text-[0.62rem] uppercase tracking-[0.18em] ${lang === item ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>{item}</button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border/70 bg-card/30 p-3">
                  <div className="mb-3 flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                    <Palette className="h-3.5 w-3.5" /> Theme
                  </div>
                  <div className="grid gap-2">
                    {THEMES.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setTheme(option.id)}
                        className={`rounded-xl px-3 py-2 text-left text-sm ${theme === option.id ? "bg-primary/12 text-primary" : "bg-background/30 text-muted-foreground"}`}
                      >
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
