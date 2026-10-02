---
id: "32"
slug: "ai-is-power-bound-not-gpu-bound"
title: "Power-Bound, Not GPU-Bound: The Constraint That Now Shapes AI"
comments: "0"
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
category: "AI Infrastructure"
desc: "70 TWh this year, single sites approaching 2 GW, and grids that cannot deliver. The bottleneck stopped being chips and became electricity."
date: "Feb 26, 2027"
tags: ["AI Infrastructure", "Energy", "Data Centers", "Compute"]
---

# Power-Bound, Not GPU-Bound: The Constraint That Now Shapes AI

For three years the question limiting AI progress was how many accelerators you could get. Allocation was the currency. Whole strategies were built around securing supply.

That constraint has been replaced, and the replacement is harder to engineer around.

**The primary constraint on AI infrastructure expansion is no longer capital or technology, but the inability of public electrical grids to deliver sufficient, reliable power.** Data centre power capacity is now the more pressing limit on new deployments. You can buy the chips. You may not be able to plug them in.

## The numbers

Global AI computation is projected to require at least **70 TWh of electricity in 2026**, comparable to the total consumption of Austria or Finland.

The trajectory matters more than the level:

| Measure | Figure |
|---|---|
| AI compute electricity, 2026 | ~70 TWh |
| Leading firms' data centre use, 2024 | ~118 TWh |
| Same, projected 2030 | 239–295 TWh |
| Largest single training runs, 2030 | 4–16 GW |
| US electricity going to AI by 2030 | ~7.4% |
| Data centres as share of US demand by 2030 | approaching 10% |

The gigawatt figures are the ones to sit with, because they are about *instantaneous* draw rather than annual consumption. OpenAI's planned Stargate facility reaches **1.2 GW**. Meta's planned Louisiana site is projected to exceed **2 GW**.

For scale: a large nuclear reactor produces roughly 1 GW. A single AI training facility is being designed around a demand equivalent to one or two reactors, dedicated.

## Why the grid is the hard part

Building a data centre takes eighteen months to three years. Building the transmission and generation to feed a multi-gigawatt load takes considerably longer, and the delay is mostly not technical.

**Interconnection queues.** Connecting large new load or generation to a grid requires studies, approvals, and coordination with the operator. Queues in the most attractive regions run years deep, and a project's position in the queue is frequently the binding constraint on its schedule.

**Transmission, not generation.** There is often power available somewhere and no way to move it to where the data centre is. New high-voltage transmission requires right-of-way acquisition and permitting across multiple jurisdictions, a decade-scale process in many places, driven by land use politics rather than engineering.

**Local resistance.** Communities have grown noticeably less enthusiastic about hosting facilities that consume enormous power and water while producing few local jobs. This has become a material factor in siting.

**Concentration effects.** This is the least appreciated and possibly most serious issue. Data centres cluster in Northern Virginia, Texas, and a handful of other regions. Research on concentrated siting of AI data centres shows it drives **regional power-system stress** under rising global compute demand. National averages look manageable while specific grids are under real strain.

## The workload behaves badly on a grid

An underappreciated technical wrinkle: AI is not just a large load, it is an unusually *difficult* load.

A training run synchronises thousands of accelerators. They compute together, communicate together, and idle together. The result is a power draw that swings sharply and coherently across an entire facility, very unlike the smooth, statistically-averaged demand grids were designed for.

Research on wide-area power system oscillations from large-scale AI workloads examines exactly this: coordinated multi-megawatt swings can excite oscillations in the transmission system, a grid stability problem rather than a capacity problem. Adding capacity does not fix it.

This is why work on compositional power trace generation for LLM inference has emerged as its own research area. Planning infrastructure for these facilities requires modelling the power signature of the workload, and the workload's signature is unlike anything utilities have planned around before.

## Training and inference are different problems

A distinction that gets flattened in most coverage, and it matters because the two halves of AI compute place almost opposite demands on a grid.

**Training** is a small number of enormous, long-running, latency-insensitive jobs. A run occupies thousands of accelerators for weeks. It does not care where it happens. A training cluster can sit next to a hydroelectric dam in the middle of nowhere and nobody notices. It can also, in principle, be paused.

**Inference** is an enormous number of small, latency-sensitive requests. It has to be near users, or at least near enough that round-trip time is acceptable. It cannot be paused, because someone is waiting. And its demand curve follows human activity, peaking during waking hours in the region it serves, which is exactly when the local grid is already under load.

