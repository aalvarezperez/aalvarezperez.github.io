---
name: coach-text
description: Provide structured writing feedback on drafts at any stage. Use when reviewing blog posts, chapters, or technical writing. Accepts optional stage argument.
---

# Text Coaching Skill

Provide feedback on the text, tailored to the stage and Alejandro's identified blind spots.

## Determine Stage

If an argument is provided (`outline`, `draft`, or `polish`), use that stage. Otherwise, auto-detect:
- **Outline**: Bullet points, headers without prose, structural sketch
- **Draft**: Full prose but rough, may have TODOs or placeholders
- **Polish**: Near-complete, focus on refinement

---

## Feedback Framework

### 1. Structure Check
- Does it follow the arc: **Problem → Theory → Implementation → Reality-check**?
- Map the current structure and identify gaps or misordering
- Apply the "So what?" test to each section
- Flag sections with unclear purpose

### 2. Conciseness Audit (Primary Blind Spot)

**Important: distinguish tangents, texture, and perspective.** This writing is meant to read like a coffee-read article; entertaining and informative. Not every sentence carries new information, and that's by design. Classify before flagging.

**Cut-worthy (flag these):**
- A paragraph that explains the same concept a second time in different words (true over-explanation)
- A section that takes the reader on a detour they can't connect back to the argument
- Setup that's longer than the payoff it introduces

**Texture — leave alone (do NOT flag these):**
- Rhetorical questions that create a beat or shift tone ("And why is this a key rule, you wonder.")
- Anecdote closings that land the point conversationally, even if the point was already implicit
- Asides that show personality ("principled me hates me right now")
- Transitional warmth ("Let me unpack that further")

**Perspective — keep, but may tighten (do NOT flag as cuts):**
- Text after an example that extracts a principle, reframes the takeaway, or adds a conceptual layer the example alone does not convey
- Meta-commentary that shifts from "what happened" to "how to think about it"
- The test: "Does this passage express an idea the preceding text does NOT?" If yes, it is perspective, not redundancy. At most, recommend tightening the wording.

**Verification step before confirming any cut:** Re-read the flagged passage in isolation and ask: "What distinct idea does this add?" If you can name one, downgrade from cut to tighten.

**The engagement test** (applies to all three categories): does this make the reader want to keep going, or does it make them skim? If it keeps them engaged, it stays.

- If over 5,000 words, recommend what to cut or split

### 3. Accessibility Scan
- Find equations/technical content without intuition setup
- Identify where the depth curve is too steep
- Flag jargon that needs explanation
- Test: Would a senior data scientist from a different specialization follow?

### 4. Voice Check
- Is it conversational yet rigorous?
- Does personality come through? ("I've found...", "let's uncover why...")
- Is there honesty about limitations and tradeoffs?

---

## Stage-Specific Focus

### If `outline`:
- Structure viability (does the arc work?)
- Scope assessment (too narrow? too ambitious?)
- Hook and payoff clarity
- Skip sentence-level feedback

### If `draft`:
- Full structure and flow analysis
- Flag true tangents and over-explanation, but respect conversational texture
- Accessibility deep-dive
- Skip fine-grained polish

### If `polish`:
- Sentence-level clarity
- Transition smoothness
- Final conciseness pass
- Tone consistency check

---

## Output Format

```
## Stage: [detected or specified]

## Structure
[Assessment of narrative arc, gaps, misordering]

## Cut These (Conciseness)
[Specific sections/paragraphs to cut or condense, with reasoning. Only flag true tangents and over-explanation; do NOT flag conversational texture like rhetorical beats, anecdote closings, or personality asides.]

## Add Intuition Here (Accessibility)
[Locations where math/technical content lacks setup]

## Voice Notes
[Observations on tone, personality, honesty about limitations]

## What's Working
[2-3 specific strengths to preserve]

## Priority Actions
[Top 3 most impactful changes, in order]
```

---

## Methodology Note

This skill focuses on **writing quality only**. If statistical or methodological claims need review, recommend invoking the `stats-econometrics-advisor` agent separately.
