# QUANT OS - MASTER PROJECT CONTEXT & ARCHITECTURE (V3.0)

**Wing**: **Analytics & Quant Track** (A specialized technical branch of the tharungajula portfolio)
**Status**: Production Ready / Clinical-Grade Quantitative Learning OS

---

## 1. VISION & MISSION
Quant OS is a high-performance **spatial learning environment** and **quantitative knowledge graph**. It is designed to transform a local Markdown-driven Zettelkasten vault into a 2D physics-based neural map and an interactive clinical grid layout.

The goal is to provide a "Personal Headquarters" for managing complex quantitative concepts at the intersection of **Credit Risk, Financial Engineering, and Data Science**. It adheres to a philosophy of **Visual Silence and Clinical Precision**.

---

## 2. THE KNOWLEDGE ARCHITECTURE (The 14 Core Pillars)
The project is built over a "Brain" directory (`brain/`) containing 14+ master markdown files, categorized into a strict **3-Cluster System**:

### Cluster 01 — Overview (Clinical White Glow)
- **[[Analytics-Quant-Track-Overview]]**: The master map and mission of this quantitative track.

### Cluster 02 — Foundations (Warm Orange Glow)
- **[[2_regression_analysis_masterclass]]**: Statistical foundations and regression math.
- **[[3_machine_learning_masterclass]]**: Broad machine learning landscape.
- **[[4_python_data_analytics_master_cheatsheet]]**: Technical syntax and toolkit reference.
- **[[9_regulatory_foundations_masterclass]]**: Banking regulations and governance.
- **[[10_quant_modeling_workflow_master_reference]]**: Quantitative modeling life-cycle standards.

### Cluster 03 — Portfolio Projects (Design Cyan-Blue Glow)
- **[[1_lending_club_credit_risk_masterclass]]**: End-to-end risk modeling (PD, LGD, EAD).
- **[[5_bank_churn_neural_networks_masterclass]]**: Deep learning and classification.
- **[[6_employee_retention_tree_models_masterclass]]**: Tree-based ensembles and random forests.
- **[[7_socio_economic_household_classification_masterclass]]**: Large-scale tabular modeling (XGBoost).
- **[[8_twitter_sentiment_nlp_masterclass]]**: Natural Language Processing and unstructured data.
- **[[11_cartpole_reinforcement_learning_masterclass]]**: Advanced AI/RL concepts.
- **[[12_antidiabetic_drug_prescription_forecasting_masterclass]]**: Quantitative forecasting.
- **[[13_nifty100_portfolio_optimization_mpt_masterclass]]**: Modern Portfolio Theory (MPT).

---

## 3. TECHNICAL STACK (v2026 DEEP DIVE)
Quant OS is built with cutting-edge, hardware-accelerated web technologies:

- **Core Framework**: **Next.js 16.1.6** (App Router, React 19 Server Components).
- **Styling**: **Tailwind CSS v4** + Vanilla CSS Design Tokens for the "Deep Void" system.
- **Graph Engine**: **react-force-graph-2d** (Physics-based HTML5 Canvas renderer).
- **AI Core**: **Vian AI** — Powered by **Google Gemini 2.5 Flash Lite** (via Vercel AI SDK v6).
- **Content Engine**: 
    - **gray-matter**: Parsing YAML frontmatter.
    - **next-mdx-remote**: Rendering dynamic markdown with React Component hydration.
    - **Remark/Rehype**: Specialized plugins for **KaTeX** (`remark-math`, `rehype-katex`) and syntax highlighting (`shiki`).
- **Animations**: **Framer Motion 12** for staggered children and liquid transitions.

---

## 4. THE DESIGN SYSTEM: "DEEP VOID" CLINICAL AESTHETIC
Quant OS follows a zero-compromise design language optimized for cognitive focus:

- **The Background**: `#050505` (True Black Void) or `#02040c` (Slightly Blue Void).
- **The Cyber-Grid**: A dual-layered CSS grid:
    - **Macro**: 64px intervals for structural alignment.
    - **Micro**: 16px sub-grid for fine detail.
