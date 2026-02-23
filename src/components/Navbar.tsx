"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";

const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);

            const sections = navLinks.map((l) => l.href.replace("#", ""));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNav = (href: string) => {
        setMenuOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    scrolled
                        ? "glass border-b border-[rgba(0,245,255,0.12)] shadow-[0_4px_30px_rgba(0,245,255,0.05)]"
                        : "bg-transparent border-b border-transparent"
                )}
            >
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[72px]">
                    {/* Logo — standalone "A" mark */}
                    <motion.button
                        onClick={() => handleNav("#hero")}
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        aria-label="Go to top"
                    >
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                                background: "linear-gradient(135deg, #00f5ff, #00c2cc)",
                                boxShadow: "0 0 20px rgba(0,245,255,0.5), 0 0 6px rgba(0,245,255,0.25)",
                            }}
                        >
                            <span
                                className="font-heading font-black text-xl leading-none select-none"
                                style={{ color: "#060a10", letterSpacing: "-0.03em" }}
                            >
                                A
                            </span>
                        </div>
                    </motion.button>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-0.5">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace("#", "");
                            return (
                                <motion.button
                                    key={link.href}
                                    onClick={() => handleNav(link.href)}
                                    className={clsx(
                                        "relative group px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                                        isActive ? "text-[#00f5ff]" : "text-slate-400 hover:text-white"
                                    )}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {/* Active pill background */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 rounded-lg bg-[rgba(0,245,255,0.08)] border border-[rgba(0,245,255,0.2)]"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                    {/* Hover underline — slides in from left */}
                                    {!isActive && (
                                        <span
                                            className="absolute bottom-0.5 left-4 right-4 h-[1.5px] rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-250"
                                            style={{ background: "linear-gradient(90deg, #00f5ff, #00c2cc)" }}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Desktop CTAs */}
                    <div className="hidden md:flex items-center gap-2.5">
                        {/* Contact Me */}
                        <motion.button
                            onClick={() => handleNav("#contact")}
                            className="px-4 py-2 text-sm font-semibold rounded-lg border border-[rgba(0,245,255,0.4)] text-[#00f5ff] hover:bg-[rgba(0,245,255,0.08)] transition-all duration-200 font-heading"
                            whileHover={{ scale: 1.04, boxShadow: "0 0 16px rgba(0,245,255,0.25)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Me
                        </motion.button>
                        {/* Download CV */}
                        <motion.a
                            href="/cv.pdf"
                            download
                            className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#00f5ff] text-[#020408] hover:bg-white transition-all duration-200 font-heading"
                            whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(0,245,255,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Download CV
                        </motion.a>
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        className="md:hidden text-slate-300 hover:text-[#00f5ff] transition-colors p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-x-0 top-[72px] z-40 glass border-b border-[rgba(0,245,255,0.12)] md:hidden"
                    >
                        <div className="flex flex-col gap-1 p-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNav(link.href)}
                                    className={clsx(
                                        "text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                        activeSection === link.href.replace("#", "")
                                            ? "text-[#00f5ff] bg-[rgba(0,245,255,0.08)]"
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {link.label}
                                </button>
                            ))}
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => handleNav("#contact")}
                                    className="flex-1 px-4 py-3 text-center text-sm font-semibold rounded-lg border border-[rgba(0,245,255,0.4)] text-[#00f5ff] font-heading"
                                >
                                    Contact Me
                                </button>
                                <a
                                    href="/cv.pdf"
                                    download
                                    className="flex-1 px-4 py-3 text-center text-sm font-semibold rounded-lg bg-[#00f5ff] text-[#060a10] font-heading"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Download CV
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
