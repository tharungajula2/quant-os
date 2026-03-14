---
title: "Weight of Evidence (WOE) and Information Value (IV)"
date: 2026-03-14
tags: [feature-engineering, WOE, IV, scorecard]
cluster: Execution, Validation & ML
---


---

## The Feynman Hook

Imagine you are a school detective trying to guess which students are likely to return library books late. You look at clues like age, number of past late returns, and whether they live far away. But instead of keeping those clues messy and raw, you turn each clue into a clean “evidence score” that tells you whether it points toward a reliable student or a risky one. That is what **Weight of Evidence (WoE)** does.

Now imagine you want to know which clue is actually useful. Maybe “past late returns” is very powerful, while “favorite color” tells you almost nothing. **Information Value (IV)** is the quick screening tool that tells you how strong each variable is at separating good borrowers from bad borrowers. In credit risk, WoE is the language that converts messy raw variables into disciplined evidence, and IV is the first filter that tells you whether a variable deserves a seat at the table.

## The Institutional Reality

At a global bank, [[Weight-of-Evidence-and-IV]] sits inside the classic credit scorecard pipeline that eventually feeds [[Logistic-Regression-Scorecards]]. The baseline report you uploaded defines WoE as a transformation that converts categorical or binned numerical variables into a statistically meaningful measure of how strongly each bin separates non-defaults from defaults, and IV as the summary statistic that ranks a variable’s predictive power.

This matters because banks rarely trust raw variables in their original form. A raw income value, utilization ratio, or age field can be noisy, nonlinear, unstable, and difficult to explain. Regulators and validators usually prefer transformations that are:

- monotonic where possible
    
- interpretable by non-technical stakeholders
    
- robust to missing values
    
- stable over time
    
- easy to audit and reproduce
    

That is exactly why WoE became so dominant in scorecard modeling. It translates each bin of a variable into a **log-odds style evidence contribution**, which aligns naturally with the linear logit structure of [[Logistic-Regression-Scorecards]]. Instead of telling a credit committee that “income interacts nonlinearly with default risk,” you can tell them: “this income band contains relatively more goods than bads, so it gets positive evidence.” That is far easier to explain under [[SR-11-7-Model-Governance]] than a black-box feature transformation.

### Why Banks Love WoE Even in the Age of ML

This is the first red-pill insight: **WoE is not old-fashioned because banks are behind. WoE survives because banks are governed.**

A deep-learning model may discover richer nonlinear patterns, but a scorecard-based risk framework still wins in many production settings because it gives the institution:

- stable variable transformations
    
- monotonic risk ordering
    
- transparent bin-level interpretation
    
- simpler documentation and validation
    
- easier override and policy alignment
    
- cleaner mapping from raw data to credit decision logic
    

This is why WoE connects directly not only to [[Logistic-Regression-Scorecards]], but also to [[Advanced-ML-in-Risk]]. Advanced ML can outperform scorecards in some contexts, but the governance cost is much higher. WoE is part of the reason traditional scorecards remain alive in retail banking, collections, application scoring, and some validation-friendly risk environments.

### The Real Job of WoE

A weak answer says:

> “WoE is a variable transformation.”

A stronger answer says:

> “WoE is a disciplined way to convert binned predictor behavior into additive log-odds evidence aligned with scorecard modeling, while preserving interpretability, monotonicity, and governance.”

That is the real institutional role.

Suppose a variable like utilization rate has five bins. Raw utilization is continuous, nonlinear, and can be unstable at extremes. WoE turns each bin into a single evidence number. That gives the bank three major advantages:

1. **Nonlinearity becomes structured**  
    Instead of forcing the logistic model to fit raw nonlinear patterns badly, the bank captures them through bins.
    
2. **Missing values become first-class citizens**  
    Missingness often carries credit meaning. WoE lets the bank assign a dedicated bin and evidence value.
    
3. **Interpretation becomes operational**  
    Each bin can be explained to validators, committees, and auditors in human language.
    

That is why WoE is often described as a bridge between raw business data and governed statistical modeling. The baseline report says exactly this: WoE and IV act as the bridge between raw data and logistic models, improving stability and interpretability.

### The Real Job of IV

IV is not a final model metric. It is a **screening and prioritization tool**. It tells you how much a variable, across its bins, separates goods and bads. Banks use it early in development to:

- rank candidate predictors
    
- eliminate useless variables
    
- compare alternative binnings
    
- detect suspiciously powerful variables that may reflect leakage
    
- support feature selection in scorecard development
    

This is the second red-pill insight: **high IV is not always good news**.

A very high IV may mean the variable is extremely predictive. But it can also signal:

- target leakage
    
- policy contamination
    
- post-event information
    
- unstable operational artifacts
    
- data fields that will not exist at decision time
    

So IV is useful, but never enough by itself. Under [[SR-11-7-Model-Governance]], validators will always ask whether a high-IV variable is conceptually legitimate, available at the correct time, and stable in production.

### Why Monotonic Binning Is Such a Big Deal

