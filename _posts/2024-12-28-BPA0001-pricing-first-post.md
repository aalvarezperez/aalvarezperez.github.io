---
title: "Mastering the Poisson Distribution: Intuition and Foundations"
date: 2024-12-28 18:45:00 +0100
categories: [Foundations, Distributions]
tags: [poisson, stats, discrete, distribution]
media_subpath: /assets/images/BPA0001/
image:
  path: poisson_pmf.png
---


You’ve probably used the normal distribution one or two times too many. We all have — It’s a true statistical workhorse. But sometimes, we run into problems. For instance, when predicting or forecasting values given a model, simulating data given the theorised data generating process, or when we try to visualise model output and explain them intuitively to non-technical stakeholders. Suddenly, things don’t make much sense: can a user really have made -8 clicks on the banner? Or even, 4.3 clicks? Both are examples of how count data doesn’t behave. I’ve found that better encapsulating the data generating process into my modelling has been key to having sensible model output. Using the Poisson distribution when it was appropriate has not only helped me convey more meaningful insights to stakeholders, but also enabled more accurate error estimates, better inference, and sound decision-making. In this post, my aim is to help you get a deep intuitive feel for the Poisson distribution by walking through example applications, and taking a dive into the foundations - the math. I hope you learn not just how it works, but also why it works, and when to apply the distribution! 

_If you know of a resource that has helped you grasp the concepts in this blog particularly well, you’re invited to share it in the comments!_

# Outline  
1. **Examples and use cases:** Let’s walk through some use cases and sharpen the intuition I just mentioned. Along the way, the relevance of the Poisson distribution will become clear.
2. **The foundation:** Next, let’s break down the equation into its individual components — the probability mass function, to be precise. By studying each part, we’ll uncover why the distribution works the way it does.
3. **The assumptions:** Equipped with some formality, it will be easier to understand the assumptions that power the distribution, and at the same time set the boundaries for when it works, and when not.
4. **When Poison falls short:** Finally, let’s explore the special links that the Poisson distribution has with the Binomial and Negative Binomial distributions. Understanding these relationships can deepen our understanding, and provide alternatives when the Poisson distribution is not suited for the job.
