import * as React from "react"

import { cn } from "@/lib/utils"

type StatusChipKind = "model" | "risk" | "finding" | "test" | "milestone" | "generic"

const toneMap: Record<StatusChipKind, Record<string, string>> = {
  model: {
    "On Track": "border-emerald-200 bg-emerald-50 text-emerald-700",
    "Needs Attention": "border-amber-200 bg-amber-50 text-amber-700",
    Escalated: "border-rose-200 bg-rose-50 text-rose-700",
    Completed: "border-slate-200 bg-slate-100 text-slate-700",
  },
  risk: {
    Low: "border-slate-200 bg-slate-100 text-slate-700",
    Moderate: "border-amber-200 bg-amber-50 text-amber-700",
    High: "border-orange-200 bg-orange-50 text-orange-700",
    Critical: "border-rose-200 bg-rose-50 text-rose-700",
  },
  finding: {
    Open: "border-rose-200 bg-rose-50 text-rose-700",
    "In Remediation": "border-amber-200 bg-amber-50 text-amber-700",
    "Ready for Review": "border-blue-200 bg-blue-50 text-blue-700",
    Closed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  test: {
    Pass: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Watch: "border-amber-200 bg-amber-50 text-amber-700",
    Fail: "border-rose-200 bg-rose-50 text-rose-700",
  },
  milestone: {
    Complete: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "In Progress": "border-blue-200 bg-blue-50 text-blue-700",
    Pending: "border-slate-200 bg-slate-100 text-slate-700",
  },
  generic: {},
}

export function StatusChip({
  label,
  kind = "generic",
  className,
}: {
  label: string
  kind?: StatusChipKind
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
        toneMap[kind][label] ?? "border-slate-200 bg-slate-100 text-slate-700",
        className
      )}
    >
      {label}
    </span>
  )
}
