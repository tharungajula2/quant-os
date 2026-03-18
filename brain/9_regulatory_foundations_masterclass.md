---
title: "Regulatory Foundations Masterclass — Basel, IFRS 9, CECL, BCBS 239, ICAAP, SR 11-7, and AML Basics"
date: 2026-03-18
tags:
  - regulation
  - basel-iii
  - basel-iv
  - capital
  - rwa
  - cet1
  - tier-1
  - tier-2
  - leverage-ratio
  - lcr
  - nsfr
  - ifrs-9
  - cecl
  - ecl
  - bcbs-239
  - icaap
  - sr-11-7
  - model-governance
  - bsa-aml
  - ofac
  - banking
  - credit-risk
cluster: "04 — Sandbox"
progress: 0
links:
  - "[[Tharun-Kumar-Gajula]]"
  - "[[1_lending_club_credit_risk_masterclass]]"
  - "[[2_regression_analysis_masterclass]]"
  - "[[3_machine_learning_masterclass]]"
  - "[[4_python_data_analytics_master_cheatsheet]]"
---

---

# Regulatory Foundations Masterclass — Basel, IFRS 9, CECL, BCBS 239, ICAAP, SR 11-7, and AML Basics

> This note is my compact regulatory cheat sheet. I do **not** want this note to become a giant policy encyclopedia. I want one ready reference that helps me quickly remember the big picture, the main formulas, the core vocabulary, and how each framework connects back to my profile, my Lending Club credit-risk note, and real US-bank interview discussions.
>
> The goal is simple: when I see terms like **Basel III**, **IFRS 9**, **CECL**, **BCBS 239**, **ICAAP**, or **SR 11-7**, I should immediately know what problem each one is trying to solve.

---

# 1. One-page map of the regulatory landscape

| Area | Main frameworks | What they are trying to solve |
|---|---|---|
| **Capital and solvency** | **Basel III** and the later reform package often informally called **Basel IV** | How much capital a bank should hold against risk |
| **Liquidity** | **LCR**, **NSFR**, leverage backstop | Can the bank survive funding stress without relying only on capital |
| **Accounting for credit losses** | **IFRS 9** and **CECL** | When and how expected credit losses should be recognised |
| **Internal capital planning** | **ICAAP** | Does the bank hold enough capital for its own actual risk profile, not just minimum formulas |
| **Risk data and reporting** | **BCBS 239** | Can the bank aggregate, trace, and report risk data quickly and accurately |
| **Model governance** | **SR 11-7** | Are models developed, validated, monitored, and governed properly |
| **AML / sanctions controls** | **BSA/AML**, **FFIEC**, **FinCEN**, **OFAC** | Is the bank identifying suspicious activity, sanctions exposure, and financial-crime risk |

---

# 2. Basel framework — the big picture first

## 2.1 What Basel is

Basel is the global prudential framework for banks. Its core job is to make banks more resilient through:

- **better quality capital**
- **risk-sensitive capital requirements**
- **a leverage backstop**
- **liquidity requirements**
- **stronger supervisory review and disclosure**

## 2.2 The three pillars

### Pillar 1 — Minimum capital requirements
This is the formula side.

It covers capital requirements for risks such as:

- credit risk
- market risk
- operational risk

### Pillar 2 — Supervisory review
This is where **ICAAP** lives.

It asks whether the bank’s own capital assessment is good enough for its real risk profile.

### Pillar 3 — Market discipline
This is the disclosure side.

It is about transparency to the market.

---

# 3. Basel capital cheat sheet

## 3.1 Capital stack

### CET1 — Common Equity Tier 1
This is the highest-quality capital.

Think of it as the strongest loss-absorbing layer.

Typical items include:

- common shares
- retained earnings
- certain reserves
- minus regulatory deductions and adjustments

### AT1 — Additional Tier 1
This is still going-concern capital, but lower quality than CET1.

### Tier 1 Capital

$$
\text{Tier 1 Capital} = \text{CET1} + \text{AT1}
$$

### Tier 2 Capital
This is gone-concern capital.

It absorbs losses later than Tier 1.

### Total Capital

$$
\text{Total Capital} = \text{Tier 1} + \text{Tier 2}
$$

---

## 3.2 Core capital ratios

### CET1 Ratio

$$
\text{CET1 Ratio} = \frac{\text{CET1}}{\text{Risk-Weighted Assets (RWA)}}
$$

### Tier 1 Ratio

$$
\text{Tier 1 Ratio} = \frac{\text{Tier 1 Capital}}{\text{RWA}}
$$

### Total Capital Ratio / CAR

