---
id: "19"
slug: "how-jepa-works-predicting-in-latent-space"
title: "How JEPA Works: Why LeCun's World Models Refuse to Predict Pixels"
comments: "0"
image: "/assets/images/blog/jepa-architecture.webp"
category: "Tutorial"
desc: "Joint Embedding Predictive Architectures predict in representation space instead of input space. What that buys, and how they avoid collapse."
date: "Nov 04, 2026"
tags: ["JEPA", "Self-Supervised Learning", "World Models", "Tutorial"]
---

# How JEPA Works: Why LeCun's World Models Refuse to Predict Pixels

Start with a thought experiment that gets to the heart of it.

You are watching a video of a ball rolling toward the edge of a table. Predict the next second.

You know exactly what happens: the ball leaves the table and falls. You are confident about the trajectory, the acceleration, roughly where it lands.

Now predict the next second *pixel by pixel*. Suddenly the task is absurd. You would need the precise lighting on the ball's surface as it rotates, the exact shadow geometry, the specular highlight, the motion blur, the sensor noise. You have no idea about any of that, and none of it is what you meant by understanding what happens next.

That gap, between predicting *what happens* and predicting *what it looks like*, is the entire motivation for Joint Embedding Predictive Architectures.

## The generative modelling problem

Most self-supervised learning works by reconstruction. Hide part of the input, predict the hidden part, compare against the truth in input space.

For text this works beautifully. Masked and next-token prediction gave us modern language models. The reason it works is that text is already discrete, already compressed, and already abstract. A word is a symbol, and predicting the right symbol requires understanding.

For images and video it works much less well, and the reason is instructive.

Predict a masked patch of an image and you are being asked for exact pixel values. Some of that requires understanding. If the patch contains part of a dog's face, you need to know there is a dog. But a large majority of the bits you are being graded on are *unpredictable detail*: exact texture, exact noise, exact lighting.

So the loss function spends most of its budget pushing the model to model detail that carries no semantic information. The model burns capacity on texture statistics. Worse, since the unpredictable parts cannot be predicted, the optimum under a squared-error loss is to output the blurry average of all possibilities, which is why reconstruction-based video models produce that characteristic smeared prediction.

LeCun's framing of this is that the world is fundamentally not predictable at the pixel level, and a training objective that demands pixel prediction forces the model to waste itself on irreducible noise.

## The JEPA move

The proposal is a single change with large consequences: **predict in representation space, not input space.**

Concretely:

1. Encode the visible context into a representation.
2. Encode the target (the part you are predicting) into a representation, using a separate encoder.
3. Train a predictor to map from the context representation to the target *representation*.
4. Compute the loss between predicted and actual representations.

The pixels never appear in the loss.

```python
# x: context (visible), y: target (masked region)
s_x = context_encoder(x)          # representation of context
s_y = target_encoder(y)           # representation of target
s_y_pred = predictor(s_x, mask)   # predicted representation

loss = mse(s_y_pred, s_y)         # loss in latent space
```

The underlying hypothesis, stated in the JEPA world-model literature, is that predicting future states is *easier* in a learned representation space than in the original observation space, and that requiring predictability in that space pushes the representation toward carrying meaningful, predictable structure.

That second clause is the elegant part. The representation is not fixed in advance. It is learned *jointly* with the predictor. So the training pressure is: find a representation in which prediction is possible. Anything unpredictable, whether sensor noise, exact texture or the specular highlight, is useless for reducing the loss and gets discarded. What survives is what the future depends on.

Predictability becomes a filter for semantic relevance. That is the whole idea.

## The collapse problem

There is an obvious hole, and anyone who has worked with joint embedding methods spots it immediately.

If both encoders are learned, and the loss is agreement between representations, there is a trivial solution: **output a constant.** Encode everything to the same vector. The predictor learns the identity. Loss is zero. Representation is worthless.

