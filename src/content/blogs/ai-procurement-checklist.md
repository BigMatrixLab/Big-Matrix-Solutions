---
id: "93"
slug: "buying-ai-enterprise-procurement-checklist"
title: "Buying AI: A Procurement Checklist for Enterprise Teams"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/ai-procurement-checklist.png"
category: "AI Policy"
desc: "AI products change after you sign, learn from your data unless you say otherwise, and fail in ways a demo will not show. A stage-by-stage checklist for buying them, drawing on US federal and EU public-sector procurement rules."
date: "Jan 29, 2027"
tags: ["AI Policy", "Procurement", "Vendor Management", "AI Governance", "Contracts"]
---

# Buying AI: A Procurement Checklist for Enterprise Teams

Buying an AI product is not like buying ordinary software. The thing you evaluate may not be the thing you get three months later, because the vendor can swap the underlying model. Your data may be used to improve the vendor's product unless the contract says otherwise. And the failure modes, such as confident wrong answers or uneven performance across user groups, rarely show up in a sales demo.

Public buyers have already written down how they handle this. In the United States, the Office of Management and Budget's memorandum **M-25-22** (April 2025) sets rules for federal agencies buying AI. In the EU, the Commission-supported **model contractual clauses for AI procurement** (MCC-AI, updated March 2025) give buyers ready-made contract terms. Neither binds a private company, but both are well-tested starting points. This checklist draws on them.

*This is an overview for general information, not legal advice. Adapt contract terms with counsel to your jurisdiction and sector.*

![Five stages of an AI procurement: define, classify, evaluate, contract, operate](/assets/images/blog/diagrams/ai-procurement-checklist-1.svg)

*Diagram: Big Matrix Solutions, based on [OMB M-25-22](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-22-Driving-Efficient-Acquisition-of-Artificial-Intelligence-in-Government.pdf) and the [EU MCC-AI](https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses).*

## Stage 1: Define the problem before the product

- **Write the problem statement without the word "AI".** "Cut first-response time on support tickets by a third" can be tested. "Deploy a GenAI assistant" cannot.
- **Record a baseline.** Measure the current process before any vendor arrives. Without a baseline, no one can later say whether the purchase worked.
- **Name one accountable owner** with authority to stop the deployment.
- **Set exit criteria in advance:** the metric level, error rate or cost at which you will stop or switch.

## Stage 2: Classify the use and your role

- **Map the use case to a risk tier.** If the product will touch EU users or staff, check whether the use falls into an EU AI Act high-risk category, such as recruitment, worker management, credit scoring or access to essential services. High-risk obligations for those Annex III uses apply from 2 December 2027.
- **Work out your role.** Under the AI Act you are usually a *deployer*. If you put your own brand on the system, substantially modify it, or repurpose it into a high-risk use, Article 25 can make you the *provider*, with much heavier duties.
- **Classify the data.** Personal data, special-category data, trade secrets, regulated records. Each brings its own conditions: a GDPR Article 28 processing agreement, data residency, sector rules.
- **Check for AI already inside existing contracts.** M-25-22 tells agencies to consider requiring vendors to disclose when they use AI in performing a contract. Your current suppliers may already be using AI on your data.

## Stage 3: Evaluate on your data, not theirs

- **Test before you buy.** M-25-22 tells agencies to test proposed solutions "to the greatest extent practicable." Ask for a sandbox or trial on a representative, de-identified sample of your own work.
- **Compare against the baseline, not against nothing.** A tool that is 90% accurate replacing a process that was 97% accurate is a downgrade.
- **Test the failure modes that matter.** Edge cases, adversarial inputs (including prompt injection for agents and retrieval systems), and performance across languages, regions and user groups.
- **Ask for documentation.** Model or system cards, evaluation results, known limitations, acceptable use policy. US federal buyers of large language models must now ask for much of this. OMB's M-26-04 (December 2025) requires LLM contracts to address its "Unbiased AI Principles". It also sets a minimum transparency threshold: agencies must request the vendor's acceptable use policy and its model, system or data cards.
- **Check governance claims.** If a vendor cites ISO/IEC 42001 certification, read the scope statement to see which products and sites it covers. If it cites the NIST AI RMF, ask for evidence such as test reports, not a statement of alignment.

## Stage 4: Contract for change, data and exit

This is where most AI-specific risk is either handled or missed.

