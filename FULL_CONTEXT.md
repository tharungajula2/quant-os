# CREDIT RISK OS - SYSTEM ARCHITECTURE & CONTEXT
Credit Risk OS is an advanced spatial learning environment and professional quantitative risk portfolio showcase. It utilizes a local Markdown-driven Zettelkasten system as a headless CMS to render complex risk knowledge and project case studies into a 2D physics graph and interactive grid layout.

## 1. Tech Stack & Core Libraries
- **Next.js (v16.1.6 App Router)**: The core React framework providing server-side rendering, dynamic filesystem routing (`app/notes/[slug]` and `app/portfolio/[slug]`), and static build optimizations.
- **Tailwind CSS v4 & @tailwindcss/typography**: Used for all baseline styling and precise typography overrides, creating the dark void layout and rendering markdown content akin to Obsidian.
- **Framer Motion**: Powers the hardware-accelerated stagger animations, layout transitions, and fluid card interactions across the grid views.
- **react-force-graph-2d**: A client-side canvas renderer that transforms markdown internal links into a visually interactive 2D neural network physics map.
- **gray-matter**: Parses frontmatter (YAML) from local `.md` files to extract metadata like title, date, summary, tags, and cluster classifications.
- **next-mdx-remote**: The rendering engine converting raw markdown body content into safe, styled React Server Components dynamically.
- **Remark & Rehype Ecosystem (`remark-gfm`, `remark-math`, `rehype-katex`, `rehype-pretty-code`)**: A suite of markdown plugins crucial for parsing complex mathematical LaTeX equations, GitHub-flavored tables, and syntax-highlighted code blocks natively.

## 2. Directory Structure & Data Flow
The system operates completely file-based without an external database, reading from local Markdown structures:
- `brain/`: Contains the core Zettelkasten knowledge notes (e.g., Credit Risk concepts, probability models). Files here populate the Universe Grid and the active 2D Physics Graph.
- `brain/portfolio/`: Strictly separated from the core graph. Contains structured project summaries (exported from Jupyter Notebooks) defining the user's professional portfolio to be rendered exclusively in the Projects view.
- `src/lib/markdown.ts`: The absolute data layer of the app. It specifically exports separate logical getters (`getAllNotes()` vs `getAllProjects()`) ensuring standard notes and portfolio cases never bleed into each other. It also handles the complex `convertWikilinks` logic to map `[[Target]]` syntax into structural HTML routing while protecting mathematical equations.
- `src/app/notes/[slug]/page.tsx` & `src/app/portfolio/[slug]/page.tsx`: Dynamic server routes that fetch and render the specific markdown payload alongside localized metadata and backlinks.

## 3. Core Features & UI/UX Guidelines
- **"Liquid Glass" Aesthetic**: The application follows a strict premium dark "void" constraint (`#050505` background). Interactions rely on `backdropFilter: "blur(24px)"`, translucent surface whites (`rgba(255,255,255,0.03)`), ambient node glows, and specular highlights rather than flat colored boxes to achieve a high-end AI dashboard feel.
- **Navigation Architecture**: The `Sidebar` component acts as a `sticky` desktop navigation column and gracefully collapses into a bottom `MobileHeader` drawer on smaller visports to maximize reading real-estate.
- **The Triptych View System**: `HomeDashboard.tsx` employs a 3-way React state toggle (managed via URL query parameters for history sync) allowing the user to seamlessly pivot between:
  1. *Graph*: The 2D force-directed node map.
  2. *Grid*: A glass-card index of all theoretical notes categorized by cluster.
  3. *Projects*: The discrete, chronological portfolio timeline.
- **Typography Overrides**: The `@tailwindcss/typography` plugin in `globals.css` is heavily mutated to override margin collapses and strict spacing constraints so that Next.js rendering perfectly mirrors the reading experience of raw Obsidian markdown.

## 4. Strict Engineering Constraints (For Future AI Agents)
- **DO NOT** alter the markdown parsing logic (`lib/markdown.ts`) without explicit permission.
- **DO NOT** use absolute positioning for main layout containers; rely on Flexbox/Grid to prevent overlaps.
- **DO NOT** change the Tailwind v4 base configuration.
- **MARKDOWN RULE**: All tables, code blocks, and math equations (`$$`) in the `.md` files must have a blank line above and below them to render correctly via `remark-gfm` and `remark-math`.

## 5. Current State & Next Steps
The core engine, dynamic routing payloads, mathematical interpreters, and user interface are fully stable and performant. The current focus is exclusively restricted to populating the `brain/` and `brain/portfolio/` directories with high-quality markdown content.

## 6. Known Issues & Paused Features
**CROS AI (RAG Chatbot) SDK Constraints**: The local RAG chatbot feature using `ai` and `@ai-sdk/react` is currently **paused** due to complex API versioning conflicts.
- **The Core Issue**: Upgrading to `ai` v5/v6 to support new model providers (like `gemini-2.5-flash`) resulted in breaking type API changes in `@ai-sdk/react` v3.0+. 
- **Hook Changes**: The `useChat` hook no longer exports internal `input`, `handleInputChange`, or `handleSubmit` bindings, forcing manual React state management.
- **Model Spec Errors**: Attempting to use newer Google generative models (v3 specification) on older `ai` SDK cores (v4) throws `AI_UnsupportedModelVersionError`.
- **Future Re-entry**: Any future attempt to rebuild the CROS AI pipeline must ensure strict parity between `ai` (v6+), `@ai-sdk/react`, and `@ai-sdk/google`. The UI (`CrosAIChat.tsx`) must manually handle its input refs, and the backend (`api/chat/route.ts`) must properly run `convertToModelMessages()` on incoming payloads.
