---
id: "98"
slug: "fhir-llms-interoperability-bottleneck"
title: "FHIR Meets LLMs: Interoperability as the Real Bottleneck"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/fhir-llms.png"
category: "Medical AI"
desc: "Language models can read a clinical note. Getting the right patient data to them, in a standard shape, with permission, is the harder problem. What FHIR solves, what it does not, and what the benchmarks say."
date: "Feb 08, 2027"
tags: ["Medical AI", "FHIR", "Interoperability", "LLMs", "Health IT"]
---

# FHIR Meets LLMs: Interoperability as the Real Bottleneck

Most demonstrations of LLMs in healthcare start with the data already in the prompt: a tidy case summary, a pasted discharge letter, a curated record. The model reasons over it, and the result is impressive.

In a real deployment, getting that record into the prompt is most of the work. Patient data lives in different systems, with local codes, different shapes, and access rules. The standard the US has chosen to deal with this is HL7 FHIR, and it is now the layer almost every serious clinical AI integration runs through.

FHIR makes the problem tractable. It does not make it easy, and the first benchmarks of LLM agents working directly against FHIR data show how much of the difficulty lives there rather than in the model.

## What FHIR is, briefly

FHIR (Fast Healthcare Interoperability Resources) represents clinical data as typed resources, such as Patient, Observation, Condition, MedicationRequest and Encounter, exchanged through a REST API in JSON or XML. Resources reference each other: an Observation points to a Patient and often to an Encounter.

| Version | Published | Status |
|---|---|---|
| R4 (4.0.1) | October 2019 | First release with normative content |
| R4B | May 2022 | Interim release |
| R5 | March 2023 | Current published version |
| R6 | In ballot | Second full ballot published July 2026 |

As of late 2026, R4 is still the version US regulation is built on, even though R5 is the current published release and R6 is in development.

## Why FHIR became mandatory in the US

Three layers of federal policy have pushed FHIR from option to requirement.

**Certified EHR APIs.** The ONC Health IT Certification Program's standardised API criterion, 45 CFR 170.315(g)(10), requires certified systems to expose patient data through FHIR R4, using the US Core implementation guide, SMART App Launch for authorisation, and Bulk Data for population-level export.

**A defined data set.** The HTI-1 final rule made USCDI version 3 the baseline for certification from January 1, 2026. USCDI defines which data classes and elements must be available, so a developer can expect a certified system to expose a known core set.

**Payers.** The CMS Interoperability and Prior Authorization final rule (CMS-0057-F) requires Medicare Advantage organisations, state Medicaid and CHIP programmes, Medicaid managed care plans and certain exchange plans to run FHIR APIs: Patient Access, Provider Access, Payer-to-Payer and Prior Authorization. Most API requirements apply from January 1, 2027.

Taken together, a developer can now count on a FHIR endpoint at most US hospitals and, increasingly, at payers. That was not true a decade ago, and it is the precondition for any LLM product that needs live clinical data.

## Where LLMs help: getting data into FHIR

A lot of clinically important information still exists only as text. Medication instructions are a good example: dose, route, frequency and reason are often buried in a discharge summary rather than recorded as structured fields.

FHIR-GPT, published in *NEJM AI* in 2024 by researchers at Northwestern, tested whether an LLM could convert that text into FHIR MedicationStatement resources. Across 3,671 annotated snippets from discharge summaries, it achieved an exact match rate of over 90% against human annotation. Compared with existing NLP pipelines, it improved exact match rates by 3% for routes, 12% for dose quantities, 35% for reasons, 42% for forms, and more than 50% for timing schedules.

That is a meaningful result for a narrow task. It suggests LLMs can be useful as part of the pipeline that *feeds* FHIR, turning unstructured history into structured resources that other systems can use.

## Where LLMs struggle: getting answers out of FHIR

The other direction is harder. An agent that answers clinical questions by querying a FHIR server has to know which resources to search, how to follow references, how to page through results, and how to reason across many records.

FHIR-AgentBench, released in 2025 by Lee and colleagues, tests exactly that. It grounds 2,931 clinician-sourced questions in MIMIC-IV-FHIR, de-identified real patient records, and evaluates agent designs that vary in retrieval method, single or multi-turn interaction, and whether they reason in natural language or write code.

The best-performing setup, a multi-turn agent with a retriever and a code interpreter, reached about 50% answer correctness. Across models, the top architecture landed in a narrow 44% to 50% band. Adding code execution improved results substantially, and the authors identify retrieving data from intricate FHIR resources, and reasoning over it, as the core difficulty.

