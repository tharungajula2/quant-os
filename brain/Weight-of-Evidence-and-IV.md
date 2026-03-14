---
title: "Weight of Evidence (WOE) and Information Value (IV)"
date: 2026-03-14
tags: [feature-engineering, WOE, IV, scorecard]
cluster: Execution, Validation & ML
---

Imagine each applicant’s attribute (e.g. age) as evidence: weight of evidence (WOE) quantifies how strongly a predictor separates good vs bad loans. WOE is a transformation used in credit scoring to convert categorical or binned numeric variables into continuous scores.  Formally, for each bin $i$:

$$

\text{WOE}_i = \ln\!\Bigl(\frac{\%\,\text{non-events in bin }i}{\%\,\text{events in bin }i}\Bigr),

$$
where “events” are defaults and “non-events” are good loans.  A positive WOE means a bin has a higher proportion of non-defaults (low risk), whereas negative WOE means more defaults (high risk).

Information Value (IV) summarizes a variable’s predictive power:

$$

\text{IV} = \sum_i (\text{Non-event}_i - \text{Event}_i)\times \text{WOE}_i.

$$
IV essentially measures the separation between goods and bads across all bins. In credit risk practice, IV is widely used to screen and rank features. High IV (say >0.5) indicates strong predictive power, while IV <0.02 suggests irrelevance.

In a scorecard workflow, one first bin a continuous predictor (ensuring monotonic relationship), compute WOE for each bin, and then use WOE in logistic regression. This handles non-linearity and missing values elegantly. For example, a table of age binned into ranges might yield WOE values that linearly relate to PD. The WOE transformation also handles zero counts (by applying small adjustments).

Overall, WOE/IV is a bridge between raw data and logistic models. It encodes evidence in a statistically meaningful way, improving model stability.  Machine learning models (see [[Logistic-Regression-Scorecards]] and [[Advanced-ML-in-Risk]]) often use WOE or similar transformations for interpretability. And IV’s use in feature selection is well-recognized – as one study notes, “IV is a widely used technique for feature selection, particularly in credit scoring”.
