"use client"

import { useMemo } from "react"
import Link from "next/link"
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookText,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  DatabaseZap,
  FileText,
  FlaskConical,
  FolderKanban,
  GitCompareArrows,
  Globe2,
  LifeBuoy,
  ListTodo,
  MessageSquareMore,
  RotateCcw,
  ScrollText,
  Settings2,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ActivityRail } from "@/components/demo/dashboard/ActivityRail"
import { InsightBanner } from "@/components/demo/dashboard/InsightBanner"
import { AuditTimeline } from "@/components/demo/audit-timeline"
import { useDemoContext } from "@/components/demo/demo-context"
import { MetricCard } from "@/components/demo/metric-card"
import { RiskHeatmap } from "@/components/demo/risk-heatmap"
import { SectionCard } from "@/components/demo/section-card"
import { StatusChip } from "@/components/demo/status-chip"
import { useHydrated } from "@/components/demo/use-hydrated"
import { Button } from "@/components/ui/button"
import { getActivityByType, getRecentActivity } from "@/lib/demo-data/activity"
import { clientEngagements } from "@/lib/demo-data/clients"
import {
  getDashboardConfig,
  type DashboardHrefTemplate,
  type DashboardKpiId,
  type DashboardWidgetId,
} from "@/lib/demo-data/dashboard-config"
import { getFindings, getFindingsForClient, getFindingSeverityCounts } from "@/lib/demo-data/findings"
import {
  getModelsForClient,
  getValidationModels,
  isGenAIWorkflow,
  isTraditionalValidationModel,
} from "@/lib/demo-data/models"
import { getDemoPersona } from "@/lib/demo-data/personas"
import { getReportPack } from "@/lib/demo-data/reports"
import { getEvidenceForIds, getTestingWorkspace } from "@/lib/demo-data/testing"
import type {
  ActivityItem,
  DataQualityCheck,
  Finding,
  MilestoneStatus,
  ReportPack,
  TestingScenario,
  TestingWorkspace,
  ValidationModel,
} from "@/lib/demo-data/types"

const TODAY = new Date("2026-03-23T00:00:00Z")

type MetricCardConfig = Parameters<typeof MetricCard>[0]

type DashboardScope = {
  models: ValidationModel[]
  findings: Finding[]
  activity: ActivityItem[]
  reports: ReportPack[]
  workspaces: TestingWorkspace[]
  scenarios: TestingScenario[]
  dataChecks: DataQualityCheck[]
}

type DashboardData = {
  clientScope: DashboardScope
  portfolioScope: DashboardScope
  selectedActivity: ActivityItem[]
  activeClientName: string
  activeModelName: string
  activeModelId: string
  activeModelMilestones: ValidationModel["milestones"]
}

function parseDate(value: string) {
  return new Date(`${value}T00:00:00Z`)
}

function daysUntil(value: string) {
  return Math.round((parseDate(value).getTime() - TODAY.getTime()) / 86400000)
}

function isOverdue(value: string) {
  return parseDate(value).getTime() < TODAY.getTime()
}

function getScope(models: ValidationModel[], findings: Finding[], activity: ActivityItem[]): DashboardScope {
  const reports = models.map((model) => getReportPack(model.id)).filter((item): item is ReportPack => Boolean(item))
  const workspaces = models
    .map((model) => getTestingWorkspace(model.id))
    .filter((item): item is TestingWorkspace => Boolean(item))

  return {
    models,
    findings,
    activity,
    reports,
    workspaces,
    scenarios: workspaces.flatMap((workspace) => workspace.scenarios),
    dataChecks: workspaces.flatMap((workspace) => workspace.dataChecks),
  }
}

function milestoneToTimelineStatus(status: MilestoneStatus) {
  if (status === "Complete") return "Complete"
  if (status === "In Progress") return "In Progress"
  return "Pending"
}

function resolveHref(href: DashboardHrefTemplate, activeModelId: string) {
  return href.replace(":activeModelId", activeModelId)
}

function getSelectedActivity(activity: ActivityItem[], emphasis: ActivityItem["type"][]) {
  const emphasized = getActivityByType(activity, emphasis)
  const remainder = activity.filter((item) => !emphasis.includes(item.type))
  return [...emphasized, ...remainder].slice(0, 5)
}

function ListBlock({
  items,
  emptyMessage,
}: {
  items: Array<{
    id: string
    title: string
    detail: string
    meta?: string
    chip?: string
    chipKind?: "generic" | "risk" | "finding" | "milestone" | "test" | "model"
  }>
  emptyMessage: string
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium text-slate-900">{item.title}</p>
            {item.chip ? <StatusChip label={item.chip} kind={item.chipKind ?? "generic"} /> : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
          {item.meta ? <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{item.meta}</p> : null}
        </div>
      ))}
    </div>
  )
}

