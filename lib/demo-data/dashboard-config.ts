import type { ActivityType, DemoPersonaId } from "@/lib/demo-data/types"

export type DashboardKpiId =
  | "HighRiskFindingsKpi"
  | "OverdueRemediationsKpi"
  | "RevalidationTriggersKpi"
  | "EvidencePacksReadyKpi"
  | "ModelsNearReviewDateKpi"
  | "AuditTrailExceptionsKpi"
  | "GenAIWorkflowsInScopeKpi"
  | "HighRiskAiFindingsKpi"
  | "PromptTestScenariosFailedKpi"
  | "GroundingCoverageKpi"
  | "HumanReviewExceptionsKpi"
  | "MaterialRiskIssuesKpi"
  | "PerformanceDriftKpi"
  | "FailedScenarioKpi"
  | "ThresholdExceptionsKpi"
  | "OpenRemediationsKpi"
  | "BenchmarkGapsKpi"
  | "AssignedModelsKpi"
  | "PendingDocumentationKpi"
  | "AssignedActionsKpi"
  | "ApprovalMilestonesKpi"
  | "ValidationResponseItemsKpi"
  | "TrainingTasksKpi"
  | "PendingValidationReviewsKpi"
  | "FailedTestRunsKpi"
  | "DataQualityExceptionsKpi"
  | "ExternalDataAlertsKpi"
  | "CalibrationChangesKpi"
  | "EvidenceCompletenessKpi"
  | "ActiveClientEngagementsKpi"
  | "ModelsInScopeKpi"
  | "ActiveUsersKpi"
  | "DemoHealthKpi"
  | "SupportIssuesKpi"
  | "ConfigChangesKpi"

export type DashboardWidgetId =
  | "AIWorkflowValidationStatusWidget"
  | "FindingsSeverityWidget"
  | "RemediationTimelineWidget"
  | "RevalidationTriggerWatchlist"
  | "ValidationStatusWidget"
  | "EvidencePackReadinessWidget"
  | "GovernanceActionsWidget"
  | "RiskHeatmapWidget"
  | "PerformanceTrendWidget"
  | "ScenarioFailureWidget"
  | "ThresholdSensitivityWidget"
  | "RevalidationMilestonesWidget"
  | "AssignedModelsWidget"
  | "DocumentationChecklistWidget"
  | "MilestonesWidget"
  | "OwnerResponseFindingsWidget"
  | "NotesCommentsWidget"
  | "TestingQueueWidget"
  | "DataQualityExceptionsWidget"
  | "EvidenceCompletenessWidget"
  | "ScenarioCoverageWidget"
  | "ExternalSourceIntegrityWidget"
  | "CalibrationHistoryWidget"
  | "ClientPortfolioWidget"
  | "ModelStatusOverviewWidget"
  | "DemoSystemActivityWidget"
  | "ConfigurationLogWidget"
  | "SupportQueueWidget"
  | "AccessOverviewWidget"

export type DashboardHrefTemplate =
  | "/dashboard"
  | "/findings"
  | "/testing"
  | "/settings/demo"
  | "/models/:activeModelId"
  | "/reports/:activeModelId"

export interface DashboardCta {
  label: string
  href: DashboardHrefTemplate
}

export interface DashboardInsightBannerConfig {
  eyebrow: string
  title: string
  description: string
}

export interface PersonaDashboardConfig {
  kpis: DashboardKpiId[]
  topWidgets: DashboardWidgetId[]
  bottomWidgets: DashboardWidgetId[]
  ctas: DashboardCta[]
  activityTypes: ActivityType[]
  insightBanner: DashboardInsightBannerConfig
}

