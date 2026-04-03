"use client"

import { useMemo, useState } from "react"

import { DemoShell } from "@/components/demo/demo-shell"
import { FindingsTable } from "@/components/demo/findings-table"
import { MetricCard } from "@/components/demo/metric-card"
import { RiskHeatmap } from "@/components/demo/risk-heatmap"
import { SectionCard } from "@/components/demo/section-card"
import { StatusChip } from "@/components/demo/status-chip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDemoContext } from "@/components/demo/demo-context"
import { getFindingsByTrack, getFindingsForClient, getFindingSeverityCounts } from "@/lib/demo-data/findings"
import type { ValidationTrack } from "@/lib/demo-data/types"

function FindingsView() {
  const { activeClient } = useDemoContext()
  const clientFindings = useMemo(() => getFindingsForClient(activeClient.id), [activeClient.id])
  const [trackFilter, setTrackFilter] = useState<ValidationTrack | "Combined">("Combined")

  const findings = useMemo(() => getFindingsByTrack(clientFindings, trackFilter), [clientFindings, trackFilter])
  const severityCounts = getFindingSeverityCounts(findings)
  const [selectedFindingId, setSelectedFindingId] = useState(findings[0]?.id)

  const selectedFinding = findings.find((finding) => finding.id === selectedFindingId) ?? findings[0]

  const remediationColumns = [
    {
      label: "Open",
      items: findings.filter((finding) => finding.status === "Open"),
    },
    {
      label: "In Remediation",
      items: findings.filter((finding) => finding.status === "In Remediation"),
    },
    {
      label: "Ready for Review",
      items: findings.filter((finding) => finding.status === "Ready for Review"),
    },
  ]

  return (
    <div className="space-y-6">
      <SectionCard
        title="Findings Scope"
        description="Shared findings page for traditional model findings, GenAI workflow findings, or a combined engagement view."
        contentClassName="p-6"
      >
        <div className="max-w-[320px]">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Validation track</p>
          <Select value={trackFilter} onValueChange={(value) => setTrackFilter(value as ValidationTrack | "Combined")}>
            <SelectTrigger>
              <SelectValue placeholder="Combined view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Combined">Combined view</SelectItem>
              <SelectItem value="Traditional AML Model">Traditional model findings</SelectItem>
              <SelectItem value="GenAI Workflow">GenAI workflow findings</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SectionCard>

      <div className="grid gap-4 xl:grid-cols-4">
        <MetricCard title="Critical findings" value={severityCounts.Critical.toString()} subtitle="Immediate readout pressure on leadership and client owners." accent="rose" />
        <MetricCard title="High findings" value={severityCounts.High.toString()} subtitle="Material remediation requiring documented management response." accent="amber" />
        <MetricCard
          title="GenAI findings"
          value={findings.filter((finding) => finding.track === "GenAI Workflow").length.toString()}
          subtitle="Workflow-boundary, grounding, and control issues currently in the register."
          accent="blue"
        />
        <MetricCard
          title="Closed"
          value={findings.filter((finding) => finding.status === "Closed").length.toString()}
          subtitle="Closed items remain visible for regulator and audit traceability."
          accent="emerald"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Severity / Likelihood Heatmap"
          description="Leadership-ready framing of the current findings profile across the selected validation scope."
          contentClassName="p-6"
        >
          <RiskHeatmap findings={findings} />
        </SectionCard>

        <SectionCard
          title="Finding Detail"
          description="Selected issue with recommendation, owner, and due date."
          contentClassName="space-y-4 p-6"
        >
          {selectedFinding ? (
            <>
              <div className="flex flex-wrap gap-2">
                <StatusChip label={selectedFinding.severity} kind="risk" />
                <StatusChip label={selectedFinding.status} kind="finding" />
                <StatusChip label={selectedFinding.stream} />
                <StatusChip label={selectedFinding.track} />
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-950">{selectedFinding.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{selectedFinding.summary}</p>
              </div>
              <div className="grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Owner</p>
                  <p className="mt-2 text-sm text-slate-900">{selectedFinding.owner}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Due date</p>
                  <p className="mt-2 text-sm text-slate-900">{selectedFinding.dueDate}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Validation type</p>
                  <p className="mt-2 text-sm text-slate-900">{selectedFinding.validationType}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Finding type</p>
                  <p className="mt-2 text-sm text-slate-900">{selectedFinding.findingType ?? "Traditional validation issue"}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Recommendation</p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{selectedFinding.recommendation}</p>
              </div>
            </>
          ) : null}
        </SectionCard>
      </div>

      <SectionCard
        title="Findings Register"
        description="Table-first view for decision-makers, reviewers, and client working sessions."
        contentClassName="p-0"
      >
        <FindingsTable
          findings={findings}
          selectedFindingId={selectedFinding?.id}
          onSelect={(finding) => setSelectedFindingId(finding.id)}
        />
      </SectionCard>

      <SectionCard
        title="Remediation Board"
        description="Board-style sequencing for traditional-model and GenAI-workflow remediation under one shared reporting portal."
        contentClassName="grid gap-4 p-6 xl:grid-cols-3"
      >
        {remediationColumns.map((column) => (
          <div key={column.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-medium text-slate-900">{column.label}</p>
              <StatusChip label={`${column.items.length}`} />
            </div>
            <div className="space-y-3">
              {column.items.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.owner}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <StatusChip label={item.track} />
                    <StatusChip label={item.severity} kind="risk" />
                    <StatusChip label={item.dueDate} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </SectionCard>
    </div>
  )
}

export default function FindingsPage() {
  return (
    <DemoShell
      title="Findings & Remediation"
      description="A consulting-quality findings surface covering both traditional AML models and GenAI workflows, with shared severity, remediation, and audit-friendly closure framing."
    >
      <FindingsView />
    </DemoShell>
  )
}
