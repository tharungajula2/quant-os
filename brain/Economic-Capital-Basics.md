---
title: "Economic Capital Basics"
date: 2026-03-14
tags: [credit-risk, capital, Basel, unexpected-loss]
cluster: Profile & Foundations
---

Imagine you keep a rainy-day fund beyond your monthly budget. That fund is like a bank’s **economic capital** – a buffer for sudden bad events above normal costs. Economic capital is defined as the capital needed to remain solvent at a very high confidence level, covering *unexpected losses* beyond expected ones.

Regulators describe economic (or risk) capital as covering the bank’s potential losses under stressful scenarios.  For instance, one OCC/Fed supervisory guidance states that risk capital covers the difference between the mean of loss and a high-percentile tail loss – i.e., the unexpected loss. In practice, banks set capital so that the loss distribution’s tail (say 99.9th percentile loss) exceeds capital only rarely.  Basel II/III require banks to hold capital equal to a percentage of **risk-weighted assets** designed to cover UL.

Thus, economic capital can be seen as

$$

\text{Economic Capital} \approx \text{VaR}_{\alpha}(loss) - EL,

$$

where $\text{VaR}_{\alpha}$ is a high-confidence loss percentile.  In IRB models, for example, capital is calibrated so that the bank maintains a small chance of insolvency (often $0.1\%$ per year for corporates).  This link between UL and capital is why [[Expected-vs-Unexpected-Loss]] and EL parameters (PD, LGD, EAD) feed directly into capital models.

In summary, economic capital is the cushion for losses beyond “business as usual”. Regulators emphasize that capital must cover these extreme losses, managed like any other risk.  Sound practices require banks to identify sources of risk and ensure capital policies account for unexpected credit losses.  In effect, economic capital ties together expected-versus-unexpected loss (from EL models) with the capital regime (Tier 1/2 ratio on [[RWA-Risk-Weighted-Assets]]).
