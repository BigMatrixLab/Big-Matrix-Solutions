---
id: "96"
slug: "ai-adoption-small-engineering-teams-90-day-plan"
title: "AI Adoption for Small Engineering Teams: A 90-Day Plan"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/small-team-ai-adoption.webp"
category: "Software Development"
desc: "Buying seats is not adoption. A three-phase plan for small teams to roll out AI coding tools with a baseline, guardrails and a decision at day 90, grounded in DORA and METR research."
date: "Feb 04, 2027"
tags: ["AI Adoption", "Engineering Management", "Developer Productivity", "DORA", "Software Development"]
---

# AI Adoption for Small Engineering Teams: A 90-Day Plan

Most small teams did not decide to adopt AI. It arrived one developer at a time: a personal subscription here, a free tier there, a chat window open next to the editor. Usage is high, policy is vague, and nobody can say whether the team ships faster than it did a year ago.

That last part is the problem. The research is now clear that AI tools help some teams and hurt others, and that how people *feel* about their speed is a poor guide to their actual speed. A small team cannot afford to guess.

This is a 90-day plan for turning scattered usage into a deliberate decision. It is sized for teams of roughly three to fifteen engineers, where there is no platform group and the lead is also writing code.

## What the evidence says

Two findings should shape the plan.

**AI amplifies whatever is already there.** Google's 2025 DORA report, based on survey responses from nearly 5,000 technology professionals, found that 90 percent of respondents use AI at work and more than 80 percent believe it has made them more productive. Its central conclusion: "AI doesn't fix a team; it amplifies what's already there." The report also found that AI adoption still has a negative relationship with software delivery stability. More change volume without strong testing and version control leads to more breakage.

**Perceived speed is not measured speed.** In an early-2025 randomised controlled trial, METR had 16 experienced open-source developers complete 246 real issues in repositories they knew well, with and without AI tools. Developers expected AI to speed them up by 24 percent and, afterwards, believed it had sped them up by 20 percent. Measured completion time went the other way: "they take 19% longer."

![METR chart comparing forecast speedups from experts and developers with the observed 19 percent slowdown when AI was allowed](/assets/images/blog/small-team-ai-adoption-metr.webp)

*Forecasts and self-reports against the observed result. Source: [METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), CC-BY*

METR is careful about what this does *not* show. It does not claim AI slows down most developers, or that the result holds for other teams, codebases or later tools. The lesson for a small team is narrower and more useful: you cannot judge AI adoption by asking people how it feels. You have to measure.

Developer sentiment points the same way. In Stack Overflow's 2025 survey, 84 percent of respondents were using or planning to use AI tools, but more of them distrusted the accuracy of the output (46 percent) than trusted it (33 percent). The most common frustration, cited by 66 percent, was AI solutions that are "almost right, but not quite."

## The plan at a glance

![Three-phase 90-day plan: days 1 to 30 baseline and rules, days 31 to 60 pilot on real work, days 61 to 90 decide](/assets/images/blog/diagrams/small-team-ai-adoption-1.svg)

