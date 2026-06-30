import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Menu, MessageCircle, X, Youtube } from "lucide-react";
import logo from "@/assets/yog_jivan_logo_gold.png.asset.json";
import { useLang } from "@/lib/language";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/about#studios", label: "Studios" },
  { href: "/#journey", label: "Journey" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

import { SOCIAL } from "@/lib/social";

const WHATSAPP = SOCIAL.whatsapp;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const { lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-[background,border,box-shadow] duration-500 ${
        scrolled || open
          ? "bg-[color-mix(in_oklab,var(--onyx)_88%,transparent)] backdrop-blur-2xl border-b border-[color-mix(in_oklab,var(--gold)_18%,transparent)] shadow-[0_18px_50px_-30px_color-mix(in_oklab,var(--gold)_45%,transparent)]"
          : "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--onyx)_55%,transparent),transparent)] border-b border-transparent"
      }`}
      style={{ height: "var(--hdr-h,70px)", paddingTop: "env(safe-area-inset-top,0px)" }}
    >
      <style>{`:root{--hdr-h:70px}@media(min-width:768px){:root{--hdr-h:80px}}@media(min-width:1024px){:root{--hdr-h:90px}}`}</style>

      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-6 px-6 md:px-10 lg:px-[80px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="Yog Jivan Sanctuary home">
          <img src={logo.url} alt="" className="h-12 w-12 md:h-14 md:w-14 lg:h-[60px] lg:w-[60px] rounded-full object-cover ring-1 ring-[color-mix(in_oklab,var(--gold)_40%,transparent)] shadow-[0_8px_24px_-10px_color-mix(in_oklab,var(--gold)_55%,transparent)] transition-transform duration-500 group-hover:scale-105" />
          <div className="hidden sm:block leading-none">
            <div className="font-display tracking-[0.24em] text-[1rem] lg:text-[1.15rem] uppercase text-gold-gradient">YOG JIVAN</div>
            <div className="font-display tracking-[0.4em] text-[0.58rem] lg:text-[0.65rem] uppercase text-muted-foreground mt-1.5">SANCTUARY</div>
          </div>
        </Link>

        {/* Centered nav */}
        <nav className="hidden xl:flex items-center gap-7">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}
              className="text-[0.68rem] uppercase tracking-[0.26em] text-muted-foreground transition-colors duration-300 hover:text-[color:var(--gold)]">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="hidden md:flex items-center overflow-hidden rounded-full border border-border/60">
            {(["EN", "VI"] as const).map((item) => (
              <button key={item} onClick={() => setLang(item)}
                className={`px-2.5 py-1.5 text-[0.6rem] uppercase tracking-[0.22em] transition-colors ${lang === item ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {item}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-1 border-l border-border/50 pl-2">
            {[
              { href: "https://facebook.com/yogjivan", Icon: Facebook, label: "Facebook" },
              { href: "https://instagram.com/yogjivan", Icon: Instagram, label: "Instagram" },
              { href: "https://youtube.com/@yogjivan", Icon: Youtube, label: "YouTube" },
              { href: WHATSAPP, Icon: MessageCircle, label: "WhatsApp" },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground/80 transition-all duration-300 hover:text-[color:var(--gold)] hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            ))}
          </div>

          <Link to="/contact" className="btn-gold hidden md:inline-flex !min-h-[2.4rem] !py-2 !px-5 !text-[0.62rem]">
            Book Free Trial
          </Link>

          <button onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 xl:hidden transition-colors hover:border-primary/40"
            aria-label="Open menu">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`xl:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${open ? "max-h-[85svh] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t border-border/60 bg-[color-mix(in_oklab,var(--onyx)_94%,transparent)] backdrop-blur-2xl">
          <nav className="mx-auto grid max-w-[1600px] gap-1 px-6 py-5 md:px-10">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3.5 text-[0.74rem] uppercase tracking-[0.24em] text-muted-foreground hover:bg-white/5 hover:text-foreground">
                {item.label}
              </a>
            ))}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-ghost-gold w-full">WhatsApp</a>
              <Link to="/contact" className="btn-gold w-full">Book Free Trial</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