The consequence is that the two workloads are migrating in different directions. Training is chasing cheap and abundant power wherever it exists, increasingly co-located with generation. Inference is staying near population centres and competing for capacity in precisely the regions where grids are most constrained.

That split also determines which mitigations apply. Interruptible power contracts and remote siting work well for training and barely at all for inference. Efficiency work (quantisation, cache reuse, model right-sizing, batching) is where the inference side has to find its savings, which is one reason serving optimisation has become such an active area.

There is a second-order effect worth noting: as inference grows as a share of total AI compute, the workload mix shifts toward the harder-to-place half. The aggregate energy figures understate how constrained the situation is, because an increasing fraction of that energy has to be delivered somewhere specific, at a specific time.

## What actually gives

Given the constraint, the responses fall into a few buckets. Some are real and some are marketing.

**Behind-the-meter generation.** Build your own power on site: gas turbines now, small modular reactors in the aspirational timeline. This bypasses the interconnection queue, which is the main attraction. Nuclear timelines remain long enough that current announcements are about the 2030s.

**Follow the power.** Site where electricity is available rather than where latency is ideal. Training is latency-insensitive, so you can put a training cluster next to cheap stranded generation. Inference is not, which is producing a split: training in the middle of nowhere, inference near users.

**Temporal flexibility.** Training can pause. If you can throttle during peak demand, you become a far better grid citizen and can negotiate cheaper interruptible power. This is real and underused, and it is one of the few levers that helps both sides.

**Efficiency.** Better chips per FLOP, better utilisation, sparse architectures, quantisation, improved cooling. All genuinely help. None of them help *enough*. Efficiency gains have historically been absorbed by increased usage rather than reducing total draw, which is the pattern to expect here too.

**Just build the grid.** Slow, expensive, necessary. The reassuring finding is that at least until the end of the decade, energy bottlenecks will likely **not** prevent compute scaling, because power infrastructure development is proceeding. It will constrain *where* and *when*, which is different from a hard ceiling.

## What follows for everyone else

If you are not building data centres, the constraint still reaches you through three channels.

**Regional availability diverges.** Capacity in a given region becomes a function of that region's grid, not global chip supply. Expect uneven availability, more variable pricing by geography, and data residency requirements colliding with the fact that the power is somewhere else.

**Efficiency becomes a real cost lever again.** For a stretch, compute felt effectively unlimited and inefficiency was cheap. When the underlying resource is genuinely constrained, right-sizing models, caching aggressively, and reusing KV caches stop being hygiene and start being economics.

**Sustainability reporting arrives.** With data centres approaching a tenth of US electricity demand, AI energy use becomes a regulated disclosure rather than a talking point. Global energy demand is already a live topic in the AI regulatory conversation, and work on the sustainability implications of AI-driven data centres on power systems is building the evidence base that regulation will cite.

## The water question, briefly

Power gets the attention; water is the constraint that generates the local opposition.

Large data centres reject heat, and evaporative cooling is the cheapest way to do it. That consumes water: meaningful volumes, continuously, frequently in regions where water is already contested. Texas and parts of the American Southwest are attractive for power and solar availability and are not places with water to spare.

Closed-loop and air-cooled designs reduce or eliminate water draw at the cost of efficiency and capital, and liquid cooling for dense accelerator racks changes the calculus again. The engineering is tractable. The politics are what actually determine siting, and a community weighing local jobs against local water is not usually persuaded by a total-cost-of-ownership argument.

That explains a pattern that looks irrational from the outside: projects being blocked or relocated in regions that have available power. The binding constraint at a specific site is often neither chips nor electricity but a permit, and the objection behind the permit is frequently about water.

## The framing that helps

The useful mental shift is to stop thinking of compute as a product you buy and start thinking of it as **electricity you have converted into inference**.

That reframing makes several otherwise-puzzling things obvious. Why frontier labs are signing power purchase agreements and talking about reactors. Why data centres are appearing next to generation rather than next to users. Why training runs are scheduled around grid conditions. Why "we have the GPUs" stopped being the flex it was in 2024.

It also sets the right expectation for the next few years. The constraint is not going away, and it is not the kind of constraint that yields to a clever algorithm. Grid buildout is a decade-scale physical process governed by permitting, land acquisition, and utility planning cycles, none of which move at the pace the industry has become accustomed to.

Progress will continue, because the infrastructure is being built and efficiency keeps improving. It will be shaped, in a way it has not been before, by the physical business of moving electricity from where it is made to where the computers are.
