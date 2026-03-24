import type { DemoPersona, DemoPersonaId } from "@/lib/demo-data/types"

export const demoPersonas: DemoPersona[] = [
  {
    id: "compliance-officer",
    label: "Compliance Officer",
    description: "Compliance posture, overdue remediation, and audit-ready outputs across the active engagement.",
  },
  {
    id: "risk-manager",
    label: "Risk Manager",
    description: "Risk exposure, scenario failures, and material performance drift requiring prioritization.",
  },
  {
    id: "model-owner",
    label: "Model Owner",
    description: "Assigned actions, documentation readiness, and milestones needed for governance review.",
  },
  {
    id: "validator",
    label: "Validator",
    description: "Testing queue, evidence gaps, data-quality exceptions, and calibration changes in progress.",
  },
  {
    id: "admin",
    label: "Admin",
    description: "Cross-client demo operations, configuration changes, support issues, and portfolio health.",
  },
]

export function getDemoPersona(personaId: DemoPersonaId): DemoPersona | undefined {
  return demoPersonas.find((persona) => persona.id === personaId)
}