This is representational collapse, and it is not a hypothetical. It is what naive implementations actually do. Preventing it is most of the engineering in this family of methods.

Approaches in use:

**Asymmetry with a stop-gradient.** The target encoder is updated as an exponential moving average of the context encoder rather than by gradient descent, and gradients do not flow through it. The target is a slowly-moving version of the online network, so there is no direct path for the optimiser to find the constant solution. This is the mechanism inherited from BYOL and used in the I-JEPA and V-JEPA line.

**Variance and covariance regularisation.** Add explicit loss terms requiring that each representation dimension has non-zero variance across the batch (nothing is constant) and that dimensions are decorrelated (no redundant duplication of the same feature). This is the VICReg approach, and it attacks collapse directly rather than structurally.

**Distributional regularisation.** Recent work such as LeWorldModel trains stably end-to-end from raw pixels using just two terms: a next-embedding prediction loss and a regulariser forcing embeddings toward a Gaussian distribution. A constant output has zero variance and is heavily penalised, so the pressure is explicit and simple.

**Careful masking.** What you mask matters. If the target is trivially inferable from the context, the task is too easy to force good representations. I-JEPA masks large contiguous blocks specifically to require semantic rather than textural inference. You cannot fill in a big block by extrapolating local texture.

The recurring lesson across all four: joint embedding methods work when the *objective* prevents collapse, not when you hope the optimiser avoids it.

## I-JEPA: the image version

Image-JEPA established the recipe.

Take an image. Sample a context block and several target blocks. Encode the context with a vision transformer. For each target block, a predictor conditioned on the target's *position* predicts what the target encoder would produce there. The target encoder is an EMA of the context encoder with no gradient flow.

Position conditioning is essential. Without knowing *where* it is predicting, the predictor cannot do better than a global average. With it, the task becomes: given what I can see and where I am asked about, what is there semantically?

![One I-JEPA training step: a context block is encoded and a predictor, given target positions, predicts the representations of masked target blocks produced by an EMA target encoder, with the loss computed in latent space](/assets/images/blog/diagrams/how-jepa-works-1.svg)

