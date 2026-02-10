"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "AI TUTOR - Education Learning Management System",
    category: "Website / LMS / Mobile App",
    desc: "The AI Tutor App was built to provide a personalized Language-speaking practice experience through real-time, AI-driven conversations. Its core goal was to help students improve spoken language skills using CEFR-aligned topics and feedback. With two learning modes — Chat Mode and Photo Mode — the app simulates a human tutor who guides users through structured conversations and only ends the session once all learning goals are met.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Python", "TensorFlow", "React"],
    href: "#contact",
  },
  {
    title: "Quest Hunter GO - Interactive Adventure",
    category: "Gaming / AR",
    desc: "An interactive adventure game where players embark on epic quests, solve puzzles, and discover hidden treasures in a fantasy world. Built with advanced spatial awareness and augmented reality for a truly immersive gaming experience that blends the digital and physical worlds.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Unity", "C#", "Blender"],
    href: "#contact",
  },
  {
    title: "Virtual World - VR History Experience",
    category: "VR / AR Experience",
    desc: "Virtual World is a VR experience that brings history to life with AI-powered conversations with great minds and immersive journeys through iconic events and eras. Users can walk through ancient civilizations and interact with historical figures in a fully realized 3D environment.",
    image:
      "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?auto=format&fit=crop&w=1200&q=80",
    tags: ["Unity", "C#", "VR SDK"],
    href: "#contact",
  },
  {
    title: "QHELO - Sports Social Platform",
    category: "Web Platform / Mobile",
    desc: "Qhelo is a Bangladeshi app that lets people easily find, join, and host sports games, book fields, invite friends, rate players, and climb leaderboards through points. The platform connects sports enthusiasts and builds local communities around shared athletic interests.",
    image:
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    href: "#contact",
  },
  {
    title: "Sports E-commerce Platform",
    category: "Web Platform / E-commerce",
    desc: "A comprehensive sports e-commerce platform that allows users to buy sports equipment, clothing, and accessories. Features include secure payment integration, personalized recommendations powered by AI, and real-time inventory tracking across multiple warehouses.",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "PostgreSQL"],
    href: "#contact",
  },
  {
    title: "Chatterly - No-code AI Builder",
    category: "Web Platform / SaaS",
    desc: "A no-code platform that allows users to build and deploy web applications without writing a single line of code. Leverage AI to turn ideas into full-stack businesses instantly with drag-and-drop interfaces, pre-built templates, and automated deployment pipelines.",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "PostgreSQL"],
    href: "#contact",
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
    x: dir > 0 ? 600 : -600,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    zIndex: 0,
    x: dir < 0 ? 600 : -600,
    opacity: 0,
    scale: 0.95,
  }),
};

const contentStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const contentItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Showcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);

  const project = projects[currentIndex];

  const navigate = useCallback(
    (newIndex: number) => {
      setDirection(newIndex > currentIndex ? 1 : -1);
      setCurrentIndex(newIndex);
    },
    [currentIndex]
  );

  const next = useCallback(
    () => navigate((currentIndex + 1) % projects.length),
    [currentIndex, navigate]
  );
  const prev = useCallback(
    () => navigate((currentIndex - 1 + projects.length) % projects.length),
    [currentIndex, navigate]
  );

  // Keyboard navigation when section is focused
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    };

    section.addEventListener("keydown", handleKeyDown);
    return () => section.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Swipe gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const minSwipe = 50;
    if (Math.abs(diff) > minSwipe) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative py-16 md:py-28 bg-background overflow-hidden"
      tabIndex={0}
      aria-label="Project showcase carousel"
      role="region"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-background to-background pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-xeios/15 to-transparent" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-6">
        {/* ── Header Row ── */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <div>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight"
              variants={fadeUp}
              custom={0}
            >
              Real-World{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-xeios via-purple-500 to-xeios-dark">
                Success Stories
              </span>
            </motion.h2>
            <motion.p
              className="text-gray-400 text-base sm:text-lg mt-3 max-w-lg"
              variants={fadeUp}
              custom={0.1}
            >
              How Our Solutions Helped Businesses Overcome Challenges and Achieve Growth
            </motion.p>
          </div>

          <motion.div variants={fadeUp} custom={0.2}>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-900/40 text-gray-300 hover:text-white hover:border-xeios hover:bg-xeios/10 transition-all duration-300 text-sm font-semibold group"
            >
              View Our Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Project Card ── */}
        <div
          className="relative min-h-[480px] md:min-h-[440px]"
          aria-live="polite"
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 260, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 },
              }}
              className="absolute inset-0"
            >
              <div className="h-full bg-surface rounded-3xl overflow-hidden border border-purple-900/30 shadow-2xl shadow-purple-950/20 flex flex-col lg:flex-row">
                {/* Left: Content */}
                <motion.div
                  className="lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center relative"
                  variants={contentStagger}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={contentItem}>
                    <div className="w-10 h-10 rounded-xl bg-xeios/10 border border-xeios/20 flex items-center justify-center mb-5">
                      <Layers className="w-5 h-5 text-xeios" />
                    </div>
                  </motion.div>

                  <motion.p
                    className="text-gray-500 text-sm mb-3 tracking-wide"
                    variants={contentItem}
                  >
                    {project.category.split(" / ").map((part, i, arr) => (
                      <span key={part}>
                        <span className="text-gray-400">{part}</span>
                        {i < arr.length - 1 && (
                          <span className="text-purple-900/60 mx-2">/</span>
                        )}
                      </span>
                    ))}
                  </motion.p>

                  <motion.h3
                    className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mb-4 leading-tight"
                    variants={contentItem}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 line-clamp-4 sm:line-clamp-none"
                    variants={contentItem}
                  >
                    {project.desc}
                  </motion.p>

                  <motion.div variants={contentItem}>
                    <Link
                      href={project.href}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-xeios/40 text-xeios hover:bg-xeios hover:text-white transition-all duration-300 text-sm font-semibold group"
                    >
                      View Project
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Right: Image */}
                <div className="relative lg:w-1/2 h-48 sm:h-60 md:h-72 lg:h-auto bg-surface-highlight overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-surface/40 via-transparent to-transparent pointer-events-none lg:block hidden" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom Navigation: arrows + dots ── */}
        <div className="flex items-center justify-center gap-4 mt-10" role="tablist" aria-label="Project navigation">
          <motion.button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-purple-900/30 bg-surface text-gray-300 flex items-center justify-center hover:bg-xeios hover:text-white hover:border-xeios transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous project"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>

          <div className="flex items-center gap-2">
            {projects.map((p, idx) => (
              <motion.button
                key={idx}
                role="tab"
                aria-selected={idx === currentIndex}
                onClick={() => navigate(idx)}
                className={`rounded-full transition-all duration-400 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  idx === currentIndex
                    ? "bg-white shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
                    : "bg-transparent hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.1 }}
                aria-label={`Go to project: ${p.title}`}
              >
                {/* Visual dot indicator inside the touch target */}
                <span
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 h-3 bg-white"
                      : "w-3 h-3 bg-white/20"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={next}
            className="w-11 h-11 rounded-full border border-purple-900/30 bg-surface text-gray-300 flex items-center justify-center hover:bg-xeios hover:text-white hover:border-xeios transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next project"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
