---
title: "Exposure at Default (EAD)"
date: 2026-03-14
tags: [EAD, credit-risk, commitments]
cluster: The Quant Trinity
---

Picture a credit card: even if you owe \$100 today, you have an unused limit that you might draw before default. **Exposure at Default (EAD)** is the total exposure a bank expects at the moment of a borrower’s default. In other words, EAD is how much is owed (on balance and off-balance) when default occurs.  Basel defines EAD as the dollar value of the exposure at the time of default.

EAD includes the current loan balance plus any future drawdowns on credit lines or undrawn commitments. For revolving credit (credit cards, lines of credit), borrowers often draw more before default, so EAD can exceed current balance.  Basel’s IRB allows banks to model EAD using historical utilization patterns. For example, if on average cardholders draw 70% of their limits by default, the bank estimates EAD accordingly.

Regulatory practice uses **Credit Conversion Factors (CCFs)**: percentages applied to off-balance items to convert them to an on-balance equivalent.  Basel QIS guidelines say: EAD applies to undrawn commitments and off-balance exposures, and banks use their own credit conversion factors to estimate EAD. For instance, a 100M unfunded line with a 75% CCF implies 75M EAD on that line (subject to calibration).  If a loan has collateral or covenants, banks adjust EAD (and LGD) accordingly.

Mathematically, once EAD is estimated, the expected loss contribution is $$EL = PD \times LGD \times EAD$$. EAD is a key risk input, especially for off-balance products. It links to [[Probability-of-Default]] and [[Loss-Given-Default]] in calculating EL, and it feeds into RWA via IRB formulas. In [[Counterparty-Credit-Risk-CCR]] (derivatives), EAD is more complex (involving replacement cost and add-ons), but conceptually still total exposure at default.
