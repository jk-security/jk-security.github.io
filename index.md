---
layout: portfolio-home
title: Security Engineering and Systems Work
introduction: >-
  Selected work in secure architecture, application security,
  distributed systems, and agent-assisted development.
status: >-
  Five active project workstreams. Implementation and validation
  states are shown on each project.
---

{% assign featured_projects = site.data.projects | where: "featured", true %}
{% assign standard_projects = site.data.projects | where: "featured", false %}

{% for project in featured_projects %}
  {% include project-card.html project=project %}
{% endfor %}

{% for project in standard_projects %}
  {% include project-card.html project=project %}
{% endfor %}
