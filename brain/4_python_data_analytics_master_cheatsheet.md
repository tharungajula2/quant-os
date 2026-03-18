---
title: "Python for Data Analytics Master Cheat Sheet — Core Python, Pandas, Visualization, and Git"
date: 2026-03-19
tags:
  - python
  - data-analytics
  - pandas
  - matplotlib
  - seaborn
  - git
  - github
  - conda
  - data-cleaning
  - feature-engineering
  - visualization
  - cheat-sheet
  - beginner-friendly
cluster: "01 — Foundations"
progress: 0
links:
  - "[[Tharun-Kumar-Gajula]]"
  - "[[2_regression_analysis_masterclass]]"
  - "[[3_machine_learning_masterclass]]"
  - "[[1_lending_club_credit_risk_masterclass]]"
  - "[[5_bank_churn_neural_networks_masterclass]]"
  - "[[6_employee_retention_tree_models_masterclass]]"
  - "[[7_socio_economic_household_classification_masterclass]]"
  - "[[8_twitter_sentiment_nlp_masterclass]]"
---

---

# Python for Data Analytics Master Cheat Sheet — Core Python, Pandas, Visualization, and Git

> This note is my quick-scan master cheat sheet for Python in data analytics. I want it to help me revise the entire practical toolkit from core syntax to Pandas data handling, plotting, and Git/GitHub workflow.
>
> My goal here is not to learn every corner of Python. My goal is to become strong in the subset of Python that I actually use in analytics, modeling, notebooks, interviews, and project building.

---

## The Note at a Glance

This note gives me one connected workflow:

```text
Core Python
→ data structures and control flow
→ functions and reusable logic
→ Pandas for loading and cleaning data
→ aggregation and reshaping
→ visualization with Matplotlib and Seaborn
→ environment management
→ Git/GitHub for version control and deployment
```

This note matters because most analytics work is not only about models.
A lot of the real work is:

- reading files
- cleaning messy columns
- transforming data into usable format
- summarizing it clearly
- plotting patterns
- saving outputs
- tracking changes properly

That is why Python for analytics is both a coding note and a workflow note.

---

## How This Note Connects to My Other Notes

This cheat sheet is the coding foundation under many of my other notes:

- in [[1_lending_club_credit_risk_masterclass]], I use Pandas heavily for cleaning dates, missing values, dummy variables, WoE-style prep, and evaluation tables
- in [[5_bank_churn_neural_networks_masterclass]], I use Python, Pandas, preprocessing, and train-test workflow before modeling
- in [[6_employee_retention_tree_models_masterclass]], I rely on feature engineering, filtering, grouping, and plotting to interpret attrition patterns
- in [[7_socio_economic_household_classification_masterclass]], I handle a noisy tabular dataset using cleaning, encoding, aggregation, and model-ready transformations
- in [[8_twitter_sentiment_nlp_masterclass]], I use text cleaning, vectorization pipelines, and classification logic built on Python fundamentals
- in [[2_regression_analysis_masterclass]] and [[3_machine_learning_masterclass]], many model concepts become usable only after I can manipulate data correctly in Python

So this note is the practical toolkit underneath the theory notes and project notes.

---

# Part 1 — Core Python

## 1.1 Variables, objects, and data types

In Python, everything is an object. I assign an object to a variable using `=`.

```python
x = 100
rate = 0.125
name = "Tharun"
is_default = False
```

### Main basic data types

- `int` → whole numbers
- `float` → decimal numbers
- `str` → text
- `bool` → `True` or `False`

### Very common checks

```python
type(x)
id(x)
```

- `type()` tells me the class
- `id()` tells me the memory identity of the object

### Type casting

```python
int("25")
float("3.14")
str(100)
```

I use type casting often when imported data comes in with the wrong type.

---

## 1.2 Operators

### Arithmetic operators

```python
+
-
*
/
//
%
**
```

Examples:

```python
10 / 3   # 3.333...
10 // 3  # 3
10 % 3   # 1
2 ** 3   # 8
```

### Assignment operators

```python
x += 1
x -= 2
x *= 5
```

### Comparison operators

```python
==
!=
>
<
>=
<=
```

These return booleans.

### Logical operators

```python
and
or
not
```

### Membership operators

```python
in
not in
```

Example:

```python
"Python" in ["Python", "SQL", "Pandas"]
```

---

## 1.3 The four core container types

### Lists

Lists are:

- ordered
- mutable
- allow duplicates

```python
skills = ["Python", "SQL", "Pandas"]
skills[0]
skills[-1]
skills[0:2]
```

