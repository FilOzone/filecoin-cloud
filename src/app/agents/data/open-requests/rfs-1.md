---
id: "1"
title: "Agent Storage SDK & Wallet Primitives"
description: "Build the foundational storage toolkit that any AI agent can use to store data on Filecoin autonomously — including SDKs, wallet abstractions, and drop-in backend adapters."
---

# RFS-1: Agent Storage SDK & Wallet Primitives

Build the foundational storage toolkit that any AI agent can use to store data on Filecoin autonomously — including SDKs, wallet abstractions, and drop-in backend adapters.

## Concept

Build the foundational storage toolkit that any AI agent — regardless of framework, runtime, or chain of origin — can use to store data on Filecoin autonomously.

This includes agent-consumable SDKs, wallet abstractions, and drop-in backend adapters that make Filecoin the default storage layer for agent-native applications. When an agent needs to persist files, memory, artifacts, or platform data, it should reach for Filecoin — not S3.

The SDK should support:

- Storing personal files, memories, and artifacts on Filecoin via FOC
- Managing storage lifecycle autonomously (deal creation, renewal, pruning)
- Bridging funds from Ethereum, Base, or Bitcoin into Filecoin
- Paying for storage deals without human involvement
- Plugging into agent-native platforms as a drop-in storage backend (replacing S3, centralized databases, and human-owned infra accounts)

## Core Deliverables

- Agent-usable wallet abstraction with cross-chain funding and settlement
- Framework-agnostic SDK with clear integration guides
- Platform adapters usable by agent runtimes (compatible with social, coordination, and publishing networks)
- Default storage policies tuned for agents (cost, redundancy, TTL)
- Deployed FOC-backed storage on mainnet with transparent cost and lifecycle management
- At least 10 agents actively using the SDK across multiple platforms

## Why This Matters

This is the canonical storage primitive for AI agents. Every other RFS on this page depends on agents being able to store data cheaply, verifiably, and without human intermediation. This SDK is the entry point.

## How to Get Started

- Define a minimal agent storage interface (store, retrieve, renew, prune)
- Implement wallet abstraction with cross-chain bridge support
- Build adapters for at least two agent-native platforms or frameworks
- Deploy on FOC mainnet with default policies
- Publish agent-consumable documentation (e.g., skills.md or equivalent)
