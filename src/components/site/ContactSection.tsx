import { useState } from "react";
import { MapPin, MessageCircle, Phone, Mail, Send, CheckCircle2, Circle } from "lucide-react";
import { z } from "zod";
import studioImg from "@/assets/4253.jpg.asset.json";
import outdoorImg from "@/assets/dji_0014.jpg.asset.json";
import { useLang } from "@/lib/language";

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name"),
  phone: z.string().trim().min(6, "Please share a valid phone number"),
  goal: z.string().trim().min(2, "Please share your goal"),
  message: z.string().trim().max(1000).optional().default(""),
});

type Values = z.infer<typeof schema>;
const WHATSAPP = "84000000000";

const studios = [
  { title: "Studio One", body: "An urban sanctuary in Hai Duong for private and refined group practice.", img: studioImg.url },
  { title: "Studio Two", body: "A second space for community classes and elevated student experiences.", img: outdoorImg.url },
];

export function ContactSection() {
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [sent, setSent] = useState(false);
  const { t } = useLang();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Partial<Record<keyof Values, string>> = {};
      parsed.error.issues.forEach((i) => { next[i.path[0] as keyof Values] = i.message; });
      setErrors(next); return;
    }
    setErrors({});
    const message = encodeURIComponent(`Hello Yog Jivan,%0A%0AName: ${parsed.data.name}%0APhone: ${parsed.data.phone}%0AGoal: ${parsed.data.goal}%0A%0AMessage: ${parsed.data.message}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${message}`, "_blank", "noreferrer");
    setSent(true);
  };

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

        <div className="overflow-hidden rounded-[1.75rem] border border-border/70">
          <iframe title="Yog Jivan Hai Duong location"
            src="https://www.google.com/maps?q=Hai+Duong,+Vietnam&output=embed"
            className="h-[260px] w-full grayscale md:h-[340px]" loading="lazy" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {studios.map((studio) => (
                <div key={studio.title} className="group relative overflow-hidden rounded-[1.25rem] border border-border/70">
                  <img src={studio.img} alt="" className="h-[140px] w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,color-mix(in_oklab,var(--onyx)_88%,transparent))]" />
                  <div className="absolute inset-x-3 bottom-3">
                    <div className="font-display text-lg">{studio.title}</div>
                    <div className="text-[0.55rem] uppercase tracking-[0.24em] text-primary">Hai Duong</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { Icon: MessageCircle, title: "WhatsApp", body: "Instant booking", href: `https://wa.me/${WHATSAPP}` },
                { Icon: Phone, title: "Phone", body: "+84 000 000 000", href: "tel:+84000000000" },
                { Icon: Mail, title: "Email", body: "hello@yogjivan.com", href: "mailto:hello@yogjivan.com" },
                { Icon: MapPin, title: "Studios", body: "Hai Duong, Vietnam", href: "https://maps.google.com/?q=Hai+Duong,+Vietnam" },
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

          <form onSubmit={onSubmit} className="glass-luxe relative rounded-[1.75rem] p-6 sm:p-8">
            {sent && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-[1.75rem] bg-background/92 p-8 text-center backdrop-blur-xl">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <h3 className="text-3xl">Namaste.</h3>
                <p className="max-w-sm text-sm text-muted-foreground">Your WhatsApp booking is ready to send.</p>
                <button type="button" className="btn-ghost-gold" onClick={() => setSent(false)}>Send another</button>
              </div>
            )}
            <h3 className="text-2xl sm:text-3xl">{t.contact.formTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.contact.note}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" error={errors.name} placeholder="Your full name" />
              <Field label="Phone" name="phone" error={errors.phone} placeholder="+84 ..." />
              <div className="sm:col-span-2">
                <Field label="Goal" name="goal" error={errors.goal} placeholder="Flexibility, therapy, stress..." />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">Message</label>
                <textarea name="message" rows={4} placeholder="Tell us about your practice..." className="mt-2 w-full rounded-[1rem] border border-border bg-card/35 px-4 py-3 text-sm outline-none focus:border-primary/50" />
              </div>
            </div>
            <button type="submit" className="btn-gold mt-6 w-full">
              {t.contact.submit} <Send className="h-4 w-4" />
            </button>
          </form>
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
