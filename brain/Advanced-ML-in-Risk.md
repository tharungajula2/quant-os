---
title: "Advanced Machine Learning in Risk"
date: 2026-03-14
tags: [machine-learning, xgboost, ann, shap, ai]
cluster: Execution, Validation & ML
---


---

## The Feynman Hook

Imagine you are trying to predict which students might fail an exam. A simple teacher might use only a few clear rules: missed classes, low homework scores, and poor quizzes. But a more advanced system notices hidden patterns: students who study late, struggle in one subject, and suddenly stop participating often fail together. That smarter system can catch patterns the simple one misses.

That is what **advanced machine learning** does in risk. Traditional scorecards and logistic models are like clean rulebooks. Advanced ML models such as XGBoost and neural networks are like pattern-hunting machines: they can discover nonlinear relationships, interactions, and subtle combinations of variables that classical models may miss.

## The Institutional Reality

At a global bank, [[Advanced-ML-in-Risk.md]] is not about replacing [[Logistic-Regression-Scorecards.md]] just because ML is fashionable. It is about deciding when extra predictive power is worth the extra governance burden. Your baseline report states this clearly: banks increasingly use models such as **XGBoost** and **artificial neural networks** because they can detect complex patterns beyond logistic regression, especially in heterogeneous data. It also highlights that regulators still require interpretability, stability, and strong governance, especially for capital, provisioning, and other material risk uses.

This is the first red-pill truth: **banks do not ask “Is ML more accurate?” first. They ask “Can this ML model survive governance?”** A model in banking must not only rank risk well. It must also be:

- explainable enough for committees and auditors
    
- reproducible in production
    
- monitorable over time
    
- benchmarkable against simpler challengers
    
- stable under population drift
    
- defensible under [[SR-11-7-Model-Governance.md]]
    

That is why advanced ML usually enters the bank in one of four ways:

1. **challenger models** against scorecards or generalized linear models
    
2. **augmentation models** for segmentation, feature engineering, or early-warning systems
    
3. **specialized production models** where nonlinearity clearly matters and governance can support it
    
4. **adjunct analytics** such as surveillance, prioritization, or ranking rather than final credit decisioning
    

The second red-pill truth is that **XGBoost is usually the practical king**, not because it is glamorous, but because it often gives a strong performance-explainability tradeoff. Your baseline report specifically notes that XGBoost often performs well for default prediction with heterogeneous data, while ANNs can capture richer nonlinear interactions. But it also notes that explainability is the condition for adoption, and that SHAP is used to show which features drove predictions.

Why does that matter so much? Because a bank can live with a model that is slightly harder to understand if it can still answer these questions:

- Why did this borrower get a high-risk score?
    
- Which features drove the outcome?
    
- Does that logic make economic sense?
    
- Can I prove the model is not using unstable or prohibited patterns?
    
- Can I explain portfolio-level behavior as well as individual decisions?
    

That is where **Explainable AI** becomes the bridge. The baseline report highlights SHAP exactly for this reason: SHAP values assign feature contributions to a prediction and make complex model outputs more interpretable.

### Where Advanced ML Actually Fits

Advanced ML is strongest where the data are:

- wide and heterogeneous
    
- nonlinear
    
- interaction-heavy
    
- difficult to capture with monotonic binning alone
    
- rich enough to support more complex estimation
    

That often includes:

- retail application or behavioral scoring
    
- collections prioritization
    
- early-warning systems
    
- fraud and anomaly detection links to [[AML-and-Financial-Crime-Models.md]]
    
- complex account-level monitoring where raw transactional behavior matters
    

But the closer the model gets to **Basel capital**, **IFRS 9 provisioning**, or highly regulated adjudication, the stronger the governance scrutiny becomes. Your baseline report makes that point directly: any ML model used for capital or IFRS 9 must be governed like any other risk model, and opaque features may be limited by governance expectations.

So the real institutional question is not “Can we use XGBoost?” It is:

> “For this use case, can we prove that the model’s complexity is justified, interpretable, controlled, and more decision-useful than simpler alternatives such as [[Logistic-Regression-Scorecards.md]]?”

### Why Logistic Regression Still Refuses to Die

The baseline report contrasts advanced ML with logistic scorecards and notes that logistic models score highly on explainability and regulatory comfort.

That matters because the strongest banks do not frame this as **old versus new**. They frame it as:

- logistic scorecards for maximum governance clarity
    
- advanced ML when the nonlinear signal is materially valuable
    
- SHAP and validation overlays to keep the ML model inside institutional control
    
- benchmark comparison so the complex model must earn its place
    

That is the deepest practical view. Advanced ML is not a replacement religion. It is a controlled upgrade path.

## The Core Math / Code

A logistic scorecard models default log-odds as a linear function:

$$  
\log\left(\frac{p}{1-p}\right)=\beta_0+\sum_{j=1}^{k}\beta_j x_j  
$$

That structure is powerful, but limited. It assumes that the effect of each input is additive and mostly linear on the log-odds scale, unless you manually create bins, interactions, and nonlinear transformations in notes like [[Weight-of-Evidence-and-IV.md]] and [[Logistic-Regression-Scorecards.md]].

Advanced ML models break that constraint.

### XGBoost Intuition

A gradient-boosted tree model can be written conceptually as:

$$  
\hat{y}_i=\sum_{m=1}^{M} f_m(x_i), \qquad f_m \in \mathcal{F}  
$$

where each $f_m$ is a decision tree and the final prediction is the sum of many trees.

For binary default modeling, that score is typically pushed through a logistic link:

$$  
p_i=\sigma(\hat{y}_i)=\frac{1}{1+e^{-\hat{y}_i}}  
$$

This is the third red-pill truth: **XGBoost is not “one complex model.” It is an ensemble of many small, structured decision rules added together.** That is why it can capture:

- thresholds
    
- nonlinearities
    
- feature interactions
    
- local pockets of risk behavior
    

without the analyst having to hand-code all of them.

### Neural Network Intuition

A feed-forward neural network can be written in layered form:

$$  
h^{(1)}=\phi(W^{(1)}x+b^{(1)})  
$$

$$  
h^{(2)}=\phi(W^{(2)}h^{(1)}+b^{(2)})  
$$

$$  
p=\sigma(W^{(L)}h^{(L-1)}+b^{(L)})  
$$

This gives enormous flexibility, but that flexibility is exactly what creates governance pain. It becomes harder to explain why one applicant is risky, why sensitivity changed over time, or why the model behaves a certain way outside the training regime.

That is why in many risk functions:

- XGBoost is more common than deep neural networks for tabular credit data
    
- ANNs are used more selectively, often where data are very large or unstructured
    
- simpler challengers remain mandatory
    

### SHAP: The Explainability Bridge

Your baseline report notes that SHAP assigns each feature a contribution that explains why the model made a decision.

A SHAP decomposition can be written as:

$$  
f(x)=\phi_0+\sum_{j=1}^{k}\phi_j  
$$

where:

- $\phi_0$ is the baseline model output
    
- $\phi_j$ is the contribution of feature $j$ for that specific observation
    

This is one of the most important equations in practical ML governance.

It means every prediction can be decomposed into:

- the average starting point
    
- plus or minus feature-level contributions
    

So if a borrower has a high predicted PD, SHAP can show whether that came mainly from:

- very high utilization
    
- recent delinquency spikes
    
- weak income stability
    
- industry stress
    
- leverage, LTV, or liquidity characteristics
    

That is exactly why SHAP is so powerful in risk. It turns “the machine says no” into “the machine says no because these specific variables moved the prediction upward.”

### Local vs Global Explainability

A mature bank uses SHAP in two different ways:

|Explainability Lens|Question it answers|
|---|---|
|Local explanation|Why did this specific account get this prediction?|
|Global explanation|Across the portfolio, which variables generally drive model output?|

