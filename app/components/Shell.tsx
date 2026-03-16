"use client";

import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import PageLoader from "./PageLoader";
import CustomCursor from "./CustomCursor";
import BackToTop from "./BackToTop";

// Module-level flag — survives React remounts (Strict Mode, etc.) within the same JS session.
// Resets only when the tab is closed or hard-refreshed.
let _alreadyLoaded = false;

export default function Shell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  // Initialise from module flag — so even if React remounts Shell, we skip the loader
  const [loaded, setLoaded] = useState(_alreadyLoaded);

  // Also check sessionStorage as a fallback (handles the case where the module
  // IS fresh but the user has visited before in this browser tab session)
  useLayoutEffect(() => {
    if (!_alreadyLoaded && sessionStorage.getItem("uzd_loaded")) {
      _alreadyLoaded = true;
      setLoaded(true);
    }
  }, []);

  const handleComplete = useCallback(() => {
    _alreadyLoaded = true;
    sessionStorage.setItem("uzd_loaded", "1");
    setLoaded(true);
  }, []);

  useEffect(() => {
    setMounted(true);
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  // Reset scroll to top on every page navigation (pathname change)
  useEffect(() => {
    if (!window.location.hash) {
      window.dispatchEvent(new CustomEvent("uzd:scroll-to", { detail: { y: 0 } }));
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // All scroll logic in one effect so targetY is shared across wheel, anchors, and BackToTop
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
      } else {
        currentY = targetY;
      }
    };

    // Wheel: accumulate into targetY, lerp handles the actual movement
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetY = Math.max(0, Math.min(targetY + e.deltaY * 1.2, maxY()));
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(loop);
    };

    // Anchor links: update targetY so lerp stays in sync
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      targetY = Math.max(0, Math.min(
        el.getBoundingClientRect().top + window.scrollY,
        maxY()
      ));
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(loop);
    };

    // External scroll requests (e.g. BackToTop) — dispatches uzd:scroll-to with { y }
    const onScrollTo = (e: Event) => {
      targetY = Math.max(0, Math.min((e as CustomEvent<{ y: number }>).detail.y, maxY()));
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("wheel",          onWheel,      { passive: false });
    document.addEventListener("click",        onAnchorClick);
    window.addEventListener("uzd:scroll-to",  onScrollTo);

    return () => {
      window.removeEventListener("wheel",         onWheel);
      document.removeEventListener("click",       onAnchorClick);
      window.removeEventListener("uzd:scroll-to", onScrollTo);
      cancelAnimationFrame(rafId);
    };
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
