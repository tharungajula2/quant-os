---
title: "Loss Given Default (LGD)"
date: 2026-03-14
tags: [LGD, credit-risk, collateral]
cluster: The Quant Trinity
---

Imagine a loan as a pie: **Loss Given Default (LGD)** is the share of the pie you lose if the borrower defaults.  Formally, LGD is the percentage of exposure not recovered in default.  Basel defines LGD as the *bank’s best estimate of average percentage loss per defaulted exposure*. For example, an unsecured corporate loan might have LGD 45%, meaning 45% of the loan is expected lost on average if the borrower fails.

Crucially, LGD can vary by collateral and economic conditions.  Under Basel, banks often use a *downturn LGD* for capital, reflecting stressed recoveries. The Basel guidelines require that LGD estimates “must reflect economic downturn conditions where necessary”. This means if default rates spike, recoveries (collateral values) often fall, raising losses.  For example, in a housing downturn, real estate collateral value may drop, increasing LGD on mortgage loans.

Regulators provide detailed LGD rules.  For instance, under IRB a bank might split an exposure into secured vs unsecured portions (each with its own LGD) to account for collateral haircuts.  US Basel II guidance defines LGD as the bank’s empirical best estimate of the long-run average loss rate.  Supervisory formulas then translate LGD (with PD and EAD) into expected loss, ensuring provisioning and capital reflect both average and stressed losses.

In practice, LGD connects to other concepts: higher LGD means higher expected and unexpected loss, increasing capital need. Collateral and guarantees typically reduce LGD – for example, exposures with high-quality collateral might have LGD well below 100%.  Banks calibrate LGD via historical recovery data or market prices, and for specialized lending (e.g. construction loans) they may apply higher LGDs.  This parameter is vital in [[Expected-vs-Unexpected-Loss]] calculations ($EL=PD\times EAD\times LGD$) and informs capital via the IRB capital formula.
