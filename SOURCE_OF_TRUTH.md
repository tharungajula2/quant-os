# QUANT OS — SOURCE OF TRUTH

This document is the absolute, single source of truth for **Quant OS**. If this entire project were deleted, any software engineer could reconstruct the entire system exactly as it exists today, with zero deviation in behavior, design, or architecture, using only this guide.

---

## 1. PROJECT OVERVIEW
* **Project Name**: Quant OS
* **One-Line Definition**: A high-performance spatial learning environment and quantitative knowledge graph designed for mastering Credit Risk, Financial Engineering, and Data Science through an interactive "Personal Headquarters" dashboard.
* **Target Audience**: Quantitative Risk Analysts, Financial Engineers, Banking Professionals, Quant Founders, and Recruiters seeking high-fidelity technical validation.

---

## 2. THE POINT & VALUE PROPOSITION
* **The Problem**: Quantitative finance and credit risk concepts are highly complex and interconnected (e.g., how Basel III regulatory rules dictate Loss Given Default modeling parameters or Modern Portfolio Theory). Traditional folders, linear lists, or flat documents fail to model these multi-dimensional cognitive relationships, leading to high cognitive load and fragmented learning.
* **The Solution**: Quant OS solves this by translating a raw, flat Markdown Zettelkasten (`brain/` directory) into a 2D physics-based neural map and an interactive clinical grid.
* **The Core Moat**: The **Spatial Physics-MDX Engine**. Unlike static documentation, it parses local Markdown files in real-time to render an interactive HTML5 Canvas network using force-directed physics. Coupled with a strict "Deep Void" clinical aesthetic, it reduces cognitive load, speeds up relational discovery, and hosts an integrated password-locked RAG AI assistant (`Vian AI`) with strict domain boundaries.
* **North Star Metric**: **Spatial Relationship Discovery (SRD)** — The speed at which a user visually identifies and navigates connections between disparate quantitative and risk modeling methodologies.

---

## 3. FULL TECH STACK & EXACT VERSIONS

From `package.json`, the hardware-accelerated stack is locked to:

### Core Framework & Runtime
* **Next.js**: `16.1.6` (App Router, React Server Components)
* **React & React DOM**: `19.2.3` (React 19 Server Components)
* **TypeScript**: `^5.9.3`

### Styling & Aesthetics
* **Tailwind CSS**: `^4.0.0` (Tailwind CSS v4)
* **Tailwind PostCSS Compiler**: `@tailwindcss/postcss ^4.0.0`
* **Tailwind Typography Plugin**: `@tailwindcss/typography ^0.5.19`
* **Vanilla CSS Design Tokens**: Custom deep void specifications

### Visualization Engine
* **react-force-graph-2d**: `^1.29.1` (Physics-based HTML5 Canvas renderer)

### Markdown Parsing & Math Pipeline
* **gray-matter**: `^4.0.3` (Frontmatter extraction)
* **next-mdx-remote**: `^6.0.0` (Dynamic React Component MDX hydration)
* **katex**: `^0.16.38` (Mathematical math layout typography)
* **rehype-katex**: `^7.0.1` (KaTeX AST integration)
* **rehype-pretty-code**: `^0.14.3` (Syntax highlighter parser)
* **remark-breaks**: `^4.0.0` (Markdown newline formatting)
* **remark-gfm**: `^4.0.1` (GitHub Flavored Markdown support)
* **remark-math**: `^6.0.0` (Remark mathematical syntax parsing)
* **shiki**: `^4.0.2` (Visual code highlighting engine)

### AI Core & RAG Pipeline
* **ai**: `^6.0.116` (Vercel AI SDK Core Core)
* **@ai-sdk/google**: `^3.0.43` (Google Gemini integration bridge)
* **@ai-sdk/react**: `^3.0.118` (Vercel AI SDK React hooks)
* **Model**: `gemini-2.5-flash-lite` (via Google Generative AI API)

### Utility Libraries
* **lucide-react**: `^0.577.0` (Icons)
* **clsx**: `^2.1.1` (CSS class joining)
* **tailwind-merge**: `^3.5.0` (Dynamic styling overrides)
* **framer-motion**: `^12.36.0` (Staggered animations and page transitions)

---

## 4. SETUP FROM ZERO (BEGINNER-PROOF)

