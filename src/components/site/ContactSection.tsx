import { MapPin, MessageCircle, Mail, Circle, Clock, ShieldCheck, Sparkles, Heart } from "lucide-react";
import studioImg from "@/assets/4253.jpg.asset.json";
import outdoorImg from "@/assets/dji_0014.jpg.asset.json";
import { useLang } from "@/lib/language";
import { SmartConsultation } from "./SmartConsultation";
import { SOCIAL, STUDIO_ADDRESSES } from "@/lib/social";

const studios = [
  {
    title: STUDIO_ADDRESSES.studio1.name,
    address: STUDIO_ADDRESSES.studio1.full,
    img: studioImg.url,
    tags: ["Premium Indoor Studio", "Private Sessions", "Therapeutic Yoga"],
    mapHref: SOCIAL.googleMapsStudio1,
    embed: SOCIAL.googleMapsEmbedStudio1,
  },
  {
    title: STUDIO_ADDRESSES.studio2.name,
    address: STUDIO_ADDRESSES.studio2.full,
    img: outdoorImg.url,
    tags: ["Outdoor Wellness Space", "Community Programs", "Corporate Wellness"],
    mapHref: SOCIAL.googleMapsStudio2,
    embed: SOCIAL.googleMapsEmbedStudio2,
  },
];

// Zalo brand icon (inline SVG — lucide has no Zalo mark).
function ZaloIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2C6.5 2 2 5.9 2 10.7c0 2.6 1.4 5 3.7 6.6-.2 1-.7 2.5-1.6 3.5-.2.2 0 .5.3.5 1.9-.1 3.6-.9 4.7-1.7 1 .2 2 .4 2.9.4 5.5 0 10-3.9 10-8.7C22 5.9 17.5 2 12 2zm-4.5 11H6V8h1.5v5zm5.5 0h-1.3l-2.3-3v3H8V8h1.4l2.3 3V8H13v5zm3.5 0H15c-.6 0-1-.4-1-1V8h1.5v3.5H17V13zm3.7-1.4c0 .9-.7 1.6-1.6 1.6s-1.6-.7-1.6-1.6.7-1.6 1.6-1.6 1.6.7 1.6 1.6z"/>
    </svg>
  );
}

