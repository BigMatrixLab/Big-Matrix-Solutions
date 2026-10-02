---
id: "67"
slug: "nadella-copilot-new-os-for-work-microsoft-strategy"
title: "Copilot as an Operating System: Reading Satya Nadella's September Playbook"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/microsoft-copilot-hero.webp"
category: "Industry Analysis"
desc: "In two weeks of September 2026, Microsoft drew a line on superintelligence, opened its model rulebook to the public and relaunched Copilot as a work OS. Here is the strategy underneath."
date: "Oct 03, 2026"
tags: ["Microsoft", "Copilot", "AI Governance", "Enterprise AI", "Industry Analysis"]
---

# Copilot as an Operating System: Reading Satya Nadella's September Playbook

Microsoft spent most of 2026 taking Copilot buttons out of Windows. Then, on September 25, its chief executive announced that Copilot would become an operating system.

These two moves look like they point in opposite directions, but they don't. Read together with what Satya Nadella said and published in the two weeks before, they describe one strategy. Microsoft wants to own the layer where work gets delegated to AI, it wants that layer to be model-agnostic, and it is selling governance as part of the product.

Below, we separate what Microsoft said and shipped from our reading of it. Everything reflects the public record at the time of writing.

## The record: four statements in two weeks

**September 13: the superintelligence line.** In a post on X on Sunday, September 13, 2026 (reported in some outlets on September 14), Nadella wrote that any pursuit of superintelligence must rest on one principle: if the AI "is not helping humanity and under human control, it's not worth pursuing."

The same post welcomed "deliberate pacing" in advanced AI and ideas such as "embedded evaluators", meaning independent monitors placed inside AI labs. Both terms track the essay Anthropic CEO Dario Amodei published on September 12, *We Must Pace the Frontier*. Nadella also listed Microsoft's own approach: broad access and choice at every layer of the AI stack, enterprise control of "learning loops", and a Code of Conduct for its first-party models, to be published the following day.

**September 14: the rulebook goes public.** Microsoft AI published *Humanist AI in practice: A public consultation on our Code of Conduct for MAI Models*. The core line is blunt: "People matter more than AI." The post says the Code is designed so that MAI models "will never resist human interruption, correction, or shutdown." Feedback was opened for six weeks, and Microsoft committed to publishing a summary of what it learned and a revised version later in 2026. The Code covers Microsoft's own MAI models. It does not say it governs the third-party models Microsoft also deploys.

**September 25: Copilot relaunched.** Microsoft introduced a redesigned Copilot built around three pieces. *Home* combines Chat and Cowork, with Word, Excel and PowerPoint built in as "Office in Copilot". *Code* is an app builder that Microsoft says runs on the same underlying technology as GitHub Copilot. *Autopilot*, previously called Scout, is a persistent agent with its own identity and workspace in the customer's tenant. Home and Code were scheduled to roll out through Microsoft's Frontier early-access program, and Autopilot was to enter private preview at the end of September. Nadella's framing on X: "We're building Copilot as a new OS for work," one that spans every model, every form factor and every task.

**September 25: the critique.** In an interview with Alex Heath recorded in Seattle for the launch, Nadella said the AI industry is "way too self-obsessed as an industry," too fond of saying "look at us, how glorious we are." He argued the benefits should be shown by the people using AI, not announced by tech chief executives. On models he was direct: "You can't have one model."

