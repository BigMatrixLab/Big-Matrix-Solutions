---
id: "95"
slug: "how-state-space-models-work-mamba"
title: "How State Space Models Work: Mamba and Life Beyond Attention"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/state-space-models-mamba-selective-ssm.png"
category: "Tutorial"
desc: "A fixed-size state instead of a growing KV cache: how SSMs and Mamba's selection mechanism work, where they fall short, and why production models now mix them with attention."
date: "Feb 02, 2027"
tags: ["State Space Models", "Mamba", "LLM", "Tutorial", "Model Architecture"]
---

# How State Space Models Work: Mamba and Life Beyond Attention

Attention has one property that becomes expensive at scale: every new token looks back at every previous token. Training cost grows with the square of sequence length, and during generation the KV cache grows with every token produced.

State space models (SSMs) take the opposite approach. Instead of keeping every past token, they compress the past into a **fixed-size state** and update it once per token. Memory per token stays constant and total work grows linearly with length. Mamba made this approach competitive on language, and as of late 2026 it appears inside several production models, usually alongside attention rather than replacing it.

## Two ways to remember the past

The clearest way to understand an SSM is to compare what each architecture carries forward between tokens.

![Comparison diagram: attention stores a key and value for every token in a growing cache; a state space model updates one fixed-size hidden state per token](/assets/images/blog/diagrams/state-space-models-1.svg)

