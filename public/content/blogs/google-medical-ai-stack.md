---
id: "46"
slug: "google-medical-ai-stack-medgemma-medasr-txgemma-amie"
title: "Google Built Four Medical AI Models. Three Are Downloadable and One Is Not."
comments: "0"
image: "/assets/images/blog/medgemma-1-5.png"
category: "Medical AI"
desc: "MedGemma 1.5 for imaging, MedASR for dictation, TxGemma for drug discovery, AMIE for clinical dialogue. What each is actually for, and where the line falls."
date: "Sep 22, 2026"
tags: ["Medical AI", "MedGemma", "Google Research", "Open Weights"]
---

# Google Built Four Medical AI Models. Three Are Downloadable and One Is Not.

Google has assembled the most complete open medical AI stack anyone currently offers, and it is easy to miss because the pieces shipped separately over eighteen months under a programme name — Health AI Developer Foundations — that tells you nothing about what is in it.

Four models, four distinct jobs: **MedGemma 1.5** reads medical images, **MedASR** transcribes clinical speech, **TxGemma** predicts drug properties, and **AMIE** conducts patient conversations. Three of those you can download today. The fourth you cannot, and the reason is the most interesting thing about the set.

## MedGemma 1.5: one model, every imaging modality

Announced **January 13, 2026**, MedGemma 1.5 ships as a single **4B multimodal instruction-tuned** variant. That is small — deliberately so, since the point of HAI-DEF is to give developers something they can actually fine-tune and run.

What it accepts is the notable part: text, 2D images, **high-dimensional volumes**, and **whole-slide pathology images**, all through one unified architecture. Volumetric CT and MRI, longitudinal chest X-ray comparison, and gigapixel pathology slides are three genuinely different data shapes, and previous versions handled the first one poorly and the others not at all.

The benchmark movement from the previous generation:

| Task | Before | MedGemma 1.5 |
|---|---|---|
| CT disease findings | 58% | 61% |
| MRI disease findings | 51% | **65%** |
| Histopathology (ROUGE-L) | 0.02 | **0.49** |
| Chest ImaGenome (IoU) | 3% | **38%** |
| MS-CXR-T macro accuracy | 61% | 66% |
| Lab report extraction (macro F1) | 60% | 78% |
| MedQA accuracy | 64% | 69% |
| EHRQA accuracy | 68% | **90%** |

A few of those are not incremental. Histopathology going from 0.02 to 0.49 ROUGE-L means the previous model essentially could not describe a pathology slide and this one can — it reportedly matches Google's dedicated PolyPath model. Chest ImaGenome IoU from 3% to 38% is the difference between an anatomical localisation capability that does not work and one that does.

EHRQA from 68% to 90% is the one I would watch commercially. Question answering over electronic health records is where most of the unglamorous clinical value sits, and a 4B model doing it at 90% is deployable on modest hardware inside a hospital's own network — which is the whole ballgame for patient data.

The honest caveat: CT findings at 61% and MRI at 65% are useful for triage and drafting, not for autonomous reads. Google positions HAI-DEF models explicitly as *starting points* for developers to evaluate and adapt, not as finished clinical tools, and that framing is correct.

## MedASR: the boring one that will get used most

Released the same day, **MedASR** is a speech-to-text model pretrained on **5,000 hours of clinical audio**, designed to be fine-tuned for specialised contexts and paired with a model like MedGemma to automate documentation end to end.

It is the least exciting model in the set and probably the highest-value one, for the reason ambient documentation generally has turned out to be the clinical AI success story: it targets a burden rather than a decision. General speech recognition handles ordinary prose well and falls apart on drug names that sound like other drug names, dosages where a decimal matters, and specialty abbreviations whose meaning is context-dependent. A transcription error in prose is a typo; in a medication name it is a safety event.

Pairing MedASR with MedGemma is the actual product hint here. Speech in, structured note out, with the imaging model available to reason over whatever was ordered — assembled from downloadable parts you run yourself.

## TxGemma: models for the drug pipeline

**TxGemma** came earlier, announced **March 25, 2025**, and points at a different industry entirely.

It comes in **2B, 9B and 27B** parameter sizes, with specialised variants for classification, regression and generation, trained on over **7 million therapeutic examples**. Critically, it understands both ordinary text *and* the structural representations of therapeutic entities — small molecules, chemicals, proteins.

That combination is what makes it useful. A researcher can ask it, in language, to predict whether a candidate compound is likely to be safe or effective, across the pipeline from target identification through to clinical trial outcome prediction. It is available on Vertex AI Model Garden and Hugging Face.

