"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Section title: split words, stagger from bottom ── */
      const titleWords = sectionRef.current?.querySelectorAll(".title-word");
      if (titleWords) {
        gsap.set(titleWords, { y: 100, opacity: 0 });
        gsap.to(titleWords, {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        });
      }

      /* ── Label fade ── */
      const label = sectionRef.current?.querySelector(".section-label");
      if (label) {
        gsap.fromTo(label, { opacity: 0, y: 15 }, {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: { trigger: label, start: "top 85%", once: true },
        });
      }

      /* ── Each service row: number slides from left, content slides up ── */
      const rows = sectionRef.current?.querySelectorAll(".service-row");
      rows?.forEach((row) => {
        const num = row.querySelector(".service-num");
        const content = row.querySelector(".service-content");
        const dividerLine = row.querySelector(".service-divider");

        // Divider line scales in from left
        if (dividerLine) {
          gsap.fromTo(dividerLine, { scaleX: 0, transformOrigin: "left center" }, {
            scaleX: 1, duration: 0.8, ease: "power3.inOut",
            scrollTrigger: { trigger: row, start: "top 80%", once: true },
          });
        }
        // Number slides from left
        if (num) {
          gsap.fromTo(num, { x: -60, opacity: 0 }, {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 78%", once: true },
          });
        }
        // Content fades up
        if (content) {
          gsap.fromTo(content, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 78%", once: true },
          });
        }

        // Sub-items stagger in
        const subs = row.querySelectorAll(".sub-item");
        if (subs.length) {
          gsap.fromTo(subs, { y: 20, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 70%", once: true },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const renderTitleWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="title-word inline-block" style={{
        opacity: 0, marginRight: "0.2em", willChange: "transform, opacity",
      }}>
        {word}
      </span>
    ));

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{ background: "var(--black)", padding: "100px 40px 80px" }}
    >
      {/* Label + giant title */}
      <div style={{ marginBottom: "60px" }}>
        <span className="section-label" style={{
          fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--dim-on-black)", fontFamily: "monospace", opacity: 0,
        }}>
          (SERVICES)
        </span>
        <h2 className="section-giant-title" style={{ marginTop: "12px", overflow: "hidden" }}>
          {renderTitleWords("WHAT I DO /")}
        </h2>
      </div>

      {/* Service rows */}
      {t.services.items.map((item, i) => (
        <div key={i} className="service-row" style={{ padding: "48px 0", position: "relative" }}>
          {/* Animated divider */}
          <div className="service-divider" style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "0.5px", background: "var(--border-on-black)",
            transformOrigin: "left center", willChange: "transform",
          }} />

          <div style={{
            display: "grid", gridTemplateColumns: "clamp(100px, 15vw, 280px) 1fr",
            gap: "40px",
          }}>
            {/* Number */}
            <div className="service-num" style={{
              fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 400,
              color: "var(--dim-on-black)", fontFamily: "Inter, sans-serif",
              opacity: 0, willChange: "transform, opacity",
            }}>
              {item.number}
            </div>

            {/* Content */}
            <div className="service-content" style={{ opacity: 0, willChange: "transform, opacity" }}>
              <h3 className="service-name" style={{ marginBottom: "24px" }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: "15px", lineHeight: 1.75, color: "var(--muted-on-black)", maxWidth: "560px",
              }}>
                {item.description}
              </p>

              {/* Sub-items */}
              <div style={{ marginTop: "32px" }}>
                {item.subs.map((sub, j) => (
                  <div key={j} className="sub-item" style={{
                    borderTop: "0.5px solid var(--border-on-black)",
                    padding: "16px 0", display: "flex", alignItems: "center", gap: "20px",
                    opacity: 0, willChange: "transform, opacity",
                  }}>
                    <span style={{
                      fontSize: "14px", color: "var(--dim-on-black)",
                      fontFamily: "monospace", flexShrink: 0,
                    }}>
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span className="sub-item-text">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
