import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/language";

const NAV = [
  { to: "/", en: "Home", vi: "Trang chủ" },
  { to: "/about", en: "About", vi: "Giới thiệu" },
  { to: "/programs", en: "Programs", vi: "Khóa học" },
  { to: "/online", en: "Online Yoga", vi: "Yoga Online" },
  { to: "/corporate", en: "Corporate", vi: "Doanh nghiệp" },
  { to: "/gallery", en: "Gallery", vi: "Thư viện" },
  { to: "/contact", en: "Contact", vi: "Liên hệ" },
] as const;

const WHATSAPP = "https://wa.me/84000000000?text=Hello%20Yog%20Jivan%2C%20I%27d%20like%20to%20book%20a%20free%20trial.";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const { lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 safe-pt transition-all duration-500 ${
        scrolled || open ? "glass-header" : ""
      }`}
      style={{ height: "var(--hdr-h, 64px)" }}
    >
      <style>{`:root{--hdr-h:64px}@media(min-width:1024px){:root{--hdr-h:80px}}`}</style>
      <div className="container-luxe flex h-full items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Yog Jivan home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--gold)]/50">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[color:var(--gold)]" fill="none" stroke="currentColor" strokeWidth="1.3">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6c2 3 2 6 0 9-2-3-2-6 0-9z" />
            </svg>
          </span>
          <span className="font-display text-[1.05rem] tracking-wide text-gold-gradient leading-none">Yog Jivan</span>
        </Link>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="group relative text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {lang === "VI" ? n.vi : n.en}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Lang switcher */}
          <div className="hidden sm:flex items-center text-[0.65rem] uppercase tracking-[0.18em] rounded-full border border-white/10 overflow-hidden">
            {(["EN", "VI"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1.5 transition-colors ${lang === l ? "bg-[color:var(--gold)]/15 text-[color:var(--gold)]" : "text-muted-foreground hover:text-foreground"}`}
                aria-label={`Switch to ${l}`}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-[color:var(--gold)]/50 hover:text-[color:var(--gold)]"
          >
            <MessageCircle className="h-4 w-4" />
          </a>

          <Link to="/contact" className="btn-gold hidden md:inline-flex !py-2.5 !px-4 text-[0.68rem]">
            {lang === "VI" ? "Học thử miễn phí" : "Book Free Trial"}
          </Link>

          <button
            aria-label="Open menu"
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-white/10 text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[88vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-luxe pb-5 pt-3">
          <div className="glass-luxe rounded-2xl p-4">
            <ul className="grid gap-1.5">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="block rounded-xl px-4 py-3 text-[0.78rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    activeProps={{ className: "bg-[color:var(--gold)]/10 text-[color:var(--gold)]" }}
                    activeOptions={{ exact: n.to === "/" }}
                  >
                    {lang === "VI" ? n.vi : n.en}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center text-[0.65rem] uppercase tracking-[0.18em] rounded-full border border-white/10 overflow-hidden">
                {(["EN", "VI"] as const).map((l) => (
                  <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 ${lang === l ? "bg-[color:var(--gold)]/15 text-[color:var(--gold)]" : "text-muted-foreground"}`}>{l}</button>
                ))}
              </div>
              <Link to="/contact" className="btn-gold !py-2.5 !px-4 text-[0.68rem]">
                {lang === "VI" ? "Học thử" : "Free Trial"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
