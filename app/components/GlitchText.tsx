"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*[]{}|<>_";

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function GlitchText({
  text,
  className = "",
  delay = 0,
  speed = 35,
}: GlitchTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let iter = 0;
    let interval: ReturnType<typeof setInterval>;

    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " ") return " ";
              if (i < iter) return text[i];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        iter += 0.5;
        if (iter >= text.length) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [text, delay, speed]);

  return <span className={className}>{display}</span>;
}
