import type { ClientEngagement } from "@/lib/demo-data/types"

export const clientEngagements: ClientEngagement[] = [
  {
    id: "northstar-bank",
    clientName: "Northstar Bank",
    engagementName: "Enterprise AML Transaction Monitoring Validation",
    industry: "Tier 1 Bank",
    region: "United States",
    sponsor: "Lina Morales, Chief Compliance Officer",
    practiceLead: "A. Patel",
    stage: "Fieldwork",
    nextCommitteeDate: "2026-04-08",
    summary:
      "Flagship validation covering cash structuring, wire velocity, and sanctions screening with board-level visibility.",
  },
  {
    id: "harbor-credit",
    clientName: "Harbor Credit Union",
    engagementName: "Customer Risk Rating Refresh Validation",
    industry: "Regional Bank",
    region: "Canada",
    sponsor: "Robert Chen, Head of BSA/AML",
    practiceLead: "M. Donovan",
    stage: "Review",
    nextCommitteeDate: "2026-04-15",
    summary:
      "Risk-rating methodology challenge focused on scoring transparency, data lineage, and segmentation drift.",
  },
  {
    id: "summit-payments",
    clientName: "Summit Payments",
    engagementName: "Fintech Sanctions & Watchlist Controls Review",
    industry: "Fintech",
    region: "United Kingdom",
    sponsor: "Eva Sinclair, General Counsel",
    practiceLead: "J. Holmes",
    stage: "Scoping",
    nextCommitteeDate: "2026-04-21",
    summary:
      "Accelerator-led sanctions validation establishing future-state operating model for rapid client onboarding.",
  },
  {
    id: "atlas-private-bank",
    clientName: "Atlas Private Bank",
    engagementName: "Private Banking AML Model Validation Program",
    industry: "Private Bank",
    region: "Switzerland",
    sponsor: "Marta Weber, Group Head of Financial Crime",
    practiceLead: "S. Ibrahim",
    stage: "Steering Committee",
    nextCommitteeDate: "2026-03-31",
    summary:
      "Executive readout package for high-risk client monitoring, scenario tuning, and audit-ready evidence consolidation.",
  },
]

export function getClientEngagements(): ClientEngagement[] {
  return clientEngagements
}

export function getClientEngagement(clientId: string): ClientEngagement | undefined {
  return clientEngagements.find((client) => client.id === clientId)
}
