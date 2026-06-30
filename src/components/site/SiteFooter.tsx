import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, MessageCircle, MapPin, Mail, Phone, Star } from "lucide-react";
import { SOCIAL } from "@/lib/social";
import communityA from "@/assets/img_20260621_105308.jpg.asset.json";
import communityB from "@/assets/img_20260622_114016.jpg.asset.json";
import communityC from "@/assets/img_5066.jpg.asset.json";
import communityD from "@/assets/dji_0014.jpg.asset.json";
import logo from "@/assets/yog_jivan_logo_gold.png.asset.json";
import { useLang } from "@/lib/language";

const QUOTES = [
  { text: "In stillness, we remember who we are.", source: "Yog Jivan" },
];

const TRUST_STRIP = [
  { value: "12+", label: "Years Experience" },
  { value: "1000+", label: "Students" },
  { value: "4.9★", label: "Google Rating" },
  { value: "Global", label: "International Community" },
];

export function SiteFooter() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const qi = 0;
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

        <div className="grid gap-8 border-b border-border/60 pb-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="" className="h-11 w-11 rounded-full object-cover" />
              <div>
                <div className="font-display text-xl">Yog Jivan</div>
                <div className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">Sanctuary</div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Rooted in tradition. Refined for modern life.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 text-primary fill-primary" />
              <span>4.9 Google · 1000+ lives transformed</span>
            </div>
            <div className="mt-5 flex items-center gap-2">
              {[
                { href: "https://wa.me/84782046066", Icon: MessageCircle, label: "WhatsApp" },
                { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
                { href: "https://facebook.com", Icon: Facebook, label: "Facebook" },
                { href: "https://youtube.com", Icon: Youtube, label: "YouTube" },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/40 text-muted-foreground transition-all hover:text-primary hover:border-primary/40 hover:-translate-y-0.5">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="eyebrow mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/programs" className="hover:text-foreground">Programs</Link></li>
              <li><Link to="/online" className="hover:text-foreground">Online</Link></li>
              <li><Link to="/corporate" className="hover:text-foreground">Corporate</Link></li>
              <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4">Sanctuary</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>Hai Duong, Vietnam</span></li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href="tel:+84782046066" className="hover:text-foreground">+84 782 046 066</a></li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href="mailto:hello@yogjivan.com" className="hover:text-foreground">hello@yogjivan.com</a></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4">@yogjivan</h4>
            <div className="grid grid-cols-4 gap-2">
              {[communityA, communityC, communityD, communityB].map((img, i) => (
                <a key={i} href="https://instagram.com" target="_blank" rel="noreferrer" className="group overflow-hidden rounded-lg border border-border/60">
                  <img src={img.url} alt="" loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
          <p className="uppercase tracking-[0.28em]">Rooted in tradition. Refined for modern life.</p>
        </div>
      </div>
    </footer>
  );
}
