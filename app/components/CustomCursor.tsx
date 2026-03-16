"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos]         = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.closest("a") !== null ||
        el.closest("button") !== null
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("mouseover", onOver);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  const size = hovering ? 1.6 : clicking ? 0.7 : 1;
  const glow = hovering
    ? "0 0 12px #00ff41, 0 0 24px #00ff4170"
    : "0 0 6px #00ff41, 0 0 14px #00ff4150";

  return (
    <motion.div
      className="fixed pointer-events-none z-[99997]"
      animate={{ x: pos.x, y: pos.y, scale: size }}
      transition={{ type: "tween", duration: 0.06 }}
      style={{ translateX: "-50%", translateY: "-50%" }}
    >
      {/* Center dot */}
      <div
        className="absolute rounded-full bg-[#00ff41]"
        style={{
          width: 3, height: 3,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: glow,
        }}
      />
      {/* Cross lines */}
      {/* Top */}
      <div className="absolute bg-[#00ff41]" style={{ width: 1, height: 10, top: -14, left: "50%", transform: "translateX(-50%)", boxShadow: glow }} />
      {/* Bottom */}
      <div className="absolute bg-[#00ff41]" style={{ width: 1, height: 10, bottom: -14, left: "50%", transform: "translateX(-50%)", boxShadow: glow }} />
      {/* Left */}
      <div className="absolute bg-[#00ff41]" style={{ height: 1, width: 10, left: -14, top: "50%", transform: "translateY(-50%)", boxShadow: glow }} />
      {/* Right */}
      <div className="absolute bg-[#00ff41]" style={{ height: 1, width: 10, right: -14, top: "50%", transform: "translateY(-50%)", boxShadow: glow }} />
    </motion.div>
  );
}
