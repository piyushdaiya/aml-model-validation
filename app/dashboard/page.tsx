"use client"

import { DashboardHeaderActions, DashboardRenderer } from "@/components/demo/dashboard/DashboardRenderer"
import { DemoShell } from "@/components/demo/demo-shell"

export default function DashboardPage() {
  return (
    <DemoShell
      title="Executive Dashboard"
      description="Presentation-ready view of the secure reporting portal across the current client engagement, showing traditional AML and GenAI validation reporting in one shared surface."
      actions={<DashboardHeaderActions />}
    >
      <DashboardRenderer />
    </DemoShell>
  )
}
