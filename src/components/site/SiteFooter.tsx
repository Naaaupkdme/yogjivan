import { waHref } from "@/lib/wa";
import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, MessageCircle, MapPin, Mail, Phone } from "lucide-react";
import { SOCIAL, STUDIO_ADDRESSES } from "@/lib/social";

import { ZaloIcon } from "@/components/icons/ZaloIcon";
import { isViPath } from "@/lib/locale-routes";
import { VI_NAV_ITEMS } from "@/lib/local-contact";
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
  const isVi = isViPath(pathname);
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
            <a href={isVi ? "/vi" : "/"} className="flex items-center gap-3" aria-label={isVi ? "Yog Jivan — trang chủ tiếng Việt" : "Yog Jivan home"}>
              <img src={logo.url} alt="Yog Jivan Sanctuary logo" className="h-11 w-11 rounded-full object-cover" />
              <div>
                <div className="font-display text-xl">Yog Jivan</div>
                <div className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">Sanctuary</div>
              </div>
            </a>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {isVi ? "Yoga Ấn Độ chính thống — tại Hải Dương và trực tuyến." : "Rooted in tradition. Refined for modern life."}
            </p>
            <a
              href={SOCIAL.googleMapsStudio1}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>{isVi ? "Xem Cơ sở 1 trên Google Maps →" : "View Studio 1 on Google Maps →"}</span>
            </a>
            <div className="mt-5 flex items-center gap-2">
              {[
                ...(isVi
                  ? [{ href: SOCIAL.zalo, Icon: ZaloIcon, label: "Nhắn Zalo cho Yog Jivan" }]
                  : [
                      { href: waHref("general"), Icon: MessageCircle, label: "Open WhatsApp chat" },
                      { href: SOCIAL.zalo, Icon: ZaloIcon, label: "Chat on Zalo" },
                    ]),
                { href: SOCIAL.instagram, Icon: Instagram, label: "Visit Yog Jivan Instagram" },
                { href: SOCIAL.facebook, Icon: Facebook, label: "Visit Yog Jivan Facebook" },
                { href: SOCIAL.youtube, Icon: Youtube, label: "Visit Yog Jivan YouTube" },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  data-cta-location={href === SOCIAL.zalo && isVi ? "vi_footer_zalo" : undefined}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/40 text-muted-foreground transition-all hover:text-primary hover:border-primary/40 hover:-translate-y-0.5">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="eyebrow mb-4">{isVi ? "Khám phá" : "Explore"}</h4>
            {isVi ? (
              <ul className="space-y-3 text-sm text-muted-foreground">
                {VI_NAV_ITEMS.map((i) => (
                  <li key={i.href}><a href={i.href} className="hover:text-foreground">{i.label}</a></li>
                ))}
                <li><a href="/" hrefLang="en" className="hover:text-foreground">English website</a></li>
              </ul>
            ) : (
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
              <li><Link to="/research/yoga-participation-statistics" className="hover:text-foreground">Research & Statistics</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact & Book</Link></li>
            </ul>
            )}
          </div>

          <div>
            <h4 className="eyebrow mb-4">{isVi ? "Liên hệ" : hideLocal ? "Contact" : "Sanctuary"}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {!hideLocal && (
                <>
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <a href={SOCIAL.googleMapsStudio1} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                      <span className="block text-[0.6rem] uppercase tracking-[0.22em] text-primary">{isVi ? "Cơ sở 1 · Yog Jivan Sanctuary" : "Studio 1 · Sanctuary"}</span>
                      <span className="mt-0.5 block">{STUDIO_ADDRESSES.studio1.full}</span>
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <a href={SOCIAL.googleMapsStudio2} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                      <span className="block text-[0.6rem] uppercase tracking-[0.22em] text-primary">{isVi ? "Cơ sở 2 · Yog Jivan Yoga Studio" : "Studio 2 · Yog Jivan Yoga Studio"}</span>
                      <span className="mt-0.5 block">{STUDIO_ADDRESSES.studio2.full}</span>
                    </a>
                  </li>
                  <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={`tel:${SOCIAL.phoneTel}`} className="hover:text-foreground">{SOCIAL.phone}</a></li>
                </>
              )}
              {!isVi && (
                <li className="flex gap-3"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={waHref("general")} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">WhatsApp {SOCIAL.phone}</a></li>
              )}
              <li className="flex gap-3"><ZaloIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={SOCIAL.zalo} target="_blank" rel="noopener noreferrer" data-cta-location={isVi ? "vi_footer_zalo" : undefined} className="hover:text-foreground">Zalo {SOCIAL.phone}</a></li>
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
              {isVi ? "Chính sách bảo mật" : "Privacy Policy"}
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("yj:open-cookie-settings"))}
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              {isVi ? "Cài đặt cookie" : "Cookie Settings"}
            </button>
            <p className="uppercase tracking-[0.28em]">Rooted in tradition. Refined for modern life.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
