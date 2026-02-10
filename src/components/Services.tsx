"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const expertise = [
    {
        title: "Website Development",
        desc: "Custom web solutions built with modern technologies for optimal performance.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Mobile App Development",
        desc: "Native and cross-platform mobile apps designed for seamless user experiences.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "AI Workflow Automation",
        desc: "Streamline operations with intelligent automation and workflow optimization.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Autonomous AI Agents",
        desc: "Self-learning agents capable of executing complex tasks independently.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Intelligent ChatBots",
        desc: "Conversational AI that enhances customer support and engagement 24/7.",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Predictive Analytics",
        desc: "Data-driven insights to forecast trends and make informed decisions.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Computer Vision",
        desc: "Advanced image processing solutions for object detection and analysis.",
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "NLP Solutions",
        desc: "Natural Language Processing for sentiment analysis and text interactions.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    },
];

// --- Animation Variants ---

/** Header words stagger in one-by-one */
const headerContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const headerWordVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring", damping: 20, stiffness: 120 },
    },
};

/** Card grid staggers each card */
const gridVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

/** Each card scales + fades from below with blur */
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.92, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { type: "spring", damping: 22, stiffness: 100 },
    },
};

const LABEL_WORDS = ["OUR", "EXPERTISE"];
const HEADING_WORDS = ["Comprehensive"];
const GRADIENT_TEXT = "AI Capabilities";

export default function Services() {
    return (
        <section id="services" className="py-24 bg-[#0A0118] overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Section Header — word-by-word stagger, replays on scroll */}
                <motion.div
                    className="text-center mb-16"
                    variants={headerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.6 }}
                >
                    {/* Label */}
                    <div className="flex justify-center gap-x-2 mb-2">
                        {LABEL_WORDS.map((word) => (
                            <motion.span
                                key={word}
                                className="text-xeios font-bold text-xl tracking-wide"
                                variants={headerWordVariants}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl font-bold text-white flex flex-wrap justify-center gap-x-[0.3em]">
                        {HEADING_WORDS.map((word) => (
                            <motion.span
                                key={word}
                                className="inline-block"
                                variants={headerWordVariants}
                            >
                                {word}
                            </motion.span>
                        ))}
                        <motion.span
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-xeios via-purple-600 to-xeios-dark"
                            variants={{
                                hidden: { opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    filter: "blur(0px)",
                                    transition: { type: "spring", damping: 18, stiffness: 90 },
                                },
                            }}
                        >
                            {GRADIENT_TEXT}
                        </motion.span>
                    </h2>
                </motion.div>

                {/* Cards Grid — staggered reveal, replays on scroll */}
                <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.05 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {expertise.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-xeios/15 transition-shadow duration-300 border border-white/5 hover:border-xeios/50"
                        >
                            {/* Loading Skeleton */}
                            <div className="absolute inset-0 bg-[#110822] animate-pulse z-0" />

                            {/* Background Image */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 z-10"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-20" />

                            {/* Content — slides up on hover */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-white/5 backdrop-blur-md border-t border-white/10 group-hover:bg-white/10 transition-all duration-300 translate-y-0 group-hover:-translate-y-1">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-200 line-clamp-2">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Hover Border Glow */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-xeios/50 transition-colors duration-300 pointer-events-none z-40" />
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-xeios/30 z-50 pointer-events-none transition-all duration-500" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
