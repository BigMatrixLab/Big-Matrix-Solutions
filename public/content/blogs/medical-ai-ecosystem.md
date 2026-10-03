---
id: "48"
slug: "medical-ai-ecosystem-alphafold-tempus-pathai-hippocratic"
title: "Six Places Medical AI Is Actually Working, From Protein Folds to Phone Calls"
comments: "0"
image: "/assets/images/blog/alphafold-3.webp"
category: "Medical AI"
desc: "AlphaFold 3, the open medical model ecosystem, Mayo's 150 models, $9-an-hour care agents, 500 petabytes of oncology data, and FDA-cleared pathology."
date: "Oct 05, 2026"
tags: ["Medical AI", "AlphaFold", "Precision Medicine", "Digital Pathology"]
---

# Six Places Medical AI Is Actually Working, From Protein Folds to Phone Calls

Medical AI coverage tends to fixate on whether a model can out-diagnose a doctor. That is the least representative thing happening in the field.

The work that is actually landing spans molecular structure prediction, an open model ecosystem nobody centrally planned, a hospital running 150 models in production, patient-facing agents priced by the hour, oncology datasets measured in petabytes, and a pathology platform cleared for primary diagnosis. Six very different bets. Here is where each genuinely stands.

## 1. AlphaFold 3: the molecule problem got wider

AlphaFold 2 predicted how a protein folds. **AlphaFold 3**, published in *Nature* in **May 2024**, predicts how proteins interact with everything else (nucleic acids, small molecules, ions, modified residues) using a substantially rewritten **diffusion-based** architecture.

The accuracy claims held up under scrutiny, and the comparisons that matter are against specialised tools rather than against AlphaFold 2:

- **Far greater accuracy on protein–ligand interactions** than state-of-the-art docking tools. Full-atom docking accuracy reached **76.4%**, roughly **1.8x** RoseTTAFold All-Atom's 42%.
- **Much higher accuracy on protein–nucleic acid interactions** than nucleic-acid-specific predictors.
- **Substantially better antibody–antigen prediction** than AlphaFold-Multimer v2.

![Figure 1 of the AlphaFold 3 paper: example predicted structures, bar charts of AF3 success rates against AutoDock Vina, RoseTTAFold All-Atom, RoseTTAFold2NA and AlphaFold-Multimer, and the AF3 architecture with Pairformer and diffusion modules](/assets/images/blog/medical-ai-ecosystem-alphafold3-fig1.webp)

