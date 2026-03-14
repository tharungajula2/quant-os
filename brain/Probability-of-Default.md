---
title: "Probability of Default (PD)"
date: 2026-03-14
tags: [PD, credit-risk, rating, IRB]
cluster: The Quant Trinity
---

Imagine forecasting the chance of rain: this is like estimating the **Probability of Default (PD)** for a borrower in the next year. PD is simply the expected frequency of default for an obligor or rating grade within one year. Basel defines one-year PD as the average percentage of similar obligors that default over one year. For example, if historically 1 out of 100 AAA-rated bonds default in a year, PD ≈ 1%.

A key distinction is **Point-in-Time (PIT)** vs **Through-the-Cycle (TTC)** PDs. A PIT PD varies with current conditions (higher in downturns, lower in booms), while a TTC PD aims to capture a long-term average (smoothing out cycles).  In credit risk modeling, banks often estimate PIT PDs for accounting (IFRS 9) and TTC PDs for capital (AIRB requirements), sometimes converting between them. For instance, IFRS 9 may use PIT PDs in stress scenarios, whereas Basel’s IRB capital formulas were historically calibrated assuming TTC PDs (reflecting a long-run default rate).

Ratings play a central role: banks assign exposures to master rating grades, each with an associated PD.  For a sense of scale, a simplified master scale might be:

| Rating Grade | Approximate 1-year PD |
|--------------|-----------------------|
| AAA          | 0.01%                |
| AA           | 0.1%                 |
| A            | 0.5%                 |
| BBB          | 1.0%                 |
| BB           | 3-5%                 |
| B            | 10-20%               |
| CCC and below| >20% or default      |

*(Illustrative values. Actual mappings must be justified with data.)*

Under Basel IRB, each borrower is mapped to a grade; the bank estimates PD per grade using long-run default data, possibly supplemented by pool data for rare classes.  Basel’s IRB guidance expects a bank’s PD for each grade to reflect borrower ability to repay even in “adverse conditions”, tying back to point-in-time vs through-cycle debates.  Banks often calibrate PD models via logistic regression (see [[Logistic-Regression-Scorecards]]) using borrower financials and macro factors as predictors.

PD is fundamental: it feeds expected loss ($EL=PD\times LGD \times EAD$) and sets the scale for capital (via [[Economic-Capital-Basics]]). It also links to [[Loss-Given-Default]] (LGD) and [[Exposure-at-Default]] (EAD) which together determine loss amounts. Robust PD models and rating scale design are crucial: regulators require documented master scales and validation per SR 11-7, ensuring defaults observed align with PDs.
