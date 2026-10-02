---
id: "13"
slug: "llms-outperform-physicians-clinical-reasoning"
title: "A Model Beat Two Attending Physicians on ED Triage. Now Comes the Hard Part."
comments: "0"
image: "/assets/images/blog/clinical-reasoning-llms.png"
category: "Medical AI"
desc: "67.1% versus 55.3% and 50.0% on real emergency department cases. What the Science study actually measured, and why the authors are urging caution."
date: "Oct 09, 2026"
tags: ["Medical AI", "Clinical Reasoning", "LLM", "Healthcare"]
---

# A Model Beat Two Attending Physicians on ED Triage. Now Comes the Hard Part.

On April 30, 2026, *Science* published a study finding that a large language model outperformed physicians across a range of common clinical reasoning tasks: emergency department decisions, generating likely diagnoses, and choosing next steps in management.

The result deserves attention, and it deserves more care than most of the coverage gave it. The research team's own conclusion was not "AI is ready." It was closer to "our tests have stopped being able to measure this, and we now urgently need real trials."

Both halves matter.

## What was actually measured

The strongest experiment in the study simulated an emergency department encounter as it unfolds rather than as a finished case.

This design choice is the important one. Most medical AI evaluations use a completed case vignette: here is the history, the exam, the labs, the imaging. What is the diagnosis? That is a reading comprehension task. Real emergency medicine is nothing like it. You get a complaint and some vitals, you decide what to order, more information arrives, you revise.

So the researchers staged it. At each point in a standard ED workflow, the model received only the information available *at that point*, drawn directly from actual electronic health records, and was asked to produce likely diagnoses and recommend what should happen next.

On real emergency department cases, diagnostic accuracy, exact or very close:

| Reader | Accuracy at initial triage |
|---|---|
| OpenAI o1 model | 67.1% |
| Expert attending physician A | 55.3% |
| Expert attending physician B | 50.0% |

At initial triage, the point of maximum uncertainty with the least information available, the model was right about two-thirds of the time, and the two expert attendings roughly half.

![Bar chart: diagnostic accuracy at initial ED triage, o1 model 67.1 percent, attending physician A 55.3 percent, attending physician B 50.0 percent](/assets/images/blog/diagrams/clinical-reasoning-llms-1.svg)

