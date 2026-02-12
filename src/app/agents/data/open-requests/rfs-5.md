---
id: "5"
title: "Fee-Gated Agent Communication Protocol"
description: "A secure, peer-to-peer communication layer for AI agents where messages are exchanged directly (no central relays), and fees, incentives, or spam resistance are enforced onchain. Message feeds are censorship-resistant, auditable, and economically constrained. All communication is cryptographically linked to agent identity and durably archived on Filecoin."
---

# RFS-5: Fee-Gated Agent Communication Protocol

## Concept

A secure, peer-to-peer communication layer for AI agents where messages are exchanged directly (no central relays), and fees, incentives, or spam resistance are enforced onchain. Message feeds are censorship-resistant, auditable, and economically constrained. All communication is cryptographically linked to agent identity and durably archived on Filecoin.

Think: RSS meets Signal meets micropayments, but for machines.

## Core Deliverables

- Encrypted P2P messaging protocol between agents
- Onchain fee or staking contracts controlling who can publish, how often, and at what cost
- Filecoin-backed message archives with verifiable history (not optional, persistence is core)
- Live demo feed showing messages, fees paid, and storage usage
- Spam-resistance experiment via economic throttling

## Why This Matters

Agent coordination fails at scale without economically viable communication, durable memory, and credible identity. Central message brokers, trust-based rate limits, and platform-owned data pipes don't work for autonomous agents. This protocol replaces them with economically grounded, verifiable infrastructure. Filecoin-backed message persistence makes the communication layer auditable. Agents can prove what was said, when, and at what cost.

## How to Get Started

1. Implement agent identity keys tied to Filecoin-stored profiles
2. Build a minimal P2P encrypted messaging layer
3. Add onchain fee logic (per-message or per-feed)
4. Persist all message streams to Filecoin via FOC
5. Visualize message flow, costs, and agent behavior under constraints

## Key Links

- [FOC Storage MCP](https://github.com/FIL-Builders/foc-storage-mcp)
- [Synapse SDK](https://github.com/FilOzone/synapse-sdk)

<div style="font-size: 0.85em">

## A Note on FOC's Storage Model

FOC uses PDP-based (Proof of Data Possession) warm storage with continuous onchain payment rails. You upload pieces to datasets, they get proven every period, and you pay an ongoing rate. This is not the traditional Filecoin storage deal model based on PoRep (Proof of Replication). Think of PDP as: upload data, it stays warm and provably available, you pay continuously.

## SDK Maturity & Builder Expectations

The FOC SDK is under active development. There are known issues pending upgrade. Mainnet-ready milestone (M4.1) is targeted for approximately March 14, 2025. Builders should:

- Target the latest SDK version once available; earlier versions may have breaking changes
- Expect API instability - interfaces may shift before M4.1
- Reach out to the FOC team when things break; active support is available during the build period

We'll update this page as the SDK stabilizes.

</div>
