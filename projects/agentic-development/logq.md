---
layout: page
title: LogQ
subtitle: Append-Only Observability for AI Coding Agents
status: Work in progress
toc: true
permalink: /projects/agentic-development/logq/
description: >-
  A local append-only event stream for observing and measuring
  AI coding-agent activity.
---

LogQ is the event-ingestion and observability layer for the V3 agentic development operating model.

It converts coding-agent activity into structured, append-only operational evidence that can later be reconciled, parsed, and analyzed across runs.

The current implementation is deliberately small: lightweight emitters send events through a local Unix datagram socket to a collector, which validates and persists them as append-only JSONL segments.

{% include page-toc.html %}

## Operational Problem

Coding agents can produce detailed final summaries, but those summaries are retrospective, inconsistent between runs, and difficult to aggregate.

They do not reliably establish:

- which agent instance performed the work;
- which workflow was selected;
- which validation commands ran;
- whether validation succeeded;
- when Human Lead intervention occurred;
- whether a run completed, failed, or aborted;
- whether expected telemetry was actually persisted.

LogQ provides a machine-readable event path alongside the human-readable final report.

The design goal is to make agent behavior observable enough that governance decisions can eventually be based on measured behavior rather than additional reporting requirements.

## Architecture

{% include evidence-figure.html
   src="/assets/diagrams/agent-emitter-to-durable-storage.png"
   link="/assets/diagrams/agent-emitter-to-durable-storage.png"
   alt="LogQ architecture showing multiple agent emitters sending events through a Unix datagram socket to a collector and append-only durable storage."
   caption="Multiple agent processes emit compact telemetry through a local Unix datagram socket. The collector receives and validates events before batching them into append-only JSONL storage. Sender completion is intentionally separated from durable persistence."
%}

The implemented path is:

```text
coding agent
  -> shell emitter
  -> Python emitter
  -> Unix datagram socket
  -> LogQ collector
  -> active .open.jsonl segment
  -> completed .closed.jsonl segment
```

The planned parser and analytics layer begins only after a segment has been closed. It is not part of the current V3.0 ingestion implementation.

## Current Implementation

| Capability | State |
|---|---|
| Bash event-emission wrapper | Implemented |
| Python datagram emitter | Implemented |
| Local Unix datagram socket | Implemented |
| Collector process | Implemented |
| Controlled event schema | Implemented |
| Agent and run identity fields | Implemented |
| Collector sequence and receive metadata | Implemented |
| Valid-event normalization | Implemented |
| Invalid-event preservation | Implemented |
| Append-only JSONL persistence | Implemented |
| Batched writes | Implemented |
| Open and closed segment lifecycle | Implemented |
| Rotation by age, count, or bytes | Implemented |
| Graceful segment closure | Implemented |
| Parser and normalized query model | Planned |
| Analytics and longitudinal reporting | Planned |

Current event types cover run lifecycle, workflow selection, validation, Human Lead intervention, and terminal state.

Representative types include:

```text
run_started
workflow_selected
validation_finished
human_intervention_requested
run_completed
run_failed
run_aborted
```

Events carry explicit correlation information rather than treating a work lane as durable identity.

Relevant fields include:

```text
agent_instance_id
agent_role
work_lane
run_id
workflow.primary
validation.command
validation.exit_code
result
```

This keeps the schema small enough to control while preserving the information needed to reconstruct a run.

## Event and Storage Model

### Event emission

Agents use a lightweight shell interface:

```bash
.agents/tools/logq/src/logq_emit.sh <event_type> key=value key=value
```

The shell wrapper invokes a short-lived Python emitter that constructs a compact JSON payload and sends it to:

```text
.agents/logging/run/logq.sock
```

The emitter does not wait for the collector to durably persist the event.

### Collector

The collector owns the transition from transient telemetry to stored operational evidence.

Its responsibilities include:

- receiving event datagrams;
- parsing and shallow validation;
- normalizing valid events;
- wrapping malformed input rather than silently dropping it;
- assigning collector sequence numbers and receive timestamps;
- buffering records;
- appending JSONL records;
- rotating segments;
- closing the active segment during graceful shutdown.

### Segment lifecycle

The writer maintains an active segment:

```text
.agents/logging/streams/events/open/*.open.jsonl
```

Completed segments move to:

```text
.agents/logging/streams/events/closed/*.closed.jsonl
```

The filename state is part of the producer-consumer contract.

The collector owns `.open.jsonl` files. Downstream consumers should process only `.closed.jsonl` segments.

An EOF observed on an open segment is temporary and does not imply that the producer has finished writing.

