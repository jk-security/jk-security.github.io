---
layout: page
title: LogQ
permalink: /projects/agentic-development/logq/
description: >-
  A local append-only event stream for observing, measuring, and analyzing
  AI coding-agent activity.
---

## Overview

LogQ is the observability layer for the V3 agentic development operating model.

It captures structured events from coding-agent runs and stores them as append-only JSONL segments for later parsing, analysis, and reporting.

The current event path is:

```text
Codex / agent
  -> shell emitter
  -> Python emitter
  -> Unix datagram socket
  -> LogQ collector
  -> active .open.jsonl segment
  -> completed .closed.jsonl segment
  -> future parser and analytics
```

LogQ replaces the V2 approach where individual development lanes wrote human-readable Markdown task logs.

The change is important because Markdown logs were useful for review, but difficult to compare, query, validate, or measure consistently.

LogQ turns agent activity into structured operational evidence.

## Why LogQ Exists

The main problem is not that coding agents fail to produce summaries.

The problem is that summaries are usually:

- written after the work;
- inconsistent between runs;
- difficult to aggregate;
- dependent on agent judgment;
- hard to correlate with validation activity;
- difficult to use for longitudinal analysis.

A final summary may say that a task succeeded, but it does not reliably answer:

- Which workflow was selected?
- Which agent session performed the work?
- What validation commands ran?
- Which commands failed?
- How often did the agent request Human Lead intervention?
- How many runs ended successfully?
- Which workflows produce the most rework?
- Where are governance controls preventing mistakes?
- Where are controls adding friction without measurable value?

LogQ is intended to provide the evidence needed to answer those questions.

## Design Goal

The objective is not to create more process.

The objective is to make agent activity observable enough that unnecessary process can be removed safely.

The underlying hypothesis is:

> Better evidence should permit simpler governance.

Without evidence, the safest response to agent uncertainty is often more review, more reporting, and narrower autonomy.

With reliable evidence, the operating model can instead be adjusted based on observed behavior.

## Current Architecture

### Event Emission

Agents emit events through a lightweight shell wrapper:

```bash
.agents/tools/logq/src/logq_emit.sh <event_type> key=value key=value
```

The shell wrapper invokes a short-lived Python emitter that:

1. parses the event type and fields;
2. creates a compact JSON payload;
3. sends the payload to the local Unix datagram socket;
4. exits without waiting for the collector to persist the record.

The expected socket path is:

```text
.agents/logging/run/logq.sock
```

### Collector

The collector listens on the Unix datagram socket and processes incoming payloads.

Its responsibilities include:

- receiving event datagrams;
- parsing JSON payloads;
- performing shallow validation;
- wrapping invalid events safely;
- assigning collector sequence numbers;
- adding receive timestamps;
- buffering records;
- writing append-only JSONL segments;
- rotating completed segments;
- closing the active segment during graceful shutdown.

### Segment Writer

The writer maintains two segment states.

Active segments:

```text
.agents/logging/streams/events/open/*.open.jsonl
```

Completed segments:

```text
.agents/logging/streams/events/closed/*.closed.jsonl
```

The `.closed.jsonl` suffix is the completion marker.

Future parsers and projectors should consume only completed segments.

They must not assume that reaching EOF on an active `.open.jsonl` file means the writer is finished. The collector may append additional records later.

## Delivery and Durability

LogQ currently uses a Unix datagram socket.

That provides a lightweight, local, non-blocking event path, but it does not provide end-to-end delivery guarantees.

The stages are distinct:

```text
emission attempted
  -> datagram sent
  -> collector received
  -> record buffered
  -> JSONL appended
  -> data flushed
  -> file synchronized
  -> segment closed
  -> parser processed
```

A successful emitter exit means only that the sender completed its local send operation.

It does not prove that:

- the collector received the event;
- the writer appended it;
- the data was flushed;
- the segment was closed;
- the parser processed it.

For the current design, durability begins after the collector writes the record to the JSONL stream.

A completed `.closed.jsonl` segment is the durable handoff point for downstream processing.

## Event Model

LogQ records agent lifecycle, workflow, validation, intervention, and terminal-state events.

Current event types include:

```text
run_started
workflow_selected
validation_finished
human_intervention_requested
run_completed
run_failed
run_aborted
```

The event schema is intentionally small.

Agents must use only approved event types and fields. They should not invent new fields during ordinary implementation work because silent schema drift makes downstream analysis unreliable.

## Agent Identity

Work lanes such as `LEFT` and `RIGHT` remain useful for assigning bounded areas of responsibility.

