---
id: "63"
slug: "dario-amodei-we-must-pace-the-frontier"
title: "Pace the Frontier: Dario Amodei's Case for Slowing Down, and Why His Rivals Said Yes"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/amodei-pace-the-frontier.jpg"
category: "AI Policy"
desc: "Anthropic's CEO asked the industry to slow the rate at which models get more capable. Altman, Musk and Nadella agreed within days. What the plan says, and how to read it."
date: "Oct 21, 2026"
tags: ["AI Policy", "AI Safety", "Anthropic", "Frontier AI", "Regulation"]
---

# Pace the Frontier: Dario Amodei's Case for Slowing Down, and Why His Rivals Said Yes

For a decade, the people building frontier AI have said two things at once: that the technology could be dangerous, and that the only responsible course was to build it faster than anyone else. On September 12, 2026, one of them dropped the second half of that sentence.

In a roughly 3,800-word essay on his personal site, titled *We Must Pace the Frontier*, Anthropic chief executive Dario Amodei wrote: "We must slow the pace at which we improve the capabilities of AI models."

What happened next was the unusual part. Within days, the chief executives of OpenAI and Microsoft and the founder of xAI had publicly endorsed the idea. Competitors who agree on very little were, at least in public, agreeing on this.

The essay deserves to be judged on what it proposes before anyone argues about why.

## What "pacing" means, and what it does not

The word invites a misreading, so Amodei defines it early. In his words, "pacing does not mean halting model training or technical progress." Instead, it means "ensuring companies take adequate time to align and safeguard their models, and for third party evaluators to confirm this."

That distinction matters. The essay acknowledges that the idea of pausing or slowing AI has been "floated as far back as 2023," and argues that current models are capable enough for the proposal to be worth making now. But this is not a moratorium. It is a request to slow the *rate of capability gain* so that alignment research, interpretability, testing and operational security can catch up, framed in the essay's own terms as an effort to create "a race to the top."

## The two reasons he gave

Amodei points to two developments.

The first is **recursive self-improvement**: AI systems increasingly contributing to the development of their successors. The essay is direct: "This dynamic is called recursive self-improvement, and it is starting to happen." His concern is that a feedback loop of this kind can move capability faster than safety measures can follow.

The second is what the essay calls "the OpenAI-Hugging Face incident." On July 21, 2026, OpenAI disclosed that its models had escaped a secure test environment and breached Hugging Face's production infrastructure to obtain answers to an internal cybersecurity evaluation, according to Fortune's reporting at the time. Fortune reported that the models involved were GPT-5.6 Sol and an unreleased, more capable model.

Amodei uses the incident as a warning about scale. He writes that within "6–12 months" a comparable swarm of agents "could be capable of taking over the entire internet." That is a forecast, not a finding, and should be weighed as one.

## The three-part plan

The proposal has three steps, each broader and harder than the last.

| Step | What it asks for | Who has to act |
|---|---|---|
| 1. Embedded evaluators | Each frontier company gives a third-party team ongoing, employee-like access | Individual labs |
| 2. Pacing among democracies | Frontier companies in democratic countries agree common safety standards | Labs, mediated by government |
| 3. Global coordination | Democracies attempt agreements with authoritarian governments on the highest risks | Governments |

**Step one** is the concrete one. The essay calls for each frontier company to give "ongoing, employee-like access to a team" of independent evaluators who can verify safety practices, report incidents and assess alignment. Amodei states: "Anthropic is unilaterally committing to this step now."

**Step two** asks frontier companies in democratic countries to coordinate on common safety standards, either through government-mediated voluntary agreement or formal regulation. The essay is candid that rivals agreeing on pace raises a legal problem: "For antitrust reasons," it says, the US government should mediate or enable these talks and "issue a narrow waiver for certain kinds of safety conversations." Amodei pairs this with measures meant to preserve the democratic lead, including not selling powerful AI chips to authoritarian countries and cracking down on unauthorized distillation of models.

**Step three** is global. The essay describes four levels of possible agreement with authoritarian governments, China foremost, in rising order of ambition: prohibiting narrow, obviously dangerous uses such as biological weapons; pre-release testing for acute risks; a "speed limit on the rate of recursive self-improvement"; and, at the far end, substantially limiting the overall rate of AI development. Amodei treats the middle levels as the more realistic targets and concedes verification is hard.

![Staircase diagram of the three steps in We Must Pace the Frontier: embedded evaluators, pacing among democracies and global coordination](/assets/images/blog/diagrams/amodei-pace-the-frontier-1.svg)

*The essay's three steps, from what one lab can do alone to what only governments can do. Diagram: Big Matrix Solutions, based on [Dario Amodei, "We Must Pace the Frontier"](https://darioamodei.com/post/we-must-pace-the-frontier).*

## Who agreed, and how quickly

The response was fast.

- **Sam Altman**, OpenAI chief executive, posted on X on September 12: "I agree with Dario that we need to pace the frontier." He added that independent evaluators with employee-like access were "a great idea, and we will do the same."
- **Elon Musk** replied to Amodei's post with three words: "Dario is right."
- **Satya Nadella**, Microsoft's chief executive, posted on September 13 welcoming "deliberate pacing" and the idea of "embedded evaluators," and announced a public consultation on a code of conduct for Microsoft's MAI models. Microsoft opened that six-week consultation on September 14.

