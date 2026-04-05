"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const SESSION_KEY = "kks_loader_seen_session";
const SOUND_PREF_KEY = "kks_loader_sound_enabled";
const LOADER_DURATION_MS = 4200;

const LOAD_STAGES = [
  {
    threshold: 0,
    label: "Crow Signal",
    description: "Gathering fragments from the village shadows.",
  },
  {
    threshold: 24,
    label: "Chakra Sync",
    description: "Aligning motion, light, and ambient tension.",
  },
  {
    threshold: 52,
    label: "Sharingan Awake",
    description: "The interface locks on and starts reading intent.",
  },
  {
    threshold: 78,
    label: "Mangekyo Bloom",
    description: "Final overlays and cinematic details are unfolding.",
  },
  {
    threshold: 100,
    label: "Genjutsu Complete",
    description: "The portfolio is ready to reveal itself.",
  },
] as const;

const STATUS_PILLS = [
  "Akatsuki palette online",
  "Motion field calibrated",
  "Portfolio dossier opening",
] as const;

const AMBIENT_ORBS = [
  {
    className: "left-[8%] top-[16%] h-40 w-40",
    color: "rgba(230,57,70,0.16)",
    duration: 8.5,
    delay: 0,
  },
  {
    className: "right-[12%] top-[22%] h-24 w-24",
    color: "rgba(255,107,0,0.18)",
    duration: 6.8,
    delay: 0.8,
  },
  {
    className: "left-[14%] bottom-[18%] h-28 w-28",
    color: "rgba(255,209,102,0.12)",
    duration: 7.6,
    delay: 0.4,
  },
  {
    className: "right-[6%] bottom-[14%] h-52 w-52",
    color: "rgba(200,0,0,0.14)",
    duration: 9.2,
    delay: 1.1,
  },
] as const;

const FLOATING_SIGILS = [
  { left: "10%", top: "28%", delay: 0.2, rotate: -8, duration: 12 },
  { left: "82%", top: "18%", delay: 1.1, rotate: 7, duration: 11 },
  { left: "16%", top: "70%", delay: 0.7, rotate: 14, duration: 13 },
  { left: "77%", top: "74%", delay: 1.6, rotate: -12, duration: 10.5 },
] as const;

function playTsukuyomiInspiredSound() {
  const AudioCtor =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioCtor) return;

  const context = new AudioCtor();
  if (context.state === "suspended") {
    void context.resume();
  }
  const now = context.currentTime;

  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.24, now + 0.08);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 1.65);
  master.connect(context.destination);

  const droneOsc = context.createOscillator();
  droneOsc.type = "sawtooth";
  droneOsc.frequency.setValueAtTime(138, now);
  droneOsc.frequency.exponentialRampToValueAtTime(72, now + 1.45);

  const droneGain = context.createGain();
  droneGain.gain.setValueAtTime(0.0001, now);
  droneGain.gain.exponentialRampToValueAtTime(0.17, now + 0.08);
  droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

  droneOsc.connect(droneGain);
  droneGain.connect(master);
  droneOsc.start(now);
  droneOsc.stop(now + 1.52);

  const shimmerOsc = context.createOscillator();
  shimmerOsc.type = "triangle";
  shimmerOsc.frequency.setValueAtTime(640, now + 0.02);
  shimmerOsc.frequency.exponentialRampToValueAtTime(205, now + 1.18);

  const shimmerFilter = context.createBiquadFilter();
  shimmerFilter.type = "bandpass";
  shimmerFilter.frequency.setValueAtTime(880, now);
  shimmerFilter.Q.setValueAtTime(2.8, now);

  const shimmerGain = context.createGain();
  shimmerGain.gain.setValueAtTime(0.0001, now);
  shimmerGain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
  shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

  shimmerOsc.connect(shimmerFilter);
  shimmerFilter.connect(shimmerGain);
  shimmerGain.connect(master);
  shimmerOsc.start(now + 0.02);
  shimmerOsc.stop(now + 1.15);

  const noiseBuffer = context.createBuffer(
    1,
    Math.floor(context.sampleRate * 0.8),
    context.sampleRate,
  );
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseData.length; i++) {
    const decay = 1 - i / noiseData.length;
    noiseData[i] = (Math.random() * 2 - 1) * decay;
  }

  const noiseSource = context.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  const noiseFilter = context.createBiquadFilter();
  noiseFilter.type = "highpass";
  noiseFilter.frequency.setValueAtTime(220, now);

  const noiseGain = context.createGain();
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.05, now + 0.03);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(master);
  noiseSource.start(now + 0.01);
  noiseSource.stop(now + 0.62);

  window.setTimeout(() => {
    void context.close();
  }, 1800);
}

