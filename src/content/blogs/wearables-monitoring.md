---
id: "91"
slug: "wearables-remote-monitoring-early-warning"
title: "Wearables and Remote Monitoring: From Step Counts to Early Warning"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/wearables-monitoring.jpg"
category: "Medical AI"
desc: "Consumer watches now carry FDA-cleared alerts, and Medicare pays for remote monitoring. The evidence shows what an alert from the wrist is worth, and where the regulatory line sits."
date: "Jan 25, 2027"
tags: ["Medical AI", "Wearables", "Remote Patient Monitoring", "FDA", "Digital Health"]
---

# Wearables and Remote Monitoring: From Step Counts to Early Warning

A decade ago, a wrist-worn sensor counted steps. Now some of them carry FDA-cleared notifications for irregular heart rhythm and possible hypertension, and Medicare pays clinicians to review data sent from patients' homes.

The pitch is early warning: catch the problem between appointments, before it becomes an admission. The evidence supports a narrower version of that pitch than the marketing does. It also shows that the hard part is rarely the sensor. It is what happens after the alert.

## The line between wellness and medicine

The first question for any wearable feature is regulatory, and the FDA clarified the answer when it reissued its *General Wellness: Policy for Low Risk Devices* guidance on January 6, 2026, replacing the 2019 version.

The updated guidance says non-invasive products that estimate physiological parameters, including blood pressure, oxygen saturation and heart rate variability, may be general wellness products if their outputs are intended solely for wellness. Such products may show values, ranges, trends and baselines in the context of sleep, activity, stress or recovery.

The line is crossed by intent and by behaviour. A product is not a wellness product if it is meant for "screening, diagnosis, monitoring, alerting, or management" of a disease. The guidance also excludes products whose labelling or interface includes:

- references to specific diseases, clinical conditions or diagnostic thresholds;
- "alerts, alarms, or prompts that recommend or require specific clinical action";
- treatment guidance.

For anyone building in this space, that is the most useful sentence in the document. **Early warning is a medical claim.** A trend chart of overnight heart rate can be wellness. A notification telling the user to see a doctor about it generally is not.

## What an alert from the wrist is worth

Two very large studies give the best picture of what happens when a consumer device starts flagging possible disease.

**The Apple Heart Study** (NEJM, 2019) enrolled 419,297 participants without known atrial fibrillation. Over a median of 117 days, 2,161 (0.52%) received an irregular pulse notification. Those notified were offered a telehealth visit and mailed an ECG patch.

**The Fitbit Heart Study** (Circulation, 2022) enrolled 455,699 participants and tested a photoplethysmography algorithm across a range of Fitbit devices. 4,728 participants received an irregular heart rhythm detection.

![Funnels from enrolment to confirmed atrial fibrillation in the Apple and Fitbit heart studies](/assets/images/blog/diagrams/wearables-monitoring-1.svg)

