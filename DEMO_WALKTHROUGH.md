# Demo Walkthrough

## Purpose

This document provides a practical walkthrough for presenting the **AML Model Validation Workbench Demo** to consulting leadership, practice leads, client-facing teams, and internal decision-makers.

The goal is to show that one reusable consulting workbench can support:

- traditional AML model validation
- GenAI-assisted AML workflow validation in AML operations
- multi-client delivery with a consistent methodology
- persona-aware stakeholder views
- a credible path to a larger product/application effort

This is a **phase-1 consulting accelerator demo**. It is not yet a production platform.

---

## Recommended Audience

This walkthrough is best used with:

- consulting leadership
- AML practice leads
- engagement managers
- solution architects
- internal product sponsors
- selected client-facing stakeholders

---

## Demo Objective

The primary objective is to show that the firm can evolve from ad hoc AML validation delivery into a **repeatable, scalable, productized workbench**.

The walkthrough should make these points clear:

1. the consulting firm can support multiple client engagements with a common validation structure
2. the same workbench can cover both traditional AML models and GenAI workflows
3. governance, testing, findings, and reporting can be presented consistently across both tracks
4. the experience can be tailored for different stakeholder personas without requiring a separate dashboard or separate GenAI product area

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
- the selected client engagement has enough mock data for both traditional-model and GenAI-workflow examples

Because the demo is auth-protected, the practical entry route is usually:

- `/login`
- or `/register` if a fresh local demo user is needed

If possible, start on **Compliance Officer** or **Risk Manager**.

---

## Recommended Storyline

Use this framing at the beginning:

> "This demo shows what a consulting-firm AML validation workbench could look like as a reusable accelerator across client engagements. The key point is that the same shared workbench can validate both traditional AML models and GenAI-assisted AML workflows, with role-aware views, auditable evidence, and a clear path to a larger product build."

Keep the discussion focused on:

- repeatability
- governance visibility
- independent validation rigor
- deliverable quality
- productization potential

---

## Suggested Walkthrough Order

### 1. Start at the Executive Dashboard

**Route:** `/dashboard`

#### What to say

- "This dashboard gives consulting leadership and engagement teams a portfolio-level view of active AML validation work."
- "It now shows both traditional AML model signals and GenAI workflow-control signals in one place."
- "The dashboard shifts emphasis by persona, but stays on one shared route and one shared shell."

#### What to point out

- KPI strip
- persona-specific widget order
- AI Workflow Validation Status widget
- persona-specific CTA changes
- persona-specific insight banner text
- recent activity with persona-specific emphasis
- client selector and persona switcher

#### What business message it supports

- leadership visibility
- multi-client scalability
- consulting-practice oversight
- one workbench for multiple validation tracks

#### Good transition line

> "From here, we can move from portfolio view into the shared validation inventory."

---

### 2. Move to Validation Inventory

**Route:** `/models`

#### What to say

- "This route stays `/models`, but it now acts as the shared validation inventory."
- "It covers transaction monitoring, customer risk, sanctions screening, and GenAI workflows without fragmenting the experience."

#### What to point out

- inventory table
- filters by client, validation type, owner, stage, and risk
- validation type column
- human review requirement
- grounding status
- last prompt-set update
- quick preview drawer

#### Suggested demo move

- first point out a traditional model row
- then point out a GenAI workflow row such as `GAI-001 Alert Narrative Assistant`
- explain that the same inventory structure can support both

#### What business message it supports

- repeatable delivery methodology
- governance discipline
- shared operating model across traditional and GenAI validation scope

#### Good transition line

> "Let’s open one traditional item first, then a GenAI workflow, and show how the same detail route adapts."

---

### 3. Open Model Detail / Validation Workspace

**Route:** `/models/[modelId]`

#### What to say

- "This remains one shared detail route."
- "Traditional AML models keep the current validation experience."
- "GenAI workflows use the same shell but render a different tab structure that reflects workflow boundaries, grounding, response quality, safety, and human-review controls."

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

- one shared workbench, not two disconnected products
- methodological credibility
- future product viability for both traditional and GenAI validation

#### Good transition line

> "Before we leave the inventory-driven flow, let’s stay on a GenAI workflow and walk through the dedicated AI assurance story end to end."

---

### 4. Dedicated GenAI Workflow Stop

**Route sequence:** `/models` → `/models/[modelId]` → `/testing` → `/findings` → `/reports/[modelId]`

This is the dedicated stop you should use to prove the GenAI track is real and not just mentioned at a high level.

#### Suggested item

Open one of these from inventory:

- `GAI-001 Alert Narrative Assistant`
- `GAI-002 AML Case Summarization Assistant`
- `GAI-003 AML Policy Copilot`
- `GAI-004 Disposition Recommendation Assistant`

#### Step 4A. Grounding

From the GenAI detail route, open **Data & Grounding**.

What to point out:

- approved data sources
- grounding or retrieval coverage
- source freshness
- citation quality
- human-review requirement

What to say:

> "This is where we show whether the workflow is actually grounded in approved AML content and whether the workflow can be trusted to stay within controlled evidence sources."

#### Step 4B. Safety & Controls

From the same GenAI detail route, open **Safety & Controls**.

What to point out:

- hallucination rate
- refusal quality
- escalation behavior
- policy-boundary compliance
- sensitive-data handling checks

What to say:

> "For GenAI in AML workflows, output quality is not enough. We also need evidence that the workflow behaves safely, escalates when appropriate, and does not cross policy boundaries."

#### Step 4C. Testing

Move to `/testing` with the same GenAI workflow selected.

What to point out:

- grounded Q&A test
- hallucination trap
- missing-context test
- prompt-injection / instruction-conflict test
- unsafe recommendation test
- prompt
- retrieved evidence
- model answer
- expected answer
- pass/fail
- validator notes

What to say:

> "This demonstrates that the testing lab is not limited to classical model thresholds. It can also challenge GenAI behavior, grounding, and control robustness."

#### Step 4D. Findings

Move to `/findings` and filter to the selected GenAI workflow.

What to point out:

- incomplete citation grounding
- unsupported recommendation language
- inconsistent escalation behavior
- stale policy references
- sensitive-data redaction gap

What to say:

> "This is where AI-control concerns become business and governance actions instead of just technical observations."

#### Step 4E. Report Output

Move to `/reports/[modelId]` for the same GenAI workflow.

What to point out:

- GenAI Workflow Validation section
- intended use
- workflow boundaries
- grounding architecture
- response quality testing
- safety/control testing
- human review controls
- deployment recommendation
- residual risks

What to say:

> "This makes the GenAI track look like a deliverable the consulting firm can actually take into governance, risk, or client discussions."

#### What business message it supports

- the demo can credibly cover AI assurance in AML workflows
- GenAI validation is integrated into the same consulting workbench, not bolted on
- the consulting practice can evolve into a broader AML + AI assurance offering

#### Good transition line

> "Now that we have shown the dedicated GenAI path, we can return to the shared testing and remediation story across both tracks."

---

### 5. Open the Testing Lab

**Route:** `/testing`

#### What to say

- "The Testing Lab remains one route, but now supports two kinds of validation."
- "For traditional models, it shows threshold and scenario-based testing."
- "For GenAI workflows, it shows prompt-driven scenario testing, retrieved evidence, answer comparison, and validator notes."

#### What to point out for traditional models

- sensitivity, stress, ATL, BTL, and adversarial scenarios
- threshold controls
- result visuals
- pass/fail summary
- evidence and reproducibility cards

#### What to point out for GenAI workflows

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

#### What business message it supports

- independent challenge capability
- repeatable validation testing framework
- strong consulting differentiation for GenAI control validation

#### Good transition line

> "Testing is useful, but stakeholders also need to see how these results become business action."

---

### 6. Move to Findings & Remediation

**Route:** `/findings`

#### What to say

- "This remains one shared findings page."
- "You can view traditional-model findings, GenAI-workflow findings, or a combined engagement view."
- "That matters because leadership usually wants one remediation conversation, not separate operating silos."

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

- consulting value beyond pure analytics
- governance closure and accountability
- a coherent remediation story across both validation tracks

#### Good transition line

> "Finally, let’s show how the workbench supports delivery-ready reporting and audit-friendly packaging."

---

### 7. End with the Report Preview / Audit Pack

**Route:** `/reports/[modelId]`

#### What to say

- "This report route is still shared."
- "Traditional models keep the familiar validation-pack structure."
- "GenAI workflows add a dedicated GenAI Workflow Validation section inside the same reporting surface."

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
- a path to monetizable productization across both traditional and GenAI validation work

#### Suggested close

> "The point of this demo is not that every backend capability already exists. The point is that we now have a credible shared workbench concept for a reusable AML validation practice accelerator that can cover both traditional models and GenAI-assisted workflows, with a clear path to a larger product effort."

---

## Persona-Specific Emphasis During the Walkthrough

### Compliance Officer
Focus on:

- high-risk findings
- high-risk AI findings
- remediation due dates
- grounding coverage
- human-review controls
- auditability and evidence-pack readiness

### Risk Manager
Focus on:

- risk heatmap
- performance drift
- failed scenarios
- unsafe recommendation risk
- hallucination or prompt-control failures
- remediation priorities

### Model Owner
Focus on:

- assigned validation items
- documentation gaps
- workflow boundaries
- prompt/version updates
- milestones and response actions

### Validator
Focus on:

- testing queue
- expected-versus-actual answer review
- grounding failures
- data-quality exceptions
- evidence completeness

### Admin
Focus on:

- client portfolio
- validation-item coverage
- GenAI workflow count in scope
- configuration changes
- support issues
- overall demo health
