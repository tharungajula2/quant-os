---
title: "Economic Capital Basics"
date: 2026-03-19
tags: [credit-risk, capital, Basel, unexpected-loss]
cluster: Phase 1. Bank Loss Engine
progress: 0
---

---

## The Institutional Reality

At a global bank, economic capital is the internal risk language for survivability. It answers one brutal question: **How much capital does the bank need so that extreme but plausible losses do not wipe out equity?** This is why economic capital sits directly on top of [[Expected-vs-Unexpected-Loss]]. The bank first estimates ordinary portfolio loss using [[Probability-of-Default]], [[Loss-Given-Default]], and [[Exposure-at-Default]]. That gives the mean credit cost. Then it models the entire loss distribution around that mean. Economic capital is the part of the distribution that lies far into the tail.

This matters because real banking is not run on averages. A portfolio can show modest average expected loss and still be dangerous if defaults are highly correlated, concentrated in one sector, or vulnerable to macro shocks. That is why institutions connect economic capital to [[RWA-Risk-Weighted-Assets]], [[Basel-IRB-Framework]], and [[Macro-Stress-Testing]]. Basel capital formulas are a standardized regulatory approximation of the same core idea: hold enough capital against **unexpected loss**, not just expected loss. Internal economic capital frameworks often go further by modeling name concentration, industry concentration, wrong-way risk, geographic concentration, and correlations across asset classes.

In practice, economic capital is also a management tool, not just a regulatory concept. Banks use it for:

- risk-adjusted pricing
    
- portfolio steering
    
- business line performance measurement
    
- limit setting
    
- strategic capital allocation
    
- stress loss absorbency assessment
    

That means economic capital sits between theory and decision-making. A bank that understands only expected loss can price the average world. A bank that understands economic capital can survive the world when it stops behaving normally.

This is also why the concept is deeply tied to [[SR-11-7-Model-Governance]]. A model risk team will challenge whether the bank’s economic capital framework captures concentration, dependency, downturn behavior, model uncertainty, and diversification correctly. They will ask whether the confidence level is defensible, whether the horizon is consistent, whether the calibration is procyclical, and whether the same risk is being counted twice in provisions, stress loss, and capital. In elite risk work, the real question is never “Did you compute a percentile?” The real question is “Did you build a coherent solvency framework?”

## The Core Math / Code

The clean starting point is to define portfolio credit loss as a random variable $L$.

Expected loss is the average:

$$  
EL=\mathbb{E}[L]  
$$

Economic capital is then the amount of loss in excess of expected loss that the bank wants to survive at a very high confidence level. In a Value-at-Risk framing:

$$  
EC=\mathrm{VaR}_{\alpha}(L)-\mathbb{E}[L]  
$$

where:

- $EC$ is economic capital
    
- $\mathrm{VaR}_{\alpha}(L)$ is the $\alpha$ confidence percentile of portfolio loss
    
- $\mathbb{E}[L]$ is expected loss
    

A more coherent tail measure, often preferred in advanced internal frameworks, replaces VaR with Expected Shortfall:

$$  
EC=\mathrm{ES}_{\alpha}(L)-\mathbb{E}[L]  
$$

This is the first red-pill point: **economic capital is not the total tail loss**. It is the tail loss **above** expected loss. The expected piece is supposed to be borne through pricing, spread, and provisioning under concepts linked to [[IFRS-9-and-ECL]]. The capital cushion exists for the excess.

At the single-obligor level, the expected loss contribution is still:

$$  
EL_i=PD_i \times LGD_i \times EAD_i  
$$

At the portfolio level:

$$  
EL=\sum_{i=1}^{n}PD_i \times LGD_i \times EAD_i  
$$

But economic capital does not come from summing ELs. It comes from the **shape** of the portfolio loss distribution, which depends on:

- default correlation
    
- concentration
    
- exposure size dispersion
    
- sectoral dependence
    
- macro sensitivity
    
- recovery dependence
    
- drawdown behavior on undrawn lines
    

A simplified view of portfolio loss is:

$$  
L=\sum_{i=1}^{n}D_i \cdot LGD_i \cdot EAD_i  
$$

where $D_i$ is a default indicator. Then:

$$  
\mathrm{Var}(L)=\sum_i \mathrm{Var}(L_i)+2\sum_{i<j}\mathrm{Cov}(L_i,L_j)  
$$

That covariance term is where economic capital becomes real. If defaults move together, the tail explodes. If a portfolio is concentrated in one sector or geography, economic capital rises even when average EL remains stable. This is why a portfolio with low average PDs can still demand large capital.

A good mental map is below.

|Layer|What it measures|Typical coverage mechanism|Core linked note|
|---|---|---|---|
|Expected Loss|Average credit cost|Pricing and provisions|[[Expected-vs-Unexpected-Loss]]|
|Unexpected Loss|Volatility and tail loss beyond average|Capital buffer|[[Economic-Capital-Basics]]|
|Regulatory Capital|Standardized or prescribed capital requirement|Basel ratios and RWA|[[Basel-IRB-Framework]]|
|Accounting Reserve|Forward-looking impairment allowance|IFRS 9 ECL|[[IFRS-9-and-ECL]]|

