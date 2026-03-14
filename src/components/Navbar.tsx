"use client";

import { useLanguage } from "./LanguageContext";

const sectionIds = ["services", "works", "about", "contact"];

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const labels = [t.nav.services, t.nav.works, t.nav.about, t.nav.contact];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="absolute top-0 left-0 right-0 z-30"
      style={{ padding: "28px 40px" }}
    >
      <div className="flex items-center justify-between">
        {/* Subtitle — top-left */}
        <span
          style={{
            fontSize: "15px",
            fontWeight: 400,
            color: "var(--text-on-cream)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {t.subtitle}
        </span>

        {/* Nav links — top-right */}
        <div className="hidden md:flex items-center" style={{ gap: "32px" }}>
          {sectionIds.map((id, i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                fontSize: "15px",
                fontWeight: 400,
                color: "var(--text-on-cream)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                transition: "opacity 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              {labels[i]}
            </button>
          ))}
          <button
            onClick={toggleLang}
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "var(--text-on-cream)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              transition: "opacity 200ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.5"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            aria-label={`Switch to ${lang === "en" ? "Arabic" : "English"}`}
          >
            {lang === "en" ? "AR" : "EN"}
          </button>
        </div>
      </div>
    </nav>
  );
}
