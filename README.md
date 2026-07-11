# JK Security Technical Portfolio

This repository contains the public site for my ongoing technical portfolio across security engineering, application security, secure software design, distributed systems, and AI-assisted development.

The site is published through GitHub Pages at:

```text
https://jk-security.github.io/
```

## Purpose

As a security and technology leader, I need to remain technically current.

This portfolio documents ongoing work in building, testing, studying, documenting, and reasoning through modern technical problems. It provides a public record of current technical practice rather than relying only on prior experience or indirect exposure through the work of engineering teams.

The work is intentionally iterative. Some projects are incomplete, some supporting repositories remain private, and some artifacts are published only after they are useful and safe to share.

The objective is to maintain a public record of:

- active technical practice;
- architectural and security reasoning;
- implementation progress;
- lessons learned through repeated experimentation;
- the evolution of my technical judgment as a security engineering leader.

## Portfolio Areas

The site currently covers:

- **MockCo enterprise development** — secure architecture, trust boundaries, internal security tooling, sensitive-data protection, and enterprise application design.
- **Agentic development operating model** — bounded autonomy, concurrent coding agents, workflow selection, validation evidence, Human Lead authority, and agent observability. This project also include `LogQ` functionality, below
- **LogQ** — a local append-only event stream for capturing structured agent activity and supporting future metrics, replay, and analysis, as a part of Agentic Develpoment.
- **Application security practice** — exploit validation, scanning, source-code remediation, rebuilding, and proof of remediation using a modified DVWA environment.
- **Technical reading and systems reasoning** — applied notes from distributed systems, reliability, cloud infrastructure, software architecture, and modernization literature.
- **Technical notes** — dated reflections, project milestones, technical decisions, and changes in approach.

## Repository Structure

```text
.
├── README.md
├── _config.yml
├── index.md
├── _includes/
│   ├── header.html
│   └── footer.html
├── assets/
│   ├── main.scss
│   └── diagrams/
├── projects/
├── reading/
├── notes/
└── drafts/
```

### `index.md`

The public portfolio landing page.

It provides the high-level professional framing, current workstreams, and links to the main project and writing areas.

### `projects/`


#### MockCo

MockCo is a synthetic health-insurance enterprise used to practice secure architecture and development in a realistic multi-system environment.

The project includes:

- Internet, DMZ, Production, and Crown-Jewel trust zones;
- a Public Member Portal;
- a Security Operations Platform;
- vulnerability and software-inventory workflows;
- sensitive-data protection;
- service-to-service security;
- architecture documentation;
- agent-assisted development.

Project pages:

- [MockCo overview](/projects/mockco/)
- [Architecture](/projects/mockco/architecture/)
- [Public Member Portal](/projects/mockco/member-portal/)
- [Security Operations Platform](/projects/mockco/security-operations-platform/)
- [Lessons learned](/projects/mockco/lessons-learned/)

#### Agentic Development Operating Model

This workstream explores how AI coding agents can perform meaningful software-engineering work while remaining bounded, observable, reviewable, and subordinate to human authority.

The operating model has evolved through several iterations:

```text
V0: manual ChatGPT-assisted development
V1: heavily governed multi-agent Codex model
V2: simplified bounded development lanes
V3: structured LogQ event-stream observability
```

Project pages:

- [Agentic Development overview](/projects/agentic-development/)
- [Operating model](/projects/agentic-development/operating-model/)
- [LogQ](/projects/agentic-development/logq/)
- [Measurement roadmap](/projects/agentic-development/measurement-roadmap/)
- [Lessons learned](/projects/agentic-development/lessons-learned/)

#### AppSec DVWA

This project uses a modified and containerized version of DVWA to practice the complete application-security remediation loop:

```text
validate exploit
  -> scan
  -> inspect source
  -> remediate
  -> rebuild
  -> retest
  -> document evidence
```

Project pages:

- [AppSec DVWA overview](/projects/appsec-dvwa/)
- [Lab method](/projects/appsec-dvwa/lab-method/)
- [Remediation case study](/projects/appsec-dvwa/remediation-case-study/)
- [Lessons learned](/projects/appsec-dvwa/lessons-learned/)


### `reading/`

Applied technical reading notes, indicating current and possible application of reading to personal and professional work.

These are not intended to summarize books. They capture how the material changes my reasoning about security engineering, system design, reliability, operability, and technical leadership.

### `notes/`

Dated technical updates, reflections, and milestone records.

### `assets/diagrams/`

Sanitized architecture diagrams and supporting source files used by the public project pages.

### `drafts/`

Unpublished material that is not yet ready for public use.

## Primary Projects

### MockCo

MockCo is a synthetic health-insurance enterprise used to practice secure architecture and development in a realistic multi-system environment.

The project includes:

- Internet, DMZ, Production, and Crown-Jewel trust zones;
- public and internal applications;
- vulnerability and software-inventory workflows;
- sensitive-data protection;
- service-to-service security;
- architecture documentation;
- agent-assisted development.

[View MockCo](/projects/mockco/)

### Agentic Development Operating Model

This workstream explores how AI coding agents can perform meaningful software-engineering work while remaining bounded, observable, reviewable, and subordinate to human authority.

The operating model has evolved through several iterations:

```text
V0: manual ChatGPT-assisted development
V1: heavily governed multi-agent Codex model
V2: simplified bounded LEFT / RIGHT development lanes
V3: structured LogQ event-stream observability
```

The current focus is not adding governance for its own sake.

The focus is determining how much process can be safely removed when agent behavior becomes measurable.

[View the Agentic Development Operating Model](/projects/agentic-development-governance/)

### AppSec DVWA

This project uses a modified and containerized version of DVWA to practice the complete application-security remediation loop:

```text
validate exploit
  -> scan
  -> inspect source
  -> remediate
  -> rebuild
  -> retest
  -> document evidence
```

[View AppSec DVWA](/projects/appsec-dvwa/)

## Publishing Model

Some supporting repositories remain private because they contain:

- rough working material;
- incomplete implementation;
- experimental agent instructions and prompts;
- noisy scanner output;
- security-sensitive implementation details;
- local runtime artifacts;
- content that is useful during development but not yet useful for public review.

Public artifacts are selected for technical value rather than completeness.

Published material may include:

- sanitized architecture diagrams;
- design notes;
- technical analysis;
- selected code excerpts;
- implementation summaries;
- test evidence;
- metrics;
- retrospectives;
- lessons learned.

The goal is not to expose every working file.

The goal is to provide a useful public record of technical practice, reasoning quality, and progression over time.

## Content Standards

Public content should:

- use synthetic or intentionally generalized examples;
- avoid employer, client, production, or confidential information;
- avoid real credentials, secrets, private keys, tokens, or sensitive data;
- distinguish implemented behavior from planned work;
- state validation limitations honestly;
- avoid presenting experimental work as production guidance;
- preserve enough technical detail to make the reasoning useful.

## Local Development

This site uses Jekyll and the Minima theme.

The expected local workflow is:

```bash
bundle install
bundle exec jekyll serve
```

Then open:

```text
http://127.0.0.1:4000/
```

Exact local setup may evolve as site validation and publishing automation are added.

## Disclaimer

This is a personal technical practice site.

It does not represent the work, systems, architecture, controls, opinions, or confidential information of any employer or client.

Where examples resemble enterprise healthcare, insurance, security operations, or software-delivery environments, they are fictionalized, simulated, synthetic, or intentionally generalized.