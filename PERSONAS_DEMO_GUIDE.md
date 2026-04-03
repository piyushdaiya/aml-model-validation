# Persona Demo Guide

## Purpose

This guide explains how the secure **AML Model Validation Reporting Portal Demo** behaves for each persona.

This is a **reporting and evidence portal demo**, not yet a production operating platform for executing AML validation workflows.

Persona differences in this phase are primarily expressed through:

- dashboard emphasis
- KPI ordering
- widget ordering
- CTA labels and links
- activity-feed prioritization
- insight-banner messaging
- reporting highlights for traditional and GenAI validation tracks

The demo does **not** yet implement full RBAC or hard route restrictions.

## How To Use This Guide During A Live Demo

Use this sequence:

1. Sign in through `/login` or create a user through `/register`.
2. Open `/dashboard`.
3. Change persona from the **Persona** selector.
4. Keep the same route and client context while showing that the reporting emphasis visibly changes.
5. Explain that the same portal supports both:
   - traditional AML model validation reporting
   - GenAI-assisted AML workflow validation reporting

Current dashboard changes by persona:

- KPI strip order
- widget selection and order
- CTA labels and links
- activity feed emphasis
- insight banner text

## Shared Expectations For All Personas

Every persona should expect:

- the same secure application shell
- the same core reporting routes
- the same underlying synthetic data set
- cross-navigation into inventory, detail, testing summary, findings, and report views
- a consulting-focused experience meant to demonstrate reusable AML validation reporting capability
- one shared reporting portal covering both traditional AML models and GenAI workflows
- reporting visibility rather than institution-side workflow execution

---

## 1. Consulting Partner

### What this persona cares about

- portfolio-level visibility across active client engagements
- report readiness across engagements
- high-risk issues requiring leadership attention
- strategic extension into GenAI assurance for AML
- repeatability of the consulting delivery model
- monetizable potential of a secure reporting portal

### What should change in the demo

The dashboard should emphasize:

- active client engagements
- reports due or report readiness
- high-risk findings across clients
- GenAI workflow validation opportunities
- delivery status across the portfolio
- cross-engagement themes

### Primary call-to-action expectations

- Review Portfolio Status
- View Executive Reporting
- Review High-Risk Client Items

### What this persona should expect from the demo

The Consulting Partner should feel that the portal provides:

- a credible consulting-practice asset
- a secure way to present validation reporting without moving institution data
- a scalable cross-client reporting model
- a strong case for future productization

### What to notice in the GenAI track

- the consulting firm can extend beyond traditional AML model validation into AI assurance
- GenAI reporting appears as part of the same portal rather than a separate product
- GenAI findings and residual risk can be explained in a leadership-friendly way

---

## 2. Engagement Lead

### What this persona cares about

- material issues across the engagement
- remediation progress
- milestone readiness
- severity and likelihood of findings
- reporting completeness for committees and stakeholders
- risk posture across both traditional and GenAI validation items

### What should change in the demo

The dashboard should emphasize:

- material findings
- severity heatmap
- milestone and timeline status
- remediation progress
- revalidation triggers
- high-risk GenAI control issues

### Primary call-to-action expectations

- Review Engagement Status
- Review Remediation Priorities
- Open Findings Summary

### What this persona should expect from the demo

The Engagement Lead should feel that the portal provides:

- a single place to review reporting outputs across the engagement
- a practical way to align consulting delivery with client governance expectations
- clear prioritization of issues that need sponsor attention
- a coherent story for traditional and GenAI validation scope

### What to notice in the GenAI track

- hallucination or unsafe-recommendation risks are surfaced as reportable control issues
- GenAI testing outcomes are summarized in a way that supports steering decisions
- GenAI findings can be tracked in the same remediation conversation as traditional findings

---

## 3. Validation Lead

### What this persona cares about

- evidence completeness
- testing summaries
- data-quality exceptions
- external-data and grounding integrity signals
- traceability from testing to findings
- report-section readiness
- quality of reporting for both traditional and GenAI items