Common methods:

```python
skills.append("Git")
skills.remove("SQL")
skills.pop()
```

### Dictionaries

Dictionaries store key-value pairs.

```python
borrower = {
    "grade": "A",
    "loan_amnt": 10000,
    "home_ownership": "RENT"
}
```

Access:

```python
borrower["grade"]
borrower.keys()
borrower.values()
borrower.items()
```

### Sets

Sets are:

- unordered
- unique values only
- useful for removing duplicates

```python
set([1, 1, 2, 3])
```

### Tuples

Tuples are:

- ordered
- immutable

```python
point = (10, 20)
```

Useful when a record should not be changed.

---

## 1.4 Indexing and slicing

### Indexing

```python
my_list[0]
my_list[-1]
```

### Slicing

```python
my_list[start:stop:step]
```

Examples:

```python
nums = [10, 20, 30, 40, 50]
nums[1:4]   # [20, 30, 40]
nums[:3]    # [10, 20, 30]
nums[::2]   # [10, 30, 50]
```

This matters because slicing shows up constantly in both pure Python and Pandas.

---

## 1.5 Control flow

### If / elif / else

```python
score = 720

if score >= 750:
    segment = "low_risk"
elif score >= 650:
    segment = "moderate_risk"
else:
    segment = "high_risk"
```

Python uses indentation to define code blocks.

---

## 1.6 Loops

### For loops

```python
for i in range(5):
    print(i)
```

### Loop through items

```python
for skill in skills:
    print(skill)
```

### Enumerate

```python
for idx, skill in enumerate(skills):
    print(idx, skill)
```

### While loop

```python
count = 0
while count < 3:
    print(count)
    count += 1
```

I use `for` loops more often in analytics than `while` loops.

---

## 1.7 List comprehensions

This is a compact way to create lists.

```python
squares = [x**2 for x in range(5)]
```

With condition:

```python
even_squares = [x**2 for x in range(10) if x % 2 == 0]
```

This is very common in feature transformation and quick filtering tasks.

---

## 1.8 Functions

Functions help me reuse logic.

```python
def calc_bonus(salary, rate=0.10):
    return salary * rate
```

### Key ideas

- `def` defines a function
- parameters are inputs
- `return` sends the result back
- default values make arguments optional

### Good function habits

- keep one clear purpose
- use descriptive names
- return values instead of only printing
- avoid hidden side effects when possible

---

## 1.9 Lambda functions

A lambda is a small anonymous function.

```python
lambda x: x * 1.10
```

Used often with `apply()`, `map()`, or sorting logic.

Example:

```python
nums = [1, 2, 3]
list(map(lambda x: x * 2, nums))
```

I should use lambda for simple one-line logic, not for large complicated code.

---

## 1.10 String methods and f-strings

### Common string methods

```python
text.upper()
text.lower()
text.strip()
text.replace("old", "new")
text.split(",")
```

### F-strings

```python
name = "Tharun"
score = 0.873
msg = f"Model score is {score:.2%} for {name}"
```

F-strings are the cleanest way to create readable output.

---

## 1.11 Core Python interview reminders

I should be able to explain these quickly:

- difference between list, tuple, set, and dictionary
- mutable vs immutable
- `=` vs `==`
- `/` vs `//`
- what slicing means
- what list comprehension does
- why functions are useful
- when lambda is okay and when it becomes unreadable

---

# Part 2 — Pandas

## 2.1 What Pandas gives me

Pandas is the main data manipulation library for analytics in Python.

Its two core structures are:

- **Series** → one-dimensional labeled array
- **DataFrame** → two-dimensional table

If Python gives me the language, Pandas gives me the spreadsheet-plus-SQL-like toolkit for analysis.

---

## 2.2 Importing and loading data

```python
import pandas as pd
```

### Common file reads

```python
df = pd.read_csv("data.csv")
df = pd.read_excel("data.xlsx")
```

With an index column:

```python
df = pd.read_csv("data.csv", index_col=0)
```

This is common when the first column is just a row index that I do not want duplicated.

---

## 2.3 First inspection steps

These are often the first commands I run:

```python
df.head()
df.tail()
df.info()
df.describe()
df.shape
df.columns
```

### What each gives me

- `head()` → first few rows
- `tail()` → last few rows
- `info()` → column types and missing values
- `describe()` → summary stats for numeric columns
- `shape` → `(rows, columns)`
- `columns` → all column names

A lot of cleaning mistakes can be avoided if I inspect these first.

---

## 2.4 Selecting columns and rows

### Column selection

