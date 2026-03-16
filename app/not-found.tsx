"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const LINES = [
  "> RESOLVING REQUEST PATH...",
  "> ERROR: RESOURCE NOT FOUND",
  "> SEARCHING BACKUP SECTORS.......[FAILED]",
  "> FILE SYSTEM INTEGRITY CHECK....[PASS]",
  "> SEGMENT FAULT AT ADDRESS 0x404",
];

export default function NotFound() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    LINES.forEach((_, i) => {
      setTimeout(() => setVisible(i + 1), i * 350 + 300);
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-mono flex flex-col items-center justify-center px-6">
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)",
        }}
      />

      <div className="relative z-20 w-full max-w-xl">
        {/* Big 404 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="font-display text-[8rem] md:text-[12rem] text-[#ff3366] leading-none tracking-widest glow-red text-center select-none">
            404
          </p>
          <p className="text-center text-[#ff3366]/70 text-xs tracking-[0.4em] -mt-2">
            RESOURCE_NOT_FOUND · ACCESS_DENIED
          </p>
        </motion.div>

        {/* Terminal log */}
        <div className="term-card p-6 mb-8 space-y-1">
          {LINES.slice(0, visible).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`text-xs tracking-wide leading-6 ${
                i === 1 || i === 4
                  ? "text-[#ff3366]"
                  : i === visible - 1
                  ? "text-[#00ff88]"
                  : "text-[#00ff88]/50"
              }`}
            >
              {line}
              {i === visible - 1 && visible < LINES.length && (
                <span className="blink ml-1">█</span>
              )}
            </motion.p>
          ))}
        </div>

        {/* Back button */}
        {visible >= LINES.length && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 border border-[#00ff88]/50 px-8 py-3 text-[#00ff88] text-xs tracking-[0.25em] hover:bg-[#00ff88] hover:text-black hover:border-[#00ff88] transition-all duration-200 hover:shadow-[0_0_25px_rgba(0,255,136,0.4)]"
            >
              &gt;_ RETURN_TO_BASE
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}
