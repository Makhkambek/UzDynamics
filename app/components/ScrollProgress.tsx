"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[9996] bg-[#00ff41]/10">
      <div
        className="h-full bg-[#00ff41] transition-all duration-75"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 8px #00ff41, 0 0 16px #00ff4160",
        }}
      />
    </div>
  );
}
