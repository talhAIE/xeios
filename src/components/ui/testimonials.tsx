"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, type Variants, type Transition } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

interface Testimonial {
    image: string
    name: string
    username: string
    text: string
    social: string
}

interface TestimonialsProps {
    testimonials: Testimonial[]
    className?: string
    title?: string
    description?: string
    maxDisplayed?: number
}

// --- Animation Variants ---
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98]
        }
    })
}

// Hover animation object
const whileHover = {
    scale: 1.03,
    y: -8,
    boxShadow: "0 25px 50px -12px rgba(103, 44, 141, 0.12), 0 10px 10px -5px rgba(103, 44, 141, 0.04)",
}

export function Testimonials({
    testimonials,
    className,
    title = "Read what people are saying",
    description = "Dummy feedback from virtual customers using our component library.",
    maxDisplayed = 6,
}: TestimonialsProps) {
    const [showAll, setShowAll] = useState(false)

    return (
        <div className={className}>
            <div className="flex flex-col items-center justify-center pt-5 mb-16 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-center text-white leading-[0.9] uppercase">
                        {title.split(' ').slice(0, -1).join(' ')}
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-xeios via-purple-500 to-xeios-dark">
                            {title.split(' ').slice(-1)}
                        </span>
                    </h2>
                    <p className="text-center mt-8 text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        {description.split("<br />").map((line, i) => (
                            <span key={i}>
                                {line}
                                {i !== description.split("<br />").length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                </motion.div>
            </div>

            <div className="relative">
                <div
                    className={cn(
                        "flex justify-center items-center gap-6 flex-wrap px-4",
                        !showAll &&
                        testimonials.length > maxDisplayed &&
                        "max-h-[1000px] overflow-hidden",
                    )}
                >
                    {testimonials
                        .slice(0, showAll ? undefined : maxDisplayed)
                        .map((testimonial, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                custom={index}
                                initial="hidden"
                                whileInView="visible"
                                whileHover={whileHover}
                                viewport={{ once: true }}
                                className="w-full sm:w-80 h-auto"
                            >
                                <Card
                                    className="h-full p-8 rounded-3xl border border-purple-900/30 shadow-lg shadow-xeios/5 relative bg-surface transition-colors duration-300 cursor-default select-none group hover:border-xeios/40 border-t-xeios/20"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative h-12 w-12 shrink-0">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                fill
                                                className="rounded-full object-cover ring-2 ring-purple-900/30 group-hover:ring-xeios/30 transition-all duration-300"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <cite className="font-bold not-italic tracking-tight leading-5 text-white">
                                                {testimonial.name}
                                            </cite>
                                            <span className="text-[10px] leading-4 tracking-widest text-white/70 font-black mt-0.5 uppercase">
                                                {testimonial.username}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-8 relative">
                                        <span className="absolute -top-4 -left-2 text-4xl text-xeios/10 font-serif leading-none select-none">"</span>
                                        <p className="text-gray-400 leading-relaxed font-normal m-0 text-sm md:text-base">
                                            {testimonial.text}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                </div>

                {testimonials.length > maxDisplayed && !showAll && (
                    <div className="relative mt-[-100px] z-20">
                        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none" />
                        <div className="flex justify-center pb-12 relative">
                            <Button
                                onClick={() => setShowAll(true)}
                                className="bg-xeios hover:bg-xeios-dark text-white border-none px-10 py-7 rounded-full font-bold shadow-[0_4px_20px_0_rgba(103,44,141,0.4)] hover:scale-110 active:scale-95 transition-all cursor-pointer text-lg"
                            >
                                SHOW ALL STORIES
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
