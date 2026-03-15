"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { MagneticButton } from "./ui/MagneticButton";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!title1Ref.current || !title2Ref.current) return;

    // Split text into characters
    const splitTitle1 = new SplitType(title1Ref.current, { types: "chars" });
    const splitTitle2 = new SplitType(title2Ref.current, { types: "chars" });

    // Setup initial state (hidden by clipping the parent container)
    // We wrap each char in a hidden overflow div automatically with SplitType when we set absolute/relative positioning
    // but a cleaner way is to just translate them down and clip them via a simple animation

    gsap.set([splitTitle1.chars, splitTitle2.chars], { y: "115%", opacity: 0 });
    gsap.set(descRef.current, { y: 20, opacity: 0 });
    gsap.set(btnRef.current, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // Start delay to allow page load/fonts
    tl.to([splitTitle1.chars, splitTitle2.chars], {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      stagger: 0.02,
      delay: 0.2
    })
    .to(descRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
    }, "-=0.4")
    .to(btnRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
    }, "-=0.4");

    return () => {
      splitTitle1.revert();
      splitTitle2.revert();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-black text-white px-6 sm:px-12 md:px-24 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-start z-10 mt-16">
        <h1
          className="text-[10vw] md:text-[8vw] lg:text-[7vw] font-bold leading-[0.9] tracking-tighter uppercase"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          <div ref={title1Ref} className="overflow-hidden">Ahmed Osama</div>
          <div ref={title2Ref} className="text-gray overflow-hidden">Backend & IoT Engineer</div>
        </h1>

        <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-8">
          <p
            ref={descRef}
            className="text-gray text-lg md:text-xl max-w-md font-medium"
          >
            Specializing in building robust ASP.NET Core applications, Clean Architecture, and scalable IoT Systems.
          </p>

          <div ref={btnRef}>
            <MagneticButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Let&apos;s Talk
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
