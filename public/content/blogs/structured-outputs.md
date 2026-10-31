---
id: "106"
slug: "structured-outputs-function-calling-machine-safe"
title: "Structured Outputs and Function Calling: Making LLM Output Machine-Safe"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/structured-outputs.webp"
category: "Agentic AI"
desc: "JSON mode, strict structured outputs and function calling explained: what constrained decoding guarantees, where each provider's schema limits bite, and the validation you still need in code."
date: "Feb 24, 2027"
tags: ["Structured Outputs", "Function Calling", "Agentic AI", "LLM"]
---

# Structured Outputs and Function Calling: Making LLM Output Machine-Safe

For a while, the standard way to get data out of a language model was to ask for JSON in the prompt, then wrap the parser in a try block, a regular expression and a retry loop. It mostly worked. "Mostly" is a problem when the output feeds an invoice, a database write or another agent.

That era is largely over. The major model APIs can now constrain generation to a JSON Schema you supply, so the output is guaranteed to parse and match the declared shape. This removes a whole class of bugs. It does not remove the need to validate, and teams that treat "schema-valid" as "correct" find that out in production.

This post covers what the guarantee actually is, how to design schemas within each provider's limits, and the checks that still belong in your code.

## Three levels of guarantee

It helps to separate three things that are often lumped together.

| Approach | Valid JSON? | Matches your schema? |
|---|---|---|
| Prompt instructions only | Usually | Usually |
| JSON mode | Yes | No |
| Structured outputs (strict schema) | Yes | Yes, within the supported subset |

OpenAI's documentation describes JSON mode as "a more basic version" of the feature and states: "We recommend always using Structured Outputs instead of JSON mode when possible." Anthropic offers the same two capabilities: JSON outputs, which constrain the response to a schema, and strict tool use, which guarantees schema validation on tool names and inputs. Google's Gemini API also accepts a JSON Schema for responses.

## How the guarantee works

Strict modes use constrained decoding. The provider compiles your schema into a grammar, and at each generation step the model can only choose tokens that keep the output valid against that grammar. Invalid output is not caught and retried; it is never produced.

Two practical consequences follow. First, schema compilation has a cost on first use. OpenAI notes that the first request with a new schema has additional latency; Anthropic says compiled grammars are cached for 24 hours from last use. Keep schemas stable rather than generating them per request. Second, the grammar can only enforce what it can express, which is why every provider supports a subset of JSON Schema rather than all of it.

## Response format or function calling?

Both use the same machinery, but they answer different questions. OpenAI's guidance draws the line clearly. Use function calling "when you are connecting the model to tools, functions, data, etc. in your system." Use a structured response format "when you want to structure the model's output when it responds to the user."

In practice:

- **Extraction and classification** (parse this email into fields, label this ticket): structured response format.
- **Actions** (look up an order, create a refund): tools with strict schemas, so your handler never receives malformed arguments.
- **Agent handoffs** (one step's output becomes another step's input): structured response format, validated at the boundary.

## Design schemas within the limits

Each provider supports a different subset of JSON Schema, and the limits shape how you write schemas. As documented by each provider as of late 2026:

**OpenAI** requires that all fields be listed as required and that `additionalProperties: false` be set on objects. Optional fields are emulated with a union that includes `null`. A schema may have up to 5,000 object properties in total with up to 10 levels of nesting, and up to 1,000 enum values across all enum properties.

**Anthropic** lists unsupported features including recursive schemas, numerical constraints such as `minimum` and `maximum`, string constraints such as `minLength` and `maxLength`, and `additionalProperties` set to anything other than `false`. Using an unsupported feature returns a 400 error. Its documentation also notes that enum and const values may come back differing from the schema only in capitalisation.

**Gemini** supports a subset of JSON Schema and notes that very large or deeply nested schemas may be rejected.

The pattern across all three: structural constraints are enforced by the decoder, but many value constraints are not. A price that must be positive, a string with a maximum length, or a date that must be in the future generally has to be checked by your code.

Some schema habits that help regardless of provider:

- **Use enums for categories.** They are enforced during decoding and remove free-text variation.
- **Make "unknown" explicit.** A nullable field or an `"unknown"` enum value gives the model a legitimate way to say it does not know, instead of inventing something.
- **Keep nesting shallow.** Flat schemas are easier for the model and easier to validate.
- **Put a short free-text field before the answer fields** when the task needs reasoning, such as `evidence` or `notes`. OpenAI documents that outputs are produced in the same order as the keys in the schema, so the model writes its evidence before committing to answers.

## A validation pipeline

Constrained decoding handles the shape. Everything after that is yours.

![Diagram of a five-stage pipeline: schema, constrained decoding, stop reason check, validation, and a decision to accept, retry or escalate](/assets/images/blog/diagrams/structured-outputs-1.svg)

