---
id: "85"
slug: "agent-memory-what-to-remember-forget-store"
title: "Agent Memory: What to Remember, What to Forget, and Where to Put It"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/agent-memory.webp"
category: "Agentic AI"
desc: "Working, episodic, semantic and procedural memory mapped to real storage, with a write policy, a read policy and an expiry policy that keep an agent's memory useful instead of dangerous."
date: "Jan 13, 2027"
tags: ["Agentic AI", "Agent Memory", "Architecture", "LLM"]
---

# Agent Memory: What to Remember, What to Forget, and Where to Put It

Memory is the feature users ask for first. "Why do I have to tell it my time zone every time?" is a fair complaint, and an agent that remembers context across sessions feels dramatically more capable than one that does not.

It is also the feature most likely to go quietly wrong. Everything an agent remembers is something that can be out of date, misunderstood, leaked to the wrong user or planted by an attacker. A memory system without a policy for writing, reading and forgetting is a slowly growing pile of liabilities.

This post is about designing that policy. The model is not the hard part. The hard part is deciding what deserves to persist.

## Four kinds of memory

The clearest vocabulary comes from the CoALA paper (Cognitive Architectures for Language Agents, Sumers et al.), which borrows from cognitive science and divides agent memory into four types:

- **Working memory**: information active for the current decision, which for an LLM agent is essentially the context window.
- **Episodic memory**: records of past experience, such as earlier trajectories and what happened in them.
- **Semantic memory**: knowledge about the world and the user, such as facts and preferences.
- **Procedural memory**: how to do things, held implicitly in the model's weights and explicitly in the agent's code and prompts.

The useful move is to map each type to a concrete place in your architecture, because each has different lifetime, ownership and risk.

![Diagram of four places agent state can live: context window, session state, long-term store and versioned instructions and code, with write and read policies underneath](/assets/images/blog/diagrams/agent-memory-1.svg)

