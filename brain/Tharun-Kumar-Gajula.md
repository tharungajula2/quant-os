---
title: "Tharun Kumar Gajula"
date: 2026-03-18
tags:
  - profile
  - MOC
  - credit-risk
  - model-development
  - model-validation
  - portfolio-monitoring
  - quantitative-analytics
  - data-science
  - banking
  - machine-learning
cluster: "00 — System Atlas"
progress: 0
links:
  - "[[1_lending_club_credit_risk_masterclass]]"
  - "[[5_bank_churn_neural_networks_masterclass]]"
  - "[[6_employee_retention_tree_models_masterclass]]"
  - "[[7_socio_economic_household_classification_masterclass]]"
  - "[[8_twitter_sentiment_nlp_masterclass]]"
  - "[[2_regression_analysis_masterclass]]"
  - "[[3_machine_learning_masterclass]]"
  - "[[4_python_data_analytics_master_cheatsheet]]"
---

# Tharun Kumar Gajula

> This note is the master map of my note system. It explains who I am, what I am building, how the current notes connect, and how my background in banking, risk analytics, business analysis, and data science comes together as one coherent direction.
>
> I use this vault as both a learning system and a professional system. It helps me understand concepts from first principles, connect them to project work, and keep the big picture clear: how raw data becomes a model, how a model becomes a business decision, and how that decision must be validated, monitored, interpreted, and improved.

---

## My Direction in One View

I work at the intersection of **credit risk**, **quantitative analytics**, **model development**, **model validation**, **data science foundations**, and **practical banking workflows**.

My background is not limited to one narrow lane. It sits across three layers that matter in real institutions:

1. **Banking and risk context** — understanding lending portfolios, default risk, loss estimation, monitoring, provisioning logic, and how risk decisions are actually used.
2. **Analytical and modeling depth** — using Python, SQL, statistics, machine learning, and model-evaluation methods to convert raw data into measurable insight.
3. **Business and implementation thinking** — documenting workflows, translating requirements, validating systems, and making sure solutions work inside real operational environments.

That combination comes from the way my experience has evolved:

- At **Jana Small Finance Bank**, I worked close to credit-risk analytics, portfolio monitoring, reporting, and model-oriented thinking across lending portfolios.
- At **Lentra AI**, I worked on lending-system workflows, BRDs/FRDs, UAT, API validation, and the translation layer between business requirements and technical implementation.
- Through my academic path in **banking and finance** at NIBM and later **deep learning** at IISc, I built a stronger quantitative layer on top of that practical foundation.
- Through these notes and projects, I am turning that combined base into a more complete system for **credit risk modeling, validation, governance, and broader data-science problem solving**.

This vault is where all of those threads are tied together.

---

## What I Bring Technically

The note system is not separate from my skill set. It reflects the tools and methods I repeatedly use and want to keep sharpening:

- **Python** for data cleaning, modeling, validation, automation, and analytical storytelling
- **SQL** for extraction, portfolio analysis, reporting logic, and data validation
- **Statistics and machine learning** such as linear regression, logistic regression, scorecards, random forests, XGBoost, neural networks, clustering, and NLP pipelines
- **Risk metrics and validation tools** such as confusion matrix logic, precision, recall, F1, KS, AUC, Gini, PSI, cut-off analysis, and stability interpretation
- **Documentation and workflow thinking** through BRDs, FRDs, testing, process mapping, and handoff between business and technical teams

That combination matters to me because I do not want to be strong in only one layer of the work. I want to be able to move from raw data and process understanding all the way to model design, monitoring, governance, and business interpretation.

---

## What This Vault Is Really For

This is not just a collection of isolated notes.

I built it to connect six things properly:

- **credit-risk fundamentals**
- **data-science foundations**
- **math and coding behind models**
- **model development and evaluation**
- **monitoring, validation, and governance**
- **practical business use inside regulated environments**

A very important personal goal sits underneath all of this: I want to understand every major concept through projects, not as disconnected textbook fragments.

That means even when a concept is broader than a specific project, I still want to anchor it back to project work and ask:

- what the concept means
- why it matters
- what math sits behind it
- what the code is doing
- how it would be used in practice
- how I would explain it in an interview

That is why these notes are written the way they are. They are intentionally detailed, beginner-friendly, technical, and practical at the same time.

---

## The Architecture of My Brain Notes

The current system is easiest to understand as **three connected clusters**.

### Cluster 1 — Credit Risk Core

This is the professional spine of the vault.

