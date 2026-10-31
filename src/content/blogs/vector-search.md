---
id: "104"
slug: "how-vector-search-works-hnsw-recall"
title: "How Vector Search Works: Embeddings, HNSW and the Recall Trade-off"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/vector-search.png"
category: "Tutorial"
desc: "Why exact nearest-neighbour search does not scale, how HNSW graphs and compressed IVF indexes find close-enough answers fast, and how to tune the recall you are quietly giving up."
date: "Feb 20, 2027"
tags: ["Vector Search", "HNSW", "Embeddings", "Faiss", "Tutorial"]
---

# How Vector Search Works: Embeddings, HNSW and the Recall Trade-off

Every vector database makes you the same quiet offer: answers in milliseconds instead of seconds, in exchange for sometimes missing the true best match. Most teams accept it without noticing they did, because the defaults are reasonable and the misses are invisible unless you go looking.

This post is about that offer: what the index actually does, where the misses come from, and which knobs move you along the curve. (Our RAG walkthrough covers chunking and embedding text; here we start from the vectors.)

## The problem: nearest neighbours, quickly

An embedding model turns each item into a vector, a list of a few hundred to a few thousand numbers, arranged so that similar items land close together. Search becomes geometry: given a query vector, find the `k` stored vectors closest to it.

"Closest" needs a metric. The common three are cosine similarity, inner product and Euclidean (L2) distance. If vectors are normalised to length 1, all three produce the same ranking, which is why some embedding models ship normalised output. Use whatever metric the embedding model was trained for.

The exact answer is easy to compute: compare the query with every stored vector and keep the best `k`.

```python
import numpy as np

def exact_search(query, vectors, k=10):
    scores = vectors @ query            # inner product with every vector
    return np.argsort(-scores)[:k]      # O(n · d) per query
```

That is called brute-force or flat search, and it is not a strawman. At tens of thousands of vectors, on a GPU or with good SIMD code, it is fast enough and it is always right. The Faiss library includes it as a first-class index for exactly that reason.

The problem is that the cost grows linearly with the collection. One million 768-dimensional float32 vectors is about 3 GB, and every query reads all of it.

## Approximate search: give up a little accuracy

Approximate nearest neighbour (ANN) methods avoid looking at most of the data. They do it in two broad ways, and Faiss's own paper describes these as its two non-exhaustive approaches.

**Partition the space (IVF).** Cluster the vectors into, say, a few thousand groups at build time. At query time, find the closest few cluster centres and only scan the vectors in those clusters. The knob is how many clusters you probe: more probes, better accuracy, slower search.

**Build a graph (HNSW and relatives).** Connect each vector to a set of nearby vectors. At query time, start somewhere and keep walking to whichever neighbour is closer to the query until you cannot improve.

Both are often combined with **compression**. Product quantization (Jégou, Douze and Schmid) splits each vector into sub-vectors and replaces each sub-vector with the id of its closest entry in a small learned codebook. In Faiss, a product-quantized code takes `M × nbits / 8` bytes. With 64 sub-quantizers of 8 bits each, a 3 KB float32 vector becomes 64 bytes, at the cost of approximate distances.

## How HNSW works

Hierarchical Navigable Small World graphs (Malkov and Yashunin, 2016) are the most widely used graph index. The Faiss paper calls HNSW "currently the most popular indexing method" for medium-sized datasets.

The structure is a stack of graphs. Every vector lives in the bottom layer. Each vector is also randomly assigned a maximum layer, with exponentially decreasing probability, so each layer up contains far fewer vectors. Upper layers are sparse with long links; the bottom layer is dense with short ones.

![HNSW search: start at the top layer, find the closest node, descend, and search the dense bottom layer for the k nearest](/assets/images/blog/vector-search-hnsw-search.png)

*HNSW search descends from sparse upper layers to the dense bottom layer. Source: [Weaviate documentation](https://docs.weaviate.io/weaviate/concepts/vector-index)*

Search starts at an entry point in the top layer and walks greedily towards the query. When no neighbour is closer, it drops down a layer and continues from the same node. At the bottom it runs a wider search, keeping a list of the best candidates found so far. The paper compares the structure to a skip list, and reports logarithmic complexity scaling.

The hnswlib library exposes three parameters, and their documentation is unusually clear about what each does:

| Parameter | What it controls | Trade-off |
|---|---|---|
| `M` | Links created per new element | More memory and build time, better recall; "reasonable range for M is 2-100" |
| `ef_construction` | Candidate list size while building | Slower build, better graph quality |
| `ef` (efSearch) | Candidate list size while searching | "Higher ef leads to more accurate but slower search" |

Memory for the links is roughly `M × 8–10` bytes per element, on top of the vectors themselves. HNSW needs the raw vectors in memory to compute distances, which is its main cost.

## Recall: what you are trading away

The standard accuracy measure is recall@k: of the true `k` nearest neighbours (found by brute force), what fraction did the index return?

![Recall at 10 illustrated: the approximate index returns 9 of the true top 10](/assets/images/blog/diagrams/vector-search-1.svg)

*Diagram: Big Matrix Solutions. Illustrative example of recall@10.*

An index that returns 9 of the true top 10 has recall@10 of 0.9. The miss is usually not catastrophic: the replacement is typically a near neighbour too. But for some queries a highly relevant result will simply not appear, and nothing in the response tells you so.

The Faiss paper frames the full trade-off as accuracy versus search time versus memory, plus build time. ANN-Benchmarks, the standard comparison suite, plots recall against queries per second for each algorithm and parameter setting. Its authors observed that very different approaches yield comparable quality-performance trade-offs. In other words, how you tune often matters as much as which algorithm you chose.

## Choosing an index

The Faiss paper gives unusually direct guidance:

- Graph-based indexes are a good option when memory is not constrained, "typically for indexes below 1M vectors".
- Beyond about 10M vectors, graph construction time typically becomes the limiting factor.
- When vectors must be compressed to fit in memory at all, IVF indexes are the only option.

It also notes that indexes which fit the data distribution, including IVF and PQ, become less efficient if the distribution shifts significantly through additions, removals or updates. If your content changes character over time, rebuild periodically.

## The filtering trap

Real queries usually have conditions attached: only this customer's documents, only items in stock, only this year. The Faiss paper describes the two ways to combine a filter with vector search.

**Vector-first:** run the ANN search, then drop results that fail the filter. Fast, but if the filter is restrictive, most of your `k` results are discarded and you may return too few.

**Metadata-first:** select the matching items first, then search only among them. If the subset is small, brute force over it is fast and exact.

The right choice depends on how selective the filter is, and the paper describes estimating subset size to decide. Most vector databases make this decision for you, with varying success. Restrictive filters are where silent recall loss is most common, so test them specifically.

## What this means for you

**Measure recall on your data.** Take a few hundred real queries, compute exact top-`k` with brute force, and compare with your index. Without this number, you do not know what you are trading.

**Tune efSearch (or nprobe) first.** It is a query-time setting, needs no rebuild, and is the cheapest way to buy recall with latency.

**Do not reach for ANN too early.** For small collections, flat search may be fast enough, and its results are exact. Time it before adding an index.

**Budget memory honestly.** Vectors plus graph links for HNSW; codes plus centroids for IVF-PQ. Compression is what makes very large collections affordable, and it costs recall.

**Test filtered queries separately.** Recall for "all documents" can look fine while recall for "this tenant's documents" is poor.

## What to remember

Vector search is nearest-neighbour search in a learned space. Exact search is linear in the collection size; approximate indexes avoid most of the work by partitioning, building navigable graphs, or compressing vectors.

HNSW dominates mid-sized collections because its layered graph finds good neighbours in very few steps. Its knobs, `M`, `ef_construction` and `ef`, all move you along a curve that trades recall against memory, build time and latency.

The trade is fine, as long as you know where you are on that curve. Most teams never measure it. Measuring it takes an afternoon.

**Sources**

- [Malkov and Yashunin, "Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs" (arXiv:1603.09320)](https://arxiv.org/abs/1603.09320)
- [Douze et al., "The Faiss library" (arXiv:2401.08281)](https://arxiv.org/abs/2401.08281)
- [Johnson, Douze and Jégou, "Billion-scale similarity search with GPUs" (arXiv:1702.08734)](https://arxiv.org/abs/1702.08734)
- [Jégou, Douze and Schmid, "Product Quantization for Nearest Neighbor Search", IEEE TPAMI](https://doi.org/10.1109/TPAMI.2010.57)
- [Aumüller, Bernhardsson and Faithfull, "ANN-Benchmarks" (arXiv:1807.05614)](https://arxiv.org/abs/1807.05614)
- [hnswlib: HNSW algorithm parameters (GitHub)](https://github.com/nmslib/hnswlib/blob/master/ALGO_PARAMS.md)
- [Faiss wiki: Faiss indexes](https://github.com/facebookresearch/faiss/wiki/Faiss-indexes)
- [Weaviate documentation: Vector indexes](https://docs.weaviate.io/weaviate/concepts/vector-index)

**Media credits**:
- Hero image: "Vector indexes explained: HNSW" layered-graph diagram from the [Weaviate documentation](https://docs.weaviate.io/weaviate/concepts/vector-index). Licence not stated on the page.
- In-body figure: "HNSW search" diagram from the same [Weaviate documentation page](https://docs.weaviate.io/weaviate/concepts/vector-index).
- In-body diagram: recall@10 illustration, Big Matrix Solutions.
