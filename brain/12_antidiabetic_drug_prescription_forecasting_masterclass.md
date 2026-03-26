---
title: "Antidiabetic Drug Prescription Forecasting — Time-Series Modeling with STL Decomposition, Stationarity Testing, SARIMA, Rolling Forecasts, and MAPE"
date: 2026-03-26
tags:
  - antidiabetic-drug-forecasting
  - time-series
  - forecasting
  - sarima
  - stl-decomposition
  - adf-test
  - stationarity
  - rolling-forecast
  - mape
  - healthcare-analytics
  - data-science
  - portfolio-project
cluster: "03 — Portfolio Projects"
progress: 0
links:
  - "[[Tharun-Kumar-Gajula]]"
  - "[[2_regression_analysis_masterclass]]"
  - "[[3_machine_learning_masterclass]]"
  - "[[4_python_data_analytics_master_cheatsheet]]"
  - "[[10_quant_modeling_workflow_master_reference]]"
---

---

# Antidiabetic Drug Prescription Forecasting — Time-Series Modeling with STL Decomposition, Stationarity Testing, SARIMA, Rolling Forecasts, and MAPE

> This note is my full technical record of how I use an **antidiabetic drug prescription forecasting project** to understand core time-series ideas from first principles.
>
> I use this project to learn how a forecasting workflow is different from ordinary tabular machine learning: I am not predicting independent rows, I am predicting the future of a sequence. That means I have to think carefully about trend, seasonality, stationarity, train-test splits over time, rolling forecasts, baseline comparison, and residual diagnostics.
>
> Even though this project sits in healthcare demand forecasting rather than credit risk, it is still very useful for me because the same forecasting discipline appears in portfolio monitoring, collections volume planning, loss forecasting, provisioning workflows, liquidity planning, and broader business analytics.

---

## The Project at a Glance

**Dataset:** Monthly antidiabetic drug prescription series from Australia

**Data source stated in the notebook:** Australian Health Insurance Commission

**Raw data structure:** `204 rows × 2 columns`

**Columns:**

- `ds` = monthly date
- `y` = number of antidiabetic drug prescriptions

**Observed time span:** `1991-07` to `2008-06`

**Training window:** first `168` observations

**Test window:** last `36` observations

**Forecasting style:** rolling forecasts in `12-month` blocks

**Main objective:** Forecast the monthly number of antidiabetic drug prescriptions and compare a seasonal SARIMA model against a simple seasonal baseline.

**Final selected model:** `SARIMA(2,1,3)(1,1,3)12`

**Evaluation metric used in the notebook:** `MAPE`

**Final notebook comparison:**

- **naive seasonal MAPE:** `12.6866%`
- **SARIMA MAPE:** `7.8988%`

### Why this project matters to me

This is a very strong forecasting project because it teaches me the full workflow for a classical univariate time-series problem:

- understand the business question
- inspect the sequence visually
- identify trend and seasonality
- test stationarity formally
- difference the series appropriately
- choose a model family that matches the structure
- tune the order using a model-selection criterion
- validate residuals rather than trusting the fit blindly
- compare against a sensible baseline
- evaluate on a true holdout period rather than a random split

That logic is important far beyond healthcare demand forecasting.

---

## The Full Pipeline I Built

```text
Monthly prescription time series
        │
        ▼
Understand the business objective and data structure
        │
        ▼
Visualize the time series
        │
        ▼
Use STL decomposition to inspect trend and seasonality
        │
        ▼
Choose SARIMA as the model family
        │
        ▼
Run ADF tests and apply differencing for stationarity
        │
        ▼
Split chronologically into train and test
        │
        ▼
Search across 625 SARIMA order combinations using AIC
        │
        ▼
Fit the selected SARIMA(2,1,3)(1,1,3)12 model
        │
        ▼
Check residual diagnostics + Ljung-Box test
        │
        ▼
Generate rolling 12-month forecasts
        │
        ▼
Compare against naive seasonal baseline using MAPE
        │
        ▼
Select the forecasting model
```

---

## Part 1: What the Business Problem Actually Is

### The practical objective

The notebook frames the problem as forecasting the number of **antidiabetic drug prescriptions in Australia**.

In a real setting, that kind of forecast can matter for:

- production planning
- inventory management
- supply-chain coordination
- demand anticipation
- avoiding stock-outs
- avoiding overproduction

So the forecasting problem is not just statistical.
It is an operational planning problem.

### The data-science framing

This is a **univariate time-series forecasting** problem.

That means I am using the historical values of one variable to predict its future values.

Instead of ordinary supervised-learning rows like:

```text
x -> y
```

