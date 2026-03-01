# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Jekyll blog (Chirpy theme v7.2+) for long-form technical posts about causal inference, experimentation, and machine learning applied to marketplaces. Deployed to GitHub Pages via GitHub Actions on push to `main`.

## Development Commands

```bash
# Local dev server with live reload
bash tools/run.sh

# Production build + htmlproofer test
bash tools/test.sh

# Install dependencies (first time or after Gemfile changes)
bundle install
```

The CI pipeline (`.github/workflows/pages-deploy.yml`) runs `bundle exec jekyll b` then `htmlproofer` with `--disable-external`. Ruby 3.3.

## Site Architecture

- **Theme**: `jekyll-theme-chirpy` (gem-based; no local `_layouts/` or `_includes/`)
- **Posts**: `_posts/` with naming `YYYY-MM-DD-BPAnnnn-Title-Slug.md`
- **Drafts**: `_drafts/` organized in subdirectories per topic. Finished drafts move to `_drafts/finished/` before promotion to `_posts/`
- **Tabs**: `_tabs/` for sidebar navigation (about, archives, categories, coming soon). Hidden tabs live in `_hidden_tabs/`
- **Images**: `assets/images/BPAnnnn/` per post. Posts reference them via `media_subpath` in front matter
- **Data**: `_data/contact.yml` (sidebar links), `_data/share.yml` (post sharing buttons)
- **Plugin**: `_plugins/posts-lastmod-hook.rb` auto-sets `last_modified_at` from git history
- **Config**: `_config.yml` has Giscus comments, Google Analytics, PWA enabled

## Post Conventions

Front matter template:
```yaml
---
slug: "Title-Slug"
title: "Full Title"
description: "One-line description"
date: YYYY-MM-DD 08:30:00 +0100
categories: [Category1, Category2]
tags: [lowercase, multi word tags]
media_subpath: /assets/images/BPAnnnn/
toc: true
math: true
image:
  path: cover-image.png
---
```

Post IDs follow `BPA0001`, `BPA0002`, etc. Tags are always lowercase. Categories max two levels: `[Top, Sub]`.

Optional front matter: `pin: true` (stick to homepage), `mermaid: true` (diagrams), `render_with_liquid: false` (if post contains `{% %}` literals).

### Chirpy Markdown Features

**Images:**
- Light/dark variants: `![alt](img_light.png){: .light }` and `![alt](img_dark.png){: .dark }`
- Sizing: `![alt](img.png){: w="700" h="400" }`
- Shadow: `{: .shadow }` (good for screenshots)
- Position: `{: .normal }`, `{: .left }`, `{: .right }`
- LQIP placeholder: `{: lqip="/path/to/lqip" }`
- Caption: add `_italicized text_` on the line below the image
- Preview image should be 1200x630 (1.91:1 aspect ratio)

**Math** (requires `math: true`):
- Block: `$$ ... $$` with blank lines above and below
- Inline: `$ ... $`
- Equation refs: `\label{eq:name}` and `\eqref{eq:name}`
- In lists, escape as `\$$ ... $$`

**Mermaid diagrams** (requires `mermaid: true`):
````
```mermaid
graph LR
  A --> B
```
````

**Prompts/callouts:**
```
> Content here
{: .prompt-tip }    # also: .prompt-info, .prompt-warning, .prompt-danger
```

**Code blocks:**
- Filename label: `{: file="path/to/file" }`
- Hide line numbers: `{: .nolineno }`
- Liquid code: wrap with `{% raw %}...{% endraw %}`

**Filepath highlight:** `` `/path/to/file`{: .filepath} ``

**Embeds:**
- YouTube: `{% include embed/youtube.html id='VIDEO_ID' %}`
- Video file: `{% include embed/video.html src='URL' %}`
- Audio file: `{% include embed/audio.html src='URL' %}`

## Available Tools

