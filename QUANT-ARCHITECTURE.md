# Quant OS - Architecture & Context

**Project Name**: Quant OS
**Phase**: Production Ready / Clinical Design Finalized

## Tech Stack
- **Framework**: Next.js 16 (React Server Components, App Router)
- **Styling**: Tailwind CSS v4, Custom CSS Tokens
- **Visualization**: `react-force-graph-2d` (HTML5 Canvas Physics Map)
- **Markdown Data Layer**: `gray-matter`, `next-mdx-remote`, `remark-math`, `remark-gfm`
- **AI Engine**: Vian AI (Gemini 2.5 Flash Lite)

## Core System Architecture

Quant OS is a high-performance, headless knowledge-graph interface built over a local Markdown Zettelkasten. It serves as a professional OS for mapping quantitative risk and finance mastery.

### 1. The Brain (Database)
The `brain/` directory is the sole source of truth:
- **YAML Frontmatter**: Controls the "OS Sync" progress bars and cluster categorization.
- **Wikilinks**: Native `[[Link]]` parsing for seamless graph connectivity.
- **Cluster System**: 
  - 01 — Profile (Core)
  - 02 — Foundations (Warm Orange Glow)
  - 03 — Portfolio Projects (Cool Cyan Glow)

### 2. The Design: "Deep Void"
The application adheres to a strict "Tharun Learning Lab" clinical aesthetic:
- **The Hull**: Deeper void background (`#02040c`).
- **Cyber-Grid**: Dual-layer Macro/Micro grid textures with radial blue ambient lighting.
- **Liquid Glass**: Advanced glassmorphism (`backdrop-blur-2xl`, `border-white/10`).
- **Nuclear Title Strip**: The `NotePage` server component aggressively strips the first H1 in any markdown file, ensuring the clinical branded header remains the single source of truth.

### 3. Key Subsystems
- **`lib/markdown.ts`**: The backbone. Generates the relational graph data and handles bi-directional backlinks.
- **`Sidebar.tsx`**: Dynamic navigation controller that clusters nodes and handles desktop-only flex shrinkage.
- **`VianAIChat.tsx`**: Floating RAG terminal with password-protected logic (`del26`) and stunning liquid-glass UI.

## Purpose of this File
**DO NOT DELETE.**
This document is the absolute ground truth for the application's structure. It defines the layout constraints, CSS design tokens, and data models required for consistent system expansion.

---
*Ground Truth Architectural Save State — 26 March 2026*
