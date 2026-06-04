---
slug: "Causal-Inference-Is-Different-in-Business"
title: "Causal Inference Is Different in Business"
description: "Three rules I keep coming back to when applying causal inference in product and business settings: start with the problem, skip causal inference when you can, and 80/20 the project itself."
date: 2026-05-26 08:30:00 +0100
categories: [Causal Inference, Practice]
tags: [causal inference, decision making, applied, product, marketplaces]
media_subpath: /assets/images/BPA0003/
toc: true
math: false
image:
  path: cover.jpg
---

Everything you learned about causal inference in academia is true. It's also not enough, and most of us doing applied causal inference experience it.

What's different is the gravity of the decisions that lean on the analysis: not every decision deserves the same level of evidence. Match your rigor and causal inference to the gravity of the decision, or waste resources.

Take product discovery. Before building and shipping, many assumptions need validation at several steps. Aiming to nail each answer with perfect causal inference; for what? Moving up one square on a board of many relevant, even *necessary*, but on their own *insufficient* decisions. The risk is already spread, hedged, over many decisions, thanks to a process that values incremental evidence, learning and iterations.

Simultaneously, causal inference comes with material opportunity cost: the rigour requires delays time-to-impact, while there could have been a project waiting for you where this rigour was actually needed to improve the decision quality (reduce risk, increase reliability)

**Final vs. constructive decisions** is my go-to framing to make this idea simple:

- **Constructive decisions** move you forward in a process. "Should we explore this feature further?", "Is this user problem worth investigating?" Getting it wrong costs you a sprint, maybe two, while getting it right does not change the company, yet.
- **Final decisions** commit resources or change direction, and getting it wrong is expensive or hard to reverse: "*Should we invest $2M in building this out?*" "*Should we kill this product line?*", "*Should we allocate more marketing budget into this or that channel?*"

In tech, the volume and pace of decisions is unparalleled. Sometimes, these are final decisions. But much more frequent are constructive decisions.

As data scientists we are involved in both types, and failing to recognise when we are dealing with one or the other leads to posing the wrong questions or chasing the wrong answers, wasting resources, ultimately.

In this article I want to surface three rules that I keep coming back to when embarking on causal inference projects:

1. Start with the problem, not with the answer
2. If you can solve it easier *without* causal inference, do it
3. Do 80/20 your causal inference project too

Rules rarely sound fun. But these helped me increase my impact by lots, actually.

Let's unpack that.

## Start with the problem, not the answer

Every causal inference project starts with the problem you're trying to solve; not with the identification strategy and the estimator. It's the perfect example of *doing the right thing*, over *doing things right.* Your methods can be on point, but what's the value if you are solving for the wrong thing? Nudge yourself to kick off a project with a crystal clear business problem backing it up, and you'd get 50% of work is done before even starting.

If you're highly technical, chances are you know the anatomy of a causal inference project: from DAG to model, to inference, to sensitivity analysis, and answers.

But do you know the anatomy of problem solving in organisations?

### The problem behind the problem

Big problems get broken down into smaller ones. That's just more workable for a team that needs to find solutions. And it allows us to mobilise multiple teams to solve different part of the bigger (sub) problem. The same goes across roles within *one* team: you're estimating churn drivers; your PM needs that to decide whether to invest in retention or acquisition.

That's the challenge: the problem you, the data scientist, are solving is often not the endgame.

Your problem is nested inside someone else's. Other people, around you and above you, need your answer as one input to their solution. Recognise that dependency, and you can tailor your causal inference to what actually matters upstream. The wins are concrete: tighter alignment on the causal estimand of interest, or quicker discarding of causal inference altogether. Bottom-line: shorter time-to-insight.

One time I was into network theory (Markov Random Fields was what made understand DAGs back in 2018). Everything was a network in my head. So I went to make a network of our internal BI capability usage. All dashboards were nodes and they would have thicker edges between them when they were used by the same users. I calculated all sorts of centrality metrics; I identified influential dashboards: dashboards that brought departments together; and much more. I made an entire story around it, but actions never followed. The issue was that I had never paid attention to the problem my stakeholders were trying to solve. Perhaps I thought the decision was of the *final* type, while it was a *constructive* one all along.  A simple count of dashboard usage could've done the job, but I treated it as a research project.

That was me then. And it wasn't the last time something like that happened. But the lesson learned is to start with the problem, not with the answers.

### The anti-rule: looking at the wrong problems

If you want a quick way to throw away money, then go solve the wrong problems. Not only will the solutions have no material outcome, but also the opportunity cost of not solving the right problem in that time will add up.

So, in being eager to find the problem behind the problem, be critical about whether it's the right one to begin, when you find it.

In that sense, starting with the answers *does* offer the cure. But it goes slightly differently. Ask yourself:

- If we do get these answers, what do we know that we did not know before?
- If we know that, then so-what?

If the answer to the so-what question makes a lot of sense, not only to you, but also to your manager and their manager (presumably), then you're on the right problem.

Magical.

## If you can solve it easier without causal inference, then do it

There's no cookie-cutter causal inference. Methods become canonical because we've mapped their assumptions well; not because using them is mechanical. Every situation can violate those assumptions in its own way, and each one deserves full rigor.

The challenge with that though, is that we can't justify doing so for all of them; resource-wise.

That's when applying causal inference becomes an economical exercise: *how much of the resources shall we put in, so that we reach the desired outcome with some necessary level of confidence?*

Ask yourself that question next time.

Luckily, every analysis needs not to be as rigorous as a full causal inference project to make the return of investment tip over to the positive side.

The alternatives: common sense, domain knowledge, and associative analysis, derive good-enough answers too.

