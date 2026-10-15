# Product Requirements Document — Single-Firm AML Validation Reporting Portal

**ID:** P0-PRD-2026 · **Version:** 2.1 (P1 scope rebaseline) · **As of:** 2026-10-15  
**Status:** PROPOSED — not approved for client data or production use  
**Owner:** Consulting practice product sponsor (to be assigned)  
**Companions:** [Applicability](REGULATORY_APPLICABILITY_2026.md) · [ADRs](ARCHITECTURE_DECISIONS_2026.md) · [Threats](THREAT_MODEL_2026.md) · [P1 MVP](../p1/P1_MVP_SCOPE_AND_ACCEPTANCE.md) · [Backlog](../p1/P1_IMPLEMENTATION_BACKLOG.md)

## 1. Executive decision and business problem

Develop a **secure, consulting-hosted, traditional AML model validation reporting portal** that is **owned and operated by one consulting firm** and supports its multiple financial-institution engagements. Validators execute tests **within the financial institution**, using the institution's tools and approved procedures. The portal records **only client-approved reporting outcomes, evidence references, reviewer judgments, findings, remediation and release-ready reports**. The portal **cannot access or execute bank transaction-processing workflows**.

One firm using one platform is **not** a justification for general-purpose multi-tenant SaaS architecture. Multiple client workspaces still require enforced isolation. This distinction supersedes the earlier draft's language about independent SaaS tenants, broad client file ingestion, and GenAI in the first commercial release.

The historical 2025 PRD asked for a full AML validation solution, including data-quality analysis, replication testing, ATL/BTL, performance tests and model tuning. Those needs remain **valid business context**, but the **P1 product only reports their results**. Any execution engine must be separately scoped and hosted at the institution in a later phase; it is not implicitly authorized here.

## 2. Product scope and non-goals

### Included in P1
- Single consulting organization, multiple isolated `ClientInstitution` workspaces and `Engagement` records; scoped user memberships.
- Traditional AML validation inventory: statistical/quantitative models **and** separately categorized deterministic transaction monitoring, customer-risk, sanctions/watchlist controls; classify regulatory/model status explicitly instead of assuming all are models.
- Persisted scope, methodology, limitations and reviewer-authored **conceptual soundness**, **ongoing monitoring** and **outcomes-analysis** report sections.
- Controlled import of **institution-approved reporting summaries** and optionally approved supporting documents. Bank-local evidence references are first-class; no general raw-file drop.
- Result summaries for data-quality checks, model performance, ATL/BTL, sensitivity/stress and sampling methodologies **as documented results**, with source, period, caveats and human interpretations.
- Findings register, severity/likelihood, assignments, due dates, remediation updates and management responses.
- Review and approval workflow; immutable released PDF snapshot with hash, approval history and evidence index.
- Consulting dashboards derived from persisted authorized records, access/audit history, backup and restore testing.
- Enterprise sign-in with MFA and server authorization; **no public self-registration** in production.

### Explicitly excluded from P1
- GenAI-assisted AML workflow assurance, model/provider metadata, prompt libraries, GenAI evaluations, LLM-generated reporting, agent execution, or external AI calls.
- Consulting-hosted AML validation execution, database extracts, customer identifiers, transactions, SAR data, case narratives, sensitive prompts, unrestricted workpapers or uploads.
- Institution-hosted Go/Rust engine, remote bank access, live AML system APIs, threshold-tuning execution, automated test orchestration.
- Multi-consulting-firm SaaS provisioning, tenant billing, marketplace, external commercialization infrastructure.
- Automatic regulatory certification, SAR submissions, ERM/GRC integrations, advanced cross-client benchmarking, automatic remediation.
- Client-side portal access at initial internal MVP launch; optional only after bank agreement and security acceptance (client roles modeled but not automatically activated).
- Word/PowerPoint as MVP release blockers; prioritize approved PDF, add others through later scoped change.

**Demo coexistence:** preserve current GenAI demo for product demonstrations, but production P1 routes/API/database must **not** expose or silently ingest GenAI data. Do not remove demo media or rewrite the README as though the production MVP already exists.

## 3. Principles and data boundary

