"use client";

import { motion } from "framer-motion";

const technologies = [
    { name: "OpenAI", color: "hover:text-green-400" },
    { name: "Python", color: "hover:text-yellow-400" },
    { name: "TensorFlow", color: "hover:text-orange-500" },
    { name: "Next.js", color: "hover:text-white" },
    { name: "AWS", color: "hover:text-yellow-600" },
    { name: "Google Cloud", color: "hover:text-blue-500" },
    { name: "Docker", color: "hover:text-blue-400" },
    { name: "Kubernetes", color: "hover:text-blue-600" },
    { name: "PyTorch", color: "hover:text-red-500" },
];

export default function Technologies() {
    return (
        <section id="technologies" className="py-24 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-xeios font-medium tracking-wide border-b border-xeios/30 pb-1">TECH STACK</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-900">
                        Powered by <span className="text-xeios">Modern Technologies</span>
                    </h2>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-80">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, opacity: 1, filter: "grayscale(0%)" }}
                            className="flex flex-col items-center gap-3 group grayscale transition-all duration-300 cursor-pointer"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white shadow-md rounded-2xl flex items-center justify-center border border-gray-100 group-hover:border-xeios/30 group-hover:shadow-lg group-hover:shadow-xeios/10 transition-all">
                                {/* Placeholder for tech.icon - original technologies array does not contain icon property */}
                                <div className={`w-8 h-8 md:w-10 md:h-10 text-gray-400 group-hover:text-[${tech.color}] transition-colors duration-300`} style={{ color: "inherit" }}>
                                    {/* You might want to add an actual icon here, e.g., from react-icons */}
                                    {tech.name.substring(0, 2)}
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-500 group-hover:text-gray-900 transition-colors">{tech.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
