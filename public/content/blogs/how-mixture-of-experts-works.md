---
id: "21"
slug: "how-mixture-of-experts-works"
title: "How Mixture of Experts Works: A Trillion Parameters You Do Not Have to Pay For"
comments: "0"
image: "/assets/images/blog/moe-architecture.webp"
category: "Tutorial"
desc: "Routers, top-k selection, load balancing loss, and the memory-for-compute trade that made trillion-parameter models economically serveable."
date: "Jan 22, 2027"
tags: ["Mixture of Experts", "LLM", "Tutorial", "Model Architecture"]
---

# How Mixture of Experts Works: A Trillion Parameters You Do Not Have to Pay For

Nearly every frontier-scale model in 2026 is a mixture of experts. The reason is a single arbitrage: MoE lets you increase a model's parameter count enormously while barely increasing the compute per token.

That sounds like something for nothing, and it is not. It is a trade, and understanding what you give up is more useful than understanding what you get.

## Start with the layer being replaced

A transformer block has two halves. Attention mixes information across positions. Then a feed-forward network processes each position independently:

```python
# d_model = 4096
h = x @ W_1        # 4096 -> 16384
h = activation(h)
y = h @ W_2        # 16384 -> 4096
```

Two big matrices. In a dense transformer, this is where **roughly two-thirds of all parameters live**, and every one of them is multiplied against every token.

That last part is the inefficiency MoE attacks. Consider what those parameters are storing: French grammar, Python syntax, organic chemistry, sonnet form. When the current token is part of a Python function, the French grammar parameters contribute essentially nothing, but you still pay the full matrix multiply against them.

The intuition behind MoE is straightforward: **specialise the feed-forward capacity, and only activate the relevant part.**

## The architecture

Replace the single feed-forward network with *N* parallel ones, the experts, plus a small router that decides which to use.

```python
class MoELayer(nn.Module):
    def __init__(self, d_model, d_ff, n_experts=64, top_k=2):
        self.experts = nn.ModuleList([
            FeedForward(d_model, d_ff) for _ in range(n_experts)
        ])
        self.router = nn.Linear(d_model, n_experts, bias=False)
        self.top_k = top_k

    def forward(self, x):
        logits = self.router(x)                      # (tokens, n_experts)
        weights, idx = logits.topk(self.top_k, -1)   # pick the best k
        weights = weights.softmax(-1)                # normalise over the k

        out = torch.zeros_like(x)
        for i in range(self.top_k):
            for e in range(len(self.experts)):
                sel = (idx[:, i] == e)
                if sel.any():
                    out[sel] += weights[sel, i:i+1] * self.experts[e](x[sel])
        return out
```

The router is tiny: one linear layer from `d_model` to `n_experts`, a rounding error in the parameter budget. Everything else is the experts.

The arithmetic is what makes this worth doing. With 64 experts at top-2 routing:

| Quantity | Value |
|---|---|
| Total expert parameters | 64x a dense layer |
| Activated per token | 2x a dense layer |
| Ratio of stored to used | 32x |

A model can hold a trillion parameters and activate thirty billion per token. The FLOPs you pay track the thirty billion. The knowledge capacity tracks something much closer to the trillion.

## The problem that nearly killed the idea

There is a failure mode that will happen by default, and preventing it is most of the difficulty.

The router is trained by gradient descent along with everything else. Early in training, one expert is slightly better than the others by chance. The router sends it slightly more tokens. Getting more tokens means more gradient updates, so it improves faster. Being better attracts more tokens still.

This runs away. You end up with two or three experts handling nearly all the traffic and sixty sitting idle. A dense model with a lot of dead weight, having paid the full memory cost for nothing.

The standard fix is an auxiliary **load balancing loss** added to the training objective:

```python
# f_i: fraction of tokens routed to expert i
# P_i: mean router probability for expert i
aux_loss = n_experts * (f * P).sum()
```

This is minimised when routing is uniform, and it is added to the main loss with a small coefficient, typically 0.01. Small enough not to distort the language modelling objective, large enough to keep the router honest.

The tension here is real and worth naming. You *want* experts to specialise, because specialisation is the entire point. But you *need* the load roughly balanced, or capacity is wasted. Perfect balance would mean no specialisation at all; perfect specialisation collapses to a few experts. The auxiliary loss coefficient is where you sit on that spectrum, and it is one of the more delicate hyperparameters in the whole architecture.

Related mechanisms in practice:

- **Expert capacity limits**: a cap on tokens per expert per batch. Overflow tokens are dropped (they pass through via the residual connection) or rerouted. Prevents one expert from becoming a throughput bottleneck.
- **Router z-loss**: penalises large router logits, which improves numerical stability in low precision.
- **Noisy top-k**: adding noise to router logits during training encourages exploration so the router does not lock in prematurely.
- **Shared experts**: some designs keep one expert that every token uses, for genuinely general computation, with the routed experts handling specialisation on top. This has become a common pattern.

## The trade you are actually making

Here is the part that gets lost in the excitement about parameter counts.

MoE does not make large models cheap. It **shifts the constraint from compute to memory.**

