---
id: "92"
slug: "designing-tools-apis-agents-can-use"
title: "Designing Tools and APIs That Agents Can Actually Use"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/tools-for-agents.png"
category: "Agentic AI"
desc: "Agents read your tool descriptions on every call, never ask clarifying questions and pay for every token you return. How to design names, schemas, responses and errors for that kind of consumer."
date: "Jan 27, 2027"
tags: ["Agentic AI", "Tool Use", "MCP", "API Design"]
---

# Designing Tools and APIs That Agents Can Actually Use

An agent is a strange new kind of API consumer. It reads your documentation in full on every single call. It never asks a clarifying question. It cannot open a second tab to look something up. And it pays, in context window and money, for every byte your API returns.

Most teams building agents start by wrapping their existing REST endpoints one-to-one as tools. That works well enough to demo and then disappoints in production, because those endpoints were designed for developers who read the docs once and write code against them. An agent needs something different: fewer, higher-level operations, descriptions that work as instructions, responses sized for a context window, and errors that tell it what to do next.

The good news is that the guidance from model providers and the Model Context Protocol has converged. This post collects it into a design checklist.

## Fewer, higher-level tools

The first instinct is to expose everything. Resist it. Every tool definition sits in the context window and competes for the model's attention, and overlapping tools create selection errors.

Anthropic's tool documentation recommends that you "consolidate related operations into fewer tools", for example a single tool with an `action` parameter rather than separate create, review and merge tools. OpenAI's function calling guide gives the complementary advice to "combine functions that are always called in sequence", and suggests aiming "for fewer than 20 functions available at the start of a turn", while describing that number as a soft suggestion.

Think in workflows, not endpoints. If the agent always lists a customer's orders, picks the latest and then fetches its details, that is one tool (`get_latest_order(customer)`), not three. When the full tool surface is genuinely large, both major providers now support tool search, which loads rarely used tools on demand instead of placing every definition in the prompt up front.

## Names that disambiguate

Tool names are the first thing the model uses to choose. Make them unambiguous across everything the agent can see.

- **Namespace by service or resource**: `github_list_prs`, `slack_send_message`. Anthropic's documentation recommends this, and it matters most once tools from several servers share one agent.
- **Follow the MCP naming rules** if you publish an MCP server. The specification says names SHOULD be 1 to 128 characters, case-sensitive, and use only ASCII letters, digits, underscore, hyphen and dot. As of the current revision (2026-07-28), it also tells clients that aggregate several servers to disambiguate colliding names, for example by prefixing a server identifier.
- **Use verbs that match the effect**: `search_`, `get_`, `create_`, `update_`, `delete_`. A model should be able to guess from the name alone whether a tool changes anything.

## Descriptions are prompts

Anthropic's tool documentation is emphatic on this point: detailed descriptions are "by far the most important factor in tool performance," and it suggests at least three to four sentences per tool. A good description says what the tool does, when to use it and when not to, what each parameter means, and what the tool does *not* return.

OpenAI frames the same idea as an "intern test": could a new colleague use this function correctly given only what you gave the model? If they would need to ask you something, put the answer in the description.

Compare:

```json
{
  "name": "crm_search_contacts",
  "description": "Search contacts in the CRM by name, email or company. Use this to find a contact_id before calling crm_get_contact or crm_log_activity. Returns at most 20 matches, newest first, with name, email, company and contact_id. Does not return phone numbers or activity history. Matching is case-insensitive and partial, so 'acme' matches 'Acme Ltd'.",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": {"type": "string", "description": "Name, email or company to search for"},
      "limit": {"type": "integer", "description": "Maximum results, 1 to 20. Default 10."}
    },
    "required": ["query"]
  }
}
```

with `"description": "Searches contacts."` The first tells the model how this tool fits with others, what it will get back and what it will not. The second leaves it guessing.

## Make invalid calls impossible

Every parameter the model fills is a chance to fill it wrongly. Design schemas to remove those chances.

- **Use enums and structure.** OpenAI's guide uses the example of `toggle_light(on: bool, off: bool)`, which permits the nonsensical call where both are true. A single `state` enum does not.
- **Do not ask for what you already know.** If your code already has the `order_id` from earlier in the flow, the same guide recommends a `submit_refund()` tool with no parameters, with the id supplied by your code.
- **Turn on strict schema enforcement** where your provider supports it, so tool arguments always match the schema. Constrained decoding guarantees shape, not correctness, so still validate values on the server.

## Return what the agent needs, not everything you have

Tool responses go straight into the context window. Large, noisy responses crowd out the task and degrade the next decision.

Anthropic's engineering post on writing tools for agents makes several concrete recommendations:

