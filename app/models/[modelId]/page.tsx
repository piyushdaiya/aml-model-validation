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
import { getValidationModel, isGenAIWorkflow, isTraditionalValidationModel } from "@/lib/demo-data/models"
import { getEvidenceForIds, getTestingWorkspace } from "@/lib/demo-data/testing"

function TraditionalWorkspaceContent({ modelId }: { modelId: string }) {
  const model = getValidationModel(modelId)
  const findings = getFindingsForModel(modelId)
  const workspace = getTestingWorkspace(modelId)
  const evidence = getEvidenceForIds(
    Array.from(new Set([...findings.flatMap((finding) => finding.evidenceIds), ...(workspace?.scenarios[0]?.evidenceIds ?? [])]))
  )

  if (!model || !isTraditionalValidationModel(model)) {
    return null
  }

  return (
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
        <SectionCard
          title="Validation Overview"
          description="High-level methodology framing for leadership, partner review, and client stakeholders."
          contentClassName="grid gap-4 p-6 lg:grid-cols-2"
        >
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
        <SectionCard
          title="Data Validation"
          description="Believable data quality and lineage results prepared for future API-backed checks."
          contentClassName="space-y-4 p-6"
        >
          {workspace?.dataChecks.map((check) => (
            <div key={check.name} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{check.name}</p>
                  <p className="text-sm text-slate-600">
                    {check.stream} • {check.owner}
                  </p>
                </div>
                <StatusChip label={check.status} kind="test" />
              </div>
              <p className="mt-3 text-sm text-slate-700">{check.result}</p>
            </div>
          ))}
        </SectionCard>
      </TabsContent>

      <TabsContent value="performance">
        <SectionCard
          title="Performance Framing"
          description="Current production metrics and validation perspective for leadership messaging."
          contentClassName="grid gap-4 p-6 md:grid-cols-4"
        >
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
        <SectionCard
          title="Testing Summary"
          description="Scenario-driven evidence aligned to above-the-line and below-the-line validation approaches."
          contentClassName="space-y-4 p-6"
        >
          {workspace?.scenarios.map((scenario) => (
            <div key={scenario.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{scenario.name}</p>
                  <p className="text-sm text-slate-600">
                    {scenario.kind} • {scenario.objective}
                  </p>
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
        <SectionCard
          title="Findings Register"
          description="Open issues and remediation framing for partner review and client action plans."
          contentClassName="p-0"
        >
          <FindingsTable findings={findings} />
        </SectionCard>
      </TabsContent>

      <TabsContent value="audit-trail">
        <SectionCard
          title="Audit Trail"
          description="Milestones and evidence packaged in a regulator- and audit-friendly format."
          contentClassName="grid gap-6 p-6 lg:grid-cols-[0.9fr_1.1fr]"
        >
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
  )
}

function GenAIWorkspaceContent({ modelId }: { modelId: string }) {
  const model = getValidationModel(modelId)
  const findings = getFindingsForModel(modelId)
  const workspace = getTestingWorkspace(modelId)
  const evidence = getEvidenceForIds(
    Array.from(new Set([...findings.flatMap((finding) => finding.evidenceIds), ...(workspace?.scenarios.flatMap((scenario) => scenario.evidenceIds) ?? [])]))
  )

  if (!model || !isGenAIWorkflow(model)) {
    return null
  }

  return (
    <Tabs defaultValue="overview" className="space-y-5">
      <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
        {["Overview", "Data & Grounding", "Response Quality", "Safety & Controls", "Testing", "Findings", "Audit Trail"].map(
          (tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase().replace(/[&]/g, "").replace(/\s+/g, "-")}
              className="rounded-full border border-slate-200 bg-white px-4 data-[state=active]:border-slate-900 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
            >
              {tab}
            </TabsTrigger>
          )
        )}
      </TabsList>

      <TabsContent value="overview">
        <SectionCard
          title="GenAI Workflow Overview"
          description="Approved purpose, boundaries, model/provider context, and prompt-version controls for this workflow."
          contentClassName="grid gap-4 p-6 xl:grid-cols-2"
        >
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Workflow purpose</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{model.workflowPurpose}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Human-in-the-loop role</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{model.humanInLoopRole}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Provider / model</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {model.providerModelName}
                <br />
                {model.providerInfo}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Approved usage boundaries</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                {model.approvedUsageBoundaries.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Prohibited actions</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                {model.prohibitedActions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Prompt / version history</p>
              <div className="mt-3 space-y-3">
                {model.promptVersionHistory.map((entry) => (
                  <div key={entry.version} className="rounded-xl bg-slate-50 p-3">
                    <p className="font-medium text-slate-900">{entry.version}</p>
                    <p className="mt-1 text-sm text-slate-600">{entry.changeSummary}</p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      {entry.updatedAt} • {entry.approvedBy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </TabsContent>

      <TabsContent value="data-grounding">
        <SectionCard
          title="Data & Grounding"
          description="Approved sources, retrieval coverage, freshness, citation quality, and access-control assumptions."
          contentClassName="grid gap-4 p-6 xl:grid-cols-2"
        >
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Approved data sources</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                {model.approvedDataSources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Grounding coverage</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{model.retrievalGroundingCoverage}%</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Grounding status</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{model.groundingStatus}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Source freshness</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{model.sourceFreshness}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Citation / grounding quality</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{model.citationGroundingQuality}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Access-control assumptions</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                {model.accessControlAssumptions.map((assumption) => (
                  <li key={assumption}>{assumption}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Data & grounding checks</p>
              <div className="mt-3 space-y-3">
                {workspace?.dataChecks.map((check) => (
                  <div key={check.name} className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-slate-900">{check.name}</p>
                      <StatusChip label={check.status} kind="test" />
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{check.result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </TabsContent>

      <TabsContent value="response-quality">
        <SectionCard
          title="Response Quality"
          description="Response quality framing for factuality, completeness, citation coverage, consistency, and investigator usefulness."
          contentClassName="grid gap-4 p-6 md:grid-cols-5"
        >
          {[
            ["Factuality", `${model.responseQuality.factualityScore}%`],
            ["Completeness", `${model.responseQuality.completenessScore}%`],
            ["Citation coverage", `${model.responseQuality.citationCoverage}%`],
            ["Consistency", `${model.responseQuality.consistencyScore}%`],
            ["Investigator usefulness", `${model.responseQuality.investigatorUsefulnessScore}%`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
            </div>
          ))}
        </SectionCard>
      </TabsContent>

      <TabsContent value="safety-controls">
        <SectionCard
          title="Safety & Controls"
          description="Hallucination, refusal quality, escalation behavior, sensitive-data handling, and policy-boundary compliance."
          contentClassName="grid gap-4 p-6 xl:grid-cols-2"
        >
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Hallucination rate</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">
                {Math.round(model.safetyControls.hallucinationRate * 100)}%
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Refusal quality</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{model.safetyControls.refusalQuality}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Escalation behavior</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{model.safetyControls.escalationBehavior}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Sensitive-data leakage checks</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{model.safetyControls.sensitiveDataLeakageChecks}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Policy-boundary compliance</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{model.safetyControls.policyBoundaryCompliance}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Policy adherence</p>
                <p className="mt-3 text-xl font-semibold text-slate-950">{model.policyAdherence}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Privacy handling</p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{model.privacyHandling}</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </TabsContent>

      <TabsContent value="testing">
        <SectionCard
          title="Testing"
          description="Prompt scenarios with expected-versus-actual outputs, retrieved evidence, and validator notes."
          contentClassName="space-y-4 p-6"
        >
          {workspace?.scenarios.map((scenario) => (
            <div key={scenario.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{scenario.name}</p>
                  <p className="text-sm text-slate-600">
                    {scenario.kind} • {scenario.objective}
                  </p>
                </div>
                <StatusChip label={scenario.status} kind="test" />
              </div>
              <div className="mt-4 grid gap-4 xl:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Prompt</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{scenario.prompt}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Retrieved evidence</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                    {scenario.retrievedEvidence?.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Model answer</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{scenario.modelAnswer}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Expected answer</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{scenario.expectedAnswer}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Pass rate</p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">{scenario.passRate}%</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Reproducibility</p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">{scenario.reproducibilityScore}%</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Validator notes</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{scenario.validatorNotes}</p>
                </div>
              </div>
            </div>
          ))}
        </SectionCard>
      </TabsContent>

      <TabsContent value="findings">
        <SectionCard
          title="Findings"
          description="Shared findings register for workflow boundary, grounding, and control issues."
          contentClassName="p-0"
        >
          <FindingsTable findings={findings} />
        </SectionCard>
      </TabsContent>

      <TabsContent value="audit-trail">
        <SectionCard
          title="Audit Trail"
          description="Prompt-version history, milestones, and evidence packaged for governance and audit replay."
          contentClassName="grid gap-6 p-6 lg:grid-cols-[0.9fr_1.1fr]"
        >
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
  )
}

function ModelDetailView() {
  const params = useParams<{ modelId: string }>()
  const { setSelectedModelId } = useDemoContext()
  const model = useMemo(() => getValidationModel(params.modelId), [params.modelId])
  const [notes, setNotes] = useState(
    "Steering-committee angle: show one shared workbench for traditional AML models and GenAI-assisted AML workflows, with clear control boundaries and future API seams."
  )

  useEffect(() => {
    if (model) {
      setSelectedModelId(model.id)
    }
  }, [model, setSelectedModelId])

  if (!model) {
    return (
      <SectionCard
        title="Inventory item not found"
        description="The selected validation item does not exist in the current mock inventory."
        contentClassName="p-6"
      >
        <Button asChild>
          <Link href="/models">Return to inventory</Link>
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
                <StatusChip label={model.validationType} />
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
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {isTraditionalValidationModel(model) ? "ATL / BTL" : "Grounding / review"}
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  {isTraditionalValidationModel(model)
                    ? `${model.atlCoverage}% / ${model.btlCoverage}%`
                    : `${model.retrievalGroundingCoverage}% / ${model.humanReviewRequirement}`}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Open findings</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">{model.openFindings}</p>
              </div>
            </div>
          </div>
        </div>

        {isTraditionalValidationModel(model) ? (
          <TraditionalWorkspaceContent modelId={model.id} />
        ) : (
          <GenAIWorkspaceContent modelId={model.id} />
        )}
      </div>

      <aside className="space-y-6">
        <SectionCard
          title="Notes & Actions"
          description="Consulting-side workspace for steering messages and next actions."
          contentClassName="space-y-4 p-6"
        >
          <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="min-h-[180px]" />
          <div className="grid gap-3">
            <Button className="justify-start bg-slate-950 text-white hover:bg-slate-800">
              <FilePenLine className="mr-2 h-4 w-4" />
              {isTraditionalValidationModel(model) ? "Draft committee narrative" : "Draft AI control narrative"}
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
      description="A shared consulting-led workspace for traditional AML models and GenAI-assisted AML workflows, with item-type-specific validation views under one route."
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
