# Public Evidence Guidelines

## Purpose

This document defines the standards for turning implementation work into credible public portfolio evidence.

It applies to evidence published for:

- SecApp;
- Member Portal;
- LogQ;
- Agent Harness;
- AppSec DVWA.

The objective is not to publish every implementation artifact. The objective is to select the smallest set of evidence that accurately demonstrates architecture, implementation, validation, and technical judgment.

## 1. Status Model

The portfolio uses two related but distinct status models.

### 1.1 Project lifecycle

Project lifecycle describes whether work is currently progressing.

| Status | Meaning |
|---|---|
| Active | Work is currently progressing. |
| Paused | Work is intentionally not progressing but may resume. |
| Complete | The defined project scope is finished. |

An Active or Paused project may contain capabilities at any evidence-maturity level.

A project marked Complete should have no unresolved work inside its stated completed scope. Future ideas should be represented as separate milestones, planned capabilities, or successor projects.

### 1.2 Evidence maturity

Evidence maturity describes how strongly a specific capability or claim is supported.

| Maturity | Required support |
|---|---|
| Planned | The capability appears in an approved roadmap, backlog, design direction, or next milestone. |
| Designed | Architecture, requirements, contracts, data models, workflows, or decisions are sufficiently defined for review. |
| Implemented | The behavior exists in code or configuration and has been exercised. |
| Complete | The implementation has repeatable validation evidence, documented constraints, and no unresolved work within the stated scope. |

Complete replaces the earlier use of Validated as a public maturity label.

Validation remains mandatory evidence for a Complete claim.

### 1.3 Status rules

- Do not use Implemented when only documentation or architecture exists.
- Do not use Complete merely because code was merged.
- Do not use Complete without repeatable validation evidence.
- Do not describe an entire Active project as Complete because one capability is complete.
- State the scope of every maturity claim.
- Prefer capability-level claims over broad project-level claims.

Example:

> Unix datagram event ingestion is Implemented. Collector shutdown and segment reconciliation are Complete against the documented local-runtime scope.

## 2. Evidence Categories

Each major project should eventually contain four evidence categories.

### Architecture

Explains the system structure, trust boundaries, components, or data flow.

Use diagrams for architecture.

Architecture evidence supports Designed claims. It does not independently prove that the design is implemented.

### Implementation

Shows that the described behavior exists.

Suitable evidence includes:

- application UI;
- API responses;
- database state;
- code excerpts;
- runtime service state;
- emitted events;
- generated files;
- configuration linked to exercised behavior.

Implementation evidence supports Implemented claims.

### Validation

Shows repeatable proof that the implementation behaves as claimed.

Suitable evidence includes:

- deterministic tests;
- expected failure behavior;
- authorization denial;
- rejected or quarantined input;
- failed re-exploitation;
- clean post-fix scan;
- rotation or shutdown behavior;
- reconciliation results;
- repeatable command output.

Validation evidence is required for Complete claims.

### Decision

Explains why a specific design was chosen and what tradeoff was accepted.

Decision evidence should identify:

- the problem;
- the selected approach;
- the rejected or deferred alternative;
- the constraint or tradeoff;
- the current scope.

Decision evidence supports technical-judgment claims. It does not independently prove implementation.

## 3. Project Evidence Requirements

### 3.1 SecApp

Required evidence:

- Architecture: external or endpoint input to DMZ staging, followed by Production promotion, normalization, correlation, and analyst workflow.
- Implementation: API, database state, promotion behavior, correlation output, or analyst panel evidence.
- Validation: rejection, quarantine, failure behavior, or deterministic test.
- Decision: why Production retrieves staged data rather than allowing the DMZ to push authoritative state.

### 3.2 Member Portal

Required evidence:

- Architecture: Browser to DMZ to Production broker to Crown-Jewel protected store.
- Implementation: UI, API, encrypted-envelope response, broker mapping, or data model.
- Validation: authorization, data minimization, exact-route behavior, or trust-boundary enforcement.
- Decision: protected-data envelope design and the future authorized-browser plaintext boundary.

### 3.3 LogQ

Required evidence:

- Architecture: emitter to Unix datagram socket to collector to open and closed JSONL segments.
- Implementation: live event sequence, collector behavior, or durable segment.
- Validation: invalid event, rotation, shutdown, reconciliation, or telemetry-gap behavior.
- Decision: append-only evidence source and derived read-model separation.