*Diagram: Big Matrix Solutions, based on [Brodeur et al., Science 2026](https://www.science.org/doi/10.1126/science.adz4433).*

A few things about this comparison are unusually clean. The cases were real, pulled from EHRs rather than written for a textbook. The information staging was faithful to how a real encounter progresses. And the human comparators were expert attending physicians, not residents or medical students, which is where a lot of earlier "AI beats doctors" results got their margin.

## What was not measured

Now the part the study authors emphasised and the headlines mostly dropped.

The researchers wrote that this "does not mean AI will necessarily improve care; how and where it should be deployed remain understudied, and we desperately need rigorous prospective trials to evaluate the impact of AI on clinical practice."

That is not routine hedging. It identifies a specific and well-documented gap between two very different claims:

- **The model reasons well in isolation**: measured, and supported by this study.
- **A clinician using the model produces better outcomes**: not measured, and not implied.

Those come apart in practice, sometimes badly. The mechanism has a name.

## Automation bias is the actual obstacle

Research on LLM-assisted diagnostic reasoning has repeatedly found that physicians working with a model do not simply inherit the model's accuracy. They inherit some of its accuracy and some of its errors, and the errors are the problem, because a confident, fluent, well-argued wrong answer is far more persuasive than a hesitant one.

Work specifically examining automation bias among AI-trained physicians found that even clinicians who had been educated about the failure modes were still pulled toward incorrect model suggestions. Knowing about the bias does not neutralise it.

This produces an outcome that is counterintuitive until you have seen it happen:

> A model that is more accurate than the average physician, deployed carelessly, can make a physician-plus-model system *less* accurate than the physician alone.

The reason is asymmetric influence. When the model agrees with the clinician's instinct, nothing changes. When it disagrees and the model is right, the clinician sometimes updates. Good. When it disagrees and the *clinician* is right, the clinician sometimes updates anyway. Bad. If the second effect is strong enough, average accuracy falls even though the model is individually better.

![Three cases of clinician-model interaction: agreement changes nothing, a right model raises accuracy, a wrong model followed anyway lowers it](/assets/images/blog/diagrams/clinical-reasoning-llms-2.svg)

*Diagram: Big Matrix Solutions, based on the automation-bias mechanism described in this article; conceptual, no measured rates.*

This is why "the model scored higher" and "deploy the model" are separated by a very large amount of engineering and study design.

## The benchmark problem in medicine specifically

The study's second contribution is methodological, and it echoes what is happening across AI evaluation generally: the standard tests have run out of room.

Medical AI has been benchmarked for years against multiple-choice licensing exam questions: USMLE-style items and their equivalents. Frontier models saturated those. Scores in the high nineties tell you nothing useful about clinical capability, partly because the questions are in the training data and partly because a well-formed multiple-choice question with one defensible answer bears almost no resemblance to a patient.

The *Science* team's framing was that the LLM's performance indicated long-standing ways of testing medical AI may no longer capture current systems' performance. That is a strong statement about measurement, and it is consistent with a June *Nature Medicine* benchmark study which found general-purpose LLMs outperforming FDA-cleared clinical AI tools, a result that mainly reveals how differently those two things are validated.

The replacement is being built, and it is harder and more expensive:

- **Sequential information staging**: evaluating at each decision point rather than on the completed case, as the *Science* study did.
- **Management, not just diagnosis**: what to order, what to rule out, whether to admit. Diagnosis is one output among several, and often not the one that determines the patient's course.
- **Randomised assistance trials**: comparing clinician-alone against clinician-plus-model on real workflows. A recent example is a randomised AI physician assistance trial for rare disease diagnosis using a specialised reasoning model, which is exactly the study design the field needs more of.
- **Outcome endpoints**: time to correct diagnosis, unnecessary testing, length of stay, mortality. The endpoints that justify deployment, rather than the ones that are convenient to measure.

## The management reasoning result, which is arguably bigger

Diagnosis gets the headlines, but the *Science* study also covered management reasoning (deciding what to order, what to rule out, whether to admit) and this is where the clinical stakes concentrate.

Diagnosis is a labelling problem with a defensible answer. Management is a sequence of decisions under uncertainty, with costs and trade-offs on every branch. Order too few tests and you miss things; order too many and you generate incidental findings, radiation exposure, false positives, and downstream procedures that carry their own risk. The correct answer often depends on factors that are not in the chart: how far the patient lives from the hospital, whether they will come back for follow-up, what they are willing to tolerate.

A model performing well on management reasoning is a more surprising result than one performing well on diagnosis, precisely because the target is less well defined. It is also harder to evaluate, since two reasonable physicians can disagree about the right next step and both be defensible.

The relevant earlier work is a randomised controlled trial on LLM influence on management reasoning, which measured what happened when physicians had model assistance rather than measuring the model alone. That is the study design that matters, and its findings are part of why the *Science* authors were careful about the deployment gap. Capability in isolation and improvement in combination are separate empirical questions, and the second one has a much thinner evidence base.

## Where it might work first

Reading the evidence together, the deployments most likely to help share a shape. The model contributes breadth, the clinician retains the decision, and the model's failure mode is a wasted minute rather than a wrong action.

### 1. Differential expansion

Asking the model *what else could this be* is close to an ideal use. Human differentials narrow fast under time pressure and anchor on the first plausible explanation. A model reliably surfacing five more possibilities, including the rare ones, adds candidates without taking the decision away. Wrong suggestions cost a moment of consideration.

### 2. Rare disease

The clearest value case. Rare disease diagnosis is famously slow, often years of referrals, precisely because no individual clinician has seen enough cases to recognise the pattern. Breadth is exactly what a model has and exactly what a specialist necessarily lacks. This is where the randomised assistance trials are already being run.

### 3. Documentation and structure

Ambient documentation is deployed widely and works largely because it removes typing rather than making decisions. It has real value in clinician time and burnout, and its failure mode is a transcription error a human catches on review.

### 4. Second-pass review

Running a model over completed encounters looking for missed findings or contradictions removes time pressure entirely and puts the model in a checking role rather than a leading one. No anchoring, because the clinician has already decided.

The pattern across all four: the model *adds* something the clinician evaluates. The deployments to be careful with are the ones where the model's output arrives first and shapes the clinician's thinking before they have formed their own.

## Questions worth asking a vendor

If a clinical AI product is being sold to you on the strength of results like these, a handful of questions separate the serious offerings from the rest.

**What were the comparators?** "Outperformed physicians" is meaningless without knowing which physicians. Attending specialists in the relevant field is a strong claim. Residents, generalists, or crowd-sourced annotators is a much weaker one, and the difference is rarely prominent in the marketing.

**Was information staged?** A model scored on complete case vignettes has been tested on a reading comprehension task. A model scored at sequential decision points has been tested on something resembling clinical work. Ask which, because the numbers are not comparable.

**What was the data source?** Real EHR extracts behave nothing like curated case reports. Published cases are selected for being instructive, which means they are unusually clean and unusually diagnosable. Real charts are messy, contradictory, and full of copy-forward errors.

**Has an assistance trial been run?** The model's solo accuracy is the easy number. The clinically relevant number is whether clinicians using it do better than clinicians not using it, and whether that holds for your clinicians, in your workflow, under your time pressure.

**How does the interface handle disagreement?** This is the question that reveals whether a vendor has thought about automation bias at all. Does the model present its answer before or after the clinician commits to theirs? Is uncertainty communicated in a way that changes behaviour? Is disagreeing with the model cheap, or does it require justification? These design details determine whether a good model helps or hurts, and they are more predictive of outcomes than a few percentage points of accuracy.

## What this study changed

Not much clinically. Quite a lot in terms of what the field can no longer claim.

Before April, it was defensible to argue that LLMs performed well on exam questions and poorly on realistic clinical reasoning, and that the gap between the two was the reason not to take them seriously. That argument is now much weaker. Real cases, real EHR data, faithful information staging, expert attending comparators. The model still came out ahead.

What the study did not do is establish that deploying it helps, and its authors were explicit about that. The 67.1 percent is a capability result. Whether that capability improves care depends on questions of interface, workflow, override behaviour, and clinician trust calibration that no benchmark can answer.

The next real milestone will not be a higher accuracy number. It will be a prospective randomised trial showing that patients whose clinicians had access to the model did measurably better than patients whose clinicians did not. Until that exists, everything else is a very promising precondition.

**Media credits**:
- Hero image: Big Matrix Solutions, based on [Brodeur et al., Science 2026](https://www.science.org/doi/10.1126/science.adz4433)
- Diagram: diagnostic accuracy at triage — Big Matrix Solutions, based on [Brodeur et al., Science 2026](https://www.science.org/doi/10.1126/science.adz4433)
- Diagram: automation bias and asymmetric influence — Big Matrix Solutions (conceptual)
