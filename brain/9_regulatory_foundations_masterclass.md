---
title: "Regulatory Foundations Masterclass — BCBS 239, Basel III, IFRS 9, CECL, ICAAP, SR 11-7, and AML Basics"
date: 2026-03-18
tags:
  - regulatory-foundations
  - banking
  - credit-risk
  - model-risk
  - governance
  - BCBS-239
  - Basel-III
  - IFRS-9
  - CECL
  - ICAAP
  - SR-11-7
  - AML
  - OFAC
cluster: "04 — Sandbox"
links:
  - "[[Tharun-Kumar-Gajula]]"
  - "[[1_lending_club_credit_risk_masterclass|Lending Club Credit Risk Masterclass]]"
  - "[[2_regression_analysis_masterclass|Regression Analysis Masterclass]]"
  - "[[3_machine_learning_masterclass|Machine Learning Masterclass]]"
  - "[[4_python_data_analytics_master_cheatsheet|Python for Data Analytics Master Cheatsheet]]"
  - "[[5_bank_churn_neural_networks_masterclass|Bank Churn Prediction with Neural Networks]]"
  - "[[6_employee_retention_tree_models_masterclass|Employee Retention and Tree Models]]"
  - "[[7_socio_economic_household_classification_masterclass|Socio-Economic Household Classification]]"
  - "[[8_twitter_sentiment_nlp_masterclass|Twitter Sentiment Analysis with NLP]]"
---

# Regulatory Foundations Masterclass

*This note is my lightweight regulatory map for the whole vault. I do not want this note to become a giant compliance encyclopedia. I want it to help me understand the minimum regulatory language that makes my credit-risk, model-risk, data, and AML discussions sound grounded in real banking practice, especially in a US-bank context.*

---

# 1. Why this note exists

Across my project notes, I keep talking about:

- PD, LGD, EAD, Expected Loss, and stress thinking
- model validation, monitoring, and stability
- data quality, lineage, and explainability
- risk reporting, governance, and controls
- AML, sanctions screening, and suspicious activity monitoring

All of those ideas sit inside a broader regulatory and supervisory environment.

This note gives me the **foundational map**. I only need the basics here:

- what each framework is
- why it exists
- where it connects to my projects
- how to explain it simply in an interview
- where to find the official source when I want to verify details

---

# 2. The simplest big-picture map

I can think of the major frameworks in five buckets.

## 2.1 Prudential capital and resilience

These are about whether a bank has enough capital and resilience to survive losses and stress.

Main items:

- **Basel III**
- **Basel III finalising post-crisis reforms** (often informally called **Basel IV**)
- **ICAAP**
- **stress testing / capital planning**

## 2.2 Credit loss accounting

These are about when and how a bank recognizes expected credit losses in financial statements and reserves.

Main items:

- **IFRS 9**
- **CECL**

## 2.3 Data governance and risk reporting

These are about whether management can trust the data that feeds risk reports and decisions.

Main item:

- **BCBS 239**

## 2.4 Model risk governance

This is about how models are built, validated, used, monitored, and governed.

Main item:

- **SR 11-7**

## 2.5 Financial crime and sanctions controls

These are about protecting the bank from illicit money flows, suspicious activity, and sanctioned parties.

Main items:

- **BSA/AML**
- **FFIEC BSA/AML manual**
- **OFAC**

That is the whole note in one picture.

---

# 3. Basel III and the so-called “Basel IV”

## 3.1 What Basel III is

Basel III is the global prudential framework that strengthened bank capital, leverage, and liquidity standards after the global financial crisis.

At a very simple level, Basel III asks:

- does the bank hold enough high-quality capital?
- does it take too much leverage?
- can it survive funding and liquidity stress?
- are its risk-weighted assets calculated in a credible way?

## 3.2 Why I should care

This is the framework sitting behind many big credit-risk and capital conversations.

When I build PD, LGD, and EAD models, I am not automatically “doing Basel,” but those types of parameters matter in the broader world of:

- capital adequacy
- risk-weighted assets
- stress testing
- portfolio risk management
- internal model governance

## 3.3 What people mean by “Basel IV”

In interviews, I should be careful here.

The Basel Committee itself talks about **Basel III finalising post-crisis reforms**. In industry conversation, people often call that package **Basel IV**, but that is an informal label.

So the safer phrasing is:

> “I understand Basel IV is an informal market label for the later Basel III reform package, especially the finalisation of post-crisis reforms.”

## 3.4 The beginner-level items I should know

I do **not** need to memorize the entire rulebook.

The essentials are:

