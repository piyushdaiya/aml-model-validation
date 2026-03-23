"use client"

import { DashboardHeaderActions, DashboardRenderer } from "@/components/demo/dashboard/DashboardRenderer"
import { DemoShell } from "@/components/demo/demo-shell"

export default function DashboardPage() {
  return (
    <DemoShell
      title="Executive Dashboard"
      description="Presentation-ready view of the consulting accelerator across the current client engagement, with clear evidence of rigorous validation methodology and a credible path to a full product build."
      actions={<DashboardHeaderActions />}
    >
      <DashboardRenderer />
    </DemoShell>
  )
}
