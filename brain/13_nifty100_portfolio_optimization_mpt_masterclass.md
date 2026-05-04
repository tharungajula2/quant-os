---
title: "NIFTY 100 Portfolio Optimization — Modern Portfolio Theory, Log Returns, Sharpe Ratio, Monte Carlo Weights, and Efficient Frontier"
date: 2026-03-26
tags:
  - nifty100
  - portfolio-optimization
  - modern-portfolio-theory
  - mpt
  - sharpe-ratio
  - efficient-frontier
  - monte-carlo
  - log-returns
  - covariance
  - quant-finance
  - investment-analytics
  - data-science
  - portfolio-project
cluster: "03 — Portfolio Projects"
progress: 0
links:
  - "[[Analytics-Quant-Track-Overview]]"
  - "[[2_regression_analysis_masterclass]]"
  - "[[3_machine_learning_masterclass]]"
  - "[[4_python_data_analytics_master_cheatsheet]]"
  - "[[10_quant_modeling_workflow_master_reference]]"
---

---

# NIFTY 100 Portfolio Optimization — Modern Portfolio Theory, Log Returns, Sharpe Ratio, Monte Carlo Weights, and Efficient Frontier

> This note is my full technical record of how I use a **NIFTY 100 portfolio optimization project** to understand the core logic of portfolio construction from first principles.
>
> I use this project to learn how a portfolio problem is different from an ordinary prediction problem. Here I am not trying to predict a class label. I am trying to combine many assets into one portfolio and think carefully about return, variance, covariance, diversification, weight constraints, and risk-adjusted performance.
>
> Even though this notebook is a simplified educational project rather than a full institutional portfolio-construction engine, it is still very useful for me because the same mindset appears again in treasury analytics, market-risk thinking, asset allocation, performance attribution, stress testing, and broader quant-finance work.

---

## The Project at a Glance

**Universe used in the notebook:** NIFTY 100 constituents converted into Yahoo Finance tickers with the `.NS` suffix.

**Initial ticker source:** `ind_nifty100list.csv`

**Raw idea:** Build a diversified stock portfolio from the NIFTY 100 universe and compare a simple equal-weight allocation with a Sharpe-ratio-seeking optimized allocation.

**Market data used:** Adjusted close prices downloaded from Yahoo Finance.

**Lookback window:** approximately the prior `3 years` from the notebook run date.

**Final usable price matrix shown in the notebook:** `82` stocks

**Clean return matrix after dropping missing values:** `609 × 82`

**Baseline portfolio:** equal weights across all `82` usable stocks

**Optimization method:** random portfolio generation with `10,000` weight combinations

**Selection criterion:** maximum Sharpe-ratio-style score computed as:

```text
portfolio return / portfolio volatility
```

**Equal-weight notebook result:**

- **portfolio return:** `9.6%`
- **portfolio variance:** `4.77%`

**Best simulated portfolio result:**

- **maximum Sharpe-ratio-style score:** `0.7707`
- **optimal portfolio return:** `15.27%`
- **optimal portfolio volatility:** `19.81%`

### Why this project matters to me

This is a strong beginner quant-finance project because it teaches one connected story:

- how to build a stock universe
- how to fetch market data and handle missingness
- how prices become returns
- how covariance drives portfolio risk
- how diversification works mathematically
- why equal weighting is a useful benchmark
- how random portfolio simulation approximates the efficient frontier
- how risk-adjusted selection differs from chasing return alone

That makes this project a very good bridge between basic Python finance work and more serious quant reasoning.

---

## The Full Pipeline I Built

```text
NIFTY 100 constituent list
        │
        ▼
Convert symbols into Yahoo Finance tickers
        │
        ▼
Download adjusted close prices for roughly 3 years
        │
        ▼
Keep the stocks with available data
        │
        ▼
Build a multi-stock price matrix
        │
        ▼
Drop rows with missing values to get a clean aligned panel
        │
        ▼
Compute daily log returns
        │
        ▼
Annualize mean returns and covariance
        │
        ▼
Evaluate equal-weight portfolio
        │
        ▼
Simulate 10,000 random long-only portfolios
        │
        ▼
Compute return, volatility, and Sharpe-ratio-style score for each
        │
        ▼
Pick the portfolio with the highest score
        │
        ▼
Visualize the efficient-frontier-style cloud
```

---

## Part 1: What the Portfolio Problem Actually Is

### The concept

A portfolio problem is not about asking:

- which one stock is the best?
- which stock had the highest return?

It is about asking:

- how should I allocate capital across many assets?
- how much return do I get for the risk I take?
- can diversification improve the tradeoff?

That is the core idea behind **Modern Portfolio Theory**.

### The real beginner intuition

A stock can look attractive alone, but once I put it into a portfolio, what matters is not only its own return or its own volatility.

What also matters is:

- how it moves relative to the other stocks
- whether it reduces or increases total portfolio risk
- what weight I assign to it

So portfolio construction is really a **correlation and covariance problem**, not just a ranking problem.

---

## Part 2: Building the NIFTY 100 Universe Properly

The notebook starts from a CSV file containing NIFTY 100 constituents.

Then it creates Yahoo Finance symbols by appending `.NS` to each stock code.

### Why this step matters

Data rarely arrives in the exact format I need for analysis.

So even before any math starts, I already need a small but important piece of data engineering:

- take exchange-level ticker symbols
- convert them into provider-specific download symbols
- save the transformed list for reuse

### Clean interpretation

This is the first lesson of the project:

> Quant work is never only about formulas. It also starts with getting the universe definition and data mapping right.

---

## Part 3: Data Collection and the First Reality Check

The notebook then pulls **adjusted close prices** from Yahoo Finance over roughly a three-year window.

That matters because adjusted close prices account for events like corporate actions more sensibly than raw close prices when I am computing returns.

### Why exception handling appears here

The notebook loops across the ticker list and uses exception handling while downloading each stock.

That tells me something important:

> real market-data collection is messy.

Some symbols may fail because of:

- provider availability problems
- stale tickers
- symbol mismatches
- missing history

So the notebook keeps only the stocks for which data is successfully retrieved.

### What survives into the modeling matrix

Later in the notebook, the price matrix shown has `82` columns.

So even though the project starts from the NIFTY 100 universe, the actual aligned portfolio analysis is built on the subset that survives data retrieval and missing-value treatment.

That is a realistic lesson by itself.

---

## Part 4: Missing Values and Why Alignment Matters in Portfolio Work

The project explicitly shows a missing-values treatment step.

This matters a lot in multi-asset portfolio work because the return matrix must be aligned properly across stocks and dates.

### Why missing data is a bigger problem here

If one stock is missing data on dates when another stock is present, then:

- the return vectors are not aligned cleanly
- covariance estimates become unstable or inconsistent
- portfolio-risk calculation can become misleading

So the notebook drops missing rows to create a clean shared time index.

### The tradeoff

This treatment is simple and useful for learning, but it has a cost.

When I drop missing rows, I reduce the sample size and possibly remove useful information.

That means this notebook chooses **clean alignment and simplicity** over more advanced missing-data handling.

For a learning notebook, that is a reasonable choice.

---

## Part 5: Price Levels Are Not the Main Modeling Object

A very important finance lesson is that portfolio models are usually built on **returns**, not on raw price levels.

### Why

A price of `₹100` versus `₹2,000` does not by itself tell me which stock performed better.

Returns solve that comparability problem because they measure **relative change**.

That is why the notebook moves from adjusted close prices to log returns.

### Clean intuition

Portfolio construction cares about:

- expected return
- volatility
- covariance

All three are naturally defined from returns rather than price levels.

---

## Part 6: Log Returns and Why They Are Used

The notebook calculates:

```python
l_ret = np.log(nif2 / nif2.shift())
```

This creates **log returns**.

### What a log return means

For one period, log return is:

```text
log return = ln(P_t / P_(t-1))
```

where:

- `P_t` = current adjusted close price
- `P_(t-1)` = previous adjusted close price

### Why log returns are common

They are widely used because:

- they behave well mathematically in many models
- multi-period log returns add naturally through time
- they are standard in quantitative finance workflows

### What the notebook does next

After computing log returns, the notebook drops missing rows again and gets a clean return matrix of:

```text
609 rows × 82 columns
```

That means:

- `609` daily observations
- across `82` stocks

This is the main matrix used for return and risk estimation.

---

## Part 7: Mean Returns, Annualization, and What Expected Return Means Here

Once the daily log returns are available, the notebook takes the mean of each stock’s daily return series and then annualizes it by multiplying by `252`.

### Why `252`

In finance, `252` is a common approximation for the number of trading days in a year.

So the notebook uses:

```text
annualized return ≈ average daily return × 252
```

### Important interpretation

This annualized return is not a guaranteed future return.

