---
slug: "How-Adevinta-Matured-Fisher-Their-A-B-Testing-Library"
title: "How Adevinta Matured Fisher, Their A/B Testing Library"
description: "How Marktplaats built Fisher — a Python A/B testing package — and how it scaled into Adevinta's group-wide stats engine."
date: 2023-09-01 08:30:00 +0100
categories: [Experimentation, Engineering]
tags: [experimentation, a/b testing, python, tooling, marketplaces]
media_subpath: /assets/images/BPA0004/
toc: true
math: false
image:
  path: cover.png
---

## Experimentation at Adevinta

Like an organisation, product experimentation can be seen through the lens of **process**, **culture**, and **tooling** — the cogwheels of innovation. When these work well together, they multiply the value from each experiment. Break one cog, and you hear screechy, grinding sounds in the machinery.

At Adevinta's Dutch online marketplace, **Marktplaats**, we posed ourselves two questions:

- In which of these areas are we excelling?
- In which are we falling short?

We realised that none of the three areas could be neglected. We needed to:

- Create **agile processes**
- Foster an **experimentation culture and mindset**
- Empower operations with **fit-for-purpose tooling**

We saw a clear starting point. This article takes us through the journey of how we matured **Fisher**, our A/B testing package — ultimately freeing up our Data Scientists' resources and scaling up to a full-fledged statistical engine for our global experimentation platform.


## Fisher: Cutting Down Time-to-Insight

If our Data Scientists were craftsmen, then A/B testing used to be our craft. Tests were a gateway to creative exploratory data analysis — rigorously deployed to provide product teams with as much learning as possible. We spent **days** analysing experiments and crafting insights and reports.

The analysis step was long, and Data Scientists were often the **bottleneck** in the innovation process — especially when the number of concurrent experiments was high. We had a scalability issue. The core question became:

> **How can we reduce the time a Data Scientist spends on an experiment?**

### Meet Fisher

The Marktplaats team built **Fisher**: a Python package that enables Data Scientists to run straightforward hypothesis testing and produce comprehensive reports with very few lines of code.

Fisher supports the **entire analysis workflow**:

- Fetching experiment meta(data)
- Applying standard data cleansing and transformation procedures
- Generating the final report

It integrates neatly into our teams' ways of working by connecting to **Jira**, **GitHub**, and various databases — rendering the entire analysis workflow close to fully automated.

Written in the **object-oriented programming paradigm**, Fisher has grown into an ecosystem and vessel for advanced methods, including:

- **CUPED** (variance reduction) — substantially cutting experiment runtime
- **Multiple-testing corrections** — upholding the quality of inference

Introducing new advances to all Data Scientists is as fast as merging a pull request.

### Sample Usage

```python
from fisher import Analysis, Report, TTest

data = ...
tests = ...

analyser = Analysis()
results = analyser(tests=tests, method=TTest(), data=data)

report = Report.from_jira('bnl1234', results=[results])
report.save()
```

The `Analysis` class orchestrates hypothesis testing using a simple t-test on a dataframe with `entity`, `variant`, and `metrics` columns. The `Tests` class represents hypothesis tests characterised by contrasts, dependent variables, and segments, along with error-type parameters `alpha` and `beta`. Validity assessments and diagnostics are recorded under the hood and accessible via analysis metadata. The `Report` generates an HTML report based on the experiment design fields from Jira and the current analysis results.

### Results

- **>90%** of all Marktplaats experiments were conducted with Fisher within the first year
- Data Scientists' hands-on time dropped to an average of **3 hours per experiment**
- An estimated **9+ full weeks freed per year** at the current rate of experimentation
- The bottleneck was removed — faster experimentation achieved ✅


## Fisher at Scale, Across All Adevinta Markets

The scale achieved at Marktplaats was great — but Adevinta is a group of online marketplaces across Europe, including **Kleinanzeigen** (Germany), **leboncoin** (France), and **Subito** (Italy). There was a much larger scale to unlock.

While the Marktplaats team was developing Fisher, one of Adevinta's central teams had built a relatively mature, marketplace-agnostic A/B testing platform called **Houston**. Houston had established a robust infrastructure with a comprehensive platform, UI, and automation capabilities for data storage and tracking — becoming a de facto experimentation tool across many marketplaces.

Around the same time the Marktplaats team looked to leverage Houston, the Houston team was thinking about how to extend their analytics capabilities to support state-of-the-art methods at scale.

### Houston ft. Marktplaats

The two teams realised they complemented each other well. Fisher was adopted into the Houston ecosystem and became a **central analytics toolkit shared across all Adevinta marketplaces**.

By adopting Fisher, Houston became the central hub for all statistical analysis and experimentation within the Adevinta group. This opened doors to three major improvements:

1. **Support for Advanced Analysis Mode** within the Houston platform
2. **A centralised Stats-Engine Service** for statistical computations
3. **Enabling a Unified Experimentation Research process**


### Advanced Analysis Mode

Leveraging Fisher in **Jupyter notebooks**, Houston now offers an extensive range of statistical analysis tools — making complex hypothesis testing, data cleaning, and report generation more accessible. Analysts can perform custom analyses and go beyond what is available in the standard Houston UI.


### Stats Engine for Houston

The need to enhance analytical capabilities independently of the already complex system of tracking, assignment, and the Houston UI gave birth to Adevinta's experimentation stats-engine: **Nightingale**.

Nightingale — powered by Fisher — became the engine driving all complex statistical calculations in Houston. This:

- Ensures **consistent and reliable results** across Adevinta
- Makes enabling new methods in the Houston UI as simple as **calling a different Nightingale endpoint**


### Enabling Unified Experimentation Research

Having a central place for implementing analysis methods with a well-defined interface opened the opportunity for **company-wide experimentation research** like never before.

With the creation of **Experimentation Labs** and Fisher as the implementation backbone, the Houston team built a simulation and validation toolkit that:

- Seamlessly tests new methodologies on **synthetic data**
- Models complex real-world processes before production deployment
- Ensures every release provides value before being applied to real use cases

Every successful research project is then smoothly integrated with Nightingale (both using Fisher), allowing every analysis to eventually surface in the Houston UI. **The circle from research to production is closed seamlessly** — enabling continuous improvement of the whole platform.


## Conclusion

Fisher is a story of **collaboration**, **teamwork**, and a shared drive for excellence. It shows how well-planted seeds can grow deep roots and become something much bigger — a platform and a community that is significantly more than the sum of its parts.

With Fisher as a key component of the experimentation platform and analytics toolkit, Adevinta has:

- Made experimentation **faster and better**
- Opened the door to **further incremental improvements**
- Built a scalable engine powering data-driven decision-making across Europe


*Originally published on [Medium](https://medium.com/@alejandroalvarezprez/how-we-matured-fisher-our-a-b-testing-package-6f2294746a56) on September 1, 2023.*
