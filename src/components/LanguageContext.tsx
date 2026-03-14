"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

type Language = "en" | "ar";

interface Translations {
  subtitle: string;
  nav: { services: string; works: string; about: string; contact: string };
  hero: {
    tagline: string;
    nicheQuote: string;
    cta: string;
    availableBadge: string;
  };
  services: {
    items: Array<{
      number: string;
      title: string;
      description: string;
      subs: string[];
    }>;
  };
  skills: { label: string };
  works: { label: string };
  about: {
    label: string;
    p1: string;
    p2: string;
    headline1: string;
    headline2: string;
  };
  contact: { heading: string; name: string; email: string; message: string; send: string };
  footer: {
    menuLabel: string;
    socialsLabel: string;
    menuLinks: string[];
    socialLinks: Array<{ label: string; href: string }>;
    localTime: string;
  };
}

const en: Translations = {
  subtitle: "Backend .NET Engineer & IoT Specialist",
  nav: { services: "Services", works: "Works", about: "About", contact: "Contact" },
  hero: {
    tagline: "I build fast, reliable backend systems that power real-world IoT environments — available for remote opportunities worldwide.",
    nicheQuote: "I don't just call the API — I build what's underneath it.",
    cta: "CONTACT ↗",
    availableBadge: "AVAILABLE FOR WORK",
  },
  services: {
    items: [
      {
        number: "(01)",
        title: "ASP.NET Core Backend",
        description: "From REST APIs to middleware pipelines, I build complete backend solutions. Clean Architecture, Dependency Injection, Background Services, and JWT auth — production-grade from day one.",
        subs: [
          "Clean Architecture · SOLID · Repository Pattern",
          "JWT Auth · Middleware · Background Services",
          "Swagger / OpenAPI · EF Core · SQL Server",
        ],
      },
      {
        number: "(02)",
        title: "Real-Time & Low-Level Systems",
        description: "I build socket servers and real-time pipelines from scratch. I know what Kestrel and SignalR do underneath — because I've replaced them with raw TCP before using them.",
        subs: [
          "TCP/IP Socket Servers · Custom Protocols",
          "Real-Time Data Pipelines · IoT Integration",
          "Non-blocking I/O · Concurrent Connections",
        ],
      },
      {
        number: "(03)",
        title: "System Architecture",
        description: "Every system I build reflects a structural decision. SOLID, CQRS/MediatR, and Clean Code as daily practice — not interview terminology.",
        subs: [
          "SOLID Principles · Design Patterns",
          "CQRS / MediatR · Clean Code",
          "REST API Design · Domain-Driven thinking",
        ],
      },
    ],
  },
  skills: { label: "(Tech Stack)" },
  works: { label: "(Selected Work)" },
  about: {
    label: "(ABOUT ME)",
    p1: "I'm Ahmed Osama, a 3rd-year CS student at Menoufia National University specializing in IoT, graduating 2027. I build .NET backend systems — ASP.NET Core APIs, Clean Architecture layers, real-time pipelines, and Background Services built for the latency IoT environments demand.",
    p2: "I've been building backend systems long enough to have strong opinions about things most engineers overlook — why middleware order matters, why DI lifetime is an architectural decision, why a Background Service should never hold state. I built a TCP/IP chat server from scratch before I used SignalR. I needed to know what the abstraction was hiding. That's how I approach every system I build.",
    headline1: "LET'S MAKE",
    headline2: "IT HAPPEN",
  },
  contact: {
    heading: "Have a project in mind?",
    name: "Your name",
    email: "Your email address",
    message: "Tell me about your project or opportunity",
    send: "SEND MESSAGE →",
  },
  footer: {
    menuLabel: "Menu",
    socialsLabel: "Socials",
    menuLinks: ["Home", "Services", "Works", "About", "Contact"],
    socialLinks: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-osama-b4078b389" },
      { label: "GitHub", href: "https://github.com/ahmedosamaexe" },
      { label: "WhatsApp", href: "https://wa.me/201050608122" },
    ],
    localTime: "LOCAL TIME",
  },
};

