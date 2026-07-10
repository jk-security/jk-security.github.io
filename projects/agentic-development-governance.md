---
layout: page
title: Agentic Development Operating Model
permalink: /projects/agentic-development-governance/
---

Agentic Development Operating Model is the agent-assisted development track for my technical residency. It explores how far AI coding agents can be trusted to perform real software work autonomously while preserving enough visibility, reviewability, and human authority to keep the system safe.

This project runs alongside MockCo. MockCo is the architecture and enterprise systems lab. The agentic development track is the meta-layer: how the work is assigned, bounded, reviewed, validated, observed, measured, and improved when AI agents are part of the development process.

The focus is not governance for its own sake. In fact, one of the clearest lessons so far is that governance can be over-scoped. V1 was intentionally restrictive because it was my first serious experience with concurrent agentic development. That was appropriate at the time, but it created too much process weight.

V2 pushed back in the other direction: fewer personas, fewer standing gates, stronger models, and more room for agents to choose useful implementation slices inside clear boundaries.

V3 continues that direction. It does not reset MockCo or add another heavy governance layer. Instead, it introduces LogQ: a structured event stream for agent activity. The goal is to make agent work more observable and measurable so that future versions can reduce unnecessary process rather than add more of it.

## Core Question

The central question is:

> How can a solo developer use multiple AI coding agents productively while preserving scope control, security discipline, reviewability, and architectural intent?

This is a fast-moving field, and many enterprise patterns are still emerging. The goal here is not to claim a final answer. The goal is to get hands-on experience with the practical challenges of using agents for real development work.

A direct engineering challenge is:

> How can we optimize agent autonomy while maintaining human visibility and control — closer to human-on-the-loop than human-in-the-loop?

Some follow-on questions include:

- What should the agent be allowed to decide?
- What must remain a Human Lead decision?
- How do concurrent agents avoid stepping on each other?
- How do we reduce logic flaws, stubbed code, test-only behavior, and incomplete implementations from agent output?
- What evidence should an agent produce before work is considered reviewable?
- How much process is enough, and how much process slows development without improving safety, consistency, or project progress?
- Where is the practical boundary where an agent is operating as autonomously as it can without becoming unsafe or unreviewable?
- Can structured agent telemetry replace some of the manual reporting and front-loaded governance burden?

## Why This Exists

Agent-assisted development can move very quickly. That is useful, but speed creates its own failure modes.

Without explicit boundaries, agents can:

- broaden scope without noticing;
- modify unrelated files;
- add dependencies casually;
- weaken tests to pass;
- claim validation they did not run;
- hide uncertainty in confident summaries;
- cross trust boundaries accidentally;
- introduce unsafe data paths;
- commit secrets or sensitive material;
- produce large changes that are difficult to review;
- optimize for task completion rather than system correctness.

Some of these actions may be acceptable when they are explicit, scoped, reviewed, and approved. They are dangerous when they happen accidentally or invisibly.

This project treats those risks as engineering problems. The goal is to make useful autonomous work easier while making unsafe or ambiguous work obvious.

## Relationship to MockCo

MockCo is the main system under agentic development. It is a synthetic health-insurance enterprise with public-facing member workflows, internal security tooling, DMZ / Production / Crown-Jewel zones, sensitive data, endpoint simulation, and future cloud deployment.

That makes it a useful testbed for agentic development because many MockCo changes are not simple code-generation tasks. They can affect:

- trust boundaries;
- authentication and authorization;
- encryption and key handling;
- sensitive-data movement;
- service-to-service communication;
- public API contracts;
- persistence models;
- Docker and environment behavior;
- security operations workflows;
- logs, diagnostics, and auditability.

Those are exactly the areas where unbounded agent autonomy is risky, but over-governance can also slow useful work. MockCo gives the agentic development track a realistic environment for testing that balance.

## Development Iterations

The operating model has evolved through several iterations.

### V0 — Manual ChatGPT-Assisted Development

V0 was not agentic in the strict sense. I used ChatGPT as a coding and design assistant while making changes manually in VS Code.

The workflow looked roughly like this:

1. I wrote or inspected code locally.
2. I pasted errors, snippets, or design questions into ChatGPT.
3. ChatGPT produced explanations, code blocks, troubleshooting steps, or design suggestions.
4. I manually applied the changes.
5. I reran commands and repeated the loop.

