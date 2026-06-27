import { MapPin, MessageCircle, Mail, Circle } from "lucide-react";
import studioImg from "@/assets/4253.jpg.asset.json";
import outdoorImg from "@/assets/dji_0014.jpg.asset.json";
import { useLang } from "@/lib/language";
import { SmartConsultation } from "./SmartConsultation";

const WHATSAPP = "84782046066";

const studios = [
  {
    title: "Yog Jivan Sanctuary",
    address: "Nguyen Trai Street, Hai Duong City, Vietnam",
    img: studioImg.url,
    tags: ["Premium Indoor Studio", "Private Sessions", "Therapeutic Yoga"],
    mapHref: "https://maps.google.com/?q=Nguyen+Trai+Hai+Duong+Vietnam",
  },
  {
    title: "Yog Jivan Wellness & Healing Center",
    address: "Tran Hung Dao Street, Hai Duong City, Vietnam",
    img: outdoorImg.url,
    tags: ["Outdoor Wellness Space", "Community Programs", "Corporate Wellness"],
    mapHref: "https://maps.google.com/?q=Tran+Hung+Dao+Hai+Duong+Vietnam",
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

        {/* Form first — single consolidated form */}
        <form onSubmit={onSubmit} className="glass-luxe relative mx-auto max-w-3xl rounded-[1.75rem] p-6 sm:p-10">
          {sent && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-[1.75rem] bg-background/92 p-8 text-center backdrop-blur-xl">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <h3 className="text-3xl">Namaste.</h3>
              <p className="max-w-sm text-sm text-muted-foreground">Your WhatsApp booking is ready to send.</p>
              <button type="button" className="btn-ghost-gold" onClick={() => setSent(false)}>Send another</button>
            </div>
          )}
          <h3 className="font-display text-3xl sm:text-4xl">{t.contact.formTitle}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t.contact.note}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" name="name" error={errors.name} placeholder="Your full name" />
            <Field label="Phone / WhatsApp" name="phone" error={errors.phone} placeholder="+84 ..." />
            <div className="sm:col-span-2">
              <Field label="Your Interest" name="goal" error={errors.goal} placeholder="Private session, therapeutic, retreat..." />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">Message (optional)</label>
              <textarea name="message" rows={4} placeholder="Tell us about your practice..." className="mt-2 w-full rounded-[1rem] border border-border bg-card/35 px-4 py-3 text-sm outline-none focus:border-primary/50" />
            </div>
          </div>
          <button type="submit" className="btn-gold mt-6 w-full">
            {t.contact.submit} <Send className="h-4 w-4" />
          </button>
          <p className="mt-3 text-center text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">Your information is secure and private.</p>
        </form>

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

function Field({ label, name, placeholder, error }: { label: string; name: string; placeholder: string; error?: string }) {
  return (
    <div>
      <label className="text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">{label}</label>
      <input name={name} placeholder={placeholder} className="mt-2 w-full rounded-[1rem] border border-border bg-card/35 px-4 py-3 text-sm outline-none focus:border-primary/50" />
      {error ? <p className="mt-1.5 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
