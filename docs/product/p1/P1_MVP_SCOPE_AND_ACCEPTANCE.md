# P1 — Single-Firm Traditional AML Validation Reporting MVP

**ID:** P1-SCOPE-2026 · **Version:** 1.0 · **As of:** 2026-10-15  
**Status:** PROPOSED, pending P0 approval.  
**Objective:** move from a mock-data demo to a usable, secure **traditional AML reporting** product for one consulting practice serving isolated client engagements.

## P1 value proposition

Consulting validators can register an engagement, ingest **client-approved summary results** from bank-side testing, document independent judgment, track findings and remediation, assemble reports, subject them to peer review and release an immutable PDF. Everything is permissioned, persistent, auditable and traceable. It **does not execute AML validation** and **does not include GenAI reporting**.

## P1 baseline decisions

- Single consulting firm's hosted instance; no generic SaaS multi-tenant implementation. Multiple client/engagement workspaces are segregated.
- Internal consulting users as initial operating population. External client sponsors remain a **post-gate option**, not required for P1 acceptance.
- Traditional AML: transaction monitoring, customer risk rating and sanctions/watchlist models and controls, classified according to actual applicable policy. Track statistical models separately from deterministic controls.
- Bank retains raw sensitive datasets, SAR information and execution systems. Transfer requires institution's explicit data-owner approval, not just tokenization.
- Manual controlled approval/summary upload is sufficient. Automated signed bank publisher is **not** a launch requirement.
- PDF reporting is first output; Word/PowerPoint later. Current demo's GenAI code/media remain in demo mode only; production path excludes them.

## MVP user journey / release artifact

1. Authorized Engagement Lead creates client `C-A`, engagement `E-A`, item `V-A`, period `2026-Q4` and assigns Validation Lead.
2. Consulting operator records the bank's permitted result-summary approval and uploads a safe typed package; quarantine, classification, schema and provenance verified.
3. Validation Lead documents conceptual soundness, ongoing monitoring and outcomes-analysis summaries; source pointers identify bank-held workpapers; findings and recommendations are tracked.
4. Engagement Lead tracks remediation and records controlled management responses without rewriting underlying source evidence.
5. Separate reviewer returns, approves or rejects the report with a timestamped reason; authorized approver releases a hash-tracked PDF.
6. Consulting Partner views only assigned engagement status/report; anonymous/unassigned users cannot enumerate other clients.
7. Admin can manage users and deployment but cannot read reports without separate documented access.

## Required acceptance — release gate

| ID | Gate / test | Pass condition |
|---|---|---|
| **P1-G01** | Scope | Deployed production P1 has no GenAI workflow/report modules, live testing controls or raw institution dataset support |
| **P1-G02** | Identity | Firm IdP SSO + MFA; invitation/deprovisioning; denied stale and revoked sessions |
| **P1-G03** | Access | Two simulated banks, three engagements, consultant role cross-matrix denies unauthorized CRUD, list, count and report access |
| **P1-G04** | Intake | Unapproved/raw/invalid/unsafe file rejected pre-publication with immutable receipt; positive approved summary imported |
| **P1-G05** | Persistence | Client, engagement, model/control, result, finding and response survive restart/migrations |
| **P1-G06** | Evidence | Every released metric/claim links to approved source summary/reference or named, justified professional judgment |
| **P1-G07** | Workflow | Author cannot approve own report by default; invalid transitions denied; version and reason retained |
| **P1-G08** | Reports | PDF contents match approved immutable snapshot, including limitations, reviewer, provenance and approvals; earlier release remains available after supersession |
| **P1-G09** | Audit | All relevant access, import, edit, approval, release and export actions carry actor/time/object/scope and tamper-evident retention |
| **P1-G10** | Security | No outstanding high/critical issues without signed risk treatment; secrets and static demo credentials absent in hosted config |
| **P1-G11** | Operations | DB migration, backup/restore, incident, key/secret rotation and rollback rehearsed against synthetic records |
| **P1-G12** | Stakeholder gate | Product/AML/security approve MVP; **bank data owner and legal approve real client transfer separately** |

No checkbox substitutes for an executed test; retain test evidence keyed to git SHA/environment. Production deployment or live client data are **not** approved by this document.

## Proposed milestone sequence and capacity planning

| Sequence | Work | Planning window (not commitment) |
|---|---|---|
| **P1.1** | Identity, roles, client isolation and security baseline | Weeks 1–3 |
| **P1.2** | Persistent client/engagement/model/reporting domain | Weeks 4–5 |
| **P1.3** | Approved-output intake, quarantine and evidence provenance | Weeks 6–8 |
| **P1.4** | Findings/remediation and maker-checker workflow | Weeks 8–10 |
| **P1.5** | Released PDF and reconciled dashboards | Weeks 10–12 |
| **P1.6** | Pilot hardening, comprehensive negative tests, restore/recovery | Weeks 13–16 |

Schedule assumes appropriate IdP, bank-approved data dictionary and focused team; revisions likely after P0 approvals and client availability.

## Deferred work, deliberately not implied

GenAI-assisted AML workflow evaluation/reporting, LLMs, prompt evaluation, Rust/Go bank validation, direct core bank integration, multi-firm SaaS, billing, advanced benchmarking, Word/PowerPoint exports, broad client-user portal and external commercial licensing. New capability requires change-controlled PRD/ADR/threat/regulatory review.

## P0 dependency

Do not begin production use until [PRD](../p0/PRODUCT_PRD_2026.md), [applicability](../p0/REGULATORY_APPLICABILITY_2026.md), [ADRs](../p0/ARCHITECTURE_DECISIONS_2026.md) and [threat model](../p0/THREAT_MODEL_2026.md) receive the necessary approvals and evidence. Use [implementation backlog](P1_IMPLEMENTATION_BACKLOG.md) for delivery planning.