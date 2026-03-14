"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── About container: border reveals ── */
      const container = sectionRef.current?.querySelector(".about-container");
      if (container) {
        gsap.fromTo(container, { opacity: 0, scale: 0.97 }, {
          opacity: 1, scale: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: container, start: "top 80%", once: true },
        });
      }

      /* ── Photo: clip-path reveal from left ── */
      if (photoRef.current) {
        gsap.fromTo(photoRef.current,
          { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
          {
            clipPath: "inset(0 0% 0 0)", scale: 1,
            duration: 1.1, ease: "power3.inOut",
            scrollTrigger: { trigger: photoRef.current, start: "top 75%", once: true },
          }
        );
      }

      /* ── Label ── */
      const label = sectionRef.current?.querySelector(".about-label");
      if (label) {
        gsap.fromTo(label, { opacity: 0, y: 10 }, {
          opacity: 1, y: 0, duration: 0.5,
          scrollTrigger: { trigger: label, start: "top 85%", once: true },
        });
      }

      /* ── Text: split into lines, stagger ── */
      if (textRef.current) {
        const lines = textRef.current.querySelectorAll(".about-line");
        gsap.set(lines, { y: 40, opacity: 0 });
        gsap.to(lines, {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 78%", once: true },
        });
      }

      /* ── Giant CTA headline: word-by-word stagger with perspective ── */
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".headline-word");
        gsap.set(words, { y: 100, opacity: 0, rotateX: 30 });
        gsap.to(words, {
          y: 0, opacity: 1, rotateX: 0,
          stagger: 0.08, duration: 0.9, ease: "power4.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 80%", once: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ background: "var(--black)" }}>
      {/* About section — rounded border container */}
      <section
        id="about"
        className="about-container"
        style={{
          margin: "0 40px", border: "0.5px solid var(--border-on-black)",
          borderRadius: "24px", padding: "60px",
          opacity: 0, willChange: "transform, opacity",
        }}
      >
        <div style={{
          display: "grid", gridTemplateColumns: "280px 1fr",
          gap: "60px", alignItems: "start",
        }}>
          {/* Photo — clip-path reveal from left */}
          <div
            ref={photoRef}
            style={{
              width: "100%", aspectRatio: "1/1", overflow: "hidden", borderRadius: "8px",
              clipPath: "inset(0 100% 0 0)", willChange: "clip-path, transform",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar.jpg" alt="Ahmed Osama" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Text area */}
          <div ref={textRef}>
            <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
              <span className="about-label" style={{
                fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--dim-on-black)", fontFamily: "monospace",
                flexShrink: 0, paddingTop: "4px", opacity: 0,
              }}>
                {t.about.label}
              </span>
              <div>
                <p className="about-line" style={{
                  fontSize: "18px", lineHeight: 1.8,
                  color: "rgba(232,230,223,0.75)", fontWeight: 400,
                  opacity: 0, willChange: "transform, opacity",
                }}>
                  {t.about.p1}
                </p>
                <p className="about-line" style={{
                  fontSize: "18px", lineHeight: 1.8,
                  color: "rgba(232,230,223,0.75)", fontWeight: 400,
                  marginTop: "20px", opacity: 0, willChange: "transform, opacity",
                }}>
                  {t.about.p2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Giant CTA headline — word-by-word with perspective rotation */}
      <div
        ref={headlineRef}
        style={{ padding: "80px 40px 40px", textAlign: "center", perspective: "800px" }}
      >
        <div className="giant-headline" style={{ overflow: "hidden" }}>
          {t.about.headline1.split(" ").map((word, i) => (
            <span key={i} className="headline-word inline-block" style={{
              opacity: 0, marginRight: "0.25em", willChange: "transform, opacity",
            }}>
              {word}
            </span>
          ))}
        </div>
        <div className="giant-headline" style={{ overflow: "hidden" }}>
          {t.about.headline2.split(" ").map((word, i) => (
            <span key={i} className="headline-word inline-block" style={{
              opacity: 0, marginRight: "0.25em", willChange: "transform, opacity",
            }}>
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
