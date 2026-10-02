---
id: "11"
slug: "medical-foundation-models-clear-the-fda"
title: "Medical Foundation Models Just Cleared the FDA. That Changes the Regulatory Playbook."
comments: "0"
image: "/assets/images/blog/medical-foundation-models-cover.png"
category: "Medical AI"
desc: "One clearance covering 14 conditions from a single CT scan, 1,524 cleared algorithms, and the validation gap regulators have not closed yet."
date: "Sep 18, 2026"
tags: ["Medical AI", "Radiology", "FDA", "Foundation Models"]
---

# Medical Foundation Models Just Cleared the FDA. That Changes the Regulatory Playbook.

For a decade, clinical AI had a shape imposed on it by regulation. You picked one narrow finding (a large-vessel occlusion, a pulmonary embolism, an intracranial haemorrhage), trained a model to detect it, ran a pivotal study, and filed. If you wanted to detect a second thing, you did the whole process again.

The result was predictable. As of March 30, 2026, there are **1,524 FDA-cleared AI algorithms**, and 1,163 of them are for radiology. Radiology alone accounts for 76.31 percent of every AI device the FDA has ever cleared. In the first three months of 2026, another 68 radiology algorithms went through.

![Bar chart: of 1,524 FDA-cleared AI algorithms as of 30 March 2026, 1,163 (76.31%) are for radiology and 361 for other specialties; 68 radiology algorithms were cleared in the first quarter of 2026](/assets/images/blog/diagrams/medical-foundation-models-1.svg)

