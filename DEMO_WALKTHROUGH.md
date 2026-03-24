# Demo Walkthrough

## Purpose

This document provides a practical walkthrough for presenting the **AML Model Validation Workbench Demo** to consulting leadership, practice leads, client-facing teams, and other internal decision-makers.

The goal of the walkthrough is to help reviewers understand:

- why this demo matters for a consulting-led AML model validation practice
- what business problem it is trying to solve
- how the demo supports multiple stakeholder perspectives
- why the firm should approve a larger product/application effort

This is a **phase-1 consulting accelerator demo**. It is not yet a production platform.

---

## Recommended audience

This walkthrough is best used with:

- consulting leadership
- AML practice leads
- engagement managers
- solution architects
- internal product sponsors
- selected client-facing stakeholders

---

## Demo objective

The primary objective is to show that the firm can evolve from ad hoc AML model validation delivery into a **repeatable, scalable, productized workbench**.

The walkthrough should make the following points clear:

1. the consulting firm can support multiple client engagements with a common validation structure
2. the workbench can present governance, testing, findings, and reporting in a consistent way
3. the experience can be tailored for different stakeholder personas without requiring a full production build on day one
4. the UI suggests a credible path to a full AML Model Validation product/application

---

## Pre-demo setup checklist

Before starting the walkthrough, confirm the following:

- the application is running locally or in the target demo environment
- if using Docker, `docker compose up --build` has completed successfully
- if using npm locally, `npx prisma generate`, `npx prisma db push`, and `npm run dev` have already been run
- login and registration are working
- the dashboard loads cleanly
- persona switching is working
- cross-navigation between dashboard, models, testing, findings, and reports works
- the selected client engagement has enough mock data to support a full walkthrough

If possible, start the demo on the **Compliance Officer** or **Risk Manager** persona, since those two views typically resonate most quickly with decision-makers.

Because the demo is auth-protected, the practical entry route for live walkthroughs is usually:

- `/login`
- or `/register` if a fresh local demo user is needed

---

## Recommended storyline

Use this framing at the beginning:

> "This demo shows what a consulting-firm AML Model Validation Workbench could look like as a reusable accelerator across client engagements. It helps us move from fragmented delivery artifacts toward a more consistent validation operating model, with role-aware views, auditable evidence, and a clear path to a larger product build."

Keep the discussion focused on:

- repeatability
- governance visibility
- independent validation rigor
- deliverable quality
- productization potential

---

## Suggested walkthrough order

### 1. Start at the Executive Dashboard

**Route:** `/dashboard`

#### What to say

- "This dashboard gives consulting leadership and engagement teams a portfolio-level view of active AML model validation work."
- "It is designed to show not only model status, but also where the consulting team needs to focus attention."
- "The dashboard can shift emphasis depending on the persona viewing it, while still using the same underlying data and application shell."
- "We intentionally kept one shared dashboard route rather than building separate dashboards, so the persona story is composition-driven and easier to evolve into a full product."

#### What to point out

- KPI strip
- persona-specific widget order
- persona-specific CTA changes
- persona-specific insight banner text
- validation, findings, milestone, and remediation visibility
- recent activity / governance events with persona-specific emphasis
- persona switcher and client selector

#### What business message it supports

- leadership visibility
- multi-client scalability
- consulting-practice oversight

#### Good transition line

> "From here, we can move from portfolio view into the actual models under validation."

---

### 2. Move to Model Inventory

**Route:** `/models`

#### What to say

- "This is the model inventory view for active client engagements."
- "It gives the consulting team a structured way to manage validation scope, ownership, stage, and review readiness across multiple models."
- "This is important because scalable consulting delivery depends on consistent inventory and governance hygiene, not just analytical outputs."

#### What to point out

- model table
- filters by client, owner, stage, and risk
- validation stage and review dates
- quick preview drawer
- overall rating / findings signals

#### What business message it supports

- repeatable delivery methodology
- governance discipline
- portfolio management across clients

#### Good transition line

> "Let’s open one model and show how the actual validation workspace is structured."

---

### 3. Open a Model Detail / Validation Workspace

**Route:** `/models/[modelId]`

#### What to say

- "This is the core validation workspace for a single model."
- "The purpose is to bring together conceptual soundness, data quality, performance, testing evidence, findings, and audit trail in one structured view."
- "For a consulting practice, this is where delivery rigor becomes visible and repeatable."

#### What to point out

- sticky model summary band
- Overview tab
- Data Validation tab
- Performance tab
- Testing tab
- Findings tab
- Audit Trail tab
- notes / actions panel

#### Suggested tab narrative

**Overview**
- methodology
- assumptions
- limitations
- governance timeline
- revalidation triggers

**Data Validation**
- completeness
- schema / benchmark variance
- source integrity
- field exceptions

**Performance**
- precision
- recall
- ROC-AUC
- false positive rate
- sensitivity / baseline comparison

**Findings / Audit Trail**
- visible evidence of consulting-quality documentation
- explain that this is where reviewers and client teams can align on what is supported, what is unresolved, and what requires remediation

