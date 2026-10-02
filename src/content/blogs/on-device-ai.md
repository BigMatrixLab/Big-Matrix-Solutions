---
id: "81"
slug: "on-device-ai-npus-local-inference"
title: "On-Device AI and NPUs: When Inference Belongs on the Laptop"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/on-device-ai-m5-lm-studio.jpg"
category: "AI Infrastructure"
desc: "Laptop NPUs now advertise 40 to 80 TOPS. What they are actually good at, why memory bandwidth matters more than TOPS for local LLMs, and a simple test for when a workload should leave the cloud."
date: "Jan 05, 2027"
tags: ["AI Infrastructure", "On-Device AI", "NPU", "Edge AI", "LLM"]
---

# On-Device AI and NPUs: When Inference Belongs on the Laptop

Every new laptop now ships with a neural processing unit, and every spec sheet shows a TOPS figure. Microsoft requires an NPU of more than 40 TOPS for a machine to be called a Copilot+ PC. Intel's Core Ultra Series 3 lists up to **50 NPU TOPS**. Qualcomm describes the Snapdragon X2 Elite's **80 TOPS** NPU as the fastest for laptops. Apple's M5 adds a Neural Accelerator to every GPU core alongside its 16-core Neural Engine.

The hardware is real. The useful question is which work should run on it rather than in a data centre, and which spec actually limits that work. The answer is often not TOPS.

## What an NPU is, and what it is for

An NPU is a block on the system-on-chip that does one job: low-precision matrix and convolution maths at low power. Microsoft's developer guide describes it as a chip for "AI-intensive processes like real-time translations and image generation", running alongside the CPU and GPU, with the operating system routing each task to the most suitable unit.

The design priority is **performance per watt**, not peak performance. A laptop GPU can often match or beat the NPU on raw throughput, but it draws far more power doing so. NPUs are built for workloads that run continuously or often:

- background blur and eye contact in video calls
- live captions and translation
- on-device search and photo indexing
- short text tasks such as summarising a notification or rewriting a sentence

These features would drain a battery quickly on the GPU. On an NPU they cost very little.

