---
slug: "Mastering-the-Poisson-Distribution-Intuition-and-Foundations"
title: "Mastering the Poisson Distribution: Intuition and Foundations"
description: "Take a dive into the math and exemplifying use cases of the Poisson distribution."
date: 2025-01-05 08:30:00 +0100
categories: [Foundations, Distributions]
tags: [poisson, stats, distributions]
media_subpath: /assets/images/BPA0001/
toc: true
math: true
image:
  path: poisson_pmf_light.png
---


You’ve probably used the normal distribution one or two times too many. We all have — It’s a true statistical workhorse. But sometimes, we run into problems. For instance, when predicting or forecasting values, simulating data given a particular data generating process, or when we try to visualise model output and explain them intuitively to non-technical stakeholders. Suddenly, things don’t make much sense: can a user really have made -8 clicks on the banner? Or even, 4.3 clicks? Both are examples of how count data doesn’t behave.  

I’ve found that better encapsulating the data generating process into my modelling has been key to having sensible model output. Using the Poisson distribution when it was appropriate has not only helped me convey more meaningful insights to stakeholders, but it has also enabled me do more accurate error estimates, better inference, and sound decision-making. In this post, my aim is to help you get a deep intuitive feel for the Poisson distribution by walking through example applications, and taking a dive into the foundations - the math. I hope you learn not just how it works, but also why it works, and when to apply the distribution! 

_If you know of a resource that has helped you grasp the concepts in this blog particularly well, you’re invited to share it in the comments!_

## Outline  

1. **Examples and use cases:** Let’s walk through some use cases and sharpen the intuition I just mentioned. Along the way, the relevance of the Poisson distribution will become clear.
2. **The foundation:** Next, let’s break down the equation into its individual components. By studying each part, we’ll uncover why the distribution works the way it does.
3. **The assumptions:** Equipped with some formality, it will be easier to understand the assumptions that power the distribution, and at the same time set the boundaries for when it works, and when not.
4. **When real life deviates:** Finally, let’s explore the special links that the Poisson distribution has with the Negative Binomial distribution. Understanding these relationships can deepen our understanding, and provide alternatives when the Poisson distribution is not suited for the job.

## Example in an online marketplace  

I chose to deep dive into the Poisson distribution because it appears frequently in my day-to-day work. Online marketplaces stand on binary user choices from two sides: a seller deciding to list an item, and a buyer deciding to make a purchase. These micro-behaviours drive supply and demand, both in the short and long term. A marketplace is born.  

These binary choices aggregate to counts —  the sum of many such decision as they occur. Attach a timeframe to this counting process, and you’ll start seeing Poisson distributions everywhere. Let’s look into a concrete example next.  

Consider a seller on a platform. On a given month, the seller may or may not list an item for sale (a binary choice) We would only know if she did, cause then we have a measured count of the event. Nothing stops him from listing another item in the same month. If she does, we count up those events. The total could be zero for an inactive seller or, say, 120 for a very engaged seller.  

Over several months, we would observe a varying number of listed items by this seller — sometimes less, sometimes more —  hovering around an _average_ monthly listings. That is essentially a Poisson process.
*When we get to the assumptions section, you’ll see what we had to assume away to make this example work.*  

### Other examples  

Coming soon.


## The math  

I find opening up the probability mass function (PMF) of distributions helpful to understanding why things work as they do. The PMF of the Poisson distribution goes like:  

$$
\begin{equation}  
  P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}
  \label{eq:pmf}
\end{equation}
$$  

Where $$\lambda$$ is the rate parameter, and $$\mathrm{k}$$ is the manifested value of the random variable $$(k = 0,1,2,3,...,k events)$$. Very neat and compact.  

![pmf](poisson_pmf_main_text_light.png){: .light }
![pmf](poisson_pmf_main_text_dark.png){: .dark }
_The probability mass function of the Poisson distribution._  


