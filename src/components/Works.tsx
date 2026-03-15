"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "TaskManager API",
    category: "REST API Architecture",
    year: "2024",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    link: "https://github.com/ahmedosamaexe/task-manager-api",
  },
  {
    id: "02",
    title: "Python Chat Engine",
    category: "TCP/IP Networking",
    year: "2024",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    link: "https://github.com/ahmedosamaexe/python-chat-app",
  },
  {
    id: "03",
    title: "IoT Data Pipeline",
    category: "Real-time Processing",
    year: "2023",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    link: "#",
  }
];

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title reveal
    gsap.fromTo(
      sectionRef.current.querySelector(".works-title"),
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    const projectCards = sectionRef.current.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      const imageContainer = card.querySelector(".image-container");
      const image = card.querySelector(".parallax-image");
      const info = card.querySelector(".project-info");

      // Reveal Image Container
      gsap.fromTo(
        imageContainer,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
          }
        }
      );

      // Parallax effect on image
      gsap.fromTo(
        image,
        { y: "-15%" },
        {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Reveal info
      gsap.fromTo(
        info,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="works" className="relative w-full py-24 md:py-40 bg-black text-white px-6 sm:px-12 md:px-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">

        <div className="overflow-hidden mb-20 md:mb-32">
          <h2 className="works-title text-[10vw] md:text-[8vw] font-bold leading-[0.9] tracking-tighter uppercase origin-bottom">
            Selected Works
          </h2>
        </div>

        <div className="flex flex-col gap-32 md:gap-48">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group block relative"
              data-cursor="view"
            >
              {/* Project Image Container */}
              <div className="image-container relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-[#111]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="parallax-image object-cover scale-[1.1] group-hover:scale-[1.15] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Project Info */}
              <div className="project-info mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray text-lg">{project.category}</p>
                </div>

                <div className="flex items-center gap-6 text-gray font-mono text-sm tracking-widest">
                  <span>{project.id}</span>
                  <span className="w-12 h-[1px] bg-border" />
                  <span>{project.year}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