function getMetricCards(data: DashboardData): Record<DashboardKpiId, MetricCardConfig> {
  const { clientScope, portfolioScope, selectedActivity } = data
  const clientSeverity = getFindingSeverityCounts(clientScope.findings)
  const traditionalModels = clientScope.models.filter(isTraditionalValidationModel)
  const genAIModels = clientScope.models.filter(isGenAIWorkflow)
  const aiFindings = clientScope.findings.filter((finding) => finding.track === "GenAI Workflow")
  const promptFailures = clientScope.scenarios.filter(
    (scenario) =>
      [
        "Grounded Q&A",
        "Hallucination Trap",
        "Missing Context",
        "Prompt Injection",
        "Policy Conflict",
        "Unsafe Recommendation",
        "Stale Guidance",
        "Adversarial Investigator Prompt",
      ].includes(scenario.kind) && scenario.status !== "Pass"
  )
  const groundingAverage = genAIModels.length
    ? Math.round(genAIModels.reduce((sum, model) => sum + model.retrievalGroundingCoverage, 0) / genAIModels.length)
    : 0
  const humanReviewExceptions = genAIModels.filter(
    (model) =>
      model.humanReviewRequirement !== "Required" || model.groundingStatus === "Limited" || model.groundingStatus === "At Risk"
  ).length
  const overdueFindings = clientScope.findings.filter((finding) => finding.status !== "Closed" && isOverdue(finding.dueDate))
  const auditExceptions =
    clientScope.dataChecks.filter(
      (check) => (check.stream === "Lineage" || check.stream === "Integrity") && check.status !== "Pass"
    ).length + clientScope.findings.filter((finding) => finding.stream === "Reporting" && finding.status !== "Closed").length
  const driftIssues = clientScope.dataChecks.filter((check) => check.stream === "Drift" && check.status !== "Pass").length
  const failedScenarios = clientScope.scenarios.filter((scenario) => scenario.status === "Fail").length
  const thresholdExceptions = clientScope.scenarios.filter(
    (scenario) =>
      ["Sensitivity", "Stress", "Adversarial", "Below-the-Line", "Prompt Injection", "Unsafe Recommendation"].includes(
        scenario.kind
      ) && scenario.status !== "Pass"
  ).length
  const benchmarkGaps = traditionalModels.filter(
    (model) => model.metrics.rocAuc < 0.8 || model.metrics.precision < 0.4
  ).length
  const pendingDocumentation = clientScope.reports.flatMap((report) =>
    report.sections.filter((section) => section.status !== "Ready")
  ).length
  const approvalMilestones = clientScope.models.flatMap((model) =>
    model.milestones.filter((milestone) => milestone.status !== "Complete" && daysUntil(milestone.dueDate) <= 21)
  ).length
  const evidenceIds = Array.from(
    new Set([
      ...clientScope.findings.flatMap((finding) => finding.evidenceIds),
      ...clientScope.scenarios.flatMap((scenario) => scenario.evidenceIds),
    ])
  )
  const freshEvidence = getEvidenceForIds(evidenceIds).filter((item) => daysUntil(item.updatedAt) >= -3).length

  const uniquePeople = new Set([
    ...clientEngagements.map((engagement) => engagement.practiceLead),
    ...clientEngagements.map((engagement) => engagement.sponsor),
    ...portfolioScope.models.map((model) => model.owner),
    ...portfolioScope.findings.map((finding) => finding.owner),
    ...portfolioScope.activity.map((item) => item.actor),
  ])
  const supportIssues = portfolioScope.activity.filter((item) => item.type === "support-issue-created").length
  const configChanges = portfolioScope.activity.filter((item) => item.type === "configuration-updated").length
  const healthWarnings = portfolioScope.activity.filter((item) => item.type === "demo-health-warning").length

  return {
    HighRiskFindingsKpi: {
      title: "High-Risk Findings",
      value: `${clientSeverity.Critical + clientSeverity.High}`,
      subtitle: "Critical and high issues across the active engagement.",
      accent: "rose",
      icon: ShieldAlert,
    },
    OverdueRemediationsKpi: {
      title: "Overdue Remediations",
      value: `${overdueFindings.length}`,
      subtitle: "Open items already past due against agreed remediation dates.",
      accent: "amber",
      icon: AlertTriangle,
    },
    RevalidationTriggersKpi: {
      title: "Revalidation Triggers",
      value: `${clientScope.activity.filter((item) => item.type === "revalidation-triggered").length}`,
      subtitle: "Triggers opened from drift, prompt-control, or governance events.",
      accent: "blue",
      icon: RotateCcw,
    },
    EvidencePacksReadyKpi: {
      title: "Evidence Packs Ready",
      value: `${clientScope.reports.filter((report) => report.sections.every((section) => section.status !== "Drafted")).length}`,
      subtitle: "Report packs with all sections at least under review.",
      accent: "emerald",
      icon: ScrollText,
    },
    ModelsNearReviewDateKpi: {
      title: "Models Near Review Date",
      value: `${clientScope.models.filter((model) => daysUntil(model.nextReadoutDate) <= 21).length}`,
      subtitle: "Validation items approaching steering or committee readouts in the next three weeks.",
      accent: "slate",
      icon: BadgeCheck,
    },
    AuditTrailExceptionsKpi: {
      title: "Audit Trail Exceptions",
      value: `${auditExceptions}`,
      subtitle: "Lineage, integrity, or reporting-control gaps that matter in replay.",
      accent: "amber",
      icon: FileText,
    },
    GenAIWorkflowsInScopeKpi: {
      title: "GenAI Workflows In Scope",
      value: `${portfolioScope.models.filter(isGenAIWorkflow).length}`,
      subtitle: "Workflow validations now covered in the same shared accelerator.",
      accent: "blue",
      icon: Sparkles,
    },
    HighRiskAiFindingsKpi: {
      title: "High-Risk AI Findings",
      value: `${aiFindings.filter((finding) => finding.severity === "High" || finding.severity === "Critical").length}`,
      subtitle: "Material GenAI findings for grounding, safety, or control behavior.",
      accent: "rose",
      icon: Sparkles,
    },
    PromptTestScenariosFailedKpi: {
      title: "Prompt / Test Failures",
      value: `${promptFailures.length}`,
      subtitle: "Failed or watch GenAI scenario outcomes from prompt and safety testing.",
      accent: "amber",
      icon: FlaskConical,
    },
    GroundingCoverageKpi: {
      title: "Grounding Coverage",
      value: genAIModels.length ? `${groundingAverage}%` : "N/A",
      subtitle: "Average retrieval and citation grounding coverage for GenAI workflows in client scope.",
      accent: "blue",
      icon: DatabaseZap,
    },
    HumanReviewExceptionsKpi: {
      title: "Human-Review Exceptions",
      value: `${humanReviewExceptions}`,
      subtitle: "GenAI workflows where review controls or grounding posture still need attention.",
      accent: "amber",
      icon: CheckCircle2,
    },
    MaterialRiskIssuesKpi: {
      title: "Material Risk Issues",
      value: `${clientSeverity.Critical + clientSeverity.High + clientScope.models.filter((model) => model.status === "Escalated").length}`,
      subtitle: "Combined view of severe findings and escalated validation items.",
      accent: "rose",
      icon: ShieldAlert,
    },
    PerformanceDriftKpi: {
      title: "Performance Drift",
      value: `${driftIssues}`,
      subtitle: "Active drift exceptions from model or workflow validation checks.",
      accent: "amber",
      icon: TrendingUp,
    },
    FailedScenarioKpi: {
      title: "Failed Scenarios",
      value: `${failedScenarios}`,
      subtitle: "Scenarios currently failing the threshold for passable evidence.",
      accent: "rose",
      icon: FlaskConical,
    },
    ThresholdExceptionsKpi: {
      title: "Threshold Exceptions",
      value: `${thresholdExceptions}`,
      subtitle: "Calibration, prompt-control, or scenario exceptions still outside target behavior.",
      accent: "blue",
      icon: SlidersHorizontal,
    },
    OpenRemediationsKpi: {
      title: "Open Remediations",
      value: `${clientScope.findings.filter((finding) => finding.status !== "Closed").length}`,
      subtitle: "Total open or review-ready findings awaiting closure evidence.",
      accent: "slate",
      icon: ListTodo,
    },
    BenchmarkGapsKpi: {
      title: "Benchmark Gaps",
      value: `${benchmarkGaps}`,
      subtitle: "Traditional models falling below target precision or ROC-AUC benchmarks.",
      accent: "amber",
      icon: GitCompareArrows,
    },
    AssignedModelsKpi: {
      title: "Assigned Models",
      value: `${clientScope.models.length}`,
      subtitle: "Validation items currently in scope for owner action and documentation.",
      accent: "blue",
      icon: FolderKanban,
    },
    PendingDocumentationKpi: {
      title: "Pending Documentation",
      value: `${pendingDocumentation}`,
      subtitle: "Report sections and support documents still drafted or under review.",
      accent: "amber",
      icon: FileText,
    },
    AssignedActionsKpi: {
      title: "Assigned Actions",
      value: `${clientScope.findings.filter((finding) => finding.status !== "Closed").length}`,
      subtitle: "Findings and commitments still requiring owner action or evidence updates.",
      accent: "rose",
      icon: ListTodo,
    },
    ApprovalMilestonesKpi: {
      title: "Approval Milestones",
      value: `${approvalMilestones}`,
      subtitle: "Upcoming approval checkpoints and due dates across the active engagement.",
      accent: "emerald",
      icon: BadgeCheck,
    },
    ValidationResponseItemsKpi: {
      title: "Validation Response Items",
      value: `${clientScope.findings.filter((finding) => finding.status === "Ready for Review" || finding.status === "Open").length}`,
      subtitle: "Issues currently expecting owner response or governance narrative.",
      accent: "slate",
      icon: MessageSquareMore,
    },
    TrainingTasksKpi: {
      title: "Training Tasks",
      value: `${clientScope.models.filter((model) => model.stage === "Planning" || model.stage === "Testing").length}`,
      subtitle: "Owner enablement and prep work implied by items still in planning or active testing.",
      accent: "blue",
      icon: BookText,
    },
    PendingValidationReviewsKpi: {
      title: "Pending Validation Reviews",
      value: `${clientScope.models.filter((model) => model.status !== "Completed").length}`,
      subtitle: "Validation reviews not yet closed into final reporting or committee delivery.",
      accent: "blue",
      icon: ClipboardCheck,
    },
    FailedTestRunsKpi: {
      title: "Failed Test Runs",
      value: `${clientScope.scenarios.filter((scenario) => scenario.status === "Fail").length + clientScope.dataChecks.filter((check) => check.status === "Fail").length}`,
      subtitle: "Combined failed scenario runs and failed data-quality checks.",
      accent: "rose",
      icon: FlaskConical,
    },
    DataQualityExceptionsKpi: {
      title: "Data-Quality Exceptions",
      value: `${clientScope.dataChecks.filter((check) => check.status !== "Pass").length}`,
      subtitle: "Watch and fail conditions across completeness, lineage, integrity, and drift.",
      accent: "amber",
      icon: DatabaseZap,
    },
    ExternalDataAlertsKpi: {
      title: "External Data Alerts",
      value: `${clientScope.dataChecks.filter((check) => (check.stream === "Integrity" || check.stream === "Lineage") && check.status !== "Pass").length}`,
      subtitle: "Source-integrity and lineage alerts affecting validation reliability.",
      accent: "amber",
      icon: Globe2,
    },
    CalibrationChangesKpi: {
      title: "Calibration Changes",
      value: `${clientScope.activity.filter((item) => item.type === "calibration-changed").length}`,
      subtitle: "Recorded threshold or prompt-control changes across recent test execution.",
      accent: "blue",
      icon: SlidersHorizontal,
    },
    EvidenceCompletenessKpi: {
      title: "Evidence Completeness",
      value: `${freshEvidence}/${evidenceIds.length || 0}`,
      subtitle: "Fresh evidence artifacts available for active findings and scenarios.",
      accent: "emerald",
      icon: CheckCircle2,
    },
    ActiveClientEngagementsKpi: {
      title: "Active Client Engagements",
      value: `${clientEngagements.length}`,
      subtitle: "Portfolio-wide client engagements represented in the accelerator demo.",
      accent: "blue",
      icon: BriefcaseBusiness,
    },
    ModelsInScopeKpi: {
      title: "Models In Scope",
      value: `${portfolioScope.models.length}`,
      subtitle: "Total traditional models and workflows across the multi-client workbench.",
      accent: "slate",
      icon: FolderKanban,
    },
    ActiveUsersKpi: {
      title: "Active Users",
      value: `${uniquePeople.size}`,
      subtitle: "Distinct mock stakeholders reflected across sponsors, owners, validators, and admins.",
      accent: "emerald",
      icon: Users,
    },
    DemoHealthKpi: {
      title: "Demo Health",
      value: healthWarnings > 0 ? "Watch" : "Stable",
      subtitle: selectedActivity.some((item) => item.type === "demo-health-warning")
        ? "A recent warning exists in the system activity trail and remains visible to admins."
        : "No active health warnings are shown in the current mock operating trail.",
      accent: healthWarnings > 0 ? "amber" : "emerald",
      icon: Activity,
    },
    SupportIssuesKpi: {
      title: "Support Issues",
      value: `${supportIssues}`,
      subtitle: "Open demo-support issues and operational tickets requiring follow-up.",
      accent: "amber",
      icon: LifeBuoy,
    },
    ConfigChangesKpi: {
      title: "Config Changes",
      value: `${configChanges}`,
      subtitle: "Recent persona, provider, and prompt-configuration changes captured in the activity stream.",
      accent: "blue",
      icon: Settings2,
    },
  }
}

