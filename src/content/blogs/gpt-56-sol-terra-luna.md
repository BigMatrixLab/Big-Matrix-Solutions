---
id: "41"
slug: "gpt-5-6-sol-terra-luna-which-tier-for-which-task"
title: "Sol, Terra, Luna: Which GPT-5.6 Tier Actually Wins Each Task"
comments: "0"
image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&q=80&w=800"
category: "LLM Research"
desc: "A 25x price spread, a long-context cliff that makes the cheap tier unusable for some work, and a mid-tier that matches the flagship within three points."
date: "Sep 03, 2026"
tags: ["GPT-5.6", "OpenAI", "Model Selection", "Benchmarks"]
---

# Sol, Terra, Luna: Which GPT-5.6 Tier Actually Wins Each Task

OpenAI's GPT-5.6 family reached general availability on **July 9, 2026** as three tracks: **Sol** the flagship, **Terra** the balanced mid-tier, and **Luna** the fast cheap one. The naming is sun, earth, moon, which is charming and tells you nothing about which to use.

With GPT-6 Astra now shipping, the 5.6 line becomes the workhorse rather than the headline — which makes this the right moment to be concrete about tier selection, because the pricing structure makes getting it wrong expensive in both directions.

## The price spread is the whole reason this matters

After price cuts on July 30:

| Tier | Input / 1M | Output / 1M |
|---|---|---|
| Sol | $5 | $30 |
| Terra | $2 | $12 |
| Luna | $0.20 | $1.20 |

Luna took an 80 percent cut, which opened a **25x gap between Sol and Luna** on both input and output. Sol's price did not change.

That 25x is the number to hold onto, because the capability gap is nothing like 25x. On most benchmarks the three tiers sit within a few points of each other. Which means routing decisions are worth real money, and defaulting everything to the flagship is the most common and most expensive mistake.

## The benchmarks

| Benchmark | Sol | Terra | Luna |
|---|---|---|---|
| Agents' Last Exam | 53.6 | 50.4 | 50.3 |
| Terminal-Bench 2.1 | 88.8% | 87.4% | 84.7% |
| Coding Agent Index | 80 | 77.4 | 74.6 |
| MRCR (long context) | 91.5% | 89.6% | **41.3%** |
| OSWorld 2.0 | 62.6% | — | — |
| BrowseComp | 92.2% | — | — |

Read down the first three rows and the tiers look almost interchangeable. Terra trails Sol by roughly two to three points while costing less than half as much. Luna trails Terra by fractions of a point on Agents' Last Exam.

There is even a tier inversion: **Luna scores above Terra on some benchmarks** despite being positioned below it. If you were picking on aggregate scores alone you would sometimes pick the cheap model over the mid one and be right.

Then look at the fourth row.

## The long-context cliff

MRCR measures multi-round coreference resolution over long context — can the model track entities and references across a large body of text. Sol posts 91.5 percent, Terra 89.6 percent, and Luna **41.3 percent**.

That is not a gradient. It is a cliff, and it is the single most important practical fact about this model family.

Luna is a genuinely capable model that is 25x cheaper than Sol and roughly as good on short-context reasoning tasks. Feed it a long document and ask it to track something across the whole thing, and it falls apart. Not gracefully — by fifty points.

The failure mode this creates in production is nasty because it is silent. Luna will not tell you it lost the thread. It will produce a confident, fluent answer that has quietly confused two entities mentioned forty thousand tokens apart. If your evaluation set is short prompts, you will never see it. If your traffic includes long documents, you will ship it.

**So: Luna is disqualified from long-context work, at any price.** That is a harder rule than most tier guidance, and the number justifies it.

## Task-by-task routing

Consolidating into something you can act on.

### Default to Terra

For most work, Terra is the right answer. It matches Sol within two to three points on the majority of benchmarks at less than half the cost, and it is a generational upgrade over GPT-5.5 for anyone still on that. If you have one model wired into your application and no routing logic, this is the one.

### Escalate to Sol for four specific things

Sol earns its 2.5x premium over Terra on a narrow set:

- **Long-horizon coding** — work that has to persist across files, tests, and follow-up fixes. Sol's advantage compounds over a long run in a way the benchmark deltas understate.
- **Complex terminal operations** — the Terminal-Bench gap is small but the failures at the margin are the expensive ones.
- **Computer use** — Sol posts 62.6 percent on OSWorld 2.0, and the other tiers are not really in this conversation.
- **Deep web research** — BrowseComp at 92.2 percent is a genuine outlier.

The pattern: Sol is for **persistence and tool use over many steps**, not for being smarter per step.

### Use Luna for volume, with one hard constraint

High-volume classification, summarisation, extraction, formatting, routing — anything where the unit of work is small and the quality bar is "acceptable." At $0.20 per million input tokens, Luna makes economically absurd features viable.

The constraint is the MRCR cliff. Short inputs only. If a request might carry a long document, route it up.

### Use something else entirely for repo-level coding

Worth saying plainly because it cuts against the vendor-loyalty instinct: if repository-scale coding is your primary workload, **Claude Fable 5 scores 80 percent on SWE-Bench Pro against Sol's 64.6 percent.** That is a fifteen-point gap on the task, and no amount of tier selection within the GPT-5.6 family closes it.

Model families are not teams. There is no reason to run one vendor for everything, and the 2026 landscape punishes doing so.

## A routing policy that works

The shape most teams converge on, made concrete:

**Classify first, cheaply.** A Luna call that decides which tier should handle a request costs almost nothing and is right most of the time. Route on input length, task type, and whether tools are involved.

**Set Terra as the fallthrough.** Anything the classifier is unsure about goes to Terra. It is rarely the wrong answer and never an embarrassing one.

**Escalate on signal, not on suspicion.** Promote to Sol when something concrete happens: a verification pass failed, two Terra runs disagreed, the task involves more than a handful of tool calls, or the user asked for another look. Escalating on vibes just means paying Sol prices for Terra work.

**Hard-gate Luna on input length.** A single length check in your router prevents the entire MRCR failure class. This is the highest-value five lines of code in the whole policy.

**Measure the tier mix.** If more than a fifth of your traffic reaches Sol, your escalation triggers are too loose. If Sol never fires, they are too tight and quality is leaking somewhere you are not looking.

## What this family teaches about the current landscape

Two things generalise past OpenAI's lineup.

**Aggregate scores hide the decisions that matter.** Luna and Terra are within a point on a headline reasoning benchmark and fifty points apart on long-context tracking. If you had chosen between them on the composite number you would have chosen almost at random with respect to the property that would actually break your application. Every tiered family has cliffs like this somewhere; find yours before production does.

**The price of the flagship is not a quality signal.** A 25x spread across a family whose benchmark range is single digits means price is tracking something other than general capability — inference cost, positioning, and the narrow set of tasks where the top tier genuinely separates. Paying flagship rates for work the mid tier handles is the most common waste in production LLM spend, and it is invisible on your quality metrics because the output is fine.

The GPT-5.6 line is, in that sense, a well-designed family that requires you to do some work. Three models, one of which is right for nearly everything, one of which is right for a specific short list, and one of which is a bargain with a trapdoor.

**Sources**: [OpenAI — Previewing GPT-5.6 Sol](https://openai.com/index/previewing-gpt-5-6-sol/), [Vellum — GPT-5.6 Sol vs Terra vs Luna: Which Tier Should You Actually Use?](https://www.vellum.ai/blog/gpt-5-6-benchmarks-explained), [DataCamp — GPT-5.6 Sol, Terra, and Luna: OpenAI's Next-Gen Model Family](https://www.datacamp.com/blog/gpt-5-6-sol-luna-terra), [CodeRabbit — OpenAI GPT-5.6 Sol and Terra: Benchmark](https://www.coderabbit.ai/blog/gpt-5-6-sol-and-terra-benchmark), [MindStudio — What Is GPT-5.6? Sol, Terra, and Luna Model Tiers Explained](https://www.mindstudio.ai/blog/what-is-gpt-5-6-sol-terra-luna-explained), [SitePoint — GPT-5.6 Luna vs Terra vs Sol: Developer Model Guide](https://www.sitepoint.com/gpt-5-6-luna-terra-sol-developer-guide/)