- [[1_lending_club_credit_risk_masterclass]]

This one master note now brings together the full Lending Club flow in one connected story:

- target definition and bad-rate logic
- preprocessing and feature engineering
- missing-value treatment
- WoE and IV
- logistic regression scorecard building
- validation metrics
- monitoring and drift
- LGD and EAD
- expected loss
- CECL and stress-testing extensions

This note is the anchor of the whole system because it connects statistics, modeling, monitoring, and credit-risk interpretation into one workflow.

### Cluster 2 — Applied Machine Learning Through Projects

These notes broaden my modeling range across different business problems and data types:

- [[5_bank_churn_neural_networks_masterclass]]
- [[6_employee_retention_tree_models_masterclass]]
- [[7_socio_economic_household_classification_masterclass]]
- [[8_twitter_sentiment_nlp_masterclass]]

Together these notes help me internalize classification, tree models, boosting, neural networks, imbalance handling, feature engineering, and NLP through concrete projects.

### Cluster 3 — Data Science Foundations and Toolkit

These notes give me the concept-level base that supports both the risk work and the project work:

- [[2_regression_analysis_masterclass]]
- [[3_machine_learning_masterclass]]
- [[4_python_data_analytics_master_cheatsheet]]

This cluster matters because it helps me step back from individual projects and understand the deeper foundations:

- regression analysis
- statistical assumptions
- logistic regression and classification
- supervised and unsupervised learning
- ensembles and tuning
- Python, Pandas, visualization, and workflow basics

So the vault now has a cleaner structure:

- **one risk master note**
- **four applied projects**
- **three foundational concept notes**

That gives me both depth and breadth.

---

## The Full Brain as a Concept Map

```text
[Tharun-Kumar-Gajula]
        │
        ├── Credit Risk Core
        │      └── [1_lending_club_credit_risk_masterclass]
        │
        ├── Applied Machine Learning Projects
        │      ├── [5_bank_churn_neural_networks_masterclass]
        │      ├── [6_employee_retention_tree_models_masterclass]
        │      ├── [7_socio_economic_household_classification_masterclass]
        │      └── [8_twitter_sentiment_nlp_masterclass]
        │
        └── Data Science Foundations
               ├── [2_regression_analysis_masterclass]
               ├── [3_machine_learning_masterclass]
               └── [4_python_data_analytics_master_cheatsheet]
```

The logic of this structure is simple:

- the **credit-risk master note** gives me the domain spine
- the **applied project notes** help me internalize data-science methods through hands-on work
- the **foundation notes** give me the language, math, and toolkit that make the projects easier to understand and explain
- the profile note sits above all of them and explains the big picture

---

## How the Credit-Risk Core Fits Into Everything Else

### [[1_lending_club_credit_risk_masterclass]] — The Core Risk Modeling Engine

This is the technical anchor of the whole system.

It covers the end-to-end build of a credit-risk modeling workflow using Lending Club data, including:

- Probability of Default (PD)
- scorecard logic
- validation metrics such as confusion matrix, recall, precision, F1, AUROC, KS, and Gini
- monitoring through PSI and CSI-style logic
- LGD and EAD
- expected loss
- CECL and stress-testing extensions

This note matters because it ties together many of the most important ideas in risk modeling:

- how a business problem becomes a statistical target
- why preprocessing decisions change model behavior
- how linear models become probability models through the logistic function
- why scorecards remain important in regulated lending environments
- how monitoring changes the model lifecycle
- why PD alone is not enough unless it is connected to LGD, EAD, and expected loss

This note is where I connect statistics, business logic, and model building most directly.

---

## How the Applied Machine-Learning Notes Fit In

These project notes are not random side projects. I use them to strengthen the broader analytical foundation that supports the risk work.

### [[5_bank_churn_neural_networks_masterclass]] — Neural Networks, Classification, and Imbalance

This note teaches me:

- binary classification
- feature preparation
- scaling and encoding
- neural-network basics
- class imbalance
- threshold tuning
- precision versus recall trade-offs

Even though the project is framed as churn, the transferable lessons are broader:

- early-warning systems
- intervention strategy
- recall-oriented modeling
- probability scoring
- threshold choice

### [[6_employee_retention_tree_models_masterclass]] — Logistic Regression, Trees, and Random Forests

This note helps me understand:

- linear versus non-linear modeling
- logistic regression as a probability model
- decision trees and recursive splitting
- random forests and ensemble averaging
- feature importance
- feature engineering
- model comparison across metrics

