---
id: "84"
slug: "llm-clinical-trial-matching-evidence"
title: "LLMs for Clinical Trial Matching: Promise and Proof"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/clinical-trial-matching.webp"
category: "Medical AI"
desc: "Matching patients to trials is reading work, which is what language models are good at. The benchmark results are strong. The randomised evidence is smaller, narrower and more interesting."
date: "Jan 11, 2027"
tags: ["Medical AI", "Clinical Trials", "LLMs", "Patient Recruitment", "Evidence"]
---

# LLMs for Clinical Trial Matching: Promise and Proof

Clinical trials struggle to find patients, and part of the problem is simply finding the ones who qualify. A 2026 oncology study called prescreening "a rate-limiting step to trial enrollment".

Eligibility criteria are written in prose: inclusion and exclusion lists that can run to dozens of items, mixing diagnoses, lab thresholds, prior treatments and judgement calls. Patient records are also largely prose: clinic notes, discharge summaries, pathology reports. Prescreening means a trained person reading one against the other, chart by chart. It is slow, expensive and error-prone, and it is close to the textbook definition of a task large language models should help with.

The question is no longer whether they can. It is what the evidence actually shows, and how much of it comes from settings that resemble a real recruitment office.

## Why structured data was never enough

Health systems have long been able to query structured fields: age, diagnosis codes, lab values. That gets a candidate list. It does not get an answer.

The heart failure trial behind one of the studies below illustrates the gap. Researchers at Mass General Brigham reported that structured EHR data could determine only 5 of 6 inclusion criteria and 5 of 17 exclusion criteria for the COPILOT-HF trial. Everything else needed someone to read the notes. That ratio is typical of how trial criteria are written, and it is why manual chart review has persisted for so long.

## The benchmark case: TrialGPT

The most cited research system is TrialGPT, from the National Library of Medicine at NIH with collaborators, published in *Nature Communications* in November 2024. It splits matching into three stages, shown in the architecture figure at the top of this post:

1. **Retrieval** filters a large collection of trials down to candidates.
2. **Matching** reads each criterion against the patient note, explains its reasoning, points to the supporting sentences, and labels eligibility.
3. **Ranking** aggregates criterion-level judgements into a trial-level score.

The reported results are strong:

| Measure | Result |
|---|---|
| Relevant trials recalled | Over 90%, using under 6% of the collection |
| Criterion-level accuracy (1,015 pairs, expert-checked) | 87.3% |
| Expert accuracy range on the same task | 87.6% to 91.6% |
| Screening time reduction in a pilot user study | 42.6% |

The design choice that matters most is the second stage. Rather than asking a model "is this patient eligible?", TrialGPT asks it about each criterion separately, with an explanation and a pointer to evidence. That makes the output auditable, which is the property a coordinator needs before trusting it.

The caveats are in the paper itself. The patients were synthetic: three public cohorts totalling 183 patient descriptions. The backbone was GPT-4, a closed commercial model. And the authors are direct about the time-saving result: "our pilot user study is of limited scope in sample size." The 42.6% is a promising signal from a small study, not a deployment figure.

## The first randomised evidence

Benchmarks answer "can it?" Randomised trials answer "does it help when you use it?" Two now exist.

**Heart failure prescreening (JAMA, 2025).** Mass General Brigham built RECTIFIER, a retrieval-augmented GPT-4 pipeline that answers eligibility questions from clinical notes. In an earlier validation, it matched an expert clinician closely, with 92.3% sensitivity and 93.9% specificity for eligibility, against 90.1% and 83.6% for trained study staff.

The team then ran a randomised trial. 4,476 patients were assigned to manual prescreening or AI-assisted prescreening for COPILOT-HF.

![Randomised trial results: AI-assisted prescreening found 458 eligible patients vs 284 manually, and enrolled 35 vs 19](/assets/images/blog/diagrams/clinical-trial-matching-1.svg)

