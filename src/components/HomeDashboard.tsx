"use client";

import { useState } from "react";
import { LayoutGrid, Network } from "lucide-react";
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
  const [view, setView] = useState<"grid" | "graph">("graph");

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
              color: "rgba(255,255,255,0.25)",
              marginBottom: "0.4rem",
            }}
          >
            Knowledge · Risk · Intelligence
          </p>
          <h1
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#fff",
              margin: 0,
            }}
          >
            Credit Risk OS
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
        </div>
      </div>

      {/* ── Content Area ── */}
      <div
        className="flex-1 w-full relative overflow-hidden rounded-2xl mx-auto"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(5,5,5,0.3)",
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
        ) : (
          <div style={{ height: "75vh", width: "100%" }}>
            <GraphView graphData={graphData} />
          </div>
        )}
      </div>
    </div>
  );
}
