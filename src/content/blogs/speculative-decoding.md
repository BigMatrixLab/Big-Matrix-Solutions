---
id: "83"
slug: "how-speculative-decoding-works-faster-llm-inference"
title: "How Speculative Decoding Works: Big-Model Answers at Small-Model Speed"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/speculative-decoding.png"
category: "Tutorial"
desc: "A small model guesses, a big model checks several guesses in one pass, and the output distribution does not change. How speculative decoding works, and when it stops helping."
date: "Jan 09, 2027"
tags: ["Speculative Decoding", "LLM Inference", "Latency", "Tutorial"]
---

# How Speculative Decoding Works: Big-Model Answers at Small-Model Speed

Most inference optimisations ask you to accept something worse: a smaller model, lower precision, a shorter context. Speculative decoding is the rare one that, in principle, does not. The output comes from the same distribution as the large model, and it arrives faster.

The trick is to stop asking the large model to write, and start asking it to check.

## Why generation is slow

A language model writes one token per forward pass. Each pass has to stream the full set of weights from GPU memory to the compute units, then does relatively little arithmetic with them. For a single request, decoding is limited by memory bandwidth, and the GPU's arithmetic units spend much of their time waiting.

The Medusa paper states the bottleneck directly: each step requires moving the full model parameters from high-bandwidth memory to the accelerator's cache.

The useful consequence is that scoring five tokens in one pass costs about the same wall-clock time as scoring one. The weights get loaded once either way. If we had five plausible next tokens, the big model could verify all of them for roughly the price of generating one.

## The core idea

Speculative decoding was published independently by two teams: Leviathan, Kalman and Matias at Google (2022), and Chen and colleagues at DeepMind (2023). Both use the same loop.

1. A small, fast **draft model** proposes the next γ tokens, one at a time. This is cheap.
2. The large **target model** runs once over the prompt plus all γ drafted tokens, producing its own probability for each position in parallel.
3. Drafted tokens are checked left to right. Each is accepted or rejected by a rule that compares the two models' probabilities.
4. At the first rejection, the rest of the draft is thrown away and the target supplies a corrected token. If everything is accepted, the target's pass also yields one bonus token for free.

![One round of speculative decoding: five drafted tokens, three accepted, one rejected and replaced](/assets/images/blog/diagrams/speculative-decoding-1.svg)

