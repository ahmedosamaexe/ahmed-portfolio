"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, Server, Cpu, Code2, Globe, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Backend Development",
    description: "Designing robust and scalable APIs using ASP.NET Core, prioritizing clean code and maintainability.",
    icon: <Server className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-white transition-colors duration-300" />,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "IoT Systems",
    description: "Building resilient infrastructure for connected devices and real-time data processing pipelines.",
    icon: <Cpu className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-white transition-colors duration-300" />,
    colSpan: "col-span-1",
  },
  {
    title: "Database Architecture",
    description: "Optimizing complex queries and designing efficient schemas for SQL and NoSQL databases.",
    icon: <Database className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-white transition-colors duration-300" />,
    colSpan: "col-span-1",
  },
  {
    title: "System Architecture",
    description: "Implementing Clean Architecture, Microservices, and CQRS patterns for enterprise-grade applications.",
    icon: <Layers className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-white transition-colors duration-300" />,
    colSpan: "col-span-1 md:col-span-2",
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".bento-card");

    // Reset borders
    gsap.set(sectionRef.current.querySelectorAll(".border-top, .border-bottom"), { scaleX: 0, transformOrigin: "left" });
    gsap.set(sectionRef.current.querySelectorAll(".border-left, .border-right"), { scaleY: 0, transformOrigin: "top" });
    gsap.set(sectionRef.current.querySelectorAll(".card-content"), { opacity: 0, y: 20 });
    gsap.set(sectionRef.current.querySelector(".section-title"), { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    tl.to(sectionRef.current.querySelector(".section-title"), {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "expo.out"
    });

    cards.forEach((card, i) => {
      const top = card.querySelector(".border-top");
      const bottom = card.querySelector(".border-bottom");
      const left = card.querySelector(".border-left");
      const right = card.querySelector(".border-right");
      const content = card.querySelector(".card-content");

      // Draw borders then reveal content
      tl.to([top, right, bottom, left], {
        scaleX: 1,
        scaleY: 1,
        duration: 0.6,
        ease: "power2.inOut",
        stagger: 0.1,
      }, i === 0 ? "-=0.2" : "-=0.4")
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "expo.out",
      }, "-=0.2");
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative w-full py-24 md:py-40 bg-black text-white px-6 sm:px-12 md:px-24">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="section-title text-[8vw] md:text-[6vw] font-bold leading-[0.9] tracking-tighter uppercase mb-16 md:mb-24">
          Services <span className="text-gray">&amp;</span> Expertise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((service, i) => (
            <div
              key={i}
              className={`bento-card relative group ${service.colSpan} bg-black hover:bg-[#080808] transition-colors duration-500 min-h-[300px] flex flex-col justify-between p-8 md:p-12`}
            >
              {/* Border lines for GSAP drawing effect */}
              <div className="border-top absolute top-0 left-0 w-full h-[1px] bg-white/10" />
              <div className="border-right absolute top-0 right-0 w-[1px] h-full bg-white/10" />
              <div className="border-bottom absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
              <div className="border-left absolute top-0 left-0 w-[1px] h-full bg-white/10" />

              <div className="card-content flex flex-col h-full justify-between z-10">
                <div className="mb-8 transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500 origin-top-left ease-[cubic-bezier(0.16,1,0.3,1)]">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-gray text-base md:text-lg leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
