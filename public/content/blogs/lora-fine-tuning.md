---
id: "97"
slug: "how-lora-works-low-rank-fine-tuning"
title: "How LoRA Works: Fine-Tuning Without Retraining the Whole Model"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/lora-fine-tuning.webp"
category: "Tutorial"
desc: "Freeze the model, train two thin matrices, merge them back in. How low-rank adaptation works, what QLoRA adds, and what research says LoRA learns less of."
date: "Feb 06, 2027"
tags: ["LoRA", "Fine-Tuning", "QLoRA", "PEFT", "Tutorial"]
---

# How LoRA Works: Fine-Tuning Without Retraining the Whole Model

Full fine-tuning a large model means updating every weight. For a 175-billion-parameter model that means holding the weights, their gradients and the optimiser's state in GPU memory at once, then saving a complete new copy of the model for every task. For most teams that is not a budget line; it is a non-starter.

LoRA (low-rank adaptation) changed that. You freeze the original model, train a pair of very thin matrices beside each chosen layer, and ship only those. The result is often close to full fine-tuning, for a fraction of the memory and a few megabytes of storage per task.

## The idea: the update is low-rank

Hu and colleagues at Microsoft published LoRA in 2021. Its premise comes from earlier work showing that learned, over-parametrised models in fact reside on a low intrinsic dimension. The authors hypothesised that the change in weights during adaptation also has a low "intrinsic rank".

If that is true, you do not need to learn a full update matrix. Any `d × d` update of rank `r` can be written as the product of two thin matrices:

```
ΔW = B · A        B is d × r,  A is r × d,  r ≪ d
h  = W·x + (α / r) · B·A·x
```

`W` is frozen. Only `A` and `B` are trained. `A` starts random and `B` starts at zero, so `BA` is zero at the start and training begins exactly at the base model. The `α / r` factor scales the update; the paper notes that tuning `α` is roughly like tuning the learning rate.

The saving is large. For a single 4,096 × 4,096 projection:

![Parameter count of a 4096 by 4096 matrix compared with a rank-8 LoRA adapter](/assets/images/blog/diagrams/lora-fine-tuning-1.svg)