### `/coach-text` Skill
Invoke with `/coach-text` to get structured feedback on drafts. Accepts optional stage argument:
- `/coach-text outline` — Structure viability, scope, hook/payoff
- `/coach-text draft` — Full arc analysis, tangent flagging, accessibility
- `/coach-text polish` — Sentence-level clarity, transitions, final cuts

If no stage specified, auto-detects based on content.

### `writing-coach` Agent
The `writing-coach` agent (in `.claude/agents/`) provides deep writing analysis. It's invoked automatically by the `/coach-text` skill. Has access to Read, Glob, Grep tools.

### When to Use External Agents
- **Methodology review**: Invoke `stats-econometrics-advisor` for statistical/methodological claims
- **Business framing**: Invoke `business-consultant` for stakeholder communication
- **Slide creation**: Invoke `slide-deck-architect` if turning content into presentations

---

# Writing Style Guide

## Voice & Expectations

I write long-form technical blog posts about causal inference, experimentation, and machine learning; particularly applied to marketplaces and real-world business problems.

### Voice & Tone
- **Conversational yet rigorous**: I use first person ("I've found...", "I dare to say") while maintaining technical precision
- **Practitioner-oriented**: I open with relatable scenarios ("You're an avid data scientist...")
- **Honest about limitations**: I always acknowledge tradeoffs, edge cases, and when methods don't work

### Structure Pattern
My posts follow this arc:
1. **Problem** — Hook with a relatable challenge
2. **Theory** — Build conceptual foundation (intuition before equations)
3. **Implementation** — Show how it works with real examples
4. **Reality-check** — Acknowledge limitations, caveats, when it fails

### Math/Intuition Balance
- Equations come *after* conceptual grounding
- Every formula gets plain-language explanation of what each term does
- Concrete examples (seller listings, marketplace scenarios) before abstract notation

### Audience
Data scientists and analysts who want:
- Rigorous understanding of methods
- Real-world applicability
- Honest assessment of tradeoffs

---

## Coaching Principles

When reviewing my writing, focus on these blind spots:

### 1. Conciseness (Primary)
- **Distinguish tangents from texture** — My writing is a coffee-read; some sentences exist for rhythm, warmth, and personality, not information. That's the style, not a problem.
- **Cut-worthy**: paragraphs that re-explain the same concept in different words; detours the reader can't connect back to the argument; setup longer than its payoff
- **Texture (leave alone)**: rhetorical beats, anecdote closings, personality asides, transitional warmth
- **The test**: does it make the reader want to keep going, or skim? If it keeps them engaged, it stays.
- **Watch for over-explanation** — I tend to explain the same concept multiple ways (this is the real blind spot, not conversational filler)
- **Target length**: 3,500-5,000 words is ideal; 8,000+ means something should be split or cut

### 2. Structure & Flow
- **Check the narrative arc** — Does it follow Problem -> Theory -> Implementation -> Reality-check?
- **"So what?" test** — Every section should have a clear purpose; if unclear, flag it
- **Transitions** — Are connections between ideas explicit?

### 3. Accessibility
- **Math without intuition is a red flag** — Every equation needs conceptual setup
- **Watch the depth curve** — Am I going too deep too fast?
- **Test: Could a senior data scientist with different specialization follow this?**

### 4. Voice Check
- Is it conversational yet rigorous?
- Does the personality come through? ("I've found...", "let's uncover why...")
- Is there honesty about uncertainty and limitations?

---

## Stage-Specific Guidance

### Outline Stage
Focus on:
- Does the structure make sense?
- Is the scope right? (not too narrow, not too ambitious)
- What's the hook? What's the payoff?
- Is there a clear "so what?" for the reader?

### Draft Stage
Focus on:
- Is the arc working? Where does momentum stall?
- Flag true tangents and over-explanation, but respect conversational texture
- Where's math without intuition?
- Are examples concrete and relatable?

### Polish Stage
Focus on:
- Sentence-level clarity
- Transition smoothness
- Tone consistency
- Final conciseness pass (what can still be cut?)
