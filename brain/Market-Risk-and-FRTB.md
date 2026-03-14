---
title: "Market Risk and FRTB"
date: 2026-03-14
tags: [market-risk, FRTB, VaR, expected-shortfall]
cluster: Cross-Domain Risk
---


---

## The Feynman Hook

Imagine you run a shop where the prices of everything in your store change every minute. One hour your inventory is worth a lot, the next hour it drops because interest rates move, the stock market falls, or currencies swing. That danger is not about borrowers failing to pay you back. It is about **market prices themselves** attacking the value of what you hold.

That is **market risk**. And **FRTB** is the banking rulebook built to measure and capitalize that danger more harshly after regulators realized that older methods could underestimate extreme trading losses. The goal is not just to ask, “What do we usually lose on a bad day?” but, “What happens when the market becomes violent in the tail?”

## The Institutional Reality

At a global bank, [[Market-Risk-and-FRTB.md]] governs the capital treatment of losses arising from movements in market variables such as interest rates, equity prices, foreign exchange rates, credit spreads, and commodity prices. Your baseline report states this directly and also notes the central regulatory shift: under FRTB, the older **Value at Risk (VaR)** framework is largely replaced by **Expected Shortfall (ES)** because ES captures tail losses more comprehensively.

This is the first red-pill truth: **market risk is about repricing, not default**.

That sounds obvious, but it matters deeply when you compare this note with [[Probability-of-Default.md]] or [[Loss-Given-Default.md]]. In credit risk, the core question is whether a borrower fails and how much you lose when they do. In market risk, the position may still be perfectly performing from a legal perspective, yet the bank can still lose money because the market marks that position lower. A bond portfolio can lose value because spreads widen. A swap book can lose value because rates move. An FX desk can lose value because currencies gap.

This is why market risk sits next to, but not inside, classical credit risk. It often interacts with [[Counterparty-Credit-Risk-CCR.md]], especially where valuation changes and counterparty spread moves overlap, and it links directly to [[RWA-Risk-Weighted-Assets.md]] because FRTB converts trading-book risk into capital consumption.

### Why FRTB Exists

The second red-pill truth is this: **FRTB is the regulator’s answer to the discovery that “normal-period” market models were too optimistic in crisis conditions.**

The old market-risk regime relied heavily on VaR. VaR was useful, but it had a weakness: it tells you the cutoff loss at a confidence level, but it does not tell you how bad losses become **beyond** that cutoff. So two portfolios can have the same VaR even if one has a much nastier tail.

That is why your baseline report emphasizes that FRTB shifts to **Expected Shortfall**, which looks at the **average loss in the worst tail scenarios** rather than only the threshold. This is the core philosophical move of the regime.

### The Banking Book vs Trading Book Boundary

One of the most important institutional ideas in FRTB is the **boundary between the banking book and the trading book**. Your baseline report notes that under FRTB banks must define that boundary clearly before applying either standardized or internal-model capital treatment.

That matters because the same broad economic exposure can produce very different capital logic depending on where it sits:

- banking-book exposures connect more naturally to frameworks like [[Basel-IRB-Framework.md]], [[Probability-of-Default.md]], and [[IFRS-9-and-ECL.md]]
    
- trading-book exposures connect to FRTB capital through sensitivities, stressed market losses, desk models, and modellability tests
    

This is the third red-pill truth: **book classification is not accounting decoration; it is a capital regime choice.**

### Standardized Approach vs Internal Models Approach

Your baseline report also highlights the two major FRTB routes:

- a **standardized approach** using sensitivities and prescribed capital structures
    
- an **internal models approach (IMA)** that uses expected-shortfall models at trading-desk level, subject to strict approval and model-quality tests
    

This is the fourth red-pill truth: **FRTB does not trust internal models blindly.** A desk cannot simply say, “our quant team built a clever model.” The model has to earn approval. That takes us straight into [[SR-11-7-Model-Governance.md]] because market-risk models, like credit models, must survive validation, backtesting, and challenge.

FRTB’s internal-model logic is therefore similar in spirit to [[Basel-IRB-Framework.md]]:

