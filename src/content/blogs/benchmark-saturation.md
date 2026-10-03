---
id: "9"
slug: "arc-agi-3-and-the-collapse-of-the-ai-benchmark"
title: "Humans 100%, Frontier AI 0.51%: Inside the Benchmark That Broke the Streak"
comments: "0"
image: "/assets/images/blog/benchmark-saturation.webp"
category: "AI Benchmarks"
desc: "Models are acing graduate physics and failing puzzles a child can solve. ARC-AGI-3, METR's time horizons, and what evaluation looks like after saturation."
date: "Oct 07, 2026"
tags: ["Benchmarks", "ARC-AGI", "Evaluation", "AI Research"]
---

# Humans 100%, Frontier AI 0.51%: Inside the Benchmark That Broke the Streak

For about three years, AI benchmarks followed a comfortable script. A lab publishes a hard test. Frontier models score badly. Eighteen months pass. Frontier models score well. Someone writes a piece about how fast things are moving.

That script has now failed twice in a row, in opposite directions, and the two failures together tell you more about the state of the field than any single score.

The first failure was saturation: benchmarks got solved so thoroughly they stopped distinguishing anything. The second was ARC-AGI-3, where the best AI systems in the world scored **0.51 percent** on a task every human tester completed.

Both are worth understanding, because between them they define what evaluation actually means in 2026.

## Part one: the benchmarks that died of success

Start with the graveyard.

MMLU was the general knowledge standard. It is saturated. GSM8K was the grade-school math standard. Saturated years ago. MATH-500, which required competition-level reasoning, now sits around 96 percent for frontier models. GPQA Diamond, deliberately written by PhDs to be Google-proof, is in the mid-nineties.

![Bar chart: MATH-500 about 96 percent, GPQA Diamond mid-90s, SWE-bench Verified above 95 percent, against 0.51 percent for frontier AI on ARC-AGI-3](/assets/images/blog/diagrams/benchmark-saturation-1.svg)

