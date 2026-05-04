---
title: "Portfolio Projects Master Summary — 8 End-to-End Projects Across Credit Risk, ML, NLP, RL, Forecasting, and Quant Finance"
date: 2026-03-26
tags:
  - portfolio-summary
  - portfolio-projects
  - credit-risk
  - machine-learning
  - classification
  - nlp
  - reinforcement-learning
  - time-series
  - quant-finance
  - beginner-friendly
  - interview-ready
cluster: "03 — Portfolio Projects"
progress: 0
links:
  - "[[Tharun-Kumar-Gajula]]"
  - "[[2_regression_analysis_masterclass]]"
  - "[[3_machine_learning_masterclass]]"
  - "[[4_python_data_analytics_master_cheatsheet]]"
  - "[[10_quant_modeling_workflow_master_reference]]"
  - "[[1_lending_club_credit_risk_masterclass]]"
  - "[[5_bank_churn_neural_networks_masterclass]]"
  - "[[6_employee_retention_tree_models_masterclass]]"
  - "[[7_socio_economic_household_classification_masterclass]]"
  - "[[8_twitter_sentiment_nlp_masterclass]]"
  - "[[11_cartpole_reinforcement_learning_masterclass]]"
  - "[[12_antidiabetic_drug_prescription_forecasting_masterclass]]"
  - "[[13_nifty100_portfolio_optimization_mpt_masterclass]]"
---

# Portfolio Projects Master Summary — 8 End-to-End Projects Across Credit Risk, ML, NLP, RL, Forecasting, and Quant Finance

> This note is a comprehensive portfolio-level summary across the main project notes in the Analytics & Quant Track.
> It provides a clean map of the technical progression, what each project demonstrates, and how the work fits together into one broader quantitative story.
>
> The objective is to show that the work forms a consistent progression: from business problem framing and preprocessing, to classification, monitoring, NLP, reinforcement learning, forecasting, and portfolio construction.

---

## Related notes

- [[Tharun-Kumar-Gajula]]
- [[2_regression_analysis_masterclass]]
- [[3_machine_learning_masterclass]]
- [[4_python_data_analytics_master_cheatsheet]]
- [[10_quant_modeling_workflow_master_reference]]

---

## The Portfolio in One Line

```text
Retail credit risk
→ customer churn and employee attrition
→ large-scale socio-economic classification
→ NLP sentiment modeling
→ reinforcement learning control
→ time-series forecasting
→ portfolio optimization and modern portfolio theory
```

This portfolio demonstrates that this technical track is not limited to one narrow model family.
It uses different projects to explore:

- scorecards and credit-loss logic
- tabular classification with linear models, trees, ensembles, and neural networks
- text preprocessing and vectorization
- sequential decision-making in reinforcement learning
- classical univariate forecasting
- risk-return trade-offs in portfolio construction

So the portfolio is really a structured learning system across multiple quantitative problem types.

---

## The 8-Project Map

