import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { MessageCircle, MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";

const Schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(80),
  phone: z.string().trim().min(6, "Valid phone please").max(30),
  email: z.string().trim().email("Valid email please").max(160),
  country: z.string().trim().min(2).max(60),
  goal: z.string().trim().min(2).max(120),
  message: z.string().trim().max(1000).optional().default(""),
});
type FormValues = z.infer<typeof Schema>;

const WHATSAPP_NUMBER = "84000000000";

export function ContactSection() {
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd) as Record<string, string>;
    const parsed = Schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Partial<Record<keyof FormValues, string>> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as keyof FormValues] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    const v = parsed.data;
    const text = encodeURIComponent(
      `Hello Yog Jivan,\n\nName: ${v.name}\nPhone: ${v.phone}\nEmail: ${v.email}\nCountry: ${v.country}\nGoal: ${v.goal}\n\n${v.message}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noreferrer");
    setSent(true);
  };

  return (
    <section className="relative section-pad">
      <div className="container-luxe">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow">Begin the Conversation</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
              Reach the <span className="italic text-gold-gradient">studio</span>.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground md:text-lg">
              Share your intention. We'll respond personally — usually within a few hours — to design your path forward.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { Icon: MapPin, t: "Studio One — Hai Duong", d: "Le Thanh Nghi, Hai Duong City, Vietnam" },
                { Icon: MapPin, t: "Studio Two — Hai Duong", d: "Tran Hung Dao, Hai Duong City, Vietnam" },
                { Icon: Phone, t: "Call us", d: "+84 000 000 000", href: "tel:+84000000000" },
                { Icon: Mail, t: "Email", d: "hello@yogjivan.com", href: "mailto:hello@yogjivan.com" },
                { Icon: MessageCircle, t: "WhatsApp", d: "Instant reply, in your language", href: `https://wa.me/${WHATSAPP_NUMBER}` },
              ].map(({ Icon, t, d, href }) => (
                <a
                  key={t}
                  href={href ?? "#"}
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-[color:var(--charcoal)]/40 p-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--gold)]/40"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[color:var(--gold)]/30 text-[color:var(--gold)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-sm font-medium">{t}</div>
                    <div className="text-sm text-muted-foreground">{d}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Yog Jivan Hai Duong location"
                src="https://www.google.com/maps?q=Hai+Duong,+Vietnam&output=embed"
                className="h-64 w-full grayscale"
                loading="lazy"
              />
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={onSubmit}
            className="glass-luxe relative rounded-[2rem] p-8 md:p-10"
          >
            {sent && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-[2rem] bg-[color:var(--onyx)]/95 p-8 text-center backdrop-blur-md">
                <CheckCircle2 className="h-12 w-12 text-[color:var(--gold)]" />
                <h3 className="font-display text-3xl">Namaste.</h3>
                <p className="max-w-sm text-sm text-muted-foreground">Your message is on its way. We'll respond personally, very soon.</p>
                <button type="button" onClick={() => setSent(false)} className="btn-ghost-gold mt-2">Send another</button>
              </div>
            )}

            <h3 className="font-display text-2xl md:text-3xl">Book a free consultation</h3>
            <p className="mt-2 text-sm text-muted-foreground">All fields encrypted. We never share your details.</p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your full name" err={errors.name} />
              <Field label="Phone" name="phone" placeholder="+84 …" err={errors.phone} />
              <Field label="Email" name="email" type="email" placeholder="you@email.com" err={errors.email} />
              <Field label="Country" name="country" placeholder="Vietnam" err={errors.country} />
              <div className="sm:col-span-2">
                <Field label="Your goal" name="goal" placeholder="Flexibility, stress, transformation…" err={errors.goal} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Share anything that helps us prepare your session…"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[color:var(--onyx)]/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[color:var(--gold)]/60 focus:outline-none"
                />
              </div>
            </div>

            <button type="submit" className="btn-gold mt-8 w-full">
              Send via WhatsApp <Send className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Replies typically within hours</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder, err }: { label: string; name: string; type?: string; placeholder?: string; err?: string }) {
  return (
    <div>
      <label className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-xl border bg-[color:var(--onyx)]/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none ${
          err ? "border-destructive/60" : "border-white/10 focus:border-[color:var(--gold)]/60"
        }`}
      />
      {err && <p className="mt-1.5 text-xs text-destructive">{err}</p>}
    </div>
  );
}
