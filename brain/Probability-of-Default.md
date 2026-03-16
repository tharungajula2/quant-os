---
title: "Probability of Default (PD)"
date: 2026-03-14
tags: [PD, credit-risk, rating, IRB]
cluster: Phase 3. Core Credit Risk Trinity
---


---

## The Institutional Reality

At a global bank, [[Probability-of-Default]] is one of the three foundational credit risk parameters, alongside [[Loss-Given-Default]] and [[Exposure-at-Default]]. It is the input that measures the likelihood that an obligor defaults over a specified horizon, typically one year for Basel capital architecture and often multi-period or term-structured in accounting and stress testing contexts. The baseline report you uploaded frames PD exactly this way: as the expected frequency of default for an obligor or rating grade, usually expressed on a one-year basis, and tied directly to rating grades and long-run default data.

The first serious distinction is that **PD belongs to the obligor**, not to the facility in isolation. A company defaults, not a single loan in a vacuum. Different facilities to the same borrower can have different recoveries and exposures, which is why [[Loss-Given-Default]] and [[Exposure-at-Default]] vary by instrument, collateral, and product structure. But default likelihood is fundamentally an obligor-state concept. This matters because many weak candidates casually mix borrower risk and facility risk. Strong credit risk people separate them cleanly.

### What “Default” Actually Means

PD is only meaningful if the bank has a clear **default definition**. That definition is not cosmetic. It controls the target variable for every model and every validation exercise. In practice, default is generally anchored to regulatory and accounting criteria such as:

- material past-due status
    
- bankruptcy or insolvency events
    
- distressed restructuring
    
- non-accrual or credit-impaired status
    
- unlikeliness-to-pay judgment
    

This is why a PD model is never just a statistical exercise. If the default event is inconsistently defined, the entire model becomes conceptually unstable. Under [[Basel-IRB-Framework]], default definitions must be documented and consistently applied. Under [[SR-11-7-Model-Governance]], validators challenge whether the development target, reference data, overrides, and observed outcomes truly match the approved definition.

### The Real Job of a PD System

Most beginners think PD is just “a model that outputs a number.” That is too shallow. In real banking, PD is part of a **rating system architecture**:

1. the bank collects borrower information
    
2. a scorecard or model ranks the borrower
    
3. the borrower is mapped to an internal grade on a master scale
    
4. each grade has an associated one-year PD or PD band
    
5. the grade is used in underwriting, monitoring, pricing, provisioning, capital, and portfolio steering
    

So the real object is not just a number. It is a governed **credit opinion translated into a standardized risk language**. The baseline report explicitly mentions master rating grades, associated PDs, and long-run calibration by grade.

This is why rating design matters so much. A bank may have a 15-grade or 25-grade internal scale, but those grades are only useful if they are:

- monotonic
    
- empirically defensible
    
- distinguishable in realized risk
    
- stable enough to govern decisions
    
- calibrated to meaningful default frequencies
    

That is the red-pill truth: a PD system is a **governed decision system**, not a coefficient vector.

### PiT vs TtC: The Philosophical Core

This is one of the most interviewable and least deeply understood topics in credit risk.

#### Point-in-Time (PiT)

A **PiT PD** reflects current conditions. It moves with the business cycle, borrower financial deterioration, and current information. In a recession, PiT PDs rise; in a boom, they fall. PiT is more sensitive, more reactive, and generally more appropriate for forward-looking impairment work such as [[IFRS-9-and-ECL]], where the institution must recognize deterioration early.

#### Through-the-Cycle (TtC)

A **TtC PD** aims to capture the borrower’s underlying long-run creditworthiness, smoothing away some of the short-term economic noise. It is more stable across cycles and more aligned to prudential capital philosophy, especially in traditional IRB thinking where long-run average default rates are central. The baseline report directly points out that banks often use PiT-style logic for IFRS 9 and TtC-style logic for capital, even if actual implementations are more nuanced.

The deep distinction is not only statistical. It is philosophical:

- **PiT asks:** what is the borrower’s risk **right now**, given the current state of the world?
    
- **TtC asks:** what is the borrower’s **structural** credit quality, abstracting somewhat from where we are in the cycle?
    

A useful intuition is this:

- PiT is better for **timely recognition**
    
- TtC is better for **rating stability**
    