They are not durable agent identities.

A useful event must distinguish:

```text
agent instance
agent role
work lane
task run
selected workflow
```

Expected identity and correlation fields include:

| Field | Purpose |
|---|---|
| `agent_instance_id` | Identifies the active coding-agent session. |
| `agent_role` | Identifies the active persona, such as Designer, Builder, or Tester. |
| `work_lane` | Identifies the Human Lead-assigned work area. |
| `run_id` | Correlates events produced during one assigned task. |
| `workflow.primary` | Identifies the selected primary workflow. |

Example run event:

```bash
.agents/tools/logq/src/logq_emit.sh run_started \
  agent_instance_id=<runtime-identifier> \
  agent_role=builder \
  work_lane=LEFT \
  run_id=<task-run-id>
```

Example workflow event:

```bash
.agents/tools/logq/src/logq_emit.sh workflow_selected \
  agent_instance_id=<runtime-identifier> \
  agent_role=builder \
  work_lane=LEFT \
  run_id=<task-run-id> \
  workflow.primary=002-autonomous-build-work
```

Example validation event:

```bash
.agents/tools/logq/src/logq_emit.sh validation_finished \
  agent_instance_id=<runtime-identifier> \
  agent_role=builder \
  work_lane=LEFT \
  run_id=<task-run-id> \
  validation.command="python -m pytest" \
  validation.exit_code=0 \
  result=passed
```

## Valid and Invalid Events

The collector stores both valid and invalid inputs in the same append-only stream.

Valid events are normalized and stored with collector metadata.

Invalid payloads are wrapped rather than discarded silently.

Invalid-event records may include:

- the parsing or validation error;
- receive timestamp;
- collector sequence number;
- Base64-encoded raw payload;
- enough context to diagnose the failure without placing unsafe binary content directly into JSON.

This design preserves evidence while preventing one malformed event from stopping the collector.

## Operational Behavior

The collector rotates segments based on configurable thresholds such as:

- segment age;
- record count;
- byte count.

Rotation moves the active file from the `open` directory into the `closed` directory using the completed filename convention.

On graceful shutdown, the collector writes a final lifecycle event and closes the active segment.

Generated runtime artifacts are not normal source files.

They should not be committed unless event-stream evidence is explicitly required for a particular review.

The Unix socket file must never be committed.

## Security Boundaries

LogQ is operational telemetry, not a general-purpose application log.

Events must not contain:

- passwords;
- tokens;
- credentials;
- private keys;
- plaintext data-encryption keys;
- `.env` contents;
- real PHI or PII;
- payment data;
- production secrets;
- full sensitive request or response bodies;
- unrestricted command output;
- private repository content not intended for telemetry.

Event payloads should contain only the minimum metadata needed for:

- run correlation;
- workflow analysis;
- validation evidence;
- intervention tracking;
- completion-state analysis;
- collector health.

Structured observability is useful only when the telemetry itself does not create a new data-exposure path.

## Relationship to Agent Reporting

LogQ does not eliminate the final agent report.

The two serve different purposes.

### LogQ

LogQ provides machine-readable events during the run.

It is intended for:

- correlation;
- aggregation;
- metrics;
- trend analysis;
- parser-driven reconstruction;
- operational health analysis.

### Final Report

The final report provides a human-readable reconciliation of the work.

It should explain:

- what changed;
- what was validated;
- what remains incomplete;
- what risks remain;
- whether LogQ was available;
- whether expected events were emitted;
- whether telemetry gaps exist.

The final report is not a second event store.

It should summarize and reconcile the run rather than reproduce every event.

## Optional and Required Modes

LogQ may operate in one of two modes.

### Optional

When LogQ is optional and unavailable:

- the agent may continue within approved scope;
- the agent must report the telemetry gap;
- the agent must not claim events were emitted;
- the agent must not create an ad hoc Markdown replacement log.

### Required

When LogQ is an explicit task requirement and unavailable:

- the agent must stop;
- the unmet requirement must be reported;
- Human Lead direction is required before continuing.

This avoids silently weakening an acceptance condition.

## Current Capabilities

The current V3.0 implementation includes:

- Unix datagram socket ingestion;
- Bash and Python emitters;
- compact JSON event payloads;
- collector-assigned sequence numbers;
- collector receive timestamps;
- valid-event normalization;
- invalid-event capture;
- Base64 preservation of invalid raw payloads;
- batched JSONL writes;
- active and completed segments;
- rotation by age, record count, or byte count;
- graceful shutdown;
- agent identity guidance;
- workflow and persona integration.

