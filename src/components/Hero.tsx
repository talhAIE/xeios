"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40"
        >
            {/* Abstract Background */}
            <div className="absolute inset-0 z-0 bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,44,141,0.05)_0%,transparent_70%)]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-xeios/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-xeios/10 to-transparent" />

                {/* Animated Grid/Neural Pattern placeholder */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "linear-gradient(#672C8D 1px, transparent 1px), linear-gradient(90deg, #672C8D 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-xeios/5 border border-xeios/20 text-xeios text-sm font-medium mb-6">
                        Next-Gen AI Development Agency
                    </span>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-gray-900">
                        Intelligent Solutions for a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-xeios via-purple-500 to-xeios-dark animate-pulse">
                            Digital Future
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        We engineer <span className="text-xeios font-medium">AI-driven</span> websites, apps, and data ecosystems that transform businesses.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="#contact"
                            className="px-8 py-4 bg-xeios hover:bg-xeios-dark text-white rounded-full font-semibold transition-all shadow-[0_4px_14px_0_rgba(103,44,141,0.39)] hover:shadow-[0_6px_20px_rgba(103,44,141,0.23)] hover:scale-105 flex items-center gap-2"
                        >
                            Get a Consultation <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#showcase"
                            className="px-8 py-4 border border-gray-200 hover:border-xeios text-gray-700 hover:text-xeios rounded-full font-semibold transition-all hover:bg-xeios/5 flex items-center gap-2"
                        >
                            View Our Work <Play className="w-4 h-4 fill-current" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
            >
                <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-gray-500 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
