---
layout: page
title: AppSec DVWA
permalink: /projects/appsec-dvwa/
---

AppSec DVWA is a hands-on application security upskilling project built around a modified version of [Damn Vulnerable Web Application](https://github.com/digininja/DVWA).

The goal is to provide a realistic practice environment for security analysts and security engineers who want to move beyond identifying vulnerabilities and toward understanding, fixing, rebuilding, and validating vulnerable application behavior. 

The core learning loop is:

```text
test exploit -> scan -> remediate in code -> rebuild -> validate remediation
```

This project is older than my current MockCo and agentic development governance work (I started work on it in early 2025, then returned to it in 2026 - perhaps an annual refresh, of sorts), but it fits well within the goals of "Technical Upskilling", as it's intended for both me and others (teams that I've worked with who have existing security experience, want to get into application security, and don't know where to start or what the "day to day" work will be).

## Purpose

The purpose of this project is to help learners practice the work that application security actually requires.

That means learning how to:

- run application security scans;
- interpret security findings;
- trace a finding to concrete application behavior;
- distinguish tool signal from tool noise;
- understand why a vulnerability exists;
- make safe, targeted code changes;
- rebuild the application;
- re-run scans and manual tests;
- validate that the application still works as intended;
- validate that exploitation no longer works;
- explain the remediation clearly, in technical terms.

The project is not meant to be a point-and-click scanner demo. It is also not a capture-the-flag exercise where the goal is simply to find the payload that works, rather the opposite.

The intended learning outcomes are
1. better understanding of DevSecOps workflows
2. better developer perspective
3. stronger AppSec judgment.

## Core Thesis

> Validated remediation proves understanding of an exploit.

A <b>junior</b> analyst can run a scanner and produce findings and "remediation recommendations" from the solution.

A <b>journeyman</b> analyst can also explain the finding, evaluate if the finding matters, and validate through exploit testing.

A <b> senior </b> analyst can also remeidate the vulnerability, rebuild the application, re-test the exploit path, and explain why the fix works.

This project is designed around that full loop.

## Development Context

This project was developed primarily in GitHub Codespaces, as the lab is intended to be a reproducible training environment, which learners could clone to their own contexts and run at their pace, rather than a local personal lab. The development goal was to make it possible for a learner to:

1. fork or clone the training repository;
2. open the project in Codespaces;
3. start the vulnerable application stack;
4. view DVWA in the browser;
5. edit the vulnerable source code;
6. run security tooling;
7. test exploitability;
8. apply a code fix;
9. rebuild or refresh the running environment;
10. re-test and validate the fix.

Other non-functional requirements included:

11. work at their pace
12. follow a curriculum, each expanding capability and understanding (easiest and foundation > hardest and more esoteric)
13. be able to self-service solutions through review of a hardened instance ("Secure" instance).
14. use a framework for journalling and notes on progress as they worked through the lab exercises

In the broader technical residency, this is an example of an early V0-style development pattern: human-led development with ChatGPT used for design support, troubleshooting, code review, and explanation, but with the human developer applying and validating changes directly.

## Why DVWA?

DVWA is useful because it is intentionally vulnerable, familiar, and small enough to reason about directly.

However, this project is not just a stock DVWA deployment. A significant portion of the work involved reshaping DVWA into a more deliberate remediation lab.

The project modifies and wraps DVWA to support a training flow that emphasizes code change and validation rather than simple exploitation.

Important differences from stock DVWA include:

- DVWA source is vendored directly into the training repository.
- DVWA runs in a Dockerized environment.
- Learners edit vulnerable application code directly.
- The application is intended to run cleanly in Codespaces.
- Security levels are collapsed into two modes: `Insecure` and `Secure`.
- The `Secure` mode is aligned to DVWA's original `Impossible` level, then further hardened.
- The `Insecure` mode is curated to preserve and showcase only the vulnerabilities intended for demonstration in each exercise.
- Lower-value incidental findings are cleaned up where they distract from the target lesson.
- Security tooling is used as feedback, not as the source of truth.
- Supporting services (stubbed user endpoint, "webwolf" attacker machine instance are added where DVWA alone cannot demonstrate realistic cross-boundary behavior.

The result is closer to a miniature AppSec remediation environment than a traditional vulnerable-app playground.

## Training Philosophy

The project is built around several AppSec principles.

### Vulnerabilities are properties of code and behavior

A scanner finding is not the vulnerability itself. It is a signal pointing toward unsafe assumptions, risky implementation choices, or missing controls.

A finding becomes meaningful when the learner can answer:

```text
Where is the vulnerable code?
What trust boundary is crossed?
What attacker-controlled input reaches a dangerous operation?
What behavior proves impact?
What code change removes or reduces the risk?
How do we know the fix worked?
```

### Tool output is evidence, not the answer

Static analysis, dependency scanning, dynamic testing, and manual validation each see different parts of the system.

Static analysis may identify dangerous dataflow. Dynamic testing may prove runtime exploitability. Dependency scanning may identify vulnerable packages. Manual review may show that a finding is contextual, not exploitable, or not relevant to the lab's intended lesson.

The learner's job is to integrate those signals into a defensible conclusion.

### Remediation is the primary skill

Finding a vulnerability is only the beginning. In real work, the difficult part is often deciding how to fix it without breaking the application or creating a different vulnerability.

This lab emphasizes code ownership:

```text
read -> exploit -> scan -> modify -> rebuild -> re-test -> explain
```

That is a much more realistic AppSec learning loop than simply completing a checklist of payloads.

### Secure code removes unsafe primitives where possible

Several modules reinforce the same lesson: the best fix is often not better filtering around a dangerous primitive. The better fix is to remove the dangerous primitive from the design.

Examples:

- Command injection is best addressed by avoiding shell execution.
- SQL injection is best addressed by parameterized queries, not string filtering.
- File inclusion should not allow user input to control executable include paths.
- File upload security requires breaking the exploit chain, not trusting one extension or MIME check.

## Repository Shape

The repository is structured as a self-contained training environment.

| Area | Purpose |
|---|---|
| `third_party/dvwa/` | Vendored DVWA source code used as the training target. |
| `docker-compose.yml` | Defines the local/container runtime for DVWA, MariaDB, and supporting services. |
| `docker/` | Container build assets for the training runtime. |
| `.devcontainer/` | Codespaces/devcontainer support for reproducible learner setup. |
| `docs/` | Lab explanations and vulnerability-specific learning material. |
| `observer/` | Controlled external service used to make cross-boundary behavior visible. |
| `project_notes/` | Working notes, setup notes, and historical project rationale. |
| `Makefile` | Convenience commands for bring-up, reset, logs, and future validation workflows. |

A key design decision was to vendor DVWA directly into the repository rather than relying on a submodule or separate fork. That makes the learner workflow simpler: fork the training repo, open Codespaces, edit DVWA code directly, scan, validate, and commit changes in one place.

## Runtime Model

The current runtime uses Docker Compose.

At a high level:

```text
Learner / Codespaces
    |
    v
DVWA web container
    |
    v
MariaDB database

DVWA web container
    |
    v
Observer service
```

The DVWA source is mounted into the web container rather than baked into the image. This supports fast iteration: a learner can edit source files and immediately test behavior without rebuilding the whole image for every code-only change.

The project also includes reset behavior for returning the environment to a known state. This is important because AppSec labs often mutate application state while testing exploits.

## Dockerized Training Infrastructure

A significant part of the project was not only modifying DVWA, but making DVWA usable as a training environment.

The infrastructure work included:

- containerizing the DVWA runtime;
- wiring DVWA to a database service;
- configuring Codespaces/devcontainer behavior;
- exposing the web UI in a way learners could reference;
- supporting spin-up, shutdown, reset, and rebuild workflows;
- using bind mounts so code changes are visible in the running container;
- preserving a single-repository workflow for learners.

This was important because the lab should teach AppSec, not environment/IaC troubleshooting.

The training experience should feel like:

```text
open environment -> start stack -> inspect app -> modify code -> validate result
```

not:

```text
spend two hours fixing local PHP, Apache, MySQL, Docker, and path issues
```

The environment is not perfect, but the infrastructure direction is correct: reduce setup variance so learners can focus on application behavior and remediation.

A future version of this will likely include vulnerabilities in IaC, but that's out of scope for now, as it's not built into DVWA, and these vulns would have to be coded new, rather than inherited from that project.

## DVWA Mode Redesign

Stock DVWA uses multiple security levels: Low, Medium, High, and Impossible.

This project intentionally collapses that model into two student-facing modes:

| Mode | Purpose |
|---|---|
| `Insecure` | The intentionally vulnerable baseline the learner is expected to inspect and fix. |
| `Secure` | The reference implementation, generally aligned to DVWA's original `Impossible` level. |

This makes the lab easier to reason about.

The learner does not need to compare four variations of a vulnerability. Instead, the learner focuses on the difference between:

```text
unsafe behavior that should be fixed
```

and:

```text
a defensible reference implementation
```

The goal is not to preserve every DVWA teaching level. The goal is to create a cleaner remediation-focused AppSec lab.

## Curated Vulnerability Baseline

Another major part of the work was cleaning up the vulnerable baseline.

The `Insecure` mode should not be a dumping ground for every possible weakness. It should preserve the vulnerabilities that the lab intentionally wants to demonstrate in each exercise.

The intended curation model is:

- remove or pre-resolve low-value Low and Medium findings where they distract from the lesson;
- preserve High and Critical findings that are useful for teaching;
- keep the vulnerable behavior clear, exploitable, and explainable;
- avoid accidental secondary vulnerabilities where possible;
- make each module teach a distinct AppSec concept.

_(Future work)_ Likely would include some chained exploit path (such as those more commonly exploited by mythos-like platforms), which would showcase that a series of lower-severity findings could result in compromise similar to an exploited High or Critical.

This matters because noisy labs teach the wrong instinct. If every page has many incidental findings, learners can mistake scanner volume for security understanding.

A better training target gives the learner a clean question:

```text
What is the intended vulnerability?
Why does it exist?
How do I exploit it?
How do I fix it?
How do I prove the fix worked?
```

## Student Guidance

The project includes early learner-facing and instructor-facing guidance.

The intended student journey is:

1. Clone or fork the repository.
2. Open the environment in Codespaces.
3. Start the DVWA stack.
4. Navigate to the DVWA UI.
5. Select an exercise.
6. Read the vulnerable code.
7. Test exploitability manually.
8. Run the available scanner.
9. Apply a code fix.
10. Rebuild or refresh the application as needed.
11. Re-run the exploit attempt.
12. Re-run the scanner.
13. Update status.
14. Commit the change with a short explanation.

Some of this guidance remains work in progress. The direction is clear, but the public learner path should eventually be consolidated into cleaner exercise instructions. This should feel like a professional training, not something the student has to wrestle with every step of the way. We want them to struggle with the right things.

## The Observer Service

The Observer is a supporting service that makes external behavior visible.

Some vulnerabilities are not fully demonstrated inside a single web application. They involve outbound requests, remote payload retrieval, callback behavior, or cross-system effects.

The Observer exists to provide:

- a controlled external endpoint;
- deterministic payload hosting;
- request logging;
- evidence of outbound application behavior;
- a realistic origin for manual and dynamic testing.

This matters for vulnerability classes like:

- Remote File Inclusion;
- Server-Side Request Forgery;
- XML External Entity resolution;
- blind command injection confirmation;
- data exfiltration patterns;
- CSRF delivery simulation.

The Observer is not intended to be an exploit framework. Its purpose is evidentiary: show what happened, when it happened, and how the application behaved across a boundary.

Observer is also a staging space for external exploit / recon activities. _(Future State)_ The application should support DAST scanning (likely OWASP ZAP) from outside DVWA, which should identify some unique, exploitable vulnerabilities.

## Learning Workflow

A typical exercise should work like this:

```text
1. Start from the intentionally vulnerable implementation.
2. Read the vulnerable source code.
3. Manually test or exploit the behavior.
4. Run relevant security tooling.
5. Compare tool output against observed behavior.
6. Inspect the secure reference implementation.
7. Modify the vulnerable implementation deliberately.
8. Rebuild or refresh the runtime as needed.
9. Re-run the exploit attempt.
10. Re-run scans.
11. Mark the vulnerability state.
12. Commit the fix with a short explanation.
```

The important part is that the learner can explain what changed and why the system is safer.

## Vulnerability State Model

The lab uses a simple state model for each vulnerability.

| State | Meaning |
|---|---|
| Insecure | The vulnerable baseline behavior exists. |
| Working | Remediation is in progress. |
| Secure | The vulnerability has been remediated and validated. |

Status is intentionally simple and student-controlled. It is informational rather than enforced. Changes in state are reflected in the UI of DVWA to show student progress. Automated validation of remeidation is _not_ a component of this project (i.e., if the student doesn't fix something, but changes the state to "Secure", it'll show "Secure").

The point is to reinforce ownership. Security remediation should be visible and intentional, not implied.

## Vulnerability Modules

The current project documentation covers several core vulnerability classes.

| Module | Main lesson |
|---|---|
| File Inclusion | User-controlled inclusion paths create local file inclusion, source disclosure, and remote file inclusion risk. |
| Brute Force | Some serious vulnerabilities are behavioral and may not be visible to SAST. |
| Command Injection | Passing user input to a shell is a structural flaw; avoiding the shell removes the risk class. |
| CSRF | Authentication is not proof of user intent; state-changing actions need intent validation. |
| File Upload | Upload bugs are exploit chains; robust fixes break the chain at multiple points. |
| SQL Injection | If user input controls SQL semantics, the application is vulnerable; prepared statements remove that control. |

These are foundational AppSec topics, but the lab treats them as engineering problems rather than trivia.

## Example: Command Injection

The command injection module is a strong example of the intended teaching style.

The vulnerable implementation passes user-controlled input into shell execution. This creates a direct dataflow from HTTP input to an operating system command sink.

The learner can:

- inspect the source;
- observe the unsafe primitive;
- run SAST and see high-confidence signal;
- exploit the behavior at runtime;
- confirm the execution context;
- compare against a secure implementation;
- remove shell execution from the vulnerable path;
- re-run the exploit and scan.

The lesson is not:

```text
escape input better
```

The lesson is:

```text
do not harden shells when you can avoid the shell entirely
```

## Example: SQL Injection

The SQL injection module focuses on attacker control over query semantics.

The vulnerable implementation embeds request input directly into a SQL statement. A payload such as an always-true condition changes the meaning of the query and returns records that should not be exposed.

The secure implementation uses prepared statements, explicit parameter binding, input validation, output encoding, and CSRF protection where appropriate.

The lesson is:

> If user input controls SQL structure, the application is compromised.

This module also reinforces a practical AppSec point: static analysis may flag dataflow, but runtime testing confirms data exposure and loss of isolation.

## Example: File Upload

The file upload module demonstrates that upload vulnerabilities are chains, not single checks.

For an upload to become code execution, several conditions must align:

1. The file is accepted.
2. The file is stored in a reachable location.
3. The server interprets it as executable content.
4. The attacker can request the uploaded file.

A weak fix that checks only extension or MIME type does not break the chain reliably.

The secure reference breaks the chain through multiple controls:

- strict allowlisted file types;
- structural image validation;
- image re-encoding;
- randomized filenames;
- safer rendering behavior;
- no execution of uploaded content.

The lesson is:

> If uploaded content can execute, the application is compromised. Breaking the execution chain is the fix.

## Example: Brute Force

The brute force module is useful because it is not primarily about an obvious dangerous sink.

A login flow may use prepared statements and avoid injection while still being vulnerable to credential guessing because it lacks behavioral controls.

The issue may require:

- runtime testing;
- repeated request observation;
- response comparison;
- lockout and throttling analysis;
- reasoning about authentication state.

The lesson is:

> Some serious vulnerabilities are invisible to static analysis.

This is especially important for analysts who are used to treating scanner results as the complete picture.

## Example: CSRF

The CSRF module demonstrates abuse of ambient browser authentication.

The application trusts the session cookie, but the browser may attach that cookie to requests the user did not intend to make. The vulnerability is not that the user is unauthenticated. The vulnerability is that the application fails to prove intent for a state-changing action.

The secure design adds anti-CSRF tokens, re-authentication, and cleaner request validation.

The lesson is:

> Authentication is not authorization, and authorization is not user intent.

## Tooling Model

The project currently has the strongest coverage around SAST.

The intended tooling model is broader:

| Tooling class | Current status | Role in the lab |
|---|---|---|
| SAST | Current / partially configured | Identify dangerous code patterns and dataflows. |
| DAST | Planned / partially explored | Confirm runtime exploitability and system behavior. |
| SCA | Planned / partially explored | Identify dependency risk where applicable. |
| Threat modeling | Planned | Help learners reason about abuse cases beyond scanner output. |
| Manual testing | Current | Validate exploit paths and confirm real impact. |
| Code review | Current / conceptual | Explain why the vulnerability exists and whether the fix is defensible. |

The lab should not teach tool worship. A scanner result is a prompt for reasoning.

The learner should be able to say:

```text
The tool reported X.
The relevant code is Y.
The exploit path is Z.
The impact is A.
The fix changes B.
The re-test proves C.
Remaining limitations are D.
```

## What This Project Demonstrates

This project demonstrates several technical and leadership-relevant skills.

### Application behavior reasoning

The project requires looking at real code and understanding how user input moves through the application.

### Vulnerability-to-code traceability

Findings must be tied back to specific source behavior, not treated as detached report entries.

### Secure remediation judgment

Fixes should remove or constrain risky behavior without overfitting to one payload.

### Feedback-loop discipline

The project emphasizes repeated scan, exploit, fix, rebuild, and re-test cycles.

### Training environment design

The repository is structured for learners and instructors, not just for a one-off personal experiment.

### Codespaces and container workflow design

The project required making a vulnerable application usable in a repeatable hosted development environment.

### Evidence-driven AppSec

The Observer system and runtime validation model push the learner to collect proof of behavior rather than rely on assumption.

## Current Status

This is an older project that has been revisited several times. The last major work was around January 2026.

Current status:

| Area | Status | Notes |
|---|---|---|
| DVWA training target | Implemented / modified | DVWA is vendored into the repo as editable training source. |
| Docker runtime | Implemented | Compose-based runtime for DVWA, database, and supporting services. |
| Codespaces/devcontainer model | Implemented / designed | Codespaces was the primary development environment and target learner environment. |
| DVWA two-mode model | Implemented / designed | Stock DVWA security levels are collapsed toward `Insecure` and `Secure`. |
| Vulnerability curation | Partially implemented | The intended baseline removes distracting Low/Medium findings and preserves High/Critical teaching targets. |
| Observer service | Implemented / designed | Supports cross-boundary evidence collection and payload hosting. |
| Vulnerability docs | Implemented for core modules | File inclusion, brute force, command injection, CSRF, file upload, and SQL injection are documented. |
| Status tracking | Implemented / designed | Vulnerability state is tracked through simple learner-controlled status files. |
| SAST workflow | Current / partially configured | SAST is the primary configured tooling path at this point. |
| DAST workflow | Planned | Important for behavioral and runtime vulnerability classes. |
| SCA workflow | Planned | Useful for dependency-risk exercises. |
| Threat modeling workflow | Planned | Useful for teaching abuse-case reasoning beyond scanner findings. |
| Automated tests | Planned | A test profile would improve repeatability before and after remediation. |
| Instructor workflow | Partially documented | Project notes exist, but could be consolidated into cleaner public-facing instructor material. |

## Known Limitations

This project is interesting, but not yet accessible, fully useful, or complete.

### Tooling wrappers need consolidation

The intended scan/fix/re-scan loop is clear, but learner-facing documentation should eventually make the exact SAST workflow more repeatable. DAST, SCA, and threat modeling remain planned expansions.

### Automated validation is incomplete

The next maturity step would be a test profile that can validate key lab behavior before and after remediation.

### Some historical notes are noisy

The repo contains project notes from earlier exploration. These are useful as a working record, but not all of them are polished public documentation.

### DVWA upstream tracking needs hygiene

The project vendors DVWA intentionally, but upstream commit/tag metadata should be completed and maintained if this becomes more public or reusable.

### The lab is intentionally insecure

The runtime must remain clearly scoped to local training only. It should not be presented as production-safe infrastructure. (Not unlike DVWA itself).

## Planned Improvements

Likely next improvements include:

1. Clean up learner-facing exercise flow.
2. Add or refine SAST wrapper commands.
3. Add DAST exercises for runtime-confirmed vulnerability classes.
4. Add SCA exercises for vulnerable dependency reasoning.
5. Add threat-modeling prompts for each vulnerability class.
6. Add repeatable validation scripts for each vulnerability module.
7. Improve status-file workflow and progress reporting.
8. Build instructor notes into a cleaner guide.
9. Complete DVWA upstream metadata.
10. Add screenshots or short walkthrough videos for selected modules.
11. Add a before/after remediation example with commits.

## Relationship to the Technical Residency

This project fits the residency because it develops hands-on AppSec depth.

MockCo focuses on secure architecture and enterprise system design. Agentic Development Governance focuses on how AI-assisted development should be bounded and reviewed. AppSec DVWA focuses on the concrete software-security loop:

```text
exploitability -> code cause -> remediation -> validation
```

Together, these projects cover different layers of security engineering:

- architecture and trust boundaries;
- development process and agent governance;
- hands-on vulnerability remediation.

AppSec DVWA is the most directly code-remediation-oriented of the three.
