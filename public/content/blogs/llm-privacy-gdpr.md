---
id: "100"
slug: "llm-personal-data-gdpr-pii-redaction-retention"
title: "LLMs and Personal Data: GDPR, PII Redaction and Retention"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/llm-privacy-gdpr.png"
category: "AI Policy"
desc: "Every prompt can carry personal data, every log keeps it, and a model may remember it. How the GDPR and the EDPB's opinion on AI models apply to LLM products, and the engineering controls that actually reduce risk."
date: "Feb 12, 2027"
tags: ["AI Policy", "GDPR", "Privacy", "PII", "Data Retention"]
---

# LLMs and Personal Data: GDPR, PII Redaction and Retention

Personal data gets into a language model product in three places. Users type it into prompts. Your system stores it in logs, traces and retrieval indexes. And the model may have absorbed some during training. Each is a separate processing activity under the GDPR, with its own purpose, legal basis and retention period, and most privacy failures in LLM products come from treating them as one.

This guide covers what the European regulators have said, what is still being negotiated in Brussels, and the engineering controls that make a difference.

*This is an overview for general information, not legal advice. Regulatory status is described as of late 2026.*

## What the EDPB has said about AI models

The most important regulatory text is the European Data Protection Board's **Opinion 28/2024**, adopted on 17 December 2024 at the request of the Irish supervisory authority. It answers four questions.

**When is a model anonymous?** Not automatically. The EDPB says models trained on personal data "cannot, in all cases, be considered anonymous." To be anonymous, two likelihoods must be insignificant: extracting personal data about the training subjects directly from the model, and obtaining such data, intentionally or not, through queries. Authorities assess this case by case, using the controller's documentation.

**Can legitimate interest be a legal basis?** Yes, potentially, for both development and deployment, if the controller passes the three-step test:

1. The interest is lawful, clearly articulated, and real and present.
2. The processing is necessary for it, and there is no less intrusive way to achieve it. Data minimisation matters here.
3. The interest is not overridden by the rights and freedoms of the people concerned. That includes their reasonable expectations, which depend on context: whether the data was public, the relationship with the controller, and how it was collected.

**What if the model was trained unlawfully?** This matters most to companies that deploy someone else's model.

![Three EDPB scenarios for models developed with unlawfully processed personal data](/assets/images/blog/diagrams/llm-privacy-gdpr-2.svg)

*Diagram: Big Matrix Solutions, based on [EDPB Opinion 28/2024](https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en).*

In the second scenario, the EDPB expects the deploying controller to carry out an appropriate assessment that the model was not developed by unlawfully processing personal data. The depth of that assessment should match the risk of the deployment. In practice, your vendor due diligence on a foundation model is part of your own GDPR compliance, not a courtesy.

## What is changing, and what is not

In November 2025 the Commission proposed a **Digital Omnibus** regulation (COM(2025) 837) that would amend the GDPR. It would, among other things, add an explicit legitimate-interest route for developing and operating AI systems, with safeguards and an unconditional right to object, and narrow the definition of personal data. In February 2026 the EDPB and the European Data Protection Supervisor issued a joint opinion. They said the definition changes would "significantly narrow the concept of personal data," and argued that a dedicated AI provision was unnecessary because legitimate interest can already apply.

The AI-specific part of the Omnibus package, which amends the AI Act, was adopted in July 2026. The GDPR amendments were still in first reading as of late 2026, with no agreed Council position. **Until they are adopted, the GDPR applies as written.** Build to the current text.

One judicial change has already happened. In *EDPS v SRB* (Case C-413/23 P, 4 September 2025), the Court of Justice held that pseudonymised data may not be personal data *for a recipient* who has no reasonable means of re-identifying the people concerned, even though it stays personal data for the controller holding the key. That supports a design in which only pseudonymised text reaches a third-party model. It does not remove the original controller's transparency duties.

## The controls that matter

![Flow of an LLM request from user input through redaction, logs and the model provider to the response, with a GDPR control at each step](/assets/images/blog/diagrams/llm-privacy-gdpr-1.svg)

*Diagram: Big Matrix Solutions, based on [GDPR (Regulation (EU) 2016/679)](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng) and [EDPB Opinion 28/2024](https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en).*

### 1. Minimise at the input

The cheapest personal data to protect is data you never collect. Design forms and prompts so users do not need to paste in identifiers. Strip metadata such as email headers and document properties before text goes into a prompt. For retrieval systems, index only the fields the use case needs.