| Clause | What to ask for | Why |
|---|---|---|
| Training on your data | No use of your inputs or outputs to train or improve models without explicit opt-in | M-25-22 requires agencies to "permanently prohibit" this without consent |
| Data retention | Defined retention for prompts, outputs and logs; deletion on request and at exit | GDPR storage limitation; limits breach and discovery exposure |
| Model changes | Advance notice of material model or behaviour changes; right to re-test; version pinning where possible | The product you evaluated can change after signing |
| Performance | Measurable service levels tied to your use case, with remedies | M-25-22 encourages performance-based contracting |
| Incidents | Notification of security incidents and serious malfunctions within a fixed window | You may have your own reporting duties (GDPR, AI Act for high-risk deployers) |
| Transparency | Documentation, logs and information needed for your own compliance | AI Act deployers must keep logs and support human oversight |
| IP and indemnity | Ownership of outputs; indemnity for third-party IP claims; exclusions read closely | Training-data copyright litigation is unresolved |
| Sub-processors | List of model providers and hosts; notice of changes | Your vendor is often reselling someone else's model |
| Exit and portability | Export of your data, prompts, configurations, fine-tuned weights where yours; transition help | M-25-22 calls for knowledge transfer and data and model portability to avoid lock-in |

The EU MCC-AI come in two versions: a full set for high-risk systems and a "light" set for others. Both cover risk management, data governance, transparency, human oversight, accuracy and robustness. They deliberately leave out IP and liability, which you must negotiate separately.

## Stage 5: Operate and re-evaluate

- **Monitor the metric from Stage 1** in production, alongside cost per transaction. Inference costs vary with usage in ways licence fees do not.
- **Re-run your evaluation set** on every notified model change, and on a schedule even without notice.
- **Keep logs** long enough to investigate incidents. High-risk deployers under the AI Act must keep automatically generated logs for at least six months.
- **Review at renewal** against the exit criteria you set at the start. M-25-22 asks agencies to reassess risks and opportunities before selection. Doing the same before renewal stops weak deployments from continuing by default.

## Red flags in vendor answers

Some answers should slow a purchase down:

- **"Our model is proprietary, so we can't share evaluation results."** You do not need the weights. You do need evidence of how the system performs, and where it fails, on tasks like yours.
- **"We never train on customer data"**, but the contract says otherwise or says nothing. The contract is what counts.
- **"We're compliant with the AI Act."** For what role, which risk tier and which obligations? Many AI Act obligations do not apply yet, and many fall on the deployer, not the vendor.
- **No answer on which underlying model is used, or how you will hear about changes.** If the vendor cannot say, it cannot promise the product will keep behaving as it did in your test.
- **Exit terms that cover your data but not your configurations,** such as prompts, workflows, retrieval indexes and evaluation sets. Those are often where your investment sits.

## A one-page checklist

**Before the RFP**

- Problem statement, owner and baseline recorded
- Risk tier and AI Act role assessed
- Data categories and legal bases identified

**During evaluation**

- Hands-on test on representative data
- Failure modes and adversarial cases tested
- Documentation, certifications and their scope reviewed

**In the contract**

- No training on your data without opt-in
- Retention, deletion and sub-processor terms
- Model-change notice and re-test rights
- Incident notification window
- IP indemnity read, exclusions understood
- Exit, portability and transition support

**After go-live**

- Outcome metric and cost monitored
- Evaluation re-run on model changes
- Renewal decision tied to exit criteria

## The bottom line

The difference between a good and a bad AI purchase is rarely the model. It is whether the buyer defined success before the demo, tested on real work, and signed a contract that expects the product to change. US federal and EU public buyers have turned those lessons into memos and model clauses that any enterprise can borrow. Using them costs a few weeks at the start. Not using them tends to cost much more at renewal, when no one can show whether the tool worked, where the data went, or how to leave.

**Sources**

- https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-22-Driving-Efficient-Acquisition-of-Artificial-Intelligence-in-Government.pdf
- https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf
- https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses
- https://www.insideprivacy.com/artificial-intelligence/eus-community-of-practice-publishes-updated-ai-model-contractual-clauses/
- https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng
- https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng
- https://www.nist.gov/itl/ai-risk-management-framework

**Media credits**:
- Hero image: first page of OMB Memorandum M-25-22, *Driving Efficient Acquisition of Artificial Intelligence in Government* (April 3, 2025), cropped to the letterhead and placed on a white 16:9 canvas — [The White House, Office of Management and Budget](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-22-Driving-Efficient-Acquisition-of-Artificial-Intelligence-in-Government.pdf). Work of the US federal government, not subject to copyright in the United States.
- In-body diagram: five stages of AI procurement — Big Matrix Solutions, based on OMB M-25-22 and the EU MCC-AI.
