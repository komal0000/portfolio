"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { SectionLabel } from "./SectionLabel";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel text="TOOLS & TECHNOLOGIES" accentColor="var(--accent-cyan)" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap gap-3"
        >
          {PORTFOLIO_DATA.skills.map((skill) => (
            <motion.span
              key={skill}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
              }}
              className="px-4 py-2 rounded-lg bg-bg-card border border-border-subtle text-text-secondary text-sm font-body cursor-default hover:border-border-accent hover:text-text-primary transition-colors"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