### Prerequisites
* **Node.js**: Version 20.x or higher (LTS recommended).
* **Package Manager**: `npm` (v10+) or `pnpm` (v8+). Both lockfiles are supported.
* **Git**: Installed locally.
* **Google Gemini API Key**: Clearance for the AI RAG terminal.

### Step 1: Install Dependencies
Run the install command in the project root:
```bash
npm install
# OR
pnpm install
```

### Step 2: Configure Environment Variables
Create a file named `.env.local` in the project root:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```
*(Ensure no spaces around the `=` character).*

### Step 3: Run the Development Server
Execute the Next.js local shell:
```bash
npm run dev
# OR
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Step 4: Run Utility Scripts (Optional)
To normalize metadata and clean wikilinks inside your Markdown vault:
```bash
node fix_dates.js
node fix_links.js
```

### Step 5: Build and Deploy (Production)
To generate the optimized production bundle:
```bash
npm run build
```
To run the production-built server locally:
```bash
npm run start
```
* **Deployment target**: Vercel. Connect the GitHub repository directly. Add `GOOGLE_GENERATIVE_AI_API_KEY` to Vercel's Environment Variables panel.

---

## 5. SYSTEM ARCHITECTURE & DATA FLOW

Quant OS operates on a **headless, file-system database model**. There is no traditional database.

```mermaid
graph TD
    A[Markdown Zettelkasten: brain/*.md] -->|gray-matter| B(lib/markdown.ts)
    A -->|RAG Ingestion| H(api/chat/route.ts)
    
    B -->|getGraphData| C[GraphView.tsx - react-force-graph-2d]
    B -->|getAllNotes| D[UniverseGrid.tsx - Grid View]
    B -->|getNoteBySlug + getBacklinks| E[notes/[slug]/page.tsx - Detail Page]
    
    H -->|Gemini 2.5 Flash Lite + System Instructions| I[VianAIChat.tsx - Password Gate del26]
    
    C -->|Physics Canvas Nodes & Edges| F[HomeDashboard.tsx]
    D -->|Glossy Micro-Animated Cards| F
    E -->|Properties Panel & KaTeX Math Rendering| G[User Client UI]
```

### Key Subsystems & Communication
1. **The Brain Ingestion (`lib/markdown.ts`)**: Scans `brain/` directory, extracts titles, dates, tags, progress, and cluster fields via YAML frontmatter. Builds the graph topology (nodes = files, links = wikilinks).
2. **Dynamic MDX Remote Compiler (`app/notes/[slug]/page.tsx`)**: Compiles raw markdown into rich HTML. Parses math blocks via `rehype-katex` and formats code blocks using `rehype-pretty-code`.
3. **The RAG Router (`app/api/chat/route.ts`)**: Reads all `.md` files at startup. Combines them into a single track context string, formatting a system instruction limit that restricts Gemini strictly to the quantitative portfolio documents.
4. **Graph Interaction Loop (`GraphView.tsx`)**: Renders canvas physics, allowing users to hover over notes to highlight relational paths and double-click to navigate into detail screens.

---

## 6. FOLDER + FILE STRUCTURE

