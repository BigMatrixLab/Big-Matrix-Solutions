---
id: "68"
slug: "frontier-act-congress-federal-ai-oversight-explained"
title: "The FRONTIER Act, Explained: What Federal Frontier-AI Rules Would Mean for the Rest of Us"
author: "Mera"
admin: "Mera"
comments: "0"
image: "/assets/images/blog/frontier-act-capitol.webp"
category: "AI Policy"
desc: "A bipartisan House bill would license independent auditors for the biggest AI labs and override parts of state law. Here is what it says, where it stalled, and who it would actually touch."
date: "Nov 02, 2026"
tags: ["AI Policy", "FRONTIER Act", "AI Regulation", "Compliance", "Frontier Models"]
---

# The FRONTIER Act, Explained: What Federal Frontier-AI Rules Would Mean for the Rest of Us

For three years, the most detailed rules on frontier AI in the United States came from Sacramento and Albany, not Washington. In the summer of 2026 a Republican from California and a Democrat from Massachusetts tried to change that, and for a few weeks in September it looked as if Congress might act.

With the midterms days away, lawmakers on both sides expect nothing to pass before Election Day. But their bill remains the most complete federal proposal on the table, and a good guide to what federal oversight may look like whenever it arrives.

*This is an overview for general information, not legal advice. Status is described as of early October 2026. The November 3, 2026 midterm elections take place the day after publication. We do not try to predict their effect here.*

## From discussion draft to H.R. 9925

The bill started as a discussion draft. In June 2026, Reps. Jay Obernolte (R-CA) and Lori Trahan (D-MA) released the **Great American AI Act**, which the Future of Privacy Forum (FPF) described as a bipartisan discussion draft, a starting point for debate rather than a finished bill. Its preemption language drew heavy criticism, including a letter from more than 200 state legislators across 42 states, according to the Foundation for American Innovation.

On **July 23, 2026**, the two sponsors introduced a revised version: the **Frontier Risk Oversight, National Transparency, Independent Evaluation, and Reporting (FRONTIER) Act**, **H.R. 9925**. Four co-sponsors joined them: Reps. Houchin, Peters, Scott Franklin and Subramanyam. The bill was referred to the House Energy and Commerce Committee and the Science, Space, and Technology Committee.

## What the bill actually requires

According to the introduced text, the bill sets three tiers of developer:

| Tier | Test in the bill | Main obligations |
|---|---|---|
| Frontier developer | Has trained, or started training, a model using more than 10^26 operations | Transparency report before deployment; critical incident reporting |
| Large frontier developer | Above, plus over $50M gross revenue and $1B+ AI development spend over 36 months | Publish and follow a "frontier AI framework" for catastrophic risk |
| Very large frontier developer | Above, plus over $5B gross revenue and $10B+ AI development spend over 36 months | Retain a licensed Independent Verification Organization (IVO), assessed at least every six months |

Other provisions in the text:

- **Incident reporting.** Critical safety incidents must be reported within 72 hours of forming a reasonable belief that one occurred, or within 24 hours if there is an imminent risk of death or serious physical injury.
- **A new regulator.** An Under Secretary of Commerce for AI Security would oversee the system and license the IVOs.
- **Emergency authority.** The Secretary of Commerce could suspend or restrict development or deployment of a model that presents "imminent catastrophic risk."
- **Penalties.** Up to $1 million per violation of the transparency and reporting section, and up to $10 million per violation of an emergency order. Each day of a continuing violation counts separately.
- **Preemption.** States could not impose "new substantive obligations" on AI developers in the covered areas: transparency, third-party auditing and incident reporting on frontier risk. Exceptions cover laws protecting minors, general consumer law and state procurement.

The IVO model is the bill's central idea. Under it, licensed private auditors check a developer's safety practices, and the government oversees the auditors. The Foundation for American Innovation called the bill "Congress's best AI bill yet." Its one major objection was that the compute threshold can be raised but not lowered as training gets more efficient.

## How it compares with the states

FPF compared the discussion draft with California's SB 53, New York's RAISE Act and Illinois's SB 315. Because the introduced bill differs from that draft, the federal column below uses the bill text; the state columns use FPF.

| | FRONTIER Act (H.R. 9925) | California SB 53 | New York RAISE Act |
|---|---|---|---|
| Compute trigger | >10^26 operations | >10^26 operations | >10^26 operations |
| Revenue test | $50M / $5B tiers, plus spend tests | $500M for "large" developers | $500M for "large" developers |
| Incident window | 72 hours (24 if imminent) | 15 days | 72 hours |
| Independent audits | Licensed IVOs for the largest tier | Not required | Not required |
| Maximum penalty | $1M per violation per day; $10M for emergency orders | $1M per violation | $1M first, $3M subsequent |

Two differences matter most. The federal bill adds mandatory third-party verification, which neither California nor New York requires. It would also displace parts of those state regimes. The discussion draft's preemption lapsed after three years. FAI describes the introduced bill's preemption as narrower in scope, and Americans for Responsible Innovation objects that it now has no sunset, applies immediately, and contains no whistleblower channel.

## The Senate track: Hawley and Blumenthal

The Senate has its own proposal. Sens. Josh Hawley (R-MO) and Richard Blumenthal (D-CT) introduced the **Artificial Intelligence Risk Evaluation Act (S. 2938)** on September 29, 2025. It is a stricter design. It would set up an Advanced Artificial Intelligence Evaluation Program at the Department of Energy and bar deployment of systems trained above 10^26 operations unless the developer is in compliance. Fines start at not less than $1 million per day.

