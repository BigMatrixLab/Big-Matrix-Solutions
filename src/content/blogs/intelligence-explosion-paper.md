---
id: "61"
slug: "intelligence-explosion-paper-automating-ai-research"
title: "Twenty-Two Researchers, One Feedback Loop: Reading the 'Intelligence Explosion' Paper"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/intelligence-explosion-paper.webp"
category: "AI Research"
desc: "Hinton, Bengio and senior scientists from OpenAI and Anthropic argue that automating AI research could compress years of progress into months. What the evidence shows, and where critics push back."
date: "Nov 03, 2026"
tags: ["AI Research", "AI Safety", "AI Governance", "Recursive Self-Improvement"]
---

# Twenty-Two Researchers, One Feedback Loop: Reading the 'Intelligence Explosion' Paper

A scientific warning carries more weight when it comes from people who stand to lose by giving it.

On September 28, 2026, a 14-page working paper titled *"What if automating AI R&D triggers an intelligence explosion?"* appeared as No. 2/2026 in the Frontier AI Working Paper Series from the Cambridge Programme on AI Science and Policy (CASP) and GovAI. Its 22 authors include Turing Award winners Geoffrey Hinton, Yoshua Bengio and Andrew Barto, OpenAI chief scientist Jakub Pachocki, Anthropic co-founder Jack Clark and Microsoft chief scientific officer Eric Horvitz. The lead authors are Alan Chan of GovAI and Sören Mindermann of CASP, and everyone signed in a personal capacity.

The paper does not predict an intelligence explosion. It argues that one is plausible enough, and close enough, that governments should prepare now.

## What the authors mean by "explosion"

The paper defines an intelligence explosion as an AI-driven acceleration that compresses advances "that would otherwise take years into months or less." It focuses on the *software* route: AI systems doing the research that improves AI systems, with no new hardware required.

The mechanism has two steps: better AI expands the effective research workforce, and that workforce builds better AI, which expands it again. Software gets the focus because a software improvement can go back into research almost immediately, while hardware takes years to build.

## The evidence they cite

The empirical section is short. The numbers in it come mostly from the labs themselves.

| Claim in the paper | Source cited |
|---|---|
| AI share of approved code at Anthropic rose from low single digits to over 80%, January 2025 to May 2026 | Anthropic |
| R&D work completed autonomously with only high-level human supervision rose from 1% to 26%, March to August 2026 | Anthropic |
| Code-executing agents are used in "training, evaluating, and securing future models" | OpenAI |
| Best systems complete AI R&D tasks taking experts hours to days, versus seconds-long tasks in 2023 | METR and others |
| METR task-horizon doubling time shortened from about 7 months to about 3 months since 2024 | METR |

From the last trend, the authors tentatively extrapolate that months-long AI R&D projects could be automated by mid-2028. The supplement estimates that one frontier developer's inference compute could run the equivalent of roughly 2 million to 200 million researchers, against the thousands these companies employ.

The paper is open about the weak spots. It notes that current systems "sometimes disobey instructions, cheat on tasks, misrepresent their work," and that benchmark success does not always translate into real productivity gains.

## The central model: one number, r

The quantitative core is a growth model taken from the economics of innovation. Everything turns on a parameter the authors call the **returns to research effort**, *r*:

- **r below 1**: diminishing returns win, and progress fades over time.
- **r equal to 1**: the two forces cancel, and progress continues at a constant rate.
- **r above 1**: growth in research labour outpaces diminishing returns, and progress accelerates.

Using historical data, Ho and Whitfill estimated central values of *r* between **1.2 and 1.9** across three sub-fields of AI research. The paper takes those estimates and asks what would happen after *full* automation, if *r* held steady and no other bottleneck appeared. The answer is that the pace of AI progress would increase **tenfold within about 1.5 years**. At that point, a year of progress at the pre-automation pace would take about five weeks.

The conditions matter as much as the result. The model assumes full automation and ignores compute and data constraints. The 90 percent credible intervals for *r* in the three sub-fields are wide: 0.727 to 2.094, 0.380 to 2.708, and 1.069 to 3.212. Two of the three ranges include values below 1, where no explosion happens at all.

## Four frictions, in the authors' own list

The paper names four forces that could stop the loop:

1. **Diminishing returns**: across many fields, ideas get harder to find, and extra researchers duplicate one another's work.
2. **Compute and data**: experiments need compute, and the authors concede that if experiments must grow in proportion to frontier training runs, a software-only explosion "is not possible."
3. **Hard-to-automate tasks**: a few stubborn tasks could set the pace for everything else.
4. **Time-intensive processes**: training runs can take three months or more.

It also states that productivity gains from automation "have not yet reached the threshold" needed to set off the loop, though gains from newer systems are "likely approaching" it.

## What they ask governments to do

The recommendations fall into three groups.

**Visibility.** Standardised reporting of AI R&D indicators to governments and third-party auditors, including how much research AI produces, how fast efficiency improves, and incidents involving internal AI systems. The paper also floats independent evaluation before *internal* deployment and auditors embedded in companies, on the model of the Nuclear Regulatory Commission's resident inspectors.

