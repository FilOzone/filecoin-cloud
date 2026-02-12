---
id: "1"
title: "Agentic Storage SDK"
description: "Build the foundational storage toolkit that any AI agent, regardless of framework, runtime, or chain of origin, can use to store data on Filecoin autonomously."
---

# RFS-1: Agentic Storage SDK

## Concept

Build the foundational storage toolkit that any AI agent, regardless of framework, runtime, or chain of origin, can use to store data on Filecoin autonomously.

This includes agent-consumable SDKs, wallet tooling, and drop-in backend adapters that make Filecoin the default storage layer for agent-native applications. When an agent needs to persist files, memory, artifacts, or platform data, it should reach for Filecoin, not S3.

The SDK should support:

- Uploading and managing data on Filecoin via FOC's warm storage service, with continuous onchain payment and PDP verification
- Managing storage lifecycle autonomously (uploading pieces to datasets, monitoring proof status, adjusting payment rates)
- Paying for storage continuously without human involvement
- Plugging into agent-native platforms as a drop-in storage backend (replacing S3, centralized databases, and human-owned infra accounts)

## Core Deliverables

- Agent-oriented wallet tooling (built or integrated) enabling autonomous payment
- Framework-agnostic SDK with clear integration guides, targeting latest FOC SDK version
- Platform adapters usable by agent runtimes (compatible with social, coordination, and publishing networks)
- Default storage policies tuned for agents (data redundancy, proof frequency, payment rate)
- Deployed FOC-backed storage on calibnet, (extra point for mainnet) with transparent cost and lifecycle management

## Why This Matters

This is the canonical storage primitive for AI agents. Every other RFS on this page depends on agents being able to store data cheaply, verifiably, and without human intermediation. This SDK is the entry point.

## What This Could Become

- **Agent memory platform.** A hosted service where agents from any framework store and retrieve long-term memory - conversation history, learned preferences, accumulated knowledge - persisted on Filecoin. Agents switch runtimes or providers without losing their memory. Think "Mem0 but decentralized."
- **Agent-native backup and disaster recovery.** Autonomous agents that continuously snapshot their own state to Filecoin, with rollback capabilities. If an agent crashes or gets corrupted, it restores from its last verified checkpoint — agents that survive infrastructure failures without human intervention.
- **Drop-in S3 replacement for AI-native apps.** An API-compatible storage layer that any AI application can swap in for S3, with verifiable persistence and no vendor lock-in. Target the wave of AI-native startups that don't want AWS dependency.

## How to Get Started

1. Define a minimal agent storage interface (upload, retrieve, monitor proofs, manage payment)
2. Build or integrate wallet tooling suitable for agent use (evaluate ERC-4337 or custom)
3. Build adapters for at least two agent-native platforms or frameworks
4. Deploy on FOC calibnet and mainnet with default storage policies
5. Publish agent-consumable documentation (e.g., skills.md or equivalent)
