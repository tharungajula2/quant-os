---
title: "Expected vs Unexpected Loss"
date: 2026-03-14
tags: [credit-risk, EL, UL, Basel, capital]
cluster: Phase 1. Bank Loss Engine
---

---

## The Institutional Reality

At a global bank, this distinction sits at the heart of the entire credit architecture. The building blocks from [[Probability-of-Default]], [[Loss-Given-Default]], and [[Exposure-at-Default]] are first combined to estimate average credit loss. That average loss is **Expected Loss (EL)**. It is the loss the bank believes will occur over time, on average, across a well-defined horizon. Because it is expected, the bank is supposed to absorb it through pricing, underwriting margins, provisions, and accounting reserves, especially under [[IFRS-9-and-ECL]].

But regulators and risk managers know the real danger is not the average. The real danger is that defaults cluster, recoveries collapse, and drawn exposures surge at the same time. That gap between ordinary loss and stressed tail loss is **Unexpected Loss (UL)**. In the Basel world, especially within [[Basel-IRB-Framework]] and [[RWA-Risk-Weighted-Assets]], capital is fundamentally designed to absorb unexpected loss rather than expected loss. That is why Basel capital and accounting provisions are related but not identical systems: provisions absorb the “known unknowns,” while capital exists for the “unknown unknowns.”

This is also why [[Economic-Capital-Basics]] exists as a separate concept. Economic capital is the bank’s internal expression of how much cushion it needs against portfolio loss volatility beyond EL. A sophisticated institution will estimate a full loss distribution for a portfolio, identify a very high percentile of that distribution, and then compare that tail loss against the mean. The mean is EL. The excess tail is UL. That difference is what can destroy equity if not capitalized properly.

From a governance perspective, this distinction is heavily scrutinized under [[SR-11-7-Model-Governance]]. Validators ask whether the bank is double counting losses, whether EL is already covered through accounting reserves or margin, whether downturn assumptions are leaking into both provisioning and capital, and whether the portfolio model truly captures correlation, concentration, and cyclicality. A junior candidate usually memorizes “EL equals PD times LGD times EAD.” A serious risk specialist understands that the entire regulatory design of modern banking separates **predictable credit cost** from **capital-threatening loss volatility**.

## The Core Math / Code

The canonical starting point is the average one-period credit loss:

$$  
EL = PD \times LGD \times EAD  
$$

where:

- $PD$ is the probability that the obligor defaults over the horizon.
    
- $LGD$ is the proportion of exposure lost if default occurs.
    
- $EAD$ is the amount outstanding at the time of default.
    

This formula looks simple, but it is conceptually loaded. It is not a tail measure. It is a **mean**. It tells you the central expected cost of credit risk, not the extreme loss under stress.

A more complete way to think about portfolio credit loss is as a random variable $L$. Then:

$$  
EL = \mathbb{E}[L]  
$$

and unexpected loss is usually represented as the dispersion of that loss around its mean. In simplified portfolio risk language:

$$  
UL = \sqrt{\mathrm{Var}(L)}  
$$

In practice, large banks often operationalize UL not just as standard deviation, but as tail loss beyond expected loss at a high confidence level. That leads directly into economic capital:

$$  
\text{Economic Capital} = \mathrm{VaR}_{\alpha}(L) - \mathbb{E}[L]  
$$

or, in more coherent tail-risk frameworks:

$$  
\text{Economic Capital} = \mathrm{ES}_{\alpha}(L) - \mathbb{E}[L]  
$$

where:

- $\mathrm{VaR}_{\alpha}(L)$ is the loss percentile at confidence level $\alpha$
    
- $\mathrm{ES}_{\alpha}(L)$ is expected shortfall beyond that percentile
    
- $\mathbb{E}[L]$ is expected loss
    

That is the red-pill insight: **EL is not capital**. EL is the center of the loss distribution. Capital is about the tail.

A useful comparison is below.