There is a catch. Microsoft notes that many NPUs "only support integer math in lower bit format, such as INT8". Models must be quantised and converted before they run there, and the toolchains (ONNX Runtime, Qualcomm's QNN, Intel's OpenVINO, Apple's Core ML) each support a different set of operators. A model that runs on the GPU will not necessarily run on the NPU without that conversion work.

## Why TOPS is the wrong number for local LLMs

A TOPS rating measures peak integer operations per second. For vision models and short bursts of work, that is a fair guide. For generating text with a large language model, it is mostly irrelevant, because LLM decoding is limited by **memory bandwidth**.

Each new token requires reading every weight of a dense model from memory once. The compute per weight is small, so the chip spends most of its time waiting for data. That gives a simple ceiling:

> maximum tokens per second ≈ memory bandwidth ÷ bytes of weights read per token

![Bar chart of theoretical decode ceilings at 153 GB/s: about 204 tokens per second for a 3B model at 2-bit, 38 for 8B at 4-bit, 22 for 14B at 4-bit, 10 for 32B at 4-bit](/assets/images/blog/diagrams/on-device-ai-1.svg)

*Diagram: Big Matrix Solutions; bandwidth figure from [Apple](https://www.apple.com/newsroom/2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon/). Figures are calculated upper bounds, not measurements.*

Apple quotes **153 GB/s** of unified memory bandwidth for the base M5. Apply the formula and a 4-bit 8B model (about 4 GB of weights) has a ceiling near 38 tokens per second. A 4-bit 32B model (about 16 GB) drops to about 10. Real speeds are lower once you add KV cache reads and overheads. No amount of extra TOPS changes this ceiling; only more bandwidth or fewer bytes per token do.

Two practical consequences follow:

- **Memory capacity decides which models you can run at all.** A 16 GB laptop shares that memory with the operating system and your apps. A 4-bit 8B model fits comfortably. A 32B model does not.
- **Quantisation matters more than the accelerator.** Going from 4-bit to 2-bit halves the bytes per token and roughly doubles the ceiling, if the model's quality survives it.

This is why Apple's on-device foundation model is designed the way it is. Apple's 2025 technical report describes an approximately **3B-parameter** model compressed to **2 bits per weight** with quantisation-aware training, plus a KV-cache-sharing design that cuts KV cache memory by **37.5%**. Every choice reduces bytes moved per token.

## What small local models can and cannot do

A 3B or 8B model on a laptop is not a frontier model in miniature. Apple says so directly: its on-device model is "not designed to be a chatbot for general world knowledge". It is aimed at summarisation, entity extraction, text refinement, classification and short structured outputs. Apple's Foundation Models framework supports this with guided generation (output constrained to a Swift type) and tool calling, so the app supplies facts instead of relying on the model to know them.

That split is a good general rule:

| Task shape | Good fit on device? |
|---|---|
| Extract fields from text the user already has | Yes |
| Summarise or rewrite a short document | Yes |
| Classify, tag, route | Yes |
| Speech, vision, camera effects | Yes, this is what NPUs are built for |
| Open-ended questions needing world knowledge | Usually no |
| Long multi-step reasoning or agentic coding | Usually no |
| Very long contexts | Limited by memory |

![Apple M5 chip](/assets/images/blog/on-device-ai-m5-chip.jpg)

*Apple M5. Apple says it delivers over 4x the peak GPU compute for AI of M4. Source: [Apple Newsroom](https://www.apple.com/newsroom/2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon/)*

## Where local LLMs actually run: often not the NPU

There is a gap between the NPU marketing and how people run local language models in practice. Much local LLM inference runs on the GPU or CPU. llama.cpp, a widely used local runtime, lists many GPU back ends (Metal, CUDA, Vulkan, HIP, SYCL) and only a few NPU ones, such as Snapdragon Hexagon. GPU toolchains are more mature, and GPUs handle the wide range of operators that modern models use.

Vendors are closing the gap from both directions. Microsoft's Windows ML now detects the available hardware and loads the right execution provider (QNN for Qualcomm NPUs, OpenVINO for Intel), falling back to GPU or CPU if needed. Apple went the other way with M5, putting Neural Accelerators inside the GPU cores so that GPU-based AI code benefits directly.

The practical takeaway: on a laptop, "the AI chip" is really the whole system-on-chip and its shared memory. Which unit runs your model depends on the toolchain as much as the silicon.

## A simple test for what belongs on the device

Run inference locally when most of these are true:

1. **The data should not leave the device.** Health notes, legal drafts, private messages, regulated data. Local inference avoids a whole category of data-processing questions.
2. **Latency or offline use matters.** Live captions, keyboard suggestions and field work with poor connectivity cannot wait for a round trip.
3. **The task is narrow.** Extraction, classification and short rewriting fit small models. Open-ended reasoning does not.
4. **Volume is high and value per call is low.** Thousands of tiny calls per user per day cost real money in the cloud and nothing extra on a device the user already owns.

Keep it in the cloud when the task needs frontier-level reasoning, broad world knowledge, long contexts, or consistent behaviour across every user's hardware.

Many products end up hybrid. Apple's own design pairs the on-device model with a larger server model on its Private Cloud Compute, and the same pattern works for any app: handle the routine cases locally and send the hard ones to a larger model.

## What it means for you

- **Do not buy or specify hardware on TOPS alone.** For LLM features, ask about memory size and memory bandwidth.
- **Plan for quantisation and conversion.** Budget engineering time to get a model running well on each target's NPU or GPU path, and test quality after quantising.
- **Design for fallback.** Not every user has a 40-plus TOPS NPU. Your feature should degrade gracefully to GPU, CPU or cloud.
- **Use the platform models where they exist.** On Apple platforms the Foundation Models framework gives you a tuned 3B model with no download. On Windows, Windows ML handles hardware selection for you.
- **Measure on real devices.** Thermal limits, shared memory and background load all make laptop performance less predictable than a data-centre GPU.

## The bottom line

On-device AI is not a smaller copy of cloud AI. It is a different tool with a different cost model: no per-call fee, strong privacy, low latency, and hard limits set by memory. NPUs make always-on perception and short language tasks almost free in power terms. Larger local language models are limited by bandwidth and capacity, whatever the TOPS figure says. As of late 2026, the teams getting the most from laptop silicon treat it as the first tier of a hybrid system: run the routine work locally and send the rest to larger models in the cloud.

**Sources**

- https://learn.microsoft.com/en-us/windows/ai/npu-devices/
- https://www.apple.com/newsroom/2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon/
- https://machinelearning.apple.com/research/apple-foundation-models-2025-updates
- https://arxiv.org/abs/2507.13575
- https://github.com/ggml-org/llama.cpp
- https://newsroom.intel.com/artificial-intelligence/ces-2026-intel-core-ultra-series-3-debut-first-built-on-intel-18a
- https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/images/company/news-media/media-center/press-kits/snapdragon-summit-2025-press-kit/day-2-/documents/SnapdragonX2EliteExtremeandSnapdragonX2Elite_FeaturesataGlance.pdf

**Media credits**:
- Hero image: MacBook Pro with M5 running a local model in LM Studio, © Apple — [Apple Newsroom](https://www.apple.com/newsroom/2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon/) (official press image, unaltered)
- Apple M5 chip image, © Apple — [Apple Newsroom](https://www.apple.com/newsroom/2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon/)
- Decode-ceiling diagram: Big Matrix Solutions, calculated from Apple's published bandwidth figure
