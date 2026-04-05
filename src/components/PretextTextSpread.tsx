"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  prepareWithSegments,
  layoutWithLines,
  type LayoutLine,
} from "@chenglou/pretext";

export interface TextSegment {
  text: string;
  className?: string;
}

interface Props {
  segments: TextSegment[];
  className?: string;
  radius?: number;
  strength?: number;
}

export function PretextTextSpread({
  segments,
  className = "",
  radius = 80,
  strength = 25,
}: Props) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const positionsRef = useRef<{ cx: number; cy: number }[]>([]);
  const hoveringRef = useRef(false);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Build flat char list with segment styling info
  const chars: { char: string; className?: string; key: string }[] = [];
  segments.forEach((seg, si) => {
    for (let ci = 0; ci < seg.text.length; ci++) {
      chars.push({
        char: seg.text[ci],
        className: seg.className,
        key: `${si}-${ci}`,
      });
    }
  });

  // Measure character positions using pretext (no per-char DOM queries)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function measure() {
      const style = window.getComputedStyle(el!);
      const fontSize = parseFloat(style.fontSize);
      const fontWeight = style.fontWeight;
      const fontFamily = style.fontFamily;
      const font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      const lineHeight =
        style.lineHeight === "normal"
          ? fontSize * 1.6
          : parseFloat(style.lineHeight);
      const maxWidth = el!.clientWidth;

      // Concatenate all segment text
      const fullText = segments.map((s) => s.text).join("");

      // Use pretext to compute line breaks
      const prepared = prepareWithSegments(fullText, font);
      const { lines } = layoutWithLines(prepared, maxWidth, lineHeight);

      // Canvas context for per-character width measurement
      const cvs = document.createElement("canvas");
      const ctx = cvs.getContext("2d")!;
      ctx.font = font;

      const pos: { cx: number; cy: number }[] = [];

      lines.forEach((line: LayoutLine, lineIdx: number) => {
        const y = lineIdx * lineHeight + lineHeight / 2;
        let x = 0;

        for (let i = 0; i < line.text.length; i++) {
          const charW = ctx.measureText(line.text[i]).width;
          pos.push({ cx: x + charW / 2, cy: y });
          x += charW;
        }
      });

      positionsRef.current = pos;
    }

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [segments]);

  // rAF loop: compute repulsion, write transforms directly to DOM
  const tick = useCallback(() => {
    const spans = spanRefs.current;
    const pos = positionsRef.current;
    const { x: mx, y: my } = mouseRef.current;
    const r2 = radius * radius;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      if (!span || !pos[i]) continue;

      const dx = pos[i].cx - mx;
      const dy = pos[i].cy - my;
      const d2 = dx * dx + dy * dy;

      if (d2 < r2 && d2 > 1) {
        const dist = Math.sqrt(d2);
        const force = (1 - dist / radius) * strength;
        const tx = (dx / dist) * force;
        const ty = (dy / dist) * force;
        span.style.transform = `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px)`;
      } else {
        span.style.transform = "";
      }
    }

    if (hoveringRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [radius, strength]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      if (!hoveringRef.current) {
        hoveringRef.current = true;
        // Remove transition so repulsion is instant
        spanRefs.current.forEach((s) => {
          if (s) s.style.transition = "none";
        });
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [tick]
  );

  const onMouseLeave = useCallback(() => {
    hoveringRef.current = false;
    cancelAnimationFrame(rafRef.current);
    // Add transition back for smooth return, then clear transforms
    spanRefs.current.forEach((s) => {
      if (s) {
        s.style.transition = "transform 0.45s cubic-bezier(0.22,1,0.36,1)";
        s.style.transform = "";
      }
    });
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <p
      ref={containerRef}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {chars.map((c, i) => (
        <span
          key={c.key}
          ref={(el) => {
            spanRefs.current[i] = el;
          }}
          className={c.className}
          style={{ display: "inline", willChange: "transform" }}
        >
          {c.char}
        </span>
      ))}
    </p>
  );
}