function getStage(progress: number) {
  let currentStage: (typeof LOAD_STAGES)[number] = LOAD_STAGES[0];

  for (const stage of LOAD_STAGES) {
    if (progress >= stage.threshold) {
      currentStage = stage;
    }
  }

  return currentStage;
}

function LoaderEye({ isMangekyo, progress }: { isMangekyo: boolean; progress: number }) {
  const eyeSize = 152;
  const r = eyeSize / 2;

  return (
    <div className="relative" style={{ width: eyeSize, height: eyeSize }}>
      <motion.div
        animate={{
          scale: [0.95, 1.04, 0.98],
          opacity: [0.45, 0.8, 0.55],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[-28%] rounded-full"
        style={{
          background: isMangekyo
            ? "radial-gradient(circle, rgba(230,57,70,0.38) 0%, rgba(200,0,0,0.18) 38%, transparent 72%)"
            : "radial-gradient(circle, rgba(255,107,0,0.26) 0%, rgba(200,0,0,0.14) 40%, transparent 72%)",
        }}
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: isMangekyo ? 7 : 13,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-[-18%] rounded-full border border-red-500/15"
        style={{
          background:
            "radial-gradient(circle, transparent 58%, rgba(255,255,255,0.04) 59%, transparent 61%)",
        }}
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: isMangekyo ? 5 : 9,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-[-10%] rounded-full border border-[#ff6b00]/15"
        style={{
          clipPath:
            "polygon(0% 50%, 12% 43%, 50% 0%, 88% 43%, 100% 50%, 88% 57%, 50% 100%, 12% 57%)",
        }}
      />

      <svg
        width={eyeSize}
        height={eyeSize}
        viewBox={`0 0 ${eyeSize} ${eyeSize}`}
        className="relative z-10 drop-shadow-[0_0_20px_rgba(200,0,0,0.45)]"
      >
        <defs>
          <radialGradient id="loader-iris" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="40%" stopColor="#d10a0a" />
            <stop offset="76%" stopColor="#7f0000" />
            <stop offset="100%" stopColor="#140000" />
          </radialGradient>
          <filter id="loader-eye-glow">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={r} cy={r} r={r * 0.94} fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.04)" />
        <circle cx={r} cy={r} r={r * 0.86} fill="url(#loader-iris)" stroke="#120000" strokeWidth="2.2" />
        <circle cx={r} cy={r} r={r * 0.6} fill="none" stroke="rgba(20,0,0,0.65)" strokeWidth="1.2" />

        <g
          filter="url(#loader-eye-glow)"
          style={{
            transformOrigin: `${r}px ${r}px`,
            animation: `sharingan-spin ${isMangekyo ? "3.2s" : "6.8s"} linear infinite`,
          }}
        >
          {!isMangekyo ? (
            <>
              {[0, 120, 240].map((deg) => {
                const angle = (deg - 90) * (Math.PI / 180);
                const tomoeRadius = r * 0.15;
                const orbitRadius = r * 0.48;
                const x = r + orbitRadius * Math.cos(angle);
                const y = r + orbitRadius * Math.sin(angle);

                return (
                  <g key={deg} transform={`translate(${x}, ${y}) rotate(${deg})`}>
                    <circle cx="0" cy="0" r={tomoeRadius * 0.74} fill="#090909" />
                    <path
                      d={`M ${tomoeRadius * 0.4} ${-tomoeRadius * 0.2} Q ${tomoeRadius * 2} ${-tomoeRadius * 1.55} ${tomoeRadius * 0.2} ${-tomoeRadius * 2.9}`}
                      stroke="#090909"
                      strokeWidth={tomoeRadius * 0.86}
                      fill="none"
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </>
          ) : (
            <>
              {[0, 120, 240].map((deg) => {
                const bladeRadius = r * 0.56;
                const angle = (deg - 90) * (Math.PI / 180);
                const sx = r + bladeRadius * 0.24 * Math.cos(angle);
                const sy = r + bladeRadius * 0.24 * Math.sin(angle);
                const ex = r + bladeRadius * Math.cos(angle);
                const ey = r + bladeRadius * Math.sin(angle);
                const cpAngle = ((deg - 48) * Math.PI) / 180;
                const cpx = r + bladeRadius * 0.94 * Math.cos(cpAngle);
                const cpy = r + bladeRadius * 0.94 * Math.sin(cpAngle);

                return (
                  <g key={deg}>
                    <path
                      d={`M ${sx} ${sy} Q ${cpx} ${cpy} ${ex} ${ey}`}
                      stroke="#090909"
                      strokeWidth={r * 0.18}
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx={ex} cy={ey} r={r * 0.09} fill="#090909" />
                  </g>
                );
              })}
            </>
          )}
        </g>

        <circle cx={r} cy={r} r={r * 0.15} fill="#020202" />
        <circle cx={r} cy={r} r={r * 0.08} fill="rgba(255,255,255,0.7)" opacity={0.12 + progress / 150} />
      </svg>
    </div>
  );
}

export function LoadingOverlay() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [soundActivated, setSoundActivated] = useState(false);
  const playedSoundRef = useRef(false);

  useEffect(() => {
    setIsHydrated(true);

    const storedPreference = window.localStorage.getItem(SOUND_PREF_KEY);
    if (storedPreference === "off") {
      setSoundEnabled(false);
    }

    const seenInSession = window.sessionStorage.getItem(SESSION_KEY) === "1";
    if (!seenInSession) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setIsVisible(true);
    } else {
      setProgress(100);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setProgress(100);
      return;
    }

    let frameId = 0;
    const start = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / LOADER_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - ratio, 2.15);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    frameId = window.requestAnimationFrame(updateProgress);

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, LOADER_DURATION_MS + 240);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(hideTimer);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  const playSound = useCallback(() => {
    if (!soundEnabled || playedSoundRef.current) {
      return;
    }

    playedSoundRef.current = true;
    setSoundActivated(true);
    playTsukuyomiInspiredSound();
  }, [soundEnabled]);

  useEffect(() => {
    if (!isVisible || !soundEnabled || playedSoundRef.current) {
      return;
    }

    const onInteract = () => {
      playSound();
    };

    window.addEventListener("pointerdown", onInteract, true);
    window.addEventListener("keydown", onInteract, true);

    return () => {
      window.removeEventListener("pointerdown", onInteract, true);
      window.removeEventListener("keydown", onInteract, true);
    };
  }, [isVisible, soundEnabled, playSound]);

  const toggleSound = () => {
    setSoundEnabled((current) => {
      const next = !current;
      window.localStorage.setItem(SOUND_PREF_KEY, next ? "on" : "off");

      if (!next) {
        setSoundActivated(false);
      }

      return next;
    });
  };

  if (!isHydrated) {
    return null;
  }

  const isMangekyo = progress >= 58;
  const currentStage = getStage(progress);
  const progressLabel = `${String(progress).padStart(3, "0")}%`;
  const signalText = !soundEnabled
    ? "Ambient audio muted"
    : soundActivated
      ? "Audio signal accepted"
      : "Tap or press any key to awaken sound";

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[1200] overflow-hidden bg-black text-white"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: "url('/itachi-bg.png')" }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: videoReady ? 1 : 0.35 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
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

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,0,0,0.15)_0%,_rgba(0,0,0,0.38)_34%,_rgba(0,0,0,0.84)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(0,0,0,0.9)_8%,_rgba(0,0,0,0.55)_40%,_rgba(0,0,0,0.86)_82%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,_rgba(0,0,0,0.96)_6%,_rgba(0,0,0,0.52)_34%,_rgba(0,0,0,0.22)_62%,_rgba(0,0,0,0.8)_100%)]" />
          <div className="absolute inset-0 animate-vignette-pulse bg-[radial-gradient(ellipse_at_center,_transparent_28%,_rgba(0,0,0,0.76)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-[-14%] h-[34%] animate-dark-mist bg-[radial-gradient(circle,_rgba(255,107,0,0.14)_0%,_rgba(0,0,0,0)_72%)] blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 bottom-[-10%] h-[32%] animate-dark-mist bg-[radial-gradient(circle,_rgba(230,57,70,0.16)_0%,_rgba(0,0,0,0)_72%)] blur-3xl" />
          <div className="pointer-events-none absolute left-0 right-0 top-0 mx-auto h-full w-[1px] bg-gradient-to-b from-transparent via-red-500/20 to-transparent" />
          <div className="pointer-events-none absolute inset-x-[18%] top-0 h-full animate-tsukuyomi-scan bg-gradient-to-b from-transparent via-white/12 to-transparent blur-2xl" />

          {AMBIENT_ORBS.map((orb) => (
            <motion.div
              key={orb.className}
              animate={{
                scale: [1, 1.12, 0.94, 1],
                opacity: [0.18, 0.34, 0.16, 0.24],
              }}
              transition={{
                duration: orb.duration,
                repeat: Infinity,
                delay: orb.delay,
                ease: "easeInOut",
              }}
              className={`pointer-events-none absolute rounded-full blur-3xl ${orb.className}`}
              style={{ background: orb.color }}
            />
          ))}

          {FLOATING_SIGILS.map((sigil, index) => (
            <motion.div
              key={`${sigil.left}-${sigil.top}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{
                opacity: [0.1, 0.32, 0.16],
                y: [0, -18, 0],
                x: [0, index % 2 === 0 ? 8 : -8, 0],
                rotate: [sigil.rotate, sigil.rotate + 6, sigil.rotate],
              }}
              transition={{
                duration: sigil.duration,
                repeat: Infinity,
                delay: sigil.delay,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute text-[10px] font-mono uppercase tracking-[0.45em] text-white/20"
              style={{ left: sigil.left, top: sigil.top }}
            >
              {index % 2 === 0 ? "Signal" : "Vision"}
            </motion.div>
          ))}

          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col px-5 py-5 sm:px-8 sm:py-7">
            <div className="flex items-start justify-between gap-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.15 }}
                className="max-w-[16rem] rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl"
              >
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.45em] text-[#ffd166]/75">
                  Itachi Loader
                </p>
                <p className="mt-2 font-display text-lg tracking-[0.18em] text-white/92">
                  KKS Portfolio
                </p>
                <p className="mt-1 text-xs text-white/48">
                  Cinematic prelude with Akatsuki-red contrast, mist, and dossier-style telemetry.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.22 }}
                className="flex items-center gap-2"
              >
                <span className="hidden rounded-full border border-red-500/20 bg-black/35 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.36em] text-white/45 sm:inline-flex">
                  {videoReady ? "Visual feed stable" : "Visual feed syncing"}
                </span>
                <button
                  type="button"
                  onClick={toggleSound}
                  className="rounded-full border border-white/10 bg-black/45 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.34em] text-white/70 transition-colors hover:text-white"
                >
                  {soundEnabled ? "Sound On" : "Sound Off"}
                </button>
              </motion.div>
            </div>

            <div className="flex flex-1 items-center justify-center py-6 sm:py-8">
              <div className="grid w-full items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
                <motion.aside
                  initial={{ opacity: 0, x: -26 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.24 }}
                  className="hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,11,8,0.76),rgba(4,4,4,0.82))] p-5 backdrop-blur-xl lg:block"
                >
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.45em] text-white/36">
                    Sequence
                  </p>
                  <div className="mt-4 space-y-4">
                    {LOAD_STAGES.slice(0, -1).map((stage) => {
                      const active = progress >= stage.threshold;
                      return (
                        <div key={stage.label} className="flex gap-3">
                          <div className="mt-1 flex flex-col items-center">
                            <div
                              className={`h-2.5 w-2.5 rounded-full ${
                                active ? "bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.85)]" : "bg-white/15"
                              }`}
                            />
                            <div className="mt-2 h-10 w-px bg-gradient-to-b from-white/20 to-transparent" />
                          </div>
                          <div>
                            <p
                              className={`font-display text-sm tracking-[0.14em] ${
                                active ? "text-white/90" : "text-white/35"
                              }`}
                            >
                              {stage.label}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-white/45">{stage.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.aside>

                <motion.section
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mx-auto w-full max-w-[28rem]"
                >
                  <div className="absolute inset-x-8 top-12 h-24 rounded-full bg-red-600/10 blur-[70px]" />
                  <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,10,0.72),rgba(10,6,6,0.88))] px-5 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-7 sm:py-7">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                    <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:34px_34px]" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {STATUS_PILLS.map((pill, index) => (
                          <motion.span
                            key={pill}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.2 + index * 0.08 }}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.28em] text-white/52"
                          >
                            {pill}
                          </motion.span>
                        ))}
                      </div>

                      <div className="mt-6">
                        <LoaderEye isMangekyo={isMangekyo} progress={progress} />
                      </div>

                      <motion.p
                        animate={{
                          letterSpacing: ["0.22em", "0.34em", "0.22em"],
                          opacity: [0.72, 1, 0.76],
                        }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                        className="mt-6 font-mono text-[0.64rem] uppercase text-[#ffd166]/72"
                      >
                        {currentStage.label}
                      </motion.p>

                      <p className="mt-3 font-display text-[1.9rem] uppercase tracking-[0.28em] text-white sm:text-[2.2rem]">
                        {progressLabel}
                      </p>
                      <p className="mt-3 max-w-[23rem] text-sm leading-6 text-white/58">
                        {currentStage.description}
                      </p>

                      <div className="mt-6 w-full">
                        <div className="overflow-hidden rounded-full border border-white/10 bg-white/6 p-1">
                          <div className="relative h-2 overflow-hidden rounded-full bg-black/40">
                            <motion.div
                              className="absolute inset-y-0 left-0 rounded-full"
                              style={{
                                width: `${progress}%`,
                                background: isMangekyo
                                  ? "linear-gradient(90deg, #5a0000 0%, #d10a0a 45%, #ff6b00 100%)"
                                  : "linear-gradient(90deg, #2b0505 0%, #9f1111 40%, #d97706 100%)",
                              }}
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] opacity-60 animate-shimmer" />
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-4 gap-2">
                          {[25, 50, 75, 100].map((checkpoint) => (
                            <div
                              key={checkpoint}
                              className={`h-1.5 rounded-full ${
                                progress >= checkpoint
                                  ? "bg-gradient-to-r from-red-700 via-red-500 to-amber-400"
                                  : "bg-white/10"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.34em] text-white/45">
                        {signalText}
                      </p>
                    </div>
                  </div>
                </motion.section>

                <motion.aside
                  initial={{ opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.28 }}
                  className="hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,11,8,0.76),rgba(4,4,4,0.82))] p-5 backdrop-blur-xl lg:block"
                >
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.45em] text-white/36">
                    Dossier
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                      <p className="font-mono text-[0.58rem] uppercase tracking-[0.32em] text-white/38">
                        Feed status
                      </p>
                      <p className="mt-2 font-display text-sm tracking-[0.12em] text-white/90">
                        {videoReady ? "Itachi visual stream stabilized" : "Video layer buffering through mist"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                      <p className="font-mono text-[0.58rem] uppercase tracking-[0.32em] text-white/38">
                        Current mode
                      </p>
                      <p className="mt-2 font-display text-sm tracking-[0.12em] text-white/90">
                        {isMangekyo ? "Mangekyo transition engaged" : "Base Sharingan rotation active"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                      <p className="font-mono text-[0.58rem] uppercase tracking-[0.32em] text-white/38">
                        Narrative note
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/55">
                        The loader now behaves like an intro sequence instead of a plain spinner, keeping the same dark anime mood as the hero section.
                      </p>
                    </div>
                  </div>
                </motion.aside>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="flex flex-wrap items-center justify-center gap-2 border-t border-white/8 pt-4"
            >
              {["Uchiha mood", "Cinder glow", "Mist veil", "Scarlet telemetry", "Hero-ready reveal"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.3em] text-white/42"
                  >
                    {tag}
                  </span>
                ),
              )}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
