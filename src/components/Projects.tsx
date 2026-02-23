"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, X, MessageSquare, Brain, ArrowUpRight, ChevronRight, Server } from "lucide-react";

interface Project {
    title: string;
    subtitle: string;
    summary: string;
    description: string;
    features: string[];
    tech: string[];
    github: string;
    icon: React.ReactNode;
    accentColor: string;
    featured?: boolean;
    bannerContent: (c: string, hovered: boolean) => React.ReactNode;
}

// ─── Banner Illustrations ─────────────────────────────────────────────────────
function TaskManagerBanner(c: string, hovered: boolean) {
    return (
        <svg viewBox="0 0 280 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Grid dots */}
            {[0, 1, 2, 3, 4, 5, 6].map(col => [0, 1, 2, 3].map(row => (
                <circle key={`${col}-${row}`} cx={20 + col * 40} cy={14 + row * 28} r="1.2" fill={c} opacity="0.12" />
            )))}
            {/* Server block */}
            <rect x="30" y="22" width="68" height="66" rx="8" fill={`${c}08`} stroke={c} strokeWidth="1" opacity={hovered ? 0.9 : 0.6} />
            <rect x="38" y="31" width="52" height="8" rx="3" fill={`${c}20`} />
            <rect x="38" y="43" width="40" height="5" rx="2.5" fill={`${c}15`} />
            <rect x="38" y="52" width="45" height="5" rx="2.5" fill={`${c}15`} />
            <circle cx="82" cy="80" r="4" fill={`${c}40`} />
            <circle cx="71" cy="80" r="4" fill={`${c}25`} />
            {/* Connecting lines */}
            <line x1="98" y1="55" x2="116" y2="55" stroke={c} strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
            <line x1="98" y1="55" x2="98" y2="35" stroke={c} strokeWidth="1" strokeDasharray="3 2" opacity="0.25" />
            {/* Database cylinder */}
            <ellipse cx="140" cy="32" rx="26" ry="8" fill={`${c}10`} stroke={c} strokeWidth="1" opacity={hovered ? 0.9 : 0.6} />
            <rect x="114" y="32" width="52" height="34" fill={`${c}08`} stroke={c} strokeWidth="1" opacity={hovered ? 0.9 : 0.6} />
            <ellipse cx="140" cy="66" rx="26" ry="8" fill={`${c}10`} stroke={c} strokeWidth="1" opacity={hovered ? 0.9 : 0.6} />
            <ellipse cx="140" cy="40" rx="26" ry="8" fill="none" stroke={c} strokeWidth="0.8" strokeDasharray="4 3" opacity="0.3" />
            <ellipse cx="140" cy="50" rx="26" ry="8" fill="none" stroke={c} strokeWidth="0.8" strokeDasharray="4 3" opacity="0.2" />
            {/* Lock icon */}
            <rect x="182" y="40" width="68" height="52" rx="8" fill={`${c}08`} stroke={c} strokeWidth="1" opacity={hovered ? 0.9 : 0.6} />
            <rect x="200" y="52" width="32" height="24" rx="4" fill={`${c}18`} stroke={c} strokeWidth="1" opacity={hovered ? 1 : 0.7} />
            <path d="M207 52 v-6 a9 9 0 0 1 18 0 v6" stroke={c} strokeWidth="1.5" fill="none" opacity={hovered ? 0.9 : 0.55} strokeLinecap="round" />
            <circle cx="216" cy="63" r="4" fill={c} opacity={hovered ? 0.85 : 0.5} />
            <rect x="214.5" y="65" width="3" height="5" rx="1.5" fill={c} opacity={hovered ? 0.85 : 0.5} />
            {/* Glowing dot accent */}
            <circle cx="140" cy="92" r="3" fill={c} opacity={hovered ? 0.9 : 0.4} />
            <circle cx="140" cy="92" r="6" fill={c} opacity={hovered ? 0.15 : 0.05} />
        </svg>
    );
}

