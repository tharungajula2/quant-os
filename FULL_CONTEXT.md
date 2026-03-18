# QUANT OS - SYSTEM ARCHITECTURE & CONTEXT
Quant OS is an advanced spatial learning environment and professional quantitative risk knowledge graph. It utilizes a local Markdown-driven Zettelkasten system as a headless CMS to render complex risk knowledge and applied machine learning case studies into a 2D physics graph and interactive grid layout.

## 1. Tech Stack & Core Libraries
- **Next.js (v16.1.6 App Router)**: The core React framework providing server-side rendering, dynamic filesystem routing (`app/notes/[slug]`), and static build optimizations.
- **Tailwind CSS v4 & @tailwindcss/typography**: Used for all baseline styling and precise typography overrides, creating the dark void layout and rendering markdown content akin to Obsidian.
- **Framer Motion**: Powers the hardware-accelerated stagger animations, layout transitions, and fluid card interactions across the grid views.
- **react-force-graph-2d**: A client-side canvas renderer that transforms markdown internal links into a visually interactive 2D neural network physics map.
- **Vercel AI SDK (v6)**: Powers the `VianAIChat` component, utilizing `ToolLoopAgent` and `createAgentUIStreamResponse` for an integrated, context-aware AI chatbot assistant running on Google's `gemini-2.5-flash-lite`.
- **gray-matter**: Parses frontmatter (YAML) from local `.md` files to extract metadata.
- **next-mdx-remote**: The rendering engine converting raw markdown body content into styled React Server Components dynamically.
- **Remark & Rehype Ecosystem (`remark-gfm`, `remark-math`, `rehype-katex`, `rehype-pretty-code`)**: A suite of markdown plugins crucial for parsing complex mathematical LaTeX equations, GitHub-flavored tables, and syntax-highlighted code blocks natively.

## 2. Directory Structure & Data Flow
The system operates completely file-based without an external database, reading from local Markdown structures:
- `brain/`: Contains the entirety of the knowledge base. Files here populate the Universe Grid and the active 2D Physics Graph.
  - **The System Atlas**: `Tharun-Kumar-Gajula.md` acts as the central anchor mapping out the entire system conceptually.
  - **Credit Risk Core (Cluster 02)**: `1_lending_club_credit_risk_masterclass.md` (The central end-to-end framework).
  - **Foundations (Cluster 01)**: `2_regression_analysis_masterclass.md`, `3_machine_learning_masterclass.md`, `4_python_data_analytics_master_cheatsheet.md`.
  - **Applied ML Projects (Cluster 03)**: `5_bank_churn_neural_networks_masterclass.md`, `6_employee_retention_tree_models_masterclass.md`, `7_socio_economic_household_classification_masterclass.md`, `8_twitter_sentiment_nlp_masterclass.md`.
  - **Sandbox (Cluster 04)**: `9_regulatory_foundations_masterclass.md` (Banking compliance and regulatory context).
- `brain/portfolio/`: **REMOVED**. As of the latest architectural pivot, the isolated Portfolio system and its distinct UI views were completely removed to fully integrate all projects and concepts into the singular, cohesive Graph and Grid ecosystem.
- `shelf/temp_files/`: A designated workspace folder added to `.gitignore`. It contains all auxiliary data processing scripts to keep the root directory pristine (e.g., node generation utilities, link fixers, and frontmatter formatters).
- `src/lib/markdown.ts`: The absolute data layer of the app. It specifically exports getters (`getAllNotes()`, `getNoteBySlug()`) which parse markdown, resolve internal wikilinks, and compile the physics engine nodes and edges.
- `src/app/notes/[slug]/page.tsx`: Dynamic server routes that fetch and render the specific markdown payload.

