"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface Partner {
  name: string;
  code: string;
  type: string;
}

const partners: Partner[] = [
  { name: "MINISTRY_OF_DEFENSE",    code: "MOD-UZ",   type: "GOVERNMENT" },
  { name: "TECHPARK_UZBEKISTAN",    code: "TECHPK",   type: "ACCELERATOR" },
  { name: "UZAERONAVIGATION",       code: "UAN-001",  type: "AVIATION" },
  { name: "INHA_UNIVERSITY_TAS",    code: "INHA-TAS", type: "RESEARCH" },
  { name: "NATIONAL_GUARD_UZ",      code: "NGU-04",   type: "DEFENSE" },
  { name: "DIGITAL_TRUST_FUND",     code: "DTF-CIS",  type: "INVESTOR" },
  { name: "AEROSPACE_CONSORTIUM",   code: "ASC-EU",   type: "PARTNER" },
  { name: "ROBOTICS_ALLIANCE_CA",   code: "RAC-003",  type: "RESEARCH" },
];

const typeColor: Record<string, string> = {
  GOVERNMENT:  "text-[#00ff41]/60 border-[#00ff41]/20",
  DEFENSE:     "text-[#ff3333]/60 border-[#ff3333]/20",
  RESEARCH:    "text-blue-400/60  border-blue-400/20",
  AVIATION:    "text-purple-400/60 border-purple-400/20",
  ACCELERATOR: "text-[#ffb000]/60 border-[#ffb000]/20",
  INVESTOR:    "text-[#00ff41]/50 border-[#00ff41]/15",
  PARTNER:     "text-[#00ff41]/50 border-[#00ff41]/15",
};

function PartnerCard({ partner, delay }: { partner: Partner; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="term-card p-5 flex flex-col gap-3 group hover:scale-[1.02] transition-transform duration-300"
    >
      {/* Scanline effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,136,0.015) 3px, rgba(0,255,136,0.015) 4px)",
        }}
      />

      {/* Logo placeholder — ASCII art block */}
      <div className="h-14 border border-[#00ff41]/8 flex items-center justify-center bg-[#080808] group-hover:border-[#00ff41]/20 transition-colors relative overflow-hidden">
        <span className="font-display text-xl text-[#00ff41]/25 tracking-widest group-hover:text-[#00ff41]/45 transition-colors z-10">
          {partner.code}
        </span>
      </div>

      {/* Name */}
      <p className="text-[#e5e5e5]/60 font-sans text-[10px] tracking-widest leading-4 text-center">
        {partner.name}
      </p>

      {/* Type badge */}
      <div className="flex justify-center">
        <span className={`text-[9px] border px-2 py-0.5 tracking-widest ${typeColor[partner.type]}`}>
          {partner.type}
        </span>
      </div>
    </motion.div>
  );
}

export default function Partners() {
  const tickerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="partners" className="py-24 px-6 bg-[#0a0a0a] font-mono overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#00ff41]/50 text-xs tracking-widest mb-2">
            ── SECTION 08 ──────────────────────────────────
          </p>
          <div className="text-sm mb-1">
            <span className="text-[#00ff41]/55">root@uzdynamics:~$</span>{" "}
            <span className="text-[#00ff41]">cat /etc/trusted_entities.conf</span>
          </div>
          <div className="text-[#00ff41]/40 text-xs">
            {partners.length} verified entities · access level: public
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 relative">
          {partners.map((p, i) => (
            <div key={p.code} className="relative">
              <PartnerCard partner={p} delay={i * 0.07} />
            </div>
          ))}
        </div>

        {/* Scrolling ticker */}
        <div className="mt-12 border border-[#00ff41]/10 py-3 overflow-hidden relative">
          <div
            ref={tickerRef}
            className="flex gap-12 text-[#00ff41]/30 text-[10px] tracking-[0.3em] whitespace-nowrap"
            style={{
              animation: "ticker 20s linear infinite",
            }}
          >
            {[...partners, ...partners].map((p, i) => (
              <span key={`tick-${i}`} className="flex items-center gap-3">
                <span className="text-[#00ff41]/50">◆</span>
                {p.name}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-[10px] text-[#00ff41]/25 tracking-widest"
        >
          ── PARTNER_VERIFICATION_COMPLETE · ALL ENTITIES AUTHENTICATED ──
        </motion.div>
      </div>
    </section>
  );
}