This distinction matters because governance needs both:

- local explanation for individual decisions, overrides, and audit review
    
- global explanation for model understanding, policy sanity checks, and ongoing monitoring
    

### Production-Grade Python Example

Below is a clean, production-style example of training an XGBoost default model, validating it, and generating SHAP-based explanations in a structured way.

```python
import numpy as np
import pandas as pd
import xgboost as xgb
import shap

from dataclasses import dataclass
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import train_test_split


@dataclass
class XGBRiskConfig:
    max_depth: int = 4
    learning_rate: float = 0.05
    n_estimators: int = 300
    subsample: float = 0.8
    colsample_bytree: float = 0.8
    reg_alpha: float = 0.0
    reg_lambda: float = 1.0
    min_child_weight: float = 5.0
    random_state: int = 42
    test_size: float = 0.25


def fit_xgb_credit_model(
    data: pd.DataFrame,
    target_col: str,
    feature_cols: list[str],
    config: XGBRiskConfig = XGBRiskConfig(),
) -> dict:
    """
    Train an XGBoost classifier for binary credit default prediction,
    return validation performance and SHAP explanations.

    Parameters
    ----------
    data : pd.DataFrame
        Input dataset with features and binary target.
    target_col : str
        Column containing the binary target (1 = default/bad, 0 = non-default/good).
    feature_cols : list[str]
        Feature column names used for training.
    config : XGBRiskConfig
        Hyperparameter configuration.

    Returns
    -------
    dict
        Model artifacts, validation metrics, feature importances, and SHAP outputs.
    """
    df = data.copy()

    if target_col not in df.columns:
        raise ValueError(f"Target column '{target_col}' not found.")

    missing_features = [c for c in feature_cols if c not in df.columns]
    if missing_features:
        raise ValueError(f"Missing feature columns: {missing_features}")

    X = df[feature_cols]
    y = df[target_col]

    if set(y.unique()) - {0, 1}:
        raise ValueError("Target must be binary with values {0, 1}.")

    X_train, X_valid, y_train, y_valid = train_test_split(
        X,
        y,
        test_size=config.test_size,
        stratify=y,
        random_state=config.random_state,
    )

    model = xgb.XGBClassifier(
        objective="binary:logistic",
        eval_metric="logloss",
        max_depth=config.max_depth,
        learning_rate=config.learning_rate,
        n_estimators=config.n_estimators,
        subsample=config.subsample,
        colsample_bytree=config.colsample_bytree,
        reg_alpha=config.reg_alpha,
        reg_lambda=config.reg_lambda,
        min_child_weight=config.min_child_weight,
        random_state=config.random_state,
    )

    model.fit(X_train, y_train)

    pd_valid = model.predict_proba(X_valid)[:, 1]
    auc_valid = roc_auc_score(y_valid, pd_valid)

    feature_importance = pd.DataFrame(
        {
            "feature": feature_cols,
            "importance_gain": [model.get_booster().get_score(importance_type="gain").get(f, 0.0) for f in feature_cols],
        }
    ).sort_values("importance_gain", ascending=False).reset_index(drop=True)

    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X_valid)

    shap_summary = pd.DataFrame(
        {
            "feature": feature_cols,
            "mean_abs_shap": np.abs(shap_values).mean(axis=0),
        }
    ).sort_values("mean_abs_shap", ascending=False).reset_index(drop=True)

    scored_validation = X_valid.copy()
    scored_validation["predicted_pd"] = pd_valid
    scored_validation["actual_default"] = y_valid.values

    return {
        "model": model,
        "auc_valid": auc_valid,
        "feature_importance": feature_importance,
        "shap_summary": shap_summary,
        "scored_validation": scored_validation,
        "explainer": explainer,
        "shap_values": shap_values,
    }


# Example usage
sample_data = pd.DataFrame(
    {
        "utilization": [0.20, 0.85, 0.50, 0.10, 0.95, 0.40, 0.70, 0.30, 0.60, 0.15],
        "delinq_12m":  [0, 2, 1, 0, 3, 1, 2, 0, 1, 0],
        "ltv":         [0.55, 0.90, 0.70, 0.40, 0.95, 0.65, 0.80, 0.50, 0.75, 0.45],
        "income_stab": [0.90, 0.30, 0.60, 0.95, 0.20, 0.70, 0.40, 0.85, 0.50, 0.92],
        "default_flag":[0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    }
)

features = ["utilization", "delinq_12m", "ltv", "income_stab"]

artifacts = fit_xgb_credit_model(
    data=sample_data,
    target_col="default_flag",
    feature_cols=features
)

print("Validation AUC:", round(artifacts["auc_valid"], 4))
print("\nGain-based feature importance:")
print(artifacts["feature_importance"])
print("\nMean absolute SHAP contribution:")
print(artifacts["shap_summary"])
print("\nValidation sample with predicted PD:")
print(artifacts["scored_validation"].head())
```

