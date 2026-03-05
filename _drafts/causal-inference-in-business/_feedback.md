# Feedback: Understanding causal quantities and their meaning to your problem

**Stage:** Draft
**Date:** 2026-01-26

---

## Structure

### Two articles fighting for space

Your title promises "understanding causal quantities and their meaning to your problem" but the article barely touches estimands. You have two articles in here:
- **Article A:** A framework for aligning business problems → questions → insights (what most of the prose covers)
- **Article B:** A practical guide to ATE, ATT, LATE, ITT and when each matters (what the outline notes at 254-286 are trying to be)

The Part 1 / Part 2 split you mention (line 31) isn't just scope management; these are fundamentally different articles. Part 1 is conceptual/strategic; Part 2 is technical.

### Current arc mapping

1. Hook/intro (1-47) — solid
2. Problem hierarchies + "the recipe" (49-98) — tangent territory
3. The right question (100-118) — mostly notes, one paragraph
4. Business vs analytical question (121-186) — strongest section
5. Results vs insights (187-226) — drifts into tangents
6. Causal estimands (227-229) — two sentences, then stops
7. From question to answer (231-317) — raw outline, not prose

---

## Cut These (Conciseness)

### ~~1. Lines 63-98 ("Finding the right problem: the recipe")~~ — REVISED: keep, tighten

Previously flagged as a product-process tangent, but on closer reading this section makes a distinct argument: causal inference should be applied *before* A/B testing, at the problem discovery stage. The two steps (test the causal chain; prioritize by causal leverage) and the A/B-comes-too-late framing (line 75) are the article's thesis in action. No other section covers this idea. **Keep, but tighten** — the section is long for its payoff. The three bold subsections (lines 79, 81, 90) could each lose a paragraph of setup.

### 2. Lines 209-226 (correlation insights → prescriptive analytics history) — REVISED: surgical cut

Two things are happening here:
- **Lines 209-214 (keep, tighten):** The true-positive/true-negative framing of organizational causal maturity is a distinct idea. Organizations recognize causal claims better than they spot non-causal claims disguised as causal. That's perspective, not filler. The prose is rough; tighten it.
- **Lines 220-224 (cut):** The prescriptive analytics history and consulting firms detour is a genuine tangent. It doesn't serve the argument. Cut.

### 3. Lines 169-185 (collapsible note) — duplicate, delete

This duplicates lines 131-133 verbatim. Delete.

### 4. Lines 231-317 (IV example outline) — Part 2 material, relocate

This is Part 2 material in raw form. Remove from this draft entirely. Develop it separately.

### 5. Lines 102-111 (aside with bullet notes) — convert or delete

Convert to prose or delete. These are thinking-out-loud notes, not content.

---

## Add Intuition Here (Accessibility)

### 1. "Causal estimands, explained" (lines 227-229) — section is 2 sentences

Your title promises to explain causal quantities. Where's the intuitive walkthrough of ATE vs ATT vs LATE vs ITT? You list them at line 26 but never deliver.

### 2. Lines 237-242 — five technical scenarios dumped cold

> "IV or RDD, where the estimand reflects the local treatment effect"
> "IPWS with inadequate weights... absent positivity"

Your target reader (senior data scientist, different specialization) won't follow this without setup. Either explain these terms or remove the list.

### 3. Lines 309-312 — ATT/LATE explanation orphaned at the bottom

This is where you *finally* try to explain ATT and LATE, but it's orphaned at the bottom in what looks like scrap notes. This explanation belongs much earlier, fully developed.

---

## Voice Notes

### Working well

- "Have you ever complained about stakeholders not caring enough about your output? That's this, probably." (line 13) — punchy, relatable
- "Legend has it that if you take away your users' problems, then good things will happen to your business." (line 67) — good voice
- "No McKinsey framework here" (line 117) — honest, human

### Lines 154-158 — tangled sentence structure

> "A valid result, can be argued, is anything that makes statistical sense. But recall that our definition of 'right' is that it has to bring you substantially closer to solving your problem."

Simplify: "A statistically valid result isn't enough; it has to actually help solve the problem."

### Lines 209-219 — preachy tone

The "causal mentality maturity ladder" and "true positive / true negative" framing is clever but buries the point.

---

## What's Working

### 1. The hook (lines 1-13)

Lands the pain point: data scientists who know the methods but struggle to connect them to business problems. Keep this.

### 2. Business vs analytical questions (lines 123-158)

Clear, useful distinction with good examples (pricing). This is your strongest section.

### 3. Results vs insights (lines 189-205)

The 3% retention example is concrete. The "results are output, insights are outcomes" framing sticks. Preserve this.

---

## Word Count Note

At ~4,500 words of prose (excluding placeholders/notes), you're already at the upper edge of your 3,500-5,000 target; and the article isn't complete. The scope decision will determine whether you need to cut aggressively or split explicitly.

---

## To-Do List

### Scope & Structure
- [ ] **Decide: one article or two?** Either rename to "From Business Problems to Analytical Questions" and drop the estimands promise, OR commit to delivering the estimands explanation in this piece
- [ ] If splitting: move lines 231-317 (IV/LATE example) to a separate Part 2 draft
- [ ] If keeping as one: outline where the estimands explanation will live in the arc

### Cuts (Conciseness)
- [ ] Tighten lines 63-98 ("Finding the right problem: the recipe") — the idea earns its place; trim setup in each of the three bold subsections
- [ ] Tighten lines 209-214 (organizational causal maturity asymmetry) — perspective, but rough prose
- [ ] Cut lines 220-224 (prescriptive analytics history tangent)
- [ ] Delete lines 169-185 (duplicate collapsible note)
- [ ] Delete or relocate lines 231-317 (raw outline notes)
- [ ] Convert lines 102-111 (aside bullets) to prose or delete

### Accessibility
- [ ] Write the actual "Causal estimands explained" section — intuitive explanation of ATE, ATT, LATE, ITT with examples
- [ ] Either explain IV, RDD, IPWS, positivity (lines 237-242) or remove that list
- [ ] Rescue and develop the ATT/LATE explanation from lines 309-312

### Voice & Polish
- [ ] Simplify lines 154-158 (tangled sentence structure)
- [ ] Tone down lines 209-219 (preachy section)
- [ ] Replace all `[insert...]` and `[image:...]` placeholders with actual content or remove

### Final Pass
- [ ] Re-check word count after cuts (target: 3,500-5,000)
- [ ] Verify arc follows Problem → Theory → Implementation → Reality-check
- [ ] Read aloud for conversational tone