This version had the lowest automation risk because no agent directly modified the repository. It also had the highest manual overhead.

#### What V0 Taught

V0 was useful because it forced me to stay close to the code. I had to read changes, paste them, adapt them, and debug them myself.

It also showed the limitation of a pure chat-assisted workflow. The loop was slow: much faster than developing entirely alone, but much slower than agentic development. ChatGPT could help with a file, a route, or a design question, but it was not operating as a bounded developer inside the repository.

#### Governance Level

V0 needed relatively little formal governance because the assistant had no direct write access.

The main governance burden was on me:

- decide what to ask;
- understand the output;
- apply only the parts that made sense;
- run validation;
- avoid copying unsafe patterns;
- keep the architecture coherent.

#### Environment Controls

V0 controls mostly consisted of working in GitHub Codespaces.

That virtualized environment was useful because it reduced concern about running in-progress, intentionally vulnerable, or only partially secure applications directly on my local host machine.

Most work was done in userspace, with root escalation only when required for package installation or environment setup.

### V1 — Multi-Agent Codex Development

V1 introduced concurrent Codex development.

The operating model used three active instances:

| Instance | Intended role | Model used at the time |
|---|---|---|
| LEFT | Bounded development instance | 5.4 mini |
| RIGHT | Bounded development instance | 5.4 mini |
| UNBOUND | Broader autonomous implementation instance | 5.4 medium |

LEFT and RIGHT were bounded workers. UNBOUND had broader implementation authority and was intended to choose larger coherent slices with less hand-holding.

The smaller model choice for LEFT and RIGHT was partly cost-driven. The goal was to keep experimentation within reasonable usage limits while testing whether smaller agents could handle bounded development work.

This was the first version where an explicit operating model became necessary.

#### What V1 Tried To Solve

V1 attempted to answer:

- Can multiple agents work on different parts of the same repository concurrently?
- Where are the tangible performance boundaries between smaller models and stronger models?
- Can governance files reliably prevent unsafe edits?
- How do we preserve Human Lead authority while still getting useful agent autonomy?
- How do we make agent work reviewable after the fact?
- How much can I trust agents to develop code?

Because this was my first serious exposure to agentic development, V1 was intentionally cautious.

#### V1 Governance Shape

V1 used a large governance model with many specialized roles.

The model included roles such as:

- Planner;
- Architect;
- Builder;
- Test;
- PR Reviewer;
- Docs;
- DevEx;
- Dependency Reviewer;
- Debug;
- Agent Surveyor;
- Agent Manager.

The intent was reasonable: different kinds of work need different kinds of review.

For example:

- security-sensitive changes need architecture and boundary review;
- dependency changes need dependency review;
- failed validation may need debug review;
- documentation changes may need docs review;
- repeated agent failures may need retrospective review.

The v1 model also established several durable rules:

- Human Lead remains accountable for final decisions.
- Agents operate only within approved scope.
- Secrets and credentials must not be exposed, created, copied, logged, or committed.
- Dependencies and tooling require approval if not already allowed.
- Trust boundaries must be preserved.
- Agents must not approve their own work.
- Agents must report validation honestly.
- Agents must stop when ambiguity affects behavior or risk.

Those rules remain directionally correct.

#### What V1 Revealed

V1 exposed a governance cost problem.

The model was safety-minded, but heavy. The number of personas and workflows created context load through extra reading, routing, and instructions at the start of each prompt. In practice, many personas quickly became unnecessary. Most useful work centered around architecture, build, and test responsibilities.

The UNBOUND instance was especially instructive. It was useful to have a more autonomous agent that could inspect the repo, infer patterns, choose a slice, implement, validate, and report.

I did not encounter many cases where the agent materially over-scoped or over-worked the task. That made me suspect I had been overly cautious about the likelihood of agents going rogue when given bounded autonomy.

The practical lesson was:

> Agentic systems still need clear authority, scope, validation, and stop conditions, but they may not need as many standing personas, review gates, and procedural controls as I initially assumed.

### V2 — Simplified LEFT / RIGHT Developer Instances

V2 was not simply a cleaner governance model. It was a deliberate counter-pressure against V1's over-governance.

The experiment was whether stronger agents, clearer task framing, and simpler instance isolation could produce better work with fewer procedural constraints.

The active instance model was:

| Instance | Role |
|---|---|
| LEFT | Developer instance |
| RIGHT | Developer instance |

