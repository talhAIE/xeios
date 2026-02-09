"use client";

import { motion } from "framer-motion";

const technologies = [
    { name: "MongoDB", icon: "mongodb" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Flutter", icon: "flutter" },
    { name: "Unity", icon: "unity" },
    { name: "FastAPI", icon: "fastapi" },
    { name: "AWS", icon: "amazonaws" },
    { name: "Docker", icon: "docker" },
    { name: "Node.js", icon: "nodedotjs" },
    { name: "React.js", icon: "react" },
    { name: "Next.js", icon: "nextdotjs" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Technologies() {
    return (
        <section id="technologies" className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mt-4 text-gray-900 mb-6">
                        Our <span className="text-xeios">MVP development</span> technologies
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        We've worked on various product in various industries that highlight our MVP development
                        expertise using the following tech stack:
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    className="flex flex-wrap lg:flex-nowrap justify-center gap-4 md:gap-3 xl:gap-6 items-center w-full max-w-[1400px] mx-auto overflow-x-visible"
                >
                    {technologies.map((tech) => (
                        <motion.div
                            key={tech.name}
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="flex flex-col items-center gap-3 group cursor-pointer w-full md:w-32"
                        >
                            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 p-[2px] overflow-hidden">
                                {/* Gradient Border Layer */}
                                <div className="absolute inset-0 bg-transparent group-hover:bg-gradient-to-tr group-hover:from-xeios group-hover:to-xeios-light transition-all duration-300" />

                                {/* Inner White Box */}
                                <div className="absolute inset-[2px] bg-white rounded-[14px] flex items-center justify-center z-10">
                                    <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
                                        <img
                                            src={`https://cdn.simpleicons.org/${tech.icon}`}
                                            alt={tech.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs md:text-sm font-medium text-gray-500 group-hover:text-xeios transition-colors duration-300 group-hover:font-bold">
                                {tech.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
