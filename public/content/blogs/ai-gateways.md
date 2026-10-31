---
id: "108"
slug: "ai-gateways-platform-engineering-many-models"
title: "AI Gateways: Platform Engineering for Teams Using Many Models"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/ai-gateways.webp"
category: "Software Development"
desc: "Once several teams call several model providers, keys, costs and outages stop being an application problem. What an AI gateway does, how the open-source options compare, and how to roll one out."
date: "Feb 28, 2027"
tags: ["Platform Engineering", "AI Gateway", "LLM Operations", "Infrastructure"]
---

# AI Gateways: Platform Engineering for Teams Using Many Models

The first AI feature in a company usually calls one provider with one API key stored in one service's environment variables. By the fifth feature, there are three providers, a dozen keys, a self-hosted model someone stood up for a privacy-sensitive workload, and a monthly bill nobody can attribute to a team.

None of that is a model problem. It is the same problem platform teams solved for HTTP services years ago with API gateways, and the answer has the same shape: put a gateway in the path, and move cross-cutting concerns out of every application into one place.

## What a gateway does that an SDK cannot

An SDK, or a thin wrapper library, can give developers a unified interface. It cannot enforce anything, because each application can bypass it, pin an old version or hold its own keys. A gateway sits in the network path, so its policies apply whether or not each team remembered them.

| Concern | Without a gateway | With a gateway |
|---|---|---|
| Provider credentials | Copied into every service | Held by the gateway; apps use internal keys |
| Spend | One bill per provider, unattributed | Tracked per key, team and model |
| Limits | Per-provider quotas, shared by everyone | Token-based limits per team or app |
| Outages | Each app writes its own retry logic | Retries and fallbacks configured centrally |
| Switching models | Code change in every caller | Routing change in one config |
| Audit and observability | Scattered logs | One place for usage, latency and errors |

The Envoy AI Gateway project's reference architecture names the underlying pain well: credential sprawl, inconsistent security policies, runaway costs, and infrastructure that is hard to govern.

## The open-source landscape, as of late 2026

Three projects cover most self-hosted deployments, each from a different starting point.

**LiteLLM** ships as a Python SDK and a proxy server that exposes many providers through an OpenAI-compatible interface. Its documentation describes calling 100+ LLMs through one interface, with virtual keys, per-key and per-user spend tracking and budgets, rate limits, load balancing, fallbacks, logging and guardrails. It is the quickest of the three to stand up.

**Agent Router (formerly Envoy AI Gateway)** is built on Envoy Proxy and Envoy Gateway and is configured through Kubernetes custom resources. It reached 1.0 in June 2026 with a stability commitment for its control-plane API, and in September 2026 it was renamed Agent Router and moved to the Agentic AI Foundation. The maintainers kept the code, the `aigw` CLI and the `aigateway.envoyproxy.io` API group unchanged, so existing configurations continue to work. It fits teams that already run Envoy or a Kubernetes-native gateway.

**Kong AI Gateway** adds AI-specific policies to Kong Gateway: plugins including AI Proxy, AI Proxy Advanced, AI Rate Limiting Advanced, AI Prompt Guard and AI Semantic Cache. It fits organisations that already standardise on Kong for API management.

Cloud providers and model vendors also offer managed gateways and routing layers. The concepts below apply to all of them.

## Two tiers, not one

![Envoy AI Gateway data plane: client requests pass through authorisation, authentication, the AI Gateway external processor for request transformation and upstream authentication, a token rate limit filter and a route filter before reaching external or internal AI services, with token usage and cost calculated on the response path](/assets/images/blog/ai-gateways-data-plane.webp)

*Request and response path through the data plane, from the project's original design proposal. Source: [Envoy AI Gateway / Agent Router project](https://github.com/theagentrouter/agent-router), Apache 2.0*

The Envoy AI Gateway reference architecture recommends a two-tier design, and it generalises beyond that project. The cover image of this post is that reference diagram.

- **Tier one** is the single entry point for every application. It handles client authentication, top-level routing, global rate limits, cost tracking, and injects the right provider credentials on the way out.
- **Tier two** sits in front of self-hosted models. It handles load balancing across model replicas and policy specific to internal serving, so the team running GPUs can change model versions without touching the customer-facing gateway.

Separating them lets the platform team own governance while the model-serving team owns its own releases.

## Getting started with a minimal setup

For a first deployment, LiteLLM's proxy shows the moving parts compactly. Model routing and fallbacks are declared in `config.yaml`; this is adapted from its reliability documentation:

```yaml
model_list:
  - model_name: chat-default          # name your apps call
    litellm_params:
      model: openai/<provider-model-id>
      api_key: os.environ/OPENAI_API_KEY
  - model_name: chat-fallback
    litellm_params:
      model: anthropic/<provider-model-id>
      api_key: os.environ/ANTHROPIC_API_KEY

litellm_settings:
  num_retries: 3
  request_timeout: 10
  fallbacks: [{"chat-default": ["chat-fallback"]}]
  allowed_fails: 3
  cooldown_time: 30
```

