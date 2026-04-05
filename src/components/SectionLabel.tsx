"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  text: string;
  accentColor?: string;
}

export function SectionLabel({
  text,
  accentColor = "var(--accent-indigo)",
}: Props) {
  const [textWidth, setTextWidth] = useState<number | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    ctx.font = "700 48px 'Space Grotesk', sans-serif";
    const measured = ctx.measureText(text).width;
    setTextWidth(Math.ceil(measured));
  }, [text]);

  return (
    <div className="inline-flex flex-col items-start gap-2 mb-12">
      <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-text-primary uppercase">
        {text}
      </h2>
      {textWidth && (
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          width={textWidth}
          height={8}
          viewBox={`0 0 ${textWidth} 8`}
          fill="none"
          className="max-w-full"
        >
          <line
            x1={0}
            y1={2}
            x2={textWidth * 0.7}
            y2={2}
            stroke={accentColor}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <line
            x1={textWidth * 0.75}
            y1={2}
            x2={textWidth}
            y2={2}
            stroke={accentColor}
            strokeWidth={2}
            strokeOpacity={0.35}
            strokeLinecap="round"
          />
          <line
            x1={0}
            y1={6}
            x2={textWidth * 0.4}
            y2={6}
            stroke={accentColor}
            strokeWidth={1}
            strokeOpacity={0.2}
            strokeLinecap="round"
          />
        </motion.svg>
      )}
    </div>
  );
}
