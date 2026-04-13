"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "kks_itachi_loader_seen_session";
const LOADER_DURATION_MS = 3600;

export function ItachiLoaderRefined() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const seenInSession = window.sessionStorage.getItem(SESSION_KEY) === "1";
    if (!seenInSession) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setIsVisible(true);
      return;
    }

    setProgress(100);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let frameId = 0;
    const start = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / LOADER_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - ratio, 1.8);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    frameId = window.requestAnimationFrame(updateProgress);

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, LOADER_DURATION_MS + 160);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(hideTimer);
    };
  }, [isVisible]);

  if (!isHydrated) {
    return null;
  }

  const status =
    progress < 34
      ? "Loading shadows"
      : progress < 72
        ? "Chakra syncing"
        : "Entering portfolio";

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[1200] overflow-hidden bg-black text-white"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-65"
            style={{ backgroundImage: "url('/itachi-bg.png')" }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: videoReady ? 1 : 0.38 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/itachi-bg.png"
              onLoadedData={() => setVideoReady(true)}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/itachi-loader.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,0,0,0.14)_0%,_rgba(0,0,0,0.45)_38%,_rgba(0,0,0,0.9)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,_rgba(0,0,0,0.94)_0%,_rgba(0,0,0,0.5)_35%,_rgba(0,0,0,0.78)_100%)]" />
          <div className="absolute inset-0 animate-vignette-pulse bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.78)_100%)]" />

          <div className="relative z-10 flex h-full items-center justify-center px-5 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm text-center"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.45em] text-red-200/70">
                Itachi Loader
              </p>
              <h2 className="mt-3 font-display text-2xl uppercase tracking-[0.22em] text-white/92">
                Entering
              </h2>
              <p className="mt-3 text-sm text-white/55">
                A short cinematic intro before the portfolio opens.
              </p>

              <div className="mt-7 overflow-hidden rounded-full border border-white/10 bg-white/5 p-1">
                <div className="relative h-1.5 overflow-hidden rounded-full bg-black/45">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#540000] via-[#d10a0a] to-[#ff6b00]"
                    style={{ width: `${progress}%` }}
                  />
                  <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] opacity-60" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.26em] text-white/42">
                <span>{status}</span>
                <span>{String(progress).padStart(3, "0")}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