Applications then authenticate with virtual keys issued by the gateway, never with provider keys. Keys are created through the `/key/generate` endpoint, which accepts limits such as `models`, `max_budget`, `duration`, and `tpm_limit` or `rpm_limit`, plus a `team_id`. Virtual keys need a Postgres database behind the proxy.

The pattern to notice: applications ask for `chat-default`, not a specific provider model. Which model that means is now a platform decision.

## Policies that earn their keep

**Token-based limits, not request counts.** One request can cost a fraction of a cent or several dollars depending on context length. Limit on tokens or estimated cost per key, so a runaway loop in one service cannot exhaust a shared quota or budget.

**Budgets per team.** Spend that is attributed gets managed. Hard budgets on experiment keys and alerts on production keys are a reasonable default.

**Fallbacks, chosen carefully.** A fallback model is not a drop-in replacement. Output format, tool-calling behaviour and safety tuning differ between models. Only list a fallback after the feature's eval suite passes on it, and log every fallback so you know when it is carrying traffic.

**Data rules at the edge.** The gateway is the natural place to block requests to providers that are not approved for a data class, and to redact obvious secrets or personal data before a prompt leaves your network.

**Careful logging.** Central logs are useful and dangerous: prompts contain customer data. Log metadata (team, model, tokens, latency, status) by default, and store full prompts only where there is a reason and a retention policy.

## Agents and MCP traffic

Agentic workloads add a second kind of traffic: tool calls. Gateways are extending to cover it. Agent Router includes an MCP gateway with access control over which tools are discovered and invoked, LiteLLM's proxy offers an MCP gateway with access controlled by key and team, and Kong offers an AI MCP Proxy plugin in its enterprise AI Gateway. Treat tool access like model access, with identities, allowlists and audit logs, rather than letting every agent hold its own credentials for every tool.

## Rollout without a big bang

1. **Start with observability.** Route one team's traffic through the gateway with no limits enforced, and learn what usage actually looks like.
2. **Move credentials.** Replace provider keys in applications with gateway keys. Rotate the old provider keys once traffic has moved.
3. **Introduce aliases.** Have apps call logical model names, so later model changes are config changes.
4. **Turn on limits and budgets**, generously at first, then tighten using real data.
5. **Add fallbacks** only for features with evals that pass on the fallback model.
6. **Block direct egress** to provider APIs from application networks, so the gateway becomes the only path.

The gateway also becomes critical infrastructure. Run it with redundancy, monitor its latency overhead and plan for its own outages.

## A working checklist

- **No provider keys in applications.** Gateway-issued keys only, scoped by team.
- **Logical model names** in application code.
- **Token or cost limits** and budgets per key and team.
- **Fallbacks validated by evals**, with fallback traffic logged.
- **Data-class routing rules** and redaction at the gateway.
- **Metadata logging by default**; full prompts only with a retention policy.
- **Tool access through the gateway** for agent workloads.
- **Egress to providers blocked** except via the gateway.
- **The gateway itself monitored** as tier-one infrastructure.

## Why this belongs to the platform team

Every organisation that uses more than one model ends up with a gateway eventually, either one it designed or one that grew by accident inside a shared library. The designed version gives you a single place to answer the questions leadership will ask: what are we spending, on which models, for which teams, and what happens when a provider goes down.

It also makes the next model change cheap. When a better or cheaper model arrives, the work is a routing change and an eval run, not a migration across every service.

**Sources**

- https://docs.litellm.ai/docs/simple_proxy
- https://docs.litellm.ai/docs/proxy/reliability
- https://docs.litellm.ai/docs/proxy/virtual_keys
- https://theagentrouter.ai/blog/envoy-ai-gateway-is-now-agent-router/
- https://github.com/theagentrouter/agent-router
- https://github.com/theagentrouter/agent-router/blob/main/site/blog/2025/2025-07-15-envoy-ai-gateway-reference-architecture.md
- https://github.com/theagentrouter/agent-router/blob/main/site/blog/2026/2026-06-23-v1.0-release-announcement.md
- https://developer.konghq.com/ai-gateway/
- https://developer.konghq.com/plugins/ai-mcp-proxy/
- https://docs.litellm.ai/docs/mcp

**Media credits**:
- Hero image: two-tier reference architecture diagram from "A Reference Architecture for Adopters of Envoy AI Gateway" (Envoy AI Gateway, now Agent Router), Apache 2.0, shown on a white background — [GitHub](https://github.com/theagentrouter/agent-router/blob/main/site/blog/images/aigw-ref.drawio.png)
- In-body figure: data plane diagram from the Envoy AI Gateway design proposal, Apache 2.0 — [GitHub](https://github.com/theagentrouter/agent-router/blob/main/docs/proposals/001-ai-gateway-proposal/data_plane.png)