I now have an ordered sequence:

```text
y_1, y_2, y_3, ..., y_t
```

and I want to estimate future values such as:

```text
y_{t+1}, y_{t+2}, ..., y_{t+h}
```

That changes the entire workflow.
I cannot randomly shuffle observations because time order is the signal.

---

## Part 2: Understanding the Dataset Properly

### The structure of the raw data

The notebook loads a very compact dataset with only two columns:

- `ds` for the month
- `y` for the prescription count level

The first row shown in the notebook begins at:

```text
1991-07-01
```

and the final row shown ends at:

```text
2008-06-01
```

So the dataset covers `204` monthly observations.

### Why a small dataset is still enough here

In many tabular ML problems, 204 rows would feel tiny.
But in time series, what matters is not only row count.
It is also:

- the sequence length
- whether the series is regular
- whether the seasonal pattern is visible
- whether the target has enough repeated structure over time

Here the series is monthly and spans many years, so there is enough repeated yearly behavior to justify seasonal modeling.

### A useful difference from ordinary tabular projects

This project does **not** use many explanatory variables.
There are no borrower features, customer demographics, or engineered tabular predictors.

The central signal is inside the history of the series itself:

- level
- trend
- seasonality
- serial dependence

That is why classical time-series tools make sense here.

---

## Part 3: Visual Inspection — Trend and Seasonality Come First

The notebook first plots the monthly series and immediately finds two important patterns:

- a clear upward trend over time
- clear yearly seasonality

The notebook notes that each year appears to begin at a lower level and end at a higher level.

### Why this matters

This first plot is not just cosmetic.
It already shapes the modeling decision.

If I see:

- no structure at all, I might need a very simple baseline
- trend only, I may need differencing or trend modeling
- seasonality, I need a model that can represent repeating patterns
- both trend and seasonality, I need a model that handles both

That is exactly what happens here.

### The forecasting lesson

Before touching formulas, I should always ask:

- Is the series rising or falling over time?
- Is there a repeating seasonal cycle?
- Is the seasonal cycle roughly stable?
- Are there visible shocks or structural breaks?

Those answers tell me which models are even worth trying.

---

## Part 4: STL Decomposition and Model-Family Choice

The notebook then uses **STL decomposition** with seasonal period `12`.

STL splits the observed series into:

- observed component
- trend component
- seasonal component
- residual component

### What STL is doing for me

STL is helpful because it separates the big picture into interpretable pieces.

Instead of staring at one raw line, I can ask:

- how much of the movement is long-run trend?
- how much is seasonal repetition?
- what remains after removing those patterns?

### Why SARIMA was chosen

The notebook concludes that:

- there is both trend and seasonality
- there are no exogenous variables available
- the task is to forecast one series only

So:

- **SARIMAX** is not used because there are no external regressors
- **VAR** is not relevant because this is not a multivariate system
- **SARIMA** is the natural classical choice

That is a clean modeling decision.

### The practical reasoning

A SARIMA model is a good candidate when:

- the target is one time series
- the data are ordered in time
- seasonality is present
- autocorrelation matters
- I want an interpretable classical statistical model rather than a black-box forecasting system

---

## Part 5: Stationarity and Why Differencing Is Needed

One of the most important ideas in classical ARIMA-style modeling is **stationarity**.

### What stationarity means here

Plain-language version:

A stationary series has a more stable statistical structure over time.
Its mean and dependence pattern are not drifting in a way that breaks the model assumptions.

A trending seasonal raw series usually is **not** stationary.

### The ADF test on the raw series

The notebook runs the **Augmented Dickey-Fuller test** on the original series and reports:

- **ADF statistic:** `3.1452`
- **p-value:** `1.0`

Interpretation in the notebook:

- fail to reject the null
- treat the raw series as non-stationary

So the notebook applies differencing.

### First regular difference

After differencing once, the notebook reports:

- **ADF statistic:** `-2.4952`
- **p-value:** `0.1167`

That is still above `0.05`, so the series is still treated as non-stationary.

### Add seasonal difference

Then the notebook applies a seasonal difference at lag `12` and reports:

- **ADF statistic:** `-19.8484`
- **p-value:** `0.0`

Now the null is rejected and the transformed series is treated as stationary.

### Final differencing conclusion

From that sequence, the notebook concludes:

- `d = 1`
- `D = 1`
- `m = 12`

So the final model family becomes:

```text
SARIMA(p,1,q)(P,1,Q)12
```

### Why this is such an important lesson

This is one of the clearest examples of why time-series preprocessing is not the same as tabular preprocessing.

In a tabular model, I usually think about:

- missing values
- scaling
- encoding
- outliers

