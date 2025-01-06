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
  path: poisson_pmf_light.png
---


You’ve probably used the normal distribution one or two times too many. We all have — It’s a true statistical workhorse. But sometimes, we run into problems. For instance, when predicting or forecasting values given a model, simulating data given the theorised data generating process, or when we try to visualise model output and explain them intuitively to non-technical stakeholders. Suddenly, things don’t make much sense: can a user really have made -8 clicks on the banner? Or even, 4.3 clicks? Both are examples of how count data doesn’t behave.  

I’ve found that better encapsulating the data generating process into my modelling has been key to having sensible model output. Using the Poisson distribution when it was appropriate has not only helped me convey more meaningful insights to stakeholders, but also enabled more accurate error estimates, better inference, and sound decision-making. In this post, my aim is to help you get a deep intuitive feel for the Poisson distribution by walking through example applications, and taking a dive into the foundations - the math. I hope you learn not just how it works, but also why it works, and when to apply the distribution! 

_If you know of a resource that has helped you grasp the concepts in this blog particularly well, you’re invited to share it in the comments!_

## Outline  

1. **Examples and use cases:** Let’s walk through some use cases and sharpen the intuition I just mentioned. Along the way, the relevance of the Poisson distribution will become clear.
2. **The foundation:** Next, let’s break down the equation into its individual components — the probability mass function, to be precise. By studying each part, we’ll uncover why the distribution works the way it does.
3. **The assumptions:** Equipped with some formality, it will be easier to understand the assumptions that power the distribution, and at the same time set the boundaries for when it works, and when not.
4. **When real life deviates:** Finally, let’s explore the special links that the Poisson distribution has with the Binomial and Negative Binomial distributions. Understanding these relationships can deepen our understanding, and provide alternatives when the Poisson distribution is not suited for the job.

## Example in an online marketplace  

I chose to deep dive into the Poisson distribution because it appears frequently in my day-to-day work. Online marketplaces stand on binary user choices from two sides: a seller deciding to list an item, and a buyer deciding to make a purchase. These micro-behaviours drive supply and demand, both in the short and long term. A marketplace is born.  

These binary choices aggregate to counts —  the sum of many such decision as they occur. Attach a timeframe to this counting process, and you’ll start seeing Poisson distributions everywhere. Let’s look into a concrete example, next.  

Consider a seller on a platform. On a given month, the seller may or may not list an item for sale — a binary choice. We would only know if they did, cause then we have a measured count of the event. Nothing stops him from listing another item in the same month. If he does, we count up those events. The total could be zero for an inactive seller or, say, 120 for a very engaged seller.  

Over several months, we would observe a varying number of listed items by this seller — sometimes less, sometimes more —  hovering around an average monthly listing average. That’s essentially a Poisson process.  

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
When I said that λ orchestrates the number of monthly listings for the seller, I meant it quite literally. Namely, λ is both the expected value and variance of the distribution indifferently for all values of λ. Meaning that the ratio mean-to-variance (index of dispersion) is always 1. To add perspective, the normal distribution requires two parameters, mu and sigma, the average and variance respectively, to describe the distribution. The Poisson distribution does it with just one. Having to estimate only one parameter can be beneficial for inference work. Specifically, by reducing variance, and so reducing the error of your fitted values, or predictions. On the other hand, it can be too limiting of an assumption. Alternatives like the Negative Binomial distribution can alleviate this limitation. We’ll explore that later.  

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

## The Assumptions  
First, let’s clarify an often confused thing: a *Poisson process*, versus the *Poisson distribution*. The process is a stochastic continuous-time model of points happening in given interval: 1D — a line; 2D —  an area, or higher dimensions. We, data scientists, most often deal with the one-dimensional case, where the “line” is time, and the points are the events of interest. The Poisson process has two key properties - note that these are not the same as *assumptions*:  

1. The points follow a Poisson distribution, orchestrated by the PMF we discussed before
2. At any given interval of the line, the occurrence of events is independent of what happens in other disjoint, non-overlapping, interval, i.e., chunks of time  
  
The distribution simply describes probabilities for various number of counts in an interval. Strictly speaking, one can use the distribution pragmatically whenever the data is nonnegative, can be unbounded on the right, has mean λ, and it reasonably models the data. It would be just convenient if the underlying process is a Poisson one, and actually justifies using the distribution.  

*So, can we justify using the Poisson distribution for our marketplace example? Let’s open up the assumptions of a *Poisson process*, and take the test.*  

1. **The occurrence of one event does not affect the probability of a second event.** Think of our seller going on to list another item tomorrow indifferent of having done so already toady, or the one from five days ago for that matter. The point here is that there is no memory between events. Nothing links them directly. Semi-formally, \P(event today) is equal to \P(event today | event before today). The only factor determining the probability of listing an item at a given period in time, is λ, the listing-rate parameter of the seller. 
2. **The average rate at which events occur is independent of any occurrence.** Similarly to (1), no event in the past, nor future, has any effect on the levels on λ — it’s constant during the observed timeframe. The parallel to our example is that no past listing of an item encourages or discourages the seller to be more or less active at some deep idiosyncratic level.
3. **Two events cannot occur at exactly the same instant.** If we were to zoom at an infinite granular level on the timescale, no two listings could have been placed simultaneously. Two events always follow each one another. In our example, that means the seller has to go through the process of listing an item iteratively.

