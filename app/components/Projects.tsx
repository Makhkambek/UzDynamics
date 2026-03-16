"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id:       "UZD-001",
    type:     "UAV",
    name:     "RECON_DRONE_X1",
    status:   "OPERATIONAL",
    category: "Drone",
    perm:     "-rwxr--r--",
    size:     "14.2 MB",
    description:
      "Long-range reconnaissance UAV with advanced imaging systems and autonomous navigation. Extended surveillance in contested environments.",
  },
  {
    id:       "UZD-002",
    type:     "UAV",
    name:     "COMBAT_DRONE_V2",
    status:   "CLASSIFIED",
    category: "Drone",
    perm:     "-rwx------",
    size:     "28.7 MB",
    description:
      "Next-generation strike UAV with AI-assisted target acquisition. High-speed, low-altitude tactical interdiction platform.",
  },
  {
    id:       "UZD-003",
    type:     "UGV",
    name:     "URBAN_ROVER",
    status:   "TESTING",
    category: "Autonomous Vehicle",
    perm:     "-rwxr-xr--",
    size:     "9.1 MB",
    description:
      "Compact autonomous ground vehicle for urban operations. Multi-sensor fusion with real-time obstacle detection and path planning.",
  },
  {
    id:       "UZD-004",
    type:     "UGV",
    name:     "DESERT_CRAWLER",
    status:   "OPERATIONAL",
    category: "Autonomous Vehicle",
    perm:     "-rwxr--r--",
    size:     "17.6 MB",
    description:
      "Heavy-duty autonomous platform engineered for extreme desert terrain. Advanced thermal management and obstacle traversal.",
  },
  {
    id:       "UZD-005",
    type:     "DEF",
    name:     "SHIELD_SYSTEM",
    status:   "CLASSIFIED",
    category: "Military",
    perm:     "-rwx------",
    size:     "44.0 MB",
    description:
      "Integrated multi-layer defense shield. 360° detection and interception against aerial and ground-based threats.",
  },
  {
    id:       "UZD-006",
    type:     "TAC",
    name:     "TACTICAL_UNIT",
    status:   "CLASSIFIED",
    category: "Military",
    perm:     "-rwx------",
    size:     "31.3 MB",
    description:
      "Modular tactical robotic platform for high-risk deployments. Semi-autonomous with remote override capability.",
  },
];

const statusColor: Record<string, string> = {
  OPERATIONAL: "text-[#00ff88] glow-sm",
  TESTING:     "text-[#ffaa00]",
  CLASSIFIED:  "text-[#ff3366] glow-red",
};

const typeColor: Record<string, string> = {
  UAV: "border-blue-500/40  text-blue-400",
  UGV: "border-purple-500/40 text-purple-400",
  DEF: "border-[#00ff88]/40 text-[#00ff88]",
  TAC: "border-[#ff3366]/40 text-[#ff3366]",
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#0a0a0a] font-mono">
      <div className="max-w-6xl mx-auto">

        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#00ff88]/50 text-xs tracking-widest mb-2">
            ── SECTION 01 ──────────────────────────────────
          </p>
          <div className="text-[#00ff88]/55 text-sm mb-1">
            <span className="text-[#00ff88]/55">root@uzdynamics:~$</span>{" "}
            <span className="text-[#00ff88]">ls -la /classified/projects/</span>
          </div>
          <div className="text-[#00ff88]/55 text-xs">
            total {projects.length} · showing all clearance levels
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="term-card bracket-card group p-5 cursor-default"
            >
              {/* File header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#00ff88]/8">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] border px-1.5 py-0.5 tracking-widest ${typeColor[p.type]}`}>
                    {p.type}
                  </span>
                  <span className="text-[#00ff88]/50 text-[10px]">{p.id}</span>
                </div>
                <span className={`text-[10px] tracking-widest ${statusColor[p.status]}`}>
                  [{p.status}]
                </span>
              </div>

              {/* HUD image placeholder */}
              <div className="h-36 bg-[#060606] border border-[#00ff88]/12 mb-4 flex items-center justify-center relative overflow-hidden group-hover:border-[#00ff88]/30 transition-colors">
                {/* Scan line sweep on hover */}
                <div className="scan-line absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-[#00ff88]/6 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                {/* Dot grid bg */}
                <div className="absolute inset-0 dot-grid opacity-40" />
                {/* Corner HUD brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#00ff88]/30" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#00ff88]/30" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#00ff88]/30" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#00ff88]/30" />
                {/* Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-full h-px bg-[#00ff88]/6" />
                  <div className="absolute h-full w-px bg-[#00ff88]/6" />
                  <div className="w-6 h-6 border border-[#00ff88]/20 rounded-full" />
                  <div className="absolute w-2 h-2 border border-[#00ff88]/30 rounded-full" />
                </div>
                {/* Type label */}
                <div className="text-center z-10 relative">
                  <p className="font-display text-4xl text-[#00ff88]/20 group-hover:text-[#00ff88]/40 transition-colors duration-500">
                    {p.type}
                  </p>
                  <p className="text-[#00ff88]/20 text-[9px] tracking-[0.3em] mt-1">{p.id}</p>
                </div>
              </div>

              {/* Name */}
              <h3 className="font-display text-xl text-[#00ff88] tracking-wider mb-2 group-hover:glow-sm transition-all">
                {p.name}
              </h3>

              {/* Description */}
              <p className="text-[#00ff88]/40 text-xs leading-5">
                {p.description}
              </p>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-[#00ff88]/10 text-[10px] text-[#00ff88]/45 tracking-wider flex justify-between">
                <span>{p.perm}</span>
                <span>{p.size}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