In a classical forecasting model, one of the first questions is instead:

> Is the series stationary enough for the model family I want to use?

---

## Part 6: Train-Test Split and Why Time Order Must Be Preserved

The notebook uses a chronological split:

- **train:** first `168` observations
- **test:** last `36` observations

The test period corresponds to the final three years of the series.

### Why this matters

In ordinary tabular supervised learning, random splitting is often acceptable.

In forecasting, random splitting would be wrong because it would leak future information into the training process.

I must train on the past and test on the future.

### Why the notebook keeps 36 months for testing

The notebook explicitly says it wants to forecast `12` months ahead, but it reserves the last `36` months so it can evaluate **rolling forecasts**.

That is stronger than a single one-shot forecast because it allows repeated out-of-sample checks over multiple forecast windows.

### The key forecasting principle

For time series, good evaluation design usually means:

- preserve chronology
- avoid leakage
- test on future periods
- prefer walk-forward or rolling evaluation when possible

That principle matters just as much in business forecasting as it does in risk monitoring.

---

## Part 7: Model Selection Across 625 Candidate SARIMA Structures

The notebook defines a function called `optimize_SARIMAX` and uses it to search over combinations of:

- `p ∈ {0,1,2,3,4}`
- `q ∈ {0,1,2,3,4}`
- `P ∈ {0,1,2,3,4}`
- `Q ∈ {0,1,2,3,4}`

With 5 choices for each of the 4 order terms, the notebook evaluates:

```text
5 × 5 × 5 × 5 = 625
```

candidate combinations.

### Selection criterion

The notebook uses **AIC** for model selection.

### Why AIC is used

AIC is a fit-versus-complexity tradeoff measure.

Plain-language version:

- lower AIC is better
- it rewards better fit
- it penalizes unnecessary complexity

So it is a useful first filter when comparing many classical statistical models.

### Chosen order

The notebook concludes that the best specification is:

```text
SARIMA(2,1,3)(1,1,3)12
```

That becomes the final forecasting model.

### One important note to myself

Model selection does not end at the lowest AIC.
Even after choosing the order, I still need to check whether the residuals behave properly.

That is exactly what the notebook does next.

---

## Part 8: Fitting the Final Model and Reading the Result Correctly

The notebook fits:

```python
SARIMAX(train, order=(2,1,3), seasonal_order=(1,1,3,12), simple_differencing=False)
```

and prints the fitted model summary.

The summary shown in the notebook reports:

- **No. observations:** `168`
- **Model:** `SARIMAX(2, 1, 3)x(1, 1, 3, 12)`
- **Log Likelihood:** `-128.117`
- **AIC:** `276.234`
- **BIC:** `306.668`
- **HQIC:** `288.596`

### What I should learn from this

The fitted summary gives me more than just coefficients.
It also gives model-level diagnostics such as:

- fit quality
- complexity penalties
- parameter significance information

But the most important next question is still:

> Do the residuals look like white noise?

Because a forecasting model is not considered adequate just because it estimated successfully.

---

## Part 9: Residual Diagnostics — Why White Noise Matters

After fitting the SARIMA model, the notebook uses built-in diagnostics and then interprets the residual plots.

### What the notebook concludes visually

It says:

- residuals show no trend over time
- residual variance appears roughly constant
- residual distribution is close to normal
- the Q-Q plot is fairly straight
- the correlogram shows no important coefficients after lag 0

So the residuals look close to **white noise**.

### Why white noise is the goal

If the residuals still contain pattern, then the model has left predictable structure unexplained.

A good classical time-series model should leave behind residuals that are approximately:

- patternless
- uncorrelated
- centered around zero

That means the model has captured the main signal.

### Ljung-Box test

The notebook then performs the **Ljung-Box test** on the residuals.

The notebook’s interpretation is:

- all reported p-values are above `0.05`
- therefore the null of no autocorrelation is not rejected
- therefore the residuals are treated as independent / uncorrelated

That strengthens the case that the model is usable for forecasting.

### Important takeaway

This is one of the best habits in the notebook:

It does **not** stop at “model fitted successfully.”
It asks whether the fitted model is statistically credible.

---

## Part 10: Rolling Forecasts Instead of a Single Static Forecast

The notebook defines a `rolling_forecast` function with two methods:

- `last_season`
- `SARIMA`

### Baseline method: last season

For the baseline, the forecast for a month is simply taken from the corresponding month in the previous year.

That is a **seasonal naive forecast**.

This is actually a strong and sensible baseline when yearly seasonality exists.

### SARIMA rolling forecast

For the SARIMA method, the notebook repeatedly:

1. refits the model using all data available up to that point
2. forecasts the next `12` months
3. moves forward by one block

So the holdout period is evaluated in rolling `12-month` segments rather than one frozen prediction run.

### Why this is a strong choice

This makes the evaluation more realistic because forecasting in practice often happens as time moves forward and new history becomes available.

That is closer to real deployment behavior than a single one-time prediction.

---

## Part 11: Why the Seasonal Naive Baseline Matters So Much

A forecasting project is not convincing if it only says:

> Here is my SARIMA model.

I also need to ask:

> Is it actually better than a simple benchmark?

### Why the notebook’s baseline is appropriate

Because the series has strong seasonality, the baseline of using last year’s same month is very reasonable.

If the advanced model cannot beat that, then the advanced model is not adding much value.

### The practical lesson

A sophisticated model should not only look mathematical.
It should beat something simple and sensible.

That is the same discipline I should apply in other projects too:

- logistic regression before XGBoost
- simple benchmark before deep learning
- business rule baseline before model complexity

---

## Part 12: Evaluation with MAPE

The notebook evaluates forecast accuracy using **MAPE**, which stands for **Mean Absolute Percentage Error**.

The implemented formula is:

```python
def mape(y_true, y_pred):
    return np.mean(np.abs((y_true - y_pred) / y_true)) * 100
```

### What MAPE means

MAPE expresses error as an average percentage.

So if MAPE is `8%`, that means the forecast is off by about `8%` on average in relative terms.

### Notebook results

The notebook reports:

- **naive seasonal MAPE:** `12.686561923100614`
- **SARIMA MAPE:** `7.898811951220185`

Rounded more cleanly:

- **naive seasonal:** `12.69%`
- **SARIMA:** `7.90%`

### Interpretation

The SARIMA model clearly outperforms the seasonal naive baseline on the chosen error metric.

That is the central practical result of the project.

### Why this matters

This means the final model is not just statistically acceptable in-sample.
It also performs better out-of-sample than a sensible simple benchmark.

That combination is what makes the model defensible.

---

## Part 13: What the Final Model Is Really Saying

The final selected model is:

```text
SARIMA(2,1,3)(1,1,3)12
```

### How to read that compact notation

#### Non-seasonal part

- `p = 2` means two autoregressive lags
- `d = 1` means first differencing once
- `q = 3` means three moving-average terms

#### Seasonal part

- `P = 1` means one seasonal autoregressive term
- `D = 1` means one seasonal difference
- `Q = 3` means three seasonal moving-average terms
- `12` means monthly seasonality with yearly repetition

### Clean intuition

This model is trying to capture:

- short-run dependence
- short-run shock structure
- yearly seasonal repetition
- trend removal through differencing

So it is not just fitting one curve.
It is modeling structured dependence across time.

---

## Part 14: What This Project Teaches Me About Forecasting More Broadly

This notebook gives me several important forecasting lessons.

### 1. Visual inspection comes before model choice

Trend and seasonality already told me what class of model should be considered.

### 2. Stationarity is not optional in classical ARIMA-style modeling

The notebook shows clearly that:

- raw series was non-stationary
- one ordinary difference was not enough
- adding a seasonal difference solved the stationarity problem

### 3. Residual analysis is part of validation, not decoration

The model is only convincing after residuals look like white noise.

### 4. Baselines matter

Seasonal naive is simple, but not trivial.
Beating it is meaningful.

### 5. Time-aware testing matters

The notebook uses a chronological split and rolling forecasts rather than random splitting.
That is exactly the right instinct.

---

## Part 15: What I Would Improve in a Real Production Version

This notebook is a strong learning project, but a real production setup would usually go further.

### 1. Add prediction intervals to the final decision workflow

Point forecasts are useful, but operations teams also need uncertainty bands.

### 2. Compare more forecast metrics

The notebook focuses on MAPE.
In practice I would also check things like:

- MAE
- RMSE
- maybe sMAPE or MASE depending on the context

### 3. Consider exogenous drivers if available

The notebook is univariate, so SARIMA is appropriate.
But in real pharmaceutical demand forecasting I might also want:

- population changes
- pricing changes
- policy changes
- epidemiological trends
- promotional or supply information
- calendar effects

Then a richer model family could become relevant.

### 4. Use a more formal walk-forward validation framework

The rolling forecast idea is already good.
A production version would make that evaluation structure even more explicit and repeatable.

### 5. Watch for structural breaks

Long historical periods can hide regime changes.
If prescription behavior shifts structurally, an older seasonal relationship may not fully hold.

### 6. Monitor recalibration and model refresh frequency

A useful forecast today may degrade later if the underlying demand process changes.