*Diagram: Big Matrix Solutions, based on [Sumers et al., CoALA (arXiv:2309.02427)](https://arxiv.org/abs/2309.02427) and [Park et al., Generative Agents (arXiv:2304.03442)](https://arxiv.org/abs/2304.03442).*

Two of these are easy to overlook. **Session state**, meaning the message history and intermediate results of one conversation, is short-term memory and usually just needs checkpointing under a thread or conversation id. **Procedural memory** in the form of system prompts, tool definitions and skills is memory too, and it should live in version control and change through code review, not through the agent rewriting its own instructions in production.

## What is worth remembering

Most of what passes through an agent's context should not outlive the session. A useful filter is to ask whether a piece of information is stable, attributable and not already owned by another system.

| Remember | Do not remember |
|---|---|
| Preferences the user stated explicitly ("reply in British English") | Guesses about preferences inferred from one interaction |
| Facts the user confirmed about themselves or their project | Transient state (the current page, today's ticket queue) |
| Decisions and the reason for them | Raw transcripts, kept "just in case" |
| Outcomes of past runs, including approaches that failed | Data whose system of record is elsewhere (order status, account balance) |
| Corrections the user made to the agent's behaviour | Secrets, credentials and anything you would not want quoted back |

The fourth row on the right deserves emphasis. If the CRM owns the customer's address, the agent should look it up, not remember it. A remembered copy is a cache with no invalidation, and it will eventually disagree with the source.

## Where to put it

Pick storage by access pattern, not by what is fashionable.

**Files.** For coding and project agents, a plain directory of markdown or JSON files is hard to beat. Anthropic's memory tool takes this approach: the model issues file operations against a `/memories` directory and, in the documentation's words, "the memory tool operates client-side," so your application decides where the data actually lives. Files are human-readable, diffable and easy to delete, which matters a great deal when memory goes wrong.

**Key-value or document stores with namespaces.** For per-user facts and preferences in a multi-user product, a store keyed by user (and organisation, and project) gives you exact lookups and clean deletion.

**Vector search.** Useful when the agent needs to find relevant past episodes by meaning rather than by key. It is a retrieval index, not a source of truth; keep the canonical record somewhere you can query and delete precisely.

**Tiered combinations.** MemGPT (Packer et al.) framed the problem as "virtual context management", inspired by how operating systems move data between fast and slow memory. The practical version is that a small set of core facts sits in the prompt every time, and everything else is paged in by retrieval when needed.

## The write policy

Memory quality is decided at write time. A reasonable pipeline for each candidate memory:

1. **Extract** a short, self-contained statement, not a transcript excerpt.
2. **Check against what exists.** Is it a duplicate, an update, or a contradiction? Updates should replace the old record, not sit beside it.
3. **Scope it.** Which user, project or organisation does it belong to? Never write to a shared scope from a single user's conversation without review.
4. **Record provenance.** Where did it come from: the user directly, a tool result, or the agent's own inference?
5. **Set an expiry**, or a review date for anything without a natural one.

A record that carries this metadata is far easier to manage than a bare string:

```json
{
  "scope": {"org": "acme", "user": "u_4821"},
  "type": "preference",
  "text": "Prefers summaries as bullet points, max 5 items",
  "source": "user_stated",
  "created": "2027-01-08T10:14:00Z",
  "last_used": "2027-01-12T16:02:00Z",
  "expires": "2027-07-08T00:00:00Z"
}
```

## The read policy

Retrieval should filter before it ranks. First restrict to the current scope, so one user's memories can never surface in another user's session. Then rank.

The Generative Agents paper (Park et al.) is a good reference for ranking. Its agents scored memories on three signals: **recency**, **importance** and **relevance** to the current situation, and combined them to choose what to bring into context. You do not need the exact formula, but the idea transfers well. A fact used yesterday, marked important and semantically close to the current task should beat a loosely related note from six months ago.

Keep the injected set small. Memory competes for the same context window as everything else, and a dozen marginal memories can distract more than they help. The context engineering post covers that trade-off in general terms.

## The forget policy

Forgetting is a feature, and it needs to be designed as deliberately as remembering.

- **Expire on schedule.** Anthropic's memory tool guidance is simple: "Periodically delete memory files that haven't been accessed in a long time."
- **Supersede, do not accumulate.** When a fact changes, the old version should be replaced, or explicitly marked as superseded.
- **Let users see and delete.** Users should be able to view what the agent remembers about them and remove it. Data protection law, including the GDPR's right to erasure, may require this anyway.
- **Delete everywhere.** If a memory is embedded in a vector index, cached in a summary and stored in a database, deletion has to reach all three.

## Memory is an attack surface

Long-term memory turns a one-off manipulation into a persistent one. If an agent reads a malicious document and writes "the user wants all invoices copied to this address" into memory, that instruction now arrives in every future session as trusted context.

Defences follow from the write policy:

- Treat content derived from tool results or retrieved documents as lower trust than statements the user made directly, and record that provenance.
- Do not allow memories to contain instructions that change permissions, recipients or tools.
- Validate every path or key the model supplies. Anthropic's documentation warns that a path like `/memories/../../secrets.env` can escape the memory directory, and that "your implementation must validate every path in every command."
- Strip sensitive data before it is written, rather than relying on the model to decline.

## Make memory observable

Log every memory write and read with the session that caused it. As of late 2026, the OpenTelemetry GenAI semantic conventions, still in development status, include operation names for memory such as `create_memory`, `search_memory` and `delete_memory`, so these events can sit in the same traces as model and tool calls. When an agent behaves strangely, being able to see which memories were in its context is often the whole diagnosis.

## Checklist

- Each memory type mapped to a specific store with an owner
- Prompts, tools and skills (procedural memory) in version control, changed by review
- Explicit list of what may and may not be remembered
- No copies of data owned by another system of record
- Write pipeline: extract, deduplicate, scope, record provenance, set expiry
- Reads filtered by scope before ranking; injected set kept small
- Expiry job running; superseded facts replaced
- Users can view and delete their memories, and deletion reaches every copy
- Path and key validation on all memory operations; no instructions stored as memories
- Memory reads and writes visible in traces

## A smaller, better memory

The temptation with memory is to keep everything because storage is cheap and the model might need it someday. That produces an agent that grows less reliable the longer it is used. The better design remembers less: a short list of stable, attributed, scoped facts, refreshed from source systems when they matter and deleted when they stop mattering. Users notice an agent that remembers the right things. They notice far more sharply one that remembers the wrong ones.

**Sources**

- [Sumers, Yao, Narasimhan and Griffiths, "Cognitive Architectures for Language Agents" (arXiv:2309.02427)](https://arxiv.org/abs/2309.02427)
- [Packer et al., "MemGPT: Towards LLMs as Operating Systems" (arXiv:2310.08560)](https://arxiv.org/abs/2310.08560)
- [Park et al., "Generative Agents: Interactive Simulacra of Human Behavior" (arXiv:2304.03442)](https://arxiv.org/abs/2304.03442)
- [Claude Developer Platform: Memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool)
- [OpenTelemetry GenAI semantic conventions: spans](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md)
- [GDPR Article 17: Right to erasure](https://gdpr-info.eu/art-17-gdpr/)

**Media credits**:
- Hero image: Figure 4 from Sumers et al., "Cognitive Architectures for Language Agents", [arXiv:2309.02427](https://arxiv.org/abs/2309.02427), licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Placed on a white 16:9 canvas; figure unaltered.
- In-body diagram: Big Matrix Solutions, based on [CoALA](https://arxiv.org/abs/2309.02427) and [Generative Agents](https://arxiv.org/abs/2304.03442).
