"use client";

import { useEffect, useRef } from "react";

interface ColumnState {
  y:      number;   // current row position
  speed:  number;   // rows per tick
  glitch: number;   // glitch countdown (frames)
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 12;
    const chars    = "アイウエカキクケUZDYN0123456789!@#$%ABCXYZ<>[]{}|_=+";

    const initCols = (w: number, h: number): ColumnState[] => {
      const count = Math.floor(w / fontSize);
      return Array.from({ length: count }, () => ({
        y:      Math.random() * (h / fontSize),   // spread across full height on init
        speed:  0.35 + Math.random() * 1.15,
        glitch: 0,
      }));
    };

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    let cols = initCols(canvas.width, canvas.height);

    const draw = () => {
      // Fade trail — faster fade = shorter trail
      ctx.fillStyle = "rgba(10,10,10,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols.length; i++) {
        const col = cols[i];
        const px  = i * fontSize;
        const py  = col.y * fontSize;

        // Mouse proximity (within 120px)
        const dx      = px - mouseRef.current.x;
        const dy      = py - mouseRef.current.y;
        const nearby  = Math.sqrt(dx * dx + dy * dy) < 120;

        // Randomly trigger glitch burst
        if (Math.random() < 0.0004) {
          col.glitch = 4 + Math.floor(Math.random() * 8);
        }
        const isGlitch = col.glitch > 0;
        if (isGlitch) col.glitch--;

        // Pick character
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Colour + weight — kept very dim
        if (isGlitch) {
          ctx.fillStyle = "#00ff4170";
          ctx.font = `bold ${fontSize}px monospace`;
        } else if (nearby) {
          ctx.fillStyle = "#00ff4155";
          ctx.font = `${fontSize}px monospace`;
        } else {
          ctx.fillStyle = "#00ff4118";
          ctx.font = `${fontSize}px monospace`;
        }

        ctx.fillText(char, px, py);

        // Slightly brighter head character
        if (!isGlitch && !nearby) {
          const headChar = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle  = "#00ff4140";
          ctx.font       = `${fontSize}px monospace`;
          ctx.fillText(headChar, px, py + fontSize);
        }

        // Advance drop
        const boost = nearby ? 2.8 : isGlitch ? 2.2 : 1;
        col.y += col.speed * boost;

        // Reset at bottom
        if (py > canvas.height && Math.random() > 0.97) {
          col.y     = Math.random() * -10;
          col.speed = 0.35 + Math.random() * 1.15;
        }
      }
    };

    const interval = setInterval(draw, 40);

    const handleResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = initCols(canvas.width, canvas.height);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize",    handleResize);
    window.addEventListener("mousemove", handleMouse, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize",    handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.25 }}
    />
  );
}