### 3.4 Agent Harness

Required evidence:

- Architecture: Human Lead authority and agent role or work-lane flow.
- Implementation: bounded build packet and an agent-produced change.
- Validation: command evidence, focused test result, or final agent report.
- Decision: bounded autonomy, retained Git authority, and governance simplification.

### 3.5 AppSec DVWA

Required evidence:

- exploit proof;
- scanner or analysis signal;
- vulnerable code path;
- remediation comparison or diff;
- failed re-exploit;
- post-fix scan or regression evidence.

A remediation is not Complete until the original exploit fails and appropriate post-fix validation passes.

## 4. Public Claim Rules

- Use Planned only for approved future work.
- Use Designed only when the architecture, requirements, or decision is reviewable.
- Use Implemented only when the behavior exists and has been exercised.
- Use Complete only when repeatable validation evidence exists and the stated scope has no unresolved work.
- Do not use production-ready without defining the production requirements and evidence.
- Do not use enterprise-grade without defining the organizational, operational, and security constraints.
- Do not use highly available without failure-domain, redundancy, and recovery evidence.
- Do not use scalable without workload assumptions and measured or reasoned capacity evidence.
- Do not use secure as an unqualified system property.
- Prefer precise claims such as authorization enforced, input rejected, boundary preserved, or exploit no longer reproducible.
- State known limitations and deferred work near the relevant claim.
- Do not claim that the portfolio proves readiness for a specific employer level. The portfolio strengthens evidence; the interview remains the evaluation.

## 5. Authorship and AI-Agent Attribution

Public evidence must distinguish architecture and acceptance authority from implementation assistance.

Use language consistent with the actual work:

- The Human Lead defined architecture, constraints, trust boundaries, work scope, review criteria, and acceptance.
- AI coding agents implemented bounded changes where applicable.
- The Human Lead reviewed, tested, corrected, and accepted the resulting work.
- Do not imply that the Human Lead manually wrote every line when agents produced substantial implementation.
- Do not imply that agents independently owned architecture, authorization, or final acceptance.

Preferred pattern:

> I defined the architecture, security constraints, and acceptance criteria. AI coding agents implemented bounded changes under those constraints. I reviewed the implementation, exercised the behavior, and accepted the final result.

## 6. Image and Asset Standards

### 6.1 Directory structure

Public evidence assets belong in:

- `assets/images/secapp/`
- `assets/images/member-portal/`
- `assets/images/logq/`
- `assets/images/agent-harness/`
- `assets/images/appsec-dvwa/`

System-level diagrams may remain in `assets/diagrams/`.

Raw evidence must not be copied into the public asset directories before sanitization and approval.

### 6.2 Preferred formats

| Asset type | Preferred format |
|---|---|
| UI or terminal screenshot | PNG |
| Architecture diagram | PNG for publication; editable source retained outside the public site when practical |
| Photographic material | WebP or JPEG |
| Small transparent illustration | PNG or WebP |
| Animated evidence | Avoid unless motion is necessary to prove the behavior |

Do not publish screenshots as JPEG when text clarity matters.

### 6.3 Aspect ratios

Preferred publication ratios:

- 16:9 for wide architecture or workflow evidence;
- 3:2 for general UI and implementation evidence;
- 4:3 for terminal, code, or validation proof;
- 1:1 only for compact thumbnails or isolated components.

The evidence proposition is more important than rigid adherence to a ratio. Crop to remove noise without removing material context.

### 6.4 Minimum resolution

- Wide evidence: minimum 1600 pixels wide.
- Standard evidence: minimum 1200 pixels wide.
- Compact evidence: minimum 800 pixels wide.
- Avoid upscaling low-resolution screenshots solely to meet these limits.

Images should remain legible at the rendered site width and when opened directly.

### 6.5 Cropping

Crop out:

- unrelated applications;
- unused terminal history;
- browser tabs not relevant to the evidence;
- desktop notifications;
- system trays;
- personal bookmarks;
- empty whitespace that does not communicate structure;
- unrelated repository files or source code.

Retain enough context to show what the evidence represents.

Do not crop away:

- the command associated with a terminal result;
- the route or component required to understand the behavior;
- relevant status, timestamps, or failure messages;
- the before/after relationship in a comparison.

