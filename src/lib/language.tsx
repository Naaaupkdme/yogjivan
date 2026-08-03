import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "EN" | "VI";
export type ThemeName = "midnight" | "earth" | "ivory";

type Copy = {
  nav: {
    home: string;
    about: string;
    programs: string;
    online: string;
    corporate: string;
    gallery: string;
    contact: string;
    book: string;
    freeTrial: string;
  };
  hero: {
    eyebrow: string;
    title: string[];
    sub: string;
    primary: string;
    secondary: string;
    trust: string[];
  };
  story: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  trust: {
    eyebrow: string;
    title: string;
    sub: string;
  };
  services: {
    eyebrow: string;
    title: string;
    sub: string;
  };
  community: {
    eyebrow: string;
    title: string;
    sub: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    sub: string;
    formTitle: string;
    note: string;
    submit: string;
  };
  footer: {
    newsletter: string;
    newsletterSub: string;
    subscribe: string;
  };
};

const copy: Record<Lang, Copy> = {
  EN: {
    nav: {
      home: "Home",
      about: "About",
      programs: "Programs",
      online: "Online Yoga",
      corporate: "Corporate",
      gallery: "Gallery",
      contact: "Contact",
      book: "Book Free Trial",
      freeTrial: "Free Trial",
    },
    hero: {
      eyebrow: "Authentic Indian Yoga · Hai Duong Studios & Live Online",
      title: ["Yoga Classes in", "Hai Duong", "— and Live Online"],
      sub: "Two yoga studios serving the Hai Duong urban area of Hai Phong, Vietnam. Beginner, therapeutic and personal yoga taught personally by Master Anil Choudhary, Founder & Lead Yoga Teacher — with live online classes for students worldwide.",
      primary: "Enquire About Studio Classes",
      secondary: "WhatsApp Us",
      online: "See Live Online Classes",
      trust: [
        "12+ Years Experience",
        "1000+ Students",
        "Students from 20+ Countries",
        "Therapeutic Yoga Expert",
        "Founder & Lead Yoga Teacher",
      ],
    },
    story: {
      eyebrow: "Founder journey",
      title: "Discipline. Healing. Service.",
      intro: "From India to Vietnam — a personal practice became a sanctuary for global students.",
    },
    trust: {
      eyebrow: "Trust & credibility",
      title: "Lineage you can feel.",
      sub: "Real students. Real transformation. Verified practice.",
    },
    services: {
      eyebrow: "Signature pathways",
      title: "Programs designed for outcomes.",
      sub: "Each pathway is a guided transformation with a clear next step.",
    },
    community: {
      eyebrow: "Community & celebration",
      title: "Held by people. Shaped by ritual.",
      sub: "Retreats, sunrise sessions, and milestones turn Yog Jivan into a living sanctuary.",
    },
    contact: {
      eyebrow: "Begin your journey",
      title: "Enter with a conversation.",
      sub: "Tell us your goal. We will guide you to the right practice and studio.",
      formTitle: "Private consultation",
      note: "Personal WhatsApp replies, usually within minutes.",
      submit: "Send via WhatsApp",
    },
    footer: {
      newsletter: "Sanctuary notes",
      newsletterSub: "Retreats, guidance, quiet updates.",
      subscribe: "Subscribe",
    },
  },
  VI: {
    nav: {
      home: "Trang chủ",
      about: "Giới thiệu",
      programs: "Chương trình",
      online: "Yoga Online",
      corporate: "Doanh nghiệp",
      gallery: "Thư viện",
      contact: "Liên hệ",
      book: "Đặt buổi học thử",
      freeTrial: "Học thử",
    },
    hero: {
      eyebrow: "Sanctuary wellness cao cấp · Hải Dương & Online",
      title: ["Yoga cao cấp.", "Trị liệu chữa lành.", "Sanctuary wellness toàn cầu."],
      sub: "Lớp riêng, lớp studio cao cấp, phục hồi trị liệu và các chương trình yoga online dẫn dắt bởi Master Anil Choudhary.",
      primary: "Đặt buổi học thử",
      secondary: "Khám phá chương trình",
      trust: ["12+ năm tinh hoa", "1000+ học viên chuyển hóa", "20+ quốc gia"],
    },
    story: {
      eyebrow: "Hành trình người sáng lập",
      title: "Một cuộc đời được xây dựng bằng kỷ luật, chữa lành và phụng sự.",
      intro: "Từ Ấn Độ đến Việt Nam, Yog Jivan phát triển từ một hành trình tu tập cá nhân thành không gian wellness cao cấp dành cho những học viên tìm kiếm chuyển hóa, trị liệu, chiều sâu và sự kết nối.",
    },
    trust: {
      eyebrow: "Niềm tin & uy tín",
      title: "Minh chứng thực tế, nền tảng chuyên môn và chuyển hóa chân thực.",
      sub: "Một thương hiệu wellness cao cấp cần vừa chạm cảm xúc vừa tạo niềm tin mạnh mẽ. Phần này mang cả hai đến cùng lúc.",
    },
    services: {
      eyebrow: "Lộ trình đặc trưng",
      title: "Chương trình được thiết kế cho kết quả, không chỉ để tham gia.",
      sub: "Mỗi dịch vụ là một hành trình được dẫn dắt rõ ràng về lợi ích, mục tiêu và bước tiếp theo.",
    },
    community: {
      eyebrow: "Cộng đồng & lễ hội",
      title: "Một sanctuary được nuôi dưỡng bởi con người, nghi thức và những khoảnh khắc chung.",
      sub: "Retreat, lớp học ngoài trời, các sự kiện cộng đồng và dấu mốc học viên biến Yog Jivan thành một cộng đồng sống động — không chỉ là một studio yên tĩnh.",
    },
    contact: {
      eyebrow: "Bắt đầu hành trình",
      title: "Bước vào sanctuary bằng một cuộc trò chuyện.",
      sub: "Hãy chia sẻ bạn đang ở đâu trên hành trình của mình, chúng tôi sẽ dẫn bạn tới hình thức tập và trải nghiệm phù hợp nhất.",
      formTitle: "Đặt lịch tư vấn riêng",
      note: "Phản hồi cá nhân và thường rất nhanh qua WhatsApp.",
      submit: "Gửi qua WhatsApp",
    },
    footer: {
      newsletter: "Nhận bản tin sanctuary",
      newsletterSub: "Cập nhật retreat, hướng dẫn luyện tập và tin tức wellness cao cấp một cách chọn lọc.",
      subscribe: "Đăng ký",
    },
  },
};

type ContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  t: Copy;
};

const Ctx = createContext<ContextValue>({
  lang: "EN",
  setLang: () => {},
  theme: "midnight",
  setTheme: () => {},
  t: copy.EN,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("EN");
  const [theme, setThemeState] = useState<ThemeName>("midnight");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("yj_lang") as Lang | null;
      if (savedLang === "EN" || savedLang === "VI") setLangState(savedLang);
      const savedTheme = localStorage.getItem("yj_theme") as ThemeName | null;
      if (savedTheme === "midnight" || savedTheme === "earth" || savedTheme === "ivory") setThemeState(savedTheme);
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "VI" ? "vi" : "en";
      document.documentElement.dataset.theme = theme;
    }
    try {
      localStorage.setItem("yj_lang", lang);
      localStorage.setItem("yj_theme", theme);
    } catch {}
  }, [lang, theme]);

  const value = useMemo<ContextValue>(() => ({
    lang,
    setLang: setLangState,
    theme,
    setTheme: setThemeState,
    t: copy[lang],
  }), [lang, theme]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
