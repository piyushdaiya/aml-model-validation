import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusChip } from "@/components/demo/status-chip"
import type { Finding } from "@/lib/demo-data/types"
import { cn } from "@/lib/utils"

export function FindingsTable({
  findings,
  selectedFindingId,
  onSelect,
}: {
  findings: Finding[]
  selectedFindingId?: string
  onSelect?: (finding: Finding) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>ID</TableHead>
          <TableHead>Issue</TableHead>
          <TableHead>Track</TableHead>
          <TableHead>Validation Type</TableHead>
          <TableHead>Stream</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Due</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {findings.map((finding) => (
          <TableRow
            key={finding.id}
            className={cn("cursor-pointer", selectedFindingId === finding.id ? "bg-slate-100/80" : "")}
            onClick={() => onSelect?.(finding)}
          >
            <TableCell className="font-medium text-slate-700">{finding.id}</TableCell>
            <TableCell>
              <div>
                <p className="font-medium text-slate-900">{finding.title}</p>
                <p className="text-xs text-slate-500">{finding.summary}</p>
              </div>
            </TableCell>
            <TableCell>{finding.track}</TableCell>
            <TableCell>{finding.validationType}</TableCell>
            <TableCell>{finding.stream}</TableCell>
            <TableCell>
              <StatusChip label={finding.severity} kind="risk" />
            </TableCell>
            <TableCell>
              <StatusChip label={finding.status} kind="finding" />
            </TableCell>
            <TableCell>{finding.owner}</TableCell>
            <TableCell>{finding.dueDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
