---
title: "Exposure at Default (EAD)"
date: 2026-03-14
tags: [EAD, credit-risk, commitments]
cluster: Phase 3. Core Credit Risk Trinity
---

---

## The Institutional Reality

At a global bank, [[Exposure-at-Default]] is one of the three core credit risk parameters, alongside [[Probability-of-Default]] and [[Loss-Given-Default]]. The baseline report defines EAD as the total exposure the bank expects at the time of the borrower’s default, including both current on-balance amounts and likely future drawdowns from undrawn commitments.

This is the first red-pill truth: **current balance is often a lie**. For fully drawn term loans, EAD may be close to today’s outstanding amount. But for credit cards, overdrafts, revolving credit facilities, trade lines, and unfunded corporate commitments, the borrower can still draw additional amounts before default. In stress, that behavior can accelerate rather than shrink. Troubled borrowers often pull liquidity exactly when their condition deteriorates. So if a bank models only today’s balance and ignores pre-default utilization, it will understate risk at the worst possible moment.

That is why Basel practice relies heavily on **Credit Conversion Factors (CCFs)** for undrawn or off-balance-sheet exposures. The baseline report states this directly: CCFs are percentages applied to undrawn commitments to convert them into on-balance-sheet equivalents for EAD estimation. A 100 million unfunded line with a 75% CCF implies 75 million of additional exposure for EAD purposes.

This matters institutionally for at least four reasons:

1. **Expected loss** depends on EAD through [[Expected-vs-Unexpected-Loss]]
    
2. **Regulatory capital** depends on EAD through [[Basel-IRB-Framework]] and [[RWA-Risk-Weighted-Assets]]
    
3. **Provisioning** depends on term-structured exposure profiles under [[IFRS-9-and-ECL]]
    
4. **Stress testing** often reveals that EAD can surge under deteriorating macro conditions, linking directly to [[Macro-Stress-Testing]]
    

The baseline report also points out that Basel IRB allows banks to estimate EAD from historical utilization patterns, especially for revolving products, and that EAD is more complex again in derivatives and [[Counterparty-Credit-Risk-CCR]].

The deeper institutional point is that EAD is a **behavioral parameter**, not just an accounting parameter. PD asks whether the borrower fails. LGD asks how much you lose after failure. EAD asks what the borrower manages to use before failure. That means EAD is shaped by borrower liquidity stress, covenant structure, product type, bank control rights, collateral mechanics, and operational timing. It is where credit risk starts behaving like a race between borrower distress and lender control.

## The Core Math / Code

The cleanest conceptual definition is:

$$  
EAD = \text{Exposure outstanding at the instant of default}  
$$

For a fully funded, non-revolving term loan with little amortization uncertainty, a rough approximation may simply be:

$$  
EAD \approx \text{Current Outstanding}  
$$

But that is the easy case. The real difficulty comes when there is unused credit capacity.

### The Canonical Link to Loss

EAD enters the standard loss identity directly:

$$  
EL = PD \times LGD \times EAD  
$$

So if [[Probability-of-Default]] and [[Loss-Given-Default]] stay fixed while EAD rises, expected loss rises linearly. This is why underestimating EAD is not a small modeling error. It directly understates both loss expectations and capital intensity. The baseline report makes this linkage explicit.

### On-Balance Plus Off-Balance View

A practical decomposition is:

$$  
EAD = B + U \times CCF  
$$

where:

- $B$ = currently drawn balance
    
- $U$ = undrawn commitment
    
- $CCF$ = credit conversion factor applied to the undrawn portion
    

This is the most important EAD formula for beginners to master.

#### Example

Suppose a corporate revolver has:

- drawn balance = 40
    
- undrawn commitment = 60
    
- CCF = 75%
    

Then:

$$  
EAD = 40 + 60 \times 0.75 = 85  
$$

That means although only 40 is currently outstanding, the bank expects 85 to be exposed by the time default occurs.

This is the exact place where weak candidates collapse conceptually. They confuse current balance with credit exposure at default. But the bank is not interested in what the borrower owes today if the borrower still has time and contractual room to draw more before failing.

### CCF as a Behavioral Parameter

A strong way to think about CCF is:

$$  
CCF = \frac{EAD - B}{U}  
$$

provided $U > 0$.

This means CCF measures the fraction of unused commitment that becomes utilized by default. If:

- $CCF = 0$, no extra drawdown happens
    
- $CCF = 1$, all unused commitment is fully drawn by default
    
- $CCF > 1$ can occur in some practical formulations depending on fees, accrued items, or modeling conventions, but the core intuition is still about incremental utilization
    

So CCF is really a **utilization-under-stress** statistic.

### Why Revolvers Are So Dangerous

Revolving lines are where EAD becomes truly interesting. The baseline report uses the credit card example for exactly this reason: even if the current balance is low, the borrower may draw much more before default.

This happens because distressed borrowers often behave rationally from their own perspective:

- they use remaining liquidity before it is frozen
    
- they refinance weaker cash positions using committed lines
    
- they fund working capital stress with revolvers
    
- they draw because they anticipate future covenant pressure or lender action
    

That means EAD is often **wrong-way behavioral risk**: borrower distress increases the tendency to use more of the bank’s money.

A useful stylized view is:

$$  
EAD_t = B_t + U_t \times CCF_t  
$$

where $CCF_t$ may itself rise as credit quality deteriorates. This is one reason EAD modeling becomes tightly linked to internal ratings, watchlist status, and macro stress.

### Product-by-Product Intuition

|Product Type|EAD intuition|
|---|---|
|Fully drawn term loan|Often close to current balance, adjusted for amortization/accruals|
|Credit card|Can materially exceed current balance due to pre-default drawdown|
|Corporate revolver|Often sensitive to liquidity stress and covenant dynamics|
|Trade finance / guarantees|Requires conversion from contingent exposure to funded-equivalent exposure|
|Derivatives|Exposure depends on replacement cost and future market movement, linking to [[Counterparty-Credit-Risk-CCR]]|

The baseline report explicitly notes that EAD for derivatives is more complex and often involves replacement cost plus future exposure add-ons, which is exactly why CCR is usually treated as a specialized branch of EAD logic.

### EAD in Basel IRB

Under [[Basel-IRB-Framework]], EAD is one of the critical inputs feeding the capital engine. In stylized form:

$$  
RWA = 12.5 \times K \times EAD  
$$

So even if the capital rate $K$ is unchanged, a higher EAD mechanically increases [[RWA-Risk-Weighted-Assets]]. This is why EAD estimation has direct balance-sheet consequences. It is not a technical footnote. It changes capital consumption.

This also explains why banks fight hard over EAD calibration. A lower CCF means lower EAD, which means lower RWA and lower capital requirement. That creates natural model-risk pressure, which is exactly why [[SR-11-7-Model-Governance]] matters so much here.

### EAD Under IFRS 9

Under [[IFRS-9-and-ECL]], the challenge is even more dynamic. The bank may need **future exposure paths** over the remaining life of the facility, not just a one-year regulatory estimate. A stylized lifetime ECL expression is:

$$  
ECL = \sum_{t=1}^{T}\frac{PD_t \times LGD_t \times EAD_t}{(1+r)^t}  
$$

This means IFRS 9 often requires projected $EAD_t$ across future time buckets. For amortizing loans, EAD may decline over time. For revolving products, it may rise under deterioration. So accounting and regulatory uses may share the same concept but need different horizon structures.

### EAD and Amortization

For installment loans, EAD can decline if the borrower keeps paying before default. A stylized form is:

$$  
EAD_t = B_0 - \sum_{s=1}^{t} \text{Scheduled Principal}_s + \text{Accrued Interest}_t  
$$

This is why EAD is not always just “today’s outstanding.” Timing matters. Accrued interest, fees, and partial repayment patterns can all affect the final default exposure.

### What Validators Attack First

Under [[SR-11-7-Model-Governance]], validators usually go after EAD models in very specific ways:

- Is the drawdown sample representative of current usage behavior?
    
- Are distressed borrowers drawing more than the model assumes?
    
- Is segmentation by product, industry, or obligor type adequate?
    
- Are CCFs stale or biased by benign-cycle history?
    
- Are cancelled, frozen, or unconditionally cancellable commitments treated correctly?
    
- Is amortization handled properly?
    
- Are accruals, fees, and operational balances included correctly?
    
- Does the model distinguish term loans from revolvers from contingent facilities?
    
- Is there overlap or inconsistency between EAD and LGD treatment of collateral or covenants?
    

This last point matters a lot. A weak bank may let the same control feature reduce both EAD and LGD too aggressively, which can understate total risk.

### EAD vs Limit vs Balance

This is one of the most important clean distinctions in the whole topic.

|Concept|Meaning|
|---|---|
|Current Balance|What is drawn today|
|Credit Limit / Commitment|Maximum contractually available amount|
|EAD|What is expected to be owed at default|

The relation is often:

$$  
\text{Current Balance} \leq EAD \leq \text{Commitment Limit}  
$$

for many revolving products, though the exact positioning depends on utilization behavior and contractual mechanics.

That one relationship alone clears up a huge amount of confusion.

### The Real Red-Pill Summary

The shallow answer is:

“EAD is the amount outstanding when the borrower defaults.”

The real answer is:

“EAD is the economically and behaviorally expected exposure at the moment of default, combining drawn balances, undrawn commitment usage, accrual dynamics, and product-specific utilization behavior, with Credit Conversion Factors translating off-balance-sheet capacity into default-time exposure.”

That is the zero-to-hero version.
