---
slug: "Regression-Discontinuity-Design-in-Action"
title: "Regression Discontinuity Design (2/2): A Marketplace Case Study"
description: "A real-world RDD analysis on marketplace search rankings: practical setup, modelling choices, placebo testing, and lessons learned."
date: 2025-06-10 08:30:00 +0100
categories: [Causal Inference, Techniques]
tags: [causal inference, regression discontinuity, marketplaces]
media_subpath: /assets/images/BPA0002/
toc: true
math: true
image:
  path: visible_jump.png
---

In the [first part of this series](/posts/Regression-Discontinuity-Design-How-It-Works-and-When-to-Use-It/), we built the conceptual foundation of Regression Discontinuity Design: how the continuity assumption works, why the running variable acts as an instrument near the cutoff, and what makes the LATE a valid causal estimate.

Now let's put that theory to work. In this post, we'll walk through a real-world RDD application in e-commerce: estimating the causal effect of search ranking position on listing performance. Along the way, we'll cover key modelling decisions that practitioners face: covariates, parametric versus non-parametric RDD, polynomial degree, bandwidth selection, and validation through placebo and density tests.

## RDD in Action: Search Ranking and listing performance Example

In e-commerce and online marketplaces, the starting point of the buyer experience is searching for a listing. Think of the visitor typing "Nikon F3 analogue camera" in the search bar. Upon carrying out this action, algorithms frantically sort through the inventory looking for the best matching listings to populate the search results page.

Time and attention are two scarce resources. So, it is in the interest of everyone involved — the buyer, the seller and the platform — to reserve the most prominent positions on the page for the matches with the highest anticipated chance to become successful trades.

Additionally, position effects in consumer behaviour suggest that users infer higher credibility and desirability from items "ranked" at the top. Think about high-tier products being placed at eye-height or above in supermarkets, and highlighted items on an e-commerce platform, at the top of the homepage.

So, the question then becomes: how does positioning on the search results page influence a listing's chances to be sold?

Hypothesis:
If a listing is ranked higher on the search results page, then it will have a higher chance of being sold, because higher-ranked listings get more visibility and attention from users.

<details>
  <summary>Intermezzo: business or theory?</summary>
    As with any good hypothesis, we need a bit of theory to ground it. Good for us is that we are not trying to find the cure for cancer. Our theory is about well-understood psychological phenomena and behavioural patterns, to put it overly sophisticated.
    Think of primacy effect, anchoring bias and the resource theory of attention. These are well ideas in behavioural and cognitive psychology that back up our plan here.
    Kicking off the conversation with a product manager will be more fun this way. Personally, I also get excited when I have to brush up on some psychology.
    But I've found through and through that a theory is really secondary to any initiative in my industry (tech). Except for a research team and project, arguably. And it's fair to say it helps us stay on-purpose: what we are doing is to bring business forward, not mother science.
</details>
<br>
Knowing the answer has real business value. Product and commercial teams could use it to design new paid features that help sellers get their listings on higher positions — a win for both the business and the user. It could also clarify the value of on-site real estate like banner positions and ad slots, helping drive growth in B2B advertising.

The question is about incrementality: would've listing 𝕛 been sold, had it been ranked 1st on the results page, instead of, say, 15th. So, we want to make a causal statement. That's hard for at least two reasons:

1. A/B testing comes with a price, and;
2. there are confounders we need to deal with if we resort to observational methods.

Let's expand on that.

### The cost of A/B testing
One experiment design could randomise the fetched listings across the page slots, independent of the listing relevance. Breaking the inherent link between relevance and position, we would learn the effect of position on listing performance. It's an interesting idea — but a costly one.

While it's a reasonable design for statistical inference, this setup is kind of terrible for the user and business. The user might have found what they needed—maybe even made a purchase. But instead, maybe half of the inventory they would have seen was remotely a good match because of our experiment. This suboptimal user experience likely hurts engagement in both the short and long term — especially for new users who are still to see what value the platform holds for them.

Can we think of a way to mitigate this loss? Still committed to A/B testing, one could expose a smaller set of users to the experiment. While it will scale down the consequences, it may also stand in the way of reaching sufficient statistical power by lowering the sample size. Moreover, even small audiences can be responsible for substantial revenue for some companies still — those with millions of users. So, cutting the exposed audience is not a silver bullet either.

