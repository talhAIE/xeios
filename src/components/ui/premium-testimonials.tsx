"use client";

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

const testimonials = [
    {
        name: "Elena Rodriguez",
        role: "VP Operations, ScaleUp Co",
        company: "ScaleUp",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "XeiosTech transformed our legacy infrastructure into a predictive powerhouse. The ROI was immediate. The autonomous systems work flawlessly around the clock.",
        results: ["300% efficiency increase", "Immediate ROI", "24/7 automation"]
    },
    {
        name: "James Chen",
        role: "Product Lead, Nexus AI",
        company: "Nexus AI",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Their design team doesn't just make things pretty; they make complex AI data understandable and actionable. Our customer satisfaction skyrocketed by 40%.",
        results: ["40% satisfaction boost", "Transparent data", "Seamless integration"]
    },
    {
        name: "Sarah Johnson",
        role: "CEO, DataFlow Inc.",
        company: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "A rare combination of technical brilliance and strategic foresight. Best partner for our AI journey. Our team can finally focus on strategy instead of repetitive tasks.",
        results: ["150% revenue growth", "Strategic focus", "Team productivity"]
    }
];

export function PremiumTestimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(timer);
    }, []);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? 45 : -45
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction < 0 ? 45 : -45
        })
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "circOut" as any
            }
        }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const nextTestimonial = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="testimonials" className="relative py-32 bg-white overflow-hidden">
            {/* Light purple gradient blur background as requested */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/50 pointer-events-none" />

            <div className="absolute inset-0 pointer-events-none">
                {/* Animated gradient mesh */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-xeios/[0.04] via-transparent to-purple-400/[0.04]"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        backgroundSize: '400% 400%'
                    }}
                />

                {/* Larger, more prominent moving color orbs */}
                <motion.div
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px]"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px]"
                    animate={{
                        x: [0, -120, 0],
                        y: [0, -60, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-xeios/[0.03] rounded-full blur-[150px]"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Floating purple particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-xeios/30 rounded-full shadow-[0_0_10px_rgba(103,44,141,0.2)]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0.1, 0.5, 0.1],
                            scale: [1, 2, 1],
                        }}
                        transition={{
                            duration: 6 + Math.random() * 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            <motion.div
                ref={containerRef}
                className="relative z-10 max-w-7xl mx-auto px-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    variants={fadeInUp}
                >
                    <motion.div
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-xeios/15 shadow-[0_4px_20px_-4px_rgba(103,44,141,0.1)] backdrop-blur-md mb-8"
                        whileHover={{ scale: 1.05, borderColor: "rgba(103, 44, 141, 0.3)" }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="h-4 w-4 text-xeios" />
                        </motion.div>
                        <span className="text-sm font-bold text-xeios tracking-wide uppercase">
                            Client Success Stories
                        </span>
                        <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)] animate-pulse" />
                    </motion.div>

                    <motion.h2
                        className="text-5xl sm:text-6xl md:text-8xl font-black mb-8 tracking-tighter text-slate-900 leading-[0.9]"
                        variants={fadeInUp}
                    >
                        Trusted by
                        <br />
                        <motion.span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-xeios via-purple-600 to-xeios-dark"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut" as any
                            }}
                            style={{
                                backgroundSize: '300% 300%'
                            }}
                        >
                            Industry Leaders
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        className="text-xl sm:text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-normal"
                        variants={fadeInUp}
                    >
                        Join thousands of businesses already transforming their operations with our premium AI solutions.
                    </motion.p>
                </motion.div>

                {/* Main Testimonial Display - Reverting Card to Dark Theme as per screenshot */}
                <div className="relative max-w-6xl mx-auto mb-16">
                    <div className="relative h-[550px] md:h-[450px] perspective-1000">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 200, damping: 25 },
                                    opacity: { duration: 0.5 },
                                    scale: { duration: 0.5 },
                                    rotateY: { duration: 0.7 }
                                }}
                                className="absolute inset-0"
                            >
                                <div className="relative h-full bg-[#0F0D15] rounded-[48px] border border-white/10 p-8 md:p-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden group">
                                    {/* Subtly animated dark gradient inside the card with more inner life */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.15] via-transparent to-purple-500/[0.1]"
                                        animate={{
                                            opacity: [0.6, 0.9, 0.6],
                                        }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as any }}
                                    />

                                    {/* Quote icon */}
                                    <motion.div
                                        className="absolute top-12 right-12 opacity-[0.08]"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as any }}
                                    >
                                        <Quote className="w-32 h-32 text-white" />
                                    </motion.div>

                                    <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-14">
                                        {/* User Info Container */}
                                        <div className="flex-shrink-0 text-center md:text-left">
                                            <div className="relative mb-10 w-fit mx-auto md:mx-0">
                                                {/* Capsule background for avatar */}
                                                <div className="absolute inset-y-0 -left-6 -right-20 bg-white/[0.04] border border-white/[0.08] rounded-full hidden md:block" />

                                                {/* Avatar */}
                                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-[6px] border-[#1A1821] shadow-2xl z-10 group-hover:scale-105 transition-transform duration-500">
                                                    <img
                                                        src={testimonials[currentIndex].avatar}
                                                        alt={testimonials[currentIndex].name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 ring-4 ring-white/10 rounded-full ring-inset pointer-events-none" />
                                                </div>
                                            </div>

                                            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
                                                {testimonials[currentIndex].name}
                                            </h3>
                                            <p className="text-[#A392F8] font-bold mb-1 text-lg">
                                                {testimonials[currentIndex].role}
                                            </p>
                                            <p className="text-white/30 text-sm font-semibold tracking-wider uppercase">
                                                {testimonials[currentIndex].company}
                                            </p>

                                            {/* Star Rating */}
                                            <div className="flex justify-center md:justify-start gap-1.5 mt-8">
                                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
                                                    >
                                                        <Star className="w-6 h-6 fill-[#FFD700] text-[#FFD700]" strokeWidth={0} />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="flex-1">
                                            <motion.blockquote
                                                className="text-2xl md:text-[32px] text-white leading-[1.2] mb-12 font-medium italic tracking-tight"
                                                initial={{ opacity: 0, x: 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5, duration: 0.8 }}
                                            >
                                                &ldquo;{testimonials[currentIndex].text}&rdquo;
                                            </motion.blockquote>

                                            {/* Results Tags */}
                                            <div className="flex flex-wrap gap-4">
                                                {testimonials[currentIndex].results.map((result, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="bg-white/5 rounded-2xl px-6 py-3 border border-white/10 text-sm font-bold text-white/90 backdrop-blur-md shadow-sm hover:bg-white/10 transition-colors"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                                                    >
                                                        {result}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls - Dark styling for contrast on light background */}
                    <div className="flex justify-center items-center gap-10 mt-16">
                        <motion.button
                            onClick={prevTestimonial}
                            className="w-16 h-16 rounded-full bg-white border border-slate-200 text-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-xeios hover:text-white hover:border-xeios transition-all duration-500"
                            whileHover={{ scale: 1.1, y: -4 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ArrowLeft className="w-7 h-7" />
                        </motion.button>

                        {/* Dots Indicator - Active Dot is Purple as requested in Step 112/119 implicitly */}
                        <div className="flex gap-4">
                            {testimonials.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > currentIndex ? 1 : -1);
                                        setCurrentIndex(index);
                                    }}
                                    className={`h-3 rounded-full transition-all duration-500 ${index === currentIndex
                                        ? 'w-16 bg-xeios shadow-[0_4px_15px_rgba(103,44,141,0.4)]'
                                        : 'w-3 bg-slate-200 hover:bg-slate-300'
                                        }`}
                                    whileHover={{ scale: 1.4 }}
                                />
                            ))}
                        </div>

                        <motion.button
                            onClick={nextTestimonial}
                            className="w-16 h-16 rounded-full bg-white border border-slate-200 text-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-xeios hover:text-white hover:border-xeios transition-all duration-500"
                            whileHover={{ scale: 1.1, y: -4 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ArrowRight className="w-7 h-7" />
                        </motion.button>
                    </div>
                </div>

                {/* Stats Section - Visible on light background */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-16 mt-32 border-t border-slate-100 pt-24"
                    variants={staggerContainer}
                >
                    {[
                        { number: "500+", label: "Happy Clients" },
                        { number: "98%", label: "Satisfaction Rate" },
                        { number: "$10M+", label: "Cost Savings" },
                        { number: "99.9%", label: "Uptime SLA" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center group"
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-xeios to-purple-600 mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-500">
                                {stat.number}
                            </div>
                            <div className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
