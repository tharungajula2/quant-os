# Quant OS — Professional Knowledge Graph & Spatial OS

> **The Clinical-Grade Learning Environment for Quantitative Risk and Financial Engineering.**

Quant OS is a premium, [Next.js 16](https://nextjs.org)-powered spatial knowledge environment designed to map complex quantitative concepts into a beautiful, interactive void. It transforms a local Markdown-driven Obsidian vault into a high-performance **Knowledge Graph** and **Universe Grid**.

![Quant OS UI Showcase](public/ui-showcase.png)

## 🌌 The Design: "Analytics Wing" Aesthetic
Quant OS is built with a "Deep Void" philosophy, prioritizing visual silence, intense focus, and clinical precision:
- **The Void**: A dual-layer Cyber-Grid background (`#02040c`) with macro and micro textures.
- **Electric Accents**: A high-contrast palette featuring **Brilliant White** (Profile), **Design Cyan-Blue** (Portfolio), and **Complementary Orange** (Foundations).
- **Liquid Glass**: Premium glassmorphism with deep Gaussian blurs and specular borders.

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (React Server Components, App Router)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Graph Engine**: `react-force-graph-2d` (Physics-based Knowledge Map)
- **Content**: Local Markdown (Zettelkasten) + `next-mdx-remote`
- **AI Integration**: Vian AI (Google Gemini 2.5 Flash Lite)
- **Animations**: Framer Motion + CSS Transitions

## 📂 Project Structure
- `brain/`: The raw markdown engine (Foundations, Projects, Profile).
- `src/components/`: Premium UI components (GraphView, UniverseGrid, VianAI).
- `src/lib/markdown.ts`: The core relationship parser (Wikilinks, Backlinks).
- `shelf/`: Auxiliary automation and link-fixing utilities.

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env.local` and add your `GOOGLE_GENERATIVE_AI_API_KEY`.

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the OS**:
   Open [http://localhost:3000](http://localhost:3000).

## 🦾 Architecture Ground Truth
For a deep dive into the system logic, markdown parsing rules, and design constraints, refer to:
- [FULL_CONTEXT.md](./FULL_CONTEXT.md)
- [QUANT-ARCHITECTURE.md](./QUANT-ARCHITECTURE.md)

---
*Part of the tharungajula portfolio — May 2026*