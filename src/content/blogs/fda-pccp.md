---
id: "70"
slug: "fda-predetermined-change-control-plans-ai-devices"
title: "Predetermined Change Control Plans: How the FDA Lets AI Devices Learn"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/fda-pccp.webp"
category: "Medical AI"
desc: "A PCCP lets a cleared AI device change without a new submission, as long as the change was described, tested and bounded in advance. What goes in one, and what it does not allow."
date: "Dec 14, 2026"
tags: ["Medical AI", "FDA", "Regulation", "PCCP", "Software as a Medical Device"]
---

# Predetermined Change Control Plans: How the FDA Lets AI Devices Learn

Machine learning models get better by being retrained. Medical device regulation was built for products that stay the same once they are cleared.

For years those two facts sat awkwardly together. A manufacturer that retrained a cleared imaging model on more data, or wanted it to work with a new scanner, often had to go back to the FDA with a new submission before shipping the change. The model could improve in the lab well before it was allowed to improve in the clinic.

The Predetermined Change Control Plan, or PCCP, is the mechanism the FDA built to close that gap. It is now in statute and in final guidance, and it is quietly becoming one of the most consequential documents in a medical AI submission.

## Where the PCCP came from

The idea first appeared in the FDA's April 2019 discussion paper on modifications to AI/ML-based software as a medical device. It became law in December 2022, when section 3308 of the Food and Drug Omnibus Reform Act (FDORA) added section 515C, "Predetermined Change Control Plans for Devices", to the Federal Food, Drug, and Cosmetic Act.

Section 515C says that a change consistent with an approved or cleared PCCP does not need a new 510(k) or a PMA supplement, even if it would otherwise require one.

The FDA then published final guidance specific to AI: *Marketing Submission Recommendations for a Predetermined Change Control Plan for Artificial Intelligence-Enabled Device Software Functions*. It was first issued on December 4, 2024 and reissued on August 18, 2025. A separate draft guidance from August 2024 covers PCCPs for medical devices in general.

| Milestone | Date |
|---|---|
| FDA discussion paper proposes the concept | April 2019 |
| FDORA adds section 515C to the FD&C Act | December 29, 2022 |
| FDA, Health Canada and MHRA publish joint guiding principles | October 2023 |
| Final AI-specific PCCP guidance issued | December 4, 2024 |
| Guidance reissued | August 18, 2025 |

## What a PCCP actually contains

The guidance defines a PCCP as the documentation describing what modifications will be made to a device and how they will be assessed. It has three parts.

![The three components of a PCCP and what happens to changes inside and outside the plan](/assets/images/blog/diagrams/fda-pccp-1.svg)

*Diagram: Big Matrix Solutions, based on [FDA PCCP guidance for AI-enabled devices](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence).*

**Description of Modifications.** A list of the specific, planned changes, with the rationale for each. The FDA is explicit that this should be narrow. It recommends "that a PCCP include only a limited number of modifications that are specific" and that can be verified and validated. The section must also say whether each change is applied automatically by software, manually with human review, or both; whether it applies to every installed device or only to specific sites; and how often updates are expected.

**Modification Protocol.** How each change will be developed, validated and rolled out. The guidance breaks this into data management, re-training practices, performance evaluation with pre-defined acceptance criteria, and update procedures, including how users will be told and how labelling will change. Every planned modification should trace to a specific test in the protocol.

**Impact Assessment.** The benefits and risks of each change and how the protocol mitigates them.

The PCCP is reviewed with the original 510(k), De Novo or PMA submission and referenced by title and version number in the authorisation letter.

## What kinds of change fit

The guidance names three broad categories that may be appropriate:

- **Performance changes**, such as re-training on new data from the intended use population with the same kind of input, to improve accuracy.
- **Input changes**, such as supporting a new make or model of scanner, a new camera, or an updated operating system or cloud environment.
- **Certain use changes**, such as authorisation for a specific subpopulation within the original indication, based on re-training with more data from that group.

What does not fit is anything that changes the device's intended use. The guidance says most changes to indications for use would be "difficult for FDA to assess prospectively", and recommends early discussion through the Q-Submission Program for any that are proposed.

Appendix B of the guidance works through examples, and they are the clearest way to understand the boundary. In one, ICU monitoring software is authorised with a plan to retrain and reduce false alarms while keeping sensitivity within a pre-specified non-inferiority margin. That change, made as planned, needs no new submission. But if the retrained model turns out to predict instability *before* it begins, and the manufacturer wants to claim that, a new submission is required, because the plan never specified methods for predicting a future state.

The same logic applies to a skin-lesion example. Adding smartphones that meet the camera specification in the plan is covered. Switching to a thermographic camera that was not in the plan is not.

## Locked versus learning

A PCCP does not mean the FDA has approved models that learn freely in the field.

The guidance does cover devices whose updates are applied automatically, sometimes called continuous learning, and says the FDA "will consider" PCCPs for them. It also says this subset carries "an additional degree of complexity", and suggests manufacturers define clear boundaries for automatic updates and discuss them with the agency in advance.

In practice, the guidance describes a spectrum. At one end are devices updated perhaps once a year, which are mostly locked. At the other are devices that adapt continuously. A PCCP can sit anywhere on that line, but every point on it requires the same thing: the change, the test and the pass mark written down before the change happens.

