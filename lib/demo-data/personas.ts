import type { DemoPersona, DemoPersonaId } from "@/lib/demo-data/types"

export const demoPersonas: DemoPersona[] = [
  {
    id: "consulting-partner",
    label: "Consulting Partner",
    description: "Executive portfolio visibility, report readiness, high-risk client items, and reusable offering positioning.",
  },
  {
    id: "engagement-lead",
    label: "Engagement Lead",
    description: "Material findings, remediation priorities, milestone readiness, and the client-facing reporting story.",
  },
  {
    id: "validation-lead",
    label: "Validation Lead",
    description: "Evidence completeness, testing summaries, report-section readiness, and audit-trail completeness.",
  },
  {
    id: "client-compliance-sponsor",
    label: "Client Compliance Sponsor",
    description: "Compliance posture, audit readiness, high-risk findings, policy adherence, and human-review controls.",
  },
  {
    id: "client-model-sponsor",
    label: "Client Model Sponsor",
    description: "Documentation gaps, approvals, findings requiring response, workflow boundaries, and prompt/version changes.",
  },
  {
    id: "platform-admin",
    label: "Platform Admin",
    description: "Secure access, engagement setup, environment health, support issues, and configuration and audit logs.",
  },
]

export function getDemoPersona(personaId: DemoPersonaId): DemoPersona | undefined {
  return demoPersonas.find((persona) => persona.id === personaId)
}
