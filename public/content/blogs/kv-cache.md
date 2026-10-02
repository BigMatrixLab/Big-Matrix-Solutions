---
id: "76"
slug: "how-the-kv-cache-works-long-context-cost"
title: "How the KV Cache Works: Why Long Context Costs What It Costs"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/kv-cache.webp"
category: "Tutorial"
desc: "Prefill, decode, and the memory that grows with every token. How the KV cache works, how to size it, and the tricks (GQA, paging, prefix caching) that keep long context affordable."
date: "Dec 26, 2026"
tags: ["KV Cache", "LLM Inference", "vLLM", "Tutorial"]
---

# How the KV Cache Works: Why Long Context Costs What It Costs

Two requests hit the same model. One has a 500-token prompt, the other 100,000 tokens. The second does not just take longer: it occupies a slice of GPU memory big enough to change how many other users the server can handle at the same time. Most of that memory is not the model. It is the KV cache.

If you have wondered why providers price long prompts the way they do, why "cached input" is cheaper, or why a server falls over at a context length the model officially supports, this is the mechanism behind all three.

## Why there is a cache at all

A decoder-only model generates one token at a time. At each step, the new token's query is compared against the keys of every earlier token, and the result weights their values. (Attention itself is covered in our transformer walkthrough; here we only need the fact that every step reads every earlier key and value.)

The keys and values of earlier tokens do not change when a new token arrives, because causal masking means earlier positions never look forward. So recomputing them on every step would be pure waste. Instead, the model computes each token's key and value vectors once, in every layer, and stores them. That store is the KV cache.

```python
# without a cache: step t recomputes K, V for all t tokens -> quadratic work
# with a cache:
for step in range(max_new_tokens):
    q, k, v = project(last_token)          # only the new token
    cache.append(layer, k, v)              # grows by one entry per layer
    out = attend(q, cache.keys(layer), cache.values(layer))
```

## Prefill and decode are different workloads

Serving a request has two phases.

**Prefill** processes the whole prompt at once. Every prompt token's keys and values are computed in parallel and written to the cache. This is compute-heavy and uses the GPU well.

**Decode** generates output tokens one at a time. Each step does little arithmetic but must read the model weights and the entire cache from memory. Decode is limited by memory bandwidth, not compute, which is why output tokens are slower and usually priced higher than input tokens.

The cache is the bridge: prefill writes it, and every decode step reads all of it.

## How big it gets

The size per token is simple to compute:

```
bytes per token = 2 (K and V) × layers × KV heads × head dimension × bytes per value
```

The vLLM paper gives a worked example: for OPT-13B, a single token's cache needs 800 KB (2 × 5,120 hidden size × 40 layers × 2 bytes in FP16).

Take the published shape of Llama 3 70B: 80 layers, 64 query heads, 8 key/value heads, model dimension 8,192, so 128 dimensions per head. In FP16 that is 2 × 80 × 8 × 128 × 2 bytes = 320 KiB per token. At a 128K-token context, one sequence's cache is 40 GiB.

![KV cache memory for Llama 3 70B with and without grouped-query attention, compared with weight memory](/assets/images/blog/diagrams/kv-cache-1.svg)

