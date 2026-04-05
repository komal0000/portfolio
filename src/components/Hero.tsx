"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { NameReveal } from "./NameReveal";
import { Typewriter } from "./Typewriter";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleField />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-accent-indigo border border-border-accent bg-bg-card/50">
            Available for work
          </span>
        </motion.div>

        <NameReveal />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-2xl text-text-secondary font-body mt-2 mb-4"
        >
          Junior Web Developer & AI Builder
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <Typewriter
            text="Building intelligent web experiences from Biratnagar, Nepal."
            delayStart={1800}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg bg-accent-indigo text-white font-body text-sm font-medium hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2 focus:ring-offset-bg-primary"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg border border-border-accent text-text-primary font-body text-sm font-medium hover:bg-accent-indigo/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2 focus:ring-offset-bg-primary"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#about" aria-label="Scroll down">
            <motion.svg
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-muted"
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
