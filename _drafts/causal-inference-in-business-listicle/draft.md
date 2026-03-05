# Causal Inference Is Different in Business

Everything you learned about causal inference in academia is true. It's also not enough, and most of us doing applied causal inference experience it.

What's different is the gravity of the decisions.

The core thread is that not every decision deserves the same level of evidence. Match your rigor and causal inference to the gravity of the decision, or waste resources.

Take product discovery. Before building and shipping, many assumptions need validation at several steps. Aiming to nail each answer with perfect causal inference; for what? Moving up one square on a board of many relevant, even *necessary*, but on their own *insufficient* decisions. The risk is already spread, hedged, over many decisions, thanks to a process that values incremental evidence, learning and iterations.

On the other hand, that causal inference rigour comes with material opportunity cost: it slows the process, delaying time-to-impact, or there could have been a project waiting for you where this rigour was actually needed.

**Final** **vs.** **constructive** **decisions** is my go-to framing to make this idea simple:

- **Constructive** **decisions** move you forward in a process. "Should we explore this feature further?", "Is this user problem worth investigating?" Getting it wrong costs you a sprint, maybe two.
- **Final** **decisions** commit resources or change direction, and getting it wrong is expensive or hard to reverse: "*Should we invest $2M in building this out?*" "*Should we kill this product line?*", "*Should we allocate more marketing budget into this or that channel?*"

In tech, the volume and pace of decisions is unparalleled. Sometimes, these are final decisions. But much more frequent are constructive decisions.

As data scientists we are involved in both types, and failing to recognise when we are dealing with one or the other leads to posing the wrong questions or chasing the wrong answers, wasting resources, ultimately.

In this article I want to surface three rules that I keep coming back to when embarking on causal inference projects:

1. Start with the problem, not with the answer
2. If you can solve it easier *without* causal inference, do it
3. Do 80/20 your causal inference project too

Rules rarely sound fun. But these actually helped me increase my impact by lots.

Let's unpack that.

## Start with the problem, not the answer

If you need to take away one thing from this section, let that be that causal inference starts with the problem you’re trying to solve; not with the identification strategy and the estimator. 

If you're highly technical, chances are you know the anatomy of a causal inference project: from model, to inference, to sensitivity analysis, to answers. But do you know the anatomy of how problem solving works in organisations?

### The problem behind the problem

Big problems get broken down into smaller ones. That's just more workable for a team that needs to find solutions. And it allows us to mobilise multiple teams to solve different part of the bigger (sub) problem. The same goes across roles within *one* team: you're estimating churn drivers; your PM needs that to decide whether to invest in retention or acquisition.

That's the challenge: the problem you as DS are solving is often not the endgame.

Your problem is nested inside someone else's. Other people; around you and above you; need your answer as one input to their solution. Recognise that dependency, and you can tailor your causal inference to what actually matters upstream. The wins are concrete: tighter alignment on the causal estimand of interest, or quicker discarding of causal inference altogether. Bottom-line: shorter time-to-insight.

One time I was into network theory. Everything was a network in my head. So I went to make a network of our internal BI capability usage. All dashboards were nodes and they would have thicker edges between them when they were used by the same users. I calculated all sorts of centrality metrics; I identified influential dashboards: dashboards that brought departments together; and much more. I made an entire story around it, but actions never followed. The issue was that I had never paid attention to the problem my stakeholders were trying to solve. Perhaps I thought the decision was of the *final* type, while it was a *constructive* one all along.  A simple count of dashboard usage could've done the job, but I treated it as a research project.

That was me 8 years ago. And it wasn't the last time something like that happened. But the lesson learned is to start with the problem, not with the answers.

### The anti-rule: looking at the wrong problems

If you want a quick way to throw away money, then go solve the wrong problems. Not only will the solutions have no material outcome, but also the opportunity cost of not solving the right problem in that time will add up.

So, as a data scientist, in being eager to find the problem behind the problem, be critical about whether it's the right one to begin.

In that sense, starting with the answers *does* offer the cure. But it goes slightly differently. Ask yourself:

- If we do get these answers, what do we know that we did not know before?

- If we know that, then so-what? 

Magical. That's how starting with the answers lets you test whether you're concerned with the right problem at all.

## If you can solve it easier without causal inferece, then do it

Causal inference can be time consuming. Each identification strategy requires to have their own set of assumptions met; assumptions that can be broken in multiple ways in different scenarios. So it's hard to make a cookie-cutter of it. Each project requires deep immersion and critical thinking from scratch.

But not every analysis needs to be as rigorous as a full causal inference workflow, not even half of it, to make the return of investment tip over to the positive side. The alternative is lean a bit more on common sense, domain knowlegde and associational analysis to derive good-enough answers to the problem. It definitely hurts a bit to say this; principled me hates me right now. But I've learned that it pays off when you know where and when to invest your rigorousity points.

Here's an example to bring it home: 

The question: *should we invest further in feature A?* 
I can easily flip this question around to: *what is the impact of feature A on user retention?* 
If it's high, then we invest in it, otherwise not. 
That word *impact* alone puts me straight into a causal inference mode, because impact ≠ association.
But we know that is costly. Is the problem worth it? What's the alternative?

One approach is to understand how *many* users are using this feature at all. 
How frequent do they use it, given that they chose to use it? 
That indicates how valuable a feature could be, and signal that we can further invest in this feature.

Answers to those question may be more indicative than decisive. The main question may still feel open. But surely, less open than when you started: if those answers ignite deeper research, then the product team is in motion, and likely in the direction. Perhaps more rigorous causal inference follows.

The point being, causal inference is by far not the most resource-efficient first response to every problem.

### The anti-rule: skipping causal inference is dangerous

Say, the product team picks up the signals from your analysis, and makes some material "improvements" to the feature. The sample size is low and they are short in time, so they skip the A/B test and launch it directly.

That's the first example of when skipping causal inference is dangerous (yes, a controlled test is also causal inference). But there's more.

While the team jumps onto the next sprint, the product management still stresses how important it is to learn something from what they launched previously. They still wants to a) get a sense of the impact, and b) whether some segments where impacted differently. 

You're happy because: learnings -> iterations is exactly the culture you are trying to foster. 
But you're also in pain for at least three reasons:

1. **Lack of exchangability:** you know that the users that went on to use the feature are a highly self-selected set. Contrasting them against non-users. Really?
2. **Effect interactions**: imagine that one segment does react differently. It may be that users in that segment who *also* are highly engaged, generate a differential response. The same segments may not show that difference when lower engaged. But you can't know.
3. **Collider bias:** in a worse case, conditioning on high engagement may render the relationship between segments and the outcome of interest even negative. The analysis would steer the team to the wrong direction.

<!--[insert image displaying the collider bias - drawn]-->

## Do 80/20 your causal inference project too

