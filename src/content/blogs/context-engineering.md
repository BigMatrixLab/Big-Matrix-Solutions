---
id: "37"
slug: "context-engineering-replaced-prompt-engineering"
title: "Prompt Engineering Is Dead. Context Engineering Is the Job Now."
comments: "0"
image: "/assets/images/blog/context-engineering.webp"
category: "Agentic AI"
desc: "When an agent runs for hours, the binding constraint is not the prompt. It is what occupies the window, in what order, and what you throw away."
date: "Dec 10, 2026"
tags: ["Context Engineering", "Agentic AI", "LLM", "Architecture"]
---

# Prompt Engineering Is Dead. Context Engineering Is the Job Now.

Prompt engineering was a real skill for about two years. Knowing that step-by-step reasoning helped, that examples beat descriptions, that role framing shifted tone, that output format needed specifying. All of it genuinely separated people who got good results from people who did not.

Then models got good enough that most of it stopped mattering. Modern models reason step by step without being asked, follow plain instructions, and infer format from context. The clever incantations are largely obsolete, and good riddance.

What replaced it is harder and much less discussed: deciding what goes into the context window, in what order, and what to discard when it fills.

## Why this became the constraint

Single-turn prompting had no context management problem. You wrote a prompt, the model answered, done. The window was mostly empty.

Agentic work inverted this. An agent running for hours accumulates:

- The system instructions and tool definitions
- Every file it read, in full
- Every command it ran and every line of output
- Every intermediate reasoning step
- Every error, retry, and dead end
- Whatever the user said along the way

Within an hour, the majority of the context is material that was useful once and is now noise. And this actively degrades performance rather than merely wasting tokens.

Three mechanisms, all well documented:

**Position sensitivity.** Retrieval accuracy dips for material in the middle of a long context and recovers at both ends. Something important buried at 40 percent depth is at a genuine disadvantage compared to the same fact at the start or end.

**Distraction.** A large volume of loosely-relevant text pulls a model toward wrong answers more reliably than no context at all. Twenty plausible-but-irrelevant files is worse than none.

**Latency and cost.** Prefill grows with prompt length. At extreme lengths, time-to-first-token dominates the entire request, and an unnecessary million tokens costs the same as a necessary one.

So the naive strategy, keep everything because the window is huge, fails. Not dramatically, which is the problem. It fails as gradual quality decay that is easy to attribute to the model.

## The techniques

What actually works, in rough order of impact.

### 1. Structure the prompt so the stable part comes first

The single highest-return change, and it costs nothing.

Every token in your prompt produces key and value tensors. If prompts share a long common prefix (system instructions, tool schemas, a document under discussion) then recomputing that prefix on every request is pure waste. Prefix caching turns a repeated 20,000-token preamble from a per-request cost into a one-time cost.

This requires only that the stable material precede the variable material. Put the system prompt and tool definitions first, the conversation last, and nothing dynamic in between. For agent loops and chat applications this is frequently the largest single saving available, and it needs no model change.

### 2. Compaction

When context approaches its limit, summarise the middle and continue.

Done well, this is the difference between an agent that runs for six hours and one that falls apart at two. Done badly, it discards the one detail the next step needed.

What survives compaction should be chosen deliberately:

- **Keep**: the original task, decisions made and why, constraints discovered, current state, approaches already ruled out.
- **Discard**: full file contents already acted on, successful command output, exploration that led nowhere, superseded reasoning.

The failed-approaches category is the one people drop and should not. An agent that forgets it already tried mocking that dependency will try again, and pay the full exploration cost twice.

### 3. Subagents as context boundaries

Delegate a question to a subagent that investigates in *its own* context and returns a summary.

The value here is not that the subagent is smarter. It is that the search debris stays in the subagent's window. The supervisor gets a two-paragraph conclusion instead of the forty files that produced it. This is the strongest structural argument for multi-agent architecture, and it survives the observation that models have converged in capability, because it was never about capability.

### 4. Retrieve generously, not surgically

Long context changed the economics of retrieval, and the pipeline most teams built in 2024 is now overbuilt.

When only three chunks fit, retrieval precision was load-bearing, hence the elaborate reranking and query-rewriting machinery. Now you can retrieve fifty chunks and let the model sort out relevance. Retrieval needs decent recall; the model handles precision.

That is a real reduction in engineering complexity bought with cheaper tokens. It does have a limit, because fifty chunks of loosely relevant text is the distraction problem, so "generously" is not "unboundedly."

### 5. Externalise durable state

Anything that must survive the session belongs in a file, not in context.

The unglamorous version works remarkably well: a markdown file in the repository holding conventions, architecture notes, and known dead ends, which the agent reads at startup and appends to when it learns something durable. Version-controlled, human-readable, reviewable in a pull request, and deletable when wrong.

Teams have found this beats more sophisticated memory schemes, mostly because when it misbehaves you can open the file and see why.

### 6. Order for recency and salience

Given position sensitivity, put the most important material where the model reads it best: the beginning and the end.

Practically: task and constraints at the start, current state and immediate instruction at the end, accumulated history in the middle where its lower weight matters least. This is a free improvement that costs one decision about assembly order.

![Diagram of a context window as a column: system prompt and tool definitions as a cached stable prefix, task and constraints near the start, accumulated history in the middle where recall is weakest, and current state at the end, with a durable state file and a subagent feeding in from outside](/assets/images/blog/diagrams/context-engineering-1.svg)

