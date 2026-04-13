"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CURSOR_SIZE = 76;
const TIP_X = CURSOR_SIZE * 0.055;
const TIP_Y = CURSOR_SIZE * 0.92;
const IMAGE_DIRECTION_DEG = 136;
const HANDLE_AXIS_DEG = -44;

export function KunaiImageCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [visible, setVisible] = useState(false);
  const [speed, setSpeed] = useState(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const angle = useMotionValue(0);

  const springX = useSpring(cursorX, { damping: 20, stiffness: 280, mass: 0.42 });
  const springY = useSpring(cursorY, { damping: 20, stiffness: 280, mass: 0.42 });
  const springAngle = useSpring(angle, { damping: 24, stiffness: 260 });
  const speedMotion = useSpring(speed, { damping: 24, stiffness: 170 });

  const trailLength = useTransform(speedMotion, [0, 1], [18, 56]);
  const trailOpacity = useTransform(speedMotion, [0, 1], [0.12, 0.45]);
  const bladeScale = useTransform(speedMotion, [0, 1], [1, 1.06]);
  const glowOpacity = useTransform(speedMotion, [0, 1], [0.12, 0.32]);

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
        const direction = (Math.atan2(dy, dx) * 180) / Math.PI;
        angle.set(direction - IMAGE_DIRECTION_DEG);
        setSpeed(Math.min(distance / 26, 1));
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
      className="pointer-events-none fixed left-0 top-0 z-[1100]"
      style={{
        x: springX,
        y: springY,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.16 }}
    >
      <motion.div
        className="absolute"
        style={{
          left: -TIP_X,
          top: -TIP_Y,
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          rotate: springAngle,
          scale: bladeScale,
          transformOrigin: `${TIP_X}px ${TIP_Y}px`,
        }}
      >
        <motion.div
          className="absolute rounded-full bg-[#cc0000] blur-[10px]"
          style={{
            left: TIP_X - 10,
            top: TIP_Y - 10,
            width: 20,
            height: 20,
            opacity: glowOpacity,
          }}
        />

        <motion.div
          className="absolute h-[2px] rounded-full"
          style={{
            left: TIP_X,
            top: TIP_Y - 1,
            width: trailLength,
            opacity: trailOpacity,
            rotate: HANDLE_AXIS_DEG,
            transformOrigin: "0% 50%",
            background:
              "linear-gradient(90deg, rgba(200,0,0,0.8), rgba(120,0,0,0.24), transparent)",
          }}
        />

        <div
          className="absolute rounded-full border border-red-500/35 bg-red-500/20"
          style={{
            left: TIP_X - 3,
            top: TIP_Y - 3,
            width: 6,
            height: 6,
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/kunai-cursor.png"
          alt=""
          draggable={false}
          className="h-full w-full select-none object-contain drop-shadow-[0_0_10px_rgba(200,0,0,0.28)]"
        />
      </motion.div>
    </motion.div>
  );
}
