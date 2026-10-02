---
id: "12"
slug: "ai-designed-drugs-reach-the-clinic"
title: "AI-Designed Drugs Reached the Clinic. The Results Are In, and They Are Complicated."
comments: "0"
image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&q=80&w=800"
category: "Medical AI"
desc: "A 98.4 mL lung function improvement, 173 programs in clinical development, and still zero FDA approvals. What the first real data actually says."
date: "Oct 25, 2026"
tags: ["Drug Discovery", "Medical AI", "Clinical Trials", "Protein Design"]
---

# AI-Designed Drugs Reached the Clinic. The Results Are In, and They Are Complicated.

Every AI-in-pharma article written between 2020 and 2024 ended the same way: *the real test will come when these molecules reach patients.*

That test has now happened. Not comprehensively, not conclusively, but genuinely: real patients, real endpoints, real published numbers. This is a good moment to look at what came back, because the honest picture is neither the collapse the sceptics predicted nor the revolution the press releases promised.

## The number that mattered most

The clearest signal came from Insilico Medicine's **Rentosertib**, a TNIK kinase inhibitor for idiopathic pulmonary fibrosis. Both the target and the molecule came out of the company's Pharma.AI platform: the target identified computationally, the compound designed generatively.

IPF is a brutal disease. Lung function declines steadily and irreversibly, and the two approved therapies slow that decline rather than reversing it. The standard endpoint is forced vital capacity, measured in millilitres, and the baseline expectation is that patients get worse.

The Phase IIa results:

| Arm | Mean change in lung function |
|---|---|
| Rentosertib 60 mg once daily | +98.4 mL |
| Placebo | −20.3 mL |

Improvement, not a slower decline. In a disease where slowing the decline is the current standard of care, a positive mean change is a meaningfully different kind of result.

Two caveats need to sit right next to that. Phase IIa is a small, early trial designed primarily to establish safety and find a dose, so it is not powered to prove efficacy, and Phase II results have a long history of not surviving Phase III. And a novel target being validated is genuinely exciting precisely because it is genuinely uncertain; TNIK was not on anybody's IPF list before the model put it there.

But the thing being tested here was never "does this drug cure IPF." It was: *can a computational pipeline pick a novel target and design a molecule against it that does something real in humans?* On that question, the answer came back yes.

## The scale of what is now in flight

Rentosertib is the headline, but the pipeline behind it is the more important fact.

As of early 2026, **over 173 AI-discovered drug programs are in clinical development**, with 15 to 20 expected to enter pivotal trials during the year. Broader counts put the total number of programs in development above 200.

That is no longer a handful of proofs of concept. It is a cohort large enough to generate statistics, which means that within a few years we will have something the field has never had: a real base rate for whether AI-originated molecules succeed at a different rate than conventionally discovered ones.

Other programs worth tracking:

- **Zovegalisib (Relay)**: a first-in-class PI3Kα inhibitor, granted FDA Breakthrough Therapy Designation and now in Phase 3 for metastatic breast cancer. The furthest-advanced program of the group.
- **Generative protein design platforms**: Generate:Biomedicines and the Baker-lineage work behind Xaira are moving from lab-validated designed proteins toward clinical candidates. This is a distinct technical problem from small-molecule design and a distinct regulatory path.
- **Programs out of China**: a substantial fraction of the clinical-stage AI pipeline originates from Chinese biotech, which has reshaped the competitive and policy conversation considerably.

And the number that keeps the whole thing honest: as of mid-2026, **no AI-designed drug has received FDA approval**. Not one. The pipeline is real, the early data is encouraging, and the finish line remains unreached.

## Where AI actually helps, and where it does not

Several years of real programs have made the picture much sharper than the early hype allowed. The compression is real, but it is not evenly distributed.

Drug development, very roughly, has these phases:

### 1. Target identification: genuinely transformed

Working out *what* to drug is where AI has delivered most convincingly. Models trained across genomics, transcriptomics, proteomics, and literature can propose targets no human would have prioritised, and Rentosertib's TNIK is a live example of that working through to clinical signal.

This phase used to take years of hypothesis-driven biology. It can now take months, and it can surface non-obvious candidates rather than the ones already crowded with competitors.

### 2. Molecule design: substantially accelerated

Given a target, generating candidate molecules with desired properties (potency, selectivity, solubility, metabolic stability) is a search problem that generative models handle well. The reported speedups here are large.

One of the more striking recent data points: Anthropic reported that its Claude Fable 5 model accelerated aspects of the drug design process by roughly ten times, and working autonomously without human assistance produced promising candidates for nine of fourteen protein targets, now under further evaluation.

Read that carefully, though. "Promising candidates under evaluation" is early-stage output. It is a strong statement about the design step and says nothing yet about whether any of those nine become drugs. The value is in the throughput and the cost per shot on goal.

### 3. Preclinical validation: modestly helped

Predicting toxicity, ADME properties, and off-target effects is an area where models help with triage but cannot replace the work. Animal studies still happen. Wet-lab validation still happens. The models narrow the funnel; they do not remove it.

### 4. Clinical trials: barely touched

Here is the part that the "ten years to eighteen months" headlines quietly skip.

AI compresses discovery and preclinical work. Clinical trials are gated by biology and by people. A Phase III oncology trial takes years because you have to enrol hundreds of patients, treat them, and wait for events to accumulate. No model shortens the time it takes for a tumour to progress or a lung to decline.

There is useful work at the margins (patient stratification, site selection, protocol optimisation, synthetic control arms) and it can shave real months off enrolment. But the clinical phase is the majority of both the timeline and the cost, and it is the phase AI has changed least.