- banks often need both, for different institutional purposes
    

### Why This Distinction Matters So Much

If a bank uses pure PiT PDs for everything, ratings can become violently procyclical. In good times, PDs collapse and capital/provisions look too light; in bad times, they spike and the institution appears suddenly much riskier. If the bank uses overly smoothed TtC PDs everywhere, it may miss emerging deterioration and under-recognize short-term risk.

So banks often need a balance:

- capital frameworks under [[Basel-IRB-Framework]] tend to prefer prudential, long-run grounded PD calibration
    
- accounting frameworks under [[IFRS-9-and-ECL]] tend to require more forward-looking and macro-sensitive PDs
    
- stress frameworks under [[Macro-Stress-Testing]] explicitly shock PDs under adverse scenarios
    

That means a mature bank does not ask “PiT or TtC?” as if one must win. It asks: **which risk lens is fit for which decision purpose?**

## The Core Math / Code

At the single-obligor level, the simplest interpretation is:

$$  
PD = P(\text{Default within horizon } H)  
$$

For a one-year Basel-style horizon:

$$  
PD_{1y} = P(\text{Default within 1 year})  
$$

This is the purest definition. It is a probability, not a severity measure and not an exposure measure.

### Link to Expected Loss

PD enters the canonical credit loss identity:

$$  
EL = PD \times LGD \times EAD  
$$

where:

- [[Probability-of-Default]] provides default likelihood
    
- [[Loss-Given-Default]] provides loss severity conditional on default
    
- [[Exposure-at-Default]] provides the amount exposed at default
    

This is why PD is so central. If PD doubles, expected loss doubles, all else equal.

### Estimating PD from Data

At the simplest rating-grade level, if grade $g$ contains $N_g$ obligors and $D_g$ of them default over one year, a crude observed default rate is:

$$  
\widehat{PD}_g = \frac{D_g}{N_g}  
$$

But banks rarely stop there, because raw observed rates are noisy, especially in low-default grades. Instead, they often use:

- multi-year averages
    
- weighted averages across periods
    
- Bayesian or conservative smoothing
    
- pooled estimates across similar segments
    
- external data supplements for rare grades
    
- long-run averages for IRB-style calibration
    

A long-run average grade PD across $T$ years can be stylized as:

$$  
\widehat{PD}^{LR}_g = \frac{1}{T}\sum_{t=1}^{T}\frac{D_{g,t}}{N_{g,t}}  
$$

This matters because one good year or one bad year should not redefine a rating scale.

### Logistic Regression View

In execution practice, many wholesale and retail PD models still use logistic regression because it is interpretable and auditable, linking directly to [[Logistic-Regression-Scorecards]] and [[Weight-of-Evidence-and-IV]].

A standard formulation is:

$$  
\log\left(\frac{PD}{1-PD}\right)=\beta_0+\beta_1x_1+\cdots+\beta_kx_k  
$$

which implies:

$$  
PD=\frac{1}{1+\exp\left(-(\beta_0+\beta_1x_1+\cdots+\beta_kx_k)\right)}  
$$

This gives a borrower-level PiT-style model output if the features are current and cyclical. A bank may then calibrate or transform this output into a TtC-aligned master-scale PD for capital use.

### PiT and TtC as Decomposition

A useful advanced mental model is to think of borrower risk as having two components:

$$  
\text{Credit Risk} = \text{Structural Borrower Risk} + \text{Current Cycle Effect}  
$$

A stylized statistical decomposition is:

$$  
\text{logit}(PD^{PiT}_{i,t}) = \alpha_i + \gamma_t + \varepsilon_{i,t}  
$$

where:

- $\alpha_i$ captures borrower-specific structural risk
    
- $\gamma_t$ captures the common cyclical or macro state
    
- $\varepsilon_{i,t}$ captures residual variation
    

Under this lens:

- TtC is closer to isolating $\alpha_i$
    
- PiT includes both $\alpha_i$ and current macro state $\gamma_t$
    

That is the cleanest quantitative intuition for the PiT/TtC split.

### Master Rating Scale

A bank usually maps raw borrower risk into a master scale. The baseline report gives an illustrative version, and that is exactly the right foundation for a governed internal rating architecture.