Naturally, the way to go is to leave the platform and its users undisturbed —  and still find a way to answer the question at hand. Causal inference is the right mindset for this, but the question is: how do we do that exactly?

### Confounders
Listings don't just make it to the top of the page on a good day; it's their quality, relevance, and the sellers' reputation that promote the ranking of a listing. Let's call these three variables **W**.

What makes **W** tricky is that it influences both the ranking of the listing and also the probability that the listing gets clicked, a proxy for performance.

In other words, **W** affects both our treatment (position) and outcome (click), helping itself with the status of confounder.

![Confounder](DAG_-_Fork%202.png)
_A variable — or set thereof — W, is a confounder when it influences both, the treatment (rank, position) and outcome of interest (click)._

Therefore, our task is to find a design that's fit for purpose; one that effectively controls the confounding effect of **W**.

### You don't choose regression discontinuity — it chooses you
Not all causal inference designs are just sitting around waiting to be picked. Sometimes they show up when you least need them, and sometimes you get lucky when you need them most — like today.

It looks like we can use the page-two cutoff to identify the causal impact of position on clicks-through rate.

#### Abrupt cutoff in search results pagination
Let's unpack the listing recommendation mechanism to see exactly how. Here's what happens under the hood when a results page is generated for a search:

1. **Fetch listings matching the query**<br>
A coarse set of listings is pulled from the inventory, based on filters like location, radius, and category, etc.
Score listings on personal relevance
This step uses user history and listing quality proxies to predict what the user is most likely to click.
2. **Rank listings by score**<br>
Higher scores get higher ranks. Business rules mix in ads and commercial content with organic results.
3. **Populate pages**<br>
Listings are slotted by absolute relevance score. A results page ends at the kth listing, so the k+1th listing appears at the top of the next page. This is going to be crucial to our design.
4. **Impressions and user interaction**<br>
Users see the results in order of relevance. If a listing catches their eye, they might click and view more details: one step closer to the trade.

### Practical setup and variables
So, what is exactly our design? Next, we walk through the reasoning and identification of the key ingredients of our design.

### The running variable
In our setup, the running variable is the relevance score $s_j$ for listing j. This score is a continuous, complex function of both user and listing properties:

\begin{equation}
s_j = f(u_i, l_j)
\end{equation}

The listing's rank $r_j$ is simply a rank transformation of $s_j$ , defined as:

\begin{equation}
r_i = \sum_{j=1}^{n} \mathbf{1}(s_j \leq s_i)
\end{equation}

Practically speaking, this means that for analytical purposes—such as fitting models, making local comparisons, or identifying cutoff points—knowing a listing's rank conveys nearly the same information as knowing its underlying relevance score, and vice versa.

<details>
  <summary>Details: Relevance score vs. rank</summary>
The relevance score $s_j$ reflects how well a listing matches a specific user's query, given parameters like location, price range, and other filters. But this score is relative—it only has meaning within the context of the listings returned for that particular search.
In contrast, rank (or position) is absolute. It directly determines a listing's visibility. I think of rank as a standardising transformation of 𝑠𝑗. For example, Listing A in search Z might have the highest score of 5.66, while Listing B in search K tops out at 0.99. These raw scores aren't comparable across searches—but both listings are ranked first in their respective result sets. That makes them equivalent in terms of what really matters here: how visible they are to users.
</details>

#### The cutoff and treatment
If a listing just misses the first page, it doesn't fall to the bottom of page two — it is artificially bumped to the top. That's a lucky break. Normally, only the most relevant listings appear at the top, but here a listing of merely moderate relevance ends up in a prime slot — albeit on the second page — purely due to the arbitrary position of the page break. Formally, the treatment assignment $D_j$ goes like:

\begin{equation}
D_j = \begin{cases} 1 & \text{if } r_j > 30 \\\ 0 & \text{otherwise} \end{cases}
\end{equation}

