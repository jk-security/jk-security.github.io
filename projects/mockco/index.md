---
layout: page
title: MockCo
subtitle: Synthetic Enterprise Architecture and Security Engineering Lab
status: Active
toc: true
permalink: /projects/mockco/
---

MockCo is a synthetic health-insurance enterprise I use to practice secure architecture, security-tool development, sensitive-data protection, and enterprise application design.

The project is intentionally architecture-first. Working software matters, but the primary objective is to reason clearly about trust boundaries, data movement, failure modes, operational evidence, and the security consequences of design choices before those choices become difficult to reverse.

{% include page-toc.html %}

## Operational Purpose

MockCo provides a realistic system in which security decisions have architectural consequences.

The environment is designed to force questions such as:

- Which services should be internet-facing?
- Where should sensitive data be decrypted?
- Which systems should be allowed to persist plaintext?
- How should external security data become trusted operational state?
- How should services cross network and identity boundaries?
- What evidence is required to explain a security decision later?
- Which failures should be contained locally, and which require recovery across systems?

Health insurance is a useful fictional domain because the workflows are understandable while the data is sensitive enough to make weak architecture visible.

The domain naturally introduces identity, claims, coverage, protected health information, document handling, recovery, audit, and security-operations concerns without depending on proprietary business context.

## Enterprise Architecture

MockCo is organized around explicit trust zones rather than a flat application network.

<figure class="architecture-figure architecture-figure--wide">
  <a
    href="/assets/diagrams/mockco-enterprise-overview.png"
    target="_blank"
    rel="noopener"
    aria-label="Open the MockCo enterprise architecture diagram at full resolution"
  >
    <img
      src="/assets/diagrams/mockco-enterprise-overview.png"
      alt="MockCo enterprise architecture showing the Member Portal and SecApp across Internet, DMZ, Production, and Crown-Jewel trust zones."
    >
  </a>
  <figcaption>
    MockCo enterprise architecture showing the Member Portal and SecApp across Internet, DMZ, Production, and Crown-Jewel trust zones. Select the diagram to open the full-resolution image.
  </figcaption>
</figure>

The current zone model is:

```text
Internet
  -> DMZ
  -> Production
  -> Crown Jewel
```

Each boundary changes the assumptions a service may make about callers, data, and downstream authority.

The architecture is documented in more detail in the [MockCo architecture overview](/projects/mockco/architecture/).

## Current Systems

The public portfolio currently concentrates on the two most developed MockCo applications.

| System | Current focus | Case study |
|---|---|---|
| Member Portal | Protected member-data handling across Internet, DMZ, Production, and Crown-Jewel boundaries | [Member Portal](/projects/mockco/member-portal/) |
| SecApp | Promotion, normalization, correlation, and triage of vulnerability and endpoint data | [SecApp](/projects/mockco/security-operations-platform/) |

Additional service families remain planned or partially implemented, including identity and access, key management and recovery, simulated endpoints, service observability, and analytics.

The project is deliberately incremental. New systems are added when they create a useful architecture problem to solve rather than to make the environment appear larger.

## Member Portal

The Member Portal explores how a public application should handle highly sensitive member data while limiting the blast radius of intermediary-system or database compromise.

The design separates responsibilities across the trust zones:

```text
Browser
  -> DMZ presentation layer
  -> Production broker
  -> Crown-Jewel protected-data services
```

A central design principle is that highly sensitive records should remain encrypted through intermediary systems wherever practical.

The intended protected-data model uses:

- encrypted data bundles;
- wrapped data-encryption keys;
- explicit key metadata;
- controlled recovery grants;
- audited access and re-wrapping paths.

This creates deliberate tradeoffs. Endpoint compromise becomes more consequential for the affected user, recovery workflows become more important, analytics become harder, and troubleshooting requires better evidence.

Those costs are part of the design exercise. The objective is to understand what follows when breach-impact reduction and data minimization are treated as primary constraints.

## SecApp

SecApp explores a different systems problem: converting noisy or externally sourced security information into trusted, explainable operational state.

Representative inputs include:

```text
vulnerability intelligence
endpoint inventory
software observations
asset context
```

The important boundary is not simply ingestion. External or endpoint-originated data should not automatically become authoritative Production state.

The SecApp work therefore emphasizes:

- staging versus accepted state;
- normalization;
- promotion decisions;
- provenance;
- explainable correlation;
- audit context;
- analyst triage.

The resulting exposure-management model treats findings as derived operational state with enough source and decision context to explain why a finding exists.

## Core Design Principles

### Trust boundaries are load-bearing

Internet, DMZ, Production, and Crown-Jewel zones exist because different parts of the system have different exposure and authority.

Crossing a boundary should be an explicit design event, not an incidental network call.

### Sensitive data should move only when required

The architecture favors reducing plaintext exposure and avoiding convenience copies of sensitive records.

Where decryption is necessary, the design should make the decryption boundary and the actor receiving plaintext obvious.

### External data is not trusted state

Security telemetry, vulnerability intelligence, and endpoint observations require validation and promotion before they are treated as accepted operational truth.

### Evidence is part of system behavior

Logs, provenance, promotion decisions, correlation context, and validation results are part of the system model because future operators need to reconstruct why the system reached a particular state.

### Failure behavior should be designed

A secure happy path is insufficient. MockCo is also used to reason about partial failure, stale state, unavailable dependencies, retries, recovery, and the difference between temporary and durable system state.

## Development Model

MockCo has evolved through several development methods, but the application architecture now carries forward rather than restarting with every change in tooling.

The current pattern is:

```text
Human Lead
  -> architecture and requirements
  -> bounded agent implementation
  -> validation
  -> Human Lead review
```

Concurrent AI coding agents operate through the separate [Agent Harness](/projects/agentic-development/agent-harness/) workstream.

That harness defines agent scope, working-copy isolation, stop conditions, validation expectations, Git authority, and Human Lead decision boundaries.

[LogQ](/projects/agentic-development/logq/) provides structured telemetry for the agentic development process. It is intentionally separate from future observability for the MockCo applications themselves.

## Public Artifact Model

The portfolio is not a mirror of every working file in the development repository.

Public MockCo artifacts are selected to show:

- architectural intent;
- trust-boundary reasoning;
- data-flow decisions;
- implementation evidence;
- operational tradeoffs;
- limitations and deferred work.

Working implementation prompts, raw agent telemetry, incomplete scaffolding, noisy design alternatives, and security-sensitive details may remain outside the public site.

The objective is to make the reasoning and implemented behavior reviewable without publishing every intermediate artifact.

## Current Boundaries and Tradeoffs

MockCo remains an active engineering lab rather than a finished enterprise platform.

Current limitations include:

- only a subset of the intended application families has substantial implementation depth;
- identity, recovery, observability, and analytics remain incomplete;
- several target-state designs intentionally precede their full implementation;
- the Member Portal's browser-side key handling remains deferred;
- SecApp continues to evolve from ingestion and promotion foundations toward broader exposure-management workflows;
- operational behavior is demonstrated selectively rather than through production-scale load or availability targets;
- agentic-development observability through LogQ should not be confused with application observability for MockCo services.

These boundaries are useful because they keep architectural claims tied to the actual maturity of the system.

---

## Next Milestone
{: .toc-ignore }

The next MockCo milestones are application-specific rather than another repository-wide rebuild.

For the Member Portal, the important remaining work is to continue closing the gap between the protected-envelope architecture and complete endpoint authorization and key-handling behavior.

For SecApp, the next work is to deepen the exposure-management path from accepted inputs through correlation, triage, and explainable operational findings.

The broader MockCo environment can then expand around those systems where a new service introduces a concrete architecture problem worth exercising.

## My Contribution
{: .toc-ignore }

I use MockCo as the primary architecture and implementation lab for the technical residency.

My role is to define the system boundaries, security requirements, technical specifications, threat and failure assumptions, validation expectations, and integration decisions. AI coding agents perform substantial implementation work inside those boundaries, while I retain architectural, security, review, and publication authority.

The project is therefore both a systems-engineering exercise and a practical test of how technical leadership changes when implementation throughput increasingly comes from autonomous tools.

## Related Pages
{: .toc-ignore }

- [MockCo Architecture](/projects/mockco/architecture/)
- [Member Portal](/projects/mockco/member-portal/)
- [SecApp](/projects/mockco/security-operations-platform/)
- [Agent Harness](/projects/agentic-development/agent-harness/)
- [LogQ](/projects/agentic-development/logq/)