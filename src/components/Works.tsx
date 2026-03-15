"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Project {
  number: string;
  title: string;
  type: string;
  tags: string[];
  github: string;
  video: string;
}

const projects: Project[] = [
  {
    number: "01",
    title: "TaskManager API",
    type: "REST API · 2024",
    tags: ["BACKEND", "2024"],
    github: "https://github.com/ahmedosamaexe/task-manager-api",
    video: "/project1.mp4",
  },
  {
    number: "02",
    title: "Python Chat Engine",
    type: "TCP/IP · 2024",
    tags: ["BACKEND", "2024"],
    github: "https://github.com/ahmedosamaexe/python-chat-app",
    video: "/project2.mp4",
  },
];

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Title words stagger ── */
      const titleWords = sectionRef.current?.querySelectorAll(".works-title-word");
      if (titleWords?.length) {
        gsap.set(titleWords, { y: 100, opacity: 0 });
        gsap.to(titleWords, {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        });
      }

      /* ── Description fade ── */
      const desc = sectionRef.current?.querySelector(".works-desc");
      if (desc) {
        gsap.fromTo(desc, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: desc, start: "top 85%", once: true },
        });
      }

      /* ── Each project card ── */
      const cards = sectionRef.current?.querySelectorAll(".work-card");
      cards?.forEach((card) => {
        const num = card.querySelector(".work-number");
        const videoWrap = card.querySelector(".video-reveal");
        const info = card.querySelector(".work-info");

        /* Giant number: parallax scrub */
        if (num) {
          gsap.to(num, {
            y: -100, ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.5 },
          });
        }

        /* Video: clip-path reveal (curtain from bottom) */
        if (videoWrap) {
          gsap.fromTo(videoWrap,
            { clipPath: "inset(100% 0 0 0)", scale: 1.08 },
            {
              clipPath: "inset(0% 0 0 0)", scale: 1,
              duration: 1.2, ease: "power3.inOut",
              scrollTrigger: { trigger: videoWrap, start: "top 80%", once: true },
            }
          );
        }

        /* Info: slide up */
        if (info) {
          gsap.fromTo(info, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: info, start: "top 90%", once: true },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const renderTitleWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="works-title-word inline-block" style={{
        opacity: 0, marginRight: "0.2em", willChange: "transform, opacity",
      }}>
        {word}
      </span>
    ));

  return (
    <section
      id="works"
      ref={sectionRef}
      style={{ background: "var(--black)", padding: "100px 40px 60px" }}
    >
      {/* Giant headline */}
      <h2 className="section-giant-title" style={{ overflow: "hidden", marginBottom: "32px" }}>
        {renderTitleWords("SELECTED WORKS/")}
      </h2>

      <div className="works-desc" style={{
        display: "flex", gap: "24px", alignItems: "flex-start",
        marginBottom: "80px", flexWrap: "wrap", opacity: 0,
      }}>
        <span style={{
          fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--dim-on-black)", fontFamily: "monospace",
        }}>
          (PROJECTS)
        </span>
        <p style={{
          fontSize: "16px", lineHeight: 1.7, color: "var(--muted-on-black)", maxWidth: "400px",
        }}>
          Thoughtfully crafted backend systems that blend clean architecture with real-world performance demands.
        </p>
      </div>

      {/* Project cards */}
      {projects.map((project, i) => (
        <div
          key={i}
          className="work-card"
          style={{
            position: "relative", minHeight: "70vh",
            display: "flex", alignItems: "center",
            padding: "60px 0",
            borderBottom: "0.5px solid var(--border-on-black)",
            overflow: "hidden",
          }}
        >
          {/* Giant number — left */}
          <div
            className="work-number"
            style={{
              position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
              willChange: "transform",
            }}
          >
            <span className="project-number">{project.number}</span>
          </div>

          {/* Right: video + info */}
          <div style={{ marginLeft: "auto", width: "55%", maxWidth: "680px" }}>
            {/* Video reveal — clip-path curtain */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="video-reveal block"
              style={{
                width: "100%", aspectRatio: "16/10",
                overflow: "hidden", cursor: "pointer",
                borderRadius: "16px",
                clipPath: "inset(100% 0 0 0)",
                willChange: "clip-path, transform",
              }}
            >
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </a>

            {/* Info below video */}
            <div className="work-info" style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between", marginTop: "20px", gap: "16px",
              opacity: 0, willChange: "transform, opacity",
            }}>
              <div>
                <div style={{
                  fontFamily: "monospace", fontSize: "13px",
                  letterSpacing: "0.1em", color: "rgba(232,230,223,0.4)", marginBottom: "6px",
                }}>
                  {project.type}
                </div>
                <div style={{
                  fontSize: "28px", fontWeight: 700,
                  color: "var(--text-on-black)", letterSpacing: "-0.02em",
                }}>
                  {project.title}
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{
                    border: "1px solid rgba(232,230,223,0.2)", borderRadius: "999px",
                    padding: "5px 14px", fontSize: "11px",
                    color: "rgba(232,230,223,0.5)", letterSpacing: "0.05em",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
