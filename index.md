---
layout: home
---

I am a security engineering leader maintaining a hands-on technical residency across secure architecture, application security, software systems, distributed systems, and AI-assisted development.

The technical work exists to keep technical judgment grounded in implementation, and act as a workshop for technical upskilling on topics I find current and relevant to my personal or professional interests.

Rather than relying only on prior experience or indirect exposure through engineering teams, I continue to build systems, test controls, inspect failures, read deeply, document tradeoffs, and refine my understanding through repeated technical work.

This site is the public portfolio for that work.

## Current Focus

The current portfolio is organized around three main technical programs.

### MockCo Enterprise Security Lab

MockCo is a synthetic health-insurance enterprise used to design and build secure systems in a realistic multi-application environment.

The project includes:

- Internet, DMZ, Production, and Crown-Jewel trust zones;
- a Public Member Portal;
- a Security Operations Platform;
- vulnerability-intelligence and endpoint-inventory workflows;
- sensitive-data protection;
- service-to-service security;
- architecture and data-flow analysis;
- containerized local infrastructure;
- agent-assisted implementation.

The value of MockCo is not the fictional company itself.

The value is the opportunity to reason through the same classes of problems found in real enterprise environments:

- where trust boundaries belong;
- which systems should own data;
- which systems should never receive plaintext;
- how public and internal applications should communicate;
- how security tooling should retrieve and correlate operational data;
- how architecture should constrain implementation.

[Explore MockCo](/projects/mockco/)

Related pages:

- [Architecture](/projects/mockco/architecture/)
- [Public Member Portal](/projects/mockco/member-portal/)
- [Security Operations Platform](/projects/mockco/security-operations-platform/)

### Agentic Development Operating Model

This workstream treats AI-assisted development as an engineering system rather than only a productivity feature.

The central question is:

> How autonomously can coding agents operate while still producing secure, reviewable, architecture-aligned work?

The operating model covers:

- Human Lead authority;
- Designer, Builder, and Tester responsibilities;
- bounded autonomy;
- workflow selection;
- trust-boundary and dependency guardrails;
- concurrent agent work;
- validation evidence;
- Git authority;
- stop conditions;
- structured agent observability.

The model has evolved through several iterations:

```text
V0: manual chat-assisted development
V1: restrictive multi-agent governance
V2: simplified bounded development lanes
V3: LogQ structured event-stream observability
```

V3 introduces LogQ, a local event collector that captures agent lifecycle and validation activity as append-only JSONL records. I settled on `LogQ` event stream and parsing concepts from reading in _Designing Data-Intensive Applications_ (more on this below).

The goal is to measure agent behavior well enough to remove process safely.

[Explore the Agentic Development Operating Model](/projects/agentic-development/)

Related pages:

- [Operating model](/projects/agentic-development/operating-model/)
- [LogQ](/projects/agentic-development/logq/)
- [Measurement roadmap](/projects/agentic-development/measurement-roadmap/)

### AppSec DVWA Remediation Practice

This project uses a modified and containerized version of DVWA to practice the complete application-security remediation lifecycle:

```text
validate exploit
  -> scan
  -> inspect source
  -> remediate
  -> rebuild
  -> retest
  -> document evidence
```

The emphasis is to provide end-to-end hands-on experience with software development remediation lifecycle and practical remediation judgment:

- determine whether a finding is exploitable;
- understand the vulnerable code path;
- correct the underlying defect;
- preserve intended application behavior;
- prove the fix through repeatable validation.

[Explore AppSec DVWA](/projects/appsec-dvwa/)

Related pages:

- [Lab method](/projects/appsec-dvwa/lab-method/)
- [Remediation case study](/projects/appsec-dvwa/remediation-case-study/)

## What This Work Demonstrates

Across these projects, the residency is intended to demonstrate practical capability in:

| Area | Evidence |
|---|---|
| Security architecture | Trust zones, service boundaries, data-flow restrictions, and architecture decision-making |
| Application security | Exploit validation, remediation, rebuilding, and regression testing |
| Secure software design | Public and internal APIs, persistence ownership, identity, encryption, and failure handling |
| Security operations engineering | Vulnerability intelligence, asset inventory, correlation, triage, and auditability |
| Platform and infrastructure reasoning | Containers, service networking, environment boundaries, and operational failure modes |
| Agentic development | Bounded autonomy, workflow design, concurrent agents, validation evidence, and observability |
| Technical leadership | Translating risk and architecture into explicit engineering constraints and reviewable outcomes |
| Systems thinking | Applying distributed-systems and reliability concepts to security architecture and implementation |

## Current Residency State

The residency began in May 2026 and is designed as a long-running technical practice rather than a fixed-duration course.

Current activity includes:

- continued development of MockCo;
- Public Member Portal implementation;
- Security Operations Platform implementation;
- migration from V2 to V3 agent instructions;
- first operational use of LogQ;
- applied study of *Designing Data-Intensive Applications*
  * (v3 `LogQ` in agentic-development, scalability of SecApp and planned FHE database in `MockCo`);
- preparation of public architecture diagrams and technical case studies.

The work is intentionally incomplete.

The purpose of the portfolio is to show progression, reasoning, implementation, and lessons learned—not to present every project as finished.

## Reading and Technical Reasoning

Technical reading is part of the residency, but the goal is not book summary.

The goal is to improve practical reasoning about:

- data models;
- storage systems;
- replication and consistency;
- distributed systems;
- reliability;
- operability;
- cloud infrastructure;
- legacy modernization;
- security architecture;
- engineering leadership.

Current reading begins with *Designing Data-Intensive Applications* and connects its concepts to the systems being built in MockCo.

Future planned texts include:
 - *Site Reliability Engineering*
 - *Kill it with Fire*
 - *Chaos Engineering*

[View reading and technical reasoning](/reading/)

## Notes and Milestones

The notes section contains dated reflections and project milestones.

These entries record:

- changes in technical direction;
- operating-model revisions;
- project progress;
- lessons from implementation;
- open questions;
- changes in technical judgment.

[View residency notes](/notes/)

## Publication Model

Most supporting repositories and artifacts remain private because they contain:

- rough or incomplete implementation;
- experimental development patterns;
- internal agent instructions and prompts;
- noisy scanner output;
- local runtime artifacts;
- security-sensitive details;
- material that is useful during development but not yet suitable for public review.

Public material is published selectively when it is useful, stable, and meaningful.

Published artifacts may include:

- sanitized architecture diagrams;
- project summaries;
- design decisions;
- selected code excerpts;
- validation evidence;
- metrics;
- retrospectives;
- technical lessons.

The objective is to provide a credible public record of active technical practice and developing technical judgment.