*Radiology accounts for more than three quarters of FDA-cleared AI. Diagram: Big Matrix Solutions, based on [Radiology Business](https://radiologybusiness.com/topics/artificial-intelligence/radiology-gets-68-new-fda-cleared-algorithms).*

That is not the sign of a healthy platform. It is the sign of a regulatory pathway that rewards fragmentation. A large hospital ends up licensing eight or ten separate products, each watching for one thing, each with its own integration, its own worklist behaviour, and its own alert.

In January, that changed. And the interesting part is not the accuracy figure. It is the *scope* of what got cleared.

## One model, fourteen conditions

Aidoc received FDA clearance for what is described as the first foundation-model-powered clinical AI device: a single body CT triage solution covering **14 distinct conditions** from one scan.

The condition list spans genuinely different pathology: aortic dissection, appendicitis, bowel obstruction, splenic injury, and ten others. These are not variations on a theme. They are different organs, different presentations, different urgency profiles. Historically each would have been its own submission.

The pivotal study reported:

| Metric | Result |
|---|---|
| Mean sensitivity | 97% |
| Mean specificity | 98% |
| Conditions covered | 14 |

Both numbers are strong, and they are means across fourteen conditions rather than a single cherry-picked finding. The enabling technology is Aidoc's CARE foundation model, pretrained broadly on imaging rather than fitted to one task.

Then in June, the FDA granted Breakthrough Device Designation to *First Read*, which extends the same CARE model into a different job entirely: analysing chest radiographs and generating preliminary radiology report text.

That is the pattern worth noticing. One pretrained backbone, then two very different regulated products built on it: multi-condition triage and report drafting. That is the foundation-model playbook, and it has now made it through a medical device pathway.

![Comparison: before, one device per finding such as aortic dissection or appendicitis, each with its own submission and integration; now, the CARE foundation model underpins body CT triage for 14 conditions and First Read for chest X-ray report drafts](/assets/images/blog/diagrams/medical-foundation-models-2.svg)

*From one device per finding to one backbone with several regulated products. Diagram: Big Matrix Solutions, based on [STAT](https://www.statnews.com/2026/01/21/fda-clears-aidoc-tool-detect-multiple-conditions-from-ct-scan/).*

## Why this is a regulatory story, not just a technical one

The technical claim, that a broadly pretrained imaging model transfers to many tasks better than task-specific models trained from scratch, has been the consensus in research for years. Nobody needed convincing.

The obstacle was regulatory, and it was structural. Device clearance is built around an **intended use**: a specific claim, validated against a specific study, for a specific population. A foundation model's defining property is that it is *not* specific. Asking a regulator to clear "a model that is good at medical images" is asking them to clear something with no bounded claim, which they cannot do and should not do.

The multi-condition clearance is a workable compromise. The intended use is still bounded (body CT triage, fourteen named conditions, defined population) but it covers a much wider surface than the single-finding submissions that came before it, and the underlying model is reusable across further submissions.

For companies, the economics of that are substantial:

- **Amortised pretraining**: the expensive part is building the backbone. Each additional cleared indication becomes a fine-tuning and validation exercise rather than a from-scratch programme.
- **Fewer integrations**: hospitals buy one pipeline instead of ten, which removes the deployment friction that has quietly killed a lot of otherwise good clinical AI.
- **Coherent worklists**: a single model triaging fourteen conditions can rank a worklist. Ten separate models each firing independent alerts cannot, and radiologists have been vocal about alert fatigue for years.

## What makes a medical imaging foundation model different

Be precise about what "foundation model" means here, because the term gets used loosely and the medical version differs from the language-model version in ways that matter.

A language foundation model is pretrained on text with a self-supervised objective, predict the next token, and the data is effectively unlimited. A medical imaging foundation model faces a harder setup on both counts.

**The pretraining objective has to be built.** There is no "next token" in a CT volume. The self-supervised objectives that work here are masked reconstruction, contrastive learning across views or timepoints, and increasingly latent prediction of the kind used in joint embedding architectures. Each makes different assumptions about what structure in the image is worth learning.

**The data is scarce, sensitive, and heterogeneous.** You cannot scrape medical images. Every dataset requires institutional agreements, de-identification, and ethics approval. And what you get varies enormously: different scanner manufacturers, different reconstruction kernels, different contrast protocols, different slice thicknesses. A model trained on one hospital's imaging can degrade noticeably on another's, and this is a well-documented and persistent problem rather than an occasional surprise.

**Labels are expensive and inconsistent.** Annotating a CT volume for fourteen conditions requires radiologist time at radiologist rates. Inter-reader agreement on subtle findings is imperfect, which puts a ceiling on how good a supervised model can look under evaluation regardless of how good it actually is.

What the foundation-model approach buys against all this is efficiency of adaptation. Once a backbone has learned general anatomical and textural structure from a large unlabelled corpus, adding a new condition requires far fewer labelled examples than training from scratch. For rare conditions, where a few hundred confirmed cases may be all that exists globally, that difference decides whether a model is possible at all.

## The uncomfortable finding underneath

Here is where the story gets less flattering.

In June, *Nature Medicine* published a benchmark study comparing general-purpose large language models against FDA-cleared clinical AI tools. The general-purpose models outperformed the cleared devices on the tasks measured.

Sit with the implication. A model that went through a pivotal study, a regulatory submission, and a clearance decision was beaten by a general model that went through none of that.

Two readings are possible, and both have some truth in them.

The generous reading is that clearance certifies safety and a validated claim, not competitive performance, and that a cleared device is guaranteed to have been *tested* in a way the general model has not. That is a real distinction and it matters.

The harsh reading is that the clearance process is slow enough that devices are validated against a capability frontier that has since moved. A device cleared in 2024 was measured against 2023-era alternatives. By 2026, an off-the-shelf model may simply be better at the same task, and nothing in the regulatory framework surfaces that fact to the buyer.

The commentary around the study framed this as a validation gap regulators have not closed. It is a fair description. Clearance is a point-in-time judgment in a field where the relevant comparison changes every few months, and there is no established mechanism for re-benchmarking a cleared device against what became available afterwards.

## What clearance does and does not tell you

If you are on the buying side of this, the distinctions matter a great deal.

### 1. Clearance is about a claim, not about quality

A 510(k) clearance says the device is substantially equivalent to a predicate for a stated intended use. It does not say the device is the best available option, that it will perform the same way on your patient population, or that its performance has been re-verified recently.

### 2. The study population is the fine print

Sensitivity and specificity are properties of a model *and a population*. A model validated largely on one demographic, scanner vendor, or acquisition protocol can degrade meaningfully on another. The pivotal study details are usually available and usually not read. Read them, and compare them against who actually walks into your department.

### 3. Triage is not diagnosis

Almost all of these clearances are for triage and notification: flagging a study for earlier review. That is genuinely valuable: catching an aortic dissection twenty minutes sooner changes outcomes. But it is a workflow intervention. The radiologist still reads the study and still owns the finding, and a triage model's job is to reorder a queue, not to replace a read.

### 4. Report drafting is a different risk category

*First Read* generating preliminary report text is a real escalation, which is presumably why it is at Breakthrough Device Designation rather than cleared. A triage flag that is wrong costs attention. Draft report text that is wrong enters the record, anchors the reader, and can propagate into downstream care. Automation bias is well studied in this exact setting: physicians assisted by a confidently wrong model do worse than physicians working unaided.

The mitigation is not better accuracy alone. It is workflow design: making the draft visibly provisional, making disagreement cheap to express, and not presenting the model's text as a finished read.

## Deployment is where most of these die

A point that rarely makes the announcement: the majority of cleared clinical AI is not in routine use anywhere. Clearance is a permission, not an installation.

The obstacles are mundane and they are the reason the 1,524-algorithm figure overstates real-world impact considerably.

**Integration.** The model has to receive studies from the PACS, return results into the radiologist's worklist, and do so without adding latency to a workflow that is already time-pressured. Every hospital's imaging infrastructure is configured slightly differently, and each integration is bespoke work.

**Alert design.** A triage model that flags studies is only useful if the flag changes behaviour. Put it somewhere the radiologist does not look and it changes nothing. Make it too prominent and it competes with everything else demanding attention. Radiologists have been describing alert fatigue for years, and adding a tenth independent alerting system makes it worse regardless of that system's accuracy.

**Reimbursement.** Someone has to pay. For most cleared algorithms there is no dedicated reimbursement pathway, which means the hospital absorbs the cost and has to justify it against outcomes it may not be measuring. This, more than accuracy, is why adoption curves are flatter than clearance curves.

**Monitoring.** A deployed model's performance drifts as scanners are replaced, protocols change, and the patient population shifts. Almost nobody is systematically measuring this after go-live, which means a degraded model can keep running while clinicians continue to trust it.

The multi-condition platform approach helps with the first two directly. One integration instead of ten, and one system that can rank a worklist coherently rather than ten firing independently. That is a less exciting claim than 97 percent sensitivity, and it may matter more.

## The part that is genuinely encouraging

Cynicism aside, something real happened here.

The last decade of clinical AI was characterised by an enormous number of narrow tools that were individually decent and collectively unusable. Every additional product added integration cost, alert volume, and vendor management overhead, and hospitals rationally stopped adding them well before they ran out of useful models to buy.

A single model covering fourteen conditions attacks that problem directly, and it does so through the regulatory pathway rather than around it. At 97 percent mean sensitivity and 98 percent mean specificity, it does so without an obvious quality sacrifice.

The 1,524-algorithm figure will keep climbing. But the shape of what gets cleared is starting to change: fewer single-finding detectors, more multi-indication platforms built on a shared backbone. That is the difference between a research field producing papers and a field producing infrastructure.

## What to watch next

Three open questions will determine how this plays out.

**Does the FDA formalise a foundation-model pathway?** Right now, multi-condition clearance is being achieved through creative use of existing mechanisms. A framework designed for reusable backbones, with predetermined change control for adding indications, would accelerate everything. There is active work in this direction, and it is the single highest-leverage regulatory change available.

**Does post-market surveillance get real teeth?** Continuous monitoring of deployed model performance is the only honest answer to the validation-gap problem. A cleared device whose real-world sensitivity has drifted is more dangerous than one that was never cleared, because clinicians trust it.

**Does report generation clear?** *First Read* is the test case. If AI-drafted radiology reports become a cleared category, the entire relationship between radiologist and model changes: from a system that reorders your queue to one that writes your first draft. That is a far larger shift than triage ever was, and the workflow and liability questions around it are nowhere near settled.

For now it comes down to this: the technology is ahead of the regulation, the regulation is adapting faster than it used to, and the gap between them is where most of the clinical risk currently lives.

**Media credits**:
- Hero image: Big Matrix Solutions cover, based on reporting of the Aidoc clearance by [STAT](https://www.statnews.com/2026/01/21/fda-clears-aidoc-tool-detect-multiple-conditions-from-ct-scan/).
- In-body diagram: FDA-cleared AI by specialty. Big Matrix Solutions, based on [Radiology Business](https://radiologybusiness.com/topics/artificial-intelligence/radiology-gets-68-new-fda-cleared-algorithms).
- In-body diagram: single-finding devices versus a shared backbone. Big Matrix Solutions, based on [STAT](https://www.statnews.com/2026/01/21/fda-clears-aidoc-tool-detect-multiple-conditions-from-ct-scan/).
