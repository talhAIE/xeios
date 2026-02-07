"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Globe, Layers, Rocket, Server, Smartphone, Zap } from "lucide-react";

const services = [
    {
        category: "AI & Application Development",
        items: [
            { title: "AI Websites", icon: Globe, desc: "Intelligent web platforms adapting to user behavior." },
            { title: "AI Apps", icon: Smartphone, desc: "Mobile applications powered by predictive algorithms." },
            { title: "AI Product Dev", icon: Cpu, desc: "End-to-end development of proprietary AI models." },
        ],
    },
    {
        category: "Strategy & Design",
        items: [
            { title: "MVP Development", icon: Rocket, desc: "Rapid prototyping to validate your AI concepts." },
            { title: "Product Design", icon: Layers, desc: "User-centric UI/UX for complex data interfaces." },
        ],
    },
    {
        category: "Infrastructure & Data",
        items: [
            { title: "AI Integration", icon: Zap, desc: "Seamlessly embedding AI into existing workflows." },
            { title: "Deployment", icon: Server, desc: "Robust cloud architecture for high-availability models." },
            { title: "Data Solutions", icon: Database, desc: "Cleaning, labeling, and pipeline optimization." },
        ],
    },

];

export default function Services() {
    return (
        <section id="services" className="py-24 relative bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-xeios font-medium tracking-wide">OUR EXPERTISE</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-900">
                        Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-xeios via-purple-600 to-xeios-dark">AI Capabilities</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((group, groupIndex) => (
                        <div key={group.category} className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-500 border-b border-gray-200 pb-2">{group.category}</h3>
                            <div className="space-y-4">
                                {group.items.map((service, index) => (
                                    <motion.div
                                        key={service.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + groupIndex * 0.1 }}
                                        className="p-6 rounded-xl bg-gray-50 border border-gray-100 hover:border-xeios/30 hover:bg-white transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-xeios/5"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-lg bg-xeios/5 text-xeios group-hover:bg-xeios group-hover:text-white transition-colors">
                                                <service.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1 text-gray-900 group-hover:text-xeios transition-colors">{service.title}</h4>
                                                <p className="text-sm text-gray-600 leading-relaxed">{service.desc}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
