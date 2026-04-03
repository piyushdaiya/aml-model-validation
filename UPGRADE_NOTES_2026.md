# Upgrade Notes 2026

## Purpose

This document summarizes the 2026 refresh of the repository.

The project was originally created in **2025** and has now been updated to support a stronger 2026 demo story, a more current technical baseline, and a clearer product positioning.

## High-Level Outcome

The repository has been refreshed from a 2025-era demo into a **2026 consulting-focused AML Model Validation Reporting Portal Demo**.

The portal now presents:

- secure reporting access
- consulting-practice and client-stakeholder personas
- traditional AML model validation reporting
- GenAI-assisted AML workflow validation reporting
- a clearer hosting and security story for consulting-led delivery

## Key 2026 Improvements

### 1. Library and dependency modernization

The codebase has been refreshed toward a more current 2026 baseline.

This refresh was intended to reduce incompatibilities from older package combinations and align the app to a more current framework/tooling setup.

Areas of improvement included:

- framework dependency refresh
- UI library alignment
- Prisma / database-client alignment
- general package cleanup for a more stable install/build baseline

### 2. Docker-based local environment

The repository now supports a Docker-based local setup for both:

- the web application
- the PostgreSQL database

This makes the demo easier to stand up consistently across environments and supports a more realistic consulting-demo workflow.

### 3. Product positioning shift

The repository is no longer primarily framed as a workbench that executes AML validation workflows in the consulting environment.

It is now positioned as a:

**secure AML Model Validation Reporting Portal**

This matters because in real financial-institution settings:

- data often cannot be moved outside the institution
- execution of validation workflows often remains inside the client environment
- consulting environments may only be allowed to host reporting, findings summaries, evidence references, and committee-ready outputs

This shift makes the demo more realistic and more credible.

### 4. Secure-access story

Login and registration remain enabled intentionally.

They are now part of the product story:

- the consulting-hosted portal requires controlled access
- the reporting surfaces are sensitive
- approved consulting and client stakeholders need authenticated access to review outputs

This is no longer described as incidental application plumbing. It is part of the secure reporting model.

### 5. Persona redesign

The persona model has been updated from workflow-oriented roles toward consulting-practice and client-reporting roles.

The new persona set is:

- Consulting Partner
- Engagement Lead
- Validation Lead
- Client Compliance Sponsor
- Client Model Sponsor
- Platform Admin

This aligns the portal to how a consulting-hosted reporting environment would actually be consumed.

### 6. GenAI validation reporting added

The demo now covers both:

- traditional AML model validation reporting
- GenAI-assisted AML workflow validation reporting

This is implemented as a second validation/reporting track within the same shared portal rather than a separate product area.

GenAI examples in scope include:

- `GAI-001 Alert Narrative Assistant`
- `GAI-002 AML Case Summarization Assistant`
- `GAI-003 AML Policy Copilot`
- `GAI-004 Disposition Recommendation Assistant`

### 7. Shared reporting portal narrative

The route structure remains shared:

- `/dashboard`
- `/models`
- `/models/[modelId]`
- `/testing`
- `/findings`
- `/reports/[modelId]`

The portal presents both traditional and GenAI reporting through one shared experience.

## Recommended Demo Reading Order

For someone reviewing the repository, the best order is:

1. `README.md`
2. `PERSONAS_DEMO_GUIDE.md`
3. `DEMO_WALKTHROUGH.md`

## Technical Notes

This refresh focused on making the demo more coherent and more presentation-ready.

The repository should still be understood as:

- demo-oriented
- primarily mock-data driven in core reporting surfaces
- suitable for stakeholder walkthroughs
- a foundation for future productization rather than a finished production platform

## What Still Remains Future Work

The following areas remain future-phase work:

- full RBAC enforcement
- production report ingestion pipelines
- production document management
- full audit/evidence management
- enterprise-grade operational controls

## Summary

The 2026 refresh did more than update libraries.

It also improved the business story:

- from a generic workbench
- to a secure consulting-hosted reporting portal

And it expanded the functional story:

- from traditional AML validation only
- to traditional AML plus GenAI-assisted AML workflow validation reporting

That combination makes the repository more realistic, more differentiated, and better aligned to how a consulting firm could actually introduce a larger AML validation product/application effort.
