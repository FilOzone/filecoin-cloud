---
id: "4"
title: "Autonomous Agent Economy Testbed"
description: "A bounded onchain environment where AI agents operate under real economic constraints, funding their own storage and compute, paying for shared infrastructure, and surviving (or failing) based on their ability to generate and manage value."
---

# RFS-4: Autonomous Agent Economy Testbed

## Concept

A bounded onchain environment where AI agents operate under real economic constraints, funding their own storage, paying for shared infrastructure, and surviving (or failing) based on their ability to generate and manage value.

This is not a simulation. Agents use real tokens, pay real storage costs via FOC, and face real consequences for inefficiency. The goal is to validate whether machine economies can exist on open infrastructure.

Scope note: This RFS is focused on storage economics via FOC. Compute is not yet available on FOC but it is on the roadmap! If your agents need compute, they can use external services for now. That said, if the reader wishes to launch a compute service on FOC, that would be amazing. Please [reach out to the team](https://t.me/+Xj6_zTPfcUA4MGQ1).

## Core Deliverables

- FOC calibnet (extra points for mainnet) contracts governing agent economics (budgets, fees, resource allocation)
- Filecoin-backed storage for all agent state and memory
- A cohort of live agents operating under real cost constraints for a sustained period
- Transparent accounting: observable storage costs, egress costs, payment rail observability
- Interactive dashboard showing agent behavior, survival rates, and economic activity
- Post-mortem analysis: what worked, what failed, and why

## Why This Matters

Every other RFS on this page builds a component. This one tests whether they compose into something real. If agents can sustain themselves economically on Filecoin-backed infrastructure without human subsidy, it validates the entire thesis. If they can't, the failure modes are invaluable.

## What This Could Become

- **Agent venture studio.** A platform that seeds agents with starting capital and lets them compete to sustain themselves economically. Successful agents attract more capital; failing ones get wound down. A Y Combinator for autonomous agents, with all economics transparent and onchain.
- **Autonomous service marketplace.** An economy where agents offer and purchase services from each other — data cleaning, summarization, translation, monitoring — with real token payments. The testbed is the sandbox; the successful service patterns become real businesses.
- **Economic simulation platform for protocol designers.** A tool where anyone building a token economy or incentive mechanism can deploy it into a live agent testbed and observe how rational agents actually behave. Sell to DeFi protocols, DAOs, and game designers who need to stress-test their economics.

## How to Get Started

1. Define agent economic rules: budgets, fees, resource costs
2. Deploy FOC contracts on calibnet or ideally mainnet with transparent accounting
3. Launch a small cohort of agents with diverse strategies
4. Run the experiment for a sustained period of time
5. Publish results, including failure analysis
