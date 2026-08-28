// Curated sitewide search index. Every href must resolve to a real current
// route or a real current anchor on that route. No generated pages.
import { BLOG_POSTS } from "@/lib/blog-posts";

export type SearchEntry = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  keywords: string[];
  /** Intent weighting so the most useful destination ranks first. Default 1. */
  boost?: number;
};

const PAGES: SearchEntry[] = [
  {
    id: "home",
    title: "Home",
    description: "Yog Jivan yoga studios serving the Hai Duong urban area, plus live online classes.",
    category: "Pages",
    href: "/",
    boost: 0.85,
    keywords: [
      "home", "yog jivan", "sanctuary", "hai phong", "vietnam yoga", "trang chu",
    ],
  },
  {
    id: "programs",
    title: "Programs & Pricing",
    description: "Studio membership options, private yoga by enquiry and live online class plans.",
    category: "Programs",
    href: "/programs",
    boost: 1.3,
    keywords: [
      "programs", "pricing", "price", "prices", "cost", "fees", "membership", "plans", "packages",
      "how much", "gia", "gia ca", "hoc phi", "bang gia", "chuong trinh", "gia lop yoga",
    ],
  },
  {
    id: "studio-classes",
    title: "Studio Classes in Hai Duong",
    description: "Daily in-person group classes at the Yog Jivan studios in the Hai Duong urban area.",
    category: "Programs",
    href: "/programs",
    boost: 1.35,
    keywords: [
      "studio", "studio classes", "in person", "group class", "offline", "walk in", "membership",
      "hai duong", "hai duong yoga", "yoga hai duong", "hai duong studio", "yoga studio",
      "near me", "yoga near me", "yoga classes near me", "yoga class near me", "classes near me",
      "lop tai phong tap", "lop nhom", "lop yoga hai duong", "trung tam yoga hai duong",
      "lop yoga gan day", "yoga gan day", "gan day",
    ],
  },
  {
    id: "beginners",
    title: "Yoga for Beginners",
    description: "A safety-first starting path for complete beginners, with alignment guidance from the first class.",
    category: "Programs",
    href: "/yoga-for-beginners",
    boost: 1.25,
    keywords: [
      "beginner", "beginners", "new", "newbie", "starting", "start yoga", "first class", "not flexible",
      "basics", "foundation", "nguoi moi bat dau", "nguoi moi", "yoga co ban", "moi bat dau",
    ],
  },
  {
    id: "online",
    title: "Online Yoga Classes",
    description: "Live small-group online classes of 60 minutes with a maximum of 8 students and real-time correction.",
    category: "Online",
    href: "/online-yoga-classes",
    boost: 1.3,
    keywords: [
      "online yoga", "online yoga classes", "live online yoga", "online", "online class", "online classes", "live class", "live online", "zoom", "virtual",
      "remote", "small group", "group class online", "worldwide", "timezone",
      "lop yoga online", "yoga truc tuyen", "hoc online", "lop online",
    ],
  },
  {
    id: "online-pricing",
    title: "Online Class Pricing",
    description: "Monthly to yearly membership plans for live online yoga, shown on the online classes page.",
    category: "Online",
    href: "/online-yoga-classes",
    keywords: [
      "online pricing", "online price", "monthly", "subscription", "usd", "plan", "membership online",
      "how much online", "gia online", "hoc phi online",
    ],
  },
  {
    id: "online-trial",
    title: "Free Introductory Online Offer",
    description: "New students can try live group access plus one complimentary private session before joining.",
    category: "Online",
    href: "/online-yoga-classes",
    keywords: [
      "trial", "free trial", "free class", "intro", "introductory", "try", "first free", "no card",
      "hoc thu", "dung thu", "mien phi",
    ],
  },
  {
    id: "online-setup",
    title: "Camera policy for live online classes",
    description: "How to position your device and space so live posture correction works during online classes.",
    category: "Online",
    href: "/online-yoga-classes",
    boost: 0.8,
    keywords: [
      "camera", "camera on", "webcam", "setup", "equipment", "mat", "props", "internet", "device",
      "laptop", "phone", "privacy", "may quay", "thiet bi", "chuan bi",
    ],
  },
  {
    id: "private",
    title: "Private Yoga",
    description: "One-to-one 60-minute sessions with the Yog Jivan teaching team, in studio or live online, arranged by enquiry.",
    category: "Programs",
    href: "/private-online-yoga",
    keywords: [
      "private", "private yoga", "personal training", "personal trainer", "one to one", "one on one",
      "1 on 1", "1-1", "individual", "solo", "bespoke", "personal instructor", "private teacher",
      "lop rieng", "mot kem mot", "hoc rieng", "giao vien rieng",
    ],
  },
  {
    id: "private-online",
    title: "Private 1-on-1 Online Yoga",
    description: "Fully individual live online sessions with personalised pacing and real-time guidance.",
    category: "Online",
    href: "/private-online-yoga",
    boost: 1.7,
    keywords: [
      "private online", "private online yoga", "one to one online yoga", "online private", "1 on 1 online", "one to one online", "private live",
      "personal online", "individual online", "hoc rieng online", "mot kem mot online", "lop rieng truc tuyen",
    ],
  },
  {
    id: "about",
    title: "About Master Anil",
    description: "Master Anil Choudhary, Founder & Lead Yoga Teacher, and the Indian yoga background behind Yog Jivan.",
    category: "About",
    href: "/about",
    keywords: [
      "about", "master anil", "anil", "anil choudhary", "teacher", "instructor", "founder", "guru",
      "who teaches", "experience", "lineage", "india", "giao vien", "thay", "nguoi sang lap",
    ],
  },
  {
    id: "contact",
    title: "Contact & Book a Consultation",
    description: "Message the studio on WhatsApp, Zalo, phone or email, or request a free consultation.",
    category: "Contact",
    href: "/contact#consultation",
    boost: 1.25,
    keywords: [
      "contact", "locations", "studio address", "dia chi yoga", "book", "booking", "enquiry", "enquire", "consultation", "whatsapp", "zalo", "phone",
      "email", "call", "address", "location", "map", "directions", "where", "near me",
      "lien he", "dia chi", "dat lich", "so dien thoai",
    ],
  },
  {
    id: "studio-1",
    title: "Yog Jivan Sanctuary (Studio 1)",
    description: "Studio at Bùi Thị Xuân, Phường Lê Thanh Nghị — aerial yoga is available here.",
    category: "Locations",
    href: "/contact",
    keywords: [
      "studio 1", "sanctuary", "bui thi xuan", "le thanh nghi", "location", "address", "map",
      "aerial", "aerial yoga", "fly yoga", "dia chi", "co so 1", "yoga bay",
    ],
  },
  {
    id: "studio-2",
    title: "Yog Jivan Yoga Studio (Studio 2)",
    description: "Second studio at Tầng 3, Nhà Văn Hóa Lao Động, Ngô Quyền, in the Hai Duong urban area.",
    category: "Locations",
    href: "/contact",
    keywords: [
      "studio 2", "wellness center", "healing center", "ngo quyen", "thanh dong", "location",
      "address", "map", "dia chi", "co so 2",
    ],
  },
  {
    id: "back-pain",
    title: "Yoga for Back Pain",
    description: "Careful, alignment-led practice to support back and spine comfort in daily life.",
    category: "Focus Areas",
    href: "/yoga-for-back-pain",
    keywords: [
      "back pain", "backache", "back", "spine", "lower back", "neck", "neck pain", "posture",
      "sciatica", "desk", "dau lung", "dau co", "cot song",
    ],
  },
  {
    id: "stress",
    title: "Yoga for Stress",
    description: "Breath-led, slower practice to support relaxation, calm and better sleep habits.",
    category: "Focus Areas",
    href: "/yoga-for-stress",
    keywords: [
      "stress", "anxiety", "calm", "relax", "relaxation", "sleep", "insomnia", "burnout", "breathing",
      "pranayama", "meditation", "cang thang", "giam cang thang", "thu gian", "mat ngu", "thien",
    ],
  },
  {
    id: "weight-loss",
    title: "Yoga for Weight Loss",
    description: "A sustainable, strength- and consistency-focused approach rather than quick-fix promises.",
    category: "Focus Areas",
    href: "/yoga-for-weight-loss",
    keywords: [
      "weight loss", "fat loss", "slim", "lose weight", "fitness", "toning", "giam can", "giam mo",
    ],
  },
  {
    id: "pcod",
    title: "Yoga for PCOD & PCOS",
    description: "Gentle, supportive practice for women managing PCOD or PCOS alongside medical care.",
    category: "Focus Areas",
    href: "/yoga-for-pcod",
    keywords: ["pcod", "pcos", "hormone", "hormonal", "women", "womens health", "cycle", "kinh nguyet", "noi tiet"],
  },
  {
    id: "thyroid",
    title: "Yoga for Thyroid",
    description: "Supportive practice and breathwork for people living with thyroid conditions.",
    category: "Focus Areas",
    href: "/yoga-for-thyroid",
    keywords: ["thyroid", "hypothyroid", "hyperthyroid", "metabolism", "tuyen giap"],
  },
  {
    id: "period-safe",
    title: "Period-Safe Yoga",
    description: "What to practise, adapt or skip during menstruation, with teacher-guided modifications.",
    category: "Focus Areas",
    href: "/period-safe-yoga",
    keywords: ["period", "periods", "menstruation", "menstrual", "cramps", "women", "kinh nguyet", "dau bung kinh"],
  },
  {
    id: "expats",
    title: "Yoga for Expats in Vietnam",
    description: "English-language classes for expats living in Vietnam, in studio or live online.",
    category: "Programs",
    href: "/yoga-for-expats-in-vietnam",
    keywords: [
      "expat", "expats", "foreigner", "english", "english class", "vietnam", "hanoi", "hai phong",
      "nguoi nuoc ngoai", "tieng anh",
    ],
  },
  {
    id: "corporate",
    title: "Corporate Yoga",
    description: "Workplace yoga and wellbeing sessions for teams, arranged by enquiry.",
    category: "Programs",
    href: "/corporate",
    keywords: ["corporate", "company", "office", "workplace", "team", "employee", "business", "cong ty", "doanh nghiep"],
  },
  {
    id: "gallery",
    title: "Gallery",
    description: "Photographs from the Yog Jivan studios, classes and community.",
    category: "Pages",
    href: "/gallery",
    keywords: ["gallery", "photos", "pictures", "images", "studio photos", "hinh anh", "thu vien anh"],
  },
  {
    id: "testimonials",
    title: "Testimonials",
    description: "Student experiences and reviews from studio and online practitioners.",
    category: "Pages",
    href: "/testimonials",
    keywords: ["testimonials", "reviews", "students", "feedback", "rating", "danh gia", "cam nhan"],
  },
  {
    id: "blog",
    title: "Blog",
    description: "Articles on practice, breathwork, therapeutic yoga and building a lasting home routine.",
    category: "Blog",
    href: "/blog",
    keywords: ["blog", "articles", "guides", "reading", "tips", "bai viet"],
  },
];

