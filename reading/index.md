---
layout: page
title: Reading
permalink: /reading/
---

This section tracks technical reading used as part of the residency.

The purpose is not to publish book summaries. I use reading to sharpen engineering judgment: identify the underlying systems model, understand the tradeoffs it creates, and connect those ideas to architecture, security, reliability, and operational work.

## Reading Method

For each major book or topic, I work through four questions:

1. **What is the core technical model?**
2. **What assumptions and tradeoffs does that model create?**
3. **Where does it change how I think about security or system design?**
4. **What can I apply to an implementation or operating problem?**

The most useful reading notes are therefore closer to design commentary than chapter summaries.

A concept is particularly valuable when it changes how I reason about things such as:

```text
source of truth
  -> replication and derived state
  -> failure modes
  -> recovery
  -> observability
  -> security consequence
```

## Current Reading

### Designing Data-Intensive Applications

*Designing Data-Intensive Applications* is the current foundation of the reading track.

The focus is on the engineering properties behind reliable systems:

- data models and storage;
- logs and derived state;
- replication;
- partitioning;
- consistency;
- transactions;
- batch and stream processing;
- reliability, scalability, and maintainability.

I am using these concepts as a vocabulary for reasoning about the systems in the residency rather than treating them as isolated database topics.

Examples of the connections include:

- append-only event streams and derived read models in LogQ;
- accepted versus staged state in SecApp;
- ownership and boundary transitions in the Member Portal;
- durability, replay, recovery, and observability across the broader MockCo architecture.

Public DDIA notes are still being edited into standalone material. The repository currently contains a placeholder page, so I am intentionally not linking to it as if the notes are already published.

## Reading Areas

The broader reading plan covers topics that reinforce the implementation work:

- distributed systems and data-intensive architecture;
- cloud infrastructure and virtualization;
- Kubernetes and cloud-native operations;
- microservices and service-oriented architecture;
- reliability engineering and chaos engineering;
- legacy modernization and technical debt;
- secure software engineering;
- application-security program design.

The reading order is driven by the technical problems that are most useful to the residency rather than by a fixed curriculum.

## What Gets Published

Working notes can be messy. They may contain unfinished explanations, questions, copied references, or connections that have not yet been tested against implementation.

Material is published here only when it is useful as a standalone technical artifact.

Published reading notes may include:

- a concise explanation of the concept;
- a system or security implication;
- a concrete example from a residency project;
- an open design question;
- a diagram or small model;
- a short reflection on where my understanding changed.

The goal is to make the evolution of technical reasoning visible without turning the site into a chapter-by-chapter reading log.

## Relationship to the Residency

Reading is most useful when it feeds back into implementation.

The intended loop is:

```text
read
  -> form a systems model
  -> apply it to a real design
  -> observe where the model breaks down
  -> refine the model
```

That feedback loop is why the reading section sits alongside the project portfolio rather than as a separate book-review section.