Both used the same general developer-instance framework. Both were intended to run stronger models than the original v1 LEFT and RIGHT setup, closer to what UNBOUND was running.

The main v2 design goal was to run concurrent instances of more autonomous agents with fewer governance requirements and better data collection around output, lines of code, token usage, review quality, and validation quality.

V2 was directionally successful, though the evidence was still mostly qualitative rather than rigorously measured.

#### V2 Operating Model

The active persona model was:

```text
Designer -> Builder -> Tester
```

This reduced the number of active roles while keeping the core separation of concerns:

| Persona | Responsibility |
|---|---|
| Designer | Defines design context, constraints, build packets, non-goals, acceptance criteria, and autonomy budgets. |
| Builder | Implements approved work inside scope, guardrails, workflow rules, and autonomy budget. |
| Tester | Validates behavior, evidence, boundary expectations, and validation gaps. |

The Human Lead remained accountable for final scope, final design, autonomy-budget approval, risk acceptance, governance changes, dependency/tooling approval, trust-boundary changes, merge decisions, release decisions, incident decisions, and destructive actions.

#### Why V2 Was Simpler

V2 tried to reduce process overhead in three ways.

##### 1. Fewer active personas

Instead of routing every task through many possible specialist agents, V2 collapsed the normal flow into Designer, Builder, and Tester.

Specialized concerns still existed, but they were represented through workflows, guardrails, and stop conditions rather than a large standing cast of personas.

##### 2. Clearer workflow routing

V2 used a workflow router that asked the agent to select one primary workflow before substantive work began.

Current workflows included:

| Workflow | Purpose |
|---|---|
| Design Work | Architecture context, build packets, non-goals, acceptance criteria, autonomy budgets. |
| Autonomous Build Work | Larger approved implementation slices from a design/build packet. |
| Bounded Build Work | Narrow implementation tasks. |
| Test and Validation Work | Testing, validation, evidence, and gap classification. |
| Sensitive Change Work | Gating workflow for trust boundaries, auth, encryption, data, CI/CD, logging, recovery, audit, and similar areas. |
| Dependency or Tooling Work | Gating workflow for packages, tools, downloads, base images, external services, and system changes. |
| Governance Work | Changes to `.agents/` operating rules. |
| Independent Review Work | Separate assigned review pass. |
| Incident or Recovery Work | Suspected exposure, corruption, destructive actions, rule violations, or approved recovery. |
| Release or Versioning Work | Release notes, changelogs, versioning, and release readiness. |

The agent had to confirm the workflow before substantive work. If the task changed character, the agent had to reassess and stop for Human Lead direction.

##### 3. Explicit autonomy budgets

V2 introduced the idea of an autonomy budget, but in practice I did not leverage it meaningfully.

The autonomy budget was intended to define how much freedom the Builder had during implementation. It should have been set during design work and approved before autonomous build work began.

This matters because "implement this" can mean very different things:

- make a narrow mechanical change;
- implement a route;
- design and implement a vertical slice;
- alter data models;
- add new services;
- change trust boundaries.

The autonomy budget was supposed to make that implicit scope explicit.

The idea was sound, but my implementation was blunt:

1. It became an extra constraint rather than a permissioning mechanism. In practice, it was "same controls plus autonomy limit" rather than "fewer controls, with autonomy limits to compensate."
2. The concept was not defined clearly enough and proved hard to measure.

This remains a V3 improvement area.

#### V2 Developer Instance Rules

Each v2 developer instance had to confirm:

- assigned side: LEFT or RIGHT;
- assigned working copy;
- assigned branch;
- active persona;
- primary design document;
- primary implementation objective.

Each instance had to stay inside its own working copy, branch, scope, instance file, and log root.

LEFT and RIGHT could not inspect, modify, coordinate through, stage, or write logs for the other instance unless explicitly instructed by the Human Lead.

This prevented a common multi-agent failure mode: one agent accidentally assumes context from another agent's work and creates a merge or review problem.

#### Git Authority Model

V2 made Git authority more practical than V1.

Agents could run Git inspection commands inside their assigned working copy and branch. They could also stage or unstage approved in-scope files for commit-ready review.

Agents could not perform Git publication or history-changing actions without explicit Human Lead approval.

That meant agents could inspect and prepare, but the Human Lead controlled publication.

Allowed by default:

- `git status`;
- `git branch`;
- `git log`;
- `git remote -v`;
- `git diff`;
- `git diff --stat`;
- `git diff --name-only`;
- scoped `git add`;
- scoped `git restore --staged`.

Required explicit Human Lead approval:

- `git commit`;
- `git push`;
- `git pull`;
- `git fetch`;
- `git merge`;
- `git rebase`;
- `git reset`;
- `git clean`;
- branch creation or deletion;
- PR creation, update, merge, or closure;
- remote or credential changes;
- Git identity or config changes;
- release or publication actions.

This was a useful middle ground. Agents could help prepare reviewable work without becoming the authority that published it.

#### Commit-Ready Markdown Logs

V2 treated agent logs as review artifacts.

The default rule was that logs under the active instance path were included in commit-ready file lists unless the Human Lead explicitly omitted them.

This had two benefits:

1. The reviewer could see what the agent believed it was doing, what commands it ran, what validation passed or failed, and where it stopped.
2. The repo retained decision context instead of relying on hidden chat history.

Logs had to be sanitized. They could not include secrets, real sensitive data, private keys, plaintext DEKs, full encrypted envelopes, `.env` contents, credential material, real PHI/PII, payment data, or production-like credentials.

The Markdown logs performed better in V2 than in V1, but they were still limited. They were useful to read, but difficult to query, aggregate, compare, or analyze over time.

### V3 — LogQ Event Stream and Agent Observability

V3 keeps the V2 controlled-autonomy direction, but changes the logging model.

The major addition is **LogQ**, a local event-sourced logging process for Codex and agent activity.

V2 used bounded Markdown log roots:

```text
.agents/logs/LEFT/
.agents/logs/RIGHT/
```

V3 replaces those with a structured event stream:

```text
Codex / agent
  -> logq_emit.sh
  -> logq_emit.py
  -> Unix datagram socket
  -> LogQ collector
  -> active .open.jsonl segment
  -> closed .closed.jsonl segment
  -> future parser
  -> future database-backed analytics
  -> future materialized views and reports
```

The important change is that logging becomes machine-readable operational evidence rather than only human-readable session notes.

#### Why LogQ Matters

V2 showed that logs are useful, but Markdown logs do not scale well as an analysis substrate.

They are difficult to answer questions like:

- How many runs selected each workflow?
- How often did validation fail?
- How often did agents request Human Lead intervention?
- Which workflows create the most rework?
- Which agents or lanes produce the most useful implementation slices?
- How often do agents stop correctly rather than continuing through ambiguity?
- How much reporting overhead exists per useful change?

LogQ is intended to make those questions answerable later.

The point is not to create more governance. The point is to improve observability so that future versions can remove unnecessary process with evidence.

#### Current LogQ Model

The current V3.0 LogQ flow is:

```text
Codex / agent
  -> logq_emit.sh
  -> logq_emit.py
  -> Unix datagram socket
  -> LogQ collector
  -> .open.jsonl segment
  -> .closed.jsonl segment
```

Implemented capabilities include:

- Unix datagram socket listener;
- lightweight event emission wrapper;
- compact JSON event payloads;
- collector-assigned sequence numbers;
- collector receive timestamps;
- valid event normalization;
- invalid event wrapping into the same stream;
- base64 encoding of invalid raw payloads;
- batched JSONL writes;
- active `.open.jsonl` segments;
- completed `.closed.jsonl` segments;
- segment rotation by age, record count, or byte count;
- graceful shutdown with a final lifecycle event;
- governance guidance for LogQ event emission.

Generated LogQ stream files are not normal source artifacts. They should not be committed unless the Human Lead explicitly requests event-stream evidence for a task.

#### Event Identity

V2 used `LEFT` and `RIGHT` as both work lanes and log roots. That was useful, but too coarse for durable event-stream identity.

V3 keeps work lanes such as `LEFT` and `RIGHT`, but LogQ events should also carry identity metadata such as:

```text
agent_instance_id
agent_role
work_lane
run_id
workflow.primary
```

This separates the durable identity of an agent run from the human-assigned work lane.

That distinction matters once multiple runs, repeated sessions, future review lanes, or additional agents are introduced.

#### Parser and Analytics Direction

V3.0 creates the event stream foundation.

The next slices are expected to add:

```text
.closed.jsonl segments
  -> parser
  -> normalized event tables
  -> parser checkpoints
  -> replay support
  -> materialized views
  -> reports
```

