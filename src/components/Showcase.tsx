"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "AI Tutor - Education LMS",
    category: "Website / LMS / Mobile App",
    desc: "The AI Tutor App was built to provide a personalized language-speaking practice experience through real-time, AI-driven conversations. Its core goal was to help students improve spoken language skills using CEFR-aligned topics and feedback.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Python", "TensorFlow", "React"],
  },
  {
    title: "Quest Hunter GO",
    category: "Gaming / AR",
    desc: "An interactive adventure game where players embark on epic quests, solve puzzles, and discover hidden treasures in a fantasy world. Built with advanced spatial awareness for an immersive experience.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Unity", "C#", "Blender"],
  },
  {
    title: "Virtual World - VR History",
    category: "VR / AR Experience",
    desc: "Virtual World is a VR experience that brings history to life with AI-powered conversations with great minds and immersive journeys through iconic events and eras.",
    image:
      "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?auto=format&fit=crop&w=1200&q=80",
    tags: ["Unity", "C#", "VR SDK"],
  },
  {
    title: "QHELO - Sports Social App",
    category: "Web Platform / Mobile",
    desc: "Qhelo is a Bangladeshi app that lets people easily find, join, and host sports games, book fields, invite friends, rate players, and climb leaderboards through points.",
    image:
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80",
    tags: ["React Native", "Node.js", "PostgreSQL"],
  },
  {
    title: "Sports E-commerce Platform",
    category: "Web Platform / E-commerce",
    desc: "A comprehensive sports e-commerce platform that allows users to buy sports equipment, clothing, and accessories. Features include secure payment integration and personalized recommendations.",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Chatterly - No-code AI",
    category: "Web Platform / SaaS",
    desc: "A no-code platform that allows users to build and deploy web applications without writing a single line of code. Leverage AI to turn ideas into full-stack businesses instantly.",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
];

// --- Animation Variants ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 500 : -500,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    zIndex: 0,
    x: dir < 0 ? 500 : -500,
    opacity: 0,
    scale: 0.96,
  }),
};

export default function Showcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const project = projects[currentIndex];

  const navigate = (newIndex: number) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  const next = () => navigate((currentIndex + 1) % projects.length);
  const prev = () =>
    navigate((currentIndex - 1 + projects.length) % projects.length);

  return (
    <section
      id="showcase"
      className="relative py-28 bg-[#0A0118] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-[#0A0118] to-[#0A0118] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-xeios/15 to-transparent" />

      <div className="relative z-10 container mx-auto px-6">
        {/* ── Header: left heading + right description ── */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <motion.p
              className="text-sm font-bold text-xeios uppercase tracking-widest mb-3"
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Selected Projects
            </motion.p>
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-none"
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Work That{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-xeios via-purple-500 to-xeios-dark">
                Speaks
              </span>
            </motion.h2>
          </div>

          <motion.p
            className="text-gray-400 text-base sm:text-lg max-w-md md:text-right leading-relaxed"
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            From AI-powered platforms to immersive VR — every project is built
            to solve real problems and deliver lasting impact.
          </motion.p>
        </motion.div>

        {/* ── Counter + Nav Row ── */}
        <motion.div
          className="flex items-center justify-between mb-6"
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-black text-xeios tabular-nums">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium text-gray-500">
              / {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-purple-900/30 bg-[#110822] text-gray-300 flex items-center justify-center hover:bg-xeios hover:text-white hover:border-xeios transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous project"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={next}
              className="w-12 h-12 rounded-full border border-purple-900/30 bg-[#110822] text-gray-300 flex items-center justify-center hover:bg-xeios hover:text-white hover:border-xeios transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next project"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* ── Project Card ── */}
        <div className="relative h-[520px] sm:h-[480px] md:h-[440px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 },
              }}
              className="absolute inset-0"
            >
              <div className="group h-full bg-[#110822] rounded-3xl overflow-hidden border border-purple-900/30 shadow-xl hover:shadow-2xl hover:shadow-xeios/10 transition-shadow duration-500 flex flex-col lg:flex-row">
                {/* Image */}
                <div className="relative lg:w-1/2 h-52 sm:h-56 lg:h-auto bg-[#1A0E2E] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#110822]/90 backdrop-blur-sm text-xs font-bold text-xeios shadow-sm border border-purple-900/30">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_50%,rgba(103,44,141,0.04),transparent_70%)] pointer-events-none" />

                  <div className="relative z-10">
                    <motion.h3
                      className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4 leading-tight"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.5 }}
                    >
                      {project.title}
                    </motion.h3>

                    <motion.p
                      className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 line-clamp-4"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                    >
                      {project.desc}
                    </motion.p>

                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                    >
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-xeios/10 text-xeios border border-xeios/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Dot Indicators ── */}
        <div className="flex justify-center gap-2.5 mt-8">
          {projects.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => navigate(idx)}
              className={`h-2.5 rounded-full transition-all duration-400 ${
                idx === currentIndex
                  ? "w-10 bg-xeios shadow-[0_2px_8px_rgba(103,44,141,0.3)]"
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
              whileHover={{ scale: 1.3 }}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
