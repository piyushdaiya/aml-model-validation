import Link from "next/link"
import { ArrowRight, Eye } from "lucide-react"

import { StatusChip } from "@/components/demo/status-chip"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ValidationModel } from "@/lib/demo-data/types"

export function ModelInventoryTable({
  models,
  onPreview,
}: {
  models: ValidationModel[]
  onPreview: (model: ValidationModel) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Model</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Risk</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Readout</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.map((model) => (
          <TableRow key={model.id}>
            <TableCell>
              <div>
                <p className="font-medium text-slate-900">{model.name}</p>
                <p className="text-xs text-slate-500">v{model.version}</p>
              </div>
            </TableCell>
            <TableCell>{model.type}</TableCell>
            <TableCell>{model.owner}</TableCell>
            <TableCell>{model.stage}</TableCell>
            <TableCell>
              <StatusChip label={model.riskLevel} kind="risk" />
            </TableCell>
            <TableCell>
              <StatusChip label={model.status} kind="model" />
            </TableCell>
            <TableCell>{model.nextReadoutDate}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => onPreview(model)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/models/${model.id}`}>
                    Open
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
