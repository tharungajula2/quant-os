---
title: "Loss Given Default (LGD)"
date: 2026-03-14
tags: [LGD, credit-risk, collateral]
cluster: The Quant Trinity
---

---

## The Feynman Hook

Imagine you lend your friend a new bicycle worth ₹10,000. If he completely disappears, you do not always lose the full ₹10,000. Maybe you recover the lock, maybe his parents return part of the money, or maybe you sell the bicycle’s spare parts. **Loss Given Default (LGD)** is the share you still lose **after** default happens and **after** all recoveries are counted.

That is why LGD is not about whether default happens. That job belongs to [[Probability-of-Default.md]]. LGD asks a different and more brutal question: **once the borrower has already failed, how much pain is left for the bank after collateral, legal recovery, guarantees, and workout efforts?**

## The Institutional Reality

At a global bank, [[Loss-Given-Default.md]] is one of the three core credit risk parameters together with [[Probability-of-Default.md]] and [[Exposure-at-Default.md]]. The baseline report defines LGD as the percentage of exposure that is **not recovered** once default has occurred, and notes that Basel treats it as the bank’s best estimate of average percentage loss per defaulted exposure.

The first red-pill insight is that default does **not** equal full loss. A borrower can default and the bank may still recover cash through collateral liquidation, guarantees, restructuring, bankruptcy proceeds, sponsor support, or post-default collections. So LGD is fundamentally a **recovery problem**, not merely a credit event label. This is why an unsecured corporate term loan, a mortgage backed by real estate, and a project finance facility with hard assets can all have very different LGDs even if the same borrower-level default concept is being used.

The second red-pill insight is that LGD is one of the most cyclically dangerous parameters in the whole stack. In benign environments, recoveries often look healthy because asset prices are elevated, refinancing markets are open, and collateral can be sold at acceptable values. But when the economy turns, exactly when defaults rise, recoveries often deteriorate at the same time. The baseline report highlights this explicitly through the concept of **downturn LGD**, where stressed economic conditions reduce recoveries and raise losses.

That is why Basel capital work under [[Basel-IRB-Framework.md]] tends to be conservative about LGD. Regulators do not want banks using peak-cycle recovery assumptions to calculate through-the-cycle capital. In practice, banks are expected to reflect stressed recovery conditions where necessary, especially when collateral values and liquidation outcomes are materially linked to the cycle. Real estate is the classic example: during a property boom, recovery looks strong; during a property crash, collateral haircuts widen and LGD rises exactly when it matters most.

Institutionally, LGD sits at the junction of several worlds:

- it feeds [[Expected-vs-Unexpected-Loss.md]] through the canonical loss identity
    
- it influences tail loss and capital through [[Economic-Capital-Basics.md]] and [[RWA-Risk-Weighted-Assets.md]]
    
- it interacts with accounting reserves under [[IFRS-9-and-ECL.md]]
    
- it becomes especially difficult in [[Specialized-Lending-CRE-Project.md]] and [[Low-Default-Portfolios-LDP.md]], where collateral quality, recovery timing, and sparse default history complicate estimation
    

This is why strong validators treat LGD as far more than a “plug input.” Under [[SR-11-7-Model-Governance.md]], they challenge recovery data representativeness, collateral valuation practices, cure assumptions, discounting, downturn calibration, segmentation, and the treatment of incomplete workout histories. A weak bank thinks LGD is just “1 minus recovery.” A strong bank knows LGD is where legal process, collateral realism, economics, and model governance all collide.

## The Core Math / Code

The cleanest definition is:

$$  
LGD = 1 - RR  
$$

where $RR$ is the recovery rate as a proportion of exposure.

So if the bank recovers 60% of the defaulted exposure, then:

$$  
LGD = 1 - 0.60 = 0.40  
$$

meaning 40% of the exposure is lost.

### Link to Expected Loss

LGD enters directly into the core credit loss identity:

$$  
EL = PD \times LGD \times EAD  
$$

This means that, holding [[Probability-of-Default.md]] and [[Exposure-at-Default.md]] constant, higher LGD mechanically increases expected loss. That is why collateral quality matters so much. A safer recovery profile can materially reduce both expected and unexpected loss.

### Recovery-Based View

A more operational view writes LGD from post-default cash flows. Suppose a defaulted exposure has gross exposure $EAD$ and the bank collects discounted recoveries $CF_t$ over time. Then economic recovery value is:

$$  
RV = \sum_{t=1}^{T}\frac{CF_t}{(1+r)^t}  
$$

and LGD can be expressed as:

$$  
LGD = \frac{EAD - RV}{EAD}  
$$

where:

- $EAD$ is the exposure at the moment of default
    
- $CF_t$ are recovery cash flows from liquidation, restructuring, guarantees, or collections
    
- $r$ is the workout discount rate
    
- $RV$ is the discounted recovery value
    

This is the deeper reality: LGD is not just a snapshot ratio. It is often the result of a **multi-period workout process**. Recovery may arrive months or years after default, which means discounting matters. Two loans with the same gross recovery amount can have different economic LGD if one recovers quickly and the other takes years through court processes.

### Secured vs Unsecured Structure

The baseline report notes that Basel practice may split an exposure into secured and unsecured components, each with different effective loss characteristics, often reflecting collateral treatment and haircuts.

A stylized decomposition is:

$$  
LGD_{effective} = \frac{LGD_{sec}\times E_{sec} + LGD_{unsec}\times E_{unsec}}{E_{sec}+E_{unsec}}  
$$

where:

- $E_{sec}$ is the secured portion of exposure
    
- $E_{unsec}$ is the unsecured portion
    
- $LGD_{sec}$ is usually lower because recoveries are supported by collateral
    
- $LGD_{unsec}$ is usually higher because the lender is exposed to residual borrower value only
    

This is where **collateral haircuts** become critical. The bank does not usually treat collateral at face value. It applies haircuts to reflect volatility, legal enforceability risk, valuation uncertainty, and liquidation discount.

A stylized secured exposure adjustment is:

$$  
C_{adj} = C_{market}\times (1-h)  
$$

where:

- $C_{market}$ is current collateral market value
    
- $h$ is the collateral haircut
    

The unsecured residual can then be approximated as:

$$  
E_{unsec} = \max(EAD - C_{adj}, 0)  
$$

This is one of the most practical places where credit risk stops being abstract. If collateral is illiquid, legally weak, operationally hard to realize, or highly cyclical, the haircut should be larger and LGD should be higher.

### Downturn LGD

This is one of the heaviest interview and validation topics in wholesale credit risk.

The baseline report explicitly notes that Basel expects LGD estimates to reflect economic downturn conditions where necessary.

The intuition is simple:

- defaults increase in bad times
    
- recoveries often worsen in bad times
    
- therefore average historical LGD may understate loss severity precisely when capital is most needed
    

A stylized downturn adjustment can be written as:

$$  
LGD_{downturn} = LGD_{longrun} + \Delta_{stress}  
$$

where $\Delta_{stress}$ captures the incremental severity observed or imposed under adverse conditions.

Another way to frame it is:

$$  
LGD_{downturn} \geq LGD_{longrun}  
$$

in prudential settings where downturn conditions are materially relevant.

This matters because a bank using benign-cycle recoveries in IRB capital can artificially depress [[RWA-Risk-Weighted-Assets.md]] and understate required capital. That is exactly why validators and supervisors pay so much attention to downturn calibration.

### A Simple LGD Intuition Table

|Facility Type|Collateral Profile|Typical LGD Intuition|
|---|---|---|
|Unsecured corporate loan|No hard collateral|Higher LGD|
|Senior secured term loan|Strong claim on assets|Lower LGD|
|Mortgage loan|Property-backed, but cyclical|Moderate, rises in downturn|
|Project finance|Asset-backed but workout-dependent|Highly structure-sensitive|
|Subordinated debt|Junior claim in capital structure|Higher LGD|

This is intuition, not a universal rule. Real LGD depends on collateral quality, legal seniority, jurisdiction, workout efficiency, covenant protection, and macro conditions.

### Long-Run Average vs Downturn View

A useful way to organize LGD thinking is:

|Lens|Purpose|Main idea|
|---|---|---|
|Long-run average LGD|General recovery experience over time|Anchors average empirical loss severity|
|Downturn LGD|Prudential capital conservatism|Reflects stressed recovery conditions|
|PiT or scenario LGD|Forward-looking accounting or stress work|Adapts to current or forecast conditions|

This mirrors the broader tension also seen in [[Probability-of-Default.md]] between stable prudential calibration and current-condition sensitivity.

### LGD and Correlation with PD

One of the deepest conceptual points is that PD and LGD are often **not independent**.

In shallow textbook thinking:

- PD tells you if default happens
    
- LGD tells you how much is lost if it does
    

But in real recessions, both worsen together:

- more borrowers default
    
- collateral values fall
    
- market liquidity evaporates
    
- recovery timelines lengthen
    
- court systems clog
    
- refinance exits disappear
    

So the joint stress effect can be brutal. This is why macro downturns amplify both expected and tail loss, linking LGD directly to [[Macro-Stress-Testing.md]] and to the capital intuition in [[Economic-Capital-Basics.md]].

### Workout LGD vs Market LGD

A mature institution may distinguish between:

- **Workout LGD**: based on actual post-default cash recoveries over time
    
- **Market LGD**: based on observed market prices of distressed debt soon after default
    

These approaches can differ meaningfully. Workout LGD is often closer to what banks use for internal empirical estimation. Market LGD may be useful in certain traded or benchmark-rich settings. The choice matters because one is driven by realized resolution outcomes and the other by contemporaneous market-implied expectations.

### Where LGD Models Commonly Fail

Under [[SR-11-7-Model-Governance.md]], validators usually attack LGD along these lines:

- recovery data are too short or too benign
    
- collateral values are stale or over-optimistic
    
- incomplete workouts are mishandled
    
- discounting assumptions are weak
    
- cures are treated inconsistently
    
- downturn adjustment is cosmetic
    
- segmentation is too coarse
    
- unsecured and secured portions are blended poorly
    
- low-default segments borrow assumptions without enough conservatism
    

That is why LGD is often harder than junior candidates expect. A PD model may fail because it ranks poorly. An LGD model often fails because the economic realism of recoveries was not taken seriously enough.

### The Real Red-Pill Summary

The shallow answer is:

“LGD is the percent of exposure lost if default happens.”

The real answer is:

“LGD is the economically realized loss severity conditional on default, driven by collateral, seniority, legal enforceability, workout process, timing of recoveries, and macro conditions, with prudential frameworks often requiring downturn calibration because recoveries worsen exactly when defaults cluster.”

That is the zero-to-hero version.
