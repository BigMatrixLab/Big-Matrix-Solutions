---
id: "22"
slug: "how-rag-works-retrieval-augmented-generation"
title: "How RAG Works: Retrieval-Augmented Generation, and When to Skip It Entirely"
comments: "0"
image: "/assets/images/blog/rag-architecture.webp"
category: "Tutorial"
desc: "Chunking, embeddings, vector search, reranking and the failure modes nobody mentions. Plus an honest look at whether long context has made RAG optional."
date: "Nov 28, 2026"
tags: ["RAG", "Embeddings", "Vector Search", "Tutorial"]
---

# How RAG Works: Retrieval-Augmented Generation, and When to Skip It Entirely

Retrieval-augmented generation is the most widely deployed pattern in applied AI and the most consistently badly implemented. Both facts have the same cause: the basic version is easy to build in an afternoon, and the gap between "works on my ten test documents" and "works on a hundred thousand real ones" is enormous.

This walkthrough covers the mechanics, the failure modes that show up at scale, and the question that has become genuinely live: whether you need RAG at all now that context windows reach into the millions.

## The problem

A language model knows what was in its training data, up to a cutoff. It does not know your company's internal documentation, last week's support tickets, or the contract you signed yesterday.

Three ways to fix that.

**Fine-tuning** bakes knowledge into the weights. Expensive, slow, hard to update, and, importantly, better at teaching *style and format* than at reliably installing facts. Fine-tuning for knowledge is a common and usually mistaken instinct.

**Long context** puts the documents in the prompt. Simple and increasingly viable, with real limits we will get to.

**Retrieval** finds the relevant documents at query time and puts *those* in the prompt. This is RAG.

RAG's advantages are practical rather than theoretical: knowledge updates the moment you update a document, you can cite sources because you know what you retrieved, and access control is enforceable at the retrieval layer rather than hoped for at the model layer.

## The pipeline

Five stages. Each has a way of going wrong.

### 1. Chunking

Documents are too long to embed whole, so they are split into pieces.

This is the stage that most quietly determines whether your system works, and it is the one people spend the least time on. The naive approach, splitting every 500 characters, cuts sentences in half, separates a table from its header, and divorces a code block from the paragraph explaining it.

Better approaches, roughly in order of effort:

- **Recursive character splitting**: split on paragraph breaks first, then sentences, then words, only breaking mid-sentence when forced. The sensible default and what most libraries do.
- **Structural splitting**: use the document's own structure. Markdown headings, HTML sections, PDF headers. A chunk that corresponds to a real section is far more retrievable than one that corresponds to a byte offset.
- **Semantic splitting**: embed sentences and cut where consecutive embeddings diverge, so chunks follow topic boundaries. More expensive, sometimes noticeably better.
- **Overlap**: a common trick, typically 10 to 20 percent, so a fact near a boundary appears in both chunks. Cheap insurance against bad cuts.

Two heuristics worth internalising. **Chunk size should match your query granularity.** If users ask narrow factual questions, small chunks retrieve precisely; if they ask questions requiring synthesis across a section, small chunks fragment the answer. And **every chunk should carry its context**: prepend the document title and section heading to the chunk text before embedding. A chunk reading "The limit is 500 requests per minute" is nearly unretrievable on its own and perfectly retrievable as "API Reference > Rate Limits: The limit is 500 requests per minute."

### 2. Embedding

Each chunk becomes a vector, typically 768 to 3,072 dimensions, from a model trained so that semantically similar text lands nearby in the space.

```python
chunks = ["The rate limit is 500 requests per minute.", ...]
vectors = embedding_model.encode(chunks)   # (n_chunks, 1536)
```

The crucial property is that this is *semantic*, not lexical. "How many API calls can I make?" embeds close to a chunk about rate limits despite sharing almost no words. That is the entire advantage over keyword search, and, as we will see, also its weakness.

Two things people get wrong here:

**Use the same model for queries and documents.** Vectors from different embedding models are not comparable. This sounds obvious and is a recurring production bug, usually introduced when someone upgrades the embedding model and does not re-embed the corpus.

**Check whether your model wants asymmetric prefixes.** Many embedding models are trained with distinct instructions for queries versus documents ("query: ..." / "passage: ..."). Omitting them costs real retrieval quality, silently.

### 3. Storage and search

Vectors go into an index that supports fast nearest-neighbour search. Exact search is O(n) per query, so at any real scale you use approximate nearest neighbour. HNSW is the most common, building a navigable graph that finds close-enough neighbours in logarithmic time.

Everything here is a tunable accuracy-versus-speed trade-off, and the defaults are usually fine. The choice of vector database matters far less than most vendor comparisons suggest; chunking and reranking matter far more.

### 4. Retrieval

Embed the query, find the k nearest chunks, return them.

The mistake at this stage is trusting pure vector search. Embeddings are excellent at semantic similarity and notably weak at exact matching. A query for error code `E4021` or a specific part number may not retrieve the chunk containing it, because the embedding captures "an error code" without preserving the precise string.

The fix is **hybrid search**: run vector search and keyword search (BM25) in parallel, then fuse the results.

```python
dense  = vector_index.search(query_vec, k=20)
sparse = bm25_index.search(query_text, k=20)
merged = reciprocal_rank_fusion(dense, sparse)
```

Reciprocal rank fusion combines rankings without needing the two scores to be on a comparable scale. Hybrid search is one of the highest-return improvements available in a RAG pipeline, and it is skipped constantly because vector search alone demos fine.

### 5. Reranking

Retrieve generously, then rerank precisely.

