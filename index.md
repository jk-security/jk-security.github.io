---
layout: portfolio-home
title: "Technical Portfolio: Secure System Engineering"
introduction: >-
  Current technical work and deliberate upskilling across secure systems
  engineering, application security, distributed systems, cloud-native
  infrastructure, and governed AI-assisted development.
primary_action:
  label: Explore Projects
  route: /projects/
secondary_action:
  label: About the Technical Residency
  route: /about/#technical-residency
technical_decisions:
  - project: Member Portal
    title: Keep routine plaintext at the authorized endpoint
    summary: >-
      The target architecture keeps protected content encrypted across storage
      and intermediary services, making the authorized endpoint the routine
      plaintext boundary. The current lab validates the relay/backend no-decrypt
      contract and bounded browser decryption, while production key custody,
      recovery, and break-glass access remain future design work.
    route: /projects/mockco/member-portal/#key-decisions
  - project: SecApp
    title: Production-controlled promotion
    summary: >-
      Lower-trust vulnerability and inventory records are staged in the DMZ.
      Production initiates retrieval, validates and normalizes the evidence, and
      explicitly accepts or rejects it before it becomes authoritative state.
    route: /projects/mockco/security-operations-platform/#key-decisions
  - project: LogQ
    title: Keep telemetry off the agent critical path
    summary: >-
      Agents emit telemetry without waiting for collector acknowledgement or
      durable persistence, keeping observability off the execution critical path
      and allowing producers to operate independently. The tradeoff is weaker
      delivery assurance and the possibility of failure-correlated telemetry loss.
    route: /projects/agentic-development/logq/#key-decisions
residency:
  active_since: May 2026
  current_focus: CKA study
  current_focus_route: /cka-study/
  environment: Synthetic enterprise lab
  status: Active
---

{% assign featured_projects = site.data.projects | where: "featured", true %}
{% assign standard_projects = site.data.projects | where: "featured", false %}

{% for project in featured_projects %}
  {% include project-card.html project=project %}
{% endfor %}

{% for project in standard_projects %}
  {% include project-card.html project=project %}
{% endfor %}