function ChatEngineBanner(c: string, hovered: boolean) {
    return (
        <svg viewBox="0 0 280 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {[0, 1, 2, 3, 4, 5, 6].map(col => [0, 1, 2, 3].map(row => (
                <circle key={`${col}-${row}`} cx={20 + col * 40} cy={14 + row * 28} r="1.2" fill={c} opacity="0.12" />
            )))}
            {/* Left bubble */}
            <rect x="18" y="18" width="88" height="54" rx="12" fill={`${c}0d`} stroke={c} strokeWidth="1" opacity={hovered ? 0.9 : 0.6} />
            <path d="M30 72 l-12 14 l24 -14" fill={`${c}0d`} stroke={c} strokeWidth="1" opacity={hovered ? 0.9 : 0.6} />
            <rect x="28" y="30" width="68" height="6" rx="3" fill={`${c}25`} />
            <rect x="28" y="42" width="50" height="6" rx="3" fill={`${c}18`} />
            <rect x="28" y="54" width="58" height="6" rx="3" fill={`${c}18`} />
            {/* Center network node */}
            <circle cx="140" cy="55" r="18" fill={`${c}0a`} stroke={c} strokeWidth="1.2" opacity={hovered ? 0.9 : 0.65} />
            <circle cx="140" cy="55" r="6" fill={c} opacity={hovered ? 0.7 : 0.4} />
            <line x1="106" y1="55" x2="122" y2="55" stroke={c} strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
            <line x1="158" y1="55" x2="174" y2="55" stroke={c} strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
            <line x1="140" y1="37" x2="140" y2="18" stroke={c} strokeWidth="1" strokeDasharray="3 2" opacity="0.3" />
            <line x1="140" y1="73" x2="140" y2="92" stroke={c} strokeWidth="1" strokeDasharray="3 2" opacity="0.3" />
            {/* Right bubble */}
            <rect x="174" y="18" width="88" height="54" rx="12" fill={`${c}0d`} stroke={c} strokeWidth="1" opacity={hovered ? 0.9 : 0.6} />
            <path d="M250 72 l12 14 l-24 -14" fill={`${c}0d`} stroke={c} strokeWidth="1" opacity={hovered ? 0.9 : 0.6} />
            <rect x="184" y="30" width="68" height="6" rx="3" fill={`${c}25`} />
            <rect x="184" y="42" width="42" height="6" rx="3" fill={`${c}18`} />
            <rect x="184" y="54" width="56" height="6" rx="3" fill={`${c}18`} />
        </svg>
    );
}

function ClassifierBanner(c: string, hovered: boolean) {
    const nodes = [
        { x: 50, y: 55 },
        { x: 110, y: 28 }, { x: 110, y: 55 }, { x: 110, y: 82 },
        { x: 170, y: 38 }, { x: 170, y: 72 },
        { x: 230, y: 55 },
    ];
    const edges = [
        [0, 1], [0, 2], [0, 3],
        [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5],
        [4, 6], [5, 6],
    ];
    return (
        <svg viewBox="0 0 280 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {[0, 1, 2, 3, 4, 5, 6].map(col => [0, 1, 2, 3].map(row => (
                <circle key={`${col}-${row}`} cx={20 + col * 40} cy={14 + row * 28} r="1.2" fill={c} opacity="0.10" />
            )))}
            {edges.map(([a, b], i) => (
                <line key={i}
                    x1={nodes[a].x} y1={nodes[a].y}
                    x2={nodes[b].x} y2={nodes[b].y}
                    stroke={c} strokeWidth="1"
                    opacity={hovered ? 0.35 : 0.2}
                />
            ))}
            {nodes.map((n, i) => (
                <g key={i}>
                    <circle cx={n.x} cy={n.y} r={i === 0 || i === 6 ? 10 : 8}
                        fill={`${c}10`} stroke={c} strokeWidth="1.2"
                        opacity={hovered ? 0.9 : 0.65}
                    />
                    <circle cx={n.x} cy={n.y} r={i === 0 || i === 6 ? 4 : 3}
                        fill={c} opacity={hovered ? 0.75 : 0.4}
                    />
                </g>
            ))}
            {/* Binary stream */}
            {["1", "0", "1", "1", "0"].map((b, i) => (
                <text key={i} x={12 + i * 14} y={100} fontSize="8" fill={c} opacity={hovered ? 0.4 : 0.2} fontFamily="monospace">{b}</text>
            ))}
            {["0", "1", "0"].map((b, i) => (
                <text key={i} x={196 + i * 14} y={100} fontSize="8" fill={c} opacity={hovered ? 0.4 : 0.2} fontFamily="monospace">{b}</text>
            ))}
        </svg>
    );
}

