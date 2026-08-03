---
layout: portfolio-home
title: Security Engineering Leadership, Grounded in Implementation
introduction: >-
  Hands-on work across secure systems, application security,
  platform workflows, and governed agent-assisted development.
primary_action:
  label: Explore Projects
  route: /projects/
secondary_action:
  label: View Technical Residency
  route: /about/
technical_decisions:
  - project: Member Portal
    title: Encrypted envelopes and a browser-side plaintext boundary
    summary: >-
      Protected member data remains encrypted through Crown-Jewel storage,
      Production brokerage, and the DMZ relay. The intended plaintext boundary
      is the authorized browser, reducing broad enterprise-side plaintext
      exposure while introducing endpoint key-handling and recovery risk.
    route: /projects/mockco/member-portal/#encrypted-envelope-flow
  - project: SecApp
    title: Production-controlled promotion
    summary: >-
      Lower-trust vulnerability and inventory records are staged in the DMZ.
      Production initiates retrieval, validates and normalizes the evidence, and
      explicitly accepts or rejects it before it becomes authoritative state.
    route: /projects/mockco/security-operations-platform/#production-controlled-promotion
  - project: LogQ
    title: Unix datagrams for concurrent agent telemetry
    summary: >-
      Multiple agents emit compact events through a local Unix datagram socket
      without waiting for persistence. This keeps sender overhead low and
      separates emission from collection, while deliberately accepting that
      delivery is not end-to-end durable.
    route: /projects/agentic-development/logq/#why-unix-datagrams
residency:
  active_since: May 2026
  current_focus: Selected systems work
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
