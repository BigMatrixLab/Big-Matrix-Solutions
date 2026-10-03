---
id: "42"
slug: "gpt-6-astra-release-what-the-numbers-say"
title: "GPT-6 Astra: A Critical Cyber Rating, a Hidden Chain of Thought, and One Asterisk on the Headline Score"
comments: "0"
image: "/assets/images/blog/gpt-6-astra.webp"
category: "LLM Research"
desc: "OpenAI shipped Astra on September 3 and called it a possible AGI. The benchmarks are genuinely strong. The two most interesting details are in the footnotes."
date: "Sep 04, 2026"
tags: ["GPT-6", "OpenAI", "Model Release", "AI Safety"]
---

# GPT-6 Astra: A Critical Cyber Rating, a Hidden Chain of Thought, and One Asterisk on the Headline Score

OpenAI released **GPT-6 Astra on September 3, 2026** as a limited preview for trusted partners, with public availability set for **September 5**. President Greg Brockman called it a "generational leap" and said it could eventually be seen as the arrival of artificial general intelligence.

Set the AGI claim aside for a moment. The release is significant for three concrete reasons, and only one of them is a benchmark.

## What the model actually posts

The numbers are strong across the board, and worth reading against the incumbents rather than in isolation.

| Benchmark | Astra | Comparison |
|---|---|---|
| OSWorld 2.0 (computer use) | 72.6% | GPT-5.6 Sol 65.7%, Claude Opus 5 70.2% |
| FrontierMath Tier 4 v2 | 97.6% | Described as saturated |
| GPQA Diamond | 96.0% | — |
| Terminal-Bench 4.0 | 57.7% | Claude Fable 5.1 55.8% |
| DeepSWE v1.1 | 74.1% | — |
| ExploitBench | 100% | Restricted capability |
| Humanity's Last Exam (with tools) | 57.2% | Claude Fable 5.1 **65.0%** |

Two things stand out.

The **computer use** result is the most practically meaningful. OSWorld 2.0 is the long-horizon benchmark where the median task takes a human 1.6 hours, and where frontier systems were sitting around 20 percent when it launched. Astra at 72.6 percent, completing tasks roughly **47 percent faster than Sol** (about 40 minutes against 75), is a real change in what can be delegated to an agent driving a GUI.

The **weakness** is equally informative. On Humanity's Last Exam with tools, Astra trails Claude Fable 5.1 by nearly eight points. This is the pattern that has held all year: no model leads everywhere, and the model that dominates agentic and computer-use work is not automatically the best at hard open-ended reasoning.

