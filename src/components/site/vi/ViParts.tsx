import { ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import { STUDIO_LIST, STUDIO_HOURS } from "@/lib/facts/locations";
import { CONTACT } from "@/lib/facts/contact";
import { PUBLIC_TRUST } from "@/lib/facts/trust";

/**
 * Lightweight, reusable Vietnamese page furniture.
 * All facts come from the central fact modules — never re-typed here.
 */

export function ViHero({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="section-y pt-32 md:pt-40">
      <div className="container-luxe max-w-4xl">
        <p className="eyebrow">
          <span className="h-px w-10 bg-[color:var(--gold)]" />
          {eyebrow}
        </p>
        <h1
          className="mt-4 font-display leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
        >
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/85">{lead}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={primary.href} className="btn-gold min-h-[44px]">
            {primary.label}
          </a>
          {secondary && (
            <a
              href={secondary.href}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-gold min-h-[44px]"
            >
              {secondary.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function ViSection({
  id,
  heading,
  children,
}: {
  id?: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section-tight">
      <div className="container-luxe max-w-4xl">
        <h2 className="font-display leading-tight" style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)" }}>
          {heading}
        </h2>
        <div className="mt-5 grid gap-4 text-sm leading-relaxed text-foreground/85">{children}</div>
      </div>
    </section>
  );
}

export function ViTrustStrip() {
  const items = [
    { k: PUBLIC_TRUST.yearsTeaching, v: "năm giảng dạy yoga" },
    { k: PUBLIC_TRUST.studentsTaught, v: "học viên đã được hướng dẫn" },
    { k: PUBLIC_TRUST.countries, v: "quốc gia có học viên" },
  ];
  return (
    <section className="section-tight">
      <div className="container-luxe">
        <div className="grid gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <div key={item.v} className="glass-soft rounded-2xl border border-white/10 p-5 text-center">
              <div className="font-display text-3xl text-gold-gradient">{item.k}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.16em] text-foreground/70">{item.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ViStudioCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {STUDIO_LIST.map((s) => (
        <div key={s.id} className="glass-soft rounded-2xl border border-white/10 p-6">
          <h3 className="font-display text-xl leading-tight">{s.name}</h3>
          <p className="mt-3 flex items-start gap-2 text-sm text-foreground/85">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
            <span>{s.full}</span>
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-foreground/85">
            <Clock className="h-4 w-4 shrink-0 text-[color:var(--gold)]" />
            Thứ Hai – Thứ Bảy · {STUDIO_HOURS.opens} – {STUDIO_HOURS.closes} (Chủ Nhật nghỉ)
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-foreground/85">
            <Phone className="h-4 w-4 shrink-0 text-[color:var(--gold)]" />
            <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-[color:var(--gold)]">
              {CONTACT.phoneDisplay}
            </a>
          </p>
          {s.aerialYoga && (
            <p className="mt-2 text-sm text-foreground/70">Có lớp Aerial Yoga tại cơ sở này.</p>
          )}
          <a
            href={s.googleMaps}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[color:var(--gold)]"
          >
            Xem trên Google Maps <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      ))}
    </div>
  );
}

export function ViEnquiryCTA({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <section className="section-tight">
      <div className="container-luxe">
        <div className="glass-luxe rounded-[1.75rem] border border-[color:var(--gold)]/35 p-7 md:p-10">
          <h2 className="font-display leading-tight" style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)" }}>
            {heading}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/85">{body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-cta-location="vi_page_whatsapp"
              className="btn-gold min-h-[44px]"
            >
              Nhắn WhatsApp
            </a>
            <a
              href={CONTACT.zalo}
              target="_blank"
              rel="noreferrer"
              data-cta-location="vi_page_zalo"
              className="btn-ghost-gold min-h-[44px]"
            >
              Nhắn Zalo
            </a>
            <a href={`tel:${CONTACT.phoneTel}`} className="btn-ghost-gold min-h-[44px]">
              Gọi {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const VI_NAV = [
  { to: "/vi", label: "Trang chủ Tiếng Việt" },
  { to: "/vi/yoga-hai-duong", label: "Lớp Yoga tại Hải Dương" },
  { to: "/vi/lop-yoga-online", label: "Lớp Yoga Online Trực Tiếp" },
  { to: "/vi/yoga-1-kem-1-online", label: "Yoga 1 Kèm 1 Online" },
];

/** Compact Vietnamese in-page navigation — prevents orphan VI routes. */
export function ViPageNav({ current }: { current: string }) {
  const items = VI_NAV.filter((i) => i.to !== current);
  return (
    <section className="section-tight">
      <div className="container-luxe max-w-4xl">
        <h2 className="font-display text-lg leading-tight">Khám phá thêm</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className="flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-foreground/85 transition-colors hover:border-[color:var(--gold)]/40 hover:text-[color:var(--gold)]"
            >
              {item.label}
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </a>
          ))}
          <a
            href="/"
            className="flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-foreground/70 transition-colors hover:border-[color:var(--gold)]/40 hover:text-[color:var(--gold)]"
            hrefLang="en"
          >
            English website
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