$$
\text{CAR} = \frac{\text{Total Regulatory Capital}}{\text{RWA}}
$$

## 3.3 Basel minimums I should remember

These are the classic Basel III minimums before adding bank-specific buffers:

- **CET1 minimum = 4.5%**
- **Tier 1 minimum = 6.0%**
- **Total capital minimum = 8.0%**

With the **2.5% capital conservation buffer**, the common “all-in” memory numbers become:

- **CET1 = 7.0%**
- **Tier 1 = 8.5%**
- **Total capital = 10.5%**

## 3.4 Quick memory trick

- **4.5 / 6 / 8** = bare minimum Basel ratios
- **7 / 8.5 / 10.5** = minimums plus the conservation buffer

---

# 4. RWA — the key denominator

## 4.1 What RWA means

Risk-weighted assets are the bank’s exposures after applying regulatory risk weights.

The intuition is simple:

- not every asset is equally risky
- safer assets get lower weights
- riskier assets get higher weights
- capital ratios are measured against this risk-weighted denominator, not against total assets alone

## 4.2 Simplest standardized view

For a basic exposure under a standardized approach:

$$
\text{RWA} = \text{Exposure} \times \text{Regulatory Risk Weight}
$$

Example intuition:

- exposure = 100
- risk weight = 75%
- RWA = 75

The higher the risk weight, the larger the RWA, and the more capital the bank must hold.

---

# 5. Standardized vs IRB — the most interview-relevant distinction

## 5.1 Standardized approach

### What it means
The regulator gives the bank the framework for how to risk-weight exposures.

The bank mostly follows prescribed risk weights, exposure classes, collateral rules, and recognition rules.

### Core logic

$$
\text{RWA}_{\text{standardized}} \approx \text{Exposure} \times \text{Risk Weight}
$$

### When I should describe it this way
In interviews, I should say:

> The standardized approach is more rule-based and less dependent on the bank’s own internal risk-parameter estimates.

---

## 5.2 IRB approach

IRB means **Internal Ratings-Based**.

### What it means
The bank uses internal risk estimates, subject to regulatory approval, to calculate capital requirements.

The main parameters are:

- **PD** = Probability of Default
- **LGD** = Loss Given Default
- **EAD** = Exposure at Default
- **M** = effective maturity, where applicable

### Two formulas I should remember

#### Expected Loss

$$
\text{EL} = PD \times LGD \times EAD
$$

#### Regulatory capital / RWA logic

In IRB, the capital requirement is **not** just expected loss.

A supervisory risk-weight function produces a capital factor **K**.

Then:

$$
\text{RWA}_{\text{IRB}} = 12.5 \times K \times EAD
$$

and because 8% of RWA is capital:

$$
\text{Capital Requirement} = 0.08 \times \text{RWA} = K \times EAD
$$

### Important interview point

I should say this very clearly:

> In IRB, expected loss and regulatory capital are not the same thing. Expected loss is the average loss estimate, while capital is meant to cover unexpected loss through the supervisory formula.

---

## 5.3 Simple comparison table

| Topic | Standardized | IRB |
|---|---|---|
| Main driver | Prescribed regulatory risk weights | Internal PD/LGD/EAD estimates plus supervisory formulas |
| Complexity | Lower | Higher |
| Data/model dependency | Lower | Higher |
| Governance burden | Lower | Much higher |
| Relevance to my projects | Basic capital framing | Very close to my Lending Club PD-LGD-EAD thinking |

---

# 6. Basel III / “Basel IV” — what I should say in interviews

## 6.1 Basel III

Basel III is the post-crisis reform framework designed to strengthen:

- capital quality
- capital quantity
- leverage discipline
- liquidity resilience
- buffers and stress resilience

## 6.2 “Basel IV”

“Basel IV” is not the formal committee name.

It is an informal market label often used for the **finalised Basel III post-crisis reforms**.

When people say Basel IV, they usually mean the later reform package that tightened and revised parts of Basel III, including changes to standardized approaches, constraints on internal models, and the **output floor**.

### One-line interview answer

> Basel IV is really shorthand for the final Basel III reform package rather than a totally separate framework.

---

# 7. Leverage and liquidity ratios — the formulas I should know

## 7.1 Leverage ratio

### Why it exists
Risk-weighted frameworks can understate risk if models or weights are too optimistic.

So Basel adds a simple non-risk-based backstop.

### Formula

$$
\text{Leverage Ratio} = \frac{\text{Tier 1 Capital}}{\text{Exposure Measure}}
$$

### Big picture

- numerator = Tier 1 capital
- denominator = broader exposure measure, not just RWAs
- Basel minimum commonly cited = **3%**

### Memory line