In mid-September 2026, Semafor reported that the two senators were pushing for a floor vote. Separately, a bill negotiated by Sens. Ted Cruz, Amy Klobuchar and Majority Leader John Thune remained unreleased as of late September. Sen. Maria Cantwell warned against "a weak federal standard" that wipes out stronger state protections.

## Where industry stands

The large labs have mostly moved toward a federal framework.

- **OpenAI.** Sam Altman wrote on September 14 that OpenAI welcomes a federal framework "that sets consistent safety requirements for frontier AI," but said it would not wait for legislation.
- **Anthropic.** In *We Must Pace the Frontier* (September 12), Dario Amodei backed "bills that focus on transparency and on third-party auditing" and asked for a narrow antitrust waiver for safety talks between labs.
- **Elon Musk.** According to reporting attributed to The Wall Street Journal, Musk, Mark Zuckerberg and Jensen Huang separately urged President Trump in September not to back a proposed industry-funded, FINRA-style oversight body. Their reported argument was that it would entrench OpenAI, Anthropic and Google. We found no on-record statement from Musk about the FRONTIER Act itself.

On September 29, the White House and leading AI companies signed a voluntary accord on internal controls and independent auditing. Trahan and Obernolte said the FRONTIER Act would "build on this foundation and make it durable."

## Why it stalled

The calendar was the main obstacle. In mid-September, House Energy and Commerce Chair Brett Guthrie told Newsmax "a bill of that magnitude needs work" and suggested the next Congress. Sen. John Kennedy told Semafor an AI bill would be impossible before the midterms and likely blocked in the lame duck. OpenAI's Chris Lehane said "nothing is likely to happen before Election Day." House Speaker Mike Johnson, quoted by Roll Call, said AI companies "can self-regulate."

As of early October 2026, we found no record of a committee vote on H.R. 9925.

## What compliance would mean, depending on who you are

**If you are a frontier lab** (OpenAI, Anthropic, Google and others above the $5B/$10B line): ongoing licensed IVO assessments every six months, a published frontier AI framework, pre-deployment transparency reports, 72-hour incident reporting, and exposure to emergency orders. The genuinely new elements are the licensed auditor and the federal emergency power.

**If you fine-tune or train your own large model:** the 10^26 trigger counts the original training plus subsequent fine-tuning. Crossing it makes you a "frontier developer" with transparency and incident duties, revenue aside. Few businesses train at that scale; if you are near it, check with counsel.

**If you build products on frontier APIs**, which describes most companies: the bill places its obligations on developers, not on downstream users of models. You would not file reports or hire an IVO. You would see indirect effects:

- Model providers' transparency reports would give you standardised risk documentation for your own vendor assessments.
- Incident reporting by providers could lead to faster model changes or restrictions, so plan for model substitution.
- An emergency order could, in principle, restrict deployment of a model you depend on. Contracts should cover what happens then.
- Preemption would not exempt you from state laws on how AI is *used*, such as consumer protection, employment or sector rules. Those carve-outs are explicit.

## The bottom line

The FRONTIER Act is the clearest statement so far of what bipartisan federal frontier-AI oversight could look like: thresholds based on compute and revenue, licensed third-party verification, fast incident reporting, and a federal floor that partly replaces state law. It did not pass before the midterms, but its parts already appear in state laws, the September accord and the labs' own statements. For most businesses the right move is to treat provider transparency and incident disclosures as inputs to their own risk management now, rather than waiting for Congress.

**Tags**

AI Policy, FRONTIER Act, AI Regulation, Compliance, Frontier Models

**Sources**

- https://www.govinfo.gov/app/details/BILLS-119hr9925ih
- https://www.govinfo.gov/content/pkg/BILLS-119hr9925ih/html/BILLS-119hr9925ih.htm
- https://trahan.house.gov/news/documentsingle.aspx?DocumentID=3825
- https://trahan.house.gov/news/documentsingle.aspx?DocumentID=3831
- https://trahan.house.gov/news/documentsingle.aspx?DocumentID=3853
- https://fpf.org/blog/frontier-ai-goes-federal-how-the-great-american-ai-act-compares-to-state-laws/
- https://fpf.org/blog/the-raise-act-vs-sb-53-a-tale-of-two-frontier-ai-laws/
- https://www.thefai.org/posts/the-frontier-act-is-congress-s-best-ai-bill-yet
- https://ari.us/frontier-act-improves-on-prior-proposal-but-requires-critical-changes/
- https://www.congress.gov/119/bills/s2938/BILLS-119s2938is.htm
- https://fedscoop.com/energy-department-ai-risk-evaluation-bill/
- https://www.semafor.com/article/09/16/2026/congress-ai-safety-window-is-closing
- https://www.semafor.com/article/09/10/2026/disagreements-reemerge-in-bipartisan-ai-safety-talks
- https://www.semafor.com/article/09/10/2026/bipartisan-ai-safety-bill-gains-momentum-on-the-hill
- https://rollcall.com/2026/09/15/ai-threats-confront-a-congress-far-from-erecting-guardrails/
- https://www.yahoo.com/news/politics/articles/house-ai-guardrails-may-not-162751250.html
- https://x.com/sama/status/2099348812305473766
- https://darioamodei.com/post/we-must-pace-the-frontier
- https://news.sbs.co.kr/english/article.do?news_id=N1008759286
- https://gigazine.net/gsc_news/en/20260918-trump-ai-regulation/
- https://www.techpolicy.press/september-2026-us-tech-policy-roundup/

**Media credits**:
- Hero image: U.S. Capitol, from the FRONTIER Act introduction release — [Office of Rep. Jay Obernolte](https://obernolte.house.gov/media/press-releases/obernolte-trahan-introduce-bipartisan-frontier-act-strengthen-oversight)
