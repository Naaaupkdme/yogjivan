import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, MessageCircle, MapPin, Mail, Phone } from "lucide-react";
import { SOCIAL, STUDIO_ADDRESSES } from "@/lib/social";

function ZaloIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2C6.5 2 2 5.9 2 10.7c0 2.6 1.4 5 3.7 6.6-.2 1-.7 2.5-1.6 3.5-.2.2 0 .5.3.5 1.9-.1 3.6-.9 4.7-1.7 1 .2 2 .4 2.9.4 5.5 0 10-3.9 10-8.7C22 5.9 17.5 2 12 2zm-4.5 11H6V8h1.5v5zm5.5 0h-1.3l-2.3-3v3H8V8h1.4l2.3 3V8H13v5zm3.5 0H15c-.6 0-1-.4-1-1V8h1.5v3.5H17V13zm3.7-1.4c0 .9-.7 1.6-1.6 1.6s-1.6-.7-1.6-1.6.7-1.6 1.6-1.6 1.6.7 1.6 1.6z"/>
    </svg>
  );
}
import communityA from "@/assets/img_20260621_105308.jpg.asset.json";
import communityB from "@/assets/img_20260622_114016.jpg.asset.json";
import communityC from "@/assets/img_5066.jpg.asset.json";
import communityD from "@/assets/dji_0014.jpg.asset.json";
import logo from "@/assets/yog_jivan_logo_gold.png.asset.json";
import { useLang } from "@/lib/language";
import { PUBLIC_TRUST } from "@/lib/facts/trust";

const QUOTES = [
  { text: "In stillness, we remember who we are.", source: "Yog Jivan" },
];

const TRUST_STRIP = [
  { value: "12+", label: "Years Teaching" },
  { value: PUBLIC_TRUST.studentsTaught, label: "Students Guided" },
  { value: "20+", label: "Countries" },
  { value: "Global", label: "International Community" },
];

