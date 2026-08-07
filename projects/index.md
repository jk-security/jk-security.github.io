---
layout: project-directory
title: Security Engineering Projects
permalink: /projects/
introduction: >-
  Implementation-focused systems work across secure application architecture,
  exposure management, governed agentic development, application security,
  and supporting observability.
introduction_secondary: >-
  Each project page records the system purpose, current architecture,
  implementation state, technical decisions, accepted tradeoffs, and latest
  milestone. The work ranges from MockCo enterprise systems to agent-development
  infrastructure and hands-on application-security remediation.
introduction_tertiary: >-
  This directory provides a durable entry point into those case studies and
  related engineering work. It is designed for direct review from LinkedIn,
  GitHub, or a resume without requiring readers to reconstruct the portfolio
  hierarchy from the homepage.
---

{% assign featured_projects = site.data.projects | where: "featured", true %}
{% assign standard_projects = site.data.projects | where: "featured", false %}

{% for project in featured_projects %}
  {% include project-card.html project=project show_milestone=true %}
{% endfor %}

{% for project in standard_projects %}
  {% include project-card.html project=project show_milestone=true %}
{% endfor %}