"use client"

import { DashboardHeaderActions, DashboardRenderer } from "@/components/demo/dashboard/DashboardRenderer"
import { DemoShell } from "@/components/demo/demo-shell"

export default function DashboardPage() {
  return (
    <DemoShell
      title="Executive Dashboard"
      description="Presentation-ready view of the consulting accelerator across the current client engagement, now showing both traditional AML model validation and GenAI workflow validation in one reusable workbench."
      actions={<DashboardHeaderActions />}
    >
      <DashboardRenderer />
    </DemoShell>
  )
}