*Diagram: Big Matrix Solutions, based on [OpenAI](https://developers.openai.com/api/docs/guides/structured-outputs), [Anthropic](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) and [Google](https://ai.google.dev/gemini-api/docs/structured-output) structured output documentation.*

Define the schema once in code, generate the JSON Schema from it, and validate the response against the same definition:

```python
from typing import Literal, Optional
from pydantic import BaseModel

class InvoiceExtraction(BaseModel):
    evidence: str                          # short quote supporting the fields below
    supplier_name: str
    invoice_number: str
    currency: Literal["GBP", "EUR", "USD", "unknown"]
    total: Optional[float]                 # null if not present in the document
    due_date: Optional[str]                # ISO 8601, or null

def accept(raw_json: str, stop_reason: str) -> InvoiceExtraction:
    if stop_reason in ("refusal", "max_tokens", "length"):
        raise NeedsReview(stop_reason)     # output may not match the schema
    inv = InvoiceExtraction.model_validate_json(raw_json)   # types and enums
    if inv.total is not None and inv.total <= 0:            # value rule
        raise NeedsReview("total must be positive")
    if not supplier_exists(inv.supplier_name):              # referential check
        raise NeedsReview("unknown supplier")
    return inv
```

The OpenAI and Anthropic Python SDKs both accept Pydantic models directly, and both JavaScript SDKs accept Zod schemas, so the same definition drives both the request and the validation.

## The cases where the guarantee does not hold

Two situations break the schema guarantee on every major provider, and both are easy to miss because the HTTP status is still 200.

**Refusals.** If the model declines a request for safety reasons, the refusal takes priority over the schema. OpenAI returns a separate `refusal` field and notes that a refusal "does not necessarily follow the schema." Anthropic returns `stop_reason: "refusal"` and warns the output may not match your schema.

**Truncation.** If generation hits the token limit, the output is cut off mid-object. Anthropic signals this with `stop_reason: "max_tokens"`; other APIs use an equivalent finish reason. Check the stop reason before parsing, every time.

## Shape is not truth

A perfectly schema-valid object can still be wrong. The supplier name can be invented, the total can be read from the wrong line, an ID can refer to a record that does not exist. Google's documentation puts it plainly: "always validate values in your application."

Semantic validation is where most of the remaining effort goes:

- **Cross-field checks.** Line items should sum to the total; an end date should follow the start date.
- **Referential checks.** IDs and names should exist in your system of record.
- **Grounding checks.** For extraction, the `evidence` field should actually appear in the source text.
- **Business rules.** A refund above a threshold goes to a human regardless of how well formed it is.

When validation fails, retry once with the validation error included in the prompt, then escalate. Repeated blind retries mostly burn tokens.

## Does forcing structure hurt quality?

This has been studied, with mixed findings. Tam et al., in "Let Me Speak Freely?", reported a decline in reasoning performance under strict format restrictions. Will Kurt of .txt, the company behind the Outlines library, published a response arguing that the comparison used different prompts for structured and unstructured generation, and that with matched prompts structured generation performed better. The JSONSchemaBench study (Geng et al.) found that constrained decoding improved downstream task performance by up to 4 percent, even on loosely structured tasks such as GSM8K.

The practical reading: do not expect structure to hurt by default, but measure it on your own task. If reasoning quality matters, give the model a reasoning or evidence field before the answer fields, and compare against an unconstrained baseline in your eval suite.

## Checklist

- Strict structured outputs or strict tool use enabled; JSON mode not used for new work
- One schema definition in code (Pydantic, Zod) driving both request and validation
- Schema stays within the provider's documented subset and limits
- Enums for categories; explicit null or `unknown` for missing information
- Stop reason checked for refusal and truncation before parsing
- Value constraints the decoder cannot enforce validated in code
- Cross-field, referential and grounding checks on every response
- One informed retry with the error, then escalation
- Quality compared against an unconstrained baseline on your own evals

## Machine-safe, not machine-correct

Structured outputs are one of the most useful reliability improvements in LLM APIs, and there is little reason not to use them wherever model output feeds code. Treat them as what they are: a guarantee about syntax and shape, delivered by the provider. Correctness is still a property your system has to check, and the teams that keep that distinction clear are the ones whose structured pipelines stay boring in production.

**Sources**

- [OpenAI API: Structured Outputs guide](https://developers.openai.com/api/docs/guides/structured-outputs)
- [Claude Developer Platform: Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)
- [Google Gemini API: Structured output](https://ai.google.dev/gemini-api/docs/structured-output)
- [Geng et al., "JSONSchemaBench: A Rigorous Benchmark of Structured Outputs for Language Models" (arXiv:2501.10868)](https://arxiv.org/abs/2501.10868)
- [Tam et al., "Let Me Speak Freely? A Study on the Impact of Format Restrictions on Performance of Large Language Models" (arXiv:2408.02442)](https://arxiv.org/abs/2408.02442)
- [.txt (Outlines): Say What You Mean: A Response to 'Let Me Speak Freely'](https://blog.dottxt.ai/say-what-you-mean.html)

**Media credits**:
- Hero image: Figure 1 from Geng et al., "JSONSchemaBench", [arXiv:2501.10868](https://arxiv.org/abs/2501.10868), licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), comparing constrained decoding frameworks on efficiency, coverage and quality (results as published in early 2025). Placed on a white 16:9 canvas; figure unaltered.
- In-body diagram: Big Matrix Solutions, based on OpenAI, Anthropic and Google structured output documentation.
