"use client";

import { motion } from "framer-motion";

const LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Team",     href: "#team" },
  { label: "About",    href: "#about" },
  { label: "Contact",  href: "#contact" },
];

const SOCIALS = [
  { label: "GitHub",   href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter",  href: "#" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#0d0d0d] border-t border-[#00ff88]/20 pt-12 pb-8 px-6 font-mono"
    >
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-3">
              <span className="text-[#00ff88]/60 text-xs tracking-widest">UZD://</span>
              <span className="font-display text-2xl text-[#00ff88] glow tracking-widest">
                UZDYNAMICS
              </span>
            </a>
            <p className="text-[#00ff88]/60 text-xs leading-6 max-w-xs">
              Advanced autonomous systems and defense robotics. Engineered in Tashkent.
            </p>
            {/* Status indicator */}
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] blink glow-sm" />
              <span className="text-[#00ff88] text-xs tracking-widest">ALL SYSTEMS ONLINE</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[#00ff88] text-xs tracking-[0.3em] uppercase mb-4 border-b border-[#00ff88]/20 pb-2">
              Navigation
            </p>
            <ul className="space-y-2">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#00ff88]/70 hover:text-[#00ff88] text-xs tracking-widest transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="text-[#00ff88]/30 group-hover:text-[#00ff88]/60">&gt;</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#00ff88] text-xs tracking-[0.3em] uppercase mb-4 border-b border-[#00ff88]/20 pb-2">
              Contact
            </p>
            <div className="space-y-2 text-xs mb-5">
              <p className="text-[#00ff88]/70">contact@uzdynamics.uz</p>
              <p className="text-[#00ff88]/70">Tashkent, Uzbekistan</p>
            </div>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={`${s.label} (coming soon)`}
                  className="text-[10px] border border-[#00ff88]/30 text-[#00ff88]/70 px-3 py-1.5 tracking-widest hover:border-[#00ff88] hover:text-[#00ff88] hover:shadow-[0_0_10px_rgba(0,255,136,0.2)] transition-all duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-[#00ff88]/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#00ff88]/55 text-xs tracking-widest">
            © {new Date().getFullYear()} UzDynamics. All rights reserved.
          </p>
          <p className="text-[#00ff88]/35 text-[10px] tracking-widest">
            ── CLASSIFIED · AUTONOMOUS SYSTEMS DIVISION ──
          </p>
        </div>

      </div>
    </motion.footer>
  );
}