### The marketplace exmple: implications  

**Constant λ**  
_Why it may fail:_ Seller's patterned online activity; holidays; promotions; listings are seasonal goods or services.  
_Consequence:_ λ is not constant, leading to overdispersion (variance-to-mean-ratio is larger than 1) or strong temporal patterns.  

**Independence and memorylessness**   
_Why it may fail:_ propensity to list again is higher after successful first listing, or one listing depletes stock and intervenes with propensity of listing again.  
_Consequence:_ Two events are no longer independent, as the occurance of one informs the other.  

**Simultaneous events**  
_Why it may fail:_ Batch-listing was introduced to help the sellers.  
_Consequence:_ Multiple listings would be online at the same time, and counted simultaneously.  

### Balancing rigour and pragmatism  
As Data Scientists on the job we may feel trapped between rigour and pragmatism, when the Poisson distribution falls short. I suggest these three things to know when to err on rigour, or pragmatism. 
1. **Pinpoint your goal:** it is inference, simulation or prediction, and is it about high-stakes output? List the worst thing that can happen  
2. **Identify problem and solution**: why doesn't Poisson fit, and what can you do about it? list 2-3 solutions  
3. **Balance gains and costs:** Will your workaround improve things, or make it worse? and at what cost: interpretability, new assumptions introduced and resources used

The above should give you a sound foundation on which you can build your argument and decision.  
That said, here are some counters I use when needed.  

## When real life deviates from your model  
Everything described so far pertains to the standard, or homogenous, Poisson process. But what if reality begs for something different?  
Of course, you rethink the entire approach, and switch to an different distribution. But in the next section we'll cover two generalisations of the Poisson distribution when the constant λ assumption does not hold.  


Varying lambda can happen in two ways:  
1. **As a function of time:** 
2. **As a function of sub-processes:** think of multiple sellers listing items, each with their own λ

### Time-varying λ  
The former case extends the PMF so that for each time $$t$$, λ can have it's own value. Let's call this one PMF*  

$$
\begin{equation}  
P\bigl(K(A) = k\bigr) = \frac{\bigl(\Lambda(T)\bigr)^k \ e^{-\Lambda(T)}}{k!}
\end{equation}
$$  

Where the number of events K(T) in a measurable interval T, follows the Poisson distribution with a rate no longer equal to a fixed λ, but one equal to  

$$
\begin{equation}  
\Lambda(T) = \int_{T} \lambda(t) \mathrm{d}t
\end{equation}
$$  

More intuitively, integrating over a given time interval $$t$$ to $$t + i$$, gives us a single number: the expected value of events over that interval. The integral will vary by each arbitrary interval, and that's what makes lambda change over time. To understand how that intregration part works, it was helpful for me to think of it like this: if the inverval $$t$$ to $$t_1$$ has a mean of 3, and $$t_1$$ to $$t_2$$ has a mean of 5, then the interval $$t$$ to $$t_2$$ has a mean of $$8 = 3 + 5$$. That's that's the two expectations (= means) summed together, and now the expectation over the entire interval.  

**Practical implication** 
If this is the case in your work, you may consider modeling the expected value of the Poisson distribution as a function of time, among the other covariates. This will relax the assumption greatly, and still enable you to reap off the simplicity of the Poisson distribution.  

### Process-varying λ: Mixed Poisson distribution  
But then there is a gotcha. Remember when we said that λ has a dual role as the mean and variance? That still applies here. Looking at the "relaxed": PMF*, the only thing that changes is that λ can vary freely with time. But it's still the same λ that orchestrates both the expected value and the dispersion of the PMF*, specifically: $$\mathbb{E}[X] = \mathrm{Var}(X)$$  

There are various reasons for this constraint not to hold in reality. Model misspecification, event interdependence and unacounted for heterogeneity could be the issues at hand. I'd like to focus on the latter case, to introduce you to touch on the negative binomial distribution.  

Imagine we have not one seller, but 10 of them and they list at a different intensity level. Then, essentially we have 10 Poisson processes going on, each orchestrated by their own $$λ_i$$, where i is the seller subscript, seller 1 to 10. If we plan to model the average $$\frac{1}{N} \sum_{i=1}^{N} \lambda_i$$ of those 10 sellers, then we simplify the mixture away, and surely can get to the expected value of all the sellers listing together, but the resulting λ is naive and does not know about the original spread of $$\lambda_i$$, and this will cause under or over dispersion. That means, the variance is no longer equal to the mean. Practically, unarming us from estimating error adequately!  







