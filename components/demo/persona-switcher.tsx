"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { demoPersonas } from "@/lib/demo-data/personas"
import type { DemoPersonaId } from "@/lib/demo-data/types"

export function PersonaSwitcher({
  value,
  onValueChange,
}: {
  value: DemoPersonaId
  onValueChange: (value: DemoPersonaId) => void
}) {
  return (
    <div className="min-w-[190px]">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Persona</p>
      <Select value={value} onValueChange={(nextValue) => onValueChange(nextValue as DemoPersonaId)}>
        <SelectTrigger className="border-slate-200 bg-white">
          <SelectValue placeholder="Choose persona" />
        </SelectTrigger>
        <SelectContent>
          {demoPersonas.map((persona) => (
            <SelectItem key={persona.id} value={persona.id}>
              {persona.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
