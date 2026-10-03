---
id: "40"
slug: "claude-fable-5-1-release-and-the-export-control-episode"
title: "Claude Fable 5.1 Ships With a 75% Cache Discount. The Interesting Story Is From June."
comments: "0"
image: "/assets/images/blog/claude-fable-5.jpg"
category: "LLM Research"
desc: "Multimodal input, a 1M window, and agent economics that finally work. Plus the eighteen days a frontier model spent switched off by export controls."
date: "Sep 02, 2026"
tags: ["Claude", "Anthropic", "Model Release", "Export Controls"]
---

# Claude Fable 5.1 Ships With a 75% Cache Discount. The Interesting Story Is From June.

Anthropic released **Claude Fable 5.1 and Mythos 5.1 on September 1, 2026**. It is a solid incremental release with one genuinely important pricing change and a new enterprise security architecture.

But the Fable 5 line has had a stranger year than the version numbers suggest, and the June episode is the part to understand, because nothing quite like it had happened before. A frontier model pulled offline worldwide by export controls, for eighteen days.

## What 5.1 changes

The headline capabilities:

- **Multimodal input.** Fable 5.1 accepts text and images, a real change from a text-only predecessor.
- **1M token context window.**
- **Pricing unchanged at $10 / $50** per million input and output tokens, but **cached input drops to $0.25 per million**, a 75 percent cut on cache reads.
- **Enterprise Frontier Safeguards (EFS)**, a security architecture letting organisations keep monitoring data inside infrastructure they control.

On benchmarks:

| Benchmark | Fable 5.1 | Comparison |
|---|---|---|
| AutomationBench | 31.4% | Fable 5 17.1%, Opus 5 26.9% |
| CursorBench 3.2.0 | 73.4% | — |
| Humanity's Last Exam (with tools) | 65.0% | GPT-6 Astra 57.2% |
| SWE-Bench Pro | 80% | GPT-5.6 Sol 64.6% |

AutomationBench nearly doubling from Fable 5 is the standout. It targets business workflow completion, which is the least glamorous and most commercially relevant thing on the list.

![Anthropic's benchmark table for Claude Fable 5.1 against Fable 5, Opus 5 and GPT-5.6 Sol, including AutomationBench 31.4 percent, CursorBench 73.4 percent and Humanity's Last Exam with tools 65.0 percent](/assets/images/blog/claude-fable-5-1-benchmarks.png)

*Anthropic's published benchmark table for Fable 5.1 against Fable 5, Opus 5 and GPT-5.6 Sol. Source: [Anthropic](https://www.anthropic.com/claude-fable-and-mythos-5-1)*

And note the last two rows against the current frontier. Fable 5.1 leads GPT-6 Astra by eight points on hard reasoning with tools, and leads GPT-5.6 Sol by fifteen on repository-scale coding, while Astra leads decisively on computer use. Nobody owns the lead; the split is just unusually legible this month.

## The cache discount is the actual news

The 75 percent cut on cached input reads sounds like a line item. For anyone running persistent agents it is the most consequential thing in the release.

Here is why. Every token in a prompt produces key and value tensors. An agent loop re-sends a large stable prefix on every single turn: system instructions, tool schemas, accumulated state, the document under discussion. Without caching you pay full price to recompute that prefix dozens or hundreds of times per task.

Prefix caching already turned that into a one-time cost plus a cheap read. Cutting the read price by 75 percent changes what is economically sensible to keep resident:

- **Long-lived agents stop being a luxury.** An agent holding 100K tokens of context across a two-hour task was previously paying meaningfully for the privilege on every turn. At $0.25 per million, that resident context is close to free.
- **Verification passes get cheap.** Re-reading the full context to check work is now a rounding error rather than a doubling of cost.
- **Bigger contexts become defensible.** Retrieving fifty chunks instead of five, and keeping them cached, is now the obvious choice rather than an indulgence.

This is the pattern worth watching across the industry generally: capability releases get the coverage, and pricing changes to caching and serving are frequently what actually shifts what people build.

![Stacked bar chart of indexed cost on Fable 5 versus Fable 5.1: about 25 percent lower for a typical workload and about 45 percent lower for a highly agentic workload where cache reads dominate](/assets/images/blog/claude-fable-5-1-cache-cost.png)

