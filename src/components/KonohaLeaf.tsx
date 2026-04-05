"use client";

import { motion } from "framer-motion";

interface Props {
  className?: string;
  size?: number;
  color?: string;
  delay?: number;
}

export function KonohaLeaf({
  className = "",
  size = 24,
  color = "#ff6b00",
  delay = 0,
}: Props) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`pointer-events-none ${className}`}
      initial={{ opacity: 0, y: -20, rotate: 0 }}
      animate={{
        opacity: [0, 0.6, 0.4, 0],
        y: [0, 200, 500],
        x: [0, 30, -10, 40],
        rotate: [0, 180, 360, 540],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Konoha leaf / swirl shape */}
      <path
        d="M12 2C12 2 4 8 4 14c0 3 2 6 5 7.5C10 20 11 18 12 16c1 2 2 4 3 5.5 3-1.5 5-4.5 5-7.5C20 8 12 2 12 2z"
        fill={color}
        fillOpacity={0.7}
      />
      <path
        d="M12 2v14"
        stroke={color}
        strokeWidth={0.5}
        strokeOpacity={0.5}
      />
    </motion.svg>
  );
}