Possible derived outputs include:

```text
runs by workflow
completion and failure rate
validation failure rate
human intervention count
budget pressure by workflow
recovery state freshness
native Codex diagnostic correlation
collector health and ingestion gaps
segment processing checkpoints
agent instance activity
```

The event stream should remain the durable source of truth. Databases, reports, and analytics views are rebuildable read models.

#### What V3 Is Testing

V3 is testing whether better observability can support more autonomy.

The hypothesis is:

> If agent activity is captured as structured events, I can reduce some front-loaded process while improving after-the-fact review, measurement, and comparison.

That means V3 is not a retreat back into heavier governance. It is an attempt to make the operating model more measurable so that future iterations can be lighter, faster, and more empirically grounded.

## What This Project Is Measuring

The next version of this effort should collect better performance data and organize that data more deliberately.

Useful metrics include:

| Metric area | Examples |
|---|---|
| Throughput | Number of useful implementation slices completed per session; files changed; tests added. |
| Reviewability | Diff size; number of unrelated files touched; reviewer time; clarity of final report. |
| Validation quality | Tests run; validation gaps; false claims avoided; failures reported honestly. |
| Rework rate | Number of follow-up fixes required; repeated failure patterns; reverted changes. |
| Boundary discipline | Stop-condition triggers; trust-boundary issues caught before implementation. |
| Dependency discipline | Unapproved dependency requests; `.off-limits` checks; avoided package sprawl. |
| Concurrency safety | LEFT/RIGHT overlap incidents; branch/log mistakes; merge friction. |
| Prompt / governance overhead | Time spent reading instructions; time spent reporting; useful work per session. |
| Human Lead load | Number of clarifying decisions required; number of avoidable interruptions. |
| Agent autonomy quality | Whether the agent chose a coherent slice without over-scaffolding or unsafe shortcuts. |
| Observability quality | Whether LogQ events provide enough evidence to reconstruct what happened and compare runs. |

The goal is not just to ask whether agents are faster. The better question is whether they produce more reviewable, validated, architecture-aligned work per unit of Human Lead attention.

## Current Assessment

### What worked in V1

V1 proved that multiple agents can push a solo development project forward, especially when the work can be split across different parts of the repository.

It also showed that a more autonomous agent can be valuable for larger implementation slices.

### What did not work well enough in V1

V1 carried too much governance weight. The persona model was comprehensive, but heavy. It created more routing and review concepts than were practical for everyday solo-agent use.

UNBOUND was powerful, but the amount of instruction required to keep it safe made it less obviously better than improving the normal LEFT/RIGHT model.

### What V2 improved

V2 kept the useful parts:

- Human Lead authority;
- explicit scope;
- trust-boundary preservation;
- workflow selection;
- dependency controls;
- no secrets;
- validation honesty;
- separate working copies;
- final reports;
- commit-ready logs.

But it simplified the active model:

- two active instances instead of three;
- three personas instead of many;
- clearer workflow routing;
- clearer Git authority;
- explicit autonomy budgets;
- better metrics orientation.

### What V3 is adding

V3 adds structured observability:

- LogQ event emission;
- Unix datagram socket ingestion;
- append-only JSONL event segments;
- agent identity metadata;
- future parsing into normalized tables;
- future materialized views and reports.

The current direction is not "more governance." The current direction is better autonomy with enough observability to preserve reviewability, safety, and measurement.

## Operating Principles

The project currently follows these principles.

### Agents may execute, but not own risk

Agents can design, build, test, validate, review, document, and recommend. The Human Lead owns final approval, risk acceptance, merge decisions, and destructive actions.

### Scope must be explicit

An agent that does not know what it is allowed to touch should stop. Hidden assumptions are not a safe source of authority.

### Workflow choice should be boring

The agent should know whether it is designing, building, testing, reviewing, changing governance, handling dependencies, or responding to an incident.

If workflow selection feels clever, the process is probably too vague.

### Logs are part of the work

Agent logs should explain the work well enough that a future reviewer can understand what happened without relying on chat memory.

In V3, this shifts from Markdown-only logs toward structured LogQ events that can be parsed and analyzed.

### Self-validation is useful but not independent review

An agent can run tests and check its work. That does not mean the work is independently reviewed or ready to merge.

### Governance should reduce ambiguity, not create theater

