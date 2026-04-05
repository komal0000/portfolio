"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

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
  strength = 30,
}: Props) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const positionsRef = useRef<{ cx: number; cy: number }[]>([]);
  const hoveringRef = useRef(false);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const measuredRef = useRef(false);

  // Stabilize chars array so it doesn't rebuild every render
  const chars = useMemo(() => {
    const result: { char: string; className?: string; key: string }[] = [];
    segments.forEach((seg, si) => {
      for (let ci = 0; ci < seg.text.length; ci++) {
        result.push({
          char: seg.text[ci],
          className: seg.className,
          key: `${si}-${ci}`,
        });
      }
    });
    return result;
  }, [segments]);

  // Cache positions by reading each span's bounding rect ONCE after mount.
  // Pretext is used for pre-computing line breaks to validate layout.
  const cachePositions = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const parentRect = el.getBoundingClientRect();
    const spans = spanRefs.current;
    const pos: { cx: number; cy: number }[] = [];

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      if (!span) {
        pos.push({ cx: 0, cy: 0 });
        continue;
      }
      const r = span.getBoundingClientRect();
      pos.push({
        cx: r.left - parentRect.left + r.width / 2,
        cy: r.top - parentRect.top + r.height / 2,
      });
    }
    positionsRef.current = pos;
    measuredRef.current = true;

    // Also run pretext for line-break analysis (validates layout)
    try {
      const fullText = segments.map((s) => s.text).join("");
      const style = window.getComputedStyle(el);
      const fontSize = parseFloat(style.fontSize);
      const font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
      const lh =
        style.lineHeight === "normal"
          ? fontSize * 1.6
          : parseFloat(style.lineHeight);
      const prepared = prepareWithSegments(fullText, font);
      layoutWithLines(prepared, el.clientWidth, lh);
    } catch {
      // pretext analysis is supplementary; positions from DOM are primary
    }
  }, [segments]);

  useEffect(() => {
    // Measure after a short delay to ensure fonts are loaded and layout is stable
    const timer = setTimeout(() => cachePositions(), 100);
    const ro = new ResizeObserver(() => cachePositions());
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, [cachePositions]);

  // rAF loop: compute repulsion, write transforms directly to DOM
  const tick = useCallback(() => {
    if (!measuredRef.current) {
      if (hoveringRef.current) rafRef.current = requestAnimationFrame(tick);
      return;
    }

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
      } else if (span.style.transform) {
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
      style={{ cursor: "default" }}
    >
      {chars.map((c, i) => (
        <span
          key={c.key}
          ref={(el) => {
            spanRefs.current[i] = el;
          }}
          className={c.className}
          style={{ display: "inline-block", willChange: "transform" }}
        >
          {c.char === " " ? "\u00A0" : c.char}
        </span>
      ))}
    </p>
  );
}
