---
id: "59"
slug: "typesafe-ai-jev-a-system-one-model-that-returns-decisions-not-text"
title: "TypeSafe AI Jev: A System One Model That Returns Decisions, Not Text"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/typesafe-jev.webp"
category: "AI Models"
desc: "TypeSafe AI's Jev returns typed choices, scores and yes/no probabilities with confidence instead of text, at $0.042 per million input tokens."
date: "Sep 15, 2026"
tags: ["AI Models", "TypeSafe AI", "Jev", "Structured Outputs", "Classification", "AI Startups"]
---


# 🎯 TypeSafe AI Jev: A System One Model That Returns Decisions, Not Text

✨ Jev doesn't chat or write. It answers the questions you define, in the format you define, with a probability attached.


## 🌐 Introduction

TypeSafe AI today came out of stealth with **$40 million in seed funding led by DCVC** and released **Jev**, the first of what it calls **System One Models**. Jev is available today in **early access**, with developers admitted from a waitlist.

Jev is not a chatbot and it does not generate free text. You send it some state, such as a support ticket, a document or a JSON object, along with a set of typed questions. It returns typed answers: a choice from a list you supplied, a score on a rubric, or the probability that a statement is true. Each answer comes with probabilities and, for choices and scores, a confidence value.

TypeSafe describes Jev as "a frontier-intelligence function call" that takes unstructured state in and returns typed, probabilistic decisions.

> 💡 "Most intelligence should eventually live inside software, running quietly in the background." — Diogo Almeida, TypeSafe AI

## 🏢 Who Is TypeSafe AI?

| Detail | What TypeSafe Has Disclosed |
|--------|-----------------------------|
| **📍 Headquarters** | San Francisco |
| **🗓️ Founded** | 2024 |
| **👥 Founders** | Diogo Almeida (CEO), Erik Gafni, Sasha Sheng |
| **💵 Funding** | $40M seed, led by DCVC |
| **🤖 First model** | Jev, in early access |

Almeida is a former OpenAI researcher. In the launch post, he says he "helped build the methods that made language models useful at following instructions," the work behind ChatGPT.

## 🧠 What "System One" Means

The name comes from Daniel Kahneman's *Thinking, Fast and Slow*. System One is fast, intuitive thinking. System Two is slow, deliberate reasoning. Chat models and reasoning models are built for System Two-style work. Jev is aimed at the snap judgments software makes constantly: is this urgent, which team owns it, how risky is it.

TypeSafe trains Jev with a method it calls **Reinforcement Learning for Calibrated Decisions (RLCD)**. The aim is calibration: when Jev reports higher confidence, it should be right more often.

## 🧩 The Three Question Types

TypeSafe's API docs define three kinds of question:

| Type | What It Asks | What You Get Back |
|------|--------------|-------------------|
| **🔀 Choice** | Which of these options? | The chosen option, a probability per option, and a confidence value |
| **📏 Score** | Where does this fall on a rubric? | A numeric score, a probability per level, and a confidence value |
| **✅ Noul** | Is this true? | A single probability between 0 and 1 |

A Choice question can list **up to 255 options**. A Score rubric needs **at least two levels**, and the API accepts **up to 10**.

### 🧪 Example: Routing a Support Ticket

This example is adapted from TypeSafe's API reference. You send one request to `POST https://api.typesafe.ai/v1/systemone`:

```json
{
  "state": "Help! My payouts have been failing for 3 days.",
  "model": "jev-latest",
  "questions": {
    "department": {
      "type": "choice",
      "instructions": "Which team should handle this?",
      "criteria": {
        "billing": "Payments, invoicing, refunds",
        "technical": "Bugs, outages, integrations",
        "sales": "Pricing, upgrades, new accounts"
      }
    }
  }
}
```

The answer comes back as data your code can branch on directly (response trimmed):

```json
{
  "answers": {
    "department": {
      "type": "choice",
      "choice": "billing",
      "probabilities": { "billing": 0.88, "technical": 0.12, "sales": 0.0 },
      "confidence": 0.81
    }
  }
}
```

There's nothing to parse and no chance of getting back a fourth department that doesn't exist.

## ⚡ Speed and Pricing Claims

| Claim | TypeSafe's Figure |
|-------|-------------------|
| **⏱️ End-to-end response time** | 70ms–500ms (vs. 3 to 329 seconds for LLMs, per TypeSafe) |
| **🚀 Speed vs. frontier LLMs** | 40x–200x faster on System One-shaped queries |
| **💰 Input tokens** | $0.042 per million ($42 per billion) |
| **🆓 Output tokens** | Free |

The press release uses more cautious wording. It says Jev responds in **under 100 milliseconds** and is **up to 100 times faster and less expensive** than other frontier models.