(Note on global rank: Rank 31 isn't just the first listing on page two; it is still the 31st listing overall)

The strength of this setup lies in what happens near the cutoff: a listing ranked 30 may be nearly identical in relevance to one ranked 31. A small scoring fluctuation — or a high-ranking outlier — can push a listing over the threshold, flipping its treatment status. This local randomness is what makes the setup valid for RDD.

#### The outcome: Impression-to-click
Finally, we operationalise the outcome of interest as the click-through rate from impressions to clicks. Remember that all listings are 'impressed' when the page is populated. The click is the binary indicator of the desired user behaviour.

In summary, this is our setup:

- Outcome: impression-to-click conversion
- Treatment: Landing on the first vs. second page
- Running variable: listing rank; page-two cutoff at 30

Next we walk through how to estimate the RDD.

### Estimating RDD
In this section, we'll estimate the causal parameter, interpret it, and connect them back to our core hypothesis: how position affects listing visibility.

Here's what we'll cover:

- **Meet the data:** Intro to the dataset
- **Covariates**: Why and how to include them
- **Modelling choices**: parametric RDD vs. not. Choosing the polynomial degree and bandwidth.
- **Placebo-testing**
- **Density continuity testing**

#### Meet the data
We're working with impressions data from one of Adevinta's (ex-eBay Classifieds Group) marketplaces. It's real data, which makes the whole exercise feel grounded. That said, values and relationships are censored and scrambled where necessary to protect its strategic value.

An important note to how we interpret the RDD estimates and drive decisions, is how the data was collected: only those searches where the user saw both the first and second page were included.

This way, we partial out the page fixed effect, if any, but the reality is that many users don't make it to the second page at all. So there is a big volume gap. We discuss the repercussion in the analysis recap.

The dataset consists of these variables:

- Clicked: 1 if the listing was clicked, 0 otherwise – binary
- Position: the rank of the listing – numeric
- D: treatment indicator, 1 if position > 30, 0 otherwise – binary
- Category: product category of the listing – nominal
- Organic: 1 if organic, 0 if from a professional seller – binary
- Boosted: 1 if was paid to be at the top, 0 otherwise – binary

| click |    position |  D| category | organic | boosted |
|------:|------------:|--:|:---------|:--------|--------:|
|     0 |         -11 |  0| A        | 1       |       0 |
|     0 |           6 |  1| B        | 1       |       0 |
|     0 |          24 |  1| A        | 0       |       0 |
|     0 |           5 |  1| C        | 0       |       1 |
|     1 |          25 |  1| C        | 1       |       0 |

_Table: A sample of the dataset we are working with._

#### Covariates: how to include them to increase accuracy?
The running variable, the cutoff, and the [continuity assumption](/posts/Regression-Discontinuity-Design-How-It-Works-and-When-to-Use-It/#the-continuity-assumption-and-parallel-worlds), give you all you need to identify the causal effect. But including covariates can sharpen the estimator by reducing variance — if done right. And, oh is it easy to do it wrong.

The easiest thing to "break" about the RDD design, is the continuity assumption. Simultaneously, that's the last thing we want to break (I already rambled long enough about this in [Part 1](/posts/Regression-Discontinuity-Design-How-It-Works-and-When-to-Use-It/)).

Therefore, the main quest in adding covariates is to it in such way that we reduce variance, while keeping the continuity assumption intact. One way to formulate that, is to assume continuity without covariates and with covariates:

\begin{equation}
\lim_{x \to c^-} \mathbb{E}[Y_i(0) \mid X_i = x] = \lim_{x \to c^+} \mathbb{E}[Y_i(0) \mid X_i = x] \text{(no covariates)}
\end{equation}

\begin{equation}
\lim_{x \to c^-} \mathbb{E}[Y_i(0) \mid X_i = x, Z_i] = \lim_{x \to c^+} \mathbb{E}[Y_i(0) \mid X_i = x, Z_i]  \text{(covariates)}
\end{equation}

Where $Z_i$ is a vector of covariates, for subject i. Less mathy, two things should remain unchanged after adding covariates:

1. The functional form of the running variable, and;
2. The (absence of the) jump in treatment assignment at the cutoff

I did not find out the above myself; Calonico, Cattaneo, Farrell, and Titiunik (2018) did. They developed a formal framework for incorporating covariates into RDD. I'll leave the details to the paper. For now, some modelling guidelines can keep us going:

1. **Model covariates linearly** so that the treatment effect remains the same with and without covariates, thanks to a simple and smooth partial effect of the covariates;
2. **Keep the model terms additive**, so that the treatment effect remains the LATE, and does not become conditional on covariates (CATE); and to avoid adding a jump at the cutoff.
3. The above implies that there be no interactions with the treatment indicator, nor with the running variable. Doing any of these may break continuity and invalidate our RDD design.

Our target model may look like this:

\begin{equation}
Y_i = \alpha + \tau D_i + f(X_i – c) + \beta^\top Z_i + \varepsilon_i
\end{equation}

For letting the covariates interact with the treatment indicator, the sort of model we want to avoid looks like this:

\begin{equation}
Y_i = \alpha + \tau D_i + f(X_i – c) + \beta^\top (Z_i \cdot D_i) + \varepsilon_i
\end{equation}

Now, let's distinguish between two ways of practically including covariates:

1. **Direct inclusion**: Add them directly to the outcome model alongside the treatment and running variable.
2. **Residualisation**: First regress the outcome on the covariates, then use the residuals in the RDD.

We'll use residualisation in our case. It's an effective way reduce noise, produces cleaner visualisations, and protects the strategic value of the data.

The snippet below defines the outcome de-noising model and computes the residualised outcome, `click_res`. The idea is simple: once we strip out the variance explained by the covariates, what remains is a less noisy version of our outcome variable—at least in theory. Less noise means more accuracy.

In practice, though, the residualisation barely moved the needle this time. We can see that by checking the change in standard deviation:

`SD(click_res) / SD(click) - 1` gives us about -3%, which is small practically speaking.

```r
# denoising clicks
mod_outcome_model <- lm(click ~ l1 + organic + boosted,
                        data = df_listing_level)

df_listing_level$click_res <- residuals(mod_outcome_model)

# the impact on variance is limited: ~ -3%
sd(df_listing_level$click_res) / sd(df_listing_level$click) - 1
```

Even though the denoising didn't have much effect, we're still in a good spot. The original outcome variable already has low conditional variance, and patterns around the cutoff are visible to the naked eye, as we can see below.

![visible jump](visible_jump.png)
_On the x-axis: ranks relative to the page end (30 positions on one page), and on the y-axis: the residualised average click through._

We move on to a few other modelling decisions that generally have a bigger impact: choosing between parametric and non-parametric RDD, the polynomial degree and the bandwidth parameter (h).

### Modelling choices in RDD
#### Parametric vs non-parametric RDD
You might wonder why we even have to choose between parametric and non-parametric RDD. The answer lies in how each approach trades off bias and variance in estimating the treatment effect.

Choosing **parametric RDD** is essentially choosing to reduce variance. It assumes a specific functional form for the relationship between the outcome and the running variable, 𝔼[𝑌 ∣ 𝑋], and fits that model across the entire dataset. The treatment effect is captured as a discrete jump in an otherwise continuous function. The typical form looks like this:

\begin{equation}
Y = \beta_0 + \beta_1 D + \beta_2 X + \beta_3 D \cdot X + \varepsilon
\end{equation}

**Non-parametric RDD**, on the other hand, is about reducing bias. It avoids strong assumptions about the global relationship between Y and X and instead estimates the outcome function separately on either side of the cutoff. This flexibility allows the model to more accurately capture what's happening right around the threshold. The non-parametric estimator is:

\begin{equation}
\tau = \lim_{x \downarrow c} \mathbb{E}[Y \mid X = x] – \lim_{x \uparrow c} \mathbb{E}[Y \mid X = x]
\end{equation}

So, which should you choose? Honestly, it can feel arbitrary. And that's okay. This is the first in a series of judgement calls that practitioners often call the fun part of RDD. It's where modelling becomes as much an art as it is a science.

I'll walk through how I approach that choice. But first, let's look at two key tuning parameters (especially for non-parametric RDD) that will guide our final decision: the polynomial degree and the bandwidth, h.

#### Polynomial degree
The relationship between outcome and the running variable can take many forms, and capturing its true shape is crucial for estimating the causal effect accurately. If you're lucky, everything is linear and there is no need to think of polynomials — If you're a realist, then you probably want to learn how they can serve you in the process.

In selecting the right polynomial degree, the goal is to reduce bias, without inflating the variance of the estimator. So we want to allow for flexibility, but we don't want to do it more than necessary. Take the examples in the image below: with an outcome of low enough variance, the linear form naturally invites the eyes to estimate the outcome at the cutoff. But the estimate becomes biased with only a slightly more complex form, if we enforce a linear shape in the model. Insisting on a linear form in such a complex case is like fitting your feet into a glove: It kind of works, but it's very ugly.

Instead, we give the model more degrees of freedom with a higher-degree polynomial, and estimate the expected outcome $\tau = \lim_{x \downarrow c} \mathbb{E}[Y \mid X = x] – \lim_{x \uparrow c} \mathbb{E}[Y \mid X = x]$, with lower bias.

![complex and simple](RDD_-_form%202.png)
_the relationship between the outcome and running variable can be simple and predictable, or take on a more complex shape that's more erratic inherently. Getting complex forms right may be harder — it requires high model fidelity, and failing to do so may introduce bias._

#### The bandwidth parameter: h
Working with polynomials in the way that's described above does not come free of worries. Two things are required and pose a challenge at the same time:

1. we need to get the modelling right for entire range, and;
2. the entire range should be relevant for the task at hand, which is estimating $\tau = \lim_{x \downarrow c} \mathbb{E}[Y \mid X = x] – \lim_{x \uparrow c} \mathbb{E}[Y \mid X = x]$

Only then we reduce bias as intended; If one of these two is not the case, we risk adding more of it.

The thing is that modelling the entire range properly is more difficult than modelling a smaller range, specially if the form is complex. So, it's easier to make mistakes. Moreover, the entire range is almost certain not to be relevant to estimate the causal effect — the "local" in LATE gives it away. How do we work around this?

Enter the bandwidth parameter, h. The bandwidth parameters aids the model in leveraging data that is closer to the cutoff, dropping the global data idea, and bringing it back to the local scope RDD estimates the effect for. It does so by weighting the data by some function $\mathbb{w}(X)$ so that more weight is given to entries near the cutoff, and less to the entries further away.

For example, with h=10, the model considers the range of total length 20; 10 on each side of the cutoff.

The effective weight depends on the function, $\mathbb{w}$. A bandwidth function that has a hard-boundary behaviour is called a square, or uniform, kernel. Think of it as a function that gives weights 1 when the data is within bandwidth, and 0 otherwise. The gaussian and triangular kernels are two other frequently used kernels by practitioners. The key difference is that these behave less abruptly in weighting of the entries, compared to the square kernel. The image below visualises the behaviour of the three kernels functions.

![Kernels](DAG_-_Fork%203.png)
_Three weighting functions visualised. The y-axis represents the weight. The square kernel acts as a hard-cutoff as to which entries it allows to be seen by the model. The triangular and gaussian functions behave more smoothly with respect to this._

#### Everything put together: non- vs. parametric RDD, polynomial degree and bandwidth

To me, choosing the final model boils down to the question: what is the simplest model that does the good job? Indeed — the principle of Occam's razor never goes out of fashion. In practice, this means:

1. **Non- vs. Parametric**: is the functional form simple on both sides of the cutoff? Then a single fit, pooling data from both sides will do. Otherwise, nonparametric RDD adds the flexibility that is needed to embrace two different dynamics on either side of the cutoff.
2. **Polynomial degree**: when the function is complex, I opt-in for higher degrees to follow the trend better flexibly.
3. **Bandwidth**: if just picked a high polynomial degree, then I will let h be larger too. Otherwise, lower values for h often go well with lower degrees of polynomials in my experience*, **.

\* This brings us to the generally accepted recommendation in the literature: keep the polynomial degree lower than 3. In most use cases 2 works well enough. Just make sure you pick mindfully.

** Also, note that h fits especially well in the non-parametric mentality; I see these two choices as co-dependent.

Back to the listing position scenario. This is the final model to me:


```r
# modelling the residuals of the outcome (de-noised)
mod_rdd <- lm(click_res ~ D + ad_position_idx,
              weight = triangular_kernel(x = ad_position_idx, c = 0, h = 10),  # this is h
              data = df_listing_level)
```


#### Interpreting RDD results
Let's look at the model output. The image below shows us the model summary. If you're familiar with that, it all will come down to interpreting the parameters.

The first thing to look at is that treated listings have ~1% point higher probability of being clicked, than untreated listings. To put that in perspective, that's a +20% change if the click rate of the control is 5%, and ~ +1% increase if the control is 80%. When it comes to practical significance of this causal effect, these two uplifts are day and night. I'll leave this open-ended with a few questions to take home: when would you and your team label this impact as an opportunity to jump on? What other data/answers do we need to declare this track worthy of following?

The remainder of the parameters don't really add much to the interpretation of the causal effect. But let's go over them quickly, nonetheless. The second estimate (x) is that of the slope below cutoff slope; the third one, D x (𝑥), is the additional [negative] points added to the previous slope to reflect the slope above the cutoff; Finally, the intercept is the average for the units right below the cutoff. Because our outcome variable is residualised, the value -0.012 is the demeaned outcome; it no longer is on the scale of the original outcome.

![results](img.png)

### Different choices, different models
I've put this image together to show a collection of other possible models, had we made different choices in bandwidth, polynomial degree, and parametric-versus-not. Although hardly any of these models would have put the decision maker on a totally wrong path in this particular dataset, each model comes with its bias and variance properties. This does colour our confidence of the estimate.
![rdd models](rdd_models.png)

### Placebo testing
In any causal inference method, the identification assumption is everything. One thing is off, and the entire analysis crumbles. We can pretend everything is alright, or we put our methods to the test ourselves (believe me, it's better when you break your own analysis before it goes out there)

Placebo testing is one way to corroborate the results. Placebo testing checks the validity of results by using a setup identical to the real one, minus the actual treatment. If we still see an effect, it signals a flawed design — continuity can't be assumed, and causal effects can't be identified.

Good for us, we have a placebo group. The 30-listing page cut only exists on the desktop version of the platform. On mobile, infinite scroll makes it one long page; no pagination, no page jump. So the effect of "going to the next page" shouldn't appear, and it doesn't.

I don't think we need to do much inference. The graph below already tells us the entire story: without pages, going from the 30th position to the 31st is not different from going from any other position to the next. More importantly, the function is smooth at the cutoff. This finding adds a great deal of credibility to our analysis by showcasing that continuity holds in this placebo group.
![placebo](placebo_rdd_real.png)

The placebo test is one of the strongest checks in an RDD. It tests the [continuity assumption](/posts/Regression-Discontinuity-Design-How-It-Works-and-When-to-Use-It/#the-continuity-assumption-and-parallel-worlds) almost directly, by treating the placebo group as a stand-in for the counterfactual.

Of course, this relies on a new assumption: that the placebo group is valid; that it is a sufficiently good counterfactual. So the test is powerful only if that assumption is more credible than assuming continuity without evidence.

Which means that we need to be open to the possibility that there is no proper placebo group. How do we stress-test our design then?

### No-manipulation and the density continuity test
Quick recap. There are two related sources of confounding and hence to violating the continuity assumption:

1. direct confounding from a third variable at the cutoff, and;
2. manipulation of the running variable

The first can't be tested directly (except with a placebo test). The second can.

If units can shift their running variable, they self-select into treatment. The comparison stops being fair: we're now comparing manipulators to those who couldn't or didn't. That self-selection becomes a confounder, if it also affects the outcome.

For instance, students who did not make the cut for a scholarship, but go on to effectively smooth-talk their institution into letting them pass with a higher score. That silver tongue can also help them getting better salaries, and act as confounder when we study the effect of scholarships on future income.

![density chain](img_1.png)
_In DAG form, running variable manipulation causes selection bias, which in turn makes that the continuity assumption doesn't longer hold. If we know that continuity holds, then there is no need to test for selection bias by manipulation. But when we cannot (because there is no good placebo group), then at least we can try to test if there is manipulation._

So, what are the signs that we're in such scenario? An unexpectedly high number of units just above the cutoff, and a dip just below (or vice versa). We can see this as another continuity question, but this time in terms of the density of the samples.

While we can't test the continuity of the potential outcomes directly, we can test the continuity of the density of the running variable at the cutoff. The McCrary test is the standard tool for this, exactly testing:

\begin{equation}
H_0: \lim_{x \to c^-} f(x) = \lim_{x \to c^+} f(x) \quad \text{(No manipulation)}
\end{equation}

\begin{equation}
H_A: \lim_{x \to c^-} f(x) \neq \lim_{x \to c^+} f(x) \quad \text{(Manipulation)}
\end{equation}

where $f(x)$ is the density function of the running variable. If $f(x)$ jumps at x=c, it suggests that units have sorted themselves just above or below the cutoff — violating the assumption that the running variable was not manipulable at that margin.

The internals of this test is something for a different post, because luckily we can rely on rdrobust::rddensity to run this test, off-the-shelf.

```r
require(rddensity)
density_check_obj <- rddensity(X = df_listing_level$ad_position_idx,
                               c = 0)
summary(density_check_obj)

# for the plot below
rdplotdensity(density_check_obj, X = df_listing_level$ad_position_idx)
```

![rdd_density.png](rdd_density.png)
_A visual representation of the McCrary test._

The test shows marginal evidence of a discontinuity in the density of the running variable (T = 1.77, p = 0.077). Binomial counts are unbalanced across the cutoff, suggesting fewer observations just below the threshold.

Usually, this is a red flag as it may pose a thread to the continuity assumption. This time however, we know that continuity actually holds (see placebo test).

Moreover, ranking is done by the algorithm: sellers have no means to manipulate the rank of their listings at all. That's something we know by design.

Hence, a more plausible explanation is that the discontinuity in the density is driven by platform-side impression logging (not ranking), or my own filtering in the SQL query (which is elaborate, and missing values on the filter variables are not uncommon).

### Inference
The results will do this time around. But Calonico, Cattaneo, and Titiunik (2014) highlight a few issues with OLS RDD estimates like ours. Specifically, about 1) the bias in estimating the expected outcome at the cutoff, that no longer is really at the cutoff when we take samples further away from it, and 2) the bandwidth-induced uncertainty that is left out of the model (as h is treated as a hyperparameter, not a model parameter).

Their methods are implemented in `rdrobust`, an R and Stata package. I recommend using that software in analyses that are about driving real-life decisions.

### Analysis recap
We looked at how a listing's spot in the search results affects how often it gets clicked. By focusing on the cutoff between the first and second page, we found a clear (though modest) causal effect: listings at the top of page two got more clicks than those stuck at the bottom of page one. A placebo test backed this up—on mobile, where there's infinite scroll and no real "pages," the effect disappears. That gives us more confidence in the result. Bottom line: where a listing shows up matters, and prioritising top positions could boost engagement and create new commercial possibilities.

But before we run with it, a couple of important caveats.

First, our result is local—it only tells us what happens near the page-two cutoff. We don't know if the same effect holds at the top of page one, which probably signals even more value to users. So this might be a lower-bound estimate.

Second, volume matters. The first page gets a lot more eyeballs. So even if a top slot on page two gets more clicks per view, a lower spot on page one might still win overall.

## Conclusion
In this second part, we took RDD from theory to practice: identifying the running variable, cutoff, and outcome in a real marketplace setting, making deliberate modelling choices, and stress-testing the results with placebo and density tests. If you want to revisit the foundations, head back to [Part 1](/posts/Regression-Discontinuity-Design-How-It-Works-and-When-to-Use-It/).

If you want to read more, I compiled a small list of resources:

- [Causal Inference Mixtape](https://mixtape.scunning.com/): for an extensive read on RDD and more
- [Causal Inference: A Statistical Learning Approach](https://web.stanford.edu/~swager/causal_inf_book.pdf): formal and technically to the point
- and of course our trusty Wikipedia (actually great to get started)

Also check out the reference section below for some deep-reads.

> You can stay up to date with my writing by following me
> on [Medium](https://medium.com/@alejandroalvarezprez/subscribe), or just visiting here often 👍
{: .prompt-info}