**Steering and constraint.** Limits on how fast capabilities may increase, tools to verify future pacing agreements, oversight of data centres including "options to pause specific AI R&D workloads," air-gapped evaluations, and international incident sharing.

**Adaptation.** Emergency plans for labour-market shocks, geopolitical instability and loss of control.

The authors warn that a badly designed pause power could let a government slow every company but its favourite. They close with one line: "Once an intelligence explosion begins, the window for action may close."

## The strongest pushback

Detailed public rebuttals were still scarce as of early October 2026. The best criticism so far falls along four lines.

**The data may not support r above 1.** The day before the paper appeared, on September 27, 2026, technologist Ramez Naam published a guest post on Noah Smith's *Noahpinion* blog arguing the loop is far weaker than it needs to be. He set OpenAI's internal data on experiment pace against a threshold estimated by Tom Cunningham and colleagues, and concluded the self-improvement loop "would need to be roughly 5–10× stronger to sustain itself." The paper cites the same Cunningham work for its claim that the threshold has not yet been crossed. The disagreement is about how close the gap is, not whether it exists.

**The historical estimate may be inflated.** This criticism comes from the paper's own supplement. Past estimates of *r* come from a period when compute grew alongside software, which "would bias estimates of r upward" once compute is fixed. The models have also only been checked against growth rates of a few percent a year, far below explosive rates.

**Code share is not research output.** A rise in AI-written approved code shows adoption. It does not show that research output has grown. The paper itself cites work by Whitfill and colleagues finding that many SWE-bench-passing pull requests would not be merged. In a February 2026 interview study by Field, Douglas and Krueger, academic researchers expressed more scepticism about explosive-growth scenarios than researchers at frontier labs.

**Incentives and implementation.** On September 20, 2026, Nvidia chief executive Jensen Huang said lab leaders voicing such warnings are "asking to be relieved of the laws we do have." He was talking about lab executives in general, not this paper. Reporting by Implicator recorded similar doubts about motives from a PitchBook analyst. Former CAISI head Conrad Stosz questioned whether embedded auditors could stay independent, saying "it's a little ambiguous what embedded evaluators means."

## What this means for engineering teams

Most businesses will never train a frontier model. The paper still matters to them in three ways.

- **Internal agent use is becoming reportable.** Measuring how much work AI does inside an organisation will not stay a lab-only idea. Teams that already log what their agents did, with what permissions and review, will meet any disclosure regime easily.
- **Treat capability as a moving target.** If the paper is even partly right, the tools you build on could change faster than your planning cycle. Keep models swappable and re-run your own evaluations on every upgrade.
- **Incident reporting is the policy to watch.** It is the cheapest proposal to adopt and the hardest to argue against. The paper's own example of agents acting outside their scope is the July 2026 Hugging Face incident. Record agent misbehaviour internally now, whether or not a regulator asks.

## The bottom line

The paper's real contribution is to state the bet in numbers. If *r* stays above 1 after full automation, and compute and data constraints do not bind, progress could speed up tenfold in about 18 months. If those conditions fail, it will not. The authors are open that they do not know which outcome is coming. Their argument is that the evidence-gathering should start before anyone knows. Critics have not yet shown the model is wrong. They have shown that its key parameter is poorly measured. That is the same thing the paper's first recommendation asks governments to fix.

**Tags**: AI Research, AI Safety, AI Governance, Recursive Self-Improvement

**Sources**

- [What if automating AI R&D triggers an intelligence explosion? (paper PDF, CASP)](https://casp.ac/__l5e/assets-v1/5efd4b41-deb5-4513-a0a3-b4f82d2b79ea/intelligence-explosion.pdf)
- [GovAI research page for the paper](https://www.governance.ai/research-paper/what-if-automating-ai-r-d-triggers-an-intelligence-explosion)
- [arXiv listing, 2609.36054](https://arxiv.org/abs/2609.36054)
- [The Next Web: Hinton, Bengio and AI lab scientists warn of an intelligence explosion](https://thenextweb.com/news/intelligence-explosion-paper-hinton-bengio-pachocki-clark)
- [Axios: AI pioneers, executives warn of an "intelligence explosion"](https://www.axios.com/2026/09/28/ai-pioneers-intelligence-explosion)
- [Noahpinion: Where's the "intelligence explosion"? (Ramez Naam)](https://www.noahpinion.blog/p/wheres-the-intelligence-explosion)
- [Implicator: AI lab scientists ask governments to embed auditors in labs](https://www.implicator.ai/ai-scientists-embedded-auditors-intelligence-explosion/)
- [Field, Douglas and Krueger: AI Researchers' Views on Automating AI R&D and Intelligence Explosions](https://arxiv.org/abs/2603.03338)
- [Business Insider via Yahoo: Jensen Huang on AI CEOs' warnings](https://www.yahoo.com/news/politics/articles/nvidias-jensen-huang-says-ai-191713977.html)

**Media credits**:
- Hero image: cover of the paper (shown on a background) — [CASP, University of Cambridge](https://casp.ac/reports/intelligence-explosion)