function WidgetRenderer({
  widgetId,
  data,
  chartsReady,
}: {
  widgetId: DashboardWidgetId
  data: DashboardData
  chartsReady: boolean
}) {
  const traditionalModels = data.clientScope.models.filter(isTraditionalValidationModel)
  const genAIModels = data.clientScope.models.filter(isGenAIWorkflow)
  const severityCounts = getFindingSeverityCounts(data.clientScope.findings)
  const severityData = [
    { label: "Low", count: severityCounts.Low },
    { label: "Moderate", count: severityCounts.Moderate },
    { label: "High", count: severityCounts.High },
    { label: "Critical", count: severityCounts.Critical },
  ]
  const performanceSeries = traditionalModels.map((model) => ({
    name: model.name.split(" ").slice(0, 2).join(" "),
    precision: Number((model.metrics.precision * 100).toFixed(0)),
    recall: Number((model.metrics.recall * 100).toFixed(0)),
    rocAuc: Number((model.metrics.rocAuc * 100).toFixed(0)),
  }))
  const validationStatusSeries = traditionalModels.map((model) => ({
    name: model.name.split(" ").slice(0, 2).join(" "),
    progress: model.progressPercent,
    atl: model.atlCoverage,
    btl: model.btlCoverage,
  }))
  const scenarioCoverage = Object.entries(
    data.clientScope.scenarios.reduce<Record<string, number>>((acc, scenario) => {
      acc[scenario.kind] = (acc[scenario.kind] ?? 0) + 1
      return acc
    }, {})
  ).map(([kind, count]) => ({ kind, count }))

  switch (widgetId) {
    case "AIWorkflowValidationStatusWidget":
      return (
        <SectionCard
          title="AI Workflow Validation Status"
          description="Portfolio view of GenAI workflow grounding, human review, and control posture."
          contentClassName="p-6"
        >
          <ListBlock
            items={genAIModels.map((model) => ({
              id: model.id,
              title: model.name,
              detail: `${model.groundingStatus} grounding • ${model.humanReviewRequirement} review • prompt pack ${model.promptPackVersion}`,
              meta: `${model.providerModelName} • findings ${model.openFindings}`,
              chip: model.status,
              chipKind: "model" as const,
            }))}
            emptyMessage="No GenAI workflows are currently in scope for this client."
          />
        </SectionCard>
      )
    case "FindingsSeverityWidget":
      return (
        <SectionCard title="Findings Severity" description="Severity mix for the active client engagement." contentClassName="space-y-4 p-6">
          <div className="space-y-3">
            {severityData.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="text-slate-500">{item.count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-slate-900" style={{ width: `${Math.max(8, item.count * 28)}px` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )
    case "RemediationTimelineWidget":
      return (
        <SectionCard title="Remediation Timeline" description="Due-date pressure for open findings and management actions." contentClassName="p-6">
          <AuditTimeline
            compact
            items={data.clientScope.findings
              .filter((finding) => finding.status !== "Closed")
              .sort((left, right) => parseDate(left.dueDate).getTime() - parseDate(right.dueDate).getTime())
              .slice(0, 3)
              .map((finding) => ({
                id: finding.id,
                title: finding.title,
                subtitle: finding.owner,
                meta: `Due ${finding.dueDate}`,
                status:
                  finding.status === "In Remediation"
                    ? "In Progress"
                    : finding.status === "Ready for Review"
                      ? "Ready"
                      : "Pending",
              }))}
          />
        </SectionCard>
      )
    case "RevalidationTriggerWatchlist":
      return (
        <SectionCard
          title="Revalidation Trigger Watchlist"
          description="Models and workflows currently signaling the need for accelerated retest or escalation."
          contentClassName="p-6"
        >
          <ListBlock
            items={[
              ...data.clientScope.models
                .filter((model) => model.status === "Escalated" || daysUntil(model.nextReadoutDate) <= 21)
                .map((model) => ({
                  id: model.id,
                  title: model.name,
                  detail: isTraditionalValidationModel(model)
                    ? model.methodologyNote
                    : `${model.workflowPurpose} Grounding status: ${model.groundingStatus}.`,
                  meta: `Review date ${model.nextReadoutDate}`,
                  chip: model.status,
                  chipKind: "milestone" as const,
                })),
              ...data.clientScope.activity
                .filter((item) => item.type === "revalidation-triggered")
                .map((item) => ({
                  id: item.id,
                  title: item.title,
                  detail: item.detail,
                  meta: `${item.actor} • ${item.occurredAt}`,
                  chip: "Triggered",
                  chipKind: "risk" as const,
                })),
            ].slice(0, 4)}
            emptyMessage="No active revalidation triggers are visible for this engagement."
          />
        </SectionCard>
      )
    case "ValidationStatusWidget":
      return (
        <SectionCard
          title="Validation Status"
          description="Progress, ATL coverage, and BTL coverage across traditional models in the active client scope."
          contentClassName="p-6"
        >
          <div className="h-[250px]">
            {chartsReady && validationStatusSeries.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={validationStatusSeries} barGap={12}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#0f172a" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="atl" fill="#475569" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="btl" fill="#94a3b8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl bg-slate-50 text-sm text-slate-500">
                No traditional models in scope for this client.
              </div>
            )}
          </div>
        </SectionCard>
      )
    case "EvidencePackReadinessWidget":
      return (
        <SectionCard
          title="Evidence Pack Readiness"
          description="Report-pack readiness across traditional and GenAI validation items."
          contentClassName="p-6"
        >
          <ListBlock
            items={data.clientScope.reports.map((report) => ({
              id: report.modelId,
              title: report.title,
              detail: `${report.sections.filter((section) => section.status === "Ready").length} of ${report.sections.length} sections marked ready.`,
              meta: `Owner ${report.reportOwner}`,
              chip: report.sections.every((section) => section.status !== "Drafted") ? "Ready" : "In Progress",
              chipKind: "milestone" as const,
            }))}
            emptyMessage="No report packs are in scope for the selected client yet."
          />
        </SectionCard>
      )
    case "GovernanceActionsWidget":
      return (
        <SectionCard
          title="Governance Actions"
          description="Decision-ready actions for committee prep, remediation sequencing, and evidence completion."
          contentClassName="p-6"
        >
          <ListBlock
            items={[
              ...data.clientScope.findings
                .filter((finding) => finding.status !== "Closed")
                .slice(0, 2)
                .map((finding) => ({
                  id: finding.id,
                  title: `Resolve ${finding.id}`,
                  detail: finding.recommendation,
                  meta: `Owner ${finding.owner} • due ${finding.dueDate}`,
                  chip: finding.status,
                  chipKind: "finding" as const,
                })),
              ...data.activeModelMilestones
                .filter((milestone) => milestone.status !== "Complete")
                .slice(0, 1)
                .map((milestone) => ({
                  id: milestone.label,
                  title: milestone.label,
                  detail: `Advance ${data.activeModelName} toward the next governance checkpoint.`,
                  meta: `Due ${milestone.dueDate}`,
                  chip: milestone.status,
                  chipKind: "milestone" as const,
                })),
            ]}
            emptyMessage="No immediate governance actions are surfaced for the selected scope."
          />
        </SectionCard>
      )
    case "RiskHeatmapWidget":
      return (
        <SectionCard title="Risk Heatmap" description="Severity and likelihood concentration for the active engagement." contentClassName="p-6">
          <RiskHeatmap findings={data.clientScope.findings} />
        </SectionCard>
      )
    case "PerformanceTrendWidget":
      return (
        <SectionCard
          title="Performance Trend"
          description="Traditional model precision, recall, and ROC-AUC viewed across the current model set."
          contentClassName="p-6"
        >
          <div className="h-[250px]">
            {chartsReady && performanceSeries.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceSeries}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="precision" stroke="#0f172a" strokeWidth={2} />
                  <Line type="monotone" dataKey="recall" stroke="#475569" strokeWidth={2} />
                  <Line type="monotone" dataKey="rocAuc" stroke="#94a3b8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl bg-slate-50 text-sm text-slate-500">
                No traditional model trend data is in scope for this client.
              </div>
            )}
          </div>
        </SectionCard>
      )
    case "ScenarioFailureWidget":
      return (
        <SectionCard title="Scenario Failure" description="Most material failed or watch scenarios from the active test program." contentClassName="p-6">
          <ListBlock
            items={data.clientScope.scenarios
              .filter((scenario) => scenario.status !== "Pass")
              .slice(0, 4)
              .map((scenario) => ({
                id: scenario.id,
                title: scenario.name,
                detail: scenario.observations[0] ?? scenario.objective,
                meta: `${scenario.kind} • pass rate ${scenario.passRate}%`,
                chip: scenario.status,
                chipKind: "risk" as const,
              }))}
            emptyMessage="No failed or watch scenarios are currently surfaced."
          />
        </SectionCard>
      )
    case "ThresholdSensitivityWidget":
      return (
        <SectionCard title="Threshold Sensitivity" description="Current calibration or prompt controls from the active workspace." contentClassName="p-6">
          <ListBlock
            items={(getTestingWorkspace(data.activeModelId)?.thresholdControls ?? []).map((control) => ({
              id: control.label,
              title: control.label,
              detail: `Current value ${control.value}${control.unit} within range ${control.min}-${control.max}${control.unit}.`,
              meta: `Applied to ${data.activeModelName}`,
            }))}
            emptyMessage="No threshold or prompt controls are available for the active item."
          />
        </SectionCard>
      )
    case "RevalidationMilestonesWidget":
      return (
        <SectionCard title="Revalidation Milestones" description="Upcoming milestone checkpoints for near-term review dates." contentClassName="p-6">
          <AuditTimeline
            compact
            items={data.clientScope.models
              .flatMap((model) =>
                model.milestones.map((milestone) => ({
                  id: `${model.id}-${milestone.label}`,
                  title: milestone.label,
                  subtitle: model.name,
                  meta: milestone.dueDate,
                  status: milestoneToTimelineStatus(milestone.status),
                }))
              )
              .filter((item) => daysUntil(item.meta) <= 21)
              .slice(0, 4)}
          />
        </SectionCard>
      )
    case "AssignedModelsWidget":
      return (
        <SectionCard title="Assigned Validation Items" description="Owner-facing view across traditional models and GenAI workflows." contentClassName="p-6">
          <ListBlock
            items={data.clientScope.models.map((model) => ({
              id: model.id,
              title: model.name,
              detail: `${model.validationType} • ${model.summary}`,
              meta: `${model.owner} • readout ${model.nextReadoutDate}`,
              chip: model.status,
              chipKind: "model" as const,
            }))}
            emptyMessage="No validation items are assigned in the selected client scope."
          />
        </SectionCard>
      )
    case "DocumentationChecklistWidget":
      return (
        <SectionCard title="Documentation Checklist" description="Draft, under-review, and ready sections across current report packs." contentClassName="p-6">
          <ListBlock
            items={data.clientScope.reports.flatMap((report) =>
              report.sections
                .filter((section) => section.status !== "Ready")
                .map((section) => ({
                  id: `${report.modelId}-${section.id}`,
                  title: `${section.title}`,
                  detail: section.narrative,
                  meta: report.title,
                  chip: section.status,
                  chipKind: "milestone" as const,
                }))
            )}
            emptyMessage="All report sections are marked ready."
          />
        </SectionCard>
      )
    case "MilestonesWidget":
      return (
        <SectionCard title="Milestones" description="Upcoming approval and delivery checkpoints for the active client scope." contentClassName="p-6">
          <AuditTimeline
            compact
            items={data.clientScope.models
              .flatMap((model) =>
                model.milestones.map((milestone) => ({
                  id: `${model.id}-${milestone.label}`,
                  title: milestone.label,
                  subtitle: model.name,
                  meta: milestone.dueDate,
                  status: milestoneToTimelineStatus(milestone.status),
                }))
              )
              .slice(0, 4)}
          />
        </SectionCard>
      )
    case "OwnerResponseFindingsWidget":
      return (
        <SectionCard title="Owner Response Findings" description="Findings currently expecting owner response or closure support." contentClassName="p-6">
          <ListBlock
            items={data.clientScope.findings
              .filter((finding) => finding.status === "Open" || finding.status === "Ready for Review")
              .slice(0, 4)
              .map((finding) => ({
                id: finding.id,
                title: finding.title,
                detail: finding.recommendation,
                meta: `${finding.owner} • ${finding.validationType}`,
                chip: finding.status,
                chipKind: "finding" as const,
              }))}
            emptyMessage="No owner-response findings are currently visible."
          />
        </SectionCard>
      )
    case "NotesCommentsWidget":
      return (
        <SectionCard title="Notes & Comments" description="Recent governance commentary relevant to the selected client scope." contentClassName="p-6">
          <ListBlock
            items={data.clientScope.activity
              .filter((item) => item.type === "governance-comment-added" || item.type === "document-requested")
              .slice(0, 4)
              .map((item) => ({
                id: item.id,
                title: item.title,
                detail: item.detail,
                meta: `${item.actor} • ${item.occurredAt}`,
              }))}
            emptyMessage="No recent comments or document requests are visible."
          />
        </SectionCard>
      )
    case "TestingQueueWidget":
      return (
        <SectionCard title="Testing Queue" description="Next scenarios and workspaces requiring validator attention." contentClassName="p-6">
          <ListBlock
            items={data.clientScope.scenarios.slice(0, 4).map((scenario) => ({
              id: scenario.id,
              title: scenario.name,
              detail: scenario.objective,
              meta: scenario.kind,
              chip: scenario.status,
              chipKind: "test" as const,
            }))}
            emptyMessage="No testing scenarios are currently queued."
          />
        </SectionCard>
      )
    case "DataQualityExceptionsWidget":
      return (
        <SectionCard title="Data-Quality Exceptions" description="Current watch and fail outcomes across validation checks." contentClassName="p-6">
          <ListBlock
            items={data.clientScope.dataChecks
              .filter((check) => check.status !== "Pass")
              .map((check) => ({
                id: check.name,
                title: check.name,
                detail: check.result,
                meta: `${check.stream} • ${check.owner}`,
                chip: check.status,
                chipKind: "test" as const,
              }))}
            emptyMessage="No data-quality exceptions are currently visible."
          />
        </SectionCard>
      )
    case "EvidenceCompletenessWidget":
      return (
        <SectionCard title="Evidence Completeness" description="Fresh evidence artifacts linked to active findings and tests." contentClassName="p-6">
          <ListBlock
            items={getEvidenceForIds(
              Array.from(
                new Set([
                  ...data.clientScope.findings.flatMap((finding) => finding.evidenceIds),
                  ...data.clientScope.scenarios.flatMap((scenario) => scenario.evidenceIds),
                ])
              )
            )
              .slice(0, 4)
              .map((item) => ({
                id: item.id,
                title: item.title,
                detail: item.note,
                meta: `${item.owner} • updated ${item.updatedAt}`,
              }))}
            emptyMessage="No evidence artifacts are currently linked to the active scope."
          />
        </SectionCard>
      )
    case "ScenarioCoverageWidget":
      return (
        <SectionCard title="Scenario Coverage" description="Mix of scenario types currently represented in the active testing program." contentClassName="p-6">
          <div className="space-y-3">
            {scenarioCoverage.map((item) => (
              <div key={item.kind}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.kind}</span>
                  <span className="text-slate-500">{item.count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-slate-900" style={{ width: `${Math.max(8, item.count * 26)}px` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )
    case "ExternalSourceIntegrityWidget":
      return (
        <SectionCard title="External Source Integrity" description="Lineage and integrity checks most relevant to external or retrieved source dependency." contentClassName="p-6">
          <ListBlock
            items={data.clientScope.dataChecks
              .filter((check) => check.stream === "Integrity" || check.stream === "Lineage")
              .map((check) => ({
                id: check.name,
                title: check.name,
                detail: check.result,
                meta: check.owner,
                chip: check.status,
                chipKind: "test" as const,
              }))}
            emptyMessage="No source-integrity checks are currently visible."
          />
        </SectionCard>
      )
    case "CalibrationHistoryWidget":
      return (
        <SectionCard title="Calibration History" description="Recent threshold or prompt-control changes from the activity trail." contentClassName="p-6">
          <ListBlock
            items={data.clientScope.activity
              .filter((item) => item.type === "calibration-changed" || item.type === "configuration-updated")
              .slice(0, 4)
              .map((item) => ({
                id: item.id,
                title: item.title,
                detail: item.detail,
                meta: `${item.actor} • ${item.occurredAt}`,
              }))}
            emptyMessage="No calibration or configuration changes are currently visible."
          />
        </SectionCard>
      )
    case "ClientPortfolioWidget":
      return (
        <SectionCard title="Client Portfolio" description="Multi-client portfolio coverage in the consulting accelerator." contentClassName="p-6">
          <ListBlock
            items={clientEngagements.map((engagement) => ({
              id: engagement.id,
              title: engagement.clientName,
              detail: engagement.summary,
              meta: `${engagement.stage} • next committee ${engagement.nextCommitteeDate}`,
            }))}
            emptyMessage="No client engagements are currently configured."
          />
        </SectionCard>
      )
    case "ModelStatusOverviewWidget":
      return (
        <SectionCard title="Model Status Overview" description="Traditional-model and GenAI-workflow status across the full portfolio." contentClassName="p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {getValidationModels().map((model) => (
              <div key={model.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">{model.name}</p>
                  <StatusChip label={model.status} kind="model" />
                </div>
                <p className="mt-2 text-sm text-slate-600">{model.validationType}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      )
    case "DemoSystemActivityWidget":
      return (
        <SectionCard title="Demo System Activity" description="Portfolio-wide activity relevant to demo operation and setup." contentClassName="p-6">
          <ListBlock
            items={data.portfolioScope.activity.slice(0, 4).map((item) => ({
              id: item.id,
              title: item.title,
              detail: item.detail,
              meta: `${item.actor} • ${item.occurredAt}`,
            }))}
            emptyMessage="No portfolio activity is currently visible."
          />
        </SectionCard>
      )
    case "ConfigurationLogWidget":
      return (
        <SectionCard title="Configuration Log" description="Recent portfolio-level persona, prompt, and demo configuration changes." contentClassName="p-6">
          <ListBlock
            items={data.portfolioScope.activity
              .filter((item) => item.type === "configuration-updated" || item.type === "persona-changed" || item.type === "client-switched")
              .map((item) => ({
                id: item.id,
                title: item.title,
                detail: item.detail,
                meta: `${item.actor} • ${item.occurredAt}`,
              }))}
            emptyMessage="No configuration changes are currently visible."
          />
        </SectionCard>
      )
    case "SupportQueueWidget":
      return (
        <SectionCard title="Support Queue" description="Operational and support issues currently open in the demo trail." contentClassName="p-6">
          <ListBlock
            items={data.portfolioScope.activity
              .filter((item) => item.type === "support-issue-created" || item.type === "demo-health-warning")
              .map((item) => ({
                id: item.id,
                title: item.title,
                detail: item.detail,
                meta: `${item.actor} • ${item.occurredAt}`,
                chip: item.type === "demo-health-warning" ? "Watch" : "Open",
                chipKind: "risk" as const,
              }))}
            emptyMessage="No support issues are currently open."
          />
        </SectionCard>
      )
    case "AccessOverviewWidget":
      return (
        <SectionCard title="Access Overview" description="Portfolio context for roles, selected client, and visible operating scope." contentClassName="space-y-4 p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Current client</p>
              <p className="mt-2 text-sm font-medium text-slate-900">{data.activeClientName}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Current model</p>
              <p className="mt-2 text-sm font-medium text-slate-900">{data.activeModelName}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Persona options</p>
              <p className="mt-2 text-sm font-medium text-slate-900">5 configured personas</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Visible client scope</p>
              <p className="mt-2 text-sm font-medium text-slate-900">{data.clientScope.models.length} items</p>
            </div>
          </div>
        </SectionCard>
      )
  }
}

function DashboardHeaderActionsInner() {
  const { activeModel, personaId } = useDemoContext()
  const config = getDashboardConfig(personaId)

  return (
    <div className="flex flex-wrap gap-2">
      {config.ctas.map((cta, index) => (
        <Button
          key={cta.label}
          variant={index === 0 ? "default" : "outline"}
          asChild
          className={index === 0 ? "bg-slate-950 text-white hover:bg-slate-800" : ""}
        >
          <Link href={resolveHref(cta.href, activeModel.id)}>
            {cta.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ))}
    </div>
  )
}

export function DashboardHeaderActions() {
  return <DashboardHeaderActionsInner />
}

export function DashboardRenderer() {
  const { activeClient, activeModel, personaId } = useDemoContext()
  const chartsReady = useHydrated()
  const persona = getDemoPersona(personaId)
  const config = getDashboardConfig(personaId)

  const data = useMemo<DashboardData>(() => {
    const clientModels = getModelsForClient(activeClient.id)
    const portfolioModels = getValidationModels()
    const clientActivity = getRecentActivity(activeClient.id)
    const portfolioActivity = getRecentActivity()

    return {
      clientScope: getScope(clientModels, getFindingsForClient(activeClient.id), clientActivity),
      portfolioScope: getScope(portfolioModels, getFindings(), portfolioActivity),
      selectedActivity: getSelectedActivity(personaId === "admin" ? portfolioActivity : clientActivity, config.activityTypes),
      activeClientName: activeClient.clientName,
      activeModelName: activeModel.name,
      activeModelId: activeModel.id,
      activeModelMilestones: activeModel.milestones,
    }
  }, [activeClient.id, activeClient.clientName, activeModel.id, activeModel.milestones, activeModel.name, config.activityTypes, personaId])

  const metricCards = getMetricCards(data)

  if (!persona) {
    return null
  }

  return (
    <div className="space-y-8">
      <InsightBanner
        persona={persona}
        clientName={activeClient.clientName}
        eyebrow={config.insightBanner.eyebrow}
        title={config.insightBanner.title}
        description={config.insightBanner.description}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {config.kpis.map((kpiId) => (
          <MetricCard key={kpiId} {...metricCards[kpiId]} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {config.topWidgets.map((widgetId) => (
          <WidgetRenderer key={widgetId} widgetId={widgetId} data={data} chartsReady={chartsReady} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-4">
        {config.bottomWidgets.map((widgetId) => (
          <WidgetRenderer key={widgetId} widgetId={widgetId} data={data} chartsReady={chartsReady} />
        ))}
        <ActivityRail items={data.selectedActivity} emphasis={config.activityTypes} />
      </div>
    </div>
  )
}
