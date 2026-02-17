# X-Ray Segmentation Editor

*Project Duration: 1 months | Completed: February 2026*

![BM-Academy Platform](/assets/images/projects/x-ray-segmentation-editor.png)

##  Project Overview

**X-Ray Segmentation Editor** is an interactive workspace for reviewing, correcting, and packaging chest X-ray segmentations. It blends automatic anatomy detection with lightweight manual touch-ups so clinical and research teams can create reliable mask sets without diving into code.

## What it’s for
- Quickly turn a single chest X-ray into labeled anatomy masks with an AI helper.
- Perform rapid quality checks before a study, publication, or model training run.
- Standardize how cases are stored and shared (images, masks, overlays, manifest) in one bundle.
- Let annotators and reviewers collaborate on the same cases with predictable colors and names.

## Why it helps
- **Speed:** Auto-segmentation gives you a solid starting point; edits focus only on what needs fixing.
- **Quality control:** Visual overlays and per-segment toggles make spotting errors fast.
- **Consistency:** Colors, segment names, and file structure stay uniform across sessions and exports.
- **Shareability:** Everything needed to reopen a case ships together, avoiding broken links or missing files.

## Key capabilities
- **Upload & auto-segment:** Drop in a chest X-ray, get color-coded anatomy layers instantly.
- **Manual refinement:** Brush/erase tools, segment selection, and undo/redo to fix problem areas.
- **View controls:** Show/hide segments and reorder layers for clear overlays.
- **Case loading and export:** Open a saved ZIP (images, masks, manifest) or export your current work as a shareable ZIP.
- **Overlay preview:** See how masks sit on the base image before saving or sharing.

## Typical workflow
1) Upload a chest X-ray and run auto-segmentation.
2) Toggle segments on/off to inspect each anatomy layer.
3) Select a segment and touch up with brush/erase; undo/redo as needed.
4) Reorder layers if overlap makes review hard.
5) Export the case to a ZIP for teammates or archiving, including the manifest for reliable reloads.

## Who uses it
- Radiologists and clinicians who need quick, trustworthy overlays during review.
- Annotation teams curating datasets for training or validation.
- Researchers who want reproducible, well-labeled mask sets without bespoke scripts.

## What’s in each exported case
- Original upload (raw image) and the display-ready base image.
- One PNG per segment with the chosen color and transparency.
- A combined overlay for easy viewing.
- A manifest that records names, colors, and file references so cases reopen cleanly.

## Notes on privacy and handling
- Designed for single-case, on-demand processing; clear files when finished according to your org’s policies.
- Exported bundles keep all assets together—store or transmit them according to your data governance rules.
