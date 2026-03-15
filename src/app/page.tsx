"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Skills from "@/components/Skills";

function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="scroll-top-btn"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Works />
      <ScrollToTop />
    </main>
  );
}