*Diagram: Big Matrix Solutions, based on [Gu and Dao, 2023](https://arxiv.org/abs/2312.00752).*

A transformer stores everything. When it needs a detail from 50,000 tokens ago, the exact key and value are still in the cache. The cost is memory and bandwidth that grow with context length.

An SSM works more like a recurrent network. A hidden state *h* is updated at each step from the previous state and the current input, and the output is read from the state. Whatever the state does not keep is gone.

## The state space equation

SSMs come from control theory. The continuous-time form is:

```text
h'(t) = A h(t) + B x(t)      # how the state evolves
y(t)  = C h(t)               # what is read out
```

For sequences of tokens, this is **discretised** with a step size Δ, giving a recurrence:

```text
h_t = Ā h_(t-1) + B̄ x_t
y_t = C h_t
```

Here Ā and B̄ are derived from A, B and Δ. *A* controls how the state decays or rotates over time, *B* controls how input enters the state, and *C* controls what is read out.

Earlier structured SSMs such as S4 (Gu, Goel and Ré, 2022) had an important property: A, B and C were **fixed** for every token. A fixed linear recurrence can be unrolled into one long **convolution**, so training runs in parallel across the whole sequence, like a transformer. Generation then uses the cheap recurrent form. You get parallel training and constant-memory inference.

These models did very well on long-range benchmarks but lagged on language. The reason is the property that made them fast.

## The problem with being time-invariant

If A, B and C are the same for every token, the model treats every token the same way. It cannot decide that a name is worth remembering and filler is not. The Mamba paper identifies this directly: earlier subquadratic models struggled with **content-based reasoning**, choosing what to keep based on what the token actually is.

Language depends on exactly that. Whether a token matters depends on its content and context, not on its position.

## Mamba's fix: selection

Mamba (Gu and Dao, December 2023) made the SSM parameters **functions of the input**. At each token, B, C and the step size Δ are computed from the current token through small projections.

The step size is the key one. A large Δ lets the current input overwrite the state, effectively saying "remember this". A small Δ leaves the state almost unchanged, effectively "ignore this". The model learns to make these choices per token. The paper describes the result as letting the model "selectively propagate or forget information" along the sequence.

That breaks the convolution trick. Once the parameters change per token, the recurrence is no longer a fixed convolution. Mamba's answer is engineering: a **hardware-aware parallel scan** that computes the recurrence in fast on-chip SRAM rather than repeatedly writing the expanded state to slower GPU memory (HBM). The hero image above, from the Mamba repository, shows this: the selection mechanism projects the input into B, C and Δ, and the state expansion happens in GPU SRAM.

The reported results were strong for their size. The paper reports **5x higher inference throughput** than transformers and linear scaling in sequence length, with performance still improving on real data up to million-length sequences. It also says the **Mamba-3B model matches transformers twice its size** on language modelling.

## Mamba-2 and Mamba-3

**Mamba-2** (Dao and Gu, ICML 2024) showed that SSMs and attention are more closely related than they look. Both can be written as operations on a particular class of structured matrices, a framework the authors call **state space duality**. In practice, this let Mamba-2 use more matrix-multiplication-friendly algorithms, and its core layer is **2-8x faster** than Mamba's selective SSM.

**Mamba-3** (Lahoti et al., March 2026) focuses on inference efficiency. It adds a refined discretisation, complex-valued state updates for better state tracking, and an optional multi-input, multi-output (MIMO) form. The authors report perplexity comparable to Mamba-2 while using **half the state size**.

![Block diagrams of the Mamba-2 and Mamba-3 blocks, showing linear projections, the SSM, RoPE and optional MIMO projections](/assets/images/blog/state-space-models-mamba3-block.png)

*Mamba-2 and Mamba-3 blocks. Source: [state-spaces/mamba](https://github.com/state-spaces/mamba), Apache 2.0*

## Where SSMs fall short

A fixed-size state is a lossy summary, and some tasks need exact recall.

The clearest evidence comes from "Repeat After Me" (Jelassi et al., 2024). It proves that a two-layer transformer can copy strings of exponential length, while models with a fixed-size state are fundamentally limited by that state. Experiments on synthetic tasks and pretrained models confirmed that transformers are better at copying and retrieving information from context.

In practical terms, pure SSMs are weaker at:

- reproducing a long passage exactly
- finding one specific fact in a long document ("needle in a haystack")
- in-context tasks that depend on looking up an earlier example precisely

These are tasks attention handles very well, because attention keeps everything.

## Hybrids: the practical answer

The industry response has been to combine the two: mostly SSM layers for cheap long-range processing, plus a few attention layers for precise recall. Published examples:

| Model | Design | Reported benefit |
|---|---|---|
| Jamba (AI21, 2024) | 1 attention layer per 7 Mamba layers, with MoE | 256K context on a single 80 GB GPU |
| Nemotron-H (NVIDIA, 2025) | Most attention layers replaced with Mamba | Up to 3x faster inference than similar-size transformers |
| Granite 4.0-H (IBM, 2025) | Mamba-2 and transformer blocks in a 9:1 ratio | Over 70% less RAM for long inputs and concurrent batches |

The pattern is consistent. Because only a few layers use attention, the KV cache is a fraction of a pure transformer's, so long contexts and large batches fit in less memory. The remaining attention layers recover most of the exact-recall ability.

## What it means for you

- **Long-context workloads are where hybrids help most.** Large documents, long agent sessions and many concurrent users all scale with KV cache size, and hybrids shrink it.
- **Test recall-heavy tasks specifically.** If your application depends on exact quoting, precise retrieval from long inputs or copying structured data, evaluate on those tasks, not just general benchmarks.
- **Check your serving stack.** SSM and hybrid layers need different kernels and different cache management from attention. Support in mainstream inference engines has improved but is not as mature as for standard transformers. Confirm your engine handles the specific model before you commit.
- **Do not treat "linear time" as "free".** At short contexts, attention's cost is small and the gap mostly disappears. The benefits grow with sequence length.

## The bottom line

State space models replace attention's growing, exact memory with a fixed, learned summary. Mamba's input-dependent selection made that summary good enough for language, and Mamba-2 and Mamba-3 made it faster and smaller. A fixed state cannot keep everything, though, so the designs that reached production are hybrids that combine mostly SSM layers with a few attention layers. Attention has not been replaced. It is now used more sparingly, in the layers where exact recall matters.

**Sources**

- https://arxiv.org/abs/2312.00752
- https://arxiv.org/abs/2405.21060
- https://arxiv.org/abs/2603.15569
- https://arxiv.org/abs/2111.00396
- https://arxiv.org/abs/2402.01032
- https://arxiv.org/abs/2403.19887
- https://arxiv.org/abs/2504.03624
- https://www.ibm.com/new/announcements/ibm-granite-4-0-hyper-efficient-high-performance-hybrid-models
- https://github.com/state-spaces/mamba

**Media credits**:
- Hero image: "Selective State Space Model with Hardware-aware State Expansion" figure from the [state-spaces/mamba](https://github.com/state-spaces/mamba) repository (Gu and Dao), Apache 2.0; placed on a white 16:9 canvas
- Mamba-2 and Mamba-3 block diagram from the [state-spaces/mamba](https://github.com/state-spaces/mamba) repository, Apache 2.0; resized
- Attention vs SSM memory diagram: Big Matrix Solutions, based on [Gu and Dao, 2023](https://arxiv.org/abs/2312.00752)
