---
id: "77"
slug: "radiology-ai-triage-worklists-alert-fatigue"
title: "Radiology AI in the Workflow: Triage, Worklists and Alert Fatigue"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/radiology-ai-workflow.webp"
category: "Medical AI"
desc: "The same haemorrhage detector cut wait times at one hospital and changed nothing at another. The difference was not the model. It was where the flag landed in the radiologist's day."
date: "Dec 28, 2026"
tags: ["Medical AI", "Radiology", "Clinical Workflow", "Triage", "Alert Fatigue"]
---

# Radiology AI in the Workflow: Triage, Worklists and Alert Fatigue

Triage is one of the oldest jobs for AI in radiology. A model reads a head CT, suspects a bleed, and tries to get that scan in front of a radiologist sooner.

The model is only half of that sentence. The other half is "in front of a radiologist sooner", and that is a workflow problem, not an accuracy problem. The published evidence now shows this clearly: the same kind of detector can shorten the wait for a critical scan in one deployment and make no measurable difference in another, depending on how its output reaches the reading room.

## What the FDA actually cleared

Computer-aided triage has its own regulatory category. In February 2018 the FDA granted a De Novo request for Viz.ai's ContaCT, which flags suspected large vessel occlusion stroke on CT angiography and notifies a specialist. That created the classification "radiological computer aided triage and notification software" under 21 CFR 892.2080, so that later devices could follow through the 510(k) route.

The regulation's definition is worth reading closely, because it describes a narrow tool. The device notifies clinicians that time-sensitive images are available. It "does not mark, highlight, or direct users' attention to a specific location" in the image. And:

> "The device does not remove cases from a reading queue."

The regulation adds that the device operates in parallel with the standard of care, which remains the default for all cases. In other words, a triage device is allowed to change the *order* in which scans are read and who gets told about them. It is not allowed to decide that a scan does not need reading.

That framing matters for everything below. A triage tool's value is entirely about time. If it does not change when a positive scan gets read, it has not done its job, however accurate it is.

## Three ways to deliver one flag

The clearest evidence on delivery comes from UT Southwestern. O'Neill and colleagues introduced a commercial intracranial haemorrhage (ICH) detector into a busy neuroradiology practice in three phases between 2017 and 2019, and measured queue-adjusted wait and turnaround times against historical controls.

1. **A pop-up widget on an ancillary monitor.**
2. **A flag shown on the examination in the reading worklist.**
3. **The flag used to reprioritise the worklist.**

The first two did nothing measurable. Notification by widget or flag had no effect on queue-adjusted wait (P > .99) or turnaround time (P = .6). Only reprioritisation moved the numbers: wait time for AI-positive scans fell to 12.0 minutes, against 15.5 minutes for AI-negative scans. The reduction was largest for scans ordered as routine, which otherwise sat lowest in the queue.

Researchers at the same institution later applied reprioritisation to CT pulmonary angiography. In a before-and-after study of 2,501 examinations, mean report turnaround for scans positive for pulmonary embolism fell from 59.9 to 47.6 minutes. The gain came entirely from shorter wait time; the time spent actually reading did not change (26.5 vs 26.3 minutes). Again, routine-priority scans benefited most during working hours. Stat and urgent scans did not, because they were already at the top.

![Results from five radiology AI triage studies, contrasting notification-only delivery with worklist reprioritisation](/assets/images/blog/diagrams/radiology-ai-workflow-1.svg)

