---
id: "99"
slug: "llm-observability-opentelemetry-genai-tracing"
title: "Observability for LLM Apps: Tracing, OpenTelemetry GenAI and What to Log"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/llm-observability.png"
category: "Agentic AI"
desc: "An LLM feature can return HTTP 200 with a wrong answer, a doubled bill or a twelve-step tool loop. How to trace it with the OpenTelemetry GenAI conventions, and what to log beyond them."
date: "Feb 10, 2027"
tags: ["Observability", "OpenTelemetry", "Agentic AI", "LLM"]
---

# Observability for LLM Apps: Tracing, OpenTelemetry GenAI and What to Log

A conventional web service fails loudly. Errors show up as 500s, slow endpoints show up in latency percentiles, and an APM dashboard tells you most of what you need.

LLM features fail quietly. A request returns 200 OK in two seconds with a confident, wrong answer. An agent completes its task but takes eleven tool calls instead of three, and nobody notices until the monthly bill. A prompt change cuts output quality for one customer segment while the averages look fine. None of that appears in a standard dashboard, because the interesting behaviour is inside the request: which model was called, with what, how many tokens it used, which tools it chose and why it stopped.

Observability for LLM apps means making that inside visible. The good news is that there is now a shared vocabulary for it.

## The OpenTelemetry GenAI conventions

OpenTelemetry's semantic conventions for generative AI define standard names for the spans, metrics and events that LLM and agent operations should emit. They cover model inference, embeddings, retrieval, tool execution, agents, memory operations and the Model Context Protocol, plus provider-specific additions for OpenAI, Anthropic, AWS Bedrock and others.

Two practical notes before adopting them:

- **Status.** As of late 2026, the GenAI conventions are marked **Development**, not stable. Names have already changed between releases, so pin the convention version your instrumentation uses and expect migrations.
- **Location.** The conventions have moved out of the main semantic-conventions repository into a dedicated one, [open-telemetry/semantic-conventions-genai](https://github.com/open-telemetry/semantic-conventions-genai). The old pages now point there.

The payoff for adopting them anyway is portability. If your services emit standard attributes, any OpenTelemetry-compatible backend can show token usage, model latency and tool calls without custom parsing, and you can change backends without re-instrumenting.

## The shape of a trace

For a simple chat feature, one model call is one span. The convention says the span name SHOULD be `{gen_ai.operation.name} {gen_ai.request.model}`, so a call shows up as something like `chat gpt-4o-mini`.

For an agent, the trace is a tree. A root `invoke_agent` span covers the whole run. Underneath it are alternating inference spans (the model deciding what to do) and `execute_tool` spans (the tool doing it), named `execute_tool {gen_ai.tool.name}`. Retrieval, planning and memory operations each have their own operation names.

![Diagram of an agent trace: an invoke_agent root span containing chat and execute_tool child spans, one tool span marked as an error, and the attributes recorded on each chat span](/assets/images/blog/diagrams/llm-observability-1.svg)

*Diagram: Big Matrix Solutions, based on the [OpenTelemetry GenAI span conventions](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md) and [agent span conventions](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md).*

This structure answers the questions that matter in an incident. Which step was slow? Which tool failed? Did the model loop? How many tokens did the whole run cost, and which call spent most of them?

## The attributes worth having

The inference span defines a long list of attributes. These are the ones that pay for themselves first:

| Attribute | Requirement level | Why it matters |
|---|---|---|
| `gen_ai.operation.name` | Required | `chat`, `embeddings`, `execute_tool`, `invoke_agent` and so on |
| `gen_ai.provider.name` | Required | Which provider served the call |
| `gen_ai.request.model` | Conditionally required | What you asked for |
| `gen_ai.response.model` | Recommended | What actually answered; often a dated snapshot |
| `gen_ai.usage.input_tokens` / `output_tokens` | Recommended | Cost and context pressure |
| `gen_ai.usage.cache_read.input_tokens` | Recommended when applicable | Whether prompt caching is working |
| `gen_ai.response.finish_reasons` | Recommended | `stop` versus `length` versus errors |
| `gen_ai.conversation.id` | Conditionally required | Joins turns of one conversation |
| `error.type` | Conditionally required on error | Groups failures by class |

If you have used early GenAI instrumentation, you may have seen `gen_ai.system` instead of `gen_ai.provider.name`, as in the Jaeger screenshot at the top of this post. That attribute is deprecated and replaced by `gen_ai.provider.name`.

The conventions also define `gen_ai.prompt.name` and `gen_ai.prompt.version` for named prompt templates. Record them. When quality shifts, the first question is usually "what changed?", and a prompt version on every span answers it in seconds.

For metrics, the conventions define histograms such as `gen_ai.client.operation.duration` and, for streaming, `gen_ai.client.operation.time_to_first_chunk`, plus token usage metrics. Time to first chunk is the number users feel; total duration is the number your timeouts care about.

## Prompts and completions: off by default

The most consequential design choice is whether to record the actual content: system instructions, user messages and model outputs. The conventions are clear that instrumentations "SHOULD NOT capture them by default," because the content is often large and sensitive. The content attributes (`gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`) are all opt-in, and the spec warns they are likely to contain personal data.

The spec describes three usage patterns:

1. **Do not record content.** The default.
2. **Record content on the spans.** Suited to pre-production, or where telemetry storage meets your privacy requirements.
3. **Store content externally and record a reference on the span.** Recommended for production where volume or sensitivity is a concern, because the content store can have its own access controls and retention.

In the OpenTelemetry Python instrumentation for OpenAI, capture is switched on with an environment variable, as the project's own walkthrough shows:

```bash
export OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true
```

A sensible default is pattern 1 in production, pattern 2 in staging, and pattern 3 only once you have a retention policy, redaction and an access model agreed with whoever owns data protection.

## Instrumenting your own tools

Auto-instrumentation libraries cover provider SDK calls. Your own tools are usually executed by your code, and the conventions encourage you to instrument them manually. It is a few lines:

```python
from opentelemetry import trace

tracer = trace.get_tracer("support-agent")

def run_tool(name, call_id, args):
    with tracer.start_as_current_span(f"execute_tool {name}") as span:
        span.set_attribute("gen_ai.operation.name", "execute_tool")
        span.set_attribute("gen_ai.tool.name", name)
        span.set_attribute("gen_ai.tool.call.id", call_id)
        try:
            return TOOLS[name](**args)
        except Exception as exc:
            span.set_attribute("error.type", type(exc).__name__)
            raise
```

Tool arguments and results (`gen_ai.tool.call.arguments` and `gen_ai.tool.call.result`) are opt-in for the same reason as messages: they often carry user data.

## What to log beyond the spec

The conventions describe the operation. You also need business context, recorded as additional attributes on the root span:

- **Tenant and user identifiers**, pseudonymised, so you can answer "is this one customer or everyone?"
- **Feature and prompt version**, so regressions can be tied to deploys.
- **Computed cost**, derived from token counts and your price table. Tokens are the raw signal; money is what finance asks about.
- **Feedback and eval scores**, linked by trace id. A thumbs-down or a failed online check is only actionable if you can open the trace that produced it.
- **Step counts**: model calls and tool calls per agent run. Loops show up here first.

## Alerts that catch LLM-specific failures

Standard error-rate and latency alerts still apply. Add these:

- **Finish reason `length` rate.** Outputs being truncated by the token limit, often silently.
- **Tool error rate per tool.** One broken integration can make an agent flail.
- **Tool calls per run, p95.** A sudden rise usually means a loop or a confusing tool.
- **Cost per tenant per day.** Catches runaway agents and abuse.
- **Cache hit ratio.** A prompt change that breaks caching can multiply input cost.
- **Response model changes.** If `gen_ai.response.model` changes without a deploy, your provider updated something.

## Sampling

LLM traces are expensive to store, especially with content. Sample deliberately: keep every trace that contains an error, a negative feedback signal or an unusually high cost, and sample the healthy majority. If you store content externally, the spec's hook for uploading content is meant to run regardless of the span sampling decision, which lets you keep complete content for audit while sampling the telemetry itself.

## Checklist

- GenAI semantic conventions adopted, with the convention version pinned
- One trace per request or agent run; inference, tool and retrieval spans as children
- Required and recommended attributes populated, including token usage and finish reasons
- Prompt name and version recorded on every model span
- Your own tools manually instrumented as `execute_tool` spans
- Content capture off in production unless an external store, redaction and retention are in place
- Tenant, cost, feedback and step counts attached to the root span
- Alerts on truncation, tool errors, step counts, cost and cache hit ratio
- Error and high-cost traces always retained

## Seeing inside the request

The hardest part of operating an LLM feature is that the failures look like successes from the outside. Tracing with a shared vocabulary turns each request back into something you can inspect: which model, which prompt version, which tools, how many tokens and why it stopped. Start with the spans and attributes above, keep content capture conservative, and add business context as you learn which questions you keep asking during incidents.

**Sources**

- [OpenTelemetry GenAI semantic conventions repository](https://github.com/open-telemetry/semantic-conventions-genai)
- [GenAI spans (inference, embeddings, retrieval, memory, execute tool, content capture)](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md)
- [GenAI agent spans](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md)
- [GenAI metrics](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-metrics.md)
- [OpenTelemetry semantic conventions registry: deprecated `gen_ai.system`](https://github.com/open-telemetry/semantic-conventions/blob/v1.37.0/docs/registry/attributes/gen-ai.md)
- [OpenTelemetry blog: OpenTelemetry for Generative AI](https://opentelemetry.io/blog/2024/otel-generative-ai/)

**Media credits**:
- Hero image: Jaeger trace of an instrumented OpenAI chat call, from "OpenTelemetry for Generative AI" by Drew Robbins and Liudmila Molkova, [OpenTelemetry blog](https://opentelemetry.io/blog/2024/otel-generative-ai/), licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Shows the earlier `gen_ai.system` attribute.
- In-body diagram: Big Matrix Solutions, based on the [OpenTelemetry GenAI semantic conventions](https://github.com/open-telemetry/semantic-conventions-genai).
