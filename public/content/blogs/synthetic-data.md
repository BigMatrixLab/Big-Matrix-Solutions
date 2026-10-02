---
id: "102"
slug: "synthetic-data-where-it-works-where-it-collapses"
title: "Synthetic Data: Where It Works, Where It Collapses"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/synthetic-data-model-collapse.png"
category: "LLM Research"
desc: "Model-generated training data built instruction tuning, small code models and olympiad geometry. It also causes model collapse. The difference comes down to verification and whether real data stays in the mix."
date: "Feb 16, 2027"
tags: ["Synthetic Data", "LLM Research", "Model Collapse", "Training Data"]
---

# Synthetic Data: Where It Works, Where It Collapses

Training data written by models rather than people is now a normal part of building language models. Apple's 2025 foundation model report lists "high-quality synthetic data" among its training sources. Instruction datasets, code exercises, maths problems and reasoning traces are routinely generated at scale.

There is also a well-known warning. A 2024 *Nature* paper showed that models trained on the output of earlier models degrade in a specific, predictable way, an effect the authors named **model collapse**.

Both are true. Synthetic data works very well in some settings and fails badly in others. The deciding factors are how the data is checked and whether real data stays in the training mix.

## Where it clearly works

### Bootstrapping instruction following

**Self-Instruct** (Wang et al., 2022) had GPT-3 generate its own instruction-following examples, filtered out low-quality and duplicate ones, and fine-tuned on the result. The authors report a **33% absolute improvement** over the original model on Super-NaturalInstructions, close to InstructGPT-001, without a large human-written dataset. Many later open instruction datasets used variations of this method.

### Textbook-quality data for small models

**phi-1** (Gunasekar et al., 2023) trained a **1.3B-parameter** code model on about 7B tokens: 6B of filtered "textbook quality" web data and **1B tokens of synthetic textbooks and exercises** generated with GPT-3.5. It reached **50.6% pass@1 on HumanEval** and 55.5% on MBPP, competitive with much larger models of the time. The lesson was that carefully designed synthetic data can be denser and cleaner than average web text.

### Domains with a built-in checker

**AlphaGeometry** (Google DeepMind, *Nature*, January 2024) trained on **100 million** synthetic geometry examples created without human demonstrations. A symbolic engine generated random constructions and derived proofs, so every example was correct by construction. The system solved **25 of 30** olympiad geometry problems within time limits; the average human gold medallist solved 25.9.

The same principle covers code with unit tests and maths with checkable answers. When a program can confirm that each generated example is correct, the model generating the data does not need to be reliable. The checker supplies the reliability, which is also the idea behind reinforcement learning from verifiable rewards.

### Distillation

Training a small model on a larger model's outputs is now a standard way to ship capable small models. This works because the goal is to copy a stronger model's behaviour, not to exceed it.

## Where it collapses

Shumailov et al. ("AI models collapse when trained on recursively generated data", *Nature*, July 2024) studied what happens when this is done repeatedly. Train a model, generate data from it, train the next model on that data, and repeat.

![Figure 1 from the Nature model collapse paper: the recursive training setup, and perplexity distributions and test perplexity across nine generations of OPT-125m with no real data preserved and with 10% preserved](/assets/images/blog/synthetic-data-model-collapse-fig1.png)

