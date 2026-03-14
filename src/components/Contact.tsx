"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(cardRef.current, { scale: 0.95, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%", once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "var(--input-bg)", border: "none",
    borderRadius: "14px", padding: "18px 20px", fontSize: "15px",
    color: "var(--text-on-black)", fontFamily: "monospace",
    marginBottom: "14px", outline: "none",
  };

  return (
    <section
      id="contact"
      style={{ background: "var(--black)", padding: "0 40px 100px" }}
    >
      <div
        ref={cardRef}
        style={{
          background: "var(--card-bg)", borderRadius: "24px",
          padding: "52px", maxWidth: "580px", margin: "0 auto", opacity: 0,
        }}
      >
        <h3 style={{
          fontSize: "22px", fontWeight: 600, color: "var(--text-on-black)",
          textAlign: "center", marginBottom: "32px",
        }}>
          {t.contact.heading}
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const name = (form.elements.namedItem("name") as HTMLInputElement).value;
            const email = (form.elements.namedItem("email") as HTMLInputElement).value;
            const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
            window.location.href = `mailto:ahmed4real9@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${name} (${email})`;
          }}
        >
          <input name="name" type="text" required placeholder={t.contact.name} style={inputStyle} />
          <input name="email" type="email" required placeholder={t.contact.email} style={inputStyle} />
          <textarea
            name="message" required placeholder={t.contact.message}
            style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
          />
          <button
            type="submit"
            style={{
              width: "100%", background: "var(--cream)", color: "var(--black)",
              fontWeight: 700, borderRadius: "14px", padding: "18px",
              fontSize: "15px", letterSpacing: "0.05em", border: "none",
              cursor: "pointer", transition: "opacity 200ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            {t.contact.send}
          </button>
        </form>
      </div>
    </section>
  );
}