1. **Bank controls disclosure.** Every reporting package is approved for transfer by a responsible bank authority **before** it reaches the consulting environment; de-identification is necessary where applicable but not sufficient.
2. **No hidden execution.** Portal APIs cannot query the bank or execute its validation jobs. Testing screens in P1 are **results and evidence** views, never execution controls.
3. **Evidence provenance.** Every substantive reported claim links to imported approved evidence or an explicitly identified reviewer conclusion with justification.
4. **Independence and effective challenge.** Human validators own materiality, conclusions and limitations; the app must not produce compliance verdicts automatically.
5. **Single-firm scope, client isolation.** Client chooser/persona switcher never grants permissions. Cross-client summaries are limited to authorized engagements and approved aggregation policy.
6. **Conservative launch.** No real client data before signed data-transfer policy, privacy/security review, negative access-control tests and operations acceptance.

## 4. Users, roles, access intent

| User/persona | P1 capability | Boundary |
|---|---|---|
| **Consulting Partner** | Assigned portfolio dashboard, read approved draft/released engagement summaries, signoff **if delegated** | Not all-client superuser by title; partner cannot bypass approval segregation |
| **Engagement Lead** | Manage assigned engagement metadata; coordinate findings/remediation and review workflows | Only assigned clients/engagements; no automatic release powers |
| **Validation Lead** | Author sections, import approved reporting data, create findings, review evidence and submit for review | Cannot approve or release own report when maker-checker rule applies |
| **Platform Admin** | Provision application, manage groups/configuration and access reviews | No default business-document read; just-in-time audited break glass only |
| **Client Compliance Sponsor** | Future restricted access to their institution's **released** information | Not enabled in internal P1 by default; bank explicitly authorizes extension |
| **Client Model Sponsor** | Future approved findings/management response actions | Not enabled in internal P1 by default |

**Authorization model:** identity provider roles + explicit client and engagement grants + document classification + workflow state; deny by default. Admin permissions are separate from content privileges. Independent quality reviewer/approver is a required *workflow responsibility* (can be assigned to appropriately authorized consulting personnel), not an automatic attribute of any persona.

## 5. End-to-end P1 business journeys

- **J-01 Setup:** Admin adds an approved client workspace and engagement; authorized Engagement Lead assigns validation items, reporting periods and staff; access rights are tested.
- **J-02 Bank release:** Institution approves an allowlisted set of quantitative summary metrics, assumptions and document references outside the portal. Consulting intake operator records approval identifier and data classification; unapproved contents are refused.
- **J-03 Controlled import:** Operator uploads approved structured summary or permitted artifact via quarantine; application validates schema, scope, size, content type, malware scanning, provenance and user entitlement; accept or reject with immutable receipt. **No raw customer/transaction rows**.
- **J-04 Validation reporting:** Validation Lead assembles conceptual soundness, ongoing monitoring and outcomes analysis; records methodology and limitations, links approved results, adds qualitative challenge and findings.
- **J-05 Remediation:** Engagement Lead assigns findings; updates and management responses are versioned; overdue actions appear on authorized dashboards; closed findings preserve history.
- **J-06 Release:** Distinct reviewer confirms evidence and findings; authorized approver releases immutable PDF snapshot; download, supersession and any correction are audited. No past released version is overwritten.
- **J-07 Portfolio:** Consulting Partner sees authorized engagement-level summaries only; export cannot enumerate unassigned client records.

## 6. Functional requirements (P1)

