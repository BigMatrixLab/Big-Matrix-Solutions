---
id: "80"
slug: "testing-non-deterministic-ai-features"
title: "Testing Non-Deterministic Features: A Practical Strategy for AI Products"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/testing-ai-features.webp"
category: "Software Development"
desc: "Assertions on exact strings break the moment a model is involved. How to split deterministic from probabilistic, grade outputs you cannot predict, and gate releases on numbers you can trust."
date: "Jan 03, 2027"
tags: ["Testing", "Evals", "LLM Applications", "Software Quality"]
---

# Testing Non-Deterministic Features: A Practical Strategy for AI Products

The first test most teams write for an AI feature looks like this: call the model, compare the output to a string, watch it fail on the next run. The second attempt wraps it in a retry loop, marks it flaky and moves on.

Neither is a test strategy. A feature built on a language model returns different outputs for the same input, and "correct" is often a range rather than a value. That does not make it untestable. It means the testing has to be split into parts that behave like ordinary software and parts that need to be measured statistically.

## Split the system before you test it

An AI feature is rarely just a model call. It is prompt assembly, retrieval, the call itself, output parsing, validation, tool execution and whatever the UI does with the result. Most of that is deterministic.

Test the deterministic parts the normal way, with the model replaced by a stub:

```python
def test_summary_handler_rejects_oversized_input(fake_llm):
    fake_llm.returns('{"summary": "ok", "confidence": 0.9}')
    resp = client.post("/summarise", json={"text": "x" * 200_001})
    assert resp.status_code == 413
    assert fake_llm.calls == 0  # never sent to the model

def test_malformed_model_output_is_handled(fake_llm):
    fake_llm.returns("Sure! Here is your summary:")  # not JSON
    resp = client.post("/summarise", json={"text": "hello"})
    assert resp.status_code == 502
    assert resp.json()["error"] == "upstream_format"
```

These run in milliseconds, never flake, and cover the failure modes that cause real incidents: the model returns prose instead of JSON, times out, or gets called with input it should never see. Recorded real responses make good fixtures here, because they capture the odd formats models actually produce.

## Assert on properties, not strings

For the model's actual output, stop asking "is it this text?" and ask "does it have the properties a correct answer must have?"

| Instead of | Assert |
|---|---|
| Exact output match | Parses against the response schema |
| Exact summary text | Under the length limit; mentions required entities |
| Exact classification wording | Label is one of the allowed enum values |
| Exact SQL string | Query runs read-only and returns the expected rows |
| Exact extracted fields | Extracted values appear verbatim in the source |

Property checks are cheap enough to run on every output in production too, not only in tests. A response that fails schema validation in production should be caught by the same code that catches it in CI.

## Grading outputs you cannot predict

Some qualities, like whether an answer is helpful or a summary is faithful, need judgement. Anthropic's engineering guide to agent evals ("Demystifying evals for AI agents", January 2026) sorts graders into three types, and the division is a good default:

| Grader | Good for | Watch out for |
|---|---|---|
| Code-based | Schemas, tests passing, exact facts, state checks | Brittle when valid answers vary in form |
| Model-based (LLM as judge) | Tone, faithfulness, open-ended quality | Non-deterministic; needs calibration |
| Human | Ground truth, calibrating the other two | Slow and expensive |

The guide's advice is to prefer deterministic graders where possible, use model graders where necessary, and use humans to calibrate rather than as the main loop. It also suggests grading the end state, not only the words: an agent that says a flight is booked has passed nothing until a reservation exists in the database.

![Anthropic diagram comparing a single-turn eval graded on the response with an agent eval that uses tools and an environment and is graded by running tests](/assets/images/blog/testing-ai-features-agent-evals.webp)

*A single-turn eval grades a response; an agent eval grades what the agent changed. Source: [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)*

### Using an LLM judge without fooling yourself

Model-based grading is useful and easy to get wrong. The research that popularised it (Zheng et al., NeurIPS 2023) found strong judges reached over 80 percent agreement with human preferences, and also documented position, verbosity and self-enhancement biases. In practice:

- **Calibrate against humans first.** Have people label a sample, run the judge on the same sample, and only trust it where they agree.
- **One judge per dimension.** Separate rubrics for accuracy, tone and completeness beat one prompt that scores everything.
- **Give it a way out.** Anthropic's guide recommends letting the judge answer "Unknown" when it lacks the information to decide.
- **Pin the judge model version**, or your scores will move when the judge changes rather than when your product does.

