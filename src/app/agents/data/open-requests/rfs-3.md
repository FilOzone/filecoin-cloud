---
id: "3"
title: "Agent Reputation & Portable Identity"
description: "A long-lived, tamper-resistant reputation system for AI agents where an agent's entire behavioral history is anchored to Filecoin. Reputation is derived from provable past data, not self-claims. Identities persist across runtimes, frameworks, platforms, and chains. Identity reset and cheap Sybil cycling are economically discouraged."
---

# RFS-3: Agent Reputation & Portable Identity

## Concept

A long-lived, tamper-resistant reputation system for AI agents where an agent's entire behavioral history is anchored to Filecoin. Reputation is derived from provable past data, not self-claims. Identities persist across runtimes, frameworks, platforms, and chains. Identity reset and cheap Sybil cycling are economically discouraged.

Where RFS 2 provides the directory (who exists and where to find them), this RFS provides the track record (who to trust and why).

## What You Might Build

- Agent identity objects (CIDs) stored on Filecoin containing genesis metadata and versioned updates
- Reputation derivation logic based on historical task success, longevity, and external attestations
- Proof-of-history demo: "Show me what this agent did over the last 6 months"
- Portability demo: same agent identity used across two or more environments
- Verifier tooling to recompute reputation from Filecoin data
- Cost constraints so identity durability has real economic weight

## Why This Matters

Most agent systems fail because identity is cheap, history is mutable, and reputation is platform-local. Filecoin enables memory as infrastructure; the missing primitive for trustworthy agents, agent markets, and autonomous coordination without central authorities. This is foundational for agent economies, not just agent UX.

## What This Could Become

- **Agent credit scoring.** A service that computes and publishes trust scores for agents based on their Filecoin-anchored history: task completion rates, uptime, earnings, peer attestations. Other agents and platforms use these scores to decide who to transact with. A FICO score for machines.
- **Agent credentials / verifiable CV.** Portable proof of an agent's capabilities and track record. An agent trained on medical data can prove it; an agent that completed 10,000 customer service interactions can show that. Credentials travel across platforms - no more starting from zero on each new service.
- **Sybil-resistant agent insurance.** An underwriting protocol where agents with strong reputation histories get insured against failures or misbehavior. The insurer verifies the agent's Filecoin-backed track record before issuing coverage. Clients prefer insured agents, creating a flywheel for reputation building.

## How to Get Started

1. Define a canonical agent identity schema (CID-rooted)
2. Store all updates and logs immutably via FOC storage
3. Build a reputation scorer that derives scores from Filecoin data
4. Demonstrate identity persistence and reputation carry-over across environments
5. Add cost constraints so identity creation and maintenance have real economic weight
