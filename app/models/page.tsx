"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Filter, SlidersHorizontal } from "lucide-react"

import { DemoPrimaryAction, DemoShell } from "@/components/demo/demo-shell"
import { ModelInventoryTable } from "@/components/demo/model-inventory-table"
import { SectionCard } from "@/components/demo/section-card"
import { StatusChip } from "@/components/demo/status-chip"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDemoContext } from "@/components/demo/demo-context"
import { getModelsForClient } from "@/lib/demo-data/models"
import type { ModelStage, ModelType, RiskLevel, ValidationModel } from "@/lib/demo-data/types"

const allFilter = "all"

function ModelsView() {
  const { activeClient, setSelectedModelId } = useDemoContext()
  const [typeFilter, setTypeFilter] = useState<string>(allFilter)
  const [stageFilter, setStageFilter] = useState<string>(allFilter)
  const [riskFilter, setRiskFilter] = useState<string>(allFilter)
  const [previewModel, setPreviewModel] = useState<ValidationModel | null>(null)

  const models = useMemo(() => getModelsForClient(activeClient.id), [activeClient.id])

  const filteredModels = models.filter((model) => {
    const typeMatch = typeFilter === allFilter || model.type === typeFilter
    const stageMatch = stageFilter === allFilter || model.stage === stageFilter
    const riskMatch = riskFilter === allFilter || model.riskLevel === riskFilter
    return typeMatch && stageMatch && riskMatch
  })

  const summaryRibbon = [
    { label: "Models in scope", value: models.length.toString() },
    { label: "Critical / high risk", value: models.filter((model) => model.riskLevel === "Critical" || model.riskLevel === "High").length.toString() },
    { label: "Open findings", value: models.reduce((sum, model) => sum + model.openFindings, 0).toString() },
    { label: "Average progress", value: `${Math.round(models.reduce((sum, model) => sum + model.progressPercent, 0) / models.length)}%` },
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
          description="Mock-driven controls preserve future API seams for search, ownership, lifecycle, and risk-based views."
          contentClassName="p-6"
        >
          <div className="grid gap-4 lg:grid-cols-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Model type</p>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All model types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={allFilter}>All model types</SelectItem>
                  {["Transaction Monitoring", "Customer Risk", "Sanctions & Watchlist"].map((value) => (
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
                  {(["Planning", "Testing", "Findings Drafted", "Report Assembly", "Ready for Readout"] as ModelStage[]).map((value) => (
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
            <div className="flex items-end gap-3">
              <Button variant="outline" className="flex-1">
                <Filter className="mr-2 h-4 w-4" />
                Save View
              </Button>
              <Button variant="outline" className="flex-1">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Model Inventory Table"
          description="Tables remain the clearest presentation surface for consulting leadership and client-facing walkthroughs."
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
              <div className="mt-6 space-y-5">
                <div className="flex flex-wrap gap-2">
                  <StatusChip label={previewModel.status} kind="model" />
                  <StatusChip label={previewModel.riskLevel} kind="risk" />
                  <StatusChip label={previewModel.stage} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Metrics</p>
                    <p className="mt-3 text-sm text-slate-700">
                      Precision {Math.round(previewModel.metrics.precision * 100)}% • Recall {Math.round(previewModel.metrics.recall * 100)}% • ROC-AUC {previewModel.metrics.rocAuc.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Coverage</p>
                    <p className="mt-3 text-sm text-slate-700">
                      ATL {previewModel.atlCoverage}% • BTL {previewModel.btlCoverage}% • Findings {previewModel.openFindings}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Methodology note</p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{previewModel.methodologyNote}</p>
                </div>
                <div className="flex gap-3">
                  <Button asChild className="flex-1">
                    <Link href={`/models/${previewModel.id}`}>Open workspace</Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <Link href={`/reports/${previewModel.id}`}>Open audit pack</Link>
                  </Button>
                </div>
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
      title="Model Inventory"
      description="Reusable inventory view for consulting teams to prioritize scope, stage fieldwork, and show leadership where each validation sits across the client portfolio."
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