| File | Project | Core problem type | Main methods | Signature takeaway |
|---|---|---|---|---|
| [[1_lending_club_credit_risk_masterclass]] | Lending Club Credit Risk | Credit-risk modeling | WoE, IV, logistic regression scorecard, PD/LGD/EAD, monitoring | End-to-end credit-risk workflow matters more than one model metric |
| [[5_bank_churn_neural_networks_masterclass]] | Bank Churn Prediction | Binary classification | neural networks, Adam, dropout, SMOTE | Metric choice depends on business cost, not accuracy alone |
| [[6_employee_retention_tree_models_masterclass]] | Employee Retention & Performance Analytics | Binary classification | logistic regression, decision trees, random forests | Tree ensembles can capture non-linear attrition patterns far better than a linear baseline |
| [[7_socio_economic_household_classification_masterclass]] | Socio-Economic Household Classification | Large-scale tabular classification | logistic regression, trees, random forest, XGBoost, PCA, ensemble | preprocessing discipline and feature engineering matter as much as model choice |
| [[8_twitter_sentiment_nlp_masterclass]] | Twitter Sentiment Analysis with NLP | Multi-class text classification | text cleaning, CountVectorizer, TF-IDF, random forest | text must be converted into structured numeric features before modeling |
| [[11_cartpole_reinforcement_learning_masterclass]] | CartPole Reinforcement Learning | Reinforcement learning / control | REINFORCE, PPO, DQN, Actor-Critic, SAC, Twin-Q | reward design can change convergence behavior dramatically |
| [[12_antidiabetic_drug_prescription_forecasting_masterclass]] | Antidiabetic Drug Prescription Forecasting | Time-series forecasting | STL, ADF, SARIMA, rolling forecasts, MAPE | chronology, stationarity, and baselines are central in forecasting |
| [[13_nifty100_portfolio_optimization_mpt_masterclass]] | NIFTY 100 Portfolio Optimization | Portfolio construction / quant finance | log returns, covariance, Monte Carlo weights, efficient frontier | portfolio thinking is about covariance and risk-adjusted trade-offs, not single-stock ranking |

---

## Why These Projects Fit Together

At first glance, these projects look very different.
But they are all built around the same deeper workflow:

```text
define the business question
→ understand the data generating process
→ clean and transform the inputs
→ choose a model family that matches the problem
→ evaluate against the right metric and baseline
→ interpret results honestly
→ connect the notebook result to a more realistic production version
```

That workflow appears again and again across the full portfolio.
The datasets and algorithms change, but the reasoning discipline stays the same.

---

## Project 1 — Lending Club Credit Risk Masterclass

### What this project is really about

This is the strongest credit-risk anchor in the portfolio.
It turns the Lending Club dataset into one connected retail-risk story:

```text
raw loan data
→ define Good / Bad
→ preprocess and bin variables
→ build a PD scorecard
→ validate it
→ monitor it on later data
→ extend to LGD and EAD
→ combine into Expected Loss
→ connect to CECL and stress testing
```

So this project is not just a classifier.
It is an end-to-end credit-risk system note.

### Core methods and ideas

- binary target definition through `good_bad`
- WoE and IV for variable transformation and selection
- logistic regression scorecard logic
- validation through discrimination metrics and threshold interpretation
- monitoring through PSI / CSI-style stability analysis on later data
- extension from PD into LGD, EAD, and Expected Loss

### Why it matters in this track

This project demonstrates a technical capability that extends beyond a single predictive model.
It brings together:

- underwriting logic
- scorecard modeling
- validation
- monitoring
- loss modeling
- regulatory extensions like CECL and stress testing

It shows how a model fits into a real banking workflow rather than treating modeling as a standalone exercise.

### The main lesson I retain

The most important lesson is that **PD alone is not the whole story**.
A strong credit-risk workflow needs:

- target definition
- interpretable development logic
- validation discipline
- monitoring after deployment
- and finally translation into money through `PD × LGD × EAD`

---

## Project 2 — Bank Churn Prediction with Neural Networks

### What this project is really about

This project uses a bank customer dataset to learn binary classification through a neural-network lens.
The business problem is simple: predict whether a customer will exit the bank in the next six months.

But the deeper learning goal is broader:

- how tabular data is preprocessed for neural networks
- how optimizers change learning behavior
- how class imbalance changes evaluation
- why recall can matter more than accuracy in a retention problem

### Core methods and ideas

- preprocessing with encoding and scaling
- feedforward neural networks with ReLU hidden layers and sigmoid output
- comparison of SGD vs Adam
- dropout regularization
- hyperparameter tuning
- SMOTE for class imbalance handling
- confusion-matrix interpretation, precision, recall, and ROC-AUC

### Final modeling takeaway

The tuned neural network gave the best overall ROC-AUC balance at about **0.8547**, but the SMOTE-based model was the best business choice when the goal became **catching more churners**, with churn recall rising to about **0.75**.

That means the project is a very good example of a real modeling trade-off:

- the statistically cleaner model is not always the preferred business model
- the preferred business model depends on the cost of false negatives versus false positives

### Why it matters in this track

This project demonstrates an understanding of an important practical point:

> a model should not be chosen by accuracy alone.

In retention-style problems, missing an at-risk customer can matter more than incorrectly flagging a safe one.
That reasoning is central to high-fidelity banking and risk analytics.

---

## Project 3 — Employee Retention & Performance Analytics

### What this project is really about

This is another classification project, but it teaches a different lesson from bank churn.
Here the focus is not neural networks.
The focus is on comparing:

- logistic regression
- decision trees
- random forests
- simple feature engineering

The business problem is employee attrition, but the modeling lesson is really about **non-linearity and interaction effects**.

### Core methods and ideas

- duplicate removal and data-quality checks
- logistic regression as a probability-based baseline
- decision trees with impurity-based splitting
- random forests as a stronger ensemble model
- grid search with ROC-AUC-based refit
- evaluation with precision, recall, F1, accuracy, and ROC-AUC
- feature engineering through the `overworked` indicator

### Final modeling takeaway

The strongest model in the notebook was the **first random forest**, with test performance around:

- **AUC ≈ 0.955**
- **accuracy ≈ 0.980**
- strong precision and recall for attrition prediction

The later feature-engineering branch was actually weaker after dropping `satisfaction_level`.
That is a very useful lesson:

> feature engineering should be tested empirically, not assumed to help automatically.

### Why it matters in this track

This project demonstrates why tree-based models often outperform linear baselines on real tabular problems with threshold behavior and interactions.
It is also a strong example of using validation structure more carefully rather than relying on one casual train-test split.

---

## Project 4 — Socio-Economic Household Classification

### What this project is really about

This is one of the largest and messiest tabular projects in the portfolio.
The task is to classify households as **Rural** or **Urban** using socio-economic, demographic, and income-related variables.

But the real value of the project is that it forces me to handle:

- duplicate-heavy raw data
- sentinel missing values such as `-99`
- outlier treatment
- feature engineering
- encoding and scaling
- class imbalance
- model comparison across many families

### Core methods and ideas

- heavy preprocessing and duplicate removal
- missing-value normalization from sentinel codes to `NaN`
- winsorization-style capping of extreme income values
- engineered features like investment income and size-to-income ratios
- logistic regression baseline
- decision trees and random forests
- XGBoost, PCA, SMOTE, and ensemble voting

### Final modeling takeaway

The best notebook score came from the **final full-feature XGBoost model**, at about **84.05% test accuracy**.
Tuned random forest was also very strong at about **83.56%** and serves as one of the cleanest benchmarks in the project.

The deeper lesson is that this project is not only about the final algorithm.
It is about data design discipline:

- what to drop
- what to transform
- what to cap
- what to encode
- what to engineer
- and how to interpret class-level performance instead of trusting overall accuracy alone

### Why it matters in this track

This project is a strong demonstration of broad tabular ML workflow maturity.
It shows how to work through a larger and noisier dataset without collapsing the analysis into only “run XGBoost and report the score.”

---

## Project 5 — Twitter Sentiment Analysis with NLP

### What this project is really about

This project shifts the portfolio from structured tables into unstructured text.
The business problem is to classify airline-related tweets as:

- negative
- neutral
- positive

But the deeper learning goal is to understand how text becomes model input.

### Core methods and ideas

- keeping only the text and target label for a clean NLP baseline
- text cleaning: HTML removal, contraction expansion, number removal
- tokenization, stopword removal, and lemmatization
- CountVectorizer and TF-IDF representations
- stratified train-test split
- random forest classifier for multi-class prediction
- confusion matrix and class-wise precision / recall / F1

### Final modeling takeaway

In this notebook, **CountVectorizer + Random Forest** slightly outperformed **TF-IDF + Random Forest**, with:

- **test accuracy ≈ 77%** for CountVectorizer
- **test accuracy ≈ 75%** for TF-IDF

