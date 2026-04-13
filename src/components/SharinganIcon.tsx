"use client";

import { motion } from "framer-motion";
import { useId } from "react";

type SharinganIconProps = {
  size?: number;
  spinDuration?: number;
  glowClassName?: string;
};

export function SharinganIcon({
  size = 48,
  spinDuration = 7,
  glowClassName = "absolute inset-[-25%] rounded-full",
}: SharinganIconProps) {
  const r = size / 2;
  const gradientId = useId().replace(/:/g, "");
  const filterId = useId().replace(/:/g, "");
  const orbitRadius = r * 0.52;
  const headRadius = r * 0.135;

  const tomoeTail = `
    M ${headRadius * 0.15} ${-headRadius * 0.6}
    C ${headRadius * 1.2} ${-headRadius * 1.25},
      ${headRadius * 1.4} ${-headRadius * 2.35},
      ${headRadius * 0.45} ${-headRadius * 3.2}
    C ${headRadius * 1.7} ${-headRadius * 2.1},
      ${headRadius * 1.7} ${-headRadius * 0.3},
      ${headRadius * 0.55} ${headRadius * 0.18}
    Z
  `;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        animate={{
          scale: [0.95, 1.04, 0.98],
          opacity: [0.34, 0.72, 0.42],
        }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className={glowClassName}
        style={{
          background:
            "radial-gradient(circle, rgba(210,15,15,0.4) 0%, rgba(150,0,0,0.18) 42%, transparent 74%)",
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative z-10 drop-shadow-[0_0_18px_rgba(200,0,0,0.45)]"
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#ff3d3d" />
            <stop offset="42%" stopColor="#d00000" />
            <stop offset="82%" stopColor="#7b0000" />
            <stop offset="100%" stopColor="#180000" />
          </radialGradient>
          <filter id={filterId}>
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={r} cy={r} r={r * 0.92} fill="rgba(0,0,0,0.35)" stroke="#090909" strokeWidth={r * 0.06} />
        <circle cx={r} cy={r} r={r * 0.84} fill={`url(#${gradientId})`} stroke="#140000" strokeWidth={r * 0.028} />
        <circle
          cx={r}
          cy={r}
          r={r * 0.52}
          fill="none"
          stroke="#0b0505"
          strokeWidth={r * 0.03}
          opacity="0.92"
        />

        <g
          filter={`url(#${filterId})`}
          style={{
            transformOrigin: `${r}px ${r}px`,
            animation: `sharingan-spin ${spinDuration}s linear infinite`,
          }}
        >
          {[0, 120, 240].map((deg) => {
            const angle = (deg - 90) * (Math.PI / 180);
            const x = r + orbitRadius * Math.cos(angle);
            const y = r + orbitRadius * Math.sin(angle);

            return (
              <g key={deg} transform={`translate(${x}, ${y}) rotate(${deg})`}>
                <circle cx="0" cy="0" r={headRadius} fill="#0a0a0a" />
                <path d={tomoeTail} fill="#0a0a0a" />
              </g>
            );
          })}
        </g>

        <circle cx={r} cy={r} r={r * 0.145} fill="#000" />
      </svg>
    </div>
  );
}
