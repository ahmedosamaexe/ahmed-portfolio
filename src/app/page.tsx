"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Works from "@/components/Works";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HamburgerMenu from "@/components/HamburgerMenu";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

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
    <SmoothScroll>
      <HamburgerMenu />
      <Hero />
      <Services />
      <Works />
      <Skills />
      <About />
      <Contact />
      <Footer />
      <ScrollToTop />
    </SmoothScroll>
  );
}