### Contextualising λ and k: the marketplace example  
In the context of our earlier example - a seller listing items on our platform — $$\lambda$$ represents the seller’s average monthly listings. As the expected monthly value for this seller, λ orchestrates the number of items she would list in a month. Note that $$\lambda$$ is a greek letter, so read: λ is a parameter that we can estimate from data. On the other hand, $$k$$ does not hold any information about the seller’s idiosyncratic behaviour. It’s the target value we set for the number of events that may happen to learn about its probability. 

### The dual role of $$\lambda$$ as the mean and variance  
When I said that $$\lambda$$ orchestrates the number of monthly listings for the seller, I meant it quite literally. Namely, $$\lambda$$ is both the expected value and variance of the distribution, indifferently, for all values of $$\lambda$$. This means that the mean-to-variance ratio (index of dispersion) is always 1. To add perspective, the _normal_ distribution requires two parameters, $$\mu$$ and $$\sigma^{2}$$, the average and variance respectively, to describe the distribution. The Poisson distribution does it with just one. Having to estimate only one parameter can be beneficial for parametic inference work. Specifically, by reducing the variance of the parameter estimates. On the other hand, it can be too limiting of an assumption. Alternatives like the Negative Binomial distribution can alleviate this limitation. We’ll explore that later. We discuss both cases later.  

### Breaking down the probability mass function  

Now that we know the smallest building blocks, let’s zoom out one step: what is $$\lambda^k$$ , $$e^{-\lambda}$$, and $$\mathrm{k}!$$, and more importantly, what is each of these component’s function in the whole?  

1. $$\lambda^k$$ can be interpreted as a weight that expresses how likely it is for $$\mathrm{k}$$ events to happen, given that the expectation is $$\lambda$$. Note that "likely" here does not mean a probability, yet. It’s merely a signal strength.
2. $$k!$$ is a combinatorial correction so that we can say that the order of the events happening is irrelevant. The events are interchangeable. 
3. $$e^{-\lambda}$$ normalises the integral of the PMF function to sum up to 1. It’s called the _partition function_ of exponential-family distributions.

In more details, $$\lambda^k$$ relates the observed value $$\mathrm{k}$$ to the expected value of the random variable, $$\lambda$$. Intuitively, more probability mass lies around the expected value. Hence, if the observed value lies close the expected, the probability of occurring is larger, than the probability of an observation far removed from the expectation. Before we can cross-check our intuition with the numerical behaviour of $$\lambda^k$$, we need to consider what $$k!$$ does.  

Had we cared about the order of events, then each unique event could be ordered in $$\mathrm{k}!$$ ways. But because we don’t, and we deem each event interchangeable, we “divide out” $$\mathrm{k}!$$ from $$\lambda^\mathrm{k}$$ to correct for the overcounting. 

Since $$\lambda^\mathrm{k}$$ is an exponential term, the output will always be larger as $$\mathrm{k}$$ grows, keeping lambda constant. That is the opposite of our intuition that there is _maximum_ probability when $$\lambda = \mathrm{k}$$. But now that we know about the interchangeable events assumption, and the overcounting issue, we know that we have to factor in $$\mathrm{k!}$$ like so: $$\frac{\lambda^k\mathrm{e}^{-\lambda}}{k!}$$ to see the behaviour we expect.  

Now let’s check the intuition of the relationship between $$\lambda$$ and $$\mathrm{k}$$ through $$\lambda^\mathrm{k}$$, corrected for $$k!$$. For the same λ, say λ = 4, we should see $$\frac{\lambda^\mathrm{k}\mathrm{e}^{-\lambda}}{\mathrm{k!}}$$ to be smaller for values of \mathrm{k} that are far removed from 4, compared to values of k that lie close to 4. Like so: inline code: $$4^2 = 16$$ is smaller than $$4 ^ 4 = 256$$. This is consistent with the intuition of a higher likelihood of \mathrm{k} when it’s near the expectation. The image below shows this relationship more generally, where you see that the output is larger as \mathrm{k} approaches $$\lambda$$.  

![λ ^ k](lambda_to_k_light.png){: .light}  
![λ ^ k](lambda_to_k_dark.png){: .dark}  

