---
id: "88"
slug: "how-llm-serving-works-continuous-batching-pagedattention-vllm"
title: "How LLM Serving Works: Continuous Batching, PagedAttention and vLLM"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/llm-serving-pagedattention.webp"
category: "AI Infrastructure"
desc: "Why serving a language model is a memory-management problem, how iteration-level scheduling and paged KV caches fixed it, and what to tune when you run your own inference server."
date: "Jan 19, 2027"
tags: ["AI Infrastructure", "LLM Serving", "vLLM", "Inference", "Tutorial"]
---

# How LLM Serving Works: Continuous Batching, PagedAttention and vLLM

Running a language model for one user is easy: load the weights, feed in a prompt, generate tokens. Running it for thousands of users at once on the same GPUs is a different problem, and most of what makes it hard has little to do with the model itself.

The difficulty is that every request is a different length, every request grows as it generates, and the GPU can only be used efficiently if many requests are processed together. Two ideas, now built into nearly every serious inference server, solved most of this: **continuous batching** and **PagedAttention**. This post explains both, and the features built on top of them.

## Two phases with different bottlenecks

Every request goes through two phases.

**Prefill** processes the whole prompt in one pass. All prompt tokens are known up front, so the work is a set of large matrix multiplications. This phase is **compute-bound** and uses the GPU well.

**Decode** generates output one token at a time. Each step processes a single new token per request but must read all the model weights and the request's stored attention state. This phase is **memory-bandwidth-bound**. For one request alone, the GPU's compute units are mostly idle.

Batching fixes decode. If 64 requests decode together, the weights are read once per step and used 64 times. Throughput rises almost linearly until something else runs out. That something is nearly always memory for the **KV cache**.

## The KV cache is the real constraint

During generation, each layer stores a key and a value vector for every token so they are not recomputed at every step. That store is the KV cache, and it is large.

The vLLM paper (Kwon et al., SOSP 2023) gives a concrete figure. For the 13B-parameter OPT model, one token's KV cache takes **800 KB**: 2 (key and value) x 5,120 (hidden size) x 40 (layers) x 2 bytes. At OPT's 2,048-token maximum, one request can need **1.6 GB**. On a 40 GB A100 serving that model, the paper shows about **65%** of memory going to weights and close to **30%** to KV cache.

So the number of requests you can batch, and therefore your throughput, depends on how many KV caches fit in memory. Wasting KV memory directly reduces throughput.

## Problem one: static batching wastes slots

Early serving systems batched at the **request** level. Collect a batch, run it until every request finishes, then start the next batch. Requests finish at different times, so short requests sit idle in their slots while the longest one runs. New arrivals wait for the whole batch to finish.

![Timeline comparing static batching, where finished slots stay idle until the longest request ends, with continuous batching, where finished slots are refilled on the next step](/assets/images/blog/diagrams/llm-serving-1.svg)

