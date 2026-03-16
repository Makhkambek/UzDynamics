"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Tech {
  name: string;
  level: number;
  tag: string;
}

interface Category {
  label: string;
  cmd: string;
  techs: Tech[];
}

const categories: Category[] = [
  {
    label: "CORE_SYSTEMS",
    cmd: "cat /sys/firmware/core.conf",
    techs: [
      { name: "C++17/20",    level: 95, tag: "FIRMWARE" },
      { name: "Python 3.x",  level: 88, tag: "SCRIPTING" },
      { name: "Rust",        level: 72, tag: "SAFE_SYS"  },
      { name: "Asm (ARM64)", level: 65, tag: "BARE_METAL" },
    ],
  },
  {
    label: "AI / MACHINE_LEARNING",
    cmd: "ls -la /opt/neural/",
    techs: [
      { name: "CUDA / cuDNN",    level: 90, tag: "GPU"       },
      { name: "TensorRT",        level: 85, tag: "INFERENCE" },
      { name: "PyTorch",         level: 88, tag: "TRAINING"  },
      { name: "OpenCV",          level: 93, tag: "VISION"    },
    ],
  },
  {
    label: "ROBOTICS_STACK",
    cmd: "rosnode list --all",
    techs: [
      { name: "ROS2 Humble",  level: 92, tag: "MIDDLEWARE"  },
      { name: "SLAM / Nav2",  level: 87, tag: "NAVIGATION"  },
      { name: "PX4 / ArduPilot", level: 80, tag: "AUTOPILOT" },
      { name: "Gazebo / Isaac",  level: 75, tag: "SIMULATION" },
    ],
  },
  {
    label: "COMMS_&_HARDWARE",
    cmd: "ifconfig --all && lsusb",
    techs: [
      { name: "LoRa / LoRaWAN", level: 85, tag: "RF_LINK"   },
      { name: "4G/LTE + 5G",   level: 80, tag: "CELLULAR"  },
      { name: "ESP32 / STM32",  level: 90, tag: "MCU"       },
      { name: "CAN Bus / UART", level: 88, tag: "PROTOCOL"  },
    ],
  },
];

function SkillBar({ tech, delay }: { tech: Tech; delay: number }) {
  const [width, setWidth]     = useState(0);
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
    const timer = setTimeout(() => setWidth(tech.level), delay * 1000 + 200);
    return () => clearTimeout(timer);
  }, [started, tech.level, delay]);

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#00ff41]/80 tracking-wider">{tech.name}</span>
          <span className="text-[10px] border border-[#00ff41]/25 text-[#00ff41]/50 px-1.5 py-0 tracking-widest">
            {tech.tag}
          </span>
        </div>
        <span className="text-[10px] text-[#00ff41]/60 tracking-widest tabular-nums">
          {width}%
        </span>
      </div>
      <div className="h-1 bg-[#00ff41]/8 w-full overflow-hidden">
        <div
          className="h-full bg-[#00ff41] transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            boxShadow: "0 0 6px #00ff4180",
          }}
        />
      </div>
    </div>
  );
}

export default function Technologies() {
  return (
    <section id="technologies" className="py-24 px-6 bg-[#080808] font-mono">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#00ff41]/50 text-xs tracking-widest mb-2">
            ── SECTION 05 ──────────────────────────────────
          </p>
          <div className="text-sm mb-1">
            <span className="text-[#00ff41]/55">root@uzdynamics:~$</span>{" "}
            <span className="text-[#00ff41]">cat /proc/tech_stack --verbose</span>
          </div>
          <div className="text-[#00ff41]/40 text-xs">
            scanning installed modules · 16 packages detected
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="term-card p-6"
            >
              {/* Card header */}
              <div className="mb-5 pb-3 border-b border-[#00ff41]/10">
                <p className="text-[#00ff41]/40 text-[10px] tracking-widest mb-1">
                  root@uzdynamics:~$ {cat.cmd}
                </p>
                <p className="text-[#00ff41] text-xs tracking-[0.2em]">
                  [{cat.label}]
                </p>
              </div>

              <div className="space-y-4">
                {cat.techs.map((tech, ti) => (
                  <SkillBar key={tech.name} tech={tech} delay={ci * 0.1 + ti * 0.1} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom summary line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-[10px] text-[#00ff41]/30 tracking-widest"
        >
          ── TECH_STACK_AUDIT_COMPLETE · 16/16 MODULES VERIFIED · ALL SYSTEMS NOMINAL ──
        </motion.div>
      </div>
    </section>
  );
}
