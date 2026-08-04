---
layout: page
title: SecApp
subtitle: Security Operations and Exposure Management Platform
status: Work in progress
toc: true
permalink: /projects/mockco/security-operations-platform/
---

SecApp is MockCo's end-to-end exposure-management platform. It brings together endpoint inventory, vulnerability intelligence, trust-boundary controls, durable data processing, correlation, prioritization, and analyst workflow in one distributed application.

The project explores how security tooling should operate across multiple zones and service boundaries: externally influenced data enters through the DMZ, Production establishes trusted operational state, and analysts receive a simplified view of the resulting exposure picture.

The central long-term challenge is not simply matching software to CVEs. It is deciding which findings matter by combining inventory, vulnerability data, application context, system context, evidence quality, and analyst judgment into an explainable prioritization model.

The current implementation starts with deliberately simple correlation so that the surrounding system can be built and validated first: ingestion, promotion, persistence, provenance, finding generation, and workflow. More advanced correlation and contextual prioritization will be reviewed once SecApp contains a broader and more representative dataset.


{% include page-toc.html %}

## Architecture
<figure class="architecture-figure architecture-figure--wide architecture-figure--secapp">
  <a
    href="/assets/images/secapp/secapp-architecture-production-controlled-promotion.png"
    target="_blank"
    rel="noopener"
    aria-label="Open the SecApp production-controlled promotion architecture diagram at full resolution"
  >
    <img
      src="/assets/images/secapp/secapp-architecture-production-controlled-promotion.png"
      alt="Architecture diagram showing endpoint agents and an external vulnerability source feeding DMZ ingress services and dmz_postgres. Production claims staged records, revalidates them, persists accepted state in prod-secapp-postgres, correlates exposure findings, and presents them through the Security Operations Panel. Planned scheduler, provider, identity, retention, and administration capabilities are shown with dashed outlines."
    >
  </a>
  <figcaption>
    SecApp stages endpoint inventory and vulnerability intelligence in the DMZ, while Production claims, revalidates, and accepts records before persistence and correlation. Dashed components identify planned capabilities. Select the diagram to open the full-resolution image.
  </figcaption>
</figure>

The architecture separates three classes of data:

| Data class | Authority | Purpose |
|---|---|---|
| Staged source data | DMZ | Durable, source-faithful storage for externally influenced input before Production acceptance. |
| Accepted operational state | Production | Validated and normalized records used as the authoritative basis for exposure management. |
| Derived workflow state | Production | Findings, triage decisions, assignments, comments, accepted-risk state, and audit history. |

`dmz_postgres` is therefore a durable staging store, not the authoritative system of record for exposure truth.

Authority is established only after Production retrieves, validates, and accepts a record into `prod-secapp-postgres`.

Accepted records retain safe references to their staged sources. This preserves the chain from observation to acceptance without copying unrestricted raw payloads or provider credentials into the authoritative Production store.

## What I Designed

### Production-controlled promotion

DMZ services receive and stage externally influenced data, but cannot write authoritative Production state.

Production initiates authenticated retrieval through narrow gateway interfaces. It claims bounded batches, validates each record, and explicitly accepts, rejects, or identifies duplicates before updating durable state.

### Durable provenance

The accepted Production record preserves:

- the identity of the staged source record;
- relevant source timestamps;
- the acceptance path;
- the relationship between accepted inventory, accepted vulnerability data, and derived findings.

This allows an analyst or reviewer to understand where a finding came from without treating raw DMZ content as trusted Production data.

### Explainable correlation

The current correlation implementation performs deliberately simple matching between accepted software inventory and accepted vulnerability applicability data.

It is sufficient to exercise:

- promotion;
- persistence;
- provenance;
- deterministic finding generation;
- analyst workflow.

It is not yet a comprehensive software-normalization, package-intelligence, or exposure-scoring framework.

A formal review of the correlation model is planned after SecApp contains a broader and more representative dataset. That review will assess how the system should handle version semantics, ambiguous mappings, contextual evidence, analyst adjudication, and the division of responsibility between deterministic rules and AI-assisted reasoning.

### Durable analyst workflow

The Security Operations Panel operates on accepted Production state.

The implemented workflow includes:

- finding triage;
- assignment and due dates;
- analyst comments;
- remediation references;
- false-positive rationale;
- accepted-risk requests and decisions;
- append-only decision and audit history;
- optimistic concurrency for conflicting updates.

### Explicit failure semantics

The design treats partial failure as a normal distributed-systems condition rather than an exceptional edge case.

The implementation distinguishes invalid input, duplicate delivery, unavailable persistence, incompatible schema, failed acknowledgement, restart, and conflicting analyst updates.

## Current Implementation

SecApp is an active local systems lab, not a production deployment.

| Capability | State |
|---|---|
| DMZ inventory and CVE staging | Implemented |
| Production-controlled promotion | Implemented and validated |
| Durable accepted state and provenance | Implemented and validated |
| Deterministic correlation from accepted inventory and vulnerability applicability | Implemented with deliberately narrow matching |
| Contextual risk prioritization and automated signal-collection model | Planned |
| Finding triage, collaboration, and finding-relevant audit history | Implemented |
| Accepted-risk workflow | Implemented |
| Container-packaged SecOps Panel and browser access | Implemented and validated |
| Live CVE provider integration | Planned |
| Workload-wide endpoint reporting | Planned |
| Enterprise identity and authorization | Planned |
| Scheduled promotion and retention | Planned |

