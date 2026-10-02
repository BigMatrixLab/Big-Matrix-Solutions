---
id: "36"
slug: "ai-therapy-regulation-state-patchwork"
title: "Five States Banned It, One Built a Safe Harbour: AI Therapy's Regulatory Split"
comments: "0"
image: "/assets/images/blog/ai-therapy-regulation-cover.png"
category: "Medical AI"
desc: "Eleven states, more than a dozen laws, three incompatible models, and no FDA authorisation. What happens when a technology outruns its regulator."
date: "Dec 08, 2026"
tags: ["Medical AI", "Regulation", "Mental Health", "AI Policy"]
---

# Five States Banned It, One Built a Safe Harbour: AI Therapy's Regulatory Split

Mental health chatbots are the clearest example in AI of a technology deploying at scale before anyone decided whether it should.

The demand is real and enormous. Therapy is expensive, waiting lists run months, and there is a severe shortage of licensed clinicians almost everywhere. A conversational system available at 3am for a small monthly fee addresses a genuine and painful gap.

The risk is also real. These are people in distress, sometimes in crisis, talking to software that will confidently say almost anything.

Regulators responded, and because federal regulation did not arrive first, they responded as states, producing **more than a dozen new laws across 11 states** in a single year, following three mutually incompatible philosophies.

## The three models

The laws sort into distinct approaches, and the distinction is not about severity. It is about what problem each thinks it is solving.

### 1. Prohibition

**Five states prohibit offering AI chatbot-based therapy services.** Illinois and Nevada bar AI from delivering therapy outright. Maine's LD 2082, approved April 2026 and effective July 2026, prohibits offering therapy or psychotherapy services, including through AI, unless a licensed professional provides them.

The underlying logic is a licensing argument rather than a technology argument. Psychotherapy is a licensed activity. Licensure exists because the practice carries risk requiring training, accountability, and a professional body able to remove someone who causes harm. Software has none of those, so it cannot practise. Whether it is *good* at therapy is beside the point.

Enforcement has teeth: Illinois imposes five-figure fines for deploying AI as a therapist.

### 2. Disclosure and safe harbour

Utah takes the opposite view. It permits AI mental health chatbots with conditions: the chatbot must **state plainly that it is software**, faces limits on how it may advertise, and is restricted in what it may do with the intimate data users disclose. Operators who comply get a **safe harbour**, enforced by the Division of Consumer Protection with civil penalties up to $2,500 per violation.

The logic here is that prohibition drives users to unregulated offshore products, and a regulated domestic option with disclosure requirements and data limits is better than an unregulated one. The safe harbour is the incentive to comply rather than to route around.

### 3. Safety requirements with liability

California and New York require crisis detection, **backed by private lawsuits**, creating a duty enforced by litigation rather than by a regulator.

Idaho and Nebraska passed Conversational AI Safety Acts requiring public-facing chatbots to disclose they are AI, follow crisis-response protocols when a user expresses suicidal ideation, and refrain from claiming to provide professional mental or behavioural health care. Colorado requires operators to disclose AI-generated output, maintain suicidal-ideation and self-harm response protocols, protect minor users, and report annually to the Attorney General.

This model targets the specific failure that motivated the whole conversation: a system encountering someone in crisis and handling it badly.

![Three columns comparing US state approaches to AI therapy: prohibition in Illinois, Nevada and Maine; disclosure and safe harbour in Utah; safety duties in California, New York, Idaho, Nebraska and Colorado](/assets/images/blog/diagrams/ai-therapy-regulation-1.svg)

