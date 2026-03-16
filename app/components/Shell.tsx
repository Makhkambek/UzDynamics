"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PageLoader from "./PageLoader";
import CustomCursor from "./CustomCursor";
import BackToTop from "./BackToTop";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [mounted,  setMounted]  = useState(false);
  const [loaded,   setLoaded]   = useState(false);
  const handleComplete          = useCallback(() => setLoaded(true), []);

  // Wait for full client hydration before mounting the loader
  useEffect(() => setMounted(true), []);

  // Smooth wheel scroll via lerp
  useEffect(() => {
    let targetY  = window.scrollY;
    let currentY = window.scrollY;
    let rafId    = 0;
    const maxY   = () => document.documentElement.scrollHeight - window.innerHeight;

    const loop = () => {
      currentY += (targetY - currentY) * 0.07;
      window.scrollTo(0, currentY);
      if (Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(loop);
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetY = Math.max(0, Math.min(targetY + e.deltaY * 1.2, maxY()));
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Slow smooth scroll for anchor links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const start    = window.scrollY;
      const end      = el.getBoundingClientRect().top + window.scrollY;
      const duration = 800;
      const startTime = performance.now();
      const ease = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const step = (now: number) => {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + (end - start) * ease(progress));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <AnimatePresence>
        {mounted && !loaded && <PageLoader onComplete={handleComplete} />}
      </AnimatePresence>
      {mounted && <CustomCursor />}
      <BackToTop />
      {children}
    </>
  );
}
