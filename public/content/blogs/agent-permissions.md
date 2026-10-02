---
id: "78"
slug: "least-privilege-ai-agents-permissions"
title: "Least Privilege for AI Agents: Designing Permissions That Survive Mistakes"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/agent-permissions.png"
category: "Agentic AI"
desc: "Agents will misread instructions, act on bad data and occasionally get hijacked. A layered permission design decides how much damage any one of those mistakes can do."
date: "Dec 30, 2026"
tags: ["Agentic AI", "Security", "Least Privilege", "MCP"]
---

# Least Privilege for AI Agents: Designing Permissions That Survive Mistakes

Every agent you deploy will eventually do something you did not intend. It will misread an ambiguous instruction, act on a stale record, follow text it found in a document, or simply pick the wrong tool. The question that decides whether that becomes an incident is not "how do we stop the agent from making mistakes?" It is "what is the worst thing this agent can do when it makes one?"

That second question is a permissions question, and it has well-understood answers. Least privilege, defence in depth and complete mediation predate language models by decades. What is new is that the component making decisions is non-deterministic and can be talked into things, which makes the old principles more important rather than less.

## Why the prompt is not a permission system

The most common design error is treating the system prompt as an access control layer: "Never delete production data." "Only send emails to the customer." These instructions shape behaviour most of the time. They are not enforcement, and they fail exactly when you need them, under unusual inputs.

OWASP's Top 10 for LLM Applications names this risk **LLM06:2025 Excessive Agency** and traces it to three root causes:

- **Excessive functionality**: the agent has tools it does not need for its task.
- **Excessive permissions**: the tools it needs have more access than the task requires.
- **Excessive autonomy**: high-impact actions happen without anyone checking.

The OWASP mitigation that matters most here is **complete mediation**: "Implement authorization in downstream systems rather than relying on an LLM to decide if an action is allowed or not." Whatever the model decides, the system it calls should independently enforce what is allowed.

## Start with blast radius

Before configuring anything, list every tool the agent can call and classify each one by what happens if it is called wrongly. A simple table is enough:

| Action class | Example | Default policy |
|---|---|---|
| Read, internal, low sensitivity | Search docs, read a ticket | Allow |
| Read, sensitive | Customer PII, financial records | Allow only in the user's own scope; log |
| Write, reversible | Draft a reply, create a branch | Allow; log |
| Write, external or hard to reverse | Send an email, post publicly, merge | Require approval |
| Destructive or privileged | Delete data, change permissions, spend money | Require approval, or do not expose |

This classification drives everything else. It is also the first thing a security reviewer will ask for, so it is worth writing down.

![Diagram showing six permission layers between a proposed agent tool call and a real action: tool surface, credentials, sandbox, approval gate, downstream authorisation, audit and limits](/assets/images/blog/diagrams/agent-permissions-1.svg)

*Diagram: Big Matrix Solutions, based on [OWASP LLM06:2025](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) and the [MCP security best practices](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices).*

## Layer 1: the tool surface

The cheapest control is not giving the agent the capability at all. OWASP's first two mitigations are to minimise extensions and minimise what each one can do.

In practice:

- **Expose task-specific tools, not general ones.** A `get_order_status(order_id)` tool cannot be used to drop a table. A `run_sql(query)` tool can. OWASP calls this out directly as "avoid open-ended extensions".
- **Prefer read-only variants.** If the agent only needs to read the mailbox to summarise it, do not give it a mail integration that can also send. That exact scenario, a summariser whose plugin could send mail being instructed by a malicious email to forward data, is OWASP's worked example.
- **Scope the tool list per task.** A triage agent and a remediation agent should not share one toolbox.

If you use the Model Context Protocol, tools can carry annotations such as `readOnlyHint` and `destructiveHint`. They are useful for UI decisions, but the specification is explicit that clients "MUST consider tool annotations to be untrusted unless they come from trusted servers." A hint is a claim, not a guarantee.

## Layer 2: credentials

Tools act with some identity. The design goal is that this identity is as narrow and short-lived as possible.

**Act in the user's context.** OWASP recommends executing actions "in the context of that specific user, and with the minimum privileges necessary." An agent helping one customer should not hold a service account that can read every customer's data.

**Use narrow scopes, requested progressively.** The MCP security guidance warns against wildcard or omnibus scopes and recommends a minimal initial scope set with elevation only when a privileged operation is first attempted. As of the current specification (2026-07-28), a server's tool list may also vary by the authorisation presented, so a caller only sees the tools its scopes permit.

**Never pass tokens through.** MCP servers "MUST NOT accept any tokens that were not explicitly issued for the MCP server." Forwarding a user's upstream token straight to a downstream API bypasses audience checks and makes audit trails meaningless.

