"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlitchText from "./GlitchText";
import MatrixRain from "./MatrixRain";

const BOOT_LINES = [
  { text: "INITIALIZING UZ_DYNAMICS TACTICAL SYSTEM v4.2.1......", ms: 300 },
  { text: "LOADING ENCRYPTED MODULES..........................[OK]", ms: 950 },
  { text: "VERIFYING HARDWARE SIGNATURES......................[OK]", ms: 1600 },
  { text: "ESTABLISHING SECURE CHANNEL........................[OK]", ms: 2250 },
  { text: "AUTHENTICATING CLEARANCE LEVEL: ALPHA......[GRANTED]",   ms: 2900 },
  { text: "ALL SYSTEMS OPERATIONAL. WELCOME, COMMANDER.",           ms: 3450 },
];

export default function Hero() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showMain,     setShowMain]     = useState(false);

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.ms)
    );
    const mainTimer = setTimeout(() => setShowMain(true), 4050);
    return () => [...timers, mainTimer].forEach(clearTimeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a0a0a] px-6 font-mono"
    >
      <MatrixRain />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* Radial center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,255,136,0.05)_0%,transparent_100%)] pointer-events-none" />

      {/* Horizontal rule lines — top and bottom thirds */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-[#00ff88]/5 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 right-0 h-px bg-[#00ff88]/5 pointer-events-none" />
      {/* Vertical center line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#00ff88]/4 pointer-events-none" />

      {/* Corner ASCII info panels */}
      <div className="absolute top-24 left-6 text-[#00ff88]/18 text-[11px] leading-5 hidden xl:block select-none">
        {["┌─────────────────┐","│ SYS: ARMED      │","│ NET: ENCRYPTED  │","│ ALT: 4200m      │","│ SPD: 340 km/h   │","└─────────────────┘"].map((l,i)=><div key={i}>{l}</div>)}
      </div>
      <div className="absolute top-24 right-6 text-[#00ff88]/18 text-[11px] leading-5 text-right hidden xl:block select-none">
        {["┌─────────────────┐","│ FREQ: 2.4GHz    │","│ LAT: 41.2995°N  │","│ LON: 69.2401°E  │","│ TGT: LOCKED     │","└─────────────────┘"].map((l,i)=><div key={i}>{l}</div>)}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto pt-24">
        {/* Boot log */}
        <div className="mb-12 space-y-1 min-h-[144px]">
          {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`text-xs tracking-wider leading-6 transition-all duration-700 ${
                showMain
                  ? "text-[#00ff88]/15"
                  : i === visibleCount - 1
                  ? "text-[#00ff88]"
                  : "text-[#00ff88]/45"
              }`}
            >
              <span className="text-[#00ff88]/25 mr-2">&gt;</span>
              {line.text}
              {i === visibleCount - 1 && !showMain && (
                <span className="blink ml-1 text-[#00ff88]">█</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Main content */}
        <AnimatePresence>
          {showMain && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              {/* HUD corner brackets around the content block */}
              <div className="absolute -top-4 -left-4 w-6 h-6 border-t border-l border-[#00ff88]/40 pointer-events-none" />
              <div className="absolute -top-4 -right-4 w-6 h-6 border-t border-r border-[#00ff88]/40 pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 border-b border-l border-[#00ff88]/40 pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b border-r border-[#00ff88]/40 pointer-events-none" />

              <div className="text-[#00ff88]/40 text-[10px] tracking-[0.5em] uppercase mb-4 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-[#00ff88]/30" />
                CLASSIFIED · AUTONOMOUS SYSTEMS DIVISION
                <span className="inline-block w-8 h-px bg-[#00ff88]/30" />
              </div>

              <h1
                className="font-display text-[5.5rem] md:text-[9rem] leading-none tracking-widest text-[#00ff88] glow mb-4 glitch-wrap"
                data-text="UZDYNAMICS"
              >
                <GlitchText text="UZDYNAMICS" delay={150} speed={28} />
              </h1>

              {/* Subtitle with stronger rule */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 max-w-[3rem] bg-[#00ff88]/30" />
                <p className="text-[#00ff88]/55 text-xs tracking-[0.3em]">
                  AUTONOMOUS WARFARE &amp; ROBOTICS SYSTEMS
                </p>
                <span className="text-[#00ff88] blink">_</span>
              </div>

              <p className="text-[#00ff88]/55 text-sm leading-7 max-w-xl mb-10 border-l-2 border-[#00ff88]/30 pl-5">
                Engineering next-generation autonomous drones, ground vehicles,
                and military-grade robotic systems. Precision-built for the most
                demanding operational environments.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#projects"
                  className="group border border-[#00ff88]/60 px-7 py-3 text-[#00ff88] text-xs tracking-[0.25em] hover:bg-[#00ff88] hover:text-black hover:border-[#00ff88] transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] flex items-center gap-3"
                >
                  <span className="text-[#00ff88]/50 group-hover:text-black/50">&gt;_</span>
                  ACCESS_FILES
                </a>
                <a
                  href="#contact"
                  className="border border-[#00ff88]/25 px-7 py-3 text-[#00ff88]/60 text-xs tracking-[0.25em] hover:border-[#00ff88]/55 hover:text-[#00ff88] transition-all duration-200 flex items-center gap-3"
                >
                  <span className="text-[#00ff88]/30">&gt;_</span>
                  SEND_TRANSMISSION
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom HUD bar */}
      {showMain && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-0 left-0 right-0 border-t border-[#00ff88]/10 px-6 py-3 flex items-center justify-between"
        >
          <span className="text-[#00ff88]/20 text-[10px] tracking-[0.4em]">UZD:// v4.2.1</span>
          <span className="text-[#00ff88]/20 text-[10px] tracking-[0.4em]">SCROLL TO NAVIGATE</span>
          <span className="text-[#00ff88]/20 text-[10px] tracking-[0.4em] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]/50 blink" />
            SYS:ONLINE
          </span>
        </motion.div>
      )}
    </section>
  );
}