It is a historical estimate based on the sample window.

So I should read it as:

> if the recent historical average continued in a similar way, this is the approximate annualized return implied by the sample.

That is very different from certainty.

---

## Part 8: Covariance Is the Heart of Portfolio Risk

The notebook computes portfolio variance using the covariance matrix of returns.

This is one of the most important ideas in the entire project.

### Why covariance matters

If I hold many stocks, portfolio risk is not just the weighted sum of individual risks.

It also depends on how the stocks move together.

That is what covariance captures.

### The key formula

For a weight vector `w` and covariance matrix `Σ`:

```text
Portfolio variance = wᵀ Σ w
```

That is exactly the logic used in the notebook.

### Why diversification appears naturally here

If some stocks do not move perfectly together, then combining them can reduce total portfolio variance.

That is the mathematical basis of diversification.

So the project is really teaching me this deep idea:

> portfolio risk depends on relationships between assets, not only on each asset in isolation.

---

## Part 9: The Equal-Weight Portfolio as the Baseline

Before optimization, the notebook creates a simple equal-weight portfolio.

With `82` stocks, each stock receives:

```text
1 / 82 ≈ 0.012195
```

or about `1.22%` weight.

### Why this baseline is useful

This is the portfolio equivalent of a model baseline in machine learning.

It gives me a benchmark that is:

- simple
- transparent
- diversified
- easy to explain

### The notebook baseline result

The notebook reports:

- **portfolio return:** `9.6%`
- **portfolio variance:** `4.77%`

That means the optimized portfolio should not just be “different.”
It should improve the return-risk tradeoff relative to this simple benchmark.

### One small technical nuance

The notebook prints **variance** here, not volatility.

That matters because:

- **variance** is squared risk
- **volatility** is the square root of variance

Later, for the simulated portfolios, the notebook works with volatility directly.

---

## Part 10: The Optimization Idea — Not Maximum Return Alone, but Best Risk-Adjusted Tradeoff

If I only maximize return, I may get a portfolio concentrated in a few very volatile names.

If I only minimize risk, I may end up with a portfolio that is too defensive and sacrifices too much return.

So the project uses a compromise measure:

```text
Sharpe-ratio-style score = portfolio return / portfolio volatility
```

### Why I call it Sharpe-ratio-style

In the notebook, the score is computed as:

```python
sr_array[i] = ret_array[i] / vol_array[i]
```

So there is **no explicit risk-free rate subtraction**.

That means this is a simplified version of the Sharpe ratio, effectively assuming a zero risk-free rate or simply using return-per-unit-volatility as a practical proxy.

For a learning notebook, that is completely fine, but I should know the distinction.

---

## Part 11: Monte Carlo Portfolio Simulation Instead of Closed-Form Optimization

The notebook does not use a constrained optimizer from a numerical optimization library.

Instead, it generates `10,000` random portfolios.

### What each simulation does

For each portfolio:

1. generate `82` random positive weights
2. normalize them so the weights sum to `1`
3. compute annualized portfolio return
4. compute annualized portfolio volatility
5. compute the Sharpe-ratio-style score

### What this means economically

Because the weights are generated from positive random numbers and normalized, the simulated portfolios are effectively:

- **long-only**
- **fully invested**
- **no leverage**
- **weights sum to 1**

That is a very reasonable educational setup.

### Why this method is useful for learning

Monte Carlo simulation is visually intuitive.

It helps me see that there is not just one possible portfolio. There is a large cloud of possible risk-return combinations.

That cloud is what later becomes the efficient-frontier-style picture.

---

## Part 12: Efficient Frontier Intuition

The notebook plots many simulated portfolios with:

- volatility on the x-axis
- return on the y-axis
- color representing the Sharpe-ratio-style score

and then highlights the best portfolio.

### What I should understand from this plot

Every dot is one possible portfolio.

Some portfolios are clearly inefficient because:

- they have lower return for similar risk
- or higher risk for similar return

The more attractive region is the upper-left boundary of the cloud, where I try to get:

- higher return
- for a given level of risk

That is the intuition behind the **efficient frontier**.

### Important honesty point

The notebook shows an **efficient-frontier-style scatter cloud**, not a formal analytical derivation of every efficient portfolio under multiple constraints.

That is fine.
The plot still teaches the main idea very well.

---

## Part 13: Reading the Final Optimized Portfolio Result Correctly

The notebook finds the best simulated portfolio at index `3102`.

