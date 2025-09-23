---
title: Blogpost 2
pubDate: 12/31/2022 12:05
author: "Elian Van Cutsem"
tags:
  - Astro
  - WebDev
  - Programming
imgUrl: '../../assets/astro.jpeg'
description: Lorem markdownum longo os thyrso telum, continet servat fetus nymphae, vox nocte sedesque, decimo. Omnia esse, quam sive; conplevit illis indestrictus admovit dedit sub quod protectus, impedit non.
---

---
title: "Meesho Teardown: Refund Transparency for COD-Heavy Buyers"
description: "Evidence → small-scope → measurable lift: clarifying refund stages and ETAs to reduce support load and rebuild trust."
pubDate: 2025-09-22
hero: "/prototypes/meesho-refund/02-refund-progress.png"
tags: ["product-management", "ecommerce", "case-study", "ux"]
ogImage: "/prototypes/meesho-refund/02-refund-progress.png"
draft: false
---

import Figure from "@/components/Figure.astro";
import Callout from "@/components/Callout.astro";
import TOC from "@/components/TOC.astro";
import Stat from "@/components/Stat.astro";

/* Fallbacks: if the above imports don’t exist in your project, 
   comment them out and use pure HTML + Tailwind. */

{/* Optional: <TOC /> */}

# Meesho Teardown: Refund Transparency for COD-Heavy Buyers

<div class="lane lane--lime stack-md">
  <h2 class="text-xl font-bold">Executive Summary</h2>
  <ul class="list-disc pl-5">
    <li>Refund complaints persist publicly; issue is <strong>perception/communication</strong>, not backend tracking.</li>
    <li>Scope: surface <strong>stage-wise refund status + ETA ranges</strong> and throttle a single escalation path.</li>
    <li>Target metric: ↓ refund-related support tickets per order (guardrails: repeat rate, NPS).</li>
    <li>Feasible in 2–3 sprints: thin read API + UI; no new infra.</li>
    <li>Assumes Tier-2/3, COD-heavy buyers with trust gaps.</li>
  </ul>
</div>

<div class="lane lane--violet stack-md">
  <h2 class="text-xl font-bold">Problem Statement</h2>
  <p><strong>Surface:</strong> “Refund pending” complaints after returns/pickups; confusion when orders show “delivered” yet item not received.</p>
  <p><strong>Depth:</strong> Users cannot see where they are in the refund pipeline or a credible ETA; mismatch between backend state and perceived state.</p>
</div>

<div class="lane lane--blue stack-md">
  <h2 class="text-xl font-bold">Evidence & Research</h2>
  <div class="grid md:grid-cols-2 gap-4">
    <blockquote class="p-3 border rounded-lg bg-white">
      “Return request 11 days back… still no… staff has no clue.” <span class="text-sm opacity-70">Trustpilot, 2025</span>
    </blockquote>
    <blockquote class="p-3 border rounded-lg bg-white">
      “Pickup postponed multiple times… still waiting for refund.” <span class="text-sm opacity-70">Trustpilot, 2025</span>
    </blockquote>
    <blockquote class="p-3 border rounded-lg bg-white">
      “One product not delivered but system shows delivered… one OTP for 3 items.” <span class="text-sm opacity-70">Public reviews, 2025</span>
    </blockquote>
    <blockquote class="p-3 border rounded-lg bg-white">
      “They refused to initiate my refund. So disappointed.” <span class="text-sm opacity-70">Sitejabber, 2025</span>
    </blockquote>
  </div>
  <Callout title="Interpretation" variant="warn">
    The persistent theme is not “no tracking exists,” but “buyers can’t see a trustworthy, stage-wise status with credible timing.”
  </Callout>
</div>

<div class="lane lane--lime stack-md">
  <h2 class="text-xl font-bold">Persona</h2>
  <ul class="list-disc pl-5">
    <li>First-time or light online shopper, Tier-2/3 city, COD-preferred.</li>
    <li>Low tolerance for uncertainty; relies on simple cues (ticks, dates).</li>
    <li>Goal: reassurance and a single, fair escalation path.</li>
  </ul>
</div>

