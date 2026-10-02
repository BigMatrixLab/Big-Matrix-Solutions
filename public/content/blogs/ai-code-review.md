---
id: "73"
slug: "ai-code-review-what-it-catches-and-misses"
title: "AI Code Review in Practice: What It Catches and What It Misses"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/ai-code-review.png"
category: "Software Development"
desc: "AI reviewers resolve real problems and add real noise. What the studies show, where the blind spots are, and how to wire one into review without slowing everything down."
date: "Dec 20, 2026"
tags: ["Code Review", "AI Tools", "Developer Productivity", "Software Quality"]
---

# AI Code Review in Practice: What It Catches and What It Misses

Most teams now have a bot that comments on pull requests. Some installed it on purpose, some got it bundled with a platform plan, and a surprising number have never decided what it is *for*.

That matters, because an AI reviewer is not a smaller human reviewer. It is good at a different set of problems, it fails in different ways, and it has a cost that teams tend to notice late: noise. Used well, it takes the mechanical part of review off people's plates. Used badly, it adds a second inbox to every pull request and makes merges slower.

This is a practical guide to the first outcome.

## What the evidence actually says

There is enough published data to move past vendor claims.

**Google's internal system.** In 2023 Google described a model that proposes code edits in response to reviewer comments. Offline, it "addresses 52% of comments with a target precision of 50%". In production, 40 to 50 percent of previewed suggested edits were applied by authors. The design choice worth copying is the explicit precision target: the team traded coverage for suggestions people would trust, and filtered out low-confidence predictions before anyone saw them.

**An industrial study of an LLM reviewer.** A study at ICSE 2025 (Cihan et al.) followed a company that deployed a reviewer built on the open-source Qodo PR Agent. Across three projects with 4,335 pull requests, 1,568 got automated reviews. 73.8 percent of automated comments were marked resolved, which sounds like a win, but average pull request closure time rose from 5 hours 52 minutes to 8 hours 20 minutes. Developers reported a minor quality improvement and also "faulty reviews, unnecessary corrections, and irrelevant comments".

**Code review agents working alone.** An MSR 2026 study (Chowdhury et al.) compared pull requests reviewed only by code review agents with those reviewed only by humans. Agent-only pull requests merged 45.20 percent of the time against 68.37 percent for human-only, and 12 of the 13 agents studied had average signal ratios below 60 percent. The authors' conclusion is blunt: agents "should augment rather than replace human reviewers".

Read together, the picture is consistent. AI review finds real problems. It also produces enough low-value comments that, without tuning, it costs review time rather than saving it.

## What AI reviewers reliably catch

The strengths cluster around problems that are visible in the diff and recognisable from patterns:

- **Missing error handling.** An unchecked return value, an exception swallowed, a promise with no rejection path.
- **Edge cases in local logic.** Empty collections, off-by-one bounds, null inputs to a function that does not guard for them.
- **Convention drift.** A new endpoint that skips the validation helper every other endpoint uses, or naming that breaks the house style.
- **Copy-paste errors.** A duplicated block where one variable was not renamed, which humans skim straight past.
- **Stale documentation.** A docstring or comment that no longer matches the code beneath it.
- **Obvious security smells.** String-built SQL, secrets in code, unsafe deserialisation.

None of these require knowing what the change is for. That is the common thread, and it predicts the weaknesses too.

## What they miss

**Whether this is the right change.** A reviewer that sees a diff can say whether it is internally consistent. It cannot tell you the feature should not exist, or that a config flag would have done the job.

**What is not in the diff.** The most important review comment is often about code that was *not* touched: the second caller that also needs updating, the migration that was forgotten, the test that should have been added. Diff-centred tools are structurally weak here, even when they pull in surrounding context.

**Business rules.** "Refunds over a threshold need a second approver" lives in a policy document or someone's head. If it is not in the code or the instructions file, the reviewer cannot enforce it.

**Cross-service behaviour.** Changes that are correct in one repository and break a contract with another.

**Some files entirely.** GitHub's documentation for Copilot code review lists file types it skips, including dependency manifests and lockfiles such as `package.json` and `Gemfile.lock`. A newly added dependency is exactly where supply-chain risk enters, including hallucinated package names, so that check has to live somewhere else.

GitHub's own documentation is candid about the overall limit: "Copilot is not guaranteed to spot all problems or issues in a pull request."

