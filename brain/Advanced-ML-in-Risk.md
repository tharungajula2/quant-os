---
title: "Advanced Machine Learning in Risk"
date: 2026-03-14
tags: [machine-learning, xgboost, ann, shap, ai]
cluster: Execution, Validation & ML
---

As if trading a simple compass for a GPS, banks are increasingly adopting advanced ML models (XGBoost, neural nets) to predict risk. These algorithms can find complex patterns beyond logistic regression.  For example, XGBoost (gradient-boosted trees) often excels at default prediction with heterogeneous data. Artificial Neural Networks (ANNs) can also capture non-linearities and interactions.

However, regulators still require interpretability and governance. For model adoption, banks employ **Explainable AI**: e.g. SHAP (SHapley Additive exPlanations) values to show feature contributions for each prediction.  SHAP assigns each feature a “shapley value” that sums to the log-odds, clarifying why the model made a decision.  Basel and EBA guidance emphasize that any ML model for capital or IFRS9 must be vetted like any other risk model.  Indeed, one Deloitte reference notes quant roles explicitly covering “AI model validation” in credit risk tasks.

Below is sample Python code showing use of XGBoost and SHAP for explainability:

```python
import xgboost as xgb
from sklearn.model_selection import train_test_split
import shap

# Example data: X (features), y (binary target: default=1)
X, y = ...  # (Load preprocessed data here)

# Train an XGBoost classifier
xgb_model = xgb.XGBClassifier(n_estimators=100, max_depth=4, random_state=42)
xgb_model.fit(X, y)

# Compute SHAP values for explainability
explainer = shap.TreeExplainer(xgb_model)
shap_values = explainer.shap_values(X)

# Summarize feature importance via SHAP
shap.summary_plot(shap_values, X)

```

This code trains an XGBoost model and uses SHAP to explain predictions. Model developers would use SHAP summary plots or force plots to understand which features drive risk.

In risk practice, ML models must also follow stability and validation protocols (see [[SR-11-7-Model-Governance]]). For instance, high-cardinality data (transaction logs, text) might be fed into deep learning networks, but regulators require explaining how key inputs (e.g. income, LTV) affect outputs. Model governance may limit opaque features.

In summary, advanced ML tools (XGBoost, ANNs) can improve predictive power. However, their use in banking is tightly governed: developers must provide explanations (e.g. SHAP) and strong validation. In the risk tech stack, ML is a powerful instrument, but it must be disciplined by explainability and [[Model-Performance-Metrics]] oversight.
