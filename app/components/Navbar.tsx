"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "01_PROJECTS", href: "#projects", id: "projects" },
  { label: "02_TEAM",     href: "#team",     id: "team"     },
  { label: "03_ABOUT",    href: "#about",    id: "about"    },
  { label: "04_CONTACT",  href: "#contact",  id: "contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 font-mono transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#00ff88]/15"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-[#00ff88]/50 text-xs tracking-widest">UZD://</span>
          <span className="font-display text-2xl text-[#00ff88] glow tracking-widest">
            UZDYNAMICS
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs tracking-widest transition-all duration-200 ${
                  isActive
                    ? "text-[#00ff88] glow-sm"
                    : "text-[#00ff88]/45 hover:text-[#00ff88]"
                }`}
              >
                {isActive && <span className="mr-1 blink">▶</span>}
                {link.label}
              </a>
            );
          })}
          <div className="flex items-center gap-2 text-[10px] text-[#00ff88]/45 border border-[#00ff88]/15 px-3 py-1.5 tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] glow-sm blink" />
            SYS:ONLINE
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          className="md:hidden text-[#00ff88]/70 text-xs border border-[#00ff88]/25 px-3 py-2 hover:border-[#00ff88]/60 hover:text-[#00ff88] transition-all"
        >
          {menuOpen ? "[CLOSE]" : "[MENU]"}
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0a0a0a]/98 border-b border-[#00ff88]/10 px-6 py-6 space-y-4"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 text-sm tracking-widest py-1 transition-colors ${
                  isActive ? "text-[#00ff88]" : "text-[#00ff88]/60 hover:text-[#00ff88]"
                }`}
              >
                <span className={isActive ? "text-[#00ff88]" : "text-[#00ff88]/30"}>&gt;</span>
                {link.label}
              </a>
            );
          })}
        </motion.div>
      )}
    </motion.nav>
  );
}
