---
title: Tharun the Architect
date: 2026-03-14
tags:
  - credit-risk
  - data-science
  - banking
  - model-validation
  - ai
  - profile
  - model-risk
  - zettelkasten
cluster: Profile & Foundations
---


---

## The Feynman Hook

Imagine a city planner who also knows how to pour concrete, wire buildings, and inspect whether bridges are safe. Most people only do one part: they either design, build, or audit. Tharun’s edge is that he is building a full financial city inside one brain: the rules of banking, the math of risk, and the code that makes those ideas run in production.

Another way to see it: many people can drive a car, but very few can also explain the engine, repair the brakes, and prove the vehicle is road-safe to the regulator. That is what a top-tier quantitative risk specialist does inside a bank. The job is not just to predict defaults; it is to connect business reality, regulation, modeling, validation, and execution into one coherent operating system.

## The Institutional Reality

At a global bank, this profile sits at the intersection of first-line model development, second-line model risk oversight, and enterprise risk transformation. The practical mission is to translate real lending and portfolio behavior into governed models that support pricing, underwriting, provisioning, stress testing, and capital. In that world, the core building blocks are [[Probability-of-Default.md]], [[Loss-Given-Default.md]], and [[Exposure-at-Default.md]], which then feed frameworks such as [[Expected-vs-Unexpected-Loss.md]], [[Economic-Capital-Basics.md]], [[RWA-Risk-Weighted-Assets.md]], and [[IFRS-9-and-ECL.md]].

The institutional challenge is that banks do not reward isolated brilliance; they reward controlled usefulness. A strong quant must understand Basel capital logic inside [[Basel-IRB-Framework.md]], model governance under [[SR-11-7-Model-Governance.md]], and production execution through interpretable methods such as [[Logistic-Regression-Scorecards.md]] and more advanced methods in [[Advanced-ML-in-Risk.md]]. In practice, that means building models that are not only predictive, but explainable, monitorable, and defensible to risk committees, internal audit, the RBI context for local prudential expectations, and global regulatory standards shaped by Basel and IFRS 9.

So this note is the hub of the entire Credit Risk OS. It defines Tharun not as “someone learning risk,” but as an architect assembling a governed system: foundations in loss theory, regulation as design constraints, quant models as engines, validation as quality control, and Python/ML as execution infrastructure. From this node, the vault expands outward into the full network of expected loss, capital, provisioning, validation, stress testing, explainable ML, and cross-domain risk.

## The Core Math / Code

The simplest way to understand the architecture is as a flow, not a silo:

- Business exposures are measured through [[Probability-of-Default.md]], [[Loss-Given-Default.md]], and [[Exposure-at-Default.md]].
    
- Those parameters drive loss estimation in [[Expected-vs-Unexpected-Loss.md]] and capital logic in [[Economic-Capital-Basics.md]].
    
- Regulatory frameworks such as [[Basel-IRB-Framework.md]] and [[IFRS-9-and-ECL.md]] determine how those numbers are used.
    
- Governance standards in [[SR-11-7-Model-Governance.md]] determine whether the models are acceptable.
    
- Execution notes such as [[Weight-of-Evidence-and-IV.md]], [[Logistic-Regression-Scorecards.md]], [[Model-Performance-Metrics.md]], and [[Population-Stability-Index-PSI.md]] determine whether the system is implementable and sustainable.
    

A compact representation of the Credit Risk OS is:

$$  
\text{Credit Risk OS}=\text{Data}+\text{Risk Parameters}+\text{Regulation}+\text{Validation}+\text{Execution}  
$$

At the portfolio level, the core engine can be summarized as:

$$  
\text{Loss Framework} \rightarrow f(PD,LGD,EAD)  
$$

and then routed into different decision layers:

$$  
{PD,LGD,EAD}\rightarrow  
\begin{cases}  
\text{Provisioning via }[[IFRS-9-and-ECL.md]]\  
\text{Capital via }[[Basel-IRB-Framework.md]]\text{ and }[[RWA-Risk-Weighted-Assets.md]]\  
\text{Monitoring via }[[Model-Performance-Metrics.md]]\text{ and }[[Population-Stability-Index-PSI.md]]  
\end{cases}  
$$

That is the real identity of this note: it is the root map of a system where theory, regulation, and code are all part of one controlled machine.

