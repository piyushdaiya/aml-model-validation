import type { ModelStatus, ModelType, RiskLevel, ValidationModel } from "@/lib/demo-data/types"

export const validationModels: ValidationModel[] = [
  {
    id: "cash-velocity-v32",
    clientId: "northstar-bank",
    name: "Cash Structuring Velocity Monitor",
    type: "Transaction Monitoring",
    owner: "Northstar TMU",
    stage: "Testing",
    status: "Needs Attention",
    riskLevel: "Critical",
    version: "3.2",
    lastValidatedOn: "2025-10-28",
    nextReadoutDate: "2026-04-08",
    summary:
      "Rules-based scenario identifying rapid cash aggregation behavior across branch and ATM channels.",
    methodologyNote:
      "Focus area is below-the-line threshold calibration and false-positive concentration in commercial cash-intensive segments.",
    metrics: {
      precision: 0.27,
      recall: 0.81,
      rocAuc: 0.74,
      falsePositiveRate: 0.68,
    },
    progressPercent: 72,
    openFindings: 4,
    atlCoverage: 96,
    btlCoverage: 83,
    milestones: [
      { label: "Planning Memo", dueDate: "2026-03-12", status: "Complete" },
      { label: "Data Validation", dueDate: "2026-03-20", status: "Complete" },
      { label: "ATL Testing", dueDate: "2026-03-29", status: "In Progress" },
      { label: "Steering Readout", dueDate: "2026-04-08", status: "Pending" },
    ],
    tags: ["Board-visible", "High alert volume", "BTL focus"],
  },
  {
    id: "wire-escalation-v21",
    clientId: "northstar-bank",
    name: "Cross-Border Wire Escalation",
    type: "Transaction Monitoring",
    owner: "Northstar Surveillance Analytics",
    stage: "Report Assembly",
    status: "On Track",
    riskLevel: "High",
    version: "2.1",
    lastValidatedOn: "2025-11-06",
    nextReadoutDate: "2026-04-10",
    summary:
      "Scenario family covering nested cross-border wires, rapid beneficiary changes, and jurisdiction clustering.",
    methodologyNote:
      "Primary challenge points center on jurisdiction tagging quality and reproducibility of watchlist enrichment.",
    metrics: {
      precision: 0.42,
      recall: 0.76,
      rocAuc: 0.82,
      falsePositiveRate: 0.36,
    },
    progressPercent: 88,
    openFindings: 2,
    atlCoverage: 99,
    btlCoverage: 91,
    milestones: [
      { label: "Scoping", dueDate: "2026-03-04", status: "Complete" },
      { label: "Scenario Testing", dueDate: "2026-03-19", status: "Complete" },
      { label: "Findings Review", dueDate: "2026-03-27", status: "In Progress" },
      { label: "Audit Pack", dueDate: "2026-04-10", status: "Pending" },
    ],
    tags: ["Cross-border", "Jurisdictional risk"],
  },
  {
    id: "customer-risk-v5",
    clientId: "harbor-credit",
    name: "Customer Risk Rating Engine",
    type: "Customer Risk",
    owner: "Harbor Compliance Optimization",
    stage: "Findings Drafted",
    status: "On Track",
    riskLevel: "High",
    version: "5.0",
    lastValidatedOn: "2025-09-14",
    nextReadoutDate: "2026-04-15",
    summary:
      "Weighted customer risk scoring combining geography, occupation, transaction profile, and product usage.",
    methodologyNote:
      "Validation emphasizes conceptual soundness, segmentation drift, and challenger scorecard reasonability.",
    metrics: {
      precision: 0.58,
      recall: 0.69,
      rocAuc: 0.86,
      falsePositiveRate: 0.21,
    },
    progressPercent: 79,
    openFindings: 3,
    atlCoverage: 93,
    btlCoverage: 78,
    milestones: [
      { label: "Conceptual Review", dueDate: "2026-03-10", status: "Complete" },
      { label: "Challenger Testing", dueDate: "2026-03-24", status: "Complete" },
      { label: "Management Responses", dueDate: "2026-04-02", status: "In Progress" },
      { label: "Committee Deck", dueDate: "2026-04-15", status: "Pending" },
    ],
    tags: ["Scoring", "Segmentation drift"],
  },
  {
    id: "sanctions-screening-v14",
    clientId: "summit-payments",
    name: "Real-Time Sanctions Screening",
    type: "Sanctions & Watchlist",
    owner: "Summit Payments Risk Engineering",
    stage: "Planning",
    status: "On Track",
    riskLevel: "Critical",
    version: "1.4",
    lastValidatedOn: "2025-12-05",
    nextReadoutDate: "2026-04-21",
    summary:
      "Low-latency sanctions and PEP screening engine for customer onboarding and transaction interception.",
    methodologyNote:
      "Current phase positions the accelerator for a full validation workplan and evidence collection cadence.",
    metrics: {
      precision: 0.63,
      recall: 0.91,
      rocAuc: 0.89,
      falsePositiveRate: 0.17,
    },
    progressPercent: 41,
    openFindings: 1,
    atlCoverage: 62,
    btlCoverage: 40,
    milestones: [
      { label: "Scoping Interviews", dueDate: "2026-03-26", status: "In Progress" },
      { label: "Data Extract Signoff", dueDate: "2026-04-03", status: "Pending" },
      { label: "Testing Design", dueDate: "2026-04-11", status: "Pending" },
      { label: "Client Readout", dueDate: "2026-04-21", status: "Pending" },
    ],
    tags: ["Fintech", "Low latency", "Scoping"],
  },
  {
    id: "private-client-monitor-v27",
    clientId: "atlas-private-bank",
    name: "Private Client Activity Monitor",
    type: "Transaction Monitoring",
    owner: "Atlas Wealth Surveillance",
    stage: "Ready for Readout",
    status: "Completed",
    riskLevel: "High",
    version: "2.7",
    lastValidatedOn: "2026-01-18",
    nextReadoutDate: "2026-03-31",
    summary:
      "High-touch behavioral monitoring for private banking clients with bespoke scenario overlays.",
    methodologyNote:
      "Readout is positioned as a regulator- and audit-friendly narrative with explicit remediation sequencing.",
    metrics: {
      precision: 0.49,
      recall: 0.79,
      rocAuc: 0.84,
      falsePositiveRate: 0.29,
    },
    progressPercent: 97,
    openFindings: 1,
    atlCoverage: 98,
    btlCoverage: 89,
    milestones: [
      { label: "Evidence Pack", dueDate: "2026-03-18", status: "Complete" },
      { label: "Partner QA", dueDate: "2026-03-24", status: "Complete" },
      { label: "Client Readout", dueDate: "2026-03-31", status: "In Progress" },
      { label: "Regulator Binder", dueDate: "2026-04-03", status: "Pending" },
    ],
    tags: ["Private banking", "Executive ready"],
  },
  {
    id: "watchlist-fuzzy-match-v9",
    clientId: "atlas-private-bank",
    name: "Watchlist Fuzzy Match Resolver",
    type: "Sanctions & Watchlist",
    owner: "Atlas Screening Operations",
    stage: "Testing",
    status: "Escalated",
    riskLevel: "Critical",
    version: "0.9",
    lastValidatedOn: "2025-11-22",
    nextReadoutDate: "2026-04-04",
    summary:
      "Name-matching and transliteration resolution workflow supporting sanctions screening triage.",
    methodologyNote:
      "Escalation is tied to reproducibility concerns and inconsistent evidence retention across retests.",
    metrics: {
      precision: 0.34,
      recall: 0.88,
      rocAuc: 0.71,
      falsePositiveRate: 0.59,
    },
    progressPercent: 64,
    openFindings: 5,
    atlCoverage: 84,
    btlCoverage: 74,
    milestones: [
      { label: "Algorithm Walkthrough", dueDate: "2026-03-13", status: "Complete" },
      { label: "Adversarial Testing", dueDate: "2026-03-25", status: "In Progress" },
      { label: "Escalation Memo", dueDate: "2026-03-28", status: "Pending" },
      { label: "Risk Committee", dueDate: "2026-04-04", status: "Pending" },
    ],
    tags: ["Fuzzy matching", "Escalated", "Evidence gap"],
  },
]

