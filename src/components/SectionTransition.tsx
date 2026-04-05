"use client";

import { motion } from "framer-motion";

export function SectionTransition() {
  return (
    <div className="relative h-24 overflow-hidden">
      {/* Gradient fade */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ff6b00]/20 to-transparent" />
      </div>

      {/* Center Konoha leaf emblem */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#ff6b00]/30"
          >
            <path
              d="M12 2C12 2 4 8 4 14c0 3 2 6 5 7.5C10 20 11 18 12 16c1 2 2 4 3 5.5 3-1.5 5-4.5 5-7.5C20 8 12 2 12 2z"
              fill="currentColor"
            />
            <path
              d="M12 2v14"
              stroke="currentColor"
              strokeWidth={0.5}
            />
            {/* Spiral in center */}
            <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth={0.5} fill="none" />
            <path d="M12 8c1.1 0 2 .9 2 2s-.9 2-2 2" stroke="currentColor" strokeWidth={0.3} fill="none" />
          </svg>
        </motion.div>
      </div>

      {/* Scattered small leaves */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 17}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.15, y: 0, rotate: i * 72 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#ff6b00">
            <path d="M12 2C12 2 4 8 4 14c0 3 2 6 5 7.5C10 20 11 18 12 16c1 2 2 4 3 5.5 3-1.5 5-4.5 5-7.5C20 8 12 2 12 2z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
