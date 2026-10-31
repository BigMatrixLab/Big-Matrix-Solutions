---
id: "107"
slug: "measuring-roi-of-ai-projects-honestly"
title: "Measuring the ROI of AI Projects Honestly"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/ai-roi.png"
category: "Industry Analysis"
desc: "Developers who felt 20% faster were measured 19% slower. Why AI return-on-investment figures so often mislead, what the best controlled studies actually found, and a method for measuring your own projects."
date: "Feb 26, 2027"
tags: ["Industry Analysis", "AI ROI", "Productivity", "Measurement", "AI Strategy"]
---

# Measuring the ROI of AI Projects Honestly

In early 2025, the research group METR ran a randomised controlled trial with 16 experienced open-source developers working on their own projects. Before starting, the developers predicted that AI tools would make them 24% faster. When AI was allowed, they actually took **19% longer** to finish their tasks. Afterwards, they still believed AI had sped them up by 20%.

That gap between perceived and measured productivity is the main problem in AI return-on-investment work. Most enterprise ROI figures rest on the measurement that study shows to be unreliable: people reporting how much time they think they saved. This guide covers what the better studies found, why AI ROI is hard to measure, and a method that holds up when a CFO asks how the number was produced.

## What controlled studies have found

The strongest evidence comes from studies with a control group. Their results do not point one way.

| Study | Setting | Finding |
|---|---|---|
| Brynjolfsson, Li and Raymond (QJE, 2025) | 5,172 customer-support agents, staggered rollout of an AI assistant | Issues resolved per hour up 14% on average; largest gains for novice and less-skilled workers, minimal for the most experienced |
| Dell'Acqua et al. (Harvard Business School working paper) | 758 BCG consultants, pre-registered experiment | On tasks inside AI's capability: 12.2% more tasks, 25.1% faster, over 40% higher quality. On a task outside it: 19 percentage points less likely to be correct |
| METR (July 2025) | 16 experienced developers, 246 real issues, randomised | 19% slower with AI allowed, despite believing they were faster |
| METR follow-up (February 2026) | 57 developers, 800+ tasks | Point estimates suggest speed-ups, but METR called the signal unreliable because developers increasingly refused to work without AI |

Three lessons follow.

**The effect depends on the task.** The consulting study's "jagged frontier" is the clearest example. The same tool raised quality on one kind of task and lowered accuracy on another. Averaging the two hides both.

**The effect depends on the worker.** In customer support, the gains went mostly to novices. For experts working in code they knew well, METR found a slowdown in 2025. Rolling out a tool across a whole organisation mixes groups that respond very differently.

**Measurement itself is fragile.** METR's 2026 update is a useful warning. When people will not work without the tool, you can no longer form a clean control group. Building one in early, before a tool becomes standard, is far easier than later.

## Why most AI ROI numbers mislead

Large surveys of enterprise AI produce headline figures in both directions. MIT NANDA's 2025 *GenAI Divide* report, for example, said 95% of organisations were getting zero return from generative AI pilots, a figure that drew criticism over its methodology. Whatever the true number, the same errors recur:

- **Self-reported time saved.** As METR showed, people's sense of speed-up is not a measurement.
- **Activity instead of outcome.** Counting messages sent to an assistant, lines of code generated or documents summarised says nothing about whether the business got faster, cheaper or better.
- **Time saved is not money saved.** Twenty minutes saved per person per day creates value only if the time goes to something else that matters, or headcount plans change. Otherwise it is slack.
- **Missing costs.** Pilot budgets count licences and API fees. They miss integration, evaluation, the human review needed to catch errors, rework when errors get through, and change management.
- **Quality ignored.** Faster output with more defects can have negative ROI once downstream costs land.
- **Selection bias.** Enthusiastic early adopters are not representative, and pilots are often run on the tasks best suited to the tool.

![Comparison of costs commonly counted in AI pilot ROI estimates against the fuller set of costs and outcomes an honest calculation needs](/assets/images/blog/diagrams/ai-roi-1.svg)

*Diagram: Big Matrix Solutions. Illustrative checklist, not data.*