*AlphaFold 3 accuracy across ligands, nucleic acids, covalent modifications and proteins, with its diffusion-based architecture (panel d). Source: [Abramson et al., Nature, 2024](https://www.nature.com/articles/s41586-024-07487-w), CC BY 4.0.*

Why this matters more than the fold problem: drugs work by binding things. A tool that predicts protein structure alone tells you the shape of the lock; one that predicts protein–ligand complexes tells you whether your key fits. That is the actual question in structure-based drug design, and beating dedicated docking software by 1.8x is a large jump in a mature field.

Model code and weights were released for **academic use in November 2024**, alongside the AlphaFold Server for non-commercial researchers. Commercial use runs through Isomorphic Labs.

## 2. The open medical model ecosystem

No single company built this and it may be the most consequential item on the list.

Hugging Face now hosts a large body of open medical AI: fine-tuned biomedical and clinical LLMs, imaging models, datasets, and an **Open Medical-LLM Leaderboard** benchmarking models across medical question-answering tasks. **OpenMed** alone publishes over **380 named entity recognition models** for clinical text, Apache 2.0, covering biomedical NER across 12 public datasets.

The capability is genuinely competitive. **OpenBioLLM-70B** reports outperforming considerably larger general models across nine biomedical datasets with an average score of **86.06%**.

The significance is structural rather than technical. Clinical AI's binding constraint has never been model quality. It is that patient data cannot leave the institution. An ecosystem of downloadable, permissively licensed medical models is the only architecture that answers that, because it is the only one where the data never moves.

Worth noting in the same breath: **NVIDIA agreed to acquire Hugging Face for $12.93 billion**, announced September 2026 and expected to close in H1 2027. The place this ecosystem lives is changing hands, with stated commitments to remain open and hardware-neutral. For anyone with medical models in production off the Hub, that is a dependency worth mirroring locally.

## 3. Mayo Clinic: 150 models, in production

Mayo Clinic is the clearest picture available of what serious institutional deployment looks like, and the number is **around 150 AI models** running across functions from triage to pathology.

Their approach is to partner rather than build alone, with Google, Microsoft, NVIDIA and Cerebras, using data in the Mayo Clinic Platform to create foundation models, generative AI solutions and agents. Two concrete outputs:

- **STRAND**, built with Cerebras: one of the first genomics foundation models, combining public data with Mayo's own germline genetic sequencing from **more than 100,000 patients**.
- **Radiology report generation** with Microsoft Research, automatically drafting reports from CT and MRI.

The lesson worth extracting is about evidence rather than technology. Mayo, alongside Kaiser Permanente, Vanderbilt and the Digital Medicine Society, has been publicly working through **evidence thresholds, data-engineering prerequisites and rapid-cycle evaluation**: how you scale generative AI without compromising safety, equity or rigour.

That is the unglamorous work that decides whether any of this reaches patients, and almost nobody writes about it.

## 4. NVIDIA and Hippocratic AI: care agents at $9 an hour

**Hippocratic AI** builds patient-facing agents for low-risk, non-diagnostic tasks over the phone (chronic care check-ins, post-discharge follow-up) deployed by health systems, payors, digital health companies and pharma. Its partnership with **NVIDIA** targets what they call **"Empathy Inference"**: super-low-latency conversational capability built on NVIDIA's Avatar Cloud Engine and Riva speech models.

The economics are the headline. These agents run at **$9 an hour**, and NVIDIA's venture arm NVentures backed a **$17 million** investment into the company.

On safety, Hippocratic reports that its medium-sized, healthcare-specific models significantly outperformed much larger general-purpose models including GPT-4 on medical accuracy and safety. That is plausible and it is a vendor claim.

The framing I would apply: this succeeds or fails on the **non-diagnostic** boundary, not on model quality. A phone call reminding a patient to take a medication and asking how they are feeling is a genuine unmet need. Those calls mostly are not happening now, because there is nobody to make them. The moment the agent starts fielding "should I be worried about this symptom?", it is in a different risk category, and the interesting question is how reliably that boundary holds in a real conversation with a worried patient.

Latency is not a vanity metric here either. In a phone call, a two-second pause reads as something being wrong.

## 5. Tempus AI: the data asset is the moat

**Tempus** combines clinical and genomic data for precision oncology, and its scale is the thing to understand:

| Asset | Scale |
|---|---|
| Total data | 500+ petabytes |
| De-identified patient journeys | 45 million |
| Journeys with sequenced data | 1.5 million |
| Full multimodal cancer records | 400,000+ |
| 2025 revenue | $1.59 billion |

"Full multimodal" means genomic, transcriptomic, imaging and clinical data on the same patient, and that 400,000 figure is the actual moat. Models are reproducible; a linked longitudinal cohort of that size is not.

They presented multimodal foundation model results at **ASCO 2026**, published a **JCO Precision Oncology** study in March 2026 with The Oncology Institute showing that advanced profiling features (tumour-normal matched sequencing, RNA sequencing, liquid biopsy reflex) surface actionable findings that standard testing misses, and acquired **Personalis for $1.5 billion** in July 2026 to add tumour-informed molecular residual disease detection.

They also launched the **PRECISION Challenge**, opening their foundation model work to outside research teams, which is a sensible move when your advantage is the data rather than the algorithm.

The finding that matters clinically is the JCO one: not that AI is clever, but that richer profiling changes treatment options for real patients. That is a testable claim with a published result behind it.

## 6. PathAI: cleared for primary diagnosis

**PathAI** is the item on this list furthest through the regulatory process, which makes it the most instructive.

**AISight Dx** has **FDA 510(k) clearance for primary diagnosis** in the US, with the Hamamatsu NanoZoomer S360MD and Leica Aperio GT 450 DX scanners, and is CE-IVD marked for primary diagnosis in the EEA, UK and Switzerland. That clearance was subsequently expanded to support more slide scanners, and the FDA granted **Breakthrough Device Designation** to PathAssist Derm.

Read the scanner list again, because it is the whole lesson. Clearance is not for "AI pathology". It is for a platform **with named scanners**. Change the scanner and you are outside the cleared configuration. Digital pathology's domain-shift problem is severe enough that regulators treat the scanner as part of the device, and every scanner added is regulatory work.

![Diagram: AISight Dx paired with the Hamamatsu NanoZoomer S360MD or Leica Aperio GT 450 DX is inside the cleared configuration; an unlisted scanner is outside the clearance](/assets/images/blog/diagrams/medical-ai-ecosystem-1.svg)

*Primary-diagnosis clearance covers the platform with named scanners. Diagram: Big Matrix Solutions, based on [PathAI](https://www.pathai.com/resources/pathai-receives-fda-clearance-for-aisight-dx-platform-for-primary-diagnosis).*

**Labcorp** has expanded its collaboration to deploy AISight Dx across its national network of anatomic pathology labs and hospital collaborations. National lab deployment is the real validation. It means the workflow, the storage, and the throughput all hold at volume, which is where most pathology AI has previously stalled.

## What the set tells you

Line these six up and a pattern emerges that contradicts most of the discourse.

**The regulated wins are narrow and specific.** PathAI cleared a platform with two named scanners, not a diagnostic capability. Narrowness is what makes clearance achievable.

**The data asset beats the model.** Tempus's 400,000 multimodal records and Mayo's 100,000 sequenced patients are the durable advantages. Models are three months from commodity; linked longitudinal cohorts are not.

**Open weights are the only answer to data residency.** The Hugging Face medical ecosystem matters because it is the one architecture where patient data never leaves the building.

**Adjuncts ship, replacements stall.** AlphaFold informs a chemist. Hippocratic's agents handle calls nobody was making. Mayo drafts reports a radiologist signs. Nothing here replaces a clinical decision, and that is why it is all in production.

**The infrastructure is the hard part.** Storage, scanner interoperability, latency, evidence thresholds, regulatory configuration. None of it is a modelling problem, and all of it determines whether the models reach a patient.

If you are looking for where medical AI goes next, the answer is probably not a better model. It is whichever of these six figures out deployment first.

**Media credits**:
- In-body figure: Fig. 1 from [Abramson et al., Accurate structure prediction of biomolecular interactions with AlphaFold 3, Nature 630, 493-500 (2024)](https://www.nature.com/articles/s41586-024-07487-w). CC BY 4.0.
- In-body diagram: AISight Dx cleared configuration. Big Matrix Solutions, based on [PathAI](https://www.pathai.com/resources/pathai-receives-fda-clearance-for-aisight-dx-platform-for-primary-diagnosis).
