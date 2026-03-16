"use client";

import { motion } from "framer-motion";

const team = [
  {
    id:        "PERS-0041",
    initials:  "TM",
    name:      "TESHABAYEV_MAKHKAMBEK",
    title:     "CO-FOUNDER · CEO",
    clearance: "ALPHA",
    bio:       "Co-founder of UzDynamics. Leads product vision, hardware R&D, and strategic operations. Specializes in autonomous drone systems, embedded firmware, and real-time control architectures for defense applications.",
    skills:    ["DRONE_SYSTEMS", "EMBEDDED_FW", "R&D_OPS"],
  },
  {
    id:        "PERS-0042",
    initials:  "SS",
    name:      "SODIKOV_SHUKRULLO",
    title:     "CO-FOUNDER · CTO",
    clearance: "ALPHA",
    bio:       "Co-founder of UzDynamics. Drives software architecture, AI integration, and autonomous navigation systems. Expert in machine learning pipelines, computer vision, and mission-critical backend infrastructure.",
    skills:    ["AUTONOMOUS_AI", "COMPUTER_VISION", "SYS_ARCH"],
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 px-6 bg-[#0d0d0d] font-mono">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#00ff88]/40 text-xs tracking-widest mb-2">
            ── SECTION 02 ──────────────────────────────────
          </p>
          <div className="text-sm mb-1">
            <span className="text-[#00ff88]/55">root@uzdynamics:~$</span>{" "}
            <span className="text-[#00ff88]">
              SELECT * FROM personnel WHERE clearance=&apos;ALPHA&apos;;
            </span>
          </div>
          <div className="text-[#00ff88]/40 text-xs">
            2 rows returned · access level required: ALPHA
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="term-card bracket-card group overflow-hidden"
            >
              {/* Top strip — dossier header */}
              <div className="bg-[#00ff88]/5 border-b border-[#00ff88]/12 px-5 py-2 flex items-center justify-between">
                <span className="text-[10px] text-[#00ff88]/50 tracking-widest">{member.id}</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] glow-sm" />
                  <span className="text-[10px] text-[#00ff88] tracking-widest">
                    CLEARANCE:{member.clearance}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex gap-5 mb-5">
                  {/* Avatar — photo placeholder with targeting brackets */}
                  <div className="flex-shrink-0 relative w-20 h-20">
                    <div className="w-full h-full bg-[#080808] border border-[#00ff88]/20 flex items-center justify-center group-hover:border-[#00ff88]/45 transition-colors dot-grid">
                      <span className="font-display text-3xl text-[#00ff88]/60 group-hover:text-[#00ff88] transition-colors glow-sm z-10 relative">
                        {member.initials}
                      </span>
                    </div>
                    {/* Corner brackets on avatar */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#00ff88]/50" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[#00ff88]/50" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[#00ff88]/50" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#00ff88]/50" />
                  </div>

                  {/* Name + title */}
                  <div className="flex flex-col justify-center">
                    <h3 className="font-display text-xl text-[#00ff88] tracking-wider leading-tight mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[10px] text-[#00ff88]/50 tracking-widest leading-5">
                      {member.title}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="section-rule mb-4" />

                {/* Bio */}
                <p className="text-[#00ff88]/45 text-xs leading-6 mb-5">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] text-[#00ff88]/60 border border-[#00ff88]/25 px-2 py-1 tracking-widest hover:text-[#00ff88] hover:border-[#00ff88]/55 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
