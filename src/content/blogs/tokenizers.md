---
id: "69"
slug: "how-tokenizers-work-bpe-vocabularies"
title: "How Tokenizers Work: BPE, Vocabularies and Why Models Can't Count Letters"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/tokenizers.webp"
category: "Tutorial"
desc: "Byte pair encoding, vocabulary size, byte-level fallback and the strange failures that come from a model never seeing letters. Explained with real token splits."
date: "Dec 12, 2026"
tags: ["Tokenization", "BPE", "LLMs", "Tutorial"]
---

# How Tokenizers Work: BPE, Vocabularies and Why Models Can't Count Letters

Ask a language model how many times the letter r appears in "strawberry" and, for a long stretch of recent history, you got a confident wrong answer. That failure is not about intelligence. It happens before the model runs at all, in a component most people never look at: the tokenizer.

A language model does not read text. It reads a sequence of integers, and the tokenizer decides how a string becomes that sequence. Get a feel for how that decision is made and a whole category of odd model behaviour stops being mysterious: bad spelling, shaky arithmetic, inflated costs in some languages, and prompts that behave differently depending on a single space.

## The problem tokenizers solve

A model needs a fixed vocabulary, because its first layer is a lookup table with one row per vocabulary entry and its last layer scores every entry. So the question is what the entries should be.

**Whole words** fail on anything new. Names, typos, code identifiers and compound words all fall outside the list, and the model sees an "unknown" placeholder.

**Single characters** never fail, but sequences get very long. Every attention layer pays for sequence length, and the model has to spend capacity rebuilding words from letters.

**Subwords** sit in between. Common words become one token; rare words split into a few reusable pieces. Sennrich, Haddow and Birch made this the standard approach for neural translation in 2015, and essentially every large language model since uses a descendant of their method.

## Byte pair encoding, step by step

Byte pair encoding (BPE) started as a 1994 compression trick by Philip Gage: find the most frequent pair of bytes, replace it with a new symbol, repeat. Sennrich and colleagues adapted it to words. The training loop is short enough to fit in the paper, and it goes like this:

1. Split every word in the training corpus into characters, plus an end-of-word marker.
2. Count every adjacent pair of symbols, weighted by word frequency.
3. Merge the most frequent pair into a new symbol and add it to the vocabulary.
4. Repeat until you have done the number of merges you asked for.

![The first five BPE merges on the toy dictionary low, lower, newest, widest](/assets/images/blog/diagrams/tokenizers-1.svg)

*Diagram: Big Matrix Solutions, based on [Sennrich et al., 2016](https://arxiv.org/abs/1508.07909). Merges computed by running the paper's Algorithm 1.*

On the paper's toy dictionary, the first merge is `e + s`, because "newest" and "widest" together contribute nine occurrences. Then `es + t`, then `est + </w>`, and suffixes emerge as units without anyone defining them. The paper puts it simply: the final vocabulary is the starting characters plus the number of merges, and that merge count is the only hyperparameter.

Encoding new text replays the learned merges in order. A word never seen in training still splits into known pieces, which is the whole point.

```python
# training: learn an ordered list of merges
merges = []
for _ in range(num_merges):
    pair = most_frequent_adjacent_pair(corpus)
    corpus = merge(corpus, pair)
    merges.append(pair)

# encoding: apply the same merges, in the same order
def encode(word):
    symbols = list(word)
    for pair in merges:
        symbols = merge_symbols(symbols, pair)
    return [vocab[s] for s in symbols]
```

## Bytes, not characters

Character-level BPE has a gap: a character missing from training data, such as a rare emoji or script, still has no entry. GPT-2 closed it by running BPE over raw UTF-8 bytes. The paper notes a byte-level version of BPE "only requires a base vocabulary of size 256", so every possible string can be encoded, and merges build up from there. GPT-2's final vocabulary has 50,257 entries.

Not every tokenizer uses BPE. Google's SentencePiece (Kudo and Richardson, 2018) trains directly on raw text, treating spaces as ordinary symbols, so it does not need a language-specific pre-splitter. It supports BPE and also a unigram language-model method (Kudo, 2018) that starts with a large candidate vocabulary and prunes it. Llama 2 used SentencePiece's BPE implementation with a 32k vocabulary, splitting numbers into individual digits and falling back to bytes for unknown characters.

## Vocabulary size is a trade-off

Bigger vocabularies mean fewer tokens per sentence, which means cheaper inference and more text per context window. They also mean larger embedding and output layers, and many rare tokens that the model sees too infrequently to learn well.

The trend has been upwards. Measured with `tiktoken`:

| Encoding | Used by (per tiktoken) | Vocabulary |
|---|---|---|
| `gpt2` | GPT-2 | 50,257 |
| `cl100k_base` | GPT-4, GPT-3.5 Turbo | 100,277 |
| `o200k_base` | GPT-4o | 200,019 |

Meta's Llama 3 report describes the same move: a 128K vocabulary, built from 100K tokens from `tiktoken` plus 28K extra tokens for non-English languages. On English text it improved compression from 3.17 to 3.94 characters per token over the Llama 2 tokenizer.

## Why models can't count letters

Here is what the model actually receives for a few inputs, measured with `tiktoken`:

![Measured token splits for strawberry, a number, and a Hindi sentence](/assets/images/blog/diagrams/tokenizers-2.svg)

*Diagram: Big Matrix Solutions, based on measurements with [OpenAI tiktoken](https://github.com/openai/tiktoken).*

With `o200k_base`, "strawberry" at the start of a string is three tokens: `st`, `raw`, `berry`. With a leading space, as it usually appears mid-sentence, it is one token. Either way, the model receives integer ids. The letters inside `berry` are not visible to it; it can only know that this id tends to be spelled b-e-r-r-y if training data happened to teach it that association.

That explains a family of failures:

- **Counting and spelling.** Letter-level questions ask about information the input does not directly contain.
- **Arithmetic.** `cl100k_base` and `o200k_base` split "12345678" into `123`, `456`, `78`. Column alignment for addition is not visible in those chunks. Llama 2's choice to split every digit separately was a deliberate fix for this.
- **Whitespace sensitivity.** "strawberry" and " strawberry" are different ids. A trailing space at the end of a prompt can push the model into an unusual token boundary and change its output.
- **Reversing or rhyming words.** Same root cause: the operation works on characters, the model works on chunks.

Models can work around this, for example by spelling a word out one token at a time before counting. The underlying representation is the same.

## The multilingual tax

Tokenizers are trained on a corpus, and the corpus is usually English-heavy. Merges get spent on frequent English pieces, and other scripts fall back to many small byte-level tokens.

The same Hindi sentence ("how are you today?") measured 23 tokens with `gpt2`, 17 with `cl100k_base`, and 5 with `o200k_base`. Petrov and colleagues (2023) found the same sentence translated into different languages can differ in tokenized length by up to 15 times. Since APIs bill per token, enforce context limits in tokens, and generate one token at a time, that gap shows up as higher cost, less usable context and slower responses for the same content.

## What this means for you

**Count tokens with the model's own tokenizer.** Word-count heuristics are wrong for code, numbers, and most non-English text. Use the provider's token-counting endpoint or library before estimating costs or context budgets.

**Do not assume one tokenizer fits all models.** Token counts, and therefore prices and limits, differ between model families for identical text.

**Give character-level tasks a character-level form.** If correctness depends on letters or digits, ask the model to spell items out, or do the operation in code. Validation of IDs, checksums and exact string matching belongs in software, not in generation.

**Watch your prompt boundaries.** Trailing whitespace and unusual separators create rare token sequences. Keep templates clean and consistent.

**Budget for language.** If you serve users in several languages, measure tokens per message per language on real traffic. A flat per-message cost estimate based on English will be wrong.

## What to remember

The tokenizer is a compression scheme trained once and then frozen into the model. Everything the model knows about text, it knows through those chunks.

BPE is simple: count pairs, merge the most frequent, repeat. Byte-level fallback guarantees any string can be encoded. Vocabulary size trades sequence length against model size, and it has been growing.

When a model fails at something a child can do with letters, check the tokens before blaming the reasoning. Usually the answer is in what the model was actually shown.

**Sources**

- [Sennrich, Haddow and Birch, "Neural Machine Translation of Rare Words with Subword Units" (arXiv:1508.07909)](https://arxiv.org/abs/1508.07909)
- [Kudo and Richardson, "SentencePiece" (arXiv:1808.06226)](https://arxiv.org/abs/1808.06226)
- [Kudo, "Subword Regularization" (unigram language model) (arXiv:1804.10959)](https://arxiv.org/abs/1804.10959)
- [Radford et al., "Language Models are Unsupervised Multitask Learners" (GPT-2)](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
- [Touvron et al., "Llama 2: Open Foundation and Fine-Tuned Chat Models" (arXiv:2307.09288)](https://arxiv.org/abs/2307.09288)
- [Llama Team, "The Llama 3 Herd of Models" (arXiv:2407.21783)](https://arxiv.org/abs/2407.21783)
- [Petrov et al., "Language Model Tokenizers Introduce Unfairness Between Languages" (arXiv:2305.15425)](https://arxiv.org/abs/2305.15425)
- [OpenAI tiktoken (GitHub)](https://github.com/openai/tiktoken)
- [Hugging Face LLM Course, Chapter 6: Normalization and pre-tokenization](https://huggingface.co/learn/llm-course/chapter6/4)

**Media credits**:
- Hero image: tokenization pipeline diagram (normalization, pre-tokenization, model, post-processing) from the [Hugging Face LLM Course, Chapter 6](https://huggingface.co/learn/llm-course/chapter6/4), course repository licensed Apache 2.0. Rasterised and padded to 16:9; not otherwise altered.
- In-body diagrams: BPE merge steps and measured token splits, Big Matrix Solutions, based on [Sennrich et al.](https://arxiv.org/abs/1508.07909) and measurements with [tiktoken](https://github.com/openai/tiktoken).
