---
id: "72"
slug: "eu-ai-act-builders-what-applies-and-when"
title: "The EU AI Act for Builders: What Applies to Your Product and When"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/eu-ai-act-builders.jpg"
category: "AI Policy"
desc: "The AI Act now applies in layers, and the 2026 Digital Omnibus moved the high-risk dates. A practical guide to working out your role, your risk tier and your deadlines."
date: "Dec 18, 2026"
tags: ["AI Policy", "EU AI Act", "Compliance", "AI Regulation", "Digital Omnibus"]
---

# The EU AI Act for Builders: What Applies to Your Product and When

Most engineering teams meet the EU AI Act as one of two rumours. Either it bans everything, or it was delayed and can be ignored. Neither is true. The Act already applies in layers. It treats a company that builds a model differently from one that wraps a model in a product, and it sorts products by what they are used for, not by the technology inside them.

The timeline also moved. In July 2026 the EU adopted the **Digital Omnibus on AI**, Regulation (EU) 2026/1744. It pushed back the high-risk deadlines and added two new prohibitions. Several older guides are now out of date.

*This is an overview for general information, not legal advice. Dates and provisions are described as of late 2026. Check the consolidated text on EUR-Lex before relying on any single date.*

## The three questions that decide everything

Before you read any article of the Act, answer three questions about your product.

1. **What is your role?** The Act's main roles are *provider* (you develop an AI system or model and place it on the market under your name) and *deployer* (you use an AI system in a professional capacity). Importers, distributors and authorised representatives have lighter duties.
2. **What risk tier is the use case in?** Prohibited, high-risk, transparency-only or minimal. The tier depends on the intended purpose.
3. **Is there a general-purpose AI model in the stack, and who provides it?** Model providers have their own set of obligations, separate from those of the people who build products on top.

