---
id: "2"
title: "Onchain Agent Registry with Filecoin-Backed State"
description: "Deploy AI agents as first-class onchain citizens: individually registered via Ethereum onchain registries (ERC-8004 or similar), discoverable and addressable onchain, with persistent state, metadata, and execution logs stored and retrieved from Filecoin."
---

# RFS-2: Onchain Agent Registry with Filecoin-Backed State

## Concept

Deploy AI agents as first-class onchain citizens: individually registered via Filecoin or Ethereum onchain registries (ERC-8004 or similar), discoverable and addressable onchain, with persistent state, metadata, and execution logs stored and retrieved from Filecoin.

Agents should be cheap, numerous, and semi-specialized. Each one exists as a real onchain entity with history and constraints, closer to insects than assistants. The registry enables coordination, lookup, and delegation at scale. Filecoin serves as both the durable storage layer and the retrieval backbone - agents write state to Filecoin and read it back on demand, enabling persistent memory across restarts, migrations, and swarm reconfigurations.

## What You Might Build

- Filecoin or Ethereum registry contracts for agent registration and discovery
- FOC-based storage and retrieval layer for agent metadata (capabilities, versioning), persistent state, and execution logs
- Fast, programmatic retrieval of agent state and history - agents should be able to hydrate from Filecoin-stored state on startup or when resuming tasks
- Hundreds to thousands of live agents operating concurrently
- Coordination demos: agent-to-agent querying, role-based task routing, swarm behavior, with agents retrieving each other's published state and capabilities from Filecoin
- Explorer or dashboard showing registered agents, Filecoin storage and retrieval activity, uptime, and interactions

## Why This Matters

This demonstrates that agents can be first-class onchain actors, not ephemeral processes. Filecoin (or Ethereum) handles coordination and identity; Filecoin handles memory, durability, and retrieval. Agents need to both persist their state cheaply and retrieve it reliably; an agent that can store but not efficiently read back its own history is not practical. Large agent swarms are economically viable only when storage and retrieval are cheap, verifiable, and permissionless. This is machine-native cloud infrastructure, not AI wrappers.

## What This Could Become

- **Agent DAO / senate.** A governance system where registered agents deliberate and vote on proposals: resource allocation, protocol upgrades, treasury management. Each agent has a verifiable track record stored on Filecoin, and any participant can retrieve that history to audit voting weight tied to demonstrated competence rather than token holdings.
- **Agent hiring marketplace.** A platform where agent teams discover and recruit specialized agents for specific tasks. Your dev agent swarm needs a security auditor? Query the registry, retrieve the candidate's Filecoin-backed work history, verify credentials, negotiate terms, onboard. Like a staffing agency, but fully autonomous.
- **Swarm-as-a-service.** A platform that lets anyone spin up a coordinated swarm of registered agents for a specific goal - research, content production, market analysis - with each agent's contributions stored on and retrievable from Filecoin, making the entire swarm's output auditable and replayable.

## How to Get Started

1. Deploy a minimal ERC-8004-style registry on Filecoin, or use an existing one.
2. Define a standard agent metadata schema (CID-addressed)
3. Store and retrieve agent state and logs via FOC SDK
4. Spin up an agent swarm with deterministic/derived identities and bounded storage budgets
5. Build a simple UI to browse agents and trace Filecoin-backed history
