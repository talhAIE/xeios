"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "SmartLearn AI Mentor – Learning Management System",
    category: "Website / LMS / Mobile App",
    desc: "The SmartLearn AI Mentor App delivers personalized language practice through AI-powered conversations, using CEFR-aligned topics, instant feedback, and adaptive learning as an intelligent NLP-driven tutor.",
    image:
      "/Proj-1.png",
    tags: ["Python", "TensorFlow", "React"],
    href: "#contact",
  },

  {
    title: "StyleVision – AI Fashion Recognition Platform",
    category: "Web Platform / Mobile / Computer Vision",
    desc: "StyleVision is an AI-powered platform that identifies and classifies clothing from images. Using deep learning and computer vision, it recommends similar products, enhances personalization, and enables smarter e-commerce shopping.",
    image:
      "/Proj-CV.png",
    tags: ["React", "Node.js", "PostgreSQL"],
    href: "#contact",
  },

  {
    title: "HealthLedger - Medical Billing Expert",
    category: "Website / AI Automation / Healthcare Software",
    desc: "HealthLedger is an intelligent platform that streamlines healthcare billing with AI-powered automation. It helps medical professionals manage claims, invoices, and payments efficiently while using AI-driven analytics to reduce errors and optimize workflows.",
    image:
      "/Proj-Med.png",
    tags: ["Unity", "C#", "VR SDK"],
    href: "#contact",
  },

  {
    title: "FinSight AI – Smart Financial Analytics",
    category: "Web Platform / Mobile",
    desc: "FinSight AI is an AI-driven platform delivering predictive analytics and real-time investment insights. Using machine learning and NLP, it tracks portfolios, analyzes trends, and provides personalized recommendations for smarter financial decisions.",
    image:
      "/Proj-Fin.png",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    href: "#contact",
  },



  {
    title: "Sportlify – Sports E-commerce Platform",
    category: "Web Platform / E-commerce",
    desc: "A modern sports e-commerce platform enabling users to purchase equipment, apparel, and accessories with ease. Powered by AI-driven recommendations and real-time inventory tracking, Sportlify offers personalized shopping experiences, secure payments, and seamless order management across multiple warehouses.",
    image:
      "/Proj-Sp.png",
    tags: ["React", "Node.js", "PostgreSQL"],
    href: "#contact",
  },
  {
    title: "AI TrailQuest AR- Interactive Adventure",
    category: "Gaming / AR",
    desc: "An interactive AR-based exploration game powered by AI-driven location intelligence. It uses smart proximity detection to guide players to nearby POIs and unlock clues through immersive AR interactions, creating an engaging real-world discovery experience.",
    image:
      "/Proj-3.png",
    tags: ["Unity", "C#", "Blender"],
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
          className="relative min-h-[700px] md:min-h-[550px] lg:min-h-[700px] w-full"
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
              {/* Main Card Container matching reference code */}
              <div className="relative border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm bg-white/5 border-2 border-white/10 shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-8 items-center h-full">
                  {/* Left: Content */}
                  <div className="relative z-10 flex flex-col justify-center">
                    <motion.div variants={contentItem}>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                        <Layers className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>

                    <motion.p
                      className="text-gray-400 text-sm font-medium tracking-wider uppercase mb-3"
                      variants={contentItem}
                    >
                      {project.category}
                    </motion.p>

                    <motion.h3
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                      variants={contentItem}
                    >
                      {project.title}
                    </motion.h3>

                    <motion.p
                      className="text-gray-400 text-base leading-relaxed mb-8"
                      variants={contentItem}
                    >
                      {project.desc}
                    </motion.p>

                    <motion.div variants={contentItem}>
                      <Link
                        href={project.href}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white font-bold tracking-wide shadow-lg shadow-purple-900/20 hover:scale-105 transition-transform duration-300"
                      >
                        View Project
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  </div>

                  {/* Right: Image */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom Navigation: arrows + dots ── */}
        <div className="relative z-20 flex items-center justify-center gap-4 mt-10" role="tablist" aria-label="Project navigation">
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
                className={`rounded-full transition-all duration-500 flex items-center justify-center ${idx === currentIndex
                  ? "w-8 h-8 bg-white/10"
                  : "w-8 h-8 bg-transparent hover:bg-white/5"
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to project: ${p.title}`}
              >
                {/* Visual dot indicator inside the touch target */}
                <span
                  className={`rounded-full transition-all duration-500 ${idx === currentIndex
                    ? "w-2.5 h-2.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                    : "w-1.5 h-1.5 bg-white/20"
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
