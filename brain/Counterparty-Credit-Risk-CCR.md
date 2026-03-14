---
title: "Counterparty Credit Risk (CCR) and CVA"
date: 2026-03-14
tags: [CCR, CVA, derivatives, Basel]
cluster: The Quant Trinity
---

Think of lending someone money in the future (like via an interest rate swap). You risk they might default before paying back. **Counterparty Credit Risk (CCR)** is the credit risk from OTC derivatives, repos, and similar trades – it’s a hybrid of credit and market risk. Basel III introduced enhanced rules for CCR, covering both default risk and *Credit Valuation Adjustment (CVA) risk*. CVA is the risk of loss from changes in the counterparty’s creditworthiness after the trade is agreed (marked-to-market loss).

The capital treatment of CCR has two parts: (1) Default risk: the loss if the counterparty defaults; (2) CVA risk: the loss if the counterparty’s spread widens (i.e. they become riskier). For default risk, a key concept is the **netting set**: all trades under a netting agreement with one counterparty are aggregated (their exposures netted). Regulators allow netting and collateral to reduce exposure. Basel’s new standard (FRTB-CCR) provides two approaches to estimate exposure: the SA-CCR (standardized) and the IMM (internal model).

Under **SA-CCR**, the exposure at default is calculated as the sum of current replacement cost plus a “Potential Future Exposure (PFE)” add-on:

$$

EAD = RC + \alpha \times PFE,

$$
with a regulatory multiplier (often $\alpha=1.4$).  Replacement Cost (RC) is the current marked-to-market value (or zero if negative), and PFE accounts for possible increases in exposure over time. SA-CCR makes PFE risk-sensitive (considering collateral, asset classes, etc). Internal models (IMM) are also allowed for banks with approved models – these simulate future value distributions for the netting set (adjusted for collateral) to compute exposures.

CVA risk is calculated separately: it’s essentially the expected mark-to-market loss from spread changes, with its own capital charge. Basel provides simplified (standardized or basic) approaches for CVA. In practice, a bank must cover both CCR default RWA and CVA RWA.

In summary, CCR recognizes that derivative exposures are a form of credit risk. Under Basel, banks measure CCR similarly to credit exposure: aggregating net exposure (via SA-CCR or IMM) and then applying a PD×LGD-like calculation. The CCAR requirement reflects unexpected losses from CCR (via capital for CCR and CVA). CCR thus expands [[Exposure-at-Default]] and [[Probability-of-Default]] concepts to include derivatives, ensuring the bank holds capital for both direct default and market-driven (CVA) credit risks.