---

## Part 16: How This Connects to Banking and Risk Analytics

Even though this project is about healthcare prescriptions, the forecasting logic transfers well to finance and risk work.

### Similar uses in banking and risk

The same broad forecasting discipline can apply to:

- delinquency inflow forecasting
- collections workload forecasting
- call-center demand forecasting
- expected loss planning inputs
- treasury liquidity planning
- complaint volume forecasting
- application volume forecasting
- branch or channel demand forecasting

### Why this matters for me

Credit-risk work is not only about cross-sectional borrower scoring.
It also includes planning over time.

So this project strengthens another side of my quant toolkit:

- thinking sequentially
- respecting time order
- comparing future forecasts with realized outcomes
- checking whether a model leaves residual structure behind

---

## Part 17: Limitations and Honest Caveats

I should also be honest about what this notebook does **not** do.

### 1. It is a univariate forecasting setup

That is clean and useful, but it ignores external drivers.

### 2. The evaluation metric is narrow

MAPE is intuitive, but no single error metric captures everything.

### 3. The project is built on one historical series

That means the scope is focused, not broad.

### 4. The notebook concludes residual adequacy qualitatively plus Ljung-Box interpretation

That is good practice, but a production validation pack would usually document diagnostics more formally and preserve them more explicitly.

### 5. It is a learning project rather than a deployment system

So there is no full production pipeline for:

- model versioning
- forecast-serving infrastructure
- monitoring dashboards
- automated retraining rules

That is okay.
The notebook still does a strong job teaching the core logic.

---

## Part 18: The Key Lessons I Want to Retain

### Technical lessons

- time series must be split chronologically, not randomly
- trend and seasonality should be identified before model selection
- ADF testing helps justify differencing choices
- one regular difference and one seasonal difference were needed here
- AIC is useful for comparing candidate SARIMA structures
- residuals should behave like white noise before I trust the model
- rolling forecasts are better than a single static holdout forecast
- a strong seasonal baseline is necessary for honest comparison
- SARIMA beat the seasonal naive benchmark clearly on MAPE

### Practical lessons

- forecasting is a planning tool, not just a statistics exercise
- simple baselines can be surprisingly strong
- model selection alone is not enough without residual validation
- better fit is only useful if it improves future-period forecasts
- even small, clean datasets can teach powerful modeling lessons when the sequence structure is strong

---

## Quick Revision Sheet

### Problem type
- Univariate time-series forecasting

### Target
- Monthly antidiabetic drug prescriptions in Australia

### Data span
- July 1991 to June 2008

### Core structure seen in the series
- upward trend
- clear annual seasonality

### Stationarity path
- raw series: non-stationary
- first difference: still non-stationary
- first difference + seasonal difference at lag 12: stationary

### Final differencing choices
- `d = 1`
- `D = 1`
- `m = 12`

### Candidate model family
- `SARIMA(p,1,q)(P,1,Q)12`

### Search space
- `625` candidate combinations

### Selected model
- `SARIMA(2,1,3)(1,1,3)12`

### Validation logic
- residual diagnostics
- Ljung-Box test
- rolling forecasts on final 36 months
- seasonal naive benchmark comparison

### Final evaluation
- naive seasonal MAPE ≈ `12.69%`
- SARIMA MAPE ≈ `7.90%`

### Clean final takeaway
- the selected SARIMA model beats the seasonal baseline and is the best notebook model for this forecasting task

---

## Connections to the Rest of My Notes

- [[Tharun-Kumar-Gajula]] — this project sits inside my broader portfolio and shows that my work is not only classification-focused
- [[2_regression_analysis_masterclass]] — useful for the statistical mindset, hypothesis testing logic, and model-interpretation discipline behind this project
- [[3_machine_learning_masterclass]] — useful for placing classical forecasting alongside broader ML methods and model-selection thinking
- [[4_python_data_analytics_master_cheatsheet]] — useful for the Python workflow, plotting, pandas handling, and coding syntax that support this notebook
- [[10_quant_modeling_workflow_master_reference]] — useful as the higher-level modeling workflow note that this forecasting project can be mapped onto

---

## Closing Note

This project is one of my cleanest introductions to forecasting.

It teaches me how to move from a raw monthly series to a defendable forecasting workflow:

- inspect the data
- identify trend and seasonality
- test stationarity
- difference appropriately
- select a SARIMA structure systematically
- validate residual behavior
- forecast in rolling windows
- compare against a seasonal baseline
- choose the model based on out-of-sample performance

That is exactly the kind of disciplined thinking I want to carry into all future forecasting, analytics, and risk-modeling work.
