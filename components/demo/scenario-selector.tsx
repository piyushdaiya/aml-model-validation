"use client"

import type { TestingScenario } from "@/lib/demo-data/types"
import { cn } from "@/lib/utils"

export function ScenarioSelector({
  scenarios,
  selectedScenarioId,
  onSelect,
}: {
  scenarios: TestingScenario[]
  selectedScenarioId: string
  onSelect: (scenarioId: string) => void
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {scenarios.map((scenario) => (
        <button
          key={scenario.id}
          type="button"
          className={cn(
            "rounded-2xl border p-4 text-left shadow-sm transition hover:border-slate-300 hover:bg-white",
            selectedScenarioId === scenario.id
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 bg-slate-50 text-slate-900"
          )}
          onClick={() => onSelect(scenario.id)}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">{scenario.kind}</p>
          <p className="mt-2 font-medium">{scenario.name}</p>
          <p className="mt-2 text-sm opacity-80">{scenario.objective}</p>
        </button>
      ))}
    </div>
  )
}
