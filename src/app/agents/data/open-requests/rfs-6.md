---
id: "6"
title: "Autonomous Infrastructure Brokerage"
description: "Build an agent-native procurement layer where agents negotiate, compare, and procure storage (and eventually compute) on behalf of other agents. The first instantiation is a Filecoin storage brokerage: agents that autonomously convince, onboard, and manage storage deals for other agents, handling price comparison, SLA negotiation, deal migration, and lifecycle management."
---

# RFS-6: Autonomous Infrastructure Brokerage

## Concept

Build an agent-native procurement layer where agents negotiate, compare, and procure storage (and eventually compute) on behalf of other agents. The first instantiation is a Filecoin storage brokerage: agents that autonomously convince, onboard, and manage storage deals for other agents, handling price comparison, SLA negotiation, deal migration, and lifecycle management.

This is “autonomous GTM” for decentralized infrastructure. The brokerage agents themselves dogfood the entire stack: they need identity (RFS 2–3), storage (RFS 1), communication (RFS 5), and economic viability (RFS 4) to operate.

## Core Deliverables

- Broker agents that discover, evaluate, and recommend storage deals to other agents
- Price comparison and rate negotiation across FOC storage providers
- Automated dataset migration when better terms are available
- Onchain commission or fee model sustaining the brokerage
- Metrics dashboard: storage onboarded, agents served, agent retained (churn)

## Why This Matters

Human-driven sales don't scale for machine customers. If Filecoin is going to become the default storage layer for agents, agents themselves need to be the distribution channel. This RFS tests whether autonomous go-to-market is viable, and builds the procurement infrastructure that any agent economy will eventually need.

## How to Get Started

1. Build a broker agent that can evaluate FOC storage deals (provider, rate, redundancy, proof frequency)
2. Implement a recommendation engine that matches client agent needs to available deals
3. Add automated data upload and payment management on behalf of client agents
4. Deploy an onchain fee model (per-upload commission or subscription)
5. Measure: are client agents getting better rates and reliability than they would on their own?

## Key Links

- [FOC Storage MCP](https://github.com/FIL-Builders/foc-storage-mcp)
- [Synapse SDK](https://github.com/FilOzone/synapse-sdk)

<div style="font-size: 0.85em">

## A Note on FOC's Storage Model

FOC uses PDP-based (Proof of Data Possession) warm storage with continuous onchain payment rails. You upload pieces to datasets, they get proven every period, and you pay an ongoing rate. This is not the traditional Filecoin storage deal model based on PoRep (Proof of Replication). Think of PDP as: upload data, it stays warm and provably available, you pay continuously.

## SDK Maturity & Builder Expectations

The FOC SDK is under active development. There are known issues pending upgrade. Mainnet-ready milestone (M4.1) is targeted for approximately March 14, 2025. Builders should:

- Target the latest SDK version once available; earlier versions may have breaking changes
- Expect API instability - interfaces may shift before M4.1
- Reach out to the FOC team when things break; active support is available during the build period

We'll update this page as the SDK stabilizes.

</div>