```python
df["salary"]
df[["salary", "job_title"]]
```

### Attribute-style access

```python
df.salary
```

This is convenient but less safe when column names have spaces or collide with built-in names.

### Row and column access with `iloc`

`iloc` is position-based.

```python
df.iloc[0]
df.iloc[0:10, 0:3]
```

### Row and column access with `loc`

`loc` is label-based.

```python
df.loc[:, ["job_title", "salary"]]
df.loc[df["salary"] > 100000, ["job_title", "salary"]]
```

---

## 2.5 Filtering data

```python
high_salary = df[df["salary"] > 100000]
```

Multiple conditions:

```python
filtered = df[(df["salary"] > 100000) & (df["remote"] == True)]
```

Important:

- use `&` for elementwise AND
- use `|` for elementwise OR
- wrap each condition in parentheses

---

## 2.6 Missing values

### Detecting missing values

```python
df.isna().sum()
df["salary"].isna().mean()
```

### Common handling methods

```python
df.dropna()
df.dropna(subset=["salary"])
df["age"] = df["age"].fillna(df["age"].median())
```

### Practical reminder

I should not fill missing values blindly.

I should ask:

- is the missingness meaningful?
- should I create a missing indicator?
- should I use median instead of mean?
- should this become its own category?

This connects directly to [[1_lending_club_credit_risk_masterclass]], where missingness itself can carry borrower information.

---

## 2.7 Dates and time handling

```python
df["issue_date"] = pd.to_datetime(df["issue_date"])
```

Once converted, I can use `.dt` accessors:

```python
df["issue_year"] = df["issue_date"].dt.year
df["issue_month"] = df["issue_date"].dt.month
```

Dates are often stored as strings when imported, so converting them early is important.

---

## 2.8 Cleaning stringified lists with `ast.literal_eval`

Sometimes a CSV stores lists as text:

```python
"['Python', 'SQL']"
```

That is a string, not a real Python list.

```python
import ast

df["skills"] = df["skills"].apply(
    lambda x: ast.literal_eval(x) if pd.notna(x) else x
)
```

This safely converts the string representation into a real list.

---

## 2.9 Exploding list-like columns

If one row contains multiple values inside a list, `explode()` turns each item into its own row.

```python
df = df.explode("skills")
```

This is very useful for analyzing skills, tags, categories, or multi-label fields.

---

## 2.10 Creating and modifying columns

```python
df["bonus"] = df["salary"] * 0.10
```

Using `apply()`:

```python
df["salary_band"] = df["salary"].apply(
    lambda x: "high" if x >= 100000 else "low"
)
```

Using vectorized logic is usually faster than writing explicit loops.

---

## 2.11 Sorting

```python
df.sort_values(by="salary", ascending=False)
```

Multiple columns:

```python
df.sort_values(by=["job_title", "salary"], ascending=[True, False])
```

---

## 2.12 Value counts

```python
df["job_title"].value_counts()
df["job_title"].value_counts(normalize=True)
```

This is one of the fastest ways to understand a categorical variable.

---

## 2.13 GroupBy

This is one of the most important Pandas tools.

```python
df.groupby("job_title")["salary"].mean()
```

Multiple aggregations:

```python
df.groupby("job_title")["salary"].agg(["min", "max", "median", "mean"])
```

Sorted output:

```python
df.groupby("job_title")["salary"].median().sort_values(ascending=False)
```

I should think of `groupby` as:

```text
split data by category
→ apply summary function
→ combine results
```

---

## 2.14 Pivot tables

Pivot tables reshape data into summary format.

```python
df.pivot_table(index="month", columns="job_title", aggfunc="size", fill_value=0)
```

Common uses:

- monthly counts by category
- average metric by two dimensions
- dashboard-like summary tables

---

## 2.15 Dummy variables / one-hot encoding

```python
pd.get_dummies(df["color"], drop_first=True)
```

Or on full DataFrame:

```python
df_encoded = pd.get_dummies(df, columns=["color", "city"], drop_first=True)
```

This matters because machine learning models usually need numeric input.

This connects directly to [[2_regression_analysis_masterclass]] and [[3_machine_learning_masterclass]].

---

## 2.16 Copying safely

```python
df_high = df[df["salary"] > 100000].copy()
```

Using `.copy()` avoids the common `SettingWithCopyWarning` problem when I later modify the filtered DataFrame.

This is a very good habit.

---

## 2.17 Combining DataFrames

### Concatenation

Stack rows:

```python
pd.concat([df_jan, df_feb], ignore_index=True)
```

### Merging

