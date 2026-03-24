"use client"

import { useEffect, useMemo, useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { DemoShell } from "@/components/demo/demo-shell"
import { EvidenceList } from "@/components/demo/evidence-list"
import { ScenarioSelector } from "@/components/demo/scenario-selector"
import { SectionCard } from "@/components/demo/section-card"
import { StatusChip } from "@/components/demo/status-chip"
import { useHydrated } from "@/components/demo/use-hydrated"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDemoContext } from "@/components/demo/demo-context"
import { getModelsForClient, isGenAIWorkflow } from "@/lib/demo-data/models"
import { getEvidenceForIds, getTestingWorkspace } from "@/lib/demo-data/testing"
import type { TestingWorkspace } from "@/lib/demo-data/types"

function TraditionalTestingPanel({ workspace }: { workspace: TestingWorkspace }) {
  const chartsReady = useHydrated()
  const scenarios = workspace.scenarios
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0]?.id ?? "")
  const [sliderValue, setSliderValue] = useState([workspace.thresholdControls[0]?.value ?? 0])

  const selectedScenario = scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0]
  const evidence = selectedScenario ? getEvidenceForIds(selectedScenario.evidenceIds) : []

  return (
    <div className="space-y-6">
      <SectionCard
        title="Traditional Validation Scenarios"
        description="Sensitivity, stress, adversarial, ATL, and BTL scenarios remain available for traditional AML model validation."
        contentClassName="space-y-5 p-6"
      >
        <ScenarioSelector scenarios={scenarios} selectedScenarioId={selectedScenarioId} onSelect={setSelectedScenarioId} />
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Threshold / Simulation Controls"
          description="Controls are mock-driven today and intentionally shaped like future API-backed test inputs."
          contentClassName="space-y-6 p-6"
        >
          {workspace.thresholdControls.map((control, index) => (
            <div key={control.label} className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-900">{control.label}</p>
                <p className="text-sm text-slate-600">
                  {index === 0 ? sliderValue[0] : control.value} {control.unit}
                </p>
              </div>
              <Slider
                value={index === 0 ? sliderValue : [control.value]}
                onValueChange={index === 0 ? setSliderValue : undefined}
                min={control.min}
                max={control.max}
                step={1}
              />
            </div>
          ))}
          {selectedScenario ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{selectedScenario.name}</p>
                  <p className="text-sm text-slate-600">{selectedScenario.hypothesis}</p>
                </div>
                <StatusChip label={selectedScenario.status} kind="test" />
              </div>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard
          title="Result Visuals"
          description="Direct Recharts usage keeps the demo clear, restrained, and presentation-ready."
          contentClassName="space-y-5 p-6"
        >
          <div className="h-[320px]">
            {chartsReady ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={workspace.resultSeries}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="label" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="baselinePrecision" stroke="#0f172a" strokeWidth={2} />
                  <Line type="monotone" dataKey="simulatedPrecision" stroke="#475569" strokeWidth={2} />
                  <Line type="monotone" dataKey="baselineRecall" stroke="#94a3b8" strokeWidth={2} />
                  <Line type="monotone" dataKey="simulatedRecall" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-2xl bg-slate-50" />
            )}
          </div>
          {selectedScenario ? (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Pass rate</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{selectedScenario.passRate}%</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Reproducibility</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{selectedScenario.reproducibilityScore}%</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Scenario type</p>
                <p className="mt-3 text-xl font-semibold text-slate-950">{selectedScenario.kind}</p>
              </div>
            </div>
          ) : null}
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Pass / Fail Summary"
          description="Executive-facing narrative of the selected scenario’s outcome."
          contentClassName="space-y-4 p-6"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium text-slate-900">{selectedScenario?.name}</p>
                <p className="text-sm text-slate-600">{selectedScenario?.objective}</p>
              </div>
              {selectedScenario ? <StatusChip label={selectedScenario.status} kind="test" /> : null}
            </div>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {selectedScenario?.observations.map((observation) => <li key={observation}>{observation}</li>)}
            </ul>
          </div>
        </SectionCard>

        <SectionCard
          title="Reproducibility & Evidence"
          description="Evidence cards show how demo interactions map cleanly to future repository-backed workpapers and exports."
          contentClassName="p-6"
        >
          <EvidenceList items={evidence} />
        </SectionCard>
      </div>
    </div>
  )
}

