---
id: "35"
slug: "computer-use-agents-the-hardest-easy-problem"
title: "85% on OSWorld, 20% on the Sequel: The Hardest Easy Problem in AI"
comments: "0"
image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
category: "Agentic AI"
desc: "Agents that drive a mouse and keyboard went from 12% to 85% in two years. Then a harder benchmark put the best system at one fifth."
date: "Mar 19, 2027"
tags: ["Computer Use", "Agentic AI", "Benchmarks", "Automation"]
---

# 85% on OSWorld, 20% on the Sequel: The Hardest Easy Problem in AI

Computer-use agents do the thing that looks easiest and turns out to be hardest: operate a computer the way a person does. Look at the screen, move the mouse, click, type, read what happened, do the next thing.

No API. No integration. Just pixels in and mouse-and-keyboard out — which is what makes it appealing, since every piece of software already has a GUI and most do not have a usable API.

The progress curve on this is one of the more informative things in AI right now, mostly because of what happened when someone made the benchmark harder.

## The curve, and the correction

OSWorld is a suite of 369 tasks on Ubuntu and Windows: desktop application control, file operations, web browsing, and multi-app workflows. Real applications, real screenshots, low-level mouse-and-keyboard actions, spanning office software, browsers, files, code, image editing, and the terminal.

The trajectory on it looks like a solved problem:

| Date | Best score on OSWorld |
|---|---|
| April 2024 | 12% |
| June 2026 | 85% |

Twelve to eighty-five in twenty-six months. If you stopped reading there you would conclude computer use is done.

Then OSWorld 2.0 arrived — a long-horizon benchmark where **the median task takes a human 1.6 hours**. On that, the best frontier system completes **20.6 percent of tasks**. Claude Opus 4.8 posts the top result at around 20.5 percent, consuming roughly **225,000 tokens** in the process.

Eighty-five percent on tasks that take a human minutes. Twenty percent on tasks that take a human an hour and a half.

That gap is the entire story, and it is not a benchmark artefact. It is a statement about what kind of capability the 85 percent represented.

## What breaks over a long horizon

The failures on long-horizon computer use are structural rather than perceptual. The agent can see the screen fine. What degrades is everything about maintaining a coherent multi-hour effort.

**Error recovery compounds.** A task with 200 steps at 99 percent per-step reliability succeeds about 13 percent of the time. Long-horizon success is not about being good at steps, it is about detecting and recovering from the bad ones — and detection is the weak part, since the agent frequently does not notice the click missed.

**State becomes unobservable.** Halfway through a long task, what matters is not on screen. Which files were already processed, which settings were changed, whether that dialog was dismissed or is behind another window. A person holds this implicitly. An agent has a screenshot and whatever survived in its context.

**Context fills with visual debris.** Every screenshot is expensive in tokens, and most are near-duplicates of the last one. Two hundred and twenty-five thousand tokens for one task, largely spent re-reading the same interface. The signal-to-noise ratio of the context degrades as the task progresses, which is exactly backwards from what you want.

**Interfaces are modal in ways that trap agents.** A dialog opens and the agent does not realise its clicks are being swallowed. A form has validation that silently rejects input. A page is still loading. Humans read these situations instantly from cues an agent has to infer from raw pixels.

**No mental model of the application.** A person opening an unfamiliar spreadsheet knows there is a menu bar, that undo exists, that a right-click probably offers something useful. An agent has strong priors from training data and no way to verify them in the current application, so it guesses plausibly and sometimes destructively.

## The safety problem gets worse with horizon

An important finding from the OSWorld 2.0 work: realistic long-horizon tasks **expose hidden safety risks that rarely appear in simple settings**.

The reasoning is uncomfortable and worth spelling out. Short tasks are inherently bounded — few actions, limited scope for damage, and a human usually watching. Long tasks are unsupervised by design, which means:

- **Recovery attempts can be destructive.** An agent stuck on a file operation may try deleting and recreating. Reasonable-looking, occasionally catastrophic.
- **Scope creeps silently.** Two hours in, an agent working around a blocker may have modified settings, installed something, or changed files well outside the task's remit.
- **Confirmation dialogs get dismissed.** An agent that has learned dialogs are usually obstacles will click through the one that mattered.
- **Credentials are in reach.** An agent with desktop access has whatever the logged-in user has — password managers, email, banking sessions, SSH keys.

Research on the blind spot of agent safety makes the sharper version of this point: **entirely benign user instructions can expose critical vulnerabilities in computer-use agents.** No adversary required. The danger is in the execution path, not the request.

## Why do it at all

Given the difficulty, the case for computer use has to be strong, and it is.

**It is the universal integration.** Every application has a GUI. Perhaps a fifth have a usable API. An agent that operates a GUI works against legacy enterprise software, desktop applications, and internal tools that will never get an API — which is where an enormous amount of real business process lives.

**It requires no cooperation.** API integration needs the vendor to build one, document it, and keep it stable. GUI operation needs nothing from anybody.

**It matches how processes are documented.** Business processes are written as click-here-then-there instructions, because that is how the people doing them work. An agent that follows those instructions literally can automate the process as written.

That last point is why enterprise interest is real despite the numbers. Salesforce built SCUBA, its own computer-use benchmark, which tells you something about how seriously this is being pursued inside companies with a lot of GUI-bound process.