*Indexed cost of the same workloads on Fable 5 and Fable 5.1: roughly 25% less for typical use and 45% less for cache-heavy agentic work. Source: [Anthropic](https://www.anthropic.com/claude-fable-and-mythos-5-1)*

## The two-name arrangement

Something that confuses people, worth stating clearly: **Fable 5.1 and Mythos 5.1 are the same underlying model.**

Fable is the generally available version with Anthropic's production safeguards in place. Mythos is available through restricted-access programmes for vetted cybersecurity and life-sciences organisations that need capabilities the safeguards otherwise constrain.

The original June arrangement made the mechanism explicit. Fable 5 shipped with three classifier systems (cybersecurity, biology and chemistry, and distillation detection) that **redirected sensitive queries to Claude Opus 4.8** rather than refusing outright. Mythos 5 removed those for authorised users.

Anthropic reported over **1,000 hours of external red-teaming without discovering a universal jailbreak**, and introduced a 30-day data retention policy on both models for safety monitoring.

Whatever you think of the approach, it is a coherent answer to a real problem: the same capability that lets a model help a security researcher find a vulnerability lets it help someone else exploit one. Splitting the deployment by verified user rather than crippling the model for everyone is at least an honest attempt at the trade-off.

## The eighteen days Fable 5 was switched off

Now the part that has no real precedent.

Fable 5 and Mythos 5 were announced **June 9, 2026**. Three days later, on **June 12**, the US government applied export controls to both models. Anthropic suspended access **globally**, not regionally, because it could not verify user nationality in real time.

The trigger was a finding by Amazon researchers: a method to bypass Fable 5's safeguards by prompting the model to identify software vulnerabilities and demonstrate exploitation techniques. Anthropic's own testing indicated less capable models could do the same thing, which makes the specific finding less alarming than it sounds. It was enough to prompt government intervention regardless.

Export controls were lifted **June 30**, and the models were redeployed **July 1** with a new classifier blocking the specific reported technique in **over 99 percent of cases**, plus a broader defence-in-depth posture.

Three things about this episode are worth extracting.

**Model weights are now treated as controlled technology.** Not chips. The model itself. That is a category shift in how AI capability is governed, and the practical consequence for anyone building on frontier APIs is a new class of availability risk that has nothing to do with uptime. Your dependency can be switched off by a regulator, worldwide, in three days.

**Real-time nationality verification is the actual bottleneck.** Anthropic did not suspend service because the model was dangerous. It suspended service because it could not prove who was using it. Export control regimes assume you can identify the recipient of a controlled technology; an API serving anyone with a credit card cannot. That gap is unresolved and it will come up again.

**The industry response was to coordinate.** Anthropic proposed an industry-wide jailbreak severity framework developed with Amazon, Microsoft and Google, alongside expanded government collaboration on pre-release testing and threat intelligence sharing. Whether that becomes substantive or ceremonial is open, but a shared severity taxonomy is a genuinely sensible thing to want. The June incident partly happened because there was no agreed way to say how bad a given bypass was.

## What EFS is for

The new Enterprise Frontier Safeguards architecture is best read against that background. It lets organisations retain monitoring data inside infrastructure they control.

The demand is obvious once you see the tension. Safety monitoring requires logging what users ask and what the model does. Enterprises in regulated industries cannot send that material to a vendor, because it is precisely the sensitive data they are contractually and legally obliged to keep in-house. The 30-day retention policy introduced in June is exactly the kind of term that stops an enterprise deal.

EFS is the attempt to have both: monitoring that satisfies the vendor's safety obligations, with the data residing where the customer's compliance team requires. If it works, it removes one of the larger remaining obstacles to frontier model adoption in finance, healthcare and government.

## Practical takeaways

**If you run agents, act on the cache pricing.** Structure prompts so the stable prefix comes first and is cacheable, then reconsider anything you previously avoided on cost grounds. Verification passes, generous retrieval, and long-lived context are all differently priced now.

**Fable 5.1 for hard reasoning and repo-scale coding.** The eight-point lead over Astra on HLE-with-tools and the fifteen-point lead over Sol on SWE-Bench Pro are the clearest signals in this month's releases. Route accordingly, and do not assume the newest model is the best one for your task.

**Treat model availability as a real risk.** June demonstrated that a frontier model can vanish globally for eighteen days for reasons entirely outside the vendor's control. If a workflow depends on one specific model, have a fallback wired and tested: a different vendor, and ideally an open-weight option you can run yourself.

**Media credits**:
- Benchmark table and indexed-cost chart: captured from [Anthropic's Fable 5.1 launch page](https://www.anthropic.com/claude-fable-and-mythos-5-1), © Anthropic.
