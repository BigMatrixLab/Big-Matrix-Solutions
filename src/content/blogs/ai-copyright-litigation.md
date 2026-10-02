---
id: "86"
slug: "ai-copyright-training-data-lawsuits"
title: "AI and Copyright: Where the Training-Data Lawsuits Stand"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/ai-copyright-litigation.jpg"
category: "AI Policy"
desc: "One appeals court has ruled against AI training as fair use, two trial courts have ruled for it, and Europe is taking its own route. Where the main cases stood in late 2026, and what that means for teams building on these models."
date: "Jan 15, 2027"
tags: ["AI Policy", "Copyright", "Fair Use", "Training Data", "Litigation"]
---

# AI and Copyright: Where the Training-Data Lawsuits Stand

Every large language model and image generator was trained on huge amounts of text and images that someone else made. Whether that was lawful is the subject of dozens of lawsuits in the United States and a smaller number in Europe. The courts have started to give answers, and they do not all agree.

This guide sets out what the main rulings actually held, what is still open, and what a company building on these models should take from it. The answers so far depend heavily on two facts: how the training data was obtained, and whether the AI product competes with the works it learned from.

*This is an overview for general information, not legal advice. Case status is described as of late 2026. Several cases have hearings or appeals pending, and rulings after that date may change the picture.*

## The question courts are being asked

In the United States, most cases turn on **fair use** under Section 107 of the Copyright Act. Courts weigh four factors: the purpose and character of the use (especially whether it is "transformative"), the nature of the work, the amount used, and the effect on the market for the original. In the UK and EU there is no general fair use defence. Arguments there turn on reproduction rights, on text-and-data-mining exceptions, and on whether a trained model is itself a copy.

![Table of six AI training-data copyright cases and their status as of late 2026](/assets/images/blog/diagrams/ai-copyright-litigation-1.svg)

*Diagram: Big Matrix Solutions, based on the court rulings and filings listed under Sources.*

## The US rulings so far

### Thomson Reuters v. Ross Intelligence: the first appellate answer

Ross built an AI legal research tool. To train it, Ross used material derived from Westlaw's headnotes, the short summaries Thomson Reuters editors write for judicial opinions. In February 2025, Judge Stephanos Bibas, sitting as a trial judge in Delaware, held that the headnotes were protected and that Ross's use was **not fair use**. He stressed that Ross built a competing product, and that its tool was not generative AI.

On **29 September 2026**, the **Third Circuit affirmed**. It was the first time a federal appeals court had ruled on fair use in AI training. The full opinion was initially filed under seal. Early commentary reads the decision as resting on Ross building a direct competitor from the copied material, and as leaving open how generative systems should be treated.

### Bartz v. Anthropic: training versus acquisition

In June 2025, Judge William Alsup (N.D. Cal.) split the question in two. Training Claude on books was fair use. He called the use "exceedingly transformative." Scanning lawfully purchased print books was also fair use. But downloading millions of pirated books from shadow libraries to build a permanent central library was not, and that claim was headed to trial.

It never got there. Anthropic agreed to a **US$1.5 billion** class settlement covering several hundred thousand books, at about US$3,000 per work. In **July 2026**, Judge Araceli Martínez-Olguín granted **final approval** and overruled the objections. The settlement resolves claims about past conduct. It does not create a licence for future training.

### Kadrey v. Meta: a win with a warning

Two days after Alsup's ruling, Judge Vince Chhabria granted Meta summary judgment on its training of Llama on books. The reasoning was narrow. He found that the authors had not built a record of market harm, and suggested that "market dilution" by AI-generated substitutes could weigh heavily in a better-argued case. He stressed that the ruling did not mean Meta's use was lawful in general. A separate claim, that Meta distributed pirated books while downloading them over BitTorrent, continues. A summary judgment hearing on that claim is scheduled for February 2027.

### The OpenAI cases, including The New York Times

The New York Times sued OpenAI and Microsoft in December 2023. Its case, along with suits by other news organisations and by authors, was consolidated in 2025 into a multidistrict litigation, *In re OpenAI, Inc. Copyright Infringement Litigation*, before Judge Sidney Stein in New York. Most claims survived motions to dismiss. Cross-motions for summary judgment on fair use were filed in **September 2026**, with replies due in November. The US Department of Justice filed a statement of interest supporting the defendants' fair use position. Axios reported that it described LLM training as "extraordinarily" transformative. No trial date had been set as of late 2026.

The case has already affected ordinary users. In 2025 a magistrate judge ordered OpenAI to preserve ChatGPT output logs that would otherwise have been deleted. That order was lifted for new data from late September 2025, with exceptions.

## Outside the United States

**United Kingdom: Getty Images v. Stability AI.** On 4 November 2025, the High Court rejected Getty's secondary infringement claim. Getty had dropped its main training claims because the training did not take place in the UK. The court held that the Stable Diffusion model weights did not store or reproduce Getty's images, so the model was not an "infringing copy." Getty won limited, historic trade mark findings over watermarks produced by older model versions. In December 2025 the judge gave Getty **permission to appeal** on the infringing-copy point, describing it as novel and important.

