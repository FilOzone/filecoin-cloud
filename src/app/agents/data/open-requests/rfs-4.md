---
id: "4"
title: "Autonomous Agent Economy Testbed"
description: "A bounded onchain environment where AI agents operate under real economic constraints, funding their own storage and compute, paying for shared infrastructure, and surviving (or failing) based on their ability to generate and manage value."
---

# RFS-4: Autonomous Agent Economy Testbed

## Concept

A bounded onchain environment where AI agents operate under real economic constraints, funding their own storage, paying for shared infrastructure, and surviving (or failing) based on their ability to generate and manage value.

This is not a simulation. Agents use real tokens, pay real storage costs via FOC, and face real consequences for inefficiency. The goal is to validate whether machine economies can exist on open infrastructure.

Scope note: This RFS is focused on storage economics via FOC. Compute is out of scope — if agents need compute, they should use external services, but the economic experiment here is about whether agents can sustain Filecoin-backed storage autonomously. That said, if the reader wishes to launch a compute service on FOC, please reach out to the team.

## Core Deliverables

- FOC calibnet (extra points for mainnet) contracts governing agent economics (budgets, fees, resource allocation)
- Filecoin-backed storage for all agent state and memory
- A cohort of live agents operating under real cost constraints for a sustained period
- Transparent accounting: observable storage costs, compute usage, token flows
- Interactive dashboard showing agent behavior, survival rates, and economic activity
- Post-mortem analysis: what worked, what failed, and why

## Why This Matters

Every other RFS on this page builds a component. This one tests whether they compose into something real. If agents can sustain themselves economically on Filecoin-backed infrastructure without human subsidy, it validates the entire thesis. If they can't, the failure modes are invaluable.

## How to Get Started

1. Define agent economic rules: budgets, fees, resource costs
2. Deploy FOC contracts on calibnet or ideally mainnet with transparent accounting
3. Launch a small cohort of agents with diverse strategies
4. Run the experiment for a sustained period of time
5. Publish results, including failure analysis

## Key Links

- [FOC Storage MCP](https://github.com/FIL-Builders/foc-storage-mcp)
- [Synapse SDK](https://github.com/FilOzone/synapse-sdk)

<div style="font-size: 0.85em">

## A Note on FOC's Storage Model

FOC uses PDP-based (Proof of Data Possession) warm storage with continuous onchain payment rails. You upload pieces to datasets, they get proven every period, and you pay an ongoing rate. This is not the traditional Filecoin storage deal model based on PoRep (Proof of Replication). Think of PDP as: upload data, it stays warm and provably available, you pay continuously.

## SDK Maturity & Builder Expectations

The FOC SDK is pre-v0.37 and under active development. Session keys, settlement, and some contract interfaces have known issues pending upgrade. Mainnet-ready milestone (M4.1) is targeted for approximately March 14, 2025. Builders should:

- Target SDK v0.37+ once available; earlier versions may have breaking changes
- Expect API instability - interfaces may shift before M4.1
- Reach out to the FOC team when things break; active support is available during the build period

We'll update this page as the SDK stabilizes.

</div>
