---
layout: page
title: MockCo
permalink: /projects/mockco/
---


## "MockCo" Architecture Lab

MockCo is a synthetic health-insurance enterprise used to practice secure architecture, development of internal security tooling, creation of sensitive-data protection processes, and enterprise application design.

The project is intentionally architecture-first. The goal is not only to build working applications, but to understand why certain design choices matter: where trust boundaries belong, how sensitive data should move between systems, when data should not move at all, and how security tooling should convert noisy external inputs into trusted operational state. As the focus is _not_ on development, this application is agentic-developed foremost (see the Project [Agentic Development Governance](/projects/agentic-development-governance.md/) for details).


### Applications & Goals

MockCo will likely include six to ten major applications or service families over time. The current public writeup focuses on the most developed design areas.

| Area                          | Current Status | Link | Concepts demonstrated |
|-------------------------------|----------------|------|-----------------------------------------------------------------------------------------------|
| Public Member Portal          | Designed  | [Member Portal](/projects/mockco/member-portal.md) | DMZ presentation, Production broker, Crown-Jewel encrypted storage, browser-side plaintext boundary|
| Security Operations Platform  | Designed  | [SecOps Platform](/projects/mockco/security-operations-platform.md) | Exposure management, endpoint inventory, vulnerability intelligence, Production-controlled correlation    |
| Identity and Access           | Planned   | | Account-user vs. member-subject separation, session control, step-up authentication, delegated access |
| Key Management and Recovery   | Planned   | | Wrapped DEKs, recovery grants, audited re-wrapping, no routine enterprise plaintext access |
| Observability Platform        | Planned   | | Service health, traceability, operational signals, failure-mode visibility |
| Simulated Endpoints           | Planned   | | Endpoint trust levels, software inventory collection, internal and external user behavior simulation |
| Analytics Platform   | Planned   | | Homomorphic encryption or related approaches for analytics on regulated data without plaintext exposure |


## Core Thesis

MockCo starts from a security-first architecture position:

> Breach impact reduction, data minimization, and trust-boundary discipline should be primary design constraints, not controls added after the application is already convenient to build.

- [Architecture](/projects/mockco/architecture/) — zone model, trust boundaries, current vs. target-state architecture, and design principles.

That creates deliberate friction. Some designs are more complex than a normal MVP. That is the point. MockCo explores what happens when sensitive-data protection, adversary impact analysis, auditability, and system boundaries are treated as load-bearing architecture rather than afterthoughts.

The strongest example is the Crown-Jewel data model. The intended architecture avoids storing convenience plaintext for highly sensitive member data, even in the Crown-Jewel database. Instead, protected data is modeled as encrypted bundles, wrapped data-encryption keys, key metadata, recovery grants, and audited access paths. The long-term goal is that a database dump alone should not expose the entire member population's sensitive records.

This creates other tradeoffs. A user endpoint that can decrypt its own data becomes a higher-value target for that user. Recovery and re-wrapping workflows become more important. Analytics become harder. But those are explicit tradeoffs, not accidental consequences.


## Why Health Insurance?

Health insurance is a useful fictional domain because it is understandable, but security-relevant.

A MockCo member portal naturally involves:

- identity and session management;
- personally identifiable information;
- protected health information;
- claims and coverage data;
- documents and uploads;
- billing and payment references;
- support and recovery workflows;
- strict expectations around audit, access control, and privacy.

The domain is complex enough to force serious architecture decisions without requiring the reader to understand an obscure business model.


## Version Model

MockCo has gone through multiple build iterations. These are labeled V0, V1, and V2.

The differences between versions are mostly about development method, governance, and rebuild strategy. Those details are covered more directly in the [Agentic Development Governance](/projects/agentic-development-governance.md/) project. On this page, the version history matters because repeated rebuilds have made the applications scope and architecture clearer.

### V0

V0 was the first build iteration. It used manual ChatGPT-assisted development: I worked directly in VS Code, used ChatGPT for code blocks, troubleshooting, design review, and implementation guidance, then made the changes myself.

This version got the furthest in some practical implementation areas. It helped establish the original MockCo concept and the two core applications: the public member portal and the internal security tooling platform (thought neither complete). This effort also did some initial work on an endpoint agent for collecting software inventory from 'nix and Window systems (basic install paths only), packaging these into cpe format for shipment to the inventory ingress for the SecOps platform.

### V1

V1 moved toward agentic development. I used multiple CLI-based Codex instances (LEFT and RIGHT - both 5.4mini, and UNBOUND - 5.4medium with fewer restrictions through governance files) working in parallel across different parts of the project.

This surfaced a different set of problems: 

1. Understanding of the specific applications and current application state began to slip as the agent "continued" development.
2. The need for metrics on agent performance surfaced ([Governance](/projects/agentic-development-governance.md/))
3. The working-copy seperation was needed.


### V2

V2 is the current rebuild direction. It is more deliberate and architecture-first.

The main shift is that MockCo is no longer treated as a single application repo. It is an enterprise lab with multiple zones, multiple services, supporting documentation, and explicit design decisions. The current direction is to make design intent clearer before implementation, especially where trust boundaries, data classification, encryption, and service-to-service flows are involved.

Devleopment in v2 is driven primarily by defined technical specification (work I've done iteratively, then formalized with ChatGPT). The spec is then passed to each agent (LEFT and RIGHT - each a more autonomous, by governance rules, version of UNBOUND from v1).

### Future Versions

There will likely be a V3. The shape is not yet defined, but we may move from Codex to other models with fewer restrictions.

The point of the version model is not to create product releases. It is to show how repeated rebuilds sharpen architecture, and improve my understanding of Agentic Governance. Each version should make the next version more deliberate.


## What This Project Is Meant To Achieve

MockCo is meant to improve design judgment.

The project should show that I can reason from:

- threat model to architecture;
- architecture to trust boundaries;
- trust boundaries to data flow;
- data flow to service responsibilities;
- service responsibilities to API and persistence choices;
- implementation choices back to operational and security tradeoffs.

For the Public Member Portal, the main design question is:

> How should a customer-facing application handle sensitive health-insurance data if the enterprise wants to minimize the blast radius of database compromise?

For the Security Operations Platform, the main design question is:

> How should internal security tooling convert external vulnerability intelligence and endpoint-originated inventory into trusted, explainable, auditable exposure findings?

Those are different problems. MockCo is useful because it contains both.

## Public / Private Artifact Model

Some MockCo design documents are working materials. They are useful for implementation planning and Codex sessions, but they are not necessarily polished public artifacts.

The public pages focus on:

- architectural intent;
- design reasoning;
- trust-boundary decisions;
- public-safe diagrams;
- selected implementation summaries;
- specific limitations and deferred questions.

The private or unpublished materials may include:

- rough generated design docs;
- implementation prompts;
- incomplete scaffolding;
- noisy design alternatives;
- security-sensitive implementation details;
- experimental agent instructions;
- artifacts that are useful for building but not useful for public review.

The public goal is not to expose every working file. The goal is to show reasoning quality and technical progression.

## Planned Public Diagrams

Planned diagrams include:

1. Enterprise zone model: Internet / DMZ / Production / Crown-Jewel, with internal user context where useful.
2. Member portal encrypted data flow: browser, DMZ portal, Production broker, Crown-Jewel encrypted store, wrapped DEK and key metadata handling.
3. Security Operations collection and correlation flow: endpoint inventory, vulnerability intelligence, DMZ staging, Production retrieval, normalization, correlation, and analyst triage.
4. Current vs. target-state application map: what exists in the most complete MockCo iteration versus the current design direction.