Join tables like SQL joins:

```python
df_merged = df1.merge(df2, how="inner", on="company_id")
```

Common `how` values:

- `inner`
- `left`
- `right`
- `outer`

I should always know:

- join key
- join type
- whether row count changed unexpectedly

---

## 2.18 Exporting data

```python
df.to_csv("cleaned_data.csv", index=False)
df.to_excel("output.xlsx", index=False)
```

I often forget `index=False`, and then the saved file contains an extra index column.

---

## 2.19 Pandas interview reminders

I should be able to explain these quickly:

- difference between Series and DataFrame
- `loc` vs `iloc`
- `merge` vs `concat`
- `groupby` vs `pivot_table`
- `apply` vs vectorized operations
- why `.copy()` matters
- what `pd.to_datetime()` does
- what `get_dummies()` does
- how to inspect missing values

---

# Part 3 — Visualization with Matplotlib and Seaborn

## 3.1 Why visualization matters

Visualization helps me:

- understand distributions
- compare categories
- spot outliers
- check trends over time
- communicate findings clearly

A plot is not decoration. It is part of reasoning.

---

## 3.2 Pandas built-in plotting

Pandas wraps Matplotlib for quick plotting.

```python
df["salary"].plot(kind="hist", bins=30)
```

Common kinds:

- `line`
- `bar`
- `barh`
- `scatter`
- `hist`
- `box`

This is useful for quick notebook exploration.

---

## 3.3 Matplotlib fundamentals

```python
import matplotlib.pyplot as plt
```

Typical structure:

```python
fig, ax = plt.subplots(figsize=(10, 5))
ax.scatter(df["count"], df["salary"])
ax.set_title("Salary vs Demand")
ax.set_xlabel("Job Count")
ax.set_ylabel("Salary")
plt.tight_layout()
plt.show()
```

### What is happening here

- `fig` is the figure or canvas
- `ax` is the plotting area
- I add plot elements to `ax`
- `tight_layout()` helps avoid overlapping labels

---

## 3.4 Very common chart types

### Histogram
Used for distribution.

```python
df["salary"].plot(kind="hist", bins=30)
```

### Box plot
Used for spread and outliers.

```python
df.boxplot(column="salary", by="job_title")
```

### Scatter plot
Used for relationship between two numeric variables.

```python
ax.scatter(df["experience"], df["salary"])
```

### Bar chart
Used for categorical comparison.

```python
df.groupby("job_title")["salary"].median().plot(kind="barh")
```

---

## 3.5 Useful Matplotlib formatting tools

```python
ax.set_xlim(0, 10000)
ax.invert_yaxis()
```

Formatters:

```python
from matplotlib.ticker import FuncFormatter, PercentFormatter
```

Examples:

```python
ax.yaxis.set_major_formatter(FuncFormatter(lambda x, pos: f"${x:,.0f}"))
ax.yaxis.set_major_formatter(PercentFormatter(1.0))
```

These make plots much more readable.

---

## 3.6 Seaborn basics

Seaborn is built on top of Matplotlib and works very naturally with Pandas DataFrames.

```python
import seaborn as sns
sns.set_theme(style="ticks")
```

### Example bar plot

```python
sns.barplot(data=df, x="salary", y="job_title")
```

### Example KDE / smooth distribution

```python
sns.displot(data=df, x="salary", kind="kde", fill=True)
```

### Remove extra borders

```python
sns.despine()
```

---

## 3.7 Why Seaborn is useful

Seaborn gives me:

- cleaner default styling
- easier grouping by category
- strong DataFrame integration
- simpler statistical plotting functions

It is often better for quick communication plots than using pure Matplotlib from scratch.

---

## 3.8 Good plotting habits

I should always ask:

- what question is this chart answering?
- is the axis label clear?
- does the scale mislead?
- is the chart too crowded?
- is this chart type the right one?

Bad charts create confusion even if the underlying code is correct.

---

## 3.9 Visualization interview reminders

I should be able to explain:

- histogram vs box plot
- bar chart vs scatter plot
- when to use line chart
- why formatting matters
- Matplotlib vs Seaborn
- what makes a chart misleading

---

# Part 4 — Environment Management and Version Control

## 4.1 Why environments matter

Different projects may need different package versions.

If I install everything globally, packages can conflict.

That is why I use isolated environments.

---

## 4.2 Conda basics

### Create environment

```bash
conda create -n my_env python=3.11 pandas matplotlib seaborn
```

### Activate environment

```bash
conda activate my_env
```

### List installed packages

```bash
conda list
```

