"use client";

import { motion } from "framer-motion";

function SharinganSVG({ size = 40 }: { size?: number }) {
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <defs>
        <radialGradient id="trans-iris" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#ff2222" />
          <stop offset="40%" stopColor="#cc0000" />
          <stop offset="80%" stopColor="#8b0000" />
          <stop offset="100%" stopColor="#1a0000" />
        </radialGradient>
        <filter id="trans-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Red iris */}
      <circle cx={r} cy={r} r={r * 0.9} fill="url(#trans-iris)" stroke="#1a0000" strokeWidth="1" />

      {/* Mangekyo blades — spinning */}
      <g
        filter="url(#trans-glow)"
        style={{
          transformOrigin: `${r}px ${r}px`,
          animation: "sharingan-spin 7.5s linear infinite",
        }}
      >
        <circle cx={r} cy={r} r={r * 0.5} fill="none" stroke="#140000" strokeWidth="1" opacity="0.5" />
        {[0, 120, 240].map((deg) => {
          const angle = (deg - 90) * (Math.PI / 180);
          const orbitRadius = r * 0.5;
          const tomoeRadius = r * 0.12;
          const x = r + orbitRadius * Math.cos(angle);
          const y = r + orbitRadius * Math.sin(angle);
          return (
            <g key={deg} transform={`translate(${x}, ${y}) rotate(${deg})`}>
              <circle cx="0" cy="0" r={tomoeRadius * 0.76} fill="#0a0a0a" />
              <path
                d={`M ${tomoeRadius * 0.45} ${-tomoeRadius * 0.25} Q ${tomoeRadius * 2.1} ${-tomoeRadius * 1.6} ${tomoeRadius * 0.2} ${-tomoeRadius * 3}`}
                stroke="#0a0a0a"
                strokeWidth={tomoeRadius * 0.82}
                fill="none"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </g>

      {/* Pupil */}
      <circle cx={r} cy={r} r={r * 0.15} fill="#000" />
    </svg>
  );
}

export function SectionTransition() {
  return (
    <div className="relative h-28 overflow-hidden">
      {/* Gradient fade line */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-900/25 to-transparent" />
      </div>

      {/* Mangekyo eye — zoom entrance */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Red glow behind eye */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute inset-[-100%] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(200,0,0,0.15) 0%, transparent 70%)",
            }}
          />
          <SharinganSVG size={44} />
        </motion.div>
      </div>

      {/* Subtle side glows */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="absolute top-1/2 left-[10%] right-[10%] h-[1px] -translate-y-1/2 origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(200,0,0,0.12) 30%, rgba(200,0,0,0.12) 70%, transparent)",
        }}
      />
    </div>
  );
}
