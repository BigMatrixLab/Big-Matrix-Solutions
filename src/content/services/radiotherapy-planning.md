---
id: "9"
slug: "radiotherapy-planning-contouring"
title: "Radiotherapy Planning & Auto-Contouring Systems"
icon: "bi bi-radioactive"
image: "/assets/images/projects/auto contouring software.png"
desc: "Automated organ-at-risk and target volume contouring, multi-planar review tools, and treatment planning integration for radiation oncology."
---


# Radiotherapy Planning & Auto-Contouring Systems

![Auto-contouring workstation with axial, sagittal and coronal views and a structure list](/assets/images/projects/auto%20contouring%20software.png)

## Hours of Manual Contouring, Reduced to Minutes of Review

Contouring is the bottleneck in radiotherapy planning. A single plan can require dozens of structures drawn slice by slice across hundreds of CT slices, and the work is both time-consuming and variable between planners.

We build the tools that automate the drawing and leave the judgment where it belongs.


### 1. **Automated Structure Contouring**

Organs at risk and target volumes generated from the planning CT:

**Typical structure sets**:
- Pelvis: bladder, rectum, femoral heads, small bowel
- Thorax: lungs, heart, oesophagus, spinal cord
- Head and neck: parotids, larynx, brainstem, optic structures
- Target volumes: GTV, CTV and derived expansions

---

### 2. **Multi-Planar Review & Editing**

Automation is only useful if correcting it is faster than starting over:

- Synchronised axial, sagittal and coronal views with linked cursor position
- Brush, fill and interpolation tools for fast correction
- Per-structure status tracking so a planner knows what has been reviewed
- 3D view for verifying continuity across slices

---

### 3. **Planning System Integration**

| Interface | Purpose |
|-------------|----------------|
| DICOM-RT import | Planning CT and existing structure sets |
| RTSTRUCT export | Contours back into your TPS |
| Window/level presets | Soft tissue, lung, bone, brain |
| Audit trail | Who changed which structure, when |

---

### 4. **Clinical Validation & QA**

The evidence a physics team will ask for before this touches a plan:

- Geometric agreement against clinician contours: Dice and Hausdorff distance
- Dosimetric impact analysis, not just overlap metrics
- Inter-observer variability as the reference band
- Per-structure reporting, since a good mean hides a bad organ

Boundary accuracy is the number that matters here. A structure that is right on average and two millimetres out at the margin changes the plan.

---

## Tooling and standards

**Models**: 3D U-Net and nnU-Net, atlas-based hybrids, transformer encoders
**Standards**: DICOM-RT, RTSTRUCT, RTPLAN, RTDOSE
**Deployment**: On-premise workstation or departmental server

## Where it lands

- Radiation oncology departments with planning backlogs
- Centres standardising contouring practice across planners
- Multi-centre studies requiring consistent structure definitions
- Sites preparing for adaptive or online replanning workflows

## What we bring to it

This is a system we have built and iterated on, not a capability we are describing. We understand that a contouring tool lives or dies on how fast a planner can fix what it got wrong, and we design the review path first.