*Diagram: Big Matrix Solutions, based on [O'Neill et al. 2021](https://pubmed.ncbi.nlm.nih.gov/33937858/), [Batra et al. 2023](https://pubmed.ncbi.nlm.nih.gov/37095668/) and [Savage et al. 2024](https://pubmed.ncbi.nlm.nih.gov/39230402/).*

## The prospective study that found nothing

The strongest cautionary result is from the University of Alabama at Birmingham. Savage and colleagues ran a prospective single-centre study of a commercial ICH triage and notification system, published in AJR in 2024. It covered 9,954 non-contrast head CT examinations from 7,371 patients, read by neuroradiologists and emergency radiologists without AI in one phase and with it in the next.

The AI notified radiologists of positive results "through a widget with a floating pop-up display".

| Measure | Without AI | With AI |
|---|---|---|
| Accuracy | 99.5% | 99.2% |
| Sensitivity | 98.6% | 98.9% |
| Specificity | 99.8% | 99.3% |
| Mean report turnaround, ICH-positive | 147.1 min | 149.9 min |

There was no significant difference in accuracy, sensitivity or turnaround. Specificity was slightly but significantly *higher* without the AI. The authors' conclusion was blunt: the study "does not support use of AI assistance for ICH detection".

Read alongside the UT Southwestern work, the result is less a verdict on ICH detection than a confirmation of the delivery finding. A floating widget asks the radiologist to notice, interpret and act on an extra signal while doing something else. Reprioritisation changes what they open next without asking anything of them. The first competes for attention. The second does not.

It is also worth noticing how good the radiologists already were. When human sensitivity starts at 98.6%, there is very little room for an assistant to improve accuracy, and the only realistic benefit is speed.

## Where alert fatigue comes from

Alert fatigue is usually discussed as a false-positive problem, and false positives do matter. Every flag that turns out to be nothing teaches the reader to trust the next one a little less.

But the radiology evidence points at a wider cause: any signal that requires a decision costs attention, whether it is right or wrong. A pop-up that is correct 95% of the time still interrupts the case on screen. Multiply that across several algorithms, each with its own widget, sound and colour scheme, and the reading room becomes noisy in a way no single vendor is responsible for.

The design pattern that worked in the UT Southwestern studies sidesteps this. The radiologist does not acknowledge anything. The queue simply reorders.

## When the AI is wrong

Triage tools sit on the less risky side of radiology AI, because they change order rather than content. Tools that offer a finding or a category to the reader carry a different risk, and the evidence on it is uncomfortable.

In a 2023 experiment published in *Radiology*, Dratsch and colleagues had 27 radiologists read 50 mammograms with BI-RADS suggestions from what was presented as an AI system. In 12 of the 40 test cases, the suggestion was deliberately wrong. Accuracy collapsed when the suggestion was incorrect:

| Reader experience | Correct when AI was right | Correct when AI was wrong |
|---|---|---|
| Inexperienced | 79.7% | 19.8% |
| Moderately experienced | 81.3% | 24.8% |
| Very experienced | 82.3% | 45.5% |

Experience helped, but nobody was immune. This was a controlled experiment with a simulated system, not a deployment study, so it measures susceptibility rather than real-world harm. It is still a strong argument for keeping triage and detection outputs separate from the reader's own judgement wherever possible.

## The counter-example: triage that changes the work

The most rigorous evidence for AI in an imaging workflow comes from a design that changes who reads what. The Swedish MASAI trial randomised mammography screening participants either to standard double reading or to AI-supported screening, in which the AI's risk score sent lower-risk examinations to a single reader and the highest-risk ones to double reading.

The 2023 safety analysis of 80,033 women reported a similar cancer detection rate (6.1 vs 5.1 per 1,000) with a 44.3% lower screen-reading workload. The primary-endpoint analysis, published in *The Lancet* in 2026 on more than 105,000 women, found the interval cancer rate non-inferior (1.55 vs 1.76 per 1,000) with higher sensitivity and the same specificity.

That is a different kind of triage from ICH notification: it allocates reading effort rather than reordering a queue. It is also the kind of evidence most radiology AI still lacks, a randomised trial with a clinical endpoint.

## What this means for health-tech and engineering teams

- **Integrate with the worklist, not beside it.** The evidence favours changing reading order inside the PACS or worklist over separate widgets. That means engineering against RIS/PACS integration points, not just shipping a viewer.
- **Measure time, not just accuracy.** For triage, the outcome is wait and turnaround time for positive cases, adjusted for queue conditions. Instrument it before go-live so you have a baseline.
- **Expect the benefit in routine scans.** Both UT Southwestern studies found the gain concentrated in routine-priority orders. If your site already reads everything as stat, triage has little to reorder.
- **Count your alerts across vendors.** Alert burden is a property of the reading room, not of one product. Keep an inventory of every algorithm that can interrupt a radiologist, and its alert rate.
- **Separate suggestions from reads.** Where the product proposes a finding, design for the case where it is wrong: show it after the reader commits, or make overriding it effortless.
- **Plan a prospective check.** Retrospective accuracy is not the same as clinical benefit, as the AJR study shows. A short, pre-registered before/after measurement at your own site is cheap insurance.

## The honest position

Radiology AI triage works when it changes what happens next in the reading room, and does little when it only adds another thing to look at. That is not mainly a statement about model quality. It is a statement about where the output lands.

The regulatory category was written for exactly this: notify, reorder, never remove. The deployments that respected that shape, by quietly moving positive scans up the queue, saved minutes. The ones that asked radiologists to watch a second screen did not. For anyone building or buying in this space, the integration is the product.

**Sources**

- [FDA: FDA permits marketing of clinical decision support software for alerting providers of a potential stroke (February 13, 2018)](https://www.fda.gov/news-events/press-announcements/fda-permits-marketing-clinical-decision-support-software-alerting-providers-potential-stroke)
- [eCFR: 21 CFR 892.2080, Radiological computer aided triage and notification software](https://www.ecfr.gov/current/title-21/chapter-I/subchapter-H/part-892/subpart-C/section-892.2080)
- [O'Neill et al., Active Reprioritization of the Reading Worklist Using AI, Radiology: Artificial Intelligence 2021](https://pubmed.ncbi.nlm.nih.gov/33937858/)
- [Batra et al., Radiologist Worklist Reprioritization Using AI for CTPA, AJR 2023](https://pubmed.ncbi.nlm.nih.gov/37095668/)
- [Savage et al., Prospective Evaluation of AI Triage of Intracranial Hemorrhage on Noncontrast Head CT, AJR 2024](https://pubmed.ncbi.nlm.nih.gov/39230402/)
- [Ginat, Implementation of Machine Learning Software on the Radiology Worklist, Brain Sciences 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC8301803/)
- [Dratsch et al., Automation Bias in Mammography, Radiology 2023](https://pubmed.ncbi.nlm.nih.gov/37129490/)
- [Lång et al., MASAI clinical safety analysis, Lancet Oncology 2023](https://pubmed.ncbi.nlm.nih.gov/37541274/)
- [Gommers et al., MASAI interval cancer analysis, The Lancet 2026](https://pubmed.ncbi.nlm.nih.gov/41620232/)

**Media credits**:
- Hero image: AI triage widget alerting a radiologist to flagged studies on the PACS worklist, Figure 1 from Ginat, Brain Sciences 2021 — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8301803/), CC BY 4.0, placed on a 16:9 canvas
- Diagram: triage delivery and turnaround — Big Matrix Solutions, based on the O'Neill, Batra and Savage studies listed above