Its headline results are:

- **maximum Sharpe-ratio-style score:** `0.7706859746`
- **portfolio return:** `15.27%`
- **portfolio volatility:** `19.81%`

### What this means

Among the `10,000` simulated long-only portfolios, this one has the strongest return relative to volatility under the notebook’s scoring rule.

So the final result is not:

- the maximum-return portfolio
- the minimum-volatility portfolio

It is the portfolio with the best **risk-adjusted tradeoff** according to the chosen metric.

### Clean comparison with the equal-weight baseline

The notebook baseline had:

- return: `9.6%`
- variance: `4.77%`

The optimized portfolio improves expected return substantially, but it is still taking market risk with volatility around `19.81%`.

That is an important practical lesson:

> optimization does not remove risk; it chooses the most attractive tradeoff under the assumptions I impose.

---

## Part 14: What the Weight Vector Is Really Saying

The notebook prints the full optimal weight vector.

The individual weights vary from very small allocations to weights around the low-`2%` range.

### What I learn from that

The optimized portfolio is still fairly diversified.

It is not simply putting `80%` in one stock and ignoring the rest.

That is partly because:

- the simulation is long-only
- the portfolio is selected on a risk-adjusted criterion
- diversification helps the covariance structure

### The deeper lesson

A portfolio weight is not just a popularity vote on one stock.

A weight is the output of a system balancing:

- expected return contribution
- volatility contribution
- covariance contribution
- diversification benefit

That is the real MPT mindset I want to retain.

---

## Part 15: What This Project Teaches Me About Modern Portfolio Theory

This notebook is a compact introduction to the main MPT logic.

### Core MPT idea

Harry Markowitz’s central idea is that I should not evaluate assets one by one in isolation.

I should evaluate them as part of a portfolio.

### The three objects that matter most

1. **expected returns**
2. **variances / volatilities**
3. **covariances across assets**

Once I have those, I can think about efficient portfolios.

### What the project shows in practice

- expected return comes from historical average returns
- risk comes from the covariance matrix
- weights determine the final portfolio point
- many random weight combinations generate many possible portfolios
- the best portfolio depends on the objective I choose

That is exactly the type of conceptual clarity I want from a beginner quant project.

---

## Part 16: What a Real Institutional Portfolio Process Would Add

This project is great for learning, but a real buy-side, treasury, or institutional workflow would be much richer.

### Things a production setup would usually add

#### 1. Risk-free rate and a true Sharpe-ratio specification
The notebook uses `return / volatility` directly.
A formal Sharpe ratio would usually be:

```text
(expected portfolio return - risk-free rate) / portfolio volatility
```

#### 2. Explicit optimization constraints
Real processes often add constraints like:

- sector caps
- single-name caps
- turnover limits
- liquidity filters
- ESG or policy restrictions
- benchmark tracking-error constraints
- minimum and maximum weights

#### 3. Better estimators
A production setup may improve on raw historical mean and covariance by using:

- shrinkage covariance estimators
- Bayesian views
- Black-Litterman logic
- robust optimization
- regime-aware estimation

#### 4. Transaction costs and slippage
A portfolio that looks optimal before costs may not be attractive after:

- brokerage
- taxes
- bid-ask spread
- market impact

#### 5. Rebalancing logic
A real process must decide:

- how often to rebalance
- when to override the model
- how to handle drift and new data

#### 6. Stress testing
The portfolio should also be examined under market shocks, not only historical covariance assumptions.

So this notebook is best understood as a **clean educational MPT prototype**, not a full production portfolio engine.

---

## Part 17: How This Connects to Banking and Risk Analytics

Even though this project sits more naturally in portfolio analytics than in retail credit-risk modeling, it still connects strongly to my broader quant system.

### Connection to treasury and market-risk thinking

The main concepts here are directly relevant to:

- investment portfolio construction
- treasury book analytics
- concentration risk thinking
- diversification assessment
- scenario analysis
- stress testing

### Connection to model validation discipline

This project also reinforces a validation mindset:

- define the objective clearly
- understand the assumptions behind the metric
- compare against a simple baseline
- know what the optimization is actually doing
- separate educational simplifications from production design

### Connection to banking interviews

This project helps me answer questions like:

- what is diversification mathematically?
- why does covariance matter?
- what is the efficient frontier?
- what is the Sharpe ratio trying to measure?
- why is equal weight a useful benchmark?
- what is the difference between variance and volatility?

