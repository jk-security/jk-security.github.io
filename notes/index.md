---
layout: page
title: Notes
permalink: /notes/
---

This section contains dated notes, short reflections, and progress updates from the technical residency.

These notes are intentionally lighter-weight than the project pages. They are meant to capture movement over time: what changed, what I learned, what I am currently questioning, and where the work is going next.

This security engineering upskilling work is a long-running technical residency effort that began in May 2026. The end-of-year goal is tracked primarily through time spent in deliberate technical practice rather than a fixed completion metric.

As of the end of June 2026, I had completed 88 of 450 planned sessions, representing approximately 130 hours of work.

## Current Notes

### 2026-05 — Technical Residency Start

Initial framing for the residency: why it exists, which workstreams are included, and how the public/private artifact model should work.

This period also included the initial ChatGPT-assisted development model, where ChatGPT acted as a design partner, troubleshooting assistant, and code reviewer while I applied changes manually.

[Read note](/notes/2026-05-technical-residency-start/)

### 2026-06 — Agentic Development V1 and V2

Reflection on the move from manual ChatGPT-assisted development toward concurrent Codex agents and a more deliberate operating model.

This note covers the intentionally restrictive V1 model, the resulting governance overhead, and the V2 shift toward fewer personas, simpler workflows, and more autonomous LEFT and RIGHT development instances.

[Read note](/notes/2026-06-agentic-development-v1-v2/)

### 2026-07 — Agentic Development V3 and LogQ

V3 introduces LogQ, a local event-stream logging process for Codex agent activity.

The primary change is the replacement of per-agent Markdown log roots with structured events emitted through a Unix datagram socket and persisted as append-only JSONL segments.

The objective is to improve observability and measurement so that future versions can reduce unnecessary reporting and process while allowing agents to operate more autonomously.

[Read note](/notes/2026-07-agentic-development-v3-logq/)

## Note Categories

Notes may cover:

- project progress;
- technical decisions;
- design tradeoffs;
- reading reflections;
- AppSec remediation lessons;
- agentic development workflow changes;
- agent observability and metrics;
- public/private artifact decisions;
- open questions worth revisiting.

## Publication Standard

Notes should be safe to make public, clearly separated from employer or client work, and written in a way that is useful without exposing raw implementation details, credentials, sensitive data, or private experimental artifacts.