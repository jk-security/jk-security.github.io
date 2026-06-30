---
layout: page
title: Agentic Development Governance
permalink: /projects/agentic-development-governance/
---

Agentic Development Governance is the operating-model track for my technical residency. It explores how AI coding agents can be used for real software work without turning the repository into an unreviewable pile of generated code, hidden assumptions, stale instructions, and accidental risk.

This project runs alongside MockCo. MockCo is the architecture and enterprise systems lab. Agentic Development Governance is the meta-layer: how the work is assigned, bounded, reviewed, validated, logged, and improved when AI agents are part of the development process.

## Core Question

The central question is:

> How can a solo developer use multiple AI coding agents productively while preserving scope control, security discipline, reviewability, and architectural intent?

The project is not about whether an agent can generate code. That is already obvious.

The harder questions are:

- What should the agent be allowed to decide?
- What must remain a Human Lead decision?
- How does the agent know which workflow applies?
- How do concurrent agents avoid stepping on each other?
- How do we prevent unsafe shortcuts around secrets, dependencies, trust boundaries, and Git history?
- What evidence should an agent produce before work is considered reviewable?
- How much governance is enough, and how much governance slows the work down without improving safety?

## Why This Exists

Agent-assisted development can move very quickly. That is useful, but speed creates its own failure modes.

Without explicit guardrails, agents can:

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
- optimize for "task completion" rather than system correctness.

This project treats those risks as engineering problems. The goal is to make safe work fast and unsafe work obvious.

## Relationship to MockCo

MockCo is the main system under development. It is a synthetic health-insurance enterprise with public-facing member workflows, internal security tooling, DMZ / Production / Crown-Jewel zones, sensitive data, endpoint simulation, and future cloud deployment.

That makes it a useful testbed for agentic development governance because many MockCo changes are not simple code-generation tasks. They can affect:

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

Those are exactly the areas where unbounded agent autonomy is risky.

## Development Iterations

The governance model has evolved through several iterations.

## V0 — Manual ChatGPT-Assisted Development

V0 was not agentic in the strict sense. I used ChatGPT as a coding and design assistant while making changes manually in VS Code.

The workflow looked roughly like this:

1. I wrote or inspected code locally.
2. I pasted errors, snippets, or design questions into ChatGPT.
3. ChatGPT produced explanations, code blocks, troubleshooting steps, or design suggestions.
4. I manually applied the changes.
5. I reran commands and repeated the loop.

This version had the lowest automation risk because no agent directly modified the repository. It also had the highest manual overhead.

### What V0 Taught

V0 was useful because it forced me to stay close to the code. I had to read changes, paste them, adapt them, and debug them myself.

It also showed the limitation of a pure chat-assisted workflow. As the project grew, the loop became slow. ChatGPT could help with a file, a route, or a design question, but it was not operating as a bounded developer inside the repository.

### Governance Level

V0 needed relatively little formal governance because the assistant had no direct write access.

The main governance burden was on me:

- decide what to ask;
- understand the output;
- apply only the parts that made sense;
- run validation;
- avoid copying unsafe patterns;
- keep the architecture coherent.

## V1 — Multi-Agent Codex Development

V1 introduced concurrent Codex development.

The operating model used three active instances:

| Instance | Intended role | Model used at the time |
|---|---|---|
| LEFT | Bounded development instance | 5.4 mini |
| RIGHT | Bounded development instance | 5.4 mini |
| UNBOUND | Broader autonomous implementation instance | 5.4 medium |

LEFT and RIGHT were bounded workers. UNBOUND had broader implementation authority and was intended to choose larger coherent slices with less hand-holding.

This was the first version where governance became a serious project requirement.

## What V1 Tried To Solve

V1 attempted to answer:

- Can multiple agents work on different parts of the same repository concurrently?
- Can one broader agent make larger implementation decisions while bounded agents handle narrower slices?
- How much instruction is needed to prevent unsafe edits?
- How do we preserve Human Lead authority while still getting useful agent autonomy?
- How do we make agent work reviewable after the fact?

