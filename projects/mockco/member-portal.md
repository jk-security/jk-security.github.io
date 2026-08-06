---
layout: page
title: Member Portal
subtitle: Secure Member-Facing Application and Protected Data Architecture
status: Work in progress
toc: true
permalink: /projects/mockco/member-portal/
---

Member Portal is MockCo's customer-facing application for a synthetic health-insurance enterprise. It combines a React browser application, an exact-route DMZ relay, a Production backend, and PostgreSQL-backed operational state.

The project explores how a public application can expose sensitive workflows without turning its DMZ or backend services into broad plaintext or authorization boundaries.

The current implementation validates member-scoped access, recent step-up controls, mutation safety, delegated access, security-account workflows, and a bounded browser-decryption path for synthetic protected documents.

{% include page-toc.html %}


## Architecture

{% include evidence-figure.html
   src="/assets/images/member-portal/member-portal-diagram.png"
   link="/assets/images/member-portal/member-portal-diagram.png"
   alt="Member Portal architecture showing the member workstation, exact-route DMZ relay, Production backend, and Production PostgreSQL."
   caption="The implemented request path runs from the member browser through an exact-route DMZ relay to the Production backend and PostgreSQL metadata store. Protected-document envelopes return through the same relay path. A bounded lab-only Web Crypto flow decrypts synthetic document fixtures in browser memory."
%}

The runtime separates four responsibilities:

| Component | Responsibility |
|---|---|
| Member browser | Presents member workflows and performs the bounded lab-only document decrypt operation. |
| DMZ relay | Serves the frontend and forwards only explicitly implemented Member Portal routes. |
| Production backend | Enforces session, member-scope, step-up, CSRF, idempotency, and workflow rules. |
| Production PostgreSQL | Stores synthetic operational state, public references, sessions, grants, devices, preferences, and audit projections. |

The browser uses the same-origin entry point on `127.0.0.1:8080`. The relay forwards approved requests to the backend on `127.0.0.1:8084`.

The current runtime does not include a live Crown-Jewel storage or key-management service.

## Implemented UI

{% include evidence-figure.html
   src="/assets/images/member-portal/member-portal-ui-overview.png"
   link="/assets/images/member-portal/member-portal-ui-overview.png"
   alt="MockCo Member Portal showing an authenticated synthetic member session, document navigation, the protected-content boundary, and a selected document."
   caption="The implemented lab UI presents the authenticated member workspace, document navigation, protected-content boundary, and selected synthetic document. The persistent sign-in panel reflects the current implementation rather than a production authentication experience."
%}

The interface gives the browser a same-origin view of approved member workflows. It does not expose direct access to the Production backend, PostgreSQL, or unrestricted document plaintext.
## What I Designed

### Exact-route DMZ relay

The DMZ service is not a generic reverse proxy.

Each browser-facing route must be explicitly implemented and mapped to an approved backend route. Unsupported methods and paths are rejected rather than forwarded implicitly.

This keeps the relay's authority narrow and makes the exposed Production surface reviewable.

### Member-scoped authorization

The backend authorizes requests using the authenticated account, member relationship, and any active delegated-access grant.

Possession of a public member, document, session, device, or grant reference is not sufficient authority.

Where resource existence should not be disclosed, invalid cross-member targets can return a sanitized `404` rather than confirming that the target exists.

### Step-up and mutation controls

Sensitive operations use explicit preconditions:

- recent synthetic step-up;
- CSRF validation;
- request idempotency;
- member and account scope;
- operation-specific authorization.

Implemented mutations include communication preferences, access-grant creation and revocation, trusted-device revocation, and session revocation.

Idempotent replay returns the original completed result rather than duplicating the state change.

### Protected-document handling

The backend returns a public protected-document envelope containing ciphertext and the metadata required by the bounded lab workflow.

The relay and backend do not decrypt the document.

For supported synthetic fixtures, the browser:

- derives a lab key with PBKDF2;
- decrypts AES-256-GCM ciphertext with Web Crypto;
- holds plaintext only in React component state;
- clears plaintext on explicit clear, failure, document change, section exit, or logout;
- reports only a sanitized decrypt outcome to the backend.

This demonstrates the client-side contract. It is not a production key-management design.

### Account-security workflows

The portal exposes member-facing security operations for:

- active sessions;
- trusted devices;
- delegated access grants;
- recent security activity;
- communication preferences;
- session and device revocation.

These views are projections over Production state rather than direct database or infrastructure access.

## Current Implementation

Member Portal is an active local systems lab, not a production healthcare application.

