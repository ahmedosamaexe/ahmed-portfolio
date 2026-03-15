"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Text splitting: each letter animates up ── */
      if (nameRef.current) {
        const letters = nameRef.current.querySelectorAll(".hero-letter");
        gsap.set(letters, { y: 120, opacity: 0, rotateX: 40 });
        gsap.to(letters, {
          y: 0, opacity: 1, rotateX: 0,
          duration: 1.0, stagger: 0.035, ease: "power4.out", delay: 0.3,
        });
      }

      /* ── Subtitle + Nav fade in ── */
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: "power2.out" });
      }
      if (navRef.current) {
        gsap.fromTo(navRef.current, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.7, ease: "power2.out" });
      }

      /* ── Arrow ── */
      if (arrowRef.current) {
        gsap.fromTo(arrowRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.0 });
      }

      /* ── Tagline: words stagger up ── */
      if (taglineRef.current) {
        const words = taglineRef.current.querySelectorAll(".tagline-word");
        gsap.set(words, { y: 30, opacity: 0 });
        gsap.to(words, {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power3.out", delay: 0.9,
        });
      }

      /* ── Photo: clip-path reveal ── */
      if (photoRef.current) {
        gsap.fromTo(photoRef.current,
          { clipPath: "inset(100% 0 0 0)", scale: 1.1 },
          { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.2, delay: 0.8, ease: "power3.inOut" }
        );
      }

      /* ── Right info ── */
      if (rightRef.current) {
        gsap.fromTo(rightRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, delay: 1.0, ease: "power2.out" });
      }

      /* ── Parallax: hero content moves up on scroll ── */
      if (sectionRef.current) {
        gsap.to(sectionRef.current.querySelector(".hero-inner"), {
          y: -80, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current, start: "top top",
            end: "bottom top", scrub: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const renderName = (text: string) =>
    text.split("").map((ch, i) => (
      <span
        key={i}
        className="hero-letter inline-block"
        style={{ opacity: 0, willChange: "transform, opacity", perspective: "600px" }}
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));

  const renderTaglineWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="tagline-word inline-block" style={{ marginRight: "0.3em", opacity: 0 }}>
        {word}
      </span>
    ));

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--cream)", minHeight: "100vh" }}
    >
      {/* NAV */}
      <nav className="absolute top-0 left-0 right-0 z-30" style={{ padding: "28px 40px" }}>
        <div className="flex items-center justify-between">
          <span
            ref={subtitleRef}
            style={{ fontSize: "14px", fontWeight: 400, color: "var(--text-on-cream)", opacity: 0 }}
          >
            {t.subtitle}
          </span>
          <div ref={navRef} className="hidden md:flex items-center" style={{ gap: "28px", opacity: 0 }}>
            {(["services", "works", "about", "contact"] as const).map((id) => (
              <button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  fontSize: "14px", fontWeight: 400, color: "var(--text-on-cream)", background: "none",
                  border: "none", cursor: "pointer", transition: "opacity 200ms",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.4"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                {t.nav[id]}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div className="hero-inner" style={{ paddingTop: "80px", willChange: "transform" }}>
        {/* Giant name — ONE LINE */}
        <div ref={nameRef} style={{ padding: "0 40px", overflow: "hidden" }}>
          <div className="hero-name-line">{renderName("AHMED OSAMA")}</div>
        </div>

        {/* Arrow */}
        <div ref={arrowRef} style={{
          fontSize: "24px", color: "var(--dim-on-cream)", marginTop: "24px",
          padding: "0 40px", opacity: 0,
        }}>
          ↘
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row items-end justify-between"
          style={{ padding: "20px 40px 40px", gap: "32px" }}
        >
          {/* Left: tagline + niche quote + CTA */}
          <div ref={taglineRef} style={{ maxWidth: "380px" }}>
            <p style={{ fontSize: "16px", lineHeight: 1.6, color: "rgba(26,26,26,0.65)", overflow: "hidden" }}>
              {renderTaglineWords(t.hero.tagline)}
            </p>
            <p style={{
              fontSize: "14px", fontStyle: "italic", color: "rgba(26,26,26,0.45)", marginTop: "12px",
              opacity: 0,
            }}
              className="tagline-word"
            >
              &ldquo;{t.hero.nicheQuote}&rdquo;
            </p>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="pill-btn tagline-word"
              style={{ marginTop: "24px", opacity: 0 }}
            >
              {t.hero.cta}
            </button>
          </div>

          {/* Center: photo — clip-path reveal */}
          <div
            ref={photoRef}
            style={{
              width: "280px", aspectRatio: "3/4", flexShrink: 0, overflow: "hidden",
              borderRadius: "12px", clipPath: "inset(100% 0 0 0)", willChange: "clip-path, transform",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar.jpg" alt="Ahmed Osama" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Right: badge + MAR'26 */}
          <div ref={rightRef} style={{ textAlign: "right", opacity: 0 }}>
            <div style={{
              fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
              color: "var(--dim-on-cream)", fontFamily: "monospace",
            }}>
              {t.hero.availableBadge}
            </div>
            <div style={{
              fontFamily: "var(--font-bebas-neue), Bebas Neue, sans-serif",
              fontSize: "clamp(56px, 7vw, 90px)", fontWeight: 400,
              color: "var(--text-on-cream)", letterSpacing: "-0.03em", lineHeight: 1, marginTop: "4px",
            }}>
              MAR&apos;26
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
