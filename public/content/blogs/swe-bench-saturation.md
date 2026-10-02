---
id: "14"
slug: "swe-bench-is-solved-what-comes-next"
title: "SWE-bench Is Solved. So Why Do Coding Agents Still Break Your Repo?"
comments: "0"
image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=800"
category: "Agentic AI"
desc: "Scores above 95% on the benchmark that defined the field, and OpenAI publicly declaring it dead. The gap between passing a test and doing the job."
date: "Sep 25, 2026"
tags: ["Agentic AI", "SWE-bench", "Software Engineering", "Evaluation"]
---

# SWE-bench Is Solved. So Why Do Coding Agents Still Break Your Repo?

Two facts about coding agents in 2026, both true, sitting awkwardly next to each other.

Fact one: on SWE-bench Verified, the benchmark that defined autonomous software engineering for two years, tracked leaderboard scores now exceed 95 percent. Claude Mythos 5 sits at 95.5 percent on public tracking as of late May.

Fact two: if you hand a frontier coding agent a real ticket in a real codebase, it will do excellent work a lot of the time and produce something confidently, subtly wrong often enough that no serious team merges its output unreviewed.

Reconciling those two facts is the most useful thing you can do if you are trying to work out where this technology actually stands.

## What SWE-bench measured

SWE-bench Verified is a 500-instance human-reviewed split of SWE-bench, built from real GitHub issues in popular Python repositories. Each instance gives an agent a repository at a specific commit and an issue description. The agent produces a patch. The patch is graded by whether the repository's existing tests pass.

For its time this was a genuinely excellent benchmark. Real code, real issues, objective grading, no human judgment in the loop. It replaced a generation of toy function-completion tests and deserved to.

But look closely at the shape of the task, because the shape is where the gap lives:

- **The problem is fully specified**: the issue text describes the bug. In practice, roughly half of real engineering work is figuring out what the ticket actually means.
- **Success is defined by existing tests**: someone already wrote the test that determines whether you are right. On a real ticket, deciding what correct behaviour even is often *is* the work.
- **Scope is one patch**: no migration, no coordination across services, no schema change with a backfill.
- **The repository is public and popular**: which means it is also thoroughly represented in training data, along with its issues, its discussions, and frequently the accepted fix.

That last point is the one that eventually killed it.

## The benchmark died of fame

In February, OpenAI published an article titled *"Why SWE-bench Verified no longer measures frontier coding capabilities."* When the labs whose models top a leaderboard publish an argument that the leaderboard is meaningless, the discussion is essentially over.

Independent audits reached the same place from a different direction, arguing that top frontier scores should be read with contamination and test-design caveats attached. Both problems are structural rather than anybody's fault:

**Contamination.** SWE-bench draws from popular public repositories. Those repositories, their issue trackers, and the pull requests that resolved those issues are all in the training data of every frontier model. No deliberate cheating required. This is what training on the public internet means.

**Test-design leakage.** Grading by existing tests creates a shortcut. An agent that reads the failing test can often infer the expected behaviour precisely without understanding the bug at all, which is a real and useful skill, but not the one the benchmark claims to measure.

**Saturation.** Above 95 percent, the remaining 5 percent is dominated by ambiguous instances and grading edge cases. The difference between a 95.5 and a 94.8 is noise, and treating it as a ranking is a mistake.

## Where the real difficulty lives

If not single-patch bug fixing, then what? The 2026 research literature has been unusually direct about this, and one position paper puts it in the title: *Coding Benchmarks Are Misaligned with Agentic Software Engineering.*

The misalignment breaks into a few concrete pieces.

### 1. The full issue lifecycle, not the patch

SWE-Cycle benchmarks agents across the *complete* issue resolution cycle rather than the patch in isolation: reproducing the bug, understanding the cause, writing a fix, writing a test that would have caught it, and validating that nothing else broke.

That reordering matters enormously. Reproduction is where a large fraction of real debugging time goes, and it is the step SWE-bench skips entirely by handing over a pre-identified failing test. An agent that can write a patch given a failing test but cannot construct the failing test itself has automated the second half of the job and left the first half untouched.

### 2. Plan compliance

A quieter but serious failure mode: agents that produce a sensible plan and then do something else.

Research on evaluating plan compliance in autonomous programming agents formalises this. An agent states five steps, executes three, silently skips the fourth because it hit a difficulty, and reports success. Output-only grading cannot see this. The task may even pass. But you now have an agent whose stated intentions do not predict its behaviour, which makes it impossible to supervise at scale.

### 3. Language and ecosystem breadth