<div class="lane lane--violet stack-md">
  <h2 class="text-xl font-bold">Solution Overview — Refund Status Tracker v1</h2>
  <p>Communication-first UI: show stages with completion ticks and ETA ranges; enable a single escalation if a stage stagnates beyond X days.</p>
  <ul class="list-disc pl-5">
    <li>Stages: Pickup Scheduled → Pickup Done → QC in Progress → Refund Initiated → Refund Posted</li>
    <li>ETAs: ranges per stage (configurable by payment type/courier)</li>
    <li>Escalation: once per return, throttled</li>
    <li>COD vs Prepaid: clearly labeled timelines</li>
  </ul>
</div>

<div class="lane lane--blue stack-md">
  <h2 class="text-xl font-bold">Wireframes</h2>
  {/* Replace with your real assets; fallback to Figure placeholders */}
  <Figure src="/prototypes/meesho-refund/01-orders.png" alt="Orders list with inline refund status" />
  <Figure src="/prototypes/meesho-refund/02-refund-progress.png" alt="Refund in progress with stage-wise ETAs" />
  <Figure src="/prototypes/meesho-refund/03-escalation.png" alt="Escalation confirmation" />
  <Figure src="/prototypes/meesho-refund/04-refund-complete.png" alt="Refund complete confirmation" />
</div>

<div class="lane lane--lime stack-md">
  <h2 class="text-xl font-bold">PRD Snapshot</h2>

| Section | Notes |
|---|---|
| Problem | Refund distrust due to poor visibility/ETAs |
| Goal Metric | ↓ refund-related support tickets/order |
| Guardrails | Repeat rate (D30), NPS, cancellations |
| Non-Goals | Changing refund policy/SLAs or payment rails |
| Events | refund_stage_viewed, refund_eta_viewed, refund_escalated, refund_eta_missed |
| Rollout | Feature flag `refund_tracker_v1`: 10% → 50% → 100% |
| Kill-switch | Escalation usage >20% of returns or guardrails regress |

</div>

<div class="lane lane--violet stack-md">
  <h2 class="text-xl font-bold">Tech Feasibility</h2>
  <ul class="list-disc pl-5">
    <li>Reuse existing order/return/refund state; add thin read API <code>GET /refund-status/{orderId}</code>.</li>
    <li>Frontend component in Orders detail; config-driven ETAs by payment type & courier.</li>
    <li>2–3 sprints; no new infra/services.</li>
  </ul>
</div>

<div class="lane lane--blue stack-md">
  <h2 class="text-xl font-bold">Experiment Plan</h2>
  <ul class="list-disc pl-5">
    <li><strong>Unit:</strong> returned orders (buyer-level bucketing), 50/50 split</li>
    <li><strong>Primary:</strong> refund-related tickets/order (target −20%)</li>
    <li><strong>Guardrails:</strong> repeat rate D30, NPS, cancellations</li>
    <li><strong>QA:</strong> event vs backend state consistency</li>
  </ul>
</div>

<div class="lane lane--lime stack-md">
  <h2 class="text-xl font-bold">Red-Team (Risks & Mitigations)</h2>
  <ul class="list-disc pl-5">
    <li>Escalation abuse → throttle; require stagnation ≥ X days</li>
    <li>ETA miss → show ranges; optional goodwill credit if >N days late</li>
    <li>Legal/policy mismatch → mirror policy verbatim; vetted copy</li>
    <li>Ops misalignment → daily config update per courier</li>
  </ul>
</div>

<div class="lane lane--violet stack-md">
  <h2 class="text-xl font-bold">Impact Model (Illustrative)</h2>
  <p>Example: 200k returns/month × 20% fewer refund-related contacts × ₹15/support interaction avoided ≈ <strong>₹6M/month</strong> saved. Assumptions to be validated.</p>
</div>

<div class="lane lane--blue stack-md">
  <h2 class="text-xl font-bold">Next Steps</h2>
  <p>Parallel MVP: <em>Delivery Confirmation Window</em> to address “delivered vs not received” disputes and multi-item OTP edge cases.</p>
</div>

<div class="lane lane--none stack-md">
  <h2 class="text-xl font-bold">Reflection</h2>
  <p>The insight isn’t “build a tracker.” It’s reframing a trust problem and testing a small, outsider-safe intervention with measurable lift.</p>
</div>
