---
id: "103"
slug: "document-ai-ocr-pipelines-to-vision-language-models"
title: "Document AI: From OCR Pipelines to Vision-Language Models"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/document-ai.jpg"
category: "LLM Research"
desc: "Small specialised vision-language models now lead document parsing benchmarks. How they compare with classic OCR pipelines, how to read OmniDocBench, and how to build extraction you can trust."
date: "Feb 18, 2027"
tags: ["Document AI", "OCR", "Vision-Language Models", "OmniDocBench", "LLM Research"]
---

# Document AI: From OCR Pipelines to Vision-Language Models

Every business runs on documents that were never meant for machines: invoices, contracts, scanned forms, financial statements, academic papers with formulas and tables spread across columns. Getting reliable data out of them has been a cottage industry of OCR engines, layout rules and template matchers for decades.

That stack is being replaced. Vision-language models (VLMs) that read a page image and write out structured text now lead the public benchmarks. The surprise is which models lead: not the largest general-purpose systems, but small models trained specifically for documents.

This guide covers how the two approaches work, what the benchmarks actually measure, and how to build a document pipeline that holds up in production.

## The classic pipeline

The traditional approach splits the problem into stages, each handled by a specialised component:

1. **Layout detection** finds regions on the page: paragraphs, headings, tables, figures, formulas, headers and footers.
2. **OCR** turns text regions into characters. Tesseract, the long-standing open-source engine, added a neural LSTM engine in version 4 "focused on line recognition" and supports more than 100 languages.
3. **Specialised recognisers** handle tables (rows, columns, merged cells) and formulas (usually to LaTeX).
4. **Reading-order assembly** stitches the pieces back together in the order a human would read them, which is hard on multi-column pages.
5. **Export** produces Markdown, HTML or JSON.

Open-source toolkits package these stages. IBM's Docling, for example, provides layout analysis, reading-order detection, table structure recognition and OCR, and exports to Markdown, HTML and other formats. It also supports VLMs, reflecting the direction of travel.

The strength of a pipeline is that it is debuggable. When a table comes out wrong, you can see which stage failed. Each component is small, fast and runs on modest hardware. The weakness is error compounding: a misdetected region or a wrong reading order breaks everything downstream, and every new document type tends to need tuning.

## The vision-language approach

![Diagram comparing a multi-stage OCR pipeline with a single vision-language model, both ending in validation and human review](/assets/images/blog/diagrams/document-ai-1.svg)

