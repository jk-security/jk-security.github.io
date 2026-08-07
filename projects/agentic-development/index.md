---
layout: page
title: Agentic Development Systems
subtitle: Governed AI-Assisted Development and Observability
permalink: /projects/agentic-development/
---

Agentic Development Systems is a collection of engineering work focused on making AI-assisted software development more autonomous, observable, and reviewable.

The work treats agentic development as a systems problem. Coding agents need explicit authority, scope, validation requirements, and stop conditions, but those controls also need measurable evidence so they can be strengthened, simplified, or removed based on observed behavior rather than assumption.

The current collection centers on two related systems:

## Agent Harness

[Agent Harness](/projects/agentic-development/agent-harness/) defines the operating model for governed multi-agent development.

It establishes:

- agent roles and work allocation;
- bounded implementation authority;
- validation and evidence requirements;
- stop and escalation conditions;
- Git and publication authority;
- Human Lead control over architecture, risk, and final acceptance.

The Harness has evolved through several iterations as stronger agents and practical experience have reduced the need for some of the heavier controls used in earlier versions.

[Read the Agent Harness case study](/projects/agentic-development/agent-harness/)

## LogQ

[LogQ](/projects/agentic-development/logq/) is the observability system for measuring how coding agents actually behave across development runs.

It records structured lifecycle, workflow, validation, intervention, and completion telemetry so that agent behavior can be evaluated from operational evidence rather than only retrospective summaries.

LogQ is a core component of the broader agentic-development work because it provides the evidence needed to determine whether Agent Harness controls are effective, where failures occur, and where agent autonomy can safely increase.

[Read the LogQ case study](/projects/agentic-development/logq/)

## How the Systems Fit Together

Agent Harness and LogQ address different sides of the same operating problem.

```text
Agent Harness
  -> defines expected authority, workflow, validation, and stop conditions
  ->
AI coding agents perform development work
  ->
LogQ
  -> records observed lifecycle, workflow, validation, and intervention behavior
  ->
review and measurement
  -> informs changes to the operating model
```

The Harness defines the control model.

LogQ provides evidence about how that model behaves in practice.

The longer-term objective is to use observed agent behavior to reduce unnecessary governance while preserving the controls that materially improve security, correctness, reviewability, and architectural coherence.

## Relationship to MockCo

MockCo is the primary systems lab in which much of this operating model is exercised.

The Member Portal and SecApp create architecture and implementation work that crosses trust boundaries, persistence models, authorization decisions, sensitive-data handling, and distributed-system failure modes.

That makes MockCo a useful environment for testing whether coding agents can take on increasingly substantial implementation work without the Human Lead losing architectural visibility or control.

[Explore the MockCo systems](/projects/mockco/)

## Future Systems

This collection is intended to expand as the agentic-development environment evolves.

Future work may include additional systems for:

- agent orchestration;
- scheduling and work allocation;
- automated validation;
- policy enforcement;
- telemetry analysis;
- derived metrics and reporting;
- replay and retrospective analysis;
- model or agent performance comparison;
- development-environment isolation.

Detailed architecture, evidence, implementation state, and technical decisions will remain on the individual system pages rather than being duplicated here.