"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Mail, Phone, Download, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("./ParticlesBackground"), { ssr: false });

const socials = [
    { icon: Github, href: "https://github.com/ahmedosamaexe", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ahmed-osama-b4078b389", label: "LinkedIn" },
    { icon: Mail, href: "mailto:ahmed4real9@gmail.com", label: "Email" },
    { icon: Phone, href: "https://wa.me/201050608122", label: "WhatsApp" },
];

export default function Hero() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollDown = () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="hero"
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-grid scan-overlay"
        >
            <ParticlesBackground />

            {/* Ambient glow blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#0066ff]/6 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {/* Left — text */}
                <div className="flex-1 text-center lg:text-left">
                    {/* Greeting badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[rgba(0,245,255,0.2)] text-xs font-medium text-[#00f5ff] mb-6 tracking-widest uppercase"
                    >
                        <span className="inline-block w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" />
                        Available for opportunities
                    </motion.div>

                    {/* Name — clean gradient */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-4"
                    >
                        <h1
                            className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight"
                            style={{
                                background: "linear-gradient(100deg, #ffffff 30%, #00f5ff 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Ahmed Osama
                        </h1>
                    </motion.div>

                    {/* Typing title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="h-14 flex items-center justify-center lg:justify-start mb-6"
                    >
                        <div className="font-heading text-2xl sm:text-3xl font-medium">
                            <span className="text-slate-400">I build&nbsp;</span>
                            <TypeAnimation
                                sequence={[
                                    "Backend .NET Engineer",
                                    2800,
                                    "IoT Systems Specialist",
                                    2800,
                                ]}
                                wrapper="span"
                                cursor={true}
                                repeat={Infinity}
                                className="gradient-text"
                            />
                        </div>
                    </motion.div>

                    {/* Bio */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                        className="text-slate-400 text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8"
                    >
                        3rd-year CS student at{" "}
                        <span className="text-[#00f5ff] font-medium">Menoufia National University</span>
                        {" "}specializing in IoT. I build real-time backends, TCP socket servers,
                        and device-to-cloud data pipelines using C# and .NET.
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
                    >
                        <motion.a
                            href="/cv.pdf"
                            download
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00f5ff] text-[#020408] font-heading font-semibold text-sm hover:bg-white transition-all duration-200"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,245,255,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download size={16} />
                            Download CV
                        </motion.a>
                        <motion.button
                            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[rgba(0,245,255,0.3)] text-[#00f5ff] font-heading font-semibold text-sm hover:bg-[rgba(0,245,255,0.08)] transition-all duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Projects
                        </motion.button>
                    </motion.div>

                    {/* Social icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.85 }}
                        className="flex gap-3 justify-center lg:justify-start"
                    >
                        {socials.map(({ icon: Icon, href, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="w-10 h-10 rounded-lg glass border border-[rgba(0,245,255,0.15)] flex items-center justify-center text-slate-400 hover:text-[#00f5ff] hover:border-[rgba(0,245,255,0.4)] transition-all duration-200"
                                whileHover={{ scale: 1.15, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icon size={18} />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* Right — Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 40 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="flex-shrink-0 relative"
                    ref={scrollRef}
                >
                    {/* Spinning ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[rgba(0,245,255,0.15)] spin-slow -inset-6" />
                    {/* Static outer ring */}
                    <div className="absolute -inset-3 rounded-full border border-[rgba(0,245,255,0.25)]" />

                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 float-animation">
                        {/* Glow background */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00f5ff]/20 to-[#0066ff]/20 blur-xl" />
                        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[rgba(0,245,255,0.3)] pulse-glow">
                            <Image
                                src="/avatar.jpg"
                                alt="Ahmed Osama"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Floating badge — location */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="absolute -right-4 top-6 glass border border-[rgba(0,245,255,0.2)] rounded-xl px-3 py-2 text-xs font-medium text-[#00f5ff] whitespace-nowrap"
                        >
                            📍 Tanta, Egypt
                        </motion.div>

                        {/* Floating badge — status */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            className="absolute -left-4 bottom-8 glass border border-[rgba(0,102,255,0.3)] rounded-xl px-3 py-2 text-xs font-medium text-[#0066ff] whitespace-nowrap"
                        >
                            🎓 3rd Year CS
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.button
                onClick={scrollDown}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-[#00f5ff] transition-colors group"
                whileHover={{ scale: 1.1 }}
                aria-label="Scroll down"
            >
                <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </motion.button>
        </section>
    );
}
