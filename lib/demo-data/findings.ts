import type { Finding, Severity } from "@/lib/demo-data/types"

export const findings: Finding[] = [
  {
    id: "F-102",
    clientId: "northstar-bank",
    modelId: "cash-velocity-v32",
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

export function getFindingSeverityCounts(items: Finding[]): Record<Severity, number> {
  return {
    Low: items.filter((finding) => finding.severity === "Low").length,
    Moderate: items.filter((finding) => finding.severity === "Moderate").length,
    High: items.filter((finding) => finding.severity === "High").length,
    Critical: items.filter((finding) => finding.severity === "Critical").length,
  }
}