This is the kind of workflow that actually fits a bank-grade notebook or prototype:

- clean split between data, features, and target
    
- reproducible configuration
    
- explicit validation metric
    
- model artifact retention
    
- feature importance reporting
    
- SHAP explanation generation for downstream review
    

### What SHAP Does and Does Not Solve

This is the fourth red-pill truth: **SHAP helps explain a model, but it does not automatically make the model governable.**

SHAP can tell you:

- which features moved a prediction up or down
    
- which features dominate model behavior across the sample
    
- whether the model appears to rely on intuitive or suspicious drivers
    

But SHAP does **not** by itself solve:

- unstable training data
    
- bad target definitions
    
- leakage
    
- drift
    
- fairness or prohibited-variable concerns
    
- poor segmentation
    
- broken pipeline implementation
    

That is why SHAP belongs inside a broader control stack with:

- [[Model-Performance-Metrics.md]] for discrimination and ranking performance
    
- [[Population-Stability-Index-PSI.md]] for distribution drift
    
- [[SR-11-7-Model-Governance.md]] for lifecycle control
    
- [[IFRS-9-and-ECL.md]] or [[Basel-IRB-Framework.md]] depending on use case
    

### When ML Wins, and When It Should Lose

A useful bank-grade comparison is below.

|Situation|Logistic / Scorecard likely better|Advanced ML likely better|
|---|---|---|
|Strong need for full transparency|Yes|Only if explainability burden is satisfied|
|Small or moderate structured dataset|Often|Sometimes|
|Heavy nonlinear interactions in rich tabular data|Sometimes|Often|
|Final adjudication with strict governance pressure|Often|Conditional|
|Challenger modeling and early-warning ranking|Sometimes|Often|
|Unstructured or high-cardinality inputs|Rarely|More likely|

This is the real practical mindset. The question is not whether ML is “better.” The question is whether the **incremental signal exceeds the incremental governance cost**.

### What Validators Will Attack First

Under [[SR-11-7-Model-Governance.md]], validators usually challenge advanced ML models on:

- conceptual justification for choosing ML over simpler baselines
    
- feature leakage and decision-time availability
    
- hyperparameter tuning discipline
    
- out-of-sample stability
    
- segmentation reasonableness
    
- sensitivity to drift
    
- explainability sufficiency
    
- benchmark comparison against [[Logistic-Regression-Scorecards.md]]
    
- portfolio and subgroup behavior, not just average performance
    

That is why advanced ML in risk is not just data science. It is **constrained data science**.

### The Real Red-Pill Summary

The shallow answer is:

“Advanced ML like XGBoost and neural networks can outperform logistic regression, and SHAP explains them.”

The real answer is:

“Advanced ML in risk is a controlled attempt to capture nonlinear, interaction-rich credit patterns beyond classical scorecards, with XGBoost often providing the most practical balance of performance and governance, while SHAP serves as the key interpretability bridge that allows complex models to be challenged, monitored, and defended in regulated banking environments.”

