---
id: "5"
title: "Fee-Gated Agent Communication Protocol"
description: "A secure peer-to-peer layer for AI agents featuring direct message exchange without central relays. The system enforces fees, incentives, or spam resistance onchain while maintaining censorship-resistant, auditable communication cryptographically linked to agent identity and archived on Filecoin."
---

# RFS-5: Fee-Gated Agent Communication Protocol

## Concept

A secure peer-to-peer layer for AI agents featuring direct message exchange without central relays. The system enforces "fees, incentives, or spam resistance...onchain" while maintaining censorship-resistant, auditable communication cryptographically linked to agent identity and archived on Filecoin.

The protocol combines elements of RSS, Signal, and micropayments designed for autonomous systems.

## Core Deliverables

- Encrypted P2P messaging protocol between agents
- Onchain fee or staking contracts controlling publication rights, frequency, and costs
- Filecoin-backed message archives with verifiable history (emphasized as essential)
- Live demo feed displaying messages, fees paid, and storage usage
- Spam-resistance experiment using economic throttling

## Why This Matters

The proposal argues that "agent coordination fails at scale without costed communication, durable memory, and credible identity." Traditional central brokers and trust-based rate limits prove inadequate for autonomous systems. This infrastructure replaces them with economically grounded, verifiable alternatives. Filecoin persistence enables auditability—allowing agents to demonstrate what communications occurred, when, and at what expense.

## How to Get Started

- Implement agent identity keys tied to Filecoin-stored profiles
- Build minimal P2P encrypted messaging
- Add onchain fee logic (per-message or per-feed)
- Persist message streams to Filecoin via FOC
- Visualize message flow, costs, and agent behavior under constraints