## Delivery and Durability Semantics

LogQ separates several states that can easily be conflated:

```text
emission attempted
  -> datagram sent
  -> collector received
  -> record buffered
  -> JSONL appended
  -> data flushed
  -> segment closed
  -> downstream processing
```

A successful emitter exit proves only that the sender completed its local send operation.

It does not prove that the collector received the datagram or that the event became durable.

For the current implementation, the important handoff is the append-only stream produced by the collector. A completed `.closed.jsonl` segment provides the stable input boundary for future downstream processing.

This distinction is intentional. LogQ favors low sender overhead and loose coupling over end-to-end delivery guarantees.

## Evidence

The current LogQ deployment is installed as a rootless user service and has been collecting telemetry during active agentic-development work.

### Collector and socket state

{% include evidence-figure.html
   src="/assets/images/logq/logq-operational-state.png"
   link="/assets/images/logq/logq-operational-state.png"
   alt="Terminal evidence showing the LogQ service active, Unix socket ready, accumulated closed segments, and the current collector-owned open segment."
   caption="Operational evidence from the installed LogQ service. The collector is active, the Unix datagram socket is ready, and completed segments have accumulated during normal development activity."
%}

This demonstrates the live ingestion boundary: agents can emit to a ready local socket while the collector maintains the active append-only segment.

### Real agent lifecycle

{% include evidence-figure.html
   src="/assets/images/logq/logq-real-run-lifecycle.png"
   link="/assets/images/logq/logq-real-run-lifecycle.png"
   alt="Terminal evidence showing a real LogQ agent run with run_started, validation_finished, and run_completed records."
   caption="A real recorded run from agentic-development work. The event stream preserves run identity, role, work lane, workflow selection, validation outcome, and terminal run outcome."
%}

The run shows three distinct lifecycle observations:

```text
run_started
validation_finished -> integration_test -> passed
run_completed -> completed_with_gaps
```

The records are operational telemetry captured by LogQ rather than a synthetic demonstration generated for the portfolio.

### Stored JSONL record

{% include evidence-figure.html
   src="/assets/images/logq/logq-jsonl-validation-record.png"
   link="/assets/images/logq/logq-jsonl-validation-record.png"
   alt="Terminal evidence showing one persisted LogQ validation_finished record with collector metadata, agent identity, workflow, validation result, and conformance data."
   caption="One persisted validation record from the append-only JSONL stream. The stored record combines collector-assigned metadata with agent identity, run correlation, workflow context, validation outcome, and registry conformance information."
%}

This is the canonical stored representation rather than a reporting view. The JSONL segment remains the source record from which later parsers and analytical read models can be derived.

### Append-only segment lifecycle

{% include evidence-figure.html
   src="/assets/images/logq/logq-segment-lifecycle.png"
   link="/assets/images/logq/logq-segment-lifecycle.png"
   alt="Terminal evidence showing the current LogQ open JSONL segment and recently completed closed JSONL segments with sequence ranges."
   caption="The active collector owns an `.open.jsonl` segment while completed segments are published as `.closed.jsonl` files with explicit sequence ranges. Closed segments form the stable handoff boundary for downstream consumers."
%}

The file-state transition creates an explicit ownership protocol between the collector and future downstream readers. Readers do not need to interpret temporary EOF on a file that may still receive additional writes.

Historical collector instances have also left rotation-only open segments. That behavior is retained as an operational limitation to address in stale-segment recovery and cleanup rather than hidden from the system model.

### Invalid-event resilience

{% include evidence-figure.html
   src="/assets/images/logq/logq-invalid-event-resilience.png"
   link="/assets/images/logq/logq-invalid-event-resilience.png"
   alt="Terminal evidence showing a deliberately malformed JSON datagram sent to LogQ, persisted as an invalid event, followed by confirmation that the collector and Unix socket remained healthy."
   caption="Failure-path evidence from the installed collector. A malformed Unix datagram is retained as an `invalid_event` with `invalid_json` diagnostic metadata and Base64 preservation metadata. The collector remains active and the socket remains ready afterward."
%}

Malformed telemetry is treated as observable evidence rather than silently discarded.

The collector converts invalid JSON into a canonical record containing the receive sequence, timestamp, transport, validation error, and bounded metadata describing the preserved raw payload. Processing then continues for subsequent events.

This keeps one malformed producer message from becoming a failure of the ingestion service.

## Key Decisions

### Keep telemetry off the agent critical path

LogQ is designed so that agent execution does not wait for collector acknowledgement or durable persistence.

