---
id: "105"
slug: "epic-sepsis-model-external-validation-lessons"
title: "What the Sepsis Model Taught Medical AI About External Validation"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/sepsis-prediction-lessons-cover.webp"
category: "Medical AI"
desc: "A widely deployed sepsis model looked very different once independent researchers tested it. Five years of follow-up studies turned one case into a working checklist for anyone evaluating clinical prediction models."
date: "Feb 22, 2027"
tags: ["Medical AI", "Sepsis", "External Validation", "Clinical Prediction Models", "Patient Safety"]
---

# What the Sepsis Model Taught Medical AI About External Validation

In 2021, researchers at the University of Michigan published an evaluation of a sepsis prediction model already running in hundreds of US hospitals. At their institution it discriminated poorly, missed two-thirds of sepsis cases, and fired alerts on nearly one in five hospitalised patients.

That paper, on the Epic Sepsis Model, became one of the most cited cautionary tales in clinical AI. What makes it worth revisiting is not the original finding but the five years of work that followed it. Together, those studies show almost every way a clinical prediction model can look better on paper than it does at the bedside, and what it takes to find out.

## The original finding

The Epic Sepsis Model (ESM) is a proprietary model built into Epic's EHR. It produces a risk score throughout a hospital stay, and hospitals choose a threshold that triggers an alert.

Wong and colleagues, writing in *JAMA Internal Medicine* in 2021, evaluated it retrospectively across 38,455 hospitalisations of 27,697 adult patients at Michigan Medicine between December 2018 and October 2019. Sepsis occurred in 2,552 hospitalisations (7%).

| Measure | Result |
|---|---|
| Hospitalisation-level AUROC | 0.63 |
| Patients with sepsis the ESM did not flag | 1,709 (67%) |
| Hospitalisations generating an alert (score 6 or higher) | 6,971 (18%) |
| Sepsis cases flagged that clinicians had not already treated with timely antibiotics | 183 (7%) |

The last row is the one that matters most. Of 2,552 patients with sepsis, the model identified only 183 who had not already received timely antibiotics, the group an early warning tool exists to help. Meanwhile it alerted on 18% of all hospitalisations, which the authors described as "a large burden of alert fatigue".

Their conclusion was unusually direct: the model's widespread adoption despite poor performance "raises fundamental concerns about sepsis management on a national level."

## Lesson one: timing hides inside the metric

The most instructive follow-up came from the same institution. Kamran and colleagues, in *NEJM AI* in 2024, asked a sharper question: how well does the model predict sepsis *before clinicians have already started acting on it*?

They identified orders that signal clinical suspicion (blood cultures, lactate, intravenous fluids and antibiotics) and evaluated only predictions made before any of them. Across 77,582 hospitalisations:

- Including all predictions before sepsis criteria were met, the AUROC was 0.62.
- Restricted to predictions before any sign of clinical recognition, it was 0.47, no better than chance.

The paper calls this label leakage. If a model's inputs include traces of the clinician's own suspicion, it can score well by recognising what clinicians have already noticed. That makes the AUROC look respectable while adding little new information at the moment it matters.

![AUROC for Epic sepsis models across four published external evaluations, with the 0.5 chance line](/assets/images/blog/diagrams/sepsis-prediction-lessons-1.svg)