### 6.6 Annotation style

Annotations should:

- identify one or two important facts;
- use short labels;
- avoid covering relevant evidence;
- use the site's accent red where practical;
- use arrows, outlines, or numbered markers consistently;
- avoid decorative annotation that does not add meaning.

Do not use annotations to make unsupported claims.

### 6.7 Filenames

Use lowercase kebab-case.

Pattern:

`<project>-<evidence-category>-<specific-subject>.<extension>`

Examples:

- `secapp-architecture-production-promotion.png`
- `member-portal-implementation-encrypted-envelope-response.png`
- `logq-validation-segment-reconciliation.png`
- `agent-harness-decision-bounded-work-lanes.png`
- `appsec-dvwa-validation-command-injection-retest.png`

Do not include:

- usernames;
- dates unless materially relevant;
- ticket numbers as the only description;
- `final`, `new`, `latest`, or version-copy suffixes;
- machine-generated opaque identifiers.

### 6.8 Optimization

Before publication:

- remove unnecessary metadata;
- crop unused pixels;
- avoid excessive dimensions;
- use lossless PNG optimization for screenshots;
- confirm text remains legible;
- verify the resulting asset is reasonably sized for web delivery.

As a practical target:

- ordinary screenshots should generally remain below 1 MB;
- complex architecture images may exceed 1 MB when legibility requires it;
- assets above 2 MB require explicit review.

## 7. Sanitization and Redaction

Public evidence must not expose:

- secrets or tokens;
- API keys;
- cookies or session identifiers;
- private keys or plaintext DEKs;
- real credentials;
- personal email addresses;
- personal home directories;
- machine names;
- internal IP addresses unless synthetic and necessary;
- private repository URLs;
- private branch names that reveal sensitive work;
- internal prompts or agent instructions;
- employer, client, or production data;
- real PHI, PII, claims, payment data, or member information;
- internal ticketing identifiers;
- hidden browser autofill data;
- unrelated terminal history.

### 7.1 Paths

Replace personal paths such as:

`C:\Users\<name>\...`

with a neutral path where needed, such as:

`C:\workspace\...`

or crop the path when it is irrelevant.

Repository-relative paths are preferred.

### 7.2 Usernames and machine details

Remove or replace:

- operating-system usernames;
- hostnames;
- VM names;
- local account names;
- shell prompts containing personal identifiers.

Synthetic application identities may remain when clearly fictional.

### 7.3 Branches and repositories

Public repository names may remain.

Private repository names, internal working-copy suffixes, experimental branch names, and private remote URLs must be removed unless explicitly approved.

### 7.4 Tokens and credentials

Do not blur secrets and then publish the image if the original asset may still contain recoverable data or metadata.

Instead:

1. revoke the exposed credential if necessary;
2. recreate the evidence without the secret;
3. verify the sanitized asset;
4. delete the unsafe copy from the publication workflow.

### 7.5 Redaction method

Preferred order:

1. recreate the evidence without sensitive material;
2. crop the sensitive area;
3. replace it with a neutral value before capture;
4. apply opaque redaction only when recreation is impractical.

Do not use translucent blur for secrets.

## 8. Evidence Presentation

### 8.1 Purpose

Every public image must support a specific proposition.

Before publishing, answer:

> What does this image prove or explain?

If that answer is unclear, the image should not be published.

### 8.2 Captions

Every public evidence image requires a caption.

A caption should state:

- what is shown;
- why it matters;
- the relevant constraint or result.

Preferred structure:

> Production retrieves staged vulnerability records through the DMZ gateway, validates them, and explicitly accepts or rejects them before persistence. This preserves Production authority over operational state.

Avoid captions that merely repeat visible labels.

### 8.3 Alt text

Alt text should describe the information conveyed by the image.

Include:

- the primary components or result;
- the important relationship;
- the relevant outcome.

Do not begin with “Image of” or “Screenshot of.”

Example:

> Three coding-agent emitters send events through a Unix datagram socket to a collector, which flushes append-only records to durable storage.

Do not place interpretation or marketing language in alt text.

### 8.4 Diagrams versus screenshots

Use diagrams to explain:

- components;
- trust boundaries;
- data flow;
- authority;
- sequencing;
- architectural decisions.

Use screenshots to prove:

- UI behavior;
- API behavior;
- runtime state;
- stored records;
- test results;
- failure handling;
- exploit or remediation outcomes.

Do not use a diagram as proof that behavior was implemented.

Do not use a raw terminal dump as the primary explanation of an architecture.

## 9. Approved Evidence Patterns

### 9.1 Architecture figure

Must include:

- relevant components;
- trust zones where applicable;
- directional data flow;
- a concise caption;
- alt text;
- no unsupported implementation indicators.

### 9.2 UI screenshot

Must include:

- the relevant workflow or result;
- enough UI context to identify the application;
- no unrelated browser or desktop content;
- a caption explaining the demonstrated behavior.

### 9.3 Terminal proof

Must include:

- the command;
- the relevant result;
- enough context to interpret success or failure;
- no unrelated command history;
- no personal prompt, hostname, token, or path.

Prefer a text excerpt in the page when the visual form adds no value.

### 9.4 Code comparison

Must include:

- a narrowly scoped before/after or vulnerable/remediated comparison;
- syntax-highlighted text where practical;
- the security or behavioral consequence;
- no large unreviewed source-file dump.

### 9.5 Validation result

Must include:

- the behavior being tested;
- the command or test identity;
- expected result;
- observed result;
- enough information to repeat the validation.

## 10. Evidence Register

Each evidence-collection ticket should maintain an external working register with at least:

| Field | Description |
|---|---|
| Project | SecApp, Member Portal, LogQ, Agent Harness, or AppSec DVWA |
| Category | Architecture, Implementation, Validation, or Decision |
| Proposition | What the evidence supports |
| Source | Commit, file, test, runtime command, or design document |
| Maturity | Planned, Designed, Implemented, or Complete |
| Sanitization | Sensitive material reviewed and removed |
| Public asset | Final repository-relative asset path |
| Caption | Approved public caption |
| Alt text | Approved accessibility text |
| Attribution | Human Lead and agent contribution statement where relevant |
| Approval | Review status and approver |

The working register may remain outside the repository. Only approved public assets and site content belong in the portfolio repository.

## 11. Publication Workflow

1. Define the proposition to support.
2. Select the evidence category.
3. Identify the source artifact.
4. Confirm that the source supports the intended maturity claim.
5. Reproduce or capture the evidence cleanly.
6. Sanitize it.
7. Crop and annotate it.
8. Optimize it.
9. Write the caption and alt text.
10. Verify routes, labels, and technical accuracy.
11. Review authorship and AI-agent attribution.
12. Approve the asset.
13. Copy the approved asset into the relevant public directory.
14. Add it to the project page using the evidence figure component.
15. Build the site and review desktop and mobile rendering.

## 12. Approval Checklist

Before publication, confirm:

- [ ] The asset supports one clear proposition.
- [ ] The associated maturity claim is accurate.
- [ ] Architecture, implementation, validation, and decision evidence are not conflated.
- [ ] No secrets, tokens, credentials, private keys, or session data are visible.
- [ ] No employer, client, production, PHI, PII, or payment data are visible.
- [ ] No personal usernames, hostnames, or private paths are visible.
- [ ] No private repository content or internal prompts are exposed.
- [ ] The crop retains the context required to understand the evidence.
- [ ] The image is legible and optimized.
- [ ] The filename follows the standard.
- [ ] The image has meaningful alt text.
- [ ] The image has a purposeful caption.
- [ ] Human Lead and AI-agent contributions are represented accurately.
- [ ] Known limitations are stated.
- [ ] Desktop and mobile presentation have been reviewed.

## 13. Approved Exemplar Register

This register identifies the reference example for each evidence pattern.

An exemplar is approved only after sanitization, technical review, caption review, alt-text review, and desktop/mobile presentation review.

| Evidence pattern | Exemplar | Status |
|---|---|---|
| Architecture figure | `assets/diagrams/mockco-enterprise-overview.png` | Approved existing example |
| UI screenshot | To be selected during SecApp or Member Portal evidence collection | Pending |
| Terminal proof | To be selected during LogQ evidence collection | Pending |
| Code comparison | To be selected during AppSec DVWA evidence collection | Pending |
| Validation result | To be selected during LogQ or AppSec DVWA evidence collection | Pending |

Pending exemplars do not block use of the evidence standard. They must be populated and approved before the associated evidence pattern is first published.