## Planned Parser

The next major stage is a parser that consumes completed segments:

```text
.closed.jsonl segments
  -> parser
  -> normalized event tables
  -> parser checkpoints
  -> replay support
```

Expected parser responsibilities include:

- consume only completed segments;
- validate stored records;
- preserve agent and run identity;
- track processed segments;
- detect sequence gaps;
- report invalid records;
- support replay;
- load normalized events into a queryable database;
- avoid mutating source segments.

The parser database will be a derived read model.

The completed JSONL segments remain the source of truth.

## Planned Analytics

The longer-term goal is to build materialized views and reports over normalized events.

Potential views include:

```text
runs by workflow
runs by agent instance
runs by work lane
completion and failure rates
validation failure rates
human intervention counts
telemetry completeness
sequence-gap reporting
collector health
budget pressure by workflow
recovery-state freshness
segment-processing checkpoints
```

Potential output formats include:

```text
DuckDB
Parquet
CSV
Markdown
```

The purpose is not to create a dashboard for its own sake.

The purpose is to measure whether the operating model is helping agents produce useful, safe, reviewable work.

## Questions LogQ Is Intended to Answer

The most important future questions are operational:

- Which workflows complete successfully most often?
- Which workflows produce the most validation failures?
- Which tasks require repeated Human Lead intervention?
- Which work lanes experience the most rework?
- Which validation commands fail repeatedly?
- How often is telemetry unavailable or incomplete?
- How frequently do agents terminate without a corresponding terminal event?
- Which governance requirements correlate with better outcomes?
- Which requirements add cost without reducing failure?
- Can autonomy be safely expanded for particular task categories?
- Where should stronger stop conditions remain?

These questions turn agent governance from a static ruleset into an observable system.

## Design Tradeoffs

### Why Unix Datagrams

Unix datagrams provide:

- low sender overhead;
- local-only communication;
- a simple implementation;
- loose coupling between agents and collector;
- no requirement for every sender to maintain a persistent process.

The tradeoff is weaker delivery assurance.

That is acceptable for the current experimental stage, provided the limitation is explicit and measured.

### Why Append-Only JSONL

JSONL provides:

- simple writes;
- easy inspection;
- line-oriented recovery;
- straightforward replay;
- compatibility with many analysis tools;
- low implementation complexity.

The tradeoff is that raw JSONL is not ideal for complex queries.

That is why the future parser and database are derived from the immutable source stream.

### Why Closed Segments

Completed segments provide a clear producer-consumer boundary.

The writer owns `.open.jsonl`.

Downstream readers own only `.closed.jsonl`.

This avoids coordination problems where a parser mistakes temporary EOF for completion or reads a record while the collector is still appending.

## Lessons So Far

Several early design lessons are already clear.

### Observability is not durability

Sending an event and persisting an event are separate operations.

The system must not treat emitter success as proof of durable evidence.

### Identity must be explicit

A work lane such as `LEFT` or `RIGHT` is an assignment boundary, not a session identity.

Repeated and concurrent runs require a separate `agent_instance_id` and `run_id`.

### Schemas must remain controlled

Allowing agents to invent fields casually would make analysis inconsistent and force the parser to support uncontrolled variations.

### Runtime evidence should remain separate from source

Generated socket and stream files are operational artifacts.

Committing them by default would create noise, repository growth, and possible telemetry exposure.

### Observability should reduce reporting burden

LogQ would have failed its purpose if it merely added structured events on top of every V2 reporting requirement.

The long-term value comes from replacing manual process with reliable evidence.

## Current Status

LogQ V3.0 is implemented as a local event-ingestion foundation.

The immediate next step is operational use during real MockCo development runs.

That phase will test:

- whether agents emit the expected events consistently;
- whether the identity model is sufficient;
- whether event fields are useful in practice;
- whether telemetry gaps are visible;
- whether the collector behaves reliably under repeated sessions;
- which parser requirements are genuinely necessary;
- which governance requirements can eventually be simplified.

The design remains intentionally modest.

The first goal is a trustworthy event path that makes agent behavior easier to inspect and measure, rather than a comprehensive analytics platform.

## Related Pages

- [Agentic Development Overview](/projects/agentic-development/)
- [Operating Model](/projects/agentic-development/operating-model/)
- [Measurement Roadmap](/projects/agentic-development/measurement-roadmap/)
- [Lessons Learned](/projects/agentic-development/lessons-learned/)
- [MockCo](/projects/mockco/)