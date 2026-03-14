---
title: "Basel IRB Framework"
date: 2026-03-14
tags: [Basel, credit-risk, IRB, standardized-approach]
cluster: The Regulatory Straightjacket
---


---

## The Feynman Hook

Imagine a school where every student must carry a backpack, but the school wants the backpack weight to match how risky the journey home is. One method is simple: every student in the same street gets the same standard backpack, whether they are careful or careless. The other method is smarter but harder: the school studies each student more deeply and gives a custom backpack weight based on how likely they are to trip, how badly they would get hurt, and how much stuff they are carrying.

That is the difference between the **Standardized Approach** and the **Internal Ratings-Based (IRB) Approach** in banking. Basel is trying to answer one core question: how much capital should a bank hold against its credit exposures so that unexpected losses do not push it toward insolvency? The standardized route uses rulebook weights. The IRB route lets the bank use internal risk estimates—but only if the bank can prove those estimates are robust, governed, and deeply embedded in decision-making.

## The Institutional Reality

At a global bank, the [[Basel-IRB-Framework]] is not just a formula set; it is the operating contract between credit risk measurement and prudential capital. The framework translates borrower risk into capital requirements through either:

- the **Standardized Approach**, where regulators prescribe risk weights or weights are driven by external ratings and regulatory buckets, or
    
- the **Internal Ratings-Based Approach**, where the bank uses internal estimates of key risk parameters such as [[Probability-of-Default]], [[Loss-Given-Default]], and [[Exposure-at-Default]] to drive capital.
    

This matters because Basel is not mainly trying to estimate average loss. That job is more closely tied to pricing and provisioning, including [[IFRS-9-and-ECL]]. Basel capital is designed to absorb **unexpected loss**, which is why it links directly to [[Expected-vs-Unexpected-Loss]], [[Economic-Capital-Basics]], and ultimately [[RWA-Risk-Weighted-Assets]]. The IRB framework is the regulatory mechanism that turns risk parameters into capital intensity.

The most important red-pill truth is this: **IRB is not “banks using fancy models because they want to.”** IRB is a supervisory privilege. A bank is allowed to use internal models only if it demonstrates deep data history, rating system integrity, validation discipline, conservative calibration, governance, and actual business use. In other words, IRB is not just a modeling regime; it is a governance regime. That is why it is inseparable from [[SR-11-7-Model-Governance]]. A weak model with strong predictive power can still fail IRB if it lacks traceability, override controls, independent validation, or evidence that the model is truly used in underwriting and risk management.

Institutionally, the framework is often understood in three layers:

1. **Standardized**: regulatory weights, simpler implementation, less model freedom
    
2. **Foundation IRB (FIRB)**: the bank estimates PD internally, but uses supervisory or prescribed treatment for other parameters such as LGD and EAD
    
3. **Advanced IRB (AIRB)**: the bank estimates PD, LGD, and EAD internally, subject to stricter evidence, data, calibration, and validation standards
    

That tiering matters because it tells you how much modeling responsibility the bank is allowed to assume. FIRB says, “we trust your ability to rank obligors and estimate default likelihood.” AIRB says, “we also trust your ability to estimate how much you will lose and how much will be outstanding at default.” The jump from FIRB to AIRB is therefore not cosmetic; it is a huge increase in methodological and governance burden.

## The Core Math / Code

At the broadest level, Basel credit capital can be thought of as a transformation:

$$  
{PD,LGD,EAD,M,\rho} \longrightarrow K \longrightarrow RWA \longrightarrow \text{Minimum Capital}  
$$

where:

- $PD$ is default probability from [[Probability-of-Default]]
    
- $LGD$ is severity from [[Loss-Given-Default]]
    
- $EAD$ is default exposure from [[Exposure-at-Default]]
    
- $M$ is effective maturity
    
- $\rho$ is supervisory asset correlation
    
- $K$ is capital requirement per unit of exposure
    

The standardized approach is much simpler in spirit. Instead of full internal modeling, exposures are mapped into regulatory categories with assigned risk weights. Then:

$$  
RWA=\sum_i w_i \times Exposure_i  
$$

and minimum capital is approximately:

$$  
\text{Capital Requirement}=k \times RWA  
$$

where $k$ is the regulatory capital ratio. The baseline report notes this weighted-sum structure explicitly and shows how fixed risk weights under standardized treatment map directly into RWA and then into capital.

Under IRB, the machinery is more sophisticated. Basel uses a supervisory risk-weight function that embeds a one-factor portfolio credit model logic. A stylized representation is:

$$  
K = LGD \cdot \Bigg[N\Bigg(\frac{N^{-1}(PD)+\sqrt{\rho},N^{-1}(0.999)}{\sqrt{1-\rho}}\Bigg)-PD\Bigg] \cdot MA  
$$

where:

- $N(\cdot)$ is the standard normal cumulative distribution
    
- $N^{-1}(\cdot)$ is the inverse normal function
    
- $\rho$ is supervisory asset correlation
    
- $MA$ is a maturity adjustment term
    

