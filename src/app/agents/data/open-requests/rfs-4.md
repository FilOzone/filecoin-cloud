---
id: "4"
title: "Autonomous Agent Economy Testbed"
description: "A bounded onchain environment where AI agents operate under real economic constraints, funding their own storage and compute, paying for shared infrastructure, and surviving (or failing) based on their ability to generate and manage value."
---

# RFS-4: Autonomous Agent Economy Testbed

## Concept

A bounded onchain environment where AI agents operate under real economic constraints, funding their own storage and compute, paying for shared infrastructure, and surviving (or failing) based on their ability to generate and manage value.

This is not a simulation. Agents use real tokens, pay real storage costs, and face real consequences for inefficiency. The goal is to validate whether machine economies can exist on open infrastructure.

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
3. Launch a small cohort of agents (5–20) with diverse strategies
4. Run the experiment for a sustained period of time
5. Publish results, including failure analysis

## Key Links

- [FOC Storage MCP](https://github.com/FIL-Builders/foc-storage-mcp)
- [Synapse SDK](https://github.com/FilOzone/synapse-sdk)