That is very useful even outside pure asset-management roles.

---

## Part 18: Limitations and Honest Caveats

This notebook is strong for learning, but I should be honest about its limitations.

### 1. The data window is short

The analysis uses roughly three years of history.

That may not be enough to represent multiple market regimes.

### 2. Historical mean returns are noisy

Sample-average returns can be unstable, especially over short horizons.

So portfolio weights based on them should not be treated as timeless truth.

### 3. The optimization is simulation-based, not exact constrained optimization

Monte Carlo simulation is intuitive, but it does not guarantee the mathematically exact optimum under all formulations.

### 4. The notebook uses a simplified Sharpe-ratio-style metric

Because there is no explicit risk-free rate subtraction, I should describe the score carefully.

### 5. There are no transaction costs or turnover controls

That means the practical implementability of the final portfolio is not tested.

### 6. The notebook does not include benchmark-relative analysis

A real portfolio process would often compare against:

- NIFTY benchmark performance
- tracking error
- sector exposures
- style tilts

### 7. The model is purely historical and backward-looking

It does not use forward-looking views, macro scenarios, or analyst information.

That is fine for learning, but not enough for a full investment process.

---

## Part 19: The Key Lessons I Want to Retain

### Technical lessons

- portfolio construction works on returns, not raw prices
- log returns are a standard and useful transformation
- annualization converts daily estimates into yearly scale for comparison
- covariance is central to portfolio risk
- equal weighting is a useful baseline, not a trivial throwaway
- portfolio variance is computed using `wᵀ Σ w`
- risk-adjusted selection is different from chasing highest return
- Monte Carlo simulation can approximate the efficient-frontier idea visually
- the notebook uses a simplified Sharpe-ratio-style score without explicit risk-free-rate adjustment

### Practical lessons

- market-data engineering matters before optimization even begins
- multi-asset alignment and missing-value handling are essential
- optimization outputs depend strongly on assumptions and constraints
- a portfolio that is “optimal” under one metric may not be optimal under another
- quantitative finance work should always separate learning models from deployable investment processes

---

## Quick Revision Sheet

### Problem type
- Multi-asset portfolio optimization

### Universe
- NIFTY 100 constituents mapped to Yahoo Finance `.NS` tickers

### Market data
- Adjusted close prices from Yahoo Finance

### Lookback style
- Roughly 3 years of historical prices

### Final working panel
- `82` stocks
- `609` clean daily return observations

### Return transform
- daily log returns

### Annualization rule
- mean daily return × `252`
- covariance × `252`

### Baseline portfolio
- equal weights across `82` assets

### Baseline result
- return: `9.6%`
- variance: `4.77%`

### Optimization method
- `10,000` random portfolios
- positive weights normalized to sum to `1`

### Objective used
- maximize `return / volatility`

### Best portfolio result
- Sharpe-ratio-style score: `0.7707`
- return: `15.27%`
- volatility: `19.81%`

### Clean final takeaway
- the simulated optimized portfolio improves the notebook’s risk-adjusted tradeoff relative to the simple equal-weight baseline and gives me a strong beginner introduction to MPT thinking

---

## Connections to the Rest of My Notes

- [[Analytics-Quant-Track-Overview]] — this project expands my portfolio beyond classification and forecasting into quant-finance portfolio construction
- [[2_regression_analysis_masterclass]] — useful for the statistical mindset behind estimation, variance, covariance, and careful interpretation of summary measures
- [[3_machine_learning_masterclass]] — useful for model-selection thinking, optimization mindset, and the broader contrast between prediction problems and allocation problems
- [[4_python_data_analytics_master_cheatsheet]] — useful for the pandas, plotting, NumPy, and data-handling workflow that supports this notebook
- [[10_quant_modeling_workflow_master_reference]] — useful as the higher-level modeling workflow note that helps me separate problem definition, estimation logic, validation thinking, and practical limitations

---

## Closing Note

This project is one of my cleanest introductions to portfolio optimization.

It teaches me how to move from a stock universe to a defendable allocation workflow:

- define the universe
- download and align market data
- convert prices into returns
- estimate annualized return and covariance
- build a simple equal-weight benchmark
- simulate many possible portfolios
- compare them on a risk-adjusted basis
- visualize the efficient-frontier-style cloud
- choose the best portfolio under the notebook’s assumptions

That is exactly the kind of connected quant thinking I want to carry into future market-risk, investment, treasury, and portfolio-analytics work.