```text
quant-os/
├── .env.local                   # Local environment variables (Git-ignored)
├── .gitignore                   # Standard system ignore configs
├── eslint.config.mjs            # Code linter rules
├── fix_dates.js                 # Automation script: updates dates & sets missing progress
├── fix_links.js                 # Automation script: cleans piped markdown redirect links
├── next-env.d.ts                # Next.js TypeScript declarations
├── next.config.ts               # Custom Next.js execution parameters
├── package.json                 # Standard dependency locks and scripts
├── pnpm-lock.yaml               # PNPM package locks
├── package-lock.json            # NPM package locks
├── postcss.config.mjs           # PostCSS Tailwind preprocessor settings
├── tsconfig.json                # TypeScript compilation and path rules
├── brain/                       # THE KNOWLEDGE ENGINE (Zettelkasten Database)
│   ├── .obsidian/               # Obsidian project configuration
│   ├── other_files/             # Project summary sub-vaults
│   │   └── 14_portfolio_projects_master_summary.md
│   ├── Analytics-Quant-Track-Overview.md               # Master track Map (MOC)
│   ├── 1_lending_club_credit_risk_masterclass.md        # PD, LGD, EAD Credit Modeling
│   ├── 2_regression_analysis_masterclass.md             # Foundations: Regression
│   ├── 3_machine_learning_masterclass.md                # Foundations: Machine Learning
│   ├── 4_python_data_analytics_master_cheatsheet.md     # Python/Data toolkits
│   ├── 5_bank_churn_neural_networks_masterclass.md      # Deep Learning models
│   ├── 6_employee_retention_tree_models_masterclass.md # Tree Ensembles & Random Forests
│   ├── 7_socio_economic_household_classification.md    # Tabular Modeling & XGBoost
│   ├── 8_twitter_sentiment_nlp_masterclass.md           # NLP & Unstructured data
│   ├── 9_regulatory_foundations_masterclass.md          # Banking regulations & Basel III
│   ├── 10_quant_modeling_workflow_master_reference.md   # Model life-cycle standards
│   ├── 11_cartpole_reinforcement_learning_masterclass.md# RL/Q-Learning paradigms
│   ├── 12_antidiabetic_drug_prescription_forecasting.md # Quantitative forecasting
│   └── 13_nifty100_portfolio_optimization_mpt_master.md # Modern Portfolio Theory
├── public/                      # Static Assets
│   ├── favicon.ico              # Browser icon
│   └── ui-showcase.png          # Dashboard screenshots
├── shelf/                       # Archive and legacy helper folders
│   ├── old_masterclass_files/   # Backed-up Markdown notes
│   ├── temp_files/              # Auxiliary scripts & YAML migration code
│   └── prompts_new_context.md   # System rename context records
├── scratch/                     # Active scratch pad
│   └── update_links.js          # Temporary link modification code
└── src/                         # APPLICATION SOURCE LAYER
    ├── app/                     # Next.js App Router Root
    │   ├── layout.tsx           # Global HTML layout wrapper (sidebar & headers)
    │   ├── page.tsx             # Root page containing layout ambient grids
    │   ├── globals.css          # Design tokens & KaTeX/Typography specifications
    │   ├── api/chat/
    │   │   └── route.ts         # Secure Gemini RAG API endpoint
    │   └── notes/[slug]/
    │       └── page.tsx         # Notes visual rendering layer
    ├── components/              # Interface Web Controls
    │   ├── GraphView.tsx        # Dynamic physics graph canvas
    │   ├── HomeDashboard.tsx    # Workspace state manager (Tabs & OS Mastery Sync)
    │   ├── MobileHeader.tsx     # Responsive layout navigation
    │   ├── Sidebar.tsx          # Dynamic search list, sidebar, and drawer controller
    │   ├── UniverseGrid.tsx     # Animated spatial glass card list
    │   └── VianAIChat.tsx       # Floating locked vian.ai RAG interface
    ├── lib/
    │   └── markdown.ts          # Core wikilink converter & schema compiler
    └── types/
        └── react-force-graph-2d.d.ts # Canvas graph typings
```

---

## 7. SYSTEM FEATURES — DEEP DIVE

### 1. Interactive Force-Directed Knowledge Graph
* **File Location**: `src/components/GraphView.tsx`
* **Mechanics**: Implements a 2D D3 force-directed simulation drawing nodes and edges inside HTML5 Canvas.
* **Physics Rules**:
  * Configured with `cooldownTicks={120}`, `d3AlphaDecay={0.02}`, and `d3VelocityDecay={0.3}` to provide a fluid, premium physical settle state.
  * Explicitly restricts the central MOC node (`Analytics-Quant-Track-Overview`) to the exact center using `fx=0` and `fy=0` anchors.
* **Rendering Mechanics**:
  * Normal nodes render with a 4.5px base radius; the center overview node scales to 8px. Hovering expands nodes to 7px and 10px respectively.
  * Applies HSL glow gradients mapped directly to the active cluster category.
  * Paints small permanent text labels directly beneath the canvas nodes. Text dynamically alters in weight (`600` vs `400`) and transparency based on hover states to eliminate background clutter.

### 2. Tabbed spatial UI
* **File Location**: `src/components/HomeDashboard.tsx`
* **Mechanics**: Toggles the display container between three states:
  * **Graph**: Default force graph network view.
  * **Grid**: Complete tile catalog.
  * **Portfolio**: Filtered tile view displaying only `Cluster 03 — Portfolio Projects` for rapid recruiting review.
  * **Overview**: Instant shortcut key mapping directly to the central route `/notes/Analytics-Quant-Track-Overview`.

