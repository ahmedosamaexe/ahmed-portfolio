"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "./LanguageContext";

const sectionIds = ["services", "works", "about", "contact"];

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();
  const labels = [t.nav.services, t.nav.works, t.nav.about, t.nav.contact];

  useEffect(() => {
    const check = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setVisible(heroBottom < 0);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && open) setOpen(false);
  }, [open]);

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const scrollTo = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (!visible && !open) return null;

  return (
    <>
      {/* Cream/beige circle — fixed top-right (like Zuned's screenshot) */}
      <button
        onClick={() => setOpen(!open)}
        className="hamburger-circle fixed z-50"
        style={{ top: "24px", right: "40px" }}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="1" y1="1" x2="17" y2="17" />
            <line x1="17" y1="1" x2="1" y2="17" />
          </svg>
        ) : (
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="0" y1="3" x2="20" y2="3" />
            <line x1="0" y1="11" x2="20" y2="11" />
          </svg>
        )}
      </button>

      {/* Full-screen overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-4"
          style={{ background: "var(--black)" }}
        >
          {sectionIds.map((id, i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 700,
                color: "var(--text-on-black)", background: "none",
                border: "none", cursor: "pointer", letterSpacing: "-0.02em",
                transition: "opacity 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.4"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              {labels[i]}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
