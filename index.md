---
layout: home
---

## Technical Residency

This page is a public index of my ongoing technical residency work across security engineering, application security, software systems, and AI-enabled development practices.

The purpose is simple: security leaders need to remain technically current. This residency is a structured way to keep building, studying, testing, documenting, and reasoning through modern technical problems rather than relying on past experience or indirect exposure through the technical work of individual contributors on my teams.

The work here is intentionally iterative. Most projects are incomplete, some repositories are private, and some artifacts are still rough. That is part of the point. This page is meant to show active technical practice: what I am building, what I am studying, what I am testing, and how my thinking is developing over time.

## Current Workstreams

### MockCo Development Work

MockCo is a simulated company environment used to reason through practical security engineering problems in a realistic enterprise context.

The work includes secure system design, custom-written internal security tooling, vulnerability management workflows, remediation patterns, architecture documentation, and operational tradeoff analysis.

[Read more](/projects/mockco/)

### Agentic Development Operating Model

This workstream explores how AI-assisted and agentic development can be treated as an engineering system rather than only a productivity tool.

The focus includes bounded autonomy, concurrent agent work, workflow selection, validation evidence, human authority, and agent observability. V1 intentionally used heavy governance, V2 reduced that process burden, and V3 introduces LogQ as a structured event stream for capturing and analyzing agent activity.

The goal is not to add governance for its own sake. The goal is to determine how autonomously agents can operate while still producing secure, reviewable, architecture-aligned work.

[Read more](/projects/agentic-development-governance/)

### AppSec Practice: DVWA Scan, Fix, Re-Scan

This project uses a modified version of DVWA and related tooling to practice the full application security remediation loop:

```text
test exploit -> scan -> remediate in code -> rebuild -> validate remediation
```

The purpose is to strengthen practical AppSec judgment: understanding findings, validating exploitability, fixing underlying issues, and proving that the remediation works without breaking intended application behavior.

[Read more](/projects/appsec-dvwa/)

## Reading and Technical Reasoning

Technical reading is part of this residency, but the goal is not book summary. The goal is to improve practical reasoning about systems, architecture, data models, reliability, operability, security tradeoffs, and engineering leadership.

Current reading begins with *Designing Data-Intensive Applications*.

[View reading notes](/reading/)

## Notes

The notes section contains dated reflections, progress updates, and short-form technical reasoning from the residency.

[View notes](/notes/)

## Public / Private Artifact Model

Some related repositories are private because they contain rough work, experimental development patterns, security-sensitive implementation details, or artifacts that are not yet suitable for public release.

Public material will be published selectively as it becomes useful and safe to share. This may include sanitized diagrams, design notes, written analysis, selected code excerpts, architecture summaries, and retrospective writeups.

The goal is not to expose every working file. The goal is to provide a useful public record of technical practice, reasoning quality, and progression over time.