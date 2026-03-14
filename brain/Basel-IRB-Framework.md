---
title: "Basel IRB Framework"
date: 2026-03-14
tags: [Basel, credit-risk, IRB, standardized-approach]
cluster: The Regulatory Straightjacket
---

Consider choosing between a custom suit or off-the-rack clothing. In credit risk, banks choose between bespoke models (IRB) or standardized weights. The Basel IRB (Internal Ratings-Based) approach lets banks use internal models for key inputs (PD, LGD, EAD) to compute risk-weighted capital. By contrast, the **Standardized approach** applies fixed risk weights from rules or external ratings – akin to choosing from a clothing store’s catalog (Chapter 4 of Basel).

Under IRB, there are two tiers: *Foundation IRB* (FIRB) and *Advanced IRB* (AIRB). In FIRB, a bank models its own Probability of Default (PD) per borrower or grade, but uses regulator-prescribed values or formulas for LGD and EAD. In AIRB, the bank uses its own estimates for all risk components (PD, LGD, EAD, and sometimes maturity). For example, risk.net notes that in Foundation IRB banks only use internal PD, while Advanced IRB allows in-house LGD and EAD estimates.  (However, even AIRB banks must ensure model robustness and meet minimum requirements – see [[SR-11-7-Model-Governance]].)

If a portfolio does not qualify for IRB, Basel mandates using the standardized approach. This often means applying official risk weights (e.g. 100% for corporates) and considering only unexpected loss (EL is separately provisioned). Basel guidance states that when IRB is not allowed, institutions “should refer to the treatment specified under the standardized approach”. In effect, the standardized approach is a fallback (like a default template), whereas IRB is like a custom model built by the bank.

In summary, Basel’s IRB framework contrasts the one-size-fits-all standardized method with banks’ own models. Foundation IRB banks must still rely on supervisory LGD/EAD, while Advanced IRB banks can fully internalize these components. Both IRB variants (and standardized) must ultimately produce RWA on which capital is calculated, linking back to [[RWA-Risk-Weighted-Assets]] and expected/unexpected loss concepts. This framework ensures capital remains risk-sensitive, whether by prescribed rules or internal estimates.
