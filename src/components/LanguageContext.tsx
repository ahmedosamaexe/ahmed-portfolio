"use client";

import { createContext, useContext, type ReactNode } from "react";

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

interface LanguageContextType {
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({ t: en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageContext.Provider value={{ t: en }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
