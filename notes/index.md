---
layout: page
title: Notes
permalink: /notes/
---

This section is reserved for dated technical-residency notes: short records of changes in direction, lessons from implementation, and decisions that are useful to preserve outside the larger project pages.

The notes are intentionally lighter-weight than case studies. Their purpose is to capture change over time without pretending that every working thought is a finished technical article.

## Publication State

The repository currently contains three dated note placeholders, but those files do not yet contain substantive note content.

Rather than link to blank pages, this index records their intended subjects and publication state explicitly.

| Period | Intended note | Status |
|---|---|---|
| May 2026 | Technical Residency Start | Draft placeholder |
| June 2026 | Agentic Development V1 and V2 | Draft placeholder |
| July 2026 | Agentic Development V3 and LogQ | Draft placeholder |

These notes will be linked from this page when they contain material worth publishing.

## Residency Timeline

### May 2026 — Technical Residency Start

The first note is intended to capture the reason for the residency, the initial workstreams, and the distinction between public portfolio artifacts and private working material.

The early development model was human-led: ChatGPT supported design, troubleshooting, code review, and explanation while implementation changes were applied and validated manually.

### June 2026 — Agentic Development V1 and V2

The second note is intended to capture the move from manual assisted development to concurrent Codex agents.

The main lesson was the cost of over-governance.

V1 used a larger persona and control model because concurrent autonomous development was new territory. V2 simplified that structure around bounded LEFT and RIGHT work lanes, clearer workflow routing, and a smaller Designer / Builder / Tester responsibility model.

### July 2026 — Agentic Development V3 and LogQ

The third note is intended to document the shift from Markdown session logs to structured agent telemetry.

V3 introduced [LogQ](/projects/agentic-development/logq/), which records agent activity through a Unix datagram collector and append-only JSONL segments.

The purpose of that change was to make agent behavior measurable enough that governance could eventually become lighter and more evidence-driven.

## What Belongs Here

A residency note should capture a meaningful transition that would otherwise be lost inside a large project page.

Useful subjects include:

- a change in architecture direction;
- a development-method transition;
- an implementation lesson that changed later work;
- a failed assumption worth preserving;
- a security or reliability tradeoff;
- a reading insight applied to a project;
- a retrospective on a completed or paused workstream.

Routine progress updates and raw working logs do not need to become public notes.

## Publication Standard

A published note should be:

- technically useful without requiring private chat context;
- clear about what was implemented versus planned;
- explicit about uncertainty and limitations;
- safe to publish;
- free of credentials, sensitive data, raw private prompts, or employer/client material;
- concise enough that the main lesson is easy to identify.

The public site is a curated record of technical judgment, not an append-only dump of every intermediate thought.

## Related Pages

- [Projects](/projects/)
- [MockCo](/projects/mockco/)
- [Agent Harness](/projects/agentic-development/agent-harness/)
- [LogQ](/projects/agentic-development/logq/)
- [Reading](/reading/)