## The Assumptions  
First, let’s clarify the difference between a *Poisson process*, and the *Poisson distribution*. The process is a stochastic continuous-time model of points happening in given interval: 1D, a line; 2D, an area, or higher dimensions. We, data scientists, most often deal with the one-dimensional case, where the “line” is time, and the points are the events of interest - I dare to say.  

These are the assumptions of the Poisson process:  
1. **The occurence of one event does not affect the probability of a second event.** Think of our seller going on to list another item tomorrow indifferently of having done so already today, or the one from five days ago for that matter.  The point here is that there is no memory between events. Nothing links them directly.  
3. **The average rate at which events occur, is independent of any occurrence.** Similarly to (1), no event in the past, nor future, has any effect on the levels on $$\lambda$$ — it’s constant during the observed timeframe. The parallel to our example is that no past listing of an item encourages or discourages the seller to be more or less active at some deep idiosyncratic level, like motivation.  
4. **Two events cannot occur at exactly the same instant.** If we were to zoom at an infinite granular level on the timescale, no two listings could have been placed simultaneously; always sequentially.  

From these assumptions-no memory, constant rate, events happening alone—it follows that any interval’s number of events is Poisson-distributed with parameter $$\lambda_{t}$$ and that disjoint intervals are independent.  
 
_A note on the distribution_  
The distribution simply describes probabilities for various number of counts in an interval. Strictly speaking, one can use the distribution pragmatically whenever the data is nonnegative, can be unbounded on the right, has mean λ, and it reasonably models the data. It would be just convenient if the underlying process is a Poisson one, and actually justifies using the distribution.  

### The marketplace example: implications  

So, can we justify using the Poisson distribution for our marketplace example? Let’s open up the assumptions of a *Poisson process*, and take the test.  

**Constant λ**  
_Why it may fail:_ the seller has patterned online activity; holidays; promotions; listings are seasonal goods or services.  
_Consequence:_ $$\lambda$$ is not constant, leading to overdispersion (mean-to-variance ratio is larger than 1) or strong temporal patterns.  

**Independence and memorylessness**   
_Why it may fail:_ the propensity to list again is higher after a successful listing, or conversely, listing once depletes the stock and intervenes with the propensity of listing again.  
_Consequence:_ two events are no longer independent, as the occurance of one informs the occurance of the other.  

**Simultaneous events**  
_Why it may fail:_ Batch-listing, a new feature, was introduced to help the sellers.  
_Consequence:_ multiple listings would come online at the same time, _clumped_ together, and they would be counted simultaneously.  

### Balancing rigour and pragmatism  
As Data Scientists on the job we may feel trapped between rigour and pragmatism, when the Poisson distribution falls short. I suggest these three things to know when to err on the side of rigour, or pragmatism:  
1. **Pinpoint your goal:** is it inference, simulation or prediction, and is it about high-stakes output? List the worst thing that can happen, and the cost of it for the business.  
2. **Identify the problem and solution**: why does the Poisson distribution not fit, and what can you do about it? list 2-3 solutions, including doing nothing.  
3. **Balance gains and costs:** Will your workaround improve things, or make it worse? and at what cost: interpretability, new assumptions introduced and resources used. Does it help you in achieving your goal?  

The above should give you a sound foundation on which you can build your argument and decision.  
That said, here are some counters I use when needed.  

## When real life deviates from your model  
Everything described so far pertains to the standard, or homogenous, Poisson process. But what if reality begs for something different?  
Of course, you can rethink the entire approach like switching to a different distribution. But in the next section we'll cover two extensions of the Poisson distribution when the constant $$\lambda$$ assumption does not hold.  

The two extensions are about letting $$\lambda$$ vary,
1. **As a function of time:** a single seller whose listing rate ramps up before holidays and slows down afterward  
2. **As a function of subprocesses:** multiple sellers listing items, each with their own $$\lambda$$ can be seen as multiple subprocesses 

These are not mutually exclusively, but neither they are the same.  

### Time-varying λ  
The first approach extends the PMF so that for each time $$t$$, $$\lambda$$ can have its own value. Let's call this one $$\mathrm{PMF^{*}}$$.    