*Stable prefix first, important material at both ends, history in the middle where it gets compacted. Diagram: Big Matrix Solutions, based on [Zhang et al., Agentic Context Engineering (arXiv:2510.04618)](https://arxiv.org/abs/2510.04618).*

## A worked example

Concrete, because the techniques are easier to see applied than listed.

An agent is asked to migrate a deprecated API call across a large codebase. Naive execution:

1. Search for usages. 60 files match.
2. Read each file in full to understand the call site.
3. Edit each one.
4. Run the test suite.
5. Fix failures.

By step three the context holds 60 complete files, most of which were needed for one line. By step five, when the interesting work starts, the window is largely occupied by file contents the agent has already acted on and will not consult again. The failures it now needs to reason about are competing for attention with 50,000 tokens of dead material.

The context-engineered version:

1. Search for usages, keeping only the file paths and matching lines, not the files.
2. Group the matches by call pattern. Most of the 60 will fall into three or four shapes.
3. For each shape, read one representative file fully, work out the transformation, and record it as a rule.
4. Apply the rules, reading each file only long enough to edit it, discarding as you go.
5. Run tests with a clean context holding the task, the rules, and the failures.

Same work. The context at step five contains the task, four transformation rules, a list of edited files, and the failures. A few thousand tokens of exactly the relevant material.

The general shape of the improvement is worth extracting: **read narrowly, summarise into rules, discard the source, act from the rules.** That pattern applies well beyond migrations, and it is the difference between an agent that degrades over a long task and one that does not.

## The failure modes

Four, and they are recognisable once named.

**Context rot.** Gradual accumulation of stale material until the useful signal is a minority of the window. Symptom: an agent that starts sharp and becomes unreliable over hours, with no single point of failure.

**Over-compaction.** Summarising so aggressively that essential state is lost. Symptom: an agent that re-does completed work, or contradicts a decision it made an hour ago.

![Line chart from the ACE paper: tokens in context climb to 18,282 with accuracy 66.7, then a single rewrite collapses the context to 122 tokens and accuracy falls to 57.1, below the 63.7 baseline with no context](/assets/images/blog/context-engineering-context-collapse.webp)

*Over-compaction measured: one wholesale LLM rewrite shrank a context from 18,282 tokens to 122, and accuracy fell from 66.7 to 57.1, below the 63.7 scored with no context at all. Source: [Zhang et al., Agentic Context Engineering (arXiv:2510.04618)](https://arxiv.org/abs/2510.04618), CC BY 4.0.*

**Duplicate content.** The same file read three times because three steps needed it, occupying three copies of the window. Symptom: token consumption that grows much faster than task progress.

**Poisoned state.** A wrong conclusion written to durable memory becomes a permanent wrong belief. The agent misdiagnoses a failure, records the misdiagnosis, and thereafter avoids a correct approach. Symptom: an absence rather than an error, which is why it is the hardest to catch, and the strongest argument for keeping memory human-readable and diffable.

## The skill that actually transferred

Here is what is worth noticing about the shift from prompts to context.

Prompt engineering was largely about compensating for model weakness. Chain-of-thought prompting existed because models did not reason step by step unaided. Few-shot examples existed because instruction-following was unreliable. As models improved, the workarounds became unnecessary, which is why almost none of that knowledge aged well.

Context engineering is not a workaround. It is a resource allocation problem, and it does not go away with better models. A window is finite, attention over it is imperfect, and something must decide what occupies it. A bigger window changes the numbers and not the problem.

Which means the useful framing is closer to systems engineering than to prompting:

> You have a fixed-size working memory, imperfect access across it, a cost per unit, and more candidate content than space. Decide what is resident, what is externalised, what is summarised, and what is discarded.

Anyone who has designed a cache will find that familiar. The considerations are the same: working set, eviction policy, cost of a miss, cost of recomputation. Recognising that is more useful than any list of techniques, because it tells you how to reason about a case the list does not cover.

## Practically

If you are building agentic systems, in order:

**Put the stable prefix first.** Free, immediate, and it improves both cost and latency.

**Implement compaction before you need it.** Choosing what survives under pressure, mid-incident, produces bad choices. Decide in advance.

**Use subagents for search, not for capability.** Delegate the investigation, keep the conclusion.

**Externalise conventions and dead ends to a file.** Highest return of any memory technique, requires no new technology.

**Measure context composition.** Instrument what fraction of the window is task, state, history, and debris. Most teams have never looked, and the number is usually worse than expected.

**Stop tuning prompt wording.** If a change in phrasing meaningfully alters your results, the instruction was ambiguous. Fix the ambiguity rather than finding the phrasing the model happens to like. That fix survives a model upgrade; the phrasing will not.

The last one is the clearest signal of the shift. Two years ago, finding the wording a model responded to was the work. Now, needing to find it means something upstream is underspecified, and specifying it properly is the job that replaced prompting.

**Media credits**:
- Hero image: Figure 4 (the ACE framework) from Zhang et al., "Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models", [arXiv:2510.04618](https://arxiv.org/abs/2510.04618), licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Placed on a white 16:9 canvas; figure unaltered.
- Context collapse chart: Figure 2 from the same paper, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), unaltered.
- In-body diagram: Big Matrix Solutions.
