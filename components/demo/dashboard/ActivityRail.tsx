import { BellRing, Clock3 } from "lucide-react"

import { StatusChip } from "@/components/demo/status-chip"
import { SectionCard } from "@/components/demo/section-card"
import type { ActivityItem, ActivityType } from "@/lib/demo-data/types"

const activityTypeLabels: Record<ActivityType, string> = {
  "report-generated": "Report generated",
  "approval-completed": "Approval completed",
  "remediation-overdue": "Remediation overdue",
  "revalidation-triggered": "Revalidation triggered",
  "audit-note-added": "Audit note added",
  "severe-finding-created": "Severe finding created",
  "stress-test-failed": "Stress test failed",
  "adversarial-scenario-flagged": "Adversarial scenario flagged",
  "benchmark-variance-detected": "Benchmark variance detected",
  "document-requested": "Document requested",
  "milestone-due": "Milestone due",
  "action-assigned": "Action assigned",
  "governance-comment-added": "Governance comment added",
  "test-run-completed": "Test run completed",
  "evidence-missing": "Evidence missing",
  "data-quality-issue-detected": "Data-quality issue detected",
  "external-data-source-failed": "External data source failed",
  "calibration-changed": "Calibration changed",
  "persona-changed": "Persona changed",
  "client-switched": "Client switched",
  "configuration-updated": "Configuration updated",
  "support-issue-created": "Support issue created",
  "demo-health-warning": "Demo health warning",
}

function getStatusLabel(activity: ActivityItem) {
  if (activity.category === "Reporting") return "Ready"
  if (activity.category === "Testing") return "In Progress"
  return "Pending"
}

export function ActivityRail({
  items,
  emphasis,
}: {
  items: ActivityItem[]
  emphasis: ActivityType[]
}) {
  return (
    <SectionCard
      title="Recent Activity"
      description="Persona-prioritized activity feed from the shared reporting and audit trail."
      contentClassName="space-y-4 p-6"
    >
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
          <BellRing className="h-4 w-4" />
          Emphasis for this persona
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {emphasis.map((type) => (
            <StatusChip key={type} label={activityTypeLabels[type]} />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-slate-900">{item.title}</p>
              <StatusChip label={getStatusLabel(item)} kind="milestone" />
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              <span>{activityTypeLabels[item.type]}</span>
              <span className="flex items-center gap-1">
                <Clock3 className="h-3.5 w-3.5" />
                {item.actor} • {item.occurredAt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