The implemented correlation path is intentionally narrow: accepted endpoint software observations are evaluated against accepted vulnerability applicability to produce explainable findings. SecApp does not yet implement a mature exposure-scoring model.

The next correlation design phase will determine which asset, application, environmental, and threat-context signals materially change prioritization; how those signals can be collected reliably; and how freshness, ambiguity, and evidence quality should affect confidence.
## Evidence


### Architecture evidence

The architecture figure demonstrates:

- separate Internet, DMZ, and Production boundaries;
- durable DMZ staging;
- Production-initiated claim and promotion;
- dedicated authoritative Production persistence;
- correlation from accepted state;
- analyst workflow inside Production;
- separation between implemented and planned capabilities.

### Relationship traversal

The Security Operations Panel exposes the current accepted-state relationship model as linked operational records rather than isolated tables. An analyst can move from a normalized product, through applicable vulnerability intelligence, to the affected endpoint and its derived finding context.

<div class="secapp-evidence-sequence">

<figure class="secapp-evidence-step">
  <div class="secapp-evidence-step__label">1 · Normalized product</div>
  <a
    href="/assets/images/secapp/secapp-product-detail-nginx.png"
    target="_blank"
    rel="noopener"
    aria-label="Open the SecApp nginx product-detail screenshot at full resolution"
  >
    <img
      src="/assets/images/secapp/secapp-product-detail-nginx.png"
      alt="SecApp Product Detail view for nginx, showing its normalized product identity, CPE mapping, related endpoint observation, provenance, and related vulnerability."
    >
  </a>
  <figcaption>
    The normalized nginx record connects accepted software observations, retained provenance, and applicable vulnerability intelligence through stable identifiers.
  </figcaption>
</figure>

<figure class="secapp-evidence-step">
  <div class="secapp-evidence-step__label">2 · Accepted vulnerability applicability</div>
  <a
    href="/assets/images/secapp/secapp-vulnerability-detail-cve-2025-99881.png"
    target="_blank"
    rel="noopener"
    aria-label="Open the SecApp vulnerability-detail screenshot at full resolution"
  >
    <img
      src="/assets/images/secapp/secapp-vulnerability-detail-cve-2025-99881.png"
      alt="SecApp Vulnerability Detail view for CVE-2025-99881, showing affected products, applicability rules, provenance, and a related finding."
    >
  </a>
  <figcaption>
    The accepted vulnerability record preserves applicability rules and source traceability while linking the CVE to the normalized product and resulting finding.
  </figcaption>
</figure>

<figure class="secapp-evidence-step">
  <div class="secapp-evidence-step__label">3 · Endpoint exposure context</div>
  <a
    href="/assets/images/secapp/secapp-endpoint-detail-atl-api-frontend-02.png"
    target="_blank"
    rel="noopener"
    aria-label="Open the SecApp endpoint-detail screenshot at full resolution"
  >
    <img
      src="/assets/images/secapp/secapp-endpoint-detail-atl-api-frontend-02.png"
      alt="SecApp Endpoint Detail view for atl-api-frontend-02, showing inventory freshness, accepted software observations, source traceability, and a related vulnerability finding."
    >
  </a>
  <figcaption>
    The endpoint view closes the traversal with inventory freshness, accepted software observations, provenance, and the finding derived from the product-to-vulnerability relationship.
  </figcaption>
</figure>

</div>

The browser performs this traversal entirely through the same-origin Production API. It does not connect directly to DMZ gateways, Docker-internal service names, or either PostgreSQL service.

### Runtime boundary validation

The runtime capture below shows the repository revision, the live SecApp readiness response, and the active Compose service exposure from the VM.

<figure class="secapp-evidence-step">
  <div class="secapp-evidence-step__label">Observed runtime state</div>
  <a
    href="/assets/images/secapp/secapp-runtime-boundary-summary.png"
    target="_blank"
    rel="noopener"
    aria-label="Open the SecApp runtime-boundary terminal capture at full resolution"
  >
    <img
      src="/assets/images/secapp/secapp-runtime-boundary-summary.png"
      alt="Terminal capture showing the SecApp repository revision, healthy Production API readiness, PostgreSQL-backed accepted-state stores, schema compatibility, and Compose port exposure."
    >
  </a>
  <figcaption>
    The Production API reports PostgreSQL-backed inventory, vulnerability, provenance, finding, and triage stores as available. Compose publishes only the SecApp API on <code>127.0.0.1:8080</code>; DMZ services and both PostgreSQL services remain container-internal.
  </figcaption>
</figure>

## Key Decisions

### Production pulls; the DMZ does not push

Allowing DMZ services to write authoritative Production state would collapse the most important trust boundary in the design.

Production therefore controls which records are retrieved, which identity retrieves them, whether they are accepted, and when the staged record is acknowledged.

