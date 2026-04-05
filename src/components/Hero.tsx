"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Typewriter } from "./Typewriter";
import { PretextTextSpread } from "@/components/PretextTextSpread";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

const nameLetters = "KOMAL".split("");
const middleLetters = "KRISHAN".split("");
const lastLetters = "SHRESTHA".split("");

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -90, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.04,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleField />

      {/* Naruto ambient orbs - orange/red/gold */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#ff6b00]/10 blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-[#e63946]/10 blur-[100px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ffd166]/5 blur-[140px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "3s" }} />

      {/* Large Konoha leaf watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04]">
        <svg width="600" height="600" viewBox="0 0 24 24" fill="#ff6b00">
          <path d="M12 2C12 2 4 8 4 14c0 3 2 6 5 7.5C10 20 11 18 12 16c1 2 2 4 3 5.5 3-1.5 5-4.5 5-7.5C20 8 12 2 12 2z" />
          <path d="M12 2v14" stroke="#ff6b00" strokeWidth={0.3} />
          <circle cx="12" cy="10" r="2.5" stroke="#ff6b00" strokeWidth={0.2} fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-20">
        {/* Mission status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono border border-border-accent bg-bg-card/50 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b00]" />
            </span>
            <span className="text-text-secondary">Ready for Mission</span>
          </span>
        </motion.div>

        {/* Split-text name animation with smoke reveal */}
        <div className="overflow-hidden mb-2">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-x-4 md:gap-x-6"
            style={{ perspective: "600px" }}
          >
            {nameLetters.map((letter, i) => (
              <motion.span
                key={`first-${i}`}
                custom={i}
                variants={letterVariants}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-text-primary inline-block"
                style={{ transformOrigin: "bottom" }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>
        <div className="overflow-hidden mb-2">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-x-4 md:gap-x-6"
            style={{ perspective: "600px" }}
          >
            {middleLetters.map((letter, i) => (
              <motion.span
                key={`mid-${i}`}
                custom={i + nameLetters.length}
                variants={letterVariants}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-gradient inline-block"
                style={{ transformOrigin: "bottom" }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-x-4 md:gap-x-6"
            style={{ perspective: "600px" }}
          >
            {lastLetters.map((letter, i) => (
              <motion.span
                key={`last-${i}`}
                custom={i + nameLetters.length + middleLetters.length}
                variants={letterVariants}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-text-primary inline-block"
                style={{ transformOrigin: "bottom" }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Role with gradient line */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px w-12 bg-gradient-to-r from-[#ff6b00] to-[#e63946]" />
          <PretextTextSpread
            className="text-lg md:text-xl text-text-secondary font-body tracking-wide"
            segments={[{ text: "Junior Web Developer & AI Builder" }]}
          />
        </motion.div>

        {/* Typewriter tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mb-10"
        >
          <Typewriter
            text="Building intelligent web experiences from Biratnagar, Nepal."
            delayStart={1800}
          />
        </motion.div>

        {/* CTA buttons - Naruto orange */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-wrap gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,107,0,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-8 py-4 rounded-xl font-body text-sm font-semibold text-black overflow-hidden transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b00] via-[#e63946] to-[#ffd166] animate-gradient-x" />
            <span className="relative z-10 flex items-center gap-2">
              View Missions
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-xl border border-border-accent text-text-primary font-body text-sm font-semibold hover:bg-[#ff6b00]/5 backdrop-blur-sm transition-all"
          >
            Send a Scroll
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-text-muted/30 flex items-start justify-center pt-1.5"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-[#ff6b00]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
