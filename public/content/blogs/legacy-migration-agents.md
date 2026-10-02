---
id: "87"
slug: "migrating-legacy-code-with-ai-agents-playbook"
title: "Migrating Legacy Code With AI Agents: A Playbook"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/legacy-migration-agents.png"
category: "Software Development"
desc: "Google, Airbnb and Amazon have published what worked when they pointed LLMs at large migrations. The common pattern, the numbers behind it, and a playbook for doing it on your own codebase."
date: "Jan 17, 2027"
tags: ["Legacy Modernisation", "Code Migration", "Agentic AI", "Software Development"]
---

# Migrating Legacy Code With AI Agents: A Playbook

Every mature codebase carries a migration nobody wants to start. The test framework that was deprecated years ago. The ID type that is about to overflow. The language version that security keeps flagging. The work is well understood, enormous, and tedious, which is why it sits in the backlog.

It is also the kind of work AI agents are best suited to. Migrations are repetitive, the target is clearly defined, and success can be checked mechanically: it builds, the tests pass, behaviour is unchanged. Several large engineering organisations have now published what happened when they tried, and their reports agree on more than they differ.

## What the published migrations show

**Google.** A 2025 experience report, "How is Google using AI for internal code migrations?", covers several migrations inside a monorepo where the Ads code base alone is over 500 million lines. Converting 32-bit IDs to 64-bit in Google Ads, 80 percent of the code modifications in landed changes were fully AI-authored, and engineers estimated total migration time fell by 50 percent, *including* review and rollout. A JUnit3 to JUnit4 migration moved 5,359 files and more than 149,000 lines in three months, and about 87 percent of the AI-generated code was committed without change.

**Airbnb.** Airbnb migrated nearly 3,500 React component test files from Enzyme to React Testing Library. The work had been estimated at a year and a half by hand and took about six weeks. According to InfoQ's write-up of the engineering post, 75 percent of files migrated in the first four hours and 97 percent after four days; the remaining 3 percent or so were finished manually, using the LLM output as a starting point.

**Amazon.** Andy Jassy reported in 2024 that Amazon Q's code transformation brought the average Java 17 upgrade from "50 developer-days to just a few hours". He put the saving at the equivalent of 4,500 developer-years and an estimated $260 million in annualised efficiency gains, and said developers shipped 79 percent of the auto-generated code reviews without additional changes.

These are company-reported numbers, not independent audits. The useful part is the method, which is remarkably consistent.

## The shared pattern

None of these teams asked an agent to "migrate the codebase". All of them built a pipeline where the model does one narrow step and everything around it is deterministic. The cover image of this post, taken from Google's report, shows the shape: for each group of files, generate edits, run the build, fix it if needed, run the tests, fix those if needed, then keep the best result.

Three ideas recur:

**Deterministic tools find the work; the model does the edit.** Google's report has a section titled "LLM+AST, better together". Code search and syntax-tree analysis locate the places to change reliably; the model handles the variations that are too irregular for a codemod.

**Small units, validated independently.** Google splits work into file groups and runs build and tests on each. Airbnb moved each file through ordered steps (refactor Enzyme to RTL, fix Jest failures, run the linter, run the TypeScript compiler), validating at each one and calling the model again with the error details when a check failed.

**Retries beat clever prompts.** Airbnb found that retrying with the failure output fed back did more than prompt engineering. For the long tail, prompts grew to between 40,000 and 100,000 tokens, pulling in up to 50 related files and examples of previously migrated code.

## The playbook

![Five-stage migration pipeline: find, pin behaviour, agent transform, automated verify with failures fed back, and human review to land](/assets/images/blog/diagrams/legacy-migration-agents-1.svg)

