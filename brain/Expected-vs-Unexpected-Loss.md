---
title: "Expected vs Unexpected Loss"
date: 2026-03-14
tags: [credit-risk, EL, UL, Basel, capital]
cluster: Profile & Foundations
---

Think of running a lemonade stand: you expect some regular costs (lemons, cups) – that’s your **expected loss**. But a hurricane or broken refrigerator are surprises – those are **unexpected losses**.  In banking, expected loss (EL) is the average loss we predict from defaults (like the steady cost of lemons), whereas unexpected loss (UL) is the tail of rare but big losses (like the hurricane damage).

Formally, regulators define expected loss as the *probability-weighted average loss* from defaults in a period. Under Basel, for example, EL is computed from risk parameters as:

$$

EL = PD \times EAD \times LGD

$$

where **PD** is probability of default, **EAD** is exposure at default, and **LGD** is loss given default.  (This matches IFRS 9’s concept of expected credit loss, which aggregates similar components over time.)  Losses above the expected level are called **unexpected losses**.  BIS guidance notes that expected losses “are regarded as the cost of doing business” (often covered by pricing or provisions), while unexpected losses exceed normal levels and must be covered by capital.

Banks calculate capital to absorb UL, setting it so that worst-case losses (e.g. 99.9th percentile of the loss distribution) are covered.  Basel models use a stochastic approach, aiming for a low probability of insolvency (e.g. one-in-a-thousand).  For instance, one analysis notes that by modeling loss distributions, banks set capital so that UL above EL is very unlikely.

In summary, **expected losses** are the regular losses (average defaults) handled by loan pricing and provisions, while **unexpected losses** are rare heavy losses that drive capital requirements.  This dichotomy underlies many concepts: for example, [[Economic-Capital-Basics]] equates capital with UL coverage, and risk-weighted assets ([[RWA-Risk-Weighted-Assets]]) are structured to cover only UL portion.
