---
id: "60"
slug: "openai-decisions-api-gpt-6-luna-picks-from-your-answers"
title: "OpenAI Decisions API: GPT-6 Luna Picks From Your Answers"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/openai-devday-2026.png"
category: "AI Models"
desc: "OpenAI's Decisions API turns GPT-6 Luna into a fast chooser that picks from answers you define. How it compares with TypeSafe AI's Jev."
date: "Sep 29, 2026"
tags: ["AI Models", "OpenAI", "Decisions API", "GPT-6 Luna", "Jev", "TypeSafe AI", "AI Agents"]
---


# 🎯 OpenAI Decisions API: GPT-6 Luna Picks From Your Answers

✨ OpenAI's newest API doesn't write anything. It reads your context and picks one of the answers you gave it.


## 🌐 Introduction

OpenAI today launched the **Decisions API** at DevDay 2026 in San Francisco. It runs on a version of **GPT-6 Luna**, OpenAI's low-cost model, and it does one job. You define a question and a fixed list of allowed answers, pass in context as text or images, and the API returns one of those answers.

OpenAI names three uses: **classifying content**, **routing requests** and **choosing an agent's next action**.

> 💡 "We can make it extremely fast while keeping capabilities like image understanding" — Sam Altman, OpenAI CEO, as quoted by TechCrunch

The launch also brings a comparison. Two weeks earlier, **TypeSafe AI** released **Jev**, a model that likewise returns decisions instead of text. TechCrunch ran its story under the headline "OpenAI's Jev clone could help the frontier lab stop its swarming agents", and Startup Fortune called the Decisions API something that "looks a lot like" an answer to Jev. OpenAI has not said Jev influenced the product.

## ⚙️ How It Works

The idea is simple. A normal LLM call can return anything. The Decisions API constrains Luna to a closed set of options you supply.

> **The Basic Flow:**
> - ✅ You define a question with a **limited set of predefined answers**
> - ✅ You pass context as **text or images**
> - ✅ Luna returns **one of your answers**, never free-form text

![Diagram of the Decisions API: a question, allowed answers and text or image context go into a constrained GPT-6 Luna, which returns one of your answers](/assets/images/blog/diagrams/openai-decisions-api-1.svg)