| ID | Priority | Requirement | Acceptance evidence |
|---|---|---|---|
| **FR-001** | MUST | Single consulting organization with client workspaces and engagements; no SaaS tenant lifecycle | Create two test clients; separation and engagement lifecycle tests |
| **FR-002** | MUST | Scoped model/control inventory with classification, owner, version, reporting period, status, limitations | Save/retrieve versioned models; taxonomy tests |
| **FR-003** | MUST | Authenticating users via consulting enterprise IdP with MFA, invitation/group assignment and revocation | Expiry, revocation and MFA assertions tested |
| **FR-004** | MUST | Per-client, per-engagement and record-level server authorization; optional DB RLS defense in depth | Negative IDOR, filter, aggregate, document and export test matrix |
| **FR-005** | MUST | Approved-output intake: reference external disclosure approval, allowlist, quarantine and reject forbidden fields | Malformed, wrong-client, oversized, malware and raw-row payload tests |
| **FR-006** | MUST | Evidence index with bank-local reference, classification, period, checksum where approved, source/version and verification status | Provenance query and access-denial tests |
| **FR-007** | MUST | Document independent-review narrative for conceptual soundness, monitoring and outcomes/ATL-BTL summaries | Three report-section templates and human-review evidence |
| **FR-008** | MUST | Persistent findings with severity, impact, likelihood, link to validation item, owner, dates, history | Finding lifecycle, state transition and isolation tests |
| **FR-009** | MUST | Management responses/remediation tracking and explicit accountable actors | History, attachments policy, overdue/status and permissions tests |
| **FR-010** | MUST | Report templates with draft→review→approved→released/superseded workflow | Maker-checker, concurrent update and invalid-transition tests |
| **FR-011** | MUST | Approved PDF report reproduces release snapshot with approval identities, source provenance and limitations | Stable released hash/contents, prior version retained |
| **FR-012** | MUST | Append-only audit events covering auth decisions, access, imports, edits, approvals, exports and admin actions | Tamper checks, correlation ID and omission tests |
| **FR-013** | MUST | Authorized dashboards show persistent readiness, open/overdue findings and milestones; no synthetic production counts | DB-backed reconciliation and cross-client aggregation tests |
| **FR-014** | MUST | Classification, retention, deletion and incident-response policies configurable per contractual approval | Retention/legal-hold, export and audit coverage tests |
| **FR-015** | MUST | Automated tests, repeatable migrations, secure secrets, backups/restore, operational monitoring | CI security + app tests, restore drill, deployment checklist |
| **FR-016** | SHOULD | Restricted client sponsor read access to specifically approved released items | Separate signed access decision and pilot security tests; not a P1 launch blocker |
| **FR-017** | SHOULD | Automated bank-signed package exchange | Separate security and client integration approval; P1 manual controlled import is sufficient |
| **FR-018** | SHOULD | Word export and advanced report template customization | Later change request after PDF acceptance |

**No P1 FR authorizes GenAI assurance or execution.** Historical requirements for executing validation tests are tracked only as future backlog context.

## 7. Nonfunctional requirements (proposed design targets)

| ID | Target / expectation | Verification |
|---|---|---|
| **NFR-001 Security** | MFA/SSO, least privilege, secure sessions, centrally managed secrets, encryption in transit/at rest | Identity, secret and TLS configuration review |
| **NFR-002 Isolation** | Zero unauthorized cross-client reads, edits, exports, existence leaks, cached responses or aggregate leakage in tested matrix | Automated abuse cases across 2+ clients |
| **NFR-003 Integrity** | Immutable released report snapshots and verifiable evidence provenance | Replay/alteration/conflict tests |
| **NFR-004 Audit** | Access decisions and business transitions append-only, retention agreed with legal/client | Log integrity and authorized retrieval tests |
| **NFR-005 Reliability** | Documented SLO/RTO/RPO agreed before pilot; **not** assume 99.9% is delivered | Restore and operational drills |
| **NFR-006 Privacy** | Strict reporting fields allowlist and bank-approved transfer evidence | DLP testing, classification and rejection records |
| **NFR-007 Performance** | Pilot acceptance load defined from realistic report counts, users, artifact sizes | Load test before pilot; thresholds approved then |
| **NFR-008 Accessibility** | Keyboard and screen-reader coverage for critical review/approval paths | Automated and manual WCAG-aligned checks |
| **NFR-009 DevOps** | Reproducible migrations, dependency scanning, secrets checks, rollback plan | CI artifacts and runbook exercise |
| **NFR-010 No GenAI** | Production P1 has no GenAI execution, import schemas, telemetry or accidental routes | Negative feature and deployment tests |

## 8. Data domain and reporting contract

