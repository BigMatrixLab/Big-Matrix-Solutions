---
id: "26"
slug: "rlvr-how-reasoning-models-got-good"
title: "The Trick That Made Models Reason: Verifiable Rewards, and Where They Run Out"
comments: "0"
image: "/assets/images/blog/rlvr-reasoning.png"
category: "LLM Research"
desc: "RLVR gave us o-series, R1 and every reasoning model since. It also confined the gains to domains where a computer can check the answer."
date: "Nov 14, 2026"
tags: ["RLVR", "Reinforcement Learning", "Reasoning", "LLM"]
---

# The Trick That Made Models Reason: Verifiable Rewards, and Where They Run Out

The jump in model reasoning between 2024 and 2026 was not a new architecture. Transformers are transformers. It came from a change in how models are trained after pretraining, and the change is simple enough to state in a sentence.

**Stop asking a human to rate the answer. Ask a computer whether it is correct.**

That is reinforcement learning with verifiable rewards, and it is the mechanism behind the OpenAI o-series, DeepSeek-R1, Kimi K1.5, and every reasoning model that followed. It is also the reason those models are dramatically better at maths and code than at almost anything else, which is a limitation worth understanding properly.

## What came before, and why it capped out

The dominant post-training method was reinforcement learning from human feedback. The pipeline: collect human preferences between model outputs, train a reward model to predict those preferences, then optimise the language model against that reward model.

RLHF works. It is what turned raw pretrained models into things you could talk to. But it has a ceiling built into its structure.

**The reward model is a learned approximation.** It predicts what a human would prefer, imperfectly. Optimise hard enough against an imperfect proxy and you find its errors rather than the thing it was approximating. Reward hacking, and it is not a corner case but the default outcome of sufficient optimisation pressure.

**Human labels are expensive and slow.** Every data point is a person reading two responses and choosing. That does not scale to the volume RL wants.

**Humans are bad at grading hard reasoning.** Ask an annotator to judge which of two forty-step mathematical derivations is correct. Either they check it properly, which takes an hour, or they judge on fluency and confidence, which teaches the model to *look* right.

That last point is the fatal one for reasoning specifically. RLHF's signal rewards persuasiveness, and persuasiveness and correctness come apart exactly where the problems get hard.

## The RLVR move

RLVR proceeds similarly to RLHF but makes the reward model optional, replacing it with a scoring function that returns a positive reward when the answer is correct and zero otherwise.

That is it. No learned reward model. No human in the loop at training time. A verifier.

![Diagram comparing RLHF, where a learned reward model gives an approximate score, with RLVR, where a verifier returns 1 for a correct answer and 0 otherwise](/assets/images/blog/diagrams/rlvr-reasoning-1.svg)

