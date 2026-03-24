"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { BookOpenText, ClipboardCheck, FilePenLine, NotebookPen } from "lucide-react"

import { AuditTimeline } from "@/components/demo/audit-timeline"
import { DemoShell } from "@/components/demo/demo-shell"
import { EvidenceList } from "@/components/demo/evidence-list"
import { FindingsTable } from "@/components/demo/findings-table"
import { SectionCard } from "@/components/demo/section-card"
import { StatusChip } from "@/components/demo/status-chip"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useDemoContext } from "@/components/demo/demo-context"
import { getFindingsForModel } from "@/lib/demo-data/findings"
import { getValidationModel } from "@/lib/demo-data/models"
import { getEvidenceForIds, getTestingWorkspace } from "@/lib/demo-data/testing"

function ModelDetailView() {
  const params = useParams<{ modelId: string }>()
  const { setSelectedModelId } = useDemoContext()
  const [notes, setNotes] = useState(
    "Steering-committee angle: emphasize reusable methodology, evidence traceability, and the path to a scaled product workflow."
  )

  const model = useMemo(() => getValidationModel(params.modelId), [params.modelId])
  const findings = useMemo(() => getFindingsForModel(params.modelId), [params.modelId])
  const workspace = useMemo(() => getTestingWorkspace(params.modelId), [params.modelId])
  const evidence = useMemo(
    () => getEvidenceForIds(Array.from(new Set([...(findings[0]?.evidenceIds ?? []), ...(workspace?.scenarios[0]?.evidenceIds ?? [])]))),
    [findings, workspace]
  )

  useEffect(() => {
    if (model) {
      setSelectedModelId(model.id)
    }
  }, [model, setSelectedModelId])

  if (!model) {
    return (
      <SectionCard title="Model not found" description="The selected demo model does not exist in the current mock inventory." contentClassName="p-6">
        <Button asChild>
          <Link href="/models">Return to model inventory</Link>
        </Button>
      </SectionCard>
    )
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="sticky top-4 z-10 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <StatusChip label={model.status} kind="model" />
                  <StatusChip label={model.riskLevel} kind="risk" />
                  <StatusChip label={model.stage} />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-950">{model.name}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{model.summary}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Progress</p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">{model.progressPercent}%</p>
                  <Progress value={model.progressPercent} className="mt-3 h-2" />
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">ATL / BTL</p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">
                    {model.atlCoverage}% / {model.btlCoverage}%
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Open findings</p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">{model.openFindings}</p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-5">
            <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
              {["Overview", "Data Validation", "Performance", "Testing", "Findings", "Audit Trail"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase().replace(/\s+/g, "-")}
                  className="rounded-full border border-slate-200 bg-white px-4 data-[state=active]:border-slate-900 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview">
              <SectionCard title="Validation Overview" description="High-level methodology framing for leadership, partner review, and client stakeholders." contentClassName="grid gap-4 p-6 lg:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Methodology note</p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{model.methodologyNote}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Metrics snapshot</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-slate-500">Precision</p>
                      <p className="text-lg font-semibold text-slate-950">{Math.round(model.metrics.precision * 100)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Recall</p>
                      <p className="text-lg font-semibold text-slate-950">{Math.round(model.metrics.recall * 100)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">ROC-AUC</p>
                      <p className="text-lg font-semibold text-slate-950">{model.metrics.rocAuc.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">False positive rate</p>
                      <p className="text-lg font-semibold text-slate-950">{Math.round(model.metrics.falsePositiveRate * 100)}%</p>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="data-validation">
              <SectionCard title="Data Validation" description="Believable data quality and lineage results prepared for future API-backed checks." contentClassName="space-y-4 p-6">
                {workspace?.dataChecks.map((check) => (
                  <div key={check.name} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{check.name}</p>
                        <p className="text-sm text-slate-600">{check.stream} • {check.owner}</p>
                      </div>
                      <StatusChip label={check.status} kind="test" />
                    </div>
                    <p className="mt-3 text-sm text-slate-700">{check.result}</p>
                  </div>
                ))}
              </SectionCard>
            </TabsContent>

            <TabsContent value="performance">
              <SectionCard title="Performance Framing" description="Current production metrics and validation perspective for leadership messaging." contentClassName="grid gap-4 p-6 md:grid-cols-4">
                {[
                  ["Precision", `${Math.round(model.metrics.precision * 100)}%`],
                  ["Recall", `${Math.round(model.metrics.recall * 100)}%`],
                  ["ROC-AUC", model.metrics.rocAuc.toFixed(2)],
                  ["False positive rate", `${Math.round(model.metrics.falsePositiveRate * 100)}%`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
                  </div>
                ))}
              </SectionCard>
            </TabsContent>

            <TabsContent value="testing">
              <SectionCard title="Testing Summary" description="Scenario-driven evidence aligned to above-the-line and below-the-line validation approaches." contentClassName="space-y-4 p-6">
                {workspace?.scenarios.map((scenario) => (
                  <div key={scenario.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{scenario.name}</p>
                        <p className="text-sm text-slate-600">{scenario.kind} • {scenario.objective}</p>
                      </div>
                      <StatusChip label={scenario.status} kind="test" />
                    </div>
                    <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
                      {scenario.observations.map((observation) => (
                        <li key={observation}>{observation}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </SectionCard>
            </TabsContent>

            <TabsContent value="findings">
              <SectionCard title="Findings Register" description="Open issues and remediation framing for partner review and client action plans." contentClassName="p-0">
                <FindingsTable findings={findings} />
              </SectionCard>
            </TabsContent>

            <TabsContent value="audit-trail">
              <SectionCard title="Audit Trail" description="Milestones and evidence packaged in a regulator- and audit-friendly format." contentClassName="grid gap-6 p-6 lg:grid-cols-[0.9fr_1.1fr]">
                <AuditTimeline
                  items={model.milestones.map((milestone) => ({
                    id: milestone.label,
                    title: milestone.label,
                    subtitle: model.name,
                    meta: milestone.dueDate,
                    status: milestone.status,
                  }))}
                />
                <EvidenceList items={evidence} />
              </SectionCard>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-6">
          <SectionCard title="Notes & Actions" description="Consulting-side workspace for steering messages and next actions." contentClassName="space-y-4 p-6">
            <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="min-h-[180px]" />
            <div className="grid gap-3">
              <Button className="justify-start bg-slate-950 text-white hover:bg-slate-800">
                <FilePenLine className="mr-2 h-4 w-4" />
                Draft committee narrative
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/testing">
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Open testing lab
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/findings">
                  <NotebookPen className="mr-2 h-4 w-4" />
                  Review remediation board
                </Link>
              </Button>
            </div>
          </SectionCard>
        </aside>
      </div>
  )
}

export default function ModelDetailPage() {
  const params = useParams<{ modelId: string }>()
  const model = getValidationModel(params.modelId)

  return (
    <DemoShell
      title="Model Detail / Validation Workspace"
      description="A consulting-led validation workspace that brings methodology, testing evidence, findings, and audit trail into one client-ready surface."
      actions={
        model ? (
          <Button className="bg-slate-950 text-white hover:bg-slate-800" asChild>
            <Link href={`/reports/${model.id}`}>
              Open Audit Pack
              <BookOpenText className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : null
      }
    >
      <ModelDetailView />
    </DemoShell>
  )
}