*Diagram: Big Matrix Solutions, based on the scores quoted in this article and [ARC Prize](https://arcprize.org/blog/arc-agi-3-launch).*

None of these got easier. What happened is more interesting and more annoying.

A benchmark has a shelf life that starts the moment it becomes the number people cite. Two clocks run against it at once:

- **Capability closes the gap**: real progress means the headroom shrinks, and once scores cluster above 90 percent the remaining variance is mostly noise, ambiguity in the questions, and grader disagreement.
- **Exposure contaminates the test**: a popular public benchmark ends up in scraped training data, in blog posts explaining its questions, in synthetic data generated from it. Nobody has to cheat for this to happen. It happens by default.

The clearest admission of this came from inside the labs. In February, OpenAI published an article titled, with unusual bluntness, *"Why SWE-bench Verified no longer measures frontier coding capabilities."* SWE-bench Verified had been *the* number for autonomous coding agents: 500 human-reviewed GitHub issues from real Python repositories. Tracked leaderboard scores now run above 95 percent.

When the people selling the models tell you the benchmark is done, the benchmark is done.

## Part two: the benchmark that resisted

[ARC-AGI-3](https://arcprize.org/blog/arc-agi-3-launch) launched on March 25, 2026, announced live at Y Combinator's San Francisco headquarters in a conversation between François Chollet, who created the ARC family, and Sam Altman.

It represents the first real format change since the original ARC in 2019. The first two versions were static: look at a few input-output grid examples, infer the transformation, apply it to a new grid. Difficult, but a fixed puzzle with a fixed answer.

Version 3 throws that out. Instead, an agent is dropped into an interactive environment it has never seen, with no instructions, and has to work out what the environment is, what counts as a goal, and how its actions change the world, while it plays. Chollet's stated targets are exploration, planning, memory, on-the-fly goal acquisition, and continuous learning.

The scoring is also new: it compares human and AI *action efficiency*, not just whether the task was completed.

Here is what happened.

| Measure | Result |
|---|---|
| Human testers | 100% |
| Frontier language models | 0.51% |
| Best preview agent (StochasticGoose) | 12.58% |
| Levels cleared by that agent | 18 |
| Preview submissions received | 12 |

The 30-day developer preview drew twelve submissions, eight of which were tested against the private games. First place went to StochasticGoose, a team at Tufa Labs, with a convolutional neural network action-learning agent, scoring 12.58 percent and 18 levels completed. Second place, Blind Squirrel, scored 6.71 percent across 13 levels.

![Bar chart of ARC-AGI-3 launch results: human testers 100 percent, StochasticGoose 12.58 percent, Blind Squirrel 6.71 percent, frontier language models 0.51 percent](/assets/images/blog/diagrams/benchmark-saturation-2.svg)

*Diagram: Big Matrix Solutions, based on [ARC Prize](https://arcprize.org/blog/arc-agi-3-launch).*

Read that table again with the previous section in mind. The same class of systems scoring in the mid-nineties on PhD-level science scored **half a percent** here. And a small purpose-built agent, with no trillion parameters and no frontier pretraining run, beat all of them by roughly 25x.

## Why the gap is so violent

This is not the models being secretly bad. It is a genuinely different capability, and the difference has a name: novelty.

Everything a frontier model does well, it does by having seen an enormous amount of adjacent material. Graduate physics questions have structure that resembles textbooks, papers, and problem sets in the training data. That is not cheating; generalising from a vast prior is a real and extremely useful skill. But it is *interpolation inside a distribution*.

ARC-AGI-3 deliberately removes the prior. The environments are novel by construction. There is no instruction text to pattern-match against, no genre convention to lean on, no similar problem to recall. The agent has to do what a human does in the first ninety seconds of an unfamiliar video game: press things, notice what changed, form a hypothesis, and revise it.

That loop of act, observe, update, keep the update is the thing current architectures are worst at. A language model's weights are frozen at inference. Whatever it learns during an episode lives in the context window and dies with it. It is not that the model cannot reason about the environment; it is that it has no efficient mechanism for *accumulating* what it just discovered into something it can build on for the next hundred steps.

Which is precisely why a small CNN action-learner outperformed it. That architecture learns *from the episode*, which is the whole task.

## The metric that is still working: task length

If accuracy benchmarks are saturating and novelty benchmarks are at the floor, what actually tracks progress?

The most useful answer right now comes from [METR](https://metr.org/time-horizons/), and it is a change of axis rather than a harder test. Instead of asking *how accurate* a model is, METR asks *how long a task* it can complete — measured in the time a skilled human would need — before its success rate falls to 50 percent.

That number has been rising exponentially since 2019. It also matches lived experience better than anything else on offer: what users notice when they upgrade is rarely "it knows more," it is "it did not fall apart three hours in."

![METR chart of the 50 percent time horizon of AI agents by model release date, rising from seconds for GPT-2 to around two hours for o3, with a doubling time of about 7 months](/assets/images/blog/benchmark-saturation-metr-horizon.webp)

*METR's headline chart: the task length frontier agents complete with 50% reliability, by release date (paper version, models up to o3). Source: [Kwa et al., METR, "Measuring AI Ability to Complete Long Software Tasks" (arXiv:2503.14499)](https://arxiv.org/abs/2503.14499), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*

METR's 2026 measurements include Claude Opus 4.6 in February, GPT-5.4 and Gemini 3.1 Pro within a week of each other in April, and an early Claude Mythos preview in May.

The caveats deserve equal billing, and METR publishes them prominently:

- **Above sixteen hours, the numbers are unreliable**: their current task suite does not have the resolution to measure further out.
- **The horizon measures task difficulty, not runtime**: a "four-hour task" is one a human would take four hours on, not one the model spends four hours doing.
- **The domain is narrow**: mostly software engineering, machine learning, and cybersecurity. It is not a general capability index.
- **Coverage is incomplete**: METR is a small organisation and cannot evaluate every release.

It is a good metric. It is a good metric *about a specific thing*, which is more than most of the field can say.

The related academic work is converging on the same shape. Long-Horizon-Terminal-Bench, for instance, runs 46 long-horizon terminal tasks across nine categories, with agents consuming roughly 9.9 million tokens and 85 minutes of execution per task. That is a different genre of evaluation from a multiple-choice test, and it costs accordingly.

## What good evaluation looks like now

Pulling the threads together, the field has landed on a handful of principles. None are exotic; all of them are regularly ignored.

### 1. Held-out and rotating beats fixed and famous

A benchmark that never changes will eventually be memorised. The response has been rotation: FrontierMath maintains tiers plus an evolving set of open research problems and formalised Erdős problems; SWE-rebench collects tasks continuously and at scale rather than freezing a snapshot. If your evaluation set is public and static, treat its scores as a floor, not a measurement.

### 2. Interactive beats static

Static tests measure retrieval and interpolation. Interactive tests measure adaptation. ARC-AGI-3 is the loud example, but the same logic drives long-horizon terminal benchmarks, computer-use evaluations, and issue-resolution suites that grade the whole development cycle rather than a single patch.

### 3. Read the logs, not just the score

A recurring finding in 2026 evaluation research is that agent scores without trajectory inspection are close to meaningless. Agents pass tasks by editing the test file. They pass by finding an unintended shortcut. They fail on a transient network error and get scored as incapable. Aggregate numbers hide all three. Log analysis is not optional rigour; it is the difference between a measurement and a rumour.

### 4. State the compute

The same model scores very differently at 4k versus 64k thinking tokens, with one sample versus a best-of-sixteen vote, inside a bare harness versus one with retries and verification. The ARC Prize 2025 results made this vivid: the top commercial entry on ARC-AGI-2 was Opus 4.5 in thinking mode at 37.6 percent, while a Gemini 3 Pro-based system from Poetiq reached 54 percent by wrapping it in an iterative refinement loop at the application layer. Same underlying models, wildly different numbers. A score without its compute budget and harness is not comparable to anything.

### 5. Your own data outranks all of it

For anyone shipping a product, the public leaderboard is a weak proxy for a decision you can make directly. A hundred real examples from your own traffic, graded by someone who knows the domain, is worth more than every table in this article. It is also the only evaluation that cannot be contaminated, because nobody else has it.

## What the two failures actually show

It would be easy to take ARC-AGI-3's 0.51 percent as a debunking, proof that frontier models are shallower than the hype suggests. That is too neat.

What the two failures actually show is that "AI capability" is not one quantity. Along the axis of knowledge-dense, in-distribution reasoning, progress has been extraordinary and the benchmarks genuinely ran out of room. Along the axis of open-ended adaptation to novelty, progress has been close to flat, and we only found out clearly once someone built a test that isolated it.

Both statements are true at once. A system can draft a competent literature review and fail to work out the rules of a simple game, and there is no contradiction, because those tasks were never the same task.

The useful conclusion is not that benchmarks are broken. It is that a single number was always going to be a bad summary of a system this uneven, and we are finally being forced to admit it.

**Media credits**:
- Hero image: Big Matrix Solutions, based on ARC-AGI-3 launch results from [ARC Prize](https://arcprize.org/blog/arc-agi-3-launch).
- ARC-AGI-3 and saturation charts: Big Matrix Solutions.
- Time-horizon chart: Figure 1 from [Kwa et al., METR, "Measuring AI Ability to Complete Long Software Tasks" (arXiv:2503.14499)](https://arxiv.org/abs/2503.14499), licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