*Diagram: Big Matrix Solutions, based on the iteration-level scheduling described in [Orca (OSDI 2022)](https://www.usenix.org/conference/osdi22/presentation/yu).*

The fix came from **Orca** (Yu et al., OSDI 2022), which introduced **iteration-level scheduling**. The scheduler makes decisions at every decode step rather than once per batch. When a request emits its end token, it leaves the batch, and a waiting request takes its place at the next step. Orca paired this with **selective batching**: operations like the matrix multiplications are batched across requests, while attention, which depends on each request's own length, is computed per request.

This is what the industry now calls **continuous batching**. Orca reported a **36.9x** throughput improvement over NVIDIA FasterTransformer at the same latency on GPT-3 175B. Most of that gain came from no longer leaving slots empty.

## Problem two: KV memory is fragmented

Continuous batching keeps slots full, but it does not solve how KV cache memory is allocated. Earlier systems reserved one contiguous chunk per request, sized for the maximum possible output length, because they could not know in advance how long a response would be.

That causes three kinds of waste:

- **Reservation**: memory held for tokens that have not been generated yet, and may never be.
- **Internal fragmentation**: the unused tail when a response ends well short of the maximum.
- **External fragmentation**: gaps between differently sized chunks that are too small for new requests.

The vLLM authors measured this. In the systems they tested, only **20.4% to 38.2%** of KV cache memory held actual token states. The rest was waste.

## PagedAttention: virtual memory for the KV cache

The vLLM paper borrows the operating-system solution to the same problem: **paging**.

PagedAttention splits each request's KV cache into fixed-size **blocks**. vLLM's default is 16 tokens per block. Blocks do not need to sit next to each other in GPU memory. Each request keeps a **block table** that maps its logical blocks (token 0-15, 16-31 and so on) to whichever physical blocks were free when it needed them. The attention kernel reads the block table and fetches keys and values from those scattered locations.

![Animation of the PagedAttention kernel computing attention for a query token across key and value blocks stored in non-contiguous memory](/assets/images/blog/llm-serving-pagedattention-blocks.gif)

*PagedAttention fetches key and value blocks wherever they sit in memory. Source: [vLLM blog](https://blog.vllm.ai/2023/06/20/vllm.html)*

The consequences:

- **Memory is allocated on demand**, one block at a time as tokens are generated. No reservation for tokens that may never exist.
- **Waste is limited to the last, partly filled block** of each request. The paper describes this as near-zero waste; in its measurements vLLM used **96.3%** of KV memory for token states.
- **Blocks can be shared.** When several outputs come from the same prompt (parallel sampling, beam search), their prompt blocks point to the same physical memory. A block is copied only when one sequence writes to it, the same copy-on-write approach operating systems use.

More requests fit in the same memory, so batches are larger. The paper reports **2-4x** higher throughput than FasterTransformer and Orca at the same latency, with larger gains for longer sequences, larger models and more complex decoding.

When memory does run out, vLLM preempts requests and either swaps their blocks to CPU memory or discards and recomputes them later.

## What has been built on top

Paged, block-based KV caches made several later optimisations practical:

**Prefix caching.** vLLM hashes each full KV block using its tokens and everything before it. A new request that starts with the same prefix (a shared system prompt, a long document, earlier turns of a chat) reuses the cached blocks and skips that part of prefill. vLLM's design docs call it "almost a free lunch".

**Chunked prefill.** A long prompt's prefill can stall every decoding request in the batch. Sarathi-Serve (OSDI 2024) splits prefills into chunks and mixes them with ongoing decode steps, creating schedules that add new requests "without pausing ongoing decodes".

**Prefill/decode disaggregation.** DistServe (OSDI 2024) goes further and runs the two phases on different GPUs, so each can be configured for its own bottleneck. The KV cache is transferred between them.

**Speculative decoding.** A small draft model proposes several tokens and the large model verifies them in one pass (Leviathan et al., 2023). This trades spare compute during decode for fewer sequential steps.

## What it means for you

If you call a hosted API, all of this is already running behind it. It still affects you: **stable prompt prefixes are cheaper and faster** wherever prefix caching is in use, so put fixed instructions first and variable content last.

If you run your own server with vLLM or a similar engine:

- **GPU memory is your main setting.** Memory not used by weights becomes KV cache, and KV cache sets your maximum batch size. A smaller or more heavily quantised model can mean much higher throughput.
- **Set maximum context length to what you need.** It limits how much KV memory a single request can take.
- **Watch preemption.** If your logs show frequent swapping or recomputation, you are oversubscribed: add memory, cut concurrency or shorten contexts.
- **Benchmark with your real traffic.** Throughput depends on the mix of prompt and output lengths. A benchmark with uniform short prompts will overstate what you get in production.
- **Turn on prefix caching** when many requests share long prefixes, such as RAG templates or agent system prompts, and check your engine's default.

## The short version

LLM serving is mostly a memory-management problem. Prefill is compute-bound; decode is bandwidth-bound and only efficient in large batches; batch size is limited by KV cache memory. Continuous batching keeps the batch full by scheduling every iteration. PagedAttention keeps KV memory almost free of waste by allocating small blocks on demand, the same way operating systems handle virtual memory. As of late 2026, those two ideas are standard across production inference engines, and most newer serving optimisations are built on them.

**Sources**

- https://arxiv.org/abs/2309.06180
- https://github.com/vllm-project/vllm
- https://blog.vllm.ai/2023/06/20/vllm.html
- https://docs.vllm.ai/en/latest/design/prefix_caching.html
- https://www.usenix.org/conference/osdi22/presentation/yu
- https://arxiv.org/abs/2403.02310
- https://arxiv.org/abs/2401.09670
- https://arxiv.org/abs/2211.17192

**Media credits**:
- Hero image: PagedAttention block table illustration (final frame of the animation, placed on a white 16:9 canvas), © vLLM team — [vLLM blog](https://blog.vllm.ai/2023/06/20/vllm.html)
- PagedAttention kernel animation, © vLLM team — [vLLM blog](https://blog.vllm.ai/2023/06/20/vllm.html)
- Batching timeline diagram: Big Matrix Solutions, based on [Orca (OSDI 2022)](https://www.usenix.org/conference/osdi22/presentation/yu)
