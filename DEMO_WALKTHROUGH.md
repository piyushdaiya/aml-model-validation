# Demo Walkthrough

## Purpose

This document provides a practical walkthrough for presenting the **AML Model Validation Reporting Portal Demo** to consulting leadership, practice leads, client-facing teams, and internal decision-makers.

The goal is to show that one reusable consulting-hosted reporting portal can support:

- traditional AML model validation reporting
- GenAI-assisted AML workflow validation reporting
- multi-client delivery with a consistent methodology
- persona-aware stakeholder views
- a credible path to a larger product/application effort

This is a **phase-1 consulting-hosted reporting portal demo**. It is not yet a production platform for executing validation workflows.

## Core Positioning

Use this framing at the start:

> "This demo shows what a consulting-hosted AML validation reporting portal could look like when client data and validation execution stay inside the financial institution. The portal does not execute institution-side workflows. Instead, it provides secure access to reporting, evidence summaries, findings, remediation tracking, and committee-ready outputs across both traditional AML validation and GenAI-assisted AML workflow validation."

Keep the discussion focused on:

- secure reporting access
- cross-client reporting consistency
- governance visibility
- independent validation rigor as reflected in reporting outputs
- deliverable quality
- productization potential

---

## Recommended Audience

This walkthrough is best used with:

- consulting leadership
- AML practice leads
- engagement managers
- validation leads
- internal product sponsors
- selected client-facing stakeholders

---

## Demo Objective

The primary objective is to show that the firm can evolve from ad hoc AML validation reporting into a **repeatable, scalable, productized reporting portal**.

The walkthrough should make these points clear:

1. the consulting firm can support multiple client engagements with a common reporting structure
2. the same portal can cover both traditional AML models and GenAI workflows
3. findings, evidence, testing summaries, and reporting can be presented consistently across both tracks
4. persona-specific reporting emphasis can be delivered without separate portals or a separate GenAI product area
5. the portal respects the reality that data and execution often remain inside the financial institution

---

## Pre-Demo Setup Checklist

Before starting the walkthrough, confirm:

- the application is running locally or in the target demo environment
- if using Docker, `docker compose up --build` has completed successfully
- if using npm locally, `npx prisma generate`, `npx prisma db push`, and `npm run dev` have already been run
- login and registration are working
- the dashboard loads cleanly
- persona switching is working
- cross-navigation between dashboard, models, testing, findings, and reports works
- the selected client engagement has enough mock data for both traditional-model and GenAI-workflow reporting examples

Because the demo is auth-protected, the practical entry route is usually:

- `/login`
- or `/register` if a fresh local demo user is needed

If possible, start on **Consulting Partner** or **Client Compliance Sponsor**.

---

## Suggested Walkthrough Order

### 1. Start At The Executive Dashboard

**Route:** `/dashboard`

#### What to say

- "This dashboard gives consulting leadership and engagement teams a secure portfolio-level reporting view of AML validation work."
- "It shows both traditional AML validation signals and GenAI workflow-control signals in one place."
- "The dashboard shifts reporting emphasis by persona, but stays on one shared route and one shared shell."

#### What to point out

- KPI strip
- persona-specific widget order
- AI-related reporting indicators
- persona-specific CTA changes
- insight banner text
- recent activity with persona-specific emphasis
- client selector and persona switcher

#### What business message it supports

- leadership visibility
- multi-client reporting scalability
- consulting-practice oversight
- one portal for multiple validation-reporting tracks

#### Good transition line

> "From the portfolio reporting view, we can move into the shared validation inventory."

---

### 2. Move To Validation Inventory

**Route:** `/models`

#### What to say

- "This route stays `/models`, but functions as the shared validation inventory for reporting."
- "It covers transaction monitoring, customer risk, sanctions screening, and GenAI workflows without fragmenting the experience."

#### What to point out

- inventory table
- filters by client, validation type, owner, stage, and risk
- validation type column
- human-review requirement
- grounding status
- last prompt-set update
- quick preview drawer

#### Suggested demo move

- first point out a traditional validation item
- then point out a GenAI item such as `GAI-001 Alert Narrative Assistant`
- explain that the same reporting inventory can support both

#### What business message it supports

- repeatable consulting reporting methodology
- governance discipline
- shared operating model across traditional and GenAI validation reporting

#### Good transition line

> "Let’s open one traditional reporting item first, then a GenAI reporting item, and show how the same detail route adapts."

---

### 3. Open Validation Detail / Reporting Workspace

**Route:** `/models/[modelId]`

#### What to say

- "This remains one shared detail route."
- "Traditional AML items keep their familiar reporting sections."
- "GenAI items use the same shell but present a different set of reporting sections around workflow boundaries, grounding, response quality, safety, and human-review controls."

#### What to point out for a traditional item

- sticky top summary band
- Overview
- Data Validation
- Performance
- Testing
- Findings
- Audit Trail

#### What to point out for a GenAI item