**Germany: GEMA v. OpenAI.** On 11 November 2025, the Munich Regional Court held that OpenAI infringed copyright in nine German song lyrics. The court found that lyrics memorised in the model's weights were reproductions, as were the outputs that repeated them. This first-instance ruling treats memorisation itself as copying, which is the opposite of the UK court's view of model weights.

**EU regulation.** Separately from the courts, the EU AI Act requires general-purpose AI model providers to adopt a copyright compliance policy and publish a summary of their training content (Article 53). The Act ties this to the EU's text-and-data-mining rules, under which rightsholders can opt out of commercial mining.

## What the pattern says

| Factor | Where courts have landed so far |
|---|---|
| Lawfully acquired data, generative model | Two US trial courts found fair use (Bartz, Kadrey) |
| Pirated or shadow-library acquisition | Not excused by later fair use of training (Bartz); separate distribution claims live (Kadrey) |
| Non-generative tool that competes with the source | Not fair use, affirmed on appeal (Ross) |
| Model memorises and outputs protected text | Infringement under German law (GEMA, first instance) |
| Model weights as a "copy" | Not an infringing copy under UK law (Getty, on appeal) |

The US Copyright Office's May 2025 report on generative AI training (pre-publication version) made a similar distinction. It said some training uses will be fair and others will not, and that the outcome depends on the purpose of the model and how its outputs compete with the originals.

## What this means for teams building on AI

Most companies do not train foundation models. Their exposure comes from what they deploy and how.

- **Know your provider's data story.** Ask how training data was obtained and whether the provider offers an IP indemnity for outputs. Read the indemnity's exclusions, which often cover modified models and disabled filters.
- **Watch for regurgitation.** The GEMA ruling and the output claims in the OpenAI cases focus on models reproducing protected text. Output filters, citation of sources in retrieval-augmented systems, and limits on verbatim length reduce that risk.
- **Keep your own fine-tuning clean.** If you fine-tune, document the source and licence of every dataset. The Bartz split between lawful and pirated acquisition applies to you too.
- **Avoid substitute products.** A product designed to replace the works it was trained on, such as a summariser built on a competitor's paywalled content, sits closest to the Ross facts.
- **Plan for change.** Expect more licensing deals, possible output restrictions and price changes if appellate courts rule against training. Contracts should cover model withdrawal and substitution.

## The bottom line

As of late 2026, no court has given a general answer on whether training generative AI on copyrighted work is lawful. What exists is a set of narrower answers. Acquiring data from pirate sites is risky whatever happens later. Building a competing product from someone else's content is risky. Memorisation that resurfaces in outputs is risky. Training a general-purpose model on lawfully obtained data has, so far, fared better in US trial courts. The OpenAI summary judgment ruling, the Getty appeal and any further appellate decisions in the United States will test whether that holds. Until then, the safest approach for builders is to know where their models' data came from and to control what their products output.

**Sources**

- https://www.courtlistener.com/docket/69879510/in-re-openai-inc-copyright-infringement-litigation/
- https://www.courtlistener.com/docket/67569326/kadrey-v-meta-platforms-inc/
- https://www.goodwinlaw.com/en/insights/publications/2025/06/alerts-practices-aiml-district-court-issues-ai-fair-use-decision
- https://www.jurist.org/news/2026/07/judge-approves-record-1-5-billion-settlement-involving-anthropic/
- https://www.authorsalliance.org/2026/07/21/bartz-v-anthropic-settlement-receives-final-approval/
- https://copyrightlately.com/thomson-reuters-v-ross-third-circuit/
- https://ipwatchdog.com/2026/09/30/third-circuit-affirms-revised-fair-use-ruling-against-ross-ai-legal-research-platform-in-sealed-opinion/
- https://chatgptiseatingtheworld.com/2026/09/04/summary-judgment-briefing-starts-in-openai-mdl-litigation-before-judge-stein/
- https://chatgptiseatingtheworld.com/2026/03/27/kadrey-v-meta-gets-scheduling-order-summary-judgment-motion-hearing-for-distribution-claim-wont-be-heard-until-feb-25-2027/
- https://www.axios.com/2026/09/19/justice-department-openai-new-york-times
- https://www.engadget.com/ai/openai-no-longer-has-to-preserve-all-of-its-chatgpt-data-with-some-exceptions-192422093.html
- https://www.judiciary.uk/wp-content/uploads/2025/11/Getty-Images-v-Stability-AI.pdf
- https://www.taylorwessing.com/en/insights-and-events/insights/2026/01/next-steps-for-getty-v-stability-why-has-permission-to-appeal-been-granted
- https://cms.law/en/deu/legal-updates/gema-vs.-openai-munich-regional-court-i-issues-landmark-copyright-decision
- https://www.copyright.gov/ai/
- https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng

**Media credits**:
- Hero image: cover of *Copyright and Artificial Intelligence, Part 3: Generative AI Training* (pre-publication version, May 2025) — [U.S. Copyright Office](https://www.copyright.gov/ai/), placed on a white 16:9 canvas without alteration. Work of the US federal government, not subject to copyright in the United States.
- In-body diagram: status of six training-data cases — Big Matrix Solutions, based on the court records and reporting listed under Sources.