export const dashboardConfigByPersona: Record<DemoPersonaId, PersonaDashboardConfig> = {
  "consulting-partner": {
    kpis: [
      "ActiveClientEngagementsKpi",
      "ModelsInScopeKpi",
      "GenAIWorkflowsInScopeKpi",
      "EvidencePacksReadyKpi",
      "HighRiskFindingsKpi",
      "HighRiskAiFindingsKpi",
    ],
    topWidgets: [
      "ClientPortfolioWidget",
      "EvidencePackReadinessWidget",
      "AIWorkflowValidationStatusWidget",
      "ModelStatusOverviewWidget",
    ],
    bottomWidgets: [
      "FindingsSeverityWidget",
      "GovernanceActionsWidget",
      "DemoSystemActivityWidget",
    ],
    ctas: [
      { label: "Review Portfolio Readiness", href: "/dashboard" },
      { label: "Open Committee Pack", href: "/reports/:activeModelId" },
      { label: "Review High-Risk Items", href: "/findings" },
    ],
    activityTypes: [
      "report-generated",
      "approval-completed",
      "severe-finding-created",
      "revalidation-triggered",
      "configuration-updated",
    ],
    insightBanner: {
      eyebrow: "Portfolio outlook",
      title: "This secure reporting portal supports reusable consulting delivery across both traditional AML and GenAI assurance engagements.",
      description:
        "Use this view to show executive portfolio coverage, committee-pack readiness, high-risk client items, and where GenAI reporting can expand the consulting offering without moving execution outside the institution.",
    },
  },
  "client-compliance-sponsor": {
    kpis: [
      "HighRiskFindingsKpi",
      "HighRiskAiFindingsKpi",
      "OverdueRemediationsKpi",
      "RevalidationTriggersKpi",
      "GroundingCoverageKpi",
      "HumanReviewExceptionsKpi",
      "AuditTrailExceptionsKpi",
    ],
    topWidgets: [
      "AIWorkflowValidationStatusWidget",
      "FindingsSeverityWidget",
      "RemediationTimelineWidget",
      "RevalidationTriggerWatchlist",
    ],
    bottomWidgets: [
      "ValidationStatusWidget",
      "EvidencePackReadinessWidget",
      "GovernanceActionsWidget",
    ],
    ctas: [
      { label: "Review Compliance Posture", href: "/dashboard" },
      { label: "Open Findings", href: "/findings" },
      { label: "Open Committee Pack", href: "/reports/:activeModelId" },
    ],
    activityTypes: [
      "report-generated",
      "approval-completed",
      "remediation-overdue",
      "revalidation-triggered",
      "audit-note-added",
    ],
    insightBanner: {
      eyebrow: "Compliance posture",
      title: "The current engagement is positioned for secure audit-friendly oversight across both traditional models and GenAI workflows.",
      description:
        "Use this view to demonstrate how the portal highlights overdue remediation, grounding coverage, human-review controls, and report readiness without losing the regulator-facing narrative.",
    },
  },
  "engagement-lead": {
    kpis: [
      "MaterialRiskIssuesKpi",
      "HighRiskAiFindingsKpi",
      "PerformanceDriftKpi",
      "FailedScenarioKpi",
      "PromptTestScenariosFailedKpi",
      "ThresholdExceptionsKpi",
      "OpenRemediationsKpi",
    ],
    topWidgets: [
      "AIWorkflowValidationStatusWidget",
      "RiskHeatmapWidget",
      "PerformanceTrendWidget",
      "ScenarioFailureWidget",
    ],
    bottomWidgets: [
      "ThresholdSensitivityWidget",
      "FindingsSeverityWidget",
      "RevalidationMilestonesWidget",
    ],
    ctas: [
      { label: "Review Engagement Posture", href: "/dashboard" },
      { label: "Open Findings", href: "/findings" },
      { label: "Open Client Pack", href: "/reports/:activeModelId" },
    ],
    activityTypes: [
      "severe-finding-created",
      "remediation-overdue",
      "milestone-due",
      "benchmark-variance-detected",
      "governance-comment-added",
    ],
    insightBanner: {
      eyebrow: "Client engagement",
      title: "Material client issues are concentrated in findings severity, remediation sequencing, and committee-pack readiness.",
      description:
        "This composition keeps material findings, milestone pressure, and the client-facing reporting story in one place so the engagement lead can prepare a clear readout without implying workflow execution in the portal.",
    },
  },
  "client-model-sponsor": {
    kpis: [
      "AssignedModelsKpi",
      "PendingDocumentationKpi",
      "AssignedActionsKpi",
      "ApprovalMilestonesKpi",
      "ValidationResponseItemsKpi",
      "GroundingCoverageKpi",
    ],
    topWidgets: [
      "AssignedModelsWidget",
      "DocumentationChecklistWidget",
      "MilestonesWidget",
      "AIWorkflowValidationStatusWidget",
    ],
    bottomWidgets: [
      "OwnerResponseFindingsWidget",
      "NotesCommentsWidget",
      "EvidencePackReadinessWidget",
    ],
    ctas: [
      { label: "Review Response Items", href: "/findings" },
      { label: "Open Evidence Summary", href: "/models/:activeModelId" },
      { label: "Open Approval Pack", href: "/reports/:activeModelId" },
    ],
    activityTypes: [
      "document-requested",
      "milestone-due",
      "action-assigned",
      "governance-comment-added",
    ],
    insightBanner: {
      eyebrow: "Client response",
      title: "The next approval outcome depends on documentation closure, prompt-version discipline, and timely sponsor responses.",
      description:
        "This view shifts attention to documentation gaps, approvals, workflow boundaries, and open response items so the client model sponsor can use the portal as a secure review surface rather than an execution environment.",
    },
  },
  "validation-lead": {
    kpis: [
      "PendingValidationReviewsKpi",
      "FailedTestRunsKpi",
      "DataQualityExceptionsKpi",
      "PromptTestScenariosFailedKpi",
      "EvidenceCompletenessKpi",
      "GroundingCoverageKpi",
      "AuditTrailExceptionsKpi",
    ],
    topWidgets: [
      "TestingQueueWidget",
      "DataQualityExceptionsWidget",
      "EvidenceCompletenessWidget",
      "AIWorkflowValidationStatusWidget",
    ],
    bottomWidgets: [
      "ScenarioCoverageWidget",
      "ExternalSourceIntegrityWidget",
      "EvidencePackReadinessWidget",
    ],
    ctas: [
      { label: "Review Evidence Summary", href: "/models/:activeModelId" },
      { label: "Open Testing Evidence", href: "/testing" },
      { label: "Open Audit Pack", href: "/reports/:activeModelId" },
    ],
    activityTypes: [
      "test-run-completed",
      "evidence-missing",
      "data-quality-issue-detected",
      "external-data-source-failed",
      "audit-note-added",
    ],
    insightBanner: {
      eyebrow: "Evidence readiness",
      title: "The portal is strongest when testing summaries, evidence completeness, and audit-trail quality stay visible together.",
      description:
        "The validation lead view puts evidence completeness, testing summaries, data-quality or grounding exceptions, and report-section readiness on one surface so the reporting package stays defensible and easy to review.",
    },
  },
  "platform-admin": {
    kpis: [
      "ActiveClientEngagementsKpi",
      "ModelsInScopeKpi",
      "GenAIWorkflowsInScopeKpi",
      "ActiveUsersKpi",
      "DemoHealthKpi",
      "SupportIssuesKpi",
      "ConfigChangesKpi",
    ],
    topWidgets: [
      "ClientPortfolioWidget",
      "ModelStatusOverviewWidget",
      "AIWorkflowValidationStatusWidget",
      "DemoSystemActivityWidget",
    ],
    bottomWidgets: [
      "ConfigurationLogWidget",
      "SupportQueueWidget",
      "AccessOverviewWidget",
    ],
    ctas: [
      { label: "Manage Portal Setup", href: "/settings/demo" },
      { label: "Review Audit Log", href: "/settings/demo" },
      { label: "Open Support Summary", href: "/dashboard" },
    ],
    activityTypes: [
      "persona-changed",
      "client-switched",
      "configuration-updated",
      "support-issue-created",
      "demo-health-warning",
    ],
    insightBanner: {
      eyebrow: "Portal operations",
      title: "The same secure reporting portal can scale across engagements with lightweight setup, access, and audit controls.",
      description:
        "For platform administration, this view demonstrates secure access posture, engagement setup, environment health, and audit-log visibility without turning the portal into an execution environment.",
    },
  },
}

export function getDashboardConfig(personaId: DemoPersonaId): PersonaDashboardConfig {
  return dashboardConfigByPersona[personaId]
}