export function ContactSection() {
  const { t } = useLang();

  return (
    <section className="section-pad relative overflow-hidden">
      {/* ambient bg */}
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-[0.07]" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 14%, transparent), transparent 70%)", animation: "breathe 16s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold-soft) 10%, transparent), transparent 70%)", animation: "breathe 20s ease-in-out infinite reverse" }} />

      <div className="container-luxe relative">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="eyebrow justify-center"><span className="h-px w-10 bg-primary" />{t.contact.eyebrow}<span className="h-px w-10 bg-primary" /></p>
          <h2 className="mt-5 fluid-title mx-auto max-w-[14ch]">{t.contact.title}</h2>
          <p className="mt-5 mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{t.contact.sub}</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[0.6rem] uppercase tracking-[0.24em] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
              <Circle className="relative h-2 w-2 fill-primary text-primary" />
            </span>
            WhatsApp & Zalo replies usually within 5 minutes
          </div>
        </div>

        <div id="consultation" className="grid gap-6 lg:grid-cols-5 lg:items-stretch">
          {/* LEFT — Luxury WhatsApp Panel (40%) */}
          <aside className="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--gold)]/25 bg-gradient-to-br from-black/70 via-black/55 to-[color-mix(in_oklab,var(--gold)_8%,transparent)] p-7 sm:p-9 lg:col-span-2 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 22%, transparent), transparent 70%)" }} />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(37,211,102,0.18), transparent 70%)" }} />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-1 text-[0.55rem] uppercase tracking-[0.26em] text-[#25D366]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366]/70" />
                  <Circle className="relative h-2 w-2 fill-[#25D366] text-[#25D366]" />
                </span>
                Online · Replies within 5 min
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#25D366]/40 bg-gradient-to-br from-[#25D366]/30 to-[#128C7E]/30 shadow-[0_0_40px_rgba(37,211,102,0.25)]">
                  <MessageCircle className="h-7 w-7 text-[#25D366]" />
                </div>
                <div>
                  <div className="text-[0.6rem] uppercase tracking-[0.24em] text-primary">Direct Line</div>
                  <div className="font-display text-lg leading-tight">Master Anil Choudhary</div>
                </div>
              </div>

              <h3 className="mt-6 font-display text-3xl leading-tight sm:text-4xl">Speak directly with Master Anil.</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A short, private conversation to understand your goals and recommend the right practice for your body and life.
              </p>

              <div className="mt-6 grid gap-2.5">
                {[
                  { Icon: Clock, t: "Average response · under 5 minutes" },
                  { Icon: Sparkles, t: "Personalized guidance · no scripts" },
                  { Icon: ShieldCheck, t: "Private & confidential consultation" },
                  { Icon: Heart, t: "12+ years guiding 1000+ students" },
                ].map(({ Icon, t }) => (
                  <div key={t} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-2.5">
                    <Icon className="h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                    <span className="text-xs text-foreground/85">{t}</span>
                  </div>
                ))}
              </div>

              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_50px_-12px_rgba(37,211,102,0.55)] transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <a
                href={SOCIAL.zalo}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on Zalo"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0068FF] to-[#0043A8] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_50px_-12px_rgba(0,104,255,0.55)] transition-transform hover:scale-[1.02]"
              >
                <ZaloIcon className="h-4 w-4" /> Chat on Zalo
              </a>
              <p className="mt-3 text-center text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                +84 782 046 066
              </p>
            </div>
          </aside>

          {/* RIGHT — Smart Consultation form (60%) */}
          <div className="lg:col-span-3">
            <SmartConsultation />
          </div>
        </div>

        {/* Studios — each with its own embedded Google Map */}
        <div className="mt-14">
          <div className="mb-6 flex flex-col gap-3">
            <div className="eyebrow"><span className="h-px w-8 bg-primary" />Visit our studios</div>
            <h3 className="font-display text-3xl sm:text-4xl">Yoga studios in Hai Duong City, Vietnam</h3>
            <p className="text-sm text-muted-foreground">Two serene spaces. One transformative journey.</p>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[0.55rem] uppercase tracking-[0.22em] text-primary">
              <Circle className="h-2 w-2 fill-primary text-primary" />
              Daily · 5:30 AM – 8:00 PM
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {studios.map((studio, idx) => (
              <div key={studio.title} className="group relative overflow-hidden rounded-[1.5rem] border border-[color:var(--gold)]/25 bg-card/30 transition-all hover:border-primary/40">
                <a href={studio.mapHref} target="_blank" rel="noopener noreferrer" aria-label={`Open ${studio.title} in Google Maps`}
                  className="relative block h-64 w-full overflow-hidden">
                  <iframe title={`${studio.title} location on Google Maps`}
                    src={studio.embed}
                    className="pointer-events-none h-full w-full grayscale-[0.6] contrast-[1.05] transition-all duration-700 group-hover:grayscale-0"
                    loading="lazy"
                    style={{ filter: "grayscale(0.6) contrast(1.05) brightness(0.8) sepia(0.1)" }} />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--onyx)_20%,transparent)_0%,transparent_40%,color-mix(in_oklab,var(--onyx)_80%,transparent)_100%)]" />
                  <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-[color:var(--gold)]/40 bg-black/60 px-3 py-1 text-[0.55rem] uppercase tracking-[0.26em] text-[color:var(--gold)] backdrop-blur">
                    Studio {idx + 1}
                  </div>
                </a>
                <div className="p-5">
                  <div className="flex gap-4">
                    <img src={studio.img} alt="" className="h-20 w-24 shrink-0 rounded-[0.9rem] object-cover" loading="lazy" />
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-lg leading-tight">{studio.title}</div>
                      <div className="mt-1.5 flex items-start gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-primary/70" />
                        <span>{studio.address}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {studio.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/8 px-2.5 py-0.5 text-[0.55rem] uppercase tracking-[0.2em] text-[color:var(--gold)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/50 pt-3">
                    <a href={studio.mapHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.22em] text-primary hover:text-foreground transition-colors">
                      Open in Google Maps →
                    </a>
                    <a href="/gallery" className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary transition-colors">
                      View Studio Gallery →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { Icon: MessageCircle, title: "WhatsApp", body: SOCIAL.phone, href: SOCIAL.whatsapp },
              { Icon: ZaloIcon, title: "Zalo", body: SOCIAL.phone, href: SOCIAL.zalo },
              { Icon: Mail, title: "Email", body: SOCIAL.email, href: `mailto:${SOCIAL.email}` },
            ].map(({ Icon, title, body, href }) => (
              <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                className="glass-soft rounded-[1rem] p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40">
                <Icon className="h-4 w-4 text-primary" />
                <div className="mt-2 text-sm">{title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{body}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
