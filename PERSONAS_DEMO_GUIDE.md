# Persona Demo Guide

## Purpose

This document explains how the AML Model Validation Workbench Demo is expected to work for each target persona and what each persona should expect from the demo.

This is a **demo experience**, not yet a production operating platform. Persona differences in this phase are primarily expressed through:

- dashboard emphasis
- KPI ordering
- widget ordering
- default calls to action
- activity feed prioritization

The demo does **not** yet implement full role-based access control or hard route restrictions.

## How to use this guide during a live demo

Use this sequence:

1. Sign in through `/login` or create a user through `/register`.
2. Open `/dashboard`.
3. Change persona from the **Persona** selector in the shared top shell.
4. Keep the same route and client context while showing that the dashboard visibly changes.

Current dashboard changes by persona:

- KPI strip order
- widget selection and order
- CTA labels and links
- activity feed emphasis
- insight banner text

## Shared expectations for all personas

Every persona should expect:

- the same overall application shell
- the same core set of demo routes
- the same underlying synthetic data set
- cross-navigation into model, testing, findings, and report views
- a consulting-focused experience meant to demonstrate reusable AML validation delivery capability

All persona views are intended to reinforce a consulting firm's ability to support multiple client engagements with a structured validation methodology.

---

## 1. Compliance Officer

### What this persona cares about

- high-risk findings
- overdue remediation actions
- revalidation triggers
- audit trail readiness
- evidence pack status
- governance actions and approvals

### What should change in the demo

The dashboard should emphasize:

- high-risk findings at the top
- remediation timelines
- revalidation triggers and models nearing review deadlines
- evidence packs ready for review
- recent governance and audit-related events

### Primary call-to-action expectations

- Review Compliance Posture
- Open Findings
- Generate OCC-Aligned Brief

### What this persona should expect from the demo

The Compliance Officer should feel that the demo provides:

- strong visibility into control gaps
- an auditable view of validation status
- confidence that remediation and review cycles can be tracked cleanly
- a credible consulting-ready narrative for governance and regulatory conversations

### What is intentionally not final yet

- full compliance workflow enforcement
- real regulatory reporting engine
- production document evidence management

---

## 2. Risk Manager

### What this persona cares about

- severity and likelihood of findings
- risk exposure across models
- model performance drift
- threshold exceptions
- failed stress or adversarial scenarios
- benchmark gaps

### What should change in the demo

The dashboard should emphasize:

- material risk issues
- performance trend widgets
- scenario failure summaries
- risk heatmap views
- threshold sensitivity and revalidation milestones tied to model risk posture

### Primary call-to-action expectations

- Review Risk Exposure
- Open Testing Lab
- Review Remediation Priorities

### What this persona should expect from the demo

The Risk Manager should feel that the demo provides:

- a quick view of where model risk is increasing
- evidence that testing rigor can be structured and repeatable
- clear prioritization of which issues deserve immediate attention
- a pathway from analytical model behavior to management action

### What is intentionally not final yet

- full risk methodology configuration
- real model execution pipelines
- production risk appetite/workflow integration

---

## 3. Model Owner

### What this persona cares about

- models assigned to them
- documentation gaps
- pending approval milestones
- assigned actions
- validation findings requiring response
- readiness for governance review

### What should change in the demo

The dashboard should emphasize:

- assigned models
- documentation checklist progress
- upcoming milestones
- findings requiring owner action
- recent notes and comments relevant to their models

### Primary call-to-action expectations

- Update Model Evidence
- Review Assigned Actions
- Prepare for Approval Review

### What this persona should expect from the demo

The Model Owner should feel that the demo provides:

- clarity on what is expected from them
- visibility into documentation and evidence gaps
- an understandable path to move models through review and approval stages
- a structured way to engage with validators and governance stakeholders

### What is intentionally not final yet

- live collaboration workflow
- production-grade document ingestion
- real task assignment integrations

---

## 4. Validator

### What this persona cares about

- pending validation reviews
- failed test runs
- data quality exceptions
- external data integrity alerts
- calibration changes
- evidence completeness

### What should change in the demo

The dashboard should emphasize:

- testing queue
- data-quality exceptions
- evidence completeness
- calibration history
- external source integrity status
- scenario coverage and failed test detail

### Primary call-to-action expectations

- Continue Validation
- Open Testing Lab
- Review Evidence Gaps

### What this persona should expect from the demo

The Validator should feel that the demo provides:

- a methodical workspace for validation work
- clear traceability between assumptions, evidence, and findings
- visible support for threshold, stress, and adversarial testing narratives
- a consulting-ready structure for independent validation execution

### What is intentionally not final yet

- actual model run orchestration
- reproducibility service backed by real job runs
- production-grade testing engine integration

---

## 5. Admin

### What this persona cares about

- active client engagements
- models in scope
- demo/system status
- support or configuration issues
- persona and demo setup state
- overall portfolio coverage

### What should change in the demo

The dashboard should emphasize:

- client portfolio summary
- model status overview
- demo/system activity
- configuration changes
- support queue or support-like indicators
- access/role overview presentation elements

### Primary call-to-action expectations

- Manage Demo Setup
- Review Configuration Log
- Open Support Summary

### What this persona should expect from the demo

The Admin should feel that the demo provides:

- a manageable multi-client workbench view
- visibility into portfolio and setup health
- confidence that the experience can scale as a reusable consulting accelerator
- a foundation for future configuration and governance controls

### What is intentionally not final yet

- real tenant administration
- full role provisioning
- production support tooling
- actual operational monitoring

---

## What all personas should remember

This phase is meant to help stakeholders evaluate the shape and value of a larger AML Model Validation platform effort.

The persona experience is intended to answer:

- Does the demo feel relevant to each stakeholder?
- Can one shared dashboard route adapt its composition enough to support different stakeholder conversations?
- Does the consulting accelerator feel reusable across clients without separate role-specific applications?
- Does it present the right information with the right emphasis?
- Does it show a believable path to a more complete product/application?
- Does it help the consulting firm explain how its AML validation practice could scale?

## Demo limitations to communicate clearly

During walkthroughs, it should be made clear that the demo currently uses:

- synthetic data
- mock scenario/test results
- mock activity feeds
- preview-only reporting/export actions
- UI-level persona emphasis instead of full RBAC

These are deliberate choices for phase 1 so the team can validate product direction and stakeholder value before investing in a full production platform.
