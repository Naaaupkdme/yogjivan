import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SchoolYogaEnquiryForm } from "@/components/site/SchoolYogaEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { hreflangLinks, PAIR_SCHOOL } from "@/lib/locale-routes";
import { CheckCircle2, Clock, FileDown, GraduationCap, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";

const TITLE = "Kids Yoga for Schools in Vietnam | Yog Jivan";
const DESCRIPTION =
  "Play-based 35–40 minute yoga sessions for schools and children’s groups in Vietnam. Based in the Hải Dương area. Ask about a teacher-led complimentary demo.";
const CANONICAL = "https://www.yogjivan.com/school-yoga";
const PROPOSAL_PDF_URL = "/assets/proposals/yog-jivan-school-yoga-proposal.pdf";

const FAQS = [
  {
    q: "What does the school need to provide?",
    a: "A clean, open room or hall with safe floor space, plus a supervising teacher or assistant present throughout the class.",
  },
  {
    q: "How long is the school demo?",
    a: "A complimentary demo runs 35 to 40 minutes, designed around students' natural attention span.",
  },
  {
    q: "Can school staff stay?",
    a: "School staff remain present throughout the session to supervise, support room safety, and help children who wish to sit out.",
  },
  {
    q: "How many children can join?",
    a: "We agree the participant limit directly with the school based on age group, room size, and available staff supervision.",
  },
  {
    q: "Is there an option for a family at home?",
    a: "Yes. For household practice with parents, see our private Family Yoga sessions.",
  },
];

const CLASS_STRUCTURE = [
  { time: "4 min", step: "Settle & Welcome", desc: "Setting up space, breathing check-in, and friendly introduction." },
  { time: "7 min", step: "Warm-Up Games", desc: "Gentle joint mobility and playful animal movements to warm the body." },
  { time: "15 min", step: "Story-Led Movement", desc: "Yoga postures woven naturally through engaging story themes and character adventures." },
  { time: "7 min", step: "Balance & Cooperation", desc: "Simple balance exercises or partner/group games encouraging coordination and taking turns." },
  { time: "5 min", step: "Quiet Close", desc: "Lying down, mindful breathing, and a calm, quiet transition before returning to class." },
];

export const Route = createFileRoute("/school-yoga")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: CANONICAL },
      ...hreflangLinks(PAIR_SCHOOL),
      {
        rel: "preload",
        as: "image",
        type: "image/webp",
        href: "/assets/preview/school-hero-768.webp",
        imageSrcSet: "/assets/preview/school-hero-768.webp 768w, /assets/preview/school-hero-1280.webp 1280w",
        imageSizes: "(max-width: 768px) 100vw, 1280px",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Kids Yoga for Schools", "/school-yoga")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Kids Yoga for Schools in Vietnam",
            serviceType: "School Yoga Program",
            description: DESCRIPTION,
            areaServed: "Hai Duong, Vietnam",
            url: "/school-yoga",
          })
        ),
      },
    ],
  }),
  component: SchoolYogaPage,
});