Retrieval optimises for recall at low cost: get the right chunk into a candidate set of 50. A reranker then scores each candidate against the query properly, using a cross-encoder that reads query and chunk *together* rather than comparing independent embeddings. That joint reading is much more accurate, and much too slow to run over the whole corpus.

```python
candidates = hybrid_search(query, k=50)
scored = reranker.score(query, candidates)     # cross-encoder
top = sorted(scored, reverse=True)[:5]
```

Retrieve 50, rerank, keep 5. This two-stage pattern is standard in mature systems and typically the single biggest quality improvement after hybrid search.

## The failure modes

What actually goes wrong in production, in rough order of frequency.

**Retrieval finds nothing relevant, and the model answers anyway.** The most common and most damaging failure. If your retrieval returns three irrelevant chunks, a model will often synthesise a confident answer from them. The mitigation is a relevance threshold and an explicit instruction that "the context does not contain this" is an acceptable answer, plus checking that it actually does so.

**The answer needs several chunks that do not co-retrieve.** "Compare our refund policy to our exchange policy" needs two chunks that are not similar to each other, and top-k retrieval on a single query embedding tends to return five near-duplicates of one of them. Query decomposition, splitting a multi-part question into sub-queries and retrieving for each, is the usual fix.

**Duplicate chunks crowd out diversity.** If your corpus contains the same boilerplate in forty documents, top-5 can be five copies of the same paragraph. Deduplicate, or use a diversity-aware selection method like MMR.

**Chunk boundaries split the answer.** Half the answer in chunk 12, half in chunk 13, and only chunk 12 retrieves. Overlap helps; retrieving neighbouring chunks alongside each hit helps more.

**Metadata filtering is missing.** Users ask about the current version and get an answer from 2022 documentation. Retrieval should filter on document date, product version, and permissions *before* similarity ranking, not after. This is also where access control lives, and getting it wrong is a data leak, not a quality issue.

**Nobody is measuring anything.** By far the most consequential. Most RAG systems have no evaluation at all, so nobody knows whether a change helped. At minimum, build a set of question-and-expected-source pairs and track two numbers separately: did retrieval surface the right chunk, and did generation use it correctly. Those are different failures with different fixes, and an end-to-end score cannot distinguish them.

## The long-context question

Now the genuinely open debate.

Context windows now reach millions of tokens, with headline figures of ten million. If your entire corpus fits in the prompt, why retrieve?

It depends, and the deciding factor is usually not capability.

**Long context wins when** the corpus is small enough to fit comfortably, questions require synthesis across the whole body of text, and per-query cost is acceptable. Feeding a 200-page contract to a model and asking about its overall risk profile genuinely beats retrieving five chunks, because the question is about the whole document.

**Retrieval wins when** the corpus is large, latency matters, query volume is high, or you need citations and access control. A million-document knowledge base is not going in a prompt at any window size, and you cannot enforce per-user document permissions if everything is in the context.

**The important caveat** is that advertised capacity and *effective* capacity are different things. Building a model that accepts ten million tokens is a solved problem; building one that reliably finds one fact in the middle of ten million tokens without degrading is not. Accuracy on mid-context material is measurably worse than at either end, large volumes of loosely-relevant text can distract more than no context at all, and prefill latency grows with prompt length until it dominates the request.

So the framing that has held up: **long context did not replace retrieval, it made retrieval easier.**

The 2024 pipeline had to be surgical: retrieve exactly the right three chunks, because three was all that fit. Precision was load-bearing, which is why so much engineering went into reranking and query rewriting.

Now you can retrieve fifty chunks and let the model sort out relevance. Retrieval only needs decent recall; the model handles precision. That is a large reduction in engineering complexity, and it is the design most mature systems have moved to:

| Era | Pattern | Precision burden |
|---|---|---|
| 2023–24 | Retrieve 3–5 into a short context | On the retriever |
| 2026 | Retrieve 30–50 into a long context | On the model |

## Practical build order

If you are starting a RAG system, do these in order. Each step gives more improvement than the one after it.

**First, get chunking right and add context to chunks.** Structural splitting, with the document title and section heading prepended to every chunk before embedding. Costs an afternoon, improves everything downstream.

**Second, add hybrid search.** Vector plus BM25 with rank fusion. Fixes the exact-match blind spot that pure vector search has and that your demo queries will never expose.

**Third, add a reranker.** Retrieve broadly, rerank, keep the best. Reliably the largest single quality jump after the first two.

**Fourth, build an evaluation set.** Fifty real questions with known correct sources. Measure retrieval and generation separately. Do this before you start tuning, or you are guessing.

**Fifth, then tune.** Chunk size, k, thresholds, prompt wording. This is the part everyone starts with and it is the least valuable until the four steps above are done.

## What to remember

RAG is a search problem wearing an AI costume. The model is the easy part; retrieval quality determines almost everything, and retrieval quality is mostly determined by chunking and ranking rather than by which vector database you chose.

The systems that work well are unglamorous. They chunk along real document structure, they combine semantic and lexical search, they rerank, they filter on metadata, and somebody measures whether changes helped.

The systems that do not work are usually the ones where an embedding model, a vector store, and a prompt were assembled in an afternoon and then never evaluated. That version demos beautifully. It is the reason RAG has a reputation for being disappointing, and the reason the reputation is undeserved.

Hero diagram: [RAG diagram](https://commons.wikimedia.org/wiki/File:RAG_diagram.svg) by Turtlecrown, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons. Rasterised and padded to fit; not otherwise altered.