In scorecard development, banks often bin a continuous variable before computing WoE. That is not just for convenience. It is because raw predictors often have jagged empirical default rates. If every small fluctuation were left untreated, the model would become noisy and fragile.

So practitioners usually aim for bins that are:

- economically sensible
    
- large enough to be statistically meaningful
    
- monotonic in default tendency where appropriate
    
- stable through time
    
- not overly granular
    

This is where model development becomes more artful than many beginners expect. Two analysts can use the same raw variable and produce very different binning schemes. One produces a robust scorecard. The other produces an overfit mess. That is why WoE/IV is not trivial preprocessing. It is part of the bank’s risk judgment architecture.

## The Core Math / Code

For each bin $i$, define:

- $G_i$ = number of good accounts in bin $i$
    
- $B_i$ = number of bad accounts in bin $i$
    
- $G$ = total good accounts in the sample
    
- $B$ = total bad accounts in the sample
    

Then the good share and bad share for that bin are:

$$  
g_i = \frac{G_i}{G}  
$$

$$  
b_i = \frac{B_i}{B}  
$$

The **Weight of Evidence** for bin $i$ is:

$$  
WoE_i = \ln\left(\frac{g_i}{b_i}\right)  
$$

This is the most important formula in the entire note.

### How to Read WoE

- If $WoE_i > 0$, the bin contains proportionally more goods than bads, so it is lower risk.
    
- If $WoE_i < 0$, the bin contains proportionally more bads than goods, so it is higher risk.
    
- If $WoE_i = 0$, the bin has the same relative share of goods and bads as the overall sample.
    

That means WoE is really a bin-level **log evidence ratio**.

This is why it aligns so beautifully with logistic regression. Since [[Logistic-Regression-Scorecards]] models the log-odds of default linearly, feeding it WoE-transformed variables makes each feature contribution easier to interpret and often more stable.

### Information Value

The **Information Value** of a variable is:

$$  
IV = \sum_i (g_i - b_i)\times WoE_i  
$$

The baseline report gives this exact structure and notes its broad use in screening and ranking features in credit scoring.

This can be understood as a weighted distance between the good and bad distributions across bins. If goods and bads are distributed similarly, IV is small. If they separate strongly, IV is larger.

A common interpretation guide is:

|IV Range|Typical Interpretation|
|---|---|
|Less than 0.02|Not useful or very weak|
|0.02 to 0.10|Weak predictive power|
|0.10 to 0.30|Medium predictive power|
|0.30 to 0.50|Strong predictive power|
|Above 0.50|Very strong, but investigate for leakage or instability|

These thresholds are heuristics, not laws. They are useful, but no serious modeler treats them as automatic truth.

### Why Smoothing Is Necessary

A major practical issue is zero counts. If a bin has zero bads or zero goods, then the ratio inside the logarithm becomes undefined or explodes. So practitioners usually apply a small smoothing constant.

A smoothed version is:

$$  
WoE_i = \ln\left(\frac{G_i + \epsilon}{G + k\epsilon}\middle/\frac{B_i + \epsilon}{B + k\epsilon}\right)  
$$

where:

- $\epsilon$ is a small positive constant
    
- $k$ is the number of bins
    

The exact implementation varies, but the core idea is always the same: prevent unstable infinite WoE values when samples are sparse.

### Worked Example

Suppose a variable has three bins:

|Bin|Goods|Bads|
|---|--:|--:|
|Low utilization|500|50|
|Medium utilization|300|80|
|High utilization|200|120|

Total goods:

$$  
G = 500 + 300 + 200 = 1000  
$$

Total bads:

$$  
B = 50 + 80 + 120 = 250  
$$

For the low-utilization bin:

$$  
g_1 = \frac{500}{1000} = 0.50  
$$

$$  
b_1 = \frac{50}{250} = 0.20  
$$

So:

$$  
WoE_1 = \ln\left(\frac{0.50}{0.20}\right)=\ln(2.5)\approx 0.916  
$$

Positive WoE means that low utilization is relatively safer.

For the high-utilization bin:

$$  
g_3 = \frac{200}{1000}=0.20  
$$

$$  
b_3 = \frac{120}{250}=0.48  
$$

So:

$$  
WoE_3 = \ln\left(\frac{0.20}{0.48}\right)=\ln(0.4167)\approx -0.875  
$$

Negative WoE means high utilization is relatively riskier.

This is the exact intuition a credit committee can understand. High utilization is associated with more bads relative to goods, so it contributes negative evidence.

### Why WoE Fits Logistic Regression So Naturally

A standard logistic regression is:

$$  
\log\left(\frac{p}{1-p}\right)=\beta_0+\beta_1x_1+\cdots+\beta_kx_k  
$$

If each $x_j$ is a WoE-transformed variable, then the model becomes a weighted sum of evidence contributions.

That means the scorecard logic becomes beautifully interpretable:

- each bin has a WoE value
    
- each variable has a logistic coefficient
    
