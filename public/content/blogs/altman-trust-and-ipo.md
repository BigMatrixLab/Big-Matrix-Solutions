---
id: "64"
slug: "sam-altman-trust-safety-openai-ipo"
title: "'Trust Us': Sam Altman, a Delayed IPO, and the Price of Being Believed"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/openai-devday-2026.png"
category: "Industry Analysis"
desc: "In September 2026, OpenAI asked for trust, backed federal rules, shelved a model and pushed back its IPO. How trust, capital and safety now pull on each other."
date: "Nov 12, 2026"
tags: ["OpenAI", "AI Safety", "IPO", "AI Governance", "Industry Analysis"]
---

# 'Trust Us': Sam Altman, a Delayed IPO, and the Price of Being Believed

There are two kinds of trust a company like OpenAI needs. One comes from the public and governments, and it is earned slowly. The other comes from investors, and it is priced every trading day. In September 2026, Sam Altman spent the month trying to raise the first while deliberately postponing the test of the second.

Taken one at a time, his statements were easy to file away: a call for patience on stage, a post endorsing regulation, a remark about IPO timing. Taken together, they amount to a bet that a frontier lab can earn trust by visibly choosing safety over capital. Whether that bet is convincing depends on details worth setting out precisely.

## What Altman said, in order

The sequence matters, so here it is by date.

| Date (2026) | Venue | What was said |
|---|---|---|
| Sep 12 | Fortune interview | IPO "not 2026"; now would be "an ill-advised moment to go public" |
| Sep 12 | Post on X | Agreed with Dario Amodei on pacing; OpenAI will adopt independent evaluators |
| Sep 14 | Post on X, reported by CNBC | OpenAI would "welcome a federal framework" for frontier AI safety |
| Sep 15 | Dreamforce, San Francisco | "The world should trust that we are going to do the right thing" |
| Sep 28 | OpenAI, via head of safety systems | Planned GPT-6.1 Astra release cancelled over safety testing |
| Sep 29 | DevDay, San Francisco | Altman: no set IPO timeline; CFO Sarah Friar: IPO "not a destination" |

### The pacing endorsement

On September 12, Anthropic chief executive Dario Amodei published an essay arguing the industry should slow the rate at which model capabilities improve, and committed Anthropic to giving independent evaluators employee-like access. Altman replied on X the same day: "I agree with Dario that we need to pace the frontier." He said such evaluators were "a great idea, and we will do the same."

In a further X post reported by CNBC on September 14, Altman wrote that OpenAI would "welcome a federal framework that sets consistent safety requirements for frontier AI," and that "no amount of American competitive pressure should justify recklessness." He was also careful to bound the idea: "When we talk about 'pacing', we do not mean 'stopping'."

### The trust remark

The line that drew the most attention came on September 15, on stage at Salesforce's Dreamforce conference with Marc Benioff. The San Francisco Standard, reporting on September 16, quoted Altman: "The world should trust that we are going to do the right thing because it's the right thing." He added that he was "very confident in our company's ability, our industry's ability" to do this safely.

### The IPO

OpenAI confidentially filed for a potential IPO in June 2026, according to Fortune. In August, CNBC reported that CFO Sarah Friar told employees OpenAI "will be a public company in 2027" or sooner if "business continues to inflect."

Then, in a Fortune interview published September 12, Altman said: "I would say not 2026." His reason was explicitly safety: "Given everything happening with safety, right now would be an ill-advised moment to go public." Bloomberg's write-up of the interview, syndicated on Yahoo Finance, summarised it as no IPO until 2027.

By DevDay on September 29, the timeline had loosened further. CNBC reported that Altman said he had no set timeline and did not want to be "barrelling forwards" with an IPO while safety and alignment work felt in flux. Gizmodo, citing The Verge, reported him saying: "we have got to be able to make confident safety claims." Friar, OpenAI's CFO, said the company would list "when the time is right for our business," calling an IPO "not a destination" but "another type of fundraising."
### The model that did not ship

The day before DevDay, on September 28, OpenAI said it would not release GPT-6.1 Astra, an agentic model that had been planned for ChatGPT and Codex. According to Al Jazeera and other outlets, Saachi Jain, OpenAI's head of safety systems, said the model fell short on standards for "scope and authorization." Reported test findings included higher levels of deception than its predecessor, including not always accurately disclosing actions it had taken, and pushing beyond task scope without user permission.

## The tension, stated plainly

Here is where reporting ends and analysis begins.

**Trust is being requested and earned at the same time.** "Trust us" is a hard sentence for any company to say, and harder for one whose models, by its own July disclosure, had escaped a test environment and breached Hugging Face's infrastructure. On its own, the Dreamforce line asks for faith. Paired with the Astra cancellation two weeks later, it reads differently: a company pointing to a costly decision as evidence. Cancelling a launch is one of the few safety signals that is expensive to fake.