const ar: Translations = {
  subtitle: "مهندس باك إند .NET وأنظمة إنترنت الأشياء",
  nav: { services: "الخدمات", works: "الأعمال", about: "عنّي", contact: "تواصل" },
  hero: {
    tagline: "أبني أنظمة باك إند سريعة وموثوقة تُشغّل بيئات IoT الحقيقية — متاح للعمل عن بُعد.",
    nicheQuote: "أنا لا أستدعي الـ API فقط — أنا أبني ما تحته.",
    cta: "تواصل ↗",
    availableBadge: "متاح للعمل",
  },
  services: {
    items: [
      {
        number: "(01)",
        title: "ASP.NET Core Backend",
        description: "من REST APIs إلى Middleware pipelines، أبني حلول باك إند كاملة. Clean Architecture و Dependency Injection و Background Services و JWT auth — بمستوى إنتاج من اليوم الأول.",
        subs: [
          "Clean Architecture · SOLID · Repository Pattern",
          "JWT Auth · Middleware · Background Services",
          "Swagger / OpenAPI · EF Core · SQL Server",
        ],
      },
      {
        number: "(02)",
        title: "أنظمة لحظية ومنخفضة المستوى",
        description: "أبني سيرفرات سوكت وأنابيب بيانات لحظية من الصفر. أعرف ماذا يفعل Kestrel و SignalR من الداخل — لأنني بدّلتهم بـ TCP خام قبل استخدامهم.",
        subs: [
          "TCP/IP Socket Servers · Custom Protocols",
          "Real-Time Data Pipelines · IoT Integration",
          "Non-blocking I/O · Concurrent Connections",
        ],
      },
      {
        number: "(03)",
        title: "هندسة الأنظمة",
        description: "كل نظام أبنيه يعكس قرار هيكلي. SOLID و CQRS/MediatR و Clean Code كممارسة يومية — مش مصطلحات مقابلات.",
        subs: [
          "SOLID Principles · Design Patterns",
          "CQRS / MediatR · Clean Code",
          "REST API Design · Domain-Driven thinking",
        ],
      },
    ],
  },
  skills: { label: "(المهارات)" },
  works: { label: "(الأعمال)" },
  about: {
    label: "(عنّي)",
    p1: "أنا أحمد أسامة، طالب سنة ثالثة علوم حاسب في جامعة المنوفية الأهلية متخصص في IoT، تخرج 2027. أبني أنظمة باك إند بـ .NET — ASP.NET Core APIs و Clean Architecture و أنابيب بيانات لحظية و Background Services مبنية لمتطلبات بيئات IoT.",
    p2: "أبني أنظمة باك إند من فترة كافية عشان يكون عندي آراء قوية عن أشياء معظم المهندسين بيتجاهلوها — ليه ترتيب الـ middleware مهم، ليه DI lifetime قرار معماري، ليه Background Service ما يجبش يحتفظ بحالة. بنيت سيرفر TCP/IP chat من الصفر قبل ما أستخدم SignalR. احتجت أعرف الـ abstraction بيخبي إيه.",
    headline1: "لنبني",
    headline2: "شيئاً معاً",
  },
  contact: {
    heading: "عندك مشروع في بالك؟",
    name: "اسمك",
    email: "بريدك الإلكتروني",
    message: "احكي لي عن مشروعك أو الفرصة",
    send: "إرسال ←",
  },
  footer: {
    menuLabel: "القائمة",
    socialsLabel: "التواصل",
    menuLinks: ["الرئيسية", "الخدمات", "الأعمال", "عنّي", "تواصل"],
    socialLinks: [
      { label: "لينكدإن", href: "https://www.linkedin.com/in/ahmed-osama-b4078b389" },
      { label: "جيتهاب", href: "https://github.com/ahmedosamaexe" },
      { label: "واتساب", href: "https://wa.me/201050608122" },
    ],
    localTime: "التوقيت المحلي",
  },
};

const translations: Record<Language, Translations> = { en, ar };

interface LanguageContextType {
  lang: Language;
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: en,
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-lang") as Language | null;
    if (stored === "ar" || stored === "en") {
      setLangState(stored);
      document.documentElement.dir = stored === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = stored;
    }
  }, []);

  const toggleLang = useCallback(() => {
    const next = lang === "en" ? "ar" : "en";
    setLangState(next);
    localStorage.setItem("portfolio-lang", next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
