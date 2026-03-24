import type { Finding, Severity, ValidationTrack } from "@/lib/demo-data/types"

export const findings: Finding[] = [
  {
    id: "F-102",
    clientId: "northstar-bank",
    modelId: "cash-velocity-v32",
    track: "Traditional AML Model",
    validationType: "Transaction Monitoring Model",
    title: "Commercial cash segment produces uncontrolled false-positive concentration",
    stream: "Testing",
    severity: "Critical",
    likelihood: "Likely",
    status: "In Remediation",
    owner: "Northstar TMU",
    dueDate: "2026-04-05",
    recommendation:
      "Introduce segmented thresholds or carve-out overlays and re-run BTL comparison for commercial cash-intensive accounts.",
    summary:
      "Stress testing demonstrates unsustainable alert growth in commercial segments without a risk-based threshold overlay.",
    evidenceIds: ["ev-002", "ev-003"],
  },
  {
    id: "F-087",
    clientId: "northstar-bank",
    modelId: "wire-escalation-v21",
    track: "Traditional AML Model",
    validationType: "Transaction Monitoring Model",
    title: "Jurisdiction tagging lineage has manual override dependency",
    stream: "Data Validation",
    severity: "Moderate",
    likelihood: "Possible",
    status: "Open",
    owner: "Data Engineering",
    dueDate: "2026-04-09",
    recommendation:
      "Document override logic and establish automated lineage evidence for jurisdiction enrichment updates.",
    summary:
      "The current evidence trail is sufficient for fieldwork but not yet robust enough for audit replay.",
    evidenceIds: ["ev-001"],
  },
  {
    id: "F-131",
    clientId: "harbor-credit",
    modelId: "customer-risk-v5",
    track: "Traditional AML Model",
    validationType: "Customer Risk Model",
    title: "Score uplift assumptions for high-net-worth clients are not fully documented",
    stream: "Conceptual Soundness",
    severity: "High",
    likelihood: "Possible",
    status: "Ready for Review",
    owner: "Harbor Compliance Optimization",
    dueDate: "2026-04-07",
    recommendation:
      "Formalize design rationale and add governance signoff for segment-specific uplift logic and challenger results.",
    summary:
      "Conceptual rationale exists informally but lacks regulator-ready linkage to risk appetite and segment evidence.",
    evidenceIds: ["ev-004"],
  },
  {
    id: "F-144",
    clientId: "summit-payments",
    modelId: "sanctions-screening-v14",
    track: "Traditional AML Model",
    validationType: "Sanctions Screening Model",
    title: "Initial extract excludes analyst disposition timestamps",
    stream: "Data Validation",
    severity: "Moderate",
    likelihood: "Likely",
    status: "Open",
    owner: "Summit Payments Risk Engineering",
    dueDate: "2026-04-02",
    recommendation:
      "Expand the scoping extract before full testing begins so alert adjudication quality can be evaluated end-to-end.",
    summary:
      "Current scoping dataset is good enough for demo positioning but not for a complete validation workbench.",
    evidenceIds: ["ev-001"],
  },
  {
    id: "F-151",
    clientId: "atlas-private-bank",
    modelId: "watchlist-fuzzy-match-v9",
    track: "Traditional AML Model",
    validationType: "Sanctions Screening Model",
    title: "Adversarial transliteration testing is not reproducible across re-runs",
    stream: "Testing",
    severity: "Critical",
    likelihood: "Severe",
    status: "Open",
    owner: "Atlas Screening Operations",
    dueDate: "2026-03-30",
    recommendation:
      "Freeze rule versioning for retests, add deterministic evidence capture, and retest adversarial scenarios before committee.",
    summary:
      "Observed variance across repeat runs undermines the credibility of current fuzzy-match thresholds.",
    evidenceIds: ["ev-005", "ev-004"],
  },
  {
    id: "F-156",
    clientId: "atlas-private-bank",
    modelId: "private-client-monitor-v27",
    track: "Traditional AML Model",
    validationType: "Transaction Monitoring Model",
    title: "Audit trail packaging still relies on manual screenshot capture",
    stream: "Reporting",
    severity: "Low",
    likelihood: "Possible",
    status: "Closed",
    owner: "Engagement Manager",
    dueDate: "2026-03-21",
    recommendation:
      "Automate exhibit generation in the full product phase to reduce manual preparation burden.",
    summary:
      "Current manual control is acceptable for the pilot readout but should not carry into a scaled product workflow.",
    evidenceIds: ["ev-004"],
  },
  {
    id: "AI-201",
    clientId: "northstar-bank",
    modelId: "gai-001-alert-narrative-assistant",
    track: "GenAI Workflow",
    validationType: "GenAI Workflow",
    title: "Unsupported recommendation language appears in draft alert narratives",
    stream: "Safety & Controls",
    severity: "High",
    likelihood: "Likely",
    status: "Open",
    owner: "Northstar Alert Operations",
    dueDate: "2026-04-04",
    recommendation:
      "Tighten prompt constraints, add refusal checks for final recommendation requests, and re-test hallucination traps before readout.",
    summary:
      "The workflow occasionally drifts from grounded narrative drafting into unsupported recommendation language.",
    evidenceIds: ["ev-006", "ev-008"],
    findingType: "Unsupported Recommendation Language",
  },
  {
    id: "AI-202",
    clientId: "northstar-bank",
    modelId: "gai-001-alert-narrative-assistant",
    track: "GenAI Workflow",
    validationType: "GenAI Workflow",
    title: "Citation grounding is incomplete for recommendation paragraphs",
    stream: "Data & Grounding",
    severity: "Moderate",
    likelihood: "Likely",
    status: "In Remediation",
    owner: "AI Validation Pod",
    dueDate: "2026-04-06",
    recommendation:
      "Increase minimum citation requirements and require a retrieval-backed policy reference for recommendation-adjacent language.",
    summary:
      "Grounding is adequate for factual case summaries but weaker for rationale-heavy paragraphs.",
    evidenceIds: ["ev-007"],
    findingType: "Incomplete Citation Grounding",
  },
  {
    id: "AI-203",
    clientId: "harbor-credit",
    modelId: "gai-002-case-summarization-assistant",
    track: "GenAI Workflow",
    validationType: "GenAI Workflow",
    title: "Long chronology summaries occasionally omit supporting policy footnotes",
    stream: "Response Quality",
    severity: "Moderate",
    likelihood: "Possible",
    status: "Ready for Review",
    owner: "Harbor Investigations Office",
    dueDate: "2026-04-08",
    recommendation:
      "Extend long-output regression coverage and require explicit policy-footnote prompts for management-review summaries.",
    summary:
      "The workflow remains directionally strong, but long chronology summaries still show minor citation gaps.",
    evidenceIds: ["ev-007", "ev-009"],
    findingType: "Incomplete Citation Grounding",
  },
  {
    id: "AI-204",
    clientId: "summit-payments",
    modelId: "gai-003-policy-copilot",
    track: "GenAI Workflow",
    validationType: "GenAI Workflow",
    title: "Stale policy references are surfaced without reliable escalation behavior",
    stream: "Data & Grounding",
    severity: "Critical",
    likelihood: "Likely",
    status: "Open",
    owner: "Summit Policy Governance",
    dueDate: "2026-04-03",
    recommendation:
      "Block production answers when freshness checks fail and require policy-owner escalation for stale or conflicting guidance.",
    summary:
      "The copilot still answers too confidently when the newest approved procedural source is not available.",
    evidenceIds: ["ev-007", "ev-010"],
    findingType: "Stale Policy References",
  },
  {
    id: "AI-205",
    clientId: "summit-payments",
    modelId: "gai-003-policy-copilot",
    track: "GenAI Workflow",
    validationType: "GenAI Workflow",
    title: "Escalation behavior is inconsistent during policy-conflict prompts",
    stream: "Safety & Controls",
    severity: "High",
    likelihood: "Possible",
    status: "In Remediation",
    owner: "Prompt Governance Office",
    dueDate: "2026-04-10",
    recommendation:
      "Revise prompt hierarchy rules and add explicit escalation templates for policy-conflict responses.",
    summary:
      "Some prompt-conflict scenarios still produce direct answers instead of the required escalation path.",
    evidenceIds: ["ev-008", "ev-010"],
    findingType: "Inconsistent Escalation Behavior",
  },
  {
    id: "AI-206",
    clientId: "atlas-private-bank",
    modelId: "gai-004-disposition-recommendation-assistant",
    track: "GenAI Workflow",
    validationType: "GenAI Workflow",
    title: "Prompt version in one sampled environment is not the approved release",
    stream: "Governance",
    severity: "High",
    likelihood: "Likely",
    status: "Open",
    owner: "Platform Admin",
    dueDate: "2026-03-29",
    recommendation:
      "Lock environment promotion to approved prompt versions and add deployment-time control evidence for prompt release status.",
    summary:
      "One validation sample used a superseded prompt build, weakening auditability and replay confidence.",
    evidenceIds: ["ev-006", "ev-009"],
    findingType: "Prompt Version Not Approved",
  },
  {
    id: "AI-207",
    clientId: "atlas-private-bank",
    modelId: "gai-004-disposition-recommendation-assistant",
    track: "GenAI Workflow",
    validationType: "GenAI Workflow",
    title: "Sensitive-data redaction gap remains under adversarial prompt conditions",
    stream: "Safety & Controls",
    severity: "Critical",
    likelihood: "Severe",
    status: "Open",
    owner: "Atlas Financial Crime Operations",
    dueDate: "2026-04-01",
    recommendation:
      "Strengthen pre-generation masking, add negative regression packs, and block rollout until redaction failures are eliminated.",
    summary:
      "Adversarial tests surfaced one sample where relationship-manager detail was exposed beyond the approved boundary.",
    evidenceIds: ["ev-008"],
    findingType: "Sensitive-Data Redaction Gap",
  },
]

export function getFindings(): Finding[] {
  return findings
}

export function getFindingsForClient(clientId: string): Finding[] {
  return findings.filter((finding) => finding.clientId === clientId)
}

export function getFindingsForModel(modelId: string): Finding[] {
  return findings.filter((finding) => finding.modelId === modelId)
}

export function getFindingsByTrack(items: Finding[], track: ValidationTrack | "Combined"): Finding[] {
  if (track === "Combined") {
    return items
  }

  return items.filter((finding) => finding.track === track)
}

export function getFindingSeverityCounts(items: Finding[]): Record<Severity, number> {
  return {
    Low: items.filter((finding) => finding.severity === "Low").length,
    Moderate: items.filter((finding) => finding.severity === "Moderate").length,
    High: items.filter((finding) => finding.severity === "High").length,
    Critical: items.filter((finding) => finding.severity === "Critical").length,
  }
}
