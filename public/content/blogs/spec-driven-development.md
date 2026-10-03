---
id: "94"
slug: "spec-driven-development-writing-for-agents"
title: "Spec-Driven Development: Writing for Agents Before Writing Code"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/spec-driven-development.webp"
category: "Software Development"
desc: "Spec Kit, Kiro and similar tools put a written specification in front of every coding agent run. What a useful spec contains, how the workflow runs, and when it is more ceremony than it is worth."
date: "Jan 31, 2027"
tags: ["Spec-Driven Development", "Agentic AI", "Requirements", "Developer Tools"]
---

# Spec-Driven Development: Writing for Agents Before Writing Code

For most of software history, the code was the specification that mattered. Requirements documents drifted, design docs went stale, and the only artefact guaranteed to be accurate was the thing that ran.

Coding agents shift that balance. When an agent can produce a plausible implementation in minutes, the expensive mistake is no longer slow typing. It is building the wrong thing quickly. Spec-driven development (SDD) is the name that has settled on the response: write down what you want in a structured form, have the agent work from that, and treat the written spec as a first-class, version-controlled artefact.

Den Delimarsky, introducing GitHub's Spec Kit, put the motivation simply: teams treat coding agents like search engines when they should treat them "like literal-minded pair programmers".

## What "spec" means here

The word is overloaded, so it helps to be precise. Birgitta Böckeler's analysis on martinfowler.com distinguishes three levels:

| Level | Definition | In practice |
|---|---|---|
| Spec-first | A spec is written first and used for the task at hand | Most teams start here |
| Spec-anchored | The spec is kept after the task and evolves with the feature | Specs live in the repo next to code |
| Spec-as-source | Humans edit only the spec; code is generated from it | Experimental; few teams run this way |

Most of the practical value sits in the first two. Spec-as-source is an interesting idea, but it assumes generation is reliable enough that nobody needs to read the output, and that is not the situation most teams are in.

## The workflow

![Spec-driven development phases: a constitution above specify, plan, tasks and implement, with human review between each phase and implementation findings flowing back into the spec](/assets/images/blog/diagrams/spec-driven-development-1.svg)

*Diagram: Big Matrix Solutions, based on [GitHub](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/).*

The tools differ in detail but converge on the same phases.

**GitHub Spec Kit** is an MIT-licensed open-source toolkit with a CLI called `specify`. It scaffolds templates and slash commands into the coding agent you already use. Its core sequence is a project **constitution**, then **specify**, **plan**, **tasks** and **implement**. The exact command names have changed between releases, so check the README of the version you install. GitHub's launch post describes the rule that holds it together: "you don't move to the next one until the current task is fully validated."

**Kiro**, AWS's agentic IDE, generates three files per spec: `requirements.md` (user stories and acceptance criteria), `design.md` (architecture and implementation approach) and `tasks.md` (discrete, trackable implementation tasks).

What each phase is for:

1. **Specify:** the what and the why. User journeys, success criteria, explicit non-goals. No technology choices.
2. **Plan:** the how. Stack, architecture, data model, constraints, integration points.
3. **Tasks:** the plan broken into small units, each independently reviewable and testable.
4. **Implement:** the agent works through tasks, producing focused diffs a human can review.

The constitution sits above all of them: the project-wide rules that every plan and task must respect.

## What a useful spec contains

The failure mode of SDD is a long document that reads well and constrains nothing. A spec earns its keep when an agent, or a new team member, could not reasonably misread it. A compact example:

```markdown
# Feature: Export invoices as CSV

## Why
Finance reconciles invoices in spreadsheets and currently copies rows by hand.

## Users and journeys
- A finance admin filters invoices by date range and exports the result.

## Acceptance criteria
- WHEN an admin exports a filtered list, THEN the CSV contains exactly the rows shown.
- Amounts are written in minor units with a separate currency column.
- Exports over 50,000 rows run as a background job and email a download link.
- Non-admin users cannot see the export button or call the endpoint (403).

## Out of scope
- PDF export. Scheduled exports. Custom column selection.

## Open questions
- Should voided invoices be included? (Owner: finance lead)
```