*Diagram: Big Matrix Solutions, based on [Lambert et al., Tulu 3 (arXiv:2411.15124)](https://arxiv.org/abs/2411.15124).*

```python
# RLHF: learned, approximate, hackable
reward = reward_model(prompt, response)

# RLVR: computed, exact, not hackable in the same way
reward = 1.0 if extract_answer(response) == ground_truth else 0.0
```

The consequences of that substitution are larger than it looks.

**The reward is ground truth, not an approximation.** You cannot reward-hack a Python interpreter into saying a wrong answer is right. The signal is as correct as your verifier, and for maths and code the verifier is a program.

**Generation is unlimited.** You need problems with known answers, not human judgments. Existing datasets, procedurally generated problems, and formal statements all work, so the training loop is bounded by compute rather than by annotator throughput.

**Reasoning is free to be ugly.** This is the underrated part. Because only the final answer is graded, the model is not penalised for a messy path. It can explore, backtrack, notice a mistake, and restart. RLHF, which grades the whole response as a human sees it, implicitly punishes visible uncertainty. RLVR rewards whatever gets there.

That last property is where long chains of thought, self-correction, and the behaviour people describe as "the model thinking" actually came from. Nobody designed those behaviours. They emerged because a training signal that only cares about the final answer makes them profitable.

## The scaling behaviour is genuinely different

Something worth flagging for anyone reasoning about where capability is heading: gains from continued RL training and from increased test-time compute exhibit scaling behaviour **distinct from pretraining**.

Pretraining scaling is the familiar story: more parameters, more data, more compute, smoothly better loss. RLVR opened two additional axes that behave differently:

- **RL compute**: how much reinforcement learning you do after pretraining.
- **Test-time compute**: how much the model is allowed to think per problem at inference.

This is why a reasoning model given ninety seconds outperforms the same model given three, and why the cost per query for hard problems went up rather than down. It is also why "how big is the model" became a much weaker predictor of how good the answers are.

## The reward-sparsity problem

One practical difficulty worth understanding, because it explains a lot about why RLVR training is expensive.

A binary reward, right or wrong, carries almost no information when the model is usually wrong. If a problem is hard enough that the model solves it one time in fifty, then forty-nine rollouts produce zero reward and teach nothing. All the learning signal comes from the rare success, and you paid for fifty generations to get it.

This is classic sparse-reward reinforcement learning, and the standard mitigations all apply:

- **Curriculum ordering**: train on problems the model solves sometimes rather than never, and raise difficulty as it improves. A problem solved zero percent or one hundred percent of the time provides no gradient either way; the useful signal is in the middle.
- **Partial credit where the structure allows it**: a proof that gets halfway, a program that passes some tests. This reintroduces reward shaping, with the attendant risk of rewarding something adjacent to what you wanted.
- **Many rollouts per problem**: which is exactly why repeated generation dominates the compute bill, and why efficiency work in this area is so active.

It also explains a counterintuitive property of the method: RLVR is best at problems the base model can *occasionally* already solve. It amplifies and reliabilises latent capability rather than installing new capability. Findings that RLVR implicitly incentivises correct reasoning already present in base models point in the same direction. The reinforcement is selecting for reasoning paths the pretrained model could produce, not teaching it to produce new ones.

![Figure showing reasoning paths in a base model and after RLVR, with pass@k curves on AIME 2024 and 2025 where the RLVR model leads at low k and the base model catches up at high k](/assets/images/blog/rlvr-reasoning-pass-at-k.png)

*RLVR mostly raises the odds of correct reasoning paths the base model can already produce: the gap is largest at pass@1 and narrows as k grows. Source: [Wen et al. (arXiv:2506.14245)](https://arxiv.org/abs/2506.14245), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*

That has a real implication for expectations. RLVR made models dramatically more reliable at things they could sometimes do. It did not make them able to do things that were entirely outside reach, and there is no reason to expect more RL compute to change that.

## Where it stops working

Now the limitation, which is the most important part of the story and the least discussed.

**Most RLVR methods are confined to mathematics and code generation, because existing methods rely heavily on domain-specific verifiers.**

The whole method rests on being able to check the answer automatically. That is available for:

- Mathematics with a closed-form answer you can compare
- Code with a test suite that passes or fails
- Formal proofs a proof assistant can machine-check
- Puzzles and games with defined win conditions

It is not available for the majority of what people want models to do. There is no verifier for whether a strategy memo is good, whether a diagnosis is right, whether an explanation is clear, whether a design is well-judged, or whether a piece of writing is any good. Those are exactly the domains where a learned reward model or human judgment remains necessary, with all the ceiling problems that come with it.

So the capability profile of 2026 reasoning models is not an accident. Extraordinary at competition maths. Extraordinary at code with tests. Meaningfully but less dramatically better at open-ended reasoning. That distribution is a direct fingerprint of where verifiers exist.

## The research pushing on it

Three lines of work are attacking the verifier bottleneck, and they are worth knowing because they determine what the next capability jump looks like.

### 1. Extending RLVR past verifiable domains

Work like RLPR aims to extrapolate RLVR to general domains without verifiers, typically by deriving a reward signal from the model's own probability of the reference answer rather than from an external checker. If this generalises, it moves the method beyond maths and code, which would be a bigger deal than any individual model release.

### 2. Making verification itself scale

Better verifiers mean broader coverage. ScaleBox targets high-fidelity, scalable code verification for language models: the more reliably and cheaply you can check a candidate solution, the more training signal you can generate. Verification quality is the constraint, so improving it is direct progress.

### 3. Making RLVR affordable

The efficiency problem is real and underappreciated. Existing RLVR strategies demand substantial resources: large volumes of reward signal and significant computational overhead from repeated rollouts. Every training step involves generating many candidate solutions and checking each one.

Responses include resource-efficient approaches such as dynamic one-shot policy refinement, context-bootstrapped RL, and efficient reasoning via reward models. There is also a February 2026 relative-budget theory for RLVR under compute constraints, which addresses a real gap: the field has been almost entirely empirical, with scaling guarantees notably absent, and the theory is starting to catch up with practice.

## What this means practically

If you are choosing or using models rather than training them, a few things follow directly.

**Expect the capability profile to be lumpy, and expect it for a reason.** A model that solves olympiad geometry may be unremarkable at judging a business trade-off. That is not inconsistency; those two tasks got wildly different amounts of training signal because only one of them has a verifier.

**Build a verifier if you can.** This is the actionable version. If your task can be checked automatically (a test suite, a schema validation, a constraint solver, a simulation) you can generate training signal, and more immediately you can run a verification pass at inference and reject bad outputs. The verifier is valuable independently of whether you ever fine-tune.

**Give hard problems more compute.** Test-time compute is a real axis now. If a problem matters, let the model think longer, or sample several attempts and take the one that passes verification. This is a straightforward win that many deployments leave on the table.

**Be sceptical of reasoning claims in unverifiable domains.** A model marketed as a strong reasoner, evaluated on maths and code, may be no better than its predecessor at your unverifiable judgment task. The benchmark and your use case may share no training signal at all.

## The bigger picture

RLVR is one of the clearest examples in recent machine learning of a method's shape determining a field's shape.

Someone noticed that the expensive, noisy, hackable part of RLHF, the human judgment, could be replaced with a program in domains where correctness is checkable. That one substitution produced emergent chain-of-thought, self-correction, a new scaling axis, and the entire reasoning-model category.

It also drew a boundary. Capability grew fastest exactly where verification was cheapest, and the frontier of what models reason well about now tracks the frontier of what we can automatically check.

Which makes the most consequential open problem in the field somewhat unexpected. It is not a better architecture. It is: how do you build a verifier for a domain where correctness is a matter of judgment?

**Media credits**:
- Hero image: Figure 18 ("An overview of how Reinforcement Learning with Verifiable Rewards (RLVR) works") from Lambert et al., "Tulu 3: Pushing Frontiers in Open Language Model Post-Training", [arXiv:2411.15124](https://arxiv.org/abs/2411.15124), licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Placed on a white 16:9 canvas; figure unaltered.
- Pass@k figure: Figure 1 from Wen et al., "Reinforcement Learning with Verifiable Rewards Implicitly Incentivizes Correct Reasoning in Base LLMs", [arXiv:2506.14245](https://arxiv.org/abs/2506.14245), licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- RLHF vs RLVR diagram: Big Matrix Solutions.
