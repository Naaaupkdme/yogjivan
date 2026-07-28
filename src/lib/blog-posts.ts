// Blog posts data. Add new entries here and they'll appear on /blog and at /blog/$slug.

export type BlogFaq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  cat: string;
  title: string;
  excerpt: string;
  read: string;
  date: string; // ISO
  // Rendered as HTML blocks (paragraphs / h2 / lists). Keep it simple and safe (authored, not user input).
  body: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "quote"; text: string; cite?: string }
  >;
  related: Array<{ label: string; to: string }>;
  faqs?: BlogFaq[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-traditional-hatha-still-matters",
    cat: "Yoga",
    title: "Why traditional Hatha still matters in 2026",
    excerpt:
      "Modern flow classes are everywhere — but the slow, anatomical precision of classical Hatha is the foundation everything stands on.",
    read: "6 min",
    date: "2026-04-12",
    body: [
      { type: "p", text: "Most modern yoga classes move fast. Music, transitions, a workout feel. That's not wrong — but it's not the whole picture. Classical Hatha is slower on purpose. It builds the joint stability, breath awareness and internal control that every faster style borrows from." },
      { type: "h2", text: "What traditional Hatha actually is" },
      { type: "p", text: "Hatha, in the lineage sense, is a steady practice of asana, pranayama, bandha and dhyana — held long enough for the nervous system to settle. It is not gentle-only. Done properly it is demanding, but the intensity is internal, not visual." },
      { type: "h2", text: "Three reasons it still matters" },
      { type: "ul", items: [
        "It teaches you where your body actually is — the mobility gaps a flow class hides.",
        "It trains breath as the primary control mechanism, not background noise.",
        "It's therapeutic: back pain, stress, sleep and blood pressure all respond to it."
      ]},
      { type: "quote", text: "The pose is not the practice. The breath inside the pose is the practice.", cite: "Master Anil Choudhary" },
      { type: "p", text: "If you're new, our beginners programme and live online classes both start from this same Hatha foundation before any faster sequencing is introduced." }
    ],
    related: [
      { label: "Yoga for Beginners", to: "/yoga-for-beginners" },
      { label: "Online Yoga Classes", to: "/online-yoga-classes" },
      { label: "About Master Anil", to: "/about" }
    ],
    faqs: [
      { q: "Is Hatha yoga good for beginners?", a: "Yes — it's the safest starting point. Slower pace means you learn alignment, breath and internal awareness before speed is added." },
      { q: "How is Hatha different from Vinyasa?", a: "Hatha holds postures with breath; Vinyasa links postures in flow. Hatha builds the foundation Vinyasa depends on." }
    ]
  },
  {
    slug: "yoga-for-spine-longevity-12-minutes",
    cat: "Health",
    title: "Yoga for spine longevity: the daily 12 minutes",
    excerpt: "A short, evidence-informed sequence to keep the spine mobile, strong and pain-free into your seventies.",
    read: "5 min",
    date: "2026-05-03",
    body: [
      { type: "p", text: "The spine loses mobility long before it loses strength. Twelve minutes a day, done consistently, is enough to keep it moving in all six directions — which is what protects it long-term." },
      { type: "h2", text: "The six movements the spine needs daily" },
      { type: "ul", items: [
        "Forward fold (flexion)",
        "Gentle backbend (extension)",
        "Side bend left and right (lateral flexion)",
        "Rotation left and right (axial twist)",
        "Traction / decompression (length)",
        "Neutral breath hold (stabilisation)"
      ]},
      { type: "h2", text: "Why 12 minutes, not 30" },
      { type: "p", text: "Consistency beats duration. A shorter daily practice is done; a longer one is skipped. Our therapeutic students who reversed chronic back pain almost all started with a short daily sequence — not long weekend sessions." },
      { type: "p", text: "If you already have pain, don't self-prescribe. Our back pain programme adjusts the sequence to your specific issue." }
    ],
    related: [
      { label: "Yoga for Back Pain", to: "/yoga-for-back-pain" },
      { label: "Personal Training", to: "/personal-training" },
      { label: "Online Yoga Classes", to: "/online-yoga-classes" }
    ],
    faqs: [
      { q: "Can 12 minutes really help my back?", a: "Yes, if done daily and correctly. Consistency and correct alignment matter more than session length." },
      { q: "Should I do this if I have a disc issue?", a: "Not without a therapeutic assessment. Some movements need to be modified or removed based on the diagnosis." }
    ]
  },
  {
    slug: "the-breath-you-didnt-know-you-were-holding",
    cat: "Wellness",
    title: "The breath you didn't know you were holding",
    excerpt: "Most adults breathe through stress without noticing. Here's how to begin un-doing that pattern.",
    read: "4 min",
    date: "2026-05-20",
    body: [
      { type: "p", text: "Chronic stress rarely feels like stress. It feels like a shallow chest, a tight jaw, and a breath that never quite reaches the belly. Most adults live there without knowing." },
      { type: "h2", text: "The simple test" },
      { type: "p", text: "Sit. Place one hand on your chest, one on your belly. Breathe normally for thirty seconds. If only the top hand moves — your breath is stuck in the upper chest. That's the pattern to change." },
      { type: "h2", text: "The 4-6 reset" },
      { type: "ul", items: [
        "Inhale through the nose for 4 counts, into the belly.",
        "Exhale through the nose for 6 counts, longer than the inhale.",
        "Repeat for 2 minutes, three times a day."
      ]},
      { type: "p", text: "This alone shifts the nervous system out of fight-or-flight. In our stress programme it's the very first tool we teach." }
    ],
    related: [
      { label: "Yoga for Stress", to: "/yoga-for-stress" },
      { label: "Online Yoga Classes", to: "/online-yoga-classes" }
    ],
    faqs: [
      { q: "How long before I notice a change?", a: "Most students feel calmer within the first session. Structural change to the breath pattern takes 3–4 weeks of daily practice." }
    ]
  },
  {
    slug: "beginners-guide-to-20-minutes-of-stillness",
    cat: "Meditation",
    title: "A beginner's guide to 20 minutes of stillness",
    excerpt: "Why 20 minutes is the threshold — and a simple framework anyone can follow tomorrow morning.",
    read: "7 min",
    date: "2026-06-01",
    body: [
      { type: "p", text: "Under ten minutes and the mind is still settling. Around twenty minutes, something else happens — the internal chatter thins out and attention becomes usable. That's the threshold worth aiming for." },
      { type: "h2", text: "A framework that works from day one" },
      { type: "ul", items: [
        "Minutes 0–5: settle the body, lengthen the exhale.",
        "Minutes 5–15: watch the breath at the nostrils. When the mind wanders, return.",
        "Minutes 15–20: rest attention without an anchor. Simply witness."
      ]},
      { type: "h2", text: "What to expect in the first two weeks" },
      { type: "p", text: "Restlessness, boredom, and sudden clarity — often in the same session. That's normal. Don't grade yourself. Just show up." }
    ],
    related: [
      { label: "Yoga for Stress", to: "/yoga-for-stress" },
      { label: "About Master Anil", to: "/about" }
    ]
  },
  {
    slug: "yoga-for-sustainable-fat-loss",
    cat: "Weight Loss",
    title: "Yoga for sustainable fat loss (without burnout)",
    excerpt: "Hot vinyasa is not the only path. A calmer protocol that actually works for the long run.",
    read: "8 min",
    date: "2026-06-18",
    body: [
      { type: "p", text: "High-intensity yoga can drive quick weight loss, then quick burnout, then a rebound. A calmer, therapeutic protocol wins over 12 months because it's sustainable, protects joints, and regulates the hormones weight loss actually depends on." },
      { type: "h2", text: "What we've seen work" },
      { type: "ul", items: [
        "Four sessions a week — two active, two restorative.",
        "A daily breathing practice for cortisol regulation.",
        "Sleep before food rules; you can't out-train poor sleep.",
        "Small consistent portions instead of aggressive restriction."
      ]},
      { type: "p", text: "The students who kept the weight off never treated yoga as cardio. They treated it as the system that made everything else easier." }
    ],
    related: [
      { label: "Yoga for Weight Loss", to: "/yoga-for-weight-loss" },
      { label: "Personal Training", to: "/personal-training" },
      { label: "Online Yoga Classes", to: "/online-yoga-classes" }
    ],
    faqs: [
      { q: "How many kilos can I expect to lose?", a: "Sustainable loss is typically 0.4–0.7 kg per week when yoga is combined with sleep, breath work and sensible nutrition." },
      { q: "Do I need hot yoga to lose weight?", a: "No. Hot yoga adds sweat, not fat loss. Consistent therapeutic practice plus breath work is more sustainable." }
    ]
  },
  {
    slug: "building-a-home-practice-you-will-keep",
    cat: "Lifestyle",
    title: "Building a home practice you'll keep for life",
    excerpt: "Five rituals from our long-term students — what made them stay on the mat through every season.",
    read: "5 min",
    date: "2026-07-04",
    body: [
      { type: "p", text: "The students who still practise ten years later share almost nothing in terms of body type, age or schedule. What they share is a small set of quiet rituals." },
      { type: "h2", text: "Five rituals that stick" },
      { type: "ul", items: [
        "Same time every day — the brain stops negotiating.",
        "Mat stays out — friction is the enemy.",
        "Short over long — 15 real minutes beats 60 planned ones.",
        "One teacher, long enough to be corrected.",
        "A community, even a small one, that notices when you disappear."
      ]},
      { type: "p", text: "Our live online classes are built around this last point — small batches with the same teacher, so someone notices." }
    ],
    related: [
      { label: "Online Yoga Classes", to: "/online-yoga-classes" },
      { label: "Yoga for Beginners", to: "/yoga-for-beginners" }
    ]
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
