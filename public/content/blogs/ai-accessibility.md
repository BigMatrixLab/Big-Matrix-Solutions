---
id: "89"
slug: "ai-for-accessibility-captions-screen-readers-alt-text"
title: "AI for Accessibility: Captions, Screen Readers and Alt Text Done Right"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/ai-accessibility.jpg"
category: "UI Design"
desc: "AI can draft captions and alt text in seconds, but drafts are not compliance. Where AI genuinely helps disabled users, where it quietly fails them, and the review workflow that makes it safe."
date: "Jan 21, 2027"
tags: ["Accessibility", "WCAG", "Alt Text", "Captions", "UI Design"]
---

# AI for Accessibility: Captions, Screen Readers and Alt Text Done Right

Accessibility work has a volume problem. Every image needs a text alternative, every video needs captions, and every form control needs a name that a screen reader can announce. Teams fall behind not because they disagree with the requirements but because there is so much of it.

AI looks like the obvious fix, and in places it is a real one. Speech recognition can produce a caption draft in minutes. Vision models can describe an image well enough to give a blind user a working sense of it. But a draft is not compliance, and "automated" is not the same as "accessible."

This guide sets out where AI helps, where it fails, and the workflow that keeps the help without the failures.

## The scale of the gap

WebAIM's annual scan of the top one million home pages shows how far the web still has to go. In its 2026 report, 95.9 percent of home pages had detected WCAG failures, averaging 56.1 errors per page. Missing alternative text for images appeared on 53.1 percent of pages, missing form labels on 51 percent, and empty links and buttons on 46.3 and 30.6 percent respectively.

These are automated checks, so they understate the problem. A tool can detect a missing `alt` attribute. It cannot tell you that `alt="image1.jpg"` is useless.

The legal pressure is real as well. The European Accessibility Act has applied since 28 June 2025 to a range of products and services, including websites and mobile apps of businesses in scope.

## What the standard actually asks for

WCAG 2.2 became a W3C Recommendation on 5 October 2023. The success criteria that AI tools most often claim to address are old ones:

| Criterion | Level | Requirement in brief |
|---|---|---|
| 1.1.1 Non-text Content | A | Non-text content has "a text alternative that serves the equivalent purpose" |
| 1.2.2 Captions (Prerecorded) | A | Captions for all prerecorded audio in synchronised media |
| 1.2.4 Captions (Live) | AA | Captions for all live audio in synchronised media |
| 1.2.5 Audio Description (Prerecorded) | AA | Audio description for prerecorded video |
| 4.1.2 Name, Role, Value | A | Name, role and state of UI components can be programmatically determined |

The key phrase is in 1.1.1: *equivalent purpose*. Alt text is not a caption competition. It has to do the job the image does on that page, which depends on context the model often does not have.

## Captions: AI is a first draft

Automatic speech recognition is genuinely useful for captioning. It turns a blank timeline into an editable draft, which is where most of the labour used to go.

The W3C is blunt about the limit, though: "Automatically-generated captions do not meet user needs or accessibility requirements, unless they are confirmed to be fully accurate." Its guidance notes that automatic caption text is often wrong, "sometimes in ways that change the meaning."

![Caption editing interface with a video frame showing the caption "That's the situation for everyone who can't hear." above a timeline of editable caption segments and the audio waveform](/assets/images/blog/ai-accessibility-caption-editing.png)

*A caption editor with timed segments over the audio waveform. Source: [W3C WAI, Making Audio and Video Media Accessible](https://www.w3.org/WAI/media/av/captions/)*

Errors cluster where they do the most damage: product names, technical terms, numbers, accents and people talking over each other. A caption that reads "fifteen" when the speaker said "fifty" is worse than no caption, because the reader trusts it.

A workflow that holds up:

1. Generate the ASR draft with a custom vocabulary of names and domain terms where your tool supports it.
2. Have a person review the full transcript against the audio. Spot checks are not enough for published media.
3. Add what ASR does not produce: speaker identification and meaningful non-speech sounds, since captions cover "speech and non-speech audio information needed to understand the content."
4. Check timing and line breaks so captions are readable at speed.
5. Publish the transcript alongside the video. It helps deafblind users, search and anyone who prefers reading.

For live captioning (1.2.4), real-time ASR is often the only practical option. Be honest about its accuracy, offer a corrected transcript afterwards, and use human captioners for events where errors would matter.

## Alt text: let AI describe, let people decide

Vision models are good at describing what is in a picture. They are poor at knowing *why the picture is on the page*. That gap is the whole problem with automated alt text.

The W3C's alt decision tree starts from purpose, not content:

![Four-step alt text flow based on the W3C decision tree: text in image, link or button, adds meaning, purely decorative](/assets/images/blog/diagrams/ai-accessibility-1.svg)

*Diagram: Big Matrix Solutions, based on the [W3C WAI alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/).*

Look at which answers need a description of the image. A linked logo should announce where the link goes, not "blue circular logo." A decorative flourish should have `alt=""` so screen readers skip it. A model asked to "describe this image" gets both wrong every time, because both need context the model was never given.

Where AI helps is step three: informative images that need a short description, and complex images such as charts. For complex images, the W3C asks for "a two-part text alternative": a short alt identifying the image, plus a longer description of the essential information elsewhere on the page. Models are good at drafting that longer description from a chart, provided someone checks every number.

Rules we apply on client projects:

- **Generate in context.** Give the model the surrounding text, the link target and the page's purpose, not just the image.
- **Mark AI output as a draft.** Store it in a separate field from approved alt text, and only publish approved text.
- **Default to decorative.** If the image adds nothing that the nearby text does not say, use `alt=""`.
- **Never trust numbers.** Chart values, prices and dates in a generated description get checked against the source data.
- **Skip the filler.** "Image of" and "picture of" add nothing; screen readers already announce the image.

## Screen readers: AI on the user's side

Some of the most useful AI accessibility work happens on the user's device, not in your CMS.

Be My Eyes launched Be My AI, built on OpenAI's GPT-4, to describe photos for blind and low-vision users and answer follow-up questions. The JAWS screen reader's Picture Smart AI feature describes images and screens using two AI services, and Freedom Scientific presents the second description as a way for users to spot hallucinations.

That is a sensible design: let the user compare two independent answers instead of trusting one. It is also a reminder of who carries the risk. When your page has no alt text, the user's tool has to guess, and the user has no way to check the guess against your intent.

User-side AI does not reduce your obligations. It covers for missing information; it cannot recover what the author meant.

## The overlay trap

Several vendors sell scripts that claim to make a site accessible automatically. In January 2025 the US Federal Trade Commission announced an order requiring accessiBe to pay $1 million over allegations that it misrepresented its AI-powered tool's ability to make websites WCAG-compliant. The final order, approved in April 2025, bars such claims unless the company has evidence to support them.

The lesson is not that automation is useless. It is that a script layered over a broken page cannot fix the page. Accessibility has to be built into the markup, components and content.

## A practical checklist

- Automated checker (axe, WAVE or similar) in CI, failing builds on new errors
- ASR caption drafts reviewed in full by a person before publishing
- Speaker names and meaningful sounds added to captions
- Transcripts published next to prerecorded media
- Alt text generated with page context, stored as a draft, approved by a person
- Decorative images given `alt=""`; linked images describe the destination
- Complex charts given a short alt plus a long description, with numbers verified
- Interactive components tested with at least one real screen reader
- No accessibility overlays sold as a compliance fix
- Disabled users included in usability testing at least once per major release

## Closing thought

AI makes accessibility work cheaper to start. It does not make it cheaper to finish. Use it to clear the volume: caption drafts, description drafts, issue detection at scale. Keep a person accountable for meaning, because the standard asks for an equivalent experience, not a plausible description. Teams that draft with AI and approve with people will cover far more content than they could before, and it will hold up when a screen reader user arrives.

**Sources**

- https://www.w3.org/TR/WCAG22/
- https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- https://www.w3.org/WAI/media/av/captions/
- https://www.w3.org/WAI/tutorials/images/decision-tree/
- https://www.w3.org/WAI/tutorials/images/complex/
- https://webaim.org/projects/million/
- https://accessible-eu-centre.ec.europa.eu/content-corner/news/new-era-inclusion-begins-eaa-enters-force-2025-06-27_en
- https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-order-requires-online-marketer-pay-1-million-deceptive-claims-its-ai-product-could-make-websites
- https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-approves-final-order-requiring-accessibe-pay-1-million
- https://www.bemyeyes.com/news/introducing-be-my-ai-formerly-virtual-volunteer-for-people-who-are-blind-or-have-low-vision-powered-by-openais-gpt-4/
- https://www.freedomscientific.com/training/jaws/picture-smart-ai/

**Media credits**:
- Hero image: still from the W3C WAI "Web Accessibility Perspectives: Video Captions" video, © W3C — [W3C WAI](https://www.w3.org/WAI/perspective-videos/captions/). W3C permissive licence.
- In-body image: caption editing example, © W3C — [W3C WAI, Making Audio and Video Media Accessible](https://www.w3.org/WAI/media/av/captions/). W3C permissive licence.
- Diagram: Big Matrix Solutions, based on the W3C WAI alt decision tree.