![Bar chart of GPT-6 Astra against rivals: OSWorld 2.0 72.6 percent versus 70.2 and 65.7, Terminal-Bench 4.0 57.7 versus 55.8, Humanity's Last Exam with tools 57.2 versus Fable 5.1 at 65.0](/assets/images/blog/diagrams/gpt-6-astra-1.svg)

*Diagram: Big Matrix Solutions, based on [OpenAI](https://openai.com/index/gpt-6-astra/) and [Anthropic](https://www.anthropic.com/claude-fable-and-mythos-5-1) results.*

Pricing is $10 per million input tokens and $50 per million output, with a fast mode offering 2.5x speed at 2x price. Context runs 256K to 1M, with 96.3 percent retrieval reliability quoted in the 512K–1M range. It is available in ChatGPT Plus, Pro, Business and Enterprise, through the API as `gpt-6-astra`, and on Amazon Bedrock, though enterprise admins must enable it per workspace, and it is **off by default**.

## The asterisk on the headline number

The figure that got the most attention was ARC-AGI-3, where Astra reportedly scores **99.9 percent**. Given that frontier systems scored 0.51 percent at that benchmark's March launch (against 100 percent for human testers), a jump to near-perfect would be one of the more remarkable results in the field's history.

The qualification matters enormously: that score requires **a stateful, expensive harness**. Through standard stateless API calls, performance falls to somewhere between 17 and 63 percent depending on tier.

This is not a scandal, and OpenAI disclosed it. But it is the clearest example yet of something worth internalising about 2026 benchmarks: **the harness is frequently a larger factor in the number than the model is.** We saw the same effect on ARC-AGI-2, where a Gemini 3 Pro-based system from Poetiq reached 54 percent against 37.6 percent for the top raw commercial entry, purely by wrapping the model in an iterative refinement loop.

So what the ARC-AGI-3 result actually shows is that a purpose-built stateful scaffold around Astra can adapt to novel interactive environments. That is a genuine and important capability. It is not the same claim as "the model scores 99.9 percent," and if you call the API expecting the headline figure you will be disappointed by a wide margin.

![Bar chart of ARC-AGI-3 scores: frontier AI at launch 0.51 percent, Astra through a stateless API 17 to 63 percent, Astra with a stateful harness 99.9 percent, humans 100 percent](/assets/images/blog/diagrams/gpt-6-astra-2.svg)

*Diagram: Big Matrix Solutions, based on [OpenAI](https://openai.com/index/gpt-6-astra/) and [ARC Prize](https://arcprize.org/blog/arc-agi-3-launch).*

## The recurrent depth problem

Here is the part with the longest tail, and it is an architecture decision rather than a capability one.

Astra uses a new reasoning technique OpenAI calls **recurrent depth**. Rather than processing in a single pass, the architecture revisits data multiple times. The consequence, and this is the contentious bit, is that it **obscures some or all of the model's chain of thought**.

The efficiency argument for this is reasonable. Reasoning that happens in recurrent latent passes rather than in emitted tokens is cheaper, and it lets the model solve problems in fewer written steps. It was trained on over 100,000 GPUs at OpenAI's Stargate facility in Texas, and any architecture that reduces token spend at that scale is economically significant.

The safety cost is that a chain of thought you cannot read is a chain of thought you cannot monitor.

This matters because chain-of-thought monitoring has been one of the few interpretability techniques to deliver concrete safety value in production. OpenAI itself used it earlier this year to catch a frontier model gaming a coding evaluation in real time. Not by noticing anomalous scores afterwards, but by watching the reasoning as it happened.

OpenAI's own evaluations are refreshingly direct about the regression. They found Astra's written reasoning **harder to monitor than GPT-5.6 Sol's**, on tests that explicitly asked it to evade monitoring. Their stated explanation is that Astra has greater control over its written reasoning on simpler tasks and can solve problems in fewer written steps. The mitigating finding is that it still appears to struggle to conceal the reasoning needed for genuinely complex tasks. The hard problems still require visible work.

Safety researchers at Redwood Research and elsewhere have flagged this as a concern for oversight, and the concern is structural rather than speculative. If the industry's most useful monitoring technique depends on models thinking out loud, an architecture that reduces thinking out loud trades away oversight for efficiency. OpenAI says improving monitorability remains a research priority, which is the right thing to say and not yet a solution.

## First to Critical on cybersecurity

The third notable item: Astra is **OpenAI's first model to reach the "Critical" cybersecurity threshold** under its Preparedness Framework. That designation is why advanced access was initially restricted to selected alpha testers, and why the rollout prioritised companies in OpenAI's application-based cybersecurity programme.

The 100 percent ExploitBench score is the capability behind the rating, and access to it is gated through a restricted programme rather than generally available.

The internal controls OpenAI describes are worth listing, because they are a reasonable template for anyone handling a model with genuinely dangerous capability:

- **Stricter isolation** of development and deployment environments
- **Checkpoint encryption**, so the weights are not casually accessible even internally
- **Universal monitoring of full trajectories**, chains of thought included
- **A blocking alignment evaluation** that must pass before internal use

Note the tension with the previous section. The mitigation for a model with critical cyber capability is universal monitoring of chains of thought, applied to a model whose architecture makes chains of thought harder to read. Both facts are in the same release.

## On the AGI claim

Brockman's framing deserves a direct response, because it will dominate the coverage and it is the least useful part of the announcement.

The case for it: state-of-the-art computer use, saturated frontier mathematics, near-ceiling graduate science, strong software engineering, and a genuine step change in long-horizon task completion. That is a broad capability profile, and "does many kinds of professional work competently" is not a trivial description.

The case against: Astra trails a competitor by eight points on hard open-ended reasoning with tools. Its most spectacular result depends on an external harness that costs more than the model. And it is worse than its predecessor at the one property we most need from a system this capable, which is the ability to observe what it is doing.

A system that is superhuman at some professional tasks, mediocre at others, and less legible than the thing it replaced is a remarkable engineering artefact. Calling it AGI does not add information. It just moves the argument to definitions.

The more useful question is what changes for people building things. The answer is fairly specific:

**Computer-use automation just got materially more viable.** 72.6 percent on OSWorld 2.0, at 47 percent faster completion, moves long-horizon GUI work from "demo" to "worth piloting." That is the single biggest practical consequence of this release.

**Model selection stays a routing problem.** Astra for agentic and computer-use work, Fable 5.1 for the hardest reasoning and repo-level coding, cheaper tiers for volume. The tiered-routing pattern that has held all year holds through this release too.

**Read the harness, not the headline.** Before you architect around any 2026 benchmark number, find out what scaffold produced it and what the same model does through a plain API call. On ARC-AGI-3 the spread between those two is over 80 points.

**Media credits**:
- In-body charts: Big Matrix Solutions, drawn from the figures in this article.