export function getValidationModels(): ValidationModel[] {
  return validationModels
}

export function getValidationModel(modelId: string): ValidationModel | undefined {
  return validationModels.find((model) => model.id === modelId)
}

export function getModelsForClient(clientId: string): ValidationModel[] {
  return validationModels.filter((model) => model.clientId === clientId)
}

export function getModelCountsByStatus(models: ValidationModel[]): Record<ModelStatus, number> {
  return {
    "On Track": models.filter((model) => model.status === "On Track").length,
    "Needs Attention": models.filter((model) => model.status === "Needs Attention").length,
    Escalated: models.filter((model) => model.status === "Escalated").length,
    Completed: models.filter((model) => model.status === "Completed").length,
  }
}

export function getModelCountsByType(models: ValidationModel[]): Record<ModelType, number> {
  return {
    "Transaction Monitoring": models.filter((model) => model.type === "Transaction Monitoring").length,
    "Customer Risk": models.filter((model) => model.type === "Customer Risk").length,
    "Sanctions & Watchlist": models.filter((model) => model.type === "Sanctions & Watchlist").length,
  }
}

export function getHighRiskModelCount(models: ValidationModel[]): number {
  return models.filter((model) => model.riskLevel === "High" || model.riskLevel === "Critical").length
}

export function sortModelsByRisk(models: ValidationModel[]): ValidationModel[] {
  const order: Record<RiskLevel, number> = {
    Low: 0,
    Moderate: 1,
    High: 2,
    Critical: 3,
  }

  return [...models].sort((left, right) => order[right.riskLevel] - order[left.riskLevel])
}
