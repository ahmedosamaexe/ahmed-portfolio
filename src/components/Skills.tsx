"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface SkillColumn {
  title: string;
  items: string[];
}

const columns: SkillColumn[] = [
  {
    title: "Languages & Tools",
    items: ["C#", "SQL", "Python", "TypeScript", "JavaScript", "Git", "Postman", "Docker", "Linux"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["ASP.NET Core", "Entity Framework Core", "SignalR", "MediatR", "Swagger / OpenAPI", "xUnit", "Serilog"],
  },
  {
    title: "Architecture & Concepts",
    items: [
      "Clean Architecture", "SOLID Principles", "Repository Pattern",
      "CQRS", "Design Patterns", "REST API Design", "Domain-Driven Design",
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Giant left text: stagger words from bottom ── */
      const leftWords = sectionRef.current?.querySelectorAll(".skills-left-word");
      if (leftWords?.length) {
        gsap.set(leftWords, { y: 80, opacity: 0 });
        gsap.to(leftWords, {
          y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        });
      }

      /* ── "Skills" heading clip-path reveal ── */
      const heading = sectionRef.current?.querySelector(".skills-heading");
      if (heading) {
        gsap.fromTo(heading,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)", opacity: 1,
            duration: 0.9, ease: "power3.inOut",
            scrollTrigger: { trigger: heading, start: "top 80%", once: true },
          }
        );
      }

      /* ── Skill columns: stagger from bottom ── */
      const cols = sectionRef.current?.querySelectorAll(".skill-col");
      cols?.forEach((col, i) => {
        const items = col.querySelectorAll(".skill-item");
        const colTitle = col.querySelector(".col-title");

        if (colTitle) {
          gsap.fromTo(colTitle, { y: 20, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, delay: i * 0.15, ease: "power2.out",
            scrollTrigger: { trigger: col, start: "top 85%", once: true },
          });
        }

        if (items.length) {
          gsap.fromTo(items, { y: 15, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: i * 0.15 + 0.2,
            ease: "power2.out",
            scrollTrigger: { trigger: col, start: "top 85%", once: true },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ background: "var(--black)", padding: "100px 40px 80px" }}
    >
      <div style={{
        display: "grid", gridTemplateColumns: "35% 1fr",
        gap: "60px", alignItems: "start",
      }}>
        {/* Left: giant text — word stagger */}
        <div style={{ overflow: "hidden" }}>
          {["ENGINEER", "BUILDER", "ARCHITECT/"].map((word, i) => (
            <div
              key={i}
              className="skills-left-word skills-giant-left"
              style={{ opacity: 0, willChange: "transform, opacity" }}
            >
              {word}
            </div>
          ))}
        </div>

        {/* Right: heading + 3 columns */}
        <div>
          <h2
            className="skills-heading"
            style={{
              fontFamily: "Inter, sans-serif", fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 700, color: "var(--text-on-black)",
              letterSpacing: "-0.02em", marginBottom: "40px", opacity: 0,
              willChange: "clip-path, opacity",
            }}
          >
            {lang === "ar" ? "المهارات" : "Skills"}
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "40px" }}>
            {columns.map((col, i) => (
              <div key={i} className="skill-col">
                <div className="col-title" style={{
                  fontSize: "14px", fontWeight: 700,
                  color: "var(--text-on-black)", marginBottom: "16px",
                  borderBottom: "0.5px solid var(--border-on-black)", paddingBottom: "8px",
                  opacity: 0, willChange: "transform, opacity",
                }}>
                  {col.title}
                </div>
                {col.items.map((item, j) => (
                  <div key={j} className="skill-item" style={{
                    fontSize: "15px", color: "rgba(232,230,223,0.65)",
                    padding: "6px 0", fontWeight: 400,
                    opacity: 0, willChange: "transform, opacity",
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