This expression is not just mathematics for its own sake. It encodes the Basel idea that capital should cover a very high percentile of unexpected loss, not just the average default cost. The subtraction of $PD$ inside the term reflects that expected loss is conceptually separated from the capital charge. That is why this note must always be understood together with [[Expected-vs-Unexpected-Loss]] and [[Economic-Capital-Basics]].

Once $K$ is determined, Basel translates it into risk-weighted assets as:

$$  
RWA = 12.5 \times K \times EAD  
$$

The multiplier 12.5 is simply the reciprocal of 8%, converting a capital amount into RWA-equivalent units. This is one of the most important links in all of prudential credit risk because it bridges model output and reported capital consumption. It is the exact pipe through which parameter estimates become balance-sheet constraints. This is why [[RWA-Risk-Weighted-Assets]] is not a side topic; it is the output layer of the IRB engine.

A useful comparison is below.

|Approach|Who estimates PD?|Who estimates LGD?|Who estimates EAD?|Complexity|Typical use case|
|---|---|---|---|---|---|
|Standardized|Not internally required for capital formula|Not internally required for capital formula|Not internally required for capital formula|Lower|Banks using supervisory risk weights|
|FIRB|Bank|Supervisory / prescribed treatment|Supervisory / prescribed treatment|Medium|Banks with internal rating strength but limited advanced parameter approval|
|AIRB|Bank|Bank|Bank|High|Banks with mature data, systems, validation, and governance|

Another way to understand the framework is through responsibility.

|Component|Standardized|FIRB|AIRB|
|---|---|---|---|
|Rating system quality|Helpful but less central|Critical|Critical|
|Long-run default data|Limited requirement for capital formula|Essential|Essential|
|Recovery data for LGD|Limited|Less internal reliance|Essential|
|CCF / utilization modeling|Limited|Less internal reliance|Essential|
|Validation burden|Moderate|High|Very high|
|Use test and governance|Lower threshold|Strong|Strongest|

This is the institutional jump many candidates underestimate. Moving toward AIRB is not “more quant.” It is more **evidence**, more **documentation**, more **auditability**, more **validation**, and more **business integration**.

### Why the IRB Framework Exists

The standardized approach is simple and comparable across banks, but it is blunt. It can treat very different exposures similarly if they fall into the same bucket. IRB exists because regulators recognized that sophisticated banks often have better internal information about borrower quality, collateral structure, and utilization behavior than a universal risk-weight table can capture. The tradeoff is obvious:

- **Standardized** gives comparability and simplicity
    
- **IRB** gives risk sensitivity and potential capital alignment
    
- but **IRB** also creates model risk, governance risk, and the temptation to understate capital
    

That final point is crucial. Basel allows IRB because it can be more risk-sensitive, but it also fears that banks may optimize models to reduce capital artificially. This is why floors, parameter conservatism, validation requirements, and supervisory review exist.

### The Use Test: The Real Gatekeeper

One of the deepest IRB concepts is the **use test**. A bank cannot treat the IRB model as a regulatory calculator that lives in a corner. The model must actually be used in underwriting, limit setting, portfolio monitoring, and risk management. If a bank says one thing to the regulator and another thing to its business teams, the IRB architecture is conceptually broken.

That means the internal rating system behind IRB must connect to:

- approval frameworks
    
- watchlist processes
    
- concentration management
    
- pricing logic
    
- provisioning workflows
    
- monitoring and migration analysis
    

This is why [[Probability-of-Default]] and the master rating scale are central. IRB begins with the rating system architecture. If the ratings are weak, the capital engine is downstream of a bad foundation.

### Expected Loss Versus Capital

A candidate who understands Basel only superficially will say: “IRB uses PD, LGD, and EAD to compute capital.”

A stronger candidate says: “IRB transforms PD, LGD, EAD, correlation, and maturity into a high-confidence unexpected-loss capital charge, while expected loss is conceptually handled elsewhere through pricing, provisions, or deduction logic depending on the regulatory treatment.”

That distinction is the heartbeat of Basel. It is also why this note interlocks with [[IFRS-9-and-ECL]]. IFRS 9 is asking, “what losses do we expect and need to reserve for?” Basel IRB is asking, “what severe losses beyond expectation could threaten solvency?” Same raw ingredients, very different institutional purposes.

### Where IRB Becomes Hard in Practice

IRB is hardest where data are weak, defaults are rare, and structures are complex. That is why the toughest portfolios often sit in notes like [[Low-Default-Portfolios-LDP]], [[Specialized-Lending-CRE-Project]], and [[Counterparty-Credit-Risk-CCR]]. In those areas:

- default history may be sparse
    
- recoveries may be lumpy and cycle-dependent
    
- exposure profiles may be highly path-dependent
    
- concentration can distort calibration
    
- expert judgment and overrides become more prominent
    

This is also why validators challenge not only model fit, but segmentation, downturn calibration, conservatism, and override governance.

### The Red-Pill Summary

The shallow understanding of Basel IRB is:

> “It is the approach where banks use internal models.”

The deeper understanding is:

> “It is a supervisory framework that conditionally allows banks to transform governed internal estimates of default likelihood, loss severity, and exposure into risk-sensitive prudential capital, with the entire architecture constrained by use test, validation, conservatism, and regulatory oversight.”

That is the real zero-to-hero version.



