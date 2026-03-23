"use client"

import { DemoShell } from "@/components/demo/demo-shell"
import { SectionCard } from "@/components/demo/section-card"

export default function DemoSettingsPage() {
  return (
    <DemoShell
      title="Demo Settings"
      description="Optional phase-1 page that explains how this stakeholder demo is structured for clean future integration."
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          title="Current Phase-1 Boundaries"
          description="Intentional limits of this consulting demo."
          contentClassName="space-y-4 p-6"
        >
          <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            Mock data drives all current routes. Auth, database, report generation, workflow, orchestration, RBAC, and evidence repositories are intentionally left as future product seams.
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            Shared components and typed demo-data modules were created to make eventual API replacement straightforward without rewriting the UI structure.
          </div>
        </SectionCard>

        <SectionCard
          title="Next Backend Integration Targets"
          description="Practical follow-on implementation areas for the full product."
          contentClassName="space-y-4 p-6"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
            1. Replace demo-data selectors with route handlers or server actions.
            <br />
            2. Add model/test/finding persistence and report versioning.
            <br />
            3. Introduce orchestration for ATL/BTL test execution and evidence capture.
            <br />
            4. Layer in RBAC, approvals, notifications, and export services.
          </div>
        </SectionCard>
      </div>
    </DemoShell>
  )
}
