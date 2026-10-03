---
id: "90"
slug: "how-quantization-works-4-bit-llms"
title: "How Quantization Works: 4-Bit Models and What You Actually Lose"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/quantization.webp"
category: "Tutorial"
desc: "Scales, groups, outliers and why 4-bit became the default. How LLM quantization works, what GPTQ and AWQ do differently, and how to tell what it cost you."
date: "Jan 23, 2027"
tags: ["Quantization", "LLM Inference", "GPTQ", "AWQ", "Tutorial"]
---

# How Quantization Works: 4-Bit Models and What You Actually Lose

A 70-billion-parameter model stored in 16-bit precision needs about 140 GB just for its weights. That is more than any single consumer GPU holds. The same model in 4 bits needs about 35 GB, which fits on one large workstation card.

That four-fold reduction is the whole appeal of quantization. The obvious worry is what gets thrown away. The answer is less than you might expect, and in more specific places than "everything a bit".

## Memory is the constraint

Weight memory is simple arithmetic: parameters times bytes per parameter.

![Weight memory for a 70B model at FP32, FP16, INT8 and 4-bit precision](/assets/images/blog/diagrams/quantization-1.svg)

*Diagram: Big Matrix Solutions. Parameters multiplied by bytes per parameter.*

Fewer bytes help twice. The model fits on fewer or cheaper GPUs, and, because generating each token means streaming all the weights from memory, smaller weights also mean faster decoding. The GPTQ paper measured end-to-end speed-ups over FP16 of around 3.25x on NVIDIA A100 and 4.5x on A6000 GPUs.

## The basic operation: scale and round

Quantization maps many real values onto a small set of integers. For symmetric 4-bit quantization of a group of weights:

```python
scale = max(abs(w)) / 7          # use the integer range -8..7
q = round(w / scale)             # store these 4-bit integers
w_restored = q * scale           # what the model computes with
```

You store the small integers plus one scale per group. At run time the weights are expanded back, and the difference between `w` and `w_restored` is the quantization error. This simplest form is called round-to-nearest (RTN).

The size of the group matters. One scale for an entire matrix is cheap to store but forces every value onto the same grid. One scale per small block (64 or 128 weights is common) costs a little extra memory and tracks local magnitude far better. Dettmers and Zettlemoyer's study of more than 35,000 experiments found small block sizes and the choice of data type were the only reliable improvements to the bits-versus-accuracy trade-off.

## The outlier problem

Round-to-nearest works well when values in a group are similar in size. It breaks when one is much bigger than the rest.

![Worked example: a single outlier stretches the quantization scale and rounds four small weights to zero](/assets/images/blog/diagrams/quantization-2.svg)

*Diagram: Big Matrix Solutions. Worked example of symmetric round-to-nearest quantization.*

In the normal group, every weight lands within about 0.13 of its original value. Replace one weight with 8.40 and the scale quadruples. Four small weights now round to zero, and the information they carried is gone.

Large language models have exactly this kind of outlier, and not by accident. The LLM.int8() paper (Dettmers et al., 2022) found extreme-magnitude features that, around 6.7 billion parameters, undergo what the authors call a phase shift: they appear in all transformer layers and affect 75% of sequence dimensions. Naive 8-bit quantization degrades sharply once they emerge. LLM.int8()'s fix keeps the outlier dimensions in 16-bit and quantizes everything else, with more than 99.9% of values still multiplied in 8-bit. With it, the authors ran models up to 175B parameters without performance degradation.

## Smarter 4-bit: GPTQ and AWQ

Going from 8 to 4 bits needs more than a better grid. The two methods most often seen on model hubs take different routes.

**GPTQ** (Frantar et al., 2022) quantizes a layer's weights column by column and updates the not-yet-quantized weights to compensate for the error just introduced, using approximate second-order information from a small calibration set. The paper reports quantizing 175B-parameter models in about four GPU hours, down to 3 or 4 bits per weight, "with negligible accuracy degradation relative to the uncompressed baseline".

**AWQ** (Lin et al., 2023) starts from the observation that not all weights matter equally. Its authors found that protecting only 1% of salient weights greatly reduces quantization error, and that you find those weights by looking at activations, not at the weights themselves. Keeping that 1% in higher precision would be awkward for hardware, so AWQ scales the important channels up before quantizing, which gives them finer effective resolution.

