"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { SectionLabel } from "./SectionLabel";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel
          text="EXPERIENCE"
          accentColor="var(--accent-emerald)"
        />

        <div className="grid md:grid-cols-2 gap-16">
          {/* Experience Column */}
          <div>
            <h3 className="text-sm font-mono text-accent-emerald uppercase tracking-wider mb-8">
              Work
            </h3>
            <div className="relative border-l-2 border-border-subtle pl-8 space-y-10">
              {PORTFOLIO_DATA.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-emerald" />
                  <span className="text-xs font-mono text-text-muted block mb-1">
                    {exp.period}
                  </span>
                  <h4 className="text-lg font-display font-semibold text-text-primary">
                    {exp.role}
                  </h4>
                  <p className="text-sm text-accent-indigo font-body mb-3">
                    {exp.company} — {exp.location}
                  </p>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="text-sm text-text-secondary font-body leading-relaxed flex gap-2"
                      >
                        <span className="text-accent-emerald mt-1 shrink-0">
                          &#x2022;
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-wider mb-8">
              Education
            </h3>
            <div className="relative border-l-2 border-border-subtle pl-8 space-y-10">
              {PORTFOLIO_DATA.education.map((edu, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-cyan" />
                  <span className="text-xs font-mono text-text-muted block mb-1">
                    {edu.period}
                  </span>
                  <h4 className="text-lg font-display font-semibold text-text-primary">
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-accent-indigo font-body">
                    {edu.institution} — {edu.location}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