Short-lived emitters submit telemetry through a local Unix datagram socket and then continue. This keeps persistence latency out of the agent execution path, allows multiple agents to emit independently, and reduces coordination between producers and the collector.

The tradeoff is weaker delivery assurance. Successful emitter completion proves only that the local send operation completed; it does not prove that the collector received the datagram or that the event became durable.

This creates a failure-correlated telemetry risk: overload or collector failure can cause the system to lose evidence at the same time that operational evidence is most valuable. LogQ therefore treats delivery semantics as an explicit limitation rather than presenting the telemetry stream as complete by construction.

### Why append-only JSONL

JSONL provides a simple durable representation with:

- sequential writes;
- human inspectability;
- line-oriented recovery;
- straightforward replay;
- low implementation complexity;
- compatibility with common analysis tooling.

The source stream is optimized for reliable capture rather than complex querying.

Future query models should therefore be derived from the event stream rather than replacing it as the authoritative record.

### Why open and closed segments

A continuously written file creates ambiguity for downstream readers: reaching EOF does not establish that the producer is finished.

LogQ resolves this with explicit segment states.

The collector owns active segments. Closure creates a stable handoff point for future parsers and projectors.

This is a small coordination protocol that avoids requiring the writer and downstream consumer to share locks or transaction state.

### Why invalid events are preserved

Malformed events are evidence of emitter, schema, or integration failure.

Discarding them silently would make the telemetry system appear healthier than it is.

The collector therefore preserves invalid input in a safe wrapper containing diagnostic metadata and a bounded representation of the original payload.

One malformed event should not stop ingestion for unrelated valid events.

### Why the schema is controlled

Allowing individual agents to invent event types or fields would move schema complexity downstream and make longitudinal analysis unreliable.

LogQ therefore treats its event vocabulary as an interface contract.

Schema changes should be deliberate changes to the observability model rather than incidental decisions made during an individual coding task.

## Security Boundaries

LogQ is structured operational telemetry rather than an unrestricted application log.

Events must not contain secrets or arbitrary working context.

Excluded content includes:

- passwords and credentials;
- authentication tokens;
- private keys;
- plaintext encryption keys;
- `.env` contents;
- real PHI, PII, or payment data;
- production secrets;
- unrestricted request or response bodies;
- unrestricted command output;
- private prompt or repository content that is unnecessary for telemetry.

Events should contain only the metadata needed for correlation, workflow analysis, validation evidence, intervention tracking, terminal-state analysis, and collector health.

Observability should not create a second uncontrolled data-exposure path.

## Boundaries and Tradeoffs

The current implementation is intentionally bounded:

- telemetry is local to the development environment;
- Unix datagrams do not provide end-to-end delivery guarantees;
- emitter success is not evidence of persistence;
- the collector performs shallow rather than comprehensive semantic validation;
- JSONL is optimized for append and replay rather than analytical queries;
- generated sockets and event streams are runtime artifacts rather than normal source files;
- the parser, database read model, replay framework, and analytics layer are not yet implemented;
- operational behavior has not yet been characterized across a large population of agent runs.

These limits keep the ingestion path simple enough to inspect while its event model and operational usefulness are being validated.

---

## Next Milestone
{: .toc-ignore }

The next milestone is to add the first downstream consumer for completed LogQ segments.

The parser should:

1. consume only `.closed.jsonl` segments;
2. validate stored records;
3. preserve agent and run correlation;
4. track processed segments;
5. expose sequence gaps and invalid records;
6. support deterministic replay;
7. build a queryable derived model without mutating the source stream.

That work should be informed by real telemetry collected during MockCo development rather than by speculative analytics requirements.

## My Contribution
{: .toc-ignore }

I defined the LogQ problem, event architecture, delivery and durability model, event schema constraints, identity model, segment lifecycle, invalid-event behavior, and validation expectations.

I reviewed implementation decisions against those requirements and used the resulting system to explore how observable agent behavior can support a simpler and more evidence-driven governance model.

AI coding agents implemented bounded portions of the emitters, collector, persistence path, tests, and supporting documentation. Architecture, requirements, review, validation strategy, and final acceptance remained Human Lead responsibilities.

## Relationship to the Agent Harness
{: .toc-ignore }

LogQ is the observability subsystem for the [Agent Harness](/projects/agentic-development/agent-harness/).

The Agent Harness defines how coding agents receive work, operate within bounded authority, validate changes, and report completion.

LogQ provides the structured event stream needed to observe that operating model across runs.

The long-term objective is to use that evidence to determine which controls prevent meaningful failures, which controls create unnecessary friction, and where agent autonomy can safely increase.
