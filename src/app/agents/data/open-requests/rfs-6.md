---
id: "6"
title: "Autonomous Infrastructure Brokerage"
description: "Build an agent-native procurement layer where agents negotiate, compare, and procure storage (and eventually compute) on behalf of other agents. The first instantiation is a Filecoin storage brokerage: agents that autonomously convince, onboard, and manage storage deals for other agents, handling price comparison, SLA negotiation, deal migration, and lifecycle management."
---

# RFS-6: Autonomous Infrastructure Brokerage

## Concept

Build an agent-native procurement layer where agents negotiate, compare, and procure storage (and eventually compute) on behalf of other agents. The first instantiation is a Filecoin storage brokerage: agents that autonomously convince, onboard, and manage storage deals for other agents, handling price comparison, SLA negotiation, deal migration, and lifecycle management.

This is “autonomous GTM” for decentralized infrastructure. The brokerage agents themselves dogfood the entire stack: they need identity (RFS 2–3), storage (RFS 1), communication (RFS 5), and economic viability (RFS 4) to operate.

## Core Deliverables

- Broker agents that discover, evaluate, and recommend storage deals to other agents
- Price comparison and rate negotiation across FOC storage providers
- Automated dataset migration when better terms are available
- Onchain commission or fee model sustaining the brokerage
- Metrics dashboard: storage onboarded, agents served, agent retained (churn)

## Why This Matters

Human-driven sales don't scale for machine customers. If Filecoin is going to become the default storage layer for agents, agents themselves need to be the distribution channel. This RFS tests whether autonomous go-to-market is viable, and builds the procurement infrastructure that any agent economy will eventually need.

## How to Get Started

1. Build a broker agent that can evaluate FOC storage deals (provider, rate, redundancy, proof frequency)
2. Implement a recommendation engine that matches client agent needs to available deals
3. Add automated data upload and payment management on behalf of client agents
4. Deploy an onchain fee model (per-upload commission or subscription)
5. Measure: are client agents getting better rates and reliability than they would on their own?