function GenAITestingPanel({ workspace }: { workspace: TestingWorkspace }) {
  const chartsReady = useHydrated()
  const scenarios = workspace.scenarios
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0]?.id ?? "")
  const [sliderValue, setSliderValue] = useState([workspace.thresholdControls[0]?.value ?? 0])

  const selectedScenario = scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0]
  const evidence = selectedScenario ? getEvidenceForIds(selectedScenario.evidenceIds) : []

  return (
    <div className="space-y-6">
      <SectionCard
        title="GenAI Validation Scenarios"
        description="Grounded Q&A, hallucination traps, missing-context checks, prompt injection, policy conflicts, unsafe recommendation tests, stale guidance, and adversarial investigator prompts."
        contentClassName="space-y-5 p-6"
      >
        <ScenarioSelector scenarios={scenarios} selectedScenarioId={selectedScenarioId} onSelect={setSelectedScenarioId} />
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Prompt / Control Panel"
          description="Mock controls mirror future orchestration inputs for retrieval, citation, review, and policy-boundary settings."
          contentClassName="space-y-6 p-6"
        >
          {workspace.thresholdControls.map((control, index) => (
            <div key={control.label} className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-900">{control.label}</p>
                <p className="text-sm text-slate-600">
                  {index === 0 ? sliderValue[0] : control.value} {control.unit}
                </p>
              </div>
              <Slider
                value={index === 0 ? sliderValue : [control.value]}
                onValueChange={index === 0 ? setSliderValue : undefined}
                min={control.min}
                max={control.max}
                step={1}
              />
            </div>
          ))}
          {selectedScenario ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{selectedScenario.name}</p>
                  <p className="text-sm text-slate-600">{selectedScenario.hypothesis}</p>
                </div>
                <StatusChip label={selectedScenario.status} kind="test" />
              </div>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard
          title="Response Quality Visuals"
          description="Shared testing lab surface now compares factuality, completeness, citation coverage, and safety for GenAI workflows."
          contentClassName="space-y-5 p-6"
        >
          <div className="h-[320px]">
            {chartsReady ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={workspace.resultSeries}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="label" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="factuality" stroke="#0f172a" strokeWidth={2} />
                  <Line type="monotone" dataKey="completeness" stroke="#475569" strokeWidth={2} />
                  <Line type="monotone" dataKey="citationCoverage" stroke="#94a3b8" strokeWidth={2} />
                  <Line type="monotone" dataKey="safety" stroke="#dc2626" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-2xl bg-slate-50" />
            )}
          </div>
          {selectedScenario ? (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Pass rate</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{selectedScenario.passRate}%</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Reproducibility</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{selectedScenario.reproducibilityScore}%</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Scenario type</p>
                <p className="mt-3 text-lg font-semibold text-slate-950">{selectedScenario.kind}</p>
              </div>
            </div>
          ) : null}
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard
          title="Scenario Output Comparison"
          description="Expected-versus-actual answer review with prompt, retrieved evidence, and validator notes."
          contentClassName="space-y-4 p-6"
        >
          {selectedScenario ? (
            <>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Prompt</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{selectedScenario.prompt}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Retrieved evidence</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                  {selectedScenario.retrievedEvidence?.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Model answer</p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{selectedScenario.modelAnswer}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Expected answer</p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{selectedScenario.expectedAnswer}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Validator notes</p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{selectedScenario.validatorNotes}</p>
              </div>
            </>
          ) : null}
        </SectionCard>

        <SectionCard
          title="Evidence & Reproducibility"
          description="Evidence cards preserve clean seams to future prompt repositories, evaluation stores, and export bundles."
          contentClassName="p-6"
        >
          <EvidenceList items={evidence} />
        </SectionCard>
      </div>
    </div>
  )
}

function TestingView() {
  const { activeClient, selectedModelId, setSelectedModelId } = useDemoContext()
  const clientModels = useMemo(() => getModelsForClient(activeClient.id), [activeClient.id])
  const modelWithWorkspace = useMemo(
    () => clientModels.find((model) => getTestingWorkspace(model.id)) ?? clientModels[0],
    [clientModels]
  )
  const currentModelId = getTestingWorkspace(selectedModelId) ? selectedModelId : modelWithWorkspace?.id ?? selectedModelId

  const selectedModel = clientModels.find((model) => model.id === currentModelId)
  const workspace = useMemo(() => getTestingWorkspace(currentModelId), [currentModelId])

  useEffect(() => {
    if (currentModelId !== selectedModelId && modelWithWorkspace) {
      setSelectedModelId(modelWithWorkspace.id)
    }
  }, [currentModelId, modelWithWorkspace, selectedModelId, setSelectedModelId])

  return (
    <div className="space-y-6">
      <SectionCard
        title="Validation Item Selector"
        description="One testing lab route now supports both traditional AML model validation and GenAI workflow validation."
        contentClassName="grid gap-4 p-6 md:grid-cols-2"
      >
        <div className="max-w-[360px]">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Validation item</p>
          <Select value={currentModelId} onValueChange={setSelectedModelId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose validation item" />
            </SelectTrigger>
            <SelectContent>
              {clientModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedModel ? (
          <div className="flex flex-wrap items-end gap-2">
            <StatusChip label={selectedModel.validationType} />
            <StatusChip label={selectedModel.riskLevel} kind="risk" />
            <StatusChip label={selectedModel.status} kind="model" />
          </div>
        ) : null}
      </SectionCard>

      {workspace && selectedModel ? (
        isGenAIWorkflow(selectedModel) ? (
          <GenAITestingPanel key={workspace.modelId} workspace={workspace} />
        ) : (
          <TraditionalTestingPanel key={workspace.modelId} workspace={workspace} />
        )
      ) : null}
    </div>
  )
}

export default function TestingPage() {
  return (
    <DemoShell
      title="Testing Lab"
      description="Scenario-driven testing surface for both traditional AML validations and GenAI workflow controls, with direct seams to future orchestration and evidence services."
      actions={<Button className="bg-slate-950 text-white hover:bg-slate-800">Run Scenario Simulation</Button>}
    >
      <TestingView />
    </DemoShell>
  )
}
