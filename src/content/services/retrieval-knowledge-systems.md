---
id: "11"
slug: "retrieval-knowledge-systems"
title: "Retrieval & Knowledge Systems (RAG)"
icon: "bi bi-journals"
image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80&auto=format&fit=crop"
desc: "Question answering over your own documents, with hybrid search, reranking and citations — plus the evaluation set that proves it actually works."
---


# Retrieval & Knowledge Systems (RAG)

![Retrieval and knowledge systems](https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80&auto=format&fit=crop)

## RAG Is a Search Problem Wearing an AI Costume

The model is the easy part. Retrieval quality decides everything, and retrieval quality is mostly chunking and ranking — not which vector database you picked.

Most disappointing RAG systems were assembled in an afternoon and never evaluated. We build the other kind.


### 1. **Document Processing & Chunking**

The stage that quietly determines whether the system works:

- Structural splitting along real document boundaries, not byte offsets
- Every chunk carries its context — document title and section heading prepended
- Table, figure and code-block handling that does not shred them
- OCR and layout parsing for scanned material

---

### 2. **Hybrid Retrieval & Reranking**

Pure vector search has a blind spot: exact identifiers. Part numbers, error codes and drug names embed as "an error code" and fail to retrieve.

**Our default pipeline**:
- Dense vector search and BM25 keyword search in parallel
- Reciprocal rank fusion to merge the two rankings
- Cross-encoder reranking over a broad candidate set
- Metadata filtering on version, date and permissions *before* ranking

---

### 3. **Grounded Answers & Citations**

| Feature | Why it matters |
|-------------|----------------|
| Inline citations | Users can verify instead of trusting |
| Relevance thresholds | "Not in the corpus" is a valid answer |
| Access control at retrieval | Users only see what they may see |
| Conflict surfacing | Contradictory sources shown, not averaged |

---

### 4. **Evaluation, From the Start**

The step almost everyone skips, and the reason most RAG systems never improve:

- A question-and-expected-source set drawn from real user queries
- Retrieval and generation scored **separately** — different failures, different fixes
- Regression testing so a change that helps one query does not break five
- Failure analysis on the queries that miss, not just an average score

---

## Technology Stack

**Retrieval**: Hybrid dense and sparse, HNSW indexes, cross-encoder rerankers
**Storage**: Postgres with pgvector, or a dedicated vector store where scale needs one
**Models**: Embedding and generation models chosen per corpus and budget
**Deployment**: Fully self-hosted where documents cannot leave your infrastructure

## Where It Fits

- Internal knowledge bases and policy libraries
- Clinical guidelines and protocol lookup
- Contract, tender and regulatory document analysis
- Research corpora and technical documentation
- Support deflection over product documentation

## Why Choose Us?

We will tell you when you do not need RAG. Long context windows have made "put the document in the prompt" the right answer for a lot of use cases, and knowing which side of that line you are on saves a pipeline nobody has to maintain.
