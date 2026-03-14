---
title: "Population Stability Index (PSI)"
date: 2026-03-14
tags: [PSI, model-monitoring, drift]
cluster: Execution, Validation & ML
---


---

## The Feynman Hook

Imagine you trained a school principal’s rulebook on last year’s students, but this year the school suddenly has very different students: different study habits, different attendance patterns, different family situations. Even if the rulebook was smart before, it may start making weaker decisions now because the world it learned from has changed.

That is what **Population Stability Index (PSI)** is trying to detect. It does not ask whether the model is mathematically elegant. It asks a harsher question: **is the population the model is seeing today still similar enough to the population it was built on?** If the answer is no, even a beautiful model can quietly decay in production. The baseline report frames PSI exactly this way: as a measure of how much the score or variable distribution in the current population has shifted away from the reference or development population.

## The Institutional Reality

At a global bank, [[Population-Stability-Index-PSI]] is one of the most practical tools in ongoing model monitoring. It sits directly under the governance expectations of [[SR-11-7-Model-Governance]] and complements the discrimination metrics in [[Model-Performance-Metrics]]. The baseline report states this directly: PSI is part of the model monitoring toolkit, reported periodically to detect drift, and elevated PSI may trigger investigation, review, or retraining.

This is the first red-pill truth: **a model can keep the same coefficients and still become wrong because the population moved.** That movement can happen because of:

- a new customer acquisition strategy
    
- a policy change in underwriting
    
- macroeconomic deterioration
    
- geographic expansion
    
- portfolio seasoning
    
- product redesign
    
- changes in channel mix
    
- shifts in missing-data behavior
    
- operational process changes upstream of the model
    

That means PSI is not a performance metric in the same sense as AUC or KS. AUC asks whether the model still ranks well. PSI asks whether the **input world** or **score world** has shifted enough that ranking and calibration may no longer be trustworthy. This is why a strong bank monitors both:

- **performance decay** through [[Model-Performance-Metrics]]
    
- **population drift** through [[Population-Stability-Index-PSI]]
    

The second red-pill truth is that PSI is often used in **two distinct ways**:

1. **Variable-level PSI**  
    Used to detect whether important predictors such as utilization, income band, delinquency count, LTV, or industry mix have shifted materially.
    
2. **Score-level PSI**  
    Used to detect whether the overall distribution of model outputs has shifted.
    

This distinction matters. A portfolio can show stable overall scores while one important variable is quietly drifting. Or the reverse can happen: variables look individually stable, but their joint effect changes the score distribution materially. Mature monitoring programs therefore track both.

### Why Banks Care So Much About PSI

A bank-grade risk model is always built under some historical distribution. That distribution is never permanent. If the live portfolio begins to differ materially from the development sample, several bad things can happen:

- calibration can break in [[Probability-of-Default]]
    
- Stage allocation behavior can become unstable in [[IFRS-9-and-ECL]]
    
- approval cutoffs become less meaningful in [[Logistic-Regression-Scorecards]]
    
- advanced models may become brittle in [[Advanced-ML-in-Risk]]
    
- governance conclusions from validation become stale under [[SR-11-7-Model-Governance]]
    

That is why PSI is not cosmetic. It is an early-warning siren.

### PSI Is About Distribution Shift, Not Direct Accuracy

This is the third red-pill truth, and it is where many juniors get confused:

- a **high PSI** does **not automatically** prove the model is bad
    
- a **low PSI** does **not automatically** prove the model is safe
    

A high PSI says the world has moved enough that caution is warranted. Maybe the model still performs well. Maybe it does not. You still need discrimination and calibration checks.

Likewise, a low PSI says the population has not moved much in the monitored dimension. But you could still have:

- target drift
    
- changing policy bias
    
- deterioration in calibration
    
- unstable relationships between predictors and default
    

So PSI is an **environmental drift indicator**, not a complete health certificate.

That is why strong institutions interpret PSI jointly with:

- AUC / Gini / KS from [[Model-Performance-Metrics]]
    
- calibration reviews from [[Probability-of-Default]]
    
- override trends from [[Logistic-Regression-Scorecards]]
    
- staging behavior from [[IFRS-9-and-ECL]]
    
- validation governance thresholds from [[SR-11-7-Model-Governance]]
    

## The Core Math / Code

Suppose a variable or score is divided into bins indexed by $i$.

Let:

- $E_i$ = proportion of the **expected** or reference population in bin $i$
    
- $O_i$ = proportion of the **observed** or current population in bin $i$
    

Then the **Population Stability Index** is:

$$  
PSI = \sum_i (O_i - E_i)\ln\left(\frac{O_i}{E_i}\right)  
$$

This is the core formula, and your baseline report presents the same structure directly.

### Intuition Behind the Formula

Each bin contributes two things:

1. the size of the shift, $(O_i - E_i)$
    
2. the relative change in distribution, $\ln(O_i / E_i)$
    

If a bin’s current proportion is close to the reference proportion, its PSI contribution is small. If many accounts move into or out of a bin relative to the old population, the contribution grows.

That means:

- **PSI near 0** suggests little distribution change
    
- **larger PSI** suggests stronger population drift
    

### Common Interpretation Thresholds

The baseline report gives the usual industry rules of thumb:

|PSI Range|Typical Interpretation|
|---|---|
|PSI < 0.10|Insignificant shift, population broadly stable|
|0.10 ≤ PSI < 0.25|Moderate shift, monitor closely|
|PSI ≥ 0.25|Significant shift, model review likely needed|

This is the fourth red-pill truth: **these are monitoring heuristics, not laws of nature**. A PSI of 0.12 in a critical variable may deserve more concern than a PSI of 0.20 in a less relevant variable. Context matters:

- which variable drifted
    
- how material the model is
    
- whether performance metrics also deteriorated
    
- whether the shift is expected due to seasonality or policy change
    
- whether the model is used for approval, pricing, provisioning, or monitoring only
    

### Example Interpretation

Suppose the development score distribution across four bins was:

$$  
E = [0.30, 0.40, 0.20, 0.10]  
$$

and the current distribution is:

$$  
O = [0.25, 0.35, 0.25, 0.15]  
$$

This means the current portfolio has shifted away from the original balance. More observations have moved into the riskier upper bins. PSI will be positive and reflect that shift. The baseline report uses exactly this style of example to show how changing score-bin proportions generate an overall PSI signal.

### Why Binning Matters

PSI is bin-based, which means the result depends on how you bin the variable or score. That is why mature practice usually uses:

- fixed reference bins
    
- documented binning logic
    
- enough observations per bin
    
- consistent implementation through time
    

If the bins themselves keep changing, PSI loses meaning.

For score-level PSI, banks often use:

- deciles
    
- quantile bins
    
- fixed score bands
    
- policy-relevant cut ranges
    

For variable-level PSI, they often use:

- model development bins
    
- WoE bins from [[Weight-of-Evidence-and-IV]]
    
- business-policy buckets
    

This is important because PSI is not just a formula. It is a governed **comparison design**.

### Variable PSI vs Score PSI

|Monitoring object|What it tells you|
|---|---|
|Variable PSI|Whether a specific input distribution changed|
|Score PSI|Whether the overall model-output distribution changed|
|Both together|Whether the environment changed locally, globally, or both|

This is the fifth red-pill truth: score PSI is useful, but variable PSI often tells you **why** drift is happening.

### Production-Grade Python Example

Below is a cleaner, bank-grade PSI utility than the simple example in the baseline report. It handles distributions, smoothing, consistent bins, and returns bin-level contributions for monitoring packs.

```python
import numpy as np
import pandas as pd
from dataclasses import dataclass


@dataclass
class PSISummary:
    total_psi: float
    bin_table: pd.DataFrame


def compute_psi_from_distributions(
    expected: np.ndarray,
    observed: np.ndarray,
    eps: float = 1e-6
) -> PSISummary:
    """
    Compute PSI from two already-normalized distributions.

    Parameters
    ----------
    expected : np.ndarray
        Reference population proportions by bin.
    observed : np.ndarray
        Current population proportions by bin.
    eps : float, default 1e-6
        Small value to avoid divide-by-zero and log(0).

    Returns
    -------
    PSISummary
        Total PSI and bin-level contribution table.
    """
    expected = np.asarray(expected, dtype=float)
    observed = np.asarray(observed, dtype=float)

    if expected.shape != observed.shape:
        raise ValueError("Expected and observed arrays must have the same shape.")

    if np.any(expected < 0) or np.any(observed < 0):
        raise ValueError("Distributions cannot contain negative values.")

    if not np.isclose(expected.sum(), 1.0):
        raise ValueError("Expected distribution must sum to 1.")
    if not np.isclose(observed.sum(), 1.0):
        raise ValueError("Observed distribution must sum to 1.")

    expected_s = np.where(expected == 0, eps, expected)
    observed_s = np.where(observed == 0, eps, observed)

    psi_component = (observed_s - expected_s) * np.log(observed_s / expected_s)

    bin_table = pd.DataFrame(
        {
            "bin": np.arange(len(expected_s)),
            "expected_pct": expected,
            "observed_pct": observed,
            "psi_component": psi_component,
        }
    )

    total_psi = float(psi_component.sum())
    return PSISummary(total_psi=total_psi, bin_table=bin_table)


def compute_psi_from_scores(
    expected_scores: pd.Series,
    observed_scores: pd.Series,
    bins: int = 10,
    strategy: str = "quantile"
) -> PSISummary:
    """
    Compute PSI from raw score distributions using fixed reference bins.

    Parameters
    ----------
    expected_scores : pd.Series
        Reference / development score sample.
    observed_scores : pd.Series
        Current / monitoring score sample.
    bins : int, default 10
        Number of bins.
    strategy : str, default "quantile"
        "quantile" for equal-frequency reference bins,
        "uniform" for equal-width bins.

    Returns
    -------
    PSISummary
        Total PSI and bin-level contribution table.
    """
    expected_scores = pd.Series(expected_scores).astype(float)
    observed_scores = pd.Series(observed_scores).astype(float)

    if strategy not in {"quantile", "uniform"}:
        raise ValueError("strategy must be either 'quantile' or 'uniform'.")

    if strategy == "quantile":
        bin_edges = np.unique(
            np.quantile(expected_scores, q=np.linspace(0, 1, bins + 1))
        )
    else:
        bin_edges = np.linspace(expected_scores.min(), expected_scores.max(), bins + 1)

    if len(bin_edges) < 2:
        raise ValueError("Not enough unique values to form bins.")

    # Include the right edge
    expected_binned = pd.cut(expected_scores, bins=bin_edges, include_lowest=True, duplicates="drop")
    observed_binned = pd.cut(observed_scores, bins=bin_edges, include_lowest=True, duplicates="drop")

    expected_dist = expected_binned.value_counts(normalize=True, sort=False)
    observed_dist = observed_binned.value_counts(normalize=True, sort=False)

    # Align indices in case some observed bins are empty
    expected_dist, observed_dist = expected_dist.align(observed_dist, fill_value=0.0)

    summary = compute_psi_from_distributions(
        expected=expected_dist.values,
        observed=observed_dist.values
    )

    summary.bin_table["bin_label"] = expected_dist.index.astype(str)
    cols = ["bin", "bin_label", "expected_pct", "observed_pct", "psi_component"]
    summary.bin_table = summary.bin_table[cols]

    return summary


# Example usage
reference_scores = pd.Series([620, 640, 660, 680, 700, 720, 740, 760, 780, 800])
current_scores   = pd.Series([600, 620, 640, 650, 670, 690, 710, 730, 760, 790])

psi_result = compute_psi_from_scores(reference_scores, current_scores, bins=5, strategy="quantile")

print("Total PSI:", round(psi_result.total_psi, 4))
print("\nBin-level PSI table:")
print(psi_result.bin_table)
```

This does the real work a monitoring script should do:

- fixes bins from the reference sample
    
- compares current population against that fixed frame
    
- smooths zero cells
    
- returns both total PSI and bin-level contributions
    
- makes the output traceable for dashboards and governance packs
    

That is the kind of code that belongs in a controlled monitoring environment beside [[Model-Performance-Metrics]].

### PSI as an Ongoing Monitoring Trigger

A mature monitoring rule is often framed operationally, not academically:

$$  
\text{Escalate if } PSI_t \geq \tau  
$$

where:

- $PSI_t$ is the monitored PSI at time $t$
    
- $\tau$ is the approved threshold, often 0.10 or 0.25 depending on severity tiers
    

This creates a governance ladder:

|PSI condition|Typical response|
|---|---|
|Low PSI|Continue standard monitoring|
|Moderate PSI|Investigate drift source, review segment behavior|
|High PSI|Formal model review, performance deep-dive, possible remediation or retraining|

This is why PSI is so useful under [[SR-11-7-Model-Governance]]. It converts “the portfolio feels different” into a measurable escalation signal.

### What PSI Cannot Tell You

This is where elite understanding begins.

PSI does **not** tell you:

- whether default relationships changed
    
- whether the model is miscalibrated
    
- whether a variable became causally irrelevant
    
- whether the drift is harmful or benign
    
- whether the model should definitely be redeveloped
    

It only tells you that the monitored distribution has moved.

That means a good validator uses PSI as the **start of the investigation**, not the end.

### What Validators Attack First

Under [[SR-11-7-Model-Governance]], validators usually challenge PSI monitoring on:

- choice of reference population
    
- appropriateness of binning design
    
- seasonality versus structural drift
    
- segment-level masking of important changes
    
- whether thresholds are justified
    
- whether high-PSI events actually lead to action
    
- whether score PSI is being used without variable-level drilldown
    
- whether drift is due to policy change, data error, or real portfolio evolution
    

That is the sixth red-pill truth: **bad PSI governance is often worse than no PSI at all**, because people feel safe while ignoring why the population moved.

### PSI and the Credit Risk OS

PSI connects naturally to the rest of the system:

- [[Logistic-Regression-Scorecards]] because scorecards drift when populations change
    
- [[Advanced-ML-in-Risk]] because complex models can be even more fragile under drift
    
- [[Model-Performance-Metrics]] because drift and discrimination must be monitored together
    
- [[Probability-of-Default]] because PD calibration can break under population change
    
- [[IFRS-9-and-ECL]] because stage allocations and ECL behavior can become unstable when score distributions shift
    

That is why PSI is not a side note. It is the production-survival metric.

### The Real Red-Pill Summary

The shallow answer is:

“PSI measures whether the current population has shifted from the development population.”

The real answer is:

“PSI is a production-monitoring drift statistic that compares reference and current bin distributions to detect whether the environment seen by a risk model has moved enough to threaten interpretability, calibration, and governance, making it a critical early-warning control alongside discrimination metrics and validation thresholds.”