## V1 Governance Shape

V1 used a larger governance model with many specialized roles. The model included roles such as Planner, Architect, Builder, Test, PR Reviewer, Docs, DevEx, Dependency Reviewer, Debug, Agent Surveyor, and Agent Manager.

The intent was reasonable: different kinds of work need different kinds of review.

For example:

- security-sensitive changes need architecture and boundary review;
- dependency changes need dependency review;
- failed validation may need debug review;
- documentation changes may need docs review;
- repeated agent failures may need retrospective review.

The v1 model also established several important durable rules:

- Human Lead remains accountable for final decisions.
- Agents operate only within approved scope.
- Secrets and credentials must not be exposed, created, copied, logged, or committed.
- Dependencies and tooling require approval if not already allowed.
- Trust boundaries must be preserved.
- Agents must not approve their own work.
- Agents must report validation honestly.
- Agents must stop when ambiguity affects behavior or risk.

Those rules remain directionally correct.

## What V1 Revealed

V1 also exposed a governance cost problem.

The model was safe-minded, but heavy. The number of personas and workflows created a lot of context load. For a solo developer trying to move quickly, too much governance can become a second project competing with the actual engineering work.

The UNBOUND instance was especially instructive. It was useful to have a more autonomous agent that could inspect the repo, infer patterns, choose a slice, implement, validate, and report. But the stronger the autonomy, the more important the stop conditions, scope boundaries, and reporting requirements became.

The practical lesson was:

> More autonomous agents need clearer boundaries, but clearer boundaries do not necessarily require more roles.

## V2 — Simplified LEFT / RIGHT Developer Instances

V2 simplifies the model.

The active instance model is now:

| Instance | Role |
|---|---|
| LEFT | Bounded developer instance |
| RIGHT | Bounded developer instance |

Both use the same general developer-instance framework. At the time of this writeup, both are intended to run stronger models than the original v1 LEFT/RIGHT setup.

UNBOUND is not part of the active v2 operating model.

The main v2 design goal is to preserve the useful discipline from UNBOUND without keeping a separate high-governance autonomous instance.

## V2 Operating Model

The active persona model is:

```text
Designer -> Builder -> Tester
```

This reduces the number of active roles while keeping the core separation of concerns:

| Persona | Responsibility |
|---|---|
| Designer | Defines design context, constraints, build packets, non-goals, acceptance criteria, and autonomy budgets. |
| Builder | Implements approved work inside scope, guardrails, workflow rules, and autonomy budget. |
| Tester | Validates behavior, evidence, boundary expectations, and validation gaps. |

The Human Lead remains accountable for final scope, final design, autonomy-budget approval, risk acceptance, governance changes, dependency/tooling approval, trust-boundary changes, merge decisions, release decisions, incident decisions, and destructive actions.

## Why V2 Is Simpler

V2 tries to reduce governance overhead in three ways.

### 1. Fewer active personas

Instead of routing every task through many possible specialist agents, V2 collapses the normal flow into Designer, Builder, and Tester.

Specialized concerns still exist, but they are represented through workflows, guardrails, and stop conditions rather than a large standing cast of personas.

### 2. Clearer workflow routing

V2 uses a workflow router that asks the agent to select one primary workflow before substantive work begins.

Current workflows include:

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

The agent must confirm the workflow before substantive work. If the task changes character, the agent must reassess and stop for Human Lead direction.

### 3. Explicit autonomy budgets

V2 introduces the idea of an autonomy budget.

The autonomy budget defines how much freedom the Builder has during implementation. It should be set during design work and approved before autonomous build work begins.

This matters because "implement this" can mean very different things:

- make a narrow mechanical change;
- implement a route;
- design and implement a vertical slice;
- alter data models;
- add new services;
- change trust boundaries.

The autonomy budget makes that implicit scope explicit.

## V2 Developer Instance Rules

Each v2 developer instance must confirm:

- assigned side: LEFT or RIGHT;
- assigned working copy;
- assigned branch;
- active persona;
- primary design document;
- primary implementation objective.

Each instance must stay inside its own working copy, branch, scope, instance file, and log root.

LEFT and RIGHT must not inspect, modify, coordinate through, stage, or write logs for the other instance unless explicitly instructed by the Human Lead.

This prevents a common multi-agent failure mode: one agent accidentally assumes context from another agent's work and creates a merge or review problem.

## Git Authority Model

V2 makes Git authority more practical than v1.

Agents may run Git inspection commands inside their assigned working copy and branch. They may also stage or unstage approved in-scope files for commit-ready review.

Agents may not perform Git publication or history-changing actions without explicit Human Lead approval.

That means agents may inspect and prepare, but the Human Lead controls publication.

Allowed by default:

- `git status`
- `git branch`
- `git log`
- `git remote -v`
- `git diff`
- `git diff --stat`
- `git diff --name-only`
- scoped `git add`
- scoped `git restore --staged`

Requires explicit Human Lead approval:

- `git commit`
- `git push`
- `git pull`
- `git fetch`
- `git merge`
- `git rebase`
- `git reset`
- `git clean`
- branch creation or deletion
- PR creation, update, merge, or closure
- remote or credential changes
- Git identity or config changes
- release or publication actions

This is a useful middle ground. Agents can help prepare reviewable work without becoming the authority that publishes it.

## Commit-Ready Logs

V2 treats agent logs as review artifacts.

The default rule is that logs under the active instance path are included in commit-ready file lists unless the Human Lead explicitly omits them.

This has two benefits:

1. The reviewer can see what the agent believed it was doing, what commands it ran, what validation passed or failed, and where it stopped.
2. The repo retains decision context instead of relying on hidden chat history.

Logs must be sanitized. They must not include secrets, real sensitive data, private keys, plaintext DEKs, full encrypted envelopes, `.env` contents, credential material, real PHI/PII, payment data, or production-like credentials.

## Guardrail Categories

V2 separates cross-cutting controls into guardrails.

Important guardrail categories include:

| Guardrail | Purpose |
|---|---|
| Trust boundaries | Zone rules, data-flow constraints, protected-data movement, service boundaries. |
| Dependency rules | Packages, tools, downloads, base images, external services, system changes. |
| Secrets rules | Credentials, tokens, private keys, DEKs, session material, controlled values. |
| Logging rules | Safe agent logs, application logs, audit logs, validation logs. |
| Validation rules | Honest reporting, command evidence, test results, validation gaps. |
| Concurrency rules | LEFT/RIGHT isolation, branch/log boundaries, merge-risk control. |

This is an improvement over making every prompt carry all instructions all the time. The agent loads the guardrail when the work implicates that risk area.

## Sensitive Change Handling

Sensitive changes are treated as gating events.

A task may require sensitive-change handling if it affects:

- trust boundaries;
- authentication;
- authorization;
- identity;
- encryption;
- key management;
- controlled material;
- sensitive data;
- public API contracts;
- persistence;
- schema;
- CI/CD;
- environment;
- logging exposure;
- recovery;
- retention;
- payment;
- audit behavior;
- network topology.

If a gating workflow applies, the stricter rule wins.

This is especially important for MockCo because many tasks touch security-sensitive areas even when they appear to be ordinary implementation work.

## Largest Governance-Safe Slice

One useful concept from the v2 prompt model is the "largest governance-safe slice."

After reading the design document and repository context, an agent may choose the largest coherent implementation slice that:

- directly advances the assigned design document;
- preserves trust boundaries;
- can be reviewed in the assigned branch;
- can be validated;
- avoids unapproved dependencies or controlled material;
- avoids unapproved schema, Docker, topology, CI/CD, or environment changes;
- avoids unapproved auth, cryptography, payment, recovery, audit, Crown-Jewel, or sensitive-data behavior;
- avoids coordination with another active instance;
- avoids broad unfinished scaffolding.

