---
id: "33"
slug: "autonomous-surgical-robots-where-they-stand"
title: "A Robot Removed Eight Gallbladders Without Help. Read the Asterisks."
comments: "0"
image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
category: "Medical AI"
desc: "88% of steps completed unaided on ex vivo tissue, and a clearance pathway that still assumes a surgeon's hands on the controls. What autonomy means here."
date: "Mar 05, 2027"
tags: ["Medical AI", "Surgical Robotics", "Autonomy", "Robotics"]
---

# A Robot Removed Eight Gallbladders Without Help. Read the Asterisks.

Surgical robots have been in operating theatres for two decades, and almost all of them are teleoperators. A surgeon sits at a console and the robot reproduces their hand movements with better precision, tremor filtering, and articulation than a human wrist manages. Impressive engineering. Zero autonomy — every motion originates with a person.

The interesting question is what happens when the robot decides. Recent work has produced the clearest answer yet, and both the result and its qualifications deserve equal attention.

## The result

A team at Johns Hopkins ran an experiment removing unseen gallbladders from **eight ex vivo pig specimens** using an autonomous robotic system with no human intervention.

The robot **autonomously completed 88 percent of the surgical steps on the first attempt**, adjusting itself to finish the remaining steps with minimal correction.

More significant than the percentage is the robustness. The system performed across anatomical conditions that were not uniform, and during deliberate disruptions — researchers changed its starting position, and added blood-like dyes that altered the appearance of the gallbladder and surrounding tissue.

That is the part that matters. A robot executing a memorised motion sequence on identical specimens is automation. A robot that handles a shifted starting position and changed visual appearance is doing perception and adaptation, which is a different capability class.

This builds on STAR — the Smart Tissue Autonomous Robot — which in 2022 performed the first autonomous robotic surgery on a live animal, a laparoscopic procedure on a pig. STAR combined 3D imaging, machine-learning tracking, and a convolutional network predicting tissue motion to guide suture planning and adjust its surgical plan in real time.

## The asterisks, stated plainly

Now the qualifications, because the gap between this and clinical practice is wide and specific.

**Ex vivo means not alive.** The eight gallbladders were in excised tissue. No bleeding to control, no respiratory motion, no blood pressure change, no physiological response to injury. Live tissue moves, bleeds, and reacts, and each of those makes the perception problem substantially harder.

**Eight is not a trial.** It is a demonstration. The complication rate for a procedure is established over thousands of cases, because the failures that matter are the rare ones.

**Cholecystectomy is a good choice for a reason.** Gallbladder removal is common, well-standardised, and anatomically fairly consistent. That makes it the sensible first target and means the result does not generalise to procedures where anatomy varies or the plan changes mid-operation.

**"Minimal correction" is doing work in that sentence.** Twelve percent of steps needed human help. In an operating theatre, that means a surgeon present, scrubbed, attentive, and able to take over instantly — which is not meaningfully different in staffing terms from a surgeon operating.

None of this diminishes the achievement. It does clarify what was achieved: strong evidence that autonomous soft-tissue manipulation is feasible, under controlled conditions, for one standardised procedure.

## The levels-of-autonomy problem

Surgical robotics borrowed a framework from automotive, and it is more useful here than the borrowed terminology usually is. Roughly:

| Level | What it means |
|---|---|
| 0 | Pure teleoperation — every motion comes from the surgeon |
| 1 | Robot assistance — tremor filtering, motion scaling, virtual boundaries |
| 2 | Task autonomy — the robot performs a discrete step under supervision |
| 3 | Conditional autonomy — a whole procedure, surgeon monitoring |
| 4 | High autonomy — no surgeon required for defined procedures |
| 5 | Full autonomy |

Almost every clinical system in use is at level 0 or 1. The da Vinci family is teleoperation with assistance features. Orthopaedic cutting guides that constrain a saw to a planned trajectory are level 1 — the robot is enforcing a boundary, not choosing where to cut.

The Johns Hopkins gallbladder work is a level 2 demonstration edging toward level 3, on ex vivo tissue.

What the framework makes clear is that the interesting jump is 1 to 2 — from *constraining* a surgeon's motion to *originating* motion. That is the point at which the system is making a decision, and it is where the regulatory and liability questions all appear at once. Levels 3 through 5 are extensions of the same problem rather than new ones.

It also explains why orthopaedics is likely to get there first. Level 1 bone cutting is already routine, the anatomy is rigid, the plan comes from a preoperative CT, and the gap between constraining a cut and making it is narrow. Soft tissue offers no such gentle path — tissue deforms, bleeds, and looks different from one patient to the next.

## What is actually clearing regulators

The clinical reality sits some distance from the research frontier, and the regulatory record shows where.

In January 2026, Intuitive secured FDA clearance for the da Vinci 5 for several **cardiac procedures**. That is a genuine expansion into technically demanding surgery, and the da Vinci remains a teleoperated system. The clearance extends what a surgeon can do through the robot, not what the robot does alone.

Meanwhile a team at the Institute of Automation of the Chinese Academy of Sciences published another autonomous surgical robotics advance in January 2026, so the research is progressing on multiple fronts.

The pattern is consistent: **clinical clearance for better teleoperation, laboratory results for autonomy.** Those two tracks have not yet met, and the reason is less about capability than about how devices are regulated.

## Why the regulatory path is genuinely hard

Autonomous surgery presents a problem the medical device framework was not built for.

Device clearance rests on a defined intended use, validated against a specific study, with a predictable failure mode. A teleoperated robot fits this comfortably — its intended use is reproducing surgeon input, and if it malfunctions the surgeon stops.

An autonomous system does not fit. Its intended use includes *making decisions during the procedure*, which means:

- **The failure modes are open-ended.** You cannot enumerate every anatomical variation and unexpected finding it might encounter.
- **Liability is unclear.** If an autonomous system injures a structure, responsibility is distributed between manufacturer, hospital, and supervising surgeon in ways no framework cleanly assigns.
- **Validation would have to be enormous.** Demonstrating safety for a system that makes intraoperative decisions plausibly requires thousands of cases, and there is no accepted route to accumulating them.
- **Consent is genuinely complicated.** A patient consenting to autonomous surgery is consenting to something they cannot evaluate, from a surgeon who may not be able to fully explain the system's decision process.

These are not reasons autonomy will not happen. They are reasons it will arrive gradually, in narrow slices, with a surgeon supervising for a long time.

## The likely path in

Reading the trajectory, autonomy will not arrive as "the robot does the operation." It will arrive as an expanding set of autonomous *steps* within surgeon-led procedures.

**Suturing** is the obvious first candidate — repetitive, geometrically well-defined, and where STAR started. A surgeon completes the difficult dissection and hands a closure to the robot.

**Bone work** is arguably closer than soft tissue. Bone is rigid, imaging maps to it precisely, and the cut is planned from a CT scan beforehand. Work on autonomous policy learning for robotic bone resection in knee arthroplasty is a good example, and orthopaedics has used semi-autonomous cutting guides for years already.

**Camera control** already exists in various forms and is uncontroversial. The robot positioning the endoscope to keep the operative field centred removes a genuine annoyance and risks little.

**Tissue retraction** — holding structures out of the way, adjusting as the surgeon works. Mechanically simple, requires perception, low consequence if it fails.

The common thread is the same one that governs where AI lands elsewhere: **steps that are repetitive, geometrically well-defined, and cheap to fail at.** The judgment-heavy steps stay with the surgeon, and the boundary moves slowly.

## What it would actually be for

Worth asking, since the case for autonomous surgery is often assumed rather than argued.

**Consistency.** Surgical outcomes vary by surgeon and by time of day. A system that performs a standardised step identically every time removes variance, and variance is where a meaningful share of surgical complications live.

**Access.** This is the strongest argument. Surgical capacity is unevenly distributed, and many parts of the world have far too few surgeons for their population. Autonomy that reduced the expertise required for standard procedures would matter enormously. It is also the furthest away, since it is precisely the scenario without an expert supervisor to hand.

**Precision beyond human capability.** Sub-millimetre work, tremor-free, in confined spaces. Already partially delivered by teleoperation.

**Surgeon fatigue.** Long procedures degrade performance. Handing off the repetitive portions preserves attention for the parts that need it.

## The perception problem is the real one

If you strip away the regulatory questions, the engineering bottleneck is not control. It is seeing.

Industrial robots achieve extraordinary precision because their environment is known. The part is in a fixture, the fixture is at a surveyed position, and the trajectory was computed in advance. Nothing moves that was not supposed to.

A surgical field is the opposite. Tissue deforms when touched. Organs shift with respiration and with the patient's position. Blood obscures the view and changes the colour of everything near it. Smoke from cautery fills the field. The camera is on a scope that moves. And the structure the robot must avoid may be a millimetre from the structure it must cut, with the boundary between them visible only as a subtle difference in texture.

That is a perception problem of a different order from anything autonomous driving faces, and it explains why the Johns Hopkins result is significant for a reason that is easy to miss. The impressive part was not completing the steps. It was completing them after the researchers moved the starting position and applied dyes that changed how the tissue looked — which means the system was perceiving and adapting rather than replaying.

It also explains the ex vivo caveat properly. Excised tissue does not breathe, bleed, or respond. Removing those three factors removes most of what makes the perception hard, which is why the step from ex vivo to live animal work is larger than the case count suggests.

## Where it stands

Autonomous soft-tissue surgery is a real research capability, demonstrated on ex vivo tissue with genuine robustness to variation, on one standardised procedure, in single-digit case counts.

Clinical robotic surgery is teleoperation, expanding into harder procedures, with a surgeon's hands on the controls.

The distance between those is measured in regulatory frameworks and clinical evidence rather than in algorithms — which is a familiar pattern across medical AI, and here it is arguably appropriate. The 88 percent figure is a strong result and a reminder of the arithmetic: for a procedure performed hundreds of thousands of times a year, the interesting number is not the 88 percent that worked. It is what happens in the remaining 12 percent, and how reliably someone is there to notice.

**Sources**: [Johns Hopkins Hub — Robot performs first realistic surgery without human help](https://hub.jhu.edu/2025/07/09/robot-performs-first-realistic-surgery-without-human-help/), [Mewburn — No Hands on Deck: The Dawn of Fully Autonomous Surgery](https://www.mewburn.com/forward/no-hands-on-deck-the-dawn-of-fully-autonomous-surgery), [Science Robotics — Will your next surgeon be a robot? Autonomy and AI in surgical robotics](https://www.science.org/doi/pdf/10.1126/scirobotics.adt0187), [Autonomous Robotic Surgery: Has the Future Arrived?](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10862530/), [ArthroCut: Autonomous Policy Learning for Robotic Bone Resection in Knee Arthroplasty](https://arxiv.org/pdf/2603.03957), [NVIDIA — Autonomous Robot Improves Surgical Precision Using AI](https://developer.nvidia.com/blog/autonomous-robot-improves-surgical-precision-using-ai/)
