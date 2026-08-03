import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { LuxuryImage } from "@/components/site/LuxuryImage";
import { SOCIAL } from "@/lib/social";
import {
  Award, Users, Globe2, CheckCircle2, Sparkles, MessageCircle,
  ShieldCheck, GraduationCap, Stethoscope, Quote,
} from "lucide-react";

const WA = SOCIAL.whatsapp;

export type QA = { q: string; answer: string; bullets: string[] };

export type RelatedLink = { to: string; label: string };

export type RelatedPost = { slug: string; title: string; cat: string; read: string };

export type TherapeuticPageProps = {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  answerCapsule: string;
  h1: string; // used as H2 in EEAT section header
  credentials: { icon: React.ComponentType<{ className?: string }>; label: string }[];
  questions: QA[];
  quote: { text: string; source: string };
  breatherImages: { src: string; alt: string; caption: string }[];
  cautionNote?: string;
  ctaTitle: string;
  ctaSub: string;
  relatedLinks: RelatedLink[];
  relatedPosts?: RelatedPost[];
  portrait: string;
  portraitAlt: string;
  masterIntro: React.ReactNode;
};

const TRUST_STATS = [
  { k: "12+", v: "Years Teaching" },
  { k: "1000+", v: "Students Guided" },
  { k: "20+", v: "Countries" },
  { k: "4.9★", v: "Google Rated" },
  { k: "Free", v: "First Consultation" },
];

function InlineCTA() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link to="/contact" hash="consultation" className="btn-gold">
        <Sparkles className="h-4 w-4" /> Book Free Consultation
      </Link>
      <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold">
        <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp Master Anil
      </a>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="eyebrow justify-center"><span className="h-px w-10 bg-primary" />{eyebrow}<span className="h-px w-10 bg-primary" /></p>
      <h2 className="mt-4 font-display leading-[1.12]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}>{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground leading-relaxed">{sub}</p>}
    </div>
  );
}

export function TherapeuticLanding(props: TherapeuticPageProps) {
  const {
    eyebrow, heroTitle, heroSub, answerCapsule, credentials, questions,
    quote, breatherImages, cautionNote, ctaTitle, ctaSub, relatedLinks,
    relatedPosts, portrait, portraitAlt, masterIntro,
  } = props;

  return (
    <>
      <PageHero eyebrow={eyebrow} title={heroTitle} sub={heroSub}>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link to="/contact" hash="consultation" className="btn-gold"><Sparkles className="h-4 w-4" /> Book Free Consultation</Link>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold">
            <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp Us
          </a>
        </div>
      </PageHero>

      {/* Trust strip */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
            {TRUST_STATS.map((t) => (
              <div key={t.v} className="glass-soft rounded-[0.9rem] px-3 py-3 text-center">
                <div className="font-display text-lg leading-none text-gold-gradient sm:text-xl">{t.k}</div>
                <div className="mt-1.5 text-[0.55rem] uppercase tracking-[0.22em] text-muted-foreground">{t.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Answer capsule */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="glass-luxe mx-auto max-w-4xl rounded-[2rem] border border-[color:var(--gold)]/25 p-6 md:p-10">
            <p className="text-base md:text-lg leading-relaxed text-foreground/90">{answerCapsule}</p>
          </div>
        </div>
      </section>

      {/* EEAT / Master Anil */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Your Teacher · E-E-A-T"
            title="Master Anil Choudhary"
            sub="Founder & Lead Yoga Teacher, Yog Jivan Sanctuary"
          />
          <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[2fr_3fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
              <LuxuryImage src={portrait} alt={portraitAlt} className="aspect-[4/5] w-full object-cover" />
            </div>
            <div>
              <div className="text-foreground/90 leading-relaxed space-y-4">{masterIntro}</div>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {credentials.map(({ icon: Icon, label }) => (
                  <div key={label} className="glass-soft flex items-start gap-3 rounded-2xl p-4">
                    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--gold)]" />
                    <p className="text-sm leading-snug text-foreground/90">{label}</p>
                  </div>
                ))}
              </div>
              <InlineCTA />
            </div>
          </div>
        </div>
      </section>

      {/* Visual breather */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-white/10 md:col-span-2 md:aspect-[16/9]">
              <LuxuryImage src={breatherImages[0].src} alt={breatherImages[0].alt} className="h-full w-full object-cover" />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-xs uppercase tracking-[0.22em] text-white/85">
                {breatherImages[0].caption}
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-white/10 aspect-[4/5] md:aspect-auto">
              <LuxuryImage src={breatherImages[1].src} alt={breatherImages[1].alt} className="h-full w-full object-cover" />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-xs uppercase tracking-[0.22em] text-white/85">
                {breatherImages[1].caption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Question-based H2 sections */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Real Questions · Honest Answers"
            title="What people actually want to know"
            sub="No jargon. Straight answers grounded in 12+ years of therapeutic teaching."
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-6">
            {questions.map((qa) => (
              <article key={qa.q} className="glass-luxe rounded-[2rem] border border-white/10 p-6 md:p-8">
                <h2 className="font-display text-xl md:text-2xl leading-[1.2] text-foreground">{qa.q}</h2>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-foreground/85">{qa.answer}</p>
                <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
                  {qa.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {cautionNote && (
            <div className="mx-auto mt-8 max-w-5xl">
              <div className="flex items-start gap-3 rounded-[1.25rem] border border-amber-400/30 bg-amber-400/5 p-5">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300" />
                <p className="text-sm leading-relaxed text-foreground/90"><span className="font-medium text-amber-200">A note on safety: </span>{cautionNote}</p>
              </div>
            </div>
          )}

          <div className="mx-auto mt-10 max-w-5xl">
            <InlineCTA />
          </div>
        </div>
      </section>

      {/* Pull-quote */}
      <section className="section-tight">
        <div className="container-luxe">
          <figure className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-8 w-8 text-[color:var(--gold)]/70" />
            <blockquote className="mt-4 font-display text-2xl md:text-3xl italic leading-[1.3] text-foreground/95">
              "{quote.text}"
            </blockquote>
            <figcaption className="mt-5 text-xs uppercase tracking-[0.28em] text-[color:var(--gold)]">
              {quote.source}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* From the Journal — related blog posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="section-tight">
          <div className="container-luxe">
            <div className="mx-auto max-w-5xl">
              <p className="eyebrow"><span className="h-px w-10 bg-primary" />From the Journal</p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group block h-full rounded-2xl border border-white/8 bg-[linear-gradient(180deg,oklch(0.18_0.005_60/0.6),oklch(0.13_0.005_60/0.7))] p-6 transition-all hover:-translate-y-1 hover:border-[color:var(--gold)]/40"
                  >
                    <div className="flex items-center justify-between text-[0.58rem] uppercase tracking-[0.22em]">
                      <span className="text-[color:var(--gold)]">{p.cat}</span>
                      <span className="text-muted-foreground">{p.read}</span>
                    </div>
                    <h3 className="mt-4 font-display text-lg leading-tight">{p.title}</h3>
                    <div className="mt-4 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">
                      Read journal →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related links */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto max-w-5xl rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <p className="eyebrow"><span className="h-px w-10 bg-primary" />Explore Related</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {relatedLinks.map((r) => (
                <Link key={r.to} to={r.to} className="text-[color:var(--gold)] hover:underline">{r.label} →</Link>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Closing CTA */}
      <section className="section-y">
        <div className="container-luxe">
          <div className="glass-luxe relative overflow-hidden rounded-[2rem] p-8 text-center md:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_16%,transparent),transparent_70%)]" />
            <p className="eyebrow justify-center">Begin Today</p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.8vw,3rem)] leading-tight">{ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{ctaSub}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/contact" hash="consultation" className="btn-gold">Book Free Consultation</Link>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold">
                <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const SHARED_CREDENTIAL_ICONS = { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck };
