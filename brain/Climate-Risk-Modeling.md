---
title: "Climate Risk Modeling"
date: 2026-03-14
tags: [climate-risk, physical-risk, transition-risk, stress-test]
cluster: Phase 5. Hard Portfolios & Stress
---

---

## The Institutional Reality

At a global bank, [[Climate-Risk-Modeling]] is best understood as an **overlay architecture** on top of traditional credit risk rather than a totally standalone model family. Your uploaded baseline report states this directly: climate risk has two main faces, **physical risk** and **transition risk**, and in practice banks overlay climate scenarios onto existing credit models rather than replacing the full credit stack from scratch.

The first red-pill truth is this: **climate risk usually enters credit models indirectly**.

It does not usually appear first as a magical “climate score.” It enters through transmission channels such as:

- weaker borrower cash flow
    
- lower collateral values
    
- higher insurance or operating costs
    
- stranded assets
    
- regulatory penalties or carbon pricing
    
- supply-chain disruption
    
- physical damage to assets and operations
    
- lower market liquidity in climate-vulnerable sectors
    

That means climate risk is not replacing [[Probability-of-Default]], [[Loss-Given-Default]], or [[Exposure-at-Default]]. It is **pushing them around**.

A coastal mortgage book may face rising physical risk because flood or sea-level exposure raises borrower stress and property vulnerability. A power, oil, cement, or steel borrower may face transition risk because policy shifts, carbon costs, or collapsing demand for high-emission activities weaken its long-run viability. Your baseline report gives exactly these kinds of examples: coastal mortgages as physical-risk exposures, and oil-company loans as transition-risk exposures with stranded-asset danger.

### Physical Risk vs Transition Risk

This is the most fundamental split in the topic.

**Physical risk** is the risk of loss from climate-related physical events or chronic environmental changes, such as:

- floods
    
- storms
    
- wildfires
    
- drought
    
- heat stress
    
- sea-level rise
    

**Transition risk** is the risk of loss from the economic and policy shift toward a lower-carbon economy, such as:

- carbon taxes
    
- emissions regulation
    
- green technology disruption
    
- changes in consumer demand
    
- legal liability and compliance costs
    
- stranded assets in carbon-intensive sectors
    

Your baseline report explicitly says banks are expected to distinguish which risks are physical and which are transition-related, and that Basel climate disclosure work pushes banks to explain those categories clearly across time horizons.

This is the second red-pill truth: **physical and transition risk do not behave on the same timeline**.

- Physical risk can hit suddenly through acute events like floods or storms.
    
- Transition risk may build more gradually through policy, technology, and market repricing.
    
- Some physical risks are chronic and slow-moving, like heat and sea-level trends.
    
- Some transition shocks can be abrupt if regulation or market sentiment changes suddenly.
    

That is why climate-risk modeling is usually much more scenario-heavy and horizon-sensitive than ordinary short-history credit modeling.

### Why Climate Risk Is So Hard for Banks

The baseline report notes that climate-risk modeling is still evolving and that best practice currently leans heavily on scenario analysis, forward-looking climate data, and alignment with frameworks such as TCFD and NGFS.

That matters because the core problem is not just complexity. It is **mismatch**.

Banks are trying to connect:

- long-horizon climate pathways
    
- shorter-horizon credit models
    
- limited historical default data for climate events
    
- sector-specific vulnerability
    
- uncertain policy paths
    
- uncertain borrower adaptation behavior
    

This is the third red-pill truth: **climate risk is usually not well identified from backward-looking default history alone**.

If a bank asks, “Show me 30 years of default data caused purely by orderly net-zero transition policy,” the data usually do not exist in a clean, model-ready way. So climate risk forces a more judgment-intensive framework combining:

- scenario design
    
- sectoral mapping
    
- asset-location analysis
    
- borrower vulnerability scoring
    
- macro overlays
    
- expert judgment
    
- stress transmission logic
    

That is why this note connects naturally to [[Macro-Stress-Testing]], [[IFRS-9-and-ECL]], and [[SR-11-7-Model-Governance]]. Climate risk is really a forward-looking scenario problem living inside governance constraints.

### Why Climate Risk Is Not “Just ESG”

A weak candidate says:

> “Climate risk is part of ESG.”

A stronger candidate says:

> “Climate risk becomes a financial-risk problem once it changes borrower cash flow, collateral value, default likelihood, recovery severity, or exposure utilization.”

That is the institutional lens banks care about.

A bank does not reserve capital because a borrower is morally imperfect. It reserves and provisions because climate developments may create measurable financial deterioration. This is why climate risk must be translated into familiar risk channels:

- [[Probability-of-Default]] for deterioration in repayment capacity
    
- [[Loss-Given-Default]] for collateral value damage and recovery stress
    
- [[Exposure-at-Default]] for liquidity drawdowns and contingent utilization
    
- [[Expected-vs-Unexpected-Loss]] for average versus tail loss consequences
    
- [[Economic-Capital-Basics]] and [[RWA-Risk-Weighted-Assets]] for capital planning consequences
    

### Why Stress Testing Is the Natural Home

Your baseline report explicitly says climate risk connects strongly to [[Macro-Stress-Testing]] and that central banks encourage climate scenario analysis within ICAAP-style processes.

This is the fourth red-pill truth: **climate risk is less mature as a static model than as a scenario framework**.

That is because scenario analysis can handle:

- different warming pathways
    
- delayed versus accelerated transition
    
- sector concentration
    
- regional hazard differences
    
- nonlinear asset repricing
    
- long-run uncertainty
    

So in practice, many banks first embed climate into stress testing, portfolio heatmaps, and risk identification before attempting highly granular production-grade climate PD or LGD models for every segment.

## The Core Math / Code

The right conceptual starting point is not a single “climate formula.” It is a transmission map.

A stylized climate-credit architecture is:

$$  
\text{Climate Scenario} \rightarrow \text{Borrower / Collateral Shock} \rightarrow {PD,LGD,EAD} \rightarrow \text{Losses / Capital / Provisioning}  
$$

That is the whole game.

### Step 1: Define Climate Risk Channels

Let the climate scenario at time $t$ be represented by a vector:

$$  
C_t = {Physical_t,\ Transition_t,\ Policy_t,\ Temperature_t,\ CarbonPrice_t,\ Hazard_t}  
$$

This is not a regulatory formula. It is the cleanest abstract way to think about climate state variables.

Then the bank maps those scenario variables into borrower- or asset-level shocks.

For example:

- flood probability affects collateral and interruption risk
    
- carbon price affects operating margins
    
- emissions regulation affects capex needs and refinancing risk
    
- heat stress affects productivity and insurance cost
    

### Step 2: Translate Climate Shock into Credit Parameters

A stylized transmission structure is:

$$  
PD_t^{climate} = f_{PD}(X_t, C_t)  
$$

$$  
LGD_t^{climate} = f_{LGD}(Z_t, C_t)  
$$

$$  
EAD_t^{climate} = f_{EAD}(W_t, C_t)  
$$

where:

- $X_t$ are borrower financial characteristics
    
- $Z_t$ are collateral and legal recovery features
    
- $W_t$ are utilization and exposure-structure features
    
- $C_t$ is the climate scenario state
    

This is exactly consistent with the baseline report’s point that climate modeling overlays climate scenarios on top of existing credit models and may increase PD and LGD for affected sectors or geographies.

### Step 3: Compute Climate-Adjusted Expected Loss

Once climate-adjusted parameters are available, the familiar loss identity still applies:

$$  
EL_t^{climate} = PD_t^{climate} \times LGD_t^{climate} \times EAD_t^{climate}  
$$

This is the fifth red-pill truth: **climate risk does not destroy the credit framework; it perturbs its inputs**.

That is why climate risk belongs inside the Credit Risk OS rather than outside it.

### Physical Risk Transmission

A stylized physical-risk adjustment might look like:

$$  
PD_t^{physical} = PD_t^{base} \times (1 + \delta_{phys})  
$$

$$  
LGD_t^{physical} = LGD_t^{base} + \lambda_{collateral}  
$$

where:

- $\delta_{phys}$ captures the uplift in borrower stress from physical climate exposure
    
- $\lambda_{collateral}$ captures deterioration in recovery severity due to damaged or devalued collateral
    

For a mortgage portfolio in flood-prone coastal zones, both effects may matter:

- the borrower may face higher disruption and cost burden
    
- the property itself may become less liquid or less valuable
    

This is why climate risk is so closely linked to [[Loss-Given-Default]] and especially to sectors like [[Specialized-Lending-CRE-Project]].

### Transition Risk Transmission

A stylized transition-risk adjustment might be:

$$  
PD_t^{transition} = PD_t^{base} \times (1 + \delta_{sector} + \delta_{policy})  
$$

$$  
LGD_t^{transition} = LGD_t^{base} + \lambda_{asset}  
$$

where:

- $\delta_{sector}$ captures borrower sensitivity to low-carbon transition pressure
    
- $\delta_{policy}$ captures regulatory or carbon-cost shock
    
- $\lambda_{asset}$ captures stranded-asset or resale-value impairment
    

This is especially relevant for carbon-intensive sectors where the borrower’s business model depends on assets that may lose economic relevance over time.

### Climate Scenario Weighting

If the bank uses multiple climate pathways, an expected-loss style aggregation can be written as:

$$  
EL^{climate}_{final} = \sum_{s=1}^{S} w_s \times EL^{(s)}  
$$

where:

- $w_s$ is the weight assigned to climate scenario $s$
    
- $EL^{(s)}$ is the portfolio loss under scenario $s$
    

This mirrors the multi-scenario logic used in [[IFRS-9-and-ECL]] and broader scenario frameworks in [[Macro-Stress-Testing]].

### Short, Medium, and Long Horizon Structure

Your baseline report notes that banks are expected to think about climate risk across short, medium, and long-term horizons.

That creates one of the biggest modeling tensions in the topic:

|Horizon|Typical climate concern|Credit modeling challenge|
|---|---|---|
|Short term|Acute weather events, emerging policy actions|Limited direct default history|
|Medium term|Sector repricing, adaptation cost, collateral repricing|Strong uncertainty in transmission|
|Long term|Chronic physical change, stranded assets, relocation|Horizon often exceeds normal loan model windows|

This is why climate risk often requires horizon bridging between annual credit models and long-horizon scenario narratives.

### Portfolio-Level Climate Risk Heatmap

Banks often organize climate risk first at portfolio level before micro-modeling every obligor.

A simple conceptual portfolio aggregation is:

$$  
Climate\ Exposure_p = \sum_{i \in p} EAD_i \times Vulnerability_i  
$$

where $Vulnerability_i$ may be driven by:

- sector emissions intensity
    
- geographic hazard exposure
    
- collateral climate sensitivity
    
- adaptation capacity
    
- dependence on transition-vulnerable revenue
    

This is not the final loss model, but it is often the first operational step in identifying concentration.

### A Practical Climate Transmission Table

|Climate Channel|Typical affected parameter|Example|
|---|---|---|
|Flood / wildfire / storm damage|[[Loss-Given-Default]], sometimes [[Probability-of-Default]]|Damaged property lowers collateral recovery and disrupts borrower cash flow|
|Carbon pricing|[[Probability-of-Default]]|Margin compression for carbon-intensive borrowers|
|Insurance cost spike|[[Probability-of-Default]] and [[Loss-Given-Default]]|Property owners face weaker affordability and reduced marketability|
|Stranded assets|[[Loss-Given-Default]] and capital planning|Fossil-linked collateral or project value deteriorates|
|Liquidity draw from adaptation spending|[[Exposure-at-Default]]|Borrowers draw committed lines under climate or policy stress|

