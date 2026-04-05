"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function KunaiCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [visible, setVisible] = useState(false);
  const [speed, setSpeed] = useState(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const angle = useMotionValue(0);

  const springX = useSpring(cursorX, { damping: 20, stiffness: 280, mass: 0.45 });
  const springY = useSpring(cursorY, { damping: 20, stiffness: 280, mass: 0.45 });
  const springAngle = useSpring(angle, { damping: 24, stiffness: 260 });
  const speedMotion = useSpring(speed, { damping: 26, stiffness: 180 });

  const trailLength = useTransform(speedMotion, [0, 1], [28, 72]);
  const trailOpacity = useTransform(speedMotion, [0, 1], [0.2, 0.62]);
  const bladeScale = useTransform(speedMotion, [0, 1], [1, 1.12]);
  const glowOpacity = useTransform(speedMotion, [0, 1], [0.16, 0.38]);

  const lastPointRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const syncDesktopState = () => {
      setIsDesktop(mediaQuery.matches);
    };

    syncDesktopState();
    mediaQuery.addEventListener("change", syncDesktopState);

    return () => {
      mediaQuery.removeEventListener("change", syncDesktopState);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      document.documentElement.classList.remove("kunai-cursor-active");
      setVisible(false);
      return;
    }

    document.documentElement.classList.add("kunai-cursor-active");
    return () => {
      document.documentElement.classList.remove("kunai-cursor-active");
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) {
      setSpeed(0);
      cursorX.set(-100);
      cursorY.set(-100);
      return;
    }

    const move = (event: MouseEvent) => {
      const dx = event.clientX - lastPointRef.current.x;
      const dy = event.clientY - lastPointRef.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 0.2) {
        const rotation = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        angle.set(rotation);
        setSpeed(Math.min(distance / 24, 1));
      }

      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setVisible(true);
      lastPointRef.current = { x: event.clientX, y: event.clientY };
    };

    const leave = () => {
      setVisible(false);
      setSpeed(0);
    };

    const enter = () => {
      setVisible(true);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [isDesktop, cursorX, cursorY, angle]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[1100]"
      style={{
        x: springX,
        y: springY,
        rotate: springAngle,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.18 }}
    >
      {/* Motion trail — dark red */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 right-[22px] h-[2px] origin-right rounded-full"
        style={{
          width: trailLength,
          opacity: trailOpacity,
          background: "linear-gradient(to left, transparent, rgba(200,0,0,0.7), rgba(140,0,0,0.3))",
        }}
      />

      <motion.div className="relative" style={{ scale: bladeScale }}>
        {/* Red glow aura */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full bg-[#cc0000] blur-[10px]"
          style={{ opacity: glowOpacity }}
        />

        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_8px_rgba(200,0,0,0.4)]"
        >
          {/* Ring pommel */}
          <circle cx="24" cy="40" r="5" stroke="#9ca3af" strokeWidth="1.8" fill="none" />
          <circle cx="24" cy="40" r="3" stroke="#6b7280" strokeWidth="0.6" fill="none" opacity="0.5" />

          {/* Handle — with bandage wrapping */}
          <rect x="22" y="20" width="4" height="16" rx="1" fill="#3f3f46" />
          {/* Wrapping lines */}
          <line x1="22" y1="23" x2="26" y2="21.5" stroke="#52525b" strokeWidth="0.8" />
          <line x1="22" y1="26" x2="26" y2="24.5" stroke="#52525b" strokeWidth="0.8" />
          <line x1="22" y1="29" x2="26" y2="27.5" stroke="#52525b" strokeWidth="0.8" />
          <line x1="22" y1="32" x2="26" y2="30.5" stroke="#52525b" strokeWidth="0.8" />

          {/* Guard / cross-piece */}
          <rect x="19" y="19" width="10" height="2.5" rx="1" fill="#71717a" />

          {/* Blade — elongated diamond with metallic gradient */}
          <defs>
            <linearGradient id="kunai-blade" x1="24" y1="3" x2="24" y2="19" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e5e7eb" />
              <stop offset="40%" stopColor="#d1d5db" />
              <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>
          </defs>
          <path d="M24 3L19 19H29L24 3Z" fill="url(#kunai-blade)" stroke="#6b7280" strokeWidth="0.8" strokeLinejoin="round" />
          {/* Center ridge line */}
          <path d="M24 4.5V18.5" stroke="#b0b8c4" strokeWidth="0.7" opacity="0.6" />
          {/* Edge highlight */}
          <path d="M24 4L20.5 17" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" strokeLinecap="round" />
          {/* Subtle red reflection on blade */}
          <path d="M24 5L27 16" stroke="rgba(200,0,0,0.12)" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}