import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Facebook, Instagram, Menu, MessageCircle, Search, X, Youtube } from "lucide-react";
import logo from "@/assets/yog_jivan_logo_gold.png.asset.json";
import { isViPath, languageSwitchTarget } from "@/lib/locale-routes";
import { SOCIAL } from "@/lib/social";
import { CONTACT } from "@/lib/facts/contact";
import { ZaloIcon } from "@/components/icons/ZaloIcon";
import { VI_LABELS, VI_NAV_ITEMS } from "@/lib/local-contact";
import { SiteSearch, SiteSearchButton, openSiteSearch } from "@/components/site/SiteSearch";
import { BodyPortal } from "@/components/site/BodyPortal";



const NAV = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs & Pricing" },
  { href: "/yoga-for-beginners", label: "For Beginners" },
  { href: "/online-yoga-classes", label: "Online Yoga Classes" },
  { href: "/private-online-yoga", label: "Private Yoga" },
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
      { href: "/private-online-yoga", label: "Private & Personal Training" },
      { href: "/private-online-yoga", label: "Private 1-on-1 Online Yoga" },
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


/** Vietnamese full-menu structure — VI routes only, no English condition pages. */
const VI_FULL_MENU: { group: string; items: { href: string; label: string }[] }[] = [
  { group: "Yog Jivan", items: VI_NAV_ITEMS.map((i) => ({ href: i.href, label: i.label })) },
];



/**
 * Sitewide stacking hierarchy (single source of truth):
 *  40  floating CTAs (WhatsApp, consultation, mobile sticky bar)
 *  50  site header
 *  70  full-site menu overlay  <- portalled to <body>
 *  80  gallery lightbox / cookie banner
 *  90  search dialog
 */