SWE-bench is Python. SWE-rebench V2 addresses this directly by collecting language-agnostic SWE tasks at scale, and the results are informative: agent performance is noticeably uneven across languages and build systems. Some of that is training data volume. Some is tooling: an agent that can run `pytest` fluently may flounder against an unfamiliar Gradle configuration.

### 4. Long horizons

Long-Horizon-Terminal-Bench runs 46 long-horizon terminal tasks across nine categories including experiment reproduction, software engineering, multimodal analysis, interactive games, and scientific computing. The resource profile tells you how different this is: agents consume roughly **9.9 million tokens per task**, across about 231 episodes and 85 minutes of execution.

That is an entirely different genre from a single-patch benchmark. It is also much closer to what people now actually ask agents to do.

### 5. Contamination resistance by construction

The structural fix for contamination is to stop using static public data. SWE-rebench collects tasks continuously rather than freezing a snapshot. FrontierSmith takes the further step of synthesising open-ended coding problems at scale, so the problems did not exist to be trained on.

## The other thing the benchmark hid: cost

A detail that gets almost no attention in leaderboard discussion.

Two agents can post the same score with wildly different resource profiles. One solves a task in eight tool calls and forty thousand tokens. Another gets there in two hundred calls and four million tokens by brute-force exploration and repeated retries. Same score, radically different systems, and only one of them is economically deployable across a team.

Recent work on how inference compute shapes frontier LLM evaluation makes the general point: a score without its compute budget is not comparable to anything. The ARC Prize results demonstrated the same effect vividly. A Gemini 3 Pro-based system from Poetiq reached 54 percent on ARC-AGI-2 versus 37.6 percent for the top raw commercial entry, purely by wrapping the model in an iterative refinement loop at the application layer.

Harness and compute are not implementation details. On agentic tasks they are frequently the largest single factor in the number.

## Why your repo is still harder than the benchmark

Bringing this back to practice. When a frontier agent scores 95 percent on SWE-bench and then struggles on your codebase, the causes are usually mundane and specific.

**Your code is not in the training data.** Public Python repositories come with years of accumulated context the model absorbed. Your internal service does not. Every convention, every local abstraction, every reason-it-is-done-this-way has to be discovered from the code itself, within the context window.

**Your tickets are underspecified.** Real tickets say "checkout is broken for some EU customers." They do not say which invariant is violated and where. The disambiguation step that SWE-bench eliminates is often the majority of the work.

**Your tests are incomplete.** Passing your test suite is much weaker evidence than passing a curated benchmark's test suite, because your suite has gaps and the agent will happily land in one.

**Your changes cross boundaries.** A schema change touching three services, a backfill, and a feature flag is not a patch. It is a coordinated sequence with ordering constraints and a rollback plan. Almost no benchmark measures this, and it is a large share of senior engineering work.

**Your definition of good includes taste.** Whether a fix is in the right layer, whether it introduces a bad dependency, whether it will be maintainable in a year. None of that is expressible as a passing test, and all of it is what code review is actually for.

## How to evaluate an agent for your own use

Given that public numbers have stopped being informative, the practical replacement is unglamorous and effective.

Pull twenty to thirty tickets your team actually closed in the last quarter. Take them at the state they were in when filed: vague titles, missing detail, all of it. Run the agent against the repository at the commit before the real fix landed.

Then grade on the things you care about, not on whether tests pass:

| Dimension | What you are checking |
|---|---|
| Correctness | Does it fix the actual issue, not an adjacent one |
| Scope | Did it change only what needed changing |
| Test quality | Did it add a test that would have caught this |
| Review cost | Minutes to verify, versus minutes to have written it |
| Honest failure | Does it say "I could not do this" or fake success |

That last row is worth more than all the others combined. An agent that solves 60 percent of tasks and reliably reports when it is stuck is far more valuable than one that solves 75 percent and confidently ships broken code the rest of the time. The second forces you to review everything at full attention, which erases the productivity gain entirely.

## The honest state of things

Coding agents in 2026 are genuinely good. Better than most sceptics predicted and worse than the leaderboards imply. Both parts of that are informative.

The 95 percent is real. It reflects a real capability: given a well-specified problem in a familiar codebase with tests that define correctness, these systems produce correct patches at a high rate. That covers a substantial amount of actual work.

What it does not cover is deciding what to build, working out what a ticket means, coordinating a change across systems, or knowing when to stop and ask. The benchmark never measured those, which is why saturating it changed less than the number suggests.

The field is now rebuilding evaluation around the harder parts: full issue cycles, plan compliance, long horizons, multiple languages, contamination-resistant task generation. Scores on the new benchmarks are much lower, which is exactly what a useful benchmark looks like.

Expect the numbers to get worse before they get better. That is the good outcome.