It definitely hurts a bit to say this; principled and rigorous me hates me now. But I've learned that it pays to approach the trade-off as a strategic choice.

Here's an example to bring it home:

The question is: *should we invest further in feature A?*
Now, I can easily flip this around to: *what is the impact of feature A on user acquisition/retention?* (a very common angle to take in a SaaS situation; and a causal question at its heart)

If it's high, then we invest in it, otherwise not.

That word *impact* alone puts me straight into a causal inference mode, because impact ≠ association. But we know that is costly. Is the problem worth it? What's the alternative?

One approach is to understand how *many* users are using this feature at all.
How frequent do they use it, given that they chose to use it?
That indicates how valuable a feature could be. No diff-in-diff, nor IPSW, nor A/B test: but if these answers return negative, would a precise causal inference matter still?

The truth may be in the middle; answers to those question may be more *indicative* than decisive, and the main question may still feel open. But surely, less open than when you started: if those answers ignite deeper research, then the product team is in motion, and likely in the direction. Perhaps more rigorous causal inference follows.

### The anti-rule: skipping causal inference is dangerous

Say, the product team picks up the signals from your analysis and makes some material "improvements" to the feature. The sample size is low and they are short in time, so they skip the A/B test and launch it directly.

Fanatic experimenters lose it at this point. I think that it may very well be the right decision, if somebody did the math and concluded there is more at stakes to experiment, than to not to. Of course I kept the case so generic no one can actually defend either side. That'd go beyond the point.

But then, while the team jumps onto the next sprint, the product management still stresses how important it is to learn *something* from what they launched previously. They still wants to a) get a *sense* of the impact, and b) whether some segments where impacted more or less than others.

You're happy because learnings -> iterations is exactly the mentality you are trying to foster.
But you're also in pain for at least three reasons:

1. **Lack of exchangeability:** you know that the users that went on to use the feature are a highly self-selected set. Contrasting them against non-users. Really?
2. **Interacting effects**: assume that one segment was indeed impacted more than others. Now recall the first point: we are conditioning on highly engaged users. It may be that that segment displayed a higher impact merely because the users were also highly engaged. The same segments may not show that differential impact when we consider lower engaged users. But you can't know. You're working data is skewed towards highly engaged users only.
3. **Collider bias:** in a worse case, conditioning on high engagement may render the relationship between segments and the outcome of interest even negative. The analysis would steer the team to the wrong direction.

## Do 80/20 your causal inference project too

The title is a false friend. I'm not saying half-bake your analysis: when the question demands full rigor, give it. The 80/20 is about where your effort goes *across* a decision, not how deep you drill into the causal piece.

Recall the nested problems idea. Your causal inference project often sits inside a larger business decision, and it rarely is the only dimension that matters. The stakeholder has to weigh cost, timing, strategic fit, reversibility; alongside your estimate. Causal inference is not everything we need to know.

If your causal answer carries 30% of the weight in that decision, treating it like 100% is a waste. Worse: it's a waste with an opportunity cost, because the other 70% sits unanswered.

This is where the final-vs-constructive framing earns its keep. For constructive decisions, spreading effort across dimensions almost always beats drilling into one. For final decisions, the causal dimension often *is* the core, and the math tips the other way.

Rules 1, 2, and 3 overlap but they are not the same. Rule 1 asked whether you're tackling the right *problem*. Rule 2 asked whether you need causal inference at all. Rule 3 assumes you've cleared both. Now the question is: within the project, are you answering the right *questions*, plural, and letting causal inference carry only the weight that's actually on it?

### Ship the decision, not the estimate

A recent project: estimate the effect of a new pricing tier on revenue per user. Instinctively, I reached for the cleanest identification strategy I could deploy. Difference-in-differences with parallel-trends sensitivity, placebo tests, maybe a synth control for good measure. A month's work, easily.

But when I zoomed out, the PM had three open questions, not one:

1. What's the effect on revenue per user? (causal)
2. Are we cannibalising the existing tier? (causal, different outcome)
3. How reversible is this if it tanks? (not causal; an ops and product question)

Spending a month on question 1 would have left 2 and 3 half-answered. The decision needed all three to be approximately right, not one to be precisely right. So: a tighter diff-in-diff on question 1 in two weeks, with explicit caveats, and the remaining time on 2 and 3. The stakeholder walked into the decision meeting with a balanced picture rather than one number and two shrugs.

### The anti-rule: when the causal question *is* the decision

If you 80/20 a causal inference project where the causal estimate is the whole decision, you've hollowed out the analysis.

This is the final-decision scenario. "Should we invest \$2M in this channel?" "Does this treatment cause a meaningful reduction in churn?" When the other dimensions are either already nailed down or genuinely secondary, the causal estimate is not one of many inputs; it is *the* input. Cutting corners there to free up time for work that doesn't change the decision inverts the original rule: now you're misallocating the other way.

The skill is knowing which situation you're in. A quick test: if you can't list three dimensions your stakeholder needs besides your estimate, your causal answer probably *is* the decision. Don't 80/20 that one.

## So, what now?

These rules apply across analytical work, not just causal inference. But causal inference is where they bite hardest. You're trying to learn what a planned experiment would have shown, without running one; the data fights back, a project can easily eat a month, and a month spent on the wrong question stings for a quarter.

Whenever I feel the pull of a clean synth control for a question nobody asked, these are the reminders I tape to my own forehead.

The methods come from studying them. The judgment comes from burning months on projects that never needed them.

Rigor feels good, but impact feels better. Most days, the second one is what you're being paid for.

If one of these saves you a sprint next week, or an argument with a PM, that's already a win; and these wins compound. Rigor shows up when it matters. The rest of your time goes to things that also matter.