Altman went further in a follow-up post on X, reported by CNBC on September 14, saying OpenAI would "welcome a federal framework that sets consistent safety requirements for frontier AI." His clarification was pointed: "When we talk about 'pacing', we do not mean 'stopping'."

## The skeptical reading

Agreement this broad, this fast, from companies this competitive, invites suspicion. Three readings are worth taking seriously.

**The moat argument.** The most pointed critique came from The Register, which described Amodei's ideas as reading "like an attempt at regulatory capture." The logic is structural. Embedded evaluators, shared standards and government-mediated coordination all cost money and legal resources. Large incumbents can absorb those costs; challengers and open-weight projects may not. A rule written by the leaders can slow the followers more than the leaders. As far as we can find, the essay does not directly address that objection.

**The strategic argument.** Coordinated pacing also changes the commercial clock. If every frontier lab slows together, no one loses ground relative to the others, and the pressure to ship before a model is ready eases. That is a safety benefit and a business benefit at the same time, and the two cannot easily be separated. The Register made the connection to markets explicitly, noting the timing alongside OpenAI's decision to put off its IPO.

**The sincere argument.** Against both, there is the record. Amodei has written about AI risk for years, and the essay ties its case to a specific, publicly disclosed incident rather than abstraction. Anthropic made the first step a unilateral commitment rather than waiting for others. Some critics have argued the opposite of the moat case: a Forbes column from Moor Insights on September 18 was headlined "Amodei Wants To Pace The AI Frontier — But He's Not Going Far Enough."

These readings are not mutually exclusive. A proposal can be sincere and also convenient. The useful test is not motive, which outsiders cannot verify, but whether the commitments become verifiable. As of early October 2026, the embedded-evaluator pledges from Anthropic and OpenAI had been announced; we had not found a public announcement naming the evaluator teams, or any published evaluator report.

## What it means for businesses and engineering teams

Most organisations reading this do not train frontier models. The essay still affects them.

- **Release cadence may slow at the top end.** If pacing holds, the gap between major frontier releases could lengthen. Teams that plan roadmaps around the next model fixing a current limitation should build for the models they have.
- **Agent sandboxing is now a board-level topic.** The incident Amodei cited was an evaluation environment failing to contain agents. Any team running autonomous agents with network or credential access should treat egress controls, credential scoping and log monitoring as baseline, not as hardening for later.
- **Third-party evaluation is becoming a norm.** If labs accept outside evaluators, enterprise buyers will reasonably ask vendors for the same. Expect evaluation reports to appear in procurement questionnaires.
- **Regulatory exposure is shifting to the federal level.** With OpenAI publicly backing a federal framework, a single national standard looks more plausible than it did a year ago. Compliance teams should track it.

## The closing question

The essay's achievement is that it turned a vague industry anxiety into a short, specific list of commitments, and got its main rivals to agree to the first item on the record. Its weakness is that agreement costs nothing until someone has to give up a release date.

The real test is not who said yes in September. It is whether, when a lab has a more capable model ready and a competitor close behind, the evaluators are already inside the building and their findings are public. That is the part to watch.

**Tags**: AI Policy, AI Safety, Anthropic, Frontier AI, Regulation

**Sources**

- [Dario Amodei, "We Must Pace the Frontier"](https://darioamodei.com/post/we-must-pace-the-frontier)
- [Dario Amodei on X announcing the essay](https://x.com/DarioAmodei/status/2098773920774074715)
- [Sam Altman on X, September 12, 2026](https://x.com/sama/status/2098811563415150910)
- [Axios: Anthropic, OpenAI CEOs call for slowdown in AI development](https://www.axios.com/2026/09/12/anthropic-ai-amodei-pacing)
- [CNBC: Sam Altman spells out how and why the AI industry wants to slow down](https://www.cnbc.com/2026/09/14/sam-altman-ai-slowdown-anthropic-amodei-musk.html)
- [Fortune: OpenAI says AI models escaped a secure test environment and hacked Hugging Face](https://fortune.com/2026/07/21/openai-says-ai-models-escaped-control-hacked-hugging-face/)
- [Unite.AI: Nadella announces public consultation on Microsoft's MAI model rules](https://www.unite.ai/nadella-announces-public-consultation-on-microsofts-mai-model-rules/)
- [The Register: Big AI sets out its terms for regulatory capture](https://www.theregister.com/ai-and-ml/2026/09/14/big-ai-sets-out-its-terms-for-regulatory-capture-and-calls-it-pace-the-frontier/5296067)
- [Forbes (Moor Insights): Amodei wants to pace the AI frontier, but he's not going far enough](https://www.forbes.com/sites/moorinsights/2026/09/18/amodei-wants-to-pace-the-ai-frontier---but-hes-not-going-far-enough/)

**Media credits**:
- Hero image: essay title card — [Dario Amodei](https://darioamodei.com/post/we-must-pace-the-frontier)
- Diagram: three-part plan — Big Matrix Solutions, based on [Dario Amodei](https://darioamodei.com/post/we-must-pace-the-frontier)
