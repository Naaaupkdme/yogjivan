import { useState } from "react";
import { MapPin, MessageCircle, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import logo from "@/assets/yog_jivan_logo_gold.png.asset.json";
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
  {
    title: "Yog Jivan Studio One",
    body: "A premium urban sanctuary in Hai Duong for private work, therapeutic sessions, and refined group classes.",
  },
  {
    title: "Yog Jivan Studio Two",
    body: "A second space designed for community practice, events, and elevated student experiences.",
  },
];

export function ContactSection() {
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [sent, setSent] = useState(false);
  const { t } = useLang();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof Values, string>> = {};
      parsed.error.issues.forEach((issue) => {
        nextErrors[issue.path[0] as keyof Values] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const message = encodeURIComponent(
      `Hello Yog Jivan,%0A%0AName: ${parsed.data.name}%0APhone: ${parsed.data.phone}%0AGoal: ${parsed.data.goal}%0A%0AMessage: ${parsed.data.message}`,
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${message}`, "_blank", "noreferrer");
    setSent(true);
  };

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-luxe">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow"><span className="h-px w-10 bg-primary" />{t.contact.eyebrow}</p>
          <h2 className="mt-5 fluid-title max-w-[12ch]">{t.contact.title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{t.contact.sub}</p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-border/70">
          <iframe
            title="Yog Jivan Hai Duong location"
            src="https://www.google.com/maps?q=Hai+Duong,+Vietnam&output=embed"
            className="h-[22rem] w-full grayscale md:h-[28rem]"
            loading="lazy"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="grid gap-4">
            {studios.map((studio) => (
              <div key={studio.title} className="glass-soft rounded-[1.5rem] p-5">
                <div className="flex items-center gap-3">
                  <img src={logo.url} alt="Yog Jivan logo" className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div className="font-display text-xl">{studio.title}</div>
                    <div className="text-[0.62rem] uppercase tracking-[0.24em] text-primary">Hai Duong, Vietnam</div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{studio.body}</p>
              </div>
            ))}

            {[
              { Icon: MessageCircle, title: "WhatsApp booking", body: "Immediate personal response for consultations and trial sessions.", href: `https://wa.me/${WHATSAPP}` },
              { Icon: Phone, title: "Phone", body: "+84 000 000 000", href: "tel:+84000000000" },
              { Icon: Mail, title: "Email", body: "hello@yogjivan.com", href: "mailto:hello@yogjivan.com" },
              { Icon: MapPin, title: "Address", body: "Hai Duong City, Vietnam", href: "https://maps.google.com/?q=Hai+Duong,+Vietnam" },
            ].map(({ Icon, title, body, href }) => (
              <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="glass-soft rounded-[1.3rem] p-5 transition-colors hover:text-foreground">
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-3 text-lg">{title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{body}</div>
              </a>
            ))}
          </div>

          <form onSubmit={onSubmit} className="glass-luxe relative rounded-[2rem] p-6 sm:p-8">
            {sent && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-[2rem] bg-background/92 p-8 text-center backdrop-blur-xl">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <h3 className="text-3xl">Namaste.</h3>
                <p className="max-w-sm text-sm text-muted-foreground">Your WhatsApp booking request is ready to send.</p>
                <button type="button" className="btn-ghost-gold" onClick={() => setSent(false)}>Send another</button>
              </div>
            )}

            <h3 className="text-3xl">{t.contact.formTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.contact.note}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" error={errors.name} placeholder="Your full name" />
              <Field label="Phone" name="phone" error={errors.phone} placeholder="+84 ..." />
              <div className="sm:col-span-2">
                <Field label="Goal" name="goal" error={errors.goal} placeholder="Flexibility, therapy, stress relief..." />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[0.64rem] uppercase tracking-[0.24em] text-muted-foreground">Message</label>
                <textarea name="message" rows={5} placeholder="Tell us about your current practice or what you want to change..." className="mt-2 w-full rounded-[1.2rem] border border-border bg-card/35 px-4 py-3 text-sm outline-none" />
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
      <label className="text-[0.64rem] uppercase tracking-[0.24em] text-muted-foreground">{label}</label>
      <input name={name} placeholder={placeholder} className="mt-2 w-full rounded-[1.2rem] border border-border bg-card/35 px-4 py-3 text-sm outline-none" />
      {error ? <p className="mt-1.5 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
