"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const skillCategories = [
  { label: "Frontend", skills: ["React", "Next.js", "Angular", "HTML/CSS", "Tailwind CSS", "Framer Motion"], color: "from-indigo-500 to-purple-500" },
  { label: "Backend", skills: ["Laravel", "Node.js", "PHP", "Python", "MySQL", "Supabase"], color: "from-emerald-500 to-teal-500" },
  { label: "Tools & More", skills: ["React Native", "C# / WPF", "TypeScript", "Git/GitHub", "OpenRouter API", "Three.js"], color: "from-cyan-500 to-blue-500" },
];

export function Skills() {
  return (
    <section id="skills" className="py-32 bg-bg-primary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-indigo/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent-cyan uppercase tracking-[0.3em] block mb-4">
            &#47;&#47; Tech Stack
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
            <span className="text-text-primary">Tools & </span>
            <span className="text-gradient">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
              className="glass-card rounded-2xl p-6 group hover:border-accent-indigo/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-1 rounded-full bg-gradient-to-r ${cat.color}`} />
                <span className="text-sm font-mono text-text-muted uppercase tracking-wider">{cat.label}</span>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {cat.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 0 25px rgba(99, 102, 241, 0.25)",
                      borderColor: "rgba(99, 102, 241, 0.5)",
                    }}
                    className="px-4 py-2 rounded-xl bg-bg-primary/60 border border-border-subtle text-text-secondary text-sm font-body cursor-default hover:text-text-primary transition-all duration-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Scrolling marquee of all skills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative overflow-hidden py-4"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            {[...PORTFOLIO_DATA.skills, ...PORTFOLIO_DATA.skills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="text-sm font-mono text-text-muted/40 uppercase tracking-wider"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