const projects: Project[] = [
    {
        title: "TaskManager API",
        subtitle: "Production-Ready REST API with JWT Authentication",
        summary: "Full-featured Task Management REST API with JWT auth, CRUD operations, and interactive Swagger UI documentation.",
        description:
            "A fully functional Task Management REST API built with ASP.NET Core 10 and Entity Framework Core. Features JWT-based authentication, full CRUD operations, SQL Server integration, and interactive Swagger UI documentation for live API testing.",
        features: [
            "JWT Bearer token authentication with secure password hashing",
            "Full CRUD task management with user-scoped data isolation",
            "Entity Framework Core with SQL Server and code-first migrations",
            "Interactive Swagger UI for live API testing and documentation",
        ],
        tech: ["C#", "ASP.NET Core 10", "Entity Framework Core", "SQL Server", "JWT", "Swagger"],
        github: "https://github.com/ahmedosamaexe/task-manager-api",
        icon: <Server size={20} />,
        accentColor: "#00e5ff",
        featured: true,
        bannerContent: TaskManagerBanner,
    },
    {
        title: "Python Chat Engine",
        subtitle: "TCP/IP Socket Chat Server",
        summary: "Non-blocking TCP/IP chat server with custom JSON protocol from scratch.",
        description:
            "A bidirectional, non-blocking TCP/IP chat server engineered from scratch using pure socket programming and a custom JSON protocol — zero frameworks, raw backend engineering.",
        features: [
            "Non-blocking bidirectional TCP socket server",
            "Custom JSON-based messaging protocol designed from scratch",
            "Handles multiple concurrent client connections",
            "Zero framework dependencies — pure Python socket engineering",
        ],
        tech: ["Python", "TCP/IP", "Sockets", "Custom Protocol", "Backend"],
        github: "https://github.com/ahmedosamaexe/python-chat-app",
        icon: <MessageSquare size={20} />,
        accentColor: "#0066ff",
        bannerContent: ChatEngineBanner,
    },
    {
        title: "Gym Health Classifier",
        subtitle: "ML Inference Engine from Scratch",
        summary: "Binary classification engine built from scratch with manual backprop.",
        description:
            "A binary classification engine built entirely from scratch using only NumPy — manually implementing forward/backward propagation and gradient descent to understand the core math behind ML inference pipelines.",
        features: [
            "Binary classification engine implemented without ML libraries",
            "Manual implementation of forward and backward propagation",
            "Gradient descent optimizer built from scratch using NumPy",
            "Designed to understand the mathematical core of neural networks",
        ],
        tech: ["Python", "NumPy", "Backend Logic", "Algorithm Design"],
        github: "https://github.com/ahmedosamaexe/gym-health-classifier-from-scratch",
        icon: <Brain size={20} />,
        accentColor: "#a78bfa",
        bannerContent: ClassifierBanner,
    },
];

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ text, color }: { text: string; color: string }) {
    return (
        <div className="flex items-center gap-2.5 mb-3">
            <div className="w-[3px] h-4 rounded-full" style={{ backgroundColor: color }} />
            <span
                className="text-[10px] font-bold tracking-[0.25em] uppercase"
                style={{ color }}
            >
                {text}
            </span>
        </div>
    );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider({ color }: { color: string }) {
    return (
        <div
            className="my-5 h-px"
            style={{
                background: `linear-gradient(90deg, ${color}28, ${color}08, transparent)`,
            }}
        />
    );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const onKey = useCallback(
        (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
        [onClose]
    );
    useEffect(() => {
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onKey]);

    const c = project.accentColor;

    return (
        <>
            {/* Backdrop */}
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Panel */}
            <motion.div
                key="panel"
                initial={{ opacity: 0, scale: 0.84, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 16 }}
                transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
                className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 pointer-events-none"
            >
                <div
                    className="relative w-full max-w-[600px] rounded-2xl pointer-events-auto overflow-y-auto max-h-[90vh]"
                    style={{
                        background: "rgba(6, 10, 22, 0.98)",
                        border: `1px solid ${c}42`,
                        boxShadow: `0 0 60px ${c}18, 0 28px 80px rgba(0,0,0,0.75)`,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Top accent line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                        style={{ background: `linear-gradient(90deg, transparent, ${c}cc, transparent)` }}
                    />

                    {/* Subtle grid bg */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20 rounded-2xl"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(0,245,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.05) 1px, transparent 1px)",
                            backgroundSize: "44px 44px",
                        }}
                    />

                    {/* Ambient glow */}
                    <div
                        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[90px] pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${c}15, transparent)` }}
                    />

                    {/* Close button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all duration-200"
                        aria-label="Close modal"
                    >
                        <X size={16} />
                    </button>

                    {/* ── Content ── */}
                    <div className="relative z-10 p-7 sm:p-8">

                        {/* ── HEADER ── */}
                        <div className="flex items-start gap-4 mb-5">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0"
                                style={{
                                    backgroundColor: `${c}18`,
                                    borderColor: `${c}38`,
                                    color: c,
                                    boxShadow: `0 0 14px ${c}28`,
                                }}
                            >
                                {project.icon}
                            </div>
                            <div>
                                <motion.h3
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.26, delay: 0.06 }}
                                    className="font-heading font-bold text-white text-xl sm:text-2xl leading-tight"
                                >
                                    {project.title}
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.26, delay: 0.14 }}
                                    className="text-sm mt-0.5"
                                    style={{ color: `${c}aa` }}
                                >
                                    {project.subtitle}
                                </motion.p>
                            </div>
                        </div>

                        <Divider color={c} />

                        {/* ── OVERVIEW ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: 0.1 }}
                        >
                            <SectionLabel text="Overview" color={c} />
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {project.description}
                            </p>
                        </motion.div>

                        <Divider color={c} />

                        {/* ── KEY FEATURES ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: 0.18 }}
                        >
                            <SectionLabel text="Key Features" color={c} />
                            <ul className="space-y-2">
                                {project.features.map((feat, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.24, delay: 0.22 + i * 0.06 }}
                                        className="flex items-start gap-2.5 text-sm text-slate-400"
                                    >
                                        <ChevronRight
                                            size={14}
                                            className="flex-shrink-0 mt-0.5"
                                            style={{ color: c }}
                                        />
                                        <span>{feat}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <Divider color={c} />

                        {/* ── TECH STACK ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: 0.3 }}
                        >
                            <SectionLabel text="Tech Stack" color={c} />
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, i) => (
                                    <motion.span
                                        key={t}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.22, delay: 0.34 + i * 0.05 }}
                                        className="px-3 py-1 rounded-full text-xs font-medium border"
                                        style={{
                                            backgroundColor: `${c}12`,
                                            borderColor: `${c}38`,
                                            color: c,
                                        }}
                                    >
                                        {t}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        <Divider color={c} />

                        {/* ── FOOTER / CTA ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.26, delay: 0.4 }}
                        >
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold font-heading border transition-colors duration-200"
                                style={{
                                    borderColor: `${c}45`,
                                    color: c,
                                    backgroundColor: `${c}0c`,
                                }}
                                whileHover={{
                                    scale: 1.04,
                                    backgroundColor: `${c}1c`,
                                    boxShadow: `0 0 24px ${c}35`,
                                }}
                                whileTap={{ scale: 0.96 }}
                            >
                                <Github size={16} />
                                View on GitHub
                                <ArrowUpRight size={13} className="opacity-60" />
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function ProjectCard({
    project,
    index,
    onOpen,
}: {
    project: Project;
    index: number;
    onOpen: () => void;
}) {
    const [hovered, setHovered] = useState(false);
    const c = project.accentColor;

    const isFeatured = project.featured;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            onClick={onOpen}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onOpen()}
            aria-label={`Open ${project.title}`}
            className="relative rounded-2xl cursor-pointer outline-none overflow-hidden flex flex-col"
            style={{
                background: "rgba(10,15,26,0.75)",
                backdropFilter: "blur(20px)",
                minHeight: "480px",
                border: isFeatured
                    ? `1px solid ${hovered ? `${c}90` : `${c}60`}`
                    : `1px solid ${hovered ? `${c}55` : `${c}20`}`,
                boxShadow: isFeatured
                    ? hovered
                        ? `0 0 56px ${c}36, 0 0 22px ${c}20, 0 12px 48px rgba(0,0,0,0.65)`
                        : `0 0 34px ${c}28, 0 0 14px ${c}14, 0 6px 28px rgba(0,0,0,0.5)`
                    : hovered
                        ? `0 0 40px ${c}22, 0 12px 48px rgba(0,0,0,0.55)`
                        : `0 0 18px ${c}0e, 0 4px 24px rgba(0,0,0,0.4)`,
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
            }}
        >
            {/* ── Banner illustration area ── */}
            <div
                className="relative overflow-hidden flex-shrink-0"
                style={{
                    height: "170px",
                    background: `linear-gradient(160deg, ${c}10 0%, rgba(6,10,20,0.95) 100%)`,
                    borderBottom: `1px solid ${c}22`,
                }}
            >
                {/* Subtle grid */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(${c}09 1px, transparent 1px), linear-gradient(90deg, ${c}09 1px, transparent 1px)`,
                        backgroundSize: "28px 28px",
                        opacity: hovered ? 1 : 0.75,
                        transition: "opacity 0.3s",
                    }}
                />
                {/* Ambient radial glow */}
                <div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-48 rounded-full blur-[50px] pointer-events-none"
                    style={{
                        background: `radial-gradient(circle, ${c}22, transparent)`,
                        opacity: hovered ? 1 : 0.75,
                        transition: "opacity 0.3s",
                    }}
                />
                {/* SVG illustration */}
                <div className="absolute inset-0">
                    {project.bannerContent(c, hovered)}
                </div>
                {/* Top accent line */}
                <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${c}${hovered ? "ee" : "aa"}, transparent)`,
                        transition: "all 0.3s",
                    }}
                />
            </div>

            {/* ── Card body ── */}
            <div className="relative z-10 p-7 flex flex-col flex-1">
                {/* Title row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0"
                            style={{
                                backgroundColor: `${c}18`,
                                borderColor: hovered ? `${c}55` : `${c}32`,
                                color: c,
                                boxShadow: hovered ? `0 0 16px ${c}40` : `0 0 8px ${c}20`,
                                transition: "all 0.3s",
                            }}
                        >
                            {project.icon}
                        </div>
                        <div>
                            <h3 className="font-heading font-bold text-white text-2xl leading-tight">
                                {project.title}
                            </h3>
                            <p className="text-xs mt-1" style={{ color: `${c}90` }}>
                                {project.subtitle}
                            </p>
                        </div>
                    </div>
                    <motion.div
                        animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0 }}
                        transition={{ duration: 0.18 }}
                        style={{ color: hovered ? c : "rgba(71,85,105,0.55)" }}
                        className="flex-shrink-0 mt-1"
                    >
                        <ArrowUpRight size={18} />
                    </motion.div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.summary}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 4).map((t) => (
                        <span
                            key={t}
                            className="px-3 py-1 rounded-full text-xs font-medium border"
                            style={{
                                borderColor: `${c}28`,
                                color: `${c}cc`,
                                backgroundColor: `${c}0c`,
                            }}
                        >
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 4 && (
                        <span
                            className="px-3 py-1 rounded-full text-xs font-medium border"
                            style={{ borderColor: `${c}18`, color: `${c}70`, backgroundColor: `${c}06` }}
                        >
                            +{project.tech.length - 4}
                        </span>
                    )}
                </div>

                <div className="mt-auto">
                    <span
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-widest uppercase border transition-all duration-200"
                        style={{
                            color: hovered ? c : "rgb(100,116,139)",
                            borderColor: hovered ? `${c}40` : "rgba(255,255,255,0.08)",
                            backgroundColor: hovered ? `${c}0e` : "rgba(255,255,255,0.03)",
                        }}
                    >
                        View Details →
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Projects() {
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="relative py-28 bg-grid">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,245,255,0.2)] to-transparent" />

            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs tracking-[0.3em] uppercase text-[#00f5ff] font-medium">My Work</span>
                    <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-3">
                        Featured Projects
                    </h2>
                    <p className="text-slate-500 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
                        Real systems. Real sockets. Real engineering.{" "}
                        <span className="text-slate-400">Click any card to explore.</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={i}
                            onOpen={() => setActiveProject(project)}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-10"
                >
                    <motion.a
                        href="https://github.com/ahmedosamaexe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] text-slate-400 hover:text-white hover:border-[rgba(0,245,255,0.3)] text-sm font-medium transition-all duration-200"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <Github size={15} />
                        See all projects on GitHub
                    </motion.a>
                </motion.div>
            </div>

            <AnimatePresence>
                {activeProject && (
                    <ProjectModal
                        key={activeProject.title}
                        project={activeProject}
                        onClose={() => setActiveProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
