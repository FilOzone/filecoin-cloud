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