const BLOG_ENTRIES: SearchEntry[] = BLOG_POSTS.map((post) => ({
  id: `blog-${post.slug}`,
  title: post.title,
  description: post.excerpt,
  category: `Blog · ${post.cat}`,
  href: `/blog/${post.slug}`,
  keywords: [post.cat, post.cluster ?? "", post.primaryKeyword ?? "", ...post.slug.split("-")].filter(Boolean),
}));

export const SEARCH_INDEX: SearchEntry[] = [...PAGES, ...BLOG_ENTRIES];

export const POPULAR_SEARCHES = [
  "Online Yoga Classes",
  "Yoga for Beginners",
  "Private Yoga",
  "Programs & Pricing",
  "Yoga for Back Pain",
  "Contact",
];

export const FALLBACK_LINKS = [
  { label: "Programs & Pricing", href: "/programs" },
  { label: "Yoga for Beginners", href: "/yoga-for-beginners" },
  { label: "Online Yoga Classes", href: "/online-yoga-classes" },
  { label: "Contact", href: "/contact#consultation" },
];

/** Lowercase + strip diacritics (handles Vietnamese đ/Đ too). */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Levenshtein distance, capped for cheap typo tolerance. */
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 2) return 3;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = cur;
  }
  return prev[b.length];
}

function tokenScore(token: string, haystack: string, weight: number): number {
  if (!token) return 0;
  if (haystack.includes(token)) {
    return haystack.startsWith(token) ? weight * 1.2 : weight;
  }
  if (token.length >= 4) {
    // typo tolerance against individual words
    for (const word of haystack.split(" ")) {
      if (Math.abs(word.length - token.length) <= 2 && editDistance(token, word) <= 1) {
        return weight * 0.6;
      }
    }
  }
  return 0;
}

export type SearchResult = SearchEntry & { score: number };

export function searchSite(query: string, limit = 8): SearchResult[] {
  const q = normalize(query);
  if (!q) return [];
  const tokens = q.split(" ").filter(Boolean);

  const results: SearchResult[] = [];
  for (const entry of SEARCH_INDEX) {
    const title = normalize(entry.title);
    const desc = normalize(entry.description);
    const cat = normalize(entry.category);
    const keys = normalize(entry.keywords.join(" "));

    let score = 0;
    if (title === q) score += 200;
    else if (title.startsWith(q)) score += 120;
    else if (title.includes(q)) score += 90;
    if (keys.includes(q)) score += 70;
    if (desc.includes(q)) score += 30;

    let matched = score > 0;
    for (const token of tokens) {
      const s =
        tokenScore(token, title, 24) +
        tokenScore(token, keys, 18) +
        tokenScore(token, desc, 8) +
        tokenScore(token, cat, 6);
      if (s > 0) matched = true;
      score += s;
    }

    if (matched && score > 0) results.push({ ...entry, score: score * (entry.boost ?? 1) });
  }

  return results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, limit);
}
