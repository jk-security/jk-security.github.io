# Security Engineering Technical Residency

This repository contains the public site for my ongoing technical residency across security engineering, application security, software systems, and AI-enabled development practices.

The site is published through GitHub Pages at:

```text
https://jk-security.github.io/
```

## Purpose

Security leaders need to remain technically current. This residency is a structured way to keep building, studying, testing, documenting, and reasoning through modern technical problems rather than relying only on past experience or indirect exposure through the work of individual contributors on my teams.

The work here is intentionally iterative. All projects are inherently incomplete, some related repositories are private, and some artifacts are still rough. That is part of the point.

The goal is to maintain a public record of active technical practice, developing technical judgment, and lessons learned through repeated implementation.

## Current Areas

- **MockCo enterprise development** — secure architecture, trust boundaries, internal security tooling, sensitive-data handling, and enterprise application design.
- **Agentic development operating model** — bounded autonomy, concurrent coding agents, workflow design, validation evidence, agent observability, and Human Lead authority.
- **LogQ agent observability** — structured agent events emitted through a Unix datagram socket and persisted as append-only JSONL streams for future parsing, metrics, and reporting.
- **Application security practice** — a modified DVWA environment for exploit testing, scanning, code remediation, rebuilding, and validation.
- **Technical reading and systems reasoning** — beginning with *Designing Data-Intensive Applications*.
- **Notes and reflections** — dated records of ongoing technical practice, design decisions, and project evolution.

## Primary Projects

### MockCo

MockCo is a synthetic health-insurance enterprise used to practice secure architecture and development in a realistic multi-system environment.

[View MockCo](/projects/mockco/)

### Agentic Development Operating Model

This workstream explores how far AI coding agents can operate autonomously while preserving enough visibility, reviewability, and human authority to keep development safe and architecture-aligned.

V1 intentionally used restrictive governance. V2 reduced that process burden. V3 introduces LogQ as a structured event stream for observing and measuring agent activity without treating additional governance as the goal.

[View the Agentic Development Operating Model](/projects/agentic-development-governance/)

### AppSec DVWA

This project uses a modified and containerized version of DVWA to practice the complete application security remediation loop:

```text
test exploit -> scan -> remediate in code -> rebuild -> validate remediation
```

[View AppSec DVWA](/projects/appsec-dvwa/)

## Public / Private Model

Some related repositories are private because they contain:

- rough working material;
- experimental development patterns;
- agent instructions and prompts;
- noisy scan output;
- security-sensitive implementation details;
- incomplete scaffolding;
- artifacts that are useful for development but not yet useful for public review.

Public material is published selectively as it becomes useful and safe to share. This may include sanitized diagrams, design notes, written analysis, selected code excerpts, architecture summaries, metrics, and retrospective writeups.

The goal is not to expose every working file. The goal is to provide a useful public record of technical practice, reasoning quality, and progression over time.

## Disclaimer

This is a personal technical practice space. It does not represent the work, systems, architecture, controls, or confidential information of any employer or client.

Where examples resemble enterprise scenarios, they are fictionalized, simulated, or intentionally generalized.