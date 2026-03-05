# Understanding causal quantities and their meaning to your problem

As a data scientist, you’re in the business of solving problems. Causal inference is one the tools. You feel confident about a technique or two: diff-in-diff, synthetic controls, A/B testing. But how confident do you feel about solving business problems end-to-end? How do you ensure that your analytical question, and causal estimand, is the right one solve the problem your business or product stakeholders are trying to solve?

Causal inference is tightly interwoven with problem-solving in businesses, and understanding *how* is key to consistently bringing value with causal inference. If you can’t read on, and you need to take away one thing from this post, let that be that causal inference is not just the identification strategy and the estimator;  starts with the problem you’re trying to solve.

A few individuals and teams I know who consistently get this right, ask themselves: *what exactly is the business problem? What is the question we need to ask ourselves?* How do we get to that answer; what is the causal estimand? *Can we identify that estimand? Can we not?* 

They step from the problem, all the way down to the numbers, and ensure it’s tight chain.

This doesn’t come without challenges. The cases I’ve seen struggling with this idea, try to retrofit a statistical estimator to business problem. Many data scientists pour all their rigour points onto methods and models, oblivious to the business problem they were actually on. That work is a neat, but mindless statistical ritual; something nice for a blog post, but quite bland for solving a business problem.

Have you ever complained about stakeholders not caring enough about your output? That’s this, probably.

This article is to share with you my perspectives. I’ve accumulated these during many debates  with clever colleagues, and observing organisational hardships in product and business teams. Writing. Writing it should also help me organise them, because … who walks around throwing canned frameworks at problems all the time?

The main point is to keep your causal inference analysis *aligned* with the business problem, so that your insights turn out spot-on to the problem, fit in the timelines, and you increase the odds that it becomes a success-story in your close circles.

If you’re in for the ride, we’ll cover two major links in problem-solving with causal inference:

1. **The link between the problem and the question:**
    1. *What* don’t we know as of now, that would take you closer to having the problem solved?
    
    give the example of creating the right hypothesis before the experiment: this is equivalent to thinking hard not about the setup of the experiment, but whether this experiment is the right one to begin with.
    
    1. What’s the implied causal quantity? **ATE, CATE, LATE, ITT, HTE - what are these anyway?**
2. **The link between the causal inference technique and the question, and the desired output (estimand):**
    1. Identification: how do we retrieve the causal effect that we look for? What are the assumptions, what’s the data plan? Is it feasible at all?
    2. Estimation: what’s the proper method to estimate the effect ultimately?

We’ll focus on problems and questions in this first part of a two-volumes series.

Here’s what you’ll take away:

- The anatomy of business problem solving with analytics, focused on causal inference
- What constitutes to proper business questions and answers
- The difference between a business question and an analytical one
- What a business question and a causal estimand have in common

<aside>
👉
The second part picks things up the question and covers the downstream translation to identification strategy, estimator or technique and the desired output, or causal estimate.

- Recognise common causal estimands and knowing how they differ from one another
- What to do when your causal estimate is not answering the question
</aside>

## From the problems, to questions, to answers

### Problem hierarchies

First, I want to set the stage that I find important in understanding much of what I am writing later: problem-solving in businesses is much like a Russian doll - you open up a problem, and there is another problem, and another one, etc.

Take what will be our running example in this section: a tech business that aims to *increase revenue from 50M to 60M, by the end of the year.* If you look closely, you’ll see the first problem. Namely, that the business is still 10M dollars away from the end goal. 

To effectively solve that problem in a complex, potentially big organisation, leadership doesn’t just tell the business and product teams to come in with a bag of money on the next Monday. Indeed, that would be a single-hit solution, but leadership can’t do that, and other single-hit solutions are rare in mature businesses, and often saturated markets. Instead, the teams are tasked with *discovering* and *solving* smaller sub-problems. That’s how a hierarchy emerges, and how panic breaks out in a product team.

This perspective of *cascading* problems highlights a key example of how causal inference is an indispensable tool in finding the right problem: that of causally connecting problems to higher level outcomes, which I equate to *finding* the right problem.

My best shot at expanding that idea is through the lens of a product team trying to drive user engagement up. 

### Finding and solving the right problem: the recipe