## 3. Core Features & UI/UX Guidelines
- **"Liquid Glass" Aesthetic**: The application follows a strict premium dark "void" constraint (`#050505` background). Interactions rely on deep Gaussian blurs (`backdropFilter: "blur(24px)"`), translucent surface whites (`rgba(255,255,255,0.03)`), ambient node glows, and specular highlights. Be sure to avoid using generic colors, maintaining highly polished micro-interactions and gradients.
- **Branding & Layout**: The main dashboard features the subtitle `"Risk · Quant · Frameworks"`. The entire app was successfully rebranded globally from "Credit Risk OS" to **"Quant OS"**.
- **OS Sync System**: Progress bars embedded in markdown frontmatter (`progress: X`) aggregate up to a single dynamic UI pill ("OS Sync: X%") showing the user's overall grasp of the modeled concepts.
- **Vian AI Terminal (vian.ai)**: A fully functional, password-protected (code: *del26*, case-insensitive) RAG Chat terminal floating in the UI. It features a stunning mobile-responsive 'Liquid Glass' chat interface with pixel-perfect padding, shadow-mapped user/AI bubbles, and a unified pill-shaped input form.
- **Navigation Architecture**: The Application employs a dual-state React toggle allowing seamless pivoting between the Physics **Graph** view and the structured **Grid** view dynamically on the Home Dashboard.

## 4. Strict Engineering Constraints (For Future AI Agents)
- **DO NOT** alter the markdown parsing logic (`lib/markdown.ts`) without explicit permission.
- **DO NOT** use absolute positioning for main layout containers; rely on Flexbox/Grid to prevent overlaps (Exception: The floating Chat UI and Graph Controls are absolutely positioned with strict spacing rules to avoid collision).
- **DO NOT** change the Tailwind v4 base configuration.
- **MARKDOWN RULE**: All mathematical equations (`$$`) and custom data must be appropriately escaped so they do not crash the `next-mdx-remote` parser (utilizing Acorn). E.g., Use standard markdown `$`/`$$` instead of LaTeX escaped brackets `\[ \]`.

## 5. Recent Architectural Victories (The Quant OS Pivot)
- **Global Rebranding**: A complete, seamless global find-and-replace was successfully executed safely transforming the overarching application and codebase into **Quant OS** and the AI agent to **Vian AI**.
- **The Consolidated Masterclass Architecture**: We migrated away from 10 highly fragmented nodes into 8 massive, incredibly detailed Masterclass documents, systematically clustering learning into Data Science Foundations, Applied ML Projects, and the structural Credit Risk Core.
- **MDX Parser Stability**: Identified and permanently resolved a critical crash bug where `next-mdx-remote` and the Acorn AST engine failed to parse raw `\[` LaTeX expressions by aggressively migrating the entire brain vault to strict markdown `$$` block standards.
- **The Portfolio Amputation**: In order to force an integrated topological view of knowledge, the explicitly separated Portfolio UI views, routing, and backend fetching logics (`brain/portfolio`) were intentionally deleted, merging the user's project work directly into the unified graph framework.

## 6. Vian AI Chat Interface Learnings (UI/UX Engineering Triumphs)
Building the `VianAIChat` overlay was a complex exercise in CSS architecture to ensure it integrated seamlessly over the Graph and Grid without breaking layout constraints:
- **Liquid Glass Pixel Perfection**: The glassmorphic chat container achieves its premium aesthetic through a direct `backdropFilter: "blur(24px)"`, an ultra-thin border (`border-white/10`), and a highly translucent dark background.
- **Z-Index Layering**: The `react-force-graph-2d` canvas naturally dominates the DOM. The Chat Toggle Orb must maintain a strictly defined `z-50` via fixed positioning (`bottom-6 right-6`), and the open Chat Window must also sit in a fixed `z-50` overlay.
- **Avoiding Layout Bleed**: Aside from the Chat UI and Graph Controls, the main layout strictly avoids `position: absolute`. Leveraging Tailwind's Flexbox and CSS Grid natively is an absolute requirement for the core dashboard to organically adapt without content bleeding.
