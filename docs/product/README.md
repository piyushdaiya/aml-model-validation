# Product foundation — single-firm AML validation reporting

**As of:** 2026-10-15  
**Status:** Proposed product specification; **not** a production security or regulatory attestation.  
**Deployment owner:** One consulting firm (not a multi-organization SaaS).  
**P1 scope:** Traditional AML model / monitoring-control **reporting**, not execution.  
**Future scope:** GenAI assurance, institution-side engines, SaaS commercialization — decisions deferred.

## Read in this order

1. [P0 Product Requirements](p0/PRODUCT_PRD_2026.md) — requirements, business boundary, persona permissions, acceptance.
2. [P0 Regulatory Applicability](p0/REGULATORY_APPLICABILITY_2026.md) — risk-based framework mapping, non-claims, decisions awaiting counsel/client confirmation.
3. [P0 Architecture Decisions](p0/ARCHITECTURE_DECISIONS_2026.md) — proposed architecture decision records and trade-offs.
4. [P0 Threat Model](p0/THREAT_MODEL_2026.md) — assets, trust boundaries, misuse paths and controls.
5. [P1 MVP Scope & Acceptance](p1/P1_MVP_SCOPE_AND_ACCEPTANCE.md) — end-to-end release and exit criteria.
6. [P1 Implementation Backlog](p1/P1_IMPLEMENTATION_BACKLOG.md) — dependency-ordered epics with evidence-based gates.

## Product direction, explicitly approved in conversation

- **Single organization:** one consulting practice owns and operates the platform. No tenant billing, tenant self-service, multi-firm identity configuration, SaaS provisioning or marketplace in P1.
- **Multiple client engagements:** strict segregation between financial institutions and between engagements, including authorized cross-engagement portfolio views.
- **Reporting-only:** the institution runs the validation; the portal receives only outputs whose transfer the institution expressly approved. De-identification alone is *not* authority to transfer.
- **Traditional AML P1:** transaction monitoring, customer risk rating, sanctions/watchlist controls, and conventional statistical models where applicable. **No GenAI workflow assurance in P1.**
- **MVP, not another demo:** persisted business records, approvals, PDF reports, evidence provenance, enterprise authentication and tested access controls.

## Relationship to existing sources

These are a **scope rebaseline** of earlier P0 drafts (proposed broad multi-tenant and dual traditional/GenAI platform), grounded in the user's original 2025 PRD, user stories, architectural assumptions, phase mapping, phase definitions, previous 2026 roadmap, and the repository's current demo. The original requirement to run ATL/BTL, data profiling, stress tests and replication is **preserved as institution-side future scope**, not implemented in the consulting-hosted MVP.

The existing `README.md`, `PERSONAS_DEMO_GUIDE.md`, `DEMO_WALKTHROUGH.md`, `UPGRADE_NOTES_2026.md` and `public/demo` assets describe the **Phase 1 demonstration**, which intentionally continues to show GenAI. Their presence does **not** change production P1 scope.

## Governance of these documents

All requirements and ADRs are `PROPOSED` until formally approved. Before using client data or deploying the product, record dated approvals from product sponsor, AML validation lead, consulting security/IT, and the relevant institution's information/data owner and contractual/legal reviewers. Regulatory applicability is **institution- and engagement-specific**.

| Status | Meaning |
|---|---|
| PROPOSED | Design candidate; not authorization to operate or transfer client information |
| SECURITY_REVIEWED | Security design assessment completed with recorded residual risks |
| APPROVED | Named accountable reviewers signed the exact version and scope |
| SUPERSEDED | Replaced by a linked decision/document |

P0 approval is distinct from implementation: acceptance tests in these documents are **planned**, not executed.