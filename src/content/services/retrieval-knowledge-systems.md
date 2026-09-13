---
id: "11"
slug: "retrieval-knowledge-systems"
title: "Retrieval & Knowledge Systems (RAG)"
icon: "bi bi-journals"
image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80&auto=format&fit=crop"
desc: "Question answering over your own documents, with hybrid search, reranking and citations, plus the evaluation set that proves it actually works."
---


# Retrieval & Knowledge Systems (RAG)

![Retrieval and knowledge systems](https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80&auto=format&fit=crop)

## RAG Is a Search Problem Wearing an AI Costume

The model is the easy part. Retrieval quality decides everything, and retrieval quality is mostly chunking and ranking, not which vector database you picked.

Most disappointing RAG systems were assembled in an afternoon and never evaluated. We build the other kind.


### 1. **Document Processing & Chunking**

The stage that quietly determines whether the system works:

- Structural splitting along real document boundaries, not byte offsets
- Every chunk carries its context: document title and section heading prepended
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
- Retrieval and generation scored **separately**: different failures, different fixes
- Regression testing so a change that helps one query does not break five
- Failure analysis on the queries that miss, not just an average score

Splitting the two scores is what makes the system improvable. If the right chunk never surfaced, no amount of prompt work will save the answer. If it surfaced and the answer still went wrong, the retriever is not the problem. Teams measuring one number cannot tell those apart, so they tune whichever half they happen to be looking at.

---

### 5. **Ingestion & Freshness**

A corpus is not a one-time load. It is a pipeline that has to keep up with the source.

- Incremental sync rather than full reindexing, so updates are minutes and not overnight
- Change detection at document level, with re-chunking only where content actually moved
- Deletion and supersession handling, because a withdrawn policy that still answers questions is worse than no system at all
- Version awareness, so "the current procedure" and "the procedure in force last March" are both answerable
- Backfill tooling for the inevitable day the chunking strategy changes

Stale retrieval fails silently and confidently, which makes it the most expensive bug in this stack.

---

### 6. **Permissions & Multi-Tenant Corpora**

Retrieval that ignores access control is a data breach with a chat interface.

- Permissions resolved at query time against your own identity provider, not copied into the index and left to drift
- Filtering applied **before** ranking, so restricted documents never influence the result set
- Per-tenant or per-department corpus separation where the content demands it
- Citation links that respect the same rules, so a user cannot open what they could not retrieve
- Query and access logging, which is usually a compliance requirement in its own right

A common shortcut is to filter after generation. By then the restricted content has already shaped the answer.

---

### 7. **Structured & Hybrid Sources**

Most real questions are not answered by prose alone.

- Tables and spreadsheets queried as data rather than flattened into sentences
- SQL and API lookups for anything that changes faster than a document does
- Knowledge-graph relationships where the question is about how entities connect
- Routing between these and text retrieval, so a numeric question hits a numeric source

"What is our current stock level" is not a retrieval question, and answering it from a PDF written in April is how these systems lose trust.

---

## Technology Stack

**Retrieval**: Hybrid dense and sparse, HNSW indexes, cross-encoder rerankers
**Storage**: Postgres with pgvector, or a dedicated vector store where scale needs one
**Models**: Embedding and generation models chosen per corpus and budget
**Deployment**: Fully self-hosted where documents cannot leave your infrastructure

## Possible projects

- Internal knowledge bases and policy libraries
- Clinical guidelines and protocol lookup
- Contract, tender and regulatory document analysis
- Research corpora and technical documentation
- Support deflection over product documentation

## How we work

**Corpus review before architecture.** We read a sample of the actual documents. Scanned versus native, consistent structure versus fifteen years of drift, tables that matter versus decoration. This decides the chunking strategy, and chunking decides more than model choice does.

**An evaluation set before a pipeline.** Fifty to a hundred real questions with the sources that should answer them, written with someone who knows the domain. Without this there is no way to tell whether a change helped, and every later decision becomes a matter of opinion.

**A baseline, then improvements one at a time.** Plain retrieval first, measured. Then hybrid search, then reranking, then query rewriting, each kept only if the numbers move. Stacking every technique at once produces a system nobody can debug.

**Failure analysis over averages.** We look at the queries that miss and group them by cause. Missing content, bad chunking, ranking failure and generation failure need four different fixes, and an aggregate score hides which one you have.

## Where these systems go wrong

- **The corpus is the problem.** Contradictory documents, no clear owner, three versions of the same policy. Retrieval faithfully returns the mess. This is a content governance problem and no pipeline solves it.
- **Nobody defined "correct".** Without agreement on what a good answer looks like, the system cannot be evaluated and will be judged on vibes.
- **The questions are aggregations.** "How many", "what is the trend", "compare these" are database questions. Retrieval over documents answers them badly.
- **Freshness was never scoped.** The demo indexed a folder once. Production needs a sync pipeline, and that is the part that carries ongoing cost.

## One thing we will tell you first

We will tell you when you do not need RAG. Long context windows have made "put the document in the prompt" the right answer for a lot of use cases, and knowing which side of that line you are on saves a pipeline nobody has to maintain.
