"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

// --- Types ---
interface Technology {
  name: string;
  /** Simple Icons slug — used to load from cdn.simpleicons.org/{slug} */
  icon: string;
  /** Optional hex color override (no #). Used for icons whose brand color is
   *  white/invisible on a dark background. */
  color?: string;
}

// --- Technology Data (split into 3 rows for the marquee) ---
const row1: Technology[] = [
  { name: "LangGraph", icon: "langchain" },
  { name: "LangChain", icon: "langchain" },
  { name: "N8N", icon: "n8n", color: "EA4B71" },
  { name: "HuggingFace", icon: "huggingface" },
  { name: "OpenCV", icon: "opencv" },
  { name: "YOLO", icon: "ultralytics", color: "6C3AED" },
  { name: "Python", icon: "python" },
  { name: "PyTorch", icon: "pytorch" },
  { name: "TensorFlow", icon: "tensorflow" },
];

const row2: Technology[] = [
  { name: "Next.js", icon: "nextdotjs", color: "FFFFFF" },
  { name: "Vue.js", icon: "vuedotjs" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "FastAPI", icon: "fastapi" },
  { name: "Django", icon: "django", color: "44B78B" },
  { name: "Flutter", icon: "flutter" },
  { name: "React Native", icon: "react" },
  { name: "Kotlin", icon: "kotlin" },
  { name: "Swift", icon: "swift", color: "F05138" },
];

const row3: Technology[] = [
  { name: "MongoDB", icon: "mongodb" },
  { name: "Supabase", icon: "supabase" },
  { name: "Selenium", icon: "selenium" },
  { name: "Docker", icon: "docker" },
  { name: "Kubernetes", icon: "kubernetes" },
  { name: "GCP", icon: "googlecloud" },
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

/** Build the CDN URL for a Simple Icons icon. */
function getIconUrl(tech: Technology): string {
  const base = `https://cdn.simpleicons.org/${tech.icon}`;
  return tech.color ? `${base}/${tech.color}` : base;
}

// --- Tech Card ---
function TechCard({ tech }: { tech: Technology }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-purple-900/30 bg-surface shadow-sm hover:shadow-md hover:shadow-xeios/10 hover:border-xeios/30 hover:-translate-y-1 transition-all duration-300 group cursor-default select-none shrink-0">
      <div className="w-8 h-8 flex items-center justify-center">
        {/* Using native img for external CDN icons — next/image requires
            adding cdn.simpleicons.org to remotePatterns which is fragile */}
        <img
          src={getIconUrl(tech)}
          alt=""
          width={28}
          height={28}
          className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
          aria-hidden="true"
        />
      </div>
      <span className="text-sm font-semibold text-gray-300 group-hover:text-xeios transition-colors duration-300 whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
}

// --- Marquee Row ---
function MarqueeRow({
  technologies,
  direction = "left",
  duration = 35,
  paused = false,
}: {
  technologies: Technology[];
  direction?: "left" | "right";
  duration?: number;
  paused?: boolean;
}) {
  const items = [...technologies, ...technologies];

  return (
    <div
      className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      role="marquee"
      aria-label={`Scrolling technology icons`}
    >
      <motion.div
        className="flex gap-4 shrink-0"
        animate={
          paused
            ? { x: "0%" }
            : { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={
          paused
            ? { duration: 0 }
            : { x: { duration, repeat: Infinity, ease: "linear" } }
        }
      >
        {items.map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </motion.div>
    </div>
  );
}

// --- Row Labels ---
const ROW_LABELS = ["AI & Machine Learning", "Web & Mobile", "DevOps & Cloud"];

// --- Main Component ---
export default function Technologies() {
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
      id="technologies"
      className="relative py-12 sm:py-16 md:py-28 bg-background overflow-x-hidden"
    >
      {/* Subtle top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-xeios/15 to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-white leading-none"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Technologies We{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-xeios via-purple-500 to-xeios-dark">
              Master
            </span>
          </motion.h2>

          <motion.p
            className="mt-5 text-gray-400 text-base sm:text-lg md:text-xl"
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            25+ technologies powering AI, web, mobile, and cloud solutions.
          </motion.p>
        </div>

        {/* Marquee Rows */}
        <div className="flex flex-col gap-8">
          {[row1, row2, row3].map((row, index) => (
            <motion.div
              key={ROW_LABELS[index]}
              variants={fadeUp}
              custom={0.3 + index * 0.15}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 text-center">
                {ROW_LABELS[index]}
              </p>
              <MarqueeRow
                technologies={row}
                direction={index % 2 === 0 ? "left" : "right"}
                duration={index === 0 ? 30 : index === 1 ? 35 : 28}
                paused={prefersReducedMotion}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