- Overview
- Data & Grounding
- Response Quality
- Safety & Controls
- Testing
- Findings
- Audit Trail

#### GenAI-specific talking points

- workflow purpose
- approved usage boundaries
- prohibited actions
- human-in-the-loop role
- provider/model information
- prompt/version history
- grounding coverage and source freshness
- factuality, completeness, citation coverage, and consistency
- hallucination rate, refusal quality, escalation behavior, and sensitive-data handling

#### What business message it supports

- one shared reporting portal, not two disconnected products
- methodological credibility
- future product viability for both traditional and GenAI validation reporting

#### Good transition line

> "Now let’s show how testing appears when the same portal presents both traditional scenario summaries and GenAI prompt/control testing summaries."

---

### 4. Open The Testing Summary View

**Route:** `/testing`

#### What to say

- "This route remains one shared testing surface, but it presents reporting outputs rather than institution-side workflow execution."
- "For traditional models, it summarizes threshold and scenario-based testing outcomes."
- "For GenAI workflows, it summarizes prompt-driven scenario testing, retrieved evidence, answer comparison, and reviewer notes."

#### What to point out for traditional items

- sensitivity, stress, ATL, BTL, and adversarial scenario summaries
- threshold-related reporting
- pass/fail summaries
- evidence and reproducibility cards

#### What to point out for GenAI items

- grounded Q&A
- hallucination trap
- missing-context test
- prompt-injection / instruction-conflict test
- policy-conflict test
- unsafe recommendation test
- stale-guidance test
- adversarial investigator prompt
- prompt
- retrieved evidence
- model answer
- expected answer
- pass/fail
- validator notes

#### Dedicated GenAI stop

When you are on a GenAI item, pause here and say:

> "This is the clearest example of the portal’s GenAI reporting value. We are not running the AI workflow in this environment. Instead, we are presenting the reporting outputs that matter: grounding quality, safety signals, test summaries, control gaps, and reviewer observations. That keeps the consulting environment aligned to secure reporting while still making GenAI assurance visible."

#### What business message it supports

- independent challenge capability reflected through reporting
- repeatable validation-reporting framework
- strong consulting differentiation for GenAI control reporting

#### Good transition line

> "Testing summaries are useful, but leadership also needs to see how those results turn into prioritized issues and actions."

---

### 5. Move To Findings & Remediation

**Route:** `/findings`

#### What to say

- "This remains one shared findings page."
- "You can view traditional-model findings, GenAI-workflow findings, or a combined engagement view."
- "That matters because sponsors usually want one remediation conversation, not separate silos."

#### What to point out

- track filter
- severity / likelihood heatmap
- findings register
- finding detail panel
- remediation board

#### GenAI-specific examples to mention

- unsupported recommendation language
- incomplete citation grounding
- inconsistent escalation behavior
- prompt version not approved
- stale policy references
- sensitive-data redaction gap

#### What business message it supports

- consulting value beyond pure metrics
- governance closure and accountability
- a coherent remediation story across both reporting tracks

#### Good transition line

> "Finally, let’s show how the portal supports committee-ready and audit-friendly reporting."

---

### 6. End With The Report Preview / Audit Pack

**Route:** `/reports/[modelId]`

#### What to say

- "This report route is still shared."
- "Traditional items keep the familiar validation-pack structure."
- "GenAI items add a dedicated GenAI Workflow Validation section inside the same reporting surface."

#### What to point out for GenAI items

- intended use
- workflow boundaries
- grounding architecture
- response quality testing
- safety and control testing
- human review controls
- deployment recommendation
- residual risks

#### What business message it supports

- consulting deliverable quality
- audit readiness
- a secure reporting model that respects institution data boundaries
- a path to monetizable productization across both traditional and GenAI validation reporting

#### Suggested close

> "The point of this demo is not that the consulting environment executes institution-side validation workflows. The point is that we now have a credible secure reporting portal for AML validation that can cover both traditional models and GenAI-assisted workflows, while respecting the reality that data and execution often remain inside the financial institution."

---

## Persona-Specific Emphasis During The Walkthrough

### Consulting Partner
Focus on:

- cross-client portfolio visibility
- report readiness
- high-risk items requiring leadership attention
- strategic value of the GenAI track
- repeatability of the consulting offering

### Engagement Lead
Focus on:

- material findings
- milestone readiness
- remediation priorities
- severity heatmap
- client-facing reporting story

### Validation Lead
Focus on:

- evidence completeness
- testing summary quality
- grounding and data-quality exceptions
- audit trail completeness
- report-section readiness

### Client Compliance Sponsor
Focus on:

- high-risk findings
- auditability
- evidence-pack readiness
- policy adherence for GenAI workflows
- human-review controls

### Client Model Sponsor
Focus on:

- documentation gaps
- findings requiring response
- workflow boundaries
- prompt/version updates
- governance-readiness

### Platform Admin
Focus on:

- secure access model
- engagement setup
- environment health
- support issues
- configuration and audit logs
