---
title: "Model Performance Metrics"
date: 2026-03-14
tags: [Gini, AUC, KS, ROC]
cluster: Execution, Validation & ML
---

Evaluating a credit model is like grading a test. We need metrics that measure discrimination (how well it separates defaulters from non-defaulters). Common measures are AUC (Area Under ROC Curve), Gini coefficient, and the Kolmogorov–Smirnov (KS) statistic.  AUC quantifies the model’s ability to rank higher-risk over lower-risk: 0.5 is random, 1.0 is perfect. The Gini coefficient is simply $Gini = 2\times AUC - 1$, ranging from 0 to 1. KS measures the maximum difference between the cumulative distribution of predicted scores for goods vs. bads.

In Python, these can be computed after a model produces predicted probabilities:

```python
from sklearn.metrics import roc_auc_score, roc_curve

# y_true: true binary labels (0=good, 1=bad), y_pred_prob: predicted PDs
auc = roc_auc_score(y_true, y_pred_prob)
gini = 2*auc - 1  # Gini from AUC

# Compute ROC curve and KS
fpr, tpr, thresholds = roc_curve(y_true, y_pred_prob)
ks_stat = max(tpr - fpr)
print(f"AUC={auc:.3f}, Gini={gini:.3f}, KS={ks_stat:.3f}")

```

This code prints AUC, derived Gini, and KS. A higher AUC/Gini (say >0.7) indicates strong rank-ordering; KS (often expressed as a percentage) should also be large (common targets are KS > 40%). These metrics are mandated for validation reports: supervisors expect banks to track Gini/AUC and KS for scorecards or PD models.  For example, a banking modeler would ensure the final PD model yields, e.g., Gini=0.6 and KS=35%, and document these.

Other important metrics include **lift charts** and **precision/recall** if focusing on tail outcomes. But AUC/Gini/KS remain standard in credit. Regular monitoring is needed: a decline in AUC or spike in KS failure rate may trigger model review. The use of these statistics is part of [[SR-11-7-Model-Governance]] practices for ongoing validation.
