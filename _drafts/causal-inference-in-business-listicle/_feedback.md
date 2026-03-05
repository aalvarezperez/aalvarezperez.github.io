# Feedback — Causal Inference Is Different in Business (Listicle)

## Review: Draft stage (2026-03-05, revision 4)

### Structure

The intro promises three rules. Rule 1 has substance but its anti-rule is empty. Rule 2 is the most developed section. Rule 3 is just a header. No closing. The arc cannot be fully assessed until these are written.

**~~Gravity framing disconnected from rules~~** — RESOLVED. Intro now introduces final vs. constructive decisions as the mechanism, grounded in a product discovery scenario. Still needs threading into each rule (Rules 1 and 3 not yet written).

Current map:
- Intro: stakes + rule list (Problem) — present
- Rule 1: concept + anecdote — present, anti-rule still empty
- Rule 2: concept + example + anti-rule — most developed section
- Rule 3: header only — still empty
- Closing: missing

New observation: Rule 2's anti-rule is the most technically dense part of the post. It sits in the middle without any structural signal that the reader is about to shift gears. That will feel less abrupt once Rule 3 follows, but a brief framing sentence before the numbered list would still help.

### Cut These (Conciseness)

*Note: conciseness flags distinguish true tangents/over-explanation from conversational texture. Rhetorical beats, anecdote closings, and personality asides are part of the style and should be preserved.*

**~~Line 27, second half~~** — RESOLVED. The org design tangent has been rewritten. Now focuses on practical wins (estimand alignment, faster design, shorter time-to-insight). Much tighter.

**~~Lines 55-57~~** — REVISED. Previously flagged as over-explanation, but on closer reading these add a distinct idea: how to *think about* the answers from a simpler approach (indicative not decisive, momentum over certainty). That's perspective, not restatement. The idea earns its place. Minor tightening opportunity: four sentences could be two without losing the point.

**Line 53** — "That indicates how valuable a feature could be, and signal that we can further invest in this feature." This re-states what lines 51-52 already imply. Cut it.

**Lines 25-26 (minor)** — "increasing efficiency; less walking on each other's toes" is redundant. The idiom does the work on its own. Trim to: "...and it allows multiple teams to tackle different parts without walking on each other's toes."

### Add Intuition Here (Accessibility)

All three flags from the previous review remain unaddressed:

1. **Exchangeability (item 1)** — The term is used but never defined. One sentence: what it means, why self-selection breaks it.
2. **Effect interactions (item 2)** — The explanation is tangled in subordinate clauses. Break into two sentences: what interaction means, then why a simple segment comparison misses it.
3. **Collider bias (item 3)** — Dropped cold. "Conditioning on high engagement may render the relationship negative" is opaque without explaining *why*. The diagram alone will not be enough; the text must stand on its own.

**New flag:** The three problems escalate in complexity (exchangeability is intuitive, collider bias is not). Add a brief framing sentence before the list: "You'd be facing at least three overlapping problems." Prepares the reader for a technical escalation.

### Voice Notes

**~~Line 3~~** — RESOLVED. Opening sentence rewritten.

**~~Line 18 (was line 7)~~** — MOSTLY RESOLVED. Still slightly bloated ("it happens to be that the sheer volume..."). Suggested final pass: "In tech, the volume and pace of decisions is unparalleled. Most are constructive."

**Lines 62-63 (new)** — "(yes, a controlled test is also causal inference)" does real work but is buried in a parenthetical. Pull it into its own sentence.

**Line 41 (new)** — "rigorousity" is not a standard word. "Rigor" is. Flag in case accidental.

### What's Working

1. **The anti-rule structure** gives the post intellectual honesty. "Here's the rule, now here's when it fails" earns reader trust.
2. **The Feature A example** is clear and well-paced. The question-flip to causal inference mode is a recognizable practitioner move.
3. **The dashboard anecdote** is specific, honest, and illustrative. The strongest personal moment in the draft.

### Priority Actions

1. **Write the missing sections** (Rule 1 anti-rule, Rule 3, closing). The intro made a three-part promise; two parts are missing.
2. **Add one-sentence intuition setup** for each technical concept in Rule 2's anti-rule (exchangeability, effect interactions, collider bias mechanism). This is the most technically exposed part of the post.
3. **Tighten lines 55-57.** The idea is sound (indicative vs decisive, momentum); condense from four sentences to two.

### Methodology Note

The Rule 2 anti-rule makes specific claims about collider bias and exchangeability in post-launch observational analysis. Before finalizing that section, run `stats-econometrics-advisor` to confirm: (a) the collider bias mechanism (conditioning on engagement as a collider) is accurately described, (b) the exchangeability framing is correct, and (c) the effect interactions claim holds.