This helps me keep project dependencies separate and reproducible.

---

## 4.3 VS Code interpreter selection

In VS Code, I should make sure the notebook or script is attached to the correct Python interpreter.

If the wrong interpreter is selected, imports may fail even though the package is installed somewhere else.

That is a very common beginner issue.

---

## 4.4 Git: local version control

Git tracks changes in files over time.

I can think of it as a structured history system for code and documents.

Common actions conceptually:

```text
edit files
→ stage changes
→ commit with message
→ push to remote repository
```

A good commit message describes what changed clearly.

Examples:

- `added churn model evaluation plots`
- `cleaned salary parsing logic`
- `updated lending club note links`

---

## 4.5 GitHub: remote hosting and collaboration

GitHub hosts my repositories remotely.

Typical flow:

1. create or publish repository
2. commit changes locally
3. push changes to GitHub
4. pull remote changes when needed

This gives me:

- backup
- version history
- easy sharing
- collaboration support

---

## 4.6 Pull, push, and sync

### Push
Send local commits to GitHub.

### Pull
Bring remote updates into local machine.

If I edit files both locally and remotely without syncing properly, I can create conflicts.

That is why a basic Git habit is:

```text
pull latest
→ make changes
→ commit
→ push
```

---

## 4.7 Why Git matters for analytics projects

Git is not just for software engineers.

It helps me:

- track notebook changes
- preserve modeling history
- manage project notes
- recover older versions
- publish portfolio work more cleanly

This matters for both interview credibility and real project discipline.

---

# Part 5 — The Practical Analytics Workflow in Python

This is the workflow I should remember across projects:

```text
Import libraries
→ load data
→ inspect shape, types, and missing values
→ clean bad columns
→ convert dates and categories
→ create useful features
→ aggregate and summarize
→ visualize patterns
→ prepare model-ready data
→ save outputs
→ track changes in Git
```

If I follow this workflow consistently, I become much more reliable in analytics work.

---

# Part 6 — Common Mistakes I Should Avoid

## Python mistakes

- confusing `=` with `==`
- forgetting indentation
- using mutable objects carelessly
- writing functions that only print instead of returning values

## Pandas mistakes

- not checking `df.info()` early
- forgetting `.copy()` after filtering
- joining on the wrong key
- filling missing values without thinking
- saving CSV with unwanted index column

## Visualization mistakes

- plotting without a clear question
- using wrong chart type
- unreadable axis labels
- cluttered charts

## Environment and Git mistakes

- using wrong interpreter
- installing packages in wrong environment
- not committing often
- vague commit messages
- forgetting to pull before pushing changes

---

# Part 7 — Interview-Focused Quick Answers

## What is Pandas?

Pandas is Python’s main data analysis library for working with tabular data using Series and DataFrames. I use it for loading, cleaning, transforming, aggregating, and exporting data.

## What is the difference between `loc` and `iloc`?

`loc` is label-based indexing, while `iloc` is position-based indexing.

## What is the difference between `merge` and `concat`?

`merge` joins DataFrames horizontally using keys, similar to SQL joins. `concat` stacks DataFrames along an axis, often row-wise.

## Why use `.copy()` after filtering?

It avoids ambiguous chained assignment problems and helps prevent `SettingWithCopyWarning`.

## What is `groupby` used for?

It splits the data by category, applies summary functions, and combines the results, which makes it essential for aggregation.

## Why use Seaborn over pure Matplotlib sometimes?

Seaborn gives cleaner defaults, works very naturally with Pandas DataFrames, and makes grouped statistical plots easier.

## Why do environments matter?

Different projects may require different package versions, so isolated environments prevent package conflicts and improve reproducibility.

## Why use Git and GitHub in analytics?

They help me track changes, preserve project history, collaborate, and publish reproducible work more professionally.

---

# Part 8 — What I Should Retain from This Note

If I forget details, I should still remember these anchor ideas:

1. **Core Python gives me the language.**
2. **Pandas gives me the tabular data toolkit.**
3. **Matplotlib and Seaborn help me reason visually.**
4. **Conda helps me manage clean environments.**
5. **Git and GitHub help me manage clean project history.**
6. **Most analytics work is data preparation and communication before it becomes modeling.**

That is why this note is foundational for almost everything else in my brain system.

---

# Final Mental Model

```text
Python syntax
→ data structures
→ functions and reusable logic
→ Pandas for real tables
→ plotting for reasoning and communication
→ environments for reproducibility
→ Git/GitHub for disciplined project workflow
```

This is the practical coding layer underneath my analytics work.
