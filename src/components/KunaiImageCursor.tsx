"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CURSOR_SIZE = 76;
const TIP_X = CURSOR_SIZE * 0.055;
const TIP_Y = CURSOR_SIZE * 0.92;
const IMAGE_DIRECTION_DEG = 136;
const HANDLE_AXIS_DEG = -44;
const POSITION_LERP = 0.26;
const VELOCITY_LERP = 0.18;
const ROTATION_LERP = 0.12;
const MIN_ROTATION_SPEED = 0.14;
const MAX_SPEED_FOR_TRAIL = 2.8;

function normalizeAngle(angle: number) {
  let normalized = angle;

  while (normalized > 180) normalized -= 360;
  while (normalized < -180) normalized += 360;

  return normalized;
}

export function KunaiImageCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const angle = useMotionValue(0);
  const speedMotion = useMotionValue(0);

  const trailLength = useTransform(speedMotion, [0, 1], [18, 56]);
  const trailOpacity = useTransform(speedMotion, [0, 1], [0.12, 0.45]);
  const bladeScale = useTransform(speedMotion, [0, 1], [1, 1.06]);
  const glowOpacity = useTransform(speedMotion, [0, 1], [0.12, 0.32]);

  const targetPointRef = useRef({ x: -100, y: -100 });
  const currentPointRef = useRef({ x: -100, y: -100 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const currentAngleRef = useRef(0);
  const visibleRef = useRef(false);
  const frameRef = useRef<number>();
  const lastTimestampRef = useRef<number>();

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
      targetPointRef.current = { x: -100, y: -100 };
      currentPointRef.current = { x: -100, y: -100 };
      velocityRef.current = { x: 0, y: 0 };
      currentAngleRef.current = 0;
      visibleRef.current = false;
      cursorX.set(-100);
      cursorY.set(-100);
      angle.set(0);
      speedMotion.set(0);
      return;
    }

    document.documentElement.classList.add("kunai-cursor-active");

    return () => {
      document.documentElement.classList.remove("kunai-cursor-active");
    };
  }, [isDesktop, angle, cursorX, cursorY, speedMotion]);

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    const move = (event: MouseEvent) => {
      if (!visibleRef.current && currentPointRef.current.x <= -99) {
        currentPointRef.current = { x: event.clientX, y: event.clientY };
        cursorX.set(event.clientX);
        cursorY.set(event.clientY);
      }

      targetPointRef.current = { x: event.clientX, y: event.clientY };
      visibleRef.current = true;
      setVisible(true);
    };

    const leave = () => {
      visibleRef.current = false;
      setVisible(false);
      speedMotion.set(0);
    };

    const enter = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    const animate = (timestamp: number) => {
      const lastTimestamp = lastTimestampRef.current ?? timestamp;
      const dt = Math.min((timestamp - lastTimestamp) / 16.67, 3);
      lastTimestampRef.current = timestamp;

      const positionAlpha = 1 - Math.pow(1 - POSITION_LERP, dt);
      const velocityAlpha = 1 - Math.pow(1 - VELOCITY_LERP, dt);
      const rotationAlpha = 1 - Math.pow(1 - ROTATION_LERP, dt);

      const previousX = currentPointRef.current.x;
      const previousY = currentPointRef.current.y;
      const nextX = previousX + (targetPointRef.current.x - previousX) * positionAlpha;
      const nextY = previousY + (targetPointRef.current.y - previousY) * positionAlpha;

      currentPointRef.current = { x: nextX, y: nextY };

      const instantaneousVelocityX = nextX - previousX;
      const instantaneousVelocityY = nextY - previousY;

      velocityRef.current = {
        x: velocityRef.current.x + (instantaneousVelocityX - velocityRef.current.x) * velocityAlpha,
        y: velocityRef.current.y + (instantaneousVelocityY - velocityRef.current.y) * velocityAlpha,
      };

      const filteredSpeed = Math.hypot(velocityRef.current.x, velocityRef.current.y);
      const normalizedSpeed = Math.min(filteredSpeed / MAX_SPEED_FOR_TRAIL, 1);

      if (filteredSpeed > MIN_ROTATION_SPEED) {
        const desiredAngle =
          (Math.atan2(velocityRef.current.y, velocityRef.current.x) * 180) / Math.PI - IMAGE_DIRECTION_DEG;
        const angleDelta = normalizeAngle(desiredAngle - currentAngleRef.current);
        currentAngleRef.current += angleDelta * rotationAlpha;
      }

      cursorX.set(nextX);
      cursorY.set(nextY);
      angle.set(currentAngleRef.current);
      speedMotion.set(normalizedSpeed);

      frameRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      lastTimestampRef.current = undefined;
    };
  }, [isDesktop, angle, cursorX, cursorY, speedMotion]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[1100]"
      style={{
        x: cursorX,
        y: cursorY,
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
          rotate: angle,
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