This table shows why climate risk is not a new risk parameter. It is a new **driver system** acting through the existing parameters.

### Why Code Is Often About Scenario Plumbing, Not Fancy Prediction

For many banks today, climate execution is not yet about a perfect deep-learning climate default model. It is more often about controlled scenario mapping and overlays.

A clean portfolio-style climate overlay sketch might look like this:

```python
import pandas as pd


def apply_climate_overlay(
    df: pd.DataFrame,
    pd_col: str,
    lgd_col: str,
    ead_col: str,
    physical_multiplier_col: str,
    transition_multiplier_col: str,
    lgd_addon_col: str
) -> pd.DataFrame:
    """
    Apply simple climate overlays to baseline PD/LGD/EAD inputs.

    Parameters
    ----------
    df : pd.DataFrame
        Portfolio-level input data.
    pd_col, lgd_col, ead_col : str
        Baseline parameter columns.
    physical_multiplier_col : str
        Multiplier capturing physical-risk uplift to PD.
    transition_multiplier_col : str
        Multiplier capturing transition-risk uplift to PD.
    lgd_addon_col : str
        Additive uplift to LGD from climate stress.

    Returns
    -------
    pd.DataFrame
        DataFrame with climate-adjusted PD, LGD, and EL.
    """
    out = df.copy()

    out["pd_climate"] = (
        out[pd_col]
        * out[physical_multiplier_col]
        * out[transition_multiplier_col]
    )

    out["lgd_climate"] = (out[lgd_col] + out[lgd_addon_col]).clip(upper=1.0)
    out["el_climate"] = out["pd_climate"] * out["lgd_climate"] * out[ead_col]

    return out


portfolio = pd.DataFrame(
    {
        "segment": ["Coastal Mortgage", "Thermal Power", "Office CRE"],
        "pd_base": [0.015, 0.020, 0.012],
        "lgd_base": [0.25, 0.40, 0.30],
        "ead": [100_000_000, 150_000_000, 120_000_000],
        "physical_mult": [1.30, 1.00, 1.10],
        "transition_mult": [1.00, 1.40, 1.05],
        "lgd_addon": [0.08, 0.05, 0.06],
    }
)

climate_results = apply_climate_overlay(
    portfolio,
    pd_col="pd_base",
    lgd_col="lgd_base",
    ead_col="ead",
    physical_multiplier_col="physical_mult",
    transition_multiplier_col="transition_mult",
    lgd_addon_col="lgd_addon",
)

print(climate_results[["segment", "pd_climate", "lgd_climate", "el_climate"]])
```

This kind of code is not pretending to “solve climate risk.” It is showing the current institutional reality: climate often enters through structured overlays, scenario multipliers, and portfolio vulnerability mapping before it matures into highly granular parameter models.

### What Validators Attack First

Under [[SR-11-7-Model-Governance]], validators usually attack climate frameworks in these places:

- Are physical and transition channels clearly distinguished?
    
- Are sector and geography mappings defensible?
    
- Is the scenario design coherent and documented?
    
- Are climate overlays evidence-based or purely ad hoc?
    
- Are horizons consistent with the use case?
    
- Is there double counting between macro stress and climate stress?
    
- Are management actions and adaptation assumptions realistic?
    
- Is the bank overstating precision where long-run uncertainty is actually huge?
    

That last question is critical. Climate models can easily look more precise than they really are.

### The Real Red-Pill Summary

The shallow answer is:

“Climate risk modeling means adding physical and transition climate factors into credit analysis.”

The real answer is:

“Climate risk modeling is a forward-looking scenario architecture that translates physical hazards and low-carbon transition dynamics into credit deterioration channels affecting PD, LGD, EAD, provisions, and capital, with the real challenge lying not in one perfect historical model, but in coherent scenario design, portfolio vulnerability mapping, and governed transmission into existing risk frameworks.”

