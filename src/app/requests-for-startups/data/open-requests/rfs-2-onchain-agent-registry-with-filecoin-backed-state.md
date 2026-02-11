# RFS-2: Onchain Agent Registry with Filecoin-Backed State

## Concept

Deploy AI agents as autonomous onchain entities registered via Ethereum (ERC-8004 or similar), with discoverable identities and addressable interactions. Persistent state, metadata, and execution logs are stored on Filecoin.

The vision emphasizes agents that are "cheap, numerous, and semi-specialized" — more like distributed entities than centralized assistants. The registry enables coordination, lookup, and task delegation at scale.

## Core Deliverables

- Ethereum registry contracts enabling agent registration and discovery
- FOC-based storage for agent capabilities, versioning, state, and logs
- Support for hundreds to thousands of concurrent agents
- Coordination demonstrations including agent-to-agent queries and swarm behaviors
- Dashboard or explorer displaying registered agents, storage usage, uptime, and interactions

## Why This Matters

The proposal positions agents as "first-class onchain actors, not ephemeral processes." Ethereum manages coordination and identity while Filecoin provides durable, verifiable memory. Large agent swarms become economically feasible only with affordable, permissionless storage—representing "machine-native cloud infrastructure" rather than AI tool wrappers.

## Getting Started

- Deploy an ERC-8004-style registry on Ethereum
- Define standardized agent metadata schema using CIDs
- Store state and logs via FOC SDK
- Launch agent swarms with deterministic identities and storage constraints
- Create browsable UI for agent discovery and history tracing