*Diagram: Big Matrix Solutions, based on [Wong et al. 2021](https://pubmed.ncbi.nlm.nih.gov/34152373/), [Kamran et al. 2024](https://par.nsf.gov/servlets/purl/10522981) and [Wong et al. 2026](https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2845595).*

## Lesson two: models move when the population moves

The second lesson arrived with COVID-19. In a 2021 research letter in *JAMA Network Open*, Wong and colleagues counted ESM alerts at 24 hospitals across four health systems before and after each system's first COVID-19 case.

In the three weeks either side of that date:

- The share of patients generating sepsis alerts each day more than doubled, from 9% to 21%.
- Total hospital census fell by 35%.
- The number of alerts per day still rose by 43%.

Michigan paused ESM-generated alerts in April 2020 after nurses reported over-alerting. The authors noted the increase could reflect dataset shift (performance changing as the case mix changes) and that even accurate alerts can be disruptive when resources are stretched.

The general problem was set out in *NEJM* the same year by Finlayson and colleagues in "The Clinician and Dataset Shift in Artificial Intelligence". A model validated in one period and population can behave differently when either changes.

## Lesson three: a new version needs a new validation

Epic subsequently released a second version of the model. Two independent evaluations published in *JAMA Network Open* in 2026 look quite different from the original findings.

**Four health systems.** Wong and colleagues prospectively evaluated ESM v2 across 227,091 inpatient encounters at four large US health systems between August 2023 and March 2025, using Sepsis-3 criteria. Encounter-level AUROC ranged from 0.82 to 0.92 across sites, and from 0.80 to 0.90 when measured against clinician recognition of sepsis. Positive predictive value remained low, from 0.13 to 0.26, with a high alert burden and considerable variation between institutions.

**Nine hospitals, three definitions.** Dutta and colleagues evaluated the locally trained v2 model in silent deployment across 198,494 encounters at nine hospitals. AUROC was 0.89 against Sepsis-3, 0.94 against the CMS SEP-1 definition and 0.85 against the CDC Adult Sepsis Event definition. At the Sepsis-3 threshold the authors examined, PPV was 11.4%.

Three things stand out. Discrimination improved substantially. The result depends on the site and on which definition of sepsis you use. And low PPV means most alerts still go to patients who will not meet sepsis criteria. A better AUROC does not by itself fix alert burden.

## Lesson four: discrimination is not benefit

None of the studies above measured whether patients did better. That requires a different kind of evidence.

The closest prominent example comes from a different system, TREWS, developed at Johns Hopkins. In a prospective multi-site study published in *Nature Medicine* in 2022, 590,736 patients were monitored across five hospitals. Among 6,877 patients with sepsis identified by the alert before antibiotics, those whose alert was confirmed by a provider within three hours had lower adjusted in-hospital mortality (3.3 percentage points absolute, 18.7% relative) than those whose alert was not confirmed in that window.

That is encouraging, and it is still an observational comparison: clinicians who respond quickly may differ from those who do not. It shows what outcome evidence looks like, and how much harder it is to produce than an AUROC.

## The checklist that came out of it

The ESM story gives anyone evaluating a clinical prediction model a set of concrete questions.

| Question | Why it matters |
|---|---|
| Was it validated outside the developer, on our kind of patients? | Michigan's external AUROC for v1 was 0.63 |
| Does performance hold before clinicians act? | AUROC fell from 0.62 to 0.47 when this was enforced |
| What is the PPV at our threshold, and how many alerts per day? | Low PPV drives alert fatigue even with good AUROC |
| Which outcome definition was used? | v2 AUROC ranged from 0.85 to 0.94 by definition |
| What happens when the population shifts? | Alert rates more than doubled with COVID-19 |
| Is there evidence it changes outcomes? | Discrimination alone says nothing about benefit |

## What this means for health-tech and engineering teams

- **Run silently first.** Deploy in shadow mode at each site, log every score, and evaluate against local outcomes before any alert reaches a clinician. Both 2026 evaluations used data collected on site after implementation.
- **Evaluate against time of recognition.** Timestamp clinician actions such as cultures, lactate and antibiotics, and report performance on predictions made before them.
- **Report alert burden as a first-class metric.** Alerts per patient-day and per unit, number needed to evaluate, and PPV at the operating threshold belong next to the AUROC.
- **Monitor continuously.** Track alert rates and calibration over time and by unit, with thresholds that trigger review. A sudden change in alert volume is a signal, not just noise.
- **Version and revalidate.** Treat a new model version as a new model, with its own local validation, and keep records of which version produced which alert.
- **Plan for outcome evaluation.** If the goal is better care, design the deployment so that its effect on outcomes can be measured, ideally with staggered rollout or randomisation.

## The honest position

The Epic Sepsis Model is not a story about one bad model. Version 2, by the 2026 evaluations, discriminates far better than version 1 did at Michigan. It is a story about how little anyone knew about version 1 until independent researchers looked, and how many separate questions it took to understand what they found.

Clinical prediction models are now routinely bought, configured and switched on by health systems that did not build them. The lesson from sepsis is that the evaluation does not come with the software. Each hospital has to check that the model works on its own patients, before clinicians act, at a tolerable alert rate, and after the population changes. That is the price of using a model in clinical care, and it is lower than the price of not knowing.

**Sources**

- [Wong et al., External Validation of a Widely Implemented Proprietary Sepsis Prediction Model in Hospitalized Patients, JAMA Internal Medicine 2021](https://pubmed.ncbi.nlm.nih.gov/34152373/)
- [Kamran et al., Evaluation of Sepsis Prediction Models before Onset of Treatment, NEJM AI 2024](https://ai.nejm.org/doi/full/10.1056/AIoa2300032)
- [Wong et al., Quantification of Sepsis Model Alerts in 24 US Hospitals Before and During the COVID-19 Pandemic, JAMA Network Open 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC8605481/)
- [Finlayson et al., The Clinician and Dataset Shift in Artificial Intelligence, NEJM 2021](https://pubmed.ncbi.nlm.nih.gov/34260843/)
- [Wong et al., Multicenter Prospective Validation of an Updated Proprietary Sepsis Prediction Model, JAMA Network Open 2026](https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2845595)
- [Dutta et al., Performance of a Sepsis Prediction Model Across Different Sepsis Definitions, JAMA Network Open 2026](https://doi.org/10.1001/jamanetworkopen.2026.5599)
- [Adams et al., Prospective, multi-site study of patient outcomes after implementation of the TREWS machine learning-based early warning system for sepsis, Nature Medicine 2022](https://pubmed.ncbi.nlm.nih.gov/35864252/)

**Media credits**:
- Hero image: AUROC of ESM v2 versus v1 at four health systems, before Sepsis-3 positivity and before clinician recognition, Figure 2 from Wong et al., JAMA Network Open 2026 — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC12949446/), CC BY, placed on a 16:9 canvas
- Diagram: AUROC across evaluations — Big Matrix Solutions, based on the Wong 2021, Kamran 2024 and Wong 2026 studies listed above