*The Decisions API returns one of the answers you define, never free-form text. Diagram: Big Matrix Solutions, based on [The Decoder](https://the-decoder.com/openai-expands-codex-and-its-api-at-devday-with-security-scans-a-decisions-api-and-ultrafast/).*

Because the model only has to choose, OpenAI can make it much faster. According to The Decoder, OpenAI says the Decisions API answers in about **150 milliseconds**, about **ten times faster** than a regular GPT-6 Luna call. Firecrawl reports that OpenAI's DevDay slide puts the standard Luna call at **1.6 seconds**.

## 🚧 What OpenAI Hasn't Published Yet

OpenAI's DevDay recap says the Decisions API is **available in limited preview today**, with a broad release planned in the coming days.

Today, a lot is still missing:

| Detail | Status |
|--------|--------|
| **💰 Price per call or per token** | Not published |
| **📄 Request and response schema** | Not published |
| **📊 Probabilities or confidence in the response** | Not confirmed by OpenAI docs |
| **🔢 Max number of answer options** | Not published |
| **📚 Entry in OpenAI's developer docs** | None as of today |

For reference, the underlying **GPT-6 Luna** model is listed in OpenAI's API docs at **$0.10 per million input tokens** and **$0.50 per million output tokens**. Nobody outside OpenAI knows yet whether Decisions API calls will be billed at those rates.

## 🆚 Decisions API vs Jev

Jev comes from **TypeSafe AI**, founded by **Diogo Almeida**, a former OpenAI researcher and co-author of the InstructGPT paper. TypeSafe announced Jev on **September 15, 2026**, calling it a "System One Model". It opened signups to all developers on **September 20**, and paused new signups on **September 22**, citing demand.

| | **🎯 OpenAI Decisions API** | **🧩 TypeSafe AI Jev** |
|---|---|---|
| **🏢 Built by** | OpenAI | TypeSafe AI |
| **🧠 Model** | Constrained version of GPT-6 Luna | Purpose-built decision model |
| **📥 Inputs** | Text or images | Text |
| **📤 Output** | One of your predefined answers | Typed decisions with calibrated probabilities |
| **🧱 Question types** | Questions with finite answers | Choice, Score and Noul (yes/no) |
| **⚡ Latency claim** | ~150 ms (OpenAI) | 70 to 500 ms end-to-end (TypeSafe) |
| **💰 Price** | Not published | $0.042 per million input tokens, output free |
| **🚀 Availability** | Limited preview | Live via TypeSafe, OpenRouter and Vercel AI Gateway |

TypeSafe's own benchmark page claims Jev ran its workflow tasks **193.6x faster** and **444.6x cheaper** than the LLMs it tested. Those are vendor numbers on vendor-chosen tasks.

The early response was large. Bloomberg reported that Jev's launch video was viewed about **40 million times** on X. It also said TypeSafe received funding offers valuing it at more than **$10 billion**.

> ⚠️ Firecrawl cites an early hands-on test by Every with a split result. The Decisions API was faster on multi-step text tasks, about **230 ms vs 500 ms**. Jev was faster on classification, about **161 ms vs 309 ms**. One test is not a benchmark, so measure on your own data.

![Bar chart of latency claims: standard GPT-6 Luna 1.6 seconds, Decisions API about 150 ms, Jev 70 to 500 ms, plus Every's split test results](/assets/images/blog/diagrams/openai-decisions-api-2.svg)

*Vendor latency claims, and one early hands-on test with a split result. Diagram: Big Matrix Solutions, based on [Firecrawl](https://www.firecrawl.dev/blog/openai-decisions-api-vs-jev).*

## 💼 What It Means for Teams and Developers

For a software consultancy, both products target the same layer: the many small decisions inside an agent or pipeline, where calling a big chat model is slow and expensive.

### 1. 🧭 How to Choose

| Situation | Suggested Starting Point |
|-----------|--------------------------|
| **🖼️ Decisions that depend on images** | Decisions API, since Jev is text-only |
| **📏 You need calibrated probabilities to set thresholds** | Jev, which documents per-option probabilities |
| **🏗️ Production work this month** | Jev, which has published pricing and docs today |
| **🔐 Client already standardised on OpenAI contracts** | Decisions API, once it leaves preview |

### 2. 🔒 Watch the Lock-In

Neither API is a standard. Keep your questions, answer sets and context-building code behind your own interface, so you can swap providers or run both side by side. Jev is already available through OpenRouter and Vercel AI Gateway, which helps.

### 3. 💰 Model the Cost Before You Commit

Jev's price is public. The Decisions API's price is not. Don't promise a client a per-decision cost on OpenAI until the price is published. TechCrunch's example shows the scale involved: agent monitoring that costs about **$2.94** with Jev would cost roughly **$372** with a frontier LLM.

### 4. ⏱️ Test Latency Where You Deploy

150 ms is OpenAI's number, and TypeSafe quotes a range. Network round-trips can eat a big share of that budget. Benchmark both from the region your app runs in.

### 5. 🛡️ Use Decision Models as Guardrails

TechCrunch framed fast decision models as a way to monitor agents on every action, not just occasionally. Checks like "is this tool call allowed?" are exactly this kind of bounded question.

## ✨ Conclusion

The Decisions API shows that OpenAI also sees fast, bounded choices as their own product. You get GPT-6 Luna's understanding of text and images, with answers in about 150 ms. But today it is a limited preview with no public price, schema or docs.

Jev, by contrast, is live, priced and documented, but text-only. For most teams the sensible move is to build against an abstraction, prototype on Jev now, and run the Decisions API against it as soon as you get access.

> 💭 The cheapest and fastest output is often a single, well-defined answer, not a paragraph.

---

**Tags**: #AIModels #OpenAI #DecisionsAPI #GPT6Luna #Jev #TypeSafeAI #AIAgents #BigMatrixSolutions

**Sources**:
- [DevDay 2026 Recap — OpenAI](https://openai.com/index/devday-2026-recap/)
- [OpenAI expands Codex and its API at DevDay with security scans, a Decisions API, and Ultrafast — The Decoder](https://the-decoder.com/openai-expands-codex-and-its-api-at-devday-with-security-scans-a-decisions-api-and-ultrafast/)
- [OpenAI's Jev clone could help the frontier lab stop its swarming agents — TechCrunch](https://techcrunch.com/2026/09/30/openais-jev-clone-could-help-the-frontier-lab-stop-its-swarming-agents/)
- [OpenAI's new Decisions API looks a lot like its answer to a rival's Jev model — Startup Fortune](https://startupfortune.com/openais-new-decisions-api-looks-a-lot-like-its-answer-to-a-rivals-jev-model/)
- [OpenAI's Decisions API vs Jev: Inside the Decision-Model Architecture — Firecrawl](https://www.firecrawl.dev/blog/openai-decisions-api-vs-jev)
- [What Is Jev? Inside TypeSafe's Decision-Only AI Model — Firecrawl](https://www.firecrawl.dev/blog/what-is-jev)
- [GPT-6 Luna model page — OpenAI API Docs](https://developers.openai.com/api/docs/models/gpt-6-luna)
- [TypeSafe AI](https://typesafe.ai/)
- [What Is Jev? TypeSafe's Decision Model Explained for Developers — OpenRouter](https://openrouter.ai/blog/insights/what-is-jev/)
- [Jev, an AI Model That Can't Chat, Takes On Bigger Rivals — Bloomberg via Yahoo Finance](https://finance.yahoo.com/technology/ai/articles/jev-ai-model-t-chat-100610738.html)

**Media credits**:
- Hero image: DevDay 2026 artwork — [OpenAI](https://openai.com/index/devday-2026-recap/)
- Diagram: Decisions API flow — Big Matrix Solutions, based on [The Decoder](https://the-decoder.com/openai-expands-codex-and-its-api-at-devday-with-security-scans-a-decisions-api-and-ultrafast/)
- Diagram: latency claims — Big Matrix Solutions, based on [Firecrawl](https://www.firecrawl.dev/blog/openai-decisions-api-vs-jev)
