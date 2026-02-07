"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        quote: "XeiosTech transformed our legacy infrastructure into a predictive powerhouse. The ROI was immediate.",
        author: "Elena Voronova",
        position: "CTO, FinGrid Global",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    },
    {
        quote: "Their design team doesn't just make things pretty; they make complex AI data understandable and actionable.",
        author: "James Chen",
        position: "Product Lead, Nexus AI",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    },
    {
        quote: "A rare combination of technical brilliance and strategic foresight. Best partner for our AI journey.",
        author: "Sarah Johnson",
        position: "CEO, DataFlow Inc.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 bg-gray-50 text-center relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-16 text-gray-900"
                >
                    Trusted by <span className="text-xeios">Industry Leaders</span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.author}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="glass-panel p-8 rounded-2xl bg-white border border-gray-200 shadow-md relative flex flex-col items-center hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-xeios p-3 rounded-full shadow-[0_4px_10px_0_rgba(103,44,141,0.3)]">
                                <Quote className="w-6 h-6 text-white fill-current" />
                            </div>

                            <p className="text-gray-600 italic mb-8 mt-6 leading-relaxed">
                                &quot;{item.quote}&quot;
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="relative w-12 h-12 rounded-full border-2 border-xeios/50 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-gray-900">{item.author}</h4>
                                    <p className="text-sm text-xeios">{item.position}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
