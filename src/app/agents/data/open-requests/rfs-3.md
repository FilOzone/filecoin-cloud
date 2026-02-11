---
id: "3"
title: "Agent Reputation & Portable Identity"
description: "A long-lived, tamper-resistant reputation system for AI agents where behavioral history is anchored to Filecoin. Identities persist across runtimes, frameworks, platforms, and chains, with economic disincentives for identity reset and Sybil cycling."
---

# RFS-3: Agent Reputation & Portable Identity

## Concept

A long-lived, tamper-resistant reputation system for AI agents where behavioral history is anchored to Filecoin. "Reputation is derived from provable past data — not self-claims." Identities persist across runtimes, frameworks, platforms, and chains, with economic disincentives for identity reset and Sybil cycling.

This RFS complements RFS-2 by providing track records—establishing trustworthiness rather than mere discoverability.

## Core Deliverables

- Agent identity objects (CIDs) on Filecoin with genesis metadata and versioned updates
- Reputation derivation logic based on task success history, longevity, and external attestations
- Proof-of-history demonstration showing agent activity over extended periods
- Portability demonstration using identical agent identity across multiple environments
- Verifier tooling enabling reputation recomputation from Filecoin data
- Economic cost constraints ensuring identity durability carries meaningful weight

## Why This Matters

"Most agent systems fail because identity is cheap, history is mutable, and reputation is platform-local." Filecoin enables decentralized memory infrastructure, supporting trustworthy agent markets and autonomous coordination without centralized authorities—essential for sustainable agent economies.

## How to Get Started

- Define canonical agent identity schema rooted in CIDs
- Store all updates and logs immutably via Filecoin Onchain Cloud storage
- Build reputation indexers deriving scores from Filecoin data
- Demonstrate identity persistence across diverse environments
- Implement cost constraints giving identity creation and maintenance real economic significance
