---
layout: page
title: AppSec DVWA
subtitle: Exploit Validation and Secure Remediation Lab
status: Paused
toc: true
permalink: /projects/appsec-dvwa/
---

AppSec DVWA was a hands-on application-security training project built around a modified version of [Damn Vulnerable Web Application](https://github.com/digininja/DVWA). I used it to practice and document the full remediation loop: reproduce vulnerable behavior, inspect the code path, change the implementation, rebuild the application, and verify that the exploit no longer worked.

The project began as an earlier technical-upskilling effort, was revisited in early 2026, and was paused after the last substantial work in January 2026. It remains useful as a record of the application-security and training-environment design work completed at that point.

{% include page-toc.html %}

## Operational Problem

Application-security work requires more than recognizing a scanner finding or reproducing a payload.

The harder engineering problem is connecting several forms of evidence:

```text
finding
  -> vulnerable code path
  -> runtime behavior
  -> exploit impact
  -> remediation
  -> rebuild
  -> security re-test
```

The project was designed around that complete loop.

The central thesis was:

> Validated remediation is stronger evidence of understanding than exploit reproduction alone.

A learner should be able to explain where attacker-controlled input entered the application, which unsafe assumption or primitive created the vulnerability, how the code change altered that behavior, and what evidence demonstrated that the original exploit path had been removed.

## Lab Architecture

The lab used a self-contained, containerized training environment intended to run in GitHub Codespaces.

```text
Learner / Codespaces
        |
        v
DVWA web container
        |
        +------> MariaDB
        |
        +------> Observer service
```

The repository vendored DVWA directly rather than relying on a separate fork or submodule. This allowed a learner to clone one repository, start the environment, inspect the vulnerable source, modify it directly, and validate the result in the same workspace.

The runtime used Docker Compose, with DVWA source mounted into the web container so that most code changes could be tested without rebuilding the entire image.

The Observer service provided a controlled external endpoint for exercises where behavior crossed the DVWA process boundary, such as outbound requests, remote payload retrieval, callback behavior, or other externally visible effects.

## Training Model

The intended exercise loop was:

```text
read
  -> exploit
  -> scan
  -> modify
  -> rebuild or refresh
  -> re-test
  -> explain
```

This structure deliberately made remediation the primary skill.

Scanner output was treated as evidence rather than as the final answer. Static analysis, manual testing, runtime behavior, code review, and dependency information each described different parts of the system.

A learner was expected to connect those signals into a defensible conclusion:

```text
The tool reported X.
The relevant code was Y.
The exploit path was Z.
The impact was A.
The fix changed B.
The re-test demonstrated C.
Remaining limitations were D.
```

## DVWA Adaptation

The project was more than a stock DVWA deployment.

Several changes were made or designed to turn DVWA into a remediation-focused training environment:

- DVWA source was vendored directly into the training repository;
- the application ran through a Docker Compose environment;
- Codespaces/devcontainer support reduced local setup variance;
- learners edited the vulnerable source directly;
- DVWA security levels were simplified toward two student-facing modes: `Insecure` and `Secure`;
- the secure reference was based broadly on DVWA's original `Impossible` implementations and additional hardening;
- the vulnerable baseline was curated to emphasize the intended lesson rather than incidental scanner noise;
- supporting services were introduced where a single web application could not make cross-boundary behavior visible.

The purpose of the two-mode design was to make the comparison clearer:

```text
Insecure
  -> behavior that should be understood and remediated

Secure
  -> reference implementation showing a more defensible design
```

This reduced the need to reason about four DVWA security levels when the actual learning objective was the transition from unsafe to defensible behavior.

## Vulnerability Modules

The project documented several foundational vulnerability classes.

| Module | Main lesson |
|---|---|
| File Inclusion | User-controlled include paths can create local file inclusion, source disclosure, and remote inclusion risk. |
| Brute Force | Some serious vulnerabilities are behavioral and may not appear clearly in static analysis. |
| Command Injection | Passing attacker-controlled input to a shell creates a structural risk; removing shell execution can remove the vulnerability class. |
| CSRF | Authentication alone does not prove user intent for a state-changing action. |
| File Upload | Upload vulnerabilities are exploit chains; remediation should break multiple links in that chain. |
| SQL Injection | Parameterized queries prevent user input from controlling SQL structure. |

These modules were intended to teach transferable engineering principles rather than payload memorization.

### Command injection

The command-injection exercise traced user-controlled HTTP input into shell execution.

The remediation lesson was to remove the dangerous primitive where possible rather than attempting to build increasingly complicated filtering around shell execution.

```text
attacker-controlled input
  -> shell command construction
  -> command execution
```

The stronger design removed user control over shell semantics.

### SQL injection

The SQL-injection exercise focused on attacker control over query structure.

The vulnerable implementation incorporated request input into SQL construction. The secure reference used prepared statements and explicit parameter binding so that user-controlled values remained data rather than executable query syntax.

### File upload

The file-upload exercise treated exploitation as a chain:

```text
upload accepted
  -> unsafe content stored
  -> attacker can reach file
  -> server interprets content
  -> execution
```

The secure design broke that chain through multiple controls, including file-type restrictions, structural validation, safer storage and naming behavior, image re-encoding where applicable, and removal of executable treatment of uploaded content.

### Brute force

The brute-force exercise demonstrated the limits of source-oriented analysis.

A login flow can avoid injection vulnerabilities and still remain vulnerable to credential guessing because of missing throttling, lockout, or other behavioral controls.

This reinforced the need to combine code inspection with runtime testing.

### CSRF

The CSRF exercise demonstrated the difference between an authenticated browser session and proof of user intent.

The secure design used anti-CSRF controls, stronger validation, and re-authentication where appropriate for sensitive actions.

## Tooling Model

The project used security tooling as part of the feedback loop rather than as a substitute for analysis.

| Tooling class | State when work paused | Intended role |
|---|---|---|
| SAST | Partially configured / used | Identify dangerous code patterns and suspicious data flows. |
| Manual testing | Used | Reproduce exploit behavior and validate runtime impact. |
| Code review | Used conceptually and during remediation | Explain why the vulnerability existed and whether the fix addressed the cause. |
| DAST | Planned / partially explored | Confirm runtime behavior from outside the application. |
| SCA | Planned / partially explored | Add dependency-risk exercises. |
| Threat modeling | Planned | Teach abuse-case reasoning beyond scanner output. |

The project intentionally avoided treating scanner volume as a proxy for application-security maturity.

## Training Environment Design

A substantial part of the work was making the vulnerable application practical to use as a repeatable lab.

The repository included:

| Area | Purpose |
|---|---|
| `third_party/dvwa/` | Vendored DVWA training target. |
| `docker-compose.yml` | DVWA, database, and supporting-service runtime. |
| `docker/` | Container build assets. |
| `.devcontainer/` | Codespaces/devcontainer configuration. |
| `docs/` | Lab and vulnerability documentation. |
| `observer/` | Controlled external service for cross-boundary evidence. |
| `project_notes/` | Historical implementation and design notes. |
| `Makefile` | Convenience operations for environment management and validation workflows. |

The infrastructure goal was to reduce environmental variance so learners could spend their time understanding application behavior rather than debugging PHP, Apache, MySQL, Docker, and local path differences.

Reset behavior was also important because exploit testing can mutate application state. A training system should make it straightforward to return to a known baseline.

## Observer Service

The Observer service was introduced to make external behavior visible.

It was intended to support exercises involving:

- remote file inclusion;
- server-side request forgery;
- XML external entity resolution;
- blind command-execution confirmation;
- data-exfiltration patterns;
- CSRF delivery simulation.

Its role was evidentiary rather than offensive. It provided a controlled endpoint that could host deterministic content and record requests so that learners could demonstrate when the vulnerable application crossed a system boundary.

This design also created a natural foundation for future externally initiated DAST exercises.

## Security Boundaries

The lab was intentionally vulnerable and therefore required a deliberately narrow operating context.

### Training-only runtime

The environment was designed for isolated training use. It was never intended to represent production-safe infrastructure.

### Vulnerable behavior was intentional

The insecure implementation preserved selected exploit paths for learning purposes. Hardening therefore had to be understood in the context of each exercise rather than applied indiscriminately to the entire training target.

### Secure reference implementations were learning aids

The `Secure` mode was a reference implementation, not a claim that the broader DVWA-derived application had become production-ready.

### External interaction remained controlled

The Observer service was intended to provide deterministic lab-controlled external behavior instead of requiring arbitrary internet infrastructure for exploitation exercises.

## Evidence

A dedicated portfolio evidence pass was not completed before the project was paused.

The current page therefore documents the architecture, training model, vulnerability modules, and remediation approach without presenting runtime screenshots as proof artifacts.

A future evidence pass could add a small set of representative examples:

- Codespaces or Docker Compose runtime state;
- one vulnerable code path and exploit result;
- the corresponding secure code change;
- a failed exploit attempt after remediation;
- scanner output before and after the fix;
- Observer evidence for one cross-boundary vulnerability.

Those artifacts should be collected from the actual project state rather than reconstructed solely for presentation.

## Key Decisions

### Make remediation the learning objective

The project centered on changing code and proving the result rather than merely finding vulnerabilities.

That required learners to connect scanner signal, implementation detail, runtime behavior, and validation evidence.

### Vendor DVWA into the training repository

Keeping the training target in the same repository simplified the learner workflow.

A learner could inspect, edit, scan, rebuild, and commit changes without coordinating a submodule or separate upstream fork during normal exercises.

### Collapse the security-level model

The `Insecure` / `Secure` model reduced unnecessary cognitive load.

For this lab, the useful comparison was between intentionally vulnerable behavior and a defensible reference implementation.

### Remove dangerous primitives where practical

Several exercises reinforced the same secure-design principle: eliminating a dangerous primitive is usually stronger than attempting to perfectly filter attacker input around it.

Examples included avoiding shell execution for command injection and using parameterized queries for SQL injection.

### Treat external behavior as observable evidence

The Observer service made cross-boundary effects explicit and inspectable.

That allowed the lab to represent vulnerabilities whose meaningful impact was not fully visible from inside the DVWA process.

## Boundaries and Tradeoffs

The project was paused before the training environment reached the level of polish required for a broadly reusable course.

Known limitations at the January 2026 stopping point included:

- learner-facing instructions still needed consolidation;
- SAST workflows needed cleaner wrappers and more repeatable commands;
- DAST and SCA coverage remained incomplete;
- threat-modeling exercises remained planned;
- automated before/after validation was limited;
- some historical project notes were useful internally but not polished public documentation;
- vendored DVWA upstream metadata required better maintenance;
- learner-controlled vulnerability state could report `Secure` without independently proving successful remediation;
- the dedicated portfolio evidence set had not yet been collected.

These limitations are retained here because they describe the actual maturity of the project when work stopped.

---

## Status at Pause
{: .toc-ignore }

The last substantial work on AppSec DVWA was in January 2026.

At that point, the project had established the modified DVWA training target, containerized/Codespaces development model, two-mode remediation concept, Observer service direction, and documentation for several core vulnerability classes.

Work was paused while later Technical Residency efforts shifted toward MockCo architecture, agentic development, and structured observability.

The project could be resumed as a dedicated application-security training track, but this page describes the system as it existed when that work stopped rather than presenting planned features as current capability.

## My Contribution
{: .toc-ignore }

I designed the remediation-focused training model, adapted the DVWA environment, built the container/Codespaces workflow, defined the `Insecure` / `Secure` comparison model, developed the Observer concept, and worked through vulnerability-specific remediation patterns.

The project also served as an earlier human-led development baseline: I used ChatGPT for design support, troubleshooting, explanation, and review while applying and validating implementation changes directly.

## Related Pages
{: .toc-ignore }

- [Agent Harness](/projects/agentic-development/agent-harness/)
- [LogQ](/projects/agentic-development/logq/)
- [MockCo](/projects/mockco/)