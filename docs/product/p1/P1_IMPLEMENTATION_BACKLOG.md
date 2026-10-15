# P1 Implementation Backlog — Documentation Baseline

**ID:** P1-BACKLOG-2026 · **Version:** 1.0 · **As of:** 2026-10-15  
**Status:** PROPOSED — issues and implementation PRs have **not** been created.  
**Repository target:** existing Next.js/Prisma/PostgreSQL application as modular monolith. Documentation-only change request.

## Delivery principles

- Use **small reviewed PRs**, deterministic migrations and synthetic fixtures; no institution data or production mutation to qualify work.
- Every story maps to FR, ADR, TM and P1 release gate; no silent change in scope.
- Preserve existing demo, including GenAI, in an explicitly separated demonstration mode. Production P1 is traditional AML reporting only.
- Do not mistake demo persona switcher, hardcoded credentials, report-preview buttons or mock test sliders for working production controls.
- Phase P1 must conclude with an end-to-end usable report, not merely platform plumbing.

## Dependency-ordered backlog

| Epic / ID | Key stories / deliverables | Maps to | Done when |
|---|---|---|---|
| **E01 / P1-01** Security baseline | Secret store and env segregation; remove deployed default secrets; disable public prod registration; auth inventory; CI tests/scanners | FR-003,015; ADR-005,011; TM-08–12,19,26; G02,G10 | Static secret/self-signup paths blocked in hosted mode; CI evidence |
| **E02 / P1-02** Organization and engagement domain | Prisma models + migrations for client, engagement, membership, validation item; scoped repositories | FR-001,002,004; ADR-001,004; TM-01–03,29; G03,G05 | Two-client fixtures persist and are isolated |
| **E03 / P1-03** SSO and authorization | Firm IdP OIDC/SAML + MFA, group mapping, revocation, field/object/service/API checks, platform-admin separation | FR-003,004; ADR-004,005; TM-01,08–12,20,24; G02,G03 | Access matrix + IDOR tests passing |
| **E04 / P1-04** Approved disclosure contract | Typed summary manifest, allowlist, approval ID/authenticity process, forbidden data classes, reject reason and intake receipts | FR-005,006; ADR-002,006,007; TM-04–07,23,28; G04,G06 | Safe sample succeeds; raw rows/false approval rejected |
| **E05 / P1-05** Intake quarantine/storage | Limited manual upload, MIME/malware/size checks, private object refs, hashes, secure links and retention | FR-005,006,014; ADR-006,007; TM-02,04,06,07,16,30; G04,G10 | Scan and negative object/download tests passing |
| **E06 / P1-06** Traditional reporting records | Persist conceptual soundness, monitoring/KPI, data-quality and ATL/BTL outcome summaries and limitations; no test execution | FR-002,007; ADR-002,003,010; TM-31,32; G01,G05,G06 | UI reconciles to stored approved summaries, no simulation |
| **E07 / P1-07** Findings/remediation | Findings CRUD, assignments, owners, deadlines, management response, history, state machine, authorization | FR-008,009; ADR-004,008; TM-01,13,24; G03,G05,G07 | Cross-engagement requests denied, workflow history retained |
| **E08 / P1-08** Reviews and PDF releases | Sections/templates, maker-checker, approvals, immutable snapshots/hash, PDF/export audit, supersession | FR-010,011; ADR-008,009; TM-13–16,25; G07,G08,G09 | Distinct reviewer releases immutable snapshot |
| **E09 / P1-09** DB-backed dashboards | Authorized KPI/counts, milestone/readiness and current findings; no client-wide synthetic leakage | FR-013; ADR-004,010; TM-03,17,32; G01,G03,G05 | Dashboard reconciles to authorized records only |
| **E10 / P1-10** Audit and observability | Central structured security/business events, tamper checks, redacted logs and security alarms | FR-012,015; ADR-009,011; TM-18,22,27; G09,G10 | Events correlated and tamper alerts tested |
| **E11 / P1-11** Pilot hardening | Load tests, accessibility, migrations, backup/restore, secret rotation, issue triage, incident/rollback docs | FR-014,015; ADR-011; TM-19,21,26–28; G10,G11 | End-to-end negative/positive tests and restore evidence |
| **E12 / P1-12** Stakeholder acceptance | Synthetic end-to-end walkthrough, legal/reg applicability and transfer approvals, release gate evidence packet | all FR; all ADR; all TM; G01–G12 | Named signoffs, test matrix and documented residual risk |

## Demo-to-product migration map

| Existing repo surface | Action | Constraint |
|---|---|---|
| `app/dashboard`, `app/models`, `app/findings`, `app/reports` | Reuse UI patterns; replace `lib/demo-data` retrieval with scoped services behind feature boundary | Existing demo remains intact |
| `app/testing` | Reframe production path as **testing results**; no sliders as execution or simulated new metrics | Bank testing remains bank-side |
| `components/demo/persona-switcher` / `demo-context` | Keep in demo only; security grants from IdP and database | UI persona cannot confer role |
| `app/api/auth/*`, `lib/auth.ts`, `proxy.ts` | Audit; migrate to firm SSO, explicit API auth and deprovisioning | No demo JWT as production security claim |
| `prisma/schema.prisma` | Add reporting domain via versioned migrations; separate demo transaction/party/account models | Do not host raw institution bank records |
| `docker-compose.yml`, `Dockerfile` | Local development only; secure hosted deployment profile separately | No fixed demo secrets in pilot |
| `lib/demo-data` GenAI modules | Preserve for demo but block production P1 imports/routes/data | GenAI deferred, not deleted |

## PR sequencing gates

1. **Foundation preflight:** read-only architecture review, complete endpoint inventory, P0 signoff and threat matrix.
2. **Secure identity + isolation:** all negative access tests before any storage/import of client-approved content.
3. **Data contract + persistence:** safe synthetic imports, provenance, rejected-payload evidence.
4. **Findings + approvals:** maker-checker, audit coverage and immutable snapshot before PDF release.
5. **Client pilot qualification:** approved client data contract, security and bank/legal signoffs, backup/restore, performance and access testing.

## Mandatory PR template fields (later implementation PRs)

```text
Summary and business requirement IDs:
Scope (traditional reporting only; no GenAI/execution):
Baseline/main SHA and touched files:
ADRs / TM IDs / P1 gates:
Data-flow change and client-boundary impact:
Schema migration/rollback plan:
Authorization/negative tests:
Functional tests, lint/build results (actual command + exit status):
Evidence/CI artifacts:
Risks and residual issues:
Independent reviewer and approvals:
```

## Estimates and staffing

Initial planning window: **12–16 weeks** with a product/technical lead, AML validation SME, Next.js engineer, backend/data engineer, platform/security engineer and QA support. This is **not** a funding commitment; security/IdP/client permissions and data-transfer contracts can alter schedule substantially.

## Pending dependencies before sprint execution

- Product sponsor signs off P1 exclusions and success measures.
- Firm security selects identity provider, hosting and audit retention controls.
- Bank client owner defines permitted reporting schema and verifies release approval process.
- AML lead approves report sections, classification taxonomy and independent reviewer responsibility.
- Legal assesses engagement-specific regulatory and contractual applicability.