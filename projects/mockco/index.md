---
layout: page
title: MockCo
permalink: /projects/mockco/
---

## MockCo Architecture Lab

MockCo is a synthetic health-insurance enterprise used to practice secure architecture, internal security-tool development, sensitive-data protection, and enterprise application design.

The project is intentionally architecture-first. The goal is not only to build working applications, but to understand why particular design choices matter:

- where trust boundaries belong;
- how sensitive data should move between systems;
- when sensitive data should not move at all;
- how public-facing and internal services should be separated;
- how security tooling should convert noisy external inputs into trusted operational state.

Application development is performed primarily through Codex agents so that I can focus more of my own effort on architecture, requirements, security decisions, testing strategy, and review.

The operating model for that work is documented separately in [Agentic Development Operating Model](/projects/agentic-development-governance/).

## Applications and Goals

MockCo will likely include six to ten major applications or service families over time. The current public writeup focuses on the most developed design areas.

| Area | Current status | Link | Concepts demonstrated |
|---|---|---|---|
| Public Member Portal | In development | [Member Portal](/projects/mockco/member-portal/) | DMZ presentation, Production broker, Crown-Jewel encrypted storage, browser-side plaintext boundary |
| Security Operations Platform | In development | [Security Operations Platform](/projects/mockco/security-operations-platform/) | Exposure management, endpoint inventory, vulnerability intelligence, Production-controlled correlation |
| Identity and Access | Planned | | Account-user versus member-subject separation, session control, step-up authentication, delegated access |
| Key Management and Recovery | Planned | | Wrapped DEKs, recovery grants, audited re-wrapping, no routine enterprise plaintext access |
| Observability Platform | Planned | | Service health, traceability, operational signals, failure-mode visibility |
| Simulated Endpoints | Partially implemented | | Endpoint trust levels, software inventory collection, internal and external user behavior simulation |
| Analytics Platform | Planned | | Homomorphic encryption or related approaches for analytics on regulated data without routine plaintext exposure |

## Core Thesis

MockCo starts from a security-first architecture position:

> Breach-impact reduction, data minimization, and trust-boundary discipline should be primary design constraints, not controls added after the application is already convenient to build.

See the [MockCo architecture overview](/projects/mockco/architecture/) for the zone model, trust boundaries, current-state architecture, target-state architecture, and design principles.

This creates deliberate friction. Some designs are more complex than a normal minimum viable product. That is intentional.

MockCo explores what happens when:

- sensitive-data protection;
- adversary impact analysis;
- auditability;
- system boundaries;
- recovery behavior;
- operational evidence;

are treated as load-bearing parts of the architecture rather than controls added later.

The strongest example is the Crown-Jewel data model.

The intended architecture avoids storing convenience plaintext for highly sensitive member data, even in the Crown-Jewel database. Instead, protected data is modeled through:

- encrypted data bundles;
- wrapped data-encryption keys;
- key metadata;
- recovery grants;
- audited access paths.

The long-term objective is that a database dump alone should not expose the entire member population's sensitive records.

That design creates other tradeoffs:

- a user endpoint that can decrypt its own data becomes a higher-value target for that user;
- recovery and key re-wrapping workflows become more important;
- analytics become harder;
- operational troubleshooting requires more deliberate evidence.

Those are explicit tradeoffs, not accidental consequences.

## Why Health Insurance?

Health insurance is a useful fictional domain because it is understandable while still forcing security-relevant decisions.

A MockCo member portal naturally involves:

- identity and session management;
- personally identifiable information;
- protected health information;
- claims and coverage data;
- documents and uploads;
- billing and payment references;
- support and recovery workflows;
- strict expectations around audit, access control, and privacy.

The domain is complex enough to require serious architecture decisions without requiring the reader to understand an obscure business model.

## Version Model

MockCo has gone through several development iterations: V0, V1, V2, and V3.

The versions are not traditional product releases. They represent changes in development method, repository structure, agent operating model, and architectural maturity.

The agent-specific changes are covered more directly in [Agentic Development Operating Model](/projects/agentic-development-governance/).

### V0 — Manual ChatGPT-Assisted Development

V0 was the first build iteration.

I worked directly in Visual Studio Code and used ChatGPT for:

- code generation;
- troubleshooting;
- design review;
- implementation guidance;
- explanation of unfamiliar technologies.

I applied and validated all changes manually.

This version progressed furthest in some early implementation areas and helped establish the two primary MockCo applications:

1. the Public Member Portal;
2. the internal Security Operations Platform.

Neither application was complete.

V0 also included initial work on an endpoint agent for collecting software inventory from Linux and Windows systems, normalizing records toward CPE-style identities, and sending inventory to the Security Operations Platform ingress.

### V1 — Concurrent Codex Agents

V1 moved from chat-assisted development to direct agentic development.

I used three CLI-based Codex instances working in parallel:

| Instance | Role |
|---|---|
| LEFT | Bounded development agent |
| RIGHT | Bounded development agent |
| UNBOUND | More autonomous development agent |

LEFT and RIGHT used smaller models with tighter scope controls. UNBOUND used a stronger model with broader authority to select and implement coherent work slices.

This surfaced several practical problems:

1. My understanding of the exact application state began to slip as agents continued development independently.
2. Agent work needed clearer evidence, metrics, and retrospective review.
3. Separate working copies were necessary to prevent concurrent agents from interfering with each other.
4. The governance model was more restrictive and complex than the agents appeared to require.
5. Rebuilding the project from the beginning consumed effort that did not always improve the application architecture.

V1 demonstrated that concurrent agents could move a solo development project forward, but it also showed that agent throughput is not useful when the Human Lead loses architectural context.

### V2 — Architecture-First Rebuild

V2 rebuilt MockCo around a more deliberate architecture-first model.

The main shift was that MockCo was no longer treated as a single application repository. It became an enterprise lab with:

- explicit network zones;
- multiple applications and services;
- supporting infrastructure;
- architecture documentation;
- design records;
- trust-boundary definitions;
- data-classification expectations;
- agent operating instructions.

Development in V2 was driven primarily by written technical specifications.

The general flow became:

```text
Human Lead develops architecture and requirements
    ->
Specification is formalized with ChatGPT
    ->
LEFT or RIGHT implements an approved slice
    ->
Agent validates and reports
    ->
Human Lead reviews and integrates
```

The Public Member Portal and Security Operations Platform were developed as separate workstreams, with each Codex instance operating in a separate working copy.

V2 also simplified the agent model by removing the standing UNBOUND instance and making LEFT and RIGHT more autonomous.

### V3 — Continue Development with LogQ Observability

V3 does not restart MockCo.

Unlike the transitions from V0 to V1 and from V1 to V2, the application architecture and current implementation state carry forward. V3 picks up the existing Public Member Portal and Security Operations Platform work where V2 left off.

The primary V3 change is to the agent operating environment rather than the MockCo application architecture.

V3 introduces **LogQ**, a local event-stream logging process for Codex activity.

```text
Codex agent
    ->
LogQ emitter
    ->
Unix datagram socket
    ->
LogQ collector
    ->
open JSONL event segment
    ->
closed JSONL event segment
    ->
future parser and analytics
```

This replaces the V2 model where LEFT and RIGHT wrote human-readable Markdown logs into separate log roots.

The purpose is to capture structured evidence about:

- agent identity;
- work lane;
- selected workflow;
- run lifecycle;
- validation results;
- human intervention;
- failure and completion states.

LogQ is not an application observability platform for MockCo services. It is observability for the agentic development process itself.

The expected benefit is that agent behavior can later be measured without adding more manual reporting or restarting the application project.

V3 should help answer questions such as:

- How often do agents complete assigned work successfully?
- Which workflows create the most rework?
- How frequently do agents require Human Lead intervention?
- Which validation commands fail most often?
- How much useful work is produced per agent session?
- Where can governance or reporting requirements be reduced safely?

The V3 development objective remains unchanged:

> Continue building MockCo from its current state while improving the evidence available about how the agents perform the work.

## What This Project Is Meant to Achieve

MockCo is intended to improve architecture and engineering judgment.

The project should demonstrate that I can reason from:

```text
threat model
    ->
architecture
    ->
trust boundaries
    ->
data flow
    ->
service responsibilities
    ->
API and persistence choices
    ->
operational and security tradeoffs
```

It should also demonstrate the reverse path:

```text
implementation behavior
    ->
operational evidence
    ->
security consequence
    ->
architecture review
    ->
design correction
```

For the Public Member Portal, the main design question is:

> How should a customer-facing application handle sensitive health-insurance data if the enterprise wants to minimize the blast radius of database compromise?

For the Security Operations Platform, the main design question is:

> How should internal security tooling convert external vulnerability intelligence and endpoint-originated inventory into trusted, explainable, and auditable exposure findings?

These are different problems.

The Public Member Portal emphasizes protection of sensitive customer data and controlled decryption boundaries.

The Security Operations Platform emphasizes normalization, correlation, trust establishment, explainability, and analyst workflows.

MockCo is useful because it contains both.

## Public and Private Artifact Model

Some MockCo design documents are working materials. They are useful for implementation planning and Codex sessions, but they are not necessarily polished public artifacts.

The public pages focus on:

- architectural intent;
- design reasoning;
- trust-boundary decisions;
- public-safe diagrams;
- selected implementation summaries;
- specific limitations;
- deferred questions;
- lessons from agentic development.

Private or unpublished materials may include:

- rough generated design documents;
- implementation prompts;
- incomplete scaffolding;
- noisy design alternatives;
- security-sensitive implementation details;
- experimental agent instructions;
- raw LogQ event streams;
- artifacts useful for building but not useful for public review.

The goal is not to expose every working file.

The goal is to show reasoning quality, technical progression, and the relationship between architecture intent and implementation.

## Planned Public Diagrams

Planned diagrams include:

1. **Enterprise zone model** — Internet, DMZ, Production, and Crown-Jewel zones, with internal-user context where useful.
2. **Member Portal encrypted data flow** — browser, DMZ portal, Production broker, Crown-Jewel encrypted store, wrapped DEK, and key-metadata handling.
3. **Security Operations collection and correlation flow** — endpoint inventory, vulnerability intelligence, DMZ staging, Production retrieval, normalization, correlation, and analyst triage.
4. **Current versus target-state application map** — what exists today compared with the intended long-term MockCo environment.
5. **Agentic development relationship** — Human Lead, LEFT and RIGHT working copies, Git review boundary, and LogQ agent-event flow.