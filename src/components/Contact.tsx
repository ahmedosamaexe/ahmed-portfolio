"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, ArrowUpRight } from "lucide-react";

const contacts = [
    {
        icon: Mail,
        label: "Email",
        value: "ahmed4real9@gmail.com",
        href: "mailto:ahmed4real9@gmail.com",
        color: "#00f5ff",
        desc: "Best for project inquiries",
    },
    {
        icon: Phone,
        label: "WhatsApp",
        value: "+20 105 060 8122",
        href: "https://wa.me/201050608122",
        color: "#25D366",
        desc: "Quick response guaranteed",
    },
    {
        icon: Github,
        label: "GitHub",
        value: "github.com/ahmedosamaexe",
        href: "https://github.com/ahmedosamaexe",
        color: "#a78bfa",
        desc: "Browse my open source work",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        value: "Ahmed Osama",
        href: "https://www.linkedin.com/in/ahmed-osama-b4078b389",
        color: "#0066ff",
        desc: "Connect professionally",
    },
];

export default function Contact() {
    return (
        <section id="contact" className="relative py-28 bg-[#03060e]">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,102,255,0.3)] to-transparent" />
            {/* Ambient */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#00f5ff]/3 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6"
                >
                    <span className="text-xs tracking-[0.3em] uppercase text-[#00f5ff] font-medium">Contact</span>
                    <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-3">
                        Let&apos;s Build Something
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-center text-slate-500 text-sm leading-relaxed max-w-xl mx-auto mb-14"
                >
                    I&apos;m a 3rd-year student passionate about backend systems and IoT. Whether it&apos;s a collaboration,
                    internship opportunity, or just a technical conversation — I&apos;m always open to connect.
                </motion.p>

                {/* Contact cards */}
                <div className="grid sm:grid-cols-2 gap-4 mb-12">
                    {contacts.map(({ icon: Icon, label, value, href, color, desc }, i) => (
                        <motion.a
                            key={label}
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group relative glass border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 hover:border-[rgba(255,255,255,0.15)] transition-all duration-300 overflow-hidden block"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                boxShadow: "none",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${color}15, 0 0 50px ${color}08`;
                                (e.currentTarget as HTMLElement).style.borderColor = `${color}35`;
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                            }}
                        >
                            {/* Glow corner */}
                            <div
                                className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                style={{ backgroundColor: `${color}20` }}
                            />

                            <div className="relative z-10 flex items-start gap-4">
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300"
                                    style={{
                                        backgroundColor: `${color}15`,
                                        borderColor: `${color}30`,
                                        color,
                                    }}
                                >
                                    <Icon size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-500 uppercase tracking-widest">{label}</span>
                                        <ArrowUpRight
                                            size={14}
                                            className="text-slate-600 group-hover:text-slate-400 transition-colors"
                                        />
                                    </div>
                                    <div className="font-heading font-semibold text-white text-sm mt-0.5 truncate">{value}</div>
                                    <div className="text-xs text-slate-600 mt-0.5">{desc}</div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Bottom divider line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="border-t border-[rgba(255,255,255,0.06)] pt-8 text-center"
                >
                    <p className="text-slate-600 text-xs">
                        © {new Date().getFullYear()} Ahmed Osama — Built with Next.js 14, TypeScript &amp; Tailwind CSS
                    </p>
                    <p className="text-slate-700 text-xs mt-1">
                        Tanta, Gharbia, Egypt — Open to remote &amp; international opportunities
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