*Figure 1 from Shumailov et al. Panel a shows the recursive setup. Panels b and c show results with no real data kept and with 10% kept. Source: [Nature](https://www.nature.com/articles/s41586-024-07566-y), CC BY 4.0*

Their central finding: "indiscriminate use of model-generated content in training causes irreversible defects", in which the **tails of the original distribution disappear**. They showed this in LLMs, variational autoencoders and Gaussian mixture models.

The mechanism is easy to follow:

- **Finite sampling.** Any sample of generated text under-represents rare events. Some never appear at all.
- **Approximate fitting.** The next model learns from that sample and slightly over-weights common patterns.
- **Compounding.** Each generation inherits the previous generation's distortion and adds its own.

The paper describes two stages. In **early model collapse**, the model loses information about the tails: rare facts, unusual phrasings, minority cases. In **late model collapse**, it converges to a distribution that "carries little resemblance to the original one", with much lower variance.

The language model experiment fine-tuned Meta's OPT-125m on wikitext2 over successive generations. With no original data kept, performance on the real test set worsened. Keeping a random **10% of the original data** in each generation made the degradation much smaller.

For practitioners, the early stage is the more important warning. A model can look fine on average benchmarks while quietly losing exactly the rare cases that matter in production.

## The variable that matters: replace or accumulate

The collapse results depend heavily on one design choice. In the main setting, each generation's synthetic data **replaces** the data before it.

Gerstgrasser et al. ("Is Model Collapse Inevitable?", 2024) tested the alternative: keep the original real data and **accumulate** each generation's synthetic data alongside it.

![Diagram comparing two pipelines: in replace, each generation trains only on the previous generation's synthetic output; in accumulate, the real data stays and synthetic data is added](/assets/images/blog/diagrams/synthetic-data-1.svg)

*Diagram: Big Matrix Solutions, based on [Shumailov et al., 2024](https://www.nature.com/articles/s41586-024-07566-y) and [Gerstgrasser et al., 2024](https://arxiv.org/abs/2404.01413).*

Accumulating avoided collapse across language models, diffusion models and VAEs. Their theory shows that with accumulation, test error has "a finite upper bound independent of the number of iterations".

This explains why the successes above do not contradict the *Nature* result. Self-Instruct and phi-1 were single rounds of generation, filtered and mixed with other data. AlphaGeometry's data was verified by a symbolic engine. None of them involved a model repeatedly learning only from its own unchecked output.

The concern for the wider field is the open web. As more online text is model-generated, future web crawls will contain more synthetic content without labels. The *Nature* authors conclude that data from genuine human interactions will become more valuable as a result.

## A practical checklist

If you are generating training or fine-tuning data:

1. **Verify wherever you can.** Run generated code against tests. Check maths answers. Validate structured outputs against a schema. Unverified synthetic data is where most quality problems start.
2. **Keep real data in every round.** Never let a fine-tuning pipeline train only on the previous model's outputs. Accumulate; do not replace.
3. **Protect the tails on purpose.** Generators over-produce typical cases. Prompt explicitly for edge cases, rare categories and hard examples, and check coverage against a real-world distribution.
4. **Deduplicate and filter.** Near-duplicates inflate the common patterns that collapse already over-weights.
5. **Track provenance.** Label which examples are synthetic, which model produced them and when. You cannot fix a data problem you cannot trace.
6. **Evaluate on human data.** Hold out a real, human-labelled test set, and include rare cases in it. A model tuned on synthetic data and evaluated on similar synthetic data will look better than it is.
7. **Check the licence.** Some model providers' terms restrict how outputs may be used for training; OpenAI's terms, for example, bar using output to develop competing models. Confirm before you build a dataset from them.

## What it means for you

Synthetic data is a tool for **amplifying** a signal you already have: a small set of good examples, a verifier, a stronger teacher model. It is not a substitute for that signal. Used once, with checking and real data in the mix, it is one of the most cost-effective ways to improve a model. Used in a closed loop without verification, it slowly removes the rare cases your users care about most.

## The bottom line

As of late 2026, the evidence points the same way. Synthetic data works when something independent of the generating model guarantees quality, such as a test suite, a proof checker or a held-out real dataset, and when real data stays in the training mix. It fails when a model learns repeatedly from its own unchecked output. The real risk is not synthetic data itself but feedback loops nobody is watching. If you track provenance, keep real data, and check the rare cases, you get the benefits without the collapse.

**Sources**

- https://www.nature.com/articles/s41586-024-07566-y
- https://arxiv.org/abs/2404.01413
- https://arxiv.org/abs/2212.10560
- https://arxiv.org/abs/2306.11644
- https://deepmind.google/discover/blog/alphageometry-an-olympiad-level-ai-system-for-geometry/
- https://arxiv.org/abs/2507.13575
- https://openai.com/policies/row-terms-of-use/

**Media credits**:
- Hero image: Fig. 1a (model collapse setting) from Shumailov et al., "AI models collapse when trained on recursively generated data", *Nature* 631, 755–759 (2024), CC BY 4.0 — [Nature](https://www.nature.com/articles/s41586-024-07566-y). Cropped to panel a and placed on a white 16:9 canvas.
- Full Fig. 1 from the same paper, CC BY 4.0 — [Nature](https://www.nature.com/articles/s41586-024-07566-y). Transparent background flattened to white.
- Replace vs accumulate diagram: Big Matrix Solutions, based on [Shumailov et al., 2024](https://www.nature.com/articles/s41586-024-07566-y) and [Gerstgrasser et al., 2024](https://arxiv.org/abs/2404.01413)