|Dimension|Expected Loss (EL)|Unexpected Loss (UL)|
|---|---|---|
|Economic meaning|Average anticipated credit cost|Volatility or tail shock beyond average loss|
|Core driver|Mean of loss distribution|Dispersion or high-percentile tail of loss distribution|
|Main use|Pricing, reserves, portfolio planning|Capital adequacy, solvency protection|
|Regulatory linkage|Strong link to [[IFRS-9-and-ECL]] and provisioning|Strong link to [[Basel-IRB-Framework]] and capital|
|Typical coverage|Margin, spread, provisions|Equity capital, buffers|
|Time horizon style|Contractual / accounting / expected horizon|Stress or insolvency horizon|
|Interview trap|Treating EL as “total risk”|Forgetting that UL is what capital is sized against|

To connect single-obligor intuition to portfolio reality, suppose obligor $i$ has binary default indicator $D_i \in {0,1}$ and deterministic exposure severity approximately equal to $LGD_i \times EAD_i$. Then portfolio loss can be written as:

$$  
L = \sum_{i=1}^{n} D_i \cdot LGD_i \cdot EAD_i  
$$

Taking expectation:

$$  
\mathbb{E}[L] = \sum_{i=1}^{n} PD_i \cdot LGD_i \cdot EAD_i  
$$

That is portfolio EL.

But the variance depends not only on each obligor’s own default uncertainty, but also on **default correlation** across names. This is where junior understanding usually breaks. If defaults were independent, diversification would kill much of the volatility. But in real recessions, defaults are correlated. Many firms fail together. Recoveries also worsen together. That is why portfolio UL can remain severe even when average EL looks modest. This is the bridge into [[RWA-Risk-Weighted-Assets]], where Basel’s asymptotic single-risk-factor logic turns obligor-level risk into capital for systematic portfolio loss.

For intuition, a stylized single-exposure variance under a Bernoulli default model is:

$$  
\mathrm{Var}(L_i) = (LGD_i \cdot EAD_i)^2 \cdot PD_i \cdot (1-PD_i)  
$$

For portfolios, covariance terms matter:

$$  
\mathrm{Var}(L) = \sum_i \mathrm{Var}(L_i) + 2\sum_{i<j}\mathrm{Cov}(L_i,L_j)  
$$

That second term is where crises live.

Another critical institutional distinction is how this maps into accounting versus capital:

- Under [[IFRS-9-and-ECL]], the bank books expected credit losses through impairment allowances.
    
- Under [[Basel-IRB-Framework]], the bank computes capital requirements to cover unexpected losses.
    
- Under [[Economic-Capital-Basics]], the bank may use internal portfolio models to estimate the amount of capital needed beyond EL.
    
- Under [[Macro-Stress-Testing]], both EL and UL dynamics are shocked by macroeconomic scenarios.
    

This split explains why the same portfolio can produce both a provision expense and a capital requirement without contradiction. One is absorbing the expected mean loss. The other is defending the institution against severe downside outcomes.

A common mental model for the full stack is:

$$  
\text{Credit Cost Stack} =  
\underbrace{\text{Expected Loss}}_{\text{priced/provisioned}}  
+  
\underbrace{\text{Unexpected Loss}}_{\text{capitalized}}  
$$

But in real banking, you need one extra layer of nuance: the boundary between EL and UL is not purely theoretical. It depends on horizon, model calibration, downturn assumptions, and accounting stage. For example:

- PiT deterioration in [[Probability-of-Default]] can sharply increase IFRS 9 provisions.
    
- Downturn assumptions in [[Loss-Given-Default]] can inflate tail severity for capital.
    
- Revolver drawdown behavior in [[Exposure-at-Default]] can amplify both EL and UL.
    
- Concentration in sectors or names can magnify UL even if portfolio EL seems stable.
    

That is why strong validators never ask only whether the EL formula was coded correctly. They ask whether the bank has coherently separated average loss, stress loss, and tail capital in a way that avoids conceptual overlap and regulatory arbitrage.

