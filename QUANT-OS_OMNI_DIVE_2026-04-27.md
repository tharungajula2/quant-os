# QUANT-OS OMNI DIVE (2026-04-27)

## 1. Executive Core Identity & Moat
**What is this project?**  
Quant OS is a high-performance **spatial learning environment** and **quantitative knowledge graph** designed for mastering Credit Risk, Financial Engineering, and Data Science through a "Personal Headquarters" interface.

**What is the core thesis and the specific "Moat"?**  
*   **Thesis**: Cognitive mastery of quantitative fields requires a "Deep Void" for focus and a "Neural Map" for relationship discovery.
*   **Moat**: The **Spatial Physics-MDX Engine**. Unlike static documentation, Quant OS transforms a flat Markdown Zettelkasten into a 2D physics-based neural map. Its "Clinical Precision" aesthetic (True Black #050505 background) is mathematically optimized to reduce cognitive load, while its "Headless" architecture allows for clinical-grade data ingestion without legacy noise.

**What is the North Star Metric?**  
**Spatial Relationship Discovery (SRD)**: Measuring the speed at which a user identifies a correlation between disparate risk factors (e.g., connecting Basel III regulatory rules to LGD modeling outcomes) via the interactive force-graph.

### The Knowledge Architecture (The 14 Core Pillars)
The system is built on a strict **3-Cluster System** encompassing 14 master modules:
*   **Cluster 01 — Profile (Clinical White)**:
    *   [[Tharun-Kumar-Gajula]]: Master vision and professional map.
*   **Cluster 02 — Foundations (Warm Orange)**:
    *   [[2_regression_analysis_masterclass]]: Statistical foundations.
    *   [[3_machine_learning_masterclass]]: ML landscape.
    *   [[4_python_data_analytics_master_cheatsheet]]: Technical toolkit.
    *   [[9_regulatory_foundations_masterclass]]: Banking governance/regulations.
    *   [[10_quant_modeling_workflow_master_reference]]: Modeling life-cycle standards.
*   **Cluster 03 — Portfolio Projects (Design Cyan-Blue)**:
    *   [[1_lending_club_credit_risk_masterclass]]: End-to-end PD/LGD/EAD modeling.
    *   [[5_bank_churn_neural_networks_masterclass]]: Deep learning/classification.
    *   [[6_employee_retention_tree_models_masterclass]]: Tree ensembles/Random Forests.
    *   [[7_socio_economic_household_classification_masterclass]]: XGBoost tabular modeling.
    *   [[8_twitter_sentiment_nlp_masterclass]]: NLP & unstructured data.
    *   [[11_cartpole_reinforcement_learning_masterclass]]: Reinforcement Learning.
    *   [[12_antidiabetic_drug_prescription_forecasting_masterclass]]: Quantitative forecasting.
    *   [[13_nifty100_portfolio_optimization_mpt_masterclass]]: Modern Portfolio Theory.

---

## 2. Technical Architecture & Stack
*   **Frontend Framework**: Next.js 16.1.6 (App Router, React 19 Server Components).
*   **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens ("Deep Void" Design System).
*   **Visualization Engine**: `react-force-graph-2d` (Physics-based HTML5 Canvas renderer).
*   **Data Layer**: "Headless" Markdown Engine using `gray-matter` (YAML frontmatter parsing) and `next-mdx-remote` (React hydration).
*   **AI Integration**: **Vian AI** (Gemini 2.5 Flash Lite) via Vercel AI SDK v6, implementing a secure RAG (Retrieval-Augmented Generation) loop over the `brain/` directory.
*   **Mathematical Rendering**: Specialized Remark/Rehype pipeline for **KaTeX** support (`remark-math`, `rehype-katex`).
*   **Animations**: Framer Motion 12 for liquid transitions and staggered child components.

---

## 3. The Math, Algorithm, & Core Logic
Quant OS is built on rigorous quantitative frameworks extracted from its `brain/` masterclasses:

### A. Credit Risk Modeling (PD/LGD/EAD)
*   **Expected Loss (EL)**: The fundamental banking equation:
    $$EL = PD \times LGD \times EAD$$
*   **Weight of Evidence (WoE)**: Used for scorecard binning to stabilize logistic regression:
    $$WoE_i = \ln\left(\frac{\text{Proportion of Goods in bin } i}{\text{Proportion of Bads in bin } i}\right)$$
    *   *Decision Logic*: Positive WoE indicates a "Safer" bin; Negative WoE indicates a "Riskier" bin.
*   **Information Value (IV)**: Used for feature selection:
    $$IV = \sum_{i=1}^n (\%Good_i - \%Bad_i) \times WoE_i$$

### B. Modern Portfolio Theory (MPT) & Optimization
*   **Log Returns**: Used for asset comparability:
    $$R_t = \ln\left(\frac{P_t}{P_{t-1}}\right)$$
*   **Portfolio Risk (Variance)**:
    $$\sigma_p^2 = w^T \Sigma w$$
    *(where $w$ is the weight vector and $\Sigma$ is the covariance matrix).*
*   **Sharpe Ratio (Optimized)**:
    $$SR = \frac{R_p - R_f}{\sigma_p}$$
    *(Note: Prototype uses a simplified $R_p/\sigma_p$ score for Monte Carlo simulations).*

### C. Graph Physics Logic
*   **Force-Directed Layout**: Implements **Many-Body Charge Repulsion** and **Center Forces** to prevent node overlap and ensure visual clarity of the knowledge clusters.

---

## 4. Psychology, Domain Reality & Target User
*   **Specific Target User**: Banking professionals, Risk Analysts, and Quant Founders who manage massive, interconnected information sets that traditional folders cannot represent.
*   **Psychological Framework**:
    *   **Visual Silence**: The background is locked to `#050505` (True Black) to eliminate light pollution and focus the eye on the data.
    *   **Clinical Glassmorphism**: Use of `backdrop-blur-2xl` and specular cyan borders creates a sense of "Clean Room" isolation, signaling to the brain that it is in a deep-work state.
    *   **Clustering**: Information is color-coded into 3 distinct "Glow Clusters" (White: Profile, Orange: Foundations, Cyan: Projects) to leverage pre-attentive processing.

---

## 5. Philosophical Constraints (The Red Lines)
*   **Constraint 01: Nuclear Title Strip**: The system aggressively strips the first H1 found in markdown files via regex to prevent visual redundancy with the OS header.
*   **Constraint 02: MDX/LaTeX Safety**: Raw LaTeX brackets `\[` are strictly forbidden; the system enforces `$$` (block) or `$` (inline) syntax to prevent Acorn AST parsing failures.
*   **Constraint 03: Z-Index Discipline**: Strict hierarchy is maintained (z-0: Grid, z-10: Graph, z-50: AI Terminal) to ensure spatial integrity.
*   **Constraint 04: AI Gatekeeping**: Vian AI is locked behind a clearance code (`del26`), enforcing the idea that the OS is a secure, professional environment.

---

## 6. Core Workflows & UX Signal
*   **The Primary Workflow**:
    1.  **Ingestion**: Raw Markdown written in Obsidian/VSCode.
    2.  **Visualization**: Nodes dynamically appear on the Force Graph, showing links via Wikilinks (`[[Link]]`).
    3.  **Exploration**: User hovers over nodes to trigger physics reactions; clicks to enter "Clinical Grid" detail views.
    4.  **Inquiry**: Floating Vian AI terminal (RAG) is summoned to query the vault context.
*   **Visual Theme**: "Deep Void" / "Clinical Neon".
*   **UX Vibe**: "Mission Control Center". High-contrast, high-performance, and extremely responsive.

---

## 7. Business Model & External Integrations
*   **Monetization Strategy**: Professional Tier (Consulting-grade tool for banking and risk advisory).
*   **AI Integration**: 
    *   **Engine**: Google Gemini 2.5 Flash Lite.
    *   **Prompt Logic**: System prompt enforces "Clinical Precision" and restricts answers to the provided context in `brain/` unless specified.
*   **External APIs**: Yahoo Finance integration (via tickers) for real-time quantitative portfolio analysis.

---

## 8. Builder Proof Points
Based on the full extraction of this repository, Tharun Gajula undeniably possesses:
1.  **Full-Stack Engineering Mastery**: Ability to build hardware-accelerated, React 19-based operating systems with complex canvas-based visualizations.
2.  **Deep Credit Risk Expertise**: Proven knowledge of PD/LGD/EAD modeling, scorecard development, and Basel/regulatory requirements.
3.  **Quantitative Finance Logic**: Proficiency in Modern Portfolio Theory, covariance-based risk calculation, and Monte Carlo simulations.
4.  **Advanced Product Design**: Creating unique, high-aesthetic design systems (Deep Void) that solve specific psychological problems like cognitive load.
5.  **AI & RAG Architecture**: Capability to implement secure, context-aware AI agents into complex professional workflows.

---
*Generated: 2026-04-27 | System: Quant OS Omni Dive V2*