The negative class was easiest to detect, while the neutral class was clearly the hardest.
That is a very realistic sentiment-modeling lesson, because neutral language often overlaps with both positive and negative language.

### Why it matters in this track

This project proves that the track is not limited to structured numeric data.
It shows how to reason about:

- raw language data
- sparse feature spaces
- representation choices
- class imbalance in NLP
- and methodological caveats like vectorizer leakage if fit before the split

This is essential for any broader analytics setting where text data appears.

---

## Project 6 — CartPole Reinforcement Learning Masterclass

### What this project is really about

This project is conceptually very different from the rest of the portfolio.
Instead of predicting a static label, the agent must learn a policy through repeated interaction with an environment.

The core story is:

```text
understand the CartPole state space
→ start with plain policy gradient
→ reduce variance with baseline subtraction
→ redesign the reward
→ tune hyperparameters
→ compare stronger algorithms like PPO, DQN, Actor-Critic, SAC, and Twin-Q
```

### Core methods and ideas

- policy-gradient baseline / REINFORCE-style training
- baseline subtraction for variance reduction
- custom reward shaping
- algorithm comparison across policy-based, value-based, and hybrid RL methods
- evaluation on CartPole-v0 and CartPole-v1
- comparison through convergence speed, stability, and final success rates

### Final modeling takeaway

The most important result is not just which algorithm won.
It is that **reward shaping changed the whole learning behavior**.

Within the REINFORCE-side progression:

- plain baseline solved v0 in **328 episodes**
- baseline subtraction improved convergence to **275 episodes**
- exponential custom reward improved it further to **228 episodes**

Across the broader comparison, **SAC with custom reward** was the fastest standout result, converging in about **38 episodes** on CartPole-v0 while achieving perfect success in the reported test runs.

### Why it matters in this track

This project moves beyond supervised learning and explores:

- states
- actions
- returns
- exploration
- policy improvement
- reward design

It adds a completely different modeling paradigm to the track and shows broader technical range.

---

## Project 7 — Antidiabetic Drug Prescription Forecasting

### What this project is really about

This project introduces classical time-series forecasting through a monthly prescription series.
The task is to forecast future demand, but the real learning goal is to understand how forecasting differs from ordinary tabular machine learning.

The workflow becomes:

```text
visualize the series
→ inspect trend and seasonality
→ test stationarity
→ difference appropriately
→ choose SARIMA
→ validate residuals
→ generate rolling forecasts
→ compare with a seasonal naive baseline
```

### Core methods and ideas

- time-aware train-test split
- STL decomposition for trend and seasonality inspection
- Augmented Dickey-Fuller testing for stationarity
- ordinary and seasonal differencing
- SARIMA model selection across many candidate orders using AIC
- residual diagnostics and Ljung-Box logic
- rolling 12-month forecasts
- MAPE-based comparison against a seasonal naive baseline

### Final modeling takeaway

The selected model was:

```text
SARIMA(2,1,3)(1,1,3)12
```

It clearly beat the seasonal naive baseline on the notebook’s chosen metric:

- **naive seasonal MAPE ≈ 12.69%**
- **SARIMA MAPE ≈ 7.90%**

That makes the project a clean demonstration of why forecasting requires its own discipline:

- chronology must be preserved
- stationarity matters in classical models
- residual diagnostics matter
- and simple baselines are essential

### Why it matters in this track

This project adds a different problem type: **predicting the future of a sequence**, not classifying independent rows.
This is useful not only for demand planning, but also for bank-style settings like provisioning, collections staffing, liquidity planning, and volume forecasting.

---

## Project 8 — NIFTY 100 Portfolio Optimization

### What this project is really about

This project shifts into quant finance and portfolio construction.
The task is not to predict whether one stock will go up or down.
The task is to think about how many assets combine into one portfolio.

That means the logic becomes:

- returns instead of raw prices
- covariance instead of isolated stock views
- risk-adjusted trade-offs instead of raw return chasing
- diversification instead of single-name ranking

