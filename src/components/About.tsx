"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-display font-bold text-accent-indigo">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-text-muted mt-1 font-body">{label}</div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function About() {
  return (
    <section id="about" className="py-24 bg-bg-secondary">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6"
      >
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-accent-indigo via-accent-cyan to-accent-emerald opacity-40 blur-lg animate-pulse" />
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-border-accent">
                <Image
                  src="/komal.png"
                  alt="Komal Krishan Shrestha"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6"
            >
              About Me
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-text-secondary font-body leading-relaxed mb-4"
            >
              I&apos;m Komal Krishan Shrestha, a passionate Junior Web Developer
              and AI Builder based in Biratnagar, Nepal. I specialize in
              crafting modern, responsive web applications that combine
              beautiful design with robust functionality.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-text-secondary font-body leading-relaxed mb-8"
            >
              Currently working at NeedTechnosoft, I&apos;ve had the privilege
              of building institutional websites, e-commerce platforms, and
              AI-powered SaaS tools. I love turning complex problems into
              elegant, user-friendly solutions.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto"
        >
          <AnimatedCounter target={3} suffix="+" label="Years" />
          <AnimatedCounter target={9} suffix="+" label="Projects" />
          <AnimatedCounter target={5} suffix="+" label="Technologies" />
        </motion.div>
      </motion.div>
    </section>
  );
}
