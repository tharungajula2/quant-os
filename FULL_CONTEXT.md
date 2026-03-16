# QUANT OS - SYSTEM ARCHITECTURE & CONTEXT
Quant OS is an advanced spatial learning environment and professional quantitative risk portfolio showcase. It utilizes a local Markdown-driven Zettelkasten system as a headless CMS to render complex risk knowledge and project case studies into a 2D physics graph and interactive grid layout.

## 1. Tech Stack & Core Libraries
- **Next.js (v16.1.6 App Router)**: The core React framework providing server-side rendering, dynamic filesystem routing (`app/notes/[slug]` and `app/portfolio/[slug]`), and static build optimizations.
- **Tailwind CSS v4 & @tailwindcss/typography**: Used for all baseline styling and precise typography overrides, creating the dark void layout and rendering markdown content akin to Obsidian.
- **Framer Motion**: Powers the hardware-accelerated stagger animations, layout transitions, and fluid card interactions across the grid views.
- **react-force-graph-2d**: A client-side canvas renderer that transforms markdown internal links into a visually interactive 2D neural network physics map.
- **Vercel AI SDK (v6)**: Powers the `VianAIChat` component, utilizing `ToolLoopAgent` and `createAgentUIStreamResponse` for an integrated, context-aware AI chatbot assistant running on Google's `gemini-2.5-flash-lite`.
- **gray-matter**: Parses frontmatter (YAML) from local `.md` files to extract metadata.
- **next-mdx-remote**: The rendering engine converting raw markdown body content into styled React Server Components dynamically.
- **Remark & Rehype Ecosystem (`remark-gfm`, `remark-math`, `rehype-katex`, `rehype-pretty-code`)**: A suite of markdown plugins crucial for parsing complex mathematical LaTeX equations, GitHub-flavored tables, and syntax-highlighted code blocks natively.

## 2. Directory Structure & Data Flow
The system operates completely file-based without an external database, reading from local Markdown structures:
- `brain/`: Contains the core Zettelkasten knowledge nodes (e.g., Credit Risk concepts, probability models). Files here populate the Universe Grid and the active 2D Physics Graph.
  - **Current Core Nodes**: `00-quant-os-credit-risk-index.md`, `01-credit-risk-foundations.md`, `02-data-architecture-preprocessing.md`, `03-woe-iv-feature-engineering.md`, `04-logistic-regression-scorecard.md`, `05-tree-based-models.md`, `06-model-validation-metrics.md`, `07-production-monitoring-PSI.md`, `08-deployment-lifecycle.md`, `09-algorithm-selection-matching.md`, `Tharun-Kumar-Gajula.md` (Central Anchor), `quant_os_credit_risk_curriculum.md` (Raw Master Index).
- `brain/portfolio/`: Strictly separated from the core graph. Contains structured project summaries defining the user's professional portfolio to be rendered exclusively in the Projects view under the `Quantitative Portfolio` cluster.
  - **Current Projects (5 total)**: `ANN-Customer-Churn.md`, `HR-Attrition-Modeling.md`, `IRB-Credit-Scorecard.md`, `Socio-Economic-Classifier.md`, `Unstructured-Text-Pipeline.md`.
- `shelf/temp_files/`: A designated workspace folder added to `.gitignore`. It contains all auxiliary data processing scripts to keep the root directory pristine (e.g., node generation utilities, link fixers, and frontmatter formatters).
- `src/lib/markdown.ts`: The absolute data layer of the app. It specifically exports separate logical getters (`getAllNotes()` vs `getAllProjects()`) ensuring standard notes and portfolio cases never bleed into each other. It includes robust `convertWikilinks` logic and filters out raw master files from the graph physics engine entirely if they carry the `graph_exclude: true` flag.
- `src/app/notes/[slug]/page.tsx` & `src/app/portfolio/[slug]/page.tsx`: Dynamic server routes that fetch and render the specific markdown payload.

## 3. Core Features & UI/UX Guidelines
- **"Liquid Glass" Aesthetic**: The application follows a strict premium dark "void" constraint (`#050505` background). Interactions rely on deep Gaussian blurs (`backdropFilter: "blur(24px)"`), translucent surface whites (`rgba(255,255,255,0.03)`), ambient node glows, and specular highlights. Be sure to avoid using generic colors, maintaining highly polished micro-interactions and gradients.
- **Branding & Layout**: The main dashboard features the subtitle `"Risk · Quant · Frameworks"`. The Sidebar identifies the author under the `"Concept Phase"` designation. The entire app was successfully rebranded globally from "Credit Risk OS" to **"Quant OS"**.
- **UI Content Locks**: Advanced topics (`Phase 5: Production Monitoring` and `Phase 6: Deployment Lifecycle`) are rendered in the UI but are **locked**. They display a red `Lock` icon (lucide-react), are unclickable (preventing `router.push`), and show a `🔒` prefix in the force graph. However, they *still* count towards the global OS Sync progress engine.
- **Vian AI Terminal (vian.ai)**: A fully functional, password-protected (code: *del26*, case-insensitive) RAG Chat terminal floating in the UI. It features a stunning mobile-responsive 'Liquid Glass' chat interface with pixel-perfect padding, shadow-mapped user/AI bubbles, and a unified pill-shaped input form.
- **Navigation Architecture**: The `Sidebar` component acts as a `sticky` desktop navigation column and gracefully collapses into a bottom `MobileHeader` drawer on smaller viewports. Fallback categorization defaults strictly to `"Isolated Nodes"`.
- **The Triptych View System**: `HomeDashboard.tsx` employs a 3-way React state toggle (managed via URL query parameters) allowing seamless pivoting between: Graph, Grid, and Projects.
- **Graph Control Synergy**: The Graph view's zoom and reset controls are carefully layered (`z-20`, `bottom-28`) avoiding collision with the floating Vian AI chat toggle dot. The Cluster Color Legend historically occupying the bottom left was **permanently removed** for a cleaner absolute void aesthetic.