This is a very useful bridge note because it places **logistic regression** and **tree-based models** side by side.

### [[7_socio_economic_household_classification_masterclass]] — Large-Scale Tabular Modeling and XGBoost

This note strengthens my understanding of:

- messy real-world tabular data
- missing values and sentinel values
- categorical encoding
- outlier handling
- dimensionality reduction
- class imbalance
- boosted ensembles
- model comparison on larger feature spaces

This project matters because it pushes me toward more realistic data complexity.

### [[8_twitter_sentiment_nlp_masterclass]] — NLP, Feature Extraction, and Unstructured Data

This note expands my range beyond tabular modeling into text analytics.

It covers:

- text cleaning
- tokenization
- lemmatization
- CountVectorizer
- TF-IDF
- multi-class classification
- feature extraction from raw text
- model evaluation in text settings

This note matters because real institutions do not only work with structured tables. They also work with complaint narratives, customer feedback, notes, and other unstructured signals.

---

## How the Foundation Notes Strengthen the Whole System

### [[2_regression_analysis_masterclass]] — Statistics, Regression, and the Language of Relationships

This note gives me the conceptual base for:

- simple and multiple linear regression
- OLS and residuals
- regression assumptions
- interaction terms
- multicollinearity and VIF
- \(R^2\), adjusted \(R^2\), and overfitting
- regularization
- ANOVA and hypothesis-testing toolkit
- logistic regression and classification metrics

This note is important because it helps me understand **why** models behave the way they do, not only how to code them.

### [[3_machine_learning_masterclass]] — The Broad Machine-Learning Landscape

This note acts as the big ML map.

It covers:

- supervised and unsupervised learning
- class imbalance
- feature selection, extraction, and transformation
- Naive Bayes
- K-Means clustering
- decision trees
- random forest
- boosting and XGBoost
- hyperparameter tuning
- cross-validation
- feature importance
- model ethics and explainability

This note matters because it helps me compare models as a system instead of memorizing isolated algorithms.

### [[4_python_data_analytics_master_cheatsheet]] — The Working Toolkit

This note is the practical quick-reference layer of the vault.

It covers:

- core Python syntax and data structures
- functions, loops, comprehensions, and lambda
- Pandas loading, filtering, cleaning, grouping, and merging
- date handling and missing values
- Matplotlib and Seaborn basics
- Conda environments
- Git and GitHub workflow

This note matters because strong analytics depends not only on theory, but also on daily fluency with the actual tools.

---

## The Big Picture: What Concepts This System Covers

One of the most important reasons I built this note system is to avoid learning concepts in isolation.

I want the big picture to stay visible at all times.

### 1. Data Understanding and Data Quality

Across the notes, I repeatedly work with:

- target definition
- missing values
- duplicate handling
- outliers
- encoding
- scaling
- leakage risks
- feature engineering

This is the first layer of almost every serious analytical problem.

### 2. Statistics and Probability

The notes also connect back to core quantitative ideas:

- probability of an event
- conditional loss given an event
- expectation
- variance and uncertainty
- train-test separation
- sampling logic
- signal versus noise
- calibration versus discrimination

This layer matters because good modeling is not just coding. It is applied statistical reasoning.

### 3. Supervised and Unsupervised Learning

The system collectively covers multiple model families:

- linear regression
- logistic regression
- scorecards
- decision trees
- random forests
- XGBoost
- neural networks
- clustering
- Naive Bayes
- NLP classification pipelines

That breadth is useful because it helps me compare models rather than memorizing one favorite model.

### 4. Model Evaluation

A major theme across the vault is that prediction quality is multi-dimensional.

I work with metrics such as:

- accuracy
- precision
- recall
- F1-score
- ROC-AUC
- KS statistic
- Gini
- confusion matrix logic
- cut-off selection
- business-threshold interpretation

This matters because a model cannot be judged by one metric in a vacuum.

### 5. Monitoring, Validation, and Governance

A strong part of my direction is not only model building, but also model challenge and control.

The notes therefore include:

- stability monitoring
- PSI and CSI
- drift diagnosis
- recalibration logic
- pipeline integrity
- score interpretation
- documentation thinking
- governance framing

This is one of the clearest ways this vault reflects my model-validation and risk-governance direction rather than only a generic data-science direction.

### 6. Credit-Risk and Banking Context

The risk-specific note keeps the banking context explicit:

- PD, LGD, EAD
- expected loss
- lifetime loss thinking
- scorecards
- portfolio monitoring
- provisioning logic
- scenario analysis
- regulated deployment thinking

