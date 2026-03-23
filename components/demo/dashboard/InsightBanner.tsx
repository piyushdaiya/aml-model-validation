import { ShieldCheck } from "lucide-react"

import type { DemoPersona } from "@/lib/demo-data/types"

export function InsightBanner({
  persona,
  clientName,
  eyebrow,
  title,
  description,
}: {
  persona: DemoPersona
  clientName: string
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_58%,#334155_100%)] p-6 text-white shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">{eyebrow}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200">{description}</p>
        </div>
        <div className="min-w-[240px] rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <ShieldCheck className="h-4 w-4" />
            Persona focus
          </div>
          <p className="mt-3 text-base font-semibold">{persona.label}</p>
          <p className="mt-1 text-sm leading-6 text-slate-200">{persona.description}</p>
          <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/20 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-200">
            Active client: {clientName}
          </div>
        </div>
      </div>
    </section>
  )
}
