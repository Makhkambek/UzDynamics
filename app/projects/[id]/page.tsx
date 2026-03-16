import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import projects from "@/app/data/projects";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find((p) => p.slug === params.id);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.name} — UzDynamics`,
    description: project.description,
  };
}

const statusColor: Record<string, string> = {
  OPERATIONAL: "text-[#00ff88] border-[#00ff88]/40",
  TESTING:     "text-[#ffaa00] border-[#ffaa00]/40",
  CLASSIFIED:  "text-[#ff3366] border-[#ff3366]/40",
};

const typeColor: Record<string, string> = {
  UAV: "border-blue-500/40  text-blue-400",
  UGV: "border-purple-500/40 text-purple-400",
  DEF: "border-[#00ff88]/40 text-[#00ff88]",
  TAC: "border-[#ff3366]/40 text-[#ff3366]",
};

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.id);
  if (!project) notFound();

  const isClassified = project.status === "CLASSIFIED";

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-mono px-6 py-32">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-[#00ff88]/40 tracking-widest mb-10">
          <Link href="/" className="hover:text-[#00ff88] transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-[#00ff88] transition-colors">
            PROJECTS
          </Link>
          <span>/</span>
          <span className="text-[#00ff88]/70">{project.id}</span>
        </div>

        {/* Terminal header */}
        <div className="mb-10">
          <p className="text-[#00ff88]/40 text-xs tracking-widest mb-2">
            ── PROJECT_DOSSIER ──────────────────────────────
          </p>
          <div className="text-sm mb-1">
            <span className="text-[#00ff88]/50">root@uzdynamics:~$</span>{" "}
            <span className="text-[#00ff88]">cat /classified/projects/{project.slug}.md</span>
          </div>
        </div>

        {/* Title + badges */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`text-[10px] border px-2 py-0.5 tracking-widest ${typeColor[project.type]}`}>
              {project.type}
            </span>
            <span className="text-[10px] border border-[#00ff88]/20 text-[#00ff88]/50 px-2 py-0.5 tracking-widest">
              {project.id}
            </span>
            <span className={`text-[10px] border px-2 py-0.5 tracking-widest ${statusColor[project.status]}`}>
              {project.status}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-[#00ff88] glow tracking-widest mb-2">
            {project.name}
          </h1>
          <p className="text-[#00ff88]/40 text-xs tracking-widest">
            {project.category} · {project.perm} · {project.size}
          </p>
        </div>

        {/* Image placeholder */}
        <div className="relative h-56 md:h-72 bg-[#060606] border border-[#00ff88]/15 mb-10 flex items-center justify-center overflow-hidden">
          {/* Dot grid bg */}
          <div className="absolute inset-0 dot-grid opacity-30" />
          {/* Corner HUD brackets */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#00ff88]/40" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#00ff88]/40" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#00ff88]/40" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#00ff88]/40" />
          {/* Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-full h-px bg-[#00ff88]/8" />
            <div className="absolute h-full w-px bg-[#00ff88]/8" />
            <div className="w-10 h-10 border border-[#00ff88]/25 rounded-full" />
            <div className="absolute w-3 h-3 border border-[#00ff88]/35 rounded-full" />
          </div>
          {/* Content */}
          <div className="relative z-10 text-center">
            <p className="font-display text-6xl text-[#00ff88]/15 mb-3 tracking-widest">
              {project.type}
            </p>
            {isClassified ? (
              <>
                <p className="text-[#ff3366]/60 text-xs tracking-[0.4em] mb-1">
                  ██████ VISUAL DATA RESTRICTED ██████
                </p>
                <p className="text-[#ff3366]/35 text-[10px] tracking-widest">
                  CLEARANCE REQUIRED · {project.status}
                </p>
              </>
            ) : (
              <p className="text-[#00ff88]/30 text-[10px] tracking-[0.3em]">
                {project.id} · IMAGERY PENDING
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Description */}
          <div>
            <p className="text-[10px] text-[#00ff88]/50 tracking-widest mb-3">
              &gt; MISSION_OVERVIEW
            </p>
            <div className="border border-[#00ff88]/12 bg-[#0d0d0d] p-5">
              <p className="text-[#00ff88]/60 text-xs leading-7">
                {project.longDescription}
              </p>
            </div>

            {/* Back button */}
            <div className="mt-8">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-[10px] border border-[#00ff88]/30 text-[#00ff88]/60 px-5 py-2.5 tracking-[0.2em] hover:border-[#00ff88]/60 hover:text-[#00ff88] transition-all duration-200"
              >
                ← BACK_TO_PROJECTS
              </Link>
            </div>
          </div>

          {/* Specs table */}
          <div>
            <p className="text-[10px] text-[#00ff88]/50 tracking-widest mb-3">
              &gt; TECHNICAL_SPECIFICATIONS
            </p>
            <div className="border border-[#00ff88]/12 bg-[#0d0d0d]">
              {project.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex gap-3 px-4 py-2.5 text-xs ${
                    i !== project.specs.length - 1 ? "border-b border-[#00ff88]/8" : ""
                  }`}
                >
                  <span className="text-[#00ff88]/50 tracking-widest w-36 flex-shrink-0">
                    {spec.label}
                  </span>
                  <span className="text-[#00ff88]/30 flex-shrink-0">:</span>
                  <span
                    className={
                      spec.classified
                        ? "text-[#ff3366]/50 tracking-widest"
                        : "text-[#00ff88]/75"
                    }
                  >
                    {spec.classified ? "██████" : spec.value}
                  </span>
                </div>
              ))}
            </div>

            {isClassified && (
              <div className="mt-4 border border-[#ff3366]/20 bg-[#ff3366]/5 px-4 py-3 text-[10px] text-[#ff3366]/60 tracking-wider leading-5">
                <span className="text-[#ff3366]/40 mr-2">&gt;</span>
                To request access to classified specifications, submit a formal inquiry through official channels with proof of clearance.
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
