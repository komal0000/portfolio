"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

const itemVariants = {
  hidden: { opacity: 0, y: 30, x: -10 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Experience() {
  return (
    <section id="experience" className="py-32 bg-bg-primary relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent-emerald uppercase tracking-[0.3em] block mb-4">
            &#47;&#47; Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
            <span className="text-text-primary">Experience & </span>
            <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
              <span className="text-sm font-mono text-text-muted uppercase tracking-wider">Work</span>
            </div>
            <div className="relative pl-8 space-y-8">
              {/* Gradient timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-accent-emerald via-accent-emerald/30 to-transparent" />

              {PORTFOLIO_DATA.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative"
                >
                  {/* Glowing dot */}
                  <div className="absolute -left-[25px] top-2">
                    <div className="w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-emerald relative">
                      <div className="absolute inset-0 rounded-full bg-accent-emerald/30 animate-ping" />
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-5 group hover:border-accent-emerald/30 transition-all duration-300">
                    <span className="text-[11px] font-mono text-accent-emerald block mb-2 tracking-wider">
                      {exp.period}
                    </span>
                    <h4 className="text-lg font-display font-bold text-text-primary">
                      {exp.role}
                    </h4>
                    <p className="text-sm text-accent-indigo font-body mb-4">
                      {exp.company} — {exp.location}
                    </p>
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="text-sm text-text-secondary font-body leading-relaxed flex gap-2"
                        >
                          <span className="text-accent-emerald mt-0.5 shrink-0">
                            &#x25B8;
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
              <span className="text-sm font-mono text-text-muted uppercase tracking-wider">Education</span>
            </div>
            <div className="relative pl-8 space-y-8">
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-accent-cyan via-accent-cyan/30 to-transparent" />

              {PORTFOLIO_DATA.education.map((edu, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative"
                >
                  <div className="absolute -left-[25px] top-2">
                    <div className="w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-cyan" />
                  </div>

                  <div className="glass-card rounded-xl p-5 group hover:border-accent-cyan/30 transition-all duration-300">
                    <span className="text-[11px] font-mono text-accent-cyan block mb-2 tracking-wider">
                      {edu.period}
                    </span>
                    <h4 className="text-lg font-display font-bold text-text-primary">
                      {edu.degree}
                    </h4>
                    <p className="text-sm text-accent-indigo font-body">
                      {edu.institution} — {edu.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
