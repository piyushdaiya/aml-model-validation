"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ClientEngagement } from "@/lib/demo-data/types"

export function ClientSelector({
  clients,
  value,
  onValueChange,
}: {
  clients: ClientEngagement[]
  value: string
  onValueChange: (value: string) => void
}) {
  return (
    <div className="min-w-[240px]">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Client Engagement</p>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="border-slate-200 bg-white">
          <SelectValue placeholder="Choose engagement" />
        </SelectTrigger>
        <SelectContent>
          {clients.map((client) => (
            <SelectItem key={client.id} value={client.id}>
              {client.clientName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