This is the layer that keeps the entire system anchored to my domain rather than floating as purely generic machine learning.

---

## How This Maps to My Background

### Banking and Risk Analytics

My work in credit-risk analytics gave me direct exposure to the way risk is measured and monitored across lending portfolios.

That background is why the Lending Club master note sits at the center of this system. It matches the way I think about real portfolio questions:

- what is default risk?
- how should it be measured?
- how stable is the portfolio?
- how is loss quantified?
- how do analytics support decisions and controls?

### Business Analysis and Lending-System Workflows

My experience in business analysis strengthened a different but equally important layer: the implementation side.

That part of my background helps me think carefully about:

- requirements clarity
- workflow design
- testability
- documentation
- handoff between business and technical teams
- whether an analytical solution can actually survive inside a working process

That is one reason the notes repeatedly discuss not only math and code, but also practical deployment and governance.

### Quantitative and Technical Development

My deeper work in Python, machine learning, and project-based learning is what expands this system beyond traditional business or reporting analytics.

It allows me to move from:

- describing risk
- monitoring risk
- predicting risk
- explaining model behavior
- comparing algorithms
- thinking about validation and remediation

This is the layer that connects the broader machine-learning projects and concept notes back to the risk work.

---

## What This Note System Says About Me Professionally

If I had to summarize what this system shows about me, it is this:

### 1. I am building from a banking base, not from abstraction alone.

The work is anchored in lending, risk, portfolio behavior, and real operational thinking.

### 2. I care about the full model lifecycle.

I do not want to stop at training a model. I want to understand preprocessing, validation, monitoring, governance, and business use.

### 3. I learn concepts through implementation.

I prefer to understand math and code through projects rather than through disconnected definitions.

### 4. I am building both domain depth and data-science breadth.

The vault now includes one integrated credit-risk master note, multiple applied ML projects, and dedicated foundation notes for regression, machine learning, and Python analytics.

### 5. My direction is toward stronger quantitative risk and model-validation capability.

The system is increasingly shaped around defensible models, practical controls, and institution-grade analytical thinking.

---

## How I Use This Vault

This vault serves three purposes for me.

### As a learning system

It helps me revisit concepts from first principles until I can explain them clearly.

### As an interview system

It gives me a way to move from a project to the bigger conceptual question behind it.

For example:

- a churn project becomes a discussion about classification, thresholding, and intervention strategy
- the Lending Club note becomes a discussion about target definition, bad-rate logic, WoE, logistic regression, validation, monitoring, and expected loss
- a regression note becomes a discussion about assumptions, residuals, and why model diagnostics matter
- the Python cheat sheet becomes a rapid revision layer before interviews or project work

### As a long-term professional system

It helps me organize my direction clearly: credit risk, quantitative analytics, data science, validation, and practical business implementation all sit inside one map rather than in separate boxes.

---

## Recommended Reading Flow Inside the Vault

When I want the most coherent path through the system, the cleanest sequence is:

### Path 1 — Interview-first path

1. [[1_lending_club_credit_risk_masterclass]]
2. [[6_employee_retention_tree_models_masterclass]]
3. [[5_bank_churn_neural_networks_masterclass]]
4. [[7_socio_economic_household_classification_masterclass]]
5. [[8_twitter_sentiment_nlp_masterclass]]
6. [[2_regression_analysis_masterclass]]
7. [[3_machine_learning_masterclass]]
8. [[4_python_data_analytics_master_cheatsheet]]

### Path 2 — Foundation-first path

1. [[4_python_data_analytics_master_cheatsheet]]
2. [[2_regression_analysis_masterclass]]
3. [[3_machine_learning_masterclass]]
4. [[1_lending_club_credit_risk_masterclass]]
5. [[6_employee_retention_tree_models_masterclass]]
6. [[5_bank_churn_neural_networks_masterclass]]
7. [[7_socio_economic_household_classification_masterclass]]
8. [[8_twitter_sentiment_nlp_masterclass]]

That gives me two different ways to use the same system depending on whether I want revision speed or deeper conceptual buildup.

---

## Final Anchor

This note is the map.

The rest of the vault is the working machinery.

Together, they represent how I think about my professional direction:

- grounded in banking and credit risk
- strengthened by quantitative and machine-learning depth
- supported by strong Python and data-analysis foundations
- aware of implementation reality
- focused on model quality, monitoring, and governance
- built as a connected system rather than a loose collection of projects

That is the real purpose of this brain.
