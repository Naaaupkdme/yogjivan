import { MapPin, MessageCircle, Mail, Circle, Clock, ShieldCheck, Sparkles, Heart } from "lucide-react";
import studioImg from "@/assets/4253.jpg.asset.json";
import outdoorImg from "@/assets/dji_0014.jpg.asset.json";
import { useLang } from "@/lib/language";
import { SmartConsultation } from "./SmartConsultation";
import { SOCIAL } from "@/lib/social";

const WHATSAPP = SOCIAL.whatsappE164;

const studios = [
  {
    title: "Yog Jivan Sanctuary",
    address: "Nguyen Trai Street, Hai Duong City, Vietnam",
    img: studioImg.url,
    tags: ["Premium Indoor Studio", "Private Sessions", "Therapeutic Yoga"],
    mapHref: SOCIAL.googleMaps,
  },
  {
    title: "Yog Jivan Wellness & Healing Center",
    address: "Tran Hung Dao Street, Hai Duong City, Vietnam",
    img: outdoorImg.url,
    tags: ["Outdoor Wellness Space", "Community Programs", "Corporate Wellness"],
    mapHref: SOCIAL.googleMaps,
  },
];

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
            WhatsApp replies usually within 5 minutes
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
                href={`https://wa.me/${WHATSAPP}?text=Hello%20Master%20Anil%2C%20I%27d%20like%20a%20personal%20consultation.`}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_50px_-12px_rgba(37,211,102,0.55)] transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
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


        {/* Studios + Map (50/50) */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4">
            <div className="eyebrow"><span className="h-px w-8 bg-primary" />Visit our studios</div>
            <h3 className="font-display text-3xl sm:text-4xl">Hai Duong City, Vietnam</h3>
            <p className="text-sm text-muted-foreground">Two serene spaces. One transformative journey.</p>
            <div className="mt-1 inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[0.55rem] uppercase tracking-[0.22em] text-primary">
              <Circle className="h-2 w-2 fill-primary text-primary" />
              Daily · 5:30 AM – 8:00 PM
            </div>
            <div className="mt-2 grid gap-4">
              {studios.map((studio, idx) => (
                <div key={studio.title} className="group relative overflow-hidden rounded-[1.25rem] border border-border/70 bg-card/30 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40">
                  <div className="flex gap-4">
                    <img src={studio.img} alt="" className="h-24 w-28 shrink-0 rounded-[0.9rem] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[0.55rem] uppercase tracking-[0.26em] text-primary">Studio {idx + 1}</div>
                      <div className="mt-1 font-display text-lg leading-tight">{studio.title}</div>
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
                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/50 pt-3">
                    <a href={studio.mapHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.22em] text-primary hover:text-foreground transition-colors">
                      Open in Google Maps →
                    </a>
                    <a href="/gallery" className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary transition-colors">
                      View Studio Gallery →
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {[
                { Icon: MessageCircle, title: "WhatsApp", body: "+84 782 046 066", href: `https://wa.me/${WHATSAPP}` },
                { Icon: Mail, title: "Email", body: "hello@yogjivan.com", href: "mailto:hello@yogjivan.com" },
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

          {/* Interactive map card */}
          <a href="https://maps.google.com/?q=Hai+Duong,+Vietnam" target="_blank" rel="noreferrer"
            className="group relative block overflow-hidden rounded-[1.75rem] border border-[color:var(--gold)]/30">
            <iframe title="Yog Jivan Hai Duong location"
              src="https://www.google.com/maps?q=Hai+Duong,+Vietnam&output=embed"
              className="pointer-events-none h-full min-h-[460px] w-full grayscale-[0.85] contrast-[1.05] transition-all duration-700 group-hover:grayscale-0" loading="lazy"
              style={{ filter: "grayscale(0.85) contrast(1.05) brightness(0.7) sepia(0.15)" }} />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--onyx)_30%,transparent)_0%,transparent_30%,color-mix(in_oklab,var(--onyx)_92%,transparent)_100%)]" />
            {/* Gold marker pin */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <span className="absolute inset-0 -m-3 rounded-full bg-[color:var(--gold)]/40 blur-xl animate-pulse" />
                <div className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-[color:var(--gold)] bg-black/70 shadow-[0_0_30px_color-mix(in_oklab,var(--gold)_70%,transparent)]">
                  <MapPin className="h-5 w-5 text-[color:var(--gold)]" fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5">
              <div>
                <div className="text-[0.55rem] uppercase tracking-[0.28em] text-primary">Hai Duong City</div>
                <div className="mt-1 font-display text-xl">Open in Google Maps →</div>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-full border border-[color-mix(in_oklab,var(--gold)_50%,transparent)] bg-[color-mix(in_oklab,var(--gold)_18%,transparent)] text-[color:var(--gold)] transition-transform duration-500 group-hover:scale-110">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
