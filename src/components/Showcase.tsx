"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        title: "AI TUTOR - Education LMS",
        category: "Website / LMS / Mobile App",
        desc: "The AI Tutor App was built to provide a personalized language-speaking practice experience through real-time, AI-driven conversations. Its core goal was to help students improve spoken language skills using CEFR-aligned topics and feedback.",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80",
        tags: ["Python", "TensorFlow", "React"],
    },
    {
        title: "Quest Hunter GO",
        category: "Gaming / AR",
        desc: "An interactive adventure game where players embark on epic quests, solve puzzles, and discover hidden treasures in a fantasy world. Built with advanced spatial awareness for an immersive experience.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
        tags: ["Unity", "C#", "Blender"],
    },
    {
        title: "Virtual World - VR History",
        category: "VR/AR Experience",
        desc: "Virtual World is a VR experience that brings history to life with AI-powered conversations with great minds and immersive journeys through iconic events and eras.",
        image: "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?auto=format&fit=crop&w=1200&q=80",
        tags: ["Unity", "C#", "VR SDK"],
    },
    {
        title: "QHELO - Sports Social App",
        category: "Web Platform / Mobile",
        desc: "Qhelo is a Bangladeshi app that lets people easily find, join, and host sports games, book fields, invite friends, rate players, and climb leaderboards through points.",
        image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80",
        tags: ["React Native", "Node.js", "PostgreSQL"],
    },
    {
        title: "Sports ecommerce Platform",
        category: "Web Platform / E-commerce",
        desc: "A comprehensive sports ecommerce platform that allows users to buy sports equipment, clothing, and accessories. Features include secure payment integration and personalized recommendations.",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80",
        tags: ["React", "Node.js", "PostgreSQL"],
    },
    {
        title: "Chatterly - No-code AI",
        category: "Web Platform / SaaS",
        desc: "A no-code platform that allows users to build and deploy web applications without writing a single line of code. Leverage AI to turn ideas into full-stack businesses instantly.",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
        tags: ["React", "Node.js", "PostgreSQL"],
    },
];

export default function Showcase() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const nextProject = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const currentProject = projects[currentIndex];

    return (
        <section id="showcase" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 relative z-10">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Real-World Success Stories</h2>
                        <p className="text-gray-500 text-lg">How Our Solutions Helped Businesses Overcome Challenges and Achieve Growth</p>
                    </div>
                    <button className="px-8 py-3 bg-white border border-gray-200 rounded-full font-bold text-gray-900 hover:border-xeios transition-all flex items-center gap-2 group relative overflow-hidden shadow-sm">
                        <span className="relative z-10 transition-colors group-hover:text-xeios">View Our Portfolio</span>
                        <ArrowRight className="w-5 h-5 relative z-10 transition-all group-hover:translate-x-1 group-hover:text-xeios" />
                        <div className="absolute inset-0 bg-gradient-to-r from-xeios/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </div>

                <div className="relative min-h-[600px] flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute w-full"
                        >
                            <div className="group/card relative bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch min-h-[500px] border border-gray-100 transition-all duration-500 hover:shadow-xeios/20">
                                {/* Border Highlight Glow */}
                                <div className="absolute inset-0 rounded-[40px] border-2 border-transparent group-hover/card:border-xeios/30 transition-all duration-500 z-50 pointer-events-none" />
                                <div className="absolute inset-0 rounded-[40px] ring-1 ring-inset ring-gray-100 group-hover/card:ring-xeios/20 z-50 pointer-events-none" />

                                {/* Project Info */}
                                <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
                                    {/* Decorative Gradient Splashes */}
                                    <div className="absolute -top-20 -left-20 w-80 h-80 bg-xeios/5 blur-[100px] rounded-full pointer-events-none" />
                                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-400/5 blur-[100px] rounded-full pointer-events-none" />

                                    {/* Animated Light Background Detail */}
                                    <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_50%,rgba(103,44,141,0.05),transparent_70%)]" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-10 h-10 bg-xeios/10 rounded-xl flex items-center justify-center">
                                                <div className="w-5 h-5 bg-xeios rounded-sm" />
                                            </div>
                                            <span className="text-xeios font-semibold">{currentProject.category}</span>
                                        </div>

                                        <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
                                            {currentProject.title}
                                        </h3>

                                        <p className="text-gray-600 text-lg mb-10 leading-relaxed max-w-xl">
                                            {currentProject.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-3 mb-12">
                                            {currentProject.tags.map(tag => (
                                                <span key={tag} className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <button className="px-10 py-4 bg-gradient-to-r from-xeios via-purple-600 to-xeios-dark text-white rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-[0_4px_15px_rgba(103,44,141,0.3)] hover:shadow-[0_8px_25px_rgba(103,44,141,0.4)]">
                                                View Project <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Image */}
                                <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-auto bg-gray-50">
                                    <Image
                                        src={currentProject.image}
                                        alt={currentProject.title}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Subtle Overlay to match reference */}
                                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/30" />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center justify-center gap-8 mt-12">
                    <button
                        onClick={prevProject}
                        className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-900" />
                    </button>

                    <div className="flex gap-3">
                        {projects.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-purple-600" : "w-2.5 bg-gray-200"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextProject}
                        className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ArrowRight className="w-6 h-6 text-gray-900" />
                    </button>
                </div>
            </div>
        </section>
    );
}