- Return **meaningful, human-readable fields** instead of opaque internal identifiers wherever the model will reason about them. The post reports that resolving arbitrary UUIDs into interpretable language measurably improved precision in retrieval tasks.
- Offer a **response format parameter** (for example `concise` and `detailed`) so the agent can ask for more only when it needs it.
- Apply **pagination, filtering and truncation with sensible defaults**. The post notes that Claude Code restricts tool responses to 25,000 tokens by default.

If you publish an MCP server, tools can declare an `outputSchema` and return machine-readable `structuredContent` alongside the text. The specification says servers must conform to a declared output schema and clients should validate against it, which gives downstream code something reliable to parse.

## Errors that teach

An error message for an agent is an instruction for its next attempt. "400 Bad Request" teaches nothing. "Invalid departure date: must be in the future", followed by the current date, lets the model fix its call on the next turn.

The MCP specification formalises this with two error channels.

![Diagram of the two MCP error types: protocol errors returned as JSON-RPC errors, and tool execution errors returned in the result with isError true](/assets/images/blog/diagrams/tools-for-agents-1.svg)

*Diagram: Big Matrix Solutions, based on the [MCP specification, Tools (2026-07-28)](https://modelcontextprotocol.io/specification/2026-07-28/server/tools).*

Protocol errors cover unknown tools and malformed requests. Tool execution errors, returned in a normal result with `isError: true`, cover API failures, input validation and business rule violations, and the specification says they "contain actionable feedback that language models can use to self-correct." Clients should pass them back to the model. Put the useful information in that channel.

![Example of a helpful tool error response that explains why a user ID was invalid, shows valid ID examples and suggests calling user_search](/assets/images/blog/tools-for-agents-error-response.png)

*A helpful error tells the agent what went wrong and which tool to call next. Source: [Anthropic Engineering](https://www.anthropic.com/engineering/writing-tools-for-agents)*

## Stateful tools need explicit handles

Some workflows carry state across calls: a shopping basket, a browser session, a database transaction. The current MCP specification includes non-normative guidance for this: return an explicit handle from a creation tool and accept it as an argument on later calls, rather than relying on hidden per-connection state.

Two points from that guidance are worth adopting anywhere. First, "a handle is a name, not a capability": the server must still check that the caller is authorised for that handle on every call. Second, state the handle's lifetime in the creation tool's description, and return a clear tool execution error when a handle has expired, so the agent can recover by creating a new one.

## Measure your tools like a product

Tool design is empirical. Small wording changes in descriptions and response formats move results, and intuition is a poor guide to which way. Anthropic's post describes building evaluations of realistic multi-step tasks and then iterating on tool definitions against them. For their internal Slack tools, held-out test-set accuracy was 67.4% with the human-written MCP server and 80.1% with a version Claude had optimised against the evaluation.

Track more than accuracy: number of tool calls per task, tokens consumed by tool responses, error rates per tool, and which tools are never chosen. A tool nobody calls is either redundant or badly described.

## Checklist

- Tools model workflows, not raw endpoints; sequential calls merged
- Small initial tool set; large or rare tools deferred via tool search
- Names namespaced by service, verbs that reveal side effects, MCP naming rules followed
- Every description says what, when, when not, parameters and what is not returned
- Enums and structure prevent invalid combinations; no parameters your code already knows
- Strict schema enforcement on; server-side validation still in place
- Responses concise by default, paginated, with human-readable fields
- `outputSchema` and `structuredContent` for machine-readable results
- Execution errors returned in-band with actionable guidance
- Stateful workflows use explicit, authorised, expiring handles
- Tool definitions evaluated and iterated against realistic tasks

## Designing for the reader you have

The shift is to stop thinking of tools as thin wrappers over an API and start thinking of them as an interface designed for a particular reader: one that is capable, literal, context-constrained and unable to ask questions. Nearly every recommendation above follows from taking that reader seriously. Teams that do it get agents that pick the right tool, call it correctly and recover when it fails, without any change to the model at all.

**Sources**

- [Anthropic Engineering: Writing effective tools for agents, with agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [Claude Developer Platform: Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools)
- [OpenAI API: Function calling guide](https://developers.openai.com/api/docs/guides/function-calling)
- [Model Context Protocol specification (2026-07-28): Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)

**Media credits**:
- Hero image: "Slack tools" test-set accuracy chart, human-written vs Claude-optimised MCP server, [Anthropic Engineering](https://www.anthropic.com/engineering/writing-tools-for-agents). Copyright Anthropic; licence not stated, used with attribution.
- In-body image: helpful error response example, [Anthropic Engineering](https://www.anthropic.com/engineering/writing-tools-for-agents). Copyright Anthropic; licence not stated, used with attribution.
- In-body diagram: Big Matrix Solutions, based on the [MCP specification](https://modelcontextprotocol.io/specification/2026-07-28/server/tools).
