"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LINES = [
  "> BOOTING UZ_DYNAMICS TACTICAL OS v4.2.1........",
  "> LOADING KERNEL MODULES........................[OK]",
  "> INITIALIZING SECURE ENCLAVE...................[OK]",
  "> MOUNTING ENCRYPTED VOLUMES....................[OK]",
  "> CALIBRATING AUTONOMOUS NAVIGATION.............[OK]",
  "> STARTING NETWORK DAEMON.......................[OK]",
  "> ALL SYSTEMS READY. LAUNCHING INTERFACE.",
];

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress]         = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
          setProgress(Math.round(((i + 1) / LINES.length) * 100));
        }, i * 380 + 200)
      );
    });

    timers.push(setTimeout(onComplete, LINES.length * 380 + 700));

    return () => timers.forEach(clearTimeout);
  // onComplete is stable (useCallback in Shell) — run once only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-[#0a0a0a] z-[99999] flex flex-col items-center justify-center font-mono px-6"
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)",
        }}
      />

      <div className="w-full max-w-xl relative z-10">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="font-display text-4xl text-[#00ff88] glow tracking-widest">
            UZDYNAMICS
          </span>
          <p className="text-[#00ff88]/50 text-[10px] tracking-[0.4em] mt-1">
            TACTICAL SYSTEMS TERMINAL
          </p>
        </div>

        {/* Boot lines */}
        <div className="space-y-1 mb-8 min-h-[168px]">
          {LINES.slice(0, visibleLines).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`text-xs tracking-wide leading-6 ${
                i === visibleLines - 1
                  ? "text-[#00ff88]"
                  : "text-[#00ff88]/45"
              }`}
            >
              {line}
              {i === visibleLines - 1 && visibleLines < LINES.length && (
                <span className="blink ml-1">█</span>
              )}
            </motion.p>
          ))}
        </div>

        {/* Progress bar */}
        <div className="border border-[#00ff88]/20 p-0.5">
          <motion.div
            className="h-1.5 bg-[#00ff88]"
            style={{ boxShadow: "0 0 10px #00ff88, 0 0 20px #00ff8860" }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[#00ff88]/40 text-[10px] tracking-widest">LOADING</span>
          <span className="text-[#00ff88]/70 text-[10px] tracking-widest">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