The purpose of governance is not to create ceremonial checklists. The purpose is to make boundaries, authority, validation, and stop conditions clear.

### Safe autonomy beats broad autonomy

The best agent is not the one with the fewest rules. The best agent is the one that can make meaningful progress without crossing boundaries the Human Lead did not intend to delegate.

### Autonomy should be tested, not assumed

V1 assumed more governance was necessary than may have been true. V2 tested whether stronger models and simpler rules could support more useful autonomy. V3 should push that test further with better measurement.

### Observability should enable less process, not more theater

Structured logging is useful only if it helps reduce ambiguity, compare outcomes, or remove unnecessary manual reporting. LogQ should support better autonomy; it should not become another ceremonial layer.

## Open Questions

### How much governance is enough?

V1 had too much standing governance. V2 was simpler, but still may be heavy. V3 should reduce governance further where possible and add better structure for efficient logging and metrics.

We still need better tracking to distinguish useful governance from process overhead.

### Should logs always be committed?

Commit-ready Markdown logs improved reviewability for external review, including review by me and ChatGPT outside the VM. They also added noise.

V3 changes the question. Generated LogQ event streams should not normally be committed as source artifacts. The better long-term pattern is likely:

```text
agent emits events -> LogQ persists local stream -> parser builds reports -> selected summaries or evidence are committed when useful
```

### How should agent performance be compared?

Raw lines of code are not useful enough.

Better measures include:

- accepted implementation slices;
- validation quality;
- rework rate;
- review friction;
- Human Lead decision load;
- number of avoided or unnecessary interruptions;
- ability to preserve architecture intent without repeated correction;
- quality and completeness of emitted LogQ evidence.

V3 should explore this more deliberately.

### When should a third instance return?

V1 used LEFT, RIGHT, and UNBOUND.

V2 uses only LEFT and RIGHT.

V2's LEFT and RIGHT instances seemed like a good optimization on cost. I rarely ran up against token limits, and there was still meaningful design and project-management work I could do in the 10–15 minutes between agent runs.

A future V3 operating pattern will likely retain the current two-instance model unless a third instance has a clear role that improves throughput without adding too much coordination or observability overhead.

### What should V3 optimize for?

Possible V3 directions include:

- stronger metrics collection;
- explicit benchmark tasks;
- automated report extraction;
- tighter build-packet templates;
- improved LogQ event schema;
- more autonomy;
- better identification of where autonomy starts to produce inappropriate work;
- selective reintroduction of an autonomous review or surveyor role.

## Current Status

| Area | Status | Notes |
|---|---|---|
| V0 manual assisted workflow | Historical | Useful baseline for understanding manual ChatGPT-assisted development. |
| V1 multi-agent model | Completed experiment | LEFT, RIGHT, and UNBOUND demonstrated both useful concurrency and governance overhead. |
| V2 simplified model | Completed / foundation | LEFT and RIGHT developer instances with Designer / Builder / Tester personas. |
| V3 LogQ model | Current direction | Replaces Markdown log roots with structured agent event emission and local JSONL streams. |
| Workflow router | Designed | Agents select one primary workflow and any required gating workflow before substantive work. |
| Guardrails | Designed | Trust boundaries, dependencies, secrets, logging, validation, and concurrency controls are separated. |
| Commit-ready Markdown logs | Superseded by V3 direction | Useful in V2, but not ideal for analytics or cross-run comparison. |
| LogQ event stream | Implemented foundation | Unix datagram socket, emitter wrapper, collector, and open/closed JSONL segments. |
| Metrics collection | Planned / emerging | LogQ provides the substrate for structured metrics and later reports. |
| Parser and analytics | Future | Closed JSONL segments should feed normalized tables, materialized views, and reports. |

## What This Project Should Demonstrate

This project should demonstrate that agentic development can be treated as an engineering system, not just a productivity trick.

The core skills being developed are:

- decomposing work for agent execution;
- designing safe autonomy;
- defining stop conditions;
- preserving architecture intent;
- preventing dependency and secret-handling mistakes;
- collecting useful validation evidence;
- managing concurrent agent work;
- turning agent activity into reviewable evidence;
- measuring whether the process is actually improving;
- finding the practical boundary between useful agent autonomy and unsafe delegation;
- using observability to reduce unnecessary process rather than adding process for its own sake.

The goal is not to prove that agents can replace software engineering judgment.

The goal is to use agents while making the judgment visible.