On TypeSafe's own workflow evaluations, the company reports Jev was **193.6x faster and 444.6x cheaper**. The reference answers were the average of GPT-6 Astra and Fable 5.1, and TypeSafe says it expects these results to sit at the higher end of real-world gains.

> ⚠️ All of these are vendor-reported numbers. TypeSafe's launch post lists public benchmark results as an open question, so test Jev on your own workloads.

![Average of 4 workflows: accuracy vs cost per workflow for Jev and LLMs](/assets/images/blog/typesafe-jev-accuracy-vs-cost.png)

*Average accuracy across four workflows vs cost per workflow. Source: [TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev)*

<div style="position:relative;padding-top:56.25%"><iframe src="https://player.vimeo.com/video/1227496082" title="Jev side-by-side demonstration" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>

*TypeSafe's side-by-side demonstration of Jev against an LLM. Source: [TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev)*

## 🔍 "Can't Hallucinate": What That Really Means

TypeSafe's launch post says Jev "can't hallucinate." The precise claim is narrower: **"Schema matching is guaranteed."**

> **What the guarantee covers:**
> - ✅ Every answer is one of the outputs you defined in advance
> - ✅ No malformed JSON, no invented categories, no type errors
> - ✅ Every answer carries probabilities you can threshold on
>
> **What it does not cover:**
> - ❌ Jev can still pick the **wrong** option from your list
> - ❌ A score can still be off, and a yes can still be a no
> - ❌ A badly written question or option list still gives you bad decisions

In short, Jev can still be wrong, but only within the answer set you gave it. That is a real improvement for automation, because the failure is visible and bounded. You can't get a made-up refund policy back, only "billing" when the right answer was "technical." The confidence score is what lets you catch those cases.

![Hallucination and type-safety comparison chart](/assets/images/blog/typesafe-jev-hallucination-type-safety.png)

*Hallucination and type-safety results as published by TypeSafe. Source: [TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev)*

## 💼 What It Means for Teams and Developers

For a software consultancy, Jev targets a lot of the work we currently hand to general-purpose LLMs plus a JSON parser.

### 1. 🗂️ Classification and Routing

Ticket triage, lead routing, intent detection and content moderation are Choice and Noul questions. One request can ask several questions about the same state, so a single call can tag urgency, department and sentiment together.

### 2. 📊 Scoring and Prioritisation

Risk scoring, lead quality and review sentiment fit the Score type. Each score comes with a probability for every level, which tells you whether the model was torn between two of them.

### 3. 🧾 Extraction Pipelines

Wherever an extraction step ends in a fixed set of fields or categories, typed outputs remove the "the model returned prose" class of bugs. Free-form fields such as summaries or drafted replies still need a text model.

### 4. 🚦 Design Around Confidence

The useful pattern is threshold-and-escalate:

| Confidence | Suggested Action |
|------------|------------------|
| **🟢 High** | Act automatically |
| **🟡 Medium** | Act, but log for sampled review |
| **🔴 Low** | Escalate to a human or a larger reasoning model |

Pick the thresholds from your own labelled data, not from intuition.

### 5. 🧪 Evaluate Before You Migrate

Jev is in waitlisted early access, and its headline numbers are TypeSafe's own. Before you swap out an LLM classifier on a client system, run both against a labelled set and compare accuracy, calibration, latency and cost per decision.

## ✨ Conclusion

Jev turns AI into something closer to a typed function call: state goes in, a bounded decision with a probability comes out. With $40 million behind it, a $0.042 per million input-token price and free output, TypeSafe is betting that much of the intelligence software needs is fast judgment, not prose.

The "can't hallucinate" line deserves care. Jev guarantees the shape of the answer, not that it's right. For classification, routing and triage, that guarantee plus calibrated confidence could still remove a lot of fragile glue code.

> 💭 The question is shifting from *"What will the model say?"* to *"Which decision did it make, and how sure is it?"*

---

**Tags**: #AIModels #TypeSafeAI #Jev #SystemOne #StructuredOutputs #Classification #AIStartups #BigMatrixSolutions

**Sources**:
- [Introducing System One Models and Jev — TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
- [API reference — TypeSafe AI Docs](https://docs.typesafe.ai/api)
- [TypeSafe AI Emerges From Stealth With $40M in Funding With New Model for Composable AI — Business Wire via Yahoo Finance](https://finance.yahoo.com/technology/ai/articles/typesafe-ai-emerges-stealth-40m-190000776.html)
- [A new kind of AI model from a ChatGPT inventor is thrilling developers — TechCrunch](https://techcrunch.com/2026/09/18/a-new-kind-of-ai-model-from-a-chatgpt-inventor-is-thrilling-developers/)
- [TypeSafe AI Releases Jev: A System One Model That Returns Typed, Calibrated Decisions Instead of Text — MarkTechPost](https://www.marktechpost.com/2026/09/19/typesafe-ai-releases-jev/)

**Media credits**:
- Hero image, charts and demo video — [TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
