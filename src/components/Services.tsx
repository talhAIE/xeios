"use client";

import { motion } from "framer-motion";
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

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Services() {
    return (
        <section id="services" className="py-24 bg-[#0A0118]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-16"
                >
                    <span className="text-xeios font-bold text-xl tracking-wide">OUR EXPERTISE</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white">
                        Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-xeios via-purple-600 to-xeios-dark">AI Capabilities</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {expertise.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-xeios/50"
                        >
                            {/* Loading Skeleton / Shimmer Background (Visible while image loads or as effect) */}
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

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-white/5 backdrop-blur-md border-t border-white/10 group-hover:bg-white/10 transition-colors duration-300">
                                <motion.h3
                                    className="text-xl font-bold text-white mb-2"
                                >
                                    {item.title}
                                </motion.h3>
                                <motion.p
                                    className="text-sm text-gray-200 line-clamp-2"
                                >
                                    {item.desc}
                                </motion.p>
                            </div>


                            {/* Hover Border Glow Animation */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-xeios/50 transition-colors duration-300 pointer-events-none z-40" />
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-xeios/30 z-50 pointer-events-none transition-all duration-500" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