## The noise problem is the real problem

Every unhelpful comment carries a cost: someone has to read it, decide it is wrong, and dismiss it. At low precision, reviewers learn to skim the bot, and then they skim past the one comment that mattered.

This is why Google's 50 percent precision target is the most transferable lesson in the literature. Tune for fewer, better comments:

- Turn off categories that duplicate existing tooling. If a linter and a formatter run in CI, the AI reviewer should not comment on style.
- Ask for severity on every comment, and suppress anything below a threshold on routine changes.
- Scope reviews to paths that matter. Generated code, fixtures and vendored files rarely need AI commentary.
- Track the dismissal rate. If most comments are dismissed, the configuration is wrong, not the developers.

## Wiring it in without slowing merges

![Three layers of pull request review: deterministic checks, an AI reviewer that comments but never approves, and a human reviewer who approves](/assets/images/blog/diagrams/ai-code-review-1.svg)

*Diagram: Big Matrix Solutions, based on [GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/code-review) and [Cihan et al.](https://arxiv.org/abs/2412.18531).*

The order matters. Deterministic checks run first and block on failure. The AI reviewer runs next and comments. A human reviews last and approves. On GitHub, Copilot reviews do not count toward required approvals by default, and that default is worth keeping on every platform: the bot informs a decision, it does not make one.

Give the reviewer the context it cannot infer. Copilot reads repository-wide instructions from `.github/copilot-instructions.md` and path-specific files under `.github/instructions/`; other tools have their own equivalents. Keep them short and concrete:

```markdown
# Review instructions

- Do not comment on formatting or import order; CI enforces both.
- All handlers under src/api/ must call validateRequest() before reading the body.
- Money is integer minor units. Flag any float arithmetic on amounts.
- Flag new network calls that have no timeout.
- Only report issues you would rate medium severity or above.
```

Each line encodes a rule the model could not have guessed. That is where the value is.

## Measuring whether it works

Teams often judge AI review by how many comments it leaves. That number rewards noise. Better signals:

| Metric | Why it matters |
|---|---|
| Comments acted on (%) | Proxy for precision. Low means reviewers are paying a tax. |
| Time to merge | The ICSE study saw it rise. Check you are not repeating that. |
| Human review rounds per PR | Should fall if the bot is catching the mechanical issues first. |
| Escaped defects by category | Shows which classes of bug still get through. |
| Dismissals by rule or path | Tells you which instructions to cut. |

Measure for a few weeks before and after a change in configuration. Anecdotes about one great catch are not evidence of net value.

## A working checklist

- **Decide its job in writing.** Mechanical issues and conventions, not design approval.
- **Run deterministic tools first.** Never pay a model to find what a linter finds for free.
- **Keep it non-blocking.** Comments only; humans approve.
- **Write an instructions file** with rules the model cannot infer, and prune it monthly.
- **Set a severity floor** and turn off style commentary.
- **Check dependency changes separately**, since some reviewers skip manifests.
- **Track acted-on rate and time to merge**, and treat a falling acted-on rate as a configuration bug.
- **Route by risk.** Payment, auth and data-deletion paths always get a human who knows the domain.

## The useful framing

An AI reviewer is a filter in front of human review, not a replacement for it. Its best outcome is that human reviewers stop spending attention on missing null checks and spend it on the questions only they can answer: should this exist, what else does it touch, and what happens when it fails in production.

Teams that get value from these tools are the ones that tune hard for precision and protect reviewer attention. Teams that leave the defaults on tend to end up with a noisy bot that everyone has learned to ignore.

**Sources**

- https://research.google/blog/resolving-code-review-comments-with-ml/
- https://arxiv.org/abs/2412.18531
- https://arxiv.org/abs/2604.03196
- https://docs.github.com/en/copilot/concepts/agents/code-review

**Media credits**:
- Hero image: "Suggestions filtering funnel" figure from Google Research, "Resolving code review comments with ML" (Frömmgen and Kharatyan, 2023), shown on a white background. © Google, used for editorial reference — [Google Research](https://research.google/blog/resolving-code-review-comments-with-ml/)
- In-body diagram: Big Matrix Solutions, drawn from [GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/code-review) and [Cihan et al., ICSE 2025](https://arxiv.org/abs/2412.18531)
