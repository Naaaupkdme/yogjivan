import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, MessageCircle, MapPin, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-white/5 bg-[color:var(--onyx)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/40 to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,oklch(0.755_0.105_80/0.10),transparent_70%)] blur-3xl" />

      <div className="container-luxe relative grid gap-14 py-20 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)]/50">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-[color:var(--gold)]" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="12" cy="12" r="10" /><path d="M12 6c2 3 2 6 0 9-2-3-2-6 0-9z" />
              </svg>
            </span>
            <span className="font-display text-2xl text-gold-gradient">Yog Jivan</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A sanctuary for body, mind and spirit. Authentic yoga, therapeutic healing and holistic wellness — led by Master Anil Choudhary in Hai Duong, Vietnam.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {[
              { href: "https://wa.me/84000000000", Icon: MessageCircle, label: "WhatsApp" },
              { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
              { href: "https://facebook.com", Icon: Facebook, label: "Facebook" },
              { href: "https://youtube.com", Icon: Youtube, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-[color:var(--gold)]/60 hover:text-[color:var(--gold)]">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Explore</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[["/about","About"],["/programs","Programs"],["/personal-training","Personal Training"],["/online","Online Yoga"],["/corporate","Corporate Wellness"]].map(([to,label]) => (
              <li key={to}><Link to={to} className="transition-colors hover:text-[color:var(--gold)]">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-5">Discover</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[["/gallery","Gallery"],["/testimonials","Stories"],["/blog","Journal"],["/contact","Contact"]].map(([to,label]) => (
              <li key={to}><Link to={to} className="transition-colors hover:text-[color:var(--gold)]">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Sanctuary</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" /><span>Two premium studios<br/>Hai Duong, Vietnam</span></li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" /><a href="tel:+84000000000" className="hover:text-foreground">+84 000 000 000</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" /><a href="mailto:hello@yogjivan.com" className="hover:text-foreground">hello@yogjivan.com</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Yog Jivan. All rights reserved.</p>
          <p className="tracking-[0.25em] uppercase">Crafted with stillness</p>
        </div>
      </div>
    </footer>
  );
}