const MENU_ID = "yj-full-menu";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [fullOpen, setFullOpen] = useState(false);
  const { location } = useRouterState();
  const langTargets = languageSwitchTarget(location.pathname);
  const isVi = isViPath(location.pathname);
  const activeLang: "EN" | "VI" = isVi ? "VI" : "EN";
  const navItems = isVi ? VI_NAV_ITEMS.map((i) => ({ href: i.href, label: i.label })) : NAV;
  const menuGroups = isVi ? VI_FULL_MENU : FULL_MENU;
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setFullOpen(false); }, [location.pathname]);

  // Scroll lock that preserves and restores the exact scroll position, plus a
  // body flag the floating CTAs use to step aside while the menu is open.
  useEffect(() => {
    if (!fullOpen) return;
    const y = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.dataset["menuOpen"] = "true";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      delete body.dataset["menuOpen"];
      window.scrollTo(0, y);
    };
  }, [fullOpen]);

  // Escape to close + focus trap + focus restoration.
  useEffect(() => {
    if (!fullOpen) return;
    const restoreTo = triggerRef.current;
    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    const t = window.setTimeout(() => focusables()[0]?.focus(), 20);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setFullOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      const activeEl = document.activeElement as HTMLElement | null;
      if (!panelRef.current?.contains(activeEl)) {
        e.preventDefault();
        first.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      restoreTo?.focus();
    };
  }, [fullOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-[background,border,box-shadow] duration-500 ${
        scrolled || fullOpen
          ? "bg-[color-mix(in_oklab,var(--onyx)_88%,transparent)] backdrop-blur-2xl border-b border-[color-mix(in_oklab,var(--gold)_18%,transparent)] shadow-[0_18px_50px_-30px_color-mix(in_oklab,var(--gold)_45%,transparent)]"
          : "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--onyx)_55%,transparent),transparent)] border-b border-transparent"
      }`}
      style={{ height: "var(--hdr-h,70px)", paddingTop: "env(safe-area-inset-top,0px)" }}
    >
      <style>{`:root{--hdr-h:70px}@media(min-width:768px){:root{--hdr-h:80px}}@media(min-width:1024px){:root{--hdr-h:90px}}`}</style>

      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 2xl:px-12">
        <a href={isVi ? "/vi" : "/"} className="flex min-w-0 items-center gap-3 group" aria-label={isVi ? "Yog Jivan — trang chủ tiếng Việt" : "Yog Jivan Sanctuary home"}>
          <img src={logo.url} alt="Yog Jivan Sanctuary logo" className="h-11 w-11 shrink-0 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full object-cover ring-1 ring-[color-mix(in_oklab,var(--gold)_40%,transparent)] shadow-[0_8px_24px_-10px_color-mix(in_oklab,var(--gold)_55%,transparent)] transition-transform duration-500 group-hover:scale-105" />
          <div className="hidden sm:block xl:hidden 2xl:block min-w-0 leading-none">
            <div className="truncate font-display tracking-[0.24em] text-[0.95rem] uppercase text-gold-gradient">YOG JIVAN</div>
            <div className="truncate font-display tracking-[0.4em] text-[0.55rem] uppercase text-muted-foreground mt-1.5">SANCTUARY</div>
          </div>
        </a>

        <nav className="hidden lg:flex min-w-0 items-center gap-3 xl:gap-5">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}
              className="whitespace-nowrap text-[0.6rem] xl:text-[0.64rem] uppercase tracking-[0.14em] xl:tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-[color:var(--gold)]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          {/* Language switch is URL-based: it navigates to the Vietnamese or
              English URL for the current page (or the closest equivalent).
              It never re-renders the same URL in another language. */}
          <div className="hidden md:flex shrink-0 items-center overflow-hidden rounded-full border border-border/60">
            {(
              [
                { code: "EN" as const, href: langTargets.en, hrefLang: "en" },
                { code: "VI" as const, href: langTargets.vi, hrefLang: "vi" },
              ]
            ).map((item) => (
              <a key={item.code} href={item.href} hrefLang={item.hrefLang}
                aria-current={activeLang === item.code ? "true" : undefined}
                className={`px-2 py-1.5 text-[0.58rem] uppercase tracking-[0.18em] transition-colors ${activeLang === item.code ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {item.code}
              </a>
            ))}
          </div>

          <SiteSearchButton className="h-8 w-8 sm:h-9 sm:w-9" />

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1 md:border-l md:border-border/50 md:pl-1.5">

            {[
              { href: SOCIAL.facebook, Icon: Facebook, label: "Visit Yog Jivan Facebook" },
              { href: SOCIAL.instagram, Icon: Instagram, label: "Visit Yog Jivan Instagram", loc: undefined },
              { href: SOCIAL.youtube, Icon: Youtube, label: "Visit Yog Jivan YouTube", loc: undefined },
              isVi
                ? { href: CONTACT.zalo, Icon: ZaloIcon, label: "Nhắn Zalo cho Yog Jivan", loc: "vi_header_zalo" }
                : { href: WHATSAPP, Icon: MessageCircle, label: "Open WhatsApp chat", loc: "header_whatsapp" },
            ].map(({ href, Icon, label, loc }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} data-cta-location={loc}
                className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground/80 transition-all duration-300 after:absolute after:left-1/2 after:top-1/2 after:h-11 after:w-11 after:-translate-x-1/2 after:-translate-y-1/2 after:content-[''] hover:text-[color:var(--gold)] hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] sm:h-8 sm:w-8">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {isVi ? (
            <a
              href={CONTACT.zalo}
              target="_blank"
              rel="noreferrer"
              data-cta-location="vi_header_zalo_cta"
              className="btn-gold hidden 2xl:inline-flex !min-h-[2.4rem] !py-2 !px-5 !text-[0.62rem]"
            >
              {VI_LABELS.chatLong}
            </a>
          ) : (
            <Link to="/contact" hash="consultation" className="btn-gold hidden 2xl:inline-flex !min-h-[2.4rem] !py-2 !px-5 !text-[0.62rem]">
              Book Free Trial
            </Link>
          )}

          {/* Single menu control at every width */}
          <button ref={triggerRef} onClick={() => setFullOpen(true)}
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border/60 transition-colors after:absolute after:left-1/2 after:top-1/2 after:h-11 after:w-11 after:-translate-x-1/2 after:-translate-y-1/2 after:content-['']  hover:border-primary/40"
            aria-haspopup="dialog"
            aria-expanded={fullOpen}
            aria-controls={MENU_ID}
            aria-label={isVi ? "Mở menu" : "Open full menu"}>
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Full-site menu overlay — portalled to <body> so the header's
          backdrop-filter containing block cannot clip it to the header strip. */}
      {fullOpen && (
        <BodyPortal>
          <div className="fixed inset-0 z-[70] h-[100dvh] min-h-screen w-screen yj-menu-overlay">
            <button
              aria-label="Close menu"
              tabIndex={-1}
              onClick={() => setFullOpen(false)}
              className="absolute inset-0 h-full w-full bg-black/75 backdrop-blur-md"
            />
            <div
              ref={panelRef}
              id={MENU_ID}
              role="dialog"
              aria-modal="true"
              aria-label="Full site menu"
              className="absolute right-0 top-0 flex h-full w-full max-w-full flex-col border-l border-[color:var(--gold)]/25 bg-[color-mix(in_oklab,var(--onyx)_97%,transparent)] backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] xl:max-w-md"
            >
              <div
                className="flex shrink-0 items-center justify-between border-b border-white/8 px-6 py-4 sm:px-8"
                style={{ paddingTop: "calc(env(safe-area-inset-top,0px) + 1rem)" }}
              >
                <div className="font-display tracking-[0.24em] text-sm uppercase text-gold-gradient">{isVi ? "Menu" : "Full Menu"}</div>
                <button onClick={() => setFullOpen(false)} aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border/60 hover:border-primary/40">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-8 pt-6 sm:px-8"
                style={{ WebkitOverflowScrolling: "touch", paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 2rem)" }}
              >
                <button
                  type="button"
                  onClick={() => { setFullOpen(false); openSiteSearch(); }}
                  className="flex w-full items-center gap-2 rounded-xl border border-white/10 px-3 py-3 text-sm text-foreground/90 transition-colors hover:border-[color:var(--gold)]/40 hover:text-[color:var(--gold)]"
                >
                  <Search className="h-4 w-4" strokeWidth={1.5} />
                  {isVi ? "Tìm kiếm" : "Search"}
                </button>

                {/* URL-based language switch (mobile / full menu). */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)]/80">Ngôn ngữ</span>
                  <div className="flex items-center overflow-hidden rounded-full border border-border/60">
                    {([
                      { code: "EN" as const, href: langTargets.en, hrefLang: "en" },
                      { code: "VI" as const, href: langTargets.vi, hrefLang: "vi" },
                    ]).map((item) => (
                      <a key={item.code} href={item.href} hrefLang={item.hrefLang}
                        onClick={() => setFullOpen(false)}
                        aria-current={activeLang === item.code ? "true" : undefined}
                        className={`px-3 py-2 text-[0.6rem] uppercase tracking-[0.18em] transition-colors ${activeLang === item.code ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                        {item.code}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-1">
                  {menuGroups.map((group) => (
                    <div key={group.group}>
                      <div className="text-[0.6rem] uppercase tracking-[0.28em] text-[color:var(--gold)]/80 mb-3">{group.group}</div>
                      <div className="grid gap-1">
                        {group.items.map((item) => (
                          <a key={item.href} href={item.href} onClick={() => setFullOpen(false)}
                            aria-current={location.pathname === item.href.split("#")[0] ? "page" : undefined}
                            className="rounded-xl px-3 py-3 text-sm text-foreground/90 hover:bg-white/5 hover:text-[color:var(--gold)] transition-colors aria-[current=page]:text-[color:var(--gold)] aria-[current=page]:bg-white/5">
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 grid gap-3">
                  {isVi ? (
                    <>
                      <a
                        href={CONTACT.zalo}
                        target="_blank"
                        rel="noreferrer"
                        data-cta-location="vi_menu_zalo"
                        aria-label="Nhắn tin cho đội ngũ Yog Jivan qua Zalo"
                        className="btn-gold w-full inline-flex items-center justify-center gap-2"
                      >
                        <ZaloIcon className="h-4 w-4" />
                        {VI_LABELS.chat}
                      </a>
                      <a href={`tel:${CONTACT.phoneTel}`} data-cta-location="vi_menu_call" className="btn-ghost-gold w-full">
                        {VI_LABELS.call} {CONTACT.phoneDisplay}
                      </a>
                    </>
                  ) : (
                    <>
                      <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-ghost-gold w-full">Chat on WhatsApp</a>
                      <a href="/contact#consultation" onClick={() => setFullOpen(false)} className="btn-gold w-full">Book Free Trial</a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </BodyPortal>
      )}

      <SiteSearch />
    </header>
  );
}