### 2. Redact or pseudonymise before the model

PII detection combines pattern matching (emails, phone numbers, IBANs, national ID formats) with named-entity recognition for names, addresses and organisations. Two approaches:

| Approach | How it works | Trade-off |
|---|---|---|
| Masking | Replace entities with type labels, such as `[NAME]` | Simple and irreversible; the model loses context it may need |
| Reversible pseudonymisation | Replace with consistent tokens such as `PERSON_1`, keep the mapping on your side, restore in the response | Keeps meaning; the mapping table is now sensitive and must be secured |

Neither is perfect. Detectors miss free-text identifiers ("my neighbour, the only dentist in the village"), and recall drops in languages and formats the detector was not tuned for. Measure recall on samples of your own data and treat redaction as risk reduction, not anonymisation.

### 3. Treat logs as a dataset with a retention period

Prompt and response logs are often the largest store of personal data in an LLM product, and the least governed. Set a purpose for each log type (debugging, abuse monitoring, evaluation), a retention period for each, and automated deletion. Apply redaction before logging where you can. Keep evaluation datasets separate from raw production logs.

Retention decisions can be overridden. In 2025 a US court in the New York Times copyright case ordered OpenAI to preserve ChatGPT output logs that would otherwise have been deleted, before narrowing the order for new data later that year. Data you keep can be pulled into litigation you are not a party to. Data you have deleted cannot.

### 4. Contract the provider as a processor

When you send personal data to a model API, the provider is usually your processor under Article 28. Check:

- A data processing agreement with the Article 28(3) terms
- No use of your data for model training without your instruction
- The provider's own retention period for inputs and outputs, and whether a shorter or zero-retention option exists for your account
- Hosting region, sub-processors and the transfer mechanism for any data leaving the EEA

### 5. Plan for rights requests

Access and erasure requests are manageable for logs and retrieval indexes if you can search them by user. They are much harder for anything absorbed into model weights. That is one reason to avoid fine-tuning on raw personal data. If you must, document why, minimise first, and test for memorisation before release.

### 6. Do the impact assessment

Large-scale processing with new technologies often needs a data protection impact assessment under Article 35. For LLM features that profile users, process special-category data or make decisions about people, assume you need one. Write it before launch, and update it when the model, data sources or user groups change.

## What to do, by team

**Engineering:** build redaction as a shared service with measured recall; tag every log stream with an owner and a TTL; keep the pseudonymisation mapping in a separate, access-controlled store; add memorisation and PII-leak tests to the evaluation suite.

**Privacy and legal:** record each processing step with its own purpose and legal basis; document due diligence on each foundation model, as Opinion 28/2024's second scenario expects; review processor terms for training use and retention.

**Product:** tell users plainly what is stored and for how long; offer a way to delete conversation history; avoid features that invite users to paste in other people's data.

## The bottom line

The GDPR did not need rewriting to cover language models. Its principles of purpose limitation, minimisation, storage limitation and accountability map directly onto prompts, logs and model providers. The EDPB has clarified the hard parts: models are not automatically anonymous, legitimate interest is available but must be argued, and deployers must look at how a model was built. Brussels may still change the text, but as of late 2026 it has not. Teams that minimise at the input, redact before the model, put a clock on every log and contract their providers as processors will be in good shape whichever way the Omnibus negotiations go.

**Sources**

- https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en
- https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf
- https://www.edpb.europa.eu/news/news/2024/edpb-opinion-ai-models-gdpr-principles-support-responsible-ai_en
- https://www.edpb.europa.eu/news/digital-omnibus-edpb-and-edps-support-simplification-and-competitiveness-while-raising-key_en
- https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package
- https://acompli.ie/news/digital-omnibus-gdpr-cookies-status-september-2026/
- https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250107en.pdf
- https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
- https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng
- https://www.engadget.com/ai/openai-no-longer-has-to-preserve-all-of-its-chatgpt-data-with-some-exceptions-192422093.html

**Media credits**:
- Hero image: cover of EDPB Opinion 28/2024 on AI models, cropped to the title area and placed on a white 16:9 canvas — [European Data Protection Board](https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf). EDPB documents may be reproduced with the source acknowledged.
- In-body diagram: EDPB Opinion 28/2024 scenarios — Big Matrix Solutions, based on [EDPB Opinion 28/2024](https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en).
- In-body diagram: privacy controls in an LLM request — Big Matrix Solutions, based on the GDPR and EDPB Opinion 28/2024.