![The European Commission's risk pyramid for the AI Act, with unacceptable, high, limited and minimal risk tiers](/assets/images/blog/eu-ai-act-risk-pyramid.jpg)

*The AI Act's four risk tiers. Source: [European Commission, AI Act policy page](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)*

Roles can change. Under Article 25, a deployer or distributor is treated as a provider of a high-risk system if it puts its own name or trademark on one, makes a substantial modification to one, or changes the intended purpose of a system so that it becomes high-risk. This is the most common way a product team becomes a provider without meaning to. A general chatbot that you re-scope to screen job applicants is a new high-risk system, and you are its provider.

## The timeline, as amended

The Act entered into force on 1 August 2024. The Commission's AI Act page now gives this sequence, which reflects the Omnibus changes:

![Vertical timeline of EU AI Act application dates from 1 August 2024 to 2 August 2028, with Digital Omnibus changes highlighted](/assets/images/blog/diagrams/eu-ai-act-builders-1.svg)

*Diagram: Big Matrix Solutions, based on [Regulation (EU) 2026/1744](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng) and the [European Commission's AI Act page](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai).*

| Date | What applies |
|---|---|
| 2 February 2025 | Prohibited practices (Article 5) and AI literacy (Article 4) |
| 2 August 2025 | Obligations for general-purpose AI (GPAI) model providers; governance; penalties |
| 2 August 2026 | General application, including Article 50 transparency duties |
| 2 December 2026 | New prohibitions on AI generating non-consensual intimate imagery and child sexual abuse material; end of the four-month marking grace period for generative systems already on the market |
| 2 August 2027 | Deadline for GPAI models placed on the market before 2 August 2025 (Article 111(3)) |
| 2 December 2027 | High-risk obligations for Annex III use cases (Article 6(2)) |
| 2 August 2028 | High-risk obligations for AI in products covered by Annex I sectoral law (Article 6(1)) |

Before the Omnibus, the Annex III high-risk rules were due on 2 August 2026 and the Annex I rules on 2 August 2027. The deferral gives teams building high-risk systems more time. It does not change what those systems must do.

## Prohibited practices: check these first

Article 5 has applied since February 2025. Most commercial products are nowhere near it, but a few patterns come up in ordinary product work:

- **Emotion recognition in the workplace or in education**, except for medical or safety reasons.
- **Untargeted scraping of facial images** from the internet or CCTV to build facial recognition databases.
- **Manipulative or deceptive techniques**, or exploitation of vulnerabilities due to age, disability or social or economic situation, that materially distort behaviour and cause significant harm.
- **Social scoring** that leads to detrimental treatment out of context or out of proportion.
- **Biometric categorisation** to infer sensitive traits such as race, political opinions or sexual orientation.

The Omnibus added a further category. Providers may not place on the market systems whose intended purpose, or foreseeable outcome without adequate safeguards, is generating non-consensual intimate imagery or child sexual abuse material. If you ship an image or video generator, that applies from 2 December 2026.

## High-risk: defined by use case

A system is high-risk in one of two ways. Either it is a safety component of a product already regulated under the EU laws listed in Annex I, such as machinery, medical devices or toys. Or its intended purpose falls in an Annex III area: biometrics, critical infrastructure, education, employment and worker management, access to essential services such as credit scoring and insurance pricing, law enforcement, migration and border control, and the administration of justice and democratic processes.

Article 6(3) offers an exit. An Annex III system is not high-risk if it does not pose a significant risk of harm. Examples include a system that performs only a narrow procedural task, or one that improves the result of an activity a human has already completed. The exit never applies to a system that profiles natural persons. If you rely on it, you must document your assessment before you place the system on the market.

For **providers** of high-risk systems, Chapter III, Section 2 sets the core requirements: a risk management system, data governance, technical documentation, automatic logging, transparency to deployers, human oversight, and accuracy, robustness and cybersecurity. On top of that come a quality management system, a conformity assessment, CE marking and registration in the EU database.

For **deployers**, Article 26 is shorter but real. You must use the system according to its instructions, assign human oversight to people with the competence and authority to exercise it, make sure the input data you control is relevant, monitor operation, and keep the automatically generated logs for at least six months. Employers must inform workers before using a high-risk system in the workplace.

## Transparency: the layer most products hit

Article 50 is where most ordinary generative AI products land, and it has applied since 2 August 2026.

- **Interacting with people.** Providers must design systems so that people know they are dealing with an AI system, unless that is obvious from context.
- **Synthetic content marking.** Providers of systems that generate audio, image, video or text must mark outputs in a machine-readable format so that they can be detected as artificially generated. Systems already on the market before 2 August 2026 had a four-month transitional period, to 2 December 2026.
- **Emotion recognition and biometric categorisation.** Deployers must inform the people exposed to them.
- **Deepfakes and public-interest text.** Deployers must disclose that the content was artificially generated or manipulated, with adjustments for evidently artistic or satirical work.

## If you train or fine-tune models

GPAI model providers have had obligations since 2 August 2025 under Article 53. They must keep technical documentation, give downstream providers the information they need, put in place a policy to comply with EU copyright law, and publish a summary of training content using the Commission's template. Models trained with more than 10^25 floating-point operations are presumed to have systemic risk (Article 51) and carry extra duties under Article 55, including evaluations, incident reporting and cybersecurity.

Most product teams fine-tune rather than pre-train. The Commission's GPAI guidelines treat a downstream modifier as a new provider only where the modification uses a significant share of compute. The indicative threshold is more than a third of the compute used to train the original model. Typical fine-tuning stays well below that.

## Penalties

Article 99 sets ceilings of up to EUR 35 million or 7% of worldwide annual turnover for prohibited practices, up to EUR 15 million or 3% for most other breaches, and up to EUR 7.5 million or 1% for supplying incorrect information to authorities. For SMEs the lower of the two figures applies. The Omnibus extended some of these reliefs to a new category of small mid-cap enterprises.

## What to do, by team

**Product and engineering**

- Write an intended-purpose statement for each AI feature. Your risk tier follows from it, and so does any Article 25 role change.
- Add AI-interaction disclosure to conversational surfaces and machine-readable marking to generated media. Check what your model provider already supplies before building your own.
- Turn on and retain logs. High-risk deployers need at least six months; everyone else will want them for incident analysis.

**Legal and compliance**

- Keep a register of AI systems with role, tier, model provider and the date each obligation applies.
- Document any Article 6(3) "not high-risk" assessment before launch.
- Ask GPAI providers for their Article 53 documentation and training-content summary. You need the first to meet your own obligations.

**Leadership**

- Treat December 2027 as a build deadline, not a compliance date. Quality management, technical documentation and conformity assessment take longer than a quarter.
- Fund AI literacy measures. The Omnibus softened Article 4 from "ensure" a level of literacy to "take measures to support" it, but the duty remains.

## The bottom line

The AI Act is less a single deadline than a set of switches tied to what your product does. Prohibitions and GPAI duties already apply. Transparency applies to almost any generative feature. The high-risk regime, the part that requires real engineering investment, now begins in December 2027 for Annex III use cases and August 2028 for regulated products. Teams that know their role and intended purpose today will find each later switch routine. Teams that do not may find out through an Article 25 role change they never planned for.

**Sources**

- https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng
- https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng
- https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai
- https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act
- https://www.orrick.com/en/Insights/2026/07/EU-AI-Act-Update-Digital-Omnibus-Finalizes-8-Compliance-Changes

**Media credits**:
- Hero image: "AI Act" illustration from the European Commission's AI Act policy page — [European Commission, Shaping Europe's digital future](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai). © European Union; reuse under the Commission's reuse policy (Decision 2011/833/EU), third-party elements may be excluded.
- In-body figure: AI Act risk pyramid — [European Commission](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai). © European Union; reuse under the Commission's reuse policy.
- In-body diagram: AI Act application timeline — Big Matrix Solutions, based on [Regulation (EU) 2026/1744](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng) and the [European Commission](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai).
