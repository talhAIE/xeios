"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";

export default function About() {
    return (
        <section id="about" className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                            Bridging <span className="text-xeios">Complex AI</span> with <br />
                            Practical Business Results
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
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
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
