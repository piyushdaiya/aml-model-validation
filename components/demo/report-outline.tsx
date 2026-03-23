"use client"

import type { ReportSection } from "@/lib/demo-data/types"
import { cn } from "@/lib/utils"

export function ReportOutline({
  sections,
  activeSectionId,
  onSelect,
}: {
  sections: ReportSection[]
  activeSectionId: string
  onSelect: (sectionId: string) => void
}) {
  return (
    <div className="space-y-2">
      {sections.map((section, index) => (
        <button
          key={section.id}
          type="button"
          className={cn(
            "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition",
            activeSectionId === section.id
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
          )}
          onClick={() => onSelect(section.id)}
        >
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current/20 text-xs font-semibold">
            {index + 1}
          </span>
          <div>
            <p className="font-medium">{section.title}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] opacity-70">{section.status}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