**Keep secrets out of the model's context.** The agent should hold a reference to a credential that the tool runtime resolves, never the credential itself. Anything in the context window can end up in a log, a summary or an output.

## Layer 3: the sandbox

For agents that run code or shell commands, the execution environment is the permission system. Anthropic's write-up of sandboxing in Claude Code describes two boundaries: **filesystem isolation**, restricting the agent to specific directories, and **network isolation**, restricting it to approved hosts. Both are enforced at the operating system level using Linux bubblewrap and macOS seatbelt, so they hold even if the agent is manipulated.

The interesting result is what this did to approvals. Anthropic reports that in internal usage, "sandboxing safely reduces permission prompts by 84%." When the box itself is safe, most actions inside it no longer need a human to look at them. That is the right direction: make the environment trustworthy so approvals can be reserved for actions that leave it.

A minimal sandbox policy for a coding agent:

```yaml
filesystem:
  write: ["./workspace"]          # the checked-out repo only
  deny_read: ["~/.ssh", "~/.aws", ".env"]
network:
  allow: ["registry.npmjs.org", "pypi.org", "api.github.com"]
  default: deny
git:
  push: deny                      # humans push; the agent proposes
```

## Layer 4: approvals people actually read

Human-in-the-loop is OWASP's "require user approval" mitigation and an MCP recommendation. It is also the layer most likely to decay into theatre. If an agent asks for approval forty times an hour, people stop reading and start clicking.

Approvals work when they are rare and specific:

- **Gate by action class**, using the blast-radius table, not by tool name.
- **Show the exact arguments.** The MCP specification recommends clients "show tool inputs to the user before calling the server." "Send email" is not reviewable; "send this text to these three addresses" is.
- **Approve the action, not the category.** "Allow this merge" is safer than "allow merges for the rest of the session".
- **Make the default on timeout a denial.**

## Layer 5: downstream enforcement

This is complete mediation in practice. The API the agent calls should enforce authorisation as if the caller were untrusted, because it is. Row-level security in the database, per-user permissions in the ticketing system, spending limits in the payments API. If the agent's credentials only allow what the user could do by hand, a manipulated agent cannot exceed the user.

## Layer 6: audit, rate limits and a stop button

OWASP lists two damage-limitation measures: monitor extension activity, and rate-limit so that damaging actions happen slowly enough to notice. Add a third: a way to revoke the agent's credentials and stop its runs immediately, tested before you need it.

Log every tool call with the user, the arguments, the result and a trace id that links it back to the conversation that caused it. When something goes wrong, the first question is always "what did it do, and why?"

## The combination to avoid

One heuristic catches a large share of real risk. Simon Willison describes a "lethal trifecta" of capabilities: access to private data, exposure to untrusted content, and the ability to communicate externally. An agent with all three can be instructed by content it reads to send your data somewhere else. Remove any one leg for a given agent, and that class of exfiltration becomes much harder. Our earlier post on prompt injection in agents covers the attack side in more depth.

## Checklist

- Every tool classified by blast radius, with a default policy per class
- No open-ended tools (raw SQL, unrestricted shell, arbitrary HTTP) where a specific tool would do
- Read-only variants used wherever the task only reads
- Credentials scoped to the acting user, short-lived, never placed in the model's context
- No token passthrough; minimal scopes with progressive elevation
- Code execution sandboxed with filesystem and network allowlists enforced by the OS
- Approvals reserved for external, irreversible or privileged actions, showing exact arguments
- Downstream systems enforce authorisation independently of the agent
- Every call logged with a trace id; rate limits and a tested kill switch
- No single agent holds private data, untrusted input and an external channel at once

## Designing for the bad day

Least privilege for agents is not about distrusting the model. It is about accepting that any component making thousands of decisions a day will get some of them wrong, and arranging the system so those wrong decisions are cheap. The layers above are individually ordinary. Together they mean the answer to "what is the worst this agent can do?" is something you chose deliberately, rather than something you discover.

**Sources**

- [OWASP GenAI Security Project: LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)
- [Model Context Protocol specification (2026-07-28): Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
- [Model Context Protocol: Security Best Practices](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices)
- [Anthropic Engineering: Beyond permission prompts: making Claude Code more secure and autonomous](https://www.anthropic.com/engineering/claude-code-sandboxing)
- [Simon Willison: The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)

**Media credits**:
- Hero image: "Claude Code Sandboxing" architecture diagram, [Anthropic Engineering](https://www.anthropic.com/engineering/claude-code-sandboxing). Copyright Anthropic; licence not stated, used with attribution.
- In-body diagram: Big Matrix Solutions, based on [OWASP LLM06:2025](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) and the [MCP security best practices](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices).
