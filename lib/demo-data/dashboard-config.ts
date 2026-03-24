import type { ActivityType, DemoPersonaId } from "@/lib/demo-data/types"

export type DashboardKpiId =
  | "HighRiskFindingsKpi"
  | "OverdueRemediationsKpi"
  | "RevalidationTriggersKpi"
  | "EvidencePacksReadyKpi"
  | "ModelsNearReviewDateKpi"
  | "AuditTrailExceptionsKpi"
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
  "compliance-officer": {
    kpis: [
      "HighRiskFindingsKpi",
      "OverdueRemediationsKpi",
      "RevalidationTriggersKpi",
      "EvidencePacksReadyKpi",
      "ModelsNearReviewDateKpi",
      "AuditTrailExceptionsKpi",
    ],
    topWidgets: [
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
      { label: "Generate OCC-Aligned Brief", href: "/reports/:activeModelId" },
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
      title: "The current engagement is positioned for audit-friendly oversight.",
      description:
        "Use this view to demonstrate how the accelerator highlights overdue remediation, revalidation triggers, and evidence-pack readiness without losing the regulator-facing narrative.",
    },
  },
  "risk-manager": {
    kpis: [
      "MaterialRiskIssuesKpi",
      "PerformanceDriftKpi",
      "FailedScenarioKpi",
      "ThresholdExceptionsKpi",
      "OpenRemediationsKpi",
      "BenchmarkGapsKpi",
    ],
    topWidgets: [
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
      { label: "Review Risk Exposure", href: "/dashboard" },
      { label: "Open Testing Lab", href: "/testing" },
      { label: "Review Remediation Priorities", href: "/findings" },
    ],
    activityTypes: [
      "severe-finding-created",
      "stress-test-failed",
      "adversarial-scenario-flagged",
      "benchmark-variance-detected",
    ],
    insightBanner: {
      eyebrow: "Risk exposure",
      title: "Material model risk is concentrated in scenario stability, drift, and unresolved remediation.",
      description:
        "This composition keeps failed scenarios, benchmark gaps, and threshold exceptions at the center so leadership can prioritize the next decisions with a risk-first lens.",
    },
  },
  "model-owner": {
    kpis: [
      "AssignedModelsKpi",
      "PendingDocumentationKpi",
      "AssignedActionsKpi",
      "ApprovalMilestonesKpi",
      "ValidationResponseItemsKpi",
      "TrainingTasksKpi",
    ],
    topWidgets: [
      "AssignedModelsWidget",
      "DocumentationChecklistWidget",
      "MilestonesWidget",
    ],
    bottomWidgets: [
      "OwnerResponseFindingsWidget",
      "NotesCommentsWidget",
      "ValidationStatusWidget",
    ],
    ctas: [
      { label: "Update Model Evidence", href: "/models/:activeModelId" },
      { label: "Review Assigned Actions", href: "/findings" },
      { label: "Prepare for Approval Review", href: "/reports/:activeModelId" },
    ],
    activityTypes: [
      "document-requested",
      "milestone-due",
      "action-assigned",
      "governance-comment-added",
    ],
    insightBanner: {
      eyebrow: "Owner execution",
      title: "The next approval outcome depends on documentation closure and timely owner responses.",
      description:
        "This version of the shared dashboard shifts attention to assigned actions, milestone timing, and exactly what the model owner needs to prepare before governance review.",
    },
  },
  validator: {
    kpis: [
      "PendingValidationReviewsKpi",
      "FailedTestRunsKpi",
      "DataQualityExceptionsKpi",
      "ExternalDataAlertsKpi",
      "CalibrationChangesKpi",
      "EvidenceCompletenessKpi",
    ],
    topWidgets: [
      "TestingQueueWidget",
      "DataQualityExceptionsWidget",
      "EvidenceCompletenessWidget",
    ],
    bottomWidgets: [
      "ScenarioCoverageWidget",
      "ExternalSourceIntegrityWidget",
      "CalibrationHistoryWidget",
    ],
    ctas: [
      { label: "Continue Validation", href: "/models/:activeModelId" },
      { label: "Open Testing Lab", href: "/testing" },
      { label: "Review Evidence Gaps", href: "/reports/:activeModelId" },
    ],
    activityTypes: [
      "test-run-completed",
      "evidence-missing",
      "data-quality-issue-detected",
      "external-data-source-failed",
      "calibration-changed",
    ],
    insightBanner: {
      eyebrow: "Validation execution",
      title: "Testing momentum is strongest when data exceptions, evidence gaps, and calibration changes stay visible together.",
      description:
        "The validator composition puts queue health, source integrity, and evidence completeness on one surface so the workbench clearly supports future orchestration and replay.",
    },
  },
  admin: {
    kpis: [
      "ActiveClientEngagementsKpi",
      "ModelsInScopeKpi",
      "ActiveUsersKpi",
      "DemoHealthKpi",
      "SupportIssuesKpi",
      "ConfigChangesKpi",
    ],
    topWidgets: [
      "ClientPortfolioWidget",
      "ModelStatusOverviewWidget",
      "DemoSystemActivityWidget",
    ],
    bottomWidgets: [
      "ConfigurationLogWidget",
      "SupportQueueWidget",
      "AccessOverviewWidget",
    ],
    ctas: [
      { label: "Manage Demo Setup", href: "/settings/demo" },
      { label: "Review Configuration Log", href: "/settings/demo" },
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
      eyebrow: "Portfolio operations",
      title: "The same demo shell can scale into a multi-client operating surface with lightweight admin controls.",
      description:
        "For internal leadership, this view demonstrates portfolio coverage, configuration visibility, and support monitoring without requiring a separate admin dashboard build.",
    },
  },
}

export function getDashboardConfig(personaId: DemoPersonaId): PersonaDashboardConfig {
  return dashboardConfigByPersona[personaId]
}