## 4. Strict Engineering Constraints (For Future AI Agents)
- **DO NOT** alter the markdown parsing logic (`lib/markdown.ts`) without explicit permission.
- **DO NOT** use absolute positioning for main layout containers; rely on Flexbox/Grid to prevent overlaps (Exception: The floating Chat UI and Graph Controls are absolutely positioned with strict spacing rules to avoid collision).
- **DO NOT** change the Tailwind v4 base configuration.
- **MARKDOWN RULE**: All tables, code blocks, and math equations (`$$`) in the `.md` files must have exactly ONE blank line above and below them to render correctly.

## 5. Recent Architectural Victories (The Quant OS Pivot)
- **Global Rebranding**: A complete, seamless global find-and-replace was successfully executed completely removing all artifacts of "Credit Risk OS" and "CROS", safely transforming the overarching application and codebase into **Quant OS** and the AI agent to **Vian AI**.
- **Curriculum Node Extraction Engine**: We systematically audited a massive master curriculum file (`quant_os_credit_risk_curriculum.md`) and built a flawless Node.js extractor script (`shelf/temp_files/generate_nodes.js`) to securely carve out 10 perfectly formatted `00` to `09` markdown nodes containing all complex LaTeX blocks and standardized frontmatter logic.
- **The "System Atlas" & Graph Exclusion**: The raw `quant_os_credit_risk_curriculum.md` acts as a text master but broke graph visuals by spawning massive numbers of duplicate links. We introduced a `graph_exclude: true` YAML flag securely handled inside `src/lib/markdown.ts`, allowing the file to be present in UI grids ("System Atlas") but totally invisible to the `react-force-graph-2d` layout engine, averting crashes.
- **The Graph's Gravitational Center**: The profile node `Tharun-Kumar-Gajula.md` has been programmatically pinned to the exact mathematical center of the ForceGraph (`x: 0, y: 0`) and rendered entirely white, serving as the permanent anchoring star for the entire portfolio.
- **The Next-Gen Knowledge Journey**: The `cluster` YAML frontmatter properties across all nodes were mapped to cleanly categorize the grid and color-code the 3D map into a strictly disciplined structure:
  1. Phase 1: The Macro Picture
  2. Phase 2: Data Architecture
  3. Phase 3: The Algorithmic Engine
  4. Phase 4: Model Validation
  5. Phase 5: Production Monitoring
  6. Phase 6: Deployment Lifecycle
  - System Atlas (Anchor Pages)
  - Quantitative Portfolio (Local Case Studies)
  - Isolated Nodes (Catch-all)

- **JS Ecosystem Standardization**: Bulk-updating Markdown files uses pure node `fs` JavaScript execution (`shelf/temp_files/generate_nodes.js`). **CRITICAL NOTE FOR FUTURE SESSIONS**: If you ever need to bulk-modify brain markdown files, **DO NOT** use generic terminal commands (`cat`, `sed`, `awk`). **ALWAYS** use dedicated `.js` scripts to handle `---` YAML boundaries and explicit `\n` configurations.

## 6. Vian AI Chat Interface Learnings (UI/UX Engineering Triumphs)
Building the `VianAIChat` overlay was a complex exercise in CSS architecture to ensure it integrated seamlessly over the Graph and Grid without breaking layout constraints:
- **Liquid Glass Pixel Perfection**: The glassmorphic chat container achieves its premium aesthetic through a direct `backdropFilter: "blur(24px)"`, an ultra-thin border (`border-white/10`), and a highly translucent dark background.
- **Z-Index Layering**: The `react-force-graph-2d` canvas naturally dominates the DOM. The Chat Toggle Orb must maintain a strictly defined `z-50` via fixed positioning (`bottom-6 right-6`), and the open Chat Window must also sit in a fixed `z-50` overlay.
- **Avoiding Layout Bleed**: Aside from the Chat UI and Graph Controls, the main layout strictly avoids `position: absolute`. Leveraging Tailwind's Flexbox and CSS Grid natively is an absolute requirement for the core dashboard to organically adapt without content bleeding.

## 7. Critical Active Blocker: Vercel AI SDK v6 vs TypeScript (Chat UI)
**Current Status**: The backend `src/app/api/chat/route.ts` was migrated to the Vercel AI SDK **v6** (`createAgentUIStreamResponse`, `ToolLoopAgent`). However, the frontend `useChat()` hook from the older version of the `@ai-sdk/react` library is catastrophically clashing with the new v6 types causing Next.js production builds (`npm run build`) to throw:
`Type error: Property 'append' does not exist on type 'UseChatHelpers<UIMessage<unknown, UIDataTypes, UITools>>'`

**Next Chat Action Item**:
When resuming AI integration, the very first task MUST BE to definitively resolve the Vercel AI SDK v6 type mismatch in `VianAIChat.tsx`. Do not attempt to style or polish the chat UI until `useChat()` is cleanly importing and mapping messages according to the strict v6 standard.

## 8. Vercel Deployment vs Localhost (The TypeScript Strictness Rule)
**Vercel will silently fail deployments and serve stale code if the Next.js `npm run build` process encounters a TypeScript error.**
- When testing locally via `npm run dev`, Next.js swallows TypeScript errors and renders new files gracefully.
- Vercel triggers a strict production build. If *any* component has a type mismatch, Vercel aborts the deployment without showing a "Broken Page"; it simply refuses to update.
- Always run `npm run build` locally before pushing to GitHub if you are unsure why Vercel isn't updating live changes.