- **The 3-Palette Spectrum**:
    - **Cluster 01**: Brilliant White (`#ffffff`) — Pure, authoritative.
    - **Cluster 02**: Complementary Orange (`#f97316`) — Warm, foundational importance.
    - **Cluster 03**: Design Cyan-Blue (`#22d3ee`) — Sharp, execution-oriented.
- **Liquid Glassmorphism**: High-intensity blur (`backdrop-blur-2xl`) with specular cyan borders and void-matching hulls.

---

## 5. DATA ENGINE & AI INTEGRATION
The system is "Headless", meaning it reads raw `.md` files and turns them into a graph API.

### `lib/markdown.ts`: The Relational Engine
- **Wikilink Conversion**: Automatically converts `[[Link Name]]` or `[[Slug|Display]]` into semantic Next.js `<Link>` components.
- **Bi-directional Backlinks**: Scans the entire vault to build an automated list of "Notes that link here" at the bottom of every page.
- **Graph Data Generation**: Maps nodes (notes) and edges (links) for the Force Graph physics Engine.

### `VianAIChat.tsx`: The RAG Terminal
- **Password Protection**: Locked with clearance code `del26`.
- **RAG Capability**: Uses the tool-loop to reference the local `brain/` context when answering queries.
- **UI**: Floating liquid-glass terminal with hardware-accelerated toggle animations.

---

## 6. STRICT ENGINEERING CONSTRAINTS
To maintain clinical stability, the following rules MUST be followed:

### 🦾 Constraint 01: The Nuclear Title Strip
The `NotePage` server component (`src/app/notes/[slug]/page.tsx`) uses a regex-based **Nuclear Title Strip**. It aggressively removes the first H1 (`# Title`) found in the markdown body to prevent duplicate titles in the OS header. **Do not manually render H1s in pages.**

### 🦾 Constraint 02: MDX & KaTeX Safety
Raw LaTeX brackets `\[` are strictly forbidden as they cause Acorn AST parsing errors in `next-mdx-remote`. All mathematical expressions MUST use `$$` (block) or `$` (inline) syntax.

### 🦾 Constraint 03: Z-Index Hierarchy
- `z-0`: Background & Cyber-Grid.
- `z-10`: Force-Graph Canvas.
- `z-20`: Universe Grid / Content Cards.
- `z-40`: Sidebar / Navigation.
- `z-50`: Vian AI Chat Terminal / Floating Control Orbs.

---

## 7. REPLICATION & SETUP GUIDE
Follow these steps to replicate the full environment from scratch:

1.  **Clone / Initialize**: Ensure you have a Node.js 20+ environment.
2.  **Dependencies**: `npm install`. (Core: Next.js 16, React 19, Tailwind 4, AI SDK).
3.  **Environment Variables**: Create `.env.local`:
    ```env
    GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
    ```
4.  **Content Migration**: Create a `brain/` directory at the root and populate it with `.md` files containing YAML frontmatter (`title`, `cluster`, `progress`).
5.  **Run Development Shell**: `npm run dev`.
6.  **Clinical Verification**:
    - Ensure the Cyber-Grid background renders with radial blue glow.
    - Confirm the Force Graph nodes move with physics and respond to hover.
    - Enter `del26` into Vian AI to unlock the terminal.

---

## 8. FILE STRUCTURE OVERVIEW
- `brain/`: The raw knowledge engine (The Zettelkasten).
- `src/app/`: Next.js App Router root.
    - `notes/[slug]/`: Dynamic markdown detail views.
- `src/components/`:
    - `GraphView.tsx`: 2D Neural physics map.
    - `UniverseGrid.tsx`: Spatial 2D knowledge organization.
    - `Sidebar.tsx`: Cluster-sorted navigation controller.
    - `VianAIChat.tsx`: Floating AI terminal.
- `src/lib/markdown.ts`: The relational data parser for Wikilinks and Backlinks.

---
*Part of the tharungajula portfolio — GROUND TRUTH MASTER V3.1 (May 2026)*
*Refined for Track-based Exploratory Narrative.*
