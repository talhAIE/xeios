"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import ParticleCanvas from "@/components/ui/particle-canvas";

// --- Animation variants ---
const LINE_1_WORDS = ["Intelligent", "Solutions", "for", "a"];
const LINE_2_WORDS = ["Digital", "Future"];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const wordVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring", damping: 20, stiffness: 120 },
    },
};

const gradientLineVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(12px)" },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { type: "spring", damping: 18, stiffness: 100, delay: 0.5 },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    }),
};

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
        >
            {/* Abstract Background */}
            <div className="absolute inset-0 z-0 bg-[#0A0118]">
                <ParticleCanvas
                    particleColor="rgba(167, 100, 220, 0.6)"
                    lineColor="rgba(103, 44, 141, 0.5)"
                    lineHoverColor="rgba(255, 255, 255, 0.5)"
                    bgColor="#0A0118"
                    density={14000}
                    mouseRadius={180}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,44,141,0.15)_0%,transparent_70%)] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-xeios/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-xeios/10 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* Animated Heading — replays on scroll */}
                <motion.h1
                    className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-white overflow-hidden"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                >
                    {/* Line 1: word-by-word stagger */}
                    <span className="flex flex-wrap justify-center gap-x-[0.3em]">
                        {LINE_1_WORDS.map((word) => (
                            <motion.span
                                key={word}
                                className="inline-block"
                                variants={wordVariants}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>

                    {/* Line 2: gradient text with a dramatic entrance */}
                    <motion.span
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-xeios via-purple-500 to-xeios-dark"
                        variants={gradientLineVariants}
                    >
                        {LINE_2_WORDS.join(" ")}
                    </motion.span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    variants={fadeUp}
                    custom={0.7}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                >
                    We engineer <span className="text-xeios font-medium">AI-driven</span> websites, apps, and data ecosystems that transform businesses.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    variants={fadeUp}
                    custom={0.9}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                >
                    <Link
                        href="#contact"
                        className="px-8 py-4 bg-xeios hover:bg-xeios-dark text-white rounded-full font-semibold transition-all shadow-[0_4px_14px_0_rgba(103,44,141,0.39)] hover:shadow-[0_6px_20px_rgba(103,44,141,0.23)] hover:scale-105 flex items-center gap-2"
                    >
                        Get a Consultation <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="#showcase"
                        className="px-8 py-4 border border-purple-900/30 hover:border-xeios text-gray-300 hover:text-xeios rounded-full font-semibold transition-all hover:bg-xeios/10 flex items-center gap-2"
                    >
                        View Our Work <Play className="w-4 h-4 fill-current" />
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
            >
                <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-gray-500 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
