---
id: "3"
slug: "medical-imaging-ai-radiology"
title: "Medical Imaging AI, Radiology & Radiotherapy Planning"
icon: "bi bi-lungs"
image: "https://images.unsplash.com/photo-1666214280250-41f16ba24a26?w=800&q=80&auto=format&fit=crop"
desc: "Segmentation, detection, automated reporting and radiotherapy auto-contouring across X-ray, CT, MRI and pathology, built to survive different scanners and sites."
---


# Medical Imaging AI, Radiology & Radiotherapy Planning

![Lung CT segmentation with mask, overlay and generated analysis report](https://images.unsplash.com/photo-1666214280250-41f16ba24a26?w=800&q=80&auto=format&fit=crop)

## From Pixels to a Report a Radiologist Will Sign

Most imaging AI works beautifully on the dataset it was built with and degrades the moment it meets another hospital's scanner. We build for the second case, because that is the only one that matters in deployment.

The same holds downstream in radiotherapy, where contouring is the planning bottleneck. A single plan can require dozens of structures drawn slice by slice across hundreds of CT slices, and the work is both slow and variable between planners. We automate the drawing and leave the judgment where it belongs.

Four shipped imaging systems back this practice: lung CT segmentation with report generation, an X-ray segmentation editor, multimodal breast cancer diagnosis, and radiotherapy auto-contouring.


### 1. **Segmentation & Anatomical Delineation**

Voxel-level structure and lesion delineation across modalities:

**Modalities**:
- CT: organs at risk, lesions, volumetric measurement
- MRI: multi-sequence, tumour boundaries
- X-ray: lung fields, cardiothoracic ratio, device placement
- Whole-slide pathology: gigapixel tiling and region classification

---

### 2. **Detection, Triage & Worklist Ranking**

Flagging studies that need earlier eyes, and ranking the queue rather than firing ten independent alerts:

- Time-critical findings surfaced ahead of routine studies
- One pipeline covering multiple conditions instead of one product per finding
- Confidence surfaced so low-certainty cases route to a human rather than a report

---

### 3. **Automated Report Generation**

Structured findings text drafted from the image, with every claim traceable to the pixels that produced it:

| Output | Purpose |
|-------------|----------------|
| Quantitative measurements | Volume, symmetry, burden |
| Structured findings | Slot into your report template |
| Visual grounding | Reviewer can see what the model saw |
| Draft narrative | Starting point, never a final read |

Grounding matters more than fluency. A draft a radiologist can disagree with quickly is useful; one they cannot check is a liability.

---

### 4. **Automated Structure Contouring**

Organs at risk and target volumes generated from the planning CT:

**Typical structure sets**:
- Pelvis: bladder, rectum, femoral heads, small bowel
- Thorax: lungs, heart, oesophagus, spinal cord
- Head and neck: parotids, larynx, brainstem, optic structures
- Target volumes: GTV, CTV and derived expansions

---

### 5. **Multi-Planar Review & Editing**

Automation is only useful if correcting it is faster than starting over:

- Synchronised axial, sagittal and coronal views with linked cursor position
- Brush, fill and interpolation tools for fast correction
- Per-structure status tracking so a planner knows what has been reviewed
- 3D view for verifying continuity across slices

---

### 6. **Planning System Integration**

| Interface | Purpose |
|-------------|----------------|
| DICOM-RT import | Planning CT and existing structure sets |
| RTSTRUCT export | Contours back into your TPS |
| Window/level presets | Soft tissue, lung, bone, brain |
| Audit trail | Who changed which structure, when |

---

### 7. **Validation, QA & Cross-Site Performance**

The work that decides whether any of the above survives contact with your department, and the evidence a physics team will ask for before it touches a plan:

- Multi-scanner and multi-vendor evaluation
- Protocol and reconstruction-kernel sensitivity testing
- Geometric agreement against clinician contours: Dice and Hausdorff distance
- Dosimetric impact analysis, not just overlap metrics
- Inter-observer variability as the reference band
- Per-subgroup and per-structure reporting, since a good mean hides a bad organ
- Drift monitoring after go-live

Boundary accuracy is the number that matters in planning. A structure that is right on average and two millimetres out at the margin changes the plan.

---

### 8. **Clinical Workflow Integration**

A model that requires a radiologist to leave their reporting environment will not be used, however good it is.

- Results delivered into the existing PACS and reporting workflow rather than a separate portal nobody opens
- Worklist integration, so prioritisation happens where the queue already lives
- Structured output that populates your report template instead of arriving as free text to retype
- DICOM secondary capture and structured report objects, so findings are stored where the study is
- Sensible handling of prior studies, since comparison against last year's scan is most of the clinical question

Adoption is an interface problem far more often than an accuracy problem. We design the handover to the clinician first and work backwards from it.

---

### 9. **Data, Annotation & Ground Truth**

Everything above depends on what the model was taught, and clinical annotation is expensive, scarce and inconsistent.

- Annotation protocols written with the clinicians who will use the output, so labels mean one thing
- Inter-observer agreement measured before a dataset is trusted, because disagreement between experts is the realistic ceiling on performance
- De-identification pipelines that handle burned-in pixel text as well as DICOM headers
- Consent, governance and data-sharing agreements handled as part of the build rather than assumed
- Versioned datasets tied to model versions, so any result can be traced back to what produced it
- Deliberate sampling across scanners, protocols, demographics and disease prevalence

---

### 10. **Regulatory Pathway & Evidence**

Where the intended use determines how much evidence is enough.

- Intended-use statement drafted early, because it decides the regulatory class and everything downstream
- Risk management and traceability documentation maintained during development, not reconstructed afterwards
- Retrospective validation first, then prospective where the claim requires it
- Reader studies and automation-bias assessment: whether the assisted clinician performs better, not just whether the model scores well alone
- Frozen, auditable model versions, since a validated device cannot silently change underneath its evidence
- Post-market surveillance and drift monitoring as an ongoing obligation

We will be direct about which side of the regulatory line a proposed feature falls on. Research and triage-support tooling, clinical decision support, and a diagnostic claim are three very different projects, and the difference is usually a sentence in the intended-use statement.

---

## What we build with

**Models**: U-Net and nnU-Net variants, 3D U-Net, atlas-based hybrids, vision transformers, medical foundation model backbones
**Imaging**: DICOM, NIfTI, PACS integration, whole-slide formats
**Radiotherapy standards**: DICOM-RT, RTSTRUCT, RTPLAN, RTDOSE
**Deployment**: On-premise workstation, departmental server or private cloud, because imaging data does not have to leave your network

## Who this is for

- Radiology departments under rising study volume
- Radiation oncology departments with planning backlogs
- Centres standardising contouring practice across planners
- Screening programmes needing consistent second reads
- Multi-centre studies requiring consistent structure definitions
- Sites preparing for adaptive or online replanning workflows
- Research groups building retrospective imaging cohorts

## Why us

We have shipped this, not just modelled it. Our imaging tools run against real DICOM series with real protocol variation, and we treat cross-site validation and human-in-the-loop review as part of the build rather than a later phase. On the planning side, we understand that a contouring tool lives or dies on how fast a planner can fix what it got wrong, so we design the review path first.