- **capital ratios** matter
- **RWA** matters because capital requirements scale with risk-weighted assets
- **standardised vs internal models** matters
- **output floor** matters because it limits how far internal-model RWAs can fall below standardised RWAs
- **stress testing** and **capital planning** are part of the broader resilience story

## 3.5 How this connects to my vault

This connects most strongly to:

- [[1_lending_club_credit_risk_masterclass|Lending Club Credit Risk Masterclass]]
- [[Tharun-Kumar-Gajula]]

because those notes already talk about PD, LGD, EAD, Expected Loss, and validation.

---

# 4. ICAAP — Internal Capital Adequacy Assessment Process

## 4.1 What ICAAP is

ICAAP is the bank’s own internal process for asking:

> “Given my risk profile, strategy, concentrations, and stress scenarios, how much capital do I really need?”

So ICAAP is not just a ratio calculation. It is a **management process**.

It brings together:

- risk identification
- capital planning
- stress testing
- governance
- board oversight
- management judgment

## 4.2 Why ICAAP matters

Pillar 1 gives regulatory formulas.
Pillar 2 asks whether the bank itself has thought deeply enough about risks that may not be fully captured by simple minimum ratios.

That is where ICAAP lives.

## 4.3 The simple interview version

> “ICAAP is the bank’s internal capital self-assessment under Pillar 2. It links the bank’s risk profile, stress scenarios, and business strategy to its capital adequacy and management actions.”

## 4.4 How it connects to my projects

This is where my project thinking becomes relevant:

- PD / LGD / EAD feed loss estimation logic
- stress thinking matters because capital adequacy is not judged only in calm periods
- data quality matters because weak data means weak capital planning
- model governance matters because capital decisions should not rest on poorly controlled models

## 4.5 US-bank nuance

In a US-bank conversation, I should know that the exact term **ICAAP** is more common in international / Basel discussions, while US supervision often emphasizes:

- capital planning
- stress testing
- CCAR / DFAST / stress capital buffer context for larger firms

So if someone says ICAAP in an interview, I should understand the concept, even if the local supervisory language may differ.

---

# 5. BCBS 239 — risk data aggregation and risk reporting

## 5.1 What BCBS 239 is

BCBS 239 is the foundational framework for **effective risk data aggregation and risk reporting**.

This is the regulation that makes me think:

- can the bank gather risk data quickly?
- can it trust the numbers?
- can senior management get the right report at the right time?
- is lineage clear from source system to final risk report?

## 5.2 Why this matters so much

A bank can have excellent models and still fail operationally if:

- data is late
- definitions differ across systems
- business lines calculate exposure differently
- manual Excel patches break traceability
- management reports cannot be reconciled back to source data

So BCBS 239 is not “just data.”
It is really about **decision-grade risk data**.

## 5.3 The simple practical version

When I hear BCBS 239, I should think about:

- governance
- data architecture and infrastructure
- accuracy and integrity
- completeness
- timeliness
- adaptability
- risk reporting quality
- reconciliation and lineage

## 5.4 How this connects to my notes

This connects directly to the way I talk about:

- consistent preprocessing
- monitoring pipelines
- frozen transformations
- score distribution monitoring
- portfolio reporting

So it links strongly to:

- [[1_lending_club_credit_risk_masterclass|Lending Club Credit Risk Masterclass]]
- [[4_python_data_analytics_master_cheatsheet|Python for Data Analytics Master Cheatsheet]]

## 5.5 Easy interview line

> “BCBS 239 is the risk-data and reporting backbone. It pushes banks to ensure that risk numbers are accurate, timely, reconcilable, and usable for management and supervisory decisions.”

---

# 6. IFRS 9 and CECL — expected credit loss accounting

This is one of the most important areas for me because it connects directly to my credit-loss notes.

## 6.1 Why these frameworks exist

Historically, banks were criticized for recognizing credit losses too late.

So newer accounting frameworks moved toward **expected credit loss** thinking.

That means I do not wait only for a fully realized loss event. I estimate expected losses using available information and forward-looking judgment.

## 6.2 IFRS 9 in one simple picture

IFRS 9 is the international accounting framework for financial instruments.

For my purposes, the most important part is the **impairment / expected credit loss** side.

The simplest version I should know:

- loans can move through different credit stages
- expected loss recognition depends on credit deterioration
- forward-looking information matters

## 6.3 CECL in one simple picture

CECL is the US expected credit loss framework under US GAAP.

The simplest version I should know:

- it is more directly **lifetime expected loss** oriented
- it uses historical data, current conditions, and reasonable and supportable forecasts
- it changed the timing of provision recognition compared with older incurred-loss thinking

## 6.4 The safest interview distinction

