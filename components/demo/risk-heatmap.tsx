import type { Finding, Likelihood, Severity } from "@/lib/demo-data/types"
import { cn } from "@/lib/utils"

const severities: Severity[] = ["Low", "Moderate", "High", "Critical"]
const likelihoods: Likelihood[] = ["Rare", "Possible", "Likely", "Severe"]

function getCount(findings: Finding[], severity: Severity, likelihood: Likelihood) {
  return findings.filter((finding) => finding.severity === severity && finding.likelihood === likelihood).length
}

function getCellTone(count: number) {
  if (count >= 3) return "bg-rose-100 text-rose-800"
  if (count === 2) return "bg-amber-100 text-amber-800"
  if (count === 1) return "bg-blue-100 text-blue-800"
  return "bg-slate-100 text-slate-500"
}

export function RiskHeatmap({ findings }: { findings: Finding[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="grid grid-cols-5 bg-slate-50 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        <div className="border-b border-r border-slate-200 p-3">Likelihood</div>
        {severities.map((severity) => (
          <div key={severity} className="border-b border-slate-200 p-3 text-center">
            {severity}
          </div>
        ))}
      </div>
      {likelihoods.map((likelihood) => (
        <div key={likelihood} className="grid grid-cols-5">
          <div className="border-r border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700">{likelihood}</div>
          {severities.map((severity) => {
            const count = getCount(findings, severity, likelihood)
            return (
              <div
                key={`${likelihood}-${severity}`}
                className={cn("border-t border-slate-200 p-4 text-center text-sm font-semibold", getCellTone(count))}
              >
                {count}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