Let me state the obvious first: businesses need to innovate at high velocity. In simpler terms: they need to provide what the markets wants, fast. In product led organisations, that boils down further to: solving problems users have, or did not know they had. Keep this objective top of mind for what comes in this section.

Legend has it that if you take away your users’ problems, then good things will happen to your business. Though, there are a lot of causal assumptions between solving user pain points and your business thriving. So, first, finding the right problem has everything to do with:

1. Testing that causal chain. Then;
2. Prioritising the ones with the strongest causal leverage on the desired business outcomes

[image: user problem → innovation → behavioural change → business outcome]

And my mini thesis here is that these two steps are needed to maximise that innovation velocity.  

In tech, solving user problems often implies building stuff; features, products. Building stuff is costly. And per definition, the outcomes are measured after resources went into building. A/B testing a roll out does the job of measuring the impact of what’s shipped, but at that point the team has already made few decisions that brought them to this point. Those decisions come with an opportunity costs; costs that the team will regret if their A/B test turns out non-significant. 

At this point the team is scratching their heads, and wondering whether they missed the essence of that one user interview. They listened to the user, they heard their needs and problems, and went on to build exactly that. What went wrong?

**Linking the user problem to user behaviour.** Listen to the user, then double check with their behaviour. Identifying user pains/problems at an early stage is best done by interacting the problem landscape through qualitative methods and surveys. But how they *feel* about something is not always related to how they *behave* about something. Invest in *causally* connecting the problem, i.e., a quantitative signal of it, to the preferred user behaviour (purchase, engagement). 

**Rank the problems and pick one which will move the needle most.** Users may have 99 problems, and you’re focusing on a single one. Invest in measuring the impact on engagement across a set of candidate user problems. Then inform the roadmap combining *impact* x *reach* of the problem. 

I hear what you’re thinking: *it’d take a data scientist ages to estimate all these cause-effect relationships. Think about all those things we could have shipped in that time.*

True. That’s why you you have to tune a few variables in this effort:

1. **Focus on what matters:** even to create a shortlist of problems ‘that matter’, you can go about creating a list of problems that ‘*may* matter’; then a shortlist of problems that are viable, and feasible, big (audience wise) enough) And so on. Just make sure that you invest proportional to the believe of it’s impact. This also applies to estimating impact.  
2. **Fine-tune rigour:** not everything has to be a paper at the end of the project. Canonical causal inference is hard in real life, and waiting for the opportunity cannot be a reason to freeze. Do estimate lower and upper bounds, but especially *lower* bounds of impact, to express relevance. I always make sure that I pair it with a level of confidence, and that I raise awareness when the methods differ across tests. That helps the ranking soundness.

**Testing the effectiveness of the solution.** The ultimate piece of evidence lives in production; so test things there. What users feel and what causal inference estimates say are still only the best you can get before the fact. Whether the team really drives outcomes can only be tested in production. 

The good thing is that at this point the team bumped their confidence, incrementally, in that they are solving the right problem. The likelihood of that A/B test to be positive, the chances of the solution being the right one, was about optimal.

> [insert an image with top-problem, driver, and user-problems]
> 

Once you can state that causal chain clearly, you’re ready to translate it into a precise analytical question. And the causal estimand that matches it.

### The right question

<aside>
👉

- while the above sounded like we got end to end, lots happened in between: specially asking questions.
- [what’s a good question-part](https://www.notion.so/Understanding-causal-quantities-and-their-meaning-to-your-problem-2d4b12e9aa1a80798d47f84404bfeda7?pvs=21)
- different stages → different questions (problem discovery, solution discover)
- focus on problem discovery (more room for causal infernce)
    - two questions are important size and impact, the former is easy often. the second can get hard. specially if the rigor level has to be high, and the opportunities to estimate impact are scarse / absent / expensive.
- in asking the impact question 1) connect to the problem, and 2) unveil the estimand behind the question.
</aside>

The question is the right one when answering it contributes substantially to solving the problem - yes, that’s how you dodge bullets. Further, between two questions that seem equally interesting, one that enables tangible *actions*, is better than one that yields an *answer* that is merely a nice-to-know, as by extension the former will get you closer to solving the problem, than the latter. 

