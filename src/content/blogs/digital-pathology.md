---
id: "27"
slug: "digital-pathology-foundation-models-2026"
title: "51 Cleared Devices, 7 That Read a Slide: Digital Pathology's Honest Scorecard"
comments: "0"
image: "/assets/images/blog/digital-pathology.webp"
category: "Medical AI"
desc: "Foundation models that generalise across stains and scanners, updated CLIA guidance, and a regulatory count that reveals how early this still is."
date: "Nov 16, 2026"
tags: ["Medical AI", "Digital Pathology", "Foundation Models", "Oncology"]
---

# 51 Cleared Devices, 7 That Read a Slide: Digital Pathology's Honest Scorecard

Radiology went digital in the 1990s. Pathology, which is arguably a better fit for computer vision, is still in the middle of it.

The reason is mundane and physical. A radiology study is born digital. The scanner produces pixels. A pathology slide is a piece of glass with tissue on it, and turning it into pixels requires scanning it at a resolution high enough to see individual cell nuclei. That produces files in the gigabytes, per slide, for a workflow that generates millions of slides a year.

So digital pathology arrived late, and the AI built on it is arriving now. So it is a good moment to ask where this genuinely stands, because the gap between the research literature and the clinical reality is unusually wide here.

## The number that sets the scene

Through April 2026, the FDA has authorised **51 AI/ML-flagged devices in pathology-relevant review panels**. That sounds like a mature field.

Then look closer: **only seven of those algorithms actually analyse whole-slide images**. The rest are haematology analysers and molecular devices: real products doing real work, but not computational pathology in the sense the research community means.

| Category | Count |
|---|---|
| AI/ML devices in pathology-relevant panels | 51 |
| Algorithms that analyse whole-slide images | 7 |

Seven. Against 1,163 cleared algorithms in radiology. That is the honest scorecard, and it says the clinical translation of computational pathology has barely started, despite a research literature that is now enormous.

![Bar chart to scale: 1,163 cleared radiology algorithms, 51 AI/ML devices in pathology-relevant panels, 7 that analyse whole-slide images](/assets/images/blog/diagrams/digital-pathology-1.svg)