*Diagram: Big Matrix Solutions, based on [Unlu et al., JAMA 2025](https://pubmed.ncbi.nlm.nih.gov/39960745/) as reported by [Mass General Brigham via EurekAlert](https://www.eurekalert.org/news-releases/1073636).*

The AI arm identified 458 eligible patients against 284 in the manual arm, and enrolled 35 against 19. Study staff still did a brief review of every chart the AI marked eligible before patients were approached. The researchers reported no significant differences in race, gender or ethnicity between patients enrolled through the two routes.

**Oncology prescreening (Nature Communications, 2026).** A team from the University of Pennsylvania and collaborators randomised 355 retrospective charts from patients with non-small cell lung or colorectal cancer to research staff alone or staff assisted by a pre-trained language model. Chart-level accuracy was 76.5% with AI assistance against 71.1% without, meeting both non-inferiority and superiority. Time per chart did not change: 37.4 vs 37.8 minutes.

The gains were largest for biomarker, staging and response criteria. The authors also reported that performance was limited in some domains by automation bias, with reviewers accepting AI output they should have challenged.

## Reading the two trials together

These results look inconsistent until you notice what each one measured.

| | Heart failure (JAMA) | Oncology (Nat Commun) |
|---|---|---|
| What the AI changed | Which patients reached staff | How staff abstracted each chart |
| Main gain | More eligible patients found, more enrolled | Higher accuracy per chart |
| Time per chart | Not the headline outcome | Unchanged |
| Setting | Live recruitment | Retrospective records |

In the heart failure trial, the AI did the first read across a large pool and passed a shorter list to humans. Throughput went up because people spent their time on likelier candidates. In the oncology trial, the AI sat beside a human doing a full abstraction of every chart. Accuracy improved, but the human still read everything, so nobody saved time.

That is the same lesson radiology learned about triage: the benefit depends on whether the tool changes *who does what*, not just how well it reads.

## Where it gets hard

The research systems work on tidy inputs. Recruitment offices do not.

**Criteria are ambiguous.** "Adequate organ function" or "life expectancy over 12 weeks" invite interpretation. A model that is confident about a criterion the protocol team would debate is not being accurate; it is hiding the ambiguity.

**Evidence is scattered across time.** A prior therapy might appear only in a referral letter from three years ago. Retrieval over a long record is a different problem from reasoning over a one-paragraph synthetic case.

**Absence is not evidence.** If the chart never mentions a contraindication, the honest label is "not documented", not "not present". Systems need a third state, and the workflow needs a way to resolve it.

**Errors cut both ways.** A false exclusion means a patient never hears about a trial they qualified for, which is invisible. A false inclusion costs a coordinator's time and a patient's hopes. Teams should decide in advance which error they are tuning against.

## What this means for health-tech and engineering teams

- **Design for the first pass, not the final decision.** The randomised gains came from narrowing the pool for human review, with human confirmation kept in place.
- **Work criterion by criterion.** Per-criterion labels with cited evidence, as in TrialGPT, make review fast and errors visible. A single "eligible" score does neither.
- **Model "unknown" explicitly.** Three-way labels (met, not met, not documented) are more honest and route work better than forced binaries.
- **Measure the funnel.** Track candidates surfaced, confirmed eligible, approached and enrolled, by arm and by subgroup. The JAMA trial's equity check is a good template.
- **Watch for automation bias.** The oncology trial found it. Interfaces that show evidence before the AI's verdict, and audits of overturned suggestions, help.
- **Mind the data path.** These pipelines read identifiable clinical notes. Hosting, business associate agreements and logging need to be settled before a pilot, not after.

## The honest position

LLM-assisted trial matching has moved further than most medical AI applications: from benchmarks to two randomised evaluations in a short time. That is genuinely encouraging.

It is also early. One randomised trial covered a single heart failure study at one health system. The other used retrospective charts. Neither measured whether faster recruitment changed when trials finished or what they found. The benchmark numbers that get quoted most come from synthetic patients.

The fair summary is that language models are now good enough to do the first read, and that the evidence for doing so is real but narrow. The work for the next few years is less about better models than about the workflow around them: who sees what, in what order, with what evidence, and how anyone knows when the model was wrong.

**Sources**

- [Jin et al., Matching patients to clinical trials with large language models, Nature Communications 2024](https://www.nature.com/articles/s41467-024-53081-z)
- [Unlu et al., Manual vs AI-Assisted Prescreening for Trial Eligibility Using Large Language Models: A Randomized Clinical Trial, JAMA 2025](https://pubmed.ncbi.nlm.nih.gov/39960745/)
- [EurekAlert (Mass General Brigham): AI screening for heart failure clinical trial speeds up enrollment, February 17, 2025](https://www.eurekalert.org/news-releases/1073636)
- [Unlu et al., Retrieval-Augmented Generation-Enabled GPT-4 for Clinical Trial Screening (preprint; published in NEJM AI 2024)](https://pubmed.ncbi.nlm.nih.gov/38370719/)
- [Parikh, Kolla et al., Human-AI teaming to improve accuracy and efficiency of eligibility criteria prescreening for oncology trials, Nature Communications 2026](https://pubmed.ncbi.nlm.nih.gov/41634037/)
- [ClinicalTrials.gov](https://clinicaltrials.gov/)

**Media credits**:
- Hero image: TrialGPT architecture, Figure 1 from Jin et al., Nature Communications 2024 — [Nature](https://www.nature.com/articles/s41467-024-53081-z), CC BY 4.0 (a U.S. Government work), placed on a 16:9 canvas
- Diagram: randomised prescreening results — Big Matrix Solutions, based on [Unlu et al., JAMA 2025](https://pubmed.ncbi.nlm.nih.gov/39960745/)
