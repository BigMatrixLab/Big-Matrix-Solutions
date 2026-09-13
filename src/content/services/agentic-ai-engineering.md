---
id: "10"
slug: "agentic-ai-llm-engineering"
title: "Agentic AI & LLM Application Engineering"
icon: "bi bi-robot"
image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80&auto=format&fit=crop"
desc: "Production LLM applications and agents that plan, call tools and run long tasks, with the verification, sandboxing and cost controls to deploy safely."
---


# Agentic AI & LLM Application Engineering

![Agentic AI and LLM application engineering](https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80&auto=format&fit=crop)

## Agents That Finish the Job, and Say So When They Cannot

Getting an agent working in a demo takes a weekend. Getting one to run unsupervised against real systems without quietly breaking something is the actual engineering, and almost none of it is prompt work.

We build the second kind.


### 1. **Agent Architecture & Tool Design**

The scaffolding decides whether an agent is reliable. The model barely does.

- Tool definitions with typed inputs and validated outputs
- Task decomposition, then plan-and-execute loops
- Retry, fallback and escalation paths for steps that fail
- Honest failure reporting, because an agent that admits it's stuck beats one that fakes success

That last point sounds soft. It isn't. An agent solving 60% of tasks and reliably flagging the rest is worth more than one solving 75% and confidently shipping broken work, because the second forces you to review everything at full attention and erases the gain.


### 2. **Context Engineering**

Long-running agents fail from context rot far more often than from weak reasoning. The window fills with dead exploration, and quality degrades without anything obviously breaking.

**What we build in**:
- Stable cacheable prefixes, which cut both cost and latency
- Deliberate compaction that keeps decisions and discards debris
- Subagents used as context boundaries, so search noise stays out of the main thread
- Durable state written to files rather than held in the window


### 3. **Verification & Guardrails**

| Control | What it prevents |
|-------------|----------------|
| Output schema validation | Malformed results reaching downstream systems |
| Least-privilege credentials | A hijacked agent doing real damage |
| Sandboxed execution | Side effects outside the task |
| Approval gates | Irreversible actions taken unsupervised |
| Full trajectory logging | Silent failures nobody catches |

Once an agent holds tools, prompt injection stops being a content problem and becomes a code execution problem. Filtering the injection doesn't work; a model good enough to be useful is good enough to follow a well-disguised instruction. So we treat the agent as untrusted and constrain it from outside instead of asking the model to protect you.


### 4. **Model Routing & Cost Control**

Most production traffic doesn't need a frontier model. Classification, extraction, formatting and schema-filling run fine on a cheap tier, and that's usually 70 to 90% of requests.

- Tiered routing with explicit escalation signals, not guesswork
- Token and step budgets per task, plus a global ceiling
- Prompt caching and context reuse
- A vendor abstraction, so swapping models is a config change rather than a refactor

The last one matters more than it looks. Every hard-coded model name is a small bet that today's ranking holds. It won't.


### 5. **Memory & Long-Horizon State**

An agent that forgets between runs is a chatbot with tools. Anything expected to work across days needs state that outlives the context window.

- Task state in durable storage rather than held in the conversation
- Scoped memory with explicit boundaries: per user, per project, per organisation
- Deliberate write points, so recording something is a decision the agent makes rather than a side effect of talking
- Retrieval over prior runs, so a repeated task starts from what was already established
- Expiry and correction paths, because stale memory is worse than no memory

The failure here is quiet. An agent acting on a fact that was true last month looks exactly like an agent working correctly, right up until it doesn't.


### 6. **Integration Surface**

Most of the engineering is not the agent. It is everything the agent has to reach.

- MCP servers for tools worth reusing across agents and clients
- Direct API integration where an extra protocol hop costs more than it returns
- Browser and computer use for systems that never exposed an API
- Database and warehouse access with read-only roles as the default
- Webhook and queue triggers, so work starts on an event rather than on someone remembering to ask

On legacy systems specifically: driving a UI is a legitimate last resort and a poor first choice. It breaks when the interface changes, and it usually breaks silently.


### 7. **Human Handoff & Approval Design**

The interface between the agent and the person checking it decides whether the system saves work or just moves it somewhere else.

- Diffs and previews before an action commits, not a summary afterwards
- One approval covering a batch where the risk profile allows it, instead of a prompt per step
- Escalation that carries its context, so the reviewer is not re-reading an entire trajectory to make one call
- Provenance on every output: which tool, which source, which run

An approval queue nobody clears is its own failure mode. We design around how the reviewer's day actually works, because a control that gets bypassed is not a control.


## Technology Stack

**Models**: Claude, GPT, Gemini and open-weight models, routed by task rather than by loyalty
**Patterns**: Tool use, MCP, supervisor and subagent topologies, structured output
**Runtime**: Containerised execution, queue-backed long-running jobs, observability from day one

## Good fits

- Internal automation across systems with no usable API
- Document and workflow processing at volume
- Research and analysis assistants over proprietary corpora
- Customer-facing assistants that need bounded, auditable behaviour
- Triage and routing work where the judgment is real but the stakes per item are low
- Migration and refactor tasks that are mechanical in principle and messy in practice

## When an agent is the wrong tool

We would rather say this during scoping than bill for finding it out later.

- **The task is deterministic and fully specified.** A script is cheaper, faster and testable, and it does not need a review step.
- **Volume is high and per-item value is low.** Inference cost dominates and never stops.
- **A wrong answer is unacceptable and there is no practical review step.** Without somewhere for a human to stand, the guardrails have nothing to hand off to.
- **The data is not reachable or not consistent enough to act on.** That is a pipeline problem wearing an agent costume, and it gets solved at the data layer or not at all.

A good share of projects that arrive described as agent work turn out to be a retrieval problem, a data-quality problem, or an ordinary workflow with a language model attached to the front of it.

## How we work

**Scoping.** We map the task as it is actually performed now, including the exceptions people handle without noticing they are handling them. Exceptions are usually where agents fail, and they are almost never in the written process.

**A thin vertical slice.** One real task, end to end, against real systems, with the guardrails switched on. Most assumptions die here, and this is the cheapest place for that to happen.

**Hardening.** Failure paths, approval design, token and step budgets, observability, and an evaluation set drawn from your own traffic rather than a public benchmark.

**Handover.** Runbooks, cost visibility, and enough documentation that your team can change tools, prompts and routing without calling us.

Evaluating the finished system, including trajectory review, regression testing and model migration, is covered by our AI Engineering, MLOps & Model Assurance practice.

## Why work with us

We publish on this continuously: evaluation, context engineering, agent security, long-horizon reliability. Not marketing, just what we hit while building. So you get a straight read on what agents can carry today, and when a plain pipeline will serve you better and cost a tenth as much.
