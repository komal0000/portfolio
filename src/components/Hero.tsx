"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "./Typewriter";
import { PretextTextSpread } from "@/components/PretextTextSpread";

const firstLine = "KOMAL KRISHAN".split("");
const secondLine = "SHRESTHA".split("");
const roleLine = "Junior Web Developer & AI Builder";
const heroSubtitle = "Building intelligent web experiences from Biratnagar, Nepal.";

const letterVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay: 1.2 + i * 0.035,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-end justify-center overflow-hidden bg-black"
    >
      {/* ── ITACHI BACKGROUND IMAGE ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/itachi-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlays to ensure text readability */}
      {/* Bottom heavy gradient — content lives here */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.2) 55%, transparent 75%)",
        }}
      />
      {/* Left side darken for text area */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 50%)",
        }}
      />
      {/* Subtle vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <div className="absolute inset-0 z-[1] pointer-events-none md:hidden bg-gradient-to-t from-black via-black/80 to-black/25" />

      {/* Red ambient glow — ties into the Sharingan from the image */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#cc0000]/[0.04] blur-[100px] pointer-events-none z-[2]" />

      {/* ── CONTENT — positioned at bottom ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 w-full pb-20 sm:pb-24">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-4 sm:mb-5"
        >
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-mono border border-red-900/30 bg-black/60 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            <span className="text-red-400/80">Sharingan Active</span>
          </span>
        </motion.div>

        {/* Name — mobile-optimized typography */}
        <div className="md:hidden mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-[2.05rem] leading-[0.9] font-display font-bold tracking-[0.06em] text-text-primary"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
          >
            KOMAL KRISHAN
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.45, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-[2rem] leading-[0.9] font-display font-bold tracking-[0.08em] text-gradient mt-1"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
          >
            SHRESTHA
          </motion.h2>
        </div>

        {/* Name — desktop reveal */}
        <div className="hidden md:block">
          <div className="overflow-hidden mb-1">
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-x-2 md:gap-x-3"
              style={{ perspective: "600px" }}
            >
              {firstLine.map((letter, i) => (
                <motion.span
                  key={`first-${i}`}
                  custom={i}
                  variants={letterVariants}
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold inline-block tracking-tight ${
                    letter === " " ? "w-3 md:w-4" : "text-text-primary"
                  }`}
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.div>
          </div>
          <div className="overflow-hidden mb-5">
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-x-2 md:gap-x-3"
              style={{ perspective: "600px" }}
            >
              {secondLine.map((letter, i) => (
                <motion.span
                  key={`last-${i}`}
                  custom={i + firstLine.length}
                  variants={letterVariants}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient inline-block tracking-tight"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Role line */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2.0, ease: [0.22, 1, 0.36, 1] as const }}
          className="hidden md:flex items-center gap-4 mb-3"
        >
          <div className="h-px w-10 bg-gradient-to-r from-red-600 to-red-900" />
          <PretextTextSpread
            className="text-base md:text-lg text-text-secondary/90 font-body tracking-wide"
            segments={[{ text: roleLine }]}
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.9, ease: [0.22, 1, 0.36, 1] as const }}
          className="md:hidden text-sm leading-snug text-text-secondary/90 font-body mb-4 max-w-[20rem]"
        >
          {roleLine}
        </motion.p>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="mb-7 sm:mb-8"
        >
          <p className="md:hidden text-[15px] leading-relaxed text-text-secondary max-w-[22rem]">
            {heroSubtitle}
          </p>
          <div className="hidden md:block">
            <Typewriter text={heroSubtitle} delayStart={2600} />
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.0, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 w-full"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(200,0,0,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="group relative w-full sm:w-auto px-7 py-3.5 rounded-xl font-body text-sm font-semibold text-white overflow-hidden transition-all flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-[#ff6b00] opacity-90" />
            <span className="relative z-10 flex items-center gap-2">
              View Missions
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-red-900/40 text-text-primary font-body text-sm font-semibold hover:bg-red-900/10 backdrop-blur-sm transition-all flex items-center justify-center"
          >
            Send a Scroll
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] font-mono text-text-muted/50 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-red-900/30 flex items-start justify-center pt-1.5"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-red-700"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