*Diagram: Big Matrix Solutions, calculated from the architecture table in [The Llama 3 Herd of Models](https://arxiv.org/abs/2407.21783).*

Two things fall out of that number. First, cache size is linear in context length, so a long prompt costs memory for the entire time the request is being served, not just during prefill. Second, it is per sequence. A server running 32 concurrent requests holds 32 caches. Batch size, and therefore throughput, is set by how many caches fit beside the weights.

The smaller Llama 3 8B makes the point sharper: 32 layers and 8 KV heads give 128 KiB per token, so a full 128K context needs 16 GiB of cache. That is about the same as the model's own weights in FP16.

## Attacking the cache: fewer heads

The formula has four levers. Architects pull the KV-heads lever first.

**Multi-query attention (MQA).** Noam Shazeer's 2019 paper "Fast Transformer Decoding: One Write-Head is All You Need" shares a single key and value head across all query heads. The motivation was explicit: incremental decoding is slow because of the memory-bandwidth cost of repeatedly loading the keys and values. MQA shrinks them dramatically, at some cost in quality.

**Grouped-query attention (GQA).** Ainslie and colleagues (2023) proposed the middle ground: groups of query heads share one KV head. They report GQA reaching quality close to full multi-head attention at speed comparable to MQA, and showed existing checkpoints can be converted using 5% of the original pre-training compute. Llama 3's 8 KV heads serving 64 query heads is GQA. Without it, the 70B example above would need 320 GiB of cache at 128K tokens instead of 40 GiB.

**Latent compression.** DeepSeek-V2's multi-head latent attention compresses keys and values into a smaller latent vector. The paper reports a 93.3% smaller KV cache than DeepSeek 67B.

## Attacking the cache: better memory management

Even with a fixed size per token, how you allocate memory matters. Early serving systems reserved a contiguous chunk for each request sized to its maximum possible length. Most of that sat unused, and different reservation sizes fragmented memory.

The vLLM team measured this. In their profiling, only 20.4% to 38.2% of KV cache memory in existing systems held actual token states. Their answer, PagedAttention, borrows virtual memory paging from operating systems: the cache is split into fixed-size blocks, a block table maps each sequence's logical blocks to physical ones, and blocks are allocated only as tokens arrive.

![vLLM PagedAttention animation: logical KV cache blocks mapped to non-contiguous physical blocks through a block table](/assets/images/blog/kv-cache-paged-attention.webp)

*Logical blocks map to physical blocks as generation proceeds. Source: [vLLM blog](https://blog.vllm.ai/2023/06/20/vllm.html)*

The result, per the paper, is near-zero waste and 2 to 4 times higher throughput than the systems it was compared with, at the same latency. Paging also enables sharing: requests with an identical prefix can point at the same physical blocks.

Two more levers are widely available in serving stacks:

- **KV cache quantization.** Storing keys and values in FP8 instead of FP16 halves the bytes-per-value term. vLLM's documentation says FP8 KV cache "can significantly reduce its memory footprint." As with any quantization, check quality on your workload.
- **Prefix caching.** If many requests start with the same system prompt or document, keep that prefix's cache and skip its prefill next time.

## Why cached input is cheaper

Prefix caching is what API "prompt caching" sells. If the first few thousand tokens of your request match a recent request, the provider reuses the stored cache instead of recomputing prefill.

The pricing reflects the saved work. As of late 2026, Anthropic's documentation prices cache reads at 0.1 times the base input price for most models (lower on some newer ones), with writes to the 5-minute cache at 1.25 times and to the 1-hour cache at 2 times. There is also a minimum cacheable length, which varies by model. Other providers have similar schemes with their own rules.

## What this means for you

**Put stable content first.** Caching works on exact prefixes. System prompt, tool definitions and reference documents go at the top, unchanged byte for byte; per-request content goes at the end. A timestamp in the first line breaks the cache for everything after it.

**Treat context length as a capacity decision.** Every token you send occupies memory for the life of the request. If you self-host, measure how many concurrent sequences fit at your real prompt lengths, not the model's maximum.

**Prefer GQA or latent-attention models for long-context serving.** Two models with similar quality can differ several-fold in cache size per token. Read the config: layers, KV heads and head dimension.

**Use a paged serving engine.** If you self-host, use an engine with paged KV memory and prefix caching rather than a naive implementation.

**Do not send what you do not need.** Retrieval that selects the relevant pages often beats pasting a whole archive, on cost and on latency.

## What to remember

The KV cache trades memory for compute: store every past token's keys and values so each new token only has to compute its own.

That memory grows linearly with context and is held per sequence, so it sets how many users a GPU can serve. Fewer KV heads, compressed latents, lower precision, paging and prefix reuse all attack the same formula from different sides.

Long context is not expensive because the model thinks harder about long inputs. It is expensive because every token you send has to be stored, and read again for every token the model writes back.

**Sources**

- [Kwon et al., "Efficient Memory Management for Large Language Model Serving with PagedAttention" (arXiv:2309.06180)](https://arxiv.org/abs/2309.06180)
- [vLLM blog, "vLLM: Easy, Fast, and Cheap LLM Serving with PagedAttention"](https://blog.vllm.ai/2023/06/20/vllm.html)
- [Shazeer, "Fast Transformer Decoding: One Write-Head is All You Need" (arXiv:1911.02150)](https://arxiv.org/abs/1911.02150)
- [Ainslie et al., "GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints" (arXiv:2305.13245)](https://arxiv.org/abs/2305.13245)
- [DeepSeek-AI, "DeepSeek-V2" (arXiv:2405.04434)](https://arxiv.org/abs/2405.04434)
- [Llama Team, "The Llama 3 Herd of Models" (arXiv:2407.21783)](https://arxiv.org/abs/2407.21783)
- [vLLM documentation: Quantized KV cache](https://docs.vllm.ai/en/latest/features/quantization/quantized_kvcache/)
- [Anthropic documentation: Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

**Media credits**:
- Hero image: PagedAttention animation showing a query attending over KV cache blocks, from the [vLLM blog](https://blog.vllm.ai/2023/06/20/vllm.html) (vLLM project). Converted from GIF to animated WebP; frames not altered. Licence not stated on the page.
- In-body animation: logical-to-physical KV block mapping, from the same [vLLM blog post](https://blog.vllm.ai/2023/06/20/vllm.html). Converted from GIF to animated WebP; frames not altered.
- In-body diagram: KV cache memory for Llama 3 70B, Big Matrix Solutions, calculated from [The Llama 3 Herd of Models](https://arxiv.org/abs/2407.21783).