> RWA-based capital ratios are risk-sensitive; the leverage ratio is the blunt backstop.

---

## 7.2 LCR — Liquidity Coverage Ratio

### Purpose
Can the bank survive a **30-day stress period** with enough high-quality liquid assets?

### Formula

$$
\text{LCR} = \frac{\text{High-Quality Liquid Assets (HQLA)}}{\text{Total Net Cash Outflows over 30 days}}
$$

### Rule of thumb

$$
\text{LCR} \ge 100\%
$$

### Memory line

> LCR is short-term survival liquidity.

---

## 7.3 NSFR — Net Stable Funding Ratio

### Purpose
Does the bank have a sufficiently stable funding profile over a longer horizon?

### Formula

$$
\text{NSFR} = \frac{\text{Available Stable Funding (ASF)}}{\text{Required Stable Funding (RSF)}}
$$

### Rule of thumb

$$
\text{NSFR} \ge 100\%
$$

### Memory line

> NSFR is structural funding stability, not just 30-day liquidity.

---

# 8. IFRS 9 — the cheat sheet I actually need

## 8.1 What IFRS 9 is doing

For impairment, IFRS 9 is moving from a late incurred-loss mindset toward an **expected credit loss (ECL)** mindset.

The big idea is:

- recognise losses earlier
- use historical, current, and forward-looking information
- stage exposures based on credit deterioration

---

## 8.2 The three stages

### Stage 1
- no significant increase in credit risk since origination
- recognise **12-month ECL**

### Stage 2
- significant increase in credit risk since origination (**SICR**)
- recognise **lifetime ECL**

### Stage 3
- credit-impaired asset
- recognise **lifetime ECL**
- interest revenue treatment changes because the asset is impaired

---

## 8.3 The formula intuition

At a simplified level:

$$
\text{ECL} = PD \times LGD \times EAD
$$

But in proper accounting / risk terms, it is really the **present value of expected cash shortfalls** over the relevant horizon.

So the better mental model is:

$$
\text{ECL} \approx \sum_t PD_t \times LGD_t \times EAD_t \times DF_t
$$

where:

- \(PD_t\) = probability of default in period \(t\)
- \(LGD_t\) = loss severity if default happens in period \(t\)
- \(EAD_t\) = exposure outstanding in period \(t\)
- \(DF_t\) = discount factor

---

## 8.4 The two most important stage triggers to remember

### Stage 2 memory point
A common IFRS 9 reference point is:

- **more than 30 days past due** is a rebuttable presumption of significant increase in credit risk

### Default memory point
A widely used reference point in IFRS 9 discussions is:

- default should **not be later than 90 days past due**, unless rebutted with reasonable support

### Important nuance
These are **presumptions / practical anchors**, not “just use 30 or 90 and stop thinking.”

The real question is whether credit risk has significantly increased and whether the asset is credit-impaired.

---

## 8.5 What 12-month ECL actually means

This is a classic confusion point.

It does **not** mean only 12 months of cash losses.

It means:

> the lifetime losses arising from defaults that are possible within the next 12 months.

That line is worth remembering exactly.

---

## 8.6 Why IFRS 9 matters for me

This connects directly to my Lending Club master note because that note already explains:

- PD
- LGD
- EAD
- expected loss logic
- CECL and stress-testing extensions

So IFRS 9 is where that quantitative framework gets pulled into **financial reporting and provisioning**.

---

# 9. CECL — the US accounting counterpart I should know

## 9.1 What CECL is

CECL = **Current Expected Credit Losses** under US GAAP.

Its big idea is simpler than IFRS 9 staging:

- recognise **lifetime expected credit losses from day 1** for relevant amortized-cost assets
- use past events, current conditions, and reasonable and supportable forecasts

## 9.2 Simplified formula intuition

$$
\text{CECL Allowance} \approx \text{Lifetime Expected Credit Loss}
$$

or in a risk-parameter mindset:

$$
\text{CECL} \approx \sum_t PD_t \times LGD_t \times EAD_t \times DF_t
$$

## 9.3 IFRS 9 vs CECL

| Topic | IFRS 9 | CECL |
|---|---|---|
| Day-1 allowance | 12-month ECL in Stage 1 | Lifetime expected credit loss |
| Deterioration concept | Staging matters a lot | No 3-stage impairment model |
| Stage 2 trigger | SICR / 30 DPD rebuttable presumption | Not applicable in same way |
| Core mindset | staged ECL | lifetime ECL from origination |

## 9.4 One-line interview answer

> IFRS 9 is a staged expected-credit-loss framework, while CECL is a lifetime expected-credit-loss framework from initial recognition.

---

