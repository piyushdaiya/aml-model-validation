import { CheckCircle2, Clock3, Dot } from "lucide-react"

import { StatusChip } from "@/components/demo/status-chip"
import { cn } from "@/lib/utils"

export interface TimelineItem {
  id: string
  title: string
  subtitle: string
  meta: string
  status: string
}

export function AuditTimeline({
  items,
  compact = false,
}: {
  items: TimelineItem[]
  compact?: boolean
}) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border bg-white text-slate-600",
                item.status === "Complete" || item.status === "Ready" ? "border-emerald-200 text-emerald-600" : "border-slate-200"
              )}
            >
              {item.status === "Complete" || item.status === "Ready" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : item.status === "In Progress" ? (
                <Clock3 className="h-4 w-4" />
              ) : (
                <Dot className="h-4 w-4" />
              )}
            </div>
            {index !== items.length - 1 ? <div className="mt-2 h-full w-px bg-slate-200" /> : null}
          </div>
          <div className={cn("rounded-xl border border-slate-200 bg-white p-4 shadow-sm", compact ? "w-full" : "flex-1")}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-600">{item.subtitle}</p>
              </div>
              <StatusChip label={item.status} kind="milestone" />
            </div>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{item.meta}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
