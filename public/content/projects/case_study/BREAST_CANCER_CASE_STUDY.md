# Multimodal AI for Breast Cancer Diagnosis — Project Case Study

> Source material for the Big-Matrix Solutions website case study.
> Compiled from the project content file, JSX showcase page, and research documentation.
> Client: North South University · Grant: CTRG-21-SEPS-15

---

## 1. At a glance

| | |
|---|---|
| **Project** | Multimodal AI for Breast Cancer Diagnosis |
| **Internal ID** | CTRG-21-SEPS-15 |
| **Category** | AI in Healthcare |
| **Client** | North South University |
| **Partner** | Big-Matrix Solutions (Industry Partner) |
| **Principal Investigator** | Dr. Mohammad Monir Uddin |
| **Location** | North South University, Dhaka, Bangladesh |
| **Timeline** | April 2022 — April 2023 (1 year) |
| **Funding** | Research Grant (CTRG-21-SEPS-15) |
| **Status** | Research complete · Publication under review |
| **Headline metric** | 90%+ segmentation accuracy on regions of interest and BI-RADS classification |
| **Analysis time** | ~45 seconds per case (automated pipeline) |

---

## 2. The problem

Breast cancer is the most common cancer in women globally, and early detection is the single most reliable lever for improving survival outcomes. In Bangladesh and across South Asia, the challenge compounds: radiology departments operate under high patient volume, limited specialist bandwidth, and equipment that varies significantly between institutions.

Four specific failures define the status quo:

- **False-positive rates are punishingly high.** Traditional CAD methods produce false-positive rates of 70–80%, flooding radiologists with unnecessary follow-up cases and creating patient anxiety without clinical benefit.
- **Early-stage lesions are missed.** Subtle abnormalities in dense mammographic tissue — the cases where early intervention matters most — are the hardest to detect manually and the most consequential to miss.
- **Interpretation varies between readers.** Inter-observer variability among radiologists reduces the reproducibility and consistency of diagnoses, creating uncertainty in follow-up recommendations.
- **Manual analysis is a throughput bottleneck.** Reviewing full mammographic sequences by hand is time-intensive. In high-volume settings, the result is diagnostic delay — exactly when speed matters most.

---

## 3. What the system does

The platform combines **multimodal AI** — advanced deep learning architectures paired with structured medical domain knowledge — to perform two things that have historically required separate manual workflows: precise segmentation of suspicious regions in mammographic images, and generation of a preliminary diagnostic report the radiologist can act on immediately.

The framing that matters: this is **radiologist-in-the-loop AI**, not a replacement for expert review. The system surfaces findings, quantifies them, and drafts the report. The radiologist verifies, edits, and signs.

**The four core goals:**

| Goal | What it means |
|---|---|
| **Precision Segmentation** | Identify and isolate regions of interest with 90%+ accuracy across mammographic images |
| **Comprehensive Reporting** | Generate structured diagnostic reports tailored to medical professionals |
| **Early Detection** | Surface lesions at earlier stages than traditional manual review methods |
| **Clinical Integration** | Fit the pipeline into existing hospital imaging workflows without a rebuild |

---

## 4. Technical approach

### Multimodal data fusion

The system integrates across imaging modalities — mammography, ultrasound, pathology, clinical records, radiology reports, and genomic data — rather than treating each in isolation. Fusing modalities lets the model draw on context that a single-image approach cannot access.

### Attention-driven deep learning

The core model architecture uses attention mechanisms to focus processing resources on clinically relevant image regions. This is particularly important in dense breast tissue where lesions can be visually subtle. The attention approach is detailed in the research paper *OncoVision* (see §7).

### BI-RADS classification

Segmented regions are classified using the standard BI-RADS (Breast Imaging Reporting and Data System) framework, so outputs are immediately legible to radiologists without translation or retraining.

### Automated report generation

The system generates a preliminary diagnostic report populated with segmentation findings, BI-RADS classification, region measurements, and confidence indicators. The radiologist inherits a structured starting point rather than a blank page.

---

## 5. Clinical workflow integration

The pipeline slots into the existing radiology workflow at five stages:

1. **Image Acquisition** — Mammograms captured from standard FWHM-compliant equipment.
2. **Automated Analysis** — Real-time processing and segmentation, averaging 45 seconds per case.
3. **Radiologist Review** — AI-assisted interpretation with highlighted regions and a preliminary report.
4. **Report Finalization** — Radiologist reviews, edits, and approves the final diagnostic report.
5. **Patient Communication** — Structured findings communicated to referring physicians.