*One I-JEPA training step: the loss lives in representation space. Diagram: Big Matrix Solutions, based on [I-JEPA (Assran et al., 2023)](https://arxiv.org/abs/2301.08243).*

Results were the argument for the whole approach. I-JEPA produced strong representations without any of the data augmentation that contrastive methods depend on: no crops, colour jitter, or handcrafted invariances. Those augmentations always encoded human assumptions about what should not matter. I-JEPA needed none, and trained more efficiently than masked autoencoders on comparable budgets.

## V-JEPA: adding time

Video is where the argument gets much stronger, because video has the pixel-unpredictability problem far worse than images. The next frame is *almost* the current one plus small changes, and a pixel-space loss is overwhelmingly dominated by trivially copyable content.

[V-JEPA 2](https://ai.meta.com/research/vjepa/) is described as the first video-trained world model achieving state-of-the-art visual understanding and prediction while enabling zero-shot robot control in new environments. The training recipe combines roughly **a million hours of internet-scale video** with a comparatively small amount of robot trajectory data.

That combination is the interesting part, and it mirrors how the language field learned to do things. The video gives broad physical priors: how objects move, how occlusion works, what happens when something is pushed. The robot data grounds those priors in actions the robot can actually take. Pretrain broadly, adapt narrowly.

![V-JEPA 2 overview: pretraining on internet video and images, then language alignment, attentive probes, and action-conditioned post-training on 62 hours of robot data for planning](/assets/images/blog/vjepa2-overview.png)

*V-JEPA 2 is pretrained on over a million hours of video, then post-trained on 62 hours of robot data for planning. Source: [V-JEPA 2, Fig. 1](https://arxiv.org/abs/2506.09985), Assran et al., CC BY 4.0.*

The payoff is planning. If you have a model that predicts *representations* of future states given actions, you can search over action sequences: imagine the outcome of each candidate plan in latent space, score it against a goal representation, pick the best. No pixel rendering required, which makes the search cheap enough to be practical.

![V-JEPA 2-AC model predictive control: current observation and goal image are encoded, the predictor rolls out candidate actions in latent space, and an L1 distance to the goal representation scores them](/assets/images/blog/vjepa2-planning.png)

*Planning in latent space: candidate actions are scored by how close the predicted representation lands to the goal’s. Source: [V-JEPA 2](https://arxiv.org/abs/2506.09985), Assran et al., CC BY 4.0.*

V-JEPA 2.1, released in March 2026, refines the recipe with more temporally consistent dense features, adding a dense predictive loss, deep self-supervision, and multimodal tokenizers, with pretrained checkpoints released for dense video and image features.

## The research frontier

Two years of active work has produced a recognisable research programme:

- **Value-guided planning**: combining JEPA world models with learned value functions so the search over imagined action sequences is directed rather than exhaustive.
- **Multimodal variants**: VL-JEPA extends the architecture to vision-language, predicting across modalities rather than within one.
- **Symmetric designs**: BiJEPA makes the prediction bidirectional rather than context-to-target, aiming at more symmetric representations.
- **End-to-end from pixels**: LeWorldModel is notable for training stably straight from raw pixels with a minimal two-term objective, removing the staged-training complexity earlier versions needed.
- **Theory**: a 2026 generalisation theory for JEPA-based world models begins to explain *why* latent prediction produces better representations, which the field has mostly justified empirically until now.

## The honest limitations

JEPA is a research programme with real open problems, and the criticism is worth engaging.

**No generation.** A JEPA does not produce images or video. It produces representations. For understanding, planning, and control this is a feature. You were never going to look at the predicted pixels anyway. If you want to generate media, you need a generative model, and diffusion transformers are far ahead there.

**Evaluation is awkward.** You cannot look at a predicted representation and judge it. Assessment is necessarily indirect: probe the representations on downstream tasks, or measure planning performance. Both work, and both introduce their own confounds. A pixel-space model can at least be inspected by eye.

**Collapse remains fiddly.** Every method in this family needs its anti-collapse mechanism tuned. It is not a solved problem, more a managed one, and reproducing results can be sensitive to details.

**"World model" is doing a lot of work.** Critical analyses have argued that systems like V-JEPA and Sora have not learned a complete world model in any strong sense. They capture regularities in their training distribution, which is a genuinely useful thing and not the same as physical understanding. ARC-AGI-3's frontier scores near half a percent on novel interactive environments are a reminder from a different direction that adaptation to true novelty remains largely unsolved.

## Why the idea outlives the architecture

Even setting aside how the specific architecture fares, the central claim is one of the more durable ideas in recent representation learning: **the loss function determines what the model learns to care about, so put the loss where the meaning is.**

Pixel reconstruction grades a model on detail that no amount of understanding would let it predict. Latent prediction grades it on structure that only understanding can supply. Same data, same encoder capacity, radically different training pressure.

That principle generalises well past vision. Carry it to any self-supervised problem where the raw signal contains much more entropy than meaning, which is most sensory data and increasingly most of the data we would like models to learn from.

Hero diagram: [Joint Embedding, Generative, and Joint Embedding Predictive Architecture](https://commons.wikimedia.org/wiki/File:Joint_Embedding%2C_Generative%2C_and_Joint_Embedding_Predictive_Architecture.jpg) by Skenderi, Li, Tang and Cristani, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), via Wikimedia Commons. Scaled and padded to fit; not otherwise altered.

**Media credits**:
- In-body figures: V-JEPA 2 overview and V-JEPA 2-AC model predictive control, from [V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://arxiv.org/abs/2506.09985) (Assran et al., 2025), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Not altered.
- In-body diagram (I-JEPA training step): Big Matrix Solutions, based on [Assran et al., 2023](https://arxiv.org/abs/2301.08243).
