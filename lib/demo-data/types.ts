export type DemoPersonaId =
  | "compliance-officer"
  | "risk-manager"
  | "model-owner"
  | "validator"
  | "admin"

export type ActivityType =
  | "report-generated"
  | "approval-completed"
  | "remediation-overdue"
  | "revalidation-triggered"
  | "audit-note-added"
  | "severe-finding-created"
  | "stress-test-failed"
  | "adversarial-scenario-flagged"
  | "benchmark-variance-detected"
  | "document-requested"
  | "milestone-due"
  | "action-assigned"
  | "governance-comment-added"
  | "test-run-completed"
  | "evidence-missing"
  | "data-quality-issue-detected"
  | "external-data-source-failed"
  | "calibration-changed"
  | "persona-changed"
  | "client-switched"
  | "configuration-updated"
  | "support-issue-created"
  | "demo-health-warning"

export type ClientTier = "Tier 1 Bank" | "Regional Bank" | "Fintech" | "Private Bank"

export type EngagementStage =
  | "Scoping"
  | "Fieldwork"
  | "Review"
  | "Steering Committee"

export type ModelType =
  | "Transaction Monitoring"
  | "Customer Risk"
  | "Sanctions & Watchlist"

export type ModelStage =
  | "Intake"
  | "Planning"
  | "Testing"
  | "Findings Drafted"
  | "Report Assembly"
  | "Ready for Readout"

export type ModelStatus = "On Track" | "Needs Attention" | "Escalated" | "Completed"

export type RiskLevel = "Low" | "Moderate" | "High" | "Critical"

export type Severity = "Low" | "Moderate" | "High" | "Critical"

export type Likelihood = "Rare" | "Possible" | "Likely" | "Severe"

export type ValidationStream =
  | "Conceptual Soundness"
  | "Data Validation"
  | "Performance"
  | "Testing"
  | "Governance"
  | "Reporting"

export type TestingScenarioKind =
  | "Sensitivity"
  | "Stress"
  | "Adversarial"
  | "Above-the-Line"
  | "Below-the-Line"

export type TestResultStatus = "Pass" | "Watch" | "Fail"

export type FindingStatus =
  | "Open"
  | "In Remediation"
  | "Ready for Review"
  | "Closed"

export type ExportFormat = "PowerPoint" | "PDF" | "Word" | "Evidence ZIP"

export type MilestoneStatus = "Complete" | "In Progress" | "Pending"

export interface DemoPersona {
  id: DemoPersonaId
  label: string
  description: string
}

export interface ClientEngagement {
  id: string
  clientName: string
  engagementName: string
  industry: ClientTier
  region: string
  sponsor: string
  practiceLead: string
  stage: EngagementStage
  nextCommitteeDate: string
  summary: string
}

export interface ModelMetrics {
  precision: number
  recall: number
  rocAuc: number
  falsePositiveRate: number
}

export interface ModelMilestone {
  label: string
  dueDate: string
  status: MilestoneStatus
}

export interface ValidationModel {
  id: string
  clientId: string
  name: string
  type: ModelType
  owner: string
  stage: ModelStage
  status: ModelStatus
  riskLevel: RiskLevel
  version: string
  lastValidatedOn: string
  nextReadoutDate: string
  summary: string
  methodologyNote: string
  metrics: ModelMetrics
  progressPercent: number
  openFindings: number
  atlCoverage: number
  btlCoverage: number
  milestones: ModelMilestone[]
  tags: string[]
}

export interface DataQualityCheck {
  name: string
  stream: "Completeness" | "Lineage" | "Integrity" | "Drift"
  status: TestResultStatus
  result: string
  owner: string
}

export interface ThresholdControl {
  label: string
  value: number
  min: number
  max: number
  unit: string
}

export interface TestingScenario {
  id: string
  modelId: string
  name: string
  kind: TestingScenarioKind
  hypothesis: string
  objective: string
  status: TestResultStatus
  passRate: number
  reproducibilityScore: number
  observations: string[]
  evidenceIds: string[]
}

export interface TestingWorkspace {
  modelId: string
  dataChecks: DataQualityCheck[]
  thresholdControls: ThresholdControl[]
  scenarios: TestingScenario[]
  resultSeries: Array<{
    label: string
    baselinePrecision: number
    simulatedPrecision: number
    baselineRecall: number
    simulatedRecall: number
    baselineAlerts: number
    simulatedAlerts: number
  }>
}

export interface EvidenceItem {
  id: string
  title: string
  category: string
  owner: string
  updatedAt: string
  note: string
}

export interface Finding {
  id: string
  clientId: string
  modelId: string
  title: string
  stream: ValidationStream
  severity: Severity
  likelihood: Likelihood
  status: FindingStatus
  owner: string
  dueDate: string
  recommendation: string
  summary: string
  evidenceIds: string[]
}

export interface ReportSection {
  id: string
  title: string
  status: "Drafted" | "Under Review" | "Ready"
  narrative: string
}

export interface ReportPack {
  modelId: string
  title: string
  reportOwner: string
  exportFormats: ExportFormat[]
  sections: ReportSection[]
}

export interface ActivityItem {
  id: string
  clientId: string
  modelId?: string
  type: ActivityType
  title: string
  detail: string
  actor: string
  occurredAt: string
  category: "Testing" | "Finding" | "Governance" | "Reporting"
}
