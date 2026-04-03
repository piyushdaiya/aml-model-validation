# Persona Demo Guide

## Purpose

This guide explains how the shared AML Model Validation Workbench Demo behaves for each persona.

This is a **demo experience**, not yet a production operating platform. Persona differences in this phase are primarily expressed through:

- dashboard emphasis
- KPI ordering
- widget ordering
- CTA labels and links
- activity-feed prioritization
- insight-banner messaging

The demo does **not** yet implement full RBAC or hard route restrictions.

## How to Use This Guide During a Live Demo

Use this sequence:

1. Sign in through `/login` or create a user through `/register`.
2. Open `/dashboard`.
3. Change persona from the **Persona** selector in the shared shell.
4. Keep the same route and client context while showing that the dashboard visibly changes.
5. Explain that the same shared workbench supports both:
   - traditional AML model validation
   - GenAI-assisted AML workflow validation

Current dashboard changes by persona:

- KPI strip order
- widget selection and order
- CTA labels and links
- activity feed emphasis
- insight banner text

## Shared Expectations for All Personas

Every persona should expect:

- the same overall application shell
- the same core demo routes
- the same underlying synthetic data set
- cross-navigation into inventory, workspace, testing, findings, and report views
- a consulting-focused experience meant to demonstrate reusable AML validation delivery capability
- one shared workbench covering both traditional AML models and GenAI workflows

All persona views are intended to reinforce a consulting firm's ability to support multiple client engagements with a structured validation methodology.

---

## 1. Compliance Officer

### What this persona cares about

- high-risk findings
- overdue remediation actions
- revalidation triggers
- audit trail readiness
- evidence-pack status
- policy adherence and human-review controls for GenAI workflows
- auditability of AI-enabled workflows

### What should change in the demo

The dashboard should emphasize:

- high-risk findings and high-risk AI findings
- remediation timelines
- revalidation triggers
- grounding coverage and human-review exceptions
- audit-trail and evidence-pack readiness
- recent governance, approval, and audit-related events

### What to notice in the GenAI track

When a GenAI workflow is opened from the inventory, the Compliance Officer should focus on:

- whether the workflow stays within approved usage boundaries
- whether responses are grounded in approved sources
- whether human review is explicitly required before operational action
- whether policy adherence and escalation behavior are documented
- whether findings show audit or control gaps that would matter in regulatory review

### Primary call-to-action expectations

- Review Compliance Posture
- Open Findings
- Generate OCC-Aligned Brief

### What this persona should expect from the demo

The Compliance Officer should feel that the demo provides:

- strong visibility into control gaps across both validation tracks
- an auditable view of validation status
- confidence that remediation and review cycles can be tracked cleanly
- a credible consulting-ready narrative for governance and regulatory conversations

---

## 2. Risk Manager

### What this persona cares about

- severity and likelihood of findings
- risk exposure across models and workflows
- model performance drift
- hallucination risk and unsafe recommendation risk
- failed stress, adversarial, and prompt-based scenarios
- threshold and prompt-control exceptions

### What should change in the demo

The dashboard should emphasize:

- material risk issues
- high-risk AI findings
- performance and scenario-failure widgets
- risk heatmap views
- prompt / test failures
- threshold sensitivity and revalidation milestones

### What to notice in the GenAI track

When a GenAI workflow is opened from the inventory, the Risk Manager should focus on:

- hallucination risk and unsupported recommendation behavior
- failed adversarial or unsafe-recommendation scenarios
- whether prompt or workflow controls materially reduce residual risk
- whether the workflow can be piloted safely with human review
- whether the findings justify remediation, restricted rollout, or pause

### Primary call-to-action expectations

- Review Risk Exposure
- Open Testing Lab
- Review Remediation Priorities

### What this persona should expect from the demo

The Risk Manager should feel that the demo provides:

- a quick view of where model risk is increasing
- a clear view of where GenAI workflow controls are not yet acceptable
- evidence that testing rigor can be structured and repeatable
- clear prioritization of which issues deserve immediate attention

---

## 3. Model Owner

### What this persona cares about

- validation items assigned to them
- documentation gaps
- pending approval milestones
- assigned actions
- validation findings requiring response
- workflow boundaries and prompt/version updates for GenAI items

### What should change in the demo

The dashboard should emphasize:

- assigned validation items
- documentation checklist progress
- upcoming milestones
- findings requiring owner action
- workflow-grounding posture
- recent notes and comments relevant to their models or workflows

### What to notice in the GenAI track

When a GenAI workflow is opened from the inventory, the Model Owner should focus on:

- intended use versus prohibited actions
- prompt pack version and recent changes
- documentation quality for workflow boundaries and human-in-the-loop controls
- open remediation tasks tied to response quality or safety controls
- what evidence is still needed before approval or pilot use

### Primary call-to-action expectations

- Update Model Evidence
- Review Assigned Actions
- Prepare for Approval Review

### What this persona should expect from the demo

The Model Owner should feel that the demo provides:

- clarity on what is expected from them
- visibility into documentation and evidence gaps
- an understandable path to move validation items through review and approval stages
- a structured way to engage with validators and governance stakeholders

---

## 4. Validator

### What this persona cares about

- pending validation reviews
- failed test runs
- data quality exceptions
- external data and grounding integrity alerts
- evidence completeness
- expected-versus-actual answer comparisons for GenAI workflows
- prompt scenario failures and control gaps

### What should change in the demo

The dashboard should emphasize:

- testing queue
- data-quality exceptions
- evidence completeness
- AI workflow validation status
- source-integrity and grounding signals
- scenario coverage and failed test detail

### What to notice in the GenAI track

When a GenAI workflow is opened from the inventory, the Validator should focus on:

- grounding coverage and source freshness
- prompt-by-prompt expected versus actual outputs
- hallucination, refusal, and escalation behavior under controlled scenarios
- whether the workflow preserves traceability from evidence to answer
- whether findings and notes are sufficient to support an independent validation conclusion

### Primary call-to-action expectations

- Continue Validation
- Open Testing Lab
- Review Evidence Gaps

### What this persona should expect from the demo

The Validator should feel that the demo provides:

- a methodical workspace for validation work
- clear traceability between assumptions, evidence, and findings
- visible support for traditional testing and GenAI prompt/control testing
- a consulting-ready structure for independent validation execution

---

## 5. Admin

### What this persona cares about

- active client engagements
- validation items in scope
- GenAI workflows in scope
- demo/system status
- support or configuration issues
- persona and demo setup state
- overall portfolio coverage

### What should change in the demo

The dashboard should emphasize:

- client portfolio summary
- validation-item status overview
- AI workflow validation status
- demo/system activity
- configuration changes
- support queue and access overview

### What to notice in the GenAI track

When a GenAI workflow is opened from the inventory, the Admin should focus on:

- provider or model configuration metadata
- workflow/version setup state
- environment or demo health implications
- consistency of item types and route behavior across the workbench
- whether the GenAI track looks operationally manageable as part of the same consulting accelerator

### Primary call-to-action expectations

- Manage Demo Setup
- Review Configuration Log
- Open Support Summary

### What this persona should expect from the demo

The Admin should feel that the demo provides:

- a manageable multi-client workbench view
- visibility into portfolio and setup health
- confidence that the experience can scale as a reusable consulting accelerator
- a foundation for future configuration, provider, and governance controls
