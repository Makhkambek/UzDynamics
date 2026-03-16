"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { key: "FOUNDED",         numeric: 2019, suffix: "",  unit: "YEAR"      },
  { key: "ACTIVE_PROJECTS", numeric: 12,   suffix: "+", unit: "COUNT"     },
  { key: "ENGINEERS",       numeric: 30,   suffix: "+", unit: "PERSONNEL" },
  { key: "COUNTRIES",       numeric: 3,    suffix: "",  unit: "REGIONS"   },
];

const sysInfo = [
  { label: "OS",       value: "UZD-OS 4.2 #TACTICAL SMP" },
  { label: "ARCH",     value: "ARM64 + x86_64 (hybrid)" },
  { label: "UPTIME",   value: "5 years, 3 months, 12 days" },
  { label: "LOCATION", value: "Tashkent, Uzbekistan (41.2995°N, 69.2401°E)" },
  { label: "MISSION",  value: "AUTONOMOUS WARFARE SYSTEMS" },
  { label: "STATUS",   value: "OPERATIONAL · ALL UNITS READY" },
];

function useCountUp(target: number, duration = 1400) {
  const [count, setCount]   = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCard({ stat, delay }: { stat: typeof stats[0]; delay: number }) {
  const { count, ref } = useCountUp(stat.numeric);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="term-card bracket-card p-6 group"
    >
      <p className="text-[10px] text-[#00ff41]/55 tracking-widest mb-2">{stat.unit}</p>
      <p className="font-display text-5xl text-[#00ff41] glow mb-1 group-hover:tracking-wider transition-all duration-300">
        {count}{stat.suffix}
      </p>
      <p className="text-[10px] text-[#00ff41]/65 tracking-widest">{stat.key}</p>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#080808] font-mono">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#00ff41]/40 text-xs tracking-widest mb-2">
            ── SECTION 03 ──────────────────────────────────
          </p>
          <div className="text-sm mb-1">
            <span className="text-[#00ff41]/55">root@uzdynamics:~$</span>{" "}
            <span className="text-[#00ff41]">uname -a &amp;&amp; uptime &amp;&amp; sys --info</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: sysinfo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="term-card p-6 mb-6">
              <div className="space-y-2">
                {sysInfo.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4 text-xs"
                  >
                    <span className="text-[#00ff41]/65 w-20 flex-shrink-0 tracking-wider">{item.label}</span>
                    <span className="text-[#00ff41]/45 flex-shrink-0">:</span>
                    <span className="text-[#00ff41]/65">{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="term-card p-6 text-xs leading-6 space-y-1 font-sans">
              <p className="text-[#00ff41]/50 font-mono">{"/*"}</p>
              <p className="pl-4 text-[#e5e5e5]/60">UzDynamics is a defense-tech company engineering</p>
              <p className="pl-4 text-[#e5e5e5]/60">autonomous systems for the most demanding ops.</p>
              <p className="pl-4 text-[#e5e5e5]/60">Founded in Tashkent — built for the world.</p>
              <p className="pl-4 text-[#e5e5e5]/80 italic">
                &ldquo;Engineering precision. Delivering power. Advancing autonomy.&rdquo;
              </p>
              <p className="text-[#00ff41]/50 font-mono">{"*/"}</p>
            </div>
          </motion.div>

          {/* Right: animated stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={stat.key} stat={stat} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
