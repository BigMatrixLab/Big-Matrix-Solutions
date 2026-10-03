---
id: "75"
slug: "cutting-llm-costs-caching-routing-batching"
title: "Cutting LLM Costs: Caching, Routing and Batching in Practice"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/llm-cost-control.webp"
category: "AI Infrastructure"
desc: "A hands-on playbook for shrinking an LLM bill without touching quality: prompt caching, semantic caching, model routing and batch APIs, in the order you should try them."
date: "Dec 24, 2026"
tags: ["LLM Cost", "Prompt Caching", "Model Routing", "Batch API", "AI Infrastructure"]
---

# Cutting LLM Costs: Caching, Routing and Batching in Practice

Most LLM bills are not too high because the model is expensive. They are too high because the application pays full price for work it has already done, sends easy requests to its most capable model, and demands an instant answer for jobs nobody is waiting on.

Each of those has a mechanical fix. None of them needs a new model, and all of them can be measured from the usage data the providers already return. This is the playbook we use, in the order we apply it.

![Flow diagram: a request passes an exact-match cache, a semantic cache and a router before reaching a small or large model; every call uses a stable cached prefix, and non-urgent work goes to a batch API](/assets/images/blog/diagrams/llm-cost-control-1.svg)

*Diagram: Big Matrix Solutions, based on [Anthropic](https://platform.claude.com/docs/en/build-with-claude/batch-processing) and [OpenAI](https://developers.openai.com/api/docs/guides/batch) documentation.*

## Step zero: find out where the tokens go

Before changing anything, tag every request with the feature that made it and log the usage block that comes back. You want four numbers per feature: input tokens, cached input tokens, output tokens and request count.

Every major API reports the cache split for you. Anthropic returns `cache_creation_input_tokens` and `cache_read_input_tokens` alongside `input_tokens`. OpenAI reports `usage.input_tokens_details.cached_tokens`. The Gemini docs point to a cached-token count in the response usage metadata.

Two patterns show up in almost every audit. A handful of features account for most of the spend, and those features repeat a large block of input on every call: a system prompt, tool schemas, a policy document, a long conversation history. That repeated block is the first target.

## Lever 1: prompt caching

Prompt caching lets the provider reuse the processed form of a prompt prefix it has seen recently, instead of recomputing it. You pay less for those tokens and the request starts generating sooner. The catch is that the match is on an **exact prefix**. Change one character early in the prompt and everything after it is a miss.

The three big providers handle it differently, as of late 2026:

| Provider | How you turn it on | What you need to know |
|---|---|---|
| Anthropic | `cache_control` at the top level of the request (automatic) or on individual content blocks (explicit breakpoints) | Default lifetime is 5 minutes; a 1-hour option exists. Writes cost more than normal input (1.25x for 5 minutes, 2x for 1 hour), reads cost a small fraction. Up to 4 breakpoints. |
| OpenAI | On by default for supported models | Kicks in from 1,024 input tokens on recent models. Routing uses a hash of the first tokens, including tool definitions. An optional `prompt_cache_key` helps related requests land on the same cache. |
| Google Gemini | Implicit caching on by default for Gemini 2.5 and newer; explicit caches via the API | Implicit savings are passed on automatically. Explicit caches have a TTL (default 1 hour if unset) and are billed for storage time as well as reduced-rate reads. |

The specifics shift between model generations, so check the minimum cacheable length and the read discount for your exact model before you model the savings.

### Lay out the prompt for the cache

![Diagram of a prompt laid out as tools, system prompt, reference docs, history and new turn, with a cache breakpoint before the new turn](/assets/images/blog/diagrams/llm-cost-control-2.svg)

*Diagram: Big Matrix Solutions, based on [Anthropic prompt caching docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching).*

Anthropic's documentation is explicit about order: "Cache prefixes are created in the following order: `tools`, `system`, then `messages`." OpenAI gives the same advice in different words, putting "stable developer instructions and shared reference material first" and telling you to append new messages rather than rewrite earlier turns.

In practice that means:

- **Nothing dynamic at the top.** No timestamps, request IDs, user names or A/B flags in the system prompt. Move them to the end of the latest user message.
- **Freeze tool definitions.** Sort them deterministically and do not toggle tools per request. On Anthropic, changing tool definitions invalidates the whole cache.
- **Append, don't rewrite.** If you summarise or trim history, do it rarely and in one step, not on every turn.
- **Keep traffic warm.** Short-lived caches only pay off if the next request with the same prefix arrives before expiry. For bursty or batch traffic, a longer TTL can be worth its higher write price.

Then check the result in your logs. If cached input tokens stay near zero on a feature with a long fixed preamble, something in the prefix is changing.

## Lever 2: response caching, exact and semantic

Prompt caching makes a repeated *prefix* cheaper. Response caching skips the model entirely when the *whole request* has been answered before.

**Exact-match caching** is the safe version. Hash the normalised request (model, parameters, full prompt) and store the response. It works well for deterministic jobs such as classification, extraction from the same document, or FAQ-style questions with fixed wording. Use a TTL that matches how quickly the underlying data changes.

**Semantic caching** goes further: embed the incoming query, look for a stored query that is close enough in vector space, and return its answer. Open-source tools such as GPTCache work this way, using an embedding model, a vector store and a similarity check. Their own documentation is candid about the risk: "you may encounter false positives during cache hits and false negatives during cache misses."

A false positive means a user gets a confident answer to a question they did not ask. So:

- Restrict semantic caching to low-stakes, high-repetition traffic, such as public product questions.
- Never share cached answers across tenants or permission boundaries.
- Start with a strict similarity threshold, sample hits for human review, and loosen only with evidence.
- Exclude anything personal, time-sensitive or account-specific.

## Lever 3: model routing

Most production traffic is not hard. Routing sends each request to the cheapest model likely to handle it and escalates the rest.

The simplest router is rules: route by feature, input length, or a cheap classifier's label. A step up is a cascade: answer with the small model, validate the output (schema check, tests, a confidence signal, a second opinion), and retry on the large model only when validation fails.

Learned routers predict difficulty directly. The RouteLLM work from LMSYS and collaborators trained routers on human preference data and reported that routing "significantly reduces costs-by over 2 times in certain cases" without hurting response quality on their benchmarks. Treat that as evidence the idea works, not as a number to put in your forecast. Your traffic mix decides the savings.

What makes routing safe in practice:

- **An evaluation set per feature.** Run both tiers against it before you route anything, and re-run when either model changes.
- **Cheap, objective escalation signals.** Failed JSON validation, a failing test, or two samples disagreeing are better triggers than the model's self-reported confidence.
- **Logging the route.** You need to know which tier answered when a user complains.

## Lever 4: batch APIs for anything that can wait

Overnight enrichment, evaluation runs, back-filling embeddings, tagging a document archive: none of these need an answer in two seconds. All three major providers sell asynchronous batch processing at half price.

| Provider | Discount | Turnaround | Limits worth knowing |
|---|---|---|---|
| OpenAI Batch API | 50% | Within 24 hours | Up to 50,000 requests and 200 MB per input file; separate rate limits from the synchronous API |
| Anthropic Message Batches | 50% | Most batches under 1 hour; expire after 24 hours | Up to 100,000 requests or 256 MB; results kept for 29 days |
| Gemini Batch API | 50% of standard cost | Target of 24 hours | Inline requests under 20 MB, or a JSONL file up to 2 GB |

Discounts stack. Anthropic states that prompt caching and batch pricing can be combined, though cache hits in a batch are best-effort because requests run concurrently. Its docs suggest the 1-hour cache for batches that share context.

The engineering work is mostly plumbing. Requests need stable custom IDs so you can join results back, the pipeline has to tolerate partial failures and expired requests, and somebody has to own the job that polls for completion.

## Lever 5: spend fewer output tokens

On the major APIs, output tokens are priced well above input tokens, so the last lever is trimming what the model writes:

- Ask for structured output with only the fields you need, not prose plus a JSON block.
- Set a `max_tokens` ceiling per feature based on observed lengths.
- For reasoning models, use the lowest effort or thinking budget that passes your evals.
- Stop generating rationales nobody reads.

## A practical checklist

- Every request tagged by feature; usage, cached tokens and route logged
- Static content first in every prompt; no timestamps or IDs in the prefix
- Tool definitions sorted and frozen; cache hit rate checked per feature
- Exact-match response cache on deterministic endpoints, with TTLs
- Semantic cache only on low-risk traffic, tenant-isolated, with sampled review
- Per-feature eval set before any routing change
- Escalation triggered by objective checks, not self-reported confidence
- All non-interactive jobs moved to a batch API
- Output length capped and reasoning effort tuned per feature
- A monthly review of cost per successful task, not just cost per token

## Where this leaves you

None of these levers is clever on its own. The savings come from applying them in order: measure, cache the prefix, cache whole answers where it is safe, route by difficulty, defer what can wait, and cap what the model writes. Each step is reversible and measurable from data you already have. The useful metric at the end is cost per successful task. If that number falls while quality holds on your eval set, you are done; if it falls while complaints rise, a cache or router is being too aggressive.

**Sources**

- https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- https://platform.claude.com/docs/en/build-with-claude/batch-processing
- https://developers.openai.com/api/docs/guides/prompt-caching
- https://developers.openai.com/api/docs/guides/batch
- https://ai.google.dev/gemini-api/docs/caching
- https://ai.google.dev/gemini-api/docs/generate-content/caching
- https://ai.google.dev/gemini-api/docs/batch-api
- https://github.com/zilliztech/GPTCache
- https://arxiv.org/abs/2406.18665
- https://lmsys.org/blog/2024-07-01-routellm/

**Media credits**:
- Hero image: "Ideal Router" cost-versus-performance figure from the RouteLLM announcement, LMSYS (shown on a plain background) — [LMSYS blog](https://lmsys.org/blog/2024-07-01-routellm/). Paper: [arXiv:2406.18665](https://arxiv.org/abs/2406.18665) (arXiv non-exclusive distribution licence).
- Diagrams: Big Matrix Solutions, based on the Anthropic, OpenAI and Google documentation listed above.