## How much this is being used

Uptake has been real but early. A 2025 review in JMIR AI counted 1,016 AI/ML-enabled devices authorised by the FDA through the end of 2024, and 15 AI/ML-enabled devices authorised with a PCCP, 11 of them in 2024.

![FDA approvals of AI/ML-enabled devices per year, with the number approved with a PCCP](/assets/images/blog/fda-pccp-approvals.webp)

*FDA AI/ML-enabled device approvals per year and those approved with a PCCP, through 2024. Source: [Carvalho et al., JMIR AI 2025 (CC BY 4.0)](https://pmc.ncbi.nlm.nih.gov/articles/PMC12577744/)*

Fifteen out of more than a thousand is small. The curve is rising, but most cleared AI devices still change the old way, through a new submission or not at all.

## What a PCCP does not do

Three limits deserve attention, because they are easy to miss in the excitement of "the FDA lets AI learn".

**It does not lower the evidence bar.** The guidance says the recommendations do not change the standards for clearance or approval. The FDA reviews each planned modification as part of the original authorisation, which means the evidence for the future change is effectively front-loaded into the first submission.

**Deviation has consequences.** If the protocol is not followed, or cannot be followed (a re-training failure, or results that miss the acceptance criteria), the guidance treats that as a deviation from the authorised PCCP. It warns this would generally cause the device to be adulterated and misbranded under the FD&C Act. A PCCP is a commitment, not a permission slip.

**It does not replace post-market monitoring.** The guidance expects manufacturers to monitor safety and performance over time as modifications are implemented, and to keep labelling in step with the version actually deployed. It specifically says labelling should not describe modifications that have not yet been implemented.

## What this means for health-tech and engineering teams

The PCCP turns parts of an MLOps pipeline into regulatory artefacts. That has concrete engineering consequences.

- **Decide the next three changes before the first submission.** The plan can only cover changes you can describe now. Typical candidates are retraining on a larger dataset, supporting additional scanner models, and adding a subpopulation. Anything vaguer than that is unlikely to survive review.
- **Write acceptance criteria as numbers.** The guidance's examples use non-inferiority margins and pre-specified performance targets. "Performance will be maintained" is not a criterion. "Sensitivity within z percentage points of the original version on a sequestered multi-site test set" is.
- **Treat your test data as a controlled asset.** The guidance expects test data to be independent of training and tuning data and, generally, drawn from sites other than those that produced training data. If test sets leak into training between versions, the protocol fails.
- **Version everything the plan references.** The PCCP itself carries a version number. So should the datasets, the training code, the evaluation scripts and the deployed models, with traceability from each shipped update back to the planned modification it implements.
- **Build the rollback and the notice before the update.** Update procedures, user communication and labelling changes are part of the protocol. If you cannot tell a hospital which version it is running and what changed, you cannot claim the update followed the plan.
- **Use the Q-Submission Program.** The FDA repeatedly encourages early engagement, particularly for automatic updates, high-risk devices and anything that touches indications for use.

## The honest position

The PCCP solves a real problem. It gives AI device makers a lawful way to ship improvements without restarting the regulatory clock, and it does so with a structure that most good ML teams should recognise: a defined change, a defined test, and a defined pass mark.

What it does not do is let models drift. Every permitted change has to be imagined, bounded and validated in advance, and anything outside that envelope still goes back to the agency. That is a sensible design for patient safety. It also means the hard work moves earlier, into the first submission, where teams have to predict how their product will improve before they have seen it in use.

The devices that benefit most will be the ones whose makers already run disciplined retraining and evaluation pipelines. For everyone else, writing a credible PCCP is a forcing function to build one.

**Sources**

- [FDA: Marketing Submission Recommendations for a PCCP for AI-Enabled Device Software Functions (final guidance)](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence)
- [FDA: Guidance PDF, issued August 18, 2025, originally December 4, 2024](https://www.fda.gov/media/166704/download)
- [FDA: Predetermined Change Control Plans for Medical Devices (draft guidance, August 2024)](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/predetermined-change-control-plans-medical-devices)
- [FDA: PCCPs for Machine Learning-Enabled Medical Devices, Guiding Principles (FDA, Health Canada, MHRA)](https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/predetermined-change-control-plans-machine-learning-enabled-medical-devices-guiding-principles)
- [FDA: CDRH issues guiding principles for PCCPs (October 2023)](https://www.fda.gov/medical-devices/medical-devices-news-and-events/cdrh-issues-guiding-principles-predetermined-change-control-plans-machine-learning-enabled-medical)
- [Carvalho et al., Predetermined Change Control Plans: Guiding Principles for Advancing Safe, Effective, and High-Quality AI-ML Technologies, JMIR AI 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12577744/)

**Media credits**:
- Hero image: regulatory pathway with and without a PCCP, Figure 2 from Carvalho et al., JMIR AI 2025 — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC12577744/), CC BY 4.0, placed on a 16:9 canvas
- In-body chart: AI/ML-enabled device approvals and PCCPs per year, Figure 1 from the same paper — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC12577744/), CC BY 4.0
- Diagram: PCCP components — Big Matrix Solutions, based on [FDA guidance](https://www.fda.gov/media/166704/download)
