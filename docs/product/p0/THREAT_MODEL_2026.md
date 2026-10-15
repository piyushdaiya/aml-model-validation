# P0 Threat Model — Single-Firm, Multi-Client AML Reporting MVP

**ID:** P0-TM-2026 · **Version:** 2.1 · **Date:** 2026-10-15  
**Status:** PROPOSED (architecture assessment; **no penetration test performed**)  
**Scope:** Consulting-hosted traditional AML reporting, institution-approved outputs, one firm and isolated client/engagement workspaces. **No GenAI or validation execution in P1.**

## 1. System and security objectives

Protect institution confidentiality, approved report contents, evidence provenance, validation conclusions and auditor-review history from inappropriate cross-client access, unapproved transfer, alteration and disclosure. The **strongest P1 risks** concern client boundary confusion, unapproved files, weak authentication, and report/export leakage. Multitenancy refers here only to client workspaces, **not** a platform owned by multiple consulting firms.

### Protected assets

- **A1** client identity, engagement membership, access grants and SSO events.
- **A2** permitted validation summary metrics, risk classifications and report narrative.
- **A3** evidence references, provenance metadata, institution release approvals and approved attachments.
- **A4** findings, materiality decisions, management responses, remediation deadlines and comments.
- **A5** draft/approved/released report snapshots and export/download grants.
- **A6** audit events, operational logs, secrets, backup copies and encryption keys.
- **A7** restricted institution data **that must never arrive** (raw transactions, customers, account identifiers, SAR/investigation narratives, private bank system access).

### Trust boundaries

| Boundary | Crossing | Default policy |
|---|---|---|
| **B1 Bank → consulting** | Bank-approved result summaries / references | **Deny unless** institution release approval and allowlisted classification verified |
| **B2 Internet/consulting user → web** | Interactive authentication and business/API calls | IdP MFA, trusted server session, client/engagement/object authorization |
| **B3 Web service → DB/object storage** | Scoped business and download operations | Deny unscoped queries; per-client isolation; least-privilege credentials |
| **B4 Draft → released artifact** | Professional sign-off and export | Maker-checker, immutable snapshot/hash, auditable release |
| **B5 Admin/operations → application data** | Privileged support, backup, CI/CD and logs | No default content read, JIT access and monitored change trail |
| **B6 Authorized engagement → portfolio aggregation** | Multi-client KPI summaries | Membership-scoped calculations; disallow unauthorized client leakage |

## 2. Attacker / mistake classes

External unauthenticated attacker; compromised or offboarded consultant; authorized consultant attempting to access other client information; client document uploader with a wrong/compromised scope; employee accidentally uploading restricted banking records; malicious attachment; compromised CI/secrets; over-privileged platform admin; inadvertent report-release error. Threats include accidental misuse, not only deliberate attacks.

## 3. Threat register and security tests

Risk is **qualitative proposed priority**, not computed or accepted residual risk. Each ID is stable for P1 issue/PR linkage. All mitigations are planned and **not yet verified**.

