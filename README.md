# JK Security Technical Portfolio

This repository contains the source for my public technical portfolio:

```text
https://jk-security.github.io/
```

The portfolio documents hands-on work across security architecture, application security, distributed systems, secure software development, and governed AI-assisted engineering.

## Purpose

I use this portfolio to maintain and demonstrate current technical depth as a security and technology leader.

The work emphasizes:

- architecture and trust-boundary design;
- implementation-level security reasoning;
- observable runtime behavior;
- explicit failure semantics;
- reproducible validation evidence;
- honest separation between implemented, planned, and experimental capabilities;
- reflection on how technical decisions evolve through repeated practice.

The portfolio is intentionally iterative. Projects may remain active for extended periods, and public case studies are updated as implementation maturity and evidence improve.

## Primary Workstreams

### MockCo Architecture Lab

[MockCo](https://jk-security.github.io/projects/mockco/) is a synthetic health-insurance enterprise used to explore secure architecture and software delivery across realistic application and trust boundaries.

The environment includes Internet, DMZ, Production, and Crown-Jewel zones, together with public-facing and internal security applications.

Current application workstreams include:

- [SecApp](https://jk-security.github.io/projects/mockco/security-operations-platform/) — an exposure-management platform that stages externally influenced inventory and vulnerability data, establishes accepted Production state, preserves provenance, derives findings, and supports analyst workflow.
- [Member Portal](https://jk-security.github.io/projects/mockco/member-portal/) — a member-facing application demonstrating exact-route DMZ relaying, member-scoped authorization, recent step-up controls, idempotent mutations, delegated access, and a bounded browser-decryption workflow for synthetic protected documents.

MockCo is a local systems lab. Its architecture, identities, workloads, data, and evidence are synthetic or intentionally generalized.

### Agent Harness

The [Agent Harness](https://jk-security.github.io/projects/agentic-development/agent-harness/) explores how AI coding agents can perform meaningful engineering work while remaining bounded, observable, reviewable, and subordinate to human authority.

The operating model has evolved through several iterations:

```text
V0: manual ChatGPT-assisted development
V1: heavily governed multi-agent Codex workflow
V2: simplified bounded development lanes
V3: structured event-stream observability through LogQ
```

The current focus is determining which controls remain necessary once agent behavior, decisions, validation, and failure modes become measurable.

### LogQ

[LogQ](https://jk-security.github.io/projects/agentic-development/logq/) is a local append-only event stream for structured agent activity.

It supports work on:

- durable event capture;
- append-only history;
- session and task reconstruction;
- operational metrics;
- agent-workflow analysis;
- future replay and governance capabilities.

LogQ is developed as part of the broader Agent Harness workstream.

### Application Security Practice

[AppSec DVWA](https://jk-security.github.io/projects/appsec-dvwa/) uses a modified and containerized DVWA environment to exercise the complete remediation loop:

```text
validate exploit
  -> scan
  -> inspect source
  -> remediate
  -> rebuild
  -> retest
  -> preserve evidence
```

The emphasis is proof of remediation rather than tool execution alone.

### Technical Reading and Notes

The portfolio also includes:

- [Reading notes](https://jk-security.github.io/reading/) that connect technical literature to architecture, security, reliability, modernization, and leadership decisions.
- [Technical notes](https://jk-security.github.io/notes/) covering project milestones, design changes, implementation lessons, and changes in approach.

These notes are applied working records rather than book summaries or general-purpose tutorials.

## Evidence-Led Case Studies

Public project pages are designed around inspectable claims.

Depending on the project, evidence may include:

- architecture and sequence diagrams;
- application screenshots;
- runtime-boundary captures;
- sanitized API responses;
- validation and smoke-test output;
- reproducible collection scripts;
- implementation-state tables;
- explicit limitations and next milestones.

Evidence is selected to show what the system actually did at a known point in its development.

A screenshot, test result, or diagram is not treated as broader proof than it can support.

## Repository Structure

```text
.
├── README.md
├── _config.yml
├── _includes/
├── _layouts/
├── assets/
│   ├── diagrams/
│   ├── images/
│   ├── js/
│   └── main.scss
├── evidence/
├── projects/
├── reading/
├── notes/
├── drafts/
├── about.md
└── index.md
```

### `index.md`

The portfolio landing page. It introduces the current technical focus and links to the principal case studies.

### `projects/`

Public project pages and case studies for MockCo, SecApp, Member Portal, the Agent Harness, LogQ, and AppSec DVWA.

### `assets/`

Stylesheets, client-side scripts, diagrams, and public images used by the generated site.

### `evidence/`

Small reproducible evidence artifacts, such as sanitized collection scripts, that support claims made in public case studies.

### `reading/`

Applied technical reading notes.

### `notes/`

Dated technical updates, milestone records, and reflections.

### `drafts/`

Material that is not yet ready for publication.

## Publishing Model

Supporting implementation repositories may remain private when they contain:

- incomplete or noisy working material;
- experimental prompts and agent instructions;
- scanner output;
- local runtime files;
- security-sensitive implementation details;
- artifacts that have not yet been reviewed for public release.

Public content is selected for technical usefulness and evidentiary value.

The objective is to publish enough detail to make the architecture, implementation state, validation method, and limitations understandable without exposing every development artifact.

## Content Standards

Published material should:

- use synthetic, simulated, or intentionally generalized systems and data;
- exclude employer, client, production, and confidential information;
- exclude real credentials, tokens, secrets, private keys, and sensitive data;
- distinguish implemented behavior from target-state architecture;
- identify lab-only or synthetic controls explicitly;
- state validation limits and unresolved design questions;
- avoid presenting experiments as production guidance;
- preserve enough technical detail for meaningful review;
- keep Human Lead responsibility clear when AI coding agents contributed to implementation.

## Local Development

The site is generated with Jekyll.

Build the site:

```powershell
jekyll build
```

Serve it locally:

```powershell
jekyll serve
```

Then open:

```text
http://127.0.0.1:4000/
```

Before committing changes, run:

```powershell
jekyll build
git diff --check
git status --short
```

## Contribution and Change Model

This is a personal portfolio repository rather than an open community project.

Material is developed on feature branches, reviewed locally, validated through a Jekyll build, and pushed to GitHub before any merge into the published branch.

Implementation claims should be updated when the evidence or runtime state changes.

## Disclaimer

This is a personal technical practice site.

It does not represent the systems, architecture, controls, opinions, or confidential information of any employer or client.

Examples resembling healthcare, insurance, security operations, software delivery, or enterprise infrastructure are fictionalized, simulated, synthetic, or intentionally generalized.
