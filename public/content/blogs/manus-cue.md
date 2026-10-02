---
id: "16"
slug: "manus-launches-cue-personal-agents-with-email-phone-and-wallet"
title: "Manus Launches Cue: Personal AI Agents With Their Own Email, Phone and Wallet"
author: "Mera"
admin: "Mera"
comments: "0"
image: "https://images.unsplash.com/photo-1599050751795-6cdaafbc2319?auto=format&fit=crop&q=80&w=800"
category: "Agentic AI"
desc: "Alongside Manus 2.0, Manus has launched Cue, a standalone app where every personal agent gets its own email, phone number, wallet and computer."
date: "Sep 28, 2026"
tags: ["Agentic AI", "AI Agents", "Manus", "Personal Agents", "AI Security"]
---


# 📱 Manus Launches Cue: Personal AI Agents With Their Own Email, Phone and Wallet

✨ Agents are moving out of the chat window and into the real world, with an inbox, a phone line and a budget.


## 🌐 Introduction

Manus today launched **Cue**, a standalone app for personal AI agents, alongside a broader platform release it calls **Manus 2.0**. The headline idea behind Cue is simple and a little startling: each agent gets **its own email address, phone number, wallet and computer**.

That makes Cue one of the clearest consumer-facing examples yet of an agent that does more than draft text. It can message people, take calls, spend money within limits you set, and coordinate with other agents. It also raises obvious questions about money, fraud and consent, which we cover below.

> 💡 "Manus 2.0 is not a version update." — Manus

## 🤖 What Cue Actually Does

According to Manus's launch post, a Cue agent has its own identity and its own resources. Here is what the company says the agents can do:

| Capability | What Manus Says | ✅ Practical Example |
|------------|-----------------|---------------------|
| **📧 Own email address** | Each agent gets a dedicated inbox | Agent handles correspondence for a task |
| **📞 Own phone number** | Agents can take your calls and leave a summary in Cue | Screening and summarising incoming calls |
| **💳 Own wallet** | Agents can pay within the budget you set | Paying for an errand without sharing your card |
| **💻 Own computer** | Agents see a task through on their own machine | Long-running work that doesn't tie up your laptop |
| **👥 Group chats** | Several agents share a goal and hand work to each other | A small "team" of agents splitting a job |
| **📷 QR-code services** | Scan a QR code and the agent can order or hold your place in line | Ordering at a restaurant, queueing |

The pitch is less back-and-forth and more "done for you." Rather than an assistant that tells you what to do, Cue is designed to be an assistant that does it, using accounts that belong to the agent rather than to you.

## 🚀 Availability

| Detail | Status |
|--------|--------|
| **🗓️ Launch date** | September 28, 2026 |
| **🧪 Stage** | Early access |
| **💰 Price** | Free during early access with an invite code |
| **🎟️ Invite code** | `MEETCUE`, offered to a limited number of early users, first come, first served |
| **🖥️ Platforms** | Web, desktop and mobile |
| **🍎 iOS** | Pending App Store review |

Manus has not disclosed what Cue will cost once early access ends.

## 🏗️ The Context: Manus 2.0

Cue arrives as part of a larger release. Manus 2.0 is built around **Cascade**, which Manus describes as the latest iteration of its in-house agent harness, the layer around the language model that decides which tools to call, how to manage memory and when a task is done. Manus does not train its own base models; it said in December 2025 that it builds on **Claude** and **Alibaba's Qwen** models.

| Manus 2.0 Component | What It Does |
|---------------------|--------------|
| **⚙️ Cascade** | New agent harness. In one tested configuration, Manus reports 23.2% fewer tokens, 28.2% less time and 32% lower cost than its previous system |
| **☁️ Cloud Computer** | A dedicated, persistent environment, from a game server to a permanent home for an automation |
| **⚡ Automations** | Tasks triggered by a new email, ad-performance change, calendar event, Slack message or Notion update |
| **🎨 Manus Studio** | The desktop app, upgraded into a shared workspace for people and AI |

A caveat worth stating: the Cascade figures come from Manus itself, from a single tested configuration, and Implicator notes the company did not describe the test. Treat them as vendor claims until independent benchmarks appear.

On the corporate side, Manus was founded in China and is now based in Singapore. Meta agreed to acquire it at the end of 2025 for $2 billion; Beijing blocked the deal, and Manus has since resumed operating independently.

## ⚠️ The Risk Side: Agents With Wallets and Phone Numbers