## A method that holds up

### 1. Pick one outcome metric before you start

Choose a metric the business already tracks and cares about: tickets resolved per agent-hour, days from claim to payout, defects escaping to production, cost per processed invoice. Record it for at least several weeks before the tool arrives. Add a **quality guard-rail metric**, such as customer satisfaction, error rate or rework rate, so that speed bought at the cost of quality shows up.

### 2. Build a comparison group

The gold standard is randomisation: by person, team or task. If that is not possible, use a **staggered rollout**, as in the customer-support study, where groups adopt at different times and the not-yet-adopted groups act as the control. At the very least, compare against the same team's pre-period and account for seasonality. Do this early. Once everyone has the tool, the chance is gone.

### 3. Count the full cost

| Cost line | Often missed because |
|---|---|
| Licences and inference | Usually counted, but inference scales with usage and can grow faster than planned |
| Integration and data work | Sits in IT budgets, not the pilot's |
| Evaluation and monitoring | Ongoing, not one-off; needed again on every model change |
| Human review | Hidden in existing staff time |
| Rework and error handling | Shows up weeks later, in other teams |
| Training and change management | Treated as overhead |
| Governance and compliance | Risk assessments, documentation, audits |

### 4. Convert the outcome to money carefully

Translate the measured difference between groups into money only through a mechanism you can name: fewer contractor hours, avoided hires, faster cash collection, lower error-related losses, revenue from capacity that was actually used. Where no mechanism exists, report the operational gain without a money figure rather than inventing one.

### 5. Report a range and revisit

Report ROI as a range with its assumptions, not a single number. Re-measure at six and twelve months. Novelty effects fade, model changes shift quality, and usage-based costs move. A pilot that pays back in month three can look different in month twelve.

## A worked example (hypothetical)

Suppose a claims team of 40 adopts an AI drafting assistant. Twenty handlers get it in month one and twenty in month three. Over those two months, the early group closes 9% more claims per week than the later group, and the reopened-claim rate, the quality guard-rail, does not change. That 9% is the measured effect. Self-reported time savings, which in a survey might have been 30%, are not used.

The finance case then asks what the 9% buys. If the team had planned two hires to handle growth, the gain may avoid one. That avoided salary is the benefit. Licences, integration, the evaluation suite, review time from a senior handler and training are the costs. Report a range, because the 9% has a confidence interval, and repeat the comparison at month twelve.

The numbers here are invented to show the method. They are not a benchmark.

## For leadership: questions to ask of any AI ROI claim

- What was the comparison group, and how were people or tasks assigned to it?
- Is the gain measured on a business outcome or on activity?
- Which costs are included, and who carries the ones that are not?
- What happened to quality?
- Where did the saved time go?
- Is the result from a representative group, or from volunteers on chosen tasks?

If a claim cannot answer the first two questions, treat it as a hypothesis, not a result.

## The bottom line

AI tools can produce real, measurable gains. A 14% productivity rise across thousands of support agents is a large effect by any standard. They can also make skilled people slower while convincing them of the opposite. The difference is rarely visible without a baseline, a comparison group and a full account of costs. Measuring AI honestly costs a few weeks of setup and some discipline about what counts as evidence. It is also the only way to know which projects to scale and which to stop, and in a period of heavy AI spending, that knowledge is where the return comes from.

**Sources**

- https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- https://metr.org/blog/2026-02-24-uplift-update/
- https://ideas.repec.org/a/oup/qjecon/v140y2025i2p889-942..html
- https://www.nber.org/papers/w31161
- https://www.hbs.edu/faculty/Pages/item.aspx?num=64700
- https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf
- https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf
- https://virtualizationreview.com/articles/2025/08/19/mit-report-finds-most-ai-business-investments-fail-reveals-genai-divide.aspx

**Media credits**:
- Hero image: "Average Developer Forecasts vs. Observed Implementation Times" chart from *Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity* — [METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/). Reproduced for commentary; METR's reuse terms are not stated on the page.
- In-body diagram: AI ROI cost checklist — Big Matrix Solutions, illustrative.