The sections doing the work are **acceptance criteria** written so each one can become a test, **out of scope** so the agent does not helpfully build extras, and **open questions** so ambiguity is visible instead of being resolved silently by whichever guess the model makes.

## The constitution: rules that outlive features

Individual specs describe features. The constitution, or whatever your tool calls it, captures the rules that apply to all of them:

- Architectural boundaries ("the web layer never queries the database directly").
- Required practices ("every new endpoint has an integration test").
- Technology constraints ("no new runtime dependencies without an ADR").
- Security and data rules ("PII never appears in logs").

Keep it short enough that it is read. A constitution is most valuable when the plan phase is checked against it explicitly, so a violation shows up as a review comment on the plan rather than in a pull request.

## Where it goes wrong

The approach has thoughtful critics, and their objections are useful design constraints.

**Ceremony out of proportion to the task.** Böckeler tried Kiro on a small bug fix and got "4 'user stories' with a total of 16 acceptance criteria". A process sized for features is waste on one-line fixes.

**Review moves rather than disappears.** She also wrote that she would "rather review code than all these markdown files". Generated specs can be long, and reviewing a verbose spec is not obviously easier than reviewing a small diff.

**Agents still ignore instructions.** A spec reduces ambiguity; it does not guarantee compliance. In one of Böckeler's trials, the agent read notes describing classes that already existed, treated them as a new specification and generated them all over again, creating duplicates. She files this under a false sense of control. The implementation still needs review and tests against the acceptance criteria.

**Specs rot.** A spec-anchored approach only works if specs are updated when behaviour changes. Otherwise the agent works from an outdated description, which is worse than none.

## Right-sizing the process

Match the weight of the spec to the size and risk of the change:

| Change | Spec weight |
|---|---|
| Bug fix, small refactor | A clear ticket: expected behaviour, reproduction, done-when |
| New endpoint or component | Short spec: acceptance criteria, out of scope |
| New feature across layers | Full flow: spec, plan, tasks, with review between phases |
| Cross-team or regulated change | Full flow plus constitution check and named sign-off on the spec |

The question to ask is not "are we doing SDD?" but "how much ambiguity is in this change, and what does it cost if the agent guesses wrong?"

## Keeping specs alive

- **Commit specs next to the code** they describe, and review spec changes in the same pull request as the implementation.
- **Review the spec diff first.** If the spec change is wrong, the code review is wasted.
- **Link tests to acceptance criteria**, so a criterion without a test is visible.
- **Close the loop.** When implementation reveals the spec was wrong, fix the spec, not only the code.

## A working checklist

- **Write the why, the criteria and the non-goals** before any agent runs.
- **Make every acceptance criterion testable.**
- **List open questions** with owners, rather than letting the agent decide them.
- **Keep a short constitution** and check plans against it.
- **Review between phases**; do not let the agent run from spec to code unattended on large work.
- **Right-size**: tickets for fixes, full flow for features.
- **Version specs with code** and update them when behaviour changes.

## The point of writing it down

Spec-driven development is not a new idea in new clothes so much as an old discipline that became economically urgent. When implementation was slow, an ambiguous requirement surfaced in conversation while the code was being written. When implementation takes minutes, ambiguity surfaces as a finished pull request that does the wrong thing.

Writing the spec first moves that conversation back to where it is cheap. The teams that get value from it treat the spec as the thing to get right, keep it as small as the change allows, and resist turning it into paperwork.

**Sources**

- https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
- https://github.com/github/spec-kit
- https://developer.microsoft.com/blog/spec-driven-development-spec-kit
- https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
- https://kiro.dev/docs/specs/

**Media credits**:
- Hero image: Spec Kit's specify command running in VS Code, final frame of an animation from Den Delimarsky, "Diving Into Spec-Driven Development With GitHub Spec Kit", Microsoft for Developers blog, shown on a white background. © Microsoft, used for editorial reference — [Microsoft for Developers](https://developer.microsoft.com/blog/spec-driven-development-spec-kit)
- In-body diagram: Big Matrix Solutions, drawn from [GitHub's Spec Kit announcement](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
