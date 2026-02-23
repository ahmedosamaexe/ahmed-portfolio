"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Code2, Cpu } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
    }),
};

const stats = [
    { label: "Year", value: "3rd", sub: "CS Student" },
    { label: "Focus", value: ".NET", sub: "Backend Eng." },
    { label: "Specialty", value: "IoT", sub: "Systems" },
    { label: "Grad.", value: "'27", sub: "Expected" },
];

export default function About() {
    return (
        <section id="about" className="relative py-28 bg-grid">
            {/* Ambient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-[rgba(0,245,255,0.3)] to-transparent" />

            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={0}
                    className="mb-16 text-center"
                >
                    <span className="text-xs tracking-[0.3em] uppercase text-[#00f5ff] font-medium">About Me</span>
                    <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-3">
                        Engineered by Curiosity
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    {/* Left — Bio */}
                    <div className="space-y-5">
                        {[
                            {
                                i: 1,
                                text: "I'm Ahmed Osama, a 3rd-year Computer Science student at Menoufia National University specializing in Internet of Things. I build backend infrastructure — real-time data pipelines, socket servers, and REST APIs that power IoT environments.",
                            },
                            {
                                i: 2,
                                text: "My core focus is .NET backend engineering: designing ASP.NET Core services, architecting clean data layers with SQL Server, and implementing raw TCP/IP socket servers with custom communication protocols — no frameworks between me and the wire.",
                            },
                            {
                                i: 3,
                                text: "IoT specialization means I obsess over latency. When sensor data must reach the backend in milliseconds at scale, every abstraction layer is a liability. I engineer systems that are lean, reliable, and built to last.",
                            },
                        ].map(({ i, text }) => (
                            <motion.p
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                custom={i}
                                className="text-slate-400 leading-relaxed text-base"
                            >
                                {text}
                            </motion.p>
                        ))}

                        {/* Stats row */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            custom={4}
                            className="grid grid-cols-4 gap-3 pt-4"
                        >
                            {stats.map(({ label, value, sub }) => (
                                <div
                                    key={label}
                                    className="text-center py-4 px-2 rounded-xl glass border border-[rgba(0,245,255,0.1)] hover:border-[rgba(0,245,255,0.25)] transition-colors"
                                >
                                    <div className="font-heading text-2xl font-bold gradient-text">{value}</div>
                                    <div className="text-[10px] text-[#00f5ff]/70 uppercase tracking-widest mt-0.5">{label}</div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">{sub}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — Education card + identity pills */}
                    <div className="space-y-5">
                        {/* Education card */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            custom={2}
                            className="relative glass border border-[rgba(0,245,255,0.15)] rounded-2xl p-6 hover:border-[rgba(0,245,255,0.3)] transition-all duration-300 card-glow overflow-hidden"
                        >
                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00f5ff]/5 rounded-bl-[80px]" />
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[rgba(0,245,255,0.1)] border border-[rgba(0,245,255,0.2)] flex items-center justify-center text-[#00f5ff] flex-shrink-0">
                                    <GraduationCap size={22} />
                                </div>
                                <div>
                                    <div className="font-heading font-semibold text-white text-base">
                                        Menoufia National University
                                    </div>
                                    <div className="text-[#00f5ff] text-sm mt-0.5">Faculty of Computers & AI</div>
                                    <div className="text-slate-400 text-sm mt-1">Internet of Things Department</div>
                                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                                        <span className="px-3 py-1 rounded-full text-xs bg-[rgba(0,245,255,0.08)] text-[#00f5ff] border border-[rgba(0,245,255,0.2)]">
                                            3rd Year
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-xs bg-[rgba(0,102,255,0.08)] text-[#0066ff] border border-[rgba(0,102,255,0.2)]">
                                            Graduating 2027
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Identity cards */}
                        {[
                            {
                                icon: <Code2 size={18} />,
                                title: "Backend .NET Engineer",
                                desc: "Building robust, scalable server-side systems with ASP.NET, clean architecture patterns, and SQL/NoSQL databases.",
                            },
                            {
                                icon: <Cpu size={18} />,
                                title: "IoT Systems Specialist",
                                desc: "Designing real-time telemetry pipelines, custom socket protocols, and device-to-cloud communication layers.",
                            },
                            {
                                icon: <MapPin size={18} />,
                                title: "Tanta, Gharbia, Egypt",
                                desc: "Building globally, shipping remotely. Open to international remote opportunities.",
                            },
                        ].map(({ icon, title, desc }, idx) => (
                            <motion.div
                                key={title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                custom={idx + 3}
                                className="flex items-start gap-4 glass border border-[rgba(255,255,255,0.06)] rounded-xl p-4 hover:border-[rgba(0,245,255,0.2)] transition-all duration-300"
                            >
                                <div className="w-9 h-9 rounded-lg bg-[rgba(0,245,255,0.08)] border border-[rgba(0,245,255,0.15)] flex items-center justify-center text-[#00f5ff] flex-shrink-0">
                                    {icon}
                                </div>
                                <div>
                                    <div className="font-heading font-semibold text-white text-sm">{title}</div>
                                    <div className="text-slate-500 text-xs leading-relaxed mt-0.5">{desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