- both allow internal risk measurement
    
- both demand supervisory approval
    
- both create a standardized fallback
    
- both are responses to the fact that internal models can be useful but also dangerous if unguided
    

### Modellable vs Non-Modellable Risk Factors

Your baseline report explicitly notes another crucial FRTB feature: risk factors must be **modellable**, meaning there must be sufficient real market data to support them; otherwise they are treated as **non-modellable** and attract extra capital.

This is the fifth red-pill truth: **under FRTB, lack of data is itself a capital problem**.

That is incredibly important. In ordinary ML culture, sparse data may just mean “try regularization.” In prudential regulation, sparse market evidence means the supervisor may say: “You do not know enough about this factor, so hold more capital.”

That logic should feel familiar from [[Low-Default-Portfolios-LDP.md]]. There too, sparse data do not create comfort; they create conservatism.

## The Core Math / Code

The classical market-risk measure is **Value at Risk (VaR)**.

For a loss random variable $L$, VaR at confidence level $\alpha$ is:

$$  
VaR_{\alpha}(L)=\inf { \ell \in \mathbb{R} : P(L \le \ell)\ge \alpha }  
$$

In practice, this is the loss threshold that will not be exceeded with probability $\alpha$ over the chosen horizon.

A very common interpretation is:

- 99% VaR = the loss threshold exceeded only 1% of the time under the modeled distribution
    

But VaR has a major weakness: it stops at the threshold.

### Expected Shortfall

FRTB’s conceptual upgrade is **Expected Shortfall (ES)**.

For the same loss variable $L$:

$$  
ES_{\alpha}(L)=\mathbb{E}[L \mid L \ge VaR_{\alpha}(L)]  
$$

This means ES is the **average loss given that you are already in the worst tail beyond VaR**.

That is the deepest mathematical difference between VaR and ES:

- **VaR** tells you where the cliff starts
    
- **ES** tells you how deep the fall is after you go over it
    

Your baseline report expresses this directly by saying ES captures the average loss in the worst tail scenarios and therefore captures tail risk more comprehensively than VaR.

### Why ES Is More Punishing

Suppose two desks each have the same 99% VaR of 10 million. That means both hit the same threshold at the 99th percentile.

But:

- Desk A loses about 11 million on average once it breaches that point
    
- Desk B loses 35 million on average once it breaches that point
    

VaR treats them as similar at the threshold. ES does not. That is exactly why regulators prefer ES for capital purposes.

### Historical / Monte Carlo Intuition

Your baseline report notes that VaR and ES are typically computed using historical simulation or Monte Carlo-style scenario generation.

A simple historical-simulation intuition is:

1. take a portfolio
    
2. revalue it under many historical or simulated market moves
    
3. create the distribution of gains and losses
    
4. read off the relevant tail statistic
    

If the ordered loss scenarios are $L_{(1)} \le \dots \le L_{(N)}$, then a crude empirical VaR is the relevant percentile of that ordered sample, while ES is the average of the worst tail beyond it.

A stylized empirical ES is:

$$  
\widehat{ES}_{\alpha}=\frac{1}{m}\sum_{j=N-m+1}^{N} L_{(j)}  
$$

where the top $m$ losses correspond to the worst $(1-\alpha)$ fraction.

### FRTB Capital Logic

A clean conceptual view of FRTB is:

$$  
\text{Market Risk Factors} \rightarrow \text{Desk Loss Distribution} \rightarrow \text{ES / SA Capital} \rightarrow \text{RWA}  
$$

This makes FRTB the market-risk analogue of how [[Basel-IRB-Framework.md]] turns PD/LGD/EAD into capital for credit risk.

A high-level comparison is useful:

|Dimension|Credit IRB World|FRTB Market-Risk World|
|---|---|---|
|Core risk source|Borrower default and recovery|Market price moves|
|Main parameters|[[Probability-of-Default.md]], [[Loss-Given-Default.md]], [[Exposure-at-Default.md]]|Sensitivities, desk P&L, risk factors, ES|
|Tail concept|Unexpected loss capital|Expected shortfall capital|
|Internal model permission|Yes, under IRB approval|Yes, under IMA approval|
|Standardized fallback|Standardized credit risk weights|Standardized market-risk approach|
|Governance need|High|Very high|

