---
title: "AML and Financial Crime Models"
date: 2026-03-14
tags: [AML, anomaly-detection, compliance]
cluster: Cross-Domain Risk
---

Combating money laundering is like searching for needles in a haystack. **Anti-Money Laundering (AML)** models use data science to flag suspicious transactions. These might include unusually large transfers, transactions with high-risk countries, or rapid movement through multiple accounts. Banks employ rules-based filters and increasingly machine learning/anomaly detection to identify patterns that deviate from normal customer behavior.

Regulatory focus on AML is high: banks must file Suspicious Activity Reports (SARs) when predicate crimes or money laundering is suspected. While there are no specific “capital” models here, risk teams build transaction-monitoring systems. Advanced approaches include unsupervised learning (clustering or autoencoders) to detect outliers. For example, an autoencoder network can be trained on normal transaction data; large reconstruction errors flag anomalies.

Key points in AML modeling: these models must be explainable and validated per regulatory standards. Although SR 11-7 doesn’t explicitly cover AML, the spirit of model governance applies: banks must document detection rules, test models, and adjust them as fraudsters evolve.  The goal is compliance with the Bank Secrecy Act and AML rules, which mandate a risk-based customer due diligence and ongoing monitoring.

In short, AML modeling is about pattern recognition to detect financial crime. It uses many of the same technical tools (scorecards, ML algorithms) but with different objectives (fraud detection vs credit prediction).  It is an example of cross-domain risk management in banking: integrating data analytics to meet compliance obligations and protect the financial system.