Giving an agent its own phone number and money is a genuine step change, and it deserves a sober look.

### 💸 Spending Limits

Manus says Cue agents pay **within the budget you set**. That is the right primitive, but a budget is only as good as its enforcement. Before trusting any agent wallet, teams should ask: is the cap per transaction, per day or per task? Can merchants be restricted? Is every payment logged and reversible? Manus's launch materials do not go into that level of detail.

### 🎣 Fraud and Prompt Injection

An agent with an inbox is an agent that strangers can write to. That is not hypothetical. On September 24, Salt Labs disclosed a prompt-injection flaw in Manus in which a crafted email, disguised with JavaScript obfuscation, led to code execution. Through it, researchers reached credentials and tokens for third-party services the user had connected, such as Gmail, Dropbox and GitHub. Salt Labs said the guardrails flagged the attack only after the code had already run. The flaw was triaged and patched via Meta's bug-bounty program and is no longer exploitable.

That bug predates Cue, but the lesson carries straight over: **every new channel an agent listens on, whether email, phone or QR code, is a new channel for untrusted input.** Add a wallet, and a successful injection has a direct financial payoff.

### 🤝 Consent and Disclosure

When an agent calls a restaurant or emails a supplier, the person on the other end may not know they are dealing with software. Organisations deploying agents like this should decide up front:

> **Questions to Settle Before Deployment:**
> - 🗣️ Does the agent disclose that it is an AI when it calls or emails someone?
> - 📝 Who is accountable if it commits to something, or pays for something, in your name?
> - 🔒 What personal data does it hold, and who can read its inbox and call logs?
> - 🛑 How quickly can a human revoke its wallet, number and credentials?

## 🧑‍💻 What It Means for Teams and Developers

For a software consultancy, Cue is less a product to roll out tomorrow and more a preview of the requirements clients will bring next year.

| Area | What to Do Now |
|------|----------------|
| **🔐 Identity** | Give agents their own scoped accounts and credentials rather than borrowing a human's. Cue's model of agent-owned identity is a sound pattern |
| **💳 Payments** | Use virtual cards or wallets with hard caps, merchant restrictions and an audit log. Never hand an agent an uncapped company card |
| **🛡️ Input hygiene** | Treat every inbound email, message and call transcript as untrusted. Separate "read" from "act," and require confirmation for high-impact actions |
| **🧾 Observability** | Log every tool call, message and payment so a human can reconstruct what the agent did and why |
| **🧪 Pilot scope** | Start with low-stakes errands and small budgets. Expand only once logs show the agent behaving as intended |
| **⚖️ Policy** | Agree AI-disclosure, data-retention and approval rules with legal and compliance before agents talk to customers |

If you are evaluating Cue itself, keep it to personal or sandboxed use while it is in early access. Pricing is undisclosed, the efficiency numbers are unverified, and the platform recently patched a serious injection flaw. None of that is disqualifying, but all of it argues for a careful pilot rather than a production rollout.

## ✨ Conclusion

Cue makes a bold bet: that personal agents become genuinely useful when they have their own email, phone number, wallet and computer, and can work together in group chats. If that bet pays off, "assistant" will start to mean something that books, pays and follows up, not something that suggests.

The same features that make Cue powerful also widen the attack surface. Budgets, audit trails, disclosure and fast revocation are not optional extras for this class of agent; they are the product. Teams that design those controls in now will be ready when clients ask for agents that act on their behalf.

> 💭 The question is shifting from *"Can an agent do this task?"* to *"How much should we let it spend, and who answers when it gets it wrong?"*

---

**Tags**: #AgenticAI #AIAgents #Manus #Cue #PersonalAgents #AISecurity #BigMatrixSolutions

**Sources**:
- [Introducing Manus 2.0 — Manus](https://manus.im/blog/introducing-manus-2-0)
- [Manus Launches Cue Agents With Phone Numbers and Wallets — Implicator](https://www.implicator.ai/manus-cue-agents-phone-numbers-wallets/)
- [Manus 2.0 and Cue give AI agents their own email, phone and wallet — The Next Web](https://thenextweb.com/news/manus-2-0-cue-ai-agents-email-phone-wallet)
- [Salt Labs Research: A Single Email Could Hijack an AI Agent — EIN Presswire](https://www.einpresswire.com/article/946455020/salt-labs-research-a-single-email-could-hijack-an-ai-agent-and-reach-a-user-s-connected-accounts)
