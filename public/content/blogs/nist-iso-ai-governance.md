---
id: "79"
slug: "nist-ai-rmf-iso-42001-ai-governance"
title: "NIST AI RMF and ISO/IEC 42001: AI Governance Without the Theatre"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/nist-iso-ai-governance.webp"
category: "AI Policy"
desc: "One is a voluntary US framework, the other a certifiable international standard. How the NIST AI RMF and ISO/IEC 42001 fit together, and how to adopt them without producing paperwork nobody reads."
date: "Jan 01, 2027"
tags: ["AI Policy", "AI Governance", "NIST AI RMF", "ISO 42001", "Risk Management"]
---

# NIST AI RMF and ISO/IEC 42001: AI Governance Without the Theatre

Ask an enterprise buyer how they assess an AI vendor and two names come up within minutes: the **NIST AI Risk Management Framework** and **ISO/IEC 42001**. They appear in security questionnaires, in requests for proposal and, more and more, in contracts.

Both can turn into theatre: a policy PDF, a risk register written once and never opened again, a certificate on the website. Used properly, they do something more useful. They make a team write down what its AI systems are for, what can go wrong, how it will know, and who decides. This guide covers what each document actually asks for, how they relate, and how to adopt them in proportion to your risk.

*This is an overview for general information, not legal or certification advice. Status of each document is described as of late 2026.*

## What each one is

| | NIST AI RMF 1.0 | ISO/IEC 42001:2023 |
|---|---|---|
| Publisher | US National Institute of Standards and Technology | ISO and IEC joint technical committee |
| Published | 26 January 2023 (NIST AI 100-1) | December 2023 |
| Nature | Voluntary framework | Management-system standard with requirements |
| Certifiable? | No | Yes, by accredited certification bodies |
| Cost to read | Free | Paid standard |
| Core structure | Four functions: Govern, Map, Measure, Manage | Clauses 4 to 10, plus Annex A controls |
| GenAI-specific material | Generative AI Profile, NIST AI 600-1 (26 July 2024) | None in the standard itself |

The difference in nature matters most. The NIST framework describes outcomes and suggested actions, and you choose what to adopt. ISO/IEC 42001 sets requirements for an **AI management system** (AIMS). An auditor can test whether you meet them, and an accredited body can certify you.

## The NIST AI RMF in practice

The framework defines trustworthy AI by seven characteristics: valid and reliable; safe; secure and resilient; accountable and transparent; explainable and interpretable; privacy-enhanced; and fair with harmful bias managed. Its four functions organise the work:

- **Govern** sets the culture, policies, roles and accountability. It is cross-cutting and informs the other three.
- **Map** establishes context: intended purpose, users, potential impacts, and the risks that follow.
- **Measure** applies tools and methods to analyse, assess and track those risks.
- **Manage** prioritises risks and acts on them, including response and recovery when things go wrong.

The companion **Playbook** breaks each function into categories and suggested actions. For teams building on large language models, the more useful document is the **Generative AI Profile** (NIST AI 600-1). It names twelve risks that are unique to generative AI or made worse by it. Among them are confabulation, data privacy, information integrity, information security, intellectual property, harmful bias and homogenisation, and value chain and component integration. For each, it suggests concrete actions across the four functions.

![Grid of the twelve generative AI risks in NIST AI 600-1, with confabulation, data privacy, information security and intellectual property highlighted](/assets/images/blog/diagrams/nist-iso-ai-governance-2.svg)

*Diagram: Big Matrix Solutions, based on [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf).*

The framework is changing. NIST says the AI RMF is being revised under the July 2025 White House AI Action Plan, which directed NIST to remove references to misinformation, diversity, equity and inclusion, and climate change. In April 2026 NIST also released a concept note for a profile on trustworthy AI in critical infrastructure. As of late 2026, version 1.0 remains the current text. Teams that adopt it now should expect to update their mapping when a revision is published.

## ISO/IEC 42001 in practice

ISO/IEC 42001 follows the same high-level structure as ISO/IEC 27001 and other ISO management-system standards. Clauses 4 to 10 cover context, leadership, planning, support, operation, performance evaluation and improvement. Annex A lists 38 reference controls under nine control objectives, covering policy, internal organisation, resources, impact assessment, the AI system life cycle, data, information for interested parties, responsible use, and third-party relationships. Annex B gives implementation guidance.

Three features set it apart from an information-security standard:

- **AI system impact assessment.** Clause 6.1.4 requires a process for assessing consequences of AI systems for individuals, groups and society, not only for the organisation.
- **Life-cycle controls.** Annex A covers requirements, design, verification, deployment, operation and monitoring of AI systems, and the data they depend on.
- **Statement of Applicability.** As in ISO 27001, you justify which Annex A controls you include or exclude. That makes scoping decisions visible to auditors and customers.

Two companion standards appeared in 2025. **ISO/IEC 42005** (May 2025) gives guidance on conducting AI system impact assessments. **ISO/IEC 42006** (July 2025) sets requirements for bodies that audit and certify against 42001. Neither is something a company can be certified to. Treat any vendor claim of "42005 certification" with suspicion.

## How the two fit together

The two documents describe the same work in different vocabularies. The mapping below is approximate, and NIST publishes official crosswalks for more detail:

![Diagram pairing NIST AI RMF functions with ISO/IEC 42001 clauses: Govern with leadership and support, Map with context and planning, Measure with performance evaluation, Manage with operation and improvement](/assets/images/blog/diagrams/nist-iso-ai-governance-1.svg)

*Diagram: Big Matrix Solutions, based on [NIST AI 100-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) and the [ISO/IEC 42001 abstract](https://www.iso.org/standard/42001).*

A practical rule: **use NIST to decide what good risk management looks like, and use ISO/IEC 42001 to prove you do it consistently.** NIST's GenAI Profile is the better source of specific risks and test ideas. ISO's management system adds the audit cycle, the management review and the corrective-action loop that keep the work going after the launch.

## Where the theatre creeps in

Governance programmes rarely fail because someone skipped a clause. They fail in predictable ways:

- **The register describes models, not uses.** A single entry for "GPT-based assistant" hides five deployments with different users and different harms. Register *use cases*. That is also how the EU AI Act classifies risk.
- **Measure never touches production.** Risks are scored on a five-by-five grid while no one tracks error rates, escalations or complaints from the live system. If a risk has no metric, it is an opinion.
- **Policy without decision rights.** An AI policy that does not say who can approve a launch, who can stop one, and what evidence they need is decoration.
- **Certification scope too narrow.** A 42001 certificate can cover a single product or business unit. Buyers should read the scope statement, not the logo.
- **One-off impact assessments.** Model upgrades, new data sources and new user groups change the risk. Reassessment triggers belong in the change process.

## What to do, by team

**Engineering**

- Keep an evaluation suite per use case, run it on every model or prompt change, and store results. This is your Measure function and your 42001 performance evidence.
- Log enough to reconstruct an incident: inputs, outputs, model version, retrieved context, and the human decision that followed.
- Track the GenAI Profile risks that apply to you, especially confabulation, information security and data privacy, as named test categories.

**Risk, compliance and security**

- Build one control set that maps to NIST, ISO/IEC 42001 and, where relevant, the EU AI Act. Do not run three parallel programmes.
- If customers ask for certification, scope 42001 to the products they buy and extend it later.
- Add AI-specific questions to supplier due diligence. Annex A expects you to manage third-party AI components.

**Leadership**

- Name an accountable owner for each production AI use case, with authority to pause it.
- Hold a management review at least yearly that looks at incidents and metrics, not just policy updates.

## The bottom line

The NIST AI RMF and ISO/IEC 42001 are not competing. NIST supplies a free, flexible description of good AI risk practice, including the most specific public guidance on generative AI risks. ISO/IEC 42001 turns that practice into a management system an auditor can check. A small team can adopt NIST's functions in a few weeks by attaching real metrics and owners to each use case. A company selling into regulated buyers will probably need 42001 as well. In both cases, the test of the programme is simple: when something goes wrong, can you show what you knew, what you measured and who decided?

**Sources**

- https://www.nist.gov/itl/ai-risk-management-framework
- https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf
- https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
- https://airc.nist.gov/airmf-resources/playbook/
- https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf
- https://www.iso.org/standard/42001
- https://www.iso.org/standard/42005
- https://www.iso.org/standard/42006

**Media credits**:
- Hero image: AI RMF Core graphic (Govern, Map, Measure, Manage) — [NIST](https://www.nist.gov/itl/ai-risk-management-framework), placed on a white 16:9 canvas without alteration. Work of the US federal government; NIST-created content is generally not subject to copyright in the United States.
- In-body diagram: NIST AI RMF to ISO/IEC 42001 mapping — Big Matrix Solutions, based on [NIST AI 100-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) and the [ISO/IEC 42001 abstract](https://www.iso.org/standard/42001).
- In-body diagram: the twelve GenAI Profile risks — Big Matrix Solutions, based on [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf).
