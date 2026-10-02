---
id: "71"
slug: "building-eval-suite-llm-feature"
title: "Building an Eval Suite for an LLM Feature"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/llm-eval-suites.png"
category: "Agentic AI"
desc: "Tasks, trials, graders and gates: how to build an evaluation suite that tells you whether a prompt or model change made your LLM feature better or worse."
date: "Dec 16, 2026"
tags: ["Evals", "Agentic AI", "LLM", "Testing"]
---

# Building an Eval Suite for an LLM Feature

Every team shipping an LLM feature reaches the same moment. Someone changes the prompt, or the provider releases a new model, and the question is simple: is it better or worse? Without an eval suite, the honest answer is "it felt fine on the five examples I tried."

That is not a testing strategy. Model output is non-deterministic, failures are often subtle, and an improvement on one kind of input routinely causes a regression on another. Unit tests do not catch this, because there is rarely a single correct string to assert against.

An eval suite is the replacement. It is not exotic. It is a dataset, a harness that runs your feature against it, and a set of graders that turn outputs into scores. The work is in getting each of those three parts right.

## The parts of an eval suite

Anthropic's engineering guidance on agent evals uses a vocabulary worth adopting, because it separates things that teams tend to blur together:

- **Task**: one test case. Inputs, success criteria, and the graders that apply.
- **Trial**: one run of the feature on one task. Because output varies, you run several.
- **Transcript** (or trajectory): the full record of a trial, including messages, tool calls and intermediate steps.
- **Grader**: logic that scores some aspect of a trial.
- **Outcome**: the final state the trial left behind, such as the file that was written or the ticket that was updated.

The distinction between transcript and outcome matters more than it looks. A chat feature's outcome is its reply. An agent's outcome is a change in the world, and the reply is just its account of that change, which may not be accurate.

![Diagram of an eval suite as a release loop: tasks, trials, graders, metrics and a release gate, with production failures feeding back into new tasks](/assets/images/blog/diagrams/llm-eval-suites-1.svg)

*Diagram: Big Matrix Solutions, based on [Anthropic, "Demystifying evals for AI agents"](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).*

## Start small, and start from real failures

The most common mistake is waiting until you can build a large, representative benchmark. You will not get there, and you do not need to. Anthropic's advice is to "start with 20-50 simple tasks drawn from real failures," because early changes have large effects and small samples are enough to see them.

Good first sources for tasks:

- Bug reports and support tickets where the feature gave a wrong or unhelpful answer.
- Inputs your team argued about during development.
- Edge cases from the product spec: empty input, very long input, the wrong language, a request the feature should decline.

Write tasks in pairs where you can. The same guidance says to "test both the cases where a behavior *should* occur and where it *shouldn't*." A suite that only checks whether the assistant calls the refund tool will happily reward an assistant that calls it every time.

Each task needs explicit success criteria written down before you look at outputs. If two engineers would disagree about whether an output passes, the criteria are not finished.

## Choosing graders

There are three kinds, and a mature suite uses all of them for different jobs.

| Grader | Good for | Weakness |
|---|---|---|
| Code-based | Exact facts, valid JSON, tool called with the right arguments, tests passing, final state checks | Brittle on open-ended text |
| Model-based (LLM as judge) | Tone, helpfulness, faithfulness to a source, rubric scoring | Needs calibration; has known biases |
| Human | Ground truth, calibrating the other two | Slow and expensive |

Use code wherever the criterion can be checked by code. It is fast, deterministic and free to run on every commit. A surprising share of criteria are checkable: did the output parse, did it cite only documents that were retrieved, did the database row change, did the reply stay under the length limit.

For everything else, a model grader with a written rubric is the practical option. The research case for it is real: the MT-Bench paper by Zheng et al. found strong LLM judges reached "over 80% agreement" with human preferences, about the same rate at which humans agree with each other. The same paper documents the failure modes: **position bias**, **verbosity bias** and **self-enhancement bias**. In practice that means:

- For pairwise comparisons, run each pair in both orders and only count consistent verdicts.
- Grade against a specific rubric with discrete levels, not "rate this from 1 to 10".
- Ask for one criterion per judge call rather than a single overall score.
- Label 50 to 100 outputs by hand and measure the judge's agreement with you before trusting it. Re-check whenever you change the judge model or prompt.

Humans are the calibration layer. You do not need them on every run, but you need them periodically to confirm the automated graders still measure what you think they measure.

## Grade the outcome, not the path

For agentic features, there is a strong temptation to assert on the exact sequence of steps: first it should search, then read, then write. Resist it. Anthropic's guidance is blunt: "it's often better to grade what the agent produced, not the path it took." Models find valid routes you did not anticipate, and a path-based grader will mark them as failures.