- the product of coefficient and WoE becomes the variable’s contribution to log-odds
    

This is why the next note, [[Logistic-Regression-Scorecards]], is such a natural continuation.

### A Production-Grade Python Example

Below is a clean Python example showing how to compute WoE and IV for one binned variable. This is not a toy one-liner; it is close to how a controlled feature-engineering utility would look in development work.

```python
import numpy as np
import pandas as pd


def compute_woe_iv(
    df: pd.DataFrame,
    feature_col: str,
    target_col: str,
    event_value: int = 1,
    eps: float = 1e-6
) -> pd.DataFrame:
    """
    Compute Weight of Evidence (WoE) and Information Value (IV) for a binned feature.

    Parameters
    ----------
    df : pd.DataFrame
        Input data containing a binned feature and a binary target.
    feature_col : str
        Column name for the binned predictor.
    target_col : str
        Column name for the binary target (1 = bad/event, 0 = good/non-event by default).
    event_value : int, default 1
        Value in target_col representing the bad/event class.
    eps : float, default 1e-6
        Small smoothing value to avoid division by zero.

    Returns
    -------
    pd.DataFrame
        Summary table with counts, distributions, WoE, IV contribution, and total IV.
    """
    data = df[[feature_col, target_col]].copy()

    grouped = (
        data.groupby(feature_col, dropna=False)[target_col]
        .agg(
            total_count="count",
            bad_count=lambda x: (x == event_value).sum(),
            good_count=lambda x: (x != event_value).sum(),
        )
        .reset_index()
    )

    total_good = grouped["good_count"].sum()
    total_bad = grouped["bad_count"].sum()

    if total_good == 0 or total_bad == 0:
        raise ValueError("Both good and bad observations must be present.")

    grouped["good_dist"] = (grouped["good_count"] + eps) / (total_good + eps * len(grouped))
    grouped["bad_dist"] = (grouped["bad_count"] + eps) / (total_bad + eps * len(grouped))

    grouped["woe"] = np.log(grouped["good_dist"] / grouped["bad_dist"])
    grouped["iv_component"] = (grouped["good_dist"] - grouped["bad_dist"]) * grouped["woe"]

    total_iv = grouped["iv_component"].sum()
    grouped["total_iv"] = total_iv

    return grouped.sort_values(by="woe", ascending=False).reset_index(drop=True)


# Example usage
df = pd.DataFrame(
    {
        "utilization_bin": [
            "low", "low", "low", "medium", "medium", "high", "high", "high", "high"
        ],
        "default_flag": [0, 0, 1, 0, 1, 1, 1, 0, 1],
    }
)

woe_iv_table = compute_woe_iv(df, feature_col="utilization_bin", target_col="default_flag")
print(woe_iv_table)
```

This code does four things correctly:

1. counts goods and bads by bin
    
2. computes smoothed distributions
    
3. transforms the ratio into WoE
    
4. aggregates IV contribution by bin
    

That is the exact kind of utility that later plugs into a scorecard pipeline under [[Logistic-Regression-Scorecards]].

### WoE Is Powerful, but It Can Be Misused

This is where elite understanding begins.

WoE and IV can go badly wrong when:

- bins are overfit to one development sample
    
- IV is used without conceptual review
    
- leakage variables are allowed through because they look predictive
    
- missing-value bins are not understood operationally
    
- monotonic binning is forced where the economic relationship is genuinely non-monotonic
    
- the modeler optimizes IV at the expense of production stability
    

Under [[SR-11-7-Model-Governance]], validators often ask:

- Was the binning logic stable across time?
    
- Was the variable available at decision time?
    
- Was the variable contaminated by policy or post-event behavior?
    
- Does the WoE ordering make economic sense?
    
- Are there bins with low support and unstable evidence?
    
- Has the variable drifted in production, linking to [[Population-Stability-Index-PSI]]?
    

That is why WoE/IV is not just preprocessing. It is regulated feature engineering.

### WoE vs Raw Features vs Advanced ML Features

|Approach|Strength|Weakness|Best linked note|
|---|---|---|---|
|Raw features in logistic regression|Simple start|Can miss nonlinearity and be harder to govern|[[Logistic-Regression-Scorecards]]|
|WoE-transformed features|Interpretable, monotonic, governance-friendly|Requires careful binning and stability testing|[[Weight-of-Evidence-and-IV]]|
|Complex engineered features for ML|Potentially higher predictive power|Higher explainability and validation burden|[[Advanced-ML-in-Risk]]|

This table captures the strategic truth: WoE exists because banks often value controlled transparency over unconstrained predictive complexity.

### The Real Red-Pill Summary

The shallow answer is:

“WoE transforms bins and IV measures predictive power.”

The real answer is:

“WoE is a log-odds evidence transformation that converts raw binned predictor behavior into additive, interpretable credit signals aligned with scorecard modeling, while IV is a variable-level separation measure used to screen predictive usefulness, detect weak variables, and support a governed feature-engineering process.”

That is the zero-to-hero version.

