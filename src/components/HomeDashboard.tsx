"use client";

import { useState, useEffect } from "react";
import { LayoutGrid, Network, Briefcase, Compass } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import UniverseGrid from "@/components/UniverseGrid";
import GraphView from "@/components/GraphView";
import type { NoteListItem, GraphData } from "@/lib/markdown";

interface HomeDashboardProps {
  notes: NoteListItem[];
  graphData: GraphData;
}

export default function HomeDashboard({
  notes,
  graphData,
}: HomeDashboardProps) {
  const [view, setView] = useState<"grid" | "graph" | "portfolio">("graph");
  const searchParams = useSearchParams();

  // ── Sync View State from URL Query ──
  useEffect(() => {
    const urlView = searchParams.get("view");

  }, [searchParams]);

  return (
    <div className="flex flex-col w-full" style={{ minHeight: "85vh" }}>
      {/* ── Top Bar: Title + Toggle ── */}
      <div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 px-4 pt-8 pb-8"
      >
        {/* Branding */}
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--accent)",
              opacity: 0.5,
              marginBottom: "0.4rem",
            }}
          >
            Risk · Quant · Notes
          </p>
          <h1
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#fff",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span className="heading-gradient">Quant OS</span>
            
            {/* ── OS Sync Mastery Pill ── */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.25rem 0.75rem",
                borderRadius: "99px",
                background: "rgba(34, 211, 238, 0.1)",
                border: "1px solid rgba(34, 211, 238, 0.2)",
                boxShadow: "0 0 12px rgba(34, 211, 238, 0.15)",
                transform: "translateY(-2px)",
              }}
            >
              {/* Pulsing Dot */}
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 8px var(--accent)",
                  animation: "pulse-cyan 2s infinite ease-in-out",
                }}
              />
              <style>{`
                @keyframes pulse-cyan {
                  0%   { opacity: 0.5; transform: scale(0.9); }
                  50%  { opacity: 1; transform: scale(1.2); }
                  100% { opacity: 0.5; transform: scale(0.9); }
                }
              `}</style>
              
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                }}
              >
                OS Sync: {notes.length > 0 ? Math.round(notes.reduce((acc, n) => acc + (n.frontmatter.progress || 0), 0) / notes.length) : 0}%
              </span>
            </div>
          </h1>
          <p
            style={{
              marginTop: "0.4rem",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.35)",
              fontWeight: 500,
            }}
          >
            A living knowledge graph.{" "}
            <span style={{ color: "rgba(255,255,255,0.55)" }}>
              {notes.length} nodes indexed.
            </span>
          </p>
        </div>

        {/* View Toggle Pills */}
        <div
          style={{
            display: "flex",
            gap: "0.25rem",
            padding: "0.25rem",
            borderRadius: "0.75rem",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            alignSelf: "flex-start",
          }}
        >
          <button
            onClick={() => setView("grid")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.85rem",
              borderRadius: "0.55rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background:
                view === "grid"
                  ? "rgba(255,255,255,0.1)"
                  : "transparent",
              color:
                view === "grid"
                  ? "#fff"
                  : "rgba(255,255,255,0.3)",
            }}
          >
            <LayoutGrid size={14} />
            Grid
          </button>
          <button
            onClick={() => setView("graph")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.85rem",
              borderRadius: "0.55rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background:
                view === "graph"
                  ? "rgba(255,255,255,0.1)"
                  : "transparent",
              color:
                view === "graph"
                  ? "#fff"
                  : "rgba(255,255,255,0.3)",
            }}
          >
            <Network size={14} />
            Graph
          </button>
          <button
            onClick={() => setView("portfolio")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.85rem",
              borderRadius: "0.55rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background:
                view === "portfolio"
                  ? "rgba(34, 211, 238, 0.12)"
                  : "transparent",
              color:
                view === "portfolio"
                  ? "var(--accent)"
                  : "rgba(255,255,255,0.3)",
            }}
          >
            <Briefcase size={14} />
            Portfolio
          </button>


          <div style={{ width: "1px", background: "rgba(255,255,255,0.1)", margin: "0.25rem", alignSelf: "stretch" }} />

          <Link
            href="/notes/Analytics-Quant-Track-Overview"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.85rem",
              borderRadius: "0.55rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: "transparent",
              color: "rgba(255,255,255,0.3)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.3)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <Compass size={14} />
            Overview
          </Link>
        </div>
      </div>

      {/* ── Content Area ── */}
      <div
        className="flex-1 w-full relative overflow-hidden rounded-2xl mx-auto glass-card"
        style={{
          border: "1px solid var(--border)",
          background: "rgba(2, 4, 10, 0.4)",
          minHeight: "75vh",
        }}
      >
        {view === "grid" ? (
          <div
            className="w-full h-full overflow-y-auto p-4"
            style={{ minHeight: "75vh" }}
          >
            <UniverseGrid notes={notes} />
          </div>
        ) : view === "portfolio" ? (
          <div
            className="w-full h-full overflow-y-auto p-4"
            style={{ minHeight: "75vh" }}
          >
            <UniverseGrid notes={notes.filter(n => n.frontmatter.cluster === "03 — Portfolio Projects")} />
          </div>
        ) : (
          <div style={{ height: "75vh", width: "100%" }}>
            <GraphView graphData={graphData} />
          </div>
        )}
      </div>
    </div>
  );
}
