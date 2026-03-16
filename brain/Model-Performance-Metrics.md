---
title: "Model Performance Metrics"
date: 2026-03-14
tags: [Gini, AUC, KS, ROC]
cluster: Phase 4. Model Build & Validate
---

---

## The Institutional Reality

At a global bank, [[Model-Performance-Metrics]] is the scorekeeper for whether a risk model is actually useful. But the institutional standard is much stricter than “the model has a high AUC.” A validator asks at least four different questions:

1. **Discrimination** — does the model rank bad borrowers above good borrowers?
    
2. **Calibration** — do predicted probabilities line up with observed outcomes?
    
3. **Stability** — does the model still behave well in production?
    
4. **Usability** — can the model support real decisions at cutoffs, segment levels, and portfolio monitoring horizons?
    

The baseline report focuses on the first of these, correctly naming **AUC**, **Gini**, and **KS** as the standard credit-ranking metrics and noting that banks routinely report them in validation packs and ongoing monitoring.

This is the first red-pill truth: **AUC is not the model.** A model can have a respectable AUC and still fail institutionally because:

- PDs are miscalibrated for [[Probability-of-Default]]
    
- score migration is unstable across time
    
- segment performance collapses in production
    
- cutoffs create bad approval decisions
    
- overrides destroy rank ordering
    
- population drift breaks the development assumptions, linking directly to [[Population-Stability-Index-PSI]]
    

That is why performance metrics must always be interpreted together with [[SR-11-7-Model-Governance]]. A strong validation report never says only “AUC is 0.78, therefore approved.” It asks whether that performance is **out-of-sample**, **stable through time**, **consistent across segments**, **adequately calibrated**, and **fit for the approved use case**.

The second red-pill truth is that **different metrics answer different questions**:

- **AUC** answers how well the model ranks across all possible thresholds
    
- **Gini** is a simple rescaling of AUC used widely in banking
    
- **KS** answers how far apart the cumulative good and bad score distributions are at the best separating threshold
    
- **precision/recall** become useful when the event class is rare
    
- **lift** matters when operations care about the top-ranked tail
    
- calibration metrics matter when the output must be interpreted as a real PD, especially in [[IFRS-9-and-ECL]] or capital-linked PD frameworks
    

This matters because banks do not use models for just one thing. A collections prioritization model may care more about rank concentration in the top decile. A retail underwriting scorecard may care heavily about cutoffs. A Basel PD model may care deeply about calibration by grade. So the correct performance metric depends on the business purpose, not just on mathematical elegance.

The third red-pill truth is that **discrimination usually gets too much glory because it is easier to show**. AUC, Gini, and KS look impressive in slides. But a bank actually booking provisions or assigning grades needs the probabilities to mean something. That is why this note must connect back to [[Probability-of-Default]], [[Logistic-Regression-Scorecards]], and [[Advanced-ML-in-Risk]]. A model may separate well, but if the predicted 2% PD bucket actually defaults at 6%, the institution has a serious problem even if the ROC curve looks beautiful.

## The Core Math / Code

Let:

- $y_i \in {0,1}$ be the observed outcome, where 1 = bad/default
    
- $\hat{p}_i$ be the model’s predicted default probability or risk score
    

### 1. AUC: Area Under the ROC Curve

The **ROC curve** plots:

- **True Positive Rate (TPR)** against
    
- **False Positive Rate (FPR)**
    

as the decision threshold moves across all possible cutoffs.

These are defined as:

$$  
TPR = \frac{TP}{TP+FN}  
$$

$$  
FPR = \frac{FP}{FP+TN}  
$$

The **AUC** is the area under that ROC curve. A deeper and more useful interpretation is:

$$  
AUC = P(\hat{p}_{bad} > \hat{p}_{good})  
$$

In words: AUC is the probability that a randomly chosen bad account receives a higher risk score than a randomly chosen good account.

This is why AUC is so popular. It is threshold-independent and purely rank-based.

Interpretation:

|AUC|Intuition|
|---|---|
|0.50|Random ranking|
|0.60 to 0.70|Weak to fair discrimination|
|0.70 to 0.80|Good discrimination|
|0.80 to 0.90|Very strong discrimination|
|Above 0.90|Exceptional, but investigate overfitting or leakage|

The baseline report explicitly notes the standard interpretation that 0.5 is random and 1.0 is perfect.

### 2. Gini Coefficient

In credit risk, the **Gini coefficient** is usually just a rescaling of AUC:

$$  
Gini = 2 \times AUC - 1  
$$

This is one of the most quoted formulas in banking model validation, and the baseline report states it directly.

Interpretation:

- if $AUC = 0.50$, then $Gini = 0$
    
- if $AUC = 0.80$, then $Gini = 0.60$
    

That makes Gini attractive in business settings because it puts the model’s ranking power on a scale where zero means no discriminatory value.

### 3. KS Statistic

The **Kolmogorov–Smirnov (KS) statistic** measures the maximum distance between the cumulative score distributions of goods and bads.

A common practical formulation is:

$$  
KS = \max_t \left(TPR(t) - FPR(t)\right)  
$$

where $t$ is the classification threshold.

This is equivalent to the maximum vertical distance between the cumulative bad-rate capture curve and cumulative good-rate capture curve. The baseline report describes KS exactly in this way and notes that credit practitioners often express it as a percentage.

Why KS matters:

- it gives the strongest single-threshold separation point
    
- it is intuitive for scorecard cutoffs
    
- it is heavily used in retail credit and collections
    

A rough business intuition:

|KS|Practical reading|
|---|---|
|Below 20%|Weak separation|
|20% to 35%|Moderate|
|35% to 50%|Strong|
|Above 50%|Very strong, but inspect stability and leakage|

These are rules of thumb, not regulatory laws.

### 4. Discrimination vs Calibration

This is the most important conceptual distinction in the whole note.

AUC, Gini, and KS are **discrimination** metrics. They answer:

> “Does the model rank risk correctly?”

They do **not** answer:

> “Are the predicted probabilities numerically correct?”

That second question is calibration.

A stylized calibration error for a bucket $g$ is:

$$  
Calibration\ Error_g = \widehat{PD}_g - ODR_g  
$$

where:

- $\widehat{PD}_g$ is predicted PD for bucket or grade $g$
    
- $ODR_g$ is observed default rate for that bucket
    

This is why a model can have:

- excellent discrimination
    
- poor calibration
    

and therefore still be dangerous for [[Probability-of-Default]] assignment or [[IFRS-9-and-ECL]] provisioning.

### 5. Lift and Capture

A strong ranking model should place many bad accounts in the highest-risk tail. This is where **lift** becomes useful.

If the top decile identified by the model contains a bad rate much higher than the portfolio average, the model has useful concentration power. A simple lift measure for a bucket $b$ is:

$$  
Lift_b = \frac{\text{Bad Rate in bucket }b}{\text{Overall Bad Rate}}  
$$

This matters operationally when collections teams, fraud teams, or limit-management teams can act only on a small portion of the portfolio.

### 6. Precision and Recall for Rare Events

For highly imbalanced events, the bank may also examine:

$$  
Precision = \frac{TP}{TP+FP}  
$$

$$  
Recall = \frac{TP}{TP+FN}  
$$

These are not always the headline metrics in classic scorecard validation, but they are very useful in highly skewed settings, especially where operational triage matters more than fully calibrated PD estimation.

### Which Metric Fits Which Use Case?

|Use case|Most relevant metrics|Why|
|---|---|---|
|PD scorecard development|AUC, Gini, KS, calibration checks|Need rank ordering and believable PDs|
|Portfolio monitoring|AUC/Gini trend, KS trend, PSI|Need to know whether performance is degrading|
|Collections prioritization|Lift, recall, KS|Need concentration in top-risk tail|
|ML challenger validation|AUC/Gini plus stability and explainability|Raw performance alone is not enough|
|IFRS 9 impairment use|Calibration plus discrimination|Reserve levels need realistic probabilities|

This table is the real institutional answer. Metrics are tools, not trophies.

### Production-Grade Python Example

Below is a clean Python utility that computes AUC, Gini, KS, ROC curve arrays, and a simple lift table. It is much closer to what a real validation notebook or monitoring script would use than a one-line demonstration.

```python
import numpy as np
import pandas as pd
from dataclasses import dataclass
from sklearn.metrics import roc_auc_score, roc_curve


@dataclass
class PerformanceSummary:
    auc: float
    gini: float
    ks: float
    ks_threshold: float
    roc_table: pd.DataFrame
    decile_lift_table: pd.DataFrame


def compute_credit_model_metrics(
    y_true: pd.Series,
    y_pred: pd.Series,
    n_bins: int = 10
) -> PerformanceSummary:
    """
    Compute standard discrimination metrics for a binary credit model.

    Parameters
    ----------
    y_true : pd.Series
        Binary target where 1 = bad/default and 0 = good/non-default.
    y_pred : pd.Series
        Predicted default probabilities or risk scores.
    n_bins : int, default 10
        Number of quantile bins for lift analysis.

    Returns
    -------
    PerformanceSummary
        AUC, Gini, KS, ROC table, and decile lift table.
    """
    y_true = pd.Series(y_true).astype(int)
    y_pred = pd.Series(y_pred).astype(float)

    if set(y_true.unique()) - {0, 1}:
        raise ValueError("y_true must contain only 0 and 1 values.")

    if len(y_true) != len(y_pred):
        raise ValueError("y_true and y_pred must have the same length.")

    auc = roc_auc_score(y_true, y_pred)
    gini = 2 * auc - 1

    fpr, tpr, thresholds = roc_curve(y_true, y_pred)
    ks_values = tpr - fpr
    ks_idx = int(np.argmax(ks_values))
    ks = float(ks_values[ks_idx])
    ks_threshold = float(thresholds[ks_idx])

    roc_table = pd.DataFrame(
        {
            "threshold": thresholds,
            "fpr": fpr,
            "tpr": tpr,
            "ks_value": ks_values,
        }
    )

    # Decile lift analysis (higher score = higher risk)
    df = pd.DataFrame({"y_true": y_true, "y_pred": y_pred}).copy()
    df["bucket"] = pd.qcut(
        df["y_pred"].rank(method="first"),
        q=n_bins,
        labels=False
    )

    # Reverse so bucket 0 = highest predicted risk
    df["bucket"] = (n_bins - 1) - df["bucket"]

    overall_bad_rate = df["y_true"].mean()

    lift_table = (
        df.groupby("bucket", as_index=False)
        .agg(
            accounts=("y_true", "count"),
            bads=("y_true", "sum"),
            avg_pred_pd=("y_pred", "mean"),
        )
        .sort_values("bucket")
        .reset_index(drop=True)
    )

    lift_table["bad_rate"] = lift_table["bads"] / lift_table["accounts"]
    lift_table["lift"] = np.where(
        overall_bad_rate > 0,
        lift_table["bad_rate"] / overall_bad_rate,
        np.nan
    )

    return PerformanceSummary(
        auc=float(auc),
        gini=float(gini),
        ks=float(ks),
        ks_threshold=float(ks_threshold),
        roc_table=roc_table,
        decile_lift_table=lift_table,
    )


# Example usage
y_true = pd.Series([0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0])
y_pred = pd.Series([0.05, 0.80, 0.10, 0.70, 0.20, 0.15, 0.90, 0.65, 0.30, 0.85, 0.12, 0.08])

summary = compute_credit_model_metrics(y_true, y_pred)

print(f"AUC:  {summary.auc:.4f}")
print(f"Gini: {summary.gini:.4f}")
print(f"KS:   {summary.ks:.4f}")
print(f"KS Threshold: {summary.ks_threshold:.4f}")

print("\nTop of ROC / KS table:")
print(summary.roc_table.head())

print("\nDecile lift table:")
print(summary.decile_lift_table)
```

This code does five things that matter in practice:

1. computes AUC for rank ordering
    
2. converts AUC into Gini for banking-style reporting
    
3. computes KS and identifies the threshold where separation is strongest
    
4. stores the ROC table for traceability
    
5. builds a lift table so business teams can see concentration power by risk bucket
    

That is the kind of utility that naturally sits next to [[Logistic-Regression-Scorecards]] and [[Advanced-ML-in-Risk]] in a governed validation stack.

### What Validators Actually Look For

Under [[SR-11-7-Model-Governance]], a validator reading AUC, Gini, and KS does not stop at the headline values. They usually ask:

- Are these development, validation, or out-of-time numbers?
    
- Are metrics stable across months, quarters, and macro regimes?
    
- Do they hold across important subsegments?
    
- Did performance fall sharply after policy or booking changes?
    
- Is there evidence of data leakage?
    
- Do lift and capture degrade in the operational cutoff zone?
    
- Are discrimination metrics strong while calibration remains weak?
    

That last question is especially important. A scorecard used to assign PDs or drive [[IFRS-9-and-ECL]] must not hide behind rank-order strength alone.

### Common Failure Modes

A model may show attractive AUC/Gini/KS in development and still fail in production because:

- the sample was too clean or too easy
    
- variables leaked post-decision information
    
- policy changes shifted the booked population
    
- the model was optimized for one segment and generalized poorly
    
- event rarity made one metric unstable
    
- population drift broke the development relationship, linking to [[Population-Stability-Index-PSI]]
    
- business overrides weakened actual decision alignment
    

That is why strong banks track **metric trends**, not just point estimates.

### The Real Red-Pill Summary

The shallow answer is:

“AUC, Gini, and KS measure how good a credit model is.”

The real answer is:

“AUC, Gini, and KS are discrimination tools that measure how well a model ranks bad accounts above good ones, but they do not by themselves prove calibration, stability, or business fitness, which is why bank-grade validation treats them as necessary but never sufficient evidence of model quality.”

