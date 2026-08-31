# Auto Contouring Software — Project Case Study

> Source material for the Big-Matrix Solutions website case study.
> Compiled from the project content file and JSX showcase page.
> Developed by Big-Matrix Solutions · Domain: Oncology & Radiation Therapy

---

## 1. At a glance

| | |
|---|---|
| **Product** | Auto Contouring Software |
| **Category** | Medical AI / Radiotherapy |
| **Built by** | Big-Matrix Solutions |
| **Domain** | Oncology & Radiation Therapy |
| **Data types** | CT · MRI · DICOM |
| **Status** | In Development |
| **Headline metric** | 50–70% reduction in manual contouring time per case |
| **Consistency** | Standardised AI-assisted delineation across treatment teams |
| **QA** | Automated quality checks before clinical plan finalization |

---

## 2. The problem

Radiation therapy is precise by design — and that precision starts with contouring. Before a patient can be treated, a radiation oncologist must delineate every organ at risk (OAR) and every target tumour volume on CT or MRI scans, slice by slice. In a standard head-and-neck case that can mean 30+ structures across hundreds of imaging slices. It is one of the most labour-intensive steps in the entire radiotherapy planning chain.

Four failures define the current state:

- **Manual contouring is the pacemaker of the planning process.** A radiation oncologist in a high-volume centre may spend several hours per patient on delineation alone. That time is the rate-limiting constraint between imaging and treatment start.
- **Contours vary between clinicians.** Inter-observer variability in organ-at-risk and target volume delineation is a well-documented problem in radiotherapy. Different physicists and oncologists draw different boundaries — and those differences propagate into dose distributions, dose-volume histograms, and ultimately treatment quality.
- **Iteration overhead slows the full planning cycle.** When contours need revision — because a clinician disagreed with a colleague's delineation, or because protocol constraints weren't met — the entire downstream planning loop restarts: dosimetry reruns, physicist review, clinical sign-off. Every revision costs days.
- **QA failures surface late.** Outlier contours and protocol deviations are often caught only at final plan review, after dosimetrists and physicists have already built a plan around them. The correction effort at that stage is disproportionately high.

---

## 3. What the system does

Auto Contouring Software is an AI-assisted clinical tool that automates the initial delineation of organs-at-risk and target tumour volumes from CT and MRI scans, then pairs that segmentation output with planning guidance, dose prediction, and automated quality assurance — all within a single clinical workflow.

The design principle: **the AI produces the contours; the clinician owns them.** The system generates a high-quality starting point that a radiation oncologist or dosimetrist reviews and refines. The human-in-the-loop model ensures clinical safety while eliminating the hours of manual effort that currently precede every plan.

**Four core capabilities:**

| Capability | What it delivers |
|---|---|
| **OAR and Tumour Segmentation** | AI models auto-delineate organs-at-risk and target volumes from CT and MRI with clinically aligned contour boundaries |
| **Treatment Planning Assistance** | Planning intelligence guides beam and dose strategy decisions based on anatomical context and protocol constraints |
| **Dose Prediction** | Deep learning predicts expected dose distributions early to support fast plan quality evaluation and optimisation |
| **Automated Quality Assurance** | Rule-based and model-assisted checks flag contour and planning anomalies before final clinical approval |

---

## 4. Technical approach

### Deep learning segmentation

The contouring engine uses volumetric deep learning models trained on multi-site CT and MRI datasets across multiple cancer sites. Models are trained against expert-delineated ground truth and validated against clinical protocol constraints. Contour boundaries are designed to align with the anatomical definitions used by the clinical teams deploying the system — not generic research contours.

### DICOM-native pipeline

The system ingests imaging data through DICOM-compatible pipelines, the universal format across PACS, CT scanners, and treatment planning systems. Outputs are DICOM RT Structure Sets — the same format that TPS software already reads — so contours land in the planning system without a conversion step.

### Planning intelligence

Beyond segmentation, the system includes planning-support logic that analyses the anatomical context of the delineated structures — proximity of OARs to target volumes, dose-gradient constraints, protocol-specific beam angle restrictions — and provides guidance to the dosimetry team before planning begins. This reduces the back-and-forth between dosimetry and the clinical team during plan optimisation.

### Dose prediction

The dose prediction module uses deep learning to estimate expected dose distributions from the contoured anatomy before full treatment planning runs. Early dose estimates let teams identify likely protocol violations at the contour-review stage rather than after a complete plan has been built.

### Automated QA

The QA layer runs rule-based and model-assisted checks against the generated contours and plan parameters before final clinical approval. Checks cover volume plausibility, structure overlap constraints, dose-volume histogram thresholds, and protocol-specific flags. Anomalies are surfaced with explanations, not just flags — so the reviewing clinician knows what to look at.

---

## 5. Clinical workflow integration

The pipeline integrates at five stages in the standard radiotherapy planning workflow:

1. **Image Ingestion** — CT and MRI datasets are imported through DICOM-compatible pipelines from PACS or directly from the scanner.
2. **Auto Contour Generation** — The system generates initial OAR and tumour contours for the relevant cancer sites within the case.
3. **Clinical Review** — Radiation oncologists and dosimetrists validate and refine the AI-generated structures in their existing TPS environment. The AI contour is a starting point, not a final output.
4. **Plan Guidance and Dose Estimation** — Planning support and dose prediction modules help accelerate treatment strategy refinement before full plan optimisation begins.
5. **QA and Export** — Automated quality checks run before outputs are finalised for treatment planning system integration and clinical approval.

---

## 6. Impact

**Operational improvements:**

- Significantly lowers contouring effort and speeds patient-specific planning preparation.
- Reduces contour variability and supports more consistent protocol adherence across teams.
- Improves plan development throughput for high-volume radiotherapy departments.
- Enables earlier quality-control intervention through automated deviation flagging.
- Supports integration with standard treatment planning workflows and clinical systems.

**The 50–70% time reduction figure** represents the projected reduction in manual contouring time per case based on comparable AI-assisted contouring deployments in the radiotherapy literature. This figure will be updated with measured clinical data as the system moves through validation.

---

## 7. Cancer sites supported

The current development scope covers multiple cancer sites with AI contouring models. The system is designed to extend coverage without architectural changes — adding a new cancer site is a model training and validation exercise, not a software rebuild.

Dose prediction and planning guidance modules are similarly site-parameterised, so protocol-specific logic can be defined per cancer site and updated as clinical guidelines evolve.

---

## 8. Technology

- **Segmentation** — Volumetric deep learning models for CT and MRI
- **Input/Output** — DICOM RT Structure Set, DICOM-compatible PACS pipelines
- **Dose prediction** — Deep learning regression on anatomical features
- **QA layer** — Rule-based constraints with model-assisted anomaly detection
- **Validation** — Expert-delineated ground truth with clinical protocol alignment

---

## 9. Delivery team

| Role | Contributors |
|---|---|
| **Clinical Lead Team** | Radiation Oncologists — contour validation oversight and clinically safe treatment-structure definition |
| **Planning Team** | Dosimetrists & Medical Physicists — use contour and dose guidance outputs to optimise treatment plans |
| **Engineering Team** | Big-Matrix Solutions — model pipelines, QA automation, and system integration for radiotherapy workflows |

---

## 10. Future directions

- **Expanded cancer site coverage** — Additional disease sites and adaptive radiotherapy pathways.
- **Longitudinal treatment-response analysis** — Re-planning decision support based on tumour evolution across treatment fractions.
- **Physician-in-the-loop feedback** — Structured capture of clinician corrections to continuously improve segmentation robustness.
- **Multi-institution validation** — Broader clinical validation across sites with varied scanner hardware and protocol variations.
- **TPS ecosystem interoperability** — Native integration with major treatment planning systems beyond DICOM RT export.

---

## 11. Copy blocks

**One-liner**
> Automatic organ-at-risk and tumour contouring with planning support, dose prediction and QA — across multiple cancer sites.

**Short (~60 words)**
> Auto Contouring Software reduces the most labour-intensive step in radiotherapy planning by 50–70%. AI models auto-delineate organs-at-risk and target volumes from CT and MRI, then pass those contours through planning guidance, dose prediction, and automated QA — all in a DICOM-native workflow. Radiation oncologists review and approve; the hours of manual delineation become minutes of targeted correction.

**Medium (~150 words)**
> Radiotherapy is only as accurate as its contours. Before any plan can be built, every organ at risk and every tumour volume must be delineated on every relevant scan slice — a process that takes hours per patient, varies between clinicians, and bottlenecks the entire treatment timeline.
>
> Big-Matrix Solutions' Auto Contouring Software addresses this directly. Deep learning models auto-delineate OARs and target volumes from CT and MRI, producing DICOM RT Structure Sets that drop straight into the treatment planning system. A planning intelligence module guides dose strategy before optimisation begins. A dose prediction engine estimates distributions before a full plan is built. And an automated QA layer flags contour and planning anomalies before final clinical sign-off.
>
> The result is a 50–70% reduction in manual contouring time per case, higher consistency across treatment teams, and QA issues caught at the right stage rather than after a complete plan has been built around them.

---

## 12. Before you publish

**Claim discipline:**
- The 50–70% time reduction is a projected figure based on comparable AI contouring literature, not a measured result from this system's clinical deployment. Frame as "targeted reduction" or "projected based on comparable deployments" until clinical timing data is collected.
- Do not claim specific cancer site counts without confirming the validated site list with the clinical team.
- "QA-Ready" is an architecture claim, not a regulatory certification. Do not conflate with FDA clearance, CE marking, or other regulatory approval.
- The system is listed as "In Development." Do not describe it as clinically deployed until it completes validation.

**Assets to capture** — side-by-side of manual vs. AI-generated contour overlay · dose distribution heatmap · QA flag example · workflow timeline · team illustration.

**Suggested page order** — hero → problem (the contouring bottleneck) → four capabilities → clinical workflow → impact metrics → technology → future directions → team → CTA.
