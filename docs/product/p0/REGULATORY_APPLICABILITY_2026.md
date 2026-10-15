# P0 Regulatory & Contractual Applicability Matrix — Traditional AML Reporting MVP

**ID:** P0-REG-2026 · **Version:** 2.1 · **As of:** 2026-10-15  
**Status:** PROPOSED / research & design reference — **not legal advice, certification, or an institution-specific compliance determination**  
**Scope:** One consulting firm, approved traditional AML reporting outputs, multiple segregated engagements; **no P1 GenAI**.

## Use this matrix correctly

Regulatory obligations depend on the **financial institution's charter, supervisor, jurisdiction, business activity, contract and data actually processed**. A consulting firm's hosted portal is not automatically itself a regulated bank or directly subject to every client obligation; its own legal obligations and client-service obligations must be determined independently. The portal supplies *evidence and reporting functions* but does not certify compliance, perform independent bank testing, or make regulatory decisions. `C` means conditional/client review; `D` design-control reference; `F` future scope; `N` not a product capability in P1. **Legal and client-specific applicability review is mandatory.**

| ID | Authority / framework | P1 applicability | Reporting control implication | Decision / accountable owner |
|---|---|---|---|---|
| REG-01 | [OCC Bulletin 2026-13 — revised interagency model risk management](https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html) | **C** — depending on bank/in-scope quantitative model | Support conceptual soundness, outcomes analyses, monitoring, governance, limitations and human judgment; **do not claim this guidance sets enforceable prescriptive standards** | Bank model-risk lead + counsel classify each item |
| REG-02 | Historical OCC 2011-12 / SR 11-7 / FDIC adoption / OCC 2021-19 | **Historical; superseded/rescinded** per agency updates | Preserve historical references only as lineage when describing older validation methods; use current 2026 guidance for current mapping | Regulatory review confirms final citation list |
| REG-03 | Definition of model under revised 2026 guidance | **C** | Tag quantitative/statistical models separately from deterministic rules with no underpinning quantitative theories; do **not** claim every AML rule is an MRM model | Bank MRM/AML owners classify records |
| REG-04 | [FFIEC BSA/AML Manual: independent testing](https://bsaaml.ffiec.gov/manual/AssessingTheBSAAMLComplianceProgram/03) | **C** — regulated institution's independent testing program | Record testing scope, independence, methods, deficiencies, management responses and board-readout status; portal does **not** itself satisfy bank obligation | Bank BSA/AML officer + validation lead |
| REG-05 | [FFIEC independent-testing examination procedures](https://bsaaml.ffiec.gov/manual/AssessingTheBSAAMLComplianceProgram/03_ep) | **C** | Report completeness, workpaper references, responsible reviewers, and challenge notes; testing physically remains at institution | Engagement lead and independent validator |
| REG-06 | Bank-specific BSA/AML program requirements (e.g., OCC 12 CFR 21.21, Fed/FDIC/NCUA analogs) | **C** | Include applicable rules in per-engagement statement; ensure client-side scope and professional review | Bank legal/BSA officer |
| REG-07 | [NYDFS Part 504](https://www.dfs.ny.gov/apps_and_licensing/banks_and_trusts/home) | **C** — NY-regulated institutions | May store approved TM/filtering coverage, validation and exceptions summaries; **do not** auto-file annual certifications | Bank NYDFS owner confirms whether subject |
| REG-08 | BSA SAR confidentiality and investigative data controls | **C/high sensitivity** | By default forbid SARs, narratives and investigative case content in consulting-hosted portal; exceptions require a new legal/security decision | Bank legal/privacy/AML |
| REG-09 | GLBA privacy/safeguards and federal/state supervisory information-security obligations | **C** | Bank and consulting firm must determine exact legal/contractual roles; minimize data, encrypt, enforce RBAC, approve disclosures | Institution privacy lead + firm counsel |
| REG-10 | [FTC Safeguards Rule (16 CFR 314)](https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know) | **C**, not automatically applicable to this consulting firm | Rule's jurisdictional scope must be established; use safeguards as useful design practices without false coverage assertion | Firm counsel |
| REG-11 | State consumer privacy laws (e.g., CCPA/CPRA) | **C** based on jurisdiction/data/business criteria | Client-approved allowed-content list, purpose limitation, retention and data subject/legal response path | Firm + bank privacy counsel |
| REG-12 | GDPR/UK GDPR and other cross-border privacy/data-transfer restrictions | **C**, based on deployment, data and data subjects | No assumption that de-identification or summary statistics make every transfer lawful; per-engagement policy and region | Counsel and institution data owner |
| REG-13 | OFAC / sanctions screening program expectations | **C** | Sanctions/watchlist findings and controls may be tracked; institution owns sanctions compliance; do not represent software as screening or filing engine | Sanctions SME |
| REG-14 | Contractual confidentiality, DPA, third-party/vendor risk review | **C / required contractual gate** | Signed transfer permissions, access scope, retention, security controls, sub-processors and incident terms before client use | Procurement, legal, security |
| REG-15 | SOC 2 trust-service criteria / ISO 27001 / NIST security frameworks | **D**, optional assurance benchmarks | Security governance, logging, access reviews, change management, risk register; **not** a certification claim | Consulting security lead |
| REG-16 | Regulatory examination requests and record retention | **C** | Immutable released versions, retrieval of approved evidence references, retention/legal holds based on customer obligations | Records owner + client legal |
| REG-17 | GenAI safety/AI governance frameworks, e.g. NIST AI RMF/GenAI Profile | **F — explicitly excluded from P1** | Preserve possible future design track; not part of P1 release or compliance claims | Future product decision only |
| REG-18 | Data residency / client IT security and banking supervision contracts | **C** | Allow institution-hosted product variant later when bank forbids report egress; no transfer without bank approval | Bank owner + architecture |

## Critical 2026 applicability corrections

1. **April 17, 2026:** the OCC, Federal Reserve and FDIC issued revised interagency model-risk guidance. OCC Bulletin **2026-13** rescinds OCC **2011-12** and OCC **2021-19** among other issuances. The current guidance is risk-based, does **not** set enforceable standards or prescriptive requirements, and is most relevant to larger or higher model-risk banks. Review the Federal Reserve/FDIC parallel issuances when banking supervisors differ.
2. The 2026 guidance **excludes deterministic rule-based processes** without underpinning statistical, economic or financial theories from its model definition. Therefore a sanctions matching rule or threshold-based alert scenario is not automatically a covered model. Such controls can still be in-scope for **AML independent testing and governance**.
3. The guidance specifically excludes generative/agentic AI from its scope; **P1 does not build GenAI assurance** regardless. Later GenAI applicability requires separate legal/AML/risk analysis.
4. **FFIEC independent testing** is a separate BSA/AML program consideration with its own risk-based scope and independence expectations; do not equate it to validation of every particular model.
5. **NYDFS Part 504** applies only to relevant NYDFS-regulated institutions; the institution—not a portal export button—submits any required certification.

## Functional reporting control mapping

| Reporting area | Relevant ID(s) | P1 evidence / capability | Prohibited inference |
|---|---|---|---|
| Item type and scope | REG-01,03,04 | Regulatory classification, inventory and engagement-defined test scope | All AML controls are covered MRM models |
| Independent challenge and reviewer credentials | REG-01,04,05 | Reviewer notes, approvals, independence attestation references | App replaces independent validation |
| Conceptual soundness | REG-01,04 | Methodology and limitations narratives with evidence references | An automated pass/fail demonstrates compliance |
| Ongoing monitoring | REG-01,04,07 | Approved monitoring metric summaries and exceptions | Reporting portal calculates source bank metrics |
| Outcomes, ATL/BTL | REG-01,04,05 | Approved test coverage, differences and limitations | Test execution occurred in consulting environment |
| Findings, remediation and governance | REG-04,05,07,16 | Versioned issues, owner responses, status, due dates | Findings were automatically resolved |
| Data transfer and confidentiality | REG-08–12,14,18 | Approved data classification, intake receipts and strict access controls | Sanitization alone authorizes transfer |
| Reports and evidence index | REG-01,04,05,16 | Released snapshot, approvals, evidence pointer integrity | Export alone is a regulatory submission |

## Per-engagement applicability decision template (copy into internal engagement record)

```text
Engagement ID:
Institution legal name / jurisdiction / charter:
Supervisors (OCC / Fed / FDIC / NCUA / NYDFS / others):
Regulated business and AML systems in scope:
Quantitative models vs deterministic controls classification (with reasoning):
Relevant rules/guidance and institution policies (versions/dates):
Reportable fields/data classes approved to leave bank:
Forbidden classes:
Disclosure approval officer / date / scope / expiry:
Retained institution-side supporting workpapers:
Report retention / location / permitted recipients:
Independent validation/reviewer attestation:
Firm legal/privacy review:
Institution security/data-owner approval:
Residual gaps and next review date:
```

## Approval gates and open decisions

- Counsel and institution owner determine whether each REG row applies; do **not** interpret `C` as a determination of applicability.
- Agree model/control taxonomy and the method for handling hybrid AML workflows.
- Record the bank's explicit **permitted outputs** and supportable authenticity mechanism; no client data if undetermined.
- Approve retention, report confidentiality, export approval, and any cross-border transfer.
- Record which reports are deliverables and which are informational for governance; no representation as regulator certification.
- Reassess after guidance/contract changes; log source date and reviewer.

## Primary references, verified 2026-10-15

- OCC: https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html
- FFIEC independent testing: https://bsaaml.ffiec.gov/manual/AssessingTheBSAAMLComplianceProgram/03
- FFIEC examination procedures: https://bsaaml.ffiec.gov/manual/AssessingTheBSAAMLComplianceProgram/03_ep
- NYDFS Part 504 certification landing: https://www.dfs.ny.gov/apps_and_licensing/banks_and_trusts/home
- FTC Safeguards Rule scope: https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know

No legal or regulatory attestation has been performed by creating this document.