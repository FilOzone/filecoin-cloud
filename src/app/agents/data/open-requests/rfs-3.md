---
id: "3"
title: "Agent Reputation & Portable Identity"
description: "A long-lived, tamper-resistant reputation system for AI agents where an agent's entire behavioral history is anchored to Filecoin. Reputation is derived from provable past data, not self-claims. Identities persist across runtimes, frameworks, platforms, and chains. Identity reset and cheap Sybil cycling are economically discouraged."
---

# RFS-3: Agent Reputation & Portable Identity

## Concept

A long-lived, tamper-resistant reputation system for AI agents where an agent's entire behavioral history is anchored to Filecoin. Reputation is derived from provable past data, not self-claims. Identities persist across runtimes, frameworks, platforms, and chains. Identity reset and cheap Sybil cycling are economically discouraged.

Where RFS 2 provides the directory (who exists and where to find them), this RFS provides the track record (who to trust and why).

## Core Deliverables

- Agent identity objects (CIDs) stored on Filecoin containing genesis metadata and versioned updates
- Reputation derivation logic based on historical task success, longevity, and external attestations
- Proof-of-history demo: "Show me what this agent did over the last 6 months"
- Portability demo: same agent identity used across two or more environments
- Verifier tooling to recompute reputation from Filecoin data
- Cost constraints so identity durability has real economic weight

## Why This Matters

Most agent systems fail because identity is cheap, history is mutable, and reputation is platform-local. Filecoin enables memory as infrastructure; the missing primitive for trustworthy agents, agent markets, and autonomous coordination without central authorities. This is foundational for agent economies, not just agent UX.

## How to Get Started

1. Define a canonical agent identity schema (CID-rooted)
2. Store all updates and logs immutably via FOC storage
3. Build a reputation scorer that derives scores from Filecoin data
4. Demonstrate identity persistence and reputation carry-over across environments
5. Add cost constraints so identity creation and maintenance have real economic weight