| ID | Priority | Boundary / scenario | Required mitigation | Security acceptance test |
|---|---|---|---|---|
| **TM-01** | Critical | B2/B3: forged `client_id` or `engagement_id` reads another bank | Derive trusted scope from membership, object-level authorization | API IDOR tests over 2+ simulated banks return denied |
| **TM-02** | Critical | B3: storage URL or path gives cross-client document | Private object store, service-side scoped short-lived grants | Wrong-client URL, expired link, prefix enumeration denied |
| **TM-03** | High | B2/B6: unauthorized cross-client dashboard totals or counts | Scope all aggregations before calculation; allowlist approved cross-client trends | Restricted user cannot infer other client's metrics |
| **TM-04** | Critical | B1: raw bank transactions, PII/NPI, SAR or case text imported by mistake | Strict allowed schema/classification; quarantine, scanning, manual bank approval check | Forbidden columns/record samples rejected and not logged |
| **TM-05** | High | B1: uploader falsely claims bank disclosure approval | Verify institution-issued approval reference and named approver out-of-band, scope/expiry | Fabricated/expired/mismatched approval denied |
| **TM-06** | High | B1: malicious file, active content or oversized archive | Content-type inspection, malware scan, size/decompression limit, safe rendering | Polyglot, macro, SVG/HTML, zip-bomb and traversal test set |
| **TM-07** | High | B1/B3: swapped, replayed or tampered imported report | Content hashes, unique package/version, locked intake receipt, replay rules | Altered duplicate fails or yields separate documented version |
| **TM-08** | Critical | B2: stale/JWT or unrevoked session after access removal | IdP-backed sessions, expiry/revocation, live membership checks | Revoked user loses all view/export capability |
| **TM-09** | Critical | B2: public registration creates privileged or unauthorized user | Disable public prod registration, invitation/IdP policy | Anonymous signup cannot provision production access |
| **TM-10** | High | B2: user uses persona switcher to escalate | Persona is presentation only; backend grants independent | LocalStorage changes never expand rights |
| **TM-11** | High | B2: CSRF/session fixation/session token theft | CSRF defenses, secure cookie, session rotation, CSP and origin checks | Negative CSRF and session lifecycle tests |
| **TM-12** | High | B2/B3: missing auth on an `/api` endpoint | Default-deny server API authorization middleware/service checks | Automated unauthenticated API route inventory tests |
| **TM-13** | Critical | B4: report author approves own material conclusion | Separate author/reviewer/approver grants and workflow checks | Self-approval and skip-review denied |
| **TM-14** | High | B4: post-release source changes silently alter PDF | Snapshot and manifest hashing, immutable release object | Regeneration/history checks detect mismatches |
| **TM-15** | High | B4: report includes restricted unapproved appendix | Export only approved section/material references, DLP and classification check | Reject non-approved attachment or source reference |
| **TM-16** | High | B4: PDF download exposes other engagement | Server authorization on each export/URI and short-lived links | Wrong engagement/object download denied |
| **TM-17** | High | B3: cache keys, background jobs or search indexing mix clients | Mandatory scope in key, task and search filter; purge on revocation | Cross-client cache hit / queue replay tests |
| **TM-18** | High | B5: app/database/admin can silently edit audit | External append-only audit target and tamper-detection | Admin cannot erase evidence without alarm |
| **TM-19** | High | B5: hardcoded Docker secrets or database passwords used in hosted P1 | Runtime secret manager, rotation, protected CI and `.env` hygiene | Secret scan and deployment config check |
| **TM-20** | High | B5: privileged support views reports outside role | No default admin content read; JIT break-glass approvals | Support-role negative reads and JIT audit |
| **TM-21** | High | B5: backup/restore mixes data or loses history | Scoped backup keys, restricted access, restore isolation and replay integrity | Restore drill with two banks and release snapshots |
| **TM-22** | High | B3/B5: logs/telemetry capture sensitive payload | Structured redacted logging, no request body logging, controlled retention | Synthetic canary strings absent from logs/APM |
| **TM-23** | Medium | B1: metadata or evidence ref reveals customer/SAR info | Reference allowlist, classification scan, opaque tokens | Reference validation and safe display tests |
| **TM-24** | High | B3: mass assignment of membership/role state | Explicit allowlisted update fields, roles created only by IAM workflow | Crafted JSON cannot grant partner/admin access |
| **TM-25** | High | B4: race or stale version releases unreviewed content | Optimistic locking, snapshot content hash, signed approval target | Concurrent-edit/release race tests |
| **TM-26** | Medium | B5: dependency/supply-chain compromise | Pinned lockfile, SCA/SAST, reviewed PR and deployment provenance | CI scanning and reproducible build reports |
| **TM-27** | Medium | B2/B5: brute force/availability abuse | IdP throttling, rate limits, monitoring, WAF as justified | Auth and import rate/DoS tests |
| **TM-28** | High | B1: cross-border transfer without institution approval | Region/classification/contract check before acceptance | Deny unsupported residency/recipient rules |
| **TM-29** | High | B3: insecure direct SQL or unsafe filter exposes unscoped data | Centralize repositories and test RLS/service policy | Repository query scope lint/integration tests |
| **TM-30** | Medium | B4: expired/revoked client user retains download access | Runtime permission check on download and no long-lived public URLs | Signed URL TTL/revocation scenario tested |
| **TM-31** | High | B2: existing GenAI demo content leaks into production views | Feature boundary, production router/seed/DTO export deny | P1 production-only negative GenAI tests |
| **TM-32** | High | B1/B2: browser reports data from synthetic demo as actual client evidence | Distinct demo mode, provenance and status badge, no demo-to-production migration | Synthetic data absent in production records/exports |