export function SiteFooter() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const qi = 0;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideLocal = pathname === "/online-yoga-classes";
  useEffect(() => {}, []);

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-border/60">
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-[0.08]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[56rem] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_70%)] blur-3xl" />

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/40"
            style={{
              left: `${(i * 53) % 100}%`,
              bottom: `${(i * 37) % 100}%`,
              animation: `float-y ${10 + (i % 6)}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container-luxe relative py-14 md:py-18">
        {/* meditation quote */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-3 flex items-center justify-center">
            <span className="relative inline-block h-4 w-4">
              <span className="absolute inset-0 rounded-full bg-primary/70 blur-md animate-pulse" />
              <span className="relative inline-block h-4 w-4 rounded-full bg-gradient-to-b from-primary to-primary/30" />
            </span>
          </div>
          <div className="relative h-20 sm:h-16">
            {QUOTES.map((q, i) => (
              <p key={i}
                className={`absolute inset-0 mx-auto max-w-2xl font-display text-lg italic leading-snug text-foreground/85 transition-opacity duration-1000 sm:text-xl ${i === qi ? "opacity-100" : "opacity-0"}`}>
                "{q.text}"
                <span className="mt-2 block text-[0.6rem] not-italic uppercase tracking-[0.28em] text-primary">— {q.source}</span>
              </p>
            ))}
          </div>
          <div className="gold-hairline mt-10 mx-auto max-w-md" />
        </div>

        <div className={`grid gap-8 border-b border-border/60 pb-10 ${hideLocal ? "lg:grid-cols-[1.2fr_0.9fr_0.9fr_1.1fr]" : "lg:grid-cols-[1.2fr_0.9fr_0.9fr_1.1fr]"}`}>
          <div>
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="Yog Jivan Sanctuary logo" className="h-11 w-11 rounded-full object-cover" />
              <div>
                <div className="font-display text-xl">Yog Jivan</div>
                <div className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">Sanctuary</div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Rooted in tradition. Refined for modern life.
            </p>
            <a
              href={SOCIAL.googleMapsStudio1}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>View Studio 1 on Google Maps →</span>
            </a>
            <div className="mt-5 flex items-center gap-2">
              {[
                { href: SOCIAL.whatsapp, Icon: MessageCircle, label: "Open WhatsApp chat" },
                { href: SOCIAL.zalo, Icon: ZaloIcon, label: "Chat on Zalo" },
                { href: SOCIAL.instagram, Icon: Instagram, label: "Visit Yog Jivan Instagram" },
                { href: SOCIAL.facebook, Icon: Facebook, label: "Visit Yog Jivan Facebook" },
                { href: SOCIAL.youtube, Icon: Youtube, label: "Visit Yog Jivan YouTube" },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/40 text-muted-foreground transition-all hover:text-primary hover:border-primary/40 hover:-translate-y-0.5">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="eyebrow mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/programs" className="hover:text-foreground">Programs</Link></li>
              <li><Link to="/online-yoga-classes" className="hover:text-foreground">Online</Link></li>
              <li><Link to="/yoga-for-beginners" className="hover:text-foreground">For Beginners</Link></li>
              <li><Link to="/yoga-for-back-pain" className="hover:text-foreground">Yoga for Back Pain</Link></li>
              <li><Link to="/yoga-for-stress" className="hover:text-foreground">Yoga for Stress</Link></li>
              <li><Link to="/yoga-for-weight-loss" className="hover:text-foreground">Yoga for Weight Loss</Link></li>
              <li><Link to="/yoga-for-pcod" className="hover:text-foreground">Yoga for PCOD & PCOS</Link></li>
              <li><Link to="/yoga-for-thyroid" className="hover:text-foreground">Yoga for Thyroid Health</Link></li>
              <li><Link to="/period-safe-yoga" className="hover:text-foreground">Period-Safe Yoga</Link></li>
              <li><Link to="/yoga-for-expats-in-vietnam" className="hover:text-foreground">Yoga for Expats</Link></li>
              <li><Link to="/corporate" className="hover:text-foreground">Corporate</Link></li>
              <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
              <li><Link to="/testimonials" className="hover:text-foreground">Testimonials</Link></li>
              <li><Link to="/blog" className="hover:text-foreground">Journal</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact & Book</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4">{hideLocal ? "Contact" : "Sanctuary"}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {!hideLocal && (
                <>
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <a href={SOCIAL.googleMapsStudio1} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                      <span className="block text-[0.6rem] uppercase tracking-[0.22em] text-primary">Studio 1 · Sanctuary</span>
                      <span className="mt-0.5 block">{STUDIO_ADDRESSES.studio1.full}</span>
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <a href={SOCIAL.googleMapsStudio2} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                      <span className="block text-[0.6rem] uppercase tracking-[0.22em] text-primary">Studio 2 · Yog Jivan Yoga Studio</span>
                      <span className="mt-0.5 block">{STUDIO_ADDRESSES.studio2.full}</span>
                    </a>
                  </li>
                  <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={`tel:${SOCIAL.phoneTel}`} className="hover:text-foreground">{SOCIAL.phone}</a></li>
                </>
              )}
              <li className="flex gap-3"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">WhatsApp {SOCIAL.phone}</a></li>
              <li className="flex gap-3"><ZaloIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={SOCIAL.zalo} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Zalo {SOCIAL.phone}</a></li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={`mailto:${SOCIAL.email}`} className="hover:text-foreground">{SOCIAL.email}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4">@yogjivan</h4>
            <div className="grid grid-cols-4 gap-2">
              {[communityA, communityC, communityD, communityB].map((img, i) => (
                <a key={i} href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit Yog Jivan Instagram" className="group overflow-hidden rounded-lg border border-border/60">
                  <img src={img.url} alt="Yog Jivan community moments on Instagram" loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Receive mindful insights, retreat updates and wellness inspiration.
            </p>
            <form className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={(e) => e.preventDefault()}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-full border border-border bg-card/40 px-4 py-2.5 text-sm outline-none focus:border-primary/50" />
              <button className="btn-gold !min-h-[2.5rem] !text-[0.6rem]">{t.footer.subscribe}</button>
            </form>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-8 grid grid-cols-2 gap-2 border-y border-border/40 py-5 sm:grid-cols-4 sm:gap-3">
          {TRUST_STRIP.map((t) => (
            <div key={t.label} className="text-center">
              <div className="font-display text-base leading-none text-gold-gradient sm:text-lg">{t.value}</div>
              <div className="mt-1 text-[0.55rem] uppercase tracking-[0.22em] text-muted-foreground">{t.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Yog Jivan. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/privacy" className="underline-offset-4 hover:text-foreground hover:underline">
              Privacy Policy
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("yj:open-cookie-settings"))}
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              Cookie Settings
            </button>
            <p className="uppercase tracking-[0.28em]">Rooted in tradition. Refined for modern life.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
