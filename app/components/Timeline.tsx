"use client";

import { motion } from "framer-motion";

interface Milestone {
  year: string;
  month: string;
  code: string;
  title: string;
  description: string;
  status: "COMPLETE" | "ACTIVE" | "CLASSIFIED";
}

const milestones: Milestone[] = [
  {
    year: "2019",
    month: "APR",
    code: "INIT_001",
    title: "SYSTEM_BOOTSTRAP",
    description: "UzDynamics founded in Tashkent. Core team of 4 engineers. First R&D lab established. Mission: autonomous systems for defense applications.",
    status: "COMPLETE",
  },
  {
    year: "2020",
    month: "JAN",
    code: "PROTO_001",
    title: "FIRST_PROTOTYPE",
    description: "Initial UAV prototype completed — RECON_X0. Successful first autonomous flight at 400m altitude. Navigation stack built on ROS1, migrated to ROS2 Q3.",
    status: "COMPLETE",
  },
  {
    year: "2021",
    month: "MAR",
    code: "CONTRACT_001",
    title: "FIRST_CONTRACT",
    description: "First government contract signed. Delivery of 3× RECON_DRONE_X1 units. Team expanded to 12 engineers. Embedded AI inference pipeline deployed.",
    status: "COMPLETE",
  },
  {
    year: "2022",
    month: "JUN",
    code: "SCALE_001",
    title: "RAPID_EXPANSION",
    description: "Headcount reached 30 engineers. Ground vehicle division launched — URBAN_ROVER and DESERT_CRAWLER in concurrent development. CUDA acceleration integrated.",
    status: "COMPLETE",
  },
  {
    year: "2023",
    month: "SEP",
    code: "INTL_001",
    title: "INTERNATIONAL_OPS",
    description: "Operations expanded to 3 countries. Strategic partnerships established in Eastern Europe and Central Asia. SHIELD_SYSTEM classified project initiated.",
    status: "COMPLETE",
  },
  {
    year: "2024",
    month: "FEB",
    code: "COMBAT_001",
    title: "COMBAT_SYSTEMS_DIV",
    description: "Dedicated combat systems division established. TACTICAL_UNIT enters development. AI-assisted target acquisition system passes internal evaluation.",
    status: "COMPLETE",
  },
  {
    year: "2025",
    month: "NOW",
    code: "ACTIVE_OPS",
    title: "CURRENT_OPERATIONS",
    description: "12+ active projects across UAV, UGV, and defense sectors. 30+ engineers. Next milestone: full-stack autonomous swarm coordination system.",
    status: "ACTIVE",
  },
];

const statusColor: Record<string, string> = {
  COMPLETE:   "text-[#00ff88]/60",
  ACTIVE:     "text-[#00ff88] glow-sm",
  CLASSIFIED: "text-[#ff3366] glow-red",
};

const statusDot: Record<string, string> = {
  COMPLETE:   "bg-[#00ff88]/40",
  ACTIVE:     "bg-[#00ff88] glow-sm",
  CLASSIFIED: "bg-[#ff3366]",
};

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 px-6 bg-[#0a0a0a] font-mono">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#00ff88]/50 text-xs tracking-widest mb-2">
            ── SECTION 06 ──────────────────────────────────
          </p>
          <div className="text-sm mb-1">
            <span className="text-[#00ff88]/55">root@uzdynamics:~$</span>{" "}
            <span className="text-[#00ff88]">git log --oneline --graph --all</span>
          </div>
          <div className="text-[#00ff88]/40 text-xs">
            {milestones.length} commits · branch: main · HEAD → CURRENT_OPERATIONS
          </div>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[88px] top-0 bottom-0 w-px bg-[#00ff88]/12 hidden sm:block" />

          <div className="space-y-0">
            {milestones.map((m, i) => (
              <motion.div
                key={m.code}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="relative flex gap-4 sm:gap-8 pb-8 group"
              >
                {/* Date column */}
                <div className="flex-shrink-0 w-20 sm:w-[88px] text-right pr-4 pt-0.5">
                  <p className="text-[#00ff88]/70 text-xs tracking-widest">{m.year}</p>
                  <p className="text-[#00ff88]/40 text-[10px] tracking-widest">{m.month}</p>
                </div>

                {/* Timeline node */}
                <div className="absolute left-[80px] sm:left-[84px] top-1.5 w-3 h-3 hidden sm:flex items-center justify-center">
                  <span className={`w-2 h-2 rounded-full ${statusDot[m.status]} ${m.status === "ACTIVE" ? "blink" : ""}`} />
                </div>

                {/* Content */}
                <div className="flex-1 term-card p-4 group-hover:border-[#00ff88]/30 transition-colors">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] border border-[#00ff88]/20 text-[#00ff88]/50 px-1.5 tracking-widest">
                      {m.code}
                    </span>
                    <span className={`text-[10px] tracking-widest ${statusColor[m.status]}`}>
                      [{m.status}]
                    </span>
                  </div>
                  <h3 className="text-[#00ff88] text-sm tracking-wider mb-2">
                    {m.status === "ACTIVE" && (
                      <span className="text-[#00ff88] mr-1 blink">▶</span>
                    )}
                    {m.title}
                  </h3>
                  <p className="text-[#00ff88]/45 text-xs leading-5">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center text-[10px] text-[#00ff88]/30 tracking-widest"
        >
          ── END_OF_LOG · NEXT_COMMIT: SWARM_V1 · ETA: CLASSIFIED ──
        </motion.div>
      </div>
    </section>
  );
}