### 3. Zettelkasten Parser Engine
* **File Location**: `src/lib/markdown.ts`
* **Mechanics**:
  * **Frontmatter Parsing**: Ingests files using `gray-matter`, structuring titles, dates, tags, and reading progress.
  * **Wikilink Conversion**: Uses custom regex replacements to map double-brackets `[[concept]]` or `[[concept|label]]` to Next.js route structures `/notes/concept`.
  * **Math Safety Exclusions**: Splits document strings by `$` and `$$` delimiters first, converting wikilinks only on plain text blocks, protecting LaTeX notation from parser failures.
  * **Backlinks Aggregator**: Runs `getBacklinks()` dynamically, scanning all documents for case-insensitive matches against both file names (slugs) and titles, injecting links dynamically at note footers.

### 4. Obsidian-style Properties Panel & Mastery Progress Sync
* **File Location**: `src/app/notes/[slug]/page.tsx`
* **Mechanics**:
  * At the top of every note detail screen, an Obsidian-themed glass properties container displays: **Cluster** (colored badge matching cluster system), **Date** (fully expanded locale date string), **Tags** (pill tags), and **Incoming Links** (count of backlinks).
  * Implements a **Reading Sync Mastery Bar** inside every note, reading `frontmatter.progress`. It animates on page mount using an HSL gradient track (`linear-gradient(90deg, rgba(34, 211, 238, 0.4), var(--accent), #fff)`).
  * **Cumulative Dashboard Sync**: On the primary dashboard, the average progress (`OS Sync`) is computed in real-time by reducing all frontmatter progress attributes across the active node set, giving a visual representation of track mastery:
    $$\text{OS Sync} = \frac{\sum_{i=1}^N \text{progress}_i}{N}$$

### 5. Vian AI Chat Terminal (Domain-Restricted RAG)
* **File Locations**: `src/components/VianAIChat.tsx`, `src/app/api/chat/route.ts`
* **Mechanics**:
  * **Authentication Security**: Locked out-of-the-box behind a clearance password. Entering password `del26` unlocks the interface.
  * **Ingestion Loop**: The API endpoint reads all `.md` files directly from the `brain/` directory at launch.
  * **RAG Constraints**: Loads all content into a system prompt. The LLM is explicitly instructed:
    > "You are Vian AI, a highly restricted, zero-hallucination RAG agent. You must answer the user's questions strictly and exclusively using the information provided in the knowledge base. If a question is not covered, reply: 'I am highly restricted to the Analytics & Quant Track knowledge base. I cannot answer outside queries.'"
  * **Visual Design**: Renders a floating, premium glassy panel on the bottom-right of the viewport. Features a pulsing online indicator and custom framer-motion bubble animations.

### 6. Math Render Pipeline
* **File Location**: `src/app/notes/[slug]/page.tsx`
* **Mechanics**: Parses MDX math blocks using `remark-math` and `rehype-katex`. The standard KaTeX styling sheet (`katex.min.css`) is imported directly. Mathematical blocks are wrapped inside horizontal-scrolling containers (`.katex-display` with horizontal scroll settings) to prevent styling issues on mobile interfaces.

---

## 8. MATHEMATICAL CONCEPTS & LOGIC INTEGRATED

The quantitative math engines referenced inside the knowledge base `brain/` and evaluated by Vian AI include:

### A. Credit Risk Modeling (Expected Loss Framework)
* **Expected Loss (EL)**: Represents the projected loss value on a lending asset:
  $$EL = PD \times LGD \times EAD$$
  *(where $PD$ is Probability of Default, $LGD$ is Loss Given Default, and $EAD$ is Exposure at Default).*
* **Weight of Evidence (WoE)**: Optimizes feature scaling for Credit Scorecards:
  $$WoE_i = \ln\left(\frac{\text{Proportion of Goods in bin } i}{\text{Proportion of Bads in bin } i}\right)$$
* **Information Value (IV)**: Performs predictive feature selection:
  $$IV = \sum_{i=1}^n (\%Good_i - \%Bad_i) \times WoE_i$$

### B. Modern Portfolio Theory (MPT) & Optimization
* **Log Returns**: Normalizes multi-asset return structures:
  $$R_t = \ln\left(\frac{P_t}{P_{t-1}}\right)$$
* **Portfolio Risk (Variance)**: Measures combined asset variance including covariances:
  $$\sigma_p^2 = w^T \Sigma w$$
  *(where $w$ is the vector of asset weights and $\Sigma$ is the covariance matrix).*
* **Sharpe Ratio**: Represents risk-adjusted return performance:
  $$SR = \frac{R_p - R_f}{\sigma_p}$$

---

