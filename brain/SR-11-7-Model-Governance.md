---
title: "SR 11-7 Model Governance"
date: 2026-03-14
tags: [model-risk, validation, governance, Basel]
cluster: The Regulatory Straightjacket
---

Picture a safety inspection for a bridge: engineers build it, but independent experts review it rigorously. Similarly, model governance (e.g. Fed’s SR 11-7 guidance) demands banks rigorously validate and challenge their quantitative models. It’s not optional oversight – the Fed/OCC guidance states model risk should be managed like any other risk, with *independent validation* and *effective challenge* as core principles.

SR 11-7 (and its UK/EBA equivalents) requires banks to have clear policies: senior management/board must approve model risk frameworks, ensure staff have model skills, and embed ongoing performance checks. In practice, this means an independent model validation team tests conceptual soundness, data, assumptions and outcomes.  Regulators emphasize “effective challenge” – objective experts must critically analyze models and assumptions.  The OCC guidance notes that governance includes documentation, internal audit of procedures, and sound backtesting: “Banks should objectively assess model risk using a sound model validation process… and establish a framework for managing the risk”.

For credit risk models (e.g. PD/LGD/EAD or IFRS 9 models), this means documenting all inputs, calibrations, and regularly monitoring actual defaults vs. predictions.  Importantly, complex methods (like ML) must also meet transparency requirements.  If a black-box model is used, governance demands explainability (e.g. via SHAP) and justification.  Indeed, one principle is that model risk cannot be eliminated – models must be supported by limits on use, alternate analyses, and strong governance controls.

In short, SR 11-7 makes sure our risk “house” has a code inspector. Banks must validate models, monitor their performance, and maintain governance structures. It ties closely to model building topics: for instance, a loan PD model (see [[Probability-of-Default]]) must be validated independently, just as ML-based stress models (see [[Advanced-ML-in-Risk]]) require challenge. Likewise, ongoing checks (like [[Population-Stability-Index-PSI]]) are part of governance. Robust model risk management is now an explicit regulatory requirement.
