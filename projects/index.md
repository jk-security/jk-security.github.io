---
layout: project-directory
title: Security Engineering Projects
permalink: /projects/
introduction: >-
  Five implementation-focused workstreams covering secure systems,
  application security, exposure management, agent observability, and
  governed agent-assisted development.
introduction_secondary: >-
  Each project page records the current architecture, implementation state,
  technical decisions, accepted tradeoffs, and latest milestone. The work
  ranges from public-facing protected-data systems to internal exposure
  management and agent-development infrastructure.
introduction_tertiary: >-
  This directory provides a durable entry point into those case studies.
  It is designed for direct review from LinkedIn, GitHub, or a resume,
  without requiring readers to reconstruct the project structure from the
  homepage.
---

{% assign featured_projects = site.data.projects | where: "featured", true %}
{% assign standard_projects = site.data.projects | where: "featured", false %}

{% for project in featured_projects %}
  {% include project-card.html project=project show_milestone=true %}
{% endfor %}

{% for project in standard_projects %}
  {% include project-card.html project=project show_milestone=true %}
{% endfor %}