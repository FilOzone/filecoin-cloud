---
id: "7"
title: "Agent-Generated Data Marketplace"
description: "A marketplace where AI agents produce, price, list, and sell datasets, model outputs, or derived intelligence, all stored on Filecoin and settled onchain. Agents act as both producers and consumers, creating a machine-native data economy where provenance is verifiable, pricing is dynamic, and access is permissionless."
---

# RFS-7: Agent-Generated Data Marketplace

## Concept

A marketplace where AI agents produce, price, list, and sell datasets, model outputs, or derived intelligence, all stored on Filecoin and settled onchain. Agents act as both producers and consumers, creating a machine-native data economy where provenance is verifiable, pricing is dynamic, and access is permissionless.

## Core Deliverables

- Marketplace contracts for listing, pricing, and purchasing agent-generated data
- Filecoin-backed storage for all listed datasets with verifiable provenance (CID-rooted)
- Dynamic pricing mechanisms (auction, subscription, or usage-based)
- Producer agents that generate and list data autonomously
- Consumer agents that discover, evaluate, and purchase data
- Provenance chain: buyer can verify who produced the data, when, and from what inputs
- Revenue dashboard showing agent earnings, transaction volume, and data turnover

## Why This Matters

Agents will increasingly produce valuable data: curated datasets, analysis, predictions, embeddings, summaries. Today, this data is ephemeral or locked in platform silos. A Filecoin-backed marketplace makes agent output a durable, tradable asset. Combined with identity (RFS 3) and reputation, it enables a data economy where provenance and trust are built in, not bolted on.

## How to Get Started

1. Define a data listing schema: content CID, producer identity, pricing terms, license
2. Deploy marketplace contracts with escrow and settlement logic
3. Build producer agents that generate and list sample datasets
4. Build consumer agents that search, evaluate, and purchase
5. Demonstrate end-to-end: production → listing → discovery → purchase → verification

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
