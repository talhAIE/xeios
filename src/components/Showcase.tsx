"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        title: "EcoSense AI Dashboard",
        category: "Data Analytics",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "FinTech Neural Network",
        category: "Financial Tech",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "HealthGuard Predictive",
        category: "Healthcare AI",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "SmartCity Infrastructure",
        category: "IoT & Automation",
        image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80",
    },
];

export default function Showcase() {
    return (
        <section id="showcase" className="py-24 bg-white relative">
            {/* Background gradient splash */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-xeios/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6"
                >
                    <div>
                        <span className="text-xeios font-medium tracking-wide">PORTFOLIO</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-900">Selected Works</h2>
                    </div>
                    <p className="text-gray-600 max-w-md text-right md:text-left">
                        Explore how we&apos;ve helped industry leaders leverage the power of artificial intelligence.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-80"
                            />

                            {/* Overlay Content */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-xeios-light text-sm font-bold uppercase tracking-wider mb-2 block">
                                        {project.category}
                                    </span>
                                    <div className="flex justify-between items-end">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-xeios-light transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm group-hover:bg-white group-hover:text-xeios transition-all">
                                            <ArrowUpRight className="w-5 h-5 text-white group-hover:text-xeios" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