$$
\begin{equation}  
P\bigl(K(A) = k\bigr) = \frac{\bigl(\Lambda(T)\bigr)^k \ e^{-\Lambda(T)}}{k!}
  \label{eq:pmf2}
\end{equation}
$$  

Where the number of events $$\mathrm{K(T)}$$ in an interval $$\mathrm{T}$$, follows the Poisson distribution with a rate no longer equal to a fixed $$\lambda$$, but one equal to  

$$
\begin{equation}  
\Lambda(T) = \int_{T} \lambda(t) \mathrm{d}t
\end{equation}
$$  

More intuitively, integrating over a particular interval $$t$$ to $$t + i$$, gives us a single number: the expected value of events over that interval. The integral will vary by each arbitrary interval, and that's what makes $$\lambda$$ change over time. To understand how that integration part works, it was helpful for me to think of it like this: if the inverval $$t$$ to $$t_1$$ integrates to 3, and $$t_1$$ to $$t_2$$ to 5, then the interval $$t$$ to $$t_2$$ integrates to $$8 = 3 + 5$$. That's the two expectations summed up and, now, the expectation of the entire interval.  

**Practical implication** 
One may want to consider modeling the expected value of the Poisson distribution as a function of time. This will relax the assumption, and still enable you to reap off the simplicity of the Poisson distribution. In generative model notation:  

$$
\lambda_{t} = \beta_{0} + \beta_1 \cdot time_{t}
$$ 

$$
y_{t} \sim \mathrm{Poisson}\bigl(\lambda_{t}\bigr)
$$

### Process-varying λ: Mixed Poisson distribution  
But then there is a gotcha. Remember when I said that $$\lambda$$ has a dual role as the mean and variance? That still applies here. Looking at the "relaxed" $$PMF^{*}$$, the only thing that changes is that $$\lambda$$ can vary freely with time. But it's still the same $$\lambda$$ that orchestrates both the expected value and the dispersion of $$PMF^{*}$$. More precisely, $$\mathbb{E}[X] = \mathrm{Var}(X)$$  still holds.  

There are various reasons for this constraint not to hold in reality. Model misspecification, event interdependence and unacounted for heterogeneity could be the issues at hand. I'd like to focus on the latter case, as this one justifies the Negative Binomial distribution, one of the topics I promised to open up.  

**Heterogeneity and overdispersion**   
Imagine we are not dealing with one seller, but with 10 of them listing at different intensity levels, $$λ_i$$, $$\mathrm{i} = 1, 2, 3,..., 10$$ sellers. Then, essentially we have 10 Poisson processes going on. If we model the $$\lambda_{group}=\frac{1}{N}\sum_{i=1}^{N} \lambda_i$$ of those 10 sellers, then we simplify the mixture away. Surely can get to the expected value of all the sellers listing together, but the resulting $$\lambda_{group}$$ is naive and does not know about the original spread of $$\lambda_i$$. This will cause overdispersion, i.e., the variance is larger than mean. Practically, this leads to underestimated errors, and hence inflate the false positive rate. So how what do we do now?  

