"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Position {
  id: string;
  title: string;
  division: string;
  location: string;
  clearance: string;
  type: string;
  requirements: string[];
  description: string;
}

const positions: Position[] = [
  {
    id: "JOB-001",
    title: "SENIOR_ROBOTICS_ENGINEER",
    division: "AUTONOMOUS_SYSTEMS",
    location: "Tashkent, UZ · Hybrid",
    clearance: "SECRET",
    type: "FULL_TIME",
    description:
      "Design and implement motion planning, sensor fusion, and control systems for autonomous UAV/UGV platforms. Work on the ROS2 stack and real-time embedded systems.",
    requirements: [
      "5+ years C++ / Python robotics development",
      "ROS2, Nav2, MoveIt — production experience",
      "Sensor fusion: LiDAR, IMU, GPS, cameras",
      "Real-time systems and RTOS experience",
      "Clearance or eligibility required",
    ],
  },
  {
    id: "JOB-002",
    title: "ML_VISION_ENGINEER",
    division: "AI_SYSTEMS",
    location: "Tashkent, UZ · On-Site",
    clearance: "SECRET",
    type: "FULL_TIME",
    description:
      "Develop and optimize computer vision and neural network inference pipelines for deployment on edge GPU hardware. Build real-time object detection and tracking for autonomous platforms.",
    requirements: [
      "PyTorch / TensorRT — inference optimization",
      "OpenCV, CUDA, cuDNN proficiency",
      "YOLO / ViT / custom model architecture",
      "Edge deployment: Jetson, FPGA co-design",
      "Published research or strong portfolio",
    ],
  },
  {
    id: "JOB-003",
    title: "EMBEDDED_FIRMWARE_ENGINEER",
    division: "HARDWARE_SYSTEMS",
    location: "Tashkent, UZ · On-Site",
    clearance: "CONFIDENTIAL",
    type: "FULL_TIME",
    description:
      "Write low-level firmware for flight controllers, motor controllers, and communication subsystems. Bare-metal and RTOS development on ARM Cortex-M/A platforms.",
    requirements: [
      "C / C++ bare-metal ARM firmware",
      "STM32, ESP32, PX4 flight stack",
      "CAN Bus, UART, SPI, I2C protocols",
      "Hardware debugging: JTAG, oscilloscope",
      "FreeRTOS or Zephyr experience",
    ],
  },
  {
    id: "JOB-004",
    title: "AUTONOMOUS_SYSTEMS_RESEARCHER",
    division: "R&D_DIVISION",
    location: "Tashkent, UZ · Flexible",
    clearance: "SECRET",
    type: "RESEARCH",
    description:
      "Research and prototype next-generation swarm coordination, multi-agent planning, and adversarial robustness for autonomous systems. Publish findings and translate to production.",
    requirements: [
      "PhD or MSc in Robotics / ML / Control",
      "Swarm intelligence or multi-agent RL",
      "Simulation: Gazebo, Isaac Sim, AirSim",
      "Strong publication record",
      "Willing to work on classified applications",
    ],
  },
];

const clearanceColor: Record<string, string> = {
  CONFIDENTIAL: "text-[#ffaa00] border-[#ffaa00]/30",
  SECRET:       "text-[#ff3366] border-[#ff3366]/30",
  TOP_SECRET:   "text-[#ff3366] border-[#ff3366]/30 glow-red",
};

const typeColor: Record<string, string> = {
  FULL_TIME: "text-[#00ff88]/70 border-[#00ff88]/25",
  RESEARCH:  "text-blue-400 border-blue-400/25",
  CONTRACT:  "text-purple-400 border-purple-400/25",
};

export default function Careers() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="careers" className="py-24 px-6 bg-[#080808] font-mono">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#00ff88]/50 text-xs tracking-widest mb-2">
            ── SECTION 07 ──────────────────────────────────
          </p>
          <div className="text-sm mb-1">
            <span className="text-[#00ff88]/55">root@uzdynamics:~$</span>{" "}
            <span className="text-[#00ff88]">grep -r &quot;HIRING&quot; /var/jobs/ --open-only</span>
          </div>
          <div className="text-[#00ff88]/40 text-xs">
            {positions.length} open positions · clearance may be required
          </div>
        </motion.div>

        <div className="space-y-4">
          {positions.map((pos, i) => {
            const isOpen = expanded === pos.id;
            return (
              <motion.div
                key={pos.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="term-card overflow-hidden"
              >
                {/* Header — always visible, clickable */}
                <button
                  onClick={() => setExpanded(isOpen ? null : pos.id)}
                  className="w-full text-left p-5 group"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] border border-[#00ff88]/20 text-[#00ff88]/50 px-1.5 tracking-widest">
                          {pos.id}
                        </span>
                        <span className={`text-[10px] border px-1.5 tracking-widest ${clearanceColor[pos.clearance]}`}>
                          {pos.clearance}
                        </span>
                        <span className={`text-[10px] border px-1.5 tracking-widest ${typeColor[pos.type]}`}>
                          {pos.type}
                        </span>
                      </div>
                      <h3 className="text-[#00ff88] text-sm tracking-widest mb-1 group-hover:glow-sm transition-all">
                        {pos.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-[10px] text-[#00ff88]/45 tracking-wider">
                        <span>DIV/{pos.division}</span>
                        <span>·</span>
                        <span>{pos.location}</span>
                      </div>
                    </div>
                    <span className={`text-xs text-[#00ff88]/40 tracking-widest transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}>
                      ▶
                    </span>
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-[#00ff88]/10">
                        <p className="text-[#00ff88]/50 text-xs leading-5 mt-4 mb-4">
                          {pos.description}
                        </p>

                        <p className="text-[#00ff88]/70 text-[10px] tracking-widest mb-2">
                          REQUIREMENTS:
                        </p>
                        <ul className="space-y-1 mb-5">
                          {pos.requirements.map((req, ri) => (
                            <li key={ri} className="text-[#00ff88]/45 text-xs flex gap-2">
                              <span className="text-[#00ff88]/30 flex-shrink-0">─</span>
                              {req}
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => {
                            window.location.href = "#contact";
                          }}
                          className="text-[10px] border border-[#00ff88]/40 text-[#00ff88]/70 px-5 py-2 tracking-[0.2em] hover:border-[#00ff88] hover:text-[#00ff88] hover:shadow-[0_0_15px_rgba(0,255,136,0.2)] transition-all duration-200"
                        >
                          APPLY_NOW →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-[10px] text-[#00ff88]/30 tracking-widest"
        >
          ── DON&apos;T SEE YOUR ROLE? SEND YOUR PROFILE TO: jobs@uzdynamics.uz ──
        </motion.div>
      </div>
    </section>
  );
}