> “IFRS 9 and CECL are both expected credit loss frameworks, but they are not the same regime. IFRS 9 is the IFRS framework with staging logic, while CECL is the US GAAP framework centered on current expected credit losses.”

## 6.5 How this connects to my Lending Club note

My Lending Club note estimates:

- **PD**
- **LGD**
- **EAD**
- **Expected Loss**

That is very useful conceptually.

But I should be careful not to overclaim:

- my project is a **teaching and modeling framework**
- it is **not** a full production IFRS 9 engine
- it is **not** a full production CECL reserve platform

Still, the bridge is real:

- PD, LGD, and EAD are core ingredients in expected loss thinking
- macro overlays and lifetime horizons matter more in production accounting frameworks

## 6.6 Easy interview line

> “My project gave me the mechanics of expected loss. IFRS 9 and CECL show how that logic is embedded into formal accounting and provisioning frameworks, with stricter governance, horizon, staging, and forecast requirements.”

---

# 7. SR 11-7 — model risk management

## 7.1 What SR 11-7 is

SR 11-7 is the core US supervisory guidance for **model risk management**.

This is the framework that tells me not to think of a model as just code or math. A model is a governed object with lifecycle risk.

## 7.2 The three pillars I should remember

I should remember SR 11-7 using three big buckets:

### 1. Model development, implementation, and use
This asks:

- was the model designed properly?
- is the data appropriate?
- are assumptions documented?
- is implementation faithful to design?
- is the model being used for the purpose it was built for?

### 2. Model validation
This asks:

- does the model work as intended?
- are limitations understood?
- have conceptual soundness, process verification, and outcomes analysis been checked?

### 3. Governance, policies, and controls
This asks:

- who owns the model?
- who validates it?
- are changes controlled?
- is monitoring in place?
- is documentation strong enough?

## 7.3 Why this matters to my vault

This is one of the cleanest bridges to my work because my notes already touch:

- logistic regression scorecards
- validation metrics
- PSI monitoring
- feature drift
- model redevelopment vs recalibration
- limitations and assumptions

So SR 11-7 is the supervisory language behind a lot of what I am already doing conceptually.

## 7.4 Easy interview line

> “SR 11-7 is the backbone of US model governance. It says model risk is managed not only by building a good model, but also by validating it independently, documenting it properly, monitoring it continuously, and governing change.”

---

# 8. AML, BSA/AML, FFIEC, and OFAC basics

I removed the separate AML note because I do not want new overload before the interview.

But I still want the **minimum AML grounding**, because it is relevant to a US-bank environment.

## 8.1 BSA/AML in one line

BSA/AML is the US compliance framework for preventing, detecting, and reporting money laundering and suspicious financial activity.

When I hear BSA/AML, I should think about:

- customer identification and due diligence
- transaction monitoring
- suspicious activity detection and reporting
- program governance and internal controls

## 8.2 What the FFIEC manual is

The FFIEC BSA/AML Examination Manual is the core supervisory reference examiners and banks use to understand the structure of AML/CFT examinations and expectations.

I do not need to memorize the manual. I just need to know it exists and is important.

## 8.3 What OFAC is

OFAC is the Office of Foreign Assets Control in the US Treasury.

This is the sanctions side.

When I hear OFAC, I should think about:

- sanctions lists
- name screening
- blocked parties
- country / program restrictions
- risk-based sanctions compliance

## 8.4 Why AML still connects to my existing notes

Even though I am not focusing on AML deeply right now, the bridge is still useful:

- classification thinking connects to alert triage
- anomaly detection connects to unusual transaction behavior
- NLP connects to adverse media or name-screening assistance
- model governance and monitoring still matter if AML models are used
- data lineage and reporting still matter for investigations and regulatory reporting

So AML is not a separate universe. It sits on top of many of the same data, modeling, and governance ideas.

## 8.5 Easy interview line

> “I am not positioning myself as an AML specialist, but I understand the basics of the US control environment: BSA/AML programs, suspicious activity monitoring, sanctions screening through OFAC, and the importance of governance, data quality, and model controls if analytics are used in financial crime workflows.”

---

# 9. Stress testing and capital planning — where they fit

I do not want this note to become a CCAR manual, but I should know the basic place of stress testing.

Stress testing asks:

> “If the economy deteriorates sharply, what happens to losses, capital, earnings, and resilience?”

That connects to:

- PD going up
- LGD worsening
- EAD behavior changing
- provisions increasing
- capital being consumed

So when I talk about stress testing in my credit-risk notes, I am really pointing toward the broader world of:

- capital planning
- supervisory stress tests
- scenario analysis
- management actions under stress

That is enough foundation for now.

---

# 10. How all of this connects to my vault