**Minimum entities:** `Firm` (single stable owner), `ClientInstitution`, `Engagement`, `Membership`, `ValidationItem`, `ValidationVersion`, `ReportingPeriod`, `ApprovedDisclosure`, `IntakePackage`, `EvidenceReference`, `TestResultSummary`, `ReportSection`, `Finding`, `RemediationAction`, `ManagementResponse`, `ReportSnapshot`, `Approval`, `AuditEvent`, `ExportEvent`.

**Every business record:** trusted `client_id` / `engagement_id`, unique ID, classification, created/updated actor+timestamp, version and scope. Use `firm_id` only if technically useful; it does **not** imply a multi-firm SaaS. Clients are workspaces, **not** independent SaaS organizations.

**Minimum approved-output manifest:** `schema_version`, `client_id`, `engagement_id`, `validation_item_id`, `period`, `source_name/version`, `institution_release_approval_id`, `classification`, `fields_allowed`, `source_document_references`, `files_digest`, `prepared_by`, `approved_by`, `approved_at`, `uploaded_by`, `import_received_at`. For manual P1, a bank-approved signed publisher is **not required**, but authenticity and authorization of the bank disclosure approval must be verified through an agreed process; package signing is a subsequent hardening option. Caller-supplied scopes are never trusted without comparing them to server grants.

Forbidden by default: customer/beneficiary/originator names, addresses, SSN/TIN, account numbers, transaction-level records, alert narratives, SAR documents, real investigative case text, credentials/secrets, private prompt material. Exceptions, if ever proposed, require **new** scope, client approval and security review.

## 9. Report content and auditability

Required sections, subject to actual engagement scope: executive summary; engagement scope and methodology; item inventory and classification; conceptual soundness; monitoring/performance; data integrity **summary**; outcomes and ATL/BTL testing **summary**; limitations; findings/materiality/remediation; conclusion and effective challenge; management response; source/evidence index; approvals/version history; regulatory applicability caveat.

Each displayed KPI identifies period, method, evidence pointer and limitation. The report must not state it independently executed tests or certify regulatory compliance. A human professional produces and approves conclusions, subject to the firm's methodology and independence policy.

## 10. P1 scope and release gates

See [P1 MVP Scope](../p1/P1_MVP_SCOPE_AND_ACCEPTANCE.md) and [Backlog](../p1/P1_IMPLEMENTATION_BACKLOG.md). No live client information until release gates for SSO/MFA, isolation, approved transfer, access logs, security review and backup/restore are satisfied. An MVP may operate **solely with synthetic data** before external approvals.

### P0 signoff register (all pending)

| Signoff | Decision needed | Owner | State |
|---|---|---|---|
| Product sponsor | P1 traditional-reporting-only and single-firm scope | Consulting sponsor | PENDING |
| AML validation lead | Report sections and effective challenge methodology | Consulting validation SME | PENDING |
| Firm security/IT | Identity, segregation, data handling and operating controls | Consulting security | PENDING |
| Bank information owner | Which reports may leave the bank and through what channel | Per-engagement institution owner | PENDING |
| Legal/compliance | Contract, jurisdiction, privacy, licensing and retention | Counsel | PENDING |

## 11. Original requirement preservation / scope trace

- **S1:** `AML Model Validation Product Requirements Document.docx`: inventory, validation, performance, reporting and remediation. P1 provides documented **outputs**, not in-portal statistical execution.
- **S2:** `User Stories for AML Model Risk Validation Solution(20261015-040408).docx`: independent challenge, data integrity, ATL/BTL, reports and audit. P1 captures approved results and conclusions.
- **S3:** `Architectural and Operational Assumptions.txt`: multi-institution consulting use, data sensitivity, Go/Rust preference. P1 keeps multi-client isolation and defers data execution engines.
- **S4:** `phase1- module mapping.txt`: conceptual soundness, monitoring, outcomes and sensitive BSA attributes. P1 reports on these without importing sensitive base data.
- **S5:** `phases definition.txt`: security, privacy, ingestion, Go/Rust and deployment. P1 updates data boundary to reporting-only and technology to incremental Next.js modular monolith.
- **S6:** repository 2026 demo, README, persona guide, and current conversation scope decision: retain demo; production P1 is **single-firm/traditional-only**.

These documents are **planning sources** and must not be treated as approved regulatory advice or finalized institutional procedures.