## 9. THE DESIGN SYSTEM: "DEEP VOID" CLINICAL AESTHETIC

Quant OS maintains a strict **Deep Void / Analytics Wing** aesthetic designed to eliminate cognitive fatigue:

### Core Colors & Palette
* **True Void Black**: `#050505` (Base wrapper backdrop)
* **Slightly Blue Void**: `#02040c` (Base viewport body)
* **Glass Hull Panels**: `rgba(2, 4, 12, 0.8)` (Consistent, high-contrast dark cards)
* **Cyan Glint Border**: `rgba(34, 211, 238, 0.08)` (Subtle accent details)
* **Electric Accent Cyan**: `#22d3ee` (Design System focal accent)

### Dual-Layer Cyber Grid
The background is built of a custom, stacked linear and radial gradient pattern:
```css
body {
  background-color: #02040c;
  background-image: 
    linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),       /* Macro Grid (64px) */
    linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px),
    linear-gradient(rgba(34, 211, 238, 0.01) 1px, transparent 1px),       /* Micro Grid (16px) */
    linear-gradient(90deg, rgba(34, 211, 238, 0.01) 1px, transparent 1px),
    radial-gradient(circle at 50% 0%, rgba(30, 58, 138, 0.5) 0%, #02040c 75%); /* Ambient Top Glow */
  background-size: 64px 64px, 64px 64px, 16px 16px, 16px 16px, 100% 100%;
}
```

### The 3-Cluster Glow Spectrum
Colors dictate the cognitive grouping of our Zettelkasten files:
1. **Cluster 01 — Overview**: White (`#ffffff` badge, `rgba(255,255,255,0.1)` glowing halo) — Represents system landing coordinates and vision maps.
2. **Cluster 02 — Foundations**: Warm Orange (`#f97316` badge, `rgba(249,115,22,0.1)` glowing halo) — Represents mathematical, regulatory, and theoretical toolkits.
3. **Cluster 03 — Portfolio Projects**: Electric Cyan (`#22d3ee` badge, `rgba(34,211,238,0.1)` glowing halo) — Represents deep end-to-end quantitative portfolio projects.

### Typography & Fonts
* **Global Text**: `Geist Sans` (Next.js font utility).
* **Code Blocks & Status Terms**: `Geist Mono` (Monospaced, clean layouts).
* **Heading Gradients**: Text elements use webkit gradient clips:
  ```css
  .heading-gradient {
    background: linear-gradient(to right, #ffffff, #22d3ee);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ```

---

## 10. STRICT PHILSOPHICAL & ENGINEERING CONSTRAINTS

To prevent interface drift, these **engineering constraints** are strictly enforced:

### Constraint 01: The Nuclear Title Strip
The detail note router `src/app/notes/[slug]/page.tsx` uses custom regex search-and-replace to strip the first H1 header element (`# Heading`) in raw Markdown. This prevents double-headers since the page dynamically generates the page title inside the stylized Obsidian Properties Panel. **Do not manually include secondary main titles on note routes.**

### Constraint 02: MDX & KaTeX Compilation Safety
Raw LaTeX brackets `\[` and `\]` cause compilation and Acorn AST syntax failures in `next-mdx-remote`. All mathematical formulas in the `brain/` directory **MUST** utilize standard `$$` for block and `$` for inline mathematical parameters. Additionally, any `<` symbol followed by a number (e.g. `<0`, `<1`) will trigger JSX compilation crashes. The note detail compiler includes a regex sanitizer to escape these before rendering:
```typescript
const safeContent = rawContent.replace(/<(\d)/g, '< $1');
```

### Constraint 03: Z-Index Hierarchy Discipline
Layers are strictly defined to prevent interface overlap issues:
* `z-0`: Ambient Orbs & Background Cyber-Grid.
* `z-10`: Force-Graph Canvas visualization.
* `z-20`: Grid Container & Navigation Zoom buttons.
* `z-40`: Navigation Sidebar controller.
* `z-[100]`: Secure Vian AI floating panel.

---

## 11. KEY DECISIONS & RATIONALE