*Diagram: Big Matrix Solutions, based on [Perez et al., NEJM 2019](https://pubmed.ncbi.nlm.nih.gov/31722151/) and [Lubitz et al., Circulation 2022](https://pubmed.ncbi.nlm.nih.gov/36148649/).*

| | Apple Heart Study | Fitbit Heart Study |
|---|---|---|
| Enrolled | 419,297 | 455,699 |
| Alerted | 2,161 (0.52%) | 4,728 |
| Analysable ECG patches after alert | 450 | 1,057 |
| AF found on the later patch | 34% | 32.2% |
| PPV when an alert fired during patch wear | 0.84 | 98.2% |

The two numbers in the last two rows answer different questions, and the difference is the most important thing to understand about wearable alerts.

**When an alert fires, is the rhythm really AF at that moment?** Mostly yes. When a second alert happened while participants were wearing the patch, it coincided with AF on the ECG 84% of the time in the Apple study and 98.2% in the Fitbit study.

**Does an alert mean the patient will be found to have AF on follow-up?** Only about a third of the time. Atrial fibrillation can come and go, and in the Apple study patches were applied, on average, 13 days after the notification. Many alerts were probably real episodes that had stopped by the time anyone looked.

Both studies were siteless and pragmatic, which is a strength, but they also had heavy attrition between alert and confirmation. Of 2,161 notified participants in the Apple study, 450 returned analysable patches. Neither study was designed to show that detection improved outcomes such as stroke.

## From rhythm to blood pressure

The more recent step is hypertension. In September 2025 the FDA cleared Apple's Hypertension Notification Feature (510(k) K250507). It analyses 30 days of optical heart sensor data and notifies users if it sees signs of hypertension. It does not measure blood pressure or show a reading. It is intended for adults aged 22 and over without a prior hypertension diagnosis, and not for use in pregnancy.

Apple's validation paper reports on 1,863 participants with usable data:

| Measure | Result |
|---|---|
| Overall sensitivity | 41.2% |
| Sensitivity, stage 2 hypertension | 53.7% |
| Overall specificity | 92.3% |
| Specificity, normal blood pressure | 95.3% |

This is a screening design that deliberately trades sensitivity for few false alarms. Most people with hypertension in the study would not have been notified, and Apple's own paper says onboarding reminds users that not everyone with hypertension will receive a notification. A notification is a prompt to take cuff readings, not a diagnosis, and silence is not reassurance.

## Remote patient monitoring: the clinical version

Consumer alerts are one half of the field. The other is remote patient monitoring (RPM), in which clinicians prescribe connected devices (blood pressure cuffs, scales, pulse oximeters) and review the data.

Medicare's payment rules shape how this is done. For 2026, the CPT Editorial Panel and CMS added a device-supply code for 2 to 15 days of data in a 30-day period, alongside the existing 16 to 30 day code, and a code for the first 10 minutes of monthly treatment management. Shorter monitoring episodes became billable.

Oversight has lagged growth. A September 2024 report from the HHS Office of Inspector General found RPM use in Medicare rose dramatically between 2019 and 2022, and that about 43% of enrollees who received RPM did not receive all three components of the service. It also noted that Medicare lacked basic oversight data, including who ordered the monitoring. The OIG asked CMS to require that information on claims.

The pattern is familiar from other digital health programmes: payment arrives before the evidence about which patients benefit, and billing becomes the measure of activity.

## Why early warning is hard

The sensor is usually the easy part. The hard parts are around it.

**Base rates.** Most people wearing a device do not have the condition. Even a specific alert produces many false positives at population scale, and each one becomes a clinic visit, a patch, or an anxious user.

**Intermittency.** Many conditions worth catching come and go. A real alert may be impossible to confirm later, which makes it hard to tell a true signal from a false one in routine care.

**Who receives the alert.** A consumer notification goes to the patient. An RPM reading goes to a care team that has to triage it, often outside working hours. Without a defined response, a monitoring programme is a data stream nobody is watching.

**Population shift.** Validation cohorts are not the users. The Fitbit study population had a median age of 47 and was 73% White; the conditions these products target are more common in older people.

## What this means for health-tech and engineering teams

- **Decide your regulatory side early.** If the product will alert users about a condition, plan for FDA clearance. If it will stay wellness, keep disease references and action prompts out of the interface, the marketing and the notification copy.
- **Report both kinds of PPV.** Say how often an alert matches the condition at the time, and how often follow-up confirms it. Users and clinicians need both.
- **Design the follow-up path.** The Apple and Fitbit studies built telehealth visits and ECG patches into the protocol. A product that alerts without a route to confirmation hands the problem to primary care.
- **Make silence explicit.** For low-sensitivity screens, tell users clearly that no notification does not rule anything out.
- **Build the clinician view for triage.** RPM dashboards should rank patients by need and show trends against the patient's own baseline, not stream every reading.
- **Log the service, not just the data.** The OIG's findings are about missing components and missing orders. Capture who ordered monitoring, when data was reviewed and what action followed.

## The honest position

Wearables have earned a place in medicine for a specific job: noticing something that might be wrong, in people who would otherwise not be checked, and sending them for proper testing. The large AF studies show that job can be done at scale with alerts that are usually right in the moment. Hypertension notification shows that cuffless screening can be cleared, with deliberately modest sensitivity.

What the evidence does not yet show is that these alerts improve outcomes, or that remote monitoring programmes as currently billed help the patients enrolled in them. The step from step count to early warning is real. The step from early warning to better care still depends on what clinicians and health systems do once the notification arrives.

**Sources**

- [FDA: General Wellness: Policy for Low Risk Devices, guidance issued January 6, 2026](https://www.fda.gov/media/90652/download)
- [Perez et al., Large-Scale Assessment of a Smartwatch to Identify Atrial Fibrillation, NEJM 2019](https://pubmed.ncbi.nlm.nih.gov/31722151/)
- [Lubitz et al., Detection of Atrial Fibrillation in a Large Population Using Wearable Devices: The Fitbit Heart Study, Circulation 2022](https://pubmed.ncbi.nlm.nih.gov/36148649/)
- [FDA 510(k) database: K250507, Hypertension Notification Feature](https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K250507)
- [Apple: Hypertension Notification Feature on Apple Watch, validation paper, September 2025](https://www.apple.com/health/pdf/Hypertension_Notifications_Validation_Paper_September_2025.pdf)
- [Apple Newsroom: Apple debuts Apple Watch Series 11, September 2025](https://www.apple.com/newsroom/2025/09/apple-debuts-apple-watch-series-11-featuring-groundbreaking-health-insights/)
- [HHS OIG: Additional Oversight of Remote Patient Monitoring in Medicare Is Needed (OEI-02-23-00260), September 2024](https://oig.hhs.gov/reports/all/2024/additional-oversight-of-remote-patient-monitoring-in-medicare-is-needed/)
- [Federal Register: CY 2026 Physician Fee Schedule final rule, November 5, 2025](https://www.federalregister.gov/documents/2025/11/05/2025-19787/medicare-and-medicaid-programs-cy-2026-payment-policies-under-the-physician-fee-schedule-and-other)

**Media credits**:
- Hero image: hypertension notification on iPhone and Apple Watch — [Apple Newsroom](https://www.apple.com/newsroom/2025/09/apple-debuts-apple-watch-series-11-featuring-groundbreaking-health-insights/), Apple press image, placed on a 16:9 canvas
- Diagram: AF alert funnels — Big Matrix Solutions, based on [Perez et al. 2019](https://pubmed.ncbi.nlm.nih.gov/31722151/) and [Lubitz et al. 2022](https://pubmed.ncbi.nlm.nih.gov/36148649/)