![Illustration from Microsoft AI's Code of Conduct consultation](/assets/images/blog/microsoft-mai-code-of-conduct.webp)

*Artwork from Microsoft AI's public consultation on its Code of Conduct for MAI models. Source: [Microsoft AI](https://microsoft.ai/news/mai-code-of-conduct/)*

## The context Microsoft did not put in the headline

Copilot's footprint inside Windows has been shrinking all year. On March 20, 2026, Pavan Davuluri, who leads Windows and Devices, wrote that Microsoft is "reducing unnecessary Copilot entry points, starting with apps like Snipping Tool, Photos, Widgets and Notepad." Windows Latest has since tracked the removals app by app. After the April 2026 security updates, administrators also gained a policy, *RemoveMicrosoftCopilotApp*, that can uninstall the consumer Copilot app from managed Windows 11 devices under certain conditions.

So the "new OS" claim arrives while the old OS is being cleared of Copilot clutter. Windows Latest's headline on September 26 made exactly that point.

## Our reading: three bets in one strategy

The following is analysis, not reported fact.

### Bet one: the operating system moves up a layer

When Nadella says "OS" he does not mean a kernel. He means the place where work starts, where context accumulates, and where tasks are dispatched. For thirty years that was the Windows desktop. Microsoft is now betting it will be an agent workspace that sits above any particular device.

That explains why removing Copilot from Notepad and relaunching Copilot as a platform are the same decision. Scattering AI buttons across a dozen apps made Copilot a feature. Gathering chat, delegated work, documents, code and a persistent agent into one surface makes it a destination. The retreat from Windows clears the way for that consolidation.

### Bet two: multi-model as a moat, not a hedge

"Every model" is doing a lot of work in Nadella's sentence. Microsoft builds its own MAI models, has a deep commercial relationship with OpenAI, and now tells customers they will not be locked to one model family. That is partly a hedge against any one lab's fortunes. It is also a positioning claim. If the models become interchangeable, the value moves to whoever owns the routing, identity, permissions, audit trail and billing. Microsoft already owns those pieces in most large enterprises.

### Bet three: governance is part of the product

The Code of Conduct, the superintelligence principle and the September 25 emphasis on agents running "with permissions, audit and governance" fit together. In regulated industries, the buyer's main question is no longer whether the model is clever. It is whether the security team can sign off on the deployment. A published, consulted-on behavioural code is a document a compliance officer can attach to a risk assessment.

There is a gap, though. The Code governs MAI models. A multi-model Copilot will also route work to models Microsoft does not train, and buyers should ask which rules apply when that happens.

| Microsoft's claim | What it implies for buyers | Question to ask |
|---|---|---|
| Copilot spans "every model" | Model choice moves to the platform | Who picks the model for a given task, and is it logged? |
| Autopilot has its own identity in your tenant | Agents become directory principals | How are agent identities scoped, reviewed and revoked? |
| Code builds apps from natural language | Non-developers ship software | Where does that code run, and who owns it in production? |
| A public Code of Conduct for MAI models | Behavioural commitments in writing | Does an equivalent apply to non-MAI models in Copilot? |

## What it means for enterprise IT

**Treat agents as identities, not features.** A persistent agent that monitors channels, follows up on threads and resumes work days later needs the same lifecycle as a service account: owner, scope, review cadence, offboarding. Set that policy before the private preview reaches your tenant, not after.

**Budget for usage, not just seats.** Microsoft's announcement describes a fixed per-user licence for everyday AI and usage-based billing for agentic work such as Cowork, Code and Autopilot. That is a different cost profile from the flat Copilot seat many finance teams approved. Model spend the way you would cloud consumption, with caps and alerts.

**Decide your Windows posture deliberately.** The removal policy exists because many organisations wanted less AI on the desktop. That can sit alongside a Copilot rollout in the browser and Microsoft 365. Make it a documented decision rather than whatever the defaults happen to be.

**Read the Code, then read your contract.** A public behavioural code is useful evidence. It is not a contractual commitment unless your agreement says so.

## What it means for developers

The *Code* surface is aimed at people who are not professional developers. For engineering teams, that means more small internal applications appearing from outside the usual delivery process. The useful response is to provide a paved road: approved data connectors, a review step before anything touches production systems, and a clear handover point when a prototype becomes something people depend on.

The multi-model framing matters for builders too. If the platform routes between models, prompts and evaluation sets written against a single model's quirks will be brittle. Teams that keep model-independent test suites will adapt faster when the routing changes underneath them.

## The bottom line

Nadella's September amounted to a coherent pitch. Microsoft will not ship AI it cannot control, it will publish the rules its own models follow, and it will give enterprises one governed surface where any model can do the work. The industry critique fits the same pitch: if the industry is too pleased with itself, Microsoft wants to be the vendor that talks about outcomes.

Whether the pitch holds depends on things that are not yet settled: how Autopilot behaves outside private preview, what changes after the Code of Conduct consultation closes, and whether "every model" turns out to mean real customer choice or Microsoft's choice made on the customer's behalf. Those questions are worth putting to your account team now.

**Tags**

Microsoft, Copilot, AI Governance, Enterprise AI, Industry Analysis

**Sources**

- https://x.com/satyanadella/status/2099220712024408084
- https://www.newsgram.com/science/2026/09/14/satya-nadella-on-ai-use
- https://microsoft.ai/news/mai-code-of-conduct/
- https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/
- https://www.windowslatest.com/2026/09/26/were-building-copilot-as-a-new-os-says-satya-nadella-even-as-microsoft-strips-it-from-windows-11/
- https://sources.news/p/satya-nadella-microsoft-copilot-future
- https://blogs.windows.com/windows-insider/2026/03/20/our-commitment-to-windows-quality/
- https://www.windowslatest.com/2026/04/09/microsoft-begins-removing-copilot-from-windows-11-starting-with-notepad-snipping-tool/
- https://www.bleepingcomputer.com/news/microsoft/microsoft-now-lets-admins-uninstall-copilot-on-enterprise-devices/
- https://darioamodei.com/post/we-must-pace-the-frontier

**Media credits**:
- Hero image: new Copilot launch artwork — [Microsoft](https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/)
- Code of Conduct illustration — [Microsoft AI](https://microsoft.ai/news/mai-code-of-conduct/)
