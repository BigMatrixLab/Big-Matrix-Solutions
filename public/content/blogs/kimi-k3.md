---
id: "39"
slug: "kimi-k3-largest-open-weights-model"
title: "Kimi K3: 2.8 Trillion Parameters, Number Three on the Index, and a Hallucination Rate Nobody Charted"
comments: "0"
image: "/assets/images/blog/kimi-k3.jpg"
category: "LLM Research"
desc: "Moonshot shipped the largest open-weights model ever built and beat its own release date. The benchmarks are real. So is the 51% hallucination figure."
date: "Sep 01, 2026"
tags: ["Kimi K3", "Open Weights", "Mixture of Experts", "Moonshot AI"]
---

# Kimi K3: 2.8 Trillion Parameters, Number Three on the Index, and a Hallucination Rate Nobody Charted

Moonshot AI released **Kimi K3 on July 16, 2026**, and published the open weights on **July 26**, a day ahead of the July 27 target they had committed to. Shipping early is rare enough in this industry to be worth noting on its own.

What they shipped is the largest open-source model ever released, and it is genuinely close to the closed frontier. It also has a problem that does not appear anywhere in the company's benchmark charts.

## The architecture

K3 is a mixture-of-experts model at a scale that would be impossible as a dense network.

| Property | Value |
|---|---|
| Total parameters | 2.8 trillion |
| Active parameters per token | 104 billion |
| Experts activated | 16 of 896 |
| Context window | 1 million tokens |
| Vision | Native |
| Quantisation | MXFP4 |

The sparsity ratio is the thing to look at: **16 experts out of 896**, activating 104 billion of 2.8 trillion parameters. You get the knowledge capacity of a 2.8T model at roughly the compute cost of a 104B one.

Three architectural pieces are doing the work. **Kimi Delta Attention** and **Attention Residuals** improve information flow through the network, and a **Stable LatentMoE** framework delivers what Moonshot reports as a roughly **2.5x improvement in overall scaling efficiency** over its predecessor. That last figure is the one that matters technically. At this scale training stability is the binding constraint, and a 2.5x efficiency gain is what makes 2.8T trainable at all.

## Where it lands

The independent benchmark positions are strong and worth quoting precisely, because "beats the frontier" claims usually do not survive scrutiny and these mostly do:

- **#2 overall** on the Vals AI index
- **#3 overall** on Artificial Analysis's Intelligence Index, beaten only by Claude Fable and GPT-5.6 Sol Max, while being cheaper than both
- **#1 overall** in Frontend Code Arena

Moonshot's own reported results put it ahead of Claude Opus 4.8 and GPT-5.5 on several coding and agent tasks.

Third on the aggregate intelligence index, for a model whose weights you can download, is a materially different situation from where open weights sat a year ago. The gap to the closed frontier had already compressed from roughly 150 Elo points to around 30; K3 is what that compression looks like in a single artefact.

## The number that is missing from the charts

Now the part that requires reading past the announcement.

Independent testing by Artificial Analysis found K3's hallucination rate **climbed from 39 percent on its predecessor to approximately 51 percent**. That finding does not appear anywhere in Moonshot's published benchmark material.

Worth being careful about what this means and what it does not. Hallucination benchmarks measure something specific: the rate at which a model asserts something false when it should express uncertainty or decline. A 51 percent figure on such a benchmark does not mean half of all outputs are wrong in normal use. The benchmarks are adversarially constructed to elicit exactly this failure.

What it does mean is that the direction is wrong. The model got substantially more capable and substantially more willing to assert things it should not. That combination is worse than either alone, because a more capable model is more persuasive when it is confabulating.

The reasonable inference is that whatever produced the capability gains also increased the model's propensity to commit to an answer. That is a recognisable trade in reinforcement learning against outcome-based rewards: a training signal that rewards getting the answer right, with no penalty proportional to confidently getting it wrong, selects for models that guess rather than abstain.

For anyone deploying this, the practical consequence is specific: **K3 needs verification more than its benchmark position suggests.** If your pipeline takes model output as authoritative, a 12-point regression in hallucination rate will show up as user-visible errors, and it will show up on exactly the queries where the model sounds most confident.

## The catch on "you can download it"

The weights are genuinely open. Running them is a different question.

A 2.8 trillion parameter model has to be resident in memory to serve, even though only 104 billion parameters activate per token. That is the mixture-of-experts trade in its starkest form. You swapped a compute problem for a memory problem, and the memory bill does not care about your sparsity ratio.

For a hosted inference provider, this is fine: memory cost is fixed and amortised across thousands of concurrent requests, which is why day-zero hosting appeared immediately across the usual providers. For a single organisation, it means a cluster. MXFP4 quantisation helps materially and does not change the category.

So the realistic options for most teams:

- **Use a hosted endpoint.** Competitive pricing, no infrastructure, and you have given up the data-residency argument that usually motivates choosing open weights.
- **Self-host on serious hardware.** Viable if you have the GPUs and enough steady traffic to keep them busy.
- **Pick something smaller.** For most workloads a mid-size dense model is the better engineering choice, and this remains the most commonly ignored advice in open-weight discussions.

"Open weights" and "you can run it" are separate claims, and K3 is the clearest illustration of the gap.

## Read the licence

One more practical note. Several write-ups of the release flagged that the licence terms went largely unexamined in the initial enthusiasm. One headline put it as *a license nobody actually read*.

This is a five-minute check that occasionally saves a product. Permissive licences like MIT and Apache 2.0 are genuinely permissive. Some prominent model releases carry usage restrictions, revenue thresholds, attribution requirements, or field-of-use limits that matter at commercial scale. Before you build on any open-weight model, read the actual terms rather than the word "open" in the announcement.

## Why this release matters strategically

Nathan Lambert's framing of K3 is the sharpest available: open-weights models are an **economic Achilles heel** for closed-model labs, because they compress margins and therefore future investment capacity.

The mechanism is straightforward. If a downloadable model is third on the intelligence index and cheaper than the two above it, then everything that is not the absolute bleeding edge becomes a commodity. Closed labs retain pricing power only on the narrow tail where they genuinely lead, which this month means the hardest reasoning, the deepest agent loops, and computer use.

Lambert frames this as broadly good: it enables wider AI diffusion across industries while preserving a safety buffer in which frontier models stay slightly ahead of their open-weight equivalents. He also argues against heavy-handed regulation of open models, on the grounds that restrictions create false security while delaying rather than preventing capability spread.

You can disagree with the policy conclusion and the economic observation still holds. K3 is a demonstration that the three-month lag between open and closed is real, that it applies at genuine frontier scale, and that the party doing the commoditising has every incentive to keep going.

For anyone building, the practical read is unchanged from the general open-weights picture: benchmark it on your own tasks rather than trusting the index position, split traffic by requirement rather than by ideology, and in K3's case specifically, put a verification layer in front of it.
