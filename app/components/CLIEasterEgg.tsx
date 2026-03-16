"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Line {
  type: "input" | "output" | "error" | "success";
  text: string;
}

const HELP_TEXT = [
  "Available commands:",
  "  help       — show this help",
  "  ls         — list classified files",
  "  whoami     — identify current operator",
  "  projects   — dump active project list",
  "  team       — list registered operatives",
  "  status     — system status report",
  "  hack       — initiate breach sequence",
  "  clear      — clear terminal output",
  "  exit       — close terminal session",
  "",
  "Type a command and press ENTER.",
];

const LS_OUTPUT = [
  "drwxr-x--- 2 root uzd  4096 2025-01-15  classified/",
  "drwxr-x--- 2 root uzd  4096 2025-01-15  projects/",
  "-rw------- 1 root uzd  14.2M 2024-12-01 recon_drone_x1.bin",
  "-rw------- 1 root uzd  28.7M 2024-11-20 combat_drone_v2.bin",
  "-rwx------ 1 root uzd  44.0M 2025-01-05 shield_system.enc",
  "-rw-r----- 1 root uzd   9.1M 2024-10-12 urban_rover.pkg",
  "Permission denied: /classified/tactical_unit/",
];

const PROJECTS_OUTPUT = [
  "[UZD-001] RECON_DRONE_X1    STATUS: OPERATIONAL",
  "[UZD-002] COMBAT_DRONE_V2   STATUS: CLASSIFIED",
  "[UZD-003] URBAN_ROVER       STATUS: TESTING",
  "[UZD-004] DESERT_CRAWLER    STATUS: OPERATIONAL",
  "[UZD-005] SHIELD_SYSTEM     STATUS: CLASSIFIED",
  "[UZD-006] TACTICAL_UNIT     STATUS: CLASSIFIED",
];

const TEAM_OUTPUT = [
  "UID  USER              ROLE                     CLEARANCE",
  "1000 operator_alpha    Lead Systems Engineer    TOP_SECRET",
  "1001 operator_beta     ML/Vision Engineer       SECRET",
  "1002 operator_gamma    Robotics Engineer        SECRET",
  "...  [28 records hidden — insufficient clearance]",
];

const STATUS_OUTPUT = [
  "UZD-OS 4.2 #TACTICAL SMP ARM64",
  "Uptime: 5y 3m 12d 06:14:22",
  "Load:   0.42 0.38 0.31",
  "Memory: 28.4G / 64.0G used (44%)",
  "Swap:   0 / 0",
  "Tasks:  214 total, 3 running, 211 sleeping",
  "Net:    eth0 UP  10G — encrypted tunnel ACTIVE",
  "Status: ALL_SYSTEMS_NOMINAL",
];

const HACK_FRAMES = [
  "Initializing breach sequence...",
  "Scanning target vectors... [████░░░░░░] 40%",
  "Bypassing perimeter firewall... [████████░░] 80%",
  "ERROR: COUNTER-INTRUSION ACTIVE",
  "Trace route detected from 10.0.0.1",
  "ABORT. ABORT. ABORT.",
  "",
  "Just kidding. Nice try, operator.",
];

function processCommand(cmd: string): Line[] {
  const trimmed = cmd.trim().toLowerCase();
  switch (trimmed) {
    case "help":
      return HELP_TEXT.map((t) => ({ type: "output" as const, text: t }));
    case "ls":
    case "ls -la":
      return LS_OUTPUT.map((t) => ({ type: "output" as const, text: t }));
    case "whoami":
      return [
        { type: "output", text: "operator_unknown" },
        { type: "output", text: "Groups: uzd_staff, classified_read" },
        { type: "output", text: "Clearance: CONFIDENTIAL" },
      ];
    case "projects":
      return PROJECTS_OUTPUT.map((t) => ({ type: "output" as const, text: t }));
    case "team":
      return TEAM_OUTPUT.map((t) => ({ type: "output" as const, text: t }));
    case "status":
      return STATUS_OUTPUT.map((t) => ({ type: "output" as const, text: t }));
    case "hack":
      return HACK_FRAMES.map((t) => ({ type: "output" as const, text: t }));
    case "clear":
      return [{ type: "success", text: "__CLEAR__" }];
    case "exit":
      return [{ type: "success", text: "__EXIT__" }];
    case "":
      return [];
    default:
      return [{ type: "error", text: `bash: ${trimmed}: command not found. Type 'help' for available commands.` }];
  }
}

export default function CLIEasterEgg() {
  const [open, setOpen]       = useState(false);
  const [lines, setLines]     = useState<Line[]>([
    { type: "output", text: "UZD-OS 4.2 #TACTICAL — Unauthorized Access Terminal" },
    { type: "output", text: "Type 'help' for available commands. Press ` to close." },
    { type: "output", text: "" },
  ]);
  const [input, setInput]     = useState("");
  const inputRef              = useRef<HTMLInputElement>(null);
  const bottomRef             = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const submit = () => {
    const cmd = input.trim();
    const inputLine: Line = { type: "input", text: `root@uzdynamics:~$ ${cmd}` };
    const result = processCommand(cmd);

    if (result.length === 1 && result[0].text === "__CLEAR__") {
      setLines([{ type: "output", text: "" }]);
      setInput("");
      return;
    }

    if (result.length === 1 && result[0].text === "__EXIT__") {
      setLines((prev) => [...prev, inputLine, { type: "output", text: "Session terminated." }]);
      setInput("");
      setTimeout(() => setOpen(false), 600);
      return;
    }

    setLines((prev) => [...prev, inputLine, ...result]);
    setInput("");
  };

  return (
    <>
      {/* Hint */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-20 left-6 z-40 text-[#00ff88]/20 text-[10px] tracking-widest font-mono select-none pointer-events-none hidden md:block"
          >
            [` ] OPEN_TERMINAL
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10"
            style={{ background: "rgba(0,0,0,0.88)" }}
            onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-3xl h-[70vh] flex flex-col term-card overflow-hidden"
              style={{ boxShadow: "0 0 60px rgba(0,255,136,0.15)" }}
            >
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#00ff88]/15 bg-[#0d0d0d] flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff3366]/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffaa00]/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88]/60" />
                  </div>
                  <span className="text-[10px] text-[#00ff88]/50 tracking-widest">
                    root@uzdynamics — bash — 80×24
                  </span>
                </div>
                <button
                  onClick={close}
                  className="text-[10px] text-[#00ff88]/40 hover:text-[#00ff88] tracking-widest transition-colors"
                >
                  [ESC]
                </button>
              </div>

              {/* Output area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-0.5 text-xs font-mono">
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.type === "input"
                        ? "text-[#00ff88] tracking-wider"
                        : line.type === "error"
                        ? "text-[#ff3366]/80"
                        : line.type === "success"
                        ? "text-[#00ff88] glow-sm"
                        : "text-[#00ff88]/55"
                    }
                  >
                    {line.text || "\u00a0"}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input row */}
              <div className="flex-shrink-0 border-t border-[#00ff88]/10 px-4 py-3 flex items-center gap-2 bg-[#0d0d0d]">
                <span className="text-[#00ff88]/55 text-xs whitespace-nowrap">
                  root@uzdynamics:~$
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submit();
                    if (e.key === "`") { e.preventDefault(); close(); }
                  }}
                  className="flex-1 bg-transparent text-[#00ff88] text-xs outline-none tracking-wider caret-[#00ff88] font-mono"
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="text-[#00ff88] text-xs blink">█</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