## 4. Current repository risk observations (read-only)

Inspected `main` on 2026-10-15. These are **code-level concerns to investigate**, not validated exploits:

- `docker-compose.yml` and `Dockerfile` embed predictable demo DB/JWT values; any shared/production deployment requires runtime secret injection and rotation (TM-19).
- `app/api/auth/register/route.ts` exposes open self-registration; `lib/auth.ts` uses app-managed JWT auth; `proxy.ts` intentionally forwards `/api` to handler routes without proxy-auth enforcement. All API routes need explicit review as the product grows (TM-08/09/12).
- `components/demo/demo-context.tsx` persists selected client/persona in `localStorage`; `lib/demo-data/*` is mock content. Neither is an authorization mechanism, nor is the mock content a production evidence source (TM-01/10/32).
- `prisma/schema.prisma` has user, account, party, transaction, alert, model entities, but no production client/engagement grant and reporting-snapshot domain. Do not repurpose sensitive transaction data models as hosted P1 reporting intake (TM-01/04).
- `app/testing/page.tsx` includes mock-driven threshold controls and reports; production P1 must visibly present **results**, not bank-side execution (TM-31/32).

**No live exploitation tests, application builds, secret rotation, or audit assessments were performed during this documentation update.**

## 5. Test and assurance plan

### Secure foundation gate — must pass before any real client data

- **G-S1:** Firm enterprise identity, MFA, revocation and admin/content segregation verified (TM-08–12/20/24).
- **G-S2:** At least two synthetic clients and three engagements; scoped CRUD, list, report, count, export, file, cache and background job tests (TM-01–03/16/17/29/30).
- **G-S3:** Documented approved-output data dictionary; disclosure-owner approval; quarantine, forbidden payloads, malware/type, replay, classification and raw bank-data denial (TM-04–07/23/28).
- **G-S4:** Maker-checker, immutable released PDF, manifest/source trace, concurrent edits and unauthorized exports (TM-13–15/25).
- **G-S5:** Secrets, backups, audit tamper resistance, logs, dependency scan, deployment and operations runbooks (TM-18/19/21/22/26/27).
- **G-S6:** GenAI and synthetic demo segregated/disabled in P1 production configuration (TM-31/32).

### Evidence required

Record for each case: test ID, threat ID, repo commit/SHA, environment (synthetic only until approved), test inputs without sensitive data, expected result, actual result, pass/fail, reviewer, date and defect link. A manually checked box is not a test result.

## 6. Residual-risk register — approval pending

| Risk decision | Proposed treatment | Required signoff |
|---|---|---|
| Bank mistakenly approves an overly revealing summary | Contractual data dictionary + dual review + DLP **cannot guarantee** all leaks are caught | Bank data owner/legal + firm security |
| First pilot has no cryptographic bank publisher | Permit controlled manual import only with verifiable institution approval and file integrity tracking | Bank information owner + firm security |
| Hosted app backup/residency | Define provider/region and allowed backup locations before pilot | Bank security + firm IT/legal |
| Platform admin needs exceptional report access | JIT time-boxed approval and dual audit | Firm security + engagement sponsor |
| No external client login at internal MVP start | Client access requires separate signed rollout and tests | Product sponsor + bank owner |

## 7. Review and update cadence

Refresh this threat model on architecture changes, new import types, any client external access, post-incident learning, deployment/IdP selection, addition of GenAI, bank-hosted execution or commercialization. **All P1 controls remain proposed until verified.**