The 45-second average per case is significant. A manual full-case read typically takes several minutes and produces no structured output until the radiologist dictates. The AI pass reduces the time-to-first-finding and gives the radiologist a structured artefact to work against rather than a blank slate.

---

## 6. Results and impact

| Metric | Result |
|---|---|
| Segmentation accuracy (ROI + BI-RADS) | 90%+ |
| Average analysis time per case | ~45 seconds |
| False-positive reduction target | 5–7% rate (vs. 70–80% for traditional CAD) |
| Funded programme duration | 1 year |

**Clinical impact delivered:**

- Enhanced accuracy in detecting breast abnormalities using state-of-the-art AI models.
- Early identification of potential cancerous lesions through precision segmentation.
- Automated comprehensive report generation for medical professionals.
- Improved clinical decision-making with actionable diagnostic insights.
- Reduced diagnostic time while maintaining high accuracy standards.

---

## 7. Research and publication

**OncoVision: Integrating Mammography and Clinical Data through Attention-Driven Multimodal AI for Enhanced Breast Cancer Diagnosis**

Ahmed, I. et al. — *Nature Communications Medicine* (Under Review)

This paper documents the model architecture, training methodology, and clinical validation results of the platform developed under this research programme.

---

## 8. Future directions

The roadmap extends beyond the grant period into clinical deployment and broader research:

- **3D Tomosynthesis Integration** — Full volumetric analysis of digital breast tomosynthesis data.
- **Multi-center Validation** — Deployment and validation across multiple hospitals with diverse patient populations.
- **Federated Learning** — Privacy-preserving multi-institutional training without centralising patient data.
- **Molecular Subtype Prediction** — Extending the model to predict tumour molecular subtypes from imaging.
- **Personalized Risk Assessment** — Individual risk models informed by imaging, clinical, and genomic inputs.
- **Treatment Response Prediction** — Tracking lesion evolution under treatment to support adaptive clinical decisions.

---

## 9. Team

| Role | Name / Organisation |
|---|---|
| **Principal Investigator** | Dr. Mohammad Monir Uddin |
| **Research Institution** | North South University |
| **Industry Partner** | Big-Matrix Solutions |

Big-Matrix Solutions provided engineering, deployment, and clinical-integration expertise throughout the programme — from model development and pipeline architecture through to system integration with existing hospital imaging workflows.

---

## 10. Copy blocks

**One-liner**
> Multimodal AI that segments mammograms and drafts the diagnostic report, turning raw imaging into findings a radiologist can act on.

**Short (~60 words)**
> Developed under a North South University research grant, this project built a multimodal AI system that segments suspicious regions in mammographic images and generates a structured diagnostic report in ~45 seconds per case. Achieving 90%+ segmentation accuracy and targeting a dramatic reduction in false positives, the system keeps the radiologist in the loop while removing the blank-page burden from diagnostic reporting.

**Medium (~150 words)**
> Breast cancer diagnosis in high-volume radiology settings fails in predictable ways: false-positive rates that overwhelm follow-up capacity, early lesions missed in dense tissue, interpretation that varies between readers, and manual workflows that bottleneck throughput.
>
> This research programme — funded by North South University under grant CTRG-21-SEPS-15 and led by Dr. Mohammad Monir Uddin with Big-Matrix Solutions as industry partner — built a multimodal AI platform that fuses mammography, ultrasound, pathology, clinical records, and genomic data to segment regions of interest and generate a BI-RADS-classified diagnostic report in under a minute per case.
>
> The result is a radiologist-in-the-loop system that surfaces findings a human might miss, quantifies them in a standard clinical framework, and hands the specialist a structured report to verify rather than a blank page to fill. A paper on the work — *OncoVision* — is under review at *Nature Communications Medicine*.

---

## 11. Before you publish

**Claim discipline:**
- The 90%+ segmentation accuracy figure is stated in the project documentation. Cite with "in development dataset evaluation" qualification until multi-center validation is complete.
- The ~45 second analysis time is documented. Qualify as "average on the development hardware configuration."
- The false-positive reduction target (5–7%) is a target, not a measured result. Frame it as such, not as an outcome claim.
- Do not state the *OncoVision* paper as published. It is under review. Use "under review at *Nature Communications Medicine*."

**Assets to capture** — segmentation overlay on a mammogram (hero) · BI-RADS classification output · sample generated report structure · clinical workflow timeline · team and institution credits.

**Suggested page order** — hero → problem → the four goals → clinical workflow → results → research highlight → future directions → team → CTA.