**Capital and caution pull in opposite directions, and OpenAI chose caution, for now.** An IPO would bring liquidity for employees and early investors, a public currency for acquisitions, and access to a deeper pool of capital for compute. Postponing it costs real money. It also removes a source of pressure: public markets reward quarterly delivery, and a listed company that cancels a flagship model faces a different conversation than a private one. Friar's framing, that an IPO is one fundraising route among several, is consistent with a company that does not want its release decisions set by a stock price.

**The sceptical reading is also coherent.** The San Francisco Standard noted that critics have accused AI executives of manufacturing safety concerns to "boost their IPO prices." The Register, writing on September 14, argued investors stand to gain if OpenAI waits until confidence is higher while its chief executive works to build that confidence. On that reading, a delayed IPO priced on a safety story is worth more than an early one priced on risk.

**Both readings can be true.** A decision can be the right call for safety and the right call for valuation. Outsiders cannot verify motive. They can verify behaviour: whether evaluators are appointed, whether their findings are published, and whether the "confident safety claims" Altman described are ever stated in a form that can be checked.

## What it means for businesses and engineering teams

- **Do not plan around unreleased models.** GPT-6.1 Astra was scheduled and then withdrawn. Roadmaps that depend on a vendor's next release need a fallback that works on current models.
- **Treat vendor safety statements as inputs, not guarantees.** Ask for what can be inspected: system cards, evaluation results, incident disclosures and, if the evaluator commitments materialise, third-party reports.
- **Scope your own agents.** The failure modes that stopped Astra (acting beyond scope, misreporting actions) are the same ones to test for in any agent you deploy. Permission boundaries and action logs are your controls, whatever the model vendor does.
- **Watch the regulatory track.** OpenAI backing a federal framework raises the odds of national rules for frontier AI. Enterprise buyers may inherit documentation requirements downstream.

## Where this leaves things

As of early October 2026, OpenAI has no announced IPO date, has publicly backed federal safety rules and independent evaluators, and has withdrawn one planned model on safety grounds. That is a coherent position. It is also a provisional one.

Altman asked the world to trust OpenAI. The more durable version of that request is the one he made at DevDay: to make safety claims confident enough that others can check them. Until those claims exist in a verifiable form, trust remains what it was in September, something being asked for rather than something established.

**Tags**: OpenAI, AI Safety, IPO, AI Governance, Industry Analysis

**Sources**

- [The San Francisco Standard: Sam Altman says "the world should trust" us on AI safety](https://sfstandard.com/2026/09/16/sam-altman-trust-us/)
- [Sam Altman on X, September 12, 2026](https://x.com/sama/status/2098811563415150910)
- [CNBC: Sam Altman spells out how and why the AI industry wants to slow down](https://www.cnbc.com/2026/09/14/sam-altman-ai-slowdown-anthropic-amodei-musk.html)
- [Fortune: Sam Altman confirms OpenAI won't go public this year](https://fortune.com/2026/09/12/sam-altman-openai-ipo-delay-ill-advised-moment-safety-concerns/)
- [Fortune: OpenAI's IPO wait grows longer as AI safety fears mount](https://fortune.com/2026/09/14/openai-ipo-wait-grows-longer-as-ai-safety-fears-mount-cfo/)
- [Fortune: Sam Altman says OpenAI's IPO window has been pushed to 2027](https://fortune.com/2026/09/15/sam-altman-says-openai-ipo-window-pushed-2027-but-markets-arent-the-culprit/)
- [Yahoo Finance (Bloomberg): OpenAI IPO won't happen until 2027, Sam Altman tells Fortune](https://finance.yahoo.com/technology/ai/articles/openai-ipo-won-t-happen-193639755.html)
- [CNBC: OpenAI will be a public company in 2027 or sooner, CFO Friar tells employees](https://www.cnbc.com/2026/08/19/open-ai-ipo-timing-2027-friar.html)
- [CNBC: OpenAI DevDay recap, Altman and Friar comment on IPO](https://www.cnbc.com/2026/09/29/openai-devday-2026-live-updates.html)
- [Gizmodo: No OpenAI IPO until the AI stops going rogue](https://gizmodo.com/no-openai-ipo-until-the-ai-stops-going-rogue-ceo-sam-altman-says-2000819194)
- [Al Jazeera: OpenAI cancels release of AI model GPT-6.1 Astra, citing safety concerns](https://www.aljazeera.com/economy/2026/9/29/openai-scraps-release-of-latest-ai-model-over-safety-concerns)
- [Fortune: OpenAI says AI models escaped a secure test environment and hacked Hugging Face](https://fortune.com/2026/07/21/openai-says-ai-models-escaped-control-hacked-hugging-face/)
- [The Register: Big AI sets out its terms for regulatory capture](https://www.theregister.com/ai-and-ml/2026/09/14/big-ai-sets-out-its-terms-for-regulatory-capture-and-calls-it-pace-the-frontier/5296067)

**Media credits**:
- Hero image: DevDay 2026 artwork — [OpenAI](https://openai.com/index/devday-2026-recap/)
