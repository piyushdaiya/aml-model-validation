"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { Download, FileArchive, LayoutTemplate } from "lucide-react"

import { DemoShell } from "@/components/demo/demo-shell"
import { ReportOutline } from "@/components/demo/report-outline"
import { SectionCard } from "@/components/demo/section-card"
import { StatusChip } from "@/components/demo/status-chip"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useDemoContext } from "@/components/demo/demo-context"
import { getValidationModel, isGenAIWorkflow } from "@/lib/demo-data/models"
import { getReportPack } from "@/lib/demo-data/reports"

function ReportPreviewView() {
  const params = useParams<{ modelId: string }>()
  const { setSelectedModelId } = useDemoContext()
  const model = useMemo(() => getValidationModel(params.modelId), [params.modelId])
  const report = useMemo(() => getReportPack(params.modelId), [params.modelId])
  const [activeSectionId, setActiveSectionId] = useState(report?.sections[0]?.id ?? "")

  useEffect(() => {
    if (model) {
      setSelectedModelId(model.id)
    }
  }, [model, setSelectedModelId])

  const activeSection = report?.sections.find((section) => section.id === activeSectionId) ?? report?.sections[0]

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_1fr_320px]">
      <SectionCard title="Outline" description="Structured report sections aligned to the shared validation methodology." contentClassName="p-4">
        {report ? (
          <ReportOutline sections={report.sections} activeSectionId={activeSectionId} onSelect={setActiveSectionId} />
        ) : null}
      </SectionCard>

      <SectionCard
        title={report?.title ?? "Report not found"}
        description={model?.summary ?? "No report is available for this validation item."}
        contentClassName="space-y-6 p-6"
      >
        {activeSection ? (
          <>
            <div className="flex flex-wrap gap-2">
              <StatusChip label={activeSection.status} kind="milestone" />
              {model ? <StatusChip label={model.validationType} /> : null}
              {model ? <StatusChip label={model.status} kind="model" /> : null}
              {model ? <StatusChip label={model.riskLevel} kind="risk" /> : null}
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{activeSection.title}</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{report?.title}</h3>
              <p className="mt-6 text-base leading-8 text-slate-700">{activeSection.narrative}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {model && isGenAIWorkflow(model) ? (
                  <>
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">GenAI workflow validation</p>
                      <p className="mt-3 text-sm leading-6 text-slate-700">
                        Intended use: {model.workflowPurpose}
                        <br />
                        Human review: {model.humanReviewRequirement}
                        <br />
                        Grounding architecture: {model.groundingStatus} at {model.retrievalGroundingCoverage}% coverage.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Deployment recommendation</p>
                      <p className="mt-3 text-sm leading-6 text-slate-700">
                        {model.deploymentRecommendation}
                        <br />
                        Residual risks: {model.residualRisks.join("; ")}.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Validation stance</p>
                      <p className="mt-3 text-sm leading-6 text-slate-700">
                        The portal presents current observations in a way that is immediately useful for steering committees, internal audit, and future regulator dialogue.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Future product seam</p>
                      <p className="mt-3 text-sm leading-6 text-slate-700">
                        In the full application, this panel can consume generated narratives, evidence references, approvals, and version history from real APIs.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : null}
      </SectionCard>

      <SectionCard
        title="Export / Config"
        description="Current demo controls show the path to configurable report generation."
        contentClassName="space-y-5 p-6"
      >
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Report owner</p>
          <p className="mt-3 text-sm font-medium text-slate-900">{report?.reportOwner}</p>
        </div>
        {model && isGenAIWorkflow(model) ? (
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Workflow controls</p>
              <p className="mt-2 text-sm text-slate-700">
                Prompt pack {model.promptPackVersion} • Auditability {model.auditability}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Human review controls</p>
              <p className="mt-2 text-sm text-slate-700">{model.humanInLoopRole}</p>
            </div>
          </div>
        ) : null}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Export formats</p>
          <div className="mt-4 space-y-3">
            {report?.exportFormats.map((format) => (
              <label key={format} className="flex items-center gap-3 text-sm text-slate-700">
                <Checkbox defaultChecked />
                {format}
              </label>
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          <Button className="justify-start bg-slate-950 text-white hover:bg-slate-800">
            <LayoutTemplate className="mr-2 h-4 w-4" />
            {model && isGenAIWorkflow(model) ? "Render validation brief" : "Render committee deck"}
          </Button>
          <Button variant="outline" className="justify-start">
            <FileArchive className="mr-2 h-4 w-4" />
            Bundle evidence index
          </Button>
        </div>
      </SectionCard>
    </div>
  )
}

export default function ReportPreviewPage() {
  return (
    <DemoShell
      title="Report Preview / Audit Pack"
      description="Shared reporting surface for traditional AML models and GenAI workflows, including dedicated workflow-validation sections where AI controls matter."
      actions={
        <Button className="bg-slate-950 text-white hover:bg-slate-800">
          <Download className="mr-2 h-4 w-4" />
          Export Pack
        </Button>
      }
    >
      <ReportPreviewView />
    </DemoShell>
  )
}
