"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [trail, setTrail] = useState({ x: -100, y: -100 });
    const [isPointer, setIsPointer] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName === "A" ||
                target.tagName === "BUTTON"
            );
        };
        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);
        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseenter", onMouseEnter);
        };
    }, []);

    useEffect(() => {
        let animFrame: number;
        const smoothFollow = () => {
            setTrail((prev) => ({
                x: prev.x + (pos.x - prev.x) * 0.12,
                y: prev.y + (pos.y - prev.y) * 0.12,
            }));
            animFrame = requestAnimationFrame(smoothFollow);
        };
        animFrame = requestAnimationFrame(smoothFollow);
        return () => cancelAnimationFrame(animFrame);
    }, [pos]);

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Dot */}
                    <motion.div
                        className="pointer-events-none fixed z-[9999] rounded-full"
                        style={{
                            left: pos.x,
                            top: pos.y,
                            translateX: "-50%",
                            translateY: "-50%",
                            width: isPointer ? 12 : 8,
                            height: isPointer ? 12 : 8,
                            backgroundColor: isClicking ? "#0066ff" : "#00f5ff",
                            boxShadow: isClicking
                                ? "0 0 12px #0066ff, 0 0 24px rgba(0,102,255,0.6)"
                                : "0 0 10px #00f5ff, 0 0 20px rgba(0,245,255,0.5)",
                            transition: "width 0.15s, height 0.15s, background-color 0.15s",
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: isClicking ? 0.7 : 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    />
                    {/* Trailing ring */}
                    <motion.div
                        className="pointer-events-none fixed z-[9998] rounded-full border"
                        style={{
                            left: trail.x,
                            top: trail.y,
                            translateX: "-50%",
                            translateY: "-50%",
                            width: isPointer ? 40 : 28,
                            height: isPointer ? 40 : 28,
                            borderColor: isPointer ? "rgba(0,102,255,0.6)" : "rgba(0,245,255,0.4)",
                            boxShadow: isPointer
                                ? "0 0 8px rgba(0,102,255,0.3)"
                                : "0 0 6px rgba(0,245,255,0.2)",
                            transition: "width 0.2s, height 0.2s, border-color 0.2s",
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.8, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    />
                </>
            )}
        </AnimatePresence>
    );
}