* **Headless Markdown (Zettelkasten Database)**: Using local markdown files allows the knowledge base to live in Git, supporting seamless editing via Obsidian or VS Code. It removes the latency, complexity, and maintenance overhead of external databases (PostgreSQL, MongoDB), matching the portfolio's visual static nature.
* **Physics-Based Canvas Graph Engine**: Traditional directory lists fail to convey complex mathematical connections. An interactive force graph provides immediate visual relationships between credit risk models, statistical foundations, and portfolio strategies.
* **Google Gemini 2.5 Flash Lite**: Selected for its lightning-fast speed, low API latency, and outstanding performance with large context windows. RAG queries load the entire context vault on every question, eliminating the complexity of vector databases (Pinecone, pgvector) and embeddings generation scripts.
* **Password clearance lock (`del26`)**: Elevates the interface from a standard dashboard to a highly secure command station, adding an engaging, gamified element to portfolio reviews.

---

## 12. KNOWN ISSUES / GOTCHAS / TODOs

* **MDX Math Errors**: If any equation uses nested curly braces inside math blocks in markdown (e.g., specific LaTeX symbols), `next-mdx-remote` may crash. Always test equations in isolation.
* **No SSR on Graph**: The canvas physics engine depends directly on `window` and browser coordinate calculations. It must be dynamically imported with `ssr: false` to avoid Next.js Server Components build failures.
* **Mobile Graph Zoom**: Dragging and pinching the physics graph on mobile viewports can conflict with global body scrolling. Use the zoom-in, zoom-out, and target-reset buttons on mobile for a smoother experience.
* **ToolLoopAgent Deprecation Warnings**: The Vercel AI SDK `ToolLoopAgent` might emit warning labels in Node.js logs. It operates stably on Next.js 16 and React 19.

---

## 13. REBUILD-FROM-SCRATCH CHECKLIST

Follow this step-by-step guide to recreate this entire system from absolute scratch:

1. **Initialize the Project**:
   ```bash
   npx create-next-app@latest quant-os --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```
2. **Install Core Dependencies**:
   ```bash
   npm install next@16.1.6 react@19.2.3 react-dom@19.2.3 @ai-sdk/google @ai-sdk/react ai framer-motion lucide-react gray-matter next-mdx-remote react-force-graph-2d katex rehype-katex rehype-pretty-code remark-breaks remark-gfm remark-math shiki tailwind-merge clsx @tailwindcss/typography
   ```
3. **Configure Tailwind v4**:
   Update `src/app/globals.css` with `@import "tailwindcss";`, `@plugin "@tailwindcss/typography";`, and paste the custom Deep Void styling tokens, cyber-grid backgrounds, and horizontal scroll constraints for KaTeX blocks.
4. **Build the Markdown Engine**:
   Create `src/lib/markdown.ts`. Implement the gray-matter extractor, wikilink parsing regex (ignoring math blocks), the bi-directional backlink scanner, and the edge/node graph builder.
5. **Create the AI API Route**:
   Create `src/app/api/chat/route.ts`. Implement file scanner logic to load all `brain/*.md` files, compile the track context, and start a secure `ToolLoopAgent` using Vercel AI SDK and Google Gemini.
6. **Build the Core Components**:
   * Create `src/components/GraphView.tsx` with dynamic imports (`ssr: false`), custom canvas painting objects (specular highlights, glowing halos, auto-scaling labels), and view manipulation controls.
   * Create `src/components/UniverseGrid.tsx` to group notes into dynamic columns of glowing cards with individual reading progress bars.
   * Create `src/components/Sidebar.tsx` to handle note indexing, quick search query filtering, and desktop-drawer collapses.
   * Create `src/components/VianAIChat.tsx` to secure the prompt loop behind the clearance password (`del26`) and render the floating chat interface.
   * Create `src/components/HomeDashboard.tsx` to manage tab switches and aggregate cumulative progress.
   * Create `src/components/MobileHeader.tsx` for responsive mobile screens.
7. **Assemble the Router Pages**:
   * Update `src/app/layout.tsx` to wrap the viewport, load Geist fonts, render the sidebar, mobile header, and vian.ai chatbot.
   * Update `src/app/page.tsx` to render structural ambient lights and inject the dashboard component.
   * Create `src/app/notes/[slug]/page.tsx` to manage parameter routing, compile MDX with rehype/remark plugins, and render the Obsidian properties card and Linked Mentions list.
8. **Create the Markdown Vault**:
   Create a root folder named `brain/` and populate it with Markdown notes (including YAML metadata frontmatter: `title`, `date`, `cluster`, `progress`, `tags`, etc.).
9. **Launch and Verify**:
   Add the `.env.local` API key, run `npm run dev`, unlock Vian AI using `del26`, check math formulas rendering, and verify graph physics are working.