(Insert quote from; [https://people.ischool.berkeley.edu/~hal/Papers/how.pdf](https://people.ischool.berkeley.edu/~hal/Papers/how.pdf))

That looks like a rock-solid theorem already, but it also reads more like a Chinese proverb, than a well defined framework. So, I’ll propose a few stepping stones that help me particularly well in finding the right questions and stay aligned to the problem. No mcKinsey framework here: exactly *how* you assemble these bits are degrees of creative freedom that I think no framework should fix, nor you should give away! 

---

## A business question, versus an analytical one

First, let’s look into the distinction between a business and an analytical question.

A business question: *should we lower the price?* … *or, can we price our services better?*

An analytical question: *what’s the price elasticity of demand?* … or similarly: *what’s the impact of a 10% discount on conversion and revenue?*

The difference matters for a few reasons:

1. Smoother communication with non-technical stakeholders. Specially, when they like to dive into analytical rabbit holes, I bring them (and myself) back a step higher, reminding them of the “business question”
2. Establishing a business question first, aids the design of a more streamlined analytical plan, allowing more to-the-point *analytical* questions to follow
3. All of which makes part of a what I call the *design phase* of a causal inference oriented project. A proper sign-off is a leap forward in expectation managing (think timelines, content and format) and communication. Talking “business question” enables all of this, by giving the data scientists an entry to the project managerial conversation.

Business questions are often vague and broad (sometimes deliberately so). These questions are closer to *hypotheses* about (business) value, than *data and user behaviour*. Business questions are the most natural, intuitive, follow-up thoughts to a problem. Take our example. The problem: closing the revenue gap. The business question: can we increase revenue by pricing our services better? The question sets the tone, direction, and high level strategy. At the same time, it leaves a few concepts open, such as *better* and *pricing* - what exactly about pricing: the amounts, the tiers, make it dynamic? For that reason, these questions can hardly be answered directly. There’s where analytical questions step in.

Analytical questions are means-oriented. This type of question translates the concepts in a business question, like: “churn”, “impact”, “better” to measurable quantities. In some way, analytical questions *operationalise* business questions so that the latter can be actually answered with data and user and behaviour. That’s a concept you may be familiar with if your background is in epidemiology, or psychometrics; where the unmeasurable becomes measurable by means of tons of ontology and statisticians working on capturing ‘it’.

> (Put into detail box)
> 

Except, in the industry we are not driven directly by some academic “truth” of what, say, a highly engaged user is. Instead, data scientists in the work bottom-up to arrive at definitions that can jump the hurdle of *measurable business value*; oh wait, another hurdle: *stakeholder friendly*; and another one *delivered by yesterday.*

For good reasons.

This is *how* analytical questions respond best to a business questions, by:

1. Anchoring high-level concepts in primitives of business value (MAU, conversion, 90d retention, LTV);
2. that fit snug into operations (= teams can work with it directly), by being accessible to non-technical stakeholders;
3. And preferably being off-the-shelve to support quick adaptations by the organisation as their objectives and problems change

But that does not mean that analytical questions are the GOAT. Just like analytical questions make business questions *tractable*, analytical questions need business questions to stay *relevant*. So, both matter and should be scrutinised against the working definition of a ‘right question’. Let’s dive into how to do this, next.

First, thinking of the underlying business question behind any causal analysis, is needed to contextualise the results. A valid result, can be argued, is anything that makes statistical sense. But recall that our definition of ‘right’ is that it has to bring you substantially closer to solving your problem. The business question, carrying the essence of the main problem, provides the context to knowing whether the result is actually a good instrument to your problem-solving.

On the other hand, the analytical question is about *defining* the insight that we need to get the answers that matter. This question listens well to the context: the problem, the business questions - and answers with precise user segments in mind, precise instances of user problems, or product, market, or industry events that offer insights into how to act next.

In short, the business question should be scrutinised to ensure it carries an undisturbed link to the problem, while the analytical question should be scrutinised to ensure it designs quantities that respond to business questions with understandable, actionable answers.

> [insert a table overview of questions, what they do, and how they do it best]
> 

> [insert ideal flow]
> 

> Problem -> Business question -> analytical question -> results -> contextualised insights
> 

> [in a collapsable note]
> 
> 
> > You may think at this point: *that’s just what any question would do. Why call it a business question?* For me it’s for a few reasons:
> > 
> 
> > 1. Speaking about a business question enables more smooth communication with non-technical stakeholders. Specially, when they like to dive into analytical rabbit holes, I bring them (and myself) back a step higher reminding them of the “business question”
> > 
> 
> > 2. Establishing a very concrete business question first, aids the design of a more streamlined analytical plan with more to the point *analytical* questions
> > 
> 
> > 3. All of which makes part of a what I call the *design phase* of an analytical, causal inference oriented project. A proper sign-off is a leap forward in expectation managing (think timelines, content and format) and communication. Talking business question enables all of this.
> > 
> 
> > This whole design phase is a bit of a meta-tangent, that belongs to a future post!
> > 

## The right insights (or answers)

One thing to iron out quickly is any confusion around what an insight is, versus a result. These concepts are tightly related but following the line of thinking so far, separating them means breaking down problem-solving one level deeper where it matters. In fact, knowing when you have one but not the other can make the entire difference for how successfully your work is received.

Remember the analytical question? We answer that one with results. *What’s the effect of adopting this feature on 3-month retention?* The result (and answer): 3%. That’s model output, analysis results, that without context can only be checked statistically, but carries no meaning other than that is a positive number, so it must be good?

That result, however, may well be part of the *to-be* *insight* that answers the business question of *how can we simplify the user experience while increasing engagement.*

Namely, quantifying feature impact can open doors to removing, collapsing or simply whitelisting certain features. But it would need that business question to prompt actions (like actually removing a feature) or to making stumbling on that result worthwhile.

Further, that positive retention figure expresses the magnitude of a single dimension to what matters to answering the business question. To proof that point, what does 3% mean if only 1% of the users use it? But what if that 1% are your most valuable users? Does that change anything? In fact, we need to know about much more than how much marginal impact the feature drives; we need to know about the *who*, the *where* and perhaps a bit more about the *why*, too. The bottom line is that a single result rarely answers a business question entirely. It isn’t an insight.

In short, the relationship between results and insights that I posit, highlights a few things:

1. Results respond to analytical questions, while insights respond to business questions
2. **One result may answer a question, but it rarely solves an entire problem at once.** Knowing that you’re not done after pulling the first results forces you to think of how you can turn it into an insight. Which additional transformation does it need, and will it suffice to act alone, or is it the moment to collaborate with another expert (e.g., user researchers)
3. **Results are output, insights are outcomes**, as the latter are action-ready, and not the former

This demarcation seems rather stylistic, at first glance. But I put it out here because it forces the data scientists to think beyond model output, to take the seat of the stakeholder, or partner, and respond to the their need with a fully synthesised insight. That need is decision-making in the light of a problem that needs to be solved.

So, how do we do insights the right way?

The most powerful insights are the one that enable *counterfactual* actions: do X, get Y. Don’t do X and you won’t get Y. I see every decision-maker yearning for this type of insight; thankfully, because good decisions cannot be taken otherwise. But there is one single category of insight that steer teams to quasi-random decision-making; I call them correlation-backed insights.

I am not saying “correlation is not causation”, exactly. I am saying: “Correlation is not causation even if you make it sound like it” - yes, that’s a new headline on the causal inference newspaper.

That’s a relevant nuance, because on the causal mentality maturity ladder, many organisations can tell much better when a claim is causal, provided that it is (true positive), than when it’s not, provided that it’s not (true negative). For instance,

This happens most often in businesses that are yet to mature and fully embrace the causal mindset; beyond A/B testing, that is.

If you are at such place, you can only be called lucky (if you are up for a challenge); the sheer amount of impact that you can generate by introducing causality to the organisation is blinding. These are the main areas that need to bridged

As a practitioner in causal inference in tech businesses I have hit reality many times; causal inference in a fast paced industry is hard. The pressure of delivering insights adds to the already complicated workflow, and to the handling of brittle assumptions that are required for causal inference.

The term *prescriptive analytics* is a term that has been around at least for the time that I have been in the industry. It was popularised in the early 2010’s by a few consulting firms in their strategy decks. This was well before the causal inference / causal ML revolution in tech, that went mainstream - albeit still a niche - around 2018. For most companies prescriptive analytics got the form of predictive modelling. After all, that’s what ML models do, don’t they? They look into the future, and take clever actions. Feed it all the data you have and you can be guaranteed that whatever action the system takes is probably the best one. Add to this the scale at which ML can operate, and say nothing more.

The real meaning behind prescriptive analytics, though, is much like a doctor prescribing a medicine for a given problem. A prescription results from contextualised insights, insights that were further forged to better serve the business question.

In today’s tech landscape, A/B testing is the main manifestation of that causal, or counterfactual, mentality. The most mature product and tech organisation have invested in capabilities to, controllably, learn the consequences of their actions. However, A/B testing is a centrepiece in testing solutions, causal thinking and inference is still largely lacking in earlier steps, like linking the problems to causes, ROI-based prioritisation of problems to tackle and strategic direction setting.

## Causal estimands, explained

A causal estimand tells us something about 1) the **magnitude** of the impact, and 2) over **which part of the population** it’s valid. More than valid; *guaranteed*, given that the necessary assumptions are met. It’s easy to work with magnitudes; everyone working in business has once spun-out a back of the envelope calculation.

