---
id: "1"
title: "Agent Storage SDK"
description: "Build the foundational storage toolkit that any AI agent, regardless of framework, runtime, or chain of origin, can use to store data on Filecoin autonomously."
---

# RFS-1: Agent Storage SDK & Wallet Primitives

## Concept

Build the foundational storage toolkit that any AI agent, regardless of framework, runtime, or chain of origin, can use to store data on Filecoin autonomously.

This includes agent-consumable SDKs, wallet abstractions, and drop-in backend adapters that make Filecoin the default storage layer for agent-native applications. When an agent needs to persist files, memory, artifacts, or platform data, it should reach for Filecoin, not S3.

The SDK should support:

- Storing personal files, memories, and artifacts on Filecoin via FOC
- Managing storage lifecycle autonomously (deal creation, renewal, pruning)
- Bridging funds from Ethereum, Base, or Bitcoin into Filecoin
- Paying for storage deals without human involvement

## Core Deliverables

- Framework-agnostic SDK with clear integration guides
- Platform adapters usable by agent runtimes (compatible with social, coordination, and publishing networks)
- Default storage policies tuned for agents (cost, redundancy, TTL)
- Agent-usable wallet abstraction, potentially with cross-chain funding and settlement
- Deployed FOC-backed storage on calibnet, (extra point for mainnet) with transparent cost and lifecycle management

## Why This Matters

This is the canonical storage primitive for AI agents. Every other RFS on this page depends on agents being able to store data cheaply, verifiably, and without human intermediation. This SDK is the entry point.

## How to Get Started

1. Define a minimal agent storage interface (store, retrieve, renew, prune)
2. Implement wallet abstraction with cross-chain bridge support
3. Build adapters for at least two agent-native platforms or frameworks
4. Deploy on FOC calibnet and mainnet with default policies
5. Publish agent-consumable documentation (e.g., skills.md or equivalent)

## Key Links

- [FOC Storage MCP](https://github.com/FIL-Builders/foc-storage-mcp)
- [Synapse SDK](https://github.com/FilOzone/synapse-sdk)