| Capability | State |
|---|---|
| React/Vite member portal | Implemented |
| Same-origin DMZ frontend and relay path | Implemented and validated |
| Explicit relay route allowlist | Implemented and validated |
| Production FastAPI backend | Implemented |
| PostgreSQL-backed operational state | Implemented and validated |
| Synthetic cookie-backed sessions | Implemented |
| Synthetic recent step-up | Implemented |
| CSRF and idempotent mutations | Implemented and validated |
| Member-scoped and delegated access | Implemented and validated |
| Session, device, and grant revocation | Implemented and validated |
| Security activity and overview projections | Implemented |
| Protected-document envelope retrieval | Implemented for synthetic fixtures |
| Browser Web Crypto decrypt | Lab-only synthetic document path |
| Production identity provider and MFA | Not implemented |
| Production key custody and recovery | Not implemented |
| Crown-Jewel runtime integration | Not implemented |
| Complete zone-aware container packaging | Not implemented |

Profile and claim APIs can expose protected-envelope metadata, but the browser-decryption implementation is currently limited to bounded synthetic document fixtures.

## Evidence

### Security-control validation

{% include runtime-evidence-figure.html
   label="Selected security-control evidence"
   src="/assets/images/member-portal/member-portal-selected-security-control-evidence.png"
   alt="Terminal output showing selected Member Portal security-control validation results."
   caption="Relay-path validation denies protected-document access before recent step-up and allows it afterward. The same run validates decrypt-event reporting, delegated access, idempotent mutation replay, sanitized method rejection, and completion of the security-control harness."
%}

The validation run demonstrates:

- `403` enforcement before recent step-up;
- successful protected-bundle retrieval after step-up;
- successful sanitized decrypt-event reporting;
- idempotent preference, grant, device, and session mutations;
- authorized delegated profile access;
- sanitized rejection of an unsupported method;
- successful relay-path completion.

The test uses synthetic identities, records, credentials, and protected-document fixtures.

### Protected-envelope response proof

The protected-document API returns ciphertext and public envelope metadata rather than plaintext. The evidence below records the repository revision, successful login and recent step-up, the protected-bundle response status, and a sanitized projection of the response fields.

{% include runtime-evidence-figure.html
   label="Protected-envelope response"
   src="/assets/images/member-portal/member-portal-protected-envelope-evidence.png"
   alt="Terminal output showing a successful protected-document bundle request and a sanitized encrypted-envelope response without plaintext."
   caption="The relay-path request returns a protected synthetic document bundle with encryption and KDF metadata, a nonzero ciphertext length, browser-decrypt availability, and explicit confirmation that plaintext is neither available nor present in the response."
%}

The collection procedure is retained as a small Bash script so the result can be reproduced without publishing cookies, CSRF values, ciphertext, or the synthetic password.

{% include runtime-evidence-figure.html
   label="Evidence collection script"
   src="/assets/images/member-portal/member-portal-protected-envelope-script.png"
   alt="Visual Studio Code capture showing the Bash script used to collect and sanitize the Member Portal protected-envelope response."
   caption="The script authenticates through the DMZ relay, performs synthetic recent step-up, requests the protected bundle, and prints only the fields required to demonstrate the encrypted-envelope contract."
%}

The response proof demonstrates:

- successful access only after authenticated session and recent step-up;
- a protected document and bundle reference;
- ciphertext encoding and nonzero ciphertext length;
- declared encryption and key-derivation metadata;
- browser-decrypt availability for the lab fixture;
- `plaintext_available: false`;
- absence of a `plaintext` response field;
- `lab_only: true`.

### Runtime boundary validation

{% include runtime-evidence-figure.html
   label="Observed runtime boundary"
   src="/assets/images/member-portal/member-portal-runtime-boundary-evidence.png"
   alt="Terminal output showing Member Portal listeners, PostgreSQL runtime state, and relevant Docker networks."
   caption="The DMZ relay and Production backend are bound only to VM loopback on ports 8080 and 8084. PostgreSQL runs in Docker and is published only on loopback at port 5432. Production and Crown-Jewel networks exist as architecture scaffolding, while the application services currently run as host processes."
%}

The current local runtime uses:

- a host-process relay on `127.0.0.1:8080`;
- a host-process backend on `127.0.0.1:8084`;
- PostgreSQL in Docker on `127.0.0.1:5432`.

The screenshot proves local listener and storage exposure. It does not claim that the relay and backend are already packaged into their intended Docker trust zones.

### Protected-document flow

{% include evidence-figure.html
   src="/assets/images/member-portal/member-portal-protected-document-flow.png"
   link="/assets/images/member-portal/member-portal-protected-document-flow.png"
   alt="Sequence diagram showing Member Portal authorization, recent step-up enforcement, protected-document delivery, browser decryption, and sanitized audit reporting."
   caption="The protected-document flow validates session state, recent step-up, and member scope before releasing ciphertext and public envelope metadata. Lab-only Web Crypto decryption occurs in browser memory, and only a sanitized decrypt-outcome event returns through the DMZ relay."
%}

