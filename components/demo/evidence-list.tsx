import { FileSpreadsheet, FolderArchive, ShieldCheck } from "lucide-react"

import type { EvidenceItem } from "@/lib/demo-data/types"

const iconMap = {
  "Data Validation": FileSpreadsheet,
  Testing: ShieldCheck,
  Governance: FolderArchive,
}

export function EvidenceList({ items }: { items: EvidenceItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const Icon = iconMap[item.category as keyof typeof iconMap] ?? ShieldCheck
        return (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{item.updatedAt}</p>
                </div>
                <p className="mt-1 text-sm text-slate-600">{item.note}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                  {item.category} • {item.owner}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
