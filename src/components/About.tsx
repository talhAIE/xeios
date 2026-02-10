"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";
import { GlowCard } from "@/components/ui/spotlight-card";
import ElectricCanvas from "@/components/ui/electric-canvas";

export default function About() {
    return (
        <section id="about" className="py-24 bg-[#0A0118] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-[3fr_2fr] gap-12 items-center">
                    {/* Text Content — wrapped in interactive glow border */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <GlowCard
                            glowColor="purple"
                            customSize
                            className="!aspect-auto !grid-rows-none !shadow-none p-8 md:p-10"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                Bridging <span className="text-xeios">Complex AI</span> with <br />
                                Practical Business Results
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                At XeiosTech, we don&apos;t just write code; we architect intelligent ecosystems.
                                Our mission is to democratize advanced artificial intelligence for businesses,
                                transforming raw data into actionable insights and automated workflows.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Custom AI Model Integration",
                                    "Scalable Cloud Architecture",
                                    "User-Centric Data Visualization",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-xeios" />
                                        <span className="text-gray-300 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </GlowCard>
                    </motion.div>

                    {/* Image Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] w-full flex items-center justify-center"
                    >
                        <Spotlight
                            className="-top-40 left-0 md:left-60 md:-top-20"
                            fill="#672C8D"
                        />
                        <div className="w-full h-full absolute inset-0">
                            <SplineScene
                                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                className="w-full h-full"
                            />
                        </div>
                        {/* Sky-lightning strikes from above — fires on scroll */}
                        <ElectricCanvas duration={1800} className="z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