The decrypt outcome is client-reported. The backend records the sanitized event but does not independently prove that browser decryption succeeded.

## Key Decisions

### The DMZ relays explicit routes; it does not expose a generic proxy

A generic forwarding endpoint would expand the backend surface whenever Production added a route.

Requiring an explicit relay mapping keeps public exposure deliberate and reviewable.

### Public references are not authorization tokens

Stable public references improve API usability, but possession of a reference must not grant access.

Every protected operation still evaluates the session, account-to-member relationship, active grants, and required step-up state.

### Sensitive mutations are idempotent

Network retries are normal in distributed systems.

Mutation request references allow replay to converge on the original result without creating duplicate grants, revocations, audit records, or preference changes.

### Browser plaintext remains bounded

For the implemented lab path, plaintext exists only in browser component state.

The browser does not store plaintext or decrypt material in:

- local storage;
- session storage;
- cookies;
- URLs;
- relay logs;
- backend logs.

### Errors reveal only necessary information

Authentication, authorization, step-up, unsupported-method, and upstream failures return stable sanitized responses.

Internal database identifiers, stack traces, infrastructure names, and unrestricted backend errors are not part of the browser contract.

## Failure Modes and Controls

| Failure mode | Current behavior |
|---|---|
| Missing or invalid session | Request fails with a sanitized authentication response. |
| Valid session without recent step-up | Sensitive document operation fails with `recent_step_up_required`. |
| Cross-member or unavailable resource | Request fails without exposing unrestricted resource details. |
| Repeated mutation request | Original completed result is returned with replay status. |
| Unsupported relay route or method | Request is rejected rather than forwarded generically. |
| Backend unavailable | Relay returns a sanitized upstream failure. |
| Browser decrypt failure | Plaintext state is cleared and a bounded outcome may be reported. |
| PostgreSQL unavailable | Persistence-dependent operations fail rather than silently falling back to in-memory authority. |

## Boundaries and Tradeoffs

The current implementation is intentionally bounded:

- identity and step-up are synthetic;
- protected-document fixtures use lab credentials and lab-derived keys;
- only the synthetic document path performs browser decryption;
- the Crown-Jewel storage and key-wrapping path is not runtime-wired;
- the relay and backend currently run as host processes;
- PostgreSQL is loopback-published for local development;
- the project does not demonstrate production recovery, hardware-backed key custody, availability, scale, or operational SLOs.

These constraints keep the system inspectable while the authorization, mutation, encrypted-envelope, and failure contracts are validated.

## Intended Evolution

### Production identity and recovery

The next identity phase requires a real identity provider, MFA or equivalent step-up, account recovery, device enrollment, and revocation semantics.

Recovery must restore legitimate access without creating an unrestricted enterprise decrypt capability.

### Crown-Jewel protected storage

The longer-term architecture places encrypted protected content and key metadata behind a separate Crown-Jewel service boundary.

That work requires explicit decisions for:

- key enrollment and custody;
- wrapping and re-wrapping;
- device loss and recovery;
- key rotation and revocation;
- service-to-service authorization;
- audit and emergency-access controls.

### Zone-aware runtime packaging

The relay, backend, and storage dependencies should be packaged into the intended network topology.

The target runtime should expose only the browser entry point while keeping backend and database services inside their assigned trust zones.

## Next Milestone
{: .toc-ignore }

The next milestone is to package the Member Portal runtime into explicit DMZ and Production networks while preserving the currently validated same-origin and exact-route behavior.

That work should:

1. containerize the relay and backend;
2. remove unnecessary backend and database host publication;
3. add network-boundary validation;
4. preserve the existing security-control smoke suite;
5. keep Crown-Jewel integration explicitly out of scope until key-management requirements are approved.

## My Contribution
{: .toc-ignore }

I defined the Member Portal architecture, trust boundaries, authorization model, protected-document contract, browser plaintext constraints, mutation controls, validation criteria, and acceptance decisions.

I reviewed implementation changes, exercised runtime and failure behavior, challenged unsafe assumptions, and directed corrections where the implementation did not preserve the intended boundary model.

AI coding agents implemented bounded changes across the React portal, FastAPI relay and backend, PostgreSQL persistence, tests, smoke harness, and supporting documentation. I retained responsibility for architecture, requirements, review, validation strategy, and final acceptance.

## Relationship to MockCo
{: .toc-ignore }

Member Portal is one of the two primary application workstreams in the MockCo architecture lab.

The [SecApp platform](/projects/mockco/security-operations-platform/) explores how Production establishes trusted operational state from externally influenced vulnerability and inventory data.

Member Portal explores external identity, member-scoped authority, encrypted content delivery, delegated access, and browser plaintext boundaries.

Both applications are developed through the [Agent Harness](/projects/agentic-development-governance/), with architecture, security decisions, validation expectations, review, and final acceptance remaining Human Lead responsibilities.