### What should change in the demo

The dashboard should emphasize:

- evidence completeness
- testing summary queues
- data-quality and grounding exceptions
- report sections that need follow-up
- scenario coverage
- audit trail completeness

### Primary call-to-action expectations

- Continue Review
- Review Evidence Gaps
- Open Testing Summary

### What this persona should expect from the demo

The Validation Lead should feel that the portal provides:

- a methodical way to review evidence and reporting outputs
- visibility into whether reporting sections are ready for committee or client review
- traceability between assumptions, tests, findings, and reporting language
- a consulting-grade reporting structure for independent validation

### What to notice in the GenAI track

- expected-versus-actual answer comparisons are treated as reporting evidence
- grounding failures and prompt/control failures are surfaced clearly
- GenAI reporting can be reviewed with the same rigor as traditional validation outputs

---

## 4. Client Compliance Sponsor

### What this persona cares about

- high-risk findings
- overdue remediation actions
- audit trail readiness
- evidence-pack status
- revalidation triggers
- policy adherence and human-review controls for GenAI workflows
- auditability of AI-enabled AML processes

### What should change in the demo

The dashboard should emphasize:

- high-risk findings
- remediation timelines
- audit-readiness indicators
- evidence-pack readiness
- grounding coverage
- human-review exceptions
- recent governance and approval events

### Primary call-to-action expectations

- Review Compliance Posture
- Open Findings
- Generate Committee-Ready Summary

### What this persona should expect from the demo

The Client Compliance Sponsor should feel that the portal provides:

- confidence that reporting is structured for governance and oversight
- visibility into control gaps across both validation tracks
- a secure way to review consulting outputs without exposing institution-side workflow execution
- a credible narrative for regulatory and audit discussions

### What to notice in the GenAI track

- policy-adherence issues are visible and understandable
- human-review controls are explicitly called out
- GenAI findings are presented in a governance-friendly way rather than as experimental AI output

---

## 5. Client Model Sponsor

### What this persona cares about

- documentation gaps
- pending approvals
- evidence gaps
- findings requiring response
- workflow boundaries for GenAI items
- prompt/version updates and reporting implications
- readiness for governance review

### What should change in the demo

The dashboard should emphasize:

- assigned validation reporting items
- documentation checklist progress
- upcoming milestones
- findings requiring sponsor response
- workflow-boundary reporting
- recent comments and requests

### Primary call-to-action expectations

- Review Sponsor Actions
- Update Supporting Evidence
- Prepare For Governance Review

### What this persona should expect from the demo

The Client Model Sponsor should feel that the portal provides:

- clarity on what needs to be reviewed or responded to
- visibility into documentation and evidence gaps
- an understandable path from validation reporting to governance discussion
- a practical mechanism for reviewing both traditional and GenAI reporting outputs

### What to notice in the GenAI track

- approved usage boundaries and prohibited actions are visible
- prompt/version changes matter from a governance standpoint
- GenAI workflow reporting is framed as controlled and reviewable rather than opaque

---

## 6. Platform Admin

### What this persona cares about

- secure portal access
- active client engagement setup
- reporting coverage across engagements
- environment health
- support issues
- configuration changes
- audit logs and operational visibility

### What should change in the demo

The dashboard should emphasize:

- active client engagements
- reporting-item counts
- portal/demo health
- support queue
- configuration changes
- access and audit-log visibility

### Primary call-to-action expectations

- Manage Portal Setup
- Review Configuration Log
- Open Support Summary

### What this persona should expect from the demo

The Platform Admin should feel that the portal provides:

- a manageable secure environment for consulting-hosted reporting
- clarity on access, configuration, and setup posture
- confidence that the reporting portal can scale across client engagements
- a foundation for future platform controls

### What to notice in the GenAI track

- provider/model metadata and configuration history can be surfaced safely as reporting metadata
- GenAI reporting items fit into the same portal administration model
- the portal can support AI-assurance reporting without needing to run AI workflows directly
