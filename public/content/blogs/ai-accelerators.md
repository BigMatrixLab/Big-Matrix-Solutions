---
id: "74"
slug: "gpus-tpus-custom-silicon-ai-accelerators"
title: "GPUs, TPUs and Custom Silicon: How AI Accelerators Differ"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/ai-accelerators-ironwood.webp"
category: "AI Infrastructure"
desc: "Programmable GPUs, systolic-array TPUs and cloud-built chips like Trainium all multiply matrices. What differs is memory, interconnect and software, and that is what you are really choosing."
date: "Dec 22, 2026"
tags: ["AI Infrastructure", "GPU", "TPU", "Trainium", "Hardware"]
---

# GPUs, TPUs and Custom Silicon: How AI Accelerators Differ

Every AI accelerator sold today exists to do one thing quickly: multiply large matrices of low-precision numbers. A transformer is mostly matrix multiplication, so whoever does it fastest per watt and per dollar wins the workload.

That shared goal hides real differences. An NVIDIA GPU, a Google TPU and an AWS Trainium chip take different routes to the same arithmetic, and the route decides what each one is good at, what software it runs and how hard it is to move away from. This post explains those routes and gives you a way to compare them that goes beyond peak FLOPS.

## The common core: matrix units and high-bandwidth memory

Strip away the branding and every modern AI accelerator has the same four parts:

- **Matrix engines**: dedicated hardware for multiply-accumulate on blocks of numbers (Tensor Cores on NVIDIA, MXUs on TPUs, Tensor engines on Trainium).
- **High-bandwidth memory (HBM)**: DRAM stacked next to the compute die, providing terabytes per second. Model weights and the KV cache live here.
- **A chip-to-chip fabric**: NVLink, Google's ICI, AWS NeuronLink. This lets dozens or thousands of chips act as one machine.
- **A compiler and runtime**: CUDA, XLA, the Neuron SDK. In practice this is the part you deal with most.

The differences are in how much silicon goes to each part and how much of it the programmer can control.

## GPUs: the programmable generalist

A GPU started as a graphics processor, and its design still shows that. It is built from many streaming multiprocessors (SMs), each running thousands of threads, with matrix units added inside each SM. NVIDIA's Rubin GPU, for example, has **336 billion transistors, 224 SMs and 896 Tensor Cores**, up to **288 GB of HBM4** at up to **22 TB/s**, and up to **50 petaflops of NVFP4** compute, according to NVIDIA's architecture write-up.

The strength of that design is programmability. Any operation you can write as a CUDA kernel runs on the same hardware: a new attention variant, a custom sampling routine, a scientific simulation. When a research paper introduces a new layer type, a GPU kernel usually exists within weeks. That is why most new model architectures appear on GPUs first.

The other strength is scale-up. NVIDIA sells GPUs in rack-sized NVLink domains rather than as single cards. A GB200 NVL72 connects **72 Blackwell GPUs** with **13.4 TB of HBM3e** and **130 TB/s** of NVLink bandwidth; the Vera Rubin NVL72 keeps 72 GPUs and raises the rack to **20.7 TB of HBM4**. Inside that domain, any GPU can reach any other's memory at NVLink speed. This matters a lot for serving large models that must be split across chips.

The cost is overhead. Schedulers, caches, register files and general-purpose control logic all take die area and power that a fixed-function design does not need.

## TPUs: the systolic specialist

Google designed the TPU around one idea: if the workload is matrix multiplication, build a large grid of multiply-accumulate units and stream data through it. That grid is a **systolic array**.

![Diagram of a 4 by 4 systolic array: activations enter from the left, weights are held in each cell, partial sums flow downward](/assets/images/blog/diagrams/ai-accelerators-1.svg)

