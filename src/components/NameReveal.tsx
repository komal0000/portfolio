"use client";

import { useEffect, useRef } from "react";

interface WordAnimState {
  text: string;
  x: number;
  y: number;
  alpha: number;
  offsetY: number;
  delay: number;
}

export function NameReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const width = container.offsetWidth;
    const height = 220;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const NAME = "KOMAL KRISHAN SHRESTHA";
    const FONT_SIZE = Math.min(72, width * 0.09);
    const FONT = `700 ${FONT_SIZE}px 'Space Grotesk', sans-serif`;
    const LINE_HEIGHT = FONT_SIZE * 1.2;
    const MAX_WIDTH = width - 40;

    ctx.font = FONT;

    const allWords = NAME.split(" ");
    const lines: string[][] = [];
    let currentLine: string[] = [];
    let currentWidth = 0;
    const spaceWidth = ctx.measureText(" ").width;

    for (const word of allWords) {
      const wordWidth = ctx.measureText(word).width;
      if (currentLine.length > 0 && currentWidth + spaceWidth + wordWidth > MAX_WIDTH) {
        lines.push(currentLine);
        currentLine = [word];
        currentWidth = wordWidth;
      } else {
        if (currentLine.length > 0) currentWidth += spaceWidth;
        currentLine.push(word);
        currentWidth += wordWidth;
      }
    }
    if (currentLine.length > 0) lines.push(currentLine);

    const words: WordAnimState[] = [];
    let globalWordIndex = 0;

    lines.forEach((lineWords, lineIndex) => {
      const lineY = 40 + lineIndex * LINE_HEIGHT;
      let cursorX = 20;

      lineWords.forEach((word) => {
        const wordWidth = ctx.measureText(word).width;
        words.push({
          text: word,
          x: cursorX,
          y: lineY,
          alpha: 0,
          offsetY: 24,
          delay: 200 + globalWordIndex * 120,
        });
        cursorX += wordWidth + spaceWidth;
        globalWordIndex++;
      });
    });

    const startTime = performance.now();
    let animId: number;

    function draw(now: number) {
      ctx.clearRect(0, 0, width, height);
      ctx.font = FONT;
      ctx.textBaseline = "top";

      let allDone = true;

      words.forEach((w) => {
        const elapsed = now - startTime - w.delay;
        if (elapsed < 0) {
          allDone = false;
          return;
        }

        const progress = Math.min(elapsed / 500, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        w.alpha = eased;
        w.offsetY = 24 * (1 - eased);

        if (progress < 1) allDone = false;

        ctx.globalAlpha = w.alpha;
        ctx.fillStyle = "#f8fafc";
        ctx.fillText(w.text, w.x, w.y + w.offsetY);
      });

      ctx.globalAlpha = 1;

      if (!allDone) {
        animId = requestAnimationFrame(draw);
      }
    }

    animId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}
