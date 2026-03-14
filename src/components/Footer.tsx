"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const sectionIds = ["hero", "services", "works", "about", "contact"];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric", minute: "2-digit", second: "2-digit",
          hour12: true, timeZone: "Africa/Cairo",
        }) + ", EET"
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.fromTo(sectionRef.current, { opacity: 0 }, {
          opacity: 1, duration: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: "top 90%", once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      ref={sectionRef}
      style={{ background: "var(--cream)", padding: "80px 40px 40px", opacity: 0 }}
    >
      {/* Two columns: Menu + Socials — wide spacing between them */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "120px", maxWidth: "900px",
      }}>
        {/* Menu */}
        <div>
          <div style={{
            fontSize: "14px", fontWeight: 700, color: "var(--text-on-cream)",
            marginBottom: "12px",
          }}>
            {t.footer.menuLabel}
          </div>
          <div style={{ height: "0.5px", background: "var(--text-on-cream)", marginBottom: "4px" }} />
          {t.footer.menuLinks.map((label, i) => (
            <button
              key={i}
              onClick={() => scrollTo(sectionIds[i])}
              style={{
                display: "block", width: "100%", textAlign: "left",
                fontSize: "16px", fontWeight: 400, color: "var(--text-on-cream)",
                background: "none", border: "none",
                padding: "10px 0", cursor: "pointer", transition: "color 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--muted-on-cream)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-on-cream)"; }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Socials */}
        <div>
          <div style={{
            fontSize: "14px", fontWeight: 700, color: "var(--text-on-cream)",
            marginBottom: "12px",
          }}>
            {t.footer.socialsLabel}
          </div>
          <div style={{ height: "0.5px", background: "var(--text-on-cream)", marginBottom: "4px" }} />
          {t.footer.socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block", fontSize: "16px", fontWeight: 400,
                color: "var(--text-on-cream)", textDecoration: "none",
                padding: "10px 0", transition: "color 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--muted-on-cream)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-on-cream)"; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* LOCAL TIME — bottom-center (like Zuned) */}
      <div style={{ marginTop: "80px", display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--text-on-cream)",
            marginBottom: "4px",
          }}>
            {t.footer.localTime}
          </div>
          <div style={{ fontFamily: "monospace", fontSize: "15px", color: "var(--muted-on-cream)" }}>
            {time}
          </div>
        </div>
      </div>
    </footer>
  );
}
