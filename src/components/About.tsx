"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { GlowCard } from "@/components/ui/spotlight-card";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-16 md:py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-[1600px] relative z-10">
                <div className="grid lg:grid-cols-[2fr_1fr] gap-8 lg:gap-16 items-center">
                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:-ml-20 z-20"
                    >
                        <GlowCard
                            glowColor="purple"
                            customSize
                            className="!aspect-auto !grid-rows-none !shadow-none p-8 md:p-12 w-full h-fit border-white/5 bg-background/20"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-white leading-tight">
                                Bridging <span className="text-purple-500">Complex AI</span> with Practical Results
                            </h2>
                            <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed max-w-3xl">
                                At XeiosTech, we don&apos;t just write code; we architect intelligent ecosystems.
                                Our mission is to democratize advanced AI for businesses, transforming data
                                into actionable insights and automated workflows.
                            </p>

                            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-white/5">
                                {[
                                    "Custom AI Model Integration",
                                    "Scalable Cloud Architecture",
                                    "User-Centric Data Visualization",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-xeios/10 flex items-center justify-center">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-xeios" />
                                        </div>
                                        <span className="text-gray-300 font-medium whitespace-nowrap text-sm md:text-base">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </GlowCard>
                    </motion.div>

                    {/* Right Side: Image with Orbital Elements */}
                    <div className="relative flex items-center justify-center">
                        {/* Orbital Scribbles (Background) */}
                        <div className="absolute inset-0 z-0 pointer-events-none scale-125 lg:scale-150">
                            <motion.svg
                                viewBox="0 0 400 400"
                                className="w-full h-full opacity-30 text-xeios"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            >
                                <path
                                    d="M 100,200 C 100,100 300,100 300,200 C 300,300 100,300 100,200"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="0.5"
                                    strokeDasharray="5 10"
                                />
                                <motion.path
                                    d="M 50,200 C 50,50 350,50 350,200 C 350,350 50,350 50,200"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                />
                            </motion.svg>
                        </div>

                        {/* Image Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 w-full max-w-[600px] aspect-[4/5] lg:aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group"
                        >
                            <img
                                src="/office.png"
                                alt="XeiosTech Office"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