### Core methods and ideas

- build a NIFTY 100 universe and map symbols to Yahoo Finance tickers
- clean a multi-asset price matrix
- compute daily log returns
- annualize mean returns and covariance
- evaluate an equal-weight benchmark
- simulate 10,000 long-only portfolios
- select the best portfolio by a Sharpe-ratio-style score
- visualize the efficient-frontier-style risk-return cloud

### Final modeling takeaway

The equal-weight baseline produced approximately:

- **return = 9.6%**
- **variance = 4.77%**

The best simulated portfolio achieved approximately:

- **Sharpe-ratio-style score = 0.7707**
- **return = 15.27%**
- **volatility = 19.81%**

The main lesson is that portfolio optimization is not really about picking the “best stock.”
It is about how assets interact through covariance and how weights transform those interactions into a risk-return trade-off.

### Why it matters in this track

This project adds a quant-finance layer and shows how assets interact through covariance and how weights transform those interactions into a risk-return trade-off.
It broadens the track beyond predictive analytics into market-risk and investment-style reasoning.

---

## What the Full Portfolio Demonstrates

### 1. Range across problem types

The eight projects cover:

- credit-risk scorecards
- binary classification
- multi-class classification
- text analytics
- reinforcement learning
- classical forecasting
- portfolio optimization

So the portfolio is broad without being random.

### 2. Range across model families

Across the portfolio, I have worked with:

- logistic regression
- WoE / IV scorecard logic
- decision trees
- random forests
- XGBoost
- feedforward neural networks
- bag-of-words vectorization and TF-IDF
- REINFORCE, PPO, DQN, Actor-Critic, SAC, and Twin-Q
- SARIMA
- Monte Carlo portfolio simulation

### 3. Repeated emphasis on business interpretation

The projects are not just technical summaries.
They repeatedly ask:

- what is the business decision?
- what does the target actually mean?
- which error is more costly?
- what is the right baseline?
- what would a real production version add?

That is one of the most important common threads across the portfolio.

### 4. Honest treatment of limitations

Another strong feature of the portfolio is that it does not hide caveats.
The notes repeatedly distinguish between:

- what was actually built in the notebook
- and what a real production workflow would do differently

That makes the portfolio much more credible.

---

## The Main Cross-Project Lessons I Want to Retain

### Baselines matter

Every good project in this portfolio becomes stronger when there is a sensible baseline:

- logistic regression before more complex classifiers
- seasonal naive before SARIMA
- equal-weight before optimized portfolios
- plain policy gradient before stronger RL methods

### Metric choice changes the decision

The best model depends on the objective:

- in churn, recall can matter more than raw accuracy
- in forecasting, MAPE is about out-of-sample error
- in portfolio construction, risk-adjusted return matters more than nominal return alone
- in credit risk, discrimination is not enough without monitoring and loss translation

### Preprocessing is not a side task

Across almost every project, the real work starts before the model:

- target definition
- cleaning
- missing-value treatment
- encoding
- scaling
- feature engineering
- data leakage control

### Interpretation matters as much as implementation

The portfolio works best when I can explain:

- why I chose a method
- what the metric means
- what the result implies
- what the limitations are
- and what I would improve in production

---

## Narrative Summary of the Track

The Analytics & Quant Track consists of eight end-to-end projects across credit risk, customer analytics, NLP, reinforcement learning, forecasting, and quant finance. The common thread is that each is treated as a full modeling workflow rather than a notebook that ends at one score. The focus remains on target definition, preprocessing, model choice, evaluation, and business interpretation. The progression starts from a credit-risk scorecard and expands into neural networks, tree ensembles, text classification, reinforcement learning, SARIMA forecasting, and portfolio optimization.

---

## Final One-Line Summary

This portfolio is best understood as **one structured quantitative learning system**:

```text
credit-risk thinking + machine-learning workflow + business interpretation + honest validation + expanding methodological range
```

That is the main story I want the full set of projects to tell.
