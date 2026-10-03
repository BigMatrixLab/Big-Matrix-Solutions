---
id: "16"
slug: "self-evolving-agents-and-memory-that-compounds"
title: "Agents That Learn From Yesterday: Inside the Self-Improving Coding Loop"
comments: "0"
image: "/assets/images/blog/self-evolving-agents.webp"
category: "Agentic AI"
desc: "Frozen weights, forgotten sessions. The 2026 research push to give coding agents memory that accumulates and behaviour that improves without retraining."
date: "Oct 31, 2026"
tags: ["Agentic AI", "Agent Memory", "Self-Improvement", "AI Research"]
---

# Agents That Learn From Yesterday: Inside the Self-Improving Coding Loop

There is a specific frustration that anyone using coding agents daily runs into within a week.

You explain that this repository uses a particular error-handling convention. The agent adapts, does good work, finishes the task. The next morning you start a new session and it has no idea. Same explanation, same correction, same three paragraphs of context you typed yesterday.

The agent is not being obtuse. Its weights are frozen. Everything it learned about your codebase lived in a context window that no longer exists.

This is the problem a large slice of 2026 agent research is attacking, and the approaches are more interesting than "make the context window bigger."

## Why frozen weights are such a hard constraint

Start with what happens mechanically during an agent session.

The model reads files, forms hypotheses, runs commands, sees output, revises. Genuine learning happens. By the end of a long session an agent often understands a subsystem better than it did an hour earlier, and its later edits are visibly better than its first ones.

All of that lives in the context window as text. When the session ends, it is gone. Nothing has been written back into the model, because inference does not update weights.

The obvious fix, fine-tuning on the session, fails for practical reasons that are worth naming:

- **Latency**: you cannot retrain between tasks. The loop is minutes; training is hours.
- **Cost**: a fine-tune per team per week is not economically sensible at any reasonable scale.
- **Catastrophic forgetting**: narrow fine-tuning on your repository degrades general capability in ways that are hard to detect until they bite.
- **Attribution**: if the agent's behaviour drifts after a bad session, you have no clean way to identify or undo the specific lesson that caused it.

So the field went in a different direction: leave the weights alone, and build memory *outside* the model.

## Approach one: structured memory

The most practical line of work treats memory as an explicit, inspectable artifact the agent reads at the start of a task and writes to at the end.

The key insight in recent work on structured memory for code agents is that raw session transcripts are nearly useless as memory. Dumping yesterday's conversation into today's context wastes tokens on irrelevant detail and buries the two facts that mattered. What works is *distilled* memory: the agent, at the end of a task, writing down what it learned in a form designed to be read later.

That distillation tends to separate into distinct kinds, and the separation matters:

- **Repository facts**: where things live, what depends on what, which module owns which concern. Slowly changing, broadly useful, worth keeping indefinitely.
- **Conventions**: this project uses this error pattern, tests go here, never import that directly. Frequently the thing you re-explain daily.
- **Failed approaches**: I tried mocking this dependency and it does not work because of an import cycle. Enormously valuable and almost never captured anywhere.
- **Task-specific state**: where I got to on this multi-session job. Ephemeral, and should expire.

The failed-approaches category is the underrated one. Human engineers carry a large private store of "do not bother trying that, I already did." Agents rediscover the same dead ends indefinitely, and each rediscovery costs a full exploration cycle.

The practical version of this is unglamorous and effective: a markdown file in the repository that the agent reads on startup and appends to when it learns something durable. It is version-controlled, human-readable, human-editable, and reviewable in a pull request. Teams have found it works better than more sophisticated schemes, largely because when it goes wrong you can just open it and see why.

![Diagram of a versioned memory file holding repository facts, conventions, failed approaches highlighted in red, and expiring task state, read by the agent at task start and written at task end](/assets/images/blog/diagrams/self-evolving-agents-1.svg)