*Diagram: Big Matrix Solutions, based on [DORA](https://cloud.google.com/blog/products/ai-machine-learning/from-adoption-to-impact-putting-the-dora-ai-capabilities-model-to-work) and [METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) findings.*

## Days 1 to 30: baseline and rules

### Record where you are

Without a baseline, day 90 is a vibes check. Pull the last three to six months of data for a handful of metrics you can collect without new tooling:

| Metric | Where it comes from | Why it matters |
|---|---|---|
| Lead time for changes | Git and deploy history | Is work reaching users faster? |
| Pull request size and review time | Your Git host | AI tends to produce bigger diffs |
| Change failure rate | Incidents, rollbacks, hotfixes | The DORA stability warning |
| Escaped defects | Bug tracker | Quality after release |
| Developer survey (5 questions) | A short form | Friction and trust, tracked over time |

Keep it small. Five numbers you actually look at beat a dashboard nobody opens.

### Write the AI policy

DORA's AI Capabilities Model lists a "clear and communicated AI stance" first among the practices that amplify AI's benefit, noting that ambiguity creates risk. For a small team, one page covers it:

- **Approved tools and accounts.** Company accounts only, with data-retention settings you have checked.
- **What may be shared.** Source code yes or no, customer data never, secrets never, with examples.
- **Ownership.** The author of a pull request owns every line in it, regardless of who or what typed it.
- **Disclosure.** Note significant AI assistance in the pull request description so reviewers calibrate.
- **Licensing.** How you handle generated code that may resemble third-party code.

### Pick two or three workflows

Do not pilot "AI for everything." Choose specific, frequent workflows where you can tell good output from bad:

- Writing tests for existing code
- Explaining and documenting unfamiliar modules
- Small, well-specified tickets such as bug fixes and endpoint additions
- Drafting migration scripts or refactors with strong test coverage

Avoid starting with the hardest problems: core architecture, security-sensitive code, or anything without tests.

## Days 31 to 60: pilot on real work

### Use real tickets, not demos

Every demo of an AI coding tool works. The question is whether it works on *your* codebase, with *your* conventions and *your* odd legacy module. Run the pilot on the normal backlog.

### Strengthen the safety net first

DORA's capabilities model highlights strong version control practices and working in small batches, because AI "can easily generate massive blocks of code, which are hard to review and test." Before or during the pilot:

- Set a soft limit on pull request size and hold to it for AI-assisted work too.
- Make sure CI runs the full test suite on every pull request.
- Require at least one human review on every change, with no exceptions for small AI-generated ones.

### Give the tools context

AI tools do much better with project context. DORA lists AI-accessible internal data as a core capability. In practice, for a small team, that means:

- A short repository guide (architecture, conventions, how to run tests) in a file the tools read.
- Clean, current READMEs for the main services.
- Consistent naming and formatting, enforced by linters rather than memory.

### Hold a weekly retro

Thirty minutes, same three questions each week. Where did AI save real time? Where did it cost time, through rework, debugging or review? What did we change in how we use it? Write the answers down; they are your qualitative data at day 90.

## Days 61 to 90: decide

### Compare against the baseline

Pull the same metrics for the pilot period. Look for movement in both directions:

- Lead time down and change failure rate flat or down: a real gain.
- Lead time down and change failure rate up: you are shipping faster and breaking more, exactly the pattern DORA warns about.
- Pull request size up and review time up: the bottleneck has moved to review.
- No measurable change, but people like the tools: possibly fine, as long as cost is acceptable and quality holds.

Small teams produce noisy data. Two months of a five-person team is not a study. Look for large, consistent effects and treat small ones as unknown.

### Then make three decisions

1. **Standardise** what clearly worked: put it in the team guide and onboarding.
2. **Adjust** what was mixed: narrower scope, better context, different tool.
3. **Stop** what did not work, explicitly, so people stop paying the hidden cost.

Set a date to repeat the review. Tools change quickly; a 90-day cycle keeps the decision current.

## A practical checklist

- Baseline metrics recorded before the pilot starts
- One-page AI policy written, shared and agreed
- Company accounts only, with data-retention settings reviewed
- Two or three specific workflows chosen for the pilot
- Pull request size limits and mandatory human review in place
- CI runs the full test suite on every change
- Repository guide written for both people and AI tools
- Weekly 30-minute retro with notes kept
- Day-90 comparison against the baseline, both speed and stability
- Explicit standardise, adjust or stop decision, with a date for the next review

## Closing thought

The small-team advantage is speed of decision. You do not need a steering committee or a vendor bake-off. You need a baseline, a short policy, a stronger safety net and the discipline to look at the numbers after 90 days. The teams that gain most from AI tools are not the ones that adopted earliest. They are the ones that already had good engineering habits and used AI to do more of what was already working, while checking that their sense of speed matched the data.

**Sources**

- https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report
- https://cloud.google.com/blog/products/ai-machine-learning/from-adoption-to-impact-putting-the-dora-ai-capabilities-model-to-work
- https://dora.dev/research/2025/dora-report/
- https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- https://survey.stackoverflow.co/2025/ai

**Media credits**:
- Hero image: DORA AI Capabilities Model diagram, Google Cloud (shown on a 16:9 background) — [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/from-adoption-to-impact-putting-the-dora-ai-capabilities-model-to-work). Licence not stated; © Google.
- In-body image: "Against Expert Forecasts and Developer Self-Reports" chart, METR — [metr.org](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/). CC-BY, as marked on the figure.
- Diagram: Big Matrix Solutions, based on DORA and METR findings.