*Diagram: Big Matrix Solutions, based on [Google](https://arxiv.org/abs/2501.06972) and [Airbnb via InfoQ](https://www.infoq.com/news/2025/03/airbnb-llm-test-migration/).*

### 1. Find every site deterministically

Before any model runs, produce the full list of files and locations to change using code search, the compiler or an AST query. This list is your progress tracker and your definition of done. An agent that discovers sites as it goes will miss some and you will not know which.

### 2. Pin current behaviour

The migration should change structure, not behaviour, so lock in what the code does now. Where tests are thin, add characterisation tests that record current outputs. For services, capture real request and response pairs and replay them against the migrated version. A migration with no behavioural baseline is a rewrite with extra steps.

### 3. Write the migration guide once

Turn the human migration recipe into a written rule set with worked before-and-after examples from your codebase. Google's JUnit migration used prompts that were essentially a list of the rules humans follow when doing it by hand. Good examples matter more than long instructions.

### 4. Transform in small groups, in parallel

One file or a tightly coupled group per task, each in its own branch or sandbox. Small units mean failures are cheap and progress is measurable. Airbnb's step-based design let them run hundreds of files concurrently.

### 5. Verify automatically and loop

Build, lint, type-check, run tests, compare against the pinned behaviour. Feed failures back to the model with the error output and retry up to a fixed cap. Files that hit the cap go to a human queue rather than looping forever.

### 6. Review and land in batches people can absorb

Google's JUnit team named the real bottleneck: "the speed at which engineers could review the changes". They deliberately limited how many changes they generated per week so reviewers were not overwhelmed. Send changes to the owners of the affected code, keep them small, and roll them out like any other change.

## Measuring progress

![Line chart of cumulative submitted changelists from AI-powered migrations at Google, rising from near zero in spring 2024 to over 2,000 by October 2024](/assets/images/blog/legacy-migration-agents-landed-cls.png)

*Landed changelists of AI-powered migrations, first three quarters of 2024. Source: [Nikolov et al., Google (arXiv)](https://arxiv.org/abs/2501.06972), CC BY 4.0*

Track the migration like a project, not a demo:

| Metric | What it tells you |
|---|---|
| Sites remaining (from step 1) | Real progress, independent of how busy the agent looks |
| First-pass success rate | How good the guide and examples are |
| Retries per file | Where the long tail is; cluster these to improve the guide |
| Human edits before merge | Hidden cost the headline numbers leave out |
| Review queue age | Whether review has become the bottleneck |

Measure end-to-end time including review and rollout, as Google did, rather than generation time. Generation is the cheap part.

## Where this does not work

The pattern depends on a mechanical definition of success. It is strong for framework upgrades, API replacements, type changes, test-library swaps and language-version bumps. It is weak for migrations that are really redesigns, such as splitting a monolith or changing a data model, where the target is a judgement call and "behaviour unchanged" is not the goal. For those, use agents for the mechanical sub-steps inside a human-led plan, often alongside a strangler-fig approach that replaces a system piece by piece.

It is also weak where the safety net is missing. With no tests and no way to replay real traffic, the verify step has nothing to check, and the loop will happily converge on code that compiles and is wrong.

## A working checklist

- **List every site deterministically** before the model touches anything.
- **Pin behaviour** with characterisation tests or recorded traffic.
- **Write the rule set and real examples** once; iterate on them using failure clusters.
- **One small unit per task**, isolated, in parallel.
- **Automate verification** and feed failures back, with a retry cap and a human queue.
- **Throttle output to review capacity**, and route changes to code owners.
- **Report end-to-end time**, including review and rollout.
- **Keep redesigns human-led**; use agents for the mechanical parts.

## The takeaway

The published results are striking, but what made them work was not the model. It was the scaffolding: deterministic discovery, a behavioural baseline, small validated steps, retries and a review process sized to human attention. Teams that build that scaffolding can finally clear the migrations that have sat in the backlog for years. Teams that skip it will get fast output they have to review line by line, which was the expensive part all along.

**Sources**

- https://arxiv.org/abs/2501.06972
- https://medium.com/airbnb-engineering/accelerating-large-scale-test-migration-with-llms-9565c208023b
- https://www.infoq.com/news/2025/03/airbnb-llm-test-migration/
- https://www.linkedin.com/posts/andy-jassy-8b1615_one-of-the-most-tedious-but-critical-tasks-activity-7232374162185461760-AdSz/
- https://simonwillison.net/2024/Aug/24/andy-jassy-amazon-ceo/
- https://martinfowler.com/bliki/StranglerFigApplication.html

**Media credits**:
- Hero image: "Multi-stage code migration execution" figure from Nikolov et al., "How is Google using AI for internal code migrations?" (arXiv:2501.06972), CC BY 4.0, shown on a white background — [arXiv](https://arxiv.org/abs/2501.06972)
- In-body figure: "Landed changelists of AI-powered migrations" from the same paper, CC BY 4.0 — [arXiv](https://arxiv.org/abs/2501.06972)
- In-body diagram: Big Matrix Solutions, drawn from [Google](https://arxiv.org/abs/2501.06972) and [InfoQ's report on Airbnb](https://www.infoq.com/news/2025/03/airbnb-llm-test-migration/)