*The four kinds of distilled memory and when the agent touches them. Diagram: Big Matrix Solutions, based on [Sumers et al., CoALA (arXiv:2309.02427)](https://arxiv.org/abs/2309.02427).*

## Approach two: self-evolving harnesses

A more ambitious line asks whether the agent can improve its own *scaffolding* rather than its knowledge.

The framing here separates two things that usually get conflated. There is the model, which is fixed. And there is the harness around it: the tools it can call, the prompts that structure its work, the retry logic, the verification steps. The harness is code. Code can be modified.

The Darwin Gödel Machine line of work explores exactly this: agents that read their own implementation, propose modifications, evaluate whether the modified version performs better on a benchmark, and keep the improvements. Open-ended evolution of self-improving agents, with the model held constant and the scaffolding under selection.

![DGM archive tree: about 80 numbered agent variants branching from a root, coloured by SWE-bench score, with a bold path leading to a star marking the best agent](/assets/images/blog/self-evolving-agents-dgm-archive.webp)

*The Darwin Gödel Machine archive: every node is a self-modified variant of the coding agent, coloured by SWE-bench score, and the bold path leads to the best one found. Source: [Zhang et al., Darwin Gödel Machine (arXiv:2505.22954)](https://arxiv.org/abs/2505.22954), CC BY 4.0.*

Live-SWE-agent pushes toward doing this during operation rather than in an offline evolution loop. An agent that self-evolves on the fly, adjusting its own approach mid-task based on what is working.

Both are genuinely interesting, and both come with a problem that is easy to state and hard to solve.

> Self-improvement requires a fitness signal. Whatever you measure, the system will optimise. If your fitness function is a benchmark score, you will get agents that are excellent at that benchmark and possibly worse at everything else.

This is Goodhart's law with a compute budget. An agent evolving against SWE-bench will find SWE-bench-specific strategies, including, if the search is thorough enough, ones that exploit how the benchmark grades rather than ones that fix bugs. Every self-improvement result needs to be read with the question: improvement measured how, and does that measure still mean what it meant before the optimiser got at it?

## Approach three: learning from the human in the loop

The third approach sidesteps autonomous self-modification entirely and mines the signal you are already producing.

Every time you review an agent's pull request and leave a comment, you generate a labelled correction. Every time you reject an approach, that is a preference. Every time you accept one unchanged, that is an endorsement. Teams doing agentic development generate this signal continuously and, in most setups, throw all of it away.

The systems capturing it work along a few axes:

**Correction memory.** When a reviewer says "we do not use that pattern here," that becomes a stored convention rather than a one-off fix. The next task reads it. This is the highest-value, lowest-sophistication version and it works immediately.

**Preference accumulation.** Repeated choices between alternatives build up an implicit style profile. Offline preference-based trajectory evaluation research addresses how to learn from these judgments without needing a reward model trained from scratch.

**Trajectory-level feedback.** Rather than grading only the final diff, grading the *path*: was the plan sensible, did it follow the plan, did it explore efficiently. Work on log analysis for credible agent evaluation argues this is essential, because outcome-only grading cannot distinguish an agent that solved the problem from one that got lucky or gamed the test.

The advantage of this whole family is that the fitness signal comes from humans who care about the actual outcome, which is much harder to Goodhart than a benchmark score.

## The failure modes of agent memory

Memory is not free, and the ways it goes wrong are specific.

### 1. Stale memory is worse than no memory

An agent that confidently applies a convention you abandoned three months ago is more dangerous than one that asks. Memory needs expiry, or at minimum a review cadence. A memory file nobody has read in six months is a liability accumulating quietly.

### 2. Memory poisoning

If an agent writes its own memory, a wrong conclusion becomes a durable wrong belief. It tries something, misdiagnoses why it failed, records the misdiagnosis, and now permanently avoids a correct approach. Recovery requires noticing, which is hard, because the symptom is an absence rather than an error.

This is the strongest practical argument for human-readable, version-controlled memory. You can diff it. You can review changes to it in a PR. You can delete a line.

### 3. Context budget competition

Memory occupies context, and context spent on memory is context not spent on code. Beyond a certain size, loading everything you know degrades performance rather than improving it. Which means memory needs *retrieval*, which means memory has all the same problems as any retrieval system: relevance, ranking, and the risk of surfacing the wrong thing confidently.

### 4. Overfitting to one codebase

An agent thoroughly adapted to your conventions may become worse at reasoning about code in general. If it has internalised "this project always does X," it may stop noticing when X is wrong. Human engineers have the same failure mode after years on one system, which is not a reason to dismiss it.

## What is worth doing today

Separating the research from the deployable.

**Do keep a repository conventions file.** Human-written, agent-read, version-controlled. This is the single highest return-on-effort item available and requires no new technology. Write down what you would explain to a new hire in week one.

**Do capture failed approaches.** When an agent or a human discovers that an obvious approach does not work here and why, write it down where the agent will read it. This saves more time than almost anything else.

**Do route review comments back into memory.** If you correct the same thing twice, that is a convention that belongs in a file rather than in your review queue.

**Be cautious with autonomous self-modification.** The research is legitimate and the direction is important. An agent rewriting its own harness against a fitness function you have not carefully examined is not something to run against a production repository yet.

**Insist on inspectability.** Whatever memory system you adopt, you should be able to read what the agent believes and change it. Opaque learned state in a system you cannot audit will eventually behave in a way you cannot explain, and by then it will have accumulated a lot of it.

## Where this is heading

The current arrangement of extraordinary capability and no persistence is clearly transitional. Something will close the gap between a session and a career.

The likeliest near-term shape is not weight updates. It is better memory architecture: structured, retrievable, expiring, inspectable stores that agents read from and write to, with humans able to audit and correct what accumulates. That is much less exciting than continual learning and much more likely to be running in production next year.

The longer-term question is whether the frozen-weights constraint is fundamental or incidental. ARC-AGI-3's brutal frontier scores suggest that in-episode learning, genuinely updating from what you just observed, is a capability current architectures largely lack rather than one they merely lack the plumbing for. If that is right, memory systems are a workaround for something that eventually needs an architectural answer.

For now, the workaround is what we have, and a markdown file in your repo does most of the job.

**Media credits**:
- Hero image: Figure 1 from Zhang et al., "Darwin Gödel Machine: Open-Ended Evolution of Self-Improving Agents", [arXiv:2505.22954](https://arxiv.org/abs/2505.22954), licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Placed on a white 16:9 canvas; figure unaltered.
- DGM archive tree: figure from the same paper, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), unaltered.
- In-body diagram: Big Matrix Solutions.