The hero figure above, from the AWQ repository, shows the progression: plain round-to-nearest at 3 bits, mixed precision that keeps salient weights in FP16, and AWQ's scaling approach that recovers the same quality without mixed precision.

Both methods quantize weights only. Activations stay in 16-bit during computation, which is why they are often written as W4A16.

## The formats you will meet

When you download a quantized model, the file name usually tells you the recipe:

| Label | What it usually means |
|---|---|
| FP16 / BF16 | Unquantized, 2 bytes per weight |
| INT8 / 8-bit | 1 byte per weight; usually near-lossless |
| GPTQ, AWQ | 4-bit weight-only, calibrated on sample data, for GPU serving |
| GGUF `Q4_K_M`, `Q8_0` | llama.cpp formats with block-wise scales, popular on CPUs and laptops |
| NF4 | 4-bit NormalFloat from QLoRA, mostly used for fine-tuning |

llama.cpp's documentation notes that quantization "may introduce some accuracy loss", usually measured as perplexity or KL divergence against the original model, and that an importance matrix (`imatrix`) built from sample text can reduce it. That is the same idea as AWQ's calibration: use real data to decide where precision matters.

## What you actually lose

The broad picture from the research:

- **8-bit** with outlier handling is close to lossless for large models.
- **4-bit** with a good method (small groups, calibration) is a small, measurable loss. Dettmers and Zettlemoyer found that, for a fixed total memory budget, 4-bit was "almost universally optimal" for zero-shot accuracy. A bigger model at 4 bits tends to beat a smaller one at 8 bits.
- **3-bit and below** is where quality falls off. GPTQ reports "reasonable accuracy" at 2-bit or ternary levels, which is a long way from "no difference".

Averages can hide where the loss lands. A small change in perplexity on general text says little about the specific capability your application depends on, which is why the advice below is to test on your own tasks. Calibration data matters too: AWQ and GPTQ choose what to protect based on sample text, so a calibration set that does not resemble your workload protects the wrong things.

## What this means for you

**Default to a 4-bit build of a larger model** over an unquantized smaller one when memory is the limit. That trade usually wins.

**Prefer calibrated methods over plain round-to-nearest.** GPTQ, AWQ or imatrix GGUF builds are standard and cost nothing extra to use.

**Evaluate on your own tasks.** Run your evaluation set on the original and the quantized model. Look at the worst-case categories, not just the average score.

**Remember the KV cache.** Weight quantization does not shrink the memory used per token of context. That is a separate setting in most serving engines.

**Keep the original weights.** If a quantized build misbehaves on a task, you want to be able to check whether quantization is the cause.

## What to remember

Quantization stores weights as small integers plus a scale. The hard part is outliers, a few large values that stretch the scale and wipe out precision for everything else.

The methods that work all deal with that: small groups, keeping or rescaling the important channels, and compensating for error as you go. With them, 4-bit has become the practical default, cutting memory four-fold for a modest, measurable loss.

The loss is not zero and it is not uniform. Treat a quantized model as a different model: cheaper, nearly as good, and worth testing before you trust it.

**Sources**

- [Dettmers et al., "LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale" (arXiv:2208.07339)](https://arxiv.org/abs/2208.07339)
- [Frantar et al., "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers" (arXiv:2210.17323)](https://arxiv.org/abs/2210.17323)
- [Lin et al., "AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration" (arXiv:2306.00978)](https://arxiv.org/abs/2306.00978)
- [Dettmers and Zettlemoyer, "The case for 4-bit precision: k-bit Inference Scaling Laws" (arXiv:2212.09720)](https://arxiv.org/abs/2212.09720)
- [Dettmers et al., "QLoRA: Efficient Finetuning of Quantized LLMs" (arXiv:2305.14314)](https://arxiv.org/abs/2305.14314)
- [llama.cpp quantize documentation (GitHub)](https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md)
- [mit-han-lab/llm-awq (GitHub)](https://github.com/mit-han-lab/llm-awq)

**Media credits**:
- Hero image: AWQ overview figure (round-to-nearest, mixed precision, and activation-aware scaling) from [mit-han-lab/llm-awq](https://github.com/mit-han-lab/llm-awq), MIT licence. Padded to 16:9; not otherwise altered.
- In-body diagrams: weight memory by precision and round-to-nearest outlier example, Big Matrix Solutions.