### Accepted state retains safe provenance, not unrestricted raw payloads

Production requires traceability, but it does not require unrestricted copies of every source payload.

Safe source references preserve the evidentiary chain while limiting unnecessary replication of lower-trust data.

### Findings and analyst workflow remain separate

A finding is derived from accepted inventory and vulnerability state.

Triage, assignment, comments, remediation references, and accepted-risk decisions are mutable workflows around that finding.

Keeping those models separate supports recalculation, durable history, and concurrency control.

### Partial failure converges through idempotency

Production persistence and DMZ acknowledgement cannot be committed as one atomic transaction.

If Production accepts a record but acknowledgement fails:

1. accepted state remains durable;
2. the job records the acknowledgement failure;
3. the cursor does not advance;
4. retry redelivers the record;
5. Production identifies it as already accepted;
6. acknowledgement can converge without duplicate authoritative state.

## Failure Modes and Controls

| Failure mode | Current behavior |
|---|---|
| Invalid or duplicate record | Rejected or recorded as a duplicate without creating duplicate authoritative state. |
| Database unavailable or schema incompatible | Persistence-dependent operations fail closed. |
| Production acceptance followed by acknowledgement failure | Accepted state remains durable and retry converges through duplicate detection. |
| Production API restart | Accepted records, findings, workflow state, and provenance reconstruct from PostgreSQL. |
| DMZ unavailable after promotion | Correlation continues from accepted Production state. |
| Conflicting analyst update | Optimistic concurrency rejects stale mutations. |

## Boundaries and Tradeoffs

The current implementation is intentionally bounded:

- it is a local synthetic lab rather than a production deployment;
- promotion, correlation, and panel APIs share one FastAPI deployable service;
- correlation is deliberately simple and has not yet received a formal domain-model review;
- promotion is manually or API triggered rather than scheduled;
- actor references are synthetic rather than enterprise identities;
- the project does not yet demonstrate high availability, scale, operational SLOs, or production history.

These constraints keep the system inspectable while the trust model, persistence behavior, and failure semantics are being established.

## Intended Evolution

### Live vulnerability intelligence

An earlier SecApp version integrated with `cvefeed.io`, which remains the preferred candidate for future live CVE ingestion.

MockCo v3 currently uses synthetic data so that promotion, provenance, persistence, and failure behavior can be developed independently of external-provider availability and data quality.

### Workload-wide endpoint reporting

A previous MockCo version included an endpoint inventory agent.

The longer-term intent is to deploy an evolved agent across eligible MockCo workloads so that the environment can report its own software inventory and runtime context through the existing DMZ intake boundary.

This should provide the broader and more varied dataset needed for a meaningful review of the correlation framework.

### AI-assisted analyst assessment

The intended future analyst workflow includes a local MockCo security AI that can help assess:

- uncertain product or version matches;
- conflicting evidence;
- possible false positives;
- likely remediation paths;
- additional information needed before a decision.

The goal is not to replace deterministic controls with an opaque generative decision.

The likely model is a combination of:

- deterministic matching and policy rules;
- AI-assisted contextual assessment;
- evidence-backed recommendations;
- explicit analyst approval.

This capability has not yet been designed in detail. Its authority, confidence thresholds, evidence contract, escalation behavior, and human-approval boundaries must be defined before implementation.

The AI should support analyst judgment rather than silently establish authoritative exposure state or approve accepted risk.

## Next Milestone
{: .toc-ignore }

The immediate milestone is to complete JKS-020B:

1. package the React panel into the SecApp API image;
2. provide loopback-only, same-origin browser access;
3. review visible UI language against the current implementation;
4. correct stale presentation where necessary;
5. seed representative synthetic workflow state;
6. capture implementation and validation evidence;
7. sanitize and approve the public assets;
8. add those assets to this case study.

After a broader body of accepted inventory and vulnerability data exists, the correlation model will receive a separate design review before more advanced matching or AI-assisted analysis is presented as an implemented capability.

## My Contribution

I defined the SecApp architecture, trust boundaries, security requirements, promotion model, failure expectations, validation criteria, and acceptance decisions. I reviewed implementation changes, challenged design assumptions, exercised runtime and failure behavior, and directed corrections where the implementation did not preserve the intended security model.

AI coding agents implemented bounded changes across the FastAPI services, PostgreSQL persistence, React panel, tests, and supporting documentation. I used the agents as implementation and analysis tools while retaining responsibility for architecture, requirements, review, validation strategy, and final acceptance.

## Relationship to MockCo
{: .toc-ignore }

SecApp is one of the two primary application workstreams in the MockCo architecture lab.

The [Member Portal](/projects/mockco/member-portal/) explores protected customer-facing workflows and Crown-Jewel data boundaries.

SecApp explores how an internal security platform establishes trust in externally influenced data, derives explainable exposure state, and preserves analyst decisions as durable operational evidence.

Both applications are developed through the [Agent Harness](/projects/agentic-development-governance/), with architecture, requirements, security decisions, validation expectations, review, and final acceptance remaining Human Lead responsibilities.