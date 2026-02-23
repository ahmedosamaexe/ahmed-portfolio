"use client";

import { useCallback, useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    const particlesLoaded = useCallback(async () => { }, []);

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            className="absolute inset-0 z-0"
            particlesLoaded={particlesLoaded}
            options={{
                fpsLimit: 60,
                particles: {
                    number: {
                        value: 70,
                        density: { enable: true },
                    },
                    color: { value: ["#00f5ff", "#0066ff", "#7c3aed"] },
                    shape: { type: "circle" },
                    opacity: {
                        value: { min: 0.05, max: 0.3 },
                        animation: {
                            enable: true,
                            speed: 1,
                            sync: false,
                        },
                    },
                    size: {
                        value: { min: 1, max: 3 },
                    },
                    links: {
                        enable: true,
                        distance: 130,
                        color: "#00f5ff",
                        opacity: 0.08,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 0.6,
                        direction: "none",
                        random: true,
                        outModes: { default: "bounce" },
                    },
                },
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "grab" },
                        onClick: { enable: true, mode: "push" },
                    },
                    modes: {
                        grab: { distance: 140, links: { opacity: 0.25 } },
                        push: { quantity: 3 },
                    },
                },
                detectRetina: true,
                background: { color: "transparent" },
            }}
        />
    );
}