*Diagram: Big Matrix Solutions, based on [Hu et al., 2021](https://arxiv.org/abs/2106.09685).*

Full fine-tuning updates 16.8 million values in that one matrix. A rank-8 adapter trains 65,536, about 0.4%.

## Why the numbers get dramatic at scale

The paper's headline comparison is GPT-3 175B fine-tuned with Adam. LoRA reduced the number of trainable parameters by 10,000 times and the GPU memory requirement by 3 times. Training VRAM fell from 1.2 TB to 350 GB, because there are no gradients or optimiser states for frozen weights.

Storage is where it becomes almost absurd. With rank 4, adapting only the query and value projections, the paper's checkpoint shrank from 350 GB to 35 MB.

![Storage for 100 full fine-tunes of GPT-3 compared with one base model and 100 LoRA adapters](/assets/images/blog/diagrams/lora-fine-tuning-2.svg)

*Diagram: Big Matrix Solutions, figures from [Hu et al., 2021](https://arxiv.org/abs/2106.09685).*

A hundred task-specific models become one shared base plus a hundred small files: about 354 GB instead of 35 TB.

## No extra latency, if you merge

Earlier adapter methods inserted new layers into the network, which added work to every forward pass. LoRA does not. After training, you can compute `W + (α/r)·BA` once and replace the original weights. The merged model has exactly the same shape and speed as the base. The paper lists "no additional inference latency" among LoRA's advantages over adapters.

You can also keep the adapter separate and apply it on the fly. That costs a little compute, but it lets one copy of the base model serve many adapters. S-LoRA (Sheng et al., 2023) showed a single system serving thousands of LoRA adapters on one GPU or across several, batching requests for different adapters together. vLLM and Hugging Face PEFT both support LoRA adapters too; S-LoRA's benchmarks compare against them.

## QLoRA: fine-tuning a quantized base

LoRA removes the gradient and optimiser memory for the base weights, but the base weights themselves still have to sit in GPU memory. QLoRA (Dettmers et al., 2023) shrinks those too: it stores the frozen base in 4 bits and backpropagates through it into 16-bit LoRA adapters.

It added three pieces:

- **4-bit NormalFloat (NF4)**, a data type designed for normally distributed weights.
- **Double quantization**, which quantizes the quantization constants themselves, saving about 0.37 bits per parameter (roughly 3 GB on a 65B model).
- **Paged optimisers**, which use NVIDIA unified memory to absorb memory spikes on long sequences.

The headline result: fine-tuning a 65B-parameter model on a single 48 GB GPU while preserving full 16-bit fine-tuning task performance. The paper also found a practical rule that is easy to miss. Applying LoRA to all linear layers of the transformer block was required to match full fine-tuning, while the rank `r` mattered much less in their experiments.

## What LoRA learns less of

LoRA is not free. Biderman and colleagues (2024) compared LoRA and full fine-tuning on programming and mathematics, both for instruction tuning (about 100K examples) and continued pre-training (20B tokens). Their title sums it up: "LoRA Learns Less and Forgets Less."

- In standard low-rank settings, LoRA substantially underperformed full fine-tuning on the target domain.
- LoRA better preserved the base model's performance outside that domain, mitigating forgetting more than weight decay or dropout.
- Full fine-tuning learned weight changes with a rank 10 to 100 times higher than typical LoRA settings, which may explain the gap.

Our reading: that lines up with how LoRA is used in practice. It is very good at teaching a model a format, a style, a narrow task or a domain vocabulary. It is weaker at pushing large amounts of new knowledge or skill into the model. If your goal resembles continued pre-training on a large corpus, low-rank updates may be the wrong tool.

## The settings that matter

In Hugging Face's PEFT library, a LoRA configuration comes down to a few fields:

```python
from peft import LoraConfig

config = LoraConfig(
    r=16,                         # rank of A and B
    lora_alpha=32,                # scale is lora_alpha / r
    target_modules="all-linear",  # which layers get adapters
    lora_dropout=0.05,
)
```

- **`target_modules`**: the original paper adapted only attention query and value matrices; QLoRA found all linear layers were needed to match full fine-tuning. Start broad.
- **`r`**: higher rank means more capacity and more parameters. Increase it when the task is large or far from the base model's existing skills.
- **`lora_alpha`**: interacts with the learning rate. Changing `r` without revisiting `alpha` changes the effective step size.

The values above are a starting point, not a recommendation from any paper. Tune them against an evaluation set.

## What this means for you

**Try prompting and retrieval first.** If the model already knows how to do the task and only needs the right context, fine-tuning adds cost without adding much.

**Use LoRA for behaviour, format and narrow tasks.** Consistent output structure, house style, classification and extraction are where small adapters shine.

**Use QLoRA when memory is the limit.** It is the standard way to fine-tune large open-weight models on a single GPU.

**Evaluate both directions.** Measure gains on the target task and regressions on general tasks you still care about. LoRA tends to forget less, but "less" is not "nothing".

**Keep adapters as artefacts.** Version them, record the base model and its exact revision, and remember that an adapter only works on the base it was trained against.

## What to remember

LoRA freezes the model and learns a low-rank update `BA` for selected weight matrices. That cuts trainable parameters and optimiser memory dramatically, shrinks checkpoints to megabytes, and adds no latency once merged.

QLoRA extends it by quantizing the frozen base to 4 bits, which brings fine-tuning of very large models onto a single GPU.

The trade is capacity. A low-rank update learns less than a full one, and it also forgets less. For most applied work that is the right trade, as long as you know you are making it.

**Sources**

- [Hu et al., "LoRA: Low-Rank Adaptation of Large Language Models" (arXiv:2106.09685)](https://arxiv.org/abs/2106.09685)
- [Dettmers et al., "QLoRA: Efficient Finetuning of Quantized LLMs" (arXiv:2305.14314)](https://arxiv.org/abs/2305.14314)
- [Biderman et al., "LoRA Learns Less and Forgets Less" (arXiv:2405.09673)](https://arxiv.org/abs/2405.09673)
- [Sheng et al., "S-LoRA: Serving Thousands of Concurrent LoRA Adapters" (arXiv:2311.03285)](https://arxiv.org/abs/2311.03285)
- [Hugging Face PEFT documentation: LoRA](https://huggingface.co/docs/peft/main/en/conceptual_guides/lora)
- [microsoft/LoRA (GitHub)](https://github.com/microsoft/LoRA)

**Media credits**:
- Hero image: LoRA reparametrization diagram (pretrained weights plus low-rank B and A, merged after training) from the [Hugging Face PEFT documentation](https://huggingface.co/docs/peft/main/en/conceptual_guides/lora); PEFT is licensed Apache 2.0. Padded to 16:9; not otherwise altered.
- In-body diagrams: LoRA parameter count and adapter storage, Big Matrix Solutions, based on [Hu et al., 2021](https://arxiv.org/abs/2106.09685).