*Diagram: Big Matrix Solutions, based on [Google Cloud TPU architecture docs](https://docs.cloud.google.com/tpu/docs/system-architecture-tpu-vm).*

Each cell multiplies the value arriving from its left by a stored weight, adds the partial sum from above and passes both along. Google's documentation says this lets TPUs run matrix operations without memory access between each step, which is where the efficiency comes from. Recent TPUs (v6e and TPU7x) use **256 x 256** arrays; earlier generations used 128 x 128.

The first TPU paper (Jouppi et al., 2017) described a **65,536-unit 8-bit MAC array** peaking at **92 TOPS**, deployed in Google data centres since 2015. The current generation, TPU7x (Ironwood), lists per chip:

| Spec (TPU7x, per chip) | Value |
|---|---|
| Peak FP8 | 4,614 TFLOPS |
| Peak BF16 | 2,307 TFLOPS |
| HBM | 192 GiB at 7,380 GBps |
| Inter-chip interconnect | 1,200 GBps bidirectional |
| Chips per pod | 9,216 |
| Cores | 2 TensorCores, 4 SparseCores |

The SparseCores are a useful detail. They are dataflow processors for embedding lookups in recommendation models, which a systolic array handles poorly. Google added specialist hardware next to the main matrix units instead of making those units more general.

The trade-off is stated plainly in Google's own docs: TPUs "can't run word processors, control rocket engines, or execute bank transactions." Anything that does not fit the matrix-and-vector model has to be expressed in a form the XLA compiler can map onto the hardware. The main path is JAX, with PyTorch supported through XLA. Workloads that fit that model run very well. Unusual custom kernels take more effort.

![Google comparison table of TPU v4, TPU v5p and Ironwood: pod size, HBM capacity and bandwidth, and peak FLOPS per chip](/assets/images/blog/ai-accelerators-tpu-generations.webp)

*Three TPU generations. Note the peak FLOPS row uses each chip's headline precision, so it is not a like-for-like comparison. Source: [Google](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/ironwood-tpu-age-of-inference/)*

The other TPU hallmark is the pod. Instead of one rack-scale domain, Google connects thousands of chips in a 3D torus over ICI. Ironwood pods reach 9,216 chips, and Cloud TPU slices of TPU7x are offered in topologies up to 2,048 chips.

## Custom cloud silicon: Trainium and its peers

The third category is chips built by cloud providers for their own data centres. AWS Trainium is the clearest example. Trainium3, which AWS launched in December 2025, has per chip:

- **144 GB of HBM3e at 4.9 TB/s**, which AWS says is 1.7x the bandwidth of Trainium2
- **eight cores**, each with Tensor, Vector, Scalar and GPSIMD engines running in parallel
- support for MXFP8 and MXFP4 microscaling formats

AWS sells it in UltraServers of up to **144 chips**, totalling **362 MXFP8 petaflops** and **20.7 TB of HBM3e**.

Architecturally, Trainium sits between the two extremes. Like a TPU, it has dedicated matrix engines and depends on a compiler (the Neuron SDK). Like a GPU, it includes general-purpose engines (GPSIMD) for custom operators. The business reason matters more than the architecture: a cloud provider that designs its own chip controls its costs and supply, and can price instances below comparable GPU instances.

Microsoft (Maia 200, announced in January 2026 as an inference accelerator) and Meta (the MTIA family, which began with chips for its recommendation models) build in-house accelerators for similar reasons. Very few teams outside the companies that make these chips buy them directly. You rent them.

## How to compare them honestly

Spec sheets invite you to compare peak FLOPS. That is usually the least useful number, for three reasons.

**Precision differs.** Vendors quote headline compute at their lowest supported format: NVFP4 for Rubin, FP8 for Ironwood, MXFP8 for Trainium3. NVIDIA's own tables also mark some figures as sparse, meaning dense throughput is half. Two "petaflops" figures from two vendors are rarely the same unit.

**Memory decides inference.** Generating each token means reading the model's weights and KV cache from HBM. For most serving workloads, HBM capacity sets which models fit on one chip, and HBM bandwidth sets tokens per second. On those two numbers the three chips are closer than their FLOPS suggest:

| Chip | HBM per chip | HBM bandwidth |
|---|---|---|
| NVIDIA Rubin | 288 GB HBM4 | up to 22 TB/s |
| Google TPU7x | 192 GiB | 7.38 TB/s |
| AWS Trainium3 | 144 GB HBM3e | 4.9 TB/s |

**The fabric decides scale.** Frontier models do not fit on one chip. How fast chips share data (NVLink at 3.6 TB/s per Rubin GPU, ICI at 1.2 TB/s per TPU7x chip) and how many can join one domain decide how efficiently a large model can be split.

## What it means for you

Most teams never choose an accelerator directly. They choose a cloud, a managed API or an inference provider. The choice still reaches you in a few ways:

- **Portability is a software question.** Code written in plain PyTorch with standard layers moves between GPU, TPU and Trainium with moderate effort. Code that depends on hand-written CUDA kernels does not. If you expect to change hardware, avoid custom kernels unless you really need them.
- **Benchmark your own workload.** Run your model at your sequence lengths and batch sizes on each candidate. The ranking often differs from the spec-sheet ranking.
- **Price per useful token, not per hour.** A cheaper instance that needs twice the chips to hold your model is not cheaper.
- **Availability is a feature.** Where GPU capacity is tight, TPU or Trainium capacity may be easier to get, and that alone can decide a project.
- **Frameworks hide more than they used to.** vLLM, JAX and PyTorch/XLA now target several back ends, which makes multi-vendor strategies more realistic than they were a few years ago.

## The short version

GPUs trade some efficiency for programmability and the largest software ecosystem. TPUs give up generality for systolic-array efficiency and very large pods. Cloud-built chips like Trainium trade ecosystem breadth for cost control by the company that owns the data centre. All three are converging on the same parts: low-precision matrix engines, ever more HBM and faster fabrics. So as of late 2026 the deciding factors are less often raw compute and more often memory, interconnect, software maturity and what you can actually rent. For a closer look at the cost side, our posts on inference economics and power constraints cover the economics and the electricity.

**Sources**

- https://developer.nvidia.com/blog/inside-nvidia-rubin-gpu-architecture-powering-the-era-of-agentic-ai/
- https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/
- https://www.nvidia.com/en-us/data-center/gb200-nvl72/
- https://docs.cloud.google.com/tpu/docs/tpu7x
- https://docs.cloud.google.com/tpu/docs/system-architecture-tpu-vm
- https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/ironwood-tpu-age-of-inference/
- https://arxiv.org/abs/1704.04760
- https://aws.amazon.com/ai/machine-learning/trainium/
- https://www.hpcwire.com/2025/12/02/aws-brings-the-trainium3-chip-to-market-with-new-ec2-ultraservers/
- https://blogs.microsoft.com/blog/2026/01/26/maia-200-the-ai-accelerator-built-for-inference/
- https://ai.meta.com/blog/meta-mtia-scale-ai-chips-for-billions/

**Media credits**:
- Hero image: Ironwood TPU boards, © Google — [Google blog](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/ironwood-tpu-age-of-inference/) (official press image; converted to JPEG, not otherwise altered)
- TPU generations comparison graphic, © Google — [Google blog](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/ironwood-tpu-age-of-inference/)
- Systolic array diagram: Big Matrix Solutions, based on [Google Cloud TPU architecture documentation](https://docs.cloud.google.com/tpu/docs/system-architecture-tpu-vm)