|Internal Grade|External Style Analogy|Illustrative 1-Year PD|Credit Meaning|
|---|---|--:|---|
|1|AAA|0.01%|Extremely strong capacity to repay|
|2|AA|0.10%|Very strong capacity to repay|
|3|A|0.50%|Strong but somewhat more cyclical sensitivity|
|4|BBB|1.00%|Adequate capacity, investment-grade boundary area|
|5|BB|3.00% to 5.00%|Speculative quality emerging|
|6|B|10.00% to 20.00%|Material vulnerability to adverse conditions|
|7|CCC / CC|20.00%+|Very high likelihood of default|
|8|D|100.00%|Defaulted obligor|

This table is illustrative, not universal. In real banks, master scales are more granular and must be justified empirically. But the key insight is that a grade is not merely a label. It is a **governed PD statement**.

### Discrimination vs Calibration

A strong PD system must do two things well:

#### 1. Discrimination

It must rank risk correctly. Worse borrowers should receive worse scores or grades than better borrowers.

#### 2. Calibration

The predicted PD levels must broadly match observed outcomes over time.

This distinction is foundational. A model may discriminate well but be badly calibrated. For example, it may correctly rank risky borrowers above safer ones while systematically overstating or understating absolute default probabilities.

A stylized calibration check at grade level is:

$$  
\text{Calibration Error}_g = \widehat{PD}_g - ODR_g  
$$

where $ODR_g$ is the observed default rate for grade $g$.

This is where [[Model-Performance-Metrics]] and [[SR-11-7-Model-Governance]] enter. Good discrimination without calibration is not enough for provisioning or capital. Good calibration without discrimination is not enough for underwriting or portfolio steering. A bank-grade PD model needs both.

### One-Year PD vs Lifetime PD

Another major beginner mistake is assuming PD is always a one-year number. In capital and rating systems, one-year PD is common. But under [[IFRS-9-and-ECL]], banks often need a **term structure of PDs** across multiple future horizons.

If $S(t)$ is survival probability up to time $t$, then a cumulative default probability to horizon $T$ can be written as:

$$  
PD_{cum}(0,T)=1-S(T)  
$$

If a marginal hazard rate $\lambda_t$ is used, then in continuous-time style:

$$  
S(T)=\exp\left(-\int_0^T \lambda(u),du\right)  
$$

and therefore:

$$  
PD_{cum}(0,T)=1-\exp\left(-\int_0^T \lambda(u),du\right)  
$$

You do not always need this machinery in a bank interview, but understanding that lifetime ECL needs **term-structured PD**, not just a flat one-year number, is a major maturity signal.

### Low-Default Portfolios: Where PD Gets Hard

PD estimation becomes especially difficult in [[Low-Default-Portfolios-LDP]], such as sovereigns, banks, and top-rated institutions. The baseline report notes that lack of defaults does not mean lack of risk, and that external benchmarks, floors, or conservative supplements may be needed.

This is one of the deepest practical issues in wholesale credit risk:

- if you observe zero defaults, naive estimation gives zero PD
    
- but zero PD is institutionally unacceptable for most real-world risk systems
    
- so banks use conservative floors, peer data, long history windows, and judgment overlays
    

That is why PD modeling is often as much about **prudence under sparse data** as it is about statistical elegance.

### What Validators Attack First

Under [[SR-11-7-Model-Governance]], a validator will usually attack a PD system along these lines:

- Is the default definition consistent and approved?
    
- Is the development sample representative?
    
- Are the risk drivers conceptually sound?
    
- Does the model discriminate well out of sample?
    
- Is calibration stable across time and segments?
    
- Are overrides controlled and monitored?
    
- Is the master rating scale too coarse or too granular?
    
- Are PiT and TtC uses clearly separated by purpose?
    
- Are low-default grades supported with defensible conservatism?
    

That is why PD is not a small topic. It is one of the core battlegrounds of model validation.

### The Real Red-Pill Summary

The shallow answer is:

“PD is the likelihood that a borrower defaults within one year.”

The real answer is:

“PD is the governed probability that an obligor enters default over a defined horizon, embedded within a rating architecture, estimated from historical and current information, calibrated for different institutional purposes such as capital, provisioning, and stress testing, and interpreted through the crucial PiT versus TtC lens.”

That is the zero-to-hero version.

