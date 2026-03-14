---
title: "Population Stability Index (PSI)"
date: 2026-03-14
tags: [PSI, model-monitoring, drift]
cluster: Execution, Validation & ML
---

Imagine your customer base as a population. If its profile changes drastically, a model built on old customers might break. The **Population Stability Index (PSI)** quantifies this shift by comparing the distribution of scores (or any variable) between a reference (training) period and a current period. It is widely used in credit scoring to detect model drift.

Concretely, PSI divides data into bins and computes:

$$

PSI = \sum_{i} (O_i - E_i) \times \ln\Bigl(\frac{O_i}{E_i}\Bigr),

$$

where $E_i$ and $O_i$ are the proportions in bin $i$ for the *expected* (e.g. development) and *observed* (new) samples. A higher PSI means a larger population shift.  For example, if many more new customers fall into high-risk bins than before, PSI rises.

Common interpretation benchmarks are:
- **PSI < 0.10**: No significant change (population stable).
- **0.10 ≤ PSI < 0.25**: Moderate shift (monitor for potential retraining).
- **PSI ≥ 0.25**: Significant shift (likely model breakdown).

For instance, consider a 5-bin score distribution. Suppose the reference distribution was [0.30, 0.40, 0.20, 0.10, 0.00] and the current distribution [0.25, 0.35, 0.25, 0.10, 0.05]. Computing PSI for each bin using the formula above yields a total PSI (one can plug these into a PSI calculator). A PSI of 0.08, for example, would indicate stability. A PSI of 0.20 would signal moderate drift. (This aligns with industry rules of thumb.)

In Python, a simple PSI function might be:

```python
import numpy as np

def psi(expected_percents, actual_percents):
    expected = np.array(expected_percents)
    actual = np.array(actual_percents)
    # Avoid division by zero or log of zero
    expected = np.where(expected==0, 1e-6, expected)
    actual = np.where(actual==0, 1e-6, actual)
    psi_vals = (actual - expected) * np.log(actual/expected)
    return psi_vals.sum()

# Example:
expected_dist = [0.3, 0.4, 0.2, 0.1]
actual_dist   = [0.25, 0.35, 0.25, 0.15]
print("PSI:", psi(expected_dist, actual_dist))

```

If the computed PSI exceeds a threshold (often 0.1 or 0.25), one should re-examine the model. In risk operations, PSI is part of the model monitoring toolkit. It is often reported periodically; if PSI is high, the bank may retrain the model or investigate population changes. Overall, PSI helps ensure that a live portfolio remains similar enough to the development sample. It thus complements [[Model-Performance-Metrics]] in ongoing risk model governance, alerting us when retraining or review is needed.

| PSI Value Range  | Interpretation                         |
|------------------|-----------------------------------------|
| PSI < 0.10       | Insignificant shift (stable population) |
| 0.10 ≤ PSI < 0.25| Moderate shift (monitor closely)        |
| PSI ≥ 0.25       | Significant shift (model review needed) |
