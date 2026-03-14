"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    /* ── Sync Lenis ↔ GSAP ScrollTrigger ── */
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    /* ── Mobile: reduce duration for better feel ── */
    const mql = window.matchMedia("(max-width: 768px)");
    const handleMobile = (e: MediaQueryList | MediaQueryListEvent) => {
      if ("matches" in e && e.matches) {
        lenis.options.duration = 1.0;
      }
    };
    handleMobile(mql);
    mql.addEventListener("change", handleMobile);

    return () => {
      mql.removeEventListener("change", handleMobile);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
