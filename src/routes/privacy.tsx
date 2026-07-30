import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { breadcrumbSchema } from "@/lib/schema";
import { SOCIAL } from "@/lib/social";

const LAST_UPDATED = "July 19, 2026";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — How Yog Jivan Handles Your Data" },
      { name: "description", content: "How Yog Jivan collects, stores and uses the information you share through our consultation form, cookies (Google Analytics & Meta Pixel), and third-party tools like Make.com, WhatsApp and Zalo." },
      { property: "og:title", content: "Privacy Policy — Yog Jivan" },
      { property: "og:description", content: "Read how Yog Jivan protects the personal data of students and visitors." },
      { property: "og:url", content: "https://yogjivan.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://yogjivan.com/privacy" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Privacy Policy", "/privacy")),
      },
    ],
  }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl text-gold-gradient md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Your Privacy"
        accent="Our Commitment"
        sub="We treat your personal information the way we treat our students on the mat — with care, transparency and respect. This page explains exactly what we collect, why, and what you can do about it."
      />
      <div className="container-luxe pb-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">Last updated: {LAST_UPDATED}</p>

          <Section title="1. What We Collect">
            <p>
              When you complete our consultation form or reach out through WhatsApp, Zalo, email or phone, you may share
              your <strong>name, WhatsApp/phone number, email address</strong>, and optionally your <strong>wellness
              goals, health notes, injuries or lifestyle context</strong>. We only ask for what we genuinely need to
              respond to your inquiry and design a safe practice for you.
            </p>
            <p>We never ask for financial information, government IDs, or sensitive data unrelated to your yoga practice.</p>
          </Section>

          <Section title="2. How We Store & Use It">
            <p>
              Your information is stored securely in our managed database (hosted on Supabase / Lovable Cloud) and is used
              only to (a) respond to your inquiry, (b) deliver the classes or services you request, and (c) send you
              essential updates about your scheduled sessions. We do not use your data to train AI models, and we do not
              sell personal data to anyone — ever.
            </p>
          </Section>

          <Section title="3. Cookies & Analytics">
            <p>
              We use <strong>Google Analytics (GA4)</strong> to understand how visitors use our site and <strong>Meta
              Pixel</strong> to measure the performance of our ads. Both of these tools <strong>only load and fire after
              you explicitly click "Accept"</strong> on our cookie banner. If you click "Reject", or do not choose at
              all, no analytics or advertising scripts are loaded.
            </p>
            <p>
              You can change your choice anytime by clicking <strong>"Cookie Settings"</strong> in the footer of any
              page. Rejecting cookies does not affect your ability to use the site or book a class.
            </p>
          </Section>

          <Section title="4. Third Parties We Share Data With">
            <p>To operate the studio, we share the minimum necessary information with a few trusted tools:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li><strong>Make.com</strong> — routes your consultation form entries to our internal inbox so we can respond within minutes.</li>
              <li><strong>WhatsApp Business (Meta)</strong> — used to reply to you when you contact us via WhatsApp.</li>
              <li><strong>Zalo</strong> — used to reply to you when you contact us via Zalo.</li>
              <li><strong>Google Analytics & Meta Pixel</strong> — only after cookie consent, as described above.</li>
            </ul>
            <p>We do not sell, rent or trade your personal information to any third party for their own marketing.</p>
          </Section>

          <Section title="5. Your Rights">
            <p>
              You can request to <strong>see, correct, export or delete</strong> the personal data we hold about you at
              any time. Just email <a href={`mailto:${SOCIAL.email}`} className="text-primary hover:underline">{SOCIAL.email}</a> from
              the address you originally used to contact us, and we will action your request within 30 days.
            </p>
            <p>
              You also have the right to withdraw consent (via Cookie Settings), opt out of any future email
              communication, and lodge a complaint with your local data protection authority if you believe we have
              mishandled your data.
            </p>
          </Section>

          <Section title="6. How Long We Keep Your Data">
            <p>
              Consultation form entries and student contact details are kept for as long as you remain an active or
              prospective student. If you go quiet for more than 24 months, we periodically archive or delete inactive
              records unless you have asked us to stay in touch.
            </p>
          </Section>

          <Section title="7. Contact Us">
            <p>Questions, requests, or concerns about your privacy? We answer personally:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Email: <a href={`mailto:${SOCIAL.email}`} className="text-primary hover:underline">{SOCIAL.email}</a></li>
              <li>WhatsApp / Phone: <a href={`tel:${SOCIAL.phoneTel}`} className="text-primary hover:underline">{SOCIAL.phone}</a></li>
            </ul>
          </Section>

          <Section title="8. Updates to This Policy">
            <p>
              If we materially change how we handle your data, we will update this page and revise the "Last updated"
              date above. Continued use of the site after those changes means you accept the updated policy.
            </p>
          </Section>
        </div>
      </div>
    </>
  );
}
