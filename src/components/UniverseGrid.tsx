"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Lock } from "lucide-react";
import type { NoteListItem } from "@/lib/markdown";

interface UniverseGridProps {
  notes: NoteListItem[];
}

/* ── Cluster palette: Distinct Clinical Spectrum ── */
const PALETTE: Record<string, { badge: string; glowColor: string }> = {
  "01 — Overview": { 
    badge: "text-white bg-white/10 border-white/20", 
    glowColor: "rgba(255, 255, 255, 0.1)" 
  },
  "02 — Foundations": { 
    badge: "text-orange-300 bg-orange-500/10 border-orange-400/25", 
    glowColor: "rgba(249, 115, 22, 0.1)" 
  },
  "03 — Portfolio Projects": { 
    badge: "text-cyan-300 bg-cyan-500/10 border-cyan-400/25", 
    glowColor: "rgba(34, 211, 238, 0.1)" 
  },
  "Others": { 
    badge: "text-slate-400 bg-slate-500/10 border-slate-400/20", 
    glowColor: "rgba(148, 163, 184, 0.05)" 
  },
};
const DEFAULT = { 
  badge: "text-cyan-300/80 bg-cyan-500/5 border-cyan-400/20", 
  glowColor: "rgba(34, 211, 238, 0.05)" 
};

function palette(cluster?: string) {
  if (!cluster) return DEFAULT;
  return PALETTE[cluster] ?? DEFAULT;
}

/* ── Stagger variants ── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function UniverseGrid({ notes }: UniverseGridProps) {
  if (notes.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "rgba(240,240,245,0.35)", marginTop: "4rem", fontSize: "0.875rem" }}>
        No notes found in <code>brain/</code>. Create a Markdown file to get started.
      </p>
    );
  }

  const sortedNotes = [...notes].sort((a, b) => {
    const clusterA = a.frontmatter.cluster || "Others";
    const clusterB = b.frontmatter.cluster || "Others";
    
    if (clusterA !== clusterB) {
      if (clusterA === "Others") return 1;
      if (clusterB === "Others") return -1;
      return clusterA.localeCompare(clusterB);
    }
    
    const titleA = a.frontmatter.title || a.slug;
    const titleB = b.frontmatter.title || b.slug;
    return titleA.localeCompare(titleB);
  });

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      style={{
        listStyle: "none",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1.25rem",
        padding: 0,
        margin: 0,
        width: "100%",
      }}
    >
      {sortedNotes.map((note) => {
        const { badge, glowColor } = palette(note.frontmatter.cluster);

        return (
          <motion.li key={note.slug} variants={card} style={{ minWidth: 0 }}>
            <Link 
              href={`/notes/${note.slug}`} 
              style={{ textDecoration: "none", display: "block", height: "100%" }}
            >

              {/* ── Glass Card ── */}
              <div
                className="group glass-card"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "190px",
                  height: "100%",
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  cursor: "pointer",
                  opacity: 1,
                  background: "rgba(2, 4, 12, 0.8)", /* Darker, more consistent with void */
                  border: "1px solid rgba(34, 211, 238, 0.05)",
                  transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(34, 211, 238, 0.05)";
                  el.style.borderColor = "rgba(34, 211, 238, 0.3)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(2, 4, 12, 0.8)";
                  el.style.borderColor = "rgba(34, 211, 238, 0.05)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Cluster-tinted glow inside card */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse at top left, ${glowColor} 0%, transparent 55%)`,
                    pointerEvents: "none",
                    borderRadius: "1.5rem",
                  }}
                />

                {/* Top specular edge */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 0, left: "10%", right: "10%",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
                    pointerEvents: "none",
                  }}
                />

                {/* ── Top row: badge + arrow ── */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.875rem", position: "relative" }}>
                  {note.frontmatter.cluster ? (
                    <span
                      className={[
                        "inline-flex items-center px-2.5 py-0.5 rounded-full border",
                        "text-[10px] font-bold uppercase tracking-[0.18em]",
                        badge,
                      ].join(" ")}
                    >
                      {note.frontmatter.cluster}
                    </span>
                  ) : <span />}

                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1.1rem", lineHeight: 1, transition: "color 0.25s" }} aria-hidden>↗</span>
                </div>

                {/* ── Title ── */}
                <h2
                  style={{
                    position: "relative",
                    fontSize: "1rem",
                    fontWeight: 600,
                    lineHeight: 1.45,
                    color: "rgba(255,255,255,0.82)",
                    margin: 0,
                  }}
                >
                  {note.frontmatter.title ?? note.slug}
                </h2>

                {/* ── Spacer: pushes footer to bottom ── */}
                <div style={{ flex: 1 }} />
                
                {/* ── Progress Bar ── */}
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ fontSize: "0.6rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Reading Sync</span>
                    <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{note.frontmatter.progress || 0}%</span>
                  </div>
                  <div style={{ height: "4px", width: "100%", background: "rgba(34, 211, 238, 0.05)", borderRadius: "2px", overflow: "hidden" }}>
                    <div 
                      style={{ 
                        height: "100%", 
                        width: `${note.frontmatter.progress || 0}%`, 
                        background: "linear-gradient(90deg, rgba(34, 211, 238, 0.3), var(--accent))", 
                        boxShadow: "0 0 12px var(--accent-glow)",
                        transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                      }} 
                    />
                  </div>
                </div>

                {/* ── Footer row ── */}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                    marginTop: "1.25rem",
                    paddingTop: "0.875rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span style={{ fontSize: "0.7rem", color: "rgba(240,240,245,0.3)", lineHeight: 1 }}>
                    {note.frontmatter.date
                      ? new Date(note.frontmatter.date).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                        })
                      : "—"}
                  </span>
                  <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "rgba(240,240,245,0.18)", lineHeight: 1 }}>
                    {note.slug}
                  </span>
                </div>

              </div>
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