All those experts have to be resident and reachable. You are not doing the arithmetic for a trillion parameters, but you are holding a trillion parameters in memory fast enough to use on demand. Whether that is a good deal depends entirely on how you serve:

**Hosted API inference: excellent deal.** Memory cost is fixed and amortised across thousands of concurrent requests. Pay once to keep the weights resident, then serve enormous traffic against them. Cost per token drops sharply, which is the direct cause of the price declines across the industry.

**Local or single-tenant deployment: bad deal.** You pay the entire memory bill for a trillion-parameter model to get the throughput of a thirty-billion one, with no other requests to spread the cost over. This is exactly why the open-weight MoE releases of 2026 are simultaneously an achievement in API economics and a headache for anyone trying to run them on their own hardware. A smaller dense model is often the better choice.

## The overhead nobody puts in the announcement

There is a second cost, and it appears at scale rather than in the FLOP count.

The router sends each token to its chosen experts. At trillion scale those experts live on different accelerators, which means a communication step. In serving stacks this is an **all-to-all** pattern: potentially every device exchanging data with every other device, at every MoE layer, for every token.

At small batch sizes this is negligible. At the high batch sizes you need for cheap serving, it can partially offset the per-token compute savings you went sparse to obtain.

This is why a substantial share of current systems research is about MoE serving mechanics rather than model quality:

- **Expert placement and replication**: co-locating experts that frequently activate together, and replicating hot experts so traffic does not funnel through one device. Cost-aware replication schemes target exactly this.
- **Network topology**: a line of work argues that interconnects designed for dense training are the wrong shape for sparse serving, and cheaper topologies serve MoE better.
- **Batch-aware expert selection**: adjusting routing based on batch composition so the communication pattern stays tractable.
- **Proactive expert loading**: predicting which experts a request will need and prefetching them rather than stalling.
- **Memory-efficient inference**: fine-tuning approaches that reduce how much of the expert set must be resident at once.

None of this is glamorous. All of it separates a theoretical price from an achievable one.

## What experts actually specialise in

The natural assumption is that experts learn interpretable domains: one for code, one for French, one for chemistry.

Reality is messier. Interpretability studies of trained MoE models generally find specialisation that is real but not aligned to human categories. Experts tend to organise around:

- **Token-level and syntactic patterns**: punctuation, numerals, whitespace structure, particular morphological shapes.
- **Positional and contextual role**: where in a sequence a token sits and what structural function it serves.
- **Statistical clusters with no clean label**: groups of tokens that co-occur in ways the model found useful to handle together, resistant to any tidy description.

Domain specialisation does appear, more strongly in later layers, but it is a tendency rather than a partition. This is not a defect. The router is optimising for prediction loss, not for legibility, and there is no reason its useful decomposition should match ours.

One practical consequence worth flagging: because routing is content-dependent and shared across a batch, MoE models have a subtle information leakage surface. Research has demonstrated that an adversary can extract information about other users' prompts from routing behaviour in a shared batch. Worth knowing if you are serving multi-tenant traffic.

## Design choices and their consequences

If you are configuring an MoE, the levers and what they do:

### 1. Number of experts

More experts means more total capacity for the same compute. It also means more memory, more communication, and more difficulty keeping load balanced. Frontier models commonly use somewhere between 8 and 256 experts per layer.

### 2. Top-k

**k=1** is the cheapest and hardest to train. Routing becomes a discrete decision with no gradient blending, and quality typically suffers. **k=2** is the most common choice, giving the router a soft blend of two experts and much better gradients for modest extra cost. **k=4 and above** improves quality further with diminishing returns and rising cost.

### 3. Which layers get experts

Not all of them, usually. A common pattern is alternating dense and MoE layers, or MoE only in later layers. Early layers do fairly universal low-level processing where specialisation buys little, so spending memory there is wasteful.

### 4. Expert size

Given a memory budget, you can have many small experts or few large ones. Many small experts give finer specialisation and better balance behaviour; fewer large experts give more capacity per expert and less routing overhead. Recent designs lean toward more, smaller experts.

## Why this became universal

Step back and the appeal is a scaling-law argument.

Model quality improves predictably with parameters and with data. But compute per token scales with *activated* parameters, and compute is the binding cost in both training and serving.

MoE decouples those two. You can grow total parameters, and therefore capacity and quality, while holding activated parameters and cost per token nearly fixed.

That is why every lab converged here independently, and it is directly responsible for the price-per-capability declines of the last two years. Trillion-parameter models exist because sparsity made them serveable, not because dense training got cheaper.

The catch remains what it always was: you traded a compute problem for a memory-and-networking problem. For hyperscale API serving, that trade is overwhelmingly favourable. For running a model on your own machine, it frequently is not, which is worth remembering the next time an impressive open-weight parameter count arrives and turns out to need a small cluster to load.

Hero diagram: [DeepSeekMoE and Multi-Head Latent Attention](https://commons.wikimedia.org/wiki/File:DeepSeek_MoE_and_MLA_%28DeepSeek-V2%29.svg) by DeepSeek, MIT licence, via Wikimedia Commons. Rasterised and padded to fit; not otherwise altered.
