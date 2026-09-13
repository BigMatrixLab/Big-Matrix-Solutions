---
id: "13"
slug: "computer-vision-inspection"
title: "Computer Vision & Visual Inspection Systems"
icon: "bi bi-eye"
image: "https://images.unsplash.com/photo-1631563019676-dade0dbdb8fc?w=800&q=80&auto=format&fit=crop"
desc: "Defect detection, measurement and visual QA on the production line: edge-deployed, tolerant of real lighting, and tuned to the cost of each error type."
---


# Computer Vision & Visual Inspection Systems

![Computer vision and automated visual inspection on a production line](https://images.unsplash.com/photo-1631563019676-dade0dbdb8fc?w=800&q=80&auto=format&fit=crop)

## Catching the Defect Before It Ships

Manual visual inspection is slow, inconsistent between shifts, and worst exactly when volume is highest. Automated inspection is consistent, provided it was built for your lighting, your line speed and your definition of a defect.

That last part is where most deployments fail.


### 1. **Defect Detection & Classification**

- Surface defects: scratches, dents, contamination, discolouration
- Assembly verification: presence, orientation, seating
- Print and label inspection, including OCR verification
- Weld, seam and joint quality
- Anomaly detection where defect examples are too rare to label

---

### 2. **Measurement & Dimensional QA**

Sub-pixel measurement against tolerance, not a pass/fail guess:

**Outputs**:
- Dimensional measurement with calibrated scale
- Tolerance band checking with logged deviation
- Alignment and positional verification
- Trend data that flags drift before it becomes scrap

---

### 3. **Edge Deployment**

Inspection cannot depend on a round trip to a datacentre:

| Constraint | How we handle it |
|-------------|----------------|
| Line-speed inference | Quantised models on edge accelerators |
| No network dependency | Fully local inference and buffering |
| Deterministic latency | Fixed-cost inference, no variable prompting |
| PLC and SCADA integration | Reject signals into existing control logic |

---

### 4. **Tuning to the Cost of Being Wrong**

A false reject wastes a good part. A false accept ships a bad one. These almost never cost the same, and a model tuned to maximise accuracy optimises for neither.

- Threshold selection driven by your actual cost asymmetry
- Explicit review lane for borderline cases
- Per-defect-class performance, since the rare severe defect is the one that matters
- Retraining loop fed by operator overrides

---

### 5. **Robustness to the Real Environment**

- Lighting variation across shifts and seasons
- Vibration, dust and lens contamination
- Product variant and changeover handling
- Camera replacement without a full revalidation

---

### 6. **Imaging Setup: Optics and Lighting**

The most common reason an inspection project fails is not the model. It is that the defect was never clearly visible in the image to begin with.

- Lighting geometry chosen for the defect class: diffuse for glare-prone surfaces, dark-field for scratches, backlight for silhouettes and fill levels
- Camera, sensor and lens selection driven by the smallest feature that must be resolved, with pixels-per-millimetre calculated rather than assumed
- Enclosure and shrouding, so ambient light and seasonal daylight stop being a variable
- Trigger and synchronisation with line motion, because a blurred frame cannot be recovered by a better network
- A feasibility image set captured on the real line, under real conditions, before anyone trains anything

We would rather spend a week on optics than six months compensating for a bad image in software. A defect a human cannot see in the captured frame is not a modelling problem.

---

### 7. **Data Collection & Labelling**

Defects are, by definition, the thing you have least of.

- Sampling strategy that captures variants, shifts, suppliers and changeovers, not one good afternoon
- A written defect taxonomy agreed with quality staff, because "scratch" means different things to different inspectors
- Inter-annotator agreement checked before a dataset is trusted, since disagreement in labels becomes a ceiling on accuracy
- Targeted collection of rare classes rather than hoping they appear
- Synthetic augmentation for controlled variation, used to supplement real defects and never to replace them
- Versioned datasets tied to model versions, so a regression can be traced to what changed

---

### 8. **Validation Before Go-Live**

The evidence a quality manager needs before this is allowed to reject product.

- Hold-out testing on product the model has never seen, from a different production run
- Gauge repeatability and reproducibility framing, so the system is assessed the way other measurement equipment is
- Agreement against human inspectors, with disagreements reviewed individually rather than averaged away
- Shadow running in parallel with manual inspection, flagging without rejecting, until the numbers hold
- Per-class and per-variant reporting, since an aggregate score hides the one defect that matters

---

### 9. **Operations & Drift**

A vision system is not finished when it is installed.

- Monitoring of reject rate and score distributions, so a slow drift surfaces before the scrap does
- Alerting on image-quality degradation: focus loss, contamination, lighting failure
- Operator override capture as the primary retraining signal
- Scheduled revalidation after any change to product, tooling, lighting or camera
- Model versioning with rollback, because the fastest fix for a bad update is the previous model

Cameras get knocked, lenses get dirty, and suppliers change a material without telling anyone. The systems that survive are the ones that notice.

---

## Hardware and models

**Models**: CNN detectors and segmenters, vision transformers, anomaly detection for low-defect regimes
**Hardware**: Industrial cameras, edge accelerators, GPU inference servers
**Integration**: PLC, SCADA, MES, OPC-UA
**Tooling**: Annotation pipelines, versioned datasets, drift monitoring

## Industries we work in

- Manufacturing quality control and end-of-line inspection
- Packaging integrity and fill-level verification
- Electronics assembly and PCB inspection
- Food and beverage processing
- Warehouse and logistics verification

## How we work

**Feasibility before commitment.** We capture images on your line, under your lighting, of your actual defects, and show you what is visible before anyone agrees a scope. If the defect cannot be seen in the frame, that is the finding, and it is worth knowing in week one rather than month six.

**One defect class, proven.** A single inspection running in shadow mode against real product, with the reject logic wired but not connected. This settles the optics, the throughput and the disagreement about what counts as a defect.

**Widen carefully.** Additional classes and stations added against a validated baseline, each measured separately rather than folded into an overall score.

**Hand over the loop.** Annotation tooling, retraining process and monitoring, so your quality team can extend the system as products change instead of waiting on us.

---

## When automated inspection is the wrong answer

- **The defect is not reliably visible to a camera.** Internal faults, subtle material properties and anything a human inspector detects by feel or sound need a different sensor, not a better model.
- **The product changes constantly.** High-mix, low-volume lines can spend more on revalidation than the inspection saves.
- **Nobody can define the defect.** If two experienced inspectors disagree on the same part, the model has no target to learn and no fair basis for assessment.
- **Throughput is low enough that a person keeps up comfortably.** Automation earns its place on volume, consistency and fatigue, not on novelty.

---

## Where our background helps

Our imaging background is medical, which means we are unusually careful about the things that break vision systems in the field: domain shift, class imbalance, and the difference between a good average score and a model that catches the case you cannot afford to miss.