*Diagram: Big Matrix Solutions, based on [Innolitics, AI/ML in Digital Pathology: 2026 Snapshot](https://innolitics.com/articles/ai-ml-in-digital-pathology-and-the-software-as-an-ivd-paradigm-snapshot/) and the radiology count cited in this article.*

## What changed to make it possible

Three things had to land, and roughly speaking they have.

**Whole-slide imaging became a validated part of practice.** Not a research technique but an accepted component of modern pathology workflow, supported by professional guidelines and emerging reimbursement pathways. Without a digital slide there is nothing for a model to read, so this was the gating dependency.

**CLIA guidance caught up.** Updated Clinical Laboratory Improvement Amendments guidance clarified digital and remote workflows. This matters more than it sounds: a laboratory operating under CLIA needs to know that a remotely-read digital slide satisfies its regulatory obligations. Ambiguity there stops adoption regardless of how good the technology is.

**Foundation models started generalising across stains and scanners.** This is the technical unlock and it deserves explanation, because it is the specific thing that was blocking progress.

## Why generalisation was the hard part

Pathology has a domain-shift problem that is worse than radiology's, and it comes from the physical process.

A tissue slide's appearance depends on the fixation, the embedding, the sectioning thickness, the staining protocol, the age and batch of the stain, and the scanner that digitised it. Two laboratories processing sections from the same tumour will produce images with visibly different colour distributions and texture characteristics.

For a model trained on one institution's slides, another institution's slides are out of distribution. Historically this produced the depressing pattern that defined the field for years: excellent published accuracy on the development set, substantially worse performance anywhere else. Colour normalisation and stain augmentation helped and did not solve it.

Foundation models attack this differently. Rather than training a classifier on labelled slides from one source, you pretrain a backbone self-supervised on an enormous heterogeneous collection of slides: many institutions, many stains, many scanners, so the representation learns what is *tissue structure* and what is *acquisition artefact*, because only the former is consistent across the corpus.

Models built this way generalise across stains and scanners in a way task-specific models did not, and that is what moved the field from interesting to deployable. There is also active work on adaptive approaches using dynamic feature learning, and on the practical question of how to fine-tune these backbones at slide level without the process becoming unaffordable.

## The gigapixel problem

There is a computational obstacle here that has no equivalent in radiology, and it shapes every architecture in the field.

A whole-slide image at diagnostic magnification is on the order of 100,000 by 100,000 pixels, or tens of gigapixels. A chest X-ray is a couple of megapixels. That is four orders of magnitude, and it means you cannot feed a slide to a network the way you feed it an image.

The standard response is **multiple-instance learning**, and it explains both the field's successes and a persistent weakness.

The slide is cut into thousands of small tiles. Each tile passes through the encoder to produce a feature vector. An aggregation step then combines those thousands of vectors into one slide-level prediction. The slide is treated as a *bag* of tiles, and the model learns which tiles matter.

This works, and it introduces a specific difficulty. Labels exist at slide level, as in this slide is malignant, but the diagnostic evidence may occupy a handful of tiles out of ten thousand. The model has to learn which tiles carry the signal without ever being told, from a label that describes the whole bag. That is a weak supervision problem, and it is why pathology models need far more slides than you would expect for the apparent simplicity of the task.

![Multiple-instance learning: a gigapixel whole-slide image is cut into thousands of tiles, each encoded, then aggregated into one slide-level prediction](/assets/images/blog/diagrams/digital-pathology-2.svg)

*Diagram: Big Matrix Solutions, based on the multiple-instance learning approach described in this article; see also [Xu et al., Nature 2024](https://www.nature.com/articles/s41586-024-07441-w).*

It also has consequences for what the models can and cannot see:

- **Small features are easy to lose.** A few malignant cells in a large benign field is exactly the case where tile aggregation can wash out the signal, and it is also the clinically important case.
- **Context across tiles is limited.** A pathologist reads architecture: how tissue is organised at a scale larger than a single tile. Tile-based pipelines fragment that by construction, which is part of why slide-level fine-tuning of foundation models is an active research question.
- **Compute per slide is substantial.** Thousands of encoder passes per slide, times millions of slides a year, is a real inference bill rather than a rounding error.

## The multimodal turn

The more interesting 2026 development is that pathology AI stopped being only about images.

Foundation models, multimodal systems, and LLM-based copilots are now reshaping diagnostic support, prognostication, workflow efficiency, clinical trials, and drug discovery. The multimodal part is where the clinical value concentrates, and the reason is straightforward once stated.

A pathologist does not diagnose from morphology alone. They integrate the slide with the clinical history, the radiology, the molecular and genomic results, and the specific question the treating clinician asked. A model that sees only pixels is working with a fraction of the relevant information, which is why image-only models plateau on tasks that pathologists find easy.

Systems combining whole-slide morphology with molecular and clinical data are showing the most promising results, particularly on the questions that actually change treatment:

- **Prognostication**: predicting outcome from morphology plus molecular context, which affects whether a patient receives adjuvant therapy.
- **Treatment response prediction**: inferring likely benefit from a specific therapy, which is where the value of a biomarker lives.
- **Molecular inference from morphology**: predicting a genomic alteration directly from the slide, potentially avoiding a slower and more expensive sequencing step.

The vision-language direction is developing alongside this: assistants that answer questions about a whole-slide image in natural language, of which SlideChat is a representative example. Whether that becomes a clinical tool or a research instrument is genuinely unclear, but it changes what the interface to a model can be.

## The infrastructure problem nobody wants to fund

The obstacles to deployment are less about AI than about data logistics, and they are severe.

**Storage.** A single whole-slide image can be several gigabytes. A mid-size pathology department generates hundreds of thousands of slides a year. Retaining those for the legally-mandated period is a petabyte-scale problem, and it competes for the same budget as everything else in the hospital.

**Scanning throughput.** Digitising every slide means scanning every slide, which means capital equipment, floor space, and staff. Many departments scan selectively, which limits what AI can be applied to.

**Interoperability.** Progress on standards has been real and the field is better off than it was, but scanner vendors have historically used proprietary formats. Every format is an integration.

**Federated learning as the privacy answer.** Since slides cannot easily leave institutions, large-scale repositories and federated approaches have become the mechanism for building robust models without centralising data. This is genuinely promising and adds substantial engineering complexity to every collaboration.

## What is worth watching

Three signals that will tell you whether this is translating.

**Does the whole-slide count move past seven?** That number is the cleanest indicator available. If it reaches thirty or forty over the next couple of years, computational pathology has found a regulatory path. If it stays near single digits while the literature keeps growing, something structural is blocking translation and it is not model quality.

**Does reimbursement arrive properly?** Emerging pathways exist. Until a hospital can bill for an AI-assisted read, the business case rests on efficiency gains that are hard to measure and easy to dispute. This has been the binding constraint on clinical AI adoption generally, and pathology is no exception.

**Do prospective trials happen?** Almost all pathology AI evidence is retrospective. The model is applied to already-diagnosed cases and scored against the recorded diagnosis. What is missing is the same thing missing across clinical AI: prospective studies showing that pathologists using the model reach better conclusions than pathologists without it. An NCI workshop report on digital pathology AI in cancer research and clinical trials makes essentially this point about the evidence base.

## The honest position

Computational pathology in late 2026 is a field where the technology is well ahead of the deployment, and the bottleneck is not the models.

Foundation models that generalise across stains and scanners solved the problem that held the field back for a decade. Multimodal systems are producing results on prognostic and treatment-response questions that matter more than classification accuracy. The regulatory and standards groundwork is materially better than it was.

And seven algorithms are cleared to read a slide.

That gap is where the interesting work is. Not in another architecture, but in scanning capacity, storage economics, format standards, reimbursement policy, and the prospective evidence that would justify all of it. None of which will be solved by a better model, and all of which will determine whether the better models ever reach a patient.

**Media credits**:
- Hero image: Prov-GigaPath tile-level and slide-level encoder architecture, Figure 1 from Xu et al., "A whole-slide foundation model for digital pathology from real-world data", Nature 2024 — [Nature](https://www.nature.com/articles/s41586-024-07441-w), CC BY 4.0, placed on a 16:9 canvas
- Diagram: FDA device scorecard — Big Matrix Solutions, based on [Innolitics](https://innolitics.com/articles/ai-ml-in-digital-pathology-and-the-software-as-an-ivd-paradigm-snapshot/)
- Diagram: multiple-instance learning — Big Matrix Solutions
