"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Filter, SlidersHorizontal } from "lucide-react"

import { DemoPrimaryAction, DemoShell } from "@/components/demo/demo-shell"
import { ModelInventoryTable } from "@/components/demo/model-inventory-table"
import { SectionCard } from "@/components/demo/section-card"
import { StatusChip } from "@/components/demo/status-chip"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDemoContext } from "@/components/demo/demo-context"
import { clientEngagements } from "@/lib/demo-data/clients"
import { getValidationModels, isGenAIWorkflow, isTraditionalValidationModel } from "@/lib/demo-data/models"
import type { ModelStage, RiskLevel, ValidationModel, ValidationType } from "@/lib/demo-data/types"

const allFilter = "all"

function PreviewDrawer({ model }: { model: ValidationModel }) {
  if (isTraditionalValidationModel(model)) {
    return (
      <div className="mt-6 space-y-5">
        <div className="flex flex-wrap gap-2">
          <StatusChip label={model.status} kind="model" />
          <StatusChip label={model.riskLevel} kind="risk" />
          <StatusChip label={model.stage} />
          <StatusChip label={model.validationType} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Metrics</p>
            <p className="mt-3 text-sm text-slate-700">
              Precision {Math.round(model.metrics.precision * 100)}% • Recall {Math.round(model.metrics.recall * 100)}% • ROC-AUC {model.metrics.rocAuc.toFixed(2)}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Coverage</p>
            <p className="mt-3 text-sm text-slate-700">
              ATL {model.atlCoverage}% • BTL {model.btlCoverage}% • Findings {model.openFindings}
            </p>
          </div>
        </div>
        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Human review</p>
            <p className="mt-2 text-sm text-slate-700">{model.humanReviewRequirement}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Grounding</p>
            <p className="mt-2 text-sm text-slate-700">{model.groundingStatus}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Methodology note</p>
          <p className="mt-3 text-sm leading-6 text-slate-700">{model.methodologyNote}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-5">
      <div className="flex flex-wrap gap-2">
        <StatusChip label={model.status} kind="model" />
        <StatusChip label={model.riskLevel} kind="risk" />
        <StatusChip label={model.stage} />
        <StatusChip label={model.validationType} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Grounding / citations</p>
          <p className="mt-3 text-sm text-slate-700">
            Coverage {model.retrievalGroundingCoverage}% • Citation accuracy {model.citationAccuracy}% • Status {model.groundingStatus}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Response quality</p>
          <p className="mt-3 text-sm text-slate-700">
            Factuality {model.responseQuality.factualityScore}% • Completeness {model.responseQuality.completenessScore}% • Usefulness {model.responseQuality.investigatorUsefulnessScore}%
          </p>
        </div>
      </div>
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Human review</p>
          <p className="mt-2 text-sm text-slate-700">{model.humanReviewRequirement}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Prompt pack</p>
          <p className="mt-2 text-sm text-slate-700">
            {model.promptPackVersion} • Updated {model.lastPromptSetUpdate}
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Workflow purpose</p>
        <p className="mt-3 text-sm leading-6 text-slate-700">{model.workflowPurpose}</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Human-in-the-loop role</p>
        <p className="mt-3 text-sm leading-6 text-slate-700">{model.humanInLoopRole}</p>
      </div>
    </div>
  )
}

function ModelsView() {
  const { activeClient, setSelectedModelId } = useDemoContext()
  const [clientFilter, setClientFilter] = useState<string>(activeClient.id)
  const [typeFilter, setTypeFilter] = useState<string>(allFilter)
  const [ownerFilter, setOwnerFilter] = useState<string>(allFilter)
  const [stageFilter, setStageFilter] = useState<string>(allFilter)
  const [riskFilter, setRiskFilter] = useState<string>(allFilter)
  const [previewModel, setPreviewModel] = useState<ValidationModel | null>(null)

  const inventory = useMemo(() => getValidationModels(), [])

  const filteredModels = useMemo(
    () =>
      inventory.filter((model) => {
        const clientMatch = clientFilter === allFilter || model.clientId === clientFilter
        const typeMatch = typeFilter === allFilter || model.validationType === typeFilter
        const ownerMatch = ownerFilter === allFilter || model.owner === ownerFilter
        const stageMatch = stageFilter === allFilter || model.stage === stageFilter
        const riskMatch = riskFilter === allFilter || model.riskLevel === riskFilter
        return clientMatch && typeMatch && ownerMatch && stageMatch && riskMatch
      }),
    [clientFilter, inventory, ownerFilter, riskFilter, stageFilter, typeFilter]
  )

  const owners = useMemo(() => Array.from(new Set(inventory.map((model) => model.owner))).sort(), [inventory])

  const summaryRibbon = [
    { label: "Items in scope", value: filteredModels.length.toString() },
    {
      label: "Traditional models",
      value: filteredModels.filter((model) => model.track === "Traditional AML Model").length.toString(),
    },
    {
      label: "GenAI workflows",
      value: filteredModels.filter((model) => model.track === "GenAI Workflow").length.toString(),
    },
    {
      label: "High / critical risk",
      value: filteredModels
        .filter((model) => model.riskLevel === "Critical" || model.riskLevel === "High")
        .length.toString(),
    },
  ]

  return (
    <>
      <div className="space-y-6">
        <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
          {summaryRibbon.map((item) => (
            <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">{item.value}</p>
            </div>
          ))}
        </div>

        <SectionCard
          title="Inventory Filters"
          description="The same shared inventory now supports both traditional AML models and GenAI-assisted AML workflows, while preserving future API seams."
          contentClassName="p-6"
        >
          <div className="grid gap-4 lg:grid-cols-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Client</p>
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All clients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={allFilter}>All clients</SelectItem>
                  {clientEngagements.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.clientName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Validation type</p>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All validation types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={allFilter}>All validation types</SelectItem>
                  {(
                    [
                      "Transaction Monitoring Model",
                      "Customer Risk Model",
                      "Sanctions Screening Model",
                      "GenAI Workflow",
                    ] as ValidationType[]
                  ).map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Owner</p>
              <Select value={ownerFilter} onValueChange={setOwnerFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All owners" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={allFilter}>All owners</SelectItem>
                  {owners.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Stage</p>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All stages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={allFilter}>All stages</SelectItem>
                  {(
                    [
                      "Planning",
                      "Testing",
                      "Findings Drafted",
                      "Report Assembly",
                      "Ready for Readout",
                    ] as ModelStage[]
                  ).map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Risk</p>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All risk levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={allFilter}>All risk levels</SelectItem>
                  {(["Moderate", "High", "Critical"] as RiskLevel[]).map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Save View
            </Button>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </SectionCard>

        <SectionCard
          title="Validation Inventory"
          description="One shared inventory surface for transaction monitoring, customer risk, sanctions screening, and GenAI workflow validation."
          contentClassName="p-0"
        >
          <ModelInventoryTable
            models={filteredModels}
            onPreview={(model) => {
              setSelectedModelId(model.id)
              setPreviewModel(model)
            }}
          />
        </SectionCard>
      </div>

      <Sheet open={Boolean(previewModel)} onOpenChange={(open) => !open && setPreviewModel(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
          {previewModel ? (
            <>
              <SheetHeader>
                <SheetTitle>{previewModel.name}</SheetTitle>
                <SheetDescription>{previewModel.summary}</SheetDescription>
              </SheetHeader>
              <PreviewDrawer model={previewModel} />
              <div className="mt-6 flex gap-3">
                <Button asChild className="flex-1">
                  <Link href={`/models/${previewModel.id}`}>Open workspace</Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href={`/reports/${previewModel.id}`}>Open audit pack</Link>
                </Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  )
}

export default function ModelsPage() {
  return (
    <DemoShell
      title="Validation Inventory"
      description="Reusable consulting inventory for both traditional AML models and GenAI-enabled AML workflows, with clear seams for future search, APIs, and portfolio operations."
      actions={
        <DemoPrimaryAction>
          <span>Prepare Pipeline Review</span>
        </DemoPrimaryAction>
      }
    >
      <ModelsView />
    </DemoShell>
  )
}
