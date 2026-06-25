import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/personal-training", label: "Personal" },
  { to: "/online", label: "Online" },
  { to: "/corporate", label: "Corporate" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Stories" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

const WHATSAPP = "https://wa.me/84000000000?text=Hello%20Yog%20Jivan%2C%20I%27d%20like%20to%20book%20a%20free%20consultation.";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-header py-3" : "py-6"
      }`}
    >
      <div className="container-luxe flex items-center justify-between gap-6">
        <Link to="/" className="group flex items-center gap-3" aria-label="Yog Jivan home">
          <span className="relative grid h-10 w-10 place-items-center rounded-full border border-[color:var(--gold)]/50">
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(0.755_0.105_80/0.35),transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100" />
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-[color:var(--gold)]" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6c2 3 2 6 0 9-2-3-2-6 0-9z" />
              <path d="M7 14c2 1 4 1 5 0M17 14c-2 1-4 1-5 0" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-wide text-gold-gradient">Yog Jivan</span>
            <span className="mt-0.5 text-[0.55rem] uppercase tracking-[0.35em] text-muted-foreground">Yoga · Wellness · Transformation</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-7">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="group relative text-[0.78rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: WHATSAPP, Icon: MessageCircle, label: "WhatsApp" },
              { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
              { href: "https://facebook.com", Icon: Facebook, label: "Facebook" },
              { href: "https://youtube.com", Icon: Youtube, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-[color:var(--gold)]/50 hover:text-[color:var(--gold)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <Link to="/contact" className="btn-gold hidden sm:inline-flex !py-3 !px-5 text-[0.7rem]">
            Book Free Consultation
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen((s) => !s)}
            className="xl:hidden grid h-11 w-11 place-items-center rounded-full border border-white/10 text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`xl:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-luxe pb-6 pt-4">
          <div className="glass-luxe rounded-2xl p-5">
            <ul className="grid grid-cols-2 gap-3">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="block rounded-xl border border-white/5 px-4 py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-[color:var(--gold)]/40 hover:text-foreground"
                    activeProps={{ className: "border-[color:var(--gold)]/50 text-foreground" }}
                    activeOptions={{ exact: n.to === "/" }}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-gold mt-5 w-full">Book Free Consultation</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
