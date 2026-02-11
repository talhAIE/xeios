"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const expertise = [
    {
        title: "Website Development",
        desc: "Developing AI-powered web solutions for smarter and optimized experiences.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Mobile App Development",
        desc: "AI-powered mobile apps designed to drive seamless operations and business growth.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "AI Workflow Automation",
        desc: "AI-driven automation to optimize workflows and reduce manual work.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Autonomous AI Agents",
        desc: "Self-learning AI agents built to execute complex tasks autonomously and efficiently.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Intelligent ChatBots",
        desc: "AI-powered chatbots designed to automate customer support and engagement 24/7.",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Predictive Analytics",
        desc: "AI-driven insights to forecast trends and support smarter business decisions.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Computer Vision",
        desc: "Advanced image processing with AI-powered solutions for object detection and analysis.",
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "NLP Solutions",
        desc: "AI-powered Natural Language Processing for intelligent text analysis and sentiment insights.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    },
];

// --- Animation Variants ---
const headingWords = ["Comprehensive"];
const gradientWords = ["AI", "Capabilities"];

const headingContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const wordVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
    },
};

const labelVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const gridVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export default function Services() {
    return (
        <section id="services" className="py-16 md:py-24 bg-background relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(103,44,141,0.12)_0%,transparent_60%)] pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    variants={headingContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.span
                        className="text-xeios font-bold text-xl tracking-wide inline-block"
                        variants={labelVariants}
                    >
                        OUR EXPERTISE
                    </motion.span>

                    <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white flex flex-wrap justify-center gap-x-[0.3em]">
                        {headingWords.map((word) => (
                            <motion.span key={word} className="inline-block" variants={wordVariants}>
                                {word}
                            </motion.span>
                        ))}
                        {gradientWords.map((word) => (
                            <motion.span
                                key={word}
                                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-xeios via-purple-500 to-xeios-dark"
                                variants={wordVariants}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {expertise.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={cardVariants}
                            className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-900/20 hover:border-xeios/50"
                        >
                            {/* Shimmer skeleton */}
                            <div className="absolute inset-0 bg-surface animate-pulse z-0" aria-hidden="true" />

                            {/* Background Image */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover md:group-hover:scale-105 transition-transform duration-500 z-10"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-20" />

                            {/* Content — slides up on hover */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-gradient-to-t from-black/90 to-transparent md:bg-white/5 md:backdrop-blur-sm border-t border-white/10 md:group-hover:bg-white/10 transition-all duration-300">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-200 line-clamp-2 opacity-90 md:opacity-80 md:group-hover:opacity-100 transition-opacity duration-300">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Hover Border Glow - Desktop only */}
                            <div className="hidden md:block absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-xeios/50 transition-colors duration-300 pointer-events-none z-40" />
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 md:group-hover:ring-xeios/30 z-50 pointer-events-none transition-all duration-300" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
