"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            // Use lerp-compatible scroll: set target to 0 via custom event
            // Shell.tsx lerp loop reads window.scrollY; we animate manually here
            const start     = window.scrollY;
            const duration  = 700;
            const startTime = performance.now();
            const ease      = (t: number) => 1 - Math.pow(1 - t, 3);
            const step      = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1);
              window.scrollTo(0, start * (1 - ease(progress)));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }}
          className="fixed bottom-8 right-6 z-50 font-mono text-[10px] border border-[#00ff88]/40 text-[#00ff88]/70 px-4 py-2 tracking-widest hover:border-[#00ff88] hover:text-[#00ff88] hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] transition-all duration-200 bg-[#0a0a0a]"
        >
          [↑ TOP]
        </motion.button>
      )}
    </AnimatePresence>
  );
}