Half right is not a deployment number. But the more useful finding is *where* the authors locate the difficulty: in navigation and data handling, meaning finding the right resources, in the right shape, across the right time window, and then reasoning over them.

![The layers between clinical source systems and an LLM in a FHIR-based architecture](/assets/images/blog/diagrams/fhir-llms-1.svg)

*Diagram: Big Matrix Solutions, based on the [ONC (g)(10) criterion](https://www.healthit.gov/test-method/standardized-api-patient-and-population-services) and [FHIR-AgentBench](https://arxiv.org/abs/2509.19319).*

## Why interoperability is the real bottleneck

FHIR standardises the envelope. Several things inside it remain hard.

**Terminology.** A resource can be valid FHIR and still carry a local lab code instead of LOINC, or a free-text medication instead of an RxNorm code. Two hospitals' Observations for the same test may not be comparable until someone maps them.

**Profiles and extensions.** US Core constrains FHIR for US use, but vendors add extensions and implement optional elements differently. An agent built against one EHR's FHIR API may stumble on another's.

**Completeness.** USCDI defines a core set. Much of what clinicians care about, such as specialist notes or device data, may sit outside it or appear only as a scanned document reference.

**Granularity of access.** SMART on FHIR scopes control what an app may read. An LLM product needs the right scopes for its task, and an audit trail of what it read on whose behalf.

**Volume.** A long admission can produce thousands of Observations. Retrieval has to select what matters before the model sees anything, and FHIR-AgentBench identifies retrieval as one of the main challenges.

None of these is solved by a stronger model. Each is an integration, data quality or governance problem.

## What this means for health-tech and engineering teams

- **Treat FHIR as a database with a query language.** Give the model tools that perform well-defined searches (by patient, resource type, code and date) rather than letting it compose arbitrary REST calls.
- **Let the model write code over results.** FHIR-AgentBench found code execution helped substantially. Filtering and counting in code beats asking a model to do arithmetic over JSON.
- **Normalise terminology before the prompt.** Map local codes to standard vocabularies in the data layer, so the model reasons over consistent concepts.
- **Cite resource IDs in every answer.** Each claim should point to the FHIR resources it came from, so a clinician can check it and an auditor can trace it.
- **Test against more than one vendor.** Use the ONC test tools and real sandbox endpoints from different EHRs. Profile differences show up only in the wild.
- **Request minimal SMART scopes.** Read-only, task-specific scopes reduce risk and simplify security review.
- **Plan for the payer APIs.** If your product touches prior authorisation or care coordination, CMS-0057-F's FHIR APIs are the integration points to design around.

## The honest position

The conversation about clinical AI tends to centre on model quality. The constraint that decides whether a product works at a given hospital is more often the data path: which FHIR endpoint, which profile, which codes, which scopes, and how much of the relevant history is structured at all.

FHIR, and the US rules built on it, have made that path far more predictable than it was. LLMs can help in both directions, structuring text into resources and turning resources into answers. But the first serious benchmark of agents working against real FHIR data put the best of them at about half right, and its authors pointed to retrieving and reasoning over FHIR resources as the core challenge.

For teams building in this space, that is good news of a kind. The bottleneck is engineering, and engineering problems yield to careful work.

**Sources**

- [HL7: FHIR specification, published versions directory](https://hl7.org/fhir/directory.html)
- [HL7: FHIR R5, current published version](https://hl7.org/fhir/)
- [ONC: Standardized API for patient and population services, 170.315(g)(10)](https://www.healthit.gov/test-method/standardized-api-patient-and-population-services)
- [ONC: HTI-1 final rule](https://healthit.gov/regulations/hti-rules/hti-1-final-rule/)
- [CMS: Interoperability and Prior Authorization Final Rule (CMS-0057-F) fact sheet](https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-prior-authorization-final-rule-cms-0057-f)
- [Li et al., FHIR-GPT Enhances Health Interoperability with Large Language Models, NEJM AI 2024](https://pubmed.ncbi.nlm.nih.gov/40746832/)
- [Lee et al., FHIR-AgentBench: Benchmarking LLM Agents for Realistic Interoperable EHR Question Answering, arXiv 2025](https://arxiv.org/abs/2509.19319)

**Media credits**:
- Hero image: FHIR-AgentBench benchmark pipeline, Figure 1 from Lee et al. 2025 — [arXiv](https://arxiv.org/abs/2509.19319), CC BY 4.0, resized and placed on a 16:9 canvas
- Diagram: FHIR stack layers — Big Matrix Solutions, based on the ONC and FHIR-AgentBench sources above