**Negative Binomial: extending the Possion distribution**  
Among the few ways one can look at the Negative Binomial distribution, one way is to see it as a compound Poisson process - sounds familiar yet (10 sellers)? That means that multiple independent Poisson processes are summed up to a single one. Mathematically, first we draw $$\lambda$$ from a Gamma distribution: $$\lambda \sim \Gamma\bigl(r,\theta\bigr)$$, then we draw the count $$\mathrm{X}$$ like: $$\mathrm{X} \| \lambda \sim \mathrm{Poisson}\bigl(\lambda\bigr)$$. Read why Gamma [here](https://en.wikipedia.org/wiki/Negative_binomial_distribution#Definitions)). The more exposing alias of the Negative binomial distributin is *Gamma-Poisson mixture distribution*, and now we know why.  

Let's simulate this scenario to gain more intuition.  

![gamma-lambda](gamma_lambda_light.png){: .right width="972" height="589" .w-50 .light}
![gamma-poisson mixture](gamma_lambda_dark.png){: .right width="972" height="589" .w-50 .dark}
_The distribution of $$\lambda_{i}$$ follows $$\Gamma\bigl(r,\theta\bigr)$$_  

First, we draw $$\lambda_{i}$$ from a gamma distribution: $$\lambda_{i} \sim \Gamma\bigl(r,\theta\bigr)$$. Intuitively, the gamma distribution tells about the variety in the intensity e.g., listing rate amongst the sellers.  

On a practical note, one can instil their assumptions about the degree of heterogeneity in this step of the model. By varying the levels of heterogeneity, one can observe the impact on the final Poisson-like distribution. Doing this type of checks is common in Bayesian modeling, where the assumptions are set explicitly.  

![gamma-poisson mixture](gamma_poisson_light.png){: .left width="972" height="589" .w-50 .light}
![gamma-poisson mixture](gamma_poisson_dark.png){: .left width="972" height="589" .w-50 .dark}
_Gamma-Poisson mixture distribution versus homogenous Poisson distribution._  

In the second step, we plug the obtained $$\lambda$$ in the Poisson distribution: $$\mathrm{X} \| \lambda \sim \mathrm{Poisson}\bigl(\lambda\bigr)$$, and obtain a Poisson-like distribution that represents the summed subprocesses. Notably, this _unified_ process has a larger dispersion than what expected from a homogeneous Poisson distribution, but in line with the mixed distribution for $$\lambda$$.  

<details>
  <summary>R code for Gamma-Poisson simulation</summary>  
  
```R  
N <- 100000
shape = 2.5,
scale = 5,
df_gamma_poisson <- tibble(  
  gamma_lambda = rgamma(N, shape = shape / scale, scale = scale),
  `Homogenous Poisson` = rpois(N, lambda = shape),
  `Gamma-Poisson` = rpois(N, lambda = gamma_lambda)
  ) %>%
  pivot_longer(c(`Homogenous Poisson`:`Gamma-Poisson`)) %>% 
  count(name, value) %>% 
  group_by(name) %>% 
  mutate(
    p = n/sum(n)
  )

df_gamma_poisson %>% 
  ggplot(aes(value, p, fill = name)) + 
  theme_adevinta() + 
  scale_fill_adevinta('coolors2') + 
  geom_col(position = 'identity', alpha = .9) + 
  labs(
    fill = NULL,
    y = expression("P(k)"),
    x = expression(k)
  )  
```

</details>  

### Heterogeneous $$\lambda$$ and inference
A practical consequence of opening up to this flexibility in your assumed distribution is that inference becomes harder. The 'flexibility' parameter(s) (= Gamma parameters) have to be estimated. Then, first, the parameters behave like a flexible explanator of the data, tending to overfit and explain away variance in your variable. Second, and linked to previous statement, these estimates come with their own variance, and in turn this variance reduces the power of identifying a difference in means if there is one.  

**Counter the loss of power**  
1. Confirm that you indeed need to extend the standard Poisson distribution. If not, then simplify to the best simplest model. A quick check on overdispersion may do for this.
2. Pin down the estimates of the gamma mixture distribution parameters with regulating, informative, priors (think: Bayes)

In my research process to write this blog I learned a lot about the connective tissue of this all: how the binomial distribution has major underpinning in the proccesses we discussed. And while I'd love to ramble on about this, I'll leave it for another post, perhaps. In the meanwhile, feel free to share your understanding in the comments section below 👍  

## Conclusion  

The Poisson distribution is a simple distribution that nonetheless can be _just right_ to model count data. When the assumptions do not hold however, one can extend the distribution by letting the rate parameter be a function of time, or other factor, as well as assuming subprocesses that make up the count data together. This will bring the needed flexibility. But there's never free lunch: the added flexibility to your modeling increases the variance of your model and so underpins its statistical power. If your end-goal is inference, then you may want to think twice, and make explore simpler models of the data. The bayesian paradigm offers a an in-built solution to regularise estimates: informative priors. I hope you take away what you came for: a better intuition about the Poisson distribution. It would be really great to hear your thoughts about this in the comments!  



















