# QUANT OS - SYSTEM ARCHITECTURE & CONTEXT (V2.5)

**Last Updated**: 26 March 2026
**Project Status**: Production Ready / Clinical Design Finalized

Quant OS is a premium spatial learning environment and quantitative financial knowledge graph. It transforms a local Markdown-driven Zettelkasten system into a 2D physics graph and interactive grid layout, optimized for high-performance cognitive focus.

## 1. Tech Stack & Core Libraries
- **Next.js (v16.1.6 App Router)**: Core framework for SSR, dynamic routing, and build optimization.
- **Tailwind CSS v4 & Standard CSS Tokens**: Defines the "Deep Void" system variables.
- **Framer Motion**: Hardware-accelerated transitions and stagger animations.
- **react-force-graph-2d**: Physics-based 2D neural network renderer.
- **Vercel AI SDK (v6)**: Powering Vian AI (Gemini 2.5 Flash Lite) with ToolLoop integration.
- **gray-matter**: Local YAML frontmatter parser.
- **next-mdx-remote**: Dynamic body-to-server-component hydration.
- **Remark/Rehype Suite**: Specialized pipelines for LaTeX (`$$`), GFM tables, and syntax highlighting.

## 2. The Design Language: "Tharun Learning Lab"
- **The Void**: A deep-blue black background (`#02040c`) layered with a **Dual Cyber-Grid** (64px Macro / 16px Micro) and a top-down radial blue glow (50% opacity).
- **Clinical Glassmorphism**: High-blur surfaces (`backdrop-blur-2xl`) with specular cyan borders and `rgba(2, 4, 12, 0.8)` void-matching hulls.
- **The 3-Category Palette**:
  - **Cluster 01 (Profile)**: **Brilliant White** (`#ffffff`).
  - **Cluster 02 (Foundations)**: **Complementary Orange** (`#f97316`). High warm-glow contrast.
  - **Cluster 03 (Portfolio Projects)**: **Design Cyan-Blue** (`#22d3ee`). Synchronized with OS accents.

## 3. Directory Structure & Data Flow
- `brain/`: Knowledge base. 14 core docs across Profile, Foundations, and Projects.
- `src/lib/markdown.ts`: The data layer. Exports `getAllNotes()`, `getNoteBySlug()`, and physics-ready `getGraphData()`.
- `src/app/notes/[slug]/page.tsx`: Dynamic Server Page. Implements "Nuclear" title stripping for layout purity.
- `src/components/VianAIChat.tsx`: Floating AI terminal with a protected RAG loop (Password: *del26*).

## 4. Strict Engineering Constraints
- **NO ABSOLUTE POSITIONS**: Use Flex/Grid for core layout. Only Chat UI and Graph Controls use `fixed` positioning with strict spacing bounds.
- **MDX SAFETY**: All mathematical expressions must use `$$` blocks. Raw `\[` brackets are forbidden to prevent Acorn AST collisions.
- **TITLE PURITY**: Never manually render an H1 (`#`) at the top of a note body; the `NotePage` server component automatically strips the first H1 to avoid redundancy in the clinical layout.

## 5. Architectural Victories (The March 2026 Revamp)
- **The Obsidian Pivot**: Completely synchronized the local Markdown engine with web rendering, ensuring wikilinks (`[[Link]]`) resolve natively without extensions.
- **The Blue-Orange Synergy**: Executed a global palette synchronization, matching Portfolio results with the app's signature Cyan-Blue accent while providing a high-contrast warm glow for Foundations.
- **The Nuclear Title Strip**: Resolved persistent layout clutter by implementing a non-global regex in the Note detail view that strips the first H1 it finds, prioritizing the properties panel for branding.
- **Server Component Compliance**: Stabilized the Next.js runtime by removing all interactive event handlers from the `NotePage` server component, migrating all hover states to 100% pure CSS/Tailwind logic.

## 6. Layout Layering (Z-Index Map)
- `z-0`: The Cyber-Grid Background.
- `z-10`: Graph Canvas / Physics Engine.
- `z-20`: Grid View / Content Cards.
- `z-40`: Navigation Sidebar / Drawer.
- `z-50`: Vian AI Chat Terminal / Floating Control Orbs.

---
*Ground Truth Document - March 2026 Revision*
