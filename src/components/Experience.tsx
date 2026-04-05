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
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ff6b00]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-[#ff6b00] uppercase tracking-[0.3em] block mb-4">
            &#47;&#47; Shinobi Path
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
            <span className="text-text-primary">Shinobi </span>
            <span className="text-gradient">Path</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c00]" />
              <span className="text-sm font-mono text-text-muted uppercase tracking-wider">Missions</span>
            </div>
            <div className="relative pl-8 space-y-8">
              {/* Gradient timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#ff6b00] via-[#ff6b00]/30 to-transparent" />

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
                    <div className="w-4 h-4 rounded-full bg-bg-primary border-2 border-[#ff6b00] relative">
                      <div className="absolute inset-0 rounded-full bg-[#ff6b00]/30 animate-ping" />
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-5 group hover:border-[#ff6b00]/30 transition-all duration-300">
                    <span className="text-[11px] font-mono text-[#ff6b00] block mb-2 tracking-wider">
                      {exp.period}
                    </span>
                    <h4 className="text-lg font-display font-bold text-text-primary">
                      {exp.role}
                    </h4>
                    <p className="text-sm text-[#ff6b00] font-body mb-4">
                      {exp.company} — {exp.location}
                    </p>
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="text-sm text-text-secondary font-body leading-relaxed flex gap-2"
                        >
                          <span className="text-[#ff6b00] mt-0.5 shrink-0">
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
              <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#e63946] to-[#ff6b00]" />
              <span className="text-sm font-mono text-text-muted uppercase tracking-wider">Training</span>
            </div>
            <div className="relative pl-8 space-y-8">
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#e63946] via-[#e63946]/30 to-transparent" />

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
                    <div className="w-4 h-4 rounded-full bg-bg-primary border-2 border-[#e63946]" />
                  </div>

                  <div className="glass-card rounded-xl p-5 group hover:border-[#e63946]/30 transition-all duration-300">
                    <span className="text-[11px] font-mono text-[#e63946] block mb-2 tracking-wider">
                      {edu.period}
                    </span>
                    <h4 className="text-lg font-display font-bold text-text-primary">
                      {edu.degree}
                    </h4>
                    <p className="text-sm text-[#e63946] font-body">
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
