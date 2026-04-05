"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { SectionLabel } from "./SectionLabel";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel
          text="SELECTED WORK"
          accentColor="var(--accent-indigo)"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {PORTFOLIO_DATA.projects.map((project) => (
            <motion.div
              key={project.name}
              variants={cardVariants}
              whileHover={{
                y: -4,
                borderColor: "var(--accent-indigo)",
                transition: { duration: 0.2 },
              }}
              className="group relative bg-bg-card rounded-xl border border-border-subtle p-6 transition-all overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-accent-cyan px-2 py-0.5 rounded border border-accent-cyan/20 bg-accent-cyan/5">
                    {project.type}
                  </span>
                  <svg
                    className="w-4 h-4 text-text-muted group-hover:text-accent-indigo transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>

                <h3 className="text-lg font-display font-semibold text-text-primary mb-2 group-hover:text-accent-indigo transition-colors">
                  {project.name}
                </h3>

                <p className="text-sm text-text-secondary font-body leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-text-muted px-2 py-1 rounded bg-bg-primary/50 border border-border-subtle"
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
