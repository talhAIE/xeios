"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Star, Globe } from "lucide-react";

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
  country: string;
}

// --- Data: Real-sounding professionals from diverse countries ---
const testimonials: Testimonial[] = [
  {
    text: "XeiosTech completely transformed how we handle predictive analytics. Their AI models reduced our forecasting errors by 60%, saving us millions in inventory costs.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sarah Mitchell",
    role: "Marketing Director",
    country: "New York, USA",
  },
  {
    text: "Their team built us a custom automation pipeline that cut our manual processing time from 12 hours to under 30 minutes. Absolutely game-changing for our operations.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "James Whitfield",
    role: "Operations Director",
    country: "London, UK",
  },
  {
    text: "We needed a partner who understood both AI and healthcare compliance. XeiosTech delivered a fully compliant solution that our entire staff adopted within weeks.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sophia Nguyen",
    role: "Product Manager",
    country: "Sydney, Australia",
  },
  {
    text: "From initial consultation to deployment, XeiosTech demonstrated exceptional professionalism. Our e-commerce platform now handles 3x the traffic with zero downtime.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ahmed Raza",
    role: "CEO, TechVentures",
    country: "Lahore, Pakistan",
  },
  {
    text: "The machine learning models they developed for our supply chain gave us real-time visibility we never had before. Our logistics costs dropped by 35% in six months.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Claire Dubois",
    role: "VP of Innovation",
    country: "Paris, France",
  },
  {
    text: "XeiosTech's approach to data engineering is world-class. They migrated our legacy systems to a modern cloud architecture without a single hour of downtime.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Markus Weber",
    role: "Head of Engineering",
    country: "Berlin, Germany",
  },
  {
    text: "Working with XeiosTech felt like having an in-house AI team. Their developers integrated seamlessly with our workflow and delivered ahead of schedule.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Fatima Zahra",
    role: "Software Architect",
    country: "Islamabad, Pakistan",
  },
  {
    text: "Their UI/UX team redesigned our analytics dashboard, and user engagement jumped 45%. The design is intuitive, fast, and our clients absolutely love it.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Erik Lindqvist",
    role: "CTO, NordicData",
    country: "Stockholm, Sweden",
  },
  {
    text: "We evaluated five agencies before choosing XeiosTech. Best decision we made — they delivered a scalable AI solution that grew with our business from day one.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Emily Thornton",
    role: "Head of Digital",
    country: "Manchester, UK",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Scrolling Column ---
function TestimonialsColumn({
  className,
  testimonials: items,
  duration = 10,
  paused = false,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  paused?: boolean;
}) {
  return (
    <div className={className}>
      <motion.ul
        animate={paused ? {} : { translateY: "-50%" }}
        transition={
          paused
            ? {}
            : { duration, repeat: Infinity, ease: "linear", repeatType: "loop" }
        }
        className="flex flex-col gap-6 pb-6 list-none m-0 p-0"
      >
        {[0, 1].map((copyIndex) => (
          <React.Fragment key={copyIndex}>
            {items.map(({ text, image, name, role, country }, i) => (
              <motion.li
                key={`${copyIndex}-${i}`}
                aria-hidden={copyIndex === 1}
                tabIndex={copyIndex === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow:
                    "0 25px 50px -12px rgba(103, 44, 141, 0.12), 0 10px 10px -5px rgba(103, 44, 141, 0.04)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="p-8 rounded-3xl border border-purple-900/30 shadow-lg shadow-xeios/5 max-w-xs w-full bg-surface transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-xeios/30"
              >
                <blockquote className="m-0 p-0">
                  <p className="text-gray-400 leading-relaxed font-normal m-0">
                    &ldquo;{text}&rdquo;
                  </p>
                  <footer className="flex items-center gap-3 mt-6">
                    <Image
                      width={40}
                      height={40}
                      src={image}
                      alt={`Avatar of ${name}`}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-purple-900/30 group-hover:ring-xeios/30 transition-all duration-300"
                    />
                    <div className="flex flex-col">
                      <cite className="font-semibold not-italic tracking-tight leading-5 text-white">
                        {name}
                      </cite>
                      <span className="text-sm leading-5 tracking-tight text-xeios font-medium mt-0.5">
                        {role}
                      </span>
                      <span className="text-xs leading-4 text-gray-400">
                        {country}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
}

// --- Animation Variants ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const AVATAR_STACK = testimonials.slice(0, 5).map((t) => t.image);

// --- Main Exported Section ---
export function PremiumTestimonials() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-12 sm:py-16 md:py-28 bg-background overflow-x-hidden"
    >
      {/* Layered ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-indigo-900/10 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-xeios/15 to-transparent" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto mb-20">
          <motion.h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tighter text-center text-white leading-[0.9]"
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Trusted by Teams
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-xeios via-purple-500 to-xeios-dark">
              Worldwide
            </span>
          </motion.h2>

          <motion.p
            className="text-center mt-6 text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl"
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Hear from professionals across the globe who scaled their businesses
            with our AI-driven solutions.
          </motion.p>

          {/* Social proof strip */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-5 mt-10"
            variants={fadeUp}
            custom={0.35}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex -space-x-3">
              {AVATAR_STACK.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-background"
                />
              ))}
              <div className="h-9 w-9 rounded-full bg-xeios/10 ring-2 ring-background flex items-center justify-center text-xs font-bold text-xeios">
                +4
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-purple-900/30" aria-hidden="true" />

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5" aria-label="Rating: 4.9 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                    strokeWidth={0}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-300">
                4.9/5
              </span>
              <span className="text-sm text-gray-500">from 500+ reviews</span>
            </div>

            <div className="hidden sm:block w-px h-8 bg-purple-900/30" aria-hidden="true" />

            <div className="flex items-center gap-1.5 text-sm text-gray-400">
              <Globe className="h-4 w-4 text-xeios" aria-hidden="true" />
              <span className="font-medium">12+ countries</span>
            </div>
          </motion.div>
        </div>

        {/* Scrolling Columns */}
        <div
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} paused={prefersReducedMotion} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
            paused={prefersReducedMotion}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
            paused={prefersReducedMotion}
          />
        </div>
      </div>
    </section>
  );
}
