---
layout: page
title: MockCo
permalink: /projects/mockco/
---

## Secure Architecture Lab

MockCo is a synthetic health-insurance enterprise used to practice secure architecture, internal security tooling, sensitive-data protection, and enterprise application design.

The project is intentionally architecture-first. The goal is not only to build working applications, but to understand why certain design choices matter: where trust boundaries belong, how sensitive data should move between systems, when data should not move at all, and how security tooling should convert noisy external inputs into trusted operational state.

MockCo is also a long-running technical residency project. It is currently around 100 hours into an estimated 700-hour track. That means the project is far enough along to have stable architectural themes and design artifacts, but early enough that implementation details are expected to change across rebuilds.

## Current Focus

The current MockCo work is centered on three areas:

1. **Enterprise trust-boundary architecture** — Internet, DMZ, Production, and Crown-Jewel zones, with explicit rules about how data crosses boundaries.
2. **Public Member Portal** — a customer-facing healthcare/insurance portal that handles sensitive member data through a DMZ presentation tier, Production broker/backend, and Crown-Jewel protected data path.
3. **Security Operations Platform** — an internal exposure-management system that combines endpoint software inventory, vulnerability intelligence, DMZ staging, Production-controlled promotion, correlation, and analyst triage.

The project is not trying to be a polished SaaS demo. It is a design-and-build lab for security engineering judgment.

## Core Thesis

MockCo starts from a security-first architecture position:

> Breach impact reduction, data minimization, and trust-boundary discipline should be primary design constraints, not controls added after the application is already convenient to build.

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

## Current Public Pages

The deeper MockCo pages are split by design area:

- [Architecture](/projects/mockco/architecture/) — zone model, trust boundaries, current vs. target-state architecture, and design principles.
- [Member Portal](/projects/mockco/member-portal/) — sensitive-data path, encrypted bundle model, browser-side plaintext boundary, and deferred identity/recovery questions.
- [Security Operations Platform](/projects/mockco/security-operations-platform/) — internal exposure management, vulnerability intelligence, endpoint inventory, DMZ staging, Production promotion, correlation, and analyst triage.

## Application Map

MockCo will likely include six to ten major applications or service families over time. The current public writeup focuses on the most developed design areas.

| Area | Current status | Concepts demonstrated |
|---|---|---|
| Public Member Portal | Designed; partially prototyped across rebuilds | DMZ presentation, Production broker, Crown-Jewel encrypted storage, browser-side plaintext boundary |
| Security Operations Platform | Designed; core architecture defined | Exposure management, endpoint inventory, vulnerability intelligence, Production-controlled correlation |
| Identity and Access | Planned / deferred | Account-user vs. member-subject separation, session control, step-up authentication, delegated access |
| Key Management and Recovery | Conceptual design direction | Wrapped DEKs, recovery grants, audited re-wrapping, no routine enterprise plaintext access |
| Observability Platform | Planned | Service health, traceability, operational signals, failure-mode visibility |
| Simulated Endpoints | Planned / partial | Endpoint trust levels, software inventory collection, internal and external user behavior simulation |
| Cloud / GCP Deployment | Planned | VPC design, infrastructure as code, segmented deployment, cloud-native trust boundaries |
| Privacy-Preserving Analytics | Research direction | Homomorphic encryption or related approaches for analytics without broad plaintext exposure |

## Version Model

MockCo has gone through multiple build iterations. These are labeled V0, V1, and V2.

The differences between versions are mostly about development method, governance, and rebuild strategy. Those details are covered more directly in the Agentic Development Governance project. On this page, the version history matters because repeated rebuilds have made the architecture clearer.

### V0

V0 was the first build iteration. It used manual ChatGPT-assisted development: I worked directly in VS Code, used ChatGPT for code blocks, troubleshooting, design review, and implementation guidance, then made the changes myself.

This version got the furthest in some practical implementation areas. It helped establish the original MockCo concept and the two core applications: the public member portal and the internal security tooling platform.

### V1

V1 moved toward agentic development. I used multiple CLI-based Codex instances working in parallel across different parts of the project.

This surfaced a different class of problem: the project needed stronger governance, clearer scope boundaries, safer working-copy separation, and more explicit architecture guardrails. The architectural concept improved, but the development model also became part of the learning exercise.

### V2

V2 is the current rebuild direction. It is more deliberate and architecture-first.

The main shift is that MockCo is no longer treated as a single application repo. It is an enterprise lab with multiple zones, multiple services, supporting documentation, and explicit design decisions. The current direction is to make design intent clearer before implementation, especially where trust boundaries, data classification, encryption, and service-to-service flows are involved.

### Future Versions

There will likely be a V3. The shape is not yet defined.

The point of the version model is not to create product releases. It is to show how repeated rebuilds sharpen architecture. Each version should make the next version more deliberate.

## Design Status Model

MockCo is incomplete, but that should not be used as a vague excuse. Each area should be described according to its actual state.

| Status | Meaning |
|---|---|
| Implemented / prototyped | Exists in some working form in one or more MockCo iterations. |
| Designed | Has a concrete architecture or design document, but may not be fully implemented. |
| Active rebuild | Being redesigned or rebuilt across MockCo versions. |
| Deferred | Intentionally postponed, with a specific reason. |
| Research direction | Worth exploring, but not yet a committed implementation path. |

The goal is to make the boundary of current understanding visible. A reader should be able to tell what is implemented, what is designed, what is speculative, and what is deliberately deferred.

## What This Project Is Meant To Demonstrate

MockCo is meant to demonstrate design judgment.

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

## Disclaimer

MockCo is a synthetic lab environment. It does not contain real PHI, PII, secrets, credentials, private keys, plaintext DEKs, or production-like key material.

Where the project resembles enterprise healthcare or insurance systems, those examples are fictionalized and intentionally generalized.