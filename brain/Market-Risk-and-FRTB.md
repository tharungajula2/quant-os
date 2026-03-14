---
title: "Market Risk and FRTB"
date: 2026-03-14
tags: [market-risk, FRTB, VaR, expected-shortfall]
cluster: Cross-Domain Risk
---

Switching from lending to trading shifts risk type: **Market risk** is the danger of losses from changes in market prices (rates, equities, FX, commodities). The Fundamental Review of the Trading Book (FRTB) is Basel’s new regime for market risk. Key concepts: **Value-at-Risk (VaR)** was the old metric, now largely replaced by **Expected Shortfall (ES)**. ES looks at the average loss in the worst 2.5% of scenarios (99.75% confidence), capturing tail risk more comprehensively.

Under FRTB, banks draw a boundary between banking and trading books, then either use a standardized formula or approved internal models for RWA calculation.  The standardized approach (SA-MR) uses sensitivities and stress capital buffers; the internal models approach (IMA) relies on ES models per trading desk, subject to strict approval. The Basel release highlights: “the core features include… an internal models approach that relies on expected shortfall models” and a risk-sensitive standardized fallback.  Importantly, FRTB also requires that risk factors (e.g. a specific FX rate) are *modellable*, i.e. have sufficient market data. If not, they are treated as non-modellable, adding extra capital.

VaR and ES are computed via Monte Carlo or historical simulation of market scenarios.  For example, a 99% 10-day ES of 5M EUR means that if we had many 10-day horizon losses, the average of the worst 1% would be 5M.  This number is used to set risk RWA for that desk. The FRTB standards were finalized in 2019, effective 2022, replacing Basel 2.5 rules.

In summary, market risk modeling (FRTB) is about quantifying how portfolio values move with markets.  It complements credit risk: e.g., credit spreads are a market variable.  For a credit quant, understanding FRTB helps when dealing with credit trading desks or CVA (which is partly market risk). FRTB’s emphasis on tail risk (ES) and modellability makes it the market-side analog to credit’s IRB (PD, LGD) approach, ensuring banks hold capital for extreme market moves as rigorously as for credit defaults.
