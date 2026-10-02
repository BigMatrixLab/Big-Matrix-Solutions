---
id: "82"
slug: "voice-ai-agents-latency-turn-taking-speech-to-speech"
title: "Voice AI Agents: Latency, Turn-Taking and Speech-to-Speech Models"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/voice-agents.png"
category: "Agentic AI"
desc: "A voice agent lives or dies on the half-second after the caller stops talking. How chained and speech-to-speech architectures compare, and how to engineer turn-taking that feels natural."
date: "Jan 07, 2027"
tags: ["Voice AI", "Agents", "Realtime API", "Speech-to-Speech", "Latency"]
---

# Voice AI Agents: Latency, Turn-Taking and Speech-to-Speech Models

A text chatbot can take three seconds to answer and nobody minds. A voice agent that takes three seconds sounds broken. Callers repeat themselves, talk over the reply, or hang up.

That is the core difference between building for text and building for speech. In a voice interface, timing is part of the answer. The model can be excellent and the product can still fail because it pauses too long, cuts people off, or keeps talking after it has been interrupted.

This guide covers the decisions that matter most: which architecture to use, how to budget latency, and how to get turn-taking right.

## The bar is set by human conversation

The benchmark for "fast enough" was not invented by product teams. It comes from how people talk.

A 2009 study in *PNAS* by Stivers and colleagues measured response timing across ten languages, from major world languages to small indigenous communities. Every language showed "a general avoidance of overlapping talk and a minimization of silence between conversational turns." The most common gap between a question ending and the answer starting fell between 0 and 200 milliseconds.

People manage that by predicting when the other speaker will finish and planning their reply before the turn ends. A voice agent that waits for silence, then transcribes, then thinks, then synthesises speech starts well behind. You will not match human timing exactly. The aim is to get close enough that the gap reads as thinking rather than failure.

## Two architectures

![Diagram comparing a chained voice pipeline (audio in, speech-to-text, text model, text-to-speech, audio out) with a single speech-to-speech model](/assets/images/blog/diagrams/voice-agents-1.svg)

*Diagram: Big Matrix Solutions, based on [OpenAI voice agents guide](https://developers.openai.com/api/docs/guides/voice-agents).*

### Chained: speech-to-text, model, text-to-speech

The classic design runs three separate components. A speech recogniser transcribes the caller, a text model decides what to say and calls tools, and a speech synthesiser reads the answer aloud.

OpenAI's voice-agent guide describes the main advantage of this design: you can "inspect or transform text between speech recognition, your agent, and speech generation." That matters in regulated settings. You get a transcript for free, you can run policy checks on the text before it is spoken, and you can swap any stage for a better or cheaper one.

The cost is latency and lost information. Each stage adds its own delay, and the transcript throws away tone, hesitation and emphasis. "Fine." said flatly and "Fine!" said brightly become the same token.

### Speech-to-speech: one model, audio in and out

Speech-to-speech models take audio directly and produce audio directly, within one persistent session. OpenAI's Realtime API documentation describes it as a way to build voice agents where "the model works directly with audio, maintains conversation state, and can call tools," and lists barge-in, low first-audio latency and natural turn-taking as design goals. Google's Gemini Live API takes a similar approach, streaming audio (and optionally video) over a stateful WebSocket.

The trade-off runs the other way. Fewer hops and better handling of prosody, but less control over the intermediate stages, and your existing text-based agent logic may need adapting.

| | Chained pipeline | Speech-to-speech |
|---|---|---|
| Latency | Sum of three stages plus handoffs | One model, streaming both ways |
| Transcript and audit | Native, at every stage | Available, but not the model's working format |
| Tone and emphasis | Lost at transcription | Preserved in the audio input |
| Component choice | Swap any stage | Tied to one provider's model |
| Best fit | Compliance-heavy flows, existing text agents | Conversational products where feel matters most |

A hybrid is increasingly common: a speech-to-speech front end handles the conversation and hands heavier reasoning or tool work to a separate text-based backend. OpenAI's guide describes this pattern as well. The caller keeps talking to something responsive while the slow work happens elsewhere.

## Turn-taking is the hard part

![Timeline showing a user speaking then pausing, voice activity detection ending the turn after a configured silence, the agent streaming audio, and a note on barge-in](/assets/images/blog/diagrams/voice-agents-2.svg)

*Diagram: Big Matrix Solutions, based on [OpenAI VAD docs](https://developers.openai.com/api/docs/guides/realtime-vad), [Gemini Live docs](https://ai.google.dev/gemini-api/docs/live-guide) and [Stivers et al., 2009](https://pubmed.ncbi.nlm.nih.gov/19553212/).*

The agent has to decide, continuously, whether the caller has finished. Get it wrong one way and the agent interrupts people mid-sentence. Get it wrong the other way and every reply starts with dead air.

Both major realtime APIs use voice activity detection (VAD) and expose the settings:

- **OpenAI Realtime** supports `server_vad`, which "automatically chunks the audio based on periods of silence," with `threshold`, `prefix_padding_ms` and `silence_duration_ms` settings. It also offers `semantic_vad`, which "uses a semantic classifier to detect when the user has finished speaking," judging by the words spoken rather than silence alone. Its `eagerness` setting runs from low to high, with `auto` as the default.
- **Gemini Live** has automatic VAD with start- and end-of-speech sensitivity, `prefixPaddingMs` and `silenceDurationMs`. Google's guide calls 500 to 800 ms of silence a good balance between complete audio and reasonable latency.

The silence threshold is the single most important latency setting you control, because nothing else starts until the turn ends. Tune it per use case:

- **Short, transactional answers** (yes, no, a date): a shorter silence window feels snappy.
- **People reading out numbers, addresses or thinking aloud**: a longer window, or semantic detection, avoids cutting them off between digits.
- **Noisy environments**: raise the VAD threshold so background noise does not count as speech.

### Barge-in

Interruptions are normal in conversation, so the agent must stop talking the moment the caller does. Gemini's documentation is clear about the server side: when VAD detects an interruption, "the ongoing generation is canceled and discarded," and the client is told so it can stop playback.

The client side is where most bugs live. Audio already buffered on the device keeps playing unless you flush it. Echo from the agent's own voice through the speaker can trigger false interruptions unless echo cancellation is on. And your conversation state must record what was actually *heard*, not what was generated, or the agent will later refer to sentences the caller never heard.

## Budgeting latency

Measure the gap that callers actually experience: from the moment they stop speaking to the moment they hear the first syllable back. OpenAI's guide frames the metric as "how long callers wait for a useful spoken answer." Then break it down:

1. **End-of-turn detection**: the silence window, plus detection overhead.
2. **Network**: the round trip from the caller to your servers and the provider. Browser clients should use WebRTC; OpenAI's docs pair "WebRTC in the browser or WebSocket on the server".
3. **Time to first audio**: the model's response start, which grows with prompt length and with any tool calls made before speaking.
4. **Playback start**: client buffering before the first audio frame plays.

Practical ways to shrink each:

- Keep the system prompt short and stable so prompt caching can work.
- Speak first, then fetch. A short acknowledgement while a slow tool call runs ("Let me check that order") is better than silence.
- Run tools in parallel when the model requests several.
- Put your servers close to both your callers and the provider's region.
- Stream everything. Never wait for a full response before starting playback.

## Production details that bite

- **Session limits.** Gemini Live documents audio-only sessions limited to 15 minutes and audio-plus-video sessions to 2 minutes, with session-management features for longer calls. Design for reconnection from the start.
- **Credentials in the browser.** Do not ship a long-lived API key to a client. Google recommends "ephemeral tokens instead of standard API keys" for client-to-server connections; mint short-lived credentials on your backend.
- **Audio formats.** Gemini Live expects 16-bit PCM at 16 kHz input and returns 24 kHz output. Telephony audio needs resampling, and mismatches show up as chipmunk voices or garbled recognition.
- **Disclosure and consent.** Tell callers they are speaking with an automated system and follow local rules on call recording.

## A practical checklist

- Architecture chosen against real requirements: audit and control (chained) or feel (speech-to-speech)
- End-to-end latency measured from end of user speech to first audio heard
- VAD mode and silence window tuned per flow, tested with real callers and noise
- Barge-in flushes client audio buffers immediately
- Echo cancellation enabled; false interruptions tracked
- Conversation state truncated to what was actually played
- Spoken filler for any tool call that may be slow
- Ephemeral credentials for browser clients
- Reconnection and session-resumption handling
- Transcripts stored and reviewed, including for speech-to-speech sessions

## Closing thought

Voice agents get judged in moments. A slight delay, an interruption, an agent that keeps talking over someone: each one is small, and together they decide whether people trust the system. The model matters, but the engineering around it matters more: turn detection tuned for the real use case, streaming at every step, and a client that stops talking the instant it should. Start with the latency budget and the turn-taking settings, and choose the architecture that lets you control them.

**Sources**

- https://pubmed.ncbi.nlm.nih.gov/19553212/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC2705608/
- https://developers.openai.com/api/docs/guides/realtime
- https://developers.openai.com/api/docs/guides/voice-agents
- https://developers.openai.com/api/docs/guides/realtime-vad
- https://ai.google.dev/gemini-api/docs/live
- https://ai.google.dev/gemini-api/docs/live-guide

**Media credits**:
- Hero image: Live API overview diagram (app connected to the Live API over WebSocket), Google AI for Developers (shown on a 16:9 background) — [ai.google.dev](https://ai.google.dev/gemini-api/docs/live). Google developer documentation content is licensed under CC BY 4.0.
- Diagrams: Big Matrix Solutions, based on the OpenAI and Google documentation and the Stivers et al. (2009) study listed above.