### Standardized Approach Intuition

Your baseline report says the standardized FRTB route uses sensitivities and prescribed capital logic.

This is important because the standardized approach is not just a crude fallback. It is a regulator-built capital engine that translates exposures into market-risk capital even when internal models are not approved or not trusted enough.

The rough logic is:

$$  
\text{Position Sensitivities} \rightarrow \text{Bucket Aggregation} \rightarrow \text{Stress / Correlation Rules} \rightarrow \text{Capital Charge}  
$$

This is the sixth red-pill truth: **standardized does not mean simple in a business sense; it means regulator-prescribed.**

### Internal Models Approach Intuition

Under IMA, the bank estimates risk at **desk level** using approved expected-shortfall models. Your baseline report notes that the IMA relies on expected-shortfall models per trading desk and is subject to strict approval.

That means FRTB does not grant internal-model freedom at an aggregate bank-wide level without qualification. The desk has to earn model eligibility.

This naturally connects to model-validation themes:

- desk-level performance must be credible
    
- risk factors must be modellable
    
- backtesting and attribution matter
    
- governance failure can force fallback to standardized capital
    

That is why FRTB is such a strong cross-domain note for a credit specialist. It teaches the same prudential lesson in a different language: **internal models are privileges, not rights**.

### Trading-Book Tail Risk vs Credit Tail Risk

A strong comparison helps here.

|Topic|Credit Tail Risk|Market Tail Risk|
|---|---|---|
|Trigger|Default wave, recovery collapse|Extreme repricing of rates, spreads, FX, equities, commodities|
|Core tail measure|Economic capital / IRB unexpected loss|Expected shortfall|
|Time behavior|Often slower and linked to deterioration|Can materialize very quickly|
|Data problem|Sparse defaults in some segments|Sparse or illiquid risk-factor observations|
|Conservatism response|Floors, downturn LGD, overlays|Non-modellable add-ons, standardized fallback|

This is why [[Market-Risk-and-FRTB.md]] belongs in your Credit Risk OS. It teaches the same deep regulatory principle in another risk class: when data are weak or tails are under-modeled, the supervisor imposes conservatism.

### Why FRTB Matters to a Credit Quant

A credit quant should care because:

- credit spreads are market variables too
    
- trading-book credit products live under market-risk capital
    
- CCR and CVA sit partly at the border between credit and market risk, linking to [[Counterparty-Credit-Risk-CCR.md]]
    
- the prudential design logic of FRTB mirrors what you already see in [[Basel-IRB-Framework.md]] and [[RWA-Risk-Weighted-Assets.md]]
    

That is the seventh red-pill truth: **once you understand FRTB, you realize the regulator keeps asking the same question across domains — how do we stop firms from understating tail risk just because the model looked calm in normal times?**

### What Validators Attack First

Under [[SR-11-7-Model-Governance.md]], validators usually attack FRTB or market-risk frameworks through questions like:

- Is the desk boundary and trading-book scope correct?
    
- Are risk factors genuinely modellable?
    
- Does the ES engine capture tail concentration properly?
    
- Are liquidity assumptions too benign?
    
- Does the standardized-vs-IMA comparison reveal suspiciously low internal capital?
    
- Are desk-level loss explainability and attribution credible?
    
- Are illiquid or jumpy market risks being hidden in assumptions?
    

This is where FRTB becomes more than a formula topic. It becomes a governance and skepticism topic.

### The Real Red-Pill Summary

The shallow answer is:

“FRTB replaced VaR with Expected Shortfall for market-risk capital.”

The real answer is:

“FRTB is the post-crisis market-risk capital architecture that forces banks to treat trading-book tail losses more honestly by moving from threshold-based VaR thinking to tail-average Expected Shortfall, imposing strict trading-book boundaries, desk-level internal-model approval, and extra conservatism for non-modellable risks so that market capital becomes harder to game and more sensitive to true stress behavior.”

