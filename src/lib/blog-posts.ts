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
  },
  {
    slug: "therapeutic-yoga-benefits",
    cat: "Health",
    title: "What is yoga therapy? A practical guide to therapeutic yoga",
    excerpt:
      "Yoga therapy applies traditional practice to a specific condition — chronic pain, stress, restricted mobility. Here is how it works, and how it differs from a normal class.",
    read: "8 min",
    date: "2026-07-30",
    body: [
      { type: "p", text: "Yoga therapy is the application of yogic tools — asana, pranayama, relaxation and lifestyle correction — to one person's specific condition, rather than to a room full of people doing the same sequence. A general class asks you to fit the practice. Therapeutic yoga fits the practice to you." },
      { type: "h2", text: "Yoga therapy vs. a regular yoga class" },
      { type: "ul", items: [
        "A class has one sequence for everyone; therapy has a sequence built from your assessment.",
        "A class measures nothing; therapy measures a baseline — pain score, range of motion, sleep, breath rate — and re-checks it.",
        "A class progresses by difficulty; therapy progresses by symptom response.",
        "A class ends when the hour ends; therapy includes what you do the other 23 hours — posture, breath, sleep, food timing."
      ]},
      { type: "h2", text: "The science, in plain terms" },
      { type: "p", text: "Most therapeutic benefit comes from three mechanisms, all well documented. First, load and mobility: graded movement restores tissue tolerance, which is why controlled motion beats rest for most persistent back pain. Second, the breath: slow nasal breathing at roughly six breaths per minute raises vagal tone and shifts the nervous system out of sustained sympathetic arousal. Third, interoception: the trained ability to notice what your body is doing early, before it becomes a flare-up." },
      { type: "quote", text: "We are not treating the pose. We are treating the person who is in pain — the pose is only the instrument.", cite: "Master Anil Choudhary" },
      { type: "h2", text: "Chronic pain" },
      { type: "p", text: "For long-standing back, neck and knee pain, the therapeutic approach is deliberately unimpressive to watch: small ranges, long holds, breath-paired movement, and strict avoidance of the one or two motions that provoke your symptoms. The aim in the first month is not flexibility — it is to prove to a sensitised nervous system that movement is safe again. Load and range are added only once pain stops spiking after sessions." },
      { type: "h2", text: "Stress, anxiety and sleep" },
      { type: "p", text: "Here the primary tool is pranayama, not posture. Extended exhale breathing, alternate nostril breathing and yoga nidra do the heavy lifting; asana exists mainly to discharge physical tension so the breath work can land. Students usually report sleep improving before mood does — that order is normal and is a good early signal that the protocol is working." },
      { type: "h2", text: "Mobility and ageing well" },
      { type: "p", text: "Mobility loss is rarely uniform. Most people lose hip internal rotation, thoracic extension and ankle dorsiflexion first, and the body then borrows range from the lower back to compensate. Therapeutic yoga targets the restricted joint directly and teaches the spine to stop compensating — which is what protects it over decades." },
      { type: "h2", text: "What a therapeutic programme looks like with us" },
      { type: "ul", items: [
        "Intake: history, current symptoms, medications, previous injuries, and what you actually want to be able to do again.",
        "Assessment: breath pattern, range of motion, and the specific movements that provoke or relieve symptoms.",
        "A short daily home sequence — usually 12 to 20 minutes, because that is what gets done.",
        "Weekly one-to-one or small-group sessions where the sequence is corrected and progressed.",
        "Re-assessment every four to six weeks against the original baseline."
      ]},
      { type: "h2", text: "Who it is not for" },
      { type: "p", text: "Yoga therapy supports medical care; it does not replace it. Acute injury, undiagnosed pain, red-flag symptoms such as numbness or loss of bladder control, and unstable cardiac or pregnancy conditions need a doctor first. We will ask, and we will say no if the honest answer is that you need imaging rather than a mat." },
      { type: "p", text: "If you want to start, our therapeutic pages for back pain, stress and PCOD explain the condition-specific protocols, and our live online classes and one-to-one training both run on the same assessment-first method." }
    ],
    related: [
      { label: "Yoga for Back Pain", to: "/yoga-for-back-pain" },
      { label: "Yoga for Stress & Anxiety", to: "/yoga-for-stress" },
      { label: "Personal Training", to: "/personal-training" },
      { label: "Online Yoga Classes", to: "/online-yoga-classes" }
    ],
    faqs: [
      { q: "What is yoga therapy?", a: "Yoga therapy is the use of yoga tools — postures, breath work, relaxation and lifestyle changes — applied to an individual's specific health condition, based on an assessment and re-checked against measurable baselines such as pain score, range of motion and sleep quality." },
      { q: "How is therapeutic yoga different from regular yoga?", a: "A regular class delivers one sequence to everyone. Therapeutic yoga builds the sequence around your assessment, avoids your provoking movements, and progresses according to symptom response rather than difficulty." },
      { q: "Is yoga therapy effective for chronic pain?", a: "For persistent non-specific back, neck and knee pain, graded movement combined with breath regulation is well supported. Progress is typically measured over 6 to 12 weeks of consistent short daily practice rather than in single sessions." },
      { q: "How long before I see results from yoga therapy?", a: "Sleep and stress markers usually shift within two to three weeks. Structural changes in pain and mobility generally take six to twelve weeks of consistent daily practice." },
      { q: "Can I do yoga therapy online?", a: "Yes. Our live online sessions include the same intake, assessment and real-time correction as in-studio therapeutic work, with a short daily home sequence between sessions." }
    ]
  }
];


export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