## The grounding problem

One technical difficulty deserves singling out, because it is the source of a large share of the step-level failures and it is unglamorous enough to get skipped.

**Grounding** is the mapping from "click the Save button" to a specific pixel coordinate. It sounds trivial and it is where a great deal goes wrong.

The agent sees a screenshot. It has to identify the target element, determine its bounding box, and emit a coordinate. Errors creep in at every stage: the element is identified correctly but the coordinate lands two pixels outside it; there are two buttons labelled Save and the wrong one is chosen; the element is partially scrolled out of view; the screenshot was captured mid-render; the display is scaled and the coordinate space does not match what the model assumed.

Each individual failure is small. Over two hundred steps, a 2 percent grounding error rate is four misclicks, and a misclick is not a no-op — it activates something else. The agent then observes an unexpected state, attempts to recover, and may compound the problem.

This is precisely why hybrid action spaces are such a large improvement. If an accessibility tree is available, the agent can address an element by identity rather than by coordinate, and the entire error class disappears. Clicking an element with a known id cannot land two pixels off. Falling back to pixels only when nothing structured exists converts grounding from a constant tax into an occasional one.

It also explains why browser automation is meaningfully more reliable than desktop automation today: the DOM is a structured representation of exactly what is on screen, and most desktop applications expose nothing comparable.

## Where the research is going

Three directions, and they are converging on the same insight.

**Hybrid action spaces.** Pure pixel-and-mouse is unnecessarily hard. If an accessibility tree, a DOM, or a CLI is available, use it — and fall back to pixels only when nothing better exists. UltraCUA is built around this idea, and it is straightforwardly right: the constraint was never that agents must only see pixels, it was that pixels are the universal fallback.

**Compositional generalist-specialist designs.** Agent S2 splits a generalist planner from specialists that handle particular applications or interaction types. This is the same conclusion multi-agent work reached: decompose on genuine boundaries, and keep each component's mess out of the others' context.

**Verifiable training environments.** OpenComputer builds verifiable software worlds for computer-use agents — environments where success is machine-checkable, so you can generate training signal at scale. Given how much of recent reasoning progress came from verifiable rewards, this is likely the highest-leverage direction available.

There is also serious attention on efficiency. Step-level optimisation work targets the 225,000-token problem directly, and it needs to: at current token consumption, long-horizon computer use is expensive enough that the economics only work for genuinely valuable tasks.

## The practical read

If you are considering computer-use agents for real work, the benchmark split maps cleanly onto what to attempt.

**Short, bounded, well-specified tasks work now.** Extract data from this application into that spreadsheet. Fill this form from this record. Navigate to this report and download it. Minutes, not hours, and the 85 percent figure is roughly the right expectation.

**Long autonomous workflows do not work yet.** A two-hour multi-application process with branching decisions is a 20 percent proposition, and the 80 percent includes failure modes that touch things you did not want touched.

**Decompose rather than delegating wholesale.** Break a long process into short verifiable segments with a checkpoint between each. This converts a low-probability long task into a sequence of high-probability short ones, and gives you a place to catch errors before they compound.

**Give it a better interface if one exists.** If the application has an API, a CLI, or a scriptable interface, use that and reserve GUI operation for the parts that genuinely have no alternative. The hybrid-action research exists because this is the single biggest reliability improvement available.

**Sandbox properly, and mean it.** A dedicated VM, a scoped account, no credential manager, no production access, controlled network egress. An agent driving a real desktop with a real user's session is a risk with no upside — and the safety research is clear that you do not need an attacker for it to go wrong.

## The name fits

Someone described this as the hardest easy problem in AI, and it is the right framing.

Operating a computer is something hundreds of millions of people do without thinking. It requires no specialist training and it is not, in any human sense, intellectually demanding. That is exactly what makes the difficulty instructive.

What it demands is the combination current systems are worst at: sustained coherence over hundreds of steps, noticing when something went wrong, recovering without making it worse, and holding a model of a system's state that is mostly not visible. Those are the same weaknesses that show up in long-horizon coding, in ARC-AGI-3's interactive environments, and everywhere else agents run for a long time.

Computer use just makes them impossible to hide behind a good final answer.

**Sources**: [OSWorld 2.0: Benchmarking Computer Use Agents on Long-Horizon Tasks](https://arxiv.org/pdf/2606.29537), [OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments](https://osworld-v1.xlang.ai/), [The Hardest Easy Problem in AI: The State of Computer Use Agents](https://medium.com/@adnanmasood/the-hardest-easy-problem-in-ai-the-state-of-computer-use-agents-a7e3aea7fa3a), [UltraCUA: A Foundation Model for Computer Use Agents with Hybrid Action](https://arxiv.org/pdf/2510.17790), [Agent S2: A Compositional Generalist-Specialist Framework for Computer Use Agents](https://arxiv.org/pdf/2504.00906), [OpenComputer: Verifiable Software Worlds for Computer-Use Agents](https://arxiv.org/pdf/2605.19769), [The Blind Spot of Agent Safety](https://arxiv.org/pdf/2604.10577), [SCUBA: Salesforce Computer Use Benchmark](https://arxiv.org/pdf/2509.26506)
