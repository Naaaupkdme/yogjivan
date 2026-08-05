import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Menu, MessageCircle, X, Youtube } from "lucide-react";
import logo from "@/assets/yog_jivan_logo_gold.png.asset.json";
import { useLang } from "@/lib/language";
import { SOCIAL } from "@/lib/social";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs & Pricing" },
  { href: "/yoga-for-beginners", label: "For Beginners" },
  { href: "/online-yoga-classes", label: "Live Online Yoga" },
  { href: "/personal-training#private-online-yoga", label: "Private 1-on-1" },
  { href: "/about", label: "About Master Anil" },
  { href: "/contact", label: "Contact" },
];


const FULL_MENU: { group: string; items: { href: string; label: string }[] }[] = [
  {
    group: "Explore",
    items: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Master Anil" },
      { href: "/gallery", label: "Gallery" },
      { href: "/testimonials", label: "Testimonials" },
    ],
  },
  {
    group: "Programs",
    items: [
      { href: "/programs", label: "All Programs" },
      { href: "/personal-training", label: "Private & Personal Training" },
      { href: "/personal-training#private-online-yoga", label: "Private 1-on-1 Online Yoga" },
      { href: "/online-yoga-classes", label: "Online Yoga Classes" },
      { href: "/yoga-for-beginners", label: "Yoga for Beginners" },
      { href: "/yoga-for-back-pain", label: "Yoga for Back Pain" },
      { href: "/yoga-for-stress", label: "Yoga for Stress" },
      { href: "/yoga-for-weight-loss", label: "Yoga for Weight Loss" },
      { href: "/yoga-for-pcod", label: "Yoga for PCOD & PCOS" },
      { href: "/yoga-for-thyroid", label: "Yoga for Thyroid" },
      { href: "/period-safe-yoga", label: "Period-Safe Yoga" },
      { href: "/yoga-for-expats-in-vietnam", label: "Yoga for Expats in Vietnam" },
      { href: "/corporate", label: "Corporate Wellness" },
    ],
  },
  {
    group: "More",
    items: [
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact & Book" },
    ],
  },
];

const WHATSAPP = SOCIAL.whatsapp;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fullOpen, setFullOpen] = useState(false);
  const { location } = useRouterState();
  const { lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setFullOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (fullOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [fullOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-[background,border,box-shadow] duration-500 ${
        scrolled || menuOpen
          ? "bg-[color-mix(in_oklab,var(--onyx)_88%,transparent)] backdrop-blur-2xl border-b border-[color-mix(in_oklab,var(--gold)_18%,transparent)] shadow-[0_18px_50px_-30px_color-mix(in_oklab,var(--gold)_45%,transparent)]"
          : "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--onyx)_55%,transparent),transparent)] border-b border-transparent"
      }`}
      style={{ height: "var(--hdr-h,70px)", paddingTop: "env(safe-area-inset-top,0px)" }}
    >
      <style>{`:root{--hdr-h:70px}@media(min-width:768px){:root{--hdr-h:80px}}@media(min-width:1024px){:root{--hdr-h:90px}}`}</style>

      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-6 px-6 md:px-10 lg:px-[80px]">
        <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="Yog Jivan Sanctuary home">
          <img src={logo.url} alt="Yog Jivan Sanctuary logo" className="h-12 w-12 md:h-14 md:w-14 lg:h-[60px] lg:w-[60px] rounded-full object-cover ring-1 ring-[color-mix(in_oklab,var(--gold)_40%,transparent)] shadow-[0_8px_24px_-10px_color-mix(in_oklab,var(--gold)_55%,transparent)] transition-transform duration-500 group-hover:scale-105" />
          <div className="hidden sm:block leading-none">
            <div className="font-display tracking-[0.24em] text-[1rem] lg:text-[1.15rem] uppercase text-gold-gradient">YOG JIVAN</div>
            <div className="font-display tracking-[0.4em] text-[0.58rem] lg:text-[0.65rem] uppercase text-muted-foreground mt-1.5">SANCTUARY</div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-4 2xl:gap-6">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}
              className="whitespace-nowrap text-[0.62rem] 2xl:text-[0.66rem] uppercase tracking-[0.18em] 2xl:tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-[color:var(--gold)]">
              {item.label}
            </a>
          ))}
        </nav>

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
              { href: SOCIAL.facebook, Icon: Facebook, label: "Visit Yog Jivan Facebook" },
              { href: SOCIAL.instagram, Icon: Instagram, label: "Visit Yog Jivan Instagram" },
              { href: SOCIAL.youtube, Icon: Youtube, label: "Visit Yog Jivan YouTube" },
              { href: WHATSAPP, Icon: MessageCircle, label: "Open WhatsApp chat" },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground/80 transition-all duration-300 hover:text-[color:var(--gold)] hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            ))}
          </div>

          <Link to="/contact" hash="consultation" className="btn-gold hidden md:inline-flex !min-h-[2.4rem] !py-2 !px-5 !text-[0.62rem]">
            Book Free Trial
          </Link>

          {/* Full-menu hamburger — visible on all breakpoints */}
          <button onClick={() => setFullOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 transition-colors hover:border-primary/40"
            aria-label="Open full menu">
            <Menu className="h-4 w-4" />
          </button>

          {/* Legacy compact toggle for the top-nav on small screens */}
          <button onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 xl:hidden transition-colors hover:border-primary/40"
            aria-label="Open primary nav">
            {menuOpen ? <X className="h-4 w-4" /> : <span className="text-[0.55rem] uppercase tracking-[0.22em]">Nav</span>}
          </button>
        </div>
      </div>

      {/* Mobile primary-nav drawer */}
      <div className={`xl:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${menuOpen ? "max-h-[85svh] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t border-border/60 bg-[color-mix(in_oklab,var(--onyx)_94%,transparent)] backdrop-blur-2xl">
          <nav className="mx-auto grid max-w-[1600px] gap-1 px-6 py-5 md:px-10">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3.5 text-[0.74rem] uppercase tracking-[0.24em] text-muted-foreground hover:bg-white/5 hover:text-foreground">
                {item.label}
              </a>
            ))}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-ghost-gold w-full">WhatsApp</a>
              <Link to="/contact" hash="consultation" className="btn-gold w-full">Book Free Trial</Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Full-site menu overlay */}
      {fullOpen && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Full site menu">
          <button
            aria-label="Close menu"
            onClick={() => setFullOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-[color:var(--gold)]/25 bg-[color-mix(in_oklab,var(--onyx)_96%,transparent)] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between">
              <div className="font-display tracking-[0.24em] text-sm uppercase text-gold-gradient">Full Menu</div>
              <button onClick={() => setFullOpen(false)} aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-border/60 hover:border-primary/40">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-8 space-y-8">
              {FULL_MENU.map((group) => (
                <div key={group.group}>
                  <div className="text-[0.6rem] uppercase tracking-[0.28em] text-[color:var(--gold)]/80 mb-3">{group.group}</div>
                  <div className="grid gap-1">
                    {group.items.map((item) => (
                      <a key={item.href} href={item.href} onClick={() => setFullOpen(false)}
                        className="rounded-xl px-3 py-2.5 text-sm text-foreground/90 hover:bg-white/5 hover:text-[color:var(--gold)] transition-colors">
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-3">
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-ghost-gold w-full">Chat on WhatsApp</a>
              <a href="/contact#consultation" onClick={() => setFullOpen(false)} className="btn-gold w-full">Book Free Trial</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