The point is not to make agents timid. The point is to let them choose useful work inside well-defined boundaries.

## What This Project Is Measuring

The next version of this work should collect more explicit performance data.

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
| Prompt/governance overhead | Time spent reading instructions; time spent reporting; useful work per session. |
| Human Lead load | Number of clarifying decisions required; number of avoidable interruptions. |
| Agent autonomy quality | Whether the agent chose a coherent slice without over-scaffolding or unsafe shortcuts. |

The goal is not just to ask whether agents are faster. The better question is whether they produce more reviewable, validated, architecture-aligned work per unit of Human Lead attention.

## Current Assessment

### What worked in V1

V1 proved that multiple agents can push a solo development project forward, especially when the work can be split across different parts of the repository.

It also showed that a more autonomous agent can be valuable for larger implementation slices.

### What did not work well enough in V1

V1 carried too much governance weight. The persona model was comprehensive, but heavy. It created more routing and review concepts than were practical for everyday solo-agent use.

UNBOUND was powerful, but the amount of instruction required to keep it safe made it less obviously better than improving the normal LEFT/RIGHT model.

### What V2 is trying to improve

V2 is trying to keep the useful parts:

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

But it simplifies the active model:

- two active instances instead of three;
- three personas instead of many;
- clearer workflow routing;
- clearer Git authority;
- explicit autonomy budgets;
- better metrics orientation.

## Design Principles

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

### Self-validation is useful but not independent review

An agent can run tests and check its work. That does not mean the work is independently reviewed or ready to merge.

### Governance should reduce ambiguity, not create theater

The purpose of governance is not to create ceremonial checklists. The purpose is to make boundaries, authority, validation, and stop conditions clear.

### Safe autonomy beats broad autonomy

The best agent is not the one with the fewest rules. The best agent is the one that can make meaningful progress without crossing boundaries the Human Lead did not intend to delegate.

## Open Questions

### How much governance is enough?

V1 probably had too much standing governance. V2 is simpler, but still may be heavy. The next step is to measure which instructions materially improve output quality.

### Should logs always be committed?

Commit-ready logs improve reviewability, but they also add noise. The default should probably remain "include logs," but this should be measured against actual reviewer usefulness.

### How should agent performance be compared?

Raw lines of code are not useful enough. Better measures include accepted slices, validation quality, rework rate, review friction, and Human Lead decision load.

### When should a third instance return?

V1 used LEFT, RIGHT, and UNBOUND. V2 uses only LEFT and RIGHT. A future V3 may reintroduce a third instance if there is a clear role that improves throughput without increasing governance overhead too much.

### What should V3 optimize for?

Possible V3 directions include:

- stronger metrics collection;
- explicit benchmark tasks;
- automated report extraction;
- tighter build-packet templates;
- improved agent log schema;
- clearer autonomy-budget levels;
- selective reintroduction of an autonomous review or surveyor role.

## Current Status

| Area | Status | Notes |
|---|---|---|
| V0 manual assisted workflow | Historical | Useful baseline for understanding manual ChatGPT-assisted development. |
| V1 multi-agent model | Completed experiment | LEFT, RIGHT, and UNBOUND model demonstrated both useful concurrency and governance overhead. |
| V2 simplified model | Current direction | LEFT and RIGHT developer instances with Designer / Builder / Tester personas. |
| Workflow router | Designed | Agents select one primary workflow and any required gating workflow before substantive work. |
| Guardrails | Designed | Trust boundaries, dependencies, secrets, logging, validation, and concurrency controls are separated. |
| Commit-ready logs | Designed / active | Logs are intended as review artifacts by default. |
| Metrics collection | Planned | Needs more structured capture across sessions. |
| V3 | Future | Not yet defined. Likely driven by what V2 metrics reveal. |

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
- turning agent logs into review artifacts;
- measuring whether the process is actually improving.

The goal is not to prove that agents can replace software engineering judgment.

The goal is to use agents while making the judgment visible.