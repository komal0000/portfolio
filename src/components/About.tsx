"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({
  target,
  suffix,
  label,
  icon,
}: {
  target: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-card gradient-border rounded-2xl p-6 text-center transition-all duration-300 group"
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#ff6b00]/20 to-[#e63946]/20 flex items-center justify-center text-[#ff6b00] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-1">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-text-muted font-body tracking-wide uppercase">
        {label}
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const highlights = [
  { text: "Modern UI/UX", color: "from-[#ff6b00] to-[#ff8c00]" },
  { text: "AI-Powered Apps", color: "from-[#e63946] to-[#ff6b00]" },
  { text: "Full-Stack", color: "from-[#ffd166] to-[#ff8c00]" },
  { text: "Scalable Systems", color: "from-[#ff8c00] to-[#e63946]" },
];

export function About() {
  return (
    <section id="about" className="py-32 bg-bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b00]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#e63946]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6 relative z-10"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="mb-16">
          <span className="text-xs font-mono text-[#ff6b00] uppercase tracking-[0.3em] block mb-4">
            &#47;&#47; Ninja Profile
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
            <span className="text-text-primary">Shinobi </span>
            <span className="text-gradient">Profile</span>
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-5 gap-12 items-start mb-20">
          {/* Photo column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 flex justify-center lg:justify-start"
          >
            <div className="relative group">
              {/* Animated gradient ring */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#ff6b00] via-[#e63946] to-[#ffd166] opacity-30 blur-xl animate-pulse-glow group-hover:opacity-50 transition-opacity" />
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#ff6b00] via-[#e63946] to-[#ffd166] opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/komal.png"
                  alt="Komal Krishan Shrestha"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 glass-card rounded-xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#ff6b00] animate-pulse" />
                  <span className="text-xs font-mono text-text-secondary">Village: Biratnagar</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text column */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div variants={itemVariants}>
              <p className="text-lg text-text-secondary font-body leading-relaxed">
                I&apos;m <span className="text-text-primary font-semibold">Komal Krishan Shrestha</span>, a
                Web Developer and AI Builder specializing in end-to-end application
                development. I transform complex business requirements into
                polished, high-performance digital products.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-text-secondary font-body leading-relaxed">
                At <span className="text-[#ff6b00] font-medium">NeedTechnosoft</span>, I architect
                and deliver institutional websites, e-commerce platforms, and
                AI-driven SaaS solutions. My approach combines meticulous frontend
                craft with robust, scalable backend systems — always optimized
                for real-world performance.
              </p>
            </motion.div>

            {/* Highlight pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-2">
              {highlights.map((h) => (
                <span
                  key={h.text}
                  className="px-4 py-2 rounded-full text-xs font-mono text-text-primary border border-border-subtle bg-bg-card/50 backdrop-blur-sm hover:border-[#ff6b00]/40 transition-colors"
                >
                  <span className={`inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r ${h.color} mr-2`} />
                  {h.text}
                </span>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div variants={itemVariants}>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-border-subtle to-transparent my-4" />
            </motion.div>

            {/* Quick info row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              <div className="glass-card rounded-xl p-4">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-1">Current Mission</span>
                <span className="text-sm font-body text-text-primary font-medium">Jr. Web Developer</span>
                <span className="text-xs text-[#ff6b00] font-body block">NeedTechnosoft</span>
              </div>
              <div className="glass-card rounded-xl p-4">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-1">Training Academy</span>
                <span className="text-sm font-body text-text-primary font-medium">B.IT (Running)</span>
                <span className="text-xs text-[#ff6b00] font-body block">Purbanchal University</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <AnimatedCounter
            target={3}
            suffix="+"
            label="Years Experience"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="10" /></svg>
            }
          />
          <AnimatedCounter
            target={9}
            suffix="+"
            label="Projects Delivered"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            }
          />
          <AnimatedCounter
            target={18}
            suffix="+"
            label="Technologies"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            }
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
