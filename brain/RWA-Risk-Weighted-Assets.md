---
title: "RWA (Risk-Weighted Assets)"
date: 2026-03-14
tags: [Basel, RWA, capital, standardized-approach]
cluster: The Regulatory Straightjacket
---

Imagine a grocery basket: some items (cash) are weightless, others (meat) are heavy.  Similarly, banks assign *risk weights* to assets: safe assets like government bonds have low weight, riskier loans have higher weight.  Summing these (loan amount × weight) gives **Risk-Weighted Assets (RWA)**. Regulators then require capital equal to a percentage (e.g. 8%) of RWA.

In Basel I (and continued in newer rules), assets fall into buckets (0%, 20%, 50%, 100%) based on credit quality. For example, cash and sovereign debt may get 0% weight, interbank claims 20%, residential mortgages 50%, and corporate loans 100%.  An ECB explanation notes that Basel I assigned governments 0% and banks 20%, reflecting their perceived low risk.  The capital requirement is then simply:

$$\text{Capital Requirement} = k \times \text{RWA},$$
where $k$ is the minimum capital ratio (8% under Basel II/III).

More formally, Basel III defines RWA as the sum of exposures weighted by risk factors:

$$

\text{RWA} = \sum_i w_i \times \text{Exposure}_i,

$$
where $w_i$ comes from either standardized tables or internal models.  For IRB banks, RWA calculation incorporates modeled PD, LGD, etc (see [[Basel-IRB-Framework]]).  As an example, one regulatory summary explains that RWA captures only *unexpected losses* (the surprising part of credit risk) – expected losses are borne by provisions, not capital.

To illustrate, consider a simple table of example risk weights (not official rules) – it shows how different exposures map to RWA:

| Exposure Type      | Typical Risk Weight |
|--------------------|---------------------|
| Cash (on deposit)  | 0%                  |
| Sovereign bonds    | 0%                  |
| Bank deposits      | 20%                 |
| Residential mortgages | 50%              |
| Corporate loans    | 100%                |

Thus, a 100M EUR corporate loan contributes 100M×100% = 100M RWA, requiring 8M capital if 8% ratio. This weighted-sum approach ensures that banks holding riskier portfolios must hold more capital. It links directly to [[Basel-IRB-Framework]] (which provides model-based weights) and to the concept of unexpected loss – RWA essentially quantifies the risk cushion needed for UL.