function SchoolYogaPage() {
  return (
    <>
      {/* 1 — HERO */}
      <PageHero
        eyebrow="School Wellness · Hai Duong & Vietnam"
        title="Play-based yoga for schools"
        sub="Children explore movement, balance and breathing through stories and games, with activities adapted to their age group."
        image768="/assets/preview/school-hero-768.webp"
        image1400="/assets/preview/school-hero-1280.webp"
        imageWidth={1280}
        imageHeight={720}
        imageAlt="Children practicing playful yoga in a bright school multipurpose room"
        imageCaption="AI-generated preview illustration · Does not depict Yog Jivan students or teachers"
        contrastVeil
      >
        <div className="rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-2 text-xs font-medium text-[color:var(--gold)] max-w-fit">
          Based in the Hải Dương area. Share your location and we’ll confirm whether we can visit your school.
        </div>
        <p className="mt-3 text-xs font-semibold text-foreground/90">
          Every session is led by an experienced, certified Yog Jivan yoga teacher.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("school-yoga-enquiry-form");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-gold"
          >
            Request a complimentary school demo
          </button>
          <a
            href={PROPOSAL_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="yog-jivan-school-yoga-proposal.pdf"
            className="btn-ghost-gold inline-flex items-center gap-2"
          >
            <FileDown className="h-4 w-4 text-[color:var(--gold)]" />
            Download the school yoga proposal (PDF)
          </a>
        </div>
      </PageHero>

      {/* 2 — WHAT CHILDREN PRACTISE */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Child-Centered Movement</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                What children practise
              </h2>
              <div className="mt-6 space-y-5">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Balance and coordination</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Fun postures and animal-inspired poses that strengthen growing muscles, improve body awareness, and build physical confidence.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Listen and take turns</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Group games and cooperative activities that teach attentive listening, patience, taking turns, and supportive social interaction.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">A quiet moment</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Gentle breathing exercises and quiet rest at the end of class that allow children to relax and transition calmly back to class.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <picture>
                <source srcSet="/assets/preview/school-benefits-768.webp" type="image/webp" />
                <img
                  src="/assets/preview/school-benefits-768.webp"
                  alt="Children learning mindful movement and balance in a school setting"
                  width={768}
                  height={432}
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-[16/9]"
                />
              </picture>
              <div className="p-3 bg-black/40 text-[0.7rem] text-muted-foreground text-center">
                AI-generated preview illustration · Does not depict Yog Jivan students or teachers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — A SAMPLE 38-MINUTE CLASS */}
      <section className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Sample Schedule<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              A sample 38-minute class
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Complimentary first sessions run 35–40 minutes, structured to maintain energy, focus, and calm.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CLASS_STRUCTURE.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-[color:var(--gold)]">{item.time}</span>
                  <span className="text-[0.68rem] text-muted-foreground uppercase tracking-wider">Step {idx + 1}</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-foreground">{item.step}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Complimentary first class planned for <strong className="text-foreground">35–40 minutes</strong> · Guided by an experienced, certified Yog Jivan teacher
          </div>
        </div>
      </section>

      {/* 4 — WHAT THE SCHOOL PREPARES */}
      <section className="section-pad border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />School Collaboration</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                What the school prepares
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Provide a clear room and supervising staff. An adult coordinator shares the general age band, estimated group size, venue and preferred time. Yog Jivan confirms the instructor and adjusts activities to the class.
                </p>
                <p>
                  Yog Jivan facilitates yoga for school groups in Vietnam. We present the complimentary first session as a 35–40 minute pilot, allowing your staff and students to experience our teaching approach.
                </p>
                <p className="text-xs font-medium text-foreground/90">
                  <strong>Strict Privacy Standard:</strong> Adult contact only. Child names, photos, health records, or dates of birth are never requested. Permissions for any photos are arranged strictly with school staff.
                </p>
              </div>
              <p className="mt-4 text-xs font-semibold text-[color:var(--gold)]">
                Every session is led by an experienced, certified Yog Jivan yoga teacher.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground">School Checklist</h3>
              <ul className="mt-4 space-y-3 text-xs text-foreground/80">
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Activity space:</strong> Clear, clean room, hall, or multipurpose studio space.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Staff supervision:</strong> School teacher or assistant remains present throughout.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Adult coordinator:</strong> Coordinator shares group size and two preferred times.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Voluntary movement:</strong> Children can sit out or take rest whenever they wish.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Age bands:</strong> Activities and pacing customized for Preschool, Primary, or Middle school.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — AFTER THE DEMO & ENQUIRY / FAQS */}
      <section className="section-pad bg-muted/10 border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Next Steps<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              After the demo
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We review participation and suitable activities with school staff. If you wish to continue, we confirm schedule, supervision and equipment and send a VND quote.
            </p>
            <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
              Supported across 20+ schools in Vietnam · Every session is led by an experienced, certified Yog Jivan yoga teacher.
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3">
              <a
                href={PROPOSAL_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="yog-jivan-school-yoga-proposal.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-4 py-2.5 text-xs font-semibold text-[color:var(--gold)] hover:bg-[color:var(--gold)]/20"
              >
                <FileDown className="h-4 w-4" />
                Download the school yoga proposal (PDF)
              </a>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <SchoolYogaEnquiryForm
              lang="EN"
              heading="Request a Complimentary School Yoga Demo"
              subheading="Share your school name, age band, estimated class size, and two preferred times. Adult coordinator enquiries only."
            />
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Questions about hosting a complimentary yoga pilot at your school.
            </p>
            <div className="mt-8">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-10 text-center text-xs text-muted-foreground">
              <span>Are you a parent seeking a home session with your children? Visit our </span>
              <Link to="/online-family-yoga" hash="parent-child" className="text-[color:var(--gold)] hover:underline">
                Private Online Family Yoga (Parent-Child)
              </Link>
              <span> or contact our team via </span>
              <Link to="/contact" className="text-[color:var(--gold)] hover:underline">
                Contact & Studio Details
              </Link>
              .
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