So when you see a claim that AI compressed a ten-year process into eighteen months, the accurate translation is usually: *the discovery-through-candidate-nomination portion took eighteen months instead of four or five years.* That is a genuine and valuable achievement. It is not the same claim.

## How these platforms actually work

Worth breaking down, because "AI designed a drug" compresses several distinct technical systems into one phrase.

**Target identification** is a graph and inference problem. You have genomic association data, gene expression across tissues and disease states, protein interaction networks, and the published literature. The task is to find a protein whose modulation would plausibly alter disease course, and which is druggable. Models here integrate heterogeneous evidence and rank candidates: the output is a hypothesis about biology, not a molecule.

**Small-molecule generation** is a constrained search problem. Given a target structure, generate molecules that bind it selectively while satisfying a long list of other requirements: synthesisable in a reasonable number of steps, orally bioavailable, metabolically stable, not toxic, not already patented. Generative models propose candidates; predictive models score them; the loop iterates. This is where the reported order-of-magnitude speedups live, and the mechanism is straightforward: you can evaluate a million virtual candidates for the cost of synthesising a handful.

**Structure prediction** underpins both. Being able to predict a protein's three-dimensional structure from its sequence with useful accuracy changed what the previous two steps can assume. Docking a candidate against a predicted structure is far cheaper than crystallising the real thing.

**De novo protein design** is a different discipline again. Rather than finding a small molecule to fit an existing protein, you design a new protein to do a specific job: bind a target, catalyse a reaction, act as a therapeutic in its own right. Generate:Biomedicines and the Baker-lineage work behind Xaira are the visible players, and the regulatory path for a designed protein differs from that of a small molecule in ways that are still being worked out.

The important structural point: all four operate *before* a molecule enters an animal. They compress the front of the pipeline. Nothing in that list touches what happens once the compound reaches a human body, which is where the majority of failures occur.

## The failures matter too

The programs that did not work are underdiscussed and more informative than the successes.

Several high-profile AI-originated candidates have failed in the clinic, and the failure modes have not been exotic. They failed for the reasons drugs normally fail: insufficient efficacy in humans, unexpected toxicity, a target that turned out not to be causal in the disease despite strong associative evidence.

Say that plainly, because it undercuts the strongest version of the AI-pharma thesis. If AI-designed molecules failed for *novel* reasons, that would suggest a fixable methodological gap. They fail for the ordinary reasons, which suggests something more sobering: the models are good at chemistry and target prioritisation, and human biology remains the hard part.

The most credible current estimate is that AI-originated programs have Phase I success rates comparable to or somewhat better than the industry baseline, with too few Phase II and III readouts to say anything confident. Better numbers on the front end. Unknown numbers where it counts.

## What changes if this holds

Assume the encouraging trajectory continues and a handful of these programs reach approval in the next few years. The structural consequences are larger than "drugs get made faster."

**Rare disease economics improve.** The reason thousands of rare diseases have no treatment is not that they are scientifically impossible. It is that a several-hundred-million-dollar discovery programme cannot be justified for a few thousand patients. Cut discovery cost by an order of magnitude and a large number of previously unfundable programmes become viable.

**More shots on goal per target.** If designing and testing a candidate series is cheap, you can afford to fail more often and earlier. That changes portfolio strategy: instead of betting heavily on one molecule per target, you run several and let the data choose.

**Novel targets get attempted.** Conventional pharma is strongly biased toward well-validated targets, because the risk of a novel one is hard to justify. Cheaper discovery makes speculative targets affordable, and that is where the genuinely new medicines live.

**The bottleneck becomes clinical capacity.** If discovery output multiplies and clinical trial throughput does not, the queue just moves. This is already visible, and it is why trial design, recruitment, and regulatory throughput are becoming the interesting problems.

## How to read the next press release

This field produces a lot of announcements, and a few habits make them much easier to evaluate.

**Check which phase.** "Entered Phase I" means safety testing in healthy volunteers has begun and says nothing about whether the drug works. "Positive Phase II" is a real signal. "Phase III readout" is the one that decides. The gap in evidentiary weight between these is enormous and the language in press releases tends to flatten it.

**Check what AI did.** "AI-discovered" can mean the target was found computationally, the molecule was generated, a screening library was prioritised, or a model was used somewhere in a conventional programme. All are legitimate uses; they are not the same claim. The strongest version, a novel target identified computationally *and* a molecule designed generatively, is rarer than the label suggests.

**Check the endpoint.** A statistically significant change in a biomarker is not the same as a clinical benefit. Many drugs move a biomarker convincingly and fail to help patients. Rentosertib's forced vital capacity is a well-established functional endpoint in IPF, which is part of why the result carried weight.

**Check the control arm.** A single-arm trial showing improvement is much weaker evidence than a placebo-controlled one, because diseases fluctuate and patients in trials receive better care generally. The placebo comparison is what made the Rentosertib numbers interpretable.

**Check the timeline claim carefully.** "Ten years to eighteen months" almost always refers to discovery through candidate nomination, not to approval. Read which portion of the pipeline the number describes.

## Where this actually stands

The field has crossed from promise into evidence, and the evidence is mixed in a specific and reasonable way.

Discovery is genuinely faster and genuinely better at finding non-obvious targets. That is not marketing; Rentosertib's Phase IIa data is a real clinical signal for a target a model chose. Design throughput has improved enough that the cost per candidate has fallen sharply.

Human biology has not become more predictable, clinical trials have not become shorter, and no AI-designed drug has yet been approved. The 173 programs in clinical development are the actual experiment, and it will report over the next three to five years.

If you want one sentence: AI has made it dramatically cheaper to find out whether a drug works, and has not made drugs more likely to work. That is a smaller claim than the headlines and a much better outcome than nothing.
