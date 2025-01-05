---
slug: "Mastering-the-Poisson-Distribution-Intuition-and-Foundations"
title: "Mastering the Poisson Distribution: Intuition and Foundations"
date: 2025-01-05 08:30:00 +0100
categories: [Foundations, Distributions]
tags: [poisson, stats, discrete, distribution]
media_subpath: /assets/images/BPA0001/
toc: true
math: true
image:
  light: poisson_pmf_light.png
  dark: poisson_pmf_dark.png
---


You’ve probably used the normal distribution one or two times too many. We all have — It’s a true statistical workhorse. But sometimes, we run into problems. For instance, when predicting or forecasting values given a model, simulating data given the theorised data generating process, or when we try to visualise model output and explain them intuitively to non-technical stakeholders. Suddenly, things don’t make much sense: can a user really have made -8 clicks on the banner? Or even, 4.3 clicks? Both are examples of how count data doesn’t behave.  

I’ve found that better encapsulating the data generating process into my modelling has been key to having sensible model output. Using the Poisson distribution when it was appropriate has not only helped me convey more meaningful insights to stakeholders, but also enabled more accurate error estimates, better inference, and sound decision-making. In this post, my aim is to help you get a deep intuitive feel for the Poisson distribution by walking through example applications, and taking a dive into the foundations - the math. I hope you learn not just how it works, but also why it works, and when to apply the distribution! 

_If you know of a resource that has helped you grasp the concepts in this blog particularly well, you’re invited to share it in the comments!_

## Outline  

1. **Examples and use cases:** Let’s walk through some use cases and sharpen the intuition I just mentioned. Along the way, the relevance of the Poisson distribution will become clear.
2. **The foundation:** Next, let’s break down the equation into its individual components — the probability mass function, to be precise. By studying each part, we’ll uncover why the distribution works the way it does.
3. **The assumptions:** Equipped with some formality, it will be easier to understand the assumptions that power the distribution, and at the same time set the boundaries for when it works, and when not.
4. **When Poison falls short:** Finally, let’s explore the special links that the Poisson distribution has with the Binomial and Negative Binomial distributions. Understanding these relationships can deepen our understanding, and provide alternatives when the Poisson distribution is not suited for the job.

## Example in an online marketplace  

I chose to deep dive into the Poisson distribution because it appears frequently in my day-to-day work. Online marketplaces stand on binary user choices from two sides: a seller deciding to list an item, and a buyer deciding to make a purchase. These micro-behaviours drive supply and demand, both in the short and long term. A marketplace is born.  

These binary choices aggregate to counts —  the sum of many such decision as they occur. Attach a timeframe to this counting process, and you’ll start seeing Poisson distributions everywhere. Let’s look into a concrete example, next.  

Consider a seller on a platform. On a given month, the seller may or may not list an item for sale — a binary choice. We would only know if they did, cause then we have a measured count of the event. Nothing stops him from listing another item in the same month. If he does, we count up those events. The total could be zero for an inactive seller or, say, 120 for a very engaged seller.  

Over several months, we would observe a varying number of listed items by this seller — sometimes less, sometimes more —  hovering around an average monthly listing rate. That’s essentially a Poisson process.  

*When we get to the assumptions section, you’ll see what we had to assume away to make this example work.*  

### Other examples  

Coming soon.


## The math  

I find opening up the probability mass function (PMF) of distributions helpful to understanding why things work as they do.  (To the footer: Note that we are calling this a mass function because the resulting random variable is discrete.) The PMF of the Poisson distribution goes like:  

$$
\begin{equation}  
P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}
\end{equation}
$$  

Where λ is the rate parameter, and k is the manifested value of the random variable (0, 1, 2, 3, …, k events). Very neat and compact.  

![pmf](poisson_pmf_main_text_light.png){: .light }
![pmf](poisson_pmf_main_text_dark.png){: .dark }
_The probability mass function of the Poisson distribution._  


### Contextualising λ and k: the marketplace example  
In the context of our earlier example —  a seller listing items on our platform — λ represents the seller’s average monthly listings. As the expected monthly value for this seller, λ orchestrates the number of items he would list in a month. Note that λ is a greek letter, so read: λ is a parameter that we can estimate from data. On the other hand, $$ k $$ does not hold any information about the seller’s idiosyncratic behaviour. It’s the target value we set for the number of events that may happen to learn about its probability. 

### The dual role of λ as the mean and variance  
When I said that λ orchestrates the number of monthly listings for the seller, I meant it quite literally. Namely, λ is both the expected value and variance of the distribution indifferently for all values of λ. Meaning that the ratio mean-to-variance (variation index) is always 1. To add perspective, the normal distribution requires two parameters, mu and sigma, the average and variance respectively, to describe the distribution. The Poisson distribution does it with just one. Having to estimate only one parameter can be beneficial for inference work. Specifically, by reducing variance, and so reducing the error of your fitted values, or predictions. On the other hand, it can be too limiting of an assumption. Alternatives like the Negative Binomial distribution can alleviate this limitation. We’ll explore that later.  

### Breaking down the probability mass function  

Now that we know the smallest building blocks, let’s zoom out one step: what is $$ \lambda^k $$ , $$ e^{-\lambda} $$ , and k!, and more importantly, what is each of these component’s function in the whole?

1. $$ \lambda^k $$ can be interpreted as a weight that expresses how likely it is for k events to happen, given that the expectation is λ. Note that likely here does not mean a probability, yet. It’s merely a signal strength.
2. $$ k! $$ is a combinatorial correction so that we can say that the order of the events happening is irrelevant. The events are interchangeable. 
3. $$ e^{-\lambda} $$ is meant to normalise the integral of the PMF function to sum up to 1. It’s called the partition function of exponential-family distributions.

In more details, $$ \lambda^k $$ relates the observed value to the expected value of the random variable. Intuitively, more probability mass lies around the expected value. Hence, if the observed value lies close the expected, its own probability of occurring is larger, than the probability of far removed observations.

Before we can cross-check our intuition with the numerical behaviour of $$ \lambda^k $$, we need to consider what $$ k! $$ does. Had we cared about the order of events, then each unique event could be ordered in k! ways. But because we don’t, and we deem each event interchangeable, we “divide out” k! from $$ \lambda^k $$ to correct for this overcounting. 

Since $$ \lambda^k $$ is an exponential term, the output will always be larger as k grows, and lambda is kept constant - that’s the opposite of our intuition. But now that we know about the interchangeable events assumption, and the overcounting issue, we know that we have to factor in k! like so: $$ \frac{\lambda^k e^{-\lambda}}{k!} $$ to see the behaviour we expect.

Now let’s check the intuition of the relationship between λ and k through $$ \lambda^k $$ , corrected for $$ k! $$ For the same λ, say λ = 4, we should see $$ \frac{\lambda^k e^{-\lambda}}{k!} $$ to be smaller for values of k that are far removed from 4, compared to values of k that lie close to 4. Like so: inline code: 4^2 = 16 is smaller than 4 ^ 4 = 256. This is consistent with the intuition of a higher likelihood of k when it’s near the mean of the distribution. The image below shows this relationship more generally, where you see that moving k closer to λ makes the output larger.  

![λ ^ k](lambda_to_k_light.png){: .light}  
![λ ^ k](lambda_to_k_dark.png){: .dark}
