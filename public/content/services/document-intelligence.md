---
id: "12"
slug: "document-intelligence-reporting"
title: "Document Intelligence & Automated Report Generation"
icon: "bi bi-file-earmark-text"
image: "/assets/images/projects/Scriptor.png"
desc: "Extraction, structuring and generation across documents, from scanned forms and contracts to authoring workspaces with an AI copilot built in."
---


# Document Intelligence & Automated Report Generation

![Scriptor: document authoring workspace with structured outline and AI copilot](/assets/images/projects/Scriptor.png)

## Documents In, Structured Data and Finished Reports Out

Organisations run on documents and almost none of them are structured. Forms, contracts, lab reports, referral letters, invoices, manuscripts. The information is there and unusable.

We build both directions: pulling structure out of documents, and generating documents from structure. Scriptor, our AI document workspace, is the second half shipped as a product.


### 1. **Extraction & Structuring**

Turning unstructured input into fields you can query:

**Input types**:
- Scanned forms and handwritten annotations
- PDFs with complex multi-column layout
- Tables, including ones that span pages
- Contracts and long-form legal text
- Clinical letters, lab reports and discharge summaries

---

### 2. **Classification & Routing**

- Document type identification on arrival
- Automatic routing to the right queue or owner
- Priority and exception flagging
- Duplicate and revision detection

---

### 3. **Automated Report Generation**

Structured data assembled into a document someone will actually send:

| Capability | Detail |
|-------------|----------------|
| Template-driven output | Your format, your house style |
| Narrative generation | Findings written as prose, not bullet dumps |
| Multi-source assembly | Pull from several systems into one report |
| Traceability | Every generated claim links to its source |
| Export | PDF, DOCX, LaTeX, structured JSON |

---

### 4. **Authoring Workspaces**

Where the document is the work product rather than a byproduct:

- Structured outline navigation across long manuscripts
- Version history and multi-file projects
- Inline AI assistance scoped to the document in front of you
- Compile and preview pipelines for technical and academic formats

---

### 5. **Validation & Human Review**

Extraction is never perfect and pretending otherwise is how bad data enters a system of record:

- Confidence scores per field, not per document
- Low-confidence values routed to a reviewer
- Side-by-side source and extracted value for fast verification
- Correction feedback captured to improve the pipeline

---

## Formats and tooling

**Extraction**: Layout-aware models, OCR, table structure recognition
**Generation**: LLM drafting with schema constraints and citation grounding
**Formats**: PDF, DOCX, DICOM-SR, HL7, LaTeX, CSV, JSON
**Deployment**: On-premise where documents contain regulated or personal data

## Where it earns its keep

- Clinical documentation and referral processing
- Contract review and obligation extraction
- Invoice, claims and forms processing at volume
- Research and technical authoring workflows
- Regulatory submission assembly

## What shipping this taught us

We have shipped a document product, so we know where the effort actually goes: not the model, but the layout edge cases, the review interface, and the confidence handling that stops a wrong field becoming a wrong record.