*The three regulatory models side by side, and the crisis-response floor they share. Diagram: Big Matrix Solutions, based on [Maine LD 2082](https://legislature.maine.gov/billtracker/#Paper/HP1397?legislature=132) and [Utah HB 452](https://le.utah.gov/~2025/bills/static/HB0452.html).*

## The compliance problem this creates

| Model | States | Mechanism |
|---|---|---|
| Prohibition | Illinois, Nevada, Maine and others | Licensing law; five-figure fines |
| Disclosure + safe harbour | Utah | Consumer protection; $2,500 per violation |
| Safety requirements | California, New York, Idaho, Nebraska, Colorado | Protocols; private right of action; AG reporting |

For anyone operating a mental health product in the United States, this is close to unworkable as a set. The models are not different strengths of the same rule. They are incompatible answers to a prior question.

A product legal in Utah with proper disclosure may be illegal in Illinois regardless of disclosure. A product satisfying Colorado's crisis protocols may still fail Maine's licensure requirement, because Maine's objection is not about protocols.

The practical responses are all bad:

- **Geofence by state**, which means detecting location reliably and maintaining separate product behaviour per jurisdiction.
- **Comply with the strictest**, which means not offering therapy at all and repositioning as wellness or coaching. That is the option most operators have taken, and largely a relabelling exercise.
- **Operate in the ambiguity**, which is what a lot of the market is doing and what private rights of action are designed to punish.

## The FDA's absence

The federal picture explains why states acted.

**As of late 2025 the FDA had not authorised a single generative-AI device for any clinical mental health purpose**, and is moving deliberately.

That caution is defensible. A generative model for mental health is genuinely hard to evaluate as a device: its behaviour is not fixed, the same input can produce different outputs, and the relevant safety question is about conversational conduct across thousands of unpredictable exchanges rather than about accuracy on a defined task. The existing framework has no good template for that.

But regulatory vacuums fill. The FDA declining to authorise anything did not slow deployment. Products shipped as wellness apps, outside device regulation. States, watching that happen to their residents, wrote their own rules.

This is a recurring dynamic worth naming: **careful federal regulators produce fragmented state regulation, not less regulation.** The result is more burdensome and less coherent than a single federal framework would have been, and it is a direct consequence of moving slowly.

## What the laws are actually about

Reading the statutes together, one requirement appears in nearly every version regardless of model: **crisis response**.

Disclosure requirements vary. Data restrictions vary. Licensure positions are opposed. But almost every law says something about what happens when a user expresses suicidal ideation.

That is the load-bearing concern, and it is well chosen. It is the scenario where the gap between a chatbot and a clinician is widest and the consequence is most severe. A clinician recognises risk, assesses it, and escalates. A general-purpose model may fail to recognise it, may respond with generic sympathy, or, in the case that produced legislative urgency, may respond in a way that makes things worse.

It is also the requirement most amenable to engineering. Crisis detection is a classification problem with a clear escalation path, and it is far more tractable than "provide good therapy." The laws converged on the part that can actually be specified and audited.

![Flow diagram: a crisis classifier checks each user message; on a positive it breaks the frame, escalates to crisis resources or a human, and logs the event; otherwise the conversation continues with AI disclosure](/assets/images/blog/diagrams/ai-therapy-regulation-2.svg)

*An illustrative crisis-handling flow; the exact duties differ by state. Diagram: Big Matrix Solutions, based on [California SB 243](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243).*

## Why general models are a bad fit here specifically

The technical argument behind the legislative alarm is more specific than "AI is unreliable."

A general-purpose model is trained, among other things, to be agreeable. Instruction following and helpfulness are the properties that make it useful, and post-training reinforces responses users rate highly. Those are reasonable objectives for almost every application and they are close to the opposite of what therapy requires.

Therapeutic practice frequently involves *not* going along with the person:

- **Challenging a distorted belief** rather than validating it, which is the core mechanism of several established modalities.
- **Holding a boundary** the patient is pushing against, which is sometimes the entire clinical work.
- **Tolerating the patient's discomfort** rather than resolving it immediately, because premature reassurance can prevent progress.
- **Recognising escalation and breaking the frame**: stopping the conversation and involving someone else, which is the opposite of continuing to engage.

A model optimised to be helpful and agreeable will tend to validate, reassure, and continue the conversation. In most contexts that is fine. With someone in a spiral of distorted thinking, sustained agreement is not neutral. It can reinforce the thing the person needed help with.

This is also the mechanism behind the specific incidents that prompted legislation. Not a model giving wrong medical facts, but a model being *accommodating* in a situation that required resistance. That failure is a direct consequence of how general models are trained, which is why domain-specific safety work: crisis classifiers, hard escalation rules, refusal behaviour that overrides helpfulness, is not an optional layer on top. It is the part that makes the application viable at all.

## The question nobody is answering

There is a hole in the middle of this that all three models avoid.

Every framework regulates AI *providing* therapy. None seriously addresses AI as an *adjunct* to human care: a system between sessions that reinforces what a clinician is working on, tracks mood, or prompts a coping exercise, with the clinician retaining responsibility.

That is plausibly the highest-value and lowest-risk use, and it sits in a gap. Is it therapy? A clinician is responsible, so probably not under most definitions. Is it a medical device? Depends on the claims. Does it need crisis protocols? Almost certainly, and nobody has said so explicitly.

The pattern from elsewhere in clinical AI is that adjunct deployments succeed and replacement deployments stall. Ambient documentation worked because it removed a burden without touching the decision. The mental health equivalent would be the same shape, and the regulation is not written for it.

## What this predicts

Three things follow from where this stands.

**Federal preemption becomes likely.** A patchwork this incoherent generates pressure from operators who cannot comply and from states watching residents use products from elsewhere. Whatever federal framework eventually arrives will probably resemble the safety-requirements model, since it is the only one that is technically specifiable.

**"Wellness" gets tested.** A large share of the market has repositioned as coaching or wellness to stay outside therapy regulation, while the product does substantially the same thing. Idaho and Nebraska's provision that chatbots may not *claim* to provide professional mental health care is aimed at this, and private rights of action in California and New York give someone the standing to litigate it.

**Crisis handling becomes the compliance floor.** It appears in nearly every law and it is the requirement most likely to survive federal harmonisation. Any operator that has not built genuine crisis detection and escalation is building on a foundation that will not hold.

## The broader lesson

Mental health AI is where the field's usual arguments become concrete in a way that is difficult to wave away.

The demand is real, the shortage of human alternatives is real, and the harm from a bad response is real and immediate. There is no version of this where you get the benefit without accepting some risk, and no version where the risk is only theoretical.

What the regulatory split reveals is that the disagreement is not empirical. Illinois and Utah are not looking at different data about chatbot safety. They are answering a different question: whether an unlicensed system should be permitted to do a licensed thing at all, versus whether a regulated version is better than the unregulated one people will use anyway.

Both positions are coherent. The technology arrived before anyone chose, and eleven states chose differently. That is what a governance failure looks like in practice. Not an absence of rules, but too many incompatible ones written by whoever moved first.

**Media credits**:
- Hero image: Big Matrix Solutions cover summarising the three state models, based on the statutes cited below.
- In-body diagram: the three regulatory models. Big Matrix Solutions, based on [Maine LD 2082](https://legislature.maine.gov/billtracker/#Paper/HP1397?legislature=132) and [Utah HB 452](https://le.utah.gov/~2025/bills/static/HB0452.html).
- In-body diagram: illustrative crisis-handling flow. Big Matrix Solutions, based on [California SB 243](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243).