*Diagram: Big Matrix Solutions, based on the [OmniDocBench](https://github.com/opendatalab/OmniDocBench) and [Docling](https://github.com/docling-project/docling) documentation.*

A VLM takes the page image and generates the structured output directly. Layout, reading order, tables and formulas are handled by one model trained end to end.

Two kinds of model are used this way:

- **General VLMs**, the large multimodal models from the major labs, which can read documents among many other tasks.
- **Specialised document VLMs**, much smaller models trained or fine-tuned specifically to convert pages to Markdown or structured text.

olmOCR from the Allen Institute for AI is an early, well-documented example of the second kind: a fine-tuned 7-billion-parameter VLM released with its training data and code. Its paper made the economic case directly, reporting that the toolkit "can convert a million PDF pages for only 176 USD" on its own hardware set-up, compared with over 6,240 USD for GPT-4o at the time. Those figures date from early 2025 and the paper's own comparison, but the direction holds: a small model you run yourself is far cheaper per page than a frontier API.

## Reading OmniDocBench

OmniDocBench, published at CVPR 2025 by a team led from Shanghai AI Laboratory and maintained by OpenDataLab, has become the reference benchmark for full-page parsing. Its current version covers 1,651 PDF pages across 10 document types, including academic papers, financial reports, newspapers, textbooks and handwritten notes.

What makes it useful is that it scores components separately:

| Component | Metric | Direction |
|---|---|---|
| Text | Normalised edit distance | Lower is better |
| Tables | TEDS (tree-edit-distance similarity) | Higher is better |
| Formulas | CDM | Higher is better |
| Reading order | Edit distance | Lower is better |

The headline **Overall** score combines three of them: ((1 − text edit distance) × 100 + table TEDS + formula CDM) / 3.

![OmniDocBench evaluation pipeline: model Markdown output is split into tables, text and formulas, normalised, and matched against ground-truth JSON annotations by category](/assets/images/blog/document-ai-evaluation.jpg)

*How OmniDocBench matches model output to ground truth. Source: [OpenDataLab, OmniDocBench](https://github.com/opendatalab/OmniDocBench), Apache-2.0*

As of late 2026, the public leaderboard tells a clear story:

- **Specialised VLMs dominate the top.** The leading entries score around 96 Overall, and most are models of roughly 1 billion parameters.
- **General frontier VLMs are competitive but not leading.** The best general models listed score in the low 90s.
- **Pipeline tools trail.** The pipeline entries listed score between roughly 78 and 87.

Two cautions. First, leaderboards move quickly, and the maintainers also build parsing tools of their own (the MinerU family appears on the board). Second, the benchmark is full-page conversion to Markdown. If your task is pulling twelve fields from an invoice, that is a different problem, and a general model with structured output may suit it better.

## Choosing an approach

| Situation | Reasonable default |
|---|---|
| High volume, mixed layouts, data must stay on your servers | A specialised open document VLM, self-hosted |
| Low volume, varied documents, quick start | A general VLM API with structured output |
| Clean digital PDFs with a text layer | Extract the embedded text first; use OCR or VLMs only where needed |
| Strict audit needs, fixed forms | A pipeline or form-specific extractor, where each stage can be traced |
| Scientific papers with formulas | A model or tool that scores well on formula CDM, tested on your papers |

Whatever you pick, run a small bake-off on your own documents. Fifty pages with hand-checked ground truth will tell you more than any leaderboard. Include the documents that cause trouble today: faint scans, rotated pages, stamps over text, tables that break across pages. Those are where the approaches differ most.

## Making extraction trustworthy

VLMs bring a failure mode that classic OCR did not have. An OCR engine that cannot read a smudged digit produces garbage you can spot. A VLM may produce a *plausible* digit that is wrong, or fill a missing table cell with something that looks right. Production systems need checks built around the model:

- **Schema validation.** Define the output as a strict schema and reject anything that does not parse.
- **Cross-checks.** Line items should sum to totals; dates should fall in valid ranges; IDs should pass checksums.
- **Grounding.** Where possible, keep the page coordinates of each extracted value so a reviewer can see the source.
- **Confidence routing.** Send low-confidence fields and failed checks to a human queue rather than straight into your systems.
- **Two-model comparison for high stakes.** Run two different extractors and flag disagreements.
- **Regression sets.** Keep a labelled set of your hardest documents and re-run it whenever you change models.

## A practical checklist

- Use the PDF's own text layer when it exists; OCR or VLMs only where needed
- Build a ground-truth set of 50 to 100 of your own pages, including the ugly ones
- Compare at least one pipeline, one specialised VLM and one general VLM on that set
- Score text, tables and formulas separately, as OmniDocBench does
- Enforce a strict output schema
- Add arithmetic and format cross-checks
- Route low-confidence or failed-check documents to human review
- Keep source coordinates for extracted values where the tool supports it
- Decide where documents may be processed before choosing an API
- Re-run the regression set on every model or prompt change

## Closing thought

Document AI has moved from assembling a chain of specialised parts to choosing a model that reads the page whole. The best of those models are now small enough to run on your own hardware and accurate enough to top public benchmarks. What has not changed is that a confident wrong number in a financial statement costs more than a blank one. Pick the model on your own pages, wrap it in validation, and keep a person in the loop where errors matter.

**Sources**

- https://arxiv.org/abs/2412.07626
- https://github.com/opendatalab/OmniDocBench
- https://arxiv.org/abs/2502.18443
- https://github.com/docling-project/docling
- https://github.com/tesseract-ocr/tesseract

**Media credits**:
- Hero image: OmniDocBench overview figure (PDF types, page attributes and annotation categories), OpenDataLab (resized) — [GitHub, opendatalab/OmniDocBench](https://github.com/opendatalab/OmniDocBench). Apache-2.0.
- In-body image: OmniDocBench evaluation pipeline figure, OpenDataLab (resized) — [GitHub, opendatalab/OmniDocBench](https://github.com/opendatalab/OmniDocBench). Apache-2.0.
- Diagram: Big Matrix Solutions, based on the OmniDocBench and Docling documentation.