## From the question to the answer

The problem on the highest level, is about the transportability of a treatment effect estimate across multiple subgroups in the population. In tech business jargon: estimating the impact of an initiative or event in a given segment, and attributing it to other segments when sizing for a business case, or deciding whether whether and how to iterate on the first roll-out of the idea.

Here are 5 scenarios where this can happen:

1. Experiments where variant assignment does not guarantee that the user was actually treated
2. Retrieving an effect with IV or RDD, where the estimand reflects the local treatment effect - more or less the same flavour as the previous point
3. Use of DiD, or synthetic controls, where the estimate reflects the effect on the treated
4. Use of IPWS with inadequate weights with respect to the estimand in mind, or absent positivity
5. When using parametric estimates with heavy extrapolation where not meaningful (possibly due to also lack of positivity), resulting in a forced ATE, where reality is more like ATT (the effect treated gets forced onto all units)

These are examples that display how central the matter of estimands and estimates is to making decisions at a higher level. Each of the above analyses, are attempts to fetching an answer that will

The problem in short:

1. Take the LATE for ATE and inflate your impact estimates
    1. Consequence: in creating a business case we multiply the impact x size. Our estimate of the impact doesn’t generalise well to the entirety of the size, only a portion - leading to overestimating the overall value of a track.
2. Take the ATE for LATE and minimise the impact of your initiative (treatment effect)
    1. Consequence: ITT will spread the LATE over all users who were meant to be treated. The impact of the change will be diluted. Further, this will happen to larger degrees as the share of adopted of the treatment decreases. And with that the wrong decision can be made: like no further investing, or worse yet investigation.
        1. nuance: you will get the impact on your business right (policy effect; ATE is more meaningful to express impact on the bottom line when extrapolating to the entire user base
        2. Further, this requires an actual ATE estimate. In the situations where this all would happen an ITT is the estimate, rather. It looks like an ATE, except that it’s about the intention, not the treatment.

In this section:

1. Introduce the use case:
    1. **The business problem:** how can we increase user spendings
    2. **Details:**
        1. Product team was tasked to increase user spending
        2. Team came up with a subscription-based program that increases loyalty (more transactions, totalling up to more spendings from users)
        3. The team needs to gauge the potential uplift of this idea if they were to further build it out, and roll it to 100% of the user base. so they experiment (controlled impact estimate) to the generalize the findings to the entire user base (sizing; in the sense of a business case)
        4. **Experiment**
            1. Released program to 50% of users, while the remaining 50% did not get the option.
            2. Findings
                1. about 20% of the users in the B group subscribed
                2. They saw an average spendings increase by 13.5$ for the users that got the subscribe. But in reality; this estimate is flawed and I explain why next.
2. **Why AB testing does not work here: we can randomise assignment, but not adoption.**
    1. If we could do AB testing: assign some users to adopting the program, and some not, everything would be very straightforward: The insights from the test would be the average effect of a counterfactual treatment.
    2. For being counterfactual: if we would roll out the program, then we’d see that type of effect x users in the bottom line of our KPIs.
    3. But the big issue we have with AB testing is that assignment may be random, but adoption isn’t. Adoption is endogenous. After all, subscribing to program is a choice that we can’t enforce with a randomisation mechanism. If you aren’t deep into jargon yet, this is what endogeneity means to your analysis:
        1. if the potential adopters of the program are inherently different than potential non-adopters, then it becomes hard to justify why they would react similarly to a program like the one at hand.
        2. For that reason, learning about the former, may not at all generalise to the latter group — despite that the team followed a randomised design to allocate users to the treatment.
    4. If we stick to vanilla AB testing, then we need to commit to rolling diluted effects that may undermine the effectiveness of the solution to the problem, leading to poor decision-making. If we take the we take the 13.5 as the uplift, we overshoot largely when we extrapolate to the 100% scenario in making the business case, leading to poor decisions, too.
    5. If we go for causal inference, then we recover the actual impact of the program. But, this comes at price: the quantity we estimate may not be valid at all for most of the populations or, in this case, most of the users.
    6. Recap:
        1. our business problem is to increase user spending
        2. The question the team is left with after the test period is: what will the average user spending be if invest in this feature and roll it out fully?
        3. And *your* problem is to answer that question in the face of a million-dollar consequence.
    7. **Highlighting the friction:**
        1. On one hand, if the team extrapolates the 13.5$ to the remaining user base, they will largely overshoot. In reality, most users won’t adopt the program, and if they do, it’s not guaranteed that they will have the same level of increased spending.
        2. On the other hand, the program impact may get attenuated if the team chooses to ignore actual adoption and look at the effect of assignment alone.
    8. How causal inference comes in
        1. This setup is a common case of instrumental variable design
        2. The instrument: assignment. (Explain relevance and exclusion). The treatment really is adopting the program.
        3. We can recover the treatment effect on those who were moved to adopting the program by the change in UI. That’s the local average treatment effect, or LATE

---

read: [https://towardsdatascience.com/itt-vs-late-estimating-causal-effects-with-iv-in-experiments-with-imperfect-compliance-7ca1220fe425/](https://towardsdatascience.com/itt-vs-late-estimating-causal-effects-with-iv-in-experiments-with-imperfect-compliance-7ca1220fe425/)

[https://hdsr.mitpress.mit.edu/pub/9ir6e1j6](https://hdsr.mitpress.mit.edu/pub/9ir6e1j6)

Data Science and Decision Science Skills: Are They Different and Does It Matter? · Issue 7.3, Summer 2025

To get out of the syrupy theory right away, let’s work with a use case; one that’s rooted in e-commerce, product. Imagine that your team is tasked with increasing the

to get the right answers, we need to formulate the right questions. To answer the questions correctly, we need to use the right tools. That sounds indeed like a riddle, but here’s how I break it down in my mind:

Problem

Question

Answer

The best questions are the ones that orchestrate the analytical plan that delivers the most relevant insights. The most relevant insights are those that we need most to solve the problem.

Estimands

Most readers of a causal inference blog may be familiar with A/B testing. It relies on randomisation of the treatment as an identification strategy to retrieve causal effects — the average treatment effect (ATE), more specifically. On the other hand, causal inference techniques are designed around different, creative, strategies to recover causal effects. The most common identification strategies, like: instrumental variables, diff-in-diff, discontinuity designs, and inverse probability weighting, recover effects that are guaranteed only for subsets of the population at hand. For example:

- diff-in-diff yields what we call the average treatment effect on the treated (ATT), which implies that we know nothing what the untreated group, yet.
- Similarly, some forms of instrumental variables, and discontinuity design, yield answers to yet another causal estimand: *local* average treatment effect (LATE), which guarantees validity only for a *focal* group, more generally.

These estimands need to exist, but they also need to be understood profoundly in the face of your problem, and decision-making.

Causal estimands carry two bits of information: 1) how much of Y happens due to the treatment, and 2) for which part of the population is this magnitude valid. Both components are important to solve the problem. Unfortunately, the second one gets overlooked often, leading to poor results when solutions get implemented based on insights from causal analyses.

---