import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, MessageCircle, MapPin, Mail, Phone, Star } from "lucide-react";
import communityA from "@/assets/img_20260621_105308.jpg.asset.json";
import communityB from "@/assets/img_20260622_114016.jpg.asset.json";
import logo from "@/assets/yog_jivan_logo_gold.png.asset.json";
import { useLang } from "@/lib/language";

export function SiteFooter() {
  const { t } = useLang();
  const [email, setEmail] = useState("");

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-border/60">
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-20" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[56rem] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_70%)] blur-3xl" />

      <div className="container-luxe relative py-14 md:py-18">
        <div className="grid gap-8 border-b border-border/60 pb-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="Yog Jivan logo" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <div className="font-display text-2xl">Yog Jivan</div>
                <div className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">Luxury wellness sanctuary</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              A transformational sanctuary where yoga, healing, luxury hospitality, and emotional depth meet in one world-class experience.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-primary" />
              <span>4.9 Google rating · 1000+ lives transformed</span>
            </div>
            <div className="mt-6 flex items-center gap-2">
              {[
                { href: "https://wa.me/84000000000", Icon: MessageCircle, label: "WhatsApp" },
                { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
                { href: "https://facebook.com", Icon: Facebook, label: "Facebook" },
                { href: "https://youtube.com", Icon: Youtube, label: "YouTube" },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/40 text-muted-foreground transition-colors hover:text-foreground">
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
              <li><Link to="/online" className="hover:text-foreground">Online Yoga</Link></li>
              <li><Link to="/corporate" className="hover:text-foreground">Corporate Wellness</Link></li>
              <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4">Sanctuary</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>2 premium studios in Hai Duong, Vietnam</span></li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href="tel:+84000000000" className="hover:text-foreground">+84 000 000 000</a></li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href="mailto:hello@yogjivan.com" className="hover:text-foreground">hello@yogjivan.com</a></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4">{t.footer.newsletter}</h4>
            <p className="text-sm text-muted-foreground">{t.footer.newsletterSub}</p>
            <form className="mt-4 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={(e) => e.preventDefault()}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="rounded-full border border-border bg-card/40 px-4 py-3 text-sm outline-none" />
              <button className="btn-gold">{t.footer.subscribe}</button>
            </form>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <img src={communityA.url} alt="Yog Jivan community celebration" className="aspect-[4/5] w-full rounded-2xl object-cover" loading="lazy" />
              <img src={communityB.url} alt="Yog Jivan students celebrating together" className="aspect-[4/5] w-full rounded-2xl object-cover" loading="lazy" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Yog Jivan. All rights reserved.</p>
          <p className="uppercase tracking-[0.28em]">Designed as a sanctuary, not a template</p>
        </div>
      </div>
    </footer>
  );
}
