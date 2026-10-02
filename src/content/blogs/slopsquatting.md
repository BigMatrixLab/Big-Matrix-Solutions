---
id: "101"
slug: "slopsquatting-hallucinated-packages-supply-chain-risk"
title: "Slopsquatting and Hallucinated Packages: Supply-Chain Risk in AI-Written Code"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/slopsquatting-cover.png"
category: "Software Development"
desc: "Code assistants sometimes import packages that do not exist, and attackers can register those names. What the research measured, why it is not just typosquatting, and the controls that close the gap."
date: "Feb 14, 2027"
tags: ["Software Supply Chain", "Security", "AI Coding Assistants", "Dependencies"]
---

# Slopsquatting and Hallucinated Packages: Supply-Chain Risk in AI-Written Code

A code assistant writes `import fastjson_utils`, the developer runs `pip install fastjson_utils`, and it installs. The problem is that no such library was ever written by anyone legitimate. The model invented the name, and someone else noticed that models invent it, registered it on the public index, and filled it with something unpleasant.

That attack has a name. Andrew Nesbitt summarised it in 2025, crediting the term to PSF Security Developer-in-Residence Seth Larson: slopsquatting is "when an LLM hallucinates a non-existent package name, and a bad actor registers it maliciously."

It is a small, specific risk with a very cheap fix, which makes it worth understanding properly.

## What the research measured

The most thorough study is "We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs" by Spracklen et al., published at USENIX Security 2025. The researchers generated 576,000 code samples in Python and JavaScript across 16 models and checked every referenced package against the real registries.

| Finding | Number |
|---|---|
| Packages referenced in generated code | 2.23 million |
| Of those, hallucinated (do not exist) | 440,445 (19.7%) |
| Unique hallucinated names | 205,474 |
| Average hallucination rate, commercial models | at least 5.2% |
| Average hallucination rate, open-source models | at least 21.7% |

Two further findings are what turn a curiosity into an attack surface.

**Hallucinations repeat.** When the authors re-ran prompts that had produced a hallucinated package, 43 percent of those names came back in all ten repeat queries, and 58 percent came back more than once. An attacker does not need to guess: they can ask models the same kinds of questions developers ask, collect the names that keep appearing, and register those.

**They are not typos.** In the authors' analysis, only 13.4 percent of hallucinated names were within an edit distance of one or two from a real package. Most are plausible inventions, which means defences tuned for typosquatting, like flagging names close to popular packages, miss them. And 8.7 percent of hallucinated Python package names turned out to be valid JavaScript packages: the model mixed up ecosystems.

## It already works in the wild

Before the term existed, security researcher Bar Lanyado at Lasso Security noticed models recommending `huggingface-cli` as a pip package. That is the name of a command-line tool, not of the package that provides it. He registered an empty package under the name as an experiment. In three months it received more than 30,000 downloads, and installation instructions for it had turned up in the README of a research repository published by Alibaba.

The package was empty, so nothing was harmed. The experiment showed that hallucinated names receive real installs from real developers and real automation. Spracklen et al. lay out the full attack: the attacker prompts a model, finds a package name that does not exist, publishes it with malicious code, and waits for an ordinary user to be told to install it.

## Why agents make it worse

When a person types the install command, there is at least a moment where someone might notice an unfamiliar name. Coding agents remove that moment. An agent working in a sandbox will add the import, run the install, see it succeed and carry on. Install scripts can run at that point, before any human review, inside an environment that may hold tokens and credentials.

Two other gaps compound it:

- **Code review often skips manifests.** Some AI review tools do not review dependency files at all; GitHub's documentation for Copilot code review lists `package.json` among skipped files. Human reviewers also tend to skim lockfile diffs.
- **Hallucinations can collide with private names.** Nesbitt has argued that slopsquatting combines with dependency confusion: an attacker can register hallucinated names first, and "some will happen to be real internal names somewhere." A developer whose tooling checks the public registry before the private one then installs the attacker's package.

## Controls that close the gap

None of the fixes are exotic. They are standard supply-chain hygiene, applied consistently to code nobody typed.

![A dependency gate: a new import is checked for existence on the registry, establishment by age and maintainers, and presence on the team allowlist before being locked with hashes; failing any check stops for human review](/assets/images/blog/diagrams/slopsquatting-1.svg)

*Diagram: Big Matrix Solutions, based on [Spracklen et al.](https://arxiv.org/abs/2406.10279) and [pip documentation](https://pip.pypa.io/en/stable/topics/secure-installs/).*

### 1. Treat a new dependency as a reviewed event

Any change that adds a dependency gets flagged in CI and needs explicit approval from someone who checked the package. This is the single most effective control, because it puts a human back at the exact moment the attack relies on skipping.

### 2. Check existence and age automatically

A package that does not exist is a hallucination. A package that exists but was registered last week with one release and no history deserves suspicion. Both are cheap to check. For PyPI, the JSON API at `https://pypi.org/pypi/<name>/json` returns release history; for npm, `npm view <name> time` shows publish dates.

```bash
# CI step: block new Python dependencies that are missing or under 90 days old.
# NEW_DEPS is the list of package names added in this change.
set -euo pipefail
cutoff=$(date -d '90 days ago' +%s)
for pkg in $NEW_DEPS; do
  meta=$(curl -sf "https://pypi.org/pypi/$pkg/json") || { echo "MISSING: $pkg"; exit 1; }
  first=$(jq -r '[.releases[][].upload_time] | min // empty' <<<"$meta")
  if [ -z "$first" ] || [ "$(date -d "$first" +%s)" -gt "$cutoff" ]; then
    echo "NEEDS REVIEW: $pkg (first upload: ${first:-none})"; exit 1
  fi
done
```

The threshold is a policy choice; the point is that an unfamiliar, brand-new package stops and waits for a person.

### 3. Install from what you locked, not what you resolved

Lockfiles with integrity hashes mean installs reproduce exactly what was reviewed. In Python, pip's hash-checking mode (`--require-hashes`) requires every requirement, including dependencies, to be pinned with a hash. In Node, `npm ci` installs from the lockfile and fails if it disagrees with `package.json`, rather than silently resolving something new.

### 4. Put a proxy and an allowlist in front of public registries

Route installs through an internal registry proxy, and in CI and agent sandboxes allow only approved packages. This also blocks the dependency-confusion variant, because internal names resolve internally first.

### 5. Constrain the agent's environment

Run agents with no long-lived credentials, restricted network egress and, where the ecosystem allows it, install scripts disabled by default (`npm install --ignore-scripts`). An install that cannot phone home or read secrets has far less to steal.

### 6. Ground the model in what you actually use

Give coding agents your approved dependency list in their instructions, and tell them to prefer the standard library and existing dependencies. The Spracklen paper found that grounding and fine-tuning reduced hallucination rates, and that several models were good at recognising their own hallucinated names when asked. This lowers the rate; it does not replace the gate.

## A working checklist

- **Flag every new dependency in CI** and require a named approver.
- **Fail builds on packages that do not exist** or are newer than your threshold.
- **Use lockfiles with hashes**; `npm ci` and pip hash-checking mode in pipelines.
- **Install through a proxy with an allowlist** in CI and agent sandboxes.
- **Disable install scripts** and remove credentials from agent environments.
- **Reserve your internal package names** on public registries, or scope them.
- **Give agents your dependency allowlist** and tell them not to add packages without saying so.

## The takeaway

Slopsquatting is not a sophisticated attack. It exploits a habit: trusting that a name that installs is a name someone meant. AI assistants did not create that habit, but they produce plausible, repeatable, non-existent names at a scale typosquatters never had.

The defence is equally unsophisticated. Make adding a dependency a deliberate, checked act, whoever or whatever proposed it. Teams that already did this are mostly covered. Teams that let agents install freely should close that gap before someone else finds it.

**Sources**

- https://arxiv.org/abs/2406.10279
- https://simonwillison.net/2025/Apr/12/andrew-nesbitt/
- https://mastodon.social/@andrewnez/114302875075999244
- https://nesbitt.io/2025/12/10/slopsquatting-meets-dependency-confusion.html
- https://www.lasso.security/blog/ai-package-hallucinations
- https://docs.github.com/en/copilot/concepts/agents/code-review
- https://pip.pypa.io/en/stable/topics/secure-installs/
- https://docs.npmjs.com/cli/commands/npm-ci

**Media credits**:
- Hero image: Big Matrix Solutions, cover version of the in-body dependency-gate diagram, based on [Spracklen et al.](https://arxiv.org/abs/2406.10279)
- In-body diagram: Big Matrix Solutions, drawn from [Spracklen et al.](https://arxiv.org/abs/2406.10279) and the [pip secure installs guide](https://pip.pypa.io/en/stable/topics/secure-installs/)