A second red-pill distinction is between **economic capital** and **regulatory capital**.

|Dimension|Economic Capital|Regulatory Capital|
|---|---|---|
|Owner|Internal bank risk management|Regulator / prudential framework|
|Goal|True economic solvency measurement|Minimum legal capital compliance|
|Method|Internal portfolio model|Standardized or Basel-prescribed formulas|
|Sensitivity|Can capture concentration and diversification more richly|Often constrained by rule design|
|Use case|Pricing, allocation, strategy, limits|Capital adequacy reporting and compliance|
|Linkages|[[Macro-Stress-Testing]], internal risk appetite|[[RWA-Risk-Weighted-Assets]], [[Basel-IRB-Framework]]|

This distinction matters in interviews and in real life. A bank may hold more internal economic capital than the regulatory minimum because management knows the regulatory rule is too blunt for the actual concentration structure of the portfolio.

### Confidence Level and Horizon

Economic capital is meaningless without a confidence level and time horizon. A bank may ask:

- what one-year loss should we survive at 99.9% confidence?
    
- what downturn loss should we absorb across a severe scenario?
    
- what loss should not be exceeded except once in a thousand cases?
    

That leads to formulations like:

$$  
P(L \leq EL+EC)\geq \alpha  
$$

If $\alpha=99.9%$, then economic capital is designed so that losses exceed $EL+EC$ only in 0.1% of modeled cases.

This is not just math; it is policy. A higher confidence level implies more capital and lower insolvency risk, but also lower return on equity. Capital is expensive. So economic capital is where risk theory collides with business strategy.

### A Stylized Numerical Example

Suppose a portfolio has:

- $EL = 40$ million
    
- $99.9%$ loss percentile = $160$ million
    

Then:

$$  
EC=160-40=120  
$$

That means the bank expects to lose 40 million on average, but wants an additional 120 million capital cushion to survive an extreme tail event. The total loss absorbency at that percentile is 160 million, but only 120 million is classified as economic capital because expected loss is not capital’s job.

### Relationship to Basel IRB

Under [[Basel-IRB-Framework]], the IRB framework is built to produce capital for unexpected loss. Very loosely, the Basel capital function transforms PD, LGD, EAD, asset correlation, and maturity into a capital requirement per unit of exposure. This is then converted into [[RWA-Risk-Weighted-Assets]] and ultimately multiplied by the minimum capital ratio.

Conceptually:

$$  
RWA = 12.5 \times K \times EAD  
$$

where $K$ is the capital requirement rate driven by the Basel risk function.

That $K$ is meant to reflect unexpected loss at a high confidence level, not the full expected loss. This is why provisions and capital coexist. They are not duplicates if the framework is coherent.

### Why Concentration Changes Everything

A beginner often assumes that if portfolio EL is diversified, capital should be low. That is naive. Diversification helps only when losses are not too dependent. Economic capital rises sharply when:

- the portfolio is concentrated in a handful of large names
    
- multiple obligors depend on the same macro driver
    
- sectors are highly cyclical
    
- collateral values collapse together
    
- undrawn facilities are heavily utilized during stress
    
- sovereign, bank, and corporate exposures are linked through contagion
    

This is why economic capital must be thought of as a **portfolio problem**, not merely a sum of individual risk metrics. That is also why the concept naturally connects to [[Low-Default-Portfolios-LDP]], [[Specialized-Lending-CRE-Project]], and [[Counterparty-Credit-Risk-CCR]], where concentration and dependency structures can become brutal.

### Economic Capital and Risk-Adjusted Performance

Banks often use economic capital as a denominator in performance metrics. A business line may look profitable in absolute terms, but if it consumes enormous economic capital, it may be unattractive on a risk-adjusted basis.

A stylized version is:

$$  
RAROC=\frac{\text{Risk-Adjusted Return}}{\text{Economic Capital}}  
$$

This is why economic capital is not just a solvency idea. It is also a steering mechanism. Senior management uses it to ask: which business lines create return without consuming a disproportionate share of tail-risk capacity?

### Where Candidates Usually Think Too Shallowly

The shallow answer is: “Economic capital is a buffer for unexpected losses.”

The deeper answer is: economic capital is an internally modeled solvency lens that translates portfolio dependency, concentration, and tail risk into capital consumption for pricing, allocation, and risk appetite management. It is not just a regulatory number; it is the bank’s internal truth-telling mechanism about how fragile the balance sheet really is.

That is the full zero-to-hero lens:

- [[Expected-vs-Unexpected-Loss]] tells you what loss is ordinary versus dangerous.
    
- [[Probability-of-Default]], [[Loss-Given-Default]], and [[Exposure-at-Default]] give you the raw ingredients.
    
- [[Basel-IRB-Framework]] and [[RWA-Risk-Weighted-Assets]] translate risk into prudential capital.
    
- [[IFRS-9-and-ECL]] handles expected loss through accounting reserves.
    
- [[Macro-Stress-Testing]] asks what happens when the whole environment goes bad at once.
    
- [[SR-11-7-Model-Governance]] asks whether your capital framework is actually credible.
    