*Diagram: Big Matrix Solutions, based on [Leviathan et al.](https://arxiv.org/abs/2211.17192) and [Chen et al.](https://arxiv.org/abs/2302.01318)*

Every round produces at least one token, the same as normal decoding, and often several.

## Why the output does not change

The accept rule is what makes this exact rather than approximate. Let `p(x)` be the target model's probability for a drafted token and `q(x)` the draft model's.

```python
def verify(token, p, q):
    if random() < min(1, p[token] / q[token]):
        return accept(token)
    # rejected: sample from the part of p that q under-covered
    residual = normalise(max(0, p - q))
    return replace_with(sample(residual))
```

If the draft is less confident than the target about a token, it is always accepted. If the draft over-weighted it, it is accepted only part of the time, and rejections resample from the leftover probability mass. Both papers prove that the combined procedure samples from exactly the target model's distribution. Leviathan et al. report a 2X to 3X speed-up on T5-XXL "with identical outputs". Chen et al. report 2 to 2.5 times faster decoding on the 70-billion-parameter Chinchilla, without compromising sample quality.

In practice there is one footnote. vLLM's documentation describes its implementation as "theoretically lossless up to the precision limits of hardware numerics": floating-point and batching effects can cause tiny variations, as they can in ordinary inference.

## How much faster: the acceptance rate

The speed-up depends on how often the draft guesses right. Leviathan et al. call the average acceptance probability α and derive the expected tokens produced per target pass:

```
E[tokens per round] = (1 − α^(γ+1)) / (1 − α)
```

With γ = 4 drafted tokens: α = 0.6 gives about 2.3 tokens per round, α = 0.8 gives 3.4, and α = 0.9 gives 4.1. Wall-clock gains are smaller than these numbers, because the draft model's time is not free.

α is high when text is predictable: boilerplate, code with obvious continuations, structured output, and answers that quote the prompt. It drops on creative or high-temperature sampling, where the target's distribution is wide and hard to match.

The paper also states an assumption worth remembering: the analysis assumes enough spare compute to run the extra parallel work. On a server already saturated with large batches, the GPU is no longer waiting on memory, and the free verification slots are not free any more. Speculative decoding helps most for latency-sensitive, lightly batched serving.

## Where the draft comes from

The original recipe needs a separate small model from the same family with the same tokenizer. That is a second model to host and keep in sync, so later work looked for cheaper drafts.

**Extra decoding heads.** Medusa (Cai et al., 2024) bolts several small heads onto the target model, each predicting a token further ahead from the same final hidden state. The candidates form a tree that is verified in a single pass using tree attention.

![Medusa architecture: extra decoding heads on the original model propose candidates that are verified in one step](/assets/images/blog/speculative-decoding-medusa.jpg)

*Medusa heads propose several future tokens; candidates are verified together. Source: [FasterDecoding/Medusa](https://github.com/FasterDecoding/Medusa) (Apache 2.0)*

The paper reports over 2.2x speed-up for Medusa-1, trained on a frozen backbone, and 2.3x to 3.6x for Medusa-2, which fine-tunes the backbone too.

**Feature-level drafting.** EAGLE (Li et al., 2024) drafts at the level of the model's second-to-top-layer features rather than tokens, which its authors argue is easier to extrapolate. For LLaMA2-Chat 70B they report a 2.7x to 3.5x latency speed-up while preserving the output distribution.

**No model at all.** N-gram or "prompt lookup" drafting copies candidate continuations from text already in the context. It costs almost nothing and works well when the output repeats the input, as in editing, summarising with quotes, or code refactoring.

As of late 2026, vLLM's documentation lists draft-model, n-gram, EAGLE and multi-token-prediction methods among its supported options, so this is a configuration choice rather than a research project.

## What this means for you

**If you use an API, it may already be in play.** Because it does not change outputs, a provider can apply speculative decoding without exposing a setting. One visible symptom of drafting in general: predictable, repetitive output tends to stream faster than free-form prose.

**If you self-host, measure α on your traffic.** Turn it on, log the acceptance rate and tokens per step, and compare latency at your real batch sizes. Gains on a benchmark chat set may not transfer to your workload.

**Match the method to the output.** Prompt-lookup drafting suits edit-heavy and retrieval-heavy tasks. A trained draft head suits general chat. A separate draft model is simplest when one already exists in the same family.

**Do not expect throughput miracles at high load.** The technique spends spare compute to cut latency. When the server is busy, that spare compute shrinks, and so do the gains.

**Do not use it as a quality knob.** Correctly implemented, it changes speed and nothing else. If outputs change materially after enabling it, suspect a bug or a mismatched tokenizer.

## What to remember

Decoding is memory-bound, so checking several tokens costs about the same as generating one. Speculative decoding exploits that: a cheap drafter guesses, the expensive model verifies in parallel, and a carefully designed accept-or-resample rule keeps the output distribution exactly the target's.

The payoff is set by the acceptance rate, which is set by how predictable your output is. Predictable text runs two to three times faster in published results; wild sampling and saturated servers see less.

It is one of the few speed-ups in machine learning where the honest summary really is "free, when the conditions are right."

**Sources**

- [Leviathan, Kalman and Matias, "Fast Inference from Transformers via Speculative Decoding" (arXiv:2211.17192)](https://arxiv.org/abs/2211.17192)
- [Chen et al., "Accelerating Large Language Model Decoding with Speculative Sampling" (arXiv:2302.01318)](https://arxiv.org/abs/2302.01318)
- [Cai et al., "Medusa: Simple LLM Inference Acceleration Framework with Multiple Decoding Heads" (arXiv:2401.10774)](https://arxiv.org/abs/2401.10774)
- [Li et al., "EAGLE: Speculative Sampling Requires Rethinking Feature Uncertainty" (arXiv:2401.15077)](https://arxiv.org/abs/2401.15077)
- [vLLM documentation: Speculative decoding](https://docs.vllm.ai/en/latest/features/speculative_decoding/)
- [FasterDecoding/Medusa (GitHub)](https://github.com/FasterDecoding/Medusa)

**Media credits**:
- Hero image: Figure 1 of [Leviathan et al., "Fast Inference from Transformers via Speculative Decoding"](https://arxiv.org/abs/2211.17192), showing drafted tokens accepted (green) and rejected (red) across iterations, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) via arXiv. Padded to 16:9; not otherwise altered.
- In-body figure: Medusa pipeline diagram from [FasterDecoding/Medusa](https://github.com/FasterDecoding/Medusa), Apache 2.0.
- In-body diagram: one round of speculative decoding, Big Matrix Solutions, based on [Leviathan et al.](https://arxiv.org/abs/2211.17192) and [Chen et al.](https://arxiv.org/abs/2302.01318)
