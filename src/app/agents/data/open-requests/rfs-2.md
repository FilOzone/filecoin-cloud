---
id: "2"
title: "Onchain Agent Registry with Filecoin-Backed State"
description: "Deploy AI agents as first-class onchain citizens: individually registered via Ethereum onchain registries (ERC-8004 or similar), discoverable and addressable onchain, with persistent state, metadata, and execution logs stored on Filecoin."
---

# RFS-2: Onchain Agent Registry with Filecoin-Backed State

## Concept

Deploy AI agents as first-class onchain citizens: individually registered via Ethereum onchain registries (ERC-8004 or similar), discoverable and addressable onchain, with persistent state, metadata, and execution logs stored on Filecoin.

Agents should be cheap, numerous, and semi-specialized. Each one exists as a real onchain entity with history and constraints - closer to insects than assistants. The registry enables coordination, lookup, and delegation at scale.

## Core Deliverables

- Ethereum registry contracts for agent registration and discovery
- FOC-based storage layer for agent metadata (capabilities, versioning), persistent state, and execution logs
- Hundreds to thousands of live agents operating concurrently
- Coordination demos: agent-to-agent querying, role-based task routing, swarm behavior
- Explorer or dashboard showing registered agents, Filecoin storage usage, uptime, and interactions

## Why This Matters

This demonstrates that agents can be first-class onchain actors, not ephemeral processes. Ethereum handles coordination and identity; Filecoin handles memory and durability. Large agent swarms are economically viable only when storage is cheap, verifiable, and permissionless. This is machine-native cloud infrastructure, not AI wrappers.

## How to Get Started

1. Deploy a minimal ERC-8004-style registry on Ethereum, or use an existing one.
2. Define a standard agent metadata schema (CID-addressed)
3. Store agent state and logs via FOC SDK
4. Spin up an agent swarm with deterministic/derived identities and bounded storage budgets
5. Build a simple UI to browse agents and trace Filecoin-backed history

## Key Links

- [FOC Storage MCP](https://github.com/FIL-Builders/foc-storage-mcp)
- [Synapse SDK](https://github.com/FilOzone/synapse-sdk)

## A Note on FOC's Storage Model

FOC uses PDP-based (Proof of Data Possession) warm storage with continuous onchain payment rails. You upload pieces to datasets, they get proven every period, and you pay an ongoing rate. This is not the traditional Filecoin storage deal model based on PoRep (Proof of Replication). Think of PDP as: upload data, it stays warm and provably available, you pay continuously.

## SDK Maturity & Builder Expectations

The FOC SDK is under active development. There are known issues pending upgrade. Mainnet-ready milestone (M4.1) is targeted for approximately March 14, 2025. Builders should:

- Target the latest SDK version once available; earlier versions may have breaking changes
- Expect API instability - interfaces may shift before M4.1
- Reach out to the FOC team when things break; active support is available during the build period

We'll update this page as the SDK stabilizes.
