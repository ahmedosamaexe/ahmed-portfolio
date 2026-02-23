"use client";

import { motion } from "framer-motion";
import { Server, Code2, Cpu, Layers, Network, Zap, Globe, GitBranch, Radio } from "lucide-react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Skill {
    name: string;
    type: "devicon" | "lucide";
    icon?: string;
    LucideIcon?: React.ElementType;
    color: string;
}

interface Category {
    id: string;
    name: string;
    HeaderIcon: React.ElementType;
    gradient: string;
    glowColor: string;
    skills: Skill[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories: Category[] = [
    {
        id: "core",
        name: "Core Stack",
        HeaderIcon: Server,
        gradient: "linear-gradient(135deg, #00f5ff22, #0066ff22)",
        glowColor: "#00f5ff",
        skills: [
            {
                name: "C#",
                type: "devicon",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-plain.svg",
                color: "#9B4F96",
            },
            {
                name: ".NET / ASP.NET Core",
                type: "devicon",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-plain.svg",
                color: "#7B6FD4",
            },
            {
                name: "SQL Server",
                type: "devicon",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
                color: "#CC2927",
            },
        ],
    },
    {
        id: "backend",
        name: "Backend Engineering",
        HeaderIcon: Code2,
        gradient: "linear-gradient(135deg, #0066ff22, #7c3aed22)",
        glowColor: "#0066ff",
        skills: [
            { name: "REST API Design", type: "lucide", LucideIcon: Globe, color: "#00f5ff" },
            { name: "TCP/IP Sockets", type: "lucide", LucideIcon: Network, color: "#00f5ff" },
            { name: "Real-time Systems", type: "lucide", LucideIcon: Zap, color: "#00f5ff" },
        ],
    },
    {
        id: "iot",
        name: "IoT Systems",
        HeaderIcon: Cpu,
        gradient: "linear-gradient(135deg, #7c3aed22, #db277722)",
        glowColor: "#a78bfa",
        skills: [
            { name: "IoT Sensor Integration", type: "lucide", LucideIcon: Cpu, color: "#a78bfa" },
            { name: "Custom Protocols", type: "lucide", LucideIcon: GitBranch, color: "#a78bfa" },
            { name: "Embedded Communication", type: "lucide", LucideIcon: Radio, color: "#a78bfa" },
        ],
    },
    {
        id: "secondary",
        name: "Secondary",
        HeaderIcon: Layers,
        gradient: "linear-gradient(135deg, #05966922, #0891b222)",
        glowColor: "#34d399",
        skills: [
            {
                name: "Python",
                type: "devicon",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-plain.svg",
                color: "#3776AB",
            },
            {
                name: "MongoDB",
                type: "devicon",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain.svg",
                color: "#47A248",
            },
        ],
    },
];

// ─── Animation variants ────────────────────────────────────────────────────────
const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
    }),
};



// ─── Skill Icon ───────────────────────────────────────────────────────────────
function SkillIcon({ skill }: { skill: Skill }) {
    if (skill.type === "devicon" && skill.icon) {
        return (
            <Image
                src={skill.icon}
                alt={skill.name}
                width={20}
                height={20}
                className="w-5 h-5 object-contain flex-shrink-0"
            />
        );
    }
    if (skill.LucideIcon) {
        return <skill.LucideIcon size={18} style={{ color: skill.color }} strokeWidth={1.6} className="flex-shrink-0" />;
    }
    return null;
}

// ─── Category Card ────────────────────────────────────────────────────────────
function CategoryCard({ category, index }: { category: Category; index: number }) {
    const { HeaderIcon } = category;

    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                y: -8,
                boxShadow: `0 0 48px ${category.glowColor}28, 0 16px 56px rgba(0,0,0,0.6)`,
                borderColor: `${category.glowColor}40`,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="flex flex-col rounded-2xl overflow-hidden"
            style={{
                background: "#0d1117",
                border: `1px solid ${category.glowColor}20`,
                boxShadow: `0 0 24px ${category.glowColor}0a, 0 4px 20px rgba(0,0,0,0.4)`,
            }}
        >
            {/* Banner */}
            <div
                className="relative px-6 py-5 flex items-center gap-4"
                style={{
                    background: category.gradient,
                    borderBottom: `1px solid ${category.glowColor}20`,
                }}
            >
                {/* Glow blob behind icon */}
                <div
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full blur-[28px] pointer-events-none"
                    style={{ background: `${category.glowColor}30` }}
                />
                <div
                    className="relative w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                        background: `${category.glowColor}18`,
                        border: `1px solid ${category.glowColor}35`,
                        boxShadow: `0 0 16px ${category.glowColor}28`,
                    }}
                >
                    <HeaderIcon size={22} color={category.glowColor} strokeWidth={1.6} />
                </div>
                <h3 className="font-heading font-bold text-white text-lg leading-tight">
                    {category.name}
                </h3>
            </div>

            {/* Skill rows */}
            <div className="flex flex-col flex-1 px-5 py-4 gap-0">
                {category.skills.map((skill, si) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.15 + si * 0.07, ease: "easeOut" }}
                        className="flex items-center gap-3 py-3"
                        style={{
                            borderBottom: si < category.skills.length - 1
                                ? "1px solid rgba(255,255,255,0.05)"
                                : "none",
                        }}
                    >
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: `${skill.color}14` }}
                        >
                            <SkillIcon skill={skill} />
                        </div>
                        <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Skills() {
    const [row1, secondary] = [categories.slice(0, 3), categories[3]];

    return (
        <section id="skills" className="relative py-28 bg-[#03060e] overflow-hidden">
            {/* Top separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,102,255,0.25)] to-transparent" />

            {/* Subtle grid bg */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,245,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.025) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Radial vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 35%, #03060e 100%)" }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs tracking-[0.3em] uppercase text-[#0066ff] font-medium">Tech Stack</span>
                    <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-3">
                        Skills &amp; Expertise
                    </h2>
                    <p className="text-slate-500 mt-4 text-sm max-w-md mx-auto leading-relaxed">
                        Tools and technologies I use to build real-world systems.
                    </p>
                </motion.div>

                {/* Row 1 — 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    {row1.map((cat, i) => (
                        <CategoryCard key={cat.id} category={cat} index={i} />
                    ))}
                </div>

                {/* Row 2 — Secondary card centered */}
                <div className="flex justify-center">
                    <div className="w-full max-w-sm">
                        <CategoryCard category={secondary} index={3} />
                    </div>
                </div>
            </div>
        </section>
    );
}
