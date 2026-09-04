---
id: "13"
slug: "computer-vision-inspection"
title: "Computer Vision & Visual Inspection Systems"
icon: "bi bi-eye"
image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&q=80&auto=format&fit=crop"
desc: "Defect detection, measurement and visual QA on the production line: edge-deployed, tolerant of real lighting, and tuned to the cost of each error type."
---


# Computer Vision & Visual Inspection Systems

![Computer vision and automated visual inspection on a production line](https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&q=80&auto=format&fit=crop)

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

## Hardware and models

**Models**: CNN detectors and segmenters, vision transformers, anomaly detection for low-defect regimes
**Hardware**: Industrial cameras, edge accelerators, GPU inference servers
**Integration**: PLC, SCADA, MES, OPC-UA
**Tooling**: Annotation pipelines, versioned datasets, drift monitoring

## Industries we work in

- Manufacturing quality control and end-of-line inspection
- Pharmaceutical packaging and fill verification
- Electronics assembly and PCB inspection
- Food and beverage processing
- Warehouse and logistics verification

## Where our background helps

Our imaging background is medical, which means we are unusually careful about the things that break vision systems in the field: domain shift, class imbalance, and the difference between a good average score and a model that catches the case you cannot afford to miss.
