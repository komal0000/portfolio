"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

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
  Web: "from-indigo-500 to-purple-500",
  "E-commerce": "from-pink-500 to-rose-500",
  "AI/SaaS": "from-cyan-500 to-blue-500",
  "AI Tool": "from-emerald-500 to-teal-500",
};

export function Projects() {
  return (
    <section id="projects" className="py-32 bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-indigo/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent-indigo uppercase tracking-[0.3em] block mb-4">
            &#47;&#47; Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
            <span className="text-text-primary">Selected </span>
            <span className="text-gradient">Work</span>
          </h2>
          <p className="text-text-secondary font-body mt-4 max-w-lg">
            A collection of projects spanning institutional websites, e-commerce, and AI-powered applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {PORTFOLIO_DATA.projects.map((project, idx) => (
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
              <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/0 via-transparent to-purple-500/0 group-hover:from-accent-indigo/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none rounded-2xl" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-text-muted">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-xs font-mono px-3 py-1 rounded-full bg-gradient-to-r ${typeColors[project.type] || "from-indigo-500 to-purple-500"} text-white`}>
                      {project.type}
                    </span>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center group-hover:border-accent-indigo/50 group-hover:bg-accent-indigo/10 transition-all"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-indigo transition-colors"
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

                <p className="text-sm text-text-secondary font-body leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-text-muted px-3 py-1.5 rounded-lg bg-bg-primary/60 border border-border-subtle group-hover:border-border-accent/30 transition-colors"
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
