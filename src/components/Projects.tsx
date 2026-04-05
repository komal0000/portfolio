"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { PretextTextSpread } from "@/components/PretextTextSpread";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const typeColors: Record<string, string> = {
  Web: "from-[#ff6b00] to-[#ff8c00]",
  "E-commerce": "from-[#e63946] to-[#ff6b00]",
  "AI/SaaS": "from-[#ffd166] to-[#ff8c00]",
  "AI Tool": "from-[#ff8c00] to-[#e63946]",
};

const missionRanks: Record<string, string> = {
  Web: "C-Rank",
  "E-commerce": "B-Rank",
  "AI/SaaS": "A-Rank",
  "AI Tool": "S-Rank",
};

export function Projects() {
  return (
    <section id="projects" className="py-32 bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ff6b00]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-[#ff6b00] uppercase tracking-[0.3em] block mb-4">
            &#47;&#47; Mission Log
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
            <span className="text-text-primary">Mission </span>
            <span className="text-gradient">Log</span>
          </h2>
          <PretextTextSpread
            className="text-text-secondary font-body mt-4 max-w-lg"
            segments={[{ text: "Completed missions spanning institutional websites, e-commerce, and AI-powered applications." }]}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {PORTFOLIO_DATA.projects.map((project) => (
            <motion.div
              key={project.name}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.25 },
              }}
              className="group relative glass-card gradient-border rounded-2xl p-6 transition-all duration-300 overflow-hidden noise-overlay"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b00]/0 via-transparent to-[#e63946]/0 group-hover:from-[#ff6b00]/5 group-hover:to-[#e63946]/5 transition-all duration-500 pointer-events-none rounded-2xl" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-[#ffd166]/60 uppercase">
                      {missionRanks[project.type] || "D-Rank"}
                    </span>
                    <span className={`text-xs font-mono px-3 py-1 rounded-full bg-gradient-to-r ${typeColors[project.type] || "from-[#ff6b00] to-[#ff8c00]"} text-black font-semibold`}>
                      {project.type}
                    </span>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center group-hover:border-[#ff6b00]/50 group-hover:bg-[#ff6b00]/10 transition-all"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-text-muted group-hover:text-[#ff6b00] transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-text-primary mb-3 group-hover:text-gradient transition-all duration-300">
                  {project.name}
                </h3>

                <PretextTextSpread
                  className="text-sm text-text-secondary font-body leading-relaxed mb-5"
                  segments={[{ text: project.description }]}
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-text-muted px-3 py-1.5 rounded-lg bg-bg-primary/60 border border-border-subtle group-hover:border-[#ff6b00]/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