#### What business message it supports

- methodological credibility
- evidence-driven consulting delivery
- future product viability

#### Good transition line

> "Now let’s show how the workbench makes independent testing and challenge more tangible."

---

### 4. Open the Testing Lab

**Route:** `/testing`

#### What to say

- "The Testing Lab makes the validation methodology more concrete."
- "Instead of treating validation as static documentation, it shows scenario-based challenge and testing in a way that is easier for stakeholders to understand."
- "This is especially important for demonstrating the consulting practice’s rigor."

#### What to point out

- scenario selector
- threshold controls
- pass/fail outcomes
- scenario results visualization
- evidence / reproducibility card
- observations and recommendations

#### Example talking points

- above-the-line vs below-the-line testing
- threshold sensitivity
- stress scenarios
- adversarial scenarios
- benchmark comparison

#### What business message it supports

- independent challenge capability
- repeatable validation testing framework
- strong differentiation for the consulting practice

#### Good transition line

> "Testing is useful, but stakeholders also need to see how those results become business action."

---

### 5. Move to Findings & Remediation

**Route:** `/findings`

#### What to say

- "This is where the workbench translates validation outcomes into action-oriented consulting recommendations."
- "The goal is not just to identify issues, but to prioritize them, assign ownership, and support remediation tracking."

#### What to point out

- severity / likelihood heatmap
- remediation board
- findings table
- detail drawer with business impact and recommendation

#### What business message it supports

- consulting value beyond pure analytics
- governance closure and accountability
- stronger client delivery story

#### Good transition line

> "Finally, let’s show how the workbench supports delivery-ready reporting and evidence packaging."

---

### 6. End with the Report Preview / Audit Pack

**Route:** `/reports/[modelId]`

#### What to say

- "This report preview shows how validation work can be assembled into a regulator- and auditor-friendly deliverable."
- "Even though phase 1 uses mock data and mock export actions, the structure is designed to resemble the type of evidence-backed package a consulting team would want to deliver."

#### What to point out

- report outline
- executive summary section
- methodology section
- data validation section
- testing results section
- findings and remediation section
- audit trail / appendix concepts
- export panel / evidence checklist

#### What business message it supports

- consulting deliverable quality
- audit readiness
- path to monetizable productization

#### Suggested close

> "The point of this demo is not that every backend capability already exists. The point is that we now have a credible front-end workbench concept for a reusable AML model validation practice accelerator, with a clear path to a larger product effort."

---

## Persona-specific emphasis during the walkthrough

### Compliance Officer
Focus on:
- findings severity
- remediation due dates
- evidence-pack readiness
- revalidation triggers
- governance actions
- OCC-aligned brief CTA

### Risk Manager
Focus on:
- risk heatmap
- performance drift
- threshold sensitivity
- stress / adversarial scenarios
- material weaknesses

### Model Owner
Focus on:
- assigned models
- documentation gaps
- pending approvals
- required evidence
- owner actions
- notes and governance comments

### Validator
Focus on:
- testing queue
- evidence completeness
- data quality issues
- calibration history
- reproducibility mindset
- external source integrity

### Admin
Focus on:
- client coverage
- engagement count
- model inventory scale
- support/configuration readiness
- demo setup and manageability
- ability to switch persona and client context without leaving the shared shell

---

## What to avoid over-emphasizing

For this phase, avoid spending too much time on:

- missing backend workflows
- real API integration gaps
- incomplete RBAC enforcement
- lack of live report generation
- production operational details

Instead, keep the conversation focused on:

- the consulting workflow
- the user experience
- the operating model
- the future product roadmap

---

## Expected questions and suggested responses

### "Is this production-ready?"
Suggested answer:
- "Not yet. This is a phase-1 consulting accelerator demo designed to validate the operating model, UI narrative, and product direction before a larger investment."

### "What is real versus mocked?"
Suggested answer:
- "The current phase is UI-first and uses synthetic data and mock actions, while preserving future seams for real APIs, orchestration, reporting, and access control."

### "Why invest further?"
Suggested answer:
- "Because the workbench demonstrates a repeatable client-delivery pattern that could reduce fragmentation, improve evidence quality, and strengthen the consulting practice’s ability to scale AML model validation engagements."

### "Can this support multiple clients?"
Suggested answer:
- "That is one of the core design goals. The demo is framed as a consulting-firm workbench rather than a single-client internal tool."

---

## Suggested closing summary

Use a short closing like this:

> "This demo shows that we can present AML model validation as a structured consulting workbench rather than a collection of disconnected artifacts. It gives us a credible story for portfolio oversight, validation rigor, stakeholder-specific views, and delivery-ready reporting. The next step would be to decide whether to invest in turning this accelerator into a fuller product/application for the AML practice."

---

## Related documents

- [README.md](./README.md)
- [PERSONAS_DEMO_GUIDE.md](./PERSONAS_DEMO_GUIDE.md)
- [UPGRADE_NOTES_2026.md](./UPGRADE_NOTES_2026.md)
