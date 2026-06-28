import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQS = [
  {
    q: "What styles of yoga do you teach?",
    a: "Master Anil teaches classical Hatha, Ashtanga, therapeutic yoga, pranayama (breathwork) and meditation rooted in authentic Indian tradition, adapted for modern lifestyles.",
  },
  {
    q: "I am a complete beginner — can I join?",
    a: "Yes. Every program starts with a personal consultation. We design a safe entry point for absolute beginners and progress at your pace.",
  },
  {
    q: "Do you offer private one-on-one sessions?",
    a: "Yes. Private transformation programs are our signature offering — fully personalized to your body, health history and goals, available in-studio or online.",
  },
  {
    q: "Can yoga help with back pain, PCOD or anxiety?",
    a: "Our therapeutic programs address back and neck pain, PCOD/hormonal balance, anxiety, sleep, post-injury recovery and stress-related conditions through evidence-informed practice.",
  },
  {
    q: "Where are the studios located?",
    a: "Our two studios are in Hai Duong City, Vietnam — Nguyen Trai Street (Sanctuary studio) and Tran Hung Dao Street (Wellness & Healing Center).",
  },
  {
    q: "Do you offer online classes for students outside Vietnam?",
    a: "Yes. We serve students in 20+ countries through live online classes and private online programs across multiple time zones.",
  },
  {
    q: "What languages are classes taught in?",
    a: "Classes are conducted primarily in English, with Vietnamese support available at our studios.",
  },
  {
    q: "Do you offer corporate wellness programs?",
    a: "Yes. We design custom corporate wellness packages — on-site, hybrid or fully online — for teams seeking stress reduction, posture correction and resilience.",
  },
  {
    q: "Is there a kids yoga program?",
    a: "Yes. Our kids program builds focus, flexibility, breath awareness and emotional regulation through age-appropriate practice.",
  },
  {
    q: "How do I book a free trial?",
    a: "Tap Book Free Trial or message us on WhatsApp at +84 782 046 066 — we typically reply within 5 minutes.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section-y relative overflow-hidden">
      <div className="container-luxe relative">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-primary" /> Questions
            <span className="h-px w-10 bg-primary" />
          </p>
          <h2 className="mt-5 fluid-title">Frequently asked.</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            Everything you need to begin — answered clearly.
          </p>
        </div>

        <div className="mx-auto max-w-3xl glass-luxe p-3 sm:p-6" style={{ borderRadius: 28 }}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-left font-display text-lg leading-snug hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
