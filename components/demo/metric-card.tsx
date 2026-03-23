import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function MetricCard({
  title,
  value,
  subtitle,
  accent,
  icon: Icon,
}: {
  title: string
  value: string
  subtitle: string
  accent?: "slate" | "blue" | "emerald" | "amber" | "rose"
  icon?: LucideIcon
}) {
  const accentClasses =
    accent === "blue"
      ? "from-blue-600/10 to-blue-100"
      : accent === "emerald"
        ? "from-emerald-600/10 to-emerald-100"
        : accent === "amber"
          ? "from-amber-600/10 to-amber-100"
          : accent === "rose"
            ? "from-rose-600/10 to-rose-100"
            : "from-slate-600/10 to-slate-100"

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className={cn("rounded-t-xl bg-gradient-to-br p-5", accentClasses)}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
          </div>
          {Icon ? (
            <div className="rounded-full border border-white/80 bg-white/80 p-2 text-slate-700 shadow-sm">
              <Icon className="h-4 w-4" />
            </div>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-4 text-sm text-slate-600">{subtitle}</CardContent>
    </Card>
  )
}