## Run it more than once

A single run of a non-deterministic feature tells you very little. The useful question is how often it succeeds, and which "how often" you care about.

![Line chart of pass@k rising towards 100 percent and pass^k falling to 42 percent at three trials for a 75 percent per-trial success rate](/assets/images/blog/diagrams/testing-ai-features-1.svg)

*Diagram: Big Matrix Solutions, based on [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).*

Two metrics from the eval literature capture the difference. **pass@k** is the chance that at least one of k attempts succeeds. **pass^k** is the chance that all k succeed. Anthropic's guide gives the worked example: at a 75 percent per-trial success rate, the chance of passing three trials in a row is (0.75)³, about 42 percent.

Which one matters is a product decision. A code-suggestion tool where the user picks the best of several drafts lives on pass@k. A customer-facing agent that must behave correctly every time a user asks lives on pass^k, and a 75 percent feature will feel broken.

## Two suites, two jobs

Separate evals by purpose:

- **Capability evals** measure what the feature cannot yet do reliably. They start with a low pass rate and give you something to improve.
- **Regression evals** protect what already works. Anthropic's guide says they should sit at a nearly 100 percent pass rate, so any drop is a signal.

As capability tasks reach high pass rates, promote them into the regression suite. Run regression evals on every prompt change, model upgrade and retrieval change, since all three change behaviour as much as a code change does.

Two warnings from the same guide are worth keeping in mind. If a task fails every attempt across many trials, suspect the task or the grader before the model. And read transcripts regularly; aggregate scores do not tell you whether a failure was the feature's fault or the eval's.

## Gating releases on a noisy number

A CI gate on eval results needs to tolerate noise without hiding regressions:

- **Fix the dataset.** Version it with the code. A changed dataset makes scores incomparable.
- **Run multiple trials per task** and gate on the rate, not a single pass or fail.
- **Gate on regressions, not absolutes.** "No more than two points below the main branch" is more stable than "above 90 percent".
- **Hard-gate the deterministic checks.** Schema failures and safety violations block the release outright; quality scores warn.
- **Record cost and latency** alongside quality. A prompt change that improves scores and doubles tokens is a trade-off someone should approve.

## Production is part of the test plan

No offline suite covers what real users will ask. Anthropic's guide illustrates this with a Swiss cheese diagram (the cover image of this post): automated evals, transcript review and production monitoring each have holes, and the layers together catch what one alone misses. Concretely, log inputs and outputs (with appropriate privacy controls), run the same property checks on live traffic, sample conversations for human review, and feed real failures back into the eval dataset. The best eval cases come from production incidents.

## A working checklist

- **Stub the model** and unit-test everything around it: parsing, validation, timeouts, refusals, malformed output.
- **Replace string asserts with property asserts**: schema, enums, length, grounding in the source.
- **Use code graders first**, LLM judges where needed, humans to calibrate.
- **Calibrate every LLM judge** against human labels and pin its model version.
- **Run several trials per task** and choose pass@k or pass^k deliberately.
- **Keep capability and regression suites separate.**
- **Gate CI on regressions**, hard-fail on schema and safety checks.
- **Read transcripts** every week, not only dashboards.
- **Turn production failures into eval cases.**

## The shift in mindset

Testing AI features means giving up the idea that a test proves correctness and accepting that, for part of the system, a test measures a rate. That is less comfortable, but it is not new. Load testing, A/B experiments and reliability engineering have always worked this way.

The teams that ship AI features with confidence keep the deterministic parts strictly deterministic, measure the probabilistic parts honestly, and decide in advance which number has to hold before a change goes out.

**Sources**

- https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- https://arxiv.org/abs/2306.05685

**Media credits**:
- Hero image: "Zooming Out: The Swiss Cheese of Quality" illustration from Anthropic, "Demystifying evals for AI agents" (January 2026). © Anthropic, used for editorial reference — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- In-body figure: "Comparison: Single-Turn vs Agent Evaluations" from the same Anthropic post. © Anthropic — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- In-body diagram: Big Matrix Solutions, plotted from the pass@k and pass^k definitions in [Anthropic's guide](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