Check the outcome directly where you can. If the task is "book the meeting", query the calendar. If it is "fix the failing test", run the test suite. Reserve path checks for things that genuinely matter, such as "never called the delete endpoint" or "did not send the email before confirmation".

## Non-determinism: run it more than once

A single run per task tells you very little. The same input can pass on one trial and fail on the next. Run several trials per task and report two numbers, because they answer different questions.

- **pass@k**: the probability that at least one of *k* trials succeeds. Useful when a human or a verifier picks the best attempt.
- **pass^k**: the probability that *all k* trials succeed. Useful when every user interaction has to work.

![Chart showing pass@k rising towards 100 percent and pass^k falling towards zero as the number of trials increases](/assets/images/blog/llm-eval-suites-pass-k.png)

*In Anthropic's illustration, the same agent scores 97% pass@3 but only 39% pass^3. Source: [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)*

For a customer-facing feature, pass^k is usually the number that predicts complaints. A feature that succeeds 73 percent of the time per attempt feels broken to a user who tries it three times.

Each trial should also start clean. The guidance says each trial "should be 'isolated' by starting from a clean environment." Shared state between trials, such as a database row left behind by the previous run, produces results that depend on execution order.

## Capability evals and regression evals

Keep two suites with different expectations.

**Capability evals** measure what you are trying to improve. They should start with a low pass rate, otherwise there is nothing to learn from them.

**Regression evals** protect what already works, and should sit at or near 100 percent. When a capability task becomes reliably solved, move it into the regression suite. As the guidance puts it, "an eval at 100% tracks regressions but provides no signal for improvement."

## Wiring it into the release process

An eval suite earns its keep when it runs automatically. A minimal harness is short:

```python
def run_suite(tasks, feature, trials=3):
    results = []
    for task in tasks:
        for i in range(trials):
            env = fresh_environment(task)          # isolated per trial
            transcript = feature.run(task.input, env)
            scores = {g.name: g.grade(task, transcript, env) for g in task.graders}
            results.append({"task": task.id, "trial": i, "scores": scores,
                            "tokens": transcript.tokens, "latency_s": transcript.latency})
    return results
```

Run the regression suite on every prompt, model or tool change, and block the merge if it drops. Run the capability suite nightly and track its trend. Store every transcript, because the scores tell you *that* something changed and only the transcripts tell you *why*.

Track cost and latency alongside quality. A prompt change that adds two points of accuracy and doubles token spend is a business decision, not an automatic win.

## How eval suites go wrong

**Broken tasks.** If a task fails on every trial, suspect the task before the model. Anthropic notes that "a 0% pass rate across many trials is most often a signal of a broken task."

**Unread transcripts.** "You won't know if your graders are working well unless you read the transcripts." Teams that only look at the dashboard miss graders that pass bad outputs.

**Overfitting.** If the same people write the prompt and the eval, the prompt slowly learns the eval. Hold back a set of tasks nobody tunes against.

**Judge drift.** Upgrading the judge model silently changes every historical score. Pin the judge version and re-baseline deliberately.

**Stale suites.** A suite built at launch and never updated measures last year's product. Production failures should flow into new tasks every week.

## Checklist

- 20 to 50 tasks to start, drawn from real failures, with written success criteria
- Positive and negative cases for every behaviour you test
- Code-based graders wherever a criterion can be checked by code
- Model graders with discrete rubrics, calibrated against human labels
- Outcome checks on final state, path checks only for hard constraints
- Several trials per task, each in a clean environment; report pass@k and pass^k
- Separate capability and regression suites
- Regression suite runs on every prompt, model and tool change and gates the merge
- Transcripts stored and sampled by a human every week
- Cost and latency tracked next to quality

## The point of all this

An eval suite does not make an LLM feature correct. What it does is turn "I think this is better" into a number you can argue about, and a set of transcripts you can read when the number moves. That is the difference between iterating on a feature and guessing at it. The suite will never be finished, and that is fine: the useful version is the one that grows by a few tasks every time production teaches you something new.

**Sources**

- [Anthropic Engineering: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Zheng et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena" (arXiv:2306.05685)](https://arxiv.org/abs/2306.05685)

**Media credits**:
- Hero image: "Components of Evaluations for Agents" diagram, [Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents). Copyright Anthropic; licence not stated, used with attribution.
- In-body chart: "The Difference Between Pass@k and Pass^k", [Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents). Copyright Anthropic; licence not stated, used with attribution.
- In-body diagram: Big Matrix Solutions, based on [Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).
