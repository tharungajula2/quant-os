---
title: "Logistic Regression and Scorecards"
date: 2026-03-14
tags: [logistic-regression, scorecards, python]
cluster: Execution, Validation & ML
---

Think of a loan score as a weighted sum of factors, converted to a probability of default.  Logistic regression is the workhorse behind credit scorecards. The model is:

$$

\text{logit}(p) = \ln\frac{p}{1-p} = \beta_0 + \beta_1 x_1 + \dots + \beta_n x_n,

$$

where $p$ is default probability and each $x_j$ (often WOE-transformed) is a predictor.  This ensures $0<p<1$.  After fitting, we interpret coefficients $\beta_j$: a positive $\beta_j$ increases default risk as $x_j$ rises.

In practice, scorecards discretize and WOE-transform variables (see [[Weight-of-Evidence-and-IV]]).  An example: an age category with WOE=0.5 and logistic coefficient 2 contributes $2\times0.5=1.0$ to the logit.  The overall score is often rescaled to a convenient range (e.g. 300–850).  But fundamentally, logistic regression yields the PD for each profile.

Here’s illustrative Python to fit a scorecard model and extract coefficients:

```python
import pandas as pd
from sklearn.linear_model import LogisticRegression

# Example data: features X (WOE encoded) and binary target y (0=good, 1=default)
# (In real use, X would be prepared via WOE/binning and including constant term if needed)
X = pd.DataFrame({
    'woe_age':   [0.2, -0.5, 0.0, 1.2],  # example WOE-transformed feature
    'woe_income':[0.0, 0.0, 0.5, -0.3]
})
y = pd.Series([0, 1, 0, 1])  # 1=bad loan, 0=good

# Fit logistic regression
model = LogisticRegression(solver='lbfgs')
model.fit(X, y)
coeffs = model.coef_
intercept = model.intercept_
print("Coefficients:", coeffs, "Intercept:", intercept)

```

After fitting, the `coeffs` and `intercept` correspond to the β’s in the logit equation. These values directly inform how each feature moves the log-odds. For scorecard reporting, one often converts them into “points” (by scaling) to present to risk managers.

In summary, logistic regression scorecards provide an interpretable, tested framework to predict [[Probability-of-Default]]. Coefficients are routinely extracted (as above) and challenged under [[SR-11-7-Model-Governance]].  Compared to black-box ML, logistic models (especially with WOE inputs) score high on explainability, meeting regulatory expectations for transparency and robustness.