## 10.1 Lending Club master note

[[1_lending_club_credit_risk_masterclass|Lending Club Credit Risk Masterclass]] is where I learn:

- PD
- LGD
- EAD
- Expected Loss
- validation
- monitoring

This regulatory note tells me **why those ideas matter inside a bank**.

## 10.2 Regression and ML notes

[[2_regression_analysis_masterclass|Regression Analysis Masterclass]] and [[3_machine_learning_masterclass|Machine Learning Masterclass]] teach me the math and modeling language.

This regulatory note tells me the **control environment** around those models.

## 10.3 Python note

[[4_python_data_analytics_master_cheatsheet|Python for Data Analytics Master Cheatsheet]] gives me the technical tools.

This regulatory note reminds me that tools are not enough unless:

- definitions are clear
- data is controlled
- reports are trustworthy
- governance is strong

## 10.4 Project notes

The project notes show how analytics is built in practice:

- [[5_bank_churn_neural_networks_masterclass|Bank Churn Prediction with Neural Networks]]
- [[6_employee_retention_tree_models_masterclass|Employee Retention and Tree Models]]
- [[7_socio_economic_household_classification_masterclass|Socio-Economic Household Classification]]
- [[8_twitter_sentiment_nlp_masterclass|Twitter Sentiment Analysis with NLP]]

This regulatory note tells me how to think when those same analytics ideas are used in **banking**, where documentation, explainability, controls, and reporting matter much more.

---

# 11. The minimum things I should be able to say clearly

If I only remember a few lines, I want them to be these:

- **Basel III** is the prudential capital and resilience framework.
- **“Basel IV”** is an informal industry label for the later Basel III reform package.
- **ICAAP** is the bank’s internal capital self-assessment under Pillar 2.
- **BCBS 239** is about trustworthy risk data aggregation and reporting.
- **IFRS 9** and **CECL** are expected-credit-loss accounting frameworks, but they are not the same regime.
- **SR 11-7** is the US model risk governance backbone.
- **BSA/AML** is the US anti-money-laundering compliance framework.
- **OFAC** is the US sanctions control framework.

That alone is already enough to sound much more grounded.

---

# 12. Official websites and source links

I want this section for direct reference and verification.

## 12.1 Basel / BCBS / ICAAP / data governance

- BIS Basel III overview: https://www.bis.org/bcbs/basel3.htm
- BIS Basel III finalising post-crisis reforms: https://www.bis.org/bcbs/publ/d424.htm
- BCBS 239 principles (official PDF): https://www.bis.org/publ/bcbs239.pdf
- BIS Pillar 2 / ICAAP summary: https://www.bis.org/fsi/fsisummaries/pillar2.htm

## 12.2 IFRS 9 and CECL

- IFRS Foundation — IFRS 9 overview: https://www.ifrs.org/issued-standards/list-of-standards/ifrs-9-financial-instruments/
- Federal Reserve — CECL FAQ: https://www.federalreserve.gov/supervisionreg/topics/faq-new-accounting-standards-on-financial-instruments-credit-losses.htm
- FDIC — CECL resource page: https://www.fdic.gov/accounting/current-expected-credit-losses-cecl

## 12.3 Model risk governance

- Federal Reserve — SR 11-7: https://www.federalreserve.gov/supervisionreg/srletters/sr1107.htm
- OCC adoption of model risk guidance: https://www.occ.gov/news-issuances/bulletins/2011/bulletin-2011-12.html

## 12.4 US capital planning / stress testing

- Federal Reserve stress tests and capital planning: https://www.federalreserve.gov/supervisionreg/stress-tests-capital-planning.htm
- Federal Reserve CCAR overview and Q&A: https://www.federalreserve.gov/publications/comprehensive-capital-analysis-and-review-questions-and-anwers.htm

## 12.5 AML / sanctions

- FDIC BSA/AML resource page: https://www.fdic.gov/banker-resource-center/bank-secrecy-act-anti-money-laundering-bsaaml
- FFIEC BSA/AML manual: https://bsaaml.ffiec.gov/manual
- OFAC home page: https://ofac.treasury.gov/
- OFAC sanctions programs and country information: https://ofac.treasury.gov/sanctions-programs-and-country-information
- OFAC sanctions list search: https://sanctionssearch.ofac.treas.gov/

---

# 13. Final takeaway

This note is not here to make me a regulatory policy expert.

It is here to make sure that when I talk about:

- scorecards
- expected loss
- monitoring
- validation
- data quality
- governance
- AML basics

I understand the **regulatory backdrop** well enough to sound coherent, practical, and grounded in how real banks actually operate.

That is exactly enough for this vault.