# 10. BCBS 239 — why it matters much more than people think

## 10.1 What BCBS 239 is really about

BCBS 239 is about **risk data aggregation and risk reporting**.

It is not just a data-engineering footnote.

It matters because a bank cannot manage risk properly if it cannot:

- find the data
- trust the data
- aggregate the data consistently
- explain lineage
- produce timely management information during stress

## 10.2 The high-value keywords I should remember

When I hear BCBS 239, I should immediately think of:

- **accuracy**
- **integrity**
- **completeness**
- **timeliness**
- **adaptability**
- **clarity**
- **governance**
- **lineage**

## 10.3 The practical interview translation

If asked what BCBS 239 means in practice, I should say:

> BCBS 239 is about whether the bank can aggregate and report risk data accurately, completely, and quickly enough to support decision-making, especially under stress.

## 10.4 How this connects to my profile

This fits my profile very naturally because I already talk about:

- reporting automation
- data validation
- workflow clarity
- monitoring
- model governance
- documentation

If I want a stronger professional bridge, I can say:

> My reporting, validation, and data-lineage thinking sits much closer to BCBS 239 than to generic dashboard work.

That is a strong line because it sounds both practical and regulated.

---

# 11. ICAAP — what it is and how I should remember it

## 11.1 What ICAAP means

ICAAP = **Internal Capital Adequacy Assessment Process**.

This lives in the Pillar 2 world.

It is the bank’s internal process for answering:

> Do we hold enough capital for our actual risk profile, strategy, concentrations, and stress scenarios?

## 11.2 Why it exists

Pillar 1 minimum formulas are necessary, but not enough.

A bank may face risks such as:

- concentration risk
- interest-rate risk in the banking book
- model risk
- strategic risk
- business model risk
- stress-scenario capital erosion

ICAAP forces the bank to think beyond minimum formula compliance.

## 11.3 The practical ICAAP flow

1. identify material risks
2. measure / assess them
3. run stress scenarios
4. assess available capital and capital needs
5. define buffers and management actions
6. ensure board and senior management oversight

## 11.4 Formula mindset

There is **no single universal ICAAP formula**.

But a useful mental shortcut is:

$$
\text{Internal Capital Need} \approx \text{Pillar 1 Capital Need} + \text{Pillar 2 Add-ons / Non-modelled Risks} + \text{Management Buffer / Stress Buffer}
$$

That is not an official prescribed formula, but it is a good way to remember the logic.

## 11.5 One-line interview answer

> ICAAP is the bank’s own internal capital assessment and planning process under Pillar 2, used to test whether regulatory minimums are really enough for the bank’s actual risk profile.

---

# 12. SR 11-7 — model governance cheat sheet

## 12.1 Why this matters so much for me

This is one of the most relevant frameworks for my profile because my direction is not only model building but also:

- model validation
- monitoring
- governance
- defensibility
- documentation

## 12.2 What SR 11-7 says at a high level

SR 11-7 is the US supervisory guidance on **model risk management**.

The core definition to remember is:

> model risk is the potential for adverse consequences from decisions based on incorrect or misused model outputs.

## 12.3 The three pillars I should remember

### 1. Model development, implementation, and use
Questions:

- Was the model designed properly?
- Are assumptions sensible?
- Is implementation correct?
- Is the model being used for the right purpose?

### 2. Model validation
Questions:

- Was the model independently challenged?
- Were conceptual soundness, ongoing monitoring, and outcome analysis checked?
- Are limitations documented?

### 3. Governance, policies, and controls
Questions:

- Is there model inventory?
- Are roles clear?
- Is change control in place?
- Is monitoring ongoing?
- Are approvals documented?

## 12.4 My shortcut memory line

> SR 11-7 is about building models properly, validating them independently, and governing them continuously.

## 12.5 How this links to my projects

This connects especially to my Lending Club master note because that note already covers:

- target definition
- preprocessing discipline
- validation metrics
- monitoring logic
- recalibration vs redevelopment
- documentation mindset

So SR 11-7 is the governance umbrella over that technical workflow.

---

# 13. AML / sanctions basics — only the minimum I need right now

I do **not** want this section to become a separate AML course.

I only want the basics that help me connect the regulatory map.

## 13.1 BSA/AML big picture

This is the US anti-money-laundering / suspicious-activity control environment.

The key practical components are:

- customer identification and due diligence
- transaction monitoring
- suspicious activity identification
- suspicious activity reporting
- sanctions screening and compliance controls

## 13.2 FinCEN and SAR

- **FinCEN** is the US Financial Crimes Enforcement Network
- **SAR** = Suspicious Activity Report

Very basic interview memory line:

> FinCEN is the US authority that receives SAR filings, while banks are expected to detect and escalate suspicious activity through their BSA/AML controls.

## 13.3 OFAC

OFAC is the US sanctions authority.

This is related to, but not identical to, AML.

### Quick memory line

> AML is about suspicious money flows and financial crime risk; OFAC is about sanctions compliance and prohibited persons / jurisdictions.

## 13.4 Why this section still matters for me

Even if I am not going deep into AML now, this section helps me understand the broader US-bank control environment that sits around model governance and risk operations.

---

# 14. What I should be able to say fast in an interview

## Basel

- Basel capital ratios are capital divided by RWAs.
- CET1 is the best-quality capital layer.
- Total capital includes Tier 1 and Tier 2.
- Standardized is rule-based; IRB uses internal parameters with supervisory formulas.
- Leverage ratio is a non-risk-based backstop.
- LCR is short-term liquidity.
- NSFR is structural funding stability.

## IFRS 9 / CECL

- IFRS 9 uses staging.
- Stage 1 = 12-month ECL.
- Stage 2 / 3 = lifetime ECL.
- CECL generally uses lifetime expected credit loss from day 1.
- IFRS 9 and CECL are both forward-looking expected-loss frameworks, but they are not the same design.

## BCBS 239

- risk data aggregation
- reporting quality
- timeliness
- completeness
- accuracy
- adaptability
- lineage and governance

## ICAAP

- Pillar 2 internal capital planning
- not just formula minimums
- risk profile + stress + buffers + management action

## SR 11-7

- model development
- independent validation
- governance and controls
- ongoing monitoring

---

# 15. How this note connects to my profile specifically

## Why this note belongs in my brain

This note is relevant to my profile because I am not only trying to talk about models as math objects.

I also want to show that I understand the institutional environment around them:

- **Basel** gives the prudential capital and liquidity structure
- **IFRS 9 / CECL** connect model outputs to accounting and provisioning
- **BCBS 239** connects data lineage and reporting quality to risk management
- **ICAAP** connects risk measurement to internal capital planning
- **SR 11-7** connects models to validation and governance
- **BSA/AML / OFAC** connect the bank to financial-crime controls

That is exactly the kind of “big picture but still technical” framing I want this brain note system to support.

---

# 16. Official source links

## Basel / BCBS / liquidity / capital

- [Basel III overview — BIS](https://www.bis.org/bcbs/basel3.htm)
- [The Basel Framework — BIS](https://www.bis.org/basel_framework/)
- [BCBS 239 PDF — BIS](https://www.bis.org/publ/bcbs239.pdf)
- [LCR framework — BIS](https://www.bis.org/publ/bcbs238.htm)
- [NSFR framework — BIS](https://www.bis.org/bcbs/publ/d295.htm)
- [Leverage ratio framework — BIS](https://www.bis.org/publ/bcbs270.htm)

## IFRS 9 / CECL

- [IFRS 9 standard page — IFRS Foundation](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-9-financial-instruments/)
- [IFRS 9 project summary — IFRS Foundation](https://www.ifrs.org/-/media/project/fi-impairment/ifrs-standard/published-documents/project-summary-july-2014.pdf)
- [Federal Reserve CECL FAQ](https://www.federalreserve.gov/supervisionreg/topics/faq-new-accounting-standards-on-financial-instruments-credit-losses.htm)
- [FASB credit losses project page](https://www.fasb.org/projects/current-projects/credit-losses)

## ICAAP / Pillar 2 / model governance

- [Basel Pillar 2 / ICAAP overview — BIS](https://www.bis.org/bcbs/publ/d465.pdf)
- [SR 11-7 PDF — Federal Reserve](https://www.federalreserve.gov/supervisionreg/srletters/sr1107a1.pdf)

## AML / sanctions basics

- [FFIEC BSA/AML Manual](https://bsaaml.ffiec.gov/manual)
- [FinCEN SAR page](https://www.fincen.gov/suspicious-activity-reports-sars)
- [OFAC FAQs](https://ofac.treasury.gov/faqs)
- [OFAC sanctions programs and country information](https://ofac.treasury.gov/sanctions-programs-and-country-information)

---

# Final anchor

This note is not here to make me memorize regulation like a rulebook.

It is here to help me remember the **structure**:

- **Basel** = prudential capital and liquidity
- **IFRS 9 / CECL** = expected credit losses and provisioning
- **BCBS 239** = data aggregation and reporting
- **ICAAP** = internal capital adequacy and stress thinking
- **SR 11-7** = model governance
- **BSA/AML / OFAC** = financial-crime and sanctions controls

That is enough for this note to do its job well.