Worth situating this against what the field has learned: AI has genuinely compressed target identification and molecule design, and has barely touched clinical trials. TxGemma sits squarely in the part that works — cheap, fast, many-shots-on-goal candidate evaluation. It does not shorten a Phase III.

## AMIE: the one you cannot download

**AMIE** — Articulate Medical Intelligence Explorer — is a research system for diagnostic and management dialogue, and it is a different kind of artifact from the other three.

It conducts the conversation. In its doctor-agent role, AMIE is instructed to act as an empathetic clinician, interviewing a patient about history and symptoms to reach a diagnosis. It was trained through **self-play in a simulated environment with automated feedback**, letting it scale across conditions, specialties and contexts without needing a human on the other side for every training episode.

![AMIE: Google's research AI system for medical reasoning and conversations, evolving from one-off diagnostic dialogue to managing disease over time](/assets/images/blog/amie-architecture.png)

The newer work extends it from one-off diagnosis to **multi-visit disease management**, using Gemini's long context to combine in-context retrieval with structured reasoning so its output aligns with current clinical practice guidelines and drug formularies. It analyses content, generates a response, refines it against guidelines, and produces a management plan across visits.

The published results, in *Nature*, are strong and carefully bounded. AMIE was rated **non-inferior to primary care physicians on overall management reasoning**. And the researchers stated plainly that the findings do **not** show AMIE is ready for clinical care. The best result recorded by *either* group across the benchmark was **73.8%**, even with reference materials available — leaving real room for error in medication reasoning.

That last figure deserves emphasis. When the human comparator also tops out at 73.8%, the honest reading is not "AI matches doctors" but "this benchmark is hard for everyone, and a system at parity with a physician is still wrong a quarter of the time."

## Why the split matters

Three downloadable models and one research system is not an accident of timing. It maps onto risk.

MedGemma, MedASR and TxGemma all produce output that a qualified human evaluates before it affects anyone. A drafted finding, a transcript, a predicted property. Wrong output costs review time.

AMIE talks to the patient. It is the only one of the four where the model's output *is* the clinical interaction rather than an input to it, and where a confidently wrong turn in conversation reaches a person directly with no professional in between. Keeping that as research while shipping the other three as open weights is a defensible line, and it is roughly the same line the rest of the field has landed on: **adjunct tools deploy, replacement tools stall.**

Ambient documentation succeeded because it removed a burden without touching a decision. AMIE is interesting precisely because it does touch the decision, which is also why it is not downloadable.

## What to do with this

**If you are building clinical imaging tooling**, MedGemma 1.5 is the strongest open starting point available, and 4B means you can fine-tune it on one machine and run it inside your own network. Validate on your own scanners and protocols before trusting the benchmark numbers — imaging models degrade across sites more than any other category.

**If you are building documentation tooling**, MedASR plus MedGemma is a credible self-hosted alternative to the commercial ambient scribes, with the data-residency argument intact. The randomised evidence on scribes shows a real effect; this is the open path to it.

**If you are in therapeutics**, TxGemma is worth benchmarking against whatever you use for property prediction, and the 2B variant is cheap enough to run over a large virtual library.

**If you are watching AMIE**, watch for a prospective randomised trial rather than another benchmark. Non-inferiority on management reasoning is a capability result. Whether a clinician using AMIE produces better outcomes than one without it remains unmeasured, and that is the question that decides whether any of this reaches patients.

**Sources**: [Google Research — Next generation medical image interpretation with MedGemma 1.5 and medical speech to text with MedASR](https://research.google/blog/next-generation-medical-image-interpretation-with-medgemma-15-and-medical-speech-to-text-with-medasr/), [MedGemma 1.5 model card — Health AI Developer Foundations](https://developers.google.com/health-ai-developer-foundations/medgemma/model-card), [MedGemma 1.5 Technical Report](https://arxiv.org/html/2604.05081v2), [Google Developers Blog — Introducing TxGemma](https://developers.googleblog.com/en/introducing-txgemma-open-models-improving-therapeutics-development/), [Nature — Towards conversational diagnostic artificial intelligence](https://www.nature.com/articles/s41586-025-08866-7), [Nature — Towards conversational artificial intelligence for disease management](https://www.nature.com/articles/s41586-026-10764-5), [Google — AMIE for disease management in Nature](https://blog.google/innovation-and-ai/models-and-research/google-research/amie-for-disease-management-in-nature/), [MarkTechPost — Google AI Releases MedGemma-1.5](https://www.marktechpost.com/2026/01/13/google-ai-releases-medgemma-1-5-the-latest-update-to-their-open-medical-ai-models-for-developers/). Images are Google's, from the announcements linked above.
