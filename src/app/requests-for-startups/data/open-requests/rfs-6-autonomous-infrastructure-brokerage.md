# RFS-6: Autonomous Infrastructure Brokerage

## Concept

This request proposes building "an agent-native procurement layer where agents negotiate, compare, and procure storage" on Filecoin. The vision centers on broker agents that autonomously handle deal management for other agents, covering price comparison, SLA negotiation, deal migration, and lifecycle oversight.

The brokerage agents themselves would need to utilize the broader stack, including identity systems, storage, communication protocols, and economic models referenced in other RFS proposals.

## Core Deliverables

The proposal expects:

- Broker agents capable of discovering and recommending storage deals
- Price comparison and SLA negotiation across providers
- Automated deal migration when better terms emerge
- An onchain fee or commission model
- Metrics dashboard tracking deals brokered, storage onboarded, and agent retention
- Minimum of 10 active client agents using the brokerage

## Why This Matters

The proposal argues that "human-driven sales don't scale for machine customers." If agents become the primary users of Filecoin storage, the distribution channel itself should be agent-driven. This RFS tests whether autonomous go-to-market can work and establishes infrastructure needed for broader agent economies.

## Getting Started

Builders should focus on evaluating FOC storage deals, creating a recommendation engine, automating deal creation and renewal, deploying onchain fee models, and measuring whether client agents achieve better terms than